import React, { Component } from 'react';
import { PostData } from '../../../services/PostData';
import { NavLink } from 'react-router-dom';

class Other_Products extends Component {
    constructor(props) {
        super(props);
        this.getBrandDetails = this.getBrandDetails.bind(this);
    }
    getBrandDetails(id) {
        PostData('brand-details-by-id', id).then((result5) => {
            let responseJson5 = result5;
            if (responseJson5.feedData) {
                return responseJson5.feedData.name;
            }
        });
    }
    render() {
        let Product_List = '';
        if (this.props.feedData.length) {
            Product_List = this.props.feedData
                .map(function (feedData, index) {
                    return (
                        <li className="clearfix">
                            <div className="product-related-thumb">
                                <a href={`/product-view/${feedData.id}`}><img className="first-thumb" alt="" src={`../upload/product/thumb/${feedData.image_name}`} /></a>
                            </div>
                            <div className="product-related-info">
                                <h3 className="title-product"><a href={`/product-view/${feedData.id}`}>{feedData.name}</a></h3>
                                {/* <span>Brand: {this.getBrandDetails(feedData.id)}</span> */}
                                <div className="info-price">
                                    <span>{feedData.discount != 0 && feedData.discount != '' ? "Rs. " + (new Intl.NumberFormat().format(feedData.price - (feedData.price * feedData.discount / 100))) : "Rs. " + new Intl.NumberFormat().format((feedData.price))}</span><br />
                                    <del>{feedData.discount != 0 && feedData.discount != '' && "Rs. " + (new Intl.NumberFormat().format(feedData.price))}</del>
                                </div>
                            </div>
                        </li>

                    )
                }, this);
        } else {
            Product_List = 'Search result is empty.';

        }

        return (
            <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="sidebar-shop sidebar-left">
                    <div className="widget widget-related-product">
                        <h2 className="widget-title">RELATED PRODUCTS</h2>
                        <ul className="list-product-related">
                            {Product_List}
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}
export default Other_Products;