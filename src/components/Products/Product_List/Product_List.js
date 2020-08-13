import React, { Component }
    from 'react';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { PostData } from '../../../services/PostData';
import Product_Item from './Product_Item/Product_Item';

class Product_List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            categoryDetails: false,
            subCategoryDetails: false,
            brandDetails: false
        }
        this.addToCart = this.addToCart.bind(this);
        this.getCategoryDetails = this.getCategoryDetails.bind(this);
        this.getSubCategoryDetails = this.getSubCategoryDetails.bind(this);
        this.getBrandDetails = this.getBrandDetails.bind(this);
    }
    componentWillMount() {
        this.getCategoryDetails();
        this.getSubCategoryDetails();
        this.getBrandDetails();
        
    }

    addToCart(id) {
        let items = sessionStorage.getItem("cart");
        let arr = [];
        // console.log("items", JSON.parse(sessionStorage.getItem("cart")));
        if (items === '' || items === null) {

            let arr = [{ id: id, qty: 1 }];
            sessionStorage.setItem("cart", JSON.stringify(arr));
            // console.log("items", JSON.parse(sessionStorage.getItem("cart")));
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
    getCategoryDetails() {
        PostData('category').then((result3) => {
            // console.log("123456: ", result3);
            let responseJson3 = result3;
            if (responseJson3.feedData) {
                this.setState({ categoryDetails: responseJson3.feedData });
            }
        });
    }
    getSubCategoryDetails() {
        PostData('subcategory').then((result4) => {
            // console.log("123456: ", result4);
            let responseJson4 = result4;
            if (responseJson4.feedData) {
                this.setState({ subCategoryDetails: responseJson4.feedData });
            }
            
        });
    }
    getBrandDetails() {
        PostData('brand').then((result5) => {
            // console.log("123456: ", result5);
            let responseJson5 = result5;
            if (responseJson5.feedData) {
                this.setState({ brandDetails: responseJson5.feedData });
            }
        });
    }
    render() {
        // console.log("this.state", this.state);
        return (
            <div className="wrap-item1">
                <div className="row col-md-12 prod-list">
                    {this.state.categoryDetails && this.state.subCategoryDetails && this.state.brandDetails &&
                    this.props.feedData.length ?
                        this.props.feedData.map((feedData) =>
                            <Product_Item feedData={feedData} alert={this.state.alert} addToCart={this.addToCart} categories={this.state.categoryDetails} subcategories={this.state.subCategoryDetails} brands={this.state.brandDetails} />
                        )  : <h4 className="m-l-20 m-b-30">Search result is empty.</h4>
                    }
                </div>
            </div>

        );
    }
}
export default Product_List;