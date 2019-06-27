// WORK: Remove me.
// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { IAspectForIdPayload, UpdateAspectForId } from "src/store";
// import { IBaseFormPartProps } from "../../bases/BaseFormPart";

// export interface IInboxFormPartDispatchProps {
//   updateAspectForId: (action: IAspectForIdPayload) => void;
// }

// export interface IInboxFormPartProps
//   extends IBaseFormPartProps,
//     IInboxFormPartDispatchProps {}

// export class InboxFormPart extends Component<
//   IInboxFormPartProps,
//   { name: string }
// > {
//   constructor(props: INameFormPartProps) {
//     super(props);
//     this.state = {
//       name: ""
//     };
//   }
//   componentDidMount() {
//     if (this.props.aspectState && "name" in this.props.aspectState) {
//       this.setState({ name: this.props.aspectState.name });
//     }
//   }
//   handleChange = (event: any) => {
//     this.setState({ name: event.target.value });
//     this.props.updateAspectForId({
//       aspect: { name: { name: event.target.value } },
//       id: null
//     });
//   };
//   render() {
//     return (
//       <div>
//         <label>
//           Name:
//           <input
//             type="text"
//             onChange={this.handleChange}
//             value={this.state.name}
//             required={true}
//           />
//         </label>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch: any): INameFormPartDispatchProps => ({
//   updateAspectForId: (action: IAspectForIdPayload) =>
//     dispatch({ ...new UpdateAspectForId(action) })
// });

// export default connect(
//   null,
//   mapDispatchToProps
// )(NameFormPart);
