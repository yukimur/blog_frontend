
// 全局变量
const globalObj = {};

// 定义公共变量
globalObj.user = {};

// 定义公共方法
globalObj.set_user = function (user) {
    globalObj.user = user;
    return globalObj.user
};
globalObj.clear_user = function () {
    globalObj.user = {};
    return globalObj.user
};

export default globalObj