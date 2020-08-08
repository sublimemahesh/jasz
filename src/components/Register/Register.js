import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import $ from 'jquery';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Swal from 'sweetalert2';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            alert: null,
            memberAuthDetails: {
                id: sessionStorage.getItem("member_id"),
                authToken: sessionStorage.getItem("member_auth")
            }
        };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.submitRegisterForm = this.submitRegisterForm.bind(this);
        // this.submitLoginForm = this.submitLoginForm.bind(this);
    }
    componentWillMount() {

        this.checkAuthentication();
    }
    checkAuthentication() {
        PostData('auth1', this.state.memberAuthDetails).then((result) => {
            this.props.history.push("/my-account/profile");
        });
    }
    submitRegisterForm() {
        const data = {
            fullname: $('#txtFullName').val(),
            email: $('#txtEmail').val(),
            username: $('#txtUserName').val(),
            password: $('#txtPassword').val(),
            cpassword: $('#txtCPassword').val()

        }
        let reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (data.fullname == '' || !data.fullname) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Full Name',
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
        } else if (data.username == '' || !data.username) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter User Name.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.password == '' || !data.password) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Password.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.cpassword == '' || !data.cpassword) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Confirm Password.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else if (data.password != data.cpassword) {

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Password and Confirm Password is not matched.',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        } else {
            PostData('register', data).then((result1) => {
                console.log(`1: `, result1);
                let responseJson1 = result1;

                if (responseJson1.feedData.status == 'error') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        text: 'Your email is already existed. Please reset your password or try with another email.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else if (responseJson1.feedData.status == 'error1') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        text: 'There was an error.Please try again.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: 'Successfully registered. Please login in first.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    sessionStorage.setItem("member_id", responseJson1.feedData.id);
                    sessionStorage.setItem("member_auth", responseJson1.feedData.auth_token);
                    $('#txtFullName').val("");
                    $('#txtEmail').val("");
                    $('#txtUserName').val("");
                    $('#txtPassword').val("");
                    $('#txtCPassword').val("");
                    this.props.history.push("/my-account/profile");

                }
            });
        }
    }

    render() {
        return (
            <div className="">
                <Header />
                <div id="content">
                    <div className="content-page">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 col-sm-12 col-xs-12 col-md-offset-1">
                                    <h2 className="title-shop-page">Sign Up</h2>
                                    <div className="row">

                                        <div className="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-ms-12">
                                            <div className="account-register">
                                                <div className="form-my-account">
                                                    {/* <h2 className="title">Register</h2> */}
                                                    <p><input type="text" placeholder="Full Name *" id="txtFullName" /></p>
                                                    <p><input type="text" placeholder="E-mail *" id="txtEmail" /></p>
                                                    <p><input type="text" placeholder="Username *" id="txtUserName" /></p>
                                                    <p><input type="password" placeholder="Password *" id="txtPassword" /></p>
                                                    <p><input type="password" placeholder="Confirm Password *" id="txtCPassword" /></p>
                                                    <p><button onClick={this.submitRegisterForm}>Register</button>{this.state.alert}</p>
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
export default Register;