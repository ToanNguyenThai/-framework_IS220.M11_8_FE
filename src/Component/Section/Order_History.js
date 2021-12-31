import React, { Component } from 'react'
import Header from '../Header';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context'

class Order_History extends Component {

    static contextType = DataContext;
    state = {
        orders: []
    }
    componentDidMount() {
        const cus_phone = this.context.account.data[0].customer_phoneNumber;
        axios({
            method: 'GET',
            url: `https://localhost:44328/api/Orders/GetOrder_ByPhone/${cus_phone}`,
            data: null
        }).then(res => {
            console.log(res.data);
            this.setState({
                orders: res.data
            })
        })

    }

    getOrderDate = (id) => {
        var date;
        this.state.orders.forEach(item => {
            if (id === item.id)
                date = item.order_date;
        })
        return date.substring(0, 10)
    }
    render() {

        const { orders } = this.state
        console.log(orders);
        return (
            <div>
                <Header></Header>
                <Navigation></Navigation>
                <div className="order-container grid">
                    <h3>ĐƠN HÀNG ĐÃ ĐẶT</h3>
                    <table>
                        <thead>
                            <tr className='title'>
                                <th>Mã đơn hàng</th>
                                <th>Ngày đặt hàng</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order_item => (
                                    <tr>
                                        <th>
                                            <Link to={`/OrderDetails_History/${order_item.id}`}>
                                                {order_item.id}
                                            </Link>
                                        </th>
                                        <th> {this.getOrderDate(order_item.id)} </th>
                                        <th>{order_item.order_total}</th>
                                        <th>{order_item.order_status}</th>
                                    </tr>
                                ))
                            }
                        </tbody>


                    </table>

                </div>
                <Footer></Footer>
            </div>
        )
    }

}
export default Order_History;