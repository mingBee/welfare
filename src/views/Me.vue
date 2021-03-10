<template>
  <div>
    <van-nav-bar
      title="个人捐赠信息"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <div class="info-part">
      <div class="title-area">
        <span>{{title}}</span>
      </div>
      <div>
        <p>爱心值</p>
        <p>{{info.love}}</p>
      </div>
    </div>
    
    <div class="history-part">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <p v-for="(item,index) in list" :key="index" class="item">
          <span class="idx">{{index+1}}</span>
          <span class="phone">{{item.date}}</span>
          <span class="money">{{item.amount}}元</span>
        </p>
      </van-list>
    </div>
  </div>
</template>

<script>
  import { NavBar, List} from 'vant';
  import { getMeDonationInfo, getMeHistory, getMeTitle } from '@/api/me'
  import userInfoMixin from '@/mixins/getUserInfo'
  import cache from '@/utils/cache'
export default {
  components:{
    [NavBar.name]: NavBar,
    [List.name]: List
  },
  mixins:[userInfoMixin],
  data(){
    return {
      info:{
        sum:'',
        love:''
      },
      title:'中行公益用户',
      list:[],
      loading: false,
      finished: false,
      pageParam:{
        offset:0,
        limit:15
      }
    }
  },
  mounted(){
    this.beforeGetMeTitle();
  },
  watch:{
    userInfo:{
      handler(newV,oldV){
        if(newV && newV.id){
          this.getMeTitle();
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
      getMeHistory(this.pageParam).then(res=>{
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
          if(this.pageParam.offset > res.data.page){
            this.finished = true;
          }
        }
      })
    },
    /**
     * 获取用户捐款信息
     */
    getMeDonationInfo(){
      getMeDonationInfo().then(res=>{
        if(res && res.data){
          this.info = res.data;
        }
      })
    },
    beforeGetMeTitle(){
      if(this.userInfo && this.userInfo.id){
        this.getMeTitle();
        return
      }
      let userInfo = cache.get('userInfo');
      if(userInfo && userInfo.id){
        this.userInfo = userInfo;
        this.getMeTitle();
      }else{
        this.getUserInfo();
      }
    },
    /**
     * 获取用户捐款信息
     */
    getMeTitle(){
      getMeTitle({userId:this.userInfo.id}).then(res=>{
        if(res && res.data){
          this.title = res.data;
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .info-part {
    .title-area {
      height:15vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 17px;
    }
  }
  .history-part {
    .item{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding:8px 0;
      margin:0 20px;
      border-bottom: 1px solid #f0f0f0;
    }
  }
</style>