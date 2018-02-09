<template>
  <div class="layout-wrap">
    <Header />
    <div class="layout-content-wrap">
      <div class="layout-content">
        <Intro />
        <div class="layout-select">
          <Row type="flex" justify="space-between">
            <Col span="11">
            <p>{{$t('storage')}}</p>
            <Select v-model="theme" style="width:100%" >
              <Option v-for="item in themeList" :value="item" :key="item">{{ item }}</Option>
            </Select>
            </Col>
            <Col span="11">
            <p>{{$t('typeTitle')}}</p>
            <Select v-model="type" style="width:100%">
              <Option v-for="item in issueType" :value="item.id" :key="item.name">{{ item.name }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
        <div class="form-explain">
          <span>{{$t('repoSubtitle')}}</span>
        </div>
        <div class="form-title">
          <div class="form-title-required"><span>{{$t('title')}}</span></div>
          <Input v-model="formTit" ref="formTit" :class="{'has-error': notNull}"/>
          <p class="form-explain" v-if="notNull" style="color: #f5222d">title is required</p>
        </div>
        <div class="form-content">
          <component :is="type" ref="content" @getInfo="getInfo"></component>
        </div>
        <div class="preview-btn">
          <Button type="primary" size="large" @click="previewInfo">{{$t('preview')}}</Button>
          <Modal v-model="show" width="700">
            <p slot="header" style="font-size: 20px">{{$t('previewModal')}}</p>
            <div v-html="modalInfo.html" class="info-content"></div>
            <div slot="footer">
              <Button type="primary" size="large"  @click="">{{$t('create')}}</Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>

    <footer class="layout-footer">
      <p>
        Inspired by
        <a href="https://new-issue.vuejs.org">Vue Issue Helper</a>
        &centerdot;
        Check out source on <a href="https://gitlab.oneitfarm.com/ladybird/issue-helper">Gitlab</a>
      </p>
    </footer>
  </div>
</template>

<script>
import Header from './Header'
import BugReport from './BugReport'
import FeatureRequest from './FeatureRequest'
import Intro from './Intro'
import marked from 'marked'

export default {
  name: 'Home',
  components: {
    Header,
    Intro,
    BugReport,
    FeatureRequest
  },
  data () {
    return {
      theme: 'ui-nuclear',
      formTit: '',
      themeList: ['ui-nuclear', 'iview'],
      bugInfo: null,
      featureInfo: null,
      show: false,
      modalInfo: {},
      type: 'BugReport',
      notNull: false
    }
  },
  computed: {
    intro18n () {
      return marked(this.$t('intro').trim())
    },
    issueType () {
      return [
        { id: 'BugReport', name: this.$t('bugReport.name') },
        { id: 'FeatureRequest', name: this.$t('featureRequest.name') }
      ]
      // get () {
      //   return this.type === this.$t('bugReport.name') ? this.$t('bugReport.name') : this.$t('featureRequest.name')
      // },
      // set (value) {
      //   this.type = value
      // }
    }
  },
  watch: {
    formTit (val) {
      if (val) {
        this.notNull = false
      }
    }
  },
  methods: {
    getInfo (value) {
      this.bugInfo = value
    },
    previewInfo () {
      const info = this.$refs.content.generate()
      this.$refs.content.handleSubmit()
      if (this.formTit === '') {
        this.notNull = true
      }
      if (info && this.formTit) {
        this.show = true
        this.modalInfo = info
      }
      console.log(info.markdown)
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
  .layout-wrap {
    width: 100%;
    background: #f0f2f5;
    a{
      color: #1890ff;
      font-size: 14px;
      font-weight: 500;
      background-color: transparent;
      text-decoration: none;
      outline: none;
      cursor: pointer;
      transition: color .3s;
      &:hover{
        outline: none;
        opacity: 0.8;
      }
    }
  }
  .layout-content-wrap{
    width: 100%;
    padding: 0 110px
  }
  .layout-content {
    margin: 20px auto;
    padding: 24px;
    border-radius: 4px;
    background: #fff;
  }
  .layout-select p, .form-title-required {
    font-size: 14px;
    color: rgba(0, 0, 0, .85);
    margin-bottom: 5px;
  }
  .form-explain {
    color: rgba(0, 0, 0, .45);
    line-height: 1.5;
    -webkit-transition: color .15s cubic-bezier(.215, .61, .355, 1);
    -o-transition: color .15s cubic-bezier(.215, .61, .355, 1);
    transition: color .15s cubic-bezier(.215, .61, .355, 1);
    margin-top: 2px;
    font-size: 14px;
  }

  .form-title {
    margin-top: 5px;
  }

  .form-title-required::before {
    display: inline-block;
    margin-right: 4px;
    content: "*";
    line-height: 1;
    font-size: 14px;
    color: #f5222d;
  }

  .preview-btn {
    text-align: center;
    margin: 30px 0;
    .ivu-btn {
      font-weight: 500;
    }
  }
  .info-content{
    p{
      font-size: 18px;
      color: rgba(0, 0, 0, .55)
    }
    h3{
      font-size: 20px;
    }
    pre {
      padding: 15px 20px;
      background-color: #f3f3f3;
      border-radius: 4px;
    }
  }
  .form-content {
    margin-top: 40px;
  }
  footer.layout-footer p{
    padding: 24px 50px;
    color: rgba(0,0,0,.65);
    font-size: 16px;
    text-align: center;
  }
  pre {
    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 90%;
    color: #292b2c;
    background-color: #f3f3f3;
  }
  .has-error{
    .ivu-input{
      border-color: #f5222d;
    }
    .ivu-input:focus{
      border-color: #f5222d;
      box-shadow: 0 0 0 2px rgba(245,34,45,.2)
    }
    .ivu-input:hover{
      border-color: #f5222d;
    }
  }
  .ivu-form-item-error-tip{
    font-size: 14px;
    font-weight: 500;
  }
</style>
