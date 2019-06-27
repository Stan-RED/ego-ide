import React from "react";

import { ICurrentAction } from '../../../store/reducers/core.reducer';
import PluginActions from "../../components/PluginActions";
import { IPlugin, PluginAction } from "../../models";
import TagsNavigation from "./TagsNavigation";

export class TagsPlugin implements IPlugin {
  getActionsComponent(): React.ReactNode {
    return <PluginActions actions={[PluginAction.View]} />;
  }

  getComponent(action: ICurrentAction): React.ReactNode {
    return (
      <div>
        Tags plugin{" "}
        {action !== undefined ? `with action ${action}` : "without an action."}
      </div>
    );
  }

  getNavigationComponent(): React.ReactNode {
    return <TagsNavigation />;
  }
}

const tagsPlugin = new TagsPlugin();
export default tagsPlugin;
