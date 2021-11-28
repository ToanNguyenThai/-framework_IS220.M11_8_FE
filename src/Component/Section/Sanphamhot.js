import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import { DataContext } from '../Context'


class Sanphamhot extends Component {
    static contextType = DataContext;
    render() {
       
        const { products } = this.context;
        return (
            <div className="hotItem">
                <div className="title-area grid">
                    <div className="left-separate"></div>
                    <div className="title-content">
                        <h3>SẢN PHẨM HOT</h3>
                        <p>Hàng luôn được cập nhật thường xuyên</p>
                    </div>
                    <div className="right-separate"></div>
                </div>
                <div className="newItem-mainContainer grid">
                {
                        products.map(product => (
                            <div className="item">
                                <img src={product.imgSrc}></img>
                                <div className="item-information">
                                    <div className="item-name-wrap">
                                        <a className="item-name" href="#">
                                            {product.name}
                                        </a>
                                    </div>
                                    <div className="item-purpose">{product.purpose}</div>
                                    <div className="item-separate"></div>
                                    <div className="item-price">{this.context.getPrice(product.id)}đ</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="btnArea">

                    <Link to={`/Sanpham_display/all`}>
                        <button className="showAll-btn">
                            Xem tất cả
                        </button>
                    </Link>

                </div>

            </div>
        );
    }

}

export default Sanphamhot;