<template>
  <div class="home">
    <van-nav-bar
      title="公益专区"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="18" />
      </template>
    </van-nav-bar>

    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item>
        <img :src="hemoImg"/>
      </van-swipe-item>
      <van-swipe-item>
        <img :src="stayImg" />
      </van-swipe-item>
    </van-swipe>

    <div class="part mydonation-part">
      <div class="item">
        <span class="title">我已捐爱心(份)</span>
        <span class="num">{{loveNum}}</span>
      </div>
      <div class="item">
        <span class="title">爱心勋章</span>
        <span class="brage" :class="[loaderClass]">{{title}}</span>
      </div>
    </div>

    <h4>热门公益</h4>
    <div class="part hot-part">
      <div class="item" v-for="(item, index) in hotList" :key="index" @click="goToDetail(item)">
        <img :src="item.coverUrl" alt="" />
        <p class="title" v-text="item.projectName"></p>
        <p class="detail">已收集<span class="num" v-text="item.totalCount"></span>份爱心</p>
      </div>
    </div>

    <h4>公益项目</h4>

    <div class="part project-part">
      <div class="item" v-for="(item, index) in hotList" :key="index" @click="goToDetail(item)">
        <div class="avatar">
          <img :src="item.coverUrl" alt="">
        </div>
        <div class="right">
          <span class="title" v-text="item.projectName"></span>
          <div class="org">
            <img :src="orgImg" alt="">
            <span v-text="item.orgName"></span>
          </div>
          <span v-text="item.summary" class="detail"></span>
        </div>
      </div>
    </div>

    <div class="bottom-btn">
      <div class="row">客服热线 <span class="phone">0351-2917721</span></div>
      <div class="time">服务时间 <span class="num">24</span>小时</div>
    </div>

    <div class="rank-btn" @click="goToRank">
      <img :src="rankIcon" alt="">
    </div>
    <!-- <h4>银行插件按钮测试</h4>
    <div class="test-btn" @click="getUserInfo">获取用户信息</div>
    <div class="test-btn" @click="pay">调取支付插件</div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import smellImg from "@/assets/images/swiper/smile.png";
// import kindImg from "@/assets/images/swiper/kind.png";
import hemoImg from "@/assets/images/hemo/hemo_thumb.jpg";
import stayImg from "@/assets/images/stay/stay_thumb.jpg";
import stay1Img from "@/assets/images/stay/stay_pic2.jpg";
import rankIcon from "@/assets/images/rank/rank-icon.png";
import orgImg from "@/assets/images/icon.jpg";
import { Swipe, SwipeItem, NavBar, Icon ,Toast, Notify} from "vant";
import userInfoMixin from '@/mixins/getUserInfo'
import { getPipByUserId, getTopSum, getAllBySubname} from '@/api/home'
import { getMeTitle } from '@/api/me'

