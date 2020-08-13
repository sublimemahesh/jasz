import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {PostData} from '../../services/PostData';
import $ from 'jquery';
import Swal from 'sweetalert2';

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
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Full Name.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.phoneNumber == '' || !data.phoneNumber) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Phone Number.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.email == '' || !data.email) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Email.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (!reg.test(data.email)) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Valid email.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.message == '' || !data.message) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Message',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else {
            PostData('send-email', data).then((result1) => {
                let responseJson1 = result1;

                if (responseJson1.feedData) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        text: 'Your message was sent successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    })

                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        text: 'There was an error. Please try again later.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
        }
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
                                            Contact Us
                                        </h1>
                                    </div>
                                    <div className="col-md-6 div-p">
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
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31690.258793555142!2d80.24083135969691!3d6.856722691711213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3af8b532ab8bd%3A0x374fc03d3afa85d3!2sEheliyagoda!5e0!3m2!1sen!2slk!4v1597225633389!5m2!1sen!2slk" width="100%" height="450" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
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