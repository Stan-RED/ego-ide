import { ID } from "@ide/mesh";
import React, { Component } from "react";
import { connect } from "react-redux";

import { SetCurrentFocus } from "src/store";
import { IApplicationState } from "../../store/reducers/index";
import { selectCurrentUser, selectFocus } from "../../store/selectors";
import CurrentUser from "./CurrentUser";
import Navigation from "./Navigation";
import "./Sidebar.css";

export interface ISidebarStateProps {
  currentUser: ID;
  focus: ID;
}

export interface ISidebarDispatchProps {
  setFocus: (focus: ID) => void;
}

export interface ISidebarProps
  extends ISidebarStateProps,
    ISidebarDispatchProps {}

export class Sidebar extends Component<ISidebarProps> {
  handleOnUserClick = (user: ID) => {
    this.props.setFocus(user);
  };

  render() {
    return (
      <div className="Sidebar">
        <div>
          <CurrentUser
            label={this.props.currentUser}
            userClick={this.handleOnUserClick}
          />
        </div>
        <Navigation />
      </div>
    );
  }
}

// WORK: Presentational components and containers!!! Everywhere, man!
const mapStateToProps = (state: IApplicationState): ISidebarStateProps => ({
  currentUser: selectCurrentUser(state),
  focus: selectFocus(state)
});

const mapDispatchToProps = (dispatch: any): ISidebarDispatchProps => ({
  setFocus: (focus: ID) => dispatch({ ...new SetCurrentFocus(focus) })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
