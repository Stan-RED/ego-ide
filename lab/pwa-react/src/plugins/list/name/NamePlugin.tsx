import { IAspect } from "@lab/api-server";
import React from "react";

import Aspect from "src/plugins/components/Aspect";
import { ICurrentAction } from "src/store/reducers/core.reducer";
import PluginActions from "../../components/PluginActions";
import { IPlugin, PluginAction } from "../../models";
import NameFormPart from "./NameFormPart";

export class NamePlugin implements IPlugin {
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
      case PluginAction.AddLinkedEntity: {
        return <NameFormPart aspectState={aspectState} />;
      }
      case PluginAction.View:
      case PluginAction.Aspects: {
        if (aspectState && "name" in aspectState) {
          return <Aspect name="name" value={aspectState.name} />;
        } else {
          return <h3>No name for current ID</h3>;
        }
      }
      default: {
        return (
          <div>
            Name plugin{" "}
            {action !== undefined
              ? `with action ${action}`
              : "without an action."}
          </div>
        );
      }
    }
  }

  getNavigationComponent(): React.ReactNode {
    return <div>Not implemented (name plugin, get nav component)</div>;
  }
}

const namePlugin = new NamePlugin();
export default namePlugin;
