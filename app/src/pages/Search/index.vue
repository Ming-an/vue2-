<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <!-- 面包屑 带有 X 的 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的展示 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i @click="removeTrademark">×</i></li>
            <!-- 带详细属性的 -->
            <li class="with-x" v-for="(item, index) in searchParams.props" :key="index">{{ item.split(":")[1] }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-arrdown': isAsc, 'icon-arrdown1': isDesc }"></span></a>
                </li>
                <li :class="{ active: isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-arrdown': isAsc, 'icon-arrdown1': isDesc }"> </span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(item, index) in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转 带参数 -->
                    <router-link :to="`/detail/${item.id}`"><img :src="item.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">
                      {{ item.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  data() {
    return {
      //带给服务器的参数
      searchParams: {
        //一级分类的id
        category1Id:"",
        //二级分类的id
        category2Id:"",
        //三级分类的id
        category3Id: "",
        //分类的名字
        categoryName: "",
        //用户输入的关键字
        keyword: "",
        //排序
        order: "1:desc",
        //分页器
        pageNo: 1,
        //每一页展示的数据个数
        pageSize: 3,
        //平台售卖属性的参数
        props: [],
        //品牌
        trademark: ""
      }
    }
  },
  components: {
    SearchSelector
  },
  //当组件挂载完毕之前执行一次【先于mounted之前】
  beforeMount(){
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // console.log(this.searchParams)
    // Object.assign: 合并对象
    //发送请求之前，把接口需要传递参数，进行整理， 服务器会返回查询的数据
    Object.assign(this.searchParams,this.$route.query,this.$route.params);
    // console.log(this.searchParams)
  },
  //组件挂载完毕  这个只会执行一次但是search 页面会涉及多次请求数据
  mounted() {
    this.getData();
  },
  computed: {
    //这样写有点麻烦 在store getters里面写
    // ...mapState({
    //   goodsList:(state)=>state.search.searchList.goodsList
    // })

    ...mapGetters(['goodsList']),

    isOne(){
      return this.searchParams.order.indexOf('1') != -1;
    },
    isTwo(){
      return this.searchParams.order.indexOf('2') != -1;
    },
    isAsc(){
      return this.searchParams.order.indexOf('asc') != -1;
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc') != -1;
    },

    //获取search 模块中  的 total
    ...mapState({
      total:(state)=>state.search.searchList.total
    })
  },
  methods: {
    //向服务器请求数据
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams);
    },
    //删除分类的名字
    removeCategoryName(){
      //把带给服务器的参数置空 还需要向服务器发送请求
      //这个清空也还是会带给服务器 写成undefined 就不会占宽带了优化类似
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //地址跳转 进行路由跳转 现在的路由跳转只是跳到自己这里
      //但是注意 只需要删除query参数  如果路径当中出现params不应该删除
      if(this.$route.params){
        this.$router.push({name:'search',params:this.$route.params})
      }
    },
    //删除关键字
    removeKeyword(){
      this.searchParams.keyword = undefined;
      this.getData();

      //通知兄弟组件清除关键字
      this.$bus.$emit("clearKeyword");

      //进行路由的跳转  params清除一下
      if(this.$route.query){
        this.$router.push({name:'search',query:this.$route.query});
      }
    },
    //删除品牌名
    removeTrademark(){
      this.searchParams.trademark = undefined;
      this.getData()
    },
    //自定义事件的回调 子组件给父组件 传递品牌信息
    tradeMarkInfo(item){
      //整理参数 ID:品牌名称
      this.searchParams.trademark = `${item.tmId}:${item.tmName}`;
      this.getData();
    },
    //自定义属性 attrInfo 收集属性
    attrInfo(attr, attrValue){
      // console.log(attr, attrValue)
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重 判断 是否有重复的
      if(this.searchParams.props.indexOf(props) == -1){
        this.searchParams.props.push(props);
      }
      //再次发送请求
      this.getData();
    },
    //删除 attr
    removeAttr(index){
      // console.log(index)
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    //排序的操作
    changeOrder(flag){
      let originOrder = this.searchParams.order;
      let originflag  = originOrder.split(":")[0];
      //判断是升序还是降序  asc desc 
      let originSort = originOrder.split(":")[1];
      let newOrder = '';
      //flag 他是一个标记  代表用户是 1 还是2 用户点击的时候传递进来的
      if(flag == originflag){
        newOrder = `${originflag}:${originSort == "desc" ? "asc":"desc"}`;
      }else{
        //点击的就是另外一个
        newOrder = `${flag}:${'desc'}`;
      }
      this.searchParams.order = newOrder;
      this.getData()
  },
  

  //这是自定义事件的回调函数  当前是第几页
  getPageNo(pageNo){
    //整理参数
    this.searchParams.pageNo = pageNo;
    this.getData()
  }

  },
    //数据监听 监听组件实例身上的属性的属性值变化
  watch:{
    //监听路由的信息是否发生变化，如果发生变化，再次发请求
    $route(newValue, oldValue){
      Object.assign(this.searchParams,this.$route.query,this.$route.params);
      //发起ajax请求
      this.getData();
      //每一次请求完毕，清除上一次的123级的id清空 
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
    }
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>