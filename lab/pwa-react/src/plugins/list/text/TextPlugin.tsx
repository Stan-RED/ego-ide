import { IAspect } from "@lab/api-server";
import React from "react";

import Aspect from "src/plugins/components/Aspect";
import { ICurrentAction } from "src/store/reducers/core.reducer";
import { IPlugin, PluginAction } from "../../models";
import TextActions from "./TextActions";
import TextFormPart from "./TextFormPart";
import TextNavigation from "./TextNavigation";

export class TextPlugin implements IPlugin {
  getActionsComponent(): React.ReactNode {
    return <TextActions />;
  }

  getComponent(action: ICurrentAction, aspectState?: IAspect): React.ReactNode {
    switch (action) {
      case PluginAction.Add:
      case PluginAction.AddAspect:
      case PluginAction.AddLinkedEntity: {
        return <TextFormPart aspectState={aspectState} />;
      }
      case PluginAction.View:
      case PluginAction.Aspects: {
        if (aspectState && "content" in aspectState) {
          return (
            <Aspect
              name="text"
              value={
                <div
                  dangerouslySetInnerHTML={{
                    __html: aspectState.content.replace(
                      /(?:\r\n|\r|\n)/g,
                      "<br />"
                    )
                  }}
                />
              }
            />
          );
        } else {
          return <h3>No text.content for current ID</h3>;
        }
      }
      default: {
        return (
          <div>
            Text plugin{" "}
            {action !== undefined
              ? `with action ${action}`
              : "without an action."}
          </div>
        );
      }
    }
  }

  getNavigationComponent(focusIndependentMode: boolean): React.ReactNode {
    return <TextNavigation focusIndependentMode={focusIndependentMode} />;
  }
}

const textPlugin = new TextPlugin();
export default textPlugin;
