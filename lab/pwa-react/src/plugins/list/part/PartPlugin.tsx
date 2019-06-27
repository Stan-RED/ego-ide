import { IAspect } from "@lab/api-server";
import React from "react";

import Aspect from "src/plugins/components/Aspect";
import { ICurrentAction } from "src/store/reducers/core.reducer";
import PluginActions from "../../components/PluginActions";
import { IPlugin, PluginAction } from "../../models";
import PartFormPart from "./PartFormPart";
import PartNavigation from "./PartNavigation";

export class PartPlugin implements IPlugin {
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
      case PluginAction.Add:
      case PluginAction.AddAspect:
      case PluginAction.AddLink: {
        return <PartFormPart aspectState={aspectState} />;
      }
      case PluginAction.View:
      case PluginAction.Aspects: {
        if (aspectState && "of" in aspectState) {
          // WORK: onClick parent to focus?
          return <Aspect name="part.of" value={aspectState.of} />;
        } else {
          return <h3>No "of" for current "part"</h3>;
        }
      }
      default: {
        return (
          <div>
            Part plugin{" "}
            {action !== undefined
              ? `with action ${action}`
              : "without an action."}
          </div>
        );
      }
    }
  }

  getNavigationComponent(): React.ReactNode {
    return <PartNavigation />;
  }
}

const partPlugin = new PartPlugin();
export default partPlugin;
