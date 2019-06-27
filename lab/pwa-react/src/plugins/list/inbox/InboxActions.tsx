import { IDictionary } from "@ide/core";
import { ID } from "@ide/mesh";
import { IAspect, IQueryPayload } from "@lab/api-server";
import { connect } from "react-redux";

import {
  BaseActions,
  connectBaseActions,
  IBaseActionsProps
} from "src/plugins/bases/BaseActions";
import { PluginAction } from "src/plugins/models";
import {
  IApplicationState,
  IAspectForIdPayload,
  SetCurrentAction,
  UpdateAspectForId
} from "src/store";
import transactionManager from "src/store/effects/transaction.effects";
import {
  ICurrentAction,
  IPreviousFocus
} from "src/store/reducers/core.reducer";
import {
  selectAspectsForEntity,
  selectFocus,
  selectPrevFocus,
  selectStorage
} from "src/store/selectors";
import {
  IPartOfService,
  IPartOfServiceDispatchProps,
  IPartOfServiceStateProps,
  PartOfService
} from "../part/PartService";

import storageManager from "src/store/effects/storage.effects";
import {
  IPointToService,
  IPointToServiceDispatchProps,
  IPointToServiceStateProps,
  PointToService
} from "../point/PointService";

// tslint:disable-next-line:no-empty-interface
export interface IInboxActionsStateProps
  extends IPartOfServiceStateProps,
    IPointToServiceStateProps {
  // currentAction: ICurrentAction;
  // currentPlugin: ICurrentPlugin;
  prevFocus: IPreviousFocus;
  selectAspectsForEntity: (id: ID) => IDictionary<IAspect>;
}

export interface IInboxActionsDispatchProps
  extends IPartOfServiceDispatchProps,
    IPointToServiceDispatchProps {
  setCurrentAction: (action: ICurrentAction) => void;
  transactionDo: (transaction: IQueryPayload) => void;
  updateAspectForId: (action: IAspectForIdPayload) => void;
}

export interface IInboxActionsProps
  extends IInboxActionsStateProps,
    IInboxActionsDispatchProps {}

// WORK:
export class InboxActions extends BaseActions<IInboxActionsProps> {
  actions = [
    // PluginAction.Aspects,
    PluginAction.AddLink
  ];

  addModel = {
    inbox: {},
    part: {},
    point: {}
  };

  // WORK: I'll be unused. Set me just to empty object?
  addAspectModel = { inbox: {} };

  constructor(
    props: IBaseActionsProps & IInboxActionsProps,
    private partOf: IPartOfService,
    private pointTo: IPointToService
  ) {
    super(props);

    this.partOf = new PartOfService();
    this.pointTo = new PointToService();
  }

  componentDidMount() {
    this.props.setCurrentAction(PluginAction.DelegateMainView);
  }

  // async componentDidUpdate(prevProps: IInboxActionsProps) {
  //   // if (prevProps.prevFocus !== this.props.prevFocus) {
  //   //   // tslint:disable-next-line:no-console
  //   //   console.log("props", this.props);
  //   //   const partOfState = await this.partOf.getState(this.props);
  //   //   const pointToState = await this.pointTo.getState(this.props);
  //   //   // const partOfDefault = this.partOf.setLocalAspectToDefault(partOfState);
  //   //   // tslint:disable-next-line:no-console
  //   //   console.log("inboxActions", partOfState, pointToState);
  //   //   // console.log(his.props.focus);
  //   // }
  // }

  // add() {
  //   this.props.ensureStash();

  //   const id = this.props.add(this.addModel);
  //   this.props.setFocus(id);
  // }

  // WORK: Move my functionality to base class.
  addLink() {
    this.props.ensureStash();

    // tslint:disable-next-line:no-console
    console.log(this.props.prevFocus, this.props.focus);

    const id = this.props.add(this.addModel);
    this.props.setFocus(id);

    // WORK: I do not like this setTimeout, but it is required to properly detect newly set focus and prevFocus.
    setTimeout(async () => {
      const partOfState = await this.partOf.getState(this.props);
      const pointToState = await this.pointTo.getState(this.props);
      this.props.updateAspectForId({
        aspect: {
          part: { of: partOfState.partOf },
          point: { to: pointToState.pointTo }
        },
        id: this.props.focus
      });

      this.props.transactionDo({
        ...this.props.selectAspectsForEntity(this.props.focus),
        id: this.props.focus
      });
    });
  }
}

// export default connectBaseActions(InboxActions);
const mapStateToProps = (
  state: IApplicationState
): IInboxActionsStateProps => ({
  focus: selectFocus(state),
  prevFocus: selectPrevFocus(state),
  selectAspectsForEntity: (id: ID) => selectAspectsForEntity(id)(state),
  storage: selectStorage(state)
});

const mapDispatchToProps = (dispatch: any): IInboxActionsDispatchProps => ({
  readAllParentsForEntity: (id: ID) =>
    dispatch(storageManager.readAllParentsForEntity(id)),
  setCurrentAction: (action: ICurrentAction) =>
    dispatch({ ...new SetCurrentAction(action) }),
  transactionDo: (transaction: IQueryPayload) =>
    dispatch(transactionManager.do(transaction)),
  updateAspectForId: (action: IAspectForIdPayload) =>
    dispatch({ ...new UpdateAspectForId(action) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectBaseActions(InboxActions));
