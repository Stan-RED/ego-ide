import { ID } from "@ide/mesh";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  IApplicationState,
  IAspectForIdPayload,
  UpdateAspectForId
} from "src/store";
import storageManager from "src/store/effects/storage.effects";
import { selectFocus, selectPrevFocus } from "src/store/selectors";
import { IBaseFormPartProps } from "../../bases/BaseFormPart";
import { IPartOfServiceState, PartOfService } from "./PartService";
import {
  IPartOfService,
  IPartOfServiceDispatchProps,
  IPartOfServiceStateProps
} from "./PartService";

export interface IPartFormPartStateProps extends IPartOfServiceStateProps {
  focus: ID;
  // prevFocus: IPreviousFocus;
}
export interface IPartFormPartDispatchProps
  extends IPartOfServiceDispatchProps {
  // readAllParentsForEntity: (id: ID) => Promise<ID[]>;
  updateAspectForId: (action: IAspectForIdPayload) => void;
}

export interface IPartFormPartProps
  extends IBaseFormPartProps,
    IPartFormPartStateProps,
    IPartFormPartDispatchProps {}

// tslint:disable-next-line:no-empty-interface
export interface IPartFormPartState extends IPartOfServiceState {}

export class PartFormPart extends Component<
  IPartFormPartProps,
  IPartFormPartState
> {
  constructor(props: IPartFormPartProps, private partOf: IPartOfService) {
    super(props);
    this.partOf = new PartOfService();
    this.state = {
      partOf: undefined,
      partOfs: []
    };
  }

  async componentDidMount() {
    const state = await this.partOf.getState(this.props);
    this.setState(state);
    this.partOf.setLocalAspectToDefault(this.props, state);
    // if (this.props.aspectState && "of" in this.props.aspectState) {
    //   this.setState({ partOfs: [this.props.aspectState.of] });
    // } else if (this.props.prevFocus) {
    //   this.props.readAllParentsForEntity(this.props.prevFocus).then(ids => {
    //     this.setState({ partOfs: ids.concat(this.props.prevFocus as ID) });
    //   });

    //   this.setState({ partOf: this.props.prevFocus });
    //   this.props.updateAspectForId({
    //     aspect: { part: { of: this.props.prevFocus } },
    //     id: this.props.focus
    //   });
    // }
  }

  handleChange = (event: any) => {
    this.setState({ partOf: event.target.value });
    this.props.updateAspectForId({
      aspect: { part: { of: event.target.value } },
      id: this.props.focus
    });
  };

  render() {
    return (
      <div>
        <label>
          Part of:
          <select onChange={this.handleChange} value={this.state.partOf}>
            {this.state.partOfs
              ? this.state.partOfs.map((partOf, i) =>
                  partOf ? (
                    <option key={i} value={partOf}>
                      {partOf}
                    </option>
                  ) : (
                    ""
                  )
                )
              : ""}
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (
  state: IApplicationState
): IPartFormPartStateProps => ({
  focus: selectFocus(state),
  prevFocus: selectPrevFocus(state)
});

const mapDispatchToProps = (dispatch: any): IPartFormPartDispatchProps => ({
  readAllParentsForEntity: (id: ID) =>
    dispatch(storageManager.readAllParentsForEntity(id)),
  updateAspectForId: (action: IAspectForIdPayload) =>
    dispatch({ ...new UpdateAspectForId(action) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartFormPart);
