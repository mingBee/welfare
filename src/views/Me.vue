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
        <div class="top">
          <span class="txt">{{title}}</span>

          <div class="loader" :class="[loaderClass]"></div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
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
  import { getMeDonationInfo, getMeHistory, getMeTitle } from '@/api/me'
  import userInfoMixin from '@/mixins/getUserInfo'
  import cache from '@/utils/cache'
export default {
  mixins:[userInfoMixin],
  components:{
    [NavBar.name]: NavBar,
    [List.name]: List
  },
  mixins:[userInfoMixin],
  data(){
    return {
      info:{
        amount:''
      },
      title:'公益用户',
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
  },
  computed:{
    loaderClass(){
      let result;
      switch(this.title){
        case '与人为善':
        result = 'first-level';
        break;
        case '助人为乐':
        result = 'second-level';
        break;
        case '古道热肠':
        result = 'third-level';
        break;
        case '积善成德':
        result = 'fourth-level';
        break;
        case '仁爱之心':
        result = 'fifth-level';
        break;
        case '大爱无疆':
        result = 'sixth-level';
        break;
        default:
        result = 'default-level';
      }
      return result;
    }
  },
  watch:{
    userInfo:{
      handler(newV,oldV){
        if(newV && newV.id){
          this.getMeTitle();
          this.getMeDonationInfo();
          this.onLoad();
        }
      },
      immediate:true
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
    },
    /**
     * 获取用户捐款信息
     */
    getMeTitle(){
      getMeTitle({userId:this.userInfo.id}).then(res=>{
        this.title = res.message;
      })
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
      position: relative;
      height:120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: 2px solid #ECEBF1;
      color:#BEBEBE;
      font-size: 13px;
      .txt {
        position: absolute;
        z-index: 2;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        color:#333;
        font-weight: 600;
        // text-shadow: 1px 1px white,-1px -1px #ccc;;
      }
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

  .loader {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    animation: animate 1.2s linear infinite;
    &.first-level {
      background: linear-gradient(#AE8D71, #AE825C, #AE7645); 
    }
    &.second-level {
      background: linear-gradient(#A2D8FA, #84CDFA, #63C0FA); 
    }
    &.third-level {
      background: linear-gradient(#ABABAB, #8F8F8F, #6B6B6B); 
    }
    &.fourth-level {
      background: linear-gradient(#FFEE64, #D5AC22, #C49129); 
    }
    &.fifth-level {
      background: linear-gradient(#78D1CE, #5AD1CD, #449D9A); 
    }
    &.sixth-level {
      background: linear-gradient(#f07e6e, #F03B21, #F01E00); 
    }
    &.default-level {
      background: linear-gradient(#C8C8FA, #B7B7FA, #8989FA); 
    }
    & span {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(#f07e6e, #84cdfa, #5ad1cd);
    }
    & span:nth-child(1) {
      filter: blur(5px);
    }
    & span:nth-child(2) {
      filter: blur(10px);
    }
    & span:nth-child(3) {
      filter: blur(25px);
    }
    & span:nth-child(4) {
      filter: blur(50px);
    }
    &:after {
      content: '';
      position: absolute;
      top: 7px;
      left: 7px;
      right: 7px;
      bottom: 7px;
      background: #f1f1f1;
      border: solid #fff 2px;
      border-radius: 50%;
    }
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>