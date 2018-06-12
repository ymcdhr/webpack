// actions 定义动作行为


// 动作：添加到购物车
export const addShoppingCart = product => {
    return {
        type: "ADD_SHOPPING_CART",
        product
    }
}

// 动作：过滤产品，取出type=1的产品
export const filterProducts1 = products => {
    return {
        type: "FILTER_PRODUCTS_1",
        products
    }
}

// 动作：过滤产品，取出type=1的产品
export const filterProducts2 = products => {
    return {
        type: "FILTER_PRODUCTS_2",
        products
    }
}