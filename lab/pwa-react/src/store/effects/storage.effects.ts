import { IDictionary } from "@ide/core";
import { ID } from "@ide/mesh";
import { idService, IQueryPayload, IStorage } from "@lab/api-server";
import { head } from "lodash";

import ApiService from "../../_shared/services/ApiService";
import * as fromStorageAction from "../actions/storage.action";
import { IApplicationState } from "../reducers/index";
import { selectAspectsForEntity, selectStorage } from "../selectors";

export interface IReadEntitiesWithAspects {
  aspects: string[];
  forId?: ID;
}
export interface IReadEntitiesByAspectsPayload
  extends IReadEntitiesWithAspects {
  aggregates?: IDictionary<{}>;
}

// WORK: Same interface for storage actions? move addOne method in there?
export interface IStorageManager {
  addOne(
    payload: IQueryPayload
  ): (dispatch: any, getState: () => IApplicationState) => ID;

  readEntities(
    ids: ID[]
  ): (dispatch: any, getState: () => IApplicationState) => Promise<IStorage>;

  readEntitiesWithAspects(
    payload: IReadEntitiesWithAspects[]
  ): (dispatch: any, getState: () => IApplicationState) => Promise<IStorage>;

  readEntitiesWithAspectsCount(
    payload: IReadEntitiesWithAspects[]
  ): (dispatch: any, getState: () => IApplicationState) => Promise<number[]>;

  readChildrenForEntities(
    ids: ID[]
  ): (dispatch: any, getState: () => IApplicationState) => Promise<IStorage>;

  readLinksForId(
    id: ID,
    aspects: string[]
  ): (
    dispatch: any,
    getState: () => IApplicationState
  ) => Promise<IStorage | void>;

  readParentForEntity(
    id: ID
  ): (
    dispatch: any,
    getState: () => IApplicationState
  ) => Promise<ID | undefined>;

  readAllParentsForEntity(
    id: ID
  ): (dispatch: any, getState: () => IApplicationState) => Promise<ID[]>;
}

export class StorageManager implements IStorageManager {
  addOne(
    payload: IQueryPayload
  ): (dispatch: any, getState: () => IApplicationState) => ID {
    return (dispatch: any, getState: () => IApplicationState): ID => {
      const storage = selectStorage(getState());
      const localId = idService.getNewLocalId(storage);

      dispatch({ ...new fromStorageAction.Merge({ [localId]: payload }) });

      return localId;
    };
  }

  readEntities(
    ids: ID[]
  ): (dispatch: any, getState: () => IApplicationState) => Promise<IStorage> {
    return (
      dispatch: any,
      getState: () => IApplicationState
    ): Promise<IStorage> => {
      // WORK: Do not load in case already loaded.
      // const state = getState();
      // if(state.storage.storage[ids])

      dispatch({ ...new fromStorageAction.Read() });
      return ApiService.read(ids.map(id => ({ id })))
        .then(res => {
          // WORK: Too many .reduce - alike same functions in this file. Make some helper?
          const response: IStorage = res.reduce((a, b) => ({ ...a, ...b }), {});
          dispatch({
            ...new fromStorageAction.ReadSuccess(response)
          });

          return response;
        })
        .catch(e => dispatch({ ...new fromStorageAction.ReadFail(e) }));
    };
  }

  readEntitiesWithAspects(
    payload: IReadEntitiesWithAspects[]
  ): (dispatch: any, getState: () => IApplicationState) => Promise<IStorage> {
    return (dispatch: any): Promise<IStorage> => {
      return this.readEntitiesByAspects(payload)(dispatch).then(res =>
        res.reduce((a, b) => ({ ...a, ...b }), {})
      );
    };
  }

  readEntitiesWithAspectsCount(
    payload: IReadEntitiesWithAspects[]
  ): (dispatch: any, getState: () => IApplicationState) => Promise<number[]> {
    return (dispatch: any): Promise<number[]> => {
      return this.readEntitiesByAspects(
        payload.map(x => ({ ...x, aggregates: { "@count": {} } }))
      )(dispatch).then(x => {
        return x.map(res => (res["@count"].value as unknown) as number);
      });
    };
  }

  // WORK: Reuse private method of current class for this sh*t.
  // WORK: Make me readChildrenForEntity. And fix other methods working with a bunch of ids without any reason.
  readChildrenForEntities(
    ids: ID[]
  ): (dispatch: any, getState: () => IApplicationState) => Promise<IStorage> {
    return (dispatch: any): Promise<IStorage> => {
      dispatch({ ...new fromStorageAction.Read() });
      return ApiService.read(ids.map(id => ({ part: { of: id } })))
        .then(res => {
          const response = res.reduce((a, b) => ({ ...a, ...b }), {});
          dispatch({
            ...new fromStorageAction.ReadSuccess(response)
          });
          return response;
        })
        .catch(e => dispatch({ ...new fromStorageAction.ReadFail(e) }));
    };
  }

