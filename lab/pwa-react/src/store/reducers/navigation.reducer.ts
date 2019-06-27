import { INavigationHistoryItem } from 'src/models';
import { NavigationAction, NavigationActionTypes } from '../actions';

export interface INavigationState {
  history: INavigationHistoryItem[];
}

export const initialState: INavigationState = {
  history: []
};

export default function reducer(
  state = initialState,
  action: NavigationAction
): INavigationState {
  switch (action.type) {
    case NavigationActionTypes.PUSH_HISTORY_ITEM: {
      const history = state.history.slice();
      history.push(action.payload);
      return {
        ...state,
        history
      };
    }

    case NavigationActionTypes.POP_HISTORY_ITEM_BY: {
      const history = state.history.slice(
        0,
        state.history.length - action.payload
      );
      return {
        ...state,
        history
      };
    }

    default: {
      return state;
    }
  }
}

export const selectHistory = (state: INavigationState) => state.history;
