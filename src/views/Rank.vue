<template>
  <div>
    <van-nav-bar
      title="排行榜"
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
      <p class="item header">  
        <span>排名</span>
        <span>电话号</span>
        <span>捐款金额</span>
      </p>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <p v-for="(item,index) in list" :key="index" class="item">
          <span class="idx">{{index+1}}</span>
          <span class="phone">{{item.customerName}}</span>
          <span class="money">{{item.amount}}元</span>
        </p>
      </van-list>
      </van-pull-refresh>
    </div>

  </div>
</template>



<script>
import { NavBar, List, PullRefresh} from 'vant';
import { getRankList } from '@/api/rank'

export default {
  components:{
    [NavBar.name]: NavBar,
    [List.name]: List,
    [PullRefresh.name]:PullRefresh
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
      refreshing: false
    }
  },
  methods:{
    onClickLeft(){
      this.$router.back(-1);
    },
    onLoad() {
      getRankList().then(res=>{
        // 加载状态结束
        this.loading = false;
        this.finished = true;
        if(res && res.data){
          this.list = res.data;
        }else{
          this.list = [];
        }
      })
      

      // 数据全部加载完成
      // this.finished = true;
    },
    //下拉刷新
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  }
}
</script>


<style lang="scss" scoped>
  .rank-list {
    .item {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding:8px 0;
      margin:0 20px;
      border-bottom: 1px solid #f0f0f0;
      &.header{
        font-weight: 600;
      }
    }
  }
</style>