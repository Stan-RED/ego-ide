import { BaseActions, connectBaseActions } from "src/plugins/bases/BaseActions";
import { PluginAction } from "src/plugins/models";

export class TextActions extends BaseActions {
  actions = [
    PluginAction.Add,
    PluginAction.View,
    PluginAction.Aspects,
    PluginAction.AddAspect
  ];

  addModel = {
    name: {},
    part: {},
    text: {}
  };

  addAspectModel = { text: {} };
}

export default connectBaseActions(TextActions);
