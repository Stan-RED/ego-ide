import React from "react";

import Entity from "src/plugins/containers/Entity";
import { ICurrentAction } from "../../../store/reducers/core.reducer";
import { IPlugin, PluginAction } from "../../models";
import InboxActions from "./InboxActions";
import InboxList from "./InboxList";
import InboxNavigation from "./InboxNavigation";

export class InboxPlugin implements IPlugin {
  getActionsComponent(): React.ReactNode {
    return <InboxActions />;
  }

  getComponent(action: ICurrentAction): React.ReactNode {
    switch (action) {
      case PluginAction.DelegateMainView: {
        return <InboxList />;
      }
      // case PluginAction.Add:
      // case PluginAction.AddAspect: {
      //   return <InboxForm />;
      // }
      case PluginAction.View:
      case PluginAction.Aspects: {
        return <Entity />;
      }

      case PluginAction.Add: {
        return <div>Adding inbox link</div>;
      }
      default: {
        return (
          <div>
            Inbox plugin{" "}
            {action !== undefined
              ? `with action ${action}`
              : "without an action."}
          </div>
        );
      }
    }
  }

  getNavigationComponent(focusIndependentMode: boolean): React.ReactNode {
    return <InboxNavigation />;
  }
}

const inboxPlugin = new InboxPlugin();
export default inboxPlugin;
