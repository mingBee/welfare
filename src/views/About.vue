<template>
  <div class="home" ref="home">
    <van-nav-bar
      title="公益专区"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"

    >
      <template #right>
        <van-icon name="ellipsis" size="18"/>
      </template>
    </van-nav-bar>
    <img :src="detail.coverUrl" style="width:100%" alt="">
    
    <div class="part mydonation-part">
      <div class="item">
        <span class="title">已筹金额(元)</span>
        <span class="num" v-text="detail.totalAmount"></span>
      </div>
      <div class="item">
        <span class="title">已有爱心(份)</span>
        <span class="num" v-text="detail.totalCount"></span>
      </div>
    </div>

    <h4 >
      <span v-text="detail.projectName"></span>
    </h4>
    <p class="part summary-part" v-text="detail.summary"></p>

    <h4><span>发起与善款接收机构</span></h4>
    <p class="part org-part">
      <img :src="orgImg" alt="">
      <span v-text="detail.orgName"></span>
    </p>

    <h4><span>项目说明</span></h4>
    <div class="part detail-part">
      <p :class="{'all':allArticle}" v-html="detail.introduction"></p>
      <div class="all-text-btn" @click="showAll" v-if="!allArticle">展开全文<span class="arrow"></span></div>
    </div>
    
    <h4><span>项目进展</span></h4>
    <p class="part progress-part">暂无项目进展信息</p>

    <h4><span>受捐动态</span></h4>
    <div class="part donation-part" ref="scroll">
      <div class="scroll" :style="`transform:translateY(${-8 * scrollIdx}vh);`">
        <div class="item" v-for="(item,index) in donationList" :key="index">
          <span class="name-area"><img :src="bankIcon" class="bank-icon" alt=""><span class="name" v-text="item.customerName"></span></span>
          <span class="amount">捐款<span class="num" v-text="item.orderAmount"></span>元</span>
          <span class="time">{{item.orderTime |filTime}}</span>
        </div>
      </div>
      
    </div>

    <div class="more-btn">
      <span @click="backHome">查看更多公益项目</span>
    </div>

    <div class="donation-sheet-btn" @click="showDonationSheet">立即捐款</div>

    <van-action-sheet v-model="sheetShow" :round="false" :title="detail.projectName||'公益捐款'">
      <div class="sheet-content">
        <div class="amount">
          <span class="item" :class="{'active':index==amountIdx}" v-for="(item,index) in amounts" :key="index" v-text="item+'元'" @click="choiceAmount(item,index)"></span>
        </div>

        <div class="input-area">
          <input type="number" v-model.number="cumAmount" placeholder="自定义金额">
          <span>元</span>
        </div>

        <div class="checkbox-area">
          <van-checkbox v-model="checked" shape="square"><span class="check-text">匿名捐款</span></van-checkbox>
        </div>

        <div class="donation-btn" @click="beforeDonation">立即捐款</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
// @ is an alias to /src
import { ActionSheet, Checkbox, NavBar, Icon, Toast, Notify} from 'vant';
import hemoImg from "@/assets/images/hemo/hemo_thumb.jpg";
import hemoPicImg from "@/assets/images/hemo/hemo_pic.jpg";
import stayImg from "@/assets/images/stay/stay_thumb.jpg";
import stayPic1Img from "@/assets/images/stay/stay_pic1.jpg";
import stayPic2Img from "@/assets/images/stay/stay_pic2.jpg";
import orgImg from "@/assets/images/icon.jpg";
import bankIcon from "@/assets/images/bank_icon.jpg";

import { donationMoney } from '@/api/about'
import userInfoMixin from '@/mixins/getUserInfo'
import cache from '@/utils/cache'
import { getTatilBySubName ,getOrderList} from '@/api/about'

