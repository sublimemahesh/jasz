import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


class Terms_And_Conditions extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }

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
                                            Terms & Conditions
                                        </h1>
                                    </div>
                                    <div className="col-md-6 div-p">
                                        <p><a href="./">Home</a> | Terms & Conditions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <div id="content" className="terms-and-condition-page">
                    <div className="content-page">
			<div className="container">
                            <div className="row">
                                <div className="col-md-12 col-xl-12 col-lg-12 beautypress-replay-answer-container terms-and-conditions-section">
                                    <ol type="1">
                                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                        <ul type="disc">
                                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,</li>
                                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,</li>
                                        </ul>
                                        </li>
                                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                                    </ol>
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
export default Terms_And_Conditions;