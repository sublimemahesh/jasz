import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import Top_Bar from './Top_Bar/Top_Bar';
import Navigation from './Navigation/Navigation';
import 'font-awesome/css/font-awesome.min.css';
import './css/application.min.css';
import './css/elephant.min.css';
import './css/custom.css';
import member from '../../images/member.jpg';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            member: sessionStorage.getItem("member_id"),
            memberDetails: [],
            pending_orders: '',
            confirmed_orders: '',
            canceled_orders: '',
            success_orders: '',
            memberAuthDetails: {
                id:sessionStorage.getItem("member_id"),
                authToken:sessionStorage.getItem("member_auth")
            }
        };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.getMemberDetails = this.getMemberDetails.bind(this);
        this.getPendingOrderCountByMember = this.getPendingOrderCountByMember.bind(this);
        this.getConfirmedOrderCountByMember = this.getConfirmedOrderCountByMember.bind(this);
        this.getCanceledOrderCountByMember = this.getCanceledOrderCountByMember.bind(this);
        this.getSuccessOrderCountByMember = this.getSuccessOrderCountByMember.bind(this);

    }
    componentWillMount() {
        this.checkAuthentication();
        this.getMemberDetails();
        this.getPendingOrderCountByMember();
        this.getConfirmedOrderCountByMember();
        this.getCanceledOrderCountByMember();
        this.getSuccessOrderCountByMember();
    }
    checkAuthentication() {
        PostData('auth', this.state.memberAuthDetails).then((result) => {
            this.props.history.push("/login");
        });
    }
    getMemberDetails() {
        PostData('member', this.state.member).then((result) => {
            console.log(`result: `, result );
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({memberDetails: responseJson.feedData});
            }
        });
    }
    getPendingOrderCountByMember() {
        PostData('get-pending-orders-by-member', this.state.member).then((result1) => {
            console.log(`result: `, result1 );
            let responseJson1 = result1;

            if (responseJson1.feedData) {
                this.setState({pending_orders: responseJson1.feedData.length});
            }
        });
    }
    getConfirmedOrderCountByMember() {
        PostData('get-confirmed-orders-by-member', this.state.member).then((result) => {
            console.log(`result: `, result );
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({confirmed_orders: responseJson.feedData.length});
            }
        });
    }
     getCanceledOrderCountByMember() {
        PostData('get-canceled-orders-by-member', this.state.member).then((result) => {
            console.log(`result: `, result );
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({canceled_orders: responseJson.feedData.length});
            }
        });
    }
    getSuccessOrderCountByMember() {
        PostData('get-success-orders-by-member', this.state.member).then((result) => {
            console.log(`result: `, result );
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({success_orders: responseJson.feedData.length});
            }
        });
    }

    render() {

        return (
                <div className="My-Account">
                    <Top_Bar />
                    <Navigation />
                    <div className="layout-main">
            <div className="layout-content">
                <div className="layout-content-body">
                <div className="row gutter-xs">
                        <div className="col-md-6 col-lg-3 col-lg-push-0">
                            <div className="card bg-primary">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-middle media-left">
                                            <span className="bg-primary-inverse circle sq-48">
                                                <span className="icon icon-hourglass-2 img-span"></span>
                                            </span>
                                        </div>
                                        <div className="media-middle media-body">
                                            <h6 className="media-heading">Pending Orders</h6>
                                            <h3 className="media-heading">
                                                <span className="fw-l">{this.state.pending_orders} </span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-lg-push-3">
                            <div className="card bg-info">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-middle media-left">
                                            <span className="bg-info-inverse circle sq-48">
                                                <span className="icon icon-truck img-span"></span>
                                            </span>
                                        </div>
                                        <div className="media-middle media-body">
                                            <h6 className="media-heading ">Confirmed Orders</h6>
                                            <h3 className="media-heading">
                                                <span className="fw-l">{this.state.confirmed_orders} </span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-lg-pull-3">
                            <div className="card bg-info">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-middle media-left">
                                            <span className="bg-info-inverse circle sq-48">
                                                <span className="icon icon-shopping-basket img-span"></span>
                                            </span>
                                        </div>
                                        <div className="media-middle media-body">
                                            <h6 className="media-heading">Success Orders</h6>
                                            <h3 className="media-heading">
                                                <span className="fw-l">{this.state.success_orders}</span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-lg-pull-0">
                            <div className="card bg-warning">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-middle media-left">
                                            <span className="bg-warning-inverse circle sq-48">
                                                <span className="icon icon-hourglass-o img-span"></span>
                                            </span>
                                        </div>
                                        <div className="media-middle media-body">
                                            <h6 className="media-heading">Canceled Orders</h6>
                                            <h3 className="media-heading">
                                                <span className="fw-l">{this.state.canceled_orders}</span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row gutter-xs member-details">
                        <div className="col-md-5 col-sm-12 text-center">
                            <div className="card" data-toggle="match-height" >
                                <div className="card-image">
                                    <div className="overlay">
                                        <div className="overlay-content">
                                            <a href="profile.php" >
                                                <button className="btn btn-primary btn-sm pull-right" type="button">Change Profile</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-avatar">
                                    <a className="card-thumbnail rounded sq-150" href="#">
                                        <center>
                                            <img className="img-responsive" src={member} alt={this.state.memberDetails.full_name} />

                                        </center>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-12 text-center">
                            <div className="card" data-toggle="match-height">

                                <div className="card-body">
                                    <div className="table-responsive tbl-res">
                                        <div   data-toggle="match-height">
                                            <table className="table table-borderless table-middle">
                                                <tbody>
                                                    <tr>
                                                        <td className="col-xs-3">
                                                            <div className="text-left">Full Name : </div>
                                                        </td>
                                                        <td className="col-xs-6">
                                                            <div className="text-left">{this.state.memberDetails.full_name} </div>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td className="col-xs-3">
                                                            <div className="text-left">Email Address: </div>
                                                        </td>
                                                        <td className="col-xs-6">
                                                            <div className="text-left">{this.state.memberDetails.email} </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="col-xs-3">
                                                            <div className="text-left">Contact Number: </div>
                                                        </td>
                                                        <td className="col-xs-6">
                                                            <div className="text-left">{this.state.memberDetails.contact_number} </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="col-xs-3">
                                                            <div className="text-left">User Name: </div>
                                                        </td>
                                                        <td className="col-xs-6">
                                                            <div className="text-left">{this.state.memberDetails.username} </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="col-xs-3">
                                                            <div className="text-left">Address: </div>
                                                        </td>
                                                        <td className="col-xs-6">
                                                            <div className="text-left">{this.state.memberDetails.address} </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="col-xs-3">
                                                            <div className="text-left">City: </div>
                                                        </td>
                                                        <td className="col-xs-6">
                                                            <div className="text-left">{this.state.memberDetails.city} </div>
                                                        </td>
                                                    </tr>

                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="layout-footer">
                <div className="layout-footer-body">
                    <small className="version">Version 1.1.0</small>
                    <small className="copyright">2020 &copy; DIGIZONE.LK   </small>
                </div>
            </div>
        </div>

            </div>
                );
    }
}
export default Profile;