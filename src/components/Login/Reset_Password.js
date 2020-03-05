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
        this.resetPassword = this.resetPassword.bind(this);
    }
    componentWillMount() {
    }
    resetPassword() {
            const data = {
                resetCode: $('#txtResetCode').val(),
                newPW: $('#txtNewPw').val(),
                confirmPW: $('#txtConfirmPw').val()

            }
            if (data.resetCode == '' || !data.resetCode) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter Reset Code"
                        type= "error"
                      />
                );
                this.setState({
                     alert: getAlert()
                 });
                 return false;
            }  else if (data.newPW == '' || !data.newPW) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Enter New Password"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.confirmPW == '' || !data.confirmPW) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="Please Confirm Password"
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            } else if (data.newPW != data.confirmPW) {
                const getAlert = () => (
                    <SweetAlert
                        show="true"
                        title="Error"
                        text="New Password And Confirm Password Are Not Matched."
                        type= "error"
                      />

                   );
               this.setState({
                    alert: getAlert()
                });
                 return false;
            }  else {
                PostData('reset-password', data).then((result1) => {
                    let responseJson1 = result1;
                    if (responseJson1.feedData === 'success') {
                        const getAlert = () => (
                            <SweetAlert
                                show="true"
                                title="Success"
                                text="The password was changed successfully."
                                type= "success"
                              />
                           );
                           this.setState({
                                alert: getAlert()
                            });
                            this.props.history.push("/login");
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
						<h2 className="title-shop-page">Reset Password</h2>
						<div className="row">
							<div className="col-md-6 col-md-offset-3 col-sm-12 col-ms-12">
								<div className="account-login">
									<div className="form-my-account form-forget-password">
										<p><input type="text" placeholder="Reset Code *" id="txtResetCode"/></p>
										<p><input type="password" placeholder="New Password *" id="txtNewPw"/></p>
										<p><input type="password" placeholder="Confirm Your New Password *" id="txtConfirmPw"/></p>
										<p><button  onClick={this.resetPassword}>Send Email</button>{this.state.alert}</p>
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