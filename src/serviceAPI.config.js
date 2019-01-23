/**
 *该文件为后端接口文件
 */
const BASEURL = "https://wd4501288184hkaatv.wilddogio.com/";

const URL = {
    getShoppingMallIndexInfo: BASEURL + 'index.json',   // 获取首页商品信息
    getUserInfo: BASEURL + 'userInfo.json',             // 获取用户列表信息
    getDetailsInfo: BASEURL + 'goods.json',          	// 获取商品详情信息  
    getCategoryList: BASEURL + 'category.json',         // 列表页大类分类          
    getCategorySubList: BASEURL + 'categorySub.json',       // 列表页二级分类
	getListDetailsInfo: BASEURL + 'newGoods.json',           // 商品详情 与【getDetailsInfo】相同
}
module.exports = URL;