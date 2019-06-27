import { IStorage } from "@lab/api-server";
import { cloneDeep } from "lodash";

import { StorageAction, StorageActionTypes } from "../actions";

export interface IStorageState {
  error: any;
  loaded: boolean;
  loading: boolean;
  stash: IStorage | undefined;
  storage: IStorage;
}

export const initialState: IStorageState = {
  error: undefined,
  loaded: false,
  loading: false,
  stash: undefined,
  storage: {}
};

export default function reducer(
  state = initialState,
  action: StorageAction
): IStorageState {
  switch (action.type) {
    case StorageActionTypes.MERGE: {
      // WORK: Do we need deepMerge for updates of aspects? Or no?
      Object.keys(action.payload).forEach(id => {
        if (id in state.storage) {
          throw new Error(
            `An attempt to add new entity with id ${id}. Storage already contains an entity with this id.`
          );
        }
      });
      return {
        ...state,
        storage: {
          ...state.storage,
          ...action.payload
        }
      };
    }

    case StorageActionTypes.READ: {
      return {
        ...state,
        loading: true
      };
    }

    case StorageActionTypes.READ_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case StorageActionTypes.READ_SUCCESS_NO_LOCAL_SYNC: {
      return {
        ...state,
        error: undefined,
        loaded: true,
        loading: false
      };
    }

    case StorageActionTypes.READ_SUCCESS: {
      return {
        ...state,
        error: undefined,
        loaded: true,
        loading: false,
        storage: {
          ...state.storage,
          ...action.payload
        }
      };
    }

    case StorageActionTypes.UPDATE_ASPECT_FOR_ID: {
      const storage = { ...state.storage };
      const id = action.payload.id;

      storage[id] = {
        ...storage[id],
        ...action.payload.aspect
      };

      return {
        ...state,
        storage
      };
    }

    // case StorageActionTypes.PROCESS_TRANSACTION: {
    //   const storage = { ...state.storage };

    //   action.payload.forEach(payload => {
    //     if (!payload.id) {
    //       throw new Error(
    //         `Trying to update storage with payload without an id ${JSON.stringify(
    //           payload
    //         )}`
    //       );
    //     }

    //     if (payload.id in storage) {
    //       // We are updating existing entity:
    //       storage[payload.id] = {
    //         ...storage[payload.id],
    //         ...new StorageItem(payload).getAspects()
    //       };
    //     } else {
    //       // We are creating an entity.
    //       storage[payload.id] = new StorageItem(payload).getAspects();
    //     }
    //     // WORK: how to handle deletion? React to just empty aspects passed?
    //   });

    //   return {
    //     ...state,
    //     storage
    //   };
    // }

    case StorageActionTypes.CHANGE_ID: {
      const storage = { ...state.storage };

      if (action.payload.to && action.payload.from in storage) {
        storage[action.payload.to] = storage[action.payload.from];
        delete storage[action.payload.from];
      }

      return {
        ...state,
        storage
      };
    }

    case StorageActionTypes.ENSURE_STASH: {
      if (!state.stash) {
        // TODO: Might be time-consuming.
        const stash = cloneDeep(state.storage);

        return {
          ...state,
          stash
        };
      }

      return state;
    }

    case StorageActionTypes.APPLY_STASH: {
      let storage = state.storage;

      if (state.stash) {
        storage = state.stash;
      }

      return {
        ...state,
        stash: undefined,
        storage
      };
    }

    case StorageActionTypes.DROP_STASH: {
      return {
        ...state,
        stash: undefined
      };
    }

    default: {
      return state;
    }
  }
}

export const selectError = (state: IStorageState) => state.error;
export const selectLoaded = (state: IStorageState) => state.loaded;
export const selectLoading = (state: IStorageState) => state.loading;
export const selectStorage = (state: IStorageState) => state.storage;
