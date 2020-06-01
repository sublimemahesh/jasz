import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import $ from 'jquery';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class Checkout extends Component {
        constructor(props) {
            super(props);
                let details = '';
                if(props.location.state != undefined) {
                    if(this.props.location.state.details) {
                        details = this.props.location.state.details;
                    }
                }
                this.state = {
                    cartDetails: details,
                    member: sessionStorage.getItem("member_id"),
                    memberDetails: [],
                    alert: null,
                    memberAuthDetails: {
                        id:sessionStorage.getItem("member_id"),
                        authToken:sessionStorage.getItem("member_auth")
                    },
                    city: '',
                    address: '',
                    country: ''
                };
                this.checkAuthentication = this.checkAuthentication.bind(this);
                this.submitOrderForm = this.submitOrderForm.bind(this);
                this.getMemberDetails = this.getMemberDetails.bind(this);
        }
        componentWillMount() {

            this.checkAuthentication();
            this.getMemberDetails();
        }
        componentDidMount() {

            if (this.props.location.state != undefined) {
                if(this.props.location.state.details) {
                    this.setState({cartDetails: this.props.location.state.details});
                }
            }
        }
        checkAuthentication() {
            PostData('auth', this.state.memberAuthDetails).then((result) => {
                this.props.history.push("/login");
            });
        }
        getMemberDetails() {
            PostData('member', this.state.member).then((result2) => {
                let responseJson2 = result2;
                if (responseJson2.feedData) {
                    this.setState({memberDetails: responseJson2.feedData});
                    this.setState({
                        city: responseJson2.feedData.city,
                        address: responseJson2.feedData.address,
                        country: responseJson2.feedData.country
                });
                }
            });
        }

        submitOrderForm() {
            if(this.state.cartDetails.length != 0) {
                const data = {
                    member: this.state.member,
                    country: $('#txtCountry').val(),
                    address: $('#txtAddress').val(),
                    postcode: $('#txtPostCode').val(),
                    city: $('#txtCity').val(),
                    orderNotes: $('#txtOrderNotes').val(),
                    totalAmount: $('#total_amount').val(),
                    productDetails: this.state.cartDetails

                }
                if (data.country == '' || !data.country) {
                    const getAlert = () => (
                        <SweetAlert
                            show="true"
                            title="Error"
                            text="Enter Country"
                            type= "error"
                            confirmButtonColor="#8CD4F5"
                            confirmButtonColor="#164c25"
                          >
                          Text
                          </SweetAlert>
                    );
                    this.setState({
                         alert: getAlert()
                     });
                     return false;
                } else if (data.address == '' || !data.address) {
                     const getAlert = () => (
                        <SweetAlert
                            show="true"
                            title="Error"
                            text="Enter Address"
                            type= "error"
                            confirmButtonColor="#164c25"
                          >
                          Text
                          </SweetAlert>
                    );
                    this.setState({
                         alert: getAlert()
                     });
                     return false;
                } else if (data.address == '' || !data.address) {
                     const getAlert = () => (
                        <SweetAlert
                            show="true"
                            title="Error"
                            text="Enter Address"
                            type= "error"
                            confirmButtonColor="#164c25"
                          >
                          Text
                          </SweetAlert>
                    );
                    this.setState({
                         alert: getAlert()
                     });
                     return false;
                } else if (data.city == '' || !data.city) {
                     const getAlert = () => (
                        <SweetAlert
                            show="true"
                            title="Error"
                            text="Enter City"
                            type= "error"
                            confirmButtonColor="#164c25"
                          >
                          Text
                          </SweetAlert>
                    );
                    this.setState({
                         alert: getAlert()
                     });
                     return false;
                } else if ($('#agree').is(":checked") === false) {
                    const getAlert = () => (
                        <SweetAlert
                            show="true"
                            title="Error"
                            text="Please accept the company's terms & conditions by clicking the checkbox!."
                            type= "error"
                            confirmButtonColor="#164c25"
                          >
                          Text
                          </SweetAlert>
                    );
                    this.setState({
                         alert: getAlert()
                     });
                     return false;
            } else {
                    PostData('order-form-submit', data).then((result1) => {
                        let responseJson1 = result1;

                        if (responseJson1.feedData) {

                                sessionStorage.setItem("cart", '');
                                sessionStorage.setItem("cart_count", '');
                                this.setState({cartDetails: ''});
                                $('#header-cart').attr('items', 0);
                                $('#header-cart').text(0);

                             const getAlert = () => (
                                <SweetAlert
                                    show="true"
                                    title="Success"
                                    text="Order saved successfully."
                                    type= "success"
                                    confirmButtonColor="#164c25"
                                  />
                                );
                                this.setState({
                                     alert: getAlert()
                                 });
                             this.props.history.push("/Cart");

                         } else {
                             const getAlert = () => (
                                <SweetAlert
                                    show="true"
                                    title="Error"
                                    text="There was an error."
                                    type= "error"
                                    confirmButtonColor="#164c25"
                                  />
                                );
                                this.setState({
                                     alert: getAlert()
                                 });
                         }
                        });
                }
            } else {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="There is no any item in the cart."
                        type= "error"
                        confirmButtonColor="#164c25"
                      />
                );
                this.setState({
                     alert: getAlert()
                 });
            }
        }


        render() {
        let tot = 0;
        let products
        if(this.state.cartDetails) {
            products = this.state.cartDetails
            .map(function (item, index) {
            tot += parseFloat(item.amount);
                    return (
                        <tr className="cart_item">
                            <td className="product-name">
                                {item.name}&nbsp; <span className="product-quantity">× {item.qty}</span>
                            </td>
                            <td className="product-total">
                                <span className="amount">Rs. {item.amount}</span>
                            </td>
                        </tr>
                            )
            }, this);
        } else {
            products = 'No items in the cart';


        }
            return (
                    <div className="">
                    <Header />
                    <section id="subheader">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 ">
                                    <div class="col-md-6 div-big-heading">
                                        <h1 class="big-heading">
                                            Checkout
                                        </h1>
                                    </div>
                                    <div class="col-md-6 div-p">
                                        <p><a href="./">Home</a> | Checkout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <div id="content">
                    <div className="content-page woocommerce">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 col-sm-12 col-xs-12 col-md-offset-1">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-ms-12">
                                            <div className="check-billing">

                                                <form className="form-my-account">
                                                    <h2 className="title">Billing Details</h2>
                                                    <p>
                                                        <input type="text" placeholder="Country *" id="txtCountry"  value={this.state.country} onChange={e => this.setState({ country: e.target.value })}/>
                                                    </p>
                                                    <p>
                                                        <input type="text" placeholder="Address *" id="txtAddress" value={this.state.address} onChange={e => this.setState({ address: e.target.value })}/>
                                                    </p>
                                                    <p className="clearfix box-col2">
                                                        <input type="text" placeholder="Postcode" id="txtPostCode" />
                                                        <input type="text" placeholder="City *" id="txtCity"  value={this.state.city} onChange={e => this.setState({ city: e.target.value })} />
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-ms-12">
                                            <div className="check-address">
                                                <form className="form-my-account">
                                                    <p>
                                                        <textarea cols="30" rows="10" placeholder="Order Notes" id="txtOrderNotes"></textarea>
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="order_review_heading">Your order</h3>
                                    <div className="woocommerce-checkout-review-order" id="order_review">
                                        <div className="table-responsive">
                                            <table className="shop_table woocommerce-checkout-review-order-table">
                                                <thead>
                                                    <tr>
                                                        <th className="product-name">Product</th>
                                                        <th className="product-total">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products}
                                                </tbody>
                                                <tfoot>
                                                    <tr className="cart-subtotal">
                                                        <th>Subtotal</th>
                                                        <td><strong className="amount">Rs. {tot}</strong></td>
                                                    </tr>
                                                    <tr className="shipping">
                                                        <th>Shipping</th>
                                                        <td>
                                                            <ul id="shipping_method">
                                                                <li>
                                                                    <input type="radio" className="shipping_method"  checked="checked" value="local_delivery" id="shipping_method_0_local_delivery" data-index="0" name="shipping_method[0]" />
                                                                    <label for="shipping_method_0_local_delivery">Local Delivery (Free)</label>
                                                                </li>
                                                                <li>
                                                                    <input type="radio" className="shipping_method" value="local_pickup" id="shipping_method_0_local_pickup" data-index="0" name="shipping_method[0]" />
                                                                    <label for="shipping_method_0_local_pickup">Local Pickup (Free)</label>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr className="order-total">
                                                        <th>Total</th>
                                                        <td><strong><span className="amount">Rs. {tot}</span></strong> </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 agree-check-box">
                                                <label class="checkbox-container">Click here to indicate that you have read and agree to the booking <a href="/terms-and-conditions" target="_blank" class="text-green">terms and conditions</a>.
                                                    <input type="checkbox" name="agree" id="agree" />
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="place-order-btn">
                                            <input type="hidden" value={tot} id="total_amount"  />
                                            <button data-value="Place order" id="place_order" name="woocommerce_checkout_place_order" className="button alt" onClick={this.submitOrderForm}>Place order</button>
                                            {this.state.alert}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            );
        }
}
export default Checkout;