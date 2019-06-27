import { ID } from '@ide/mesh';
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  IApplicationState,
  IAspectForIdPayload,
  UpdateAspectForId
} from "src/store";
import { selectFocus } from "src/store/selectors";
import { IBaseFormPartProps } from "../../bases/BaseFormPart";

export interface INameFormPartStateProps {
  focus: ID;
}

export interface INameFormPartDispatchProps {
  updateAspectForId: (action: IAspectForIdPayload) => void;
}

export interface INameFormPartProps
  extends IBaseFormPartProps,
    INameFormPartDispatchProps,
    INameFormPartStateProps {}

export class NameFormPart extends Component<
  INameFormPartProps,
  { name: string }
> {
  constructor(props: INameFormPartProps) {
    super(props);
    this.state = {
      name: ""
    };
  }
  componentDidMount() {
    if (this.props.aspectState && "name" in this.props.aspectState) {
      this.setState({ name: this.props.aspectState.name });
    }
  }
  handleChange = (event: any) => {
    this.setState({ name: event.target.value });
    this.props.updateAspectForId({
      aspect: { name: { name: event.target.value } },
      id: this.props.focus
    });
  };
  render() {
    return (
      <div>
        <label>
          Name:
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
            required={true}
          />
        </label>
      </div>
    );
  }
}

const mapStateToProps = (
  state: IApplicationState
): INameFormPartStateProps => ({
  focus: selectFocus(state)
});

const mapDispatchToProps = (dispatch: any): INameFormPartDispatchProps => ({
  updateAspectForId: (action: IAspectForIdPayload) =>
    dispatch({ ...new UpdateAspectForId(action) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameFormPart);
