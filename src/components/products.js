import React, { Component } from 'react';

// 用于redux的组件ui层
const Products = ({productList,addedList,onAddProduct,onFilter1,onFilter2})=>(
    <div className="shopping-cart">
        <div className="products-list">
        <div className="btn" onClick={()=>{onFilter1(productList)}}>过滤产品type=1</div>
        <div className="btn" onClick={()=>{onFilter2(productList)}}>过滤产品type=2</div>
        <ul>
            {/* 循环方法，使用map */}
            {productList.map((product,index)=>(
                <li key={index} onClick={()=>{onAddProduct(product)}} >{product.name}</li>
            ))}
        </ul>
        </div>

        <p>已添加到购物车的产品：</p>
        <div>
            <ul>
                {/* 循环方法，使用map */}
                {addedList.map((product,index)=>(
                    <li key={index} >{product.name}</li>
                ))}
            </ul>
        </div>
    </div>
)

export default Products;