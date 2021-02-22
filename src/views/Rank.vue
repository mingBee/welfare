<template>
  <div>
    <div class="top-part">
      <p class="sum">500元</p>
      <p class="rank">第1名</p>
      <p>生成证书</p>
    </div>

    <p class="title-part">排行榜</p>
    <div>
      <p v-for="(item,index) in list" :key="index">
        <span class="phone">184****0321</span>
        <span class="money">100元</span>
      </p>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      donation:{
        sum:'',
        rank:''
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  
</style>