  // WORK: rename me to indicate possibility of passing aspects? Or make aspects optional?
  readLinksForId(
    id: ID,
    aspects: string[]
  ): (
    dispatch: any,
    getState: () => IApplicationState
  ) => Promise<IStorage | undefined> {
    return (dispatch: any): Promise<IStorage | undefined> => {
      dispatch({ ...new fromStorageAction.Read() });

      return dispatch(this.readEntitiesByAspects([{ aspects, forId: id }]))
        .then((children: [IStorage]) => {
          if (
            children &&
            head(children) &&
            Object.keys(head(children)!).length
          ) {
            return dispatch(
              this.readEntities(
                Object.keys(head(children)!).map(
                  x => head(children)![x].point.to
                )
              )
            )
              .then((entities: IStorage) => {
                return entities;
              })
              .catch((e: any) =>
                dispatch({ ...new fromStorageAction.ReadFail(e) })
              );
          }
        })
        .catch((e: any) => dispatch({ ...new fromStorageAction.ReadFail(e) }));
    };
  }

  readParentForEntity(
    id: ID
  ): (
    dispatch: any,
    getState: () => IApplicationState
  ) => Promise<ID | undefined> {
    return (
      dispatch: any,
      getState: () => IApplicationState
    ): Promise<ID | undefined> => {
      dispatch({ ...new fromStorageAction.Read() });

      return dispatch(this.readEntities([id]))
        .then((response: IStorage) => {
          const ids =
            response && Object.keys(response).length
              ? Object.keys(response)
              : undefined;

          // TODO: Can we be sure it's not undefined?
          if (
            ids &&
            "part" in response[head(ids)!] &&
            "of" in response[head(ids)!].part
          ) {
            const parentId = response[head(ids)!].part.of;
            dispatch({
              // TODO: Can we be sure it's not undefined?
              ...new fromStorageAction.ReadSuccess(response)
            });

            return parentId;
          } else {
            const currentAspects = selectAspectsForEntity(id)(getState());

            if (
              currentAspects &&
              "part" in currentAspects &&
              "of" in currentAspects.part
            ) {
              return currentAspects.part.of;
            } else {
              dispatch({
                ...new fromStorageAction.ReadFail(
                  `No "part" aspect for current entity.`
                )
              });
              return;
            }
          }
        })
        .catch((e: any) =>
          // WORK: Every err toString.
          dispatch({ ...new fromStorageAction.ReadFail(e + "") })
        );
    };
  }

  // WORK: Refactor.
  readAllParentsForEntity(
    id: ID
  ): (dispatch: any, getState: () => IApplicationState) => Promise<ID[]> {
    return async (dispatch: any): Promise<ID[]> => {
      return dispatch(this.readParentForEntity(id)).then(async (x: ID) => {
        const arr: ID[] = [];

        if (x) {
          arr.unshift(x);

          let parentId = x;
          while (parentId) {
            const tmp = parentId;
            parentId = await dispatch(this.readParentForEntity(tmp));

            if (parentId) {
              arr.unshift(parentId);
            }
          }
        }

        return arr;
      });
    };
  }

  private readEntitiesByAspects = (
    payload: IReadEntitiesByAspectsPayload[]
  ) => (dispatch: any): Promise<IStorage[]> => {
    dispatch({ ...new fromStorageAction.Read() });

    // WORK: Not to good approach.
    let atLeastOneQueryHasAspects = false;

    const getQuery = (query: IReadEntitiesByAspectsPayload): IQueryPayload => {
      if (query.aspects.length) {
        atLeastOneQueryHasAspects = true;
      }

      let readQuery = query.aspects.reduce((prev, curr) => {
        prev[curr] = {};
        return prev;
      }, {});

      if (query.forId !== undefined) {
        readQuery = {
          ...readQuery,
          part: { of: query.forId }
        };
      }

      if (query.aggregates) {
        readQuery = {
          ...readQuery,
          ...query.aggregates
        };
      }

      return readQuery;
    };

    return ApiService.read(payload.map(getQuery))
      .then(res => {
        dispatch(
          atLeastOneQueryHasAspects
            ? {
                ...new fromStorageAction.ReadSuccessNoLocalSync()
              }
            : {
                ...new fromStorageAction.ReadSuccess(
                  res.reduce((a, b) => ({ ...a, ...b }), {})
                )
              }
        );
        return res;
      })
      .catch(e => dispatch({ ...new fromStorageAction.ReadFail(e) }));
  };
}

export const storageManager = new StorageManager();
export default storageManager;
