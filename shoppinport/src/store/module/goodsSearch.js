import {
    clearhistory,
    searchKeywords,
    search,
    relatedInfo
  } from "../../services/index";
  import { observable, action } from "mobx";
  class SearchGoods {
    //默认
    @observable defaultKeyword;
    //历史搜索记录
    @observable historyKeywordList = [];
    //热门搜索
    @observable hotKeywordList = [];
    //删除提示信息
    @observable mes;
    //根据关键字搜索出商品
    @observable related = [];
    //用户输入关键字出现相关标题列表
    @observable searchList = [];
    //分类
    @observable filterCategory = [];
    //是否有分类商品
    @observable goodsFlag = false;
    //全部分类默认样式
    @observable style = "componse";
    //清除历史记录
    @action async clearSearch() {
      await clearhistory();
      this.historyKeywordList = [];
    }
    //获取初始化数据
    @action async getKeywords() {
      const data = await searchKeywords();
      this.defaultKeyword = data.defaultKeyword;
      this.historyKeywordList = data.historyKeywordList;
      this.hotKeywordList = data.hotKeywordList;
    }
    //查询关键字
    @action async Search(params) {
      const data = await search(params);
      this.searchList = data;
      this.goodsFlag = false;
    }
    //查询相关商品信息
    @action async searchRelated(params) {
      const data = await relatedInfo(params);
      this.related = data.data;
      this.filterCategory = data.filterCategory;
      this.goodsFlag = true;
    }
    //获取分类类型
    @action async getType(params) {
      const data = await relatedInfo(params);
      this.related = data.data;
    }
  
    //初始化数据
    @action clear() {
      this.related = [];
      this.searchList = [];
      this.goodsFlag = false;
    }
    //改变分类样式
    @action changeClassifyStyle(val) {
      this.style = val;
    }
  }
  export default SearchGoods;
  