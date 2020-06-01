import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Testimonial extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let Testimonial = this.props.feedData
                .map(function (feedData, index) {

        return (
                <div className="item">
                                <ul className="list-product-hotdeal">

                                 <li>
                                        <div className="author-testimo">
                                            <div className="author-test-link">
                                                <a href="#"><img src={`upload/comments/${feedData.image_name}`} alt="" /></a>
                                            </div>
                                            <div className="author-test-info">
                                                <h3><a href="#">{feedData.name}</a></h3>
                                                <span>{feedData.title}</span>
                                            </div>
                                        </div>
                                        <p className="desc" dangerouslySetInnerHTML={{ __html: feedData.comment }} />
                                    </li>
                                </ul>
                            </div>

                )
        }, this);
        return (
                <div className="testi col-md-3 col-sm-6 col-sm-order-3 col-xs-12">
                <div className="hot-deals">
                    <h2><i className="fa fa-clock-o"></i> Testimonial</h2>
                    <div className="hotdeals-slider slider-home4 simple-owl-slider">
                        <div className="wrap-item" data-navigation="true" data-pagination="false" data-itemscustom="[[0,1]]">
                        <OwlCarousel items={1} margin={0} autoplay ={true} loop nav dots={false}>
                            {Testimonial}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </div>

                );
    }
}
export default Testimonial;