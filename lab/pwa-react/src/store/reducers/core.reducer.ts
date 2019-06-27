import { ID } from "@ide/mesh";

import { PluginAction } from "../../plugins/models";
import { CoreAction, CoreActionTypes } from "../actions";

export type ICurrentAction = PluginAction | string | undefined;
export type ICurrentPlugin = string | undefined;
export type IPreviousFocus = string | undefined;

export interface ICoreState {
  action: ICurrentAction;
  currentUser: ID;
  focus: ID;
  prevFocus: IPreviousFocus;
  plugin: ICurrentPlugin;
}

export const initialState: ICoreState = {
  action: PluginAction.Aspects,
  currentUser: "Stan",
  focus: "Stan",
  plugin: undefined,
  prevFocus: undefined
};

export default function reducer(
  state = initialState,
  action: CoreAction
): ICoreState {
  switch (action.type) {
    case CoreActionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload
      };
    }

    case CoreActionTypes.SET_CURRENT_FOCUS: {
      const prevFocus = state.focus;
      return {
        ...state,
        focus: action.payload,
        prevFocus
      };
    }

    case CoreActionTypes.SUBSTITUTE_CURRENT_FOCUS: {
      return {
        ...state,
        focus: action.payload
      };
    }

    case CoreActionTypes.SET_CURRENT_ACTION: {
      return {
        ...state,
        action: action.payload
      };
    }

    case CoreActionTypes.SET_CURRENT_PLUGIN: {
      return {
        ...state,
        plugin: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const selectFocus = (state: ICoreState) => state.focus;
export const selectPrevFocus = (state: ICoreState) => state.prevFocus;
export const selectCurrentUser = (state: ICoreState) => state.currentUser;
export const selectCurrentAction = (state: ICoreState) => state.action;
export const selectCurrentPlugin = (state: ICoreState) => state.plugin;
