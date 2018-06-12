// reducer 执行动作，返回新的state

// state 默认数据
const initList = [
    {name: "电脑",type: 1},
    {name: "手机",type: 1},
    {name: "电视",type: 1},
    {name: "汽车",type: 2}
];

// 传参数：state，action；
// 传参数：state的默认值为initState
const productList = (state=initList, action) => {
    switch(action.type){
        case "FILTER_PRODUCTS_1":
            // 如果把initList换成state，那么会持续更新数据
            return initList.filter(product => product.type == 1);
            break;
        case "FILTER_PRODUCTS_2":
            return initList.filter(product => product.type == 2);
            break;
        default:
            return state;
    }
}

export default productList; //使用export default才能改名