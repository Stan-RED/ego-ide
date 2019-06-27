import React from "react";

import EmptyAspect from "src/plugins/bases/EmptyAspect";
import { ICurrentAction } from "src/store/reducers/core.reducer";
import { IPlugin, PluginAction } from "../../models";
import ScopeActions from "./ScopeActions";
import ScopeNavigation from "./ScopeNavigation";

export class ScopePlugin implements IPlugin {
  getActionsComponent(): React.ReactNode {
    return <ScopeActions />;
  }

  getComponent(action: ICurrentAction): React.ReactNode {
    switch (action) {
      case PluginAction.Add:
      case PluginAction.AddAspect:
      case PluginAction.AddLinkedEntity: {
        return <div>Adding a scope.</div>;
      }
      case PluginAction.View:
      case PluginAction.Aspects: {
        // WORK: Merge with just <Aspect/>
        return <EmptyAspect aspectName="scope" />;
      }
      default: {
        return (
          <div>
            Scope plugin{" "}
            {action !== undefined
              ? `with action ${action}`
              : "without an action."}
          </div>
        );
      }
    }
  }

  getNavigationComponent(focusIndependentMode: boolean): React.ReactNode {
    return <ScopeNavigation focusIndependentMode={focusIndependentMode} />;
  }
}

const scopePlugin = new ScopePlugin();
export default scopePlugin;
