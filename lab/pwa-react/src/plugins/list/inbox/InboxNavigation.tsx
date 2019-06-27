import React, { Component } from "react";
import { connect } from "react-redux";
import { navigationalAspects } from "src/plugins/bases/BaseNavigation";
import {
  ICurrentAction,
  ICurrentPlugin
} from "src/store/reducers/core.reducer";
import { SetCurrentAction, SetCurrentPlugin } from "../../../store";
import { PluginAction } from "../../models";

// tslint:disable-next-line:no-empty-interface
export interface IInboxNavigationStateProps {
  //   inboxes: IInbox[];
}

export interface IInboxNavigationDispatchProps {
  //   loadInboxes: () => void;
  setCurrentPlugin: (plugin: ICurrentPlugin) => void;
  setCurrentAction: (action: ICurrentAction) => void;
}

export interface IInboxNavigationProps
  extends IInboxNavigationDispatchProps,
    IInboxNavigationStateProps {}

export class InboxNavigation extends Component<IInboxNavigationProps> {
  handleOnPluginClick = (path: string) => () => {
    // WORK: handle add mode
    // this.props.routeChange(path);
    // this.props.setCurrentPlugin(undef);
    this.props.setCurrentPlugin(path);
    this.props.setCurrentAction(PluginAction.Add);
    // setTimeout(() => {
    //   this.props.setCurrentPlugin(path);
    // });
  };

  //   componentDidMount() {
  // Set action to something?
  //     this.props.loadInboxes();
  //   }

  render() {
    return (
      <ul>
        {navigationalAspects
          .filter(x => x !== "inbox")
          .map((key, i) => (
            <li key={i} onClick={this.handleOnPluginClick(key)}>
              {key}
              {/*<input type="button" value="Add" />
              <input type="button" value="Filter" />
                */}
            </li>
          ))}
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentAction: (action: string | PluginAction) =>
    dispatch({ ...new SetCurrentAction(action) }),
  setCurrentPlugin: (plugin: string) =>
    dispatch({ ...new SetCurrentPlugin(plugin) })
});

export default connect(
  null,
  mapDispatchToProps
)(InboxNavigation);
