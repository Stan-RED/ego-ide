import { ID } from "@ide/mesh";
import React, { Component } from "react";
import { connect } from "react-redux";

import { INavigationHistoryItem } from "src/models";
import {
  IApplicationState,
  SetCurrentAction,
  SetCurrentPlugin
} from "src/store";
import {
  ICurrentAction,
  ICurrentPlugin
} from "src/store/reducers/core.reducer";
import {
  selectCurrentAction,
  selectCurrentPlugin,
  selectFocus,
  selectHistory
} from "src/store/selectors";
import { PopHistoryItemBy, PushHistoryItem } from "../../store";
import { pluginActionsService } from "../services";

export interface INavigationalHistoryStateProps {
  currentAction: ICurrentAction;
  currentPlugin: ICurrentPlugin;
  focus: ID;
  history: INavigationHistoryItem[];
}

export interface INavigationalHistoryDispatchProps {
  addHistoryItem: (item: INavigationHistoryItem) => void;
  popNavigationalHistoryItemsBy: (idx: number) => void;
  setCurrentAction: (action: ICurrentAction) => void;
  setCurrentPlugin: (plugin: ICurrentPlugin) => void;
}

export interface INavigationalHistoryProps
  extends INavigationalHistoryStateProps,
    INavigationalHistoryDispatchProps {}

export class NavigationalHistory extends Component<INavigationalHistoryProps> {
  componentDidUpdate(prevProps: Readonly<INavigationalHistoryProps>) {
    const lastNavigationalItem = this.props.history[
      this.props.history.length - 1
    ];

    if (prevProps.focus !== this.props.focus) {
      this.props.popNavigationalHistoryItemsBy(-1);
      this.props.addHistoryItem({
        action: this.props.currentAction,
        plugin: this.props.currentPlugin
      });
    }

    if (
      (this.props.currentPlugin &&
        prevProps.currentPlugin !== this.props.currentPlugin &&
        (!lastNavigationalItem ||
          this.props.currentPlugin !== lastNavigationalItem.plugin)) ||
      (this.props.currentAction !== undefined &&
        prevProps.currentAction !== this.props.currentAction &&
        (!lastNavigationalItem ||
          this.props.currentAction !== lastNavigationalItem.action))
    ) {
      this.props.addHistoryItem({
        action: this.props.currentAction,
        plugin: this.props.currentPlugin
      });
    }
  }

  handleOnNavigationalItemClick = (
    navigationalItem: INavigationHistoryItem,
    idx: number
  ) => () => {
    this.props.popNavigationalHistoryItemsBy(idx);

    if (this.props.currentAction !== navigationalItem.action) {
      this.props.setCurrentAction(navigationalItem.action);
    }
    if (this.props.currentPlugin !== navigationalItem.plugin) {
      this.props.setCurrentPlugin(navigationalItem.plugin);
    }
  };

  render() {
    return (
      <details>
        <summary>History</summary>
        <p>TODO: Back and Forward buttons.</p>
        <ul>
          {this.props.history.map((x, i) => (
            <li onClick={this.handleOnNavigationalItemClick(x, i)} key={i}>
              {x.plugin} ({pluginActionsService.getActionName(x.action)})
            </li>
          ))}
        </ul>
      </details>
    );
  }
}

const mapStateToProps = (
  state: IApplicationState
): INavigationalHistoryStateProps => ({
  currentAction: selectCurrentAction(state),
  currentPlugin: selectCurrentPlugin(state),
  focus: selectFocus(state),
  history: selectHistory(state)
});

const mapDispatchToProps = (
  dispatch: any
): INavigationalHistoryDispatchProps => ({
  addHistoryItem: (item: INavigationHistoryItem) =>
    dispatch({ ...new PushHistoryItem(item) }),
  popNavigationalHistoryItemsBy: (idx: number) =>
    dispatch({ ...new PopHistoryItemBy(idx) }),
  setCurrentAction: (action: ICurrentAction) =>
    dispatch({ ...new SetCurrentAction(action) }),
  setCurrentPlugin: (plugin: ICurrentPlugin) =>
    dispatch({ ...new SetCurrentPlugin(plugin) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationalHistory);
