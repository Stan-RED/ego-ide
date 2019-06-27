import { ID } from "@ide/mesh";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  IApplicationState,
  IAspectForIdPayload,
  UpdateAspectForId
} from "src/store";
import { selectFocus } from "src/store/selectors";
import { IBaseFormPartProps } from "../../bases/BaseFormPart";

export interface ITextFormPartStateProps {
  focus: ID;
}

export interface ITextFormPartDispatchProps {
  updateAspectForId: (action: IAspectForIdPayload) => void;
}

export interface ITextFormPartProps
  extends IBaseFormPartProps,
    ITextFormPartDispatchProps,
    ITextFormPartStateProps {}

export class TextFormPart extends Component<
  ITextFormPartProps,
  { content: string }
> {
  constructor(props: ITextFormPartProps) {
    super(props);
    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    if (this.props.aspectState && "content" in this.props.aspectState) {
      this.setState({ content: this.props.aspectState.content });
    }
  }

  handleChange = (event: any) => {
    this.setState({ content: event.target.value });
    this.props.updateAspectForId({
      aspect: { text: { content: event.target.value } },
      id: this.props.focus
    });
  };

  render() {
    return (
      <div>
        <label>
          Text:
          <textarea onChange={this.handleChange} value={this.state.content} />
        </label>
      </div>
    );
  }
}

const mapStateToProps = (
  state: IApplicationState
): ITextFormPartStateProps => ({
  focus: selectFocus(state)
});

const mapDispatchToProps = (dispatch: any): ITextFormPartDispatchProps => ({
  updateAspectForId: (action: IAspectForIdPayload) =>
    dispatch({ ...new UpdateAspectForId(action) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextFormPart);
