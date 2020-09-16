import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import Top_Bar from './Top_Bar/Top_Bar';
import Navigation from './Navigation/Navigation';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './css/application.min.css';
import './css/elephant.min.css';
import './css/custom.css';

class Order_View extends Component {
    constructor(props) {
        super(props);
        let order = '';
        if (props.location.state != undefined) {
            if (this.props.location.state.order) {
                order = this.props.location.state.order;
            }
        }
        this.state = {
            member: sessionStorage.getItem("member_id"),
            order: order,
            orderDetails: [],
            orderProductDetails: [],
            memberAuthDetails: {
                id:sessionStorage.getItem("member_id"),
                authToken:sessionStorage.getItem("member_auth")
            }
        };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.getOrderDetailsByID = this.getOrderDetailsByID.bind(this);
        this.getOrderPrductDetailsByID = this.getOrderPrductDetailsByID.bind(this);

    }
    componentWillMount() {

        this.checkAuthentication();
    }
    componentDidMount() {

        if (this.props.location.state != undefined) {


            if (this.props.location.state.order) {
                this.setState({
                    order: this.props.location.state.order
                });
                this.getOrderDetailsByID();
                this.getOrderPrductDetailsByID();
            }
        }
    }
    checkAuthentication() {
        PostData('auth', this.state.memberAuthDetails).then((result) => {
            this.props.history.push("/login");
        });
    }
    getOrderDetailsByID() {

        PostData('order-by-id', this.state.order).then((result) => {
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({orderDetails: responseJson.feedData});
            }
        });
    }
    getOrderPrductDetailsByID() {

        PostData('order-products-by-id', this.state.order).then((result) => {
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({orderProductDetails: responseJson.feedData});
            }
        });
    }

    render() {
        let Product_List = this.state.orderProductDetails
                .map(function (product, index) {
                    return (
                            <tr>
                                <td>{index+1}</td>
                                <td>{product.product_name}</td>
                                <td>{product.qty}</td>
                                <td className="text-right">{new Intl.NumberFormat().format(product.amount)}</td>

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
                                <h2 className="order-card-title">View Order</h2>
                                    <div className="col-md-8 col-sm-12">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>#{this.state.orderDetails.id}</th>
                                                </tr>
                                                <tr>
                                                    <th>Ordered At</th>
                                                    <th>{this.state.orderDetails.ordered_at}</th>
                                                </tr>
                                                <tr>
                                                    <th>Address</th>
                                                    <th>{this.state.orderDetails.address}</th>
                                                </tr>
                                                <tr>
                                                    <th>City</th>
                                                    <th>{this.state.orderDetails.city}</th>
                                                </tr>
                                                <tr>
                                                    <th>Country</th>
                                                    <th>{this.state.orderDetails.country}</th>
                                                </tr>
                                                <tr>
                                                    <th>Postal Code</th>
                                                    <th>{this.state.orderDetails.postal_code}</th>
                                                </tr>
                                                <tr>
                                                    <th>Shipping Fee</th>
                                                    <th>Rs. {new Intl.NumberFormat().format(this.state.orderDetails.shipping_amount)}</th>
                                                </tr>
                                                <tr>
                                                    <th>Total Amount</th>
                                                    <th>Rs. {new Intl.NumberFormat().format(this.state.orderDetails.amount)}</th>
                                                </tr>
                                                <tr>
                                                    <th>Order Note</th>
                                                    <th>{this.state.orderDetails.order_note}</th>
                                                </tr>
                                                {(() => {
                                                    if (this.state.orderDetails.status == 1 && this.state.orderDetails.delivery_status == 2) {
                                                      return (
                                                        <tr>
                                                            <th>Confirmed At</th>
                                                            <th>{this.state.orderDetails.delivered_at}</th>
                                                        </tr>
                                                      )
                                                    } else if (this.state.orderDetails.status == 1 && this.state.orderDetails.delivery_status == 1) {
                                                      return (
                                                        <tr>
                                                            <th>Confirmed At</th>
                                                            <th>{this.state.orderDetails.delivered_at}</th>
                                                        </tr>
                                                        )
                                                    }
                                                  })()}
                                                  {(() => {
                                                    if (this.state.orderDetails.status == 1 && this.state.orderDetails.delivery_status == 2) {
                                                      return (
                                                        <tr>
                                                            <th>Completed At</th>
                                                            <th>{this.state.orderDetails.completed_at}</th>
                                                        </tr>
                                                      )
                                                    }
                                                  })()}
                                            </tbody>
                                        </table>
                                        <table className="table table-striped table-bordered" id="order-product-details">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Product</th>
                                                    <th>Qty</th>
                                                    <th>Amount (Rs)</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Product_List}
                                            </tbody>
                                        </table>
                                    </div>
                                    {(() => {
                                        if (this.state.orderDetails.status == 0) {
                                            return (
                                                <a  href="/my-account/canceled-orders" className="btn back-btn m-t-15 waves-effect">Back</a>
                                                )
                                          } else if (this.state.orderDetails.status == 1 && this.state.orderDetails.delivery_status == 0) {
                                            return (
                                                    <a  href="/my-account/pending-orders" className="btn back-btn m-t-15 waves-effect">Back</a>
                                                    )
                                          } else if (this.state.orderDetails.status == 1 && this.state.orderDetails.delivery_status == 1) {
                                            return (
                                                    <a  href="/my-account/confirmed-orders" className="btn back-btn m-t-15 waves-effect">Back</a>

                                                    )
                                          } else if (this.state.orderDetails.status == 1 && this.state.orderDetails.delivery_status == 2) {
                                            return (
                                                    <a  href="/my-account/success-orders" className="btn back-btn m-t-15 waves-effect">Back</a>

                                                    )
                                          }
                                      })()}

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
export default Order_View;