export default {
  components:{
    [ActionSheet.name]:ActionSheet,
    [Checkbox.name]:Checkbox,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  name: 'Home',
  mixins:[userInfoMixin],
  data(){
    return {
      projectId:2,
      orgImg,
      bankIcon,
      hemoImg,
      hemoPicImg,
      stayImg,
      id:'',
      sheetShow: false,
      checked:false,
      allArticle:false,
      scrollIdx:0,
      amountIdx:0,
      amounts: ["0.10", "1.00", "10.00", "100.00"],
      maxAmount: "1000.00",
      cumAmount:'',
      donationList:[
      // {
      //   "customerName": "非实名用户",
      //   "amount": "0.01",
      //   "orderTime": "2020-12-24 10:14:21"
      // }, 
      // {
      //   "customerName": "非实名用户",
      //   "amount": "0.01",
      //   "orderTime": "2020-12-24 10:14:20"
      // }, {
      //   "customerName": "非实名用户",
      //   "amount": "0.01",
      //   "orderTime": "2020-12-24 10:14:19"
      // }, 
      // {
      //   "customerName": "非实名用户",
      //   "amount": "0.01",
      //   "orderTime": "2020-12-24 10:13:54"
      // }, {
      //   "customerName": "非实名用户",
      //   "amount": "0.01",
      //   "orderTime": "2020-12-24 10:13:39"
      // }, {
      //   "customerName": "非实名用户",
      //   "amount": "0.01",
      //   "orderTime": "2020-12-24 10:13:23"
      // }, {
      //   "customerName": "非实名用户",
      //   "amount": "0.01",
      //   "orderTime": "2020-12-24 10:11:54"
      // }, 
      // {
      //   "customerName": "爱心用户",
      //   "amount": "0.01",
      //   "orderTime": "2020-12-24 10:11:35"
      // }, {
      //   "customerName": "非实名用户",
      //   "amount": "0.01",
      //   "orderTime": "2020-12-24 10:11:13"
      // }, {
      //   "customerName": "非实名用户",
      //   "amount": "0.01",
      //   "orderTime": "2020-12-24 10:11:02"
      // }
      ],
      detail:{
        coverUrl:''
      },
      detailList:{
        1:{
          "projectId": 1,
          "projectName": "奔跑吧血友男孩儿",
          "coverUrl": hemoImg,
          "orgId": 161,
          "orgName": "山西省慈善总会",
          "totalAmount": "100804.10",
          "totalCount": 1744031,
          "summary": "为了满足这群热爱学习、热爱生活的血友男孩儿喜爱运动的热情，我们组织了这次特殊意义的小型运动会，让他们能够奔跑在祖国广阔的土地上。",
          "introduction": "<strong>【奔跑吧血友男孩儿】</strong><br />\n<br />\n &nbsp;&nbsp;这是一类特殊的人群，因先天缺乏凝血因子VIII而导致的出血性疾病。他们，不能像正常人一样奔跑，跳跃，但是心里却住着一颗渴望的心。<br/>&nbsp;&nbsp;这是一群坚强的男孩儿，虽然经常自发性出血导致关节极度肿胀，他们却用坚强的心对抗着常人无法想象的疼痛。这是一群能干的男孩儿，为了不出现关节畸形的并发症，他们必须经常性输注凝血因子VIII，他们自发学习注射技巧，在家里就可以实现自体药液的注射。<br/>&nbsp;&nbsp;这是一群奋发的男孩儿，他们热爱学习、热爱生活，为未来做出不懈的努力。<br/>&nbsp;&nbsp;这样一群男孩儿就是血友病男孩儿，他们被称为“玻璃人”。血友病是一种凝血功能障碍的出血性疾病，因身体内活性凝血活酶生成障碍，导致凝血时间延长，出血一般是在关节、肌肉、皮下、内脏等部位。重症患者没有明显外伤也可发生自发性出血。如果没有药物及时治疗，反复出血最终会导致肌肉萎缩并致残，甚至死亡。血友病分为A、B型，A型是因为体内先天缺乏凝血因子VIII或凝血因子VIII基因突变导致的出血性疾病，发病率为3～4/10万人口，是中国血友病主要发病类型，一般为母亲携带，男孩儿发病，女孩儿发病极为罕见。<br />\n<img src=\""+hemoPicImg+"\" style=\"width:100%;\" /><br />\n<strong>【项目内容】</strong><br />\n<br />\n&nbsp;&nbsp;本次活动旨在让更多血友病家庭了解“标准治疗”的理念和益处，促进血友病患者更好地融入社会，展现太原市血友病儿童的治疗成果，真实呈现血友病患儿“让奔跑不再是梦想和奇迹”的理念。<br/>&nbsp;&nbsp;本次活动包括健康讲堂、分享体验和专家问答等内容，组织血友孩子们进行了趣味游戏、有限程度的跑步运动、手游PK、等比赛，还带领孩子们参观了博物馆、图书馆。孩子们在轻松愉快的氛围中结束了本次活动。让血友病儿童及家庭了解标准治疗的相关知识。后续还将开展更多的主题活动，让患儿在快乐中掌握更多的知识，享受更多的童年欢乐，并树立血友病儿童“奔跑”的榜样。我们也希望能够通过项目引起社会各方的关注与支持血友病患者。<br/>&nbsp;&nbsp;本项目衔接国家医保政策，坚持“政府救助为主，慈善救助为辅”的救助原则。针对山西省除太原市以外的贫困家庭且入组中华慈善总会援助项目的血友病患者开展救助。<br/>&nbsp;&nbsp;奔跑吧，血友男孩儿！让我们携起手来，共同帮助这样一群可爱的孩子们，让他们能够奔跑在祖国广阔的土地上！",
          "state": 3
        },
        2:{
          "projectId": 2,
          "projectName": "为了明天·关爱儿童",
          "coverUrl": stayImg,
          "orgId": 161,
          "orgName": "山西省慈善总会",
          "totalAmount": "8834.54",
          "totalCount": 258764,
          "summary": "为了明天·关爱儿童”大型留守儿童救助项目由中华慈善总会和全球最大公益组织之一的“联合之路”共同发起，山西省慈善总会积极响应，力促项目在山西落地生根，蓬勃发展，帮扶全省的留守儿童健康成长，度过美好的花季年华。",
          "introduction": "<strong>【为了明天·关爱儿童】</strong><br />\n<br />\n“为了明天·关爱儿童”大型留守儿童救助项目由中华慈善总会和全球最大公益组织之一的“联合之路”共同发起，山西省慈善总会积极响应，力促项目在山西落地生根，蓬勃发展，帮扶全省的留守儿童健康成长，度过美好的花季年华。<br /><br />\n<img height=\"1220\" src=\""+ stayPic1Img +"\" style=\"width:100%;height:180px;\"/><br /><br />\n&nbsp;&nbsp;有这样一群孩子——他们本可以在父母的怀抱里，享受美好的童年，却由于父母常年在外打拼，或因各种原因，让孩子留守于老家由老人照看，成为“留守儿童”。留守儿童是一个特殊群体，他们远离父母亲，他们更渴望得到一份原始的亲情的温暖<br />\n<br />\n<strong>【项目内容】</strong><br />\n<br />&nbsp;&nbsp;这次活动几位和留守儿童同龄的孩子志愿者也参加慰问活动，他们和这些留守孩子有更多的共同语言。在慰问过程中，志愿者们亲切地与留守孩子交谈，了解每位留守孩子的生活、学习情况、健康状况，并鼓励学生要在困难中磨砺坚强意志，努力学习，长大了做一个对社会有用的人，回报社会。&nbsp;&nbsp;\n“为了明天·关爱儿童”项目将依托社区、学校、乡镇或相对独立的场所，整合现有项目或新办、设立“关爱儿童之家”，铸造一个具有“家”的感觉与氛围的场所，通过提供绘本阅读、心灵关怀、亲情连线、课业辅导及动员社会志愿者组织，为6至12岁的留守儿童提供各种形式的帮扶活动，解决留守儿童普遍存在的家庭贫困、亲情失落、学习失教、心理失衡及特殊困难等问题，帮助他们开拓视野、启迪心灵、感受关爱、健康成长，未来更好地融合社会，促进整个社会的和谐稳定与可持续发展。<br /><br />\n<img src=\""+stayPic2Img+"\" style=\"width:100%;\" /><br /><br />\n&nbsp;&nbsp;提高全民族的思想道德素质和科学文化素质，培养一代一代有理想、有道德、有文化、有纪律的公民是社会主义精神文明建设的根本任务。加强农村留守儿童的思想道德、科学文化、情感渗透、心理疏导等教育是家庭、社会、政府的共同责任。本次活动将进一步让更多的留守儿童和困境儿童感受到党和政府的温暖、社会的关爱，从而树立起乐观向上的生活态度，健康快乐地成长。<br/>&nbsp;&nbsp;山西省慈善总会计划在全省留守儿童相对集中地区新设、改建和完善500所“关爱儿童之家”，完成对全省留守儿童相对集中区域的全覆盖，并实现“关爱儿童之家”长期、持续、稳定运行。我们愿为社会各界爱心企业和爱心人士搭建公开、透明、规范运作的合作平台。对于企业与社会各界人士的慷慨相助，我们将通过多种方式表达敬意，比如授予荣誉称号、列为发起单位、选为理事或进入项目指导委员会。还可以通过中华慈善总会和“联合之路”，向国内外媒体进行宣传报道等等。我们衷心希望全社会的爱心企业、社会组织和爱心人士能响应党中央、国务院号召，把关爱留守儿童作为义不容辞的责任和义务，立即行动起来，把温暖的爱心和慈善的真情投向我省的留守儿童，帮助孩子们筑梦成长。",
          "state": 3
        }
      },
      orderNo:''
    }
  },
  created(){
    this.projectId = this.$route.params.id ||2;
    this.detail = this.detailList[this.projectId];
  },
  mounted(){
    this.getTatilBySubName();
    this.getOrderList();
    this.$refs.home.scrollIntoView();
    let el = this.$refs.scroll;
    var io = new IntersectionObserver(
    entries => {
      if(entries[0].isIntersecting){
        this.setTime();
        io.unobserve(el);
      }
      },{threshold:1}
    );
    io.observe(el);
  },
  filters: {
    filTime(val) {
        // 捐赠日期
      let result = "";
      var donaTime = new Date(val);
      // 当前系统时间
      var NowTime = new Date();
      var t = NowTime.getTime() - donaTime.getTime();
      var y = Math.floor(t / 1000 / 60 / 60 / 24 / 30 / 12);
      var o = Math.floor(t / 1000 / 60 / 60 / 24 / 30);
      var w = Math.floor(t / 1000 / 60 / 60 / 24 / 7);
      var d = Math.floor(t / 1000 / 60 / 60 / 24);
      var h = Math.floor(t / 1000 / 60 / 60 );
      var m = Math.floor(t / 1000 / 60 );
      var s = Math.floor(t / 1000);
      if(y>=1) result=parseInt(d) + "年前";
      else if(o>=1) result=parseInt(o) + "个月前";
      else if(w>=1) result=parseInt(w) + "周前";
      else if(d>=1) result=parseInt(d) +"天前";
      else if(h>=1) result=parseInt(h) +"小时前";
      else if(m>=1) result=parseInt(m) +"分钟前";
      else result="刚刚";
      return result;
    }
  },
  watch:{
    cumAmount(newV,oldV){
      if(!newV ){
        if( this.amountIdx === -1 ){
          this.amountIdx = 0;
        }
      }else{
        this.amountIdx = -1;
      }
    }
  },
  methods:{
    showDonationSheet(){
      this.sheetShow = true;
    },
    beforeDonation(){
      // if(this.amountIdx === -1 && !this.cumAmount){
      //   Toast('请选择捐款金额');
      //   return;
      // }
      let userInfo = cache.get('userInfo');
      let id = '';
      if(userInfo && userInfo.id){
        id = userInfo.id
      };
      // if(userInfo && userInfo.merId){
      //   this.userInfo = userInfo;
        this.donation(id)
      // }else{
      //   this.getUserInfo(this.donation);
      // }
    },
    //捐赠接口
    donation(id){
      // if(!this.userInfo ||!this.userInfo.merId){
      //   return;
      // }
      // Toast.loading({
      //   message: '支付中...',
      //   duration:0,
      //   forbidClick: true
      // });
      let amount = 0;
      if( this.amountIdx>-1 ){
        amount = String(this.amounts[this.amountIdx]);
      }else{
        amount = String(this.cumAmount);
      }
      let temp={
        // merId:this.userInfo.merId,
        id:id,
        orderAmount:amount,
        subName:this.detail.projectName,
        mark:this.checked ?'1':'2'
      }
      console.log(temp,'temp')
      donationMoney(temp).then(res=>{
        if(res && res.data){
          this.setDonationPlugin(res.data);
        }else{
          // Toast.clear();
          Notify({ type: 'danger', message: '支付借口返回参数错误' });
        }
      }).catch(err=>{
        // Toast.clear();
        Notify({ type: 'danger', message: '插件错误' });
      })
    },
    /**
     * 调用支付插件
     */
    setDonationPlugin(data){
      /*******调起支付控件********/
      this.orderNo = data.orderNo;
      var setting = {
          // 下述数据仅为示例，实际数据上送格式请参考cordova接口文档的描述
        merchantNo: data.merchantNo, // 商户号
        version: data.version, // 版本号
        messageId: data.messageId, // 交易码
        security: data.security, // 签名方法
        message: data.message, // 请求报文明文信息
        signature: data.signature // 请求报文签名信息
      };
      this.$cordPlugin.callPaymentControl( data=> {
          // 下述内容为点击左上角<后执行
          // alert(JSON.stringify(data));
          if (data.isCancelPay === '1'){
              // 客户取消了支付
          } else {
              if (data.orderStatus === '1') {
                  // 支付成功的回调方法，可写返回后逻辑
                  // Toast.success('支付成功');
                  console.log('支付成功')
                  this.goToRank();
              } else {
                console.log('支付失败')
                // Toast.success('支付失败');
                  // alert('支付成功');
                  // 支付失败的回调方法 ，可写返回后逻辑
              }
          }

      }, function (err) {
          Notify({ type: 'danger', message: err.message || '网络错误，请检查网络连接' });
      },setting)
    },
    choiceAmount(item,index){
      this.amountIdx = index;
      this.cumAmount = '';
    },
    showAll(){
      this.allArticle = true;
    },
    setTime(){
      var timer = setInterval(()=>{
        if(this.scrollIdx==this.donationList.length-1){
          this.scrollIdx = 0;
        }else{
          this.scrollIdx += 1;
        }
      },6000);
    },
    backHome(){
      this.$router.push({name:'Home'});
    },
    //跳转到排行榜页
    goToRank(item){
      this.$router.push({name:'Rank'});
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    onClickRight() {},
    //获取子项目的慈善份数和捐款金额
    getTatilBySubName(){
      getTatilBySubName({subName:this.detail.projectName}).then(res=>{
        if(res.data){
          this.detail.totalAmount = res.data.amount;
          this.detail.totalCount = res.data.total;
        }
      })
    },
    //获取捐款列表
    getOrderList(){
      let temp = {
        offset:1,
        limit:20,
        subName:this.detail.projectName,
        orderStatus:1
      }
      getOrderList(temp).then(res=>{
        if(res.data && res.data.length>0){
          this.donationList = res.data;
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .van-action-sheet__header {
    text-align: left;
    font-size: 15px;
    padding-left: 15px;
    font-weight: 400;
  }
  .van-action-sheet__close {
    font-size: 16px;
  }
</style>

<style lang="scss" scoped>
  .home {
    background-color: #eee;
    padding-bottom: 12vh;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .mydonation-part {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding:10px !important;
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
    }
  }

  h4 {
    background-color: #fff;
    width:100vw;
    margin:10px 0 0;
    padding: 15px 10px 15px 10px;
    text-align: left;
    font-weight: 500;
    font-size: 15px;
    span {
      border-left:3px solid #FF4D4D;
      padding-left:10px;
    }
  }
  .part {
    padding:0 10px 20px;
    background-color: #fff;
  }
  .summary-part {
    font-size: 12px;
  }

  .org-part {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
    img {
      width:15px;
      height:15px;
      margin-right: 5px;
    }
  }

  .detail-part {
    position: relative;
    font-size: 14px;
    p {
      height:170px;
      overflow: hidden;
      &.all {
        height: auto;
      }
    }
    .all-text-btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      padding:5px 0 5px;
      margin-bottom: 20px;
      background-color: #fff;
      color: #FF4D4D;
      font-size: 12px;
      box-shadow: 0 -10px 30px 20px #fff;
      .arrow {
        margin-left: 7px;
        position: relative;
        top:-2px;
        display: inline-block;
        width: 6px;
        height: 6px;
        color: #FF4D4D;
        border-bottom:1px solid #FF4D4D;
        border-left:1px solid #FF4D4D;
        transform: rotate(-45deg);
      }
    }
  }
  .progress-part {
    font-size: 13px;
  }

  .donation-part {
    margin-bottom: 20px;
    height:16vh;
    overflow: hidden;
    padding-bottom: 0;
    .scroll {
      transition: all  1.8s  ease-in-out;
    }
    .item {
      height:8vh;
      line-height: 8vh;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .name-area {
        display: flex;
        flex-direction: row;
        align-items: center;
        .bank-icon {
          width:33px;
          height:33px;
          position: relative;
          top:-1px;
          margin-right: 3px;
        }
        .name {
          font-weight: 500;
          font-size: 15px;
        }
      }
      .amount {
        font-size: 14px;
        .num {
          color:#FF4D4D;
        }
      }
      .time {
        font-size: 13px;
      }
    }
  }
  .more-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      background-color: #fff;
      border-radius: 3px;
      padding:6px 13px;
      font-size: 14px;
    }
  }
  .donation-sheet-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 6vh;
    line-height: 6vh;
    text-align: center;
    background-color: #FF4D4D;
    color: #fff;
    font-size: 14px;
  }
  
  .sheet-content {
    position: relative;
    padding: 16px 16px 8vh;
    .amount {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .item {
        padding: 7px 16px;
        border:1px solid #ccc;
        font-size: 13px;
        color:#FF4D4D;
        font-weight: 600;
        &.active {
          background-color: #FF4D4D;
          border-color:#FF4D4D;
          color: #fff;
          
        }
      }
    }
    .input-area {
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border:1px solid #ccc;
      padding: 5px 15px 5px 0;
      width:45%;
      input {
        border: none;
        padding:0 10px;
        font-size: 13px;
        line-height: 13px;
        width:60%;
      }
      input::-ms-input-placeholder{
        text-align: left;
        font-size: 13px;
        line-height: 13px;
      }
      input::-webkit-input-placeholder{
        text-align: left;
        font-size: 13px;
        line-height: 13px;
      }
      span {
        font-size: 13px;
      }
    }
    .checkbox-area {
      margin-top: 15px;
      .check-text {
        font-size: 13px;
      }
    }
    .donation-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 7vh;
      line-height: 7vh;
      text-align: center;
      background-color: #FF4D4D;
      color: #fff;
      font-size: 14px;
    }
  }
</style>
