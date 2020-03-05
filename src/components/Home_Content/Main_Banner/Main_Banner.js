import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Main_Banner extends Component {
    render() {
        return (
                <div className="col-md-6 col-sm-12 col-xs-12">
                            <div className="banner-home4 simple-owl-slider">
                                <div className="wrap-item" data-navigation="true" data-pagination="false" data-itemscustom="[[0,1]]">
        <OwlCarousel items={1} margin={0} autoplay ={true} loop nav dots={false}>
        <div className="item-banner4">
                                        <div className="banner-thumb">
                                            <a href="#"><img src={'assets/img/main-banner/2.png'} alt="banner_01" /></a>
                                        </div>
                                    </div>
                                    <div className="item-banner4">
                                        <div className="banner-thumb">
                                            <a href="#"><img src={'assets/img/main-banner/1.png'} alt="banner_02" /></a>
                                        </div>
                                    </div>
                                    </OwlCarousel>
                                </div>
                            </div>
                        </div>
                );
    }
}
export default Main_Banner;