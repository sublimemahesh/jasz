import React, { Component } from 'react';
import pay1 from '../../images/home2/pay1.png';
import pay2 from '../../images/home2/pay2.png';
import pay3 from '../../images/home2/pay3.png';
import pay4 from '../../images/home2/pay4.png';
import { PostData } from '../../services/PostData';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            brands: []
        };
        this.getCategories = this.getCategories.bind(this);
        this.getBrands = this.getBrands.bind(this);
    }

    componentWillMount() {
        this.getCategories();
        this.getBrands();
    }
    getCategories() {
        PostData('category').then((result) => {
            let responseJson = result;

            if (responseJson.feedData) {
                this.setState({ category: responseJson.feedData });
            }
        });
    }
    getBrands() {
        PostData('brand').then((result2) => {
            let responseJson2 = result2;

            if (responseJson2.feedData) {
                this.setState({ brands: responseJson2.feedData });
            }
        });
    }
    render() {
        let Category_List = this.state.category
            .map(function (category, index) {
                if (index < 4) {
                    const location = {
                        pathname: '/products',
                        state: { category: category.id }
                    }
                    return (
                        <li><NavLink to={location}>{category.name}</NavLink></li>
                        // <li><a href={`/products/${category.id}`}>{category.name}</NavLink></li>
                    )
                }
            }, this);
        let Brand_List = this.state.brands
            .map(function (brand, index) {
                if (index < 4) {
                    const location1 = {
                        pathname: '/products',
                        state: { brand: brand.id }
                    }
                    return (
                        <li><NavLink to={location1}>{brand.name}</NavLink></li>
                    )
                }
            }, this);
        return (
            <div id="footer">
                <div className="list-box-footer2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <a className="back-to-top" href="#">Top</a>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="item-box-footer2">
                                    <h2>Categories</h2>
                                    <ul className="menu-footer2">
                                        {Category_List}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="item-box-footer2">
                                    <h2>Brands</h2>
                                    <ul className="menu-footer2">
                                        {Brand_List}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="item-box-footer2">
                                    <h2>Quick Links</h2>
                                    <ul className="menu-footer2">
                                        <li><NavLink to="/products">Products</NavLink></li>
                                        <li><NavLink to="/offer">Offers</NavLink></li>
                                        <li><NavLink to="/about">About Us</NavLink></li>
                                        <li><NavLink to="/contact">Contact Us</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="item-box-footer2">
                                    <h2>Contact us</h2>
                                    <ul className="contact-footer2">
                                        <li><i className="fa fa-map-marker"></i>Dewendra Brand Store, No. 59A Main Street, Eheliyagoda.</li>
                                        <li><i className="fa fa-mobile"></i> (+94) 71 869 5499</li>
                                        <li><i className="fa fa-envelope-o"></i> sales@dewendra.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 col-sm-5 col-xs-12">
                                <div className="copyright2">
                                    <p>Copyright DEWENDRA.COM © 2020. All Rights Reserved. </p>
                                    <p>Designed by <a href="www.synotec.lk">Synotec Holdings (pvt) Ltd.</a></p>
                                </div>
                            </div>
                            <div className="col-md-7 col-sm-7 col-xs-12">
                                <div className="payment2 payment-method">
                                    <a href="#"><img src={pay1} alt="" /></a>
                                    <a href="#"><img src={pay2} alt="" /></a>
                                    <a href="#"><img src={pay3} alt="" /></a>
                                    <a href="#"><img src={pay4} alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Footer;