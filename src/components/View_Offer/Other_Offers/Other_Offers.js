import React, { Component } from 'react';

class Other_Offers extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let Order_List = this.props.feedData
                .map(function (feedData, index) {

                    return (
                            <li class="clearfix">
                                <div class="product-related-thumb">
                                    <a href={`/offer-view/${feedData.id}`}><img className="first-thumb" alt="" src={`../upload/offer/thumb/${feedData.image_name}`} /></a>
                                </div>
                                <div class="product-related-info">
                                    <h3 class="title-product"><a href={`/offer-view/${feedData.id}`}>{feedData.title}</a></h3>
                                    <div class="info-price">
                                    <span>Rs.{feedData.price}</span><br /><del>Rs.{feedData.price}</del>
                                    </div>

                                </div>
                            </li>

                            )
                }, this);
        return (
                <div class="col-md-3 col-sm-6 col-xs-12">
                                <div class="sidebar-shop sidebar-left">
                                    <div class="widget widget-related-product">
                                        <h2 class="widget-title">RELATED PRODUCTS</h2>
                                        <ul class="list-product-related">
                                            {Order_List}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                );
    }
}
export default Other_Offers;