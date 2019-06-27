import { ID } from "@ide/mesh";

import { IAspectForIdPayload } from "src/store";
import { IPreviousFocus } from "src/store/reducers/core.reducer";
import { IBaseFormPartProps } from "../../bases/BaseFormPart";

export interface IPartOfServiceStateProps {
  focus: ID;
  prevFocus: IPreviousFocus;
}

export interface IPartOfServiceDispatchProps {
  readAllParentsForEntity: (id: ID) => Promise<ID[]>;
  updateAspectForId: (action: IAspectForIdPayload) => void;
}

export interface IPartOfServiceProps
  extends IBaseFormPartProps,
    IPartOfServiceStateProps,
    IPartOfServiceDispatchProps {}

export interface IPartOfService {
  //   props: IPartOfServiceProps;
  getState(props: IPartOfServiceProps): Promise<IPartOfServiceState>;
  setLocalAspectToDefault(
    props: IPartOfServiceProps,
    state: IPartOfServiceState
  ): void;
}

export interface IPartOfServiceState {
  partOfs: ID[];
  partOf: IPreviousFocus;
}

export class PartOfService implements IPartOfService {
  async getState(props: IPartOfServiceProps): Promise<IPartOfServiceState> {
    const state: IPartOfServiceState = {
      partOf: undefined,
      partOfs: []
    };

    if (props.aspectState && "of" in props.aspectState) {
      state.partOfs.push(props.aspectState.of);
    } else if (props.prevFocus) {
      state.partOf = props.prevFocus;

      await props.readAllParentsForEntity(props.prevFocus).then(ids => {
        state.partOfs.push(...ids.concat(props.prevFocus as ID));
      });
    }

    return state;
  }

  setLocalAspectToDefault(
    props: IPartOfServiceProps,
    state: IPartOfServiceState
  ): void {
    props.updateAspectForId({
      aspect: { part: { of: state.partOf } },
      id: props.focus
    });
  }
}
