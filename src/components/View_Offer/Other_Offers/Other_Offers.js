import React, { Component } from 'react';

class Other_Offers extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let Order_List = '';
        if (this.props.feedData.length) {
        Order_List = this.props.feedData
            .map(function (feedData, index) {

                return (
                    <li className="clearfix">
                        <div className="product-related-thumb">
                            <a href={`/offer-view/${feedData.id}`}><img className="first-thumb" alt="" src={`../upload/offer/thumb/${feedData.image_name}`} /></a>
                        </div>
                        <div className="product-related-info">
                            <h3 className="title-product"><a href={`/offer-view/${feedData.id}`}>{feedData.title}</a></h3>
                            <div className="info-price">
                                <span>{feedData.discount != 0 && feedData.discount != '' ? "Rs. " + (new Intl.NumberFormat().format(feedData.price - (feedData.price * feedData.discount / 100))) : "Rs. " + new Intl.NumberFormat().format((feedData.price))}</span>
                                <del>{feedData.discount != 0 && feedData.discount != '' && "Rs. " + (new Intl.NumberFormat().format(feedData.price))}</del>
                            </div>

                        </div>
                    </li>

                )
            }, this);
        } else {
            Order_List = 'Search result is empty.';

        }
        return (
            <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="sidebar-shop sidebar-left">
                    <div className="widget widget-related-product">
                        <h2 className="widget-title">RELATED OFFERS</h2>
                        <ul className="list-product-related">
                            {Order_List}
                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}
export default Other_Offers;