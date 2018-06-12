import React, { Component } from 'react';

class NavTitlelist extends Component {
render() {
    if(!this.props.showList){
        return null;
    }
    return (
        <ul id="sub-title" className="nav-more-list">
            <li>
                <a href="//m.suning.com" className="nav-more-icon home-icon">
                首页
                </a>
            </li>
            <li>
                <a
                href="//shopping.suning.com/project/cart/cart1.html"
                className="nav-more-icon cart-icon"
                >
                购物车
                </a>
            </li>
            <li>
                <a href="//m.suning.com/list/list.html" className="nav-more-icon search-icon">
                全部分类
                </a>
            </li>
            <li>
                <a href="//m.suning.com/search.html" className="nav-more-icon cate-icon">
                搜索
                </a>
            </li>
            <li>
                <a href="//my.suning.com/wap/home.do" className="nav-more-icon ebuy-icon">
                我的易购
                </a>
            </li>
        </ul>
        );
    }
}

export default NavTitlelist;
