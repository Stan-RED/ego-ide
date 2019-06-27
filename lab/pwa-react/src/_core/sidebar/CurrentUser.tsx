import { ID } from "@ide/mesh";
import React, { Component } from "react";

export interface ICurrentUserProperties {
  label: ID;
  userClick: (label: ID) => void;
}

export default class CurrentUser extends Component<ICurrentUserProperties> {
  handleUserClick = () => {
    this.props.userClick(this.props.label);
  };

  render() {
    return (
      <React.Fragment>
        Current user is{" "}
        <span
          onClick={this.handleUserClick}
          style={{ textDecoration: "underline" }}
        >
          {this.props.label}
        </span>
      </React.Fragment>
    );
  }
}
