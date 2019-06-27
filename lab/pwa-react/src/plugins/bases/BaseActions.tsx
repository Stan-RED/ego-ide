import { IDictionary } from "@ide/core";
import { ID } from "@ide/mesh";
import { IAspect, IQueryPayload } from "@lab/api-server";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  EnsureStash,
  IApplicationState,
  IAspectForIdPayload,
  SetCurrentFocus,
  UpdateAspectForId
} from "src/store";
import storageManager from "src/store/effects/storage.effects";
import { ICurrentAction } from "src/store/reducers/core.reducer";
import { selectFocus } from "src/store/selectors";
import PluginActions from "../components/PluginActions";
import { PluginAction } from "../models";

export interface IBaseActionsStateProps {
  focus: ID;
}

export interface IBaseActionsDispatchProps {
  add: (item: IQueryPayload) => ID;
  ensureStash: () => void;
  setFocus: (focus: ID) => void;
  updateAspectForId: (action: IAspectForIdPayload) => void;
}

export interface IBaseActionsProps
  extends IBaseActionsDispatchProps,
    IBaseActionsStateProps {}

export interface IBaseActions {
  actions: PluginAction[];
  addModel: IDictionary<IAspect>;
  addAspectModel: IAspect;
}

export abstract class BaseActions<T = {}>
  extends Component<IBaseActionsProps & T>
  implements IBaseActions {
  abstract actions: PluginAction[];
  //  = [
  //   PluginAction.Add,
  //   PluginAction.View,
  //   PluginAction.Aspects,
  //   PluginAction.AddAspect
  // ];

  // {
  //  name: {},
  //  part: {},
  //  text: {}
  // }
  abstract addModel: IDictionary<IAspect>;

  // { scope: {} }
  abstract addAspectModel: IAspect;

  constructor(props: IBaseActionsProps & T) {
    super(props);
  }

  add() {
    this.props.ensureStash();

    const id = this.props.add(this.addModel);
    this.props.setFocus(id);
  }

  addAspect() {
    this.props.ensureStash();

    this.props.updateAspectForId({
      aspect: this.addAspectModel,
      id: this.props.focus
    });
  }

  // tslint:disable-next-line:no-empty
  addLink() {}

  // addLinkedEntity() {
  //   this.props.ensureStash();

  //   const addLinkModel = { ...this.addModel };
  //   if ("part" in addLinkModel) {
  //     delete addLinkModel.part;
  //   }

  //   const id = this.props.add(addLinkModel);
  //   this.props.setFocus(id);
  // }

  handleOnAction = (action: ICurrentAction) => {
    switch (action) {
      case PluginAction.Add: {
        this.add();
        break;
      }

      case PluginAction.AddAspect: {
        this.addAspect();
        break;
      }

      case PluginAction.AddLink:
      case PluginAction.AddLinkedEntity: {
        this.addLink();
        break;
      }

      // case PluginAction.AddLinkedEntity: {
      //   this.addLinkedEntity();
      //   break;
      // }

      default: {
        return;
      }
    }
  };

  render() {
    return (
      <PluginActions actions={this.actions} onAction={this.handleOnAction} />
    );
  }
}

const mapStateToProps = (state: IApplicationState): IBaseActionsStateProps => ({
  focus: selectFocus(state)
});

const mapDispatchToProps = (dispatch: any): IBaseActionsDispatchProps => ({
  add: (item: IQueryPayload): ID => dispatch(storageManager.addOne(item)),
  ensureStash: () => dispatch({ ...new EnsureStash() }),
  setFocus: (focus: ID) => dispatch({ ...new SetCurrentFocus(focus) }),
  updateAspectForId: (action: IAspectForIdPayload) =>
    dispatch({ ...new UpdateAspectForId(action) })
});

// WORK: export const connectBaseActions = (component: ComponentClass or ComponentType) =>
export const connectBaseActions = (component: any) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
