import { IAspect } from "@lab/api-server";

import { ICurrentAction } from "../../store/reducers/core.reducer";

export enum PluginAction {
  Add,
  View,
  Aspects,

  // WORK: On AddAspect - ensure we are taking in account already existing same aspect value (so the action will become addOrEditAspect).
  AddAspect,
  AddLink,
  AddLinkedEntity,

  // Indicates that the main view rendering has to be handled by only one plugin, not by aspects plugins.
  DelegateMainView
}

/**
 * The Plugin has to provide ability to call components for main PluginActions
 * And for own custom actions.
 */
export interface IPlugin {
  // Do we need it at all?
  // id: string;

  getActionsComponent(): React.ReactNode;

  getNavigationComponent(focusIndependentMode: boolean): React.ReactNode;

  // In case focus has changed by PluginAction - we have to have the ability to view previous focus.
  getComponent(action: ICurrentAction, aspectState?: IAspect): React.ReactNode;
}

export interface IPluginService {
  get(id: string): IPlugin;
}

// export class NavigationComponent<P = {}, S = {}> extends Component<P & INavigationComponentProperties, S> {
// }
