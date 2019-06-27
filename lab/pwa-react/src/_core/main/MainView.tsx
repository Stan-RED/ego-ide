// WORK: node console utility to make ide.cli (netSh-alike); ide -> add text (with real folder structure and json files inside folder (folder = entity))
// WORK: 1: e2e testing is working again.
// WORK: 1: Architectural problem: rendering aspect's plugins twice when switching to the new plugin with some action (because focus remains unchanged for a while).
// WORK: 2: Adding new entity part.of - gets updated after breadcrumb is already calculated.
// WORK: 3: Clipboard: set focus -> add to clipboard (creates link {point.to: focus, part.of: currentUser}).
// WORK: 3: Attach existing file to existing message (new message).
// WORK: 3: Storage fixes.
// WORK: 4: Routing, including Navigation (fix logic, back and forward buttons).
// WORK: 5: Modifying/Deletion of entities.
// WORK: 8: все-таки изменить подход к транзакциям - selectStorage - берет из стораджа и из текущей транзакции, merges them. This way, it is easier to update just ine aspect instead of a whole entity.
// WORK: 9: Inplace editing for aspects, Крестик возле отображаемого аспекта, чтобы удалить его (в edit-mode)

import { IDictionary } from "@ide/core";
import { ID } from "@ide/mesh";
import { IAspect, IQueryPayload, IStorage } from "@lab/api-server";
import React, { Component } from "react";
import { connect } from "react-redux";

import storageManager from "src/store/effects/storage.effects";
import transactionManager from "src/store/effects/transaction.effects";
import {
  ICurrentAction,
  ICurrentPlugin
} from "src/store/reducers/core.reducer";
import { IPlugin, PluginAction } from "../../plugins/models";

// WORK: Inject me and all other services in the constructors.
import { pluginService } from "../../plugins/services/index";
import {
  // WORK: Show some kind of "reset stash (cancel?) button in ui (maybe in navigation?) in case stash is available."
  ApplyStash,
  DropStash,
  IApplicationState,
  SetCurrentAction,
  SetCurrentFocus,
  SubstituteCurrentFocus
} from "../../store";
import { IPreviousFocus } from "../../store/reducers/core.reducer";
import {
  selectAspectsForEntity,
  selectCurrentAction,
  selectCurrentPlugin,
  selectFocus,
  selectPrevFocus
} from "../../store/selectors";

export interface IMainViewStateProps {
  currentAction: ICurrentAction;
  currentPlugin: ICurrentPlugin;
  focus: ID;
  prevFocus: IPreviousFocus;
  selectAspectsForEntity: (id: ID) => IDictionary<IAspect>;
}

export interface IMainViewDispatchProps {
  readEntities: (ids: ID[]) => Promise<IStorage>;
  setAction: (action: ICurrentAction) => void;
  setFocus: (focus: ID) => void;
  stashApply: () => void;
  stashDrop: () => void;
  substituteFocus: (focus: ID) => void;
  transactionCommit: () => Promise<ID[] | void>;
  transactionDo: (transaction: IQueryPayload) => void;
  transactionRollback: () => void;
}

export interface IMainViewProps
  extends IMainViewDispatchProps,
    IMainViewStateProps {}

export class MainView extends Component<IMainViewProps> {
  componentDidMount() {
    this.props.readEntities([this.props.focus]);
  }

  componentDidUpdate(prevProps: Readonly<IMainViewProps>) {
    if (this.props.focus !== prevProps.focus) {
      this.props.readEntities([this.props.focus]);
    }
  }

  handleSubmit = (event: any) => {
    // WORK: Return whole entity (with id as key)? Is it used somewhere else?
    const aspects = this.props.selectAspectsForEntity(this.props.focus);

    const payload = { ...aspects, id: this.props.focus };
    this.props.transactionDo(payload);

    this.props.setAction(PluginAction.View);

    this.props.transactionCommit().then(x => {
      if (x) {
        this.props.substituteFocus(x[x.length - 1]);
        this.props.stashDrop();
      }
      // this.props.setAction(PluginAction.View);
    });

    event.preventDefault();
  };

