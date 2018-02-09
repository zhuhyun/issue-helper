<template>
  <div>
    <i18n id="intro" class="intro" @click-modal="show = true"></i18n>
    <Modal v-model="show" width="720">
      <p slot="header" style="font-size: 20px">
        <span>{{$t('introModalTit')}}</span>
      </p>
      <i18n id="introModal" style="font-size: 16px"></i18n>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    mounted () {
    }
  }
</script>

<style lang="less">
  .intro {
    h2 {
      margin-top: 0;
      margin-bottom: .5em;
      color: rgba(0, 0, 0, .85);
      font-weight: 500;
      font-size: 22px;
    }
    p {
      font-size: 14px;
      margin-bottom: 15px;
    }
    ul{
      margin-bottom: 15px;
      padding-left: 20px;
      li{
        font-size: 14px;
        list-style: disc;
      }
    }
  }

</style>
