import {getUserInfo as adminGetUserInfo} from '@/api/home'
import { Notify,Toast } from 'vant';
import cache from '@/utils/cache'
export default {
  data() {
    return {
      userInfo:null
    }
  },
  methods: {
    getUserInfo(){
      // if(sign){
      //   return;
      // }
      // sign = true;
      // cache.put('userInfo', {id:'816234019636252660'}, 30 *60 *1000);
      console.log('开始获取用户信息')
      let userInfo = cache.get('userInfo');
      if(userInfo && userInfo.id){
        this.userInfo = userInfo;
        return;
      }
      this.$cordPlugin.getBocCustomerAllInfo( data=> {
        // Toast.loading({
        //   duration:0,
        //   forbidClick: true
        // });
        console.log('成功出发用户插件');
        adminGetUserInfo({initCaChe:data.cipherText}).then(res=>{
          // sign = false;
          // Toast.clear();
          // if(res.data.merId){
            console.log('成功获取用户数据');
            cache.put('userInfo', res.data, 30 *60 *1000);//缓存30分钟
            console.log('缓存成功');
            console.log(res.data,'缓存的数据');
            this.userInfo = res.data;
          // }
        }).catch(err=>{
          // sign = false;
          console.log(err,'服务器err')
          Notify({ type: 'danger', message: '获取服务器用户信息错误' });
          // Toast.clear();
        })
      }, err=> {
        // Toast.clear();
        // sign = false;
        console.log(err,'插件err')
        Notify({ type: 'danger', message: '获取用户插件错误' });
      })
    }
  },
}