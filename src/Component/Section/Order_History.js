import React, { Component } from 'react'
import Header from '../Header';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';
import { DataContext } from '../Context'

class Order_History extends Component {
    static contextType = DataContext;
    
    render() {
        const { cart } = this.context; 
        console.log(cart);
        return (
            <div>
                <Header></Header>
                <Navigation></Navigation>
                    order history
                <Footer></Footer>
            </div>
        )
    }

}
export default Order_History;