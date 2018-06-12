import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as actions from '../actions' //引入action
import Products from '../components/products' //引入ui组件

// 给state里面的数据取别名，或者过滤数据等操作
const mapStateToProps = state => {

  return {
    productList: state.productList,
    addedList: state.addedList
  }
}


const mapDispatchToProps = dispatch => {

    // 为了不让 MyComp 组件感知到 dispatch 的存在
    // return bindActionCreators({
    //     onAddProduct: actions.addShoppingCart,
    //     onFilter1: actions.filterProducts1,
    //     onFilter2: actions.filterProducts2
    // })
    // bindActionCreators等价于以下代码，需要引入bindActionCreators
    return {
        onAddProduct: product => {
            dispatch(actions.addShoppingCart(product));
        },
        onFilter1: list=>{
            dispatch(actions.filterProducts1(list));
        },
        onFilter2: list=>{
            dispatch(actions.filterProducts2(list));
        }
    }
}

const ProductsCnt = connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)

export default ProductsCnt;