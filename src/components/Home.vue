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
            <Select v-model="issueType" style="width:100%">
              <Option v-for="item in contList" :value="item" :key="item">{{ item }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
        <div class="form-explain">
          <span>{{$t('repoSubtitle')}}</span>
        </div>
        <div class="form-title">
          <div class="form-title-required"><span>{{$t('title')}}</span></div>
          <Input v-model="model3" placeholder="Enter something..."/>
        </div>
        <div class="form-content">
          <BugReport v-if="type" @getInfo="getBugInfo" ref="content"/>
          <FeatureRequest v-else @getInfo="getFeaInfo" ref="content"/>
        </div>
        <div class="preview-btn">
          <Button type="primary" size="large" @click="previewInfo">{{$t('preview')}}</Button>
          <Modal v-model="show" width="700">
            <p slot="header" style="font-size: 20px">{{$t('previewModal')}}</p>
            <div v-html="modalInfo.html" class="info-content"></div>
            <div slot="footer">
              <Button type="primary" size="large"  @click="">Create</Button>
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
        Check out source on <a href="https://gitlab.oneitfarm.com/ladybird/ui-nuclear">Gitlab</a>
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
      model3: '',
      themeList: ['ui-nuclear', 'iview'],
      bugInfo: null,
      featureInfo: null,
      show: false,
      modalInfo: {},
      type: true
    }
  },
  computed: {
    intro18n () {
      return marked(this.$t('intro').trim())
    },
    contList () {
      return [this.$t('bugReport.name'), this.$t('featureRequest.name')]
    },
    issueType: {
      get () {
        return this.type ? this.$t('bugReport.name') : this.$t('featureRequest.name')
      },
      set (value) {
        this.type = value === this.$t('bugReport.name')
        console.log(value)
      }
    }
    // type () {
    //   return this.issueType === this.$t('bugReport.name')
    // }
  },
  methods: {
    getBugInfo (value) {
      this.bugInfo = value
    },
    getFeaInfo (value) {
      this.featureInfo = value
    },
    previewInfo () {
      const info = this.$refs.content.generate()
      if (info) {
        this.show = true
        this.modalInfo = info
      }
    }
  },
  created () {
  }
}
</script>

<style lang="less">
  .layout-wrap {
    width: 100%;
    background: #f0f2f5;
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
</style>
