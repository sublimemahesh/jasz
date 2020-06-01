import React, { Component } from 'react';
import {PostData} from '../../../services/PostData';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';

class Category_Side_Bar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
console.log(`this: `,this.props.feedData);
        let CategorySideBar = this.props.feedData
                .map(function (feedData, index) {
                    const location = {
                      pathname: '/products',
                      state: { category: feedData.cat_id }
                    }
                    let SubCategory = feedData.subcategories
                        .map(function (subcategory, index) {
                            const location1 = {
                                pathname: '/products',
                                state: { subcategory: subcategory.id }
                              }
                            return (
                            <h2 className="title-cat-mega-menu"><Link class="addcart-link" to={location1} >{subcategory.name}</Link></h2>
                            )
                    }, this);


                        if (feedData.have_sub == 1) {
                          return (
                          <li className="has-cat-mega">
                            <Link class="addcart-link" to={location} >{feedData.cat_name}</Link>
                                <div className="cat-mega-menu cat-mega-style1">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12">
                                            <div className="list-cat-mega-menu">
                                                {SubCategory}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </li>
                          )
                        } else {
                            return (
                              <li className="">
                                <Link class="addcart-link" to={location} >{feedData.cat_name}</Link>

                            </li>
                            )
                          }

                }, this);
        return (
                <div className="cate-bar col-md-3 col-sm-6 col-xs-12 visible-sm">
                    <div className="wrap-category-hover4">
                        <div className="inner-category-hover4">
                            <h2 className="title-category-hover"><span>Categories</span></h2>
                            <ul className="list-category-hover">
                                {CategorySideBar}
                            </ul>
                            <a className="expand-list-link" href="#"></a>
                        </div>
                    </div>
                </div>
                );
    }
}
export default Category_Side_Bar;