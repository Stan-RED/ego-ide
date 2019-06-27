import { IDictionary } from "@ide/core";
import { ID } from "@ide/mesh";
import { IAspect, IStorage } from "@lab/api-server";
import React, { Component } from "react";
import { connect } from "react-redux";

import EntityAspects from "src/plugins/components/EntityAspects";
import { IApplicationState } from "src/store";
import storageManager from "src/store/effects/storage.effects";
import { selectAspectsForEntity, selectFocus } from "../../store/selectors";

export interface IEntityStateProps {
  focus: ID;
  selectAspectsForEntity: (id: ID) => IDictionary<IAspect>;
}

export interface IEntityDispatchProps {
  readEntities: (ids: ID[]) => Promise<IStorage>;
}

export interface IEntityProps extends IEntityStateProps, IEntityDispatchProps {}

export class Entity extends Component<IEntityProps> {
  componentDidMount() {
    this.props.readEntities([this.props.focus]);
  }

  componentDidUpdate(prevProps: Readonly<IEntityProps>) {
    if (this.props.focus !== prevProps.focus) {
      this.props.readEntities([this.props.focus]);
    }
  }

  render() {
    return (
      <EntityAspects
        aspects={this.props.selectAspectsForEntity(this.props.focus)}
      />
    );
  }
}

const mapStateToProps = (state: IApplicationState): IEntityStateProps => ({
  focus: selectFocus(state),
  selectAspectsForEntity: (id: ID) => selectAspectsForEntity(id)(state)
});

const mapDispatchToProps = (dispatch: any): IEntityDispatchProps => ({
  readEntities: (ids: ID[]) => dispatch(storageManager.readEntities(ids))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entity);
