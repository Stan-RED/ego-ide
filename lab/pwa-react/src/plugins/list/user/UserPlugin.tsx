import { IAspect } from "@lab/api-server";
import React from "react";

import Aspect from "src/plugins/components/Aspect";
import { ICurrentAction } from "../../../store/reducers/core.reducer";
import PluginActions from "../../components/PluginActions";
import { IPlugin, PluginAction } from "../../models";
import UserNavigation from "./UserNavigation";

export class UserPlugin implements IPlugin {
  getActionsComponent(): React.ReactNode {
    return (
      <PluginActions
        actions={[
          PluginAction.Add,
          PluginAction.View,
          PluginAction.Aspects,
          PluginAction.AddAspect
        ]}
      />
    );
  }

  getComponent(action: ICurrentAction, aspectState?: IAspect): React.ReactNode {
    switch (action) {
      case PluginAction.View:
      case PluginAction.Aspects: {
        if (aspectState && "name" in aspectState) {
          return <Aspect name="user" value={aspectState.name} />;
        } else {
          return <h3>No "name" for current "user"</h3>;
        }
      }

      default: {
        return (
          <div>
            User plugin{" "}
            {action !== undefined
              ? `with action ${action}`
              : "without an action."}
          </div>
        );
      }
    }
  }

  getNavigationComponent(focusIndependentMode: boolean): React.ReactNode {
    return <UserNavigation focusIndependentMode={focusIndependentMode} />;
  }
}

const userPlugin = new UserPlugin();
export default userPlugin;
