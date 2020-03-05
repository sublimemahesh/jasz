import React, { Component } from 'react';
import $ from 'jquery';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class Product_List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null
        }
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
        let Product_List = this.props.feedData
                .map(function (feedData, index) {
console.log(feedData);
                    return (
                            <div className="item col-md-3">
                                <div className="item-product">
                                    <div className="product-thumb">
                                        <a className="product-thumb-link" href={`/product-view/${feedData.id}`}>
                                            <img className="first-thumb" alt="" src={`upload/product/${feedData.image_name}`} />
                                            <img className="second-thumb" alt="" src={`upload/product/${feedData.image_name2}`} />
                                        </a>
                                        <div className="product-info-cart">
                                            <a className="addcart-link" onClick={() => this.addToCart(feedData.id)}><i className="fa fa-shopping-cart"></i> Add to Cart</a>
                                            {this.state.alert}
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="title-product"><a href={`/product-view/${feedData.id}`}>{feedData.name}</a></h3>
                                        <div className="info-price">
                                            <span>Rs. {feedData.price}</span><del>Rs. {feedData.price}</del>
                                        </div>
                                        <div className="product-rating">
                                            <div className="inner-rating"></div>
                                            <span>(6s)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            )
                }, this);
        return (
                <div className="wrap-item1">
                    <div className="row col-md-12 prod-list">
                        {Product_List}
                    </div>
                </div>

                );
    }
}
export default Product_List;