import {getUserInfo as adminGetUserInfo} from '@/api/home'
import { Notify,Toast } from 'vant';
import cache from '@/utils/cache'
export default {
  data() {
    return {
      userInfo:{}
    }
  },
  methods: {
    getUserInfo(func){
      // if(sign){
      //   return;
      // }
      // sign = true;
      this.$cordPlugin.getBocCustomerAllInfo(function (data) {
        // Toast.loading({
        //   duration:0,
        //   forbidClick: true
        // });
        adminGetUserInfo({initCaChe:data.cipherText}).then(res=>{
          // sign = false;
          // Toast.clear();
          // if(res.data.merId){
            console.log('成功获取用户数据');
            cache.put('userInfo', res.data, 30 *60 *1000);//缓存30分钟
            console.log('缓存成功');
            this.userInfo = res.data;
            if(func && typeof func === "function"){
              console.log('调用回调');
              func();
            }
          // }
        }).catch(err=>{
          // sign = false;
          Notify({ type: 'danger', message: '获取服务器用户信息错误' });
          // Toast.clear();
        })
      },function (err) {
        // Toast.clear();
        // sign = false;
        Notify({ type: 'danger', message: '获取用户插件错误' });
      })
    }
  },
}