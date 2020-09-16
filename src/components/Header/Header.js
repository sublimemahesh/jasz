import React, { Component }
from 'react';
import './Header.css';
import logo from '../../images/logo/logo.png';
import {PostData} from '../../services/PostData';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';

//
//export default withRouter(MyComponent);


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            brands: [],
            selectedOption: {value: "0", label: "Select Category"},
            selectedOption1: {value: "0", label: "Select Brand"},
            categoryID: '',
            brandID: '',
            count: '',
            redirect: false,
        };
        this.getCategories = this.getCategories.bind(this);
        this.getBrands = this.getBrands.bind(this);
        this.getCartCount = this.getCartCount.bind(this);
        this.displayNav = this.displayNav.bind(this);
    }

    componentWillMount() {
        this.getCategories();
        this.getBrands();
        this.getCartCount();
    }
    getCartCount()  {
        let count = 0;
        let cartcount = sessionStorage.getItem("cart_count");
        if(cartcount == ''  || cartcount == null) {
             count =  0;
         } else {
             count =  cartcount;
         }

         this.setState({count: count});

    }
    getCategories() {
        PostData('category').then((result) => {
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({category: responseJson.feedData});
            }
        });
    }
    getBrands() {
        PostData('brand').then((result2) => {
            let responseJson2 = result2;

            if (responseJson2.feedData) {
                this.setState({brands: responseJson2.feedData});
            }
        });
    }
    submitForm = (e) => {
        e.preventDefault();
        this.props.history.push("/products")
    }

    handleChange = selectedOption => {
        this.setState({selectedOption});
        this.setState({
            categoryID: selectedOption.value
        });
    }
    handleChange1 = selectedOption1 => {
        this.setState({selectedOption1});
    }
    displayNav() {
        $('.main-nav4 ul').toggleClass('show-nav');
    }

    render()
    {
        let options = this.state.category
                .map(function (category, index) {
                    return (
                            {value: category.id, label: category.name}
                    )
                }, this);
        let options1 = this.state.brands
                .map(function (brand, index) {
                    return (
                            {value: brand.id, label: brand.name}
                    )
                }, this);
        const {selectedOption} = this.state;
        const {selectedOption1} = this.state;


        return (
                <div id="header">
                    <div className="container">
                        <div className="header4">
                            <div className="row">
                                <div className="col-md-3 col-sm-3 col-xs-12">
                                    <div className="logo4">
                                        <NavLink to="/home"><img src={logo} alt="Logo" /></NavLink>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-1 col-xs-12 col-space">
                                </div>
                                <div className="col-md-2 col-sm-2 col-xs-6">
                                    <div className="wrap-register-cart">
                                        <div className="register-box">
                                            <h4 className="header-contact-details">HOTLINE</h4>
                                            <p className="">(+94) 71 869 5499</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 col-sm-2 col-xs-6">
                                    <div className="wrap-register-cart wrap-register-cart-hotline">
                                        <div className="register-box">
                                           <h4 className="header-contact-details">EMAIL</h4>
                                            <p className="header-contact-details-p">sales@dewendra.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 col-sm-4 col-xs-12">
                                    <div className="wrap-register-cart">
                                        <div className="register-box">
                                            <ul>
                                                <li><NavLink to="/login">Login</NavLink></li>
                                                <li><NavLink to="/register">Sign Up</NavLink></li>
                                            </ul>
                                            <p>My Account & Order</p>
                                        </div>
                                        <div className="mini-cart mini-cart-2">
                                            <NavLink to="/cart" className="header-mini-cart2">
                                                <span className="total-mini-cart-icon"><i className="fa fa-shopping-basket"></i></span>
                                                <span className="total-mini-cart-item" id="header-cart" items={this.state.count}>{this.state.count}</span>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-nav2 header-nav4">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-sm-12 col-xs-12 col-md-offset-3">
                                    <nav className="main-nav main-nav4">
                                        <ul>
                                            <li><NavLink to="../">home</NavLink></li>
                                            <li><NavLink to="/products">products</NavLink></li>
                                            <li><NavLink to="/brands">brands</NavLink></li>
                                            <li><NavLink to="/offer">Offer</NavLink></li>
                                            <li><NavLink to="/about">About</NavLink></li>
                                            <li><NavLink to="/contact">Contact</NavLink></li>
                                        </ul>
                                        <NavLink to="#" className="toggle-mobile-menu" onClick={this.displayNav}><span>Menu</span></NavLink>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                );
                    }
                }
        export default Header;