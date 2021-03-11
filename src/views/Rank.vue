<template>
  <div>
    <van-nav-bar
      title="爱心榜"
      left-arrow
      @click-left="onClickLeft"
    >
          <!-- right-text="按钮" -->
      <!-- @click-right="onClickRight" -->
      <!-- <template #right>
        <van-icon name="ellipsis" size="18"/>
      </template> -->
    </van-nav-bar>
    <!-- <div class="top-part">
      <p class="sum">500元</p>
      <p class="rank">第1名</p>
      <p>生成证书</p>
    </div> -->

    <!-- <p class="title-part">排行榜</p> -->
    <div class="rank-list">
      
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-sticky :offset-top="46">
          <p class="header">  
            <span>排名</span>
            <span>用户</span>
            <span>爱心值</span>
          </p>
        </van-sticky>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <p v-for="(item,index) in list" :key="index" class="item">
            <span class="idx">{{(index >= 50)?'未上榜':index+1}}</span>
            <span class="phone">{{item.mobile}}</span>
            <span class="money">{{item.amount}}</span>
          </p>
        </van-list>
      </van-pull-refresh>
    </div>

  </div>
</template>



<script>
import { NavBar, List, PullRefresh, Sticky} from 'vant';
import { getRankList } from '@/api/rank'

export default {
  components:{
    [NavBar.name]: NavBar,
    [List.name]: List,
    [PullRefresh.name]:PullRefresh,
    [Sticky.name]: Sticky
  },
  data(){
    return {
      donation:{
        sum:'',
        rank:''
      },
      list:[],
      loading: false,
      finished: false,
      refreshing: false,
      pageParam:{
        offset:0,
        limit:15
      }
    }
  },
  methods:{
    onClickLeft(){
      this.$router.push({name:'Home'});
    },
    onLoad() {
      getRankList(this.pageParam).then(res=>{
        // 加载状态结束
        if(this.pageParam.offset ===1){
          this.refreshing = false;
        }
        this.loading = false;
        this.finished = true;
        if(res.data && res.data.totaoByUserIds){
          this.pageParam.offset += 1;
          this.list = res.data.totaoByUserIds;
        }else{
          this.list = [];
        }
        if(res.data){
          // 数据全部加载完成
          if(this.pageParam.offset >= res.data.page){
            this.finished = true;
          }
        }
      })
    },
    //下拉刷新
    onRefresh() {
      // 清空列表数据
      this.list = [];
      this.pageParam.offset = 1;
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  }
}
</script>

<style lang="scss">
  .rank-list {
    .van-pull-refresh__track {
      min-height: calc(100vh - 46px);
    }
  }
</style>


<style lang="scss" scoped>
  .rank-list {
    .item,.header{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding:8px 0;
      margin:0 20px;
      border-bottom: 1px solid #f0f0f0;
    }
    .header{
      font-weight: 600;
    }
    .item {
      &:nth-of-type(1){
        color:#DD5144;
      }
      &:nth-of-type(2){
        color:#FFCE44;
      }
      &:nth-of-type(3){
        color:#1EA262;
      }
    }
  }
</style>