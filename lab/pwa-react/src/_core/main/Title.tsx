import React, { Component } from "react";

export interface ITitleProperties {
  label: string;
}

// WORK: Delme?? Or rename to currentId?
export default class Title extends Component<ITitleProperties> {
  render() {
    return (
      <div style={{ fontSize: "smaller", textAlign: "right" }}>
        Current focus id is{" "}
        <span style={{ fontWeight: 700 }}>{this.props.label}</span>
      </div>
    );
  }
}
