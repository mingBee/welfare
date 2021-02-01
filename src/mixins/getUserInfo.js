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
      this.$cordPlugin.getBocCustomerAllInfo(function (data) {
        Toast.loading({
          duration:0,
          forbidClick: true
        });
        adminGetUserInfo({initCaChe:data.cipherText}).then(res=>{
          Toast.clear();
          if(res.data.code === 20000){
            if(res.data.merId){
              cache.put('userInfo', res.data, 30 *60 *1000);//缓存30分钟
              this.userInfo = res.data;
              if(func && typeof func === "function"){
                func();
              }
            }
          }
        }).catch(err=>{
          Notify({ type: 'danger', message: err.message || '网络错误，请检查网络连接' });
          Toast.clear();
        })
      },function (err) {
        Toast.clear();
        Notify({ type: 'danger', message: err.message || '网络错误，请检查网络连接' });
      })
    }
  },
}