

import React, { Component } from 'react'
import { Route, Link, Router } from "react-router-dom"
import Sanpham_display from './Component/Section/Sanpham_display';
import Homepage from './Component/Homepage';
import Gioithieu from './Component/Section/Gioithieu';
import Sanpham_chiTiet from './Component/Section/Sanpham_chiTiet';
import Cart from './Component/Section/Cart';
import { DataProvider } from './Component/Context';
import './style.css';


class App extends Component {
    render() {
        return (    
            <DataProvider>
                <div>
                    <Route exact path="/" component={Homepage}></Route>
                    <Route exact path="/Sanpham_display/:condition" component={Sanpham_display}></Route>
                    <Route exact path="/Gioithieu" component={Gioithieu}></Route>
                    <Route path="/Sanpham_chiTiet/:id" component={Sanpham_chiTiet}></Route>
                    <Route path="/Cart" component={Cart}></Route>
                </div>
            </DataProvider>



        );
    }

}

export default App;
