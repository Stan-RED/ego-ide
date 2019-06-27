import {
  ICurrentAction,
  ICurrentPlugin
} from "src/store/reducers/core.reducer";

// WORK: Seems to have not a lot of models. Why?
export interface INavigationHistoryItem {
  plugin: ICurrentPlugin;
  action: ICurrentAction;
}
