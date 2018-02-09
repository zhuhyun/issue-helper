<template>
  <nav class="header-container">
    <div class="logo">
      <a href="#">
        <Logo :height="height" :width="width"/>
      </a>
      <h1>Issue Helper</h1>
    </div>
    <div class="lang-btn">
      <Button @click="changeLang" type="ghost" >{{ $t("langBtn") }}</Button>
    </div>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        height: 58,
        width: 58
      }
    },
    methods: {
      changeLang () {
        let locale = this.$i18n.locale
        locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
      }
    }
  }
</script>

<style lang="less">
  *{
    font-family: Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
  }
  .header-container{
    transition: opacity .5s;
    background: #fff;
    padding: 0 110px;
    height: 64px;
    line-height: 64px;

    a{
      display: block;
      float: left;
    }
    h1{
      font-size: 18px;
      font-weight: 500;
      float: left;
      margin-left: 8px;
      line-height: 64px;
    }
  }
  .lang-btn{
    float: right;
    .ivu-btn{
      height: 26px;
      font-size: 14px;
      line-height: 26px;
      padding: 0 10px
    }
  }
</style>
