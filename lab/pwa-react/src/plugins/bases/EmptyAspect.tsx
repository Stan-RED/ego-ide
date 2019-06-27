import React, { Component } from "react";
import "./EmptyAspect.css";

export interface IEmptyAspectProps {
  aspectName: string;
}

export default class EmptyAspect extends Component<IEmptyAspectProps> {
  render() {
    return <div className="app-tag">{this.props.aspectName}</div>;
  }
}
