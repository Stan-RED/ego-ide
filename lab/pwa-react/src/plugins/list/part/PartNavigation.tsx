import { ID } from "@ide/mesh";
import React, { Component } from "react";
import { connect } from "react-redux";

import Breadcrumbs from "src/plugins/components/Breadcrumbs";
import NavigationalAspects from "src/plugins/components/NavigationalAspects";
import NavigationalHistory from "src/plugins/components/NavigationalHistory";
import { IPlugin } from "src/plugins/models";
import { pluginService } from "src/plugins/services";
import {
  IApplicationState,
  SetCurrentAction,
  SetCurrentFocus
} from "src/store";
import storageManager from "src/store/effects/storage.effects";
import {
  ICurrentAction,
  ICurrentPlugin
} from "src/store/reducers/core.reducer";
import { selectCurrentPlugin, selectFocus } from "src/store/selectors";

export interface IPartStateProps {
  currentPlugin: ICurrentPlugin;
  focus: ID;
}

export interface IPartDispatchProps {
  readParentForEntity: (id: ID) => Promise<ID>;
  setCurrentAction: (action: ICurrentAction) => void;
  setFocus: (focus: ID) => void;
}

export interface IPartProps extends IPartDispatchProps, IPartStateProps {}

export interface IPartState {
  focusIndependentMode: boolean;
}

export class PartNavigation extends Component<IPartProps, IPartState> {
  constructor(props: IPartProps) {
    super(props);
    this.state = {
      focusIndependentMode: false
    };
  }
  handleFocusIndependentModeToggle = (event: any) => {
    this.setState({ focusIndependentMode: event.target.checked });
  };

  render() {
    let plugin: IPlugin | undefined;
    if (this.props.currentPlugin !== undefined) {
      plugin = pluginService.get(this.props.currentPlugin);
    }

    return (
      <React.Fragment>
        <NavigationalHistory />
        <Breadcrumbs />
        <label>
          Focus-independent
          <input
            type="checkbox"
            onChange={this.handleFocusIndependentModeToggle}
          />
        </label>
        {plugin ? (
          plugin.getNavigationComponent(this.state.focusIndependentMode)
        ) : (
          <NavigationalAspects
            focusIndependentMode={this.state.focusIndependentMode}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IApplicationState): IPartStateProps => ({
  currentPlugin: selectCurrentPlugin(state),
  focus: selectFocus(state)
});

const mapDispatchToProps = (dispatch: any): IPartDispatchProps => ({
  readParentForEntity: (id: ID) =>
    dispatch(storageManager.readParentForEntity(id)),
  setCurrentAction: (action: ICurrentAction) =>
    dispatch({ ...new SetCurrentAction(action) }),
  setFocus: (focus: ID) => dispatch({ ...new SetCurrentFocus(focus) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartNavigation);
