import { IAspect } from "@lab/api-server";
import React from "react";

import Aspect from "src/plugins/components/Aspect";
import { ICurrentAction } from "src/store/reducers/core.reducer";
import PluginActions from "../../components/PluginActions";
import { IPlugin, PluginAction } from "../../models";
import PointFormPart from "./PointFormPart";

export class PointPlugin implements IPlugin {
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
        return <PointFormPart aspectState={aspectState} />;
      }
      case PluginAction.View:
      case PluginAction.Aspects: {
        if (aspectState && "to" in aspectState) {
          return <Aspect name="point.to" value={aspectState.to} />;
        } else {
          return <h3>No "to" for current "point"</h3>;
        }
      }
      default: {
        return (
          <div>
            Point plugin{" "}
            {action !== undefined
              ? `with action ${action}`
              : "without an action."}
          </div>
        );
      }
    }
  }

  getNavigationComponent(): React.ReactNode {
    return <div>No point navigation</div>;
  }
}

const pointPlugin = new PointPlugin();
export default pointPlugin;
