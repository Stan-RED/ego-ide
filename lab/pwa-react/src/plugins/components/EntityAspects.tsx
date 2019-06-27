import { IDictionary } from "@ide/core";
import { IAspect } from "@lab/api-server";
import React, { Component } from "react";

export default class EntityAspects extends Component<{
  aspects: IDictionary<IAspect>;
}> {
  render() {
    return this.props.aspects ? (
      <div>
        {Object.keys(this.props.aspects).map((aspectName, i) => {
          return (
            <div key={i}>
              <h3>{aspectName}</h3>
              {Object.keys(this.props.aspects[aspectName]).map(
                (aspectProperty, aspectPropertyKey) => {
                  return (
                    <div key={aspectPropertyKey}>
                      <strong>{aspectProperty}</strong>:{" "}
                      {this.props.aspects[aspectName][aspectProperty]}
                    </div>
                  );
                }
              )}
            </div>
          );
        })}
      </div>
    ) : (
      <div>No aspects provided.</div>
    );
  }
}
