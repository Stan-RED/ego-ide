import { IDictionary } from "@ide/core";
import { ID } from "@ide/mesh";
import { IStorage } from "@lab/api-server";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  IApplicationState,
  SetCurrentAction,
  SetCurrentFocus,
  SetCurrentPlugin
} from "src/store";
import storageManager, {
  IReadEntitiesWithAspects
} from "src/store/effects/storage.effects";
import {
  ICurrentAction,
  ICurrentPlugin
} from "src/store/reducers/core.reducer";
import {
  selectCurrentAction,
  selectCurrentPlugin,
  selectFocus
} from "src/store/selectors";
import { PluginAction } from "../models";

// WORK: See https://github.com/facebook/react/issues/8774

// TODO: It is hard-coded, but should be generated.
// TODO: Aspects priorities for plugins lists. By default - priority is set in workspaces settings. Can be reassigned by user.
// TODO; Might be structured in some kind of "folders".
export const navigationalAspects: string[] = [
  "inbox",
  "topic",
  "scope",
  "tags",
  "text"
];

export interface INavigation {
  composeChildren(children: IStorage): IDictionary<IStorage[]>;
}

export interface INavigationStateProps {
  currentAction: ICurrentAction;
  currentPlugin: ICurrentPlugin;
  focus: ID;
}

export interface INavigationDispatchProps {
  countEntitiesWithAspects: (
    aspects: IReadEntitiesWithAspects[]
  ) => Promise<number[]>;
  setCurrentAction: (action: ICurrentAction) => void;
  setCurrentPlugin: (plugin: ICurrentPlugin) => void;
  setFocus: (focus: ID) => void;
  readChildrenForEntities: (ids: ID[]) => Promise<any>;
  readParentForEntity: (id: ID) => Promise<ID>;
  readEntitiesForAspect: (
    payload: IReadEntitiesWithAspects[]
  ) => Promise<IStorage>;
}

export interface INavigationProps
  extends INavigationDispatchProps,
    INavigationStateProps {}

export interface INavigationState {
  // Indicates whether to show only inheritors of current entry or all entries (inheritance-independent).
  // WORK: deepMode: boolean;

  children: IStorage;
  //   parentId: ID;
  // currentAspectEntries: IStorage;
  navigationalAspects: Array<{ aspect: string; count: number | undefined }>;
}

