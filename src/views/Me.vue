<template>
  <div>
    <van-nav-bar
      title="个人捐赠信息"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <main>
      <div class="info-part">
        <div class="top">中行公益用户</div>
        <div class="bottom">
          <p class="txt">爱心值</p>
          <p class="number">{{info.amount}}</p>
        </div>
      </div>
      
      <div class="history-part">
        <p class="title-area">
          <span class="left">我捐赠的公益项目</span>
          <span class="right">捐款明细</span>
        </p>
        <div v-if="list.length === 0" class="no-history-area">
          <p>暂无捐款记录</p>
          <div @click="goToHome()">去捐款</div>
        </div>
        <div v-else>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
          >
            <div v-for="(item,index) in list" :key="index" class="item">
              <p class="line">
                <span class="name">{{item.subName}}</span>
                <span class="time">{{item.orderTime}}</span>
              </p>
              <p class="line">
                <span class="mobile">{{item.mobile}}</span>
                <span class="amount">{{item.amount}}元</span>
              </p>
            </div>
          </van-list>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
  import { NavBar, List} from 'vant';
  import { getMeDonationInfo, getMeHistory } from '@/api/me'
  import userInfoMixin from '@/mixins/getUserInfo'
export default {
  mixins:[userInfoMixin],
  components:{
    [NavBar.name]: NavBar,
    [List.name]: List
  },
  data(){
    return {
      info:{
        amount:''
      },
      list:[],
      loading: false,
      finished: false,
      pageParam:{
        offset:0,
        limit:10
      }
    }
  },
  mounted(){
    this.getUserInfo();
    this.onLoad();
  },
  watch:{
    userInfo(newV,oldV){
      if(newV){
        console.log('间听到变化')
        this.getMeDonationInfo();
      }
    }
  },
  methods:{
    onClickLeft(){
      this.$router.back(-1);
    },
    onLoad() {
      if(!this.userInfo || !this.userInfo.id){
        this.pageParam.offset = 0;
        this.getUserInfo();
        return
      }
      let params = Object.assign(this.pageParam,{userId:this.userInfo.id});
      getMeHistory(params).then(res=>{
        this.loading = false;
        if(res.data && res.data.orderByUserVos){
          this.pageParam.offset += 1;
          this.list = res.data.orderByUserVos;
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
    /**
     * 获取用户捐款信息
     */
    getMeDonationInfo(){
      getMeDonationInfo({id:this.userInfo.id}).then(res=>{
        if(res && res.data){
          this.info.amount = res.data.amount;
        }
      })
    },
    goToHome(){
      this.$router.push({name:'Home'});
    }
  }
}
</script>

<style lang="scss" scoped>
  main {
    background-color: #ECEBF1;
    padding:15px;
    min-height:calc(100vh - 46px);
    box-sizing: border-box;
  }
  .info-part {
    background-color: #fff;
    margin-bottom: 15px;
    .top {
      height:120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: 2px solid #ECEBF1;
      color:#BEBEBE;
      font-size: 13px;
    }
    .bottom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding:15px 0;
      .txt {
        color:#BEBEBE;
        font-size: 13px;
        margin-bottom: 5px;
      }
      .number {
        color:#9D5750;
        font-size: 20px;
      }
    }
  }
  .history-part {
    background-color: #fff;
    padding: 15px 10px;
    .title-area {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:5px 5px 15px;
      .left {
        font-size: 15px;
        font-weight: 500;
      }
      .right {
        font-size: 14px;
        color:#BEBEBE;
      }
    }
    .no-history-area {
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        color:#BEBEBE;
        font-size: 14px;
        margin-bottom: 20px;
      }
      div {
        color:#fff;
        background-color: #F86F6D;
        font-size: 15px;
        padding:7px 50px;
        border-radius: 3px;
      }
    }
    .item{
      .line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding:5px 0;
        font-size: 13px;
        .name {
          font-size: 14px;
          font-weight: 600;
        }
        .amount {
          color:#9D5750;
        }
      }
      padding:8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
  }
</style>