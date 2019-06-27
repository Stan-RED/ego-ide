import { BaseActions, connectBaseActions } from "src/plugins/bases/BaseActions";
import { PluginAction } from "src/plugins/models";

export class TopicActions extends BaseActions {
  actions = [
    PluginAction.Add,
    PluginAction.View,
    PluginAction.Aspects,
    PluginAction.AddAspect
  ];

  addModel = {
    name: {},
    part: {},
    topic: {}
  };

  addAspectModel = { topic: {} };
}

export default connectBaseActions(TopicActions);
