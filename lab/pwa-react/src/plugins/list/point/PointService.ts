import { ID } from "@ide/mesh";
import { idService, IStorage } from "@lab/api-server";
import { head } from "lodash";

import { IAspectForIdPayload } from "src/store";
import { IPreviousFocus } from "src/store/reducers/core.reducer";
import { IBaseFormPartProps } from "../../bases/BaseFormPart";

export interface IPointToServiceStateProps {
  focus: ID;
  prevFocus: IPreviousFocus;
  storage: IStorage;
}

export interface IPointToServiceDispatchProps {
  readAllParentsForEntity: (id: ID) => Promise<ID[]>;
  updateAspectForId: (action: IAspectForIdPayload) => void;
}

export interface IPointToServiceProps
  extends IBaseFormPartProps,
    IPointToServiceStateProps,
    IPointToServiceDispatchProps {}

// WORK: I'm similar to IPartOfService
export interface IPointToService {
  getState(props: IPointToServiceProps): Promise<IPointToServiceState>;
  setLocalAspectToDefault(
    props: IPointToServiceProps,
    state: IPointToServiceState
  ): void;
}

export interface IPointToServiceState {
  pointTos: ID[];
  pointTo: IPreviousFocus;
}

export class PointToService implements IPointToService {
  async getState(props: IPointToServiceProps): Promise<IPointToServiceState> {
    const state: IPointToServiceState = {
      pointTo: undefined,
      pointTos: []
    };

    if (props.aspectState && "to" in props.aspectState) {
      state.pointTos.push(props.aspectState.to);
    } else {
      state.pointTos.push(idService.getNewLocalId(props.storage));

      if (props.prevFocus) {
        state.pointTos.push(props.prevFocus);

        await props.readAllParentsForEntity(props.prevFocus).then(ids => {
          state.pointTos.push(...ids);
        });
      }
    }

    state.pointTo = head(state.pointTos);

    return state;
  }

  setLocalAspectToDefault(
    props: IPointToServiceProps,
    state: IPointToServiceState
  ): void {
    props.updateAspectForId({
      aspect: { point: { to: state.pointTo } },
      id: props.focus
    });
  }
}