export default {
  name: "Home",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  mixins:[userInfoMixin],
  data() {
    return {
      hemoImg,
      stayImg,
      stay1Img,
      orgImg,
      rankIcon,
      loveNum:1,
      title:'',
      topMsg:{
        amount:'',
        subName:''
      },
      hotList: [
        {
          projectId: 1,
          projectName: "奔跑吧血友男孩儿",
          orgName: "山西省慈善总会",
          logoUrl: "/donation/org/161/logo_thumb/20",
          coverUrl: hemoImg,
          totalAmount: "100511.08",
          totalCount: 0,
          summary: "为了满足这群热爱学习、热爱生活的血友男孩儿喜爱运动的热情，我们组织了这次特殊意义的小型运动会，让他们能够奔跑在祖国广阔的土地上。",
          state: 3
        },
        {
          projectId: 2,
          projectName: "为了明天·关爱儿童",
          orgName: "山西省慈善总会",
          logoUrl: "/donation/org/161/logo_thumb/20",
          coverUrl: stay1Img,
          totalAmount: "8728.84",
          totalCount: 0,
          summary: "“为了明天·关爱儿童”大型留守儿童救助项目由中华慈善总会和全球最大公益组织之一的“联合之路”共同发起，山西省慈善总会积极响应，力促项目在山西落地生根，蓬勃发展，帮扶全省的留守儿童健康成长，度过美好的花季年华。",
          state: 3
        }
      ],
    };
  },
  mounted(){
    this.getUserInfo();
    this.getAllBySubname();
    this.getTopSum();
  },
  watch:{
    userInfo(newV,oldV){
      if(newV){
        console.log('间听到变化')
        this.getPipByUserId();
        this.getMeTitle();
      }
    }
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
  methods: {
    onClickLeft() {
      this.$cordPlugin.goToNative(function () {
        Notify({ type: 'primary', message: '关闭商户H5页面，返回手机银行' });
      }, function (err) {
        Notify({ type: 'danger', message: err.message || '网络错误，请检查网络连接' });
      }, {page: '0'})
    },
    onClickRight() {
      this.$router.push({name:'Me'});
    },
    //跳转到详情
    goToDetail(item){
      this.$router.push({name:'About',params: {id:item.projectId}});
    },
    goToRank(){
      this.$router.push({name:'Rank'});
    },
    //获取用户慈善份数
    getPipByUserId(){
      console.log('开始获取用户慈善参数')
      getPipByUserId({userId:this.userInfo.id}).then(res=>{
        this.loveNum = res.data || 0;
      })
    },
    //获取捐款排行榜
    getTopSum(){
      getTopSum().then(res=>{
        this.topMsg = res.data || { };
      })
    },
    //获取子项目捐款份数
    getAllBySubname(){
      getAllBySubname().then(res=>{
        if(res.data && res.data.length>0){
          let list = res.data;
          this.hotList.forEach(i=>{
            list.forEach(j=>{
              if(i.projectName === j.subName){
                i.totalCount = j.total;
              }
            })
          });
        } 
      })
    },
    /**
    * 获取用户捐款信息
    */
    getMeTitle(){
      getMeTitle({userId:this.userInfo.id}).then(res=>{
        this.title = res.message;
      })
    }
  },
};
</script>

<style lang="scss" scoped>

.test-btn {
  padding: 8px 15px;
  border-radius: 5px;
  background-color: cadetblue;
  color:#fff;
  margin-bottom: 15px;
}
.home {
  padding-bottom: 30px;
  background-color: #f3f3f3;
}
  .my-swipe  {
    .van-swipe-item {
      img {
        width:100%;
        height:35vh;
      }
    } 
  }
  .part {
    background-color: #fff;
  }
  .mydonation-part {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding:10px;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title{
        font-size: 13px;
        line-height: 30px;
      }
      .num {
        font-size: 15px;
        color:#FF4D4D;
      }
      .brage {
        font-size: 13px;
        font-weight: 600;
        padding:2px 10px;
        background-color: red;
        border-radius: 5px;
        color:#fff;
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
      }
    }
  }
  h4 {
    margin:10px 0 0;
    background-color: #fff;
    padding: 15px 10px;
    text-align: left;
    font-weight: 400;
    font-size: 18px;
  }

  .hot-part {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding:0 15px 25px;
    .item {
      flex:0 0 auto;
      width:40%;
      margin-right:15px;
      border:1px solid #eee;
      img {
        width:100%;
        height:80px;
      }
      p {
        margin:0;
        text-align: left;
        padding:0 8px;
        margin-bottom:10px;
      }
      .title {
        font-size: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .detail {
        font-size: 12px;
        .num {
          color:#FF4D4D;
        }
      }
    }
  }

  .project-part {
    box-sizing: border-box;
    padding:0 15px;
    .item {
      display: flex;
      flex-direction: row;
      padding:15px 0;
      border-bottom: 1px solid #eee;
      .avatar {
        flex:1;
        img {
          width:100%;
          height:100px;
        }
      }
      .right {
        padding:5px 0 5px 10px;
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title {
          font-size: 15px;
          color:#000;
          line-height: 20px;
        }
        .org {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 15px;
          img {
            width:12px;
            height:12px;
            margin-right: 3px;
          }
          span {
            font-size: 11px;
          }
        }
        .detail {
          font-size: 13px;
          
          text-align: left;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }

  }
  .bottom-btn {
    text-align: center;
    padding:10px 0;
    background-color: #f0f0f0;
    color:#333;
    .row {
      font-size: 14px;
      .phone {
        color:#4A8BF5;
        font-size: 15px;
      }
    }
    .time {
      font-size: 13px;
    }
  }
  .rank-btn {
    position: fixed;
    right:5px;
    bottom:25%;
    border-radius: 50%;
    width:32px;
    height:32px;
    background-color: rgba(0,0,0,.1);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width:20px;
      height:20px;
    }
  }
</style>
