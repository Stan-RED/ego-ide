import React, { Component } from "react";
import { connect } from "react-redux";

import { ICurrentAction } from "src/store/reducers/core.reducer";
import { selectCurrentAction } from "src/store/selectors";
import { IApplicationState, SetCurrentAction } from "../../store";
import { pluginActionsService } from "../services";

export interface IPluginActionsStateProperties {
  currentAction: ICurrentAction;
}

export interface IPluginActionsDispatchProperties {
  setCurrentAction: (action: ICurrentAction) => void;
}

export interface IPluginActionsProperties
  extends IPluginActionsStateProperties,
    IPluginActionsDispatchProperties {
  actions: ICurrentAction[];
  onAction?: (action: ICurrentAction) => void;
}

export class PluginActions extends Component<IPluginActionsProperties> {
  componentWillMount() {
    if (this.props.onAction) {
      this.props.onAction(this.props.currentAction);
    }
  }

  handleOnActionClick = (action: ICurrentAction) => () => {
    this.props.setCurrentAction(action);

    if (this.props.onAction) {
      this.props.onAction(action);
    }
  };

  render() {
    return (
      <div>
        {this.props.actions.map((x, index) => (
          <span
            style={{ border: "1px solid black", margin: 3 }}
            onClick={this.handleOnActionClick(x)}
            key={index}
          >
            {pluginActionsService.getActionName(x)}
          </span>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: any
): IPluginActionsDispatchProperties => ({
  setCurrentAction: (action: ICurrentAction) =>
    dispatch({ ...new SetCurrentAction(action) })
});

const mapStateToProps = (
  state: IApplicationState
): IPluginActionsStateProperties => ({
  currentAction: selectCurrentAction(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PluginActions);
