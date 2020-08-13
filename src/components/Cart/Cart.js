import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PostData } from '../../services/PostData';
import NumericInput from 'react-numeric-input';
import $ from 'jquery';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Swal from 'sweetalert2';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            productDetails: [],
            cartDetails: []
        };
        this.getCartItems = this.getCartItems.bind(this);
        this.getProductDetails = this.getProductDetails.bind(this);
        this.calculatePrice = this.calculatePrice.bind(this);
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
        this.removeItemFromCart = this.removeItemFromCart.bind(this);
        this.onClickUpdateCartButton = this.onClickUpdateCartButton.bind(this);
        this.addQtyDetailsToSession = this.addQtyDetailsToSession.bind(this);

    }
    componentWillMount() {
        this.getCartItems();
        // this.addQtyDetailsToSession();
    }

    getCartItems() {
        let items = sessionStorage.getItem("cart");
        if (items != null && items != '') {
            let cart_array = JSON.parse(sessionStorage.getItem("cart"));
            this.setState({ cartItems: cart_array });
            this.getProductDetails(cart_array);
        }
    }
    getProductDetails(item) {
        PostData('product-details-for-cart', item).then((result1) => {
            let responseJson1 = result1;
            if (responseJson1.feedData) {

                this.setState({ productDetails: responseJson1.feedData });

                let cartDetailsArr = [];
                responseJson1.feedData.map(function (result, index) {
                    let arr = {};

                    let price = result.product.price;
                    let discount = result.product.discount;
                    let new_price = price - (price * discount / 100);

                    arr['id'] = result.product.id;
                    arr['name'] = result.product.name;
                    arr['qty'] = result.qty;
                    arr['amount'] = new_price * result.qty;
                    arr['shipping_fee'] = result.product.shipping_fee;
                    cartDetailsArr.push(arr);
                }, this);

                this.setState({ cartDetails: cartDetailsArr });
            }
        });
    }
    calculatePrice = (new_qty, price, id) => {
        let new_price = price * new_qty;
        $('#amount-' + id).html('Rs. ' + new Intl.NumberFormat().format(new_price));
        $('#amount-' + id).attr('price', price);
        $('#amount-' + id).attr('qty', new_qty);
    }
    onClickUpdateCartButton(event) {
        this.calculateTotalPrice();
        this.addQtyDetailsToSession();
    }
    calculateTotalPrice() {

        let tot = 0;
        let shipping_fee = 0;
        $('.item-amount').each(function () {
            let price = parseFloat($(this).attr('price'));
            let qty = parseInt($(this).attr('qty'));
            let new_price = price * qty;
            tot += new_price;
            shipping_fee += parseFloat($(this).attr('shipping_fee'));
        });
        $('#subtotal-amount').html('Rs. ' + new Intl.NumberFormat().format(tot));
        $('#total-amount').html('Rs. ' + new Intl.NumberFormat().format(tot + shipping_fee));

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Cart was updated successfully.',
            showConfirmButton: false,
            timer: 1500
        })

    }
    addQtyDetailsToSession() {

        let cartDetailsArr = [];
        let cart = [];

        $('.tr_cart_item').each(function () {
            let arr = {};
            let cart_arr = {};

            let id = $(this).attr('item-id');
            let name = $(this).attr('item-name');
            let qty = $('.tr_cart_item #qty-' + id).val();
            let amount = $('.tr_cart_item #amount-' + id).attr('price');
            let shipping_fee = $('.tr_cart_item #shipping-fee-' + id).attr('fee');

            arr['id'] = id;
            arr['name'] = name;
            arr['qty'] = qty;
            arr['amount'] = amount;
            arr['shipping_fee'] = shipping_fee;
            cartDetailsArr.push(arr);

            cart_arr = { id: id, qty: qty };
            cart.push(cart_arr);
        });
        // sessionStorage.setItem("cart",'');
        sessionStorage.setItem("cart", JSON.stringify(cart));
        this.getCartItems();
        this.setState({ cartDetails: cartDetailsArr });
    }
    removeItemFromCart = (id) => {

        let cart_array = JSON.parse(sessionStorage.getItem("cart"));
        let cart_array1 = cart_array.filter(item => item.id !== id);
        sessionStorage.setItem("cart", JSON.stringify(cart_array1));
        let count = $('#header-cart').attr('items');
        let new_item_count = parseInt(count) - 1;
        sessionStorage.setItem("cart_count", new_item_count);
        $('#header-cart').attr('items', new_item_count);
        $('#header-cart').text(new_item_count);
        $('#remove-item-' + id).remove();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'product was successfully removed from the cart.',
            showConfirmButton: false,
            timer: 1500
        })


    }

    render() {
        let tot = 0;
        let shipping_fee = 0;
        let cartItems = this.state.productDetails
            .map(function (item, index) {
                let price = item.product.price;
                let discount = item.product.discount;
                let new_price = price - (price * discount / 100);
                tot += parseFloat(new_price * item.qty);
                shipping_fee += parseFloat(item.product.shipping_fee);

                return (
                    <tr className="cart_item tr_cart_item" id={`remove-item-${item.product.id}`} item-id={item.product.id} item-name={item.product.name} each-price={item.product.price}>
                        <td className="product-remove">
                            <a className="remove" id={`remove-item-${item.product.id}`} onClick={() => this.removeItemFromCart(item.product.id)}><i className="fa fa-times"></i></a>
                            {this.state.alert}
                        </td>
                        <td className="product-thumbnail">
                            <a href="#"><img src={`upload/product/thumb/${item.product.image_name}`} alt="" /></a>
                        </td>
                        <td className="product-name">
                            <a href="#">{item.product.name}</a>
                        </td>
                        <td className="product-price text-right">
                            <span className="amount">Rs. {new Intl.NumberFormat().format(new_price)}</span>
                        </td>
                        <td className="product-quantity">
                            <div className="info-qty">
                                <NumericInput id={`qty-${item.product.id}`} min={1} max={10} value={item.qty} data-price={item.product.price} onChange={value => this.calculatePrice(value, new_price, item.product.id)} mobile />

                            </div>
                        </td>
                        <td className="product-subtotal text-right">
                            <span className="item-amount" id={`amount-${item.product.id}`} price={new_price} qty={item.qty} shipping_fee={item.product.shipping_fee}>Rs. {new Intl.NumberFormat().format(new_price * item.qty)}</span>
                        </td>
                        <input type="hidden" id={`shipping-fee-${item.product.id}`} fee={item.product.shipping_fee} />
                    </tr>
                );
            }, this);
        const location = {
            pathname: '/checkout',
            state: { details: this.state.cartDetails }
        }
        return (
            <div className="">
                <Header />
                <section id="subheader">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="col-md-6 div-big-heading">
                                    <h1 className="big-heading">
                                        Cart
                                        </h1>
                                </div>
                                <div className="col-md-6 div-p">
                                    <p><a href="./">Home</a> | Cart</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div id="content" className="my-cart-page">
                    <div className="content-page woocommerce">
                        <div className="container">
                            <div className="cart-content-page">
                                <h2 className="title-shop-page">my cart</h2>
                                <div className="table-responsive">
                                    <table cellspacing="0" className="shop_table cart table">
                                        <thead>
                                            <tr>
                                                <th className="product-remove">&nbsp;</th>
                                                <th className="product-thumbnail">&nbsp;</th>
                                                <th className="product-name">Product</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-subtotal">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems}
                                            <tr>
                                                <td className="actions" colspan="6">

                                                    <button className="update-cart" onClick={this.onClickUpdateCartButton}>Update Cart</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="cart-collaterals">
                                    <div className="cart_totals ">
                                        <h2>Cart Totals</h2>
                                        <div className="table-responsive">
                                            <table cellspacing="0" className="table">
                                                <tbody>
                                                    <tr className="cart-subtotal">
                                                        <th>Subtotal</th>
                                                        <td className="text-right"><strong className="amount" id="subtotal-amount">Rs. {new Intl.NumberFormat().format(tot)}</strong></td>
                                                    </tr>
                                                    <tr className="shipping">
                                                        <th>Shipping Fee</th>
                                                        <td className="text-right"><strong className="amount" id="shipping-fee">Rs. {new Intl.NumberFormat().format(shipping_fee)}</strong></td>
                                                    </tr>
                                                    <tr className="order-total">
                                                        <th>Total</th>
                                                        <td className="text-right"><strong><span className="amount" id="total-amount">Rs. {new Intl.NumberFormat().format(tot + shipping_fee)}</span></strong> </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="wc-proceed-to-checkout">
                                            <Link className="checkout-button button alt wc-forward" to={location}>Proceed to Checkout</Link>

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
export default Cart;

