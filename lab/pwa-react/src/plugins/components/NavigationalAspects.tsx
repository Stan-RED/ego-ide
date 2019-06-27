import BaseNavigation from "../bases/BaseNavigation";

export default class NavigationalAspects extends BaseNavigation {}

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { SetCurrentPlugin } from 'src/store';
// import { SetCurrentAction } from '../../store/actions/core.action';
// import { navigationalAspects } from '../bases/BaseNavigation';
// import { PluginAction } from '../models';

// export interface INavigationalAspectsDispatchProps {
//   setCurrentPlugin: (plugin: string) => void;
//   setCurrentAction: (action: PluginAction | string) => void;
// }

// export class NavigationalAspects extends Component<
//   INavigationalAspectsDispatchProps
// > {
//   handleOnPluginClick = (plugin: string) => () => {
//     this.props.setCurrentAction(PluginAction.View);
//     this.props.setCurrentPlugin(plugin);
//   };

//   render() {
//     return (
//       <ul>
//         {navigationalAspects.map((aspect, i) => (
//           <li key={i} onClick={this.handleOnPluginClick(aspect)}>
//             {aspect}
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }

// const mapDispatchToProps = (
//   dispatch: any
// ): INavigationalAspectsDispatchProps => ({
//   setCurrentAction: (action: PluginAction | string) =>
//     dispatch({ ...new SetCurrentAction(action) }),
//   setCurrentPlugin: (plugin: string) =>
//     dispatch({ ...new SetCurrentPlugin(plugin) })
// });

// export default connect(
//   null,
//   mapDispatchToProps
// )(NavigationalAspects);
