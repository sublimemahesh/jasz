import React, { Component } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import history from '../../../history'
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
     constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }
    signOut() {

        sessionStorage.setItem("member_id", '');
        sessionStorage.setItem("member_auth", '');
        history.push("/login");
    }
    render() {

        return (
            <div className="layout-sidebar">
                <div className="layout-sidebar-backdrop"></div>
                <div className="layout-sidebar-body">
                    <div className="custom-scrollbar">
                        <nav id="sidenav" className="sidenav-collapse collapse">
                            <ul className="sidenav level-1">
                                <li className="sidenav-item has-subnav">
                                    <NavLink to="profile" aria-haspopup="true">
                                        <span className="icon icon-dashboard"></span>
                                        <span className="sidenav-label">Dashboards</span>
                                    </NavLink>
                                </li>
                                <li className="sidenav-item has-subnav">
                                    <NavLink to="profile-edit" aria-haspopup="true">
                                        <span className="icon icon-user"></span>
                                        <span className="sidenav-label">Edit Profile</span>
                                    </NavLink>
                                </li>
                                <li className="sidenav-item has-subnav">
                                    <NavLink to="change-password" aria-haspopup="true">
                                        <span className="icon icon-key"></span>
                                        <span className="sidenav-label">Change Password</span>
                                    </NavLink>
                                </li>
                                <li className="sidenav-item has-subnav  ">
                                    <NavLink to="pending-orders" aria-haspopup="true">
                                      <span className="icon icon-hourglass-2  "></span>
                                        <span className="sidenav-label">Pending Orders</span>
                                    </NavLink>
                                </li>
                                <li className="sidenav-item has-subnav  ">
                                    <NavLink to="confirmed-orders" aria-haspopup="true">
                                        <span className="icon icon-check"></span>
                                        <span className="sidenav-label">Confirmed Orders</span>
                                    </NavLink>
                                </li>
                                <li className="sidenav-item has-subnav  ">
                                    <NavLink to="success-orders" aria-haspopup="true">
                                         <span className="icon icon-shopping-basket  "></span>
                                        <span className="sidenav-label">Success Orders</span>
                                    </NavLink>
                                </li>
                                <li className="sidenav-item has-subnav  ">
                                    <NavLink to="canceled-orders" aria-haspopup="true">
                                       <span className="icon icon-remove"></span>
                                        <span className="sidenav-label">Canceled Orders</span>
                                    </NavLink>
                                </li>
                                <li className="sidenav-item">
                                    <NavLink to="#" aria-haspopup="true">
                                       <span className="icon icon-power-off"></span>
                                        <span className="sidenav-label" onClick={this.signOut}>Sign Out</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

                );
    }
}
export default Navigation;