// WORK: Use P = {}, S = {}
export class BaseNavigation<P = {}, S = {}, SS = any>
  extends Component<
    INavigationProps & { focusIndependentMode: boolean },
    INavigationState,
    SS
  >
  implements INavigation {
  constructor(props: INavigationProps & { focusIndependentMode: boolean }) {
    super(props);
    this.state = {
      children: {},
      // deepMode: false,
      navigationalAspects: navigationalAspects.map(x => ({
        aspect: x,
        count: undefined
      }))
    };
  }
  // componentChanged() {

  // }

  // Indicates whether to show the list of entities or the list of plugins.
  isEntitiesMode(): boolean {
    return this.props.currentAction === PluginAction.View;
  }
  // setIsEntitiesMode(prevEntitiesMode?: boolean) {
  //   const entitiesMode: boolean =
  //     this.props.currentAction === PluginAction.View;

  //   if (prevEntitiesMode !== undefined) {
  //     if (prevEntitiesMode !== entitiesMode) {
  //       this.setState({ entitiesMode });
  //     }
  //   } else {
  //     this.setState({ entitiesMode });
  //   }
  // }

  async sharedPartOfLifeCycle() {
    const id =
      this.props.focusIndependentMode === false ? this.props.focus : undefined;

    // tslint:disable-next-line:no-console
    // console.log(this.isEntitiesMode());

    if (this.isEntitiesMode() === true && this.props.currentPlugin) {
      this.props
        .readEntitiesForAspect([
          { aspects: [this.props.currentPlugin], forId: id }
        ])
        // TODO: Can we be sure that head(x) isn't undefined?
        .then(x => this.setState({ children: x }));
    } else {
      if (this.state.navigationalAspects) {
        // const a = await this.state.navigationalAspects.map(aspect =>
        //   this.props.countEntitiesWithAspects([
        //     { aspects: [aspect.aspect], forId: id }
        //   ])
        // );

        const a = await this.props.countEntitiesWithAspects(
          this.state.navigationalAspects.map(aspect => ({
            aspects: [aspect.aspect],
            forId: id
          }))
        );

        const navAspects: Array<{
          aspect: string;
          count: number;
        }> = a.map((count, i) => ({
          aspect: this.state.navigationalAspects[i].aspect,
          count
        }));

        // tslint:disable-next-line:no-console
        // console.log(navAspects);

        this.setState({ navigationalAspects: navAspects });

        // this.props
        //   .readEntitiesForAspect([this.props.currentPlugin])

        //   // WORK: Consider current id?
        //   .then(x => this.setState({ currentAspectEntries: x }));
      }
    }
  }

  async componentDidMount() {
    // this.setIsEntitiesMode();

    // this.setState({
    //   navigationalAspects: navigationalAspects.map(x => ({
    //     aspect: x,
    //     count: undefined
    //   }))
    // });

    await this.sharedPartOfLifeCycle();
  }

  async componentDidUpdate(
    prevProps: Readonly<INavigationProps & { focusIndependentMode: boolean }>
  ) {
    if (
      this.props.currentAction !== prevProps.currentAction ||
      this.props.focus !== prevProps.focus ||
      this.props.focusIndependentMode !== prevProps.focusIndependentMode
    ) {
      await this.sharedPartOfLifeCycle();
    }

    // if (this.state.deepMode !== prevState.deepMode) {
    //   // tslint:disable-next-line:no-console
    //   console.log("componentDidUpdate");
    //   await this.sharedPartOfLifeCycle();
    // }

    // if (
    //   typeof this.props.focus === "string" &&
    //   prevProps.focus !== this.props.focus
    // ) {
    //   this.props
    //     .readChildrenForEntities([this.props.focus])
    //     .then(x => this.setState({ children: x }));

    // if (this.props.currentPlugin) {
    //   this.props
    //     .readEntitiesForAspect([this.props.currentPlugin])
    //     .then(x => this.setState({ currentAspectEntries: x }));
    // }
  }

  /**
   * Composes children entities under empty aspects ({}) list.
   * Empty aspect considers to have corresponding plugin.
   * @param children All children for current focus.
   */
  composeChildren(children: IStorage): IDictionary<IStorage[]> {
    // Contains entities in dictionary formed from empty ({}) entity's aspects.
    const entitiesInEmptyAspectsDictionary: IDictionary<IStorage[]> = {};

    // const retArr: Array<{ id: ID; total: number }> = [];

    Object.keys(children).forEach(id => {
      Object.keys(children[id]).forEach(aspect => {
        if (Object.keys(children[id][aspect]).length === 0) {
          if (!entitiesInEmptyAspectsDictionary[aspect]) {
            entitiesInEmptyAspectsDictionary[aspect] = [];
          }
          entitiesInEmptyAspectsDictionary[aspect].push({ [id]: children[id] });
        }
      });
    });

    return entitiesInEmptyAspectsDictionary;

    // Hard-coded aspects.
    // return navigationalAspects

    // Hard-coded aspects.
    // return navigationalAspects.reduce(navigationalAspect => {
    //   if (navigationalAspect in entitiesInEmptyAspectsDictionary) {
    //     retArr[navigationalAspect] = {
    //       total: entitiesInEmptyAspectsDictionary[navigationalAspect].length
    //     };
    //   } else {
    //     retArr[navigationalAspect] = { total: 0 };
    //   }

    //   return navigationalAspect in entitiesInEmptyAspectsDictionary
    //     ? `${navigationalAspect} (${entitiesInEmptyAspectsDictionary[navigationalAspect].length})`
    //     : navigationalAspect;
    // });

    // return retArr;
  }

  // Plugin name have to be equal to to aspect name.
  getPluginsList(
    composedChildren: IDictionary<IStorage[]>,
    plugins: string[]
  ): Array<{ plugin: string; total: number }> {
    return plugins.map(plugin => {
      const total =
        plugin in composedChildren ? composedChildren[plugin].length : 0;
      return {
        plugin,
        total
      };
    });
  }

  handleOnFocusClick = (id: ID) => () => {
    this.props.setCurrentAction(PluginAction.Aspects);
    this.props.setFocus(id);
  };

  handleOnPluginClick = (plugin: string) => () => {
    this.props.setCurrentAction(PluginAction.View);
    this.props.setCurrentPlugin(plugin);
  };

  renderNavigation(): React.ReactNode {
    if (this.state) {
      if (this.isEntitiesMode()) {
        if (Object.keys(this.state.children).length) {
          // WORK: Do not use index as key.
          return (
            <ul>
              {Object.keys(this.state.children).map((entityId, i) => (
                <li key={i} onClick={this.handleOnFocusClick(entityId)}>
                  {"name" in this.state.children[entityId]
                    ? this.state.children[entityId].name.name
                    : entityId}
                </li>
              ))}
            </ul>
          );
        } else {
          return (
            <div>No children for current aspect within the current focus.</div>
          );
        }
      } else {
        if (
          this.state.navigationalAspects &&
          this.state.navigationalAspects.length
        ) {
          return (
            <ul>
              {this.state.navigationalAspects.map((aspect, i) => {
                return (
                  <React.Fragment key={i}>
                    <li onClick={this.handleOnPluginClick(aspect.aspect)}>
                      <span>{aspect.aspect}</span> ({aspect.count})
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          );
        } else {
          return <div>No navigational aspects.</div>;
        }
      }
    } else {
      return <div>No current state (loading).</div>;
    }

    // if (this.state && this.state.children) {
    //   const composedChildren = this.composeChildren(this.state.children);
    //   const plugins = this.getPluginsList(
    //     composedChildren,
    //     navigationalAspects
    //   );
    //   const entitiesMode: boolean =
    //     this.props.currentAction === PluginAction.View;

    //   if (entitiesMode) {
    //     return (
    //       <ul>
    //         {this.state.currentAspectEntries
    //           ? Object.keys(this.state.currentAspectEntries).map(
    //               (entity, i) => {
    //                 return (
    //                   <li key={i} onClick={this.handleOnFocusClick(entity)}>
    //                     {"name" in this.state.currentAspectEntries[entity]
    //                       ? this.state.currentAspectEntries[entity].name.name
    //                       : entity}
    //                   </li>
    //                 );
    //               }
    //             )
    //           : ""}
    //       </ul>
    //     );
    //   } else {
    //     return (
    //       <ul>
    //         {plugins.map((aspect, i) => {
    //           return (
    //             <React.Fragment key={i}>
    //               <li onClick={this.handleOnPluginClick(aspect.plugin)}>
    //                 {aspect.plugin} ({aspect.total})
    //               </li>
    //             </React.Fragment>
    //           );
    //         })}
    //       </ul>
    //     );
    //   }
    // } else {
    //   return <div>No children items.</div>;
    // }
  }

  render() {
    return <React.Fragment>{this.renderNavigation()}</React.Fragment>;
  }
}

const mapStateToProps = (
  state: IApplicationState,
  ownProps: { focusIndependentMode: boolean }
): INavigationStateProps => ({
  currentAction: selectCurrentAction(state),
  currentPlugin: selectCurrentPlugin(state),
  focus: selectFocus(state)
});

const mapDispatchToProps = (dispatch: any): INavigationDispatchProps => ({
  countEntitiesWithAspects: (aspects: IReadEntitiesWithAspects[]) =>
    dispatch(storageManager.readEntitiesWithAspectsCount(aspects)),
  readChildrenForEntities: (ids: ID[]) =>
    dispatch(storageManager.readChildrenForEntities(ids)),
  readEntitiesForAspect: (aspects: IReadEntitiesWithAspects[]) =>
    dispatch(storageManager.readEntitiesWithAspects(aspects)),
  readParentForEntity: (id: ID) =>
    dispatch(storageManager.readParentForEntity(id)),
  setCurrentAction: (action: ICurrentAction) =>
    dispatch({ ...new SetCurrentAction(action) }),
  setCurrentPlugin: (plugin: ICurrentPlugin) =>
    dispatch({ ...new SetCurrentPlugin(plugin) }),
  setFocus: (focus: ID) => dispatch({ ...new SetCurrentFocus(focus) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseNavigation);
