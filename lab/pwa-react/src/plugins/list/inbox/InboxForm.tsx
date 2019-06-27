// WORK: Remove me.
// import React, { Component } from "react";
// import { connect } from "react-redux";

// import { PluginAction } from "src/plugins/models";
// import { IInbox } from "../../../models";
// import { IApplicationState, SetCurrentAction, SetFocus } from "../../../store";
// import { addInboxes, loadInboxes } from "../../../store/effects";
// import {
//   selectAllInboxes,
//   selectCurrentUser,
//   selectFocus,
//   selectPrevFocus
// } from "../../../store/selectors";

// export interface IInboxFormStateProps {
//   focus: string | null;
//   prevFocus: string | undefined | null;
//   currentUser: string;
//   inboxes: IInbox[];
// }

// export interface IInboxFormDispatchProps {
//   addInboxes: (inboxes: IInbox[]) => void;
//   loadInboxes: () => void;
//   setFocus: (focus: string | null) => void;
//   setAction: (action: PluginAction | string | undefined) => void;
// }

// export interface IInboxFormProps
//   extends IInboxFormStateProps,
//     IInboxFormDispatchProps {}

// export class InboxForm extends Component<
//   IInboxFormProps,
//   { partOf: string | null }
// > {
//   constructor(props: IInboxFormProps) {
//     super(props);
//     this.state = {
//       partOf: this.props.currentUser
//     };
//   }

//   componentDidMount() {
//     this.props.setFocus(null);
//   }

//   handleChange = (event: any) => {
//     this.setState({ partOf: event.target.value });
//   };

//   handleSubmit = (event: any) => {
//     const id = `inbox-${this.props.inboxes.length}`;

//     if (this.state.partOf && this.props.prevFocus) {
//       this.props.addInboxes([
//         {
//           // TODO: not partOf but id
//           id,
//           of: this.state.partOf,
//           to: this.props.prevFocus
//         }
//       ]);

//       this.props.setFocus(id);
//       this.props.setAction(PluginAction.View);
//     }
//     event.preventDefault();
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Part of:
//           <input
//             type="text"
//             onChange={this.handleChange}
//             value={this.state.partOf ? this.state.partOf : ""}
//           />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch: any): IInboxFormDispatchProps => ({
//   addInboxes: (inboxes: IInbox[]) => dispatch(addInboxes(inboxes)),

//
//   loadInboxes: () => dispatch(loadInboxes()),

//   setAction: (action: PluginAction | string) =>
//     dispatch({ ...new SetCurrentAction(action) }),
//   setFocus: (focus: string) => dispatch({ ...new SetFocus(focus) })
// });

// export default connect(
//   (state: IApplicationState): IInboxFormStateProps => {
//     return {
//       currentUser: selectCurrentUser(state),
//       focus: selectFocus(state),
//       inboxes: selectAllInboxes(state),
//       prevFocus: selectPrevFocus(state)
//     };
//   },
//   mapDispatchToProps
// )(InboxForm);
