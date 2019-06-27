import React, { Component } from "react";
import { connect } from "react-redux";

import { ICurrentPlugin } from "src/store/reducers/core.reducer";
import partPlugin from "../../plugins/list/part/PartPlugin";
import { IPlugin } from "../../plugins/models";
import { pluginService } from "../../plugins/services/index";
import { IApplicationState } from "../../store";
import { SetCurrentPlugin } from "../../store/actions";
import { selectCurrentPlugin } from "../../store/selectors";

export interface INavigationStateProperties {
  currentPlugin: ICurrentPlugin;
}

export interface INavigationDispatchProperties {
  setCurrentPlugin: (plugin: ICurrentPlugin) => void;
}

export interface INavigationProperties
  extends INavigationStateProperties,
    INavigationDispatchProperties {}

export class Navigation extends Component<INavigationProperties> {
  render() {
    const plugin: IPlugin = pluginService.get(this.props.currentPlugin);
    // return (
    //   <div>
    //     {plugin.getNavigationComponent()}
    //     {plugin.getActionsComponent()}
    //   </div>
    // );
    return (
      <div>
        {partPlugin.getNavigationComponent()}
        {plugin.getActionsComponent()}
      </div>
    );
  }
}

const mapStateToProps = (
  state: IApplicationState
): INavigationStateProperties => ({
  currentPlugin: selectCurrentPlugin(state)
});

const mapDispatchToProps = (dispatch: any): INavigationDispatchProperties => ({
  setCurrentPlugin: (plugin: ICurrentPlugin) =>
    dispatch({ ...new SetCurrentPlugin(plugin) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
