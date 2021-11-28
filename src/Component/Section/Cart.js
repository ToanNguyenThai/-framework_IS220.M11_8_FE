import React, { Component } from 'react'
import Header from '../Header';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';
import { DataContext } from '../Context'

class Cart extends Component {
    static contextType = DataContext;
    state = {
        allCart : []
    }
    componentDidMount() {
        this.context.getTotal()
        
    }

    sendCart = () =>{
        
        var UserID = 0;
        for (let i = 0; i < this.context.account.data.length; i++)
            UserID = this.context.account.data[i].id
        
        axios({
            method: 'POST',
            url: 'http://localhost:3000/cart',
            data: {
                order: this.context.cart,
                clientID: UserID
            }
          });
    }
    render() {
        const { cart, total, account } = this.context;
        
        if (cart.length === 0 && Object.keys(account).length === 0) {
            return (
                <div>
                    <Header></Header>
                    <Navigation></Navigation>
                    <div className="cartContainer grid">
                        <h2 className="emptyCart">Giỏ hàng của bạn đang trống</h2>
                    </div>
                    <Footer></Footer>
                </div>
            )
        }
        else if (cart.length !== 0 && Object.keys(account).length === 0) {
            return (
                <div>
                    <Header></Header>
                    <Navigation></Navigation>
                    <div className="cartContainer grid">
                        <div className="cartItems">
                            <>
                                {
                                    cart.map((item, index) => (
                                        item.array.map(cartItem => (
                                            <div className="cartItem_mainContainer" key={cartItem.id}>
                                                <div className="img-main">
                                                    <img src={cartItem.imgSrc}></img>
                                                </div>
                                                <div className="information">
                                                    <h3 className="name">{cartItem.name}</h3>
                                                    <div className="separate"></div>
                                                    <h2 className="price">{this.context.getMultiplePrice(cartItem.id, item.amount)}đ</h2>
                                                    <h3 className="color">Màu sắc: {item.color}</h3>
                                                    <h3 className="size">Kích cỡ: {item.size}</h3>
                                                    <div className="amount">
                                                        <button className="count" onClick={() => this.context.decrease(index)}>-</button>
                                                        <span> {item.amount} </span>
                                                        <button className="count" onClick={() => this.context.increase(index)}>+</button>
                                                    </div>
                                                    <button className="delete" onClick={() => this.context.remove(index)}>Xoá sản phẩm</button>
                                                </div>

                                            </div>
                                        ))

                                    ))
                                }
                            </>
                        </div>

                        <div className="Payment">
                            <h3 id="login-error">Vui lòng đăng nhập</h3>
                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            )
        }
        else {
            return (
                
                <div>
                    <Header></Header>
                    <Navigation></Navigation>
                    <div className="cartContainer grid">
                        <div className="cartItems">
                            <>
                                {
                                    cart.map((item, index) => (
                                        item.array.map(cartItem => (
                                            <div className="cartItem_mainContainer" key={cartItem.id}>
                                                <div className="img-main">
                                                    <img src={cartItem.imgSrc}></img>
                                                </div>
                                                <div className="information">
                                                    <h3 className="name">{cartItem.name}</h3>
                                                    <div className="separate"></div>
                                                    <h2 className="price">{this.context.getMultiplePrice(cartItem.id, item.amount)}đ</h2>
                                                    <h3 className="color">Màu sắc: {item.color}</h3>
                                                    <h3 className="size">Kích cỡ: {item.size}</h3>
                                                    <div className="amount">
                                                        <button className="count" onClick={() => this.context.decrease(index)}>-</button>
                                                        <span> {item.amount} </span>
                                                        <button className="count" onClick={() => this.context.increase(index)}>+</button>
                                                    </div>
                                                    <button className="delete" onClick={() => this.context.remove(index)}>Xoá sản phẩm</button>
                                                </div>

                                            </div>
                                        ))

                                    ))
                                }
                            </>
                        </div>
                        <div className="Payment">
                            <h2>THÔNG TIN KHÁCH HÀNG</h2>
                            <>
                                {
                                    account.data.map(item => (
                                        <div>
                                            <div className="payment-info">
                                                <span>Tên khách hàng: </span>
                                                <span className="info-data">{item.name} </span>
                                            </div>
                                            <div className="payment-info">
                                                <span>Số điện thoại: </span>
                                                <span className="info-data">{item.phoneNumber} </span>
                                            </div>
                                            <div className="payment-info">
                                                <span>Địa chỉ: </span>
                                                <span className="info-data">{item.address} </span>
                                            </div>
                                            <div className="payment-info">
                                                <span>E-mail: </span>
                                                <span className="info-data">{item.email} </span>
                                            </div>
                                            <div className="payment-info" id="total">
                                                <span>Tổng tiền: </span>
                                                <span id="price"> {total}đ</span>
                                            </div>
                                        </div>

                                    ))
                                    
                                }
                            </>
                            <div className="btn-paymnet-area">
                                <button onClick ={() => this.sendCart()} className="btn-payment">Thanh toán</button>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>

            );
        }


    }

}
export default Cart;