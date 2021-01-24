import {getUserInfo as adminGetUserInfo} from '@/api/home'
import { putCache } from '@/utils/cache'
let sign = false;
export default {
  data() {
    return {
      userInfo:{}
    }
  },
  methods: {
    getUserInfo(func){
      if(sign){
        return;
      }
      sign = true;
      this.$cordPlugin.getBocCustomerAllInfo(function (data) {
        this.$toast.loading({
          duration:0,
          forbidClick: true
        });
        adminGetUserInfo({initCaChe:data.cipherText}).then(res=>{
          sign = false;
          this.$toast.clear();
          if(res.data.code === 20000){
            if(res.data.merId){
              putCache('userInfo', res.data, 30 *60 *1000);//缓存30分钟
              this.userInfo = res.data;
              if(func && typeof func === "function"){
                func();
              }
            }
          }
        }).catch(err=>{
          sign = false;
          Notify({ type: 'danger', message: err.message || '网络错误，请检查网络连接' });
          this.$toast.clear();
        })
      },function (err) {
        this.$toast.clear();
        sign = false;
        Notify({ type: 'danger', message: err.message || '网络错误，请检查网络连接' });
      })
    }
  },
}