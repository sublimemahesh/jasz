import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {PostData} from '../../services/PostData';
import $ from 'jquery';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null
        };
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        const data = {
            fullName: $('#txtFullName').val(),
            phoneNumber: $('#txtPhoneNumber').val(),
            email: $('#txtEmail').val(),
            message: $('#txtMessage').val()
        }
        let reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (data.fullName == '' || !data.fullName) {
            const getAlert = () => (
                        <SweetAlert
                            show="true"
                            title="Error"
                            text="Enter Full Name"
                            type= "error"
                            >
                            Text
                        </SweetAlert>
                        );
            this.setState({
                alert: getAlert()
            });
            return false;
        } else if (data.phoneNumber == '' || !data.phoneNumber) {
            const getAlert = () => (
                        <SweetAlert
                            show="true"
                            title="Error"
                            text="Enter Phone Number"
                            type= "error"
                            >
                            Text
                        </SweetAlert>
                        );
            this.setState({
                alert: getAlert()
            });
            return false;
        } else if (data.email == '' || !data.email) {
            const getAlert = () => (
                        <SweetAlert
                            show="true"
                            title="Error"
                            text="Enter Email"
                            type= "error"
                            >
                            Text
                        </SweetAlert>
                        );
            this.setState({
                alert: getAlert()
            });
            return false;
        } else if (!reg.test(data.email)) {
            const getAlert = () => (
                        <SweetAlert
                            show="true"
                            title="Error"
                            text="Enter Valid email"
                            type= "error"
                            />

                        );
            this.setState({
                alert: getAlert()
            });
            return false;
        } else if (data.message == '' || !data.message) {
            const getAlert = () => (
                        <SweetAlert
                            show="true"
                            title="Error"
                            text="Enter Message"
                            type= "error"
                            >
                            Text
                        </SweetAlert>
                        );
            this.setState({
                alert: getAlert()
            });
            return false;
        } else {
            PostData('send-email', data).then((result1) => {
                let responseJson1 = result1;

                if (responseJson1.feedData) {

                    const getAlert = () => (
                                <SweetAlert
                                    show="true"
                                    title="Success"
                                    text="Your message was sent successfully."
                                    type= "success"
                                    />
                                );
                    this.setState({
                        alert: getAlert()
                    });

                } else {
                    const getAlert = () => (
                                <SweetAlert
                                    show="true"
                                    title="Error"
                                    text="There was an error. Please try again later."
                                    type= "error"
                                    />
                                );
                    this.setState({
                        alert: getAlert()
                    });
                }
            });
        }
    }
    render() {
        return (
                <div className="">
                    <Header />
                    <section id="subheader">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 ">
                                    <div class="col-md-6 div-big-heading">
                                        <h1 class="big-heading">
                                            Contact Us
                                        </h1>
                                    </div>
                                    <div class="col-md-6 div-p">
                                        <p><a href="./">Home</a> | Contact Us</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div id="content">
                        <div className="content-page">
                            <div className="container">
                                <div id="map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.7012449169483!2d80.21828671476821!3d6.035673595628789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bbfc276e21%3A0xf75b6ee22cc3e16c!2sGalle%20IT%20Solutions!5e0!3m2!1sen!2slk!4v1582711285947!5m2!1sen!2slk" width="100%" height="450" frameborder="0"></iframe>
                                </div>
                                <div className="contact-info-page">
                                    <div className="list-contact-info">
                                        <div className="row">
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <div className="item-contact-info">
                                                    <a className="contact-icon icon-mobile" href="#"><i className="fa fa-mobile"></i></a>
                                                    <h2><a href="#">(+94) 71 869 5499</a></h2>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <div className="item-contact-info">
                                                    <a className="contact-icon icon-phone" href="#"><i className="fa fa-map-marker"></i></a>
                                                    <h2><a href="#">JASZ Fashion, Main Street, Eheliyagoda 70600</a></h2>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <div className="item-contact-info last-item">
                                                    <a className="contact-icon icon-email" href="mailto:7uptheme@gmail.com"><i className="fa fa-envelope"></i></a>
                                                    <h2><a href="mailto:7uptheme@gmail.com">dewendraa@gmail.com</a></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-form-page">
                                    <h2>contact from</h2>
                                    <div className="form-contact">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-3 col-sm-4 col-xs-12">
                                                    <input type="text" name="name" id="txtFullName" placeholder="Full Name *" />
                                                </div>
                                                <div className="col-md-3 col-sm-4 col-xs-12">
                                                    <input type="text" name="phone_number" id="txtPhoneNumber" placeholder="Phone Number *" />
                                                </div>
                                                <div className="col-md-6 col-sm-4 col-xs-12">
                                                    <input type="text" name="email" id="txtEmail" placeholder="Email *" />
                                                </div>
                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                    <textarea name="message" id="txtMessage" cols="30" rows="8"></textarea>
                                                </div>
                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                    <span type="submit" id="btnSubmit" onClick={this.submitForm} className="btn btn-room">SEND</span>
                                                </div>
                                                {this.state.alert}
                                            </div>
                                        </form>
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
export default Contact;