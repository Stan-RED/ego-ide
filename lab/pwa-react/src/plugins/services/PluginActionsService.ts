import { ICurrentAction } from "../../store/reducers/core.reducer";
import { PluginAction } from "../models";

export interface IPluginActionsService {
  getActionName(action: ICurrentAction): string | undefined;
}

export class PluginActionsService implements IPluginActionsService {
  getActionName(action: ICurrentAction): string | undefined {
    switch (action) {
      case PluginAction.Add: {
        return "add";
      }
      case PluginAction.View: {
        return "view";
      }
      case PluginAction.Aspects: {
        return "aspects";
      }
      case PluginAction.AddAspect: {
        return "add aspect";
      }
      case PluginAction.AddLink: {
        return "add link";
      }

      // WORK: will I be used anywhere at all?
      case PluginAction.AddLinkedEntity: {
        return "add linked entity";
      }

      // WORK: will I be used anywhere at all?
      case PluginAction.DelegateMainView: {
        return "delegate main view";
      }
      default: {
        return action;
      }
    }
  }
}

export const pluginActionsService = new PluginActionsService();
export default pluginActionsService;
