import { ID } from "@ide/mesh";
import { Action } from "redux";

import { ICurrentAction, ICurrentPlugin } from "../reducers/core.reducer";

export enum CoreActionTypes {
  // Changes focus, saving previous focus in prevFocus field.
  SET_CURRENT_FOCUS = "ICoreState.setCurrentFocus",

  // Substitutes focus without changing prevFocus.
  SUBSTITUTE_CURRENT_FOCUS = "ICoreState.substituteCurrentFocus",

  SET_CURRENT_USER = "ICoreState.setCurrentUser",
  SET_CURRENT_ACTION = "ICoreState.setCurrentAction",
  SET_CURRENT_PLUGIN = "ICoreState.setCurrentPlugin"
}

// tslint:disable:max-classes-per-file
export class SetCurrentFocus implements Action {
  readonly type = CoreActionTypes.SET_CURRENT_FOCUS;

  constructor(public payload: ID) {}
}

export class SubstituteCurrentFocus implements Action {
  readonly type = CoreActionTypes.SUBSTITUTE_CURRENT_FOCUS;

  constructor(public payload: ID) {}
}

export class SetCurrentUser implements Action {
  readonly type = CoreActionTypes.SET_CURRENT_USER;

  constructor(public payload: ID) {}
}

export class SetCurrentAction implements Action {
  readonly type = CoreActionTypes.SET_CURRENT_ACTION;

  constructor(public payload: ICurrentAction) {}
}

export class SetCurrentPlugin implements Action {
  readonly type = CoreActionTypes.SET_CURRENT_PLUGIN;

  constructor(public payload: ICurrentPlugin) {}
}

export type CoreAction =
  | SetCurrentFocus
  | SubstituteCurrentFocus
  | SetCurrentUser
  | SetCurrentAction
  | SetCurrentPlugin;
