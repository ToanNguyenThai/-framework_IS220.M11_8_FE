import React, { Component } from 'react'
import Header from '../Header';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';
import { DataContext } from '../Context'

class Cart extends Component {
    static contextType = DataContext;
    
    

    render() {
        const { cart, total, account } = this.context;
        return (
            <div>
                <Header></Header>
                <Navigation></Navigation>
                <Footer></Footer>
            </div>
        )
    }

}
export default Cart;