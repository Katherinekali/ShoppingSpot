import request from '../../utils/request';
// 获取分类页初始化信息
export function categoryInit() {
    return request.get('/catalog/index');
}
// 获取分类页面跳转页面导航信息  {id:商品id}
export function getCategoryNav(id) {
    return request.get(`/goods/category?id=${id}`);
}
// 根据导航获取商品
export function getCategoryGoods(id) {
    return request.get(`/catalog/current?id=${id}`);
}
// 获取当前分类信息和子分类
export function getProductInfo(params) {
    return request.get(`/goods/list?categoryId=${params.categoryId}&&size=${params.size}&&page=${params.page}`);
}
