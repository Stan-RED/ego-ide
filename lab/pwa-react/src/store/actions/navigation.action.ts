import { Action } from "redux";

import { INavigationHistoryItem } from "src/models";

export enum NavigationActionTypes {
  PUSH_HISTORY_ITEM = "INavigationState.pushHistoryItem",
  POP_HISTORY_ITEM_BY = "INavigationState.popHistoryItemBy"
}

// tslint:disable:max-classes-per-file
export class PushHistoryItem implements Action {
  readonly type = NavigationActionTypes.PUSH_HISTORY_ITEM;

  constructor(public payload: INavigationHistoryItem) {}
}

export class PopHistoryItemBy implements Action {
  readonly type = NavigationActionTypes.POP_HISTORY_ITEM_BY;

  constructor(public payload: number) {}
}

export type NavigationAction = PushHistoryItem | PopHistoryItemBy;
