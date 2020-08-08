import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

class Featured_Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responsive: {
                0: {
                    items: 1,
                },
                580: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
            },
            alert: null
        };
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(id) {
        let items = sessionStorage.getItem("cart");
        let arr = [];
        // console.log("items", JSON.parse(sessionStorage.getItem("cart")));
        if (items === '' || items === null) {

            let arr = [{ id: id, qty: 1 }];
            sessionStorage.setItem("cart", JSON.stringify(arr));
            console.log("items", JSON.parse(sessionStorage.getItem("cart")));
            let count = $('#header-cart').attr('items');
            let new_item_count = parseInt(count) + 1;
            sessionStorage.setItem("cart_count", new_item_count);
            $('#header-cart').attr('items', new_item_count);
            $('#header-cart').text(new_item_count);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Product is successfully added to the cart',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            let cart = [];
            cart = JSON.parse(sessionStorage.getItem("cart"));

            let products = cart.some(item => item.id === id);
            if (products) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    text: 'Product is already exsit in the cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                let arr = { id: id, qty: 1 };
                cart.push(arr);
                sessionStorage.setItem("cart", JSON.stringify(cart));
                let count = $('#header-cart').attr('items');
                let new_item_count = parseInt(count) + 1;
                sessionStorage.setItem("cart_count", new_item_count);
                $('#header-cart').attr('items', new_item_count);
                $('#header-cart').text(new_item_count);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    text: 'Product is successfully added to the cart',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }
    render() {
        let FeaturedProduct = this.props.feedData
            .map(function (feedData, index) {
                return (
                    <div className="item">
                        <div className="item-product5">
                            <div className="product-thumb product-thumb5">
                                <NavLink to={`/product-view/${feedData.id}`} className="product-thumb-link">
                                    <img className="first-thumb" src={`upload/product/${feedData.image_name}`} alt="" />
                                    <img className="second-thumb" src={`upload/product/${feedData.image_name}`} alt="" />
                                </NavLink>
                                <div className="product-info-cart">
                                    <span className="addcart-link" onClick={() => this.addToCart(feedData.id)}><i className="fa fa-shopping-basket"></i>  Add to Cart</span>
                                    {this.state.alert}
                                </div>
                            </div>
                            <div className="product-info5">
                                <h3 className="title-product"><a href={`/product-view/${feedData.id}`}>{feedData.name} </a></h3>
                                <div class="info-price">
                                    <span>{feedData.discount != 0 && feedData.discount != '' ? "Rs. " + (new Intl.NumberFormat().format(feedData.price - (feedData.price * feedData.discount / 100))) : "Rs. " + new Intl.NumberFormat().format((feedData.price))}</span>
                                    <del>{feedData.discount != 0 && feedData.discount != '' && "Rs. " + (new Intl.NumberFormat().format(feedData.price))}</del>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }, this);

        return (

            <div className="testi col-md-3 col-sm-6 col-sm-order-3 col-xs-12">
                <div className="hot-deals featured-products">
                    <h2><i className="fa fa-clock-o"></i> Hot deal</h2>
                    <div className="hotdeals-slider slider-home4 simple-owl-slider">
                        <div className="wrap-item" data-navigation="true" data-pagination="false" data-itemscustom="[[0,1]]">
                            <OwlCarousel items={1} margin={0} autoplay={true} loop nav dots={false} responsive={this.state.responsive}>
                                {FeaturedProduct}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Featured_Product;