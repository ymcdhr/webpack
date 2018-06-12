// reducer 执行动作，返回新的state
// 传参数：state，action；state默认值为[]
const addedList = (state=[], action) => {
    switch(action.type){
        case "ADD_SHOPPING_CART":
            return [...state,action.product];//类似于object.assign()，直接操作state数据不会立即更新！为何？
            // state.push(action.product);
            break;
        default:
            return state;
    }
    return state;
}

export default addedList;