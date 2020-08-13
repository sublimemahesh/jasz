import React, { Component } from 'react';

class Privacy_Shipping extends Component {
    render() {
        return (
                <div className="privacy-shipping">
            <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="item-privacy-shipping privacy-green-box">
                        <ul>
                            <li><i className="fa fa-usd"></i></li>
                            <li>
                                <h2>30 DAYS RETURN</h2>
                                <span>money back</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="item-privacy-shipping privacy-green-box">
                        <ul>
                            <li><i className="fa fa-truck"></i></li>
                            <li>
                                <h2>FREE SHIPPING</h2>
                                <span>on all orders over $99</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="item-privacy-shipping privacy-green-box">
                        <ul>
                            <li><i className="fa fa-database"></i></li>
                            <li>
                                <h2>LOWEST PRICE</h2>
                                <span>guarantee</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="item-privacy-shipping privacy-green-box">
                        <ul>
                            <li><i className="fa fa-hand-o-right"></i></li>
                            <li>
                                <h2>SAFE SHOPPING</h2>
                                <span>guarantee 100%</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
                );
    }
}
export default Privacy_Shipping;