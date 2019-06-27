import { ID } from "@ide/mesh";
import React, { Component } from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../../store/reducers/index";
import { selectFocus } from "../../store/selectors";
import "./Main.css";
import MainView from "./MainView";
import Title from "./Title";

export interface IMainStateProps {
  focus: ID;
}

export class Main extends Component<IMainStateProps> {
  render() {
    return (
      <div className="Main">
        <Title label={this.props.focus} />
        <MainView />
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState): IMainStateProps => ({
  focus: selectFocus(state)
});

export default connect(mapStateToProps)(Main);
