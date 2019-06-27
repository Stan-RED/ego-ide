import React, { Component } from "react";

export interface IFocusProperties {
  label: string;
}

export default class Focus extends Component<IFocusProperties> {
  render() {
    return (
      <React.Fragment>
        {/** aria-label used in e2e tests to detect current focus. */}
        Focus is <span aria-label="focus">{this.props.label}</span>
      </React.Fragment>
    );
  }
}
