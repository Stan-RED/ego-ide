import React, { Component } from "react";

import "./Aspect.css";

export interface IAspect {
  name: string;
  value: React.ReactNode;
}

export default class Aspect extends Component<IAspect> {
  render() {
    return (
      <div className="app-aspect">
        <span className="app-aspect-name">{this.props.name}</span>
        <div className="app-aspect-value">{this.props.value}</div>
      </div>
    );
  }
}
