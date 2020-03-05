import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class Popular_Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responsive:{
                0: {
                    items: 1,
                },
                580: {
                    items: 2,
                },
                600: {
                    items: 3,
                },
                1000: {
                    items: 4,
                },
            },
            alert: null
        };
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(id)  {
        let items = sessionStorage.getItem("cart");
        let arr = [];

        if(items === '' || items === null) {

            arr =  id;
            sessionStorage.setItem("cart", arr);
            let count = $('#header-cart').attr('items');
            let new_item_count = parseInt(count) + 1;
            sessionStorage.setItem("cart_count", new_item_count);
            $('#header-cart').attr('items', new_item_count);
            $('#header-cart').text(new_item_count);

             const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Success"
                        text="product is successfully added to the cart"
                        type= "success"
                      />
                );
                this.setState({
                     alert: getAlert()
                 });

        } else {
            let cart_array = items.split(',');
            if(cart_array.includes(id)) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="product is already exsit in the cart"
                        type= "error"
                      />
               );
               this.setState({
                    alert: getAlert()
                });
            } else {
                arr =  items.concat(',', id);
                sessionStorage.setItem("cart", arr);
                let count = $('#header-cart').attr('items');
                let new_item_count = parseInt(count) + 1;
                sessionStorage.setItem("cart_count", new_item_count);
                $('#header-cart').attr('items', new_item_count);
                $('#header-cart').text(new_item_count);

                 const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Success"
                        text="product is successfully added to the cart"
                        type= "success"
                      />
                );
                this.setState({
                     alert: getAlert()
                 });
            }
        }
    }
    render() {
        let Categories = this.props.feedData
                .map(function (feedData, index) {

                const location = {
                    pathname: '/products',
                    state: { category: feedData.cat_id }
                  }

                    let Products = feedData.cat_products
                        .map(function (product, index) {
        return (
                <div className="item">
                    <div className="item-hot-deal-product">
                        <div className="hot-deal-product-thumb">
                            <div className="product-thumb">
                                <a className="product-thumb-link" href={`/product-view/${product.id}`}>
                                    <img alt="" src={`upload/product/${product.image_name}`} className="first-thumb" />
                                    <img alt="" src={`upload/product/${product.image_name2}`} className="second-thumb" />
                                </a>
                                <div className="product-info-cart">
                                    <a className="addcart-link" onClick={() => this.addToCart(product.id)}><i className="fa fa-shopping-basket"></i> Add to Cart</a>
                                    {this.state.alert}
                                </div>
                            </div>
                        </div>
                        <div className="hot-deal-product-info">
                            <h3 className="title-product"><a href={`/product-view/${product.id}`}>{product.name}</a></h3>
                            <div className="info-price">
                                <span>Rs. {product.price} </span>
                            </div>
                            <div className="product-rating">
                        <div className="inner-rating"></div>
                        <span>(1s)</span>
                    </div>
                        </div>
                    </div>
                </div>

                );
}, this);
        return (
                <div className="product-box18">

                    <div className="row">

                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="hot-deal-tab-slider">
                                <div className="hot-deal-tab-title">
                                    <label>{feedData.cat_name}</label>
                                </div>
                                <div className="tab-content">
                                    <div className="">
                                        <div className="hot-deal-slider slider-home2">
                                            <div className="wrap-item" data-navigation="true" data-pagination="false" data-itemscustom="[[0,1],[480,2],[768,3],[980,4],[1200,4]]">
                                            <OwlCarousel items={4} margin={0} autoplay ={false} nav dots={false} responsive={this.state.responsive}>
                                            {Products}

                                                </OwlCarousel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item-adv-simple">
                                <Link class="addcart-link" to={location} ><img alt="" src={`upload/category/banner/${feedData.cat_banner}`} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                );
        }, this);


        return (
                <div className="hot-deal-box content-product18">
        <div className="container">
            <div className="popcat-list-box">
                <h2 className="h2-gray"><span>popular categories</span></h2>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {Categories}
                </div>
            </div>
        </div>
    </div>
                );
    }
}
export default Popular_Categories;