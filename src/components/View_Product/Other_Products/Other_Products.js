import React, { Component } from 'react';
import { PostData } from '../../../services/PostData';

class Other_Products extends Component {
    constructor(props) {
        super(props);
        this.getBrandDetails = this.getBrandDetails.bind(this);
    }
    getBrandDetails(id) {
        PostData('brand-details-by-id', id).then((result5) => {
            console.log(result5);
            let responseJson5 = result5;
            if (responseJson5.feedData) {
                console.log("responseJson5.feedData.name:", responseJson5.feedData.name);
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
                        <li class="clearfix">
                            <div class="product-related-thumb">
                                <a href={`/product-view/${feedData.id}`}><img className="first-thumb" alt="" src={`../upload/product/thumb/${feedData.image_name}`} /></a>
                            </div>
                            <div class="product-related-info">
                                <h3 class="title-product"><a href={`/product-view/${feedData.id}`}>{feedData.name}</a></h3>
                                {/* <span>Brand: {this.getBrandDetails(feedData.id)}</span> */}
                                <div class="info-price">
                                    <span>{feedData.discount != 0 && feedData.discount != '' ? "Rs. " + (new Intl.NumberFormat().format(feedData.price - (feedData.price * feedData.discount / 100))) : "Rs. " + new Intl.NumberFormat().format((feedData.price))}</span><br />
                                    <del>{feedData.discount != 0 && feedData.discount != '' && "Rs. " + (new Intl.NumberFormat().format(feedData.price))}</del>
                                </div>
                            </div>
                        </li>

                    )
                }, this);
        } else {
            Product_List = 'No any products in the database.';

        }

        return (
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="sidebar-shop sidebar-left">
                    <div class="widget widget-related-product">
                        <h2 class="widget-title">RELATED PRODUCTS</h2>
                        <ul class="list-product-related">
                            {Product_List}
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}
export default Other_Products;