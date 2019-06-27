import React from "react";

import EmptyAspect from "src/plugins/bases/EmptyAspect";
import { ICurrentAction } from "../../../store/reducers/core.reducer";
import { IPlugin, PluginAction } from "../../models";
import TopicActions from "./TopicActions";
import TopicNavigation from "./TopicNavigation";

export class TopicPlugin implements IPlugin {
  getActionsComponent(): React.ReactNode {
    return <TopicActions />;
  }

  getComponent(action: ICurrentAction): React.ReactNode {
    switch (action) {
      case PluginAction.Add:
      case PluginAction.AddAspect:
      case PluginAction.AddLinkedEntity: {
        return <div>Not implemented (topic plugin, action add/addAspect)</div>;
      }
      case PluginAction.View:
      case PluginAction.Aspects: {
        return <EmptyAspect aspectName="topic" />;
      }
      default: {
        return (
          <div>
            Topic plugin{" "}
            {action !== undefined
              ? `with action ${action}`
              : "without an action."}
          </div>
        );
      }
    }
  }

  getNavigationComponent(focusIndependentMode: boolean): React.ReactNode {
    return <TopicNavigation focusIndependentMode={focusIndependentMode} />;
  }
}

const topicPlugin = new TopicPlugin();
export default topicPlugin;
