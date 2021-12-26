import React, { Component } from 'react'
import Header from '../Header';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context'

class OrderDetails_History extends Component {

    static contextType = DataContext;
    state = {
        orders: [],
        listCart: []
    }
    componentDidMount() {

        axios({
            method: 'GET',
            url: `https://localhost:44328/api/Orders/GetOrder/${this.props.match.params.id}`,
            data: null
        }).then(res => {
            this.setState({
                orders: res.data,
                listCart: res.data.list_cart
            })
        })

    }

    /*  getOrderDate = (id) => {
         var date;
         this.state.orders.forEach(item => {
             if (id === item.id)
                 date = item.order_date;
         })
         return date.substring(0, 10)
     } */
    render() {

        const { orders, listCart } = this.state
        console.log(listCart);
        return (
            <div>
                <Header></Header>
                <Navigation></Navigation>
                <div className="orderDetails-container grid">
                    <h3>CHI TIẾT ĐƠN HÀNG</h3>

                    <div className="main-container">

                        <div className="order-details">
                            <h3 className="order_id">{orders.id}</h3>
                            <div className="order-products">
                                {
                                    listCart.map(item => (
                                        <div>

                                            <div className="cartItem_mainContainer" key={orders.id}>

                                                <div className="img-main">
                                                    <img src={this.context.getImgbyID(item.id)}></img>
                                                </div>
                                                <div className="information">
                                                    <h3 className="name">{this.context.getNamebyID(item.id)}</h3>
                                                    <div className="separate"></div>
                                                    <h2 className="price">{this.context.getMultiplePrice(item.id, item.quantity)}đ</h2>
                                                    <h3 className="color">Màu sắc: {item.product_detail_color}</h3>
                                                    <h3 className="size">Kích cỡ: {item.product_detail_size}</h3>
                                                    <div className="amount">
                                                        <span> Số lượng: {item.quantity} </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    ))
                                }
                            </div>
                            <h3 className="order_total">Tổng tiền: {orders.order_total}</h3>

                        </div>

                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }

}
export default OrderDetails_History;