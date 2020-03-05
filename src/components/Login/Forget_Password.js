import React, { Component } from 'react';
import {PostData} from '../../services/PostData';
import $ from 'jquery';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

class Forget_Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
        };
        this.sendEmail = this.sendEmail.bind(this);
    }
    componentWillMount() {
    }
    sendEmail() {
            const email =  $('#txtEmail').val();
            let reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            if (email == '' || !email) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Email"
                        type= "error"
                      />
                );
                this.setState({
                     alert: getAlert()
                 });
                 return false;
            }  else if (!reg.test(email)) {
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
            }  else {
                PostData('send-reset-code', email).then((result1) => {
                    let responseJson1 = result1;
                    if (responseJson1.feedData === 'success') {
                        const getAlert = () => (
                            <SweetAlert
                                show="true"
                                title="Success"
                                text="The reset code was sent successfully to your e-mail address."
                                type= "success"
                              />
                           );
                           this.setState({
                                alert: getAlert()
                            });
                            this.props.history.push("/reset-password");
                     } else {
                         const getAlert = () => (
                            <SweetAlert
                                show="true"
                                title="Error"
                                text={responseJson1.feedData}
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
                <div id="content">
                    <div className="content-page">
			<div className="container">
				<div className="row">
					<div className="col-md-10 col-sm-12 col-xs-12 col-md-offset-1">
						<h2 className="title-shop-page">Forget Password</h2>
						<div className="row">
							<div className="col-md-6 col-md-offset-3 col-sm-12 col-ms-12">
								<div className="account-login">
									<div className="form-my-account form-forget-password">
										<h2 className="title">Please enter your emil address to change password or username. We will send a link to your email...</h2>
										<p><input type="text" placeholder="Email *" id="txtEmail"/></p>
										<p><button  onClick={this.sendEmail}>Send Email</button>{this.state.alert}</p>
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
export default Forget_Password;