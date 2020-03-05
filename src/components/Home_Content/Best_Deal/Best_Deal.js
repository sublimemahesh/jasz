import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import $ from 'jquery';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class Best_Deal extends Component {
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
        let BestDeal = this.props.feedData
                .map(function (feedData, index) {
        return (
                                        <div className="item">
                                            <div className="item-product5">
                                                <div className="product-thumb product-thumb5">
                                                    <a href={`/product-view/${feedData.id}`} className="product-thumb-link">
                                                        <img className="first-thumb" src={`upload/product/${feedData.image_name}`} alt="" />
                                                        <img className="second-thumb" src={`upload/product/${feedData.image_name2}`} alt="" />
                                                    </a>
                                                    <div className="product-info-cart">
                                                        <a className="addcart-link" onClick={() => this.addToCart(feedData.id)}><i className="fa fa-shopping-basket"></i>  Add to Cart</a>
                                                        {this.state.alert}
                                                    </div>
                                                </div>
                                                <div className="product-info5">
                                                    <h3 className="title-product"><a href={`/product-view/${feedData.id}`}>{feedData.name} </a></h3>
                                                    <div className="info-price">
                                                        <span>Rs.{feedData.price} </span>
                                                    </div>
                                                    <div className="product-rating">
                                                        <div className="inner-rating"></div>
                                                        <span>(1s)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                )
                }, this);

        return (

     <div className="main-content-home5 best-deal">
        <div className="container">
            <div className="popcat-list-box popcat-list-box1">
                <h2 className="h2-white"><span>best deals</span></h2>
            </div>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="content-popular5">
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane fade in active" id="best1">
                                <div className="popular-cat-slider slider-home5">
                                    <div className="wrap-item" data-pagination="false" data-navigation="true" data-itemscustom="[[0, 1],[768, 2],[992, 3],[1200, 4]]">
                                    <OwlCarousel items={4} margin={0} autoplay ={false} nav dots={false} responsive={this.state.responsive}>
                                            {BestDeal}
                                    </OwlCarousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                );
    }
}
export default Best_Deal;