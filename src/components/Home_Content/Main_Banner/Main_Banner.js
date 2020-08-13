import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Main_Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responsive: {
                0: {
                    items: 1,
                },
                580: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
            }
        };
    }
    render() {
        let Banner = this.props.feedData
            .map(function (feedData, index) {
                return (
                    <div className="item-banner4">
                        <div className="banner-thumb">
                            {/* <a href="#"> */}
                            <img src={`upload/offer-banner/${feedData.image_name}`} alt={feedData.caption} />
                            {/* </a> */}
                        </div>
                    </div>
                );
            }, this);
        return (
            <div className="main-banner col-md-6 col-sm-12 col-xs-12">
                <div className="banner-home4 simple-owl-slider">
                    <div className="wrap-item" data-navigation="true" data-pagination="false" data-itemscustom="[[0,1]]">
                        <OwlCarousel items={1} margin={0} autoplay={true} loop nav dots={false} responsive={this.state.responsive}>
                            {Banner}
                        </OwlCarousel>
                    </div>
                </div>
            </div>

        );
    }
}
export default Main_Banner;