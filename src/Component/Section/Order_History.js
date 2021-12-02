import React, { Component } from 'react'
import Header from '../Header';
import Navigation from './Navigation';
import Footer from './Footer';
import callApi from '../Callapi';

import { DataContext } from '../Context'

class Order_History extends Component {

    static contextType = DataContext;
    render() {

        const { cart } = this.context;
        return (
            <div>
                <Header></Header>
                <Navigation></Navigation>
                <div className="order-container grid">
                    <h3>ĐƠN HÀNG ĐÃ ĐẶT</h3>
                    <div className="order-details">

                        <div className="order-products">
                            <>
                                {
                                    cart.map((item) => (
                                        <div>
                                            <h3 className="order_id"></h3>
                                            {
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
                                                                <span> Số lượng: {item.amount} </span>
                                                            </div>
                                                        </div>
        
                                                    </div>
        
        
                                                ))
                                            }
                                        </div>
                                        

                                    ))
                                }
                            </>
                        </div>

                    </div>


                </div>
                <Footer></Footer>
            </div>
        )
    }

}
export default Order_History;