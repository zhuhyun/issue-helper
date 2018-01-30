<template>
  <nav class="header-container">
    <div class="logo">
      <a href="#">
        <Logo :height="height" :width="width"/>
      </a>
      <h1>Issue Helper</h1>
    </div>
    <div>
      <button type="button" class="btn-lg" @click="changeLang">{{ $t("langBtn") }}</button>
    </div>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        height: 64,
        width: 64
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
  .btn-lg{
    height: 24px;
    font-size: 14px;
    border-radius: 4px;
    line-height: 1.5;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
    border: 1px solid #d9d9d9;
    white-space: nowrap;
    padding: 0 7px;
    outline: none;
    float: right;
    margin-top: 20px;
    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
    -o-transition: all .3s cubic-bezier(.645,.045,.355,1);
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    color: rgba(0,0,0,.65);
    background-color: #fff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover{
      border-color: #1890ff;
      color: #1890ff;
    }
  }
</style>