  handleCancel = () => {
    this.props.stashApply();
    this.props.transactionRollback();

    this.props.setAction(PluginAction.View);

    if (this.props.prevFocus) {
      this.props.substituteFocus(this.props.prevFocus);
    } else {
      throw new Error(
        "Somehow there is no previous focus in the state. It is very unusual and means that you are breaking something very badly."
      );
    }
  };

  // WORK: I'll be in some service, because I'm also used in linkActions
  renderPlugins(): React.ReactNode {
    const aspects = this.props.selectAspectsForEntity(this.props.focus);

    if (aspects && Object.keys(aspects).length) {
      return (
        <React.Fragment>
          {Object.keys(aspects)
            // Sorting the way that the the current plugin's aspect will be rendered first.
            // WORK: Refactor sorting.
            .sort((a, b) => {
              return a === this.props.currentPlugin
                ? -1
                : b === this.props.currentPlugin
                ? 1
                : 0;
            })
            .sort((prev, next) => {
              const isPrevEmpty = Object.keys(aspects[prev]).length === 0;
              const isNextEmpty = Object.keys(aspects[next]).length === 0;
              return isPrevEmpty && !isNextEmpty
                ? -1
                : !isPrevEmpty && isNextEmpty
                ? 1
                : 0;
            })
            .map((x, i) => {
              const plugin: IPlugin = pluginService.get(x);
              return (
                <React.Fragment key={i}>
                  {plugin.getComponent(this.props.currentAction, aspects[x])}
                </React.Fragment>
              );
            })}
        </React.Fragment>
      );
    } else {
      {
        /** WORK: not loading, just "no aspects"? */
      }
      return <div>Loading</div>;
    }
  }

  render() {
    if (
      this.props.currentAction === PluginAction.Add ||
      this.props.currentAction === PluginAction.AddAspect ||
      this.props.currentAction === PluginAction.AddLinkedEntity
    ) {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.renderPlugins()}
          <input type="submit" value="Submit" />
          <input type="button" value="Cancel" onClick={this.handleCancel} />
        </form>
      );
    } else if (this.props.currentAction === PluginAction.DelegateMainView) {
      const plugin: IPlugin = pluginService.get(this.props.currentPlugin);
      return plugin.getComponent(this.props.currentAction);
    } else {
      return this.renderPlugins();
    }
    // if (this.props.focus) {

    // } else {
    // const plugin: IPlugin = pluginService.get(this.props.currentPlugin);
    // return plugin.getComponent(this.props.currentAction);
    // }
  }
}

const mapStateToProps = (state: IApplicationState): IMainViewStateProps => ({
  currentAction: selectCurrentAction(state),
  currentPlugin: selectCurrentPlugin(state),
  focus: selectFocus(state),
  prevFocus: selectPrevFocus(state),
  selectAspectsForEntity: (id: ID) => selectAspectsForEntity(id)(state)
});

const mapDispatchToProps = (dispatch: any): IMainViewDispatchProps => ({
  readEntities: (ids: ID[]) => dispatch(storageManager.readEntities(ids)),
  setAction: (action: ICurrentAction) =>
    dispatch({ ...new SetCurrentAction(action) }),
  setFocus: (focus: ID) => dispatch({ ...new SetCurrentFocus(focus) }),
  stashApply: () => dispatch({ ...new ApplyStash() }),
  stashDrop: () => dispatch({ ...new DropStash() }),
  substituteFocus: (focus: ID) =>
    dispatch({ ...new SubstituteCurrentFocus(focus) }),
  transactionCommit: () => dispatch(transactionManager.commit()),
  transactionDo: (transaction: IQueryPayload) =>
    dispatch(transactionManager.do(transaction)),
  transactionRollback: () => dispatch(transactionManager.rollback())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
