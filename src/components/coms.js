import React, { Component } from 'react';
import NavTitle from './navTitle.js';
import ProductsCnt from '../containers/products';
import './coms.css';

// 以下是自定义组件示例
class Coms extends Component {
    render() {
        return (
            <div>
                <p>顶部标题11</p>
                <NavTitle></NavTitle>

                <p>redux示例：购物车</p>
                <ProductsCnt></ProductsCnt>

            </div>
        );
    }
}

export default Coms;