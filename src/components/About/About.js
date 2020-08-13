import React, { Component }
from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class About extends Component {
    render() {
        return (
                <div className="">
                    <Header />
                    <section id="subheader">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 ">
                                    <div className="col-md-6 div-big-heading">
                                        <h1 className="big-heading">
                                            About Us
                                        </h1>
                                    </div>
                                    <div className="col-md-6 col-sm-12 div-p">
                                        <p><a href="./">Home</a> | About Us</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div id="content">
                        <div className="content-page">
                            <div className="container">
                                <div className="protect-video">
                                    <div className="row">
                                        <div className="col-md-5 col-sm-12 about-main-description">
                                            <h2 className="title-default">JASZ FASHION</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.Aenean commodo ligula eget dolor. Aenean massa.Aenean commodo ligula eget dolor. Aenean massa.Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.</p>
                                        </div>
                                        <div className="col-md-7 col-sm-12 about-main-img">
                                            <img src={`assets/img/banner/about.png`} alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="list-company-importance">
                                    <h2 className="title-shop-page">The importance of the company</h2>
                                    <div className="list-feature-boxes">
                                        <div className="row">
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <div className="item-feature-box text-center feature-box-style-12">
                                                    <div className="feature-box-icon">
                                                        <a href="#" className="feature-box-link">
                                                            <span className="lnr fa fa-eye"></span>
                                                        </a>
                                                    </div>
                                                    <div className="feature-box-info">
                                                        <h3><a href="#">Vision</a></h3>
                                                        <p>Freegan lomo master cleanse, bitters hoodie gastropub cardigan synth sus tainable PBR next level semiotics.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <div className="item-feature-box text-center feature-box-style-12">
                                                    <div className="feature-box-icon">
                                                        <a href="#" className="feature-box-link">
                                                            <span className="lnr fa fa-rocket"></span>
                                                        </a>
                                                    </div>
                                                    <div className="feature-box-info">
                                                        <h3><a href="#">Mission</a></h3>
                                                        <p>Freegan lomo master cleanse, bitters hoodie gastropub cardigan synth sus tainable PBR next level semiotics.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <div className="item-feature-box text-center feature-box-style-12 feature-box-values">
                                                    <div className="feature-box-icon">
                                                        <a href="#" className="feature-box-link">
                                                            <span className="lnr fa fa-heart"></span>
                                                        </a>
                                                    </div>
                                                    <div className="feature-box-info">
                                                        <h3><a href="#">Values</a></h3>
                                                        <p>Freegan lomo master cleanse, bitters hoodie gastropub cardigan synth sus tainable PBR next level semiotics.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                );
    }
}
export default About;