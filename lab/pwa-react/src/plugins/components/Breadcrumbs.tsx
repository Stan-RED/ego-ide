import { ID } from "@ide/mesh";
import React, { Component } from "react";
import { connect } from "react-redux";

import { PluginAction } from "src/plugins/models";
import {
  IApplicationState,
  SetCurrentAction,
  SetCurrentFocus,
  SetCurrentPlugin
} from "src/store";
import storageManager from "src/store/effects/storage.effects";
import {
  ICurrentAction,
  ICurrentPlugin
} from "src/store/reducers/core.reducer";
import {
  selectCurrentAction,
  selectCurrentPlugin,
  selectFocus
} from "src/store/selectors";

export interface IBreadcrumbsStateProps {
  currentAction: ICurrentAction;
  currentPlugin: ICurrentPlugin;
  focus: ID;
}

export interface IBreadcrumbsDispatchProps {
  readAllParentsForEntity: (id: ID) => Promise<ID[]>;
  setCurrentAction: (action: ICurrentAction) => void;
  setCurrentPlugin: (plugin: ICurrentPlugin) => void;
  setFocus: (focus: ID) => void;
}

export interface IBreadcrumbsProps
  extends IBreadcrumbsDispatchProps,
    IBreadcrumbsStateProps {}

export interface IBreadcrumbsState {
  parentIds: ID[];
}

export class Breadcrumbs extends Component<
  IBreadcrumbsProps,
  IBreadcrumbsState
> {
  async componentDidMount() {
    // if (prevProps.focus !== this.props.focus) {
    this.props.readAllParentsForEntity(this.props.focus).then(ids => {
      this.setState({ parentIds: ids });
    });
    // }
  }

  async componentDidUpdate(prevProps: Readonly<IBreadcrumbsProps>) {
    if (
      prevProps.focus !== this.props.focus ||
      // WORK: I do look like as part of some architectural mistake. For now I'm covering breadcrumb update after adding new entry.
      prevProps.currentAction !== this.props.currentAction
    ) {
      this.props.readAllParentsForEntity(this.props.focus).then(ids => {
        this.setState({ parentIds: ids });
      });
    }
  }

  handleOnFocusClick = (focus: ID) => () => {
    if (this.props.focus !== focus) {
      this.props.setFocus(focus);
    }
    if (this.props.currentPlugin !== undefined) {
      this.props.setCurrentPlugin(undefined);
    }
    if (this.props.currentAction !== PluginAction.Aspects) {
      this.props.setCurrentAction(PluginAction.Aspects);
    }
  };

  render() {
    return (
      <div>
        {this.state && this.state.parentIds
          ? this.state.parentIds.map((x, i) => (
              <span
                style={{ textDecoration: "underline" }}
                key={i}
                onClick={this.handleOnFocusClick(x)}
              >
                {x} /{" "}
              </span>
            ))
          : ""}

        <span
          aria-label="focus"
          onClick={this.handleOnFocusClick(this.props.focus)}
        >
          {this.props.focus}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState): IBreadcrumbsStateProps => ({
  currentAction: selectCurrentAction(state),
  currentPlugin: selectCurrentPlugin(state),
  focus: selectFocus(state)
});

const mapDispatchToProps = (dispatch: any): IBreadcrumbsDispatchProps => ({
  readAllParentsForEntity: (id: ID) =>
    dispatch(storageManager.readAllParentsForEntity(id)),
  setCurrentAction: (action: ICurrentAction) =>
    dispatch({ ...new SetCurrentAction(action) }),
  setCurrentPlugin: (plugin: ICurrentPlugin) =>
    dispatch({ ...new SetCurrentPlugin(plugin) }),
  setFocus: (focus: ID) => dispatch({ ...new SetCurrentFocus(focus) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Breadcrumbs);
