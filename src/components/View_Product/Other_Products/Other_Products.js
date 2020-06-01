import React, { Component } from 'react';

class Other_Products extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let Product_List = '';
        if(this.props.feedData.length) {
        Product_List = this.props.feedData
                .map(function (feedData, index) {
                    return (
                            <li class="clearfix">
                                <div class="product-related-thumb">
                                    <a href={`/product-view/${feedData.id}`}><img className="first-thumb" alt="" src={`../upload/product/thumb/${feedData.image_name}`} /></a>
                                </div>
                                <div class="product-related-info">
                                    <h3 class="title-product"><a href={`/product-view/${feedData.id}`}>{feedData.name}</a></h3>
                                    <div class="info-price">
                                    <span>Rs.{feedData.price}</span><br /><del>Rs.{feedData.price}</del>
                                    </div>
                                    <div class="product-rating">
                                        <div class="inner-rating"></div>
                                        <span>(6s)</span>
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