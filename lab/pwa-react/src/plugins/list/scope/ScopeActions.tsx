import { BaseActions, connectBaseActions } from "src/plugins/bases/BaseActions";
import { PluginAction } from "src/plugins/models";

export class ScopeActions extends BaseActions {
  actions = [
    PluginAction.Add,
    PluginAction.View,
    PluginAction.Aspects,
    PluginAction.AddAspect
  ];

  addModel = {
    name: {},
    part: {},
    scope: {}
  };

  addAspectModel = { scope: {} };
}

export default connectBaseActions(ScopeActions);
