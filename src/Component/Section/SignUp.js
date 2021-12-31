import React, { Component } from 'react'
import axios from 'axios';

import { AccountContext } from '../Context'

class SignUp extends Component {

    static contextType = AccountContext;
    state = {
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        re_password: '',
        clients: [],
        countError: 0

    }
    componentDidMount() {
        axios({
            method: 'GET',
            url: 'https://localhost:44328/api/Customers/GetAll',
            data: null
        }).then(res => {
            this.setState({
                clients: res.data
            })
        })
    }
    setName = (val) => {
        this.setState({
            name: val.target.value
        })
    }

    setEmail = (val) => {
        this.setState({
            email: val.target.value
        })
    }
    setPhone = (val) => {
        this.setState({
            phone: val.target.value
        })
    }
    setAddress = (val) => {
        this.setState({
            address: val.target.value
        })

    }
    setPassword = (val) => {

        this.setState({
            password: val.target.value
        })
    }
    setRePassword = (val) => {
        this.setState({
            re_password: val.target.value
        })
    }



    checkName = (val) => {
        if (val.target.value.length == 0)
            document.querySelector("#error_name").innerText = "Vui lòng nhập tên"
        else if (val.target.value.length > 0)
            document.querySelector("#error_name").innerText = ""

    }

    checkAddress = (val) => {
        if (val.target.value.length == 0)
            document.querySelector("#error_address").innerText = "Vui lòng nhập địa chỉ"
        else if (val.target.value.length > 0)
            document.querySelector("#error_address").innerText = ""

    }

    checkEmail = (val) => {
        let count = 0;
        if (val.target.value.length == 0)
            document.querySelector("#error_email").innerText = "Vui lòng nhập email"
        else if (val.target.value.includes("@") === false)
            document.querySelector("#error_email").innerText = "Email không hợp lệ"
        else if (val.target.value.includes("@") === true) {
            this.state.clients.forEach(element => {
                if (val.target.value === element.customer_email)
                    count++
            });
            if (count !== 0)
                document.querySelector("#error_email").innerText = "Email đã tồn tại"
            else document.querySelector("#error_email").innerText = ""
        }

    }

    checkPhone = (val) => {
        let count = 0;
        if (val.target.value.length == 0)
            document.querySelector("#error_phone").innerText = "Vui lòng nhập số điện thoại"
        else if (val.target.value.length < 10 || val.target.value.length > 10)
            document.querySelector("#error_phone").innerText = "Số điện thoại không hợp lệ"
        else if (val.target.value.length === 10) {
            this.state.clients.forEach(element => {
                if (val.target.value === element.customer_phoneNumber)
                    count++
            });
            if (count !== 0)
                document.querySelector("#error_phone").innerText = "Số điện thoại đã tồn tại"
            else document.querySelector("#error_phone").innerText = ""
        }

    }

    checkPassword = (val) => {
        if (val.target.value.length == 0)
            document.querySelector("#error_password").innerText = "Vui lòng nhập mật khẩu"
        else if (val.target.value.length <= 5 && val.target.value.length > 0)
            document.querySelector("#error_password").innerText = "Độ dài mật khẩu lớn hơn 5"
        else if (val.target.value.length > 5)
            document.querySelector("#error_password").innerText = ""
    }
    checkRePassword = (val) => {
        if (val.target.value !== this.state.password)
            document.querySelector("#error_repassword").innerText = "Mật khẩu không khớp"
        else document.querySelector("#error_repassword").innerText = ""
    }

    getError = () => {
        var errorList = document.getElementsByClassName("error");
        var tmp_List = []
        for (let i = 0; i < errorList.length; i++) {
            if (errorList[i].innerText !== "")
                tmp_List.push(errorList[i].innerText)
        }
        this.setState({
            countError: tmp_List.length
        })
    }

    handleSignUp = event => {
        if (this.state.countError > 0) {
            alert("Thông tin đăng ký không hợp lệ")
            event.preventDefault();
        }


        else if (this.state.name.length === 0 || this.state.email.length === 0
            || this.state.phone.length === 0 || this.state.name.password === 0
            || this.state.address.length === 0) {
            alert("Vui lòng nhập đầy đủ thông tin")
            event.preventDefault();
        }

        else {
            axios({
                method: 'POST',
                url: 'https://localhost:44328/api/Customers',
                data: {
                    id: "",
                    customer_name: this.state.name,
                    customer_email: this.state.email,
                    customer_phoneNumber: this.state.phone,
                    customer_password: this.state.password,
                    customer_address: this.state.address
                }
            });
            var form = document.querySelector("#signUp-form");
            form.reset();  // Reset all form data
            alert("Đăng kí thành công")
            event.preventDefault();
        }
    }
    render() {

        const { switchToSignIn } = this.context

        return (
            <div className="signUp-container">
                <form id="signUp-form" onClick={this.getError} onSubmit={this.handleSignUp} >
                    <h2>Đăng Ký</h2>
                    <div className="name">
                        <i class="fas fa-user"></i>
                        <input onChange={this.setName} onBlur={this.checkName} type="text" name id="name" placeholder="Họ và tên" />
                        <h3 className='error' id="error_name"></h3>
                    </div>

                    <div className="email">
                        <i class="fas fa-envelope"></i>
                        <input onChange={this.setEmail} onBlur={this.checkEmail} type="text" name id="email" placeholder="Email" />
                        <h3 className='error' id="error_email"></h3>
                    </div>
                    <div className="phoneNumber">
                        <i class="fas fa-phone"></i>
                        <input onChange={this.setPhone} onBlur={this.checkPhone} type="text" name id="phoneNumber" placeholder="Số điện thoại" />
                        <h3 className='error' id="error_phone"></h3>
                    </div>

                    <div className="address">
                        <i class="fas fa-home"></i>
                        <input onChange={this.setAddress} onBlur={this.checkAddress} type="text" name id="address" placeholder="Địa chỉ" />
                        <h3 className='error' id="error_address"></h3>
                    </div>

                    <div className="signup-password">
                        <i class="fas fa-unlock-alt"></i>
                        <input onChange={this.setPassword} onBlur={this.checkPassword} type="password" name id="signupPassword" placeholder="Mật khẩu" />
                        <h3 className='error' id="error_password"></h3>
                    </div>
                    <div className="signup-passwordConfirm">
                        <i class="fas fa-unlock-alt"></i>
                        <input onChange={this.setRePassword} onBlur={this.checkRePassword} type="password" name id="signup_rePassword" placeholder="Nhập lại mật khẩu" />
                        <h3 className='error' id="error_repassword"></h3>
                    </div>
                    <div className="btn-area">
                        <button id="btn-signUp" type="submit">Đăng Ký </button>
                    </div>

                    <div className="optional">
                        <span>Bạn đã có tài khoản ?</span>
                        <span className="direct" onClick={switchToSignIn}>Đăng nhập</span>

                    </div>
                </form>
            </div>


        );

    }
}
export default SignUp;
