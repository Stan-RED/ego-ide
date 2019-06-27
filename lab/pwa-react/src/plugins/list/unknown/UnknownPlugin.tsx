import { IAspect } from "@lab/api-server";
import React from "react";

import Aspect from "src/plugins/components/Aspect";
import {
  ICurrentAction,
  ICurrentPlugin
} from "src/store/reducers/core.reducer";
import { IPlugin, PluginAction } from "../../models";

export class UnknownPlugin implements IPlugin {
  constructor(private aspectName: ICurrentPlugin) {}

  getActionsComponent(): React.ReactNode {
    return <div>Unknown plugin's actions</div>;
  }

  getComponent(action: ICurrentAction, aspectState?: IAspect): React.ReactNode {
    switch (action) {
      case PluginAction.View:
      case PluginAction.Aspects: {
        if (aspectState) {
          return (
            <Aspect
              name={`${this.aspectName ? this.aspectName : ""} (no plugin)`}
              value={aspectState ? JSON.stringify(aspectState) : ""}
            />
          );
        } else {
          return <h3>Empty aspect state.</h3>;
        }
      }
      default: {
        return (
          <div>
            Unknown plugin for aspect <strong>{this.aspectName}</strong>
            {action !== undefined
              ? ` with action ${action}`
              : " without an action."}
            <br />
            {aspectState ? JSON.stringify(aspectState) : ""}
          </div>
        );
      }
    }
  }

  getNavigationComponent(): React.ReactNode {
    return (
      <div>Not implemented (unknown plugin, getNavigationalComponent)</div>
    );
  }
}

// const unknownPlugin = new UnknownPlugin();
// export default unknownPlugin;
