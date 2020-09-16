import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import Top_Bar from './Top_Bar/Top_Bar';
import Navigation from './Navigation/Navigation';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './css/application.min.css';
import './css/elephant.min.css';
import './css/custom.css';

class Pending_Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            member: sessionStorage.getItem("member_id"),
            orders: [],
            memberAuthDetails: {
                id:sessionStorage.getItem("member_id"),
                authToken:sessionStorage.getItem("member_auth")
            }
        };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.getPendingOrdersByMember = this.getPendingOrdersByMember.bind(this);

    }
    componentWillMount() {

        this.checkAuthentication();
        this.getPendingOrdersByMember();
    }
    checkAuthentication() {
        PostData('auth', this.state.memberAuthDetails).then((result) => {
            this.props.history.push("/login");
        });
    }
    getPendingOrdersByMember() {
        PostData('get-pending-orders-by-member', this.state.member).then((result) => {
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({orders: responseJson.feedData});
            }
        });
    }

    render() {
        let Order_List = this.state.orders
                .map(function (order, index) {
                    const location = {
                      pathname: '/my-account/view-order',
                      state: { order: order.id }
                    }
                    return (
                            <tr>
                                <td>{index+1}</td>
                                <td>{order.ordered_at}</td>
                                <td>{order.address}</td>
                                <td>{order.city}</td>
                                <td>{order.country}</td>
                                <td>{order.postal_code}</td>
                                <td>{order.amount}</td>
                                <td><Link className="addcart-link view-btn" to={location} ><i className="fa fa-eye"></i></Link></td>

                            </tr>

                            )
                });

        return (
                <div className="My-Account">
                    <Top_Bar />
                    <Navigation />
                    <div className="layout-main">
            <div className="layout-content">
                <div className="layout-content-body">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="card order-card">
                                <div className="card-body">
                                <h2 className="order-card-title">My Pending Orders</h2>
                                <hr />
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Order Date</th>
                                                    <th>Address</th>
                                                    <th>City</th>
                                                    <th>Country</th>
                                                    <th>Postal Code</th>
                                                    <th className="text-right">Total Amount (Rs)</th>
                                                    <th>Option</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Order_List}
                                            </tbody>
                                        </table>
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
                    <small className="copyright">2020 &copy; DEWENDRA.COM   </small>
                </div>
            </div>
        </div>

            </div>
                );
    }
}
export default Pending_Orders;