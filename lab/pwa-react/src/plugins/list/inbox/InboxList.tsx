import { IDictionary } from "@ide/core";
import { ID } from "@ide/mesh";
import { IAspect, IStorage } from "@lab/api-server";
import React, { Component } from "react";
import { connect } from "react-redux";

import { IApplicationState } from "src/store";
import storageManager from "src/store/effects/storage.effects";
import { ICurrentAction } from "src/store/reducers/core.reducer";
import {
  selectAspectsForEntity,
  selectCurrentAction,
  selectFocus
} from "src/store/selectors";
import { IPlugin, PluginAction } from "../../models/index";
import { pluginService } from "../../services";

export interface IInboxListStateProps {
  currentAction: ICurrentAction;
  // currentPlugin: ICurrentPlugin;
  focus: ID;
  selectAspectsForEntity: (id: ID) => IDictionary<IAspect>;
}

export interface IInboxListDispatchProps {
  readLinksForId: (id: ID, aspects: string[]) => Promise<IStorage | undefined>;
}

export interface IInboxListProps
  extends IInboxListDispatchProps,
    IInboxListStateProps {}

export interface IInboxListState {
  inbox: IStorage | undefined;
}

export class InboxList extends Component<IInboxListProps, IInboxListState> {
  constructor(props: IInboxListProps) {
    super(props);

    this.state = {
      inbox: undefined
    };
  }

  componentDidMount() {
    this.props
      .readLinksForId(this.props.focus, ["inbox"])
      .then(inbox => this.setState({ inbox }));
  }

  // WORK: aspects as argument (aspects: string[]);
  renderPluginsForId(aspects: IDictionary<IAspect>): React.ReactNode {
    // const aspects = this.props.selectAspectsForEntity(id);
    if (aspects && Object.keys(aspects).length) {
      return (
        <React.Fragment>
          {Object.keys(aspects).map((x, i) => {
            const plugin: IPlugin = pluginService.get(x);
            return (
              <React.Fragment key={i}>
                {/** WORK: getComponent(PluginAction.View) -> PluginAction.View as argument? */}
                {plugin.getComponent(PluginAction.View, aspects[x])}
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
    return this.state.inbox ? (
      <React.Fragment>
        {Object.keys(this.state.inbox).map((id, i) => {
          return (
            <div style={{ border: "1px solid black", margin: "1rem" }} key={i}>
              <span>ID: {id}</span>
              {this.renderPluginsForId(this.state.inbox![id])}
            </div>
          );
        })}
      </React.Fragment>
    ) : (
      <div>Looks like there are no inbox entities in here.</div>
    );
  }
}

const mapStateToProps = (state: IApplicationState): IInboxListStateProps => ({
  currentAction: selectCurrentAction(state),
  focus: selectFocus(state),
  selectAspectsForEntity: (id: ID) => selectAspectsForEntity(id)(state)
});

const mapDispatchToProps = (dispatch: any): IInboxListDispatchProps => ({
  readLinksForId: (id: ID, aspects: string[]) =>
    dispatch(storageManager.readLinksForId(id, aspects))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InboxList);
