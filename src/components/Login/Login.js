import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import $ from 'jquery';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';


class Login extends Component {
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
        // this.submitRegisterForm = this.submitRegisterForm.bind(this);
        this.submitLoginForm = this.submitLoginForm.bind(this);
    }
    componentWillMount() {

        this.checkAuthentication();
    }
    checkAuthentication() {
        PostData('auth1', this.state.memberAuthDetails).then((result) => {
            this.props.history.push("/my-account/profile");
        });
    }
    submitLoginForm() {
        const data = {
            email: $('#email').val(),
            password: $('#password').val()

        }

        if (data.email == '' || !data.email) {
            
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Enter Email.',
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
        } else {
            PostData('login', data).then((result1) => {
                let responseJson1 = result1;
                if (responseJson1.feedData) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: 'Successfully Logged In.',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    sessionStorage.setItem("member_id", responseJson1.feedData.id);
                    sessionStorage.setItem("member_auth", responseJson1.feedData.auth_token);
                    $('#email').val("");
                    $('#password').val("");
                    this.props.history.push("/my-account/profile");
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        text: 'There was an error. Try again.',
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
                <div id="content" className="login-page">
                    <div className="content-page">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 col-sm-12 col-xs-12 col-md-offset-1">
                                    <h2 className="title-shop-page login-title">Login</h2>
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-ms-12">
                                            <div className="account-login">
                                                <div className="form-my-account">
                                                    {/* <h2 className="title">Login</h2> */}
                                                    <p><input type="text" placeholder="Email *" id="email" /></p>
                                                    <p><input type="password" placeholder="Password *" id="password" /></p>
                                                    <p className="lost-password-p">
                                                        <NavLink to="/forget-password">Lost Password?</NavLink>
                                                    </p>
                                                    <p><button onClick={this.submitLoginForm}>Login</button>{this.state.alert}</p>
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
export default Login;