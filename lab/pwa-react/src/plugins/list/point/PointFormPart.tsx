import { ID } from "@ide/mesh";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  IApplicationState,
  IAspectForIdPayload,
  UpdateAspectForId
} from "src/store";
import storageManager from "src/store/effects/storage.effects";
import {
  selectFocus,
  selectPrevFocus,
  selectStorage
} from "src/store/selectors";
import { IBaseFormPartProps } from "../../bases/BaseFormPart";
import {
  IPointToService,
  IPointToServiceDispatchProps,
  IPointToServiceState,
  IPointToServiceStateProps,
  PointToService
} from "./PointService";

export interface IPointFormPartStateProps extends IPointToServiceStateProps {
  focus: ID;
  // prevFocus: IPreviousFocus;
  // storage: IStorage;
}
export interface IPointFormPartDispatchProps
  extends IPointToServiceDispatchProps {
  // readAllParentsForEntity: (id: ID) => Promise<ID[]>;
  updateAspectForId: (action: IAspectForIdPayload) => void;
}

export interface IPointFormPartProps
  extends IBaseFormPartProps,
    IPointFormPartStateProps,
    IPointFormPartDispatchProps {}

// tslint:disable-next-line:no-empty-interface
export interface IPointFormPartState extends IPointToServiceState {}

export class PointFormPart extends Component<
  IPointFormPartProps,
  IPointFormPartState
> {
  constructor(props: IPointFormPartProps, private pointTo: IPointToService) {
    super(props);
    this.pointTo = new PointToService();
    this.state = {
      pointTo: undefined,
      pointTos: []
    };
  }

  async componentDidMount() {
    const state = await this.pointTo.getState(this.props);
    // tslint:disable-next-line:no-console
    console.log("got state!");
    this.setState(state);
    this.pointTo.setLocalAspectToDefault(this.props, state);
    // tslint:disable-next-line:no-console
    console.log("got state2");
  }

  componentWillUnmount() {
    // tslint:disable-next-line:no-console
    console.log("will unmount");
  }

  handleChange = (event: any) => {
    this.setState({ pointTo: event.target.value });
    this.props.updateAspectForId({
      aspect: { point: { to: event.target.value } },
      id: this.props.focus
    });
  };

  render() {
    return (
      <div>
        <label>
          Point to:
          <select onChange={this.handleChange} value={this.state.pointTo}>
            {this.state.pointTos
              ? this.state.pointTos.map((pointTo, i) =>
                  pointTo ? (
                    <option key={i} value={pointTo}>
                      {pointTo}
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
): IPointFormPartStateProps => ({
  focus: selectFocus(state),
  prevFocus: selectPrevFocus(state),
  storage: selectStorage(state)
});

const mapDispatchToProps = (dispatch: any): IPointFormPartDispatchProps => ({
  readAllParentsForEntity: (id: ID) =>
    dispatch(storageManager.readAllParentsForEntity(id)),
  updateAspectForId: (action: IAspectForIdPayload) =>
    dispatch({ ...new UpdateAspectForId(action) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointFormPart);
