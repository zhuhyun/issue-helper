<template>
  <div class="layout-wrap">
    <div class="layout-content">
      <div class="intro paragraph" v-html="intro18n">
      </div>
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
        <BugReport v-if="type" @getInfo="getBugInfo"/>
        <FeatureRequest v-else @getInfo="getFeaInfo"/>
      </div>
      <div class="preview-btn">
        <Button type="primary" size="large" @click="previewInfo">{{$t('preview')}}</Button>
        <Modal v-model="show" width="700">
          <p slot="header" style="font-size: 20px">{{$t('previewModal')}}</p>
          <modalBody :isBug="type" :modalInfo="modalInfo" :isVisible="show"></modalBody>
          <div slot="footer">
            <Button type="primary" size="large"  @click="">Create</Button>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
  import BugReport from './BugReport'
  import FeatureRequest from './FeatureRequest'
  import marked from 'marked'
  import modalBody from './modal-body'
  var strRegex = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
  var re = new RegExp(strRegex)

  export default {
    components: {
      BugReport,
      FeatureRequest,
      modalBody
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
        const bug = this.bugInfo
        if (this.type) {
          if (bug.reviewLink !== '' && bug.environment !== '' && bug.reSteps !== '' && bug.expectResult !== '' && bug.actual !== '') {
            if (re.test(bug.reviewLink)) {
              this.show = true
              this.modalInfo = this.bugInfo
            } else {
              this.$Message.error('请填写正确的网址')
            }
          } else {
            this.$Message.error('请填写标题前带*的内容')
          }
        } else {
          const feature = this.featureInfo
          if (feature.resolution !== '' && feature.API !== '') {
            this.show = true
            this.modalInfo = this.featureInfo
          } else {
            this.$Message.error('请填写标题前带*的内容')
          }
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
    padding: 0 110px;
  }

  .layout-content {
    margin: 20px auto;
    padding: 24px;
    border-radius: 4px;
    background: #fff;
  }

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

  .form-content {
    margin-top: 40px;
  }
</style>
