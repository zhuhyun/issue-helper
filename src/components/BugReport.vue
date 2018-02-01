<template>
  <div class="bug-report">
    <Row type="flex" justify="space-between">
      <Col span="11">
        <p class="version-tit">{{$t('bugReport.version')}}</p>
        <Select v-model="bugInfo.curVersion" style="width:100%">
          <Option v-for="item in version" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <p class="form-explain">{{$t('bugReport.versionSubtitle')}}</p>
      </Col>
      <Col span="11" >
        <p class="form-title-required">{{$t('bugReport.reTitle')}}</p>
        <Input v-model="bugInfo.reviewLink" placeholder="Enter something..." />
        <!--<p class="form-explain" v-html="bugI18n.reSubtitle"></p>-->
        <i18n id="reSubtitle" @click- ="visible = true"></i18n>
        <Modal v-model="visible" width="720">
          <p slot="header" style="font-size: 20px">
            <span>{{$t('bugReport.modalTitle')}}</span>
          </p>
          <!--<div v-html="review" style="font-size: 16px"></div>-->
          <i18n id="reviewModal" style="font-size: 16px"></i18n>
          <div slot="footer">
          </div>
        </Modal>
      </Col>
    </Row>
    <Form>
      <FormItem class="form-title">
        <p class="form-title-required">{{$t('bugReport.envir')}}</p>
        <Input placeholder="Enter something..." v-model="bugInfo.environment"/>
        <p class="form-explain">{{$t('bugReport.envirSubtitle')}}</p>
      </FormItem>
      <FormItem class="form-title">
        <p class="form-title-required">{{$t('bugReport.stepTitle')}}</p>
        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." v-model="bugInfo.reSteps"/>
        <p class="form-explain" v-html="bugI18n.stepSubtitle"></p>
      </FormItem>
      <FormItem class="form-title">
        <p class="form-title-required">{{$t('bugReport.expectedTitle')}}</p>
        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." v-model="bugInfo.expectResult"/>
      </FormItem>
      <FormItem class="form-title">
        <p class="form-title-required">{{$t('bugReport.actualTitle')}}</p>
        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." v-model="bugInfo.actual"/>
      </FormItem>
      <FormItem class="form-title">
        <p class="form-title-added">{{$t('bugReport.extraTitle')}}</p>
        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." v-model="bugInfo.added"/>
        <p class="form-explain">{{$t('bugReport.extraSubtitle')}}</p>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import marked from 'marked'
  import generate from '../generate'
  var strRegex = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
  var re = new RegExp(strRegex)

  export default {
    data () {
      return {
        version: ['2.1.4', '2.1.3', '2.1.2', '2.1.1', '2.1.0'],
        bugInfo: {
          curVersion: '2.1.4',
          reviewLink: '',
          environment: '',
          reSteps: '',
          expectResult: '',
          actual: '',
          added: ''
        },
        visible: false
      }
    },
    computed: {
      bugI18n () {
        return {
          reSubtitle: marked(this.$t('bugReport.reSubtitle').trim()),
          stepSubtitle: marked(this.$t('bugReport.stepSubtitle').trim())
        }
      },
      review () {
        return marked(this.$t('bugReport.reviewModal').trim())
      }
    },
    watch: {
      bugInfo (val, oldVal) {
        this.bugInfo = val
        this.$emit('getInfo', val)
      }
    },
    methods: {
      generate () {
        const {curVersion, reviewLink, environment, reSteps, expectResult, actual, added} = this.bugInfo
        if (reviewLink !== '' && environment !== '' && reSteps !== '' && expectResult !== '' && actual !== '') {
          if (re.test(reviewLink)) {
            return generate(`
### Version
${curVersion}

### Reproduction link
[${reviewLink}](${reviewLink})

### Environment
${environment}

### Steps to reproduce
${reSteps}

### What is expected?
${expectResult}

### What is actually happening?
${actual}

${added ? `---\n${added}` : ''}`.trim())
          } else {
            this.$Message.error('请填写正确的网址')
          }
        } else {
          this.$Message.error('请填写标题前带*的内容')
        }
      }
    },
    mounted () {
      this.$emit('getInfo', this.bugInfo)
    }
  }
</script>

<style lang="less">
  .bug-report .version-tit, .form-title-added{
      font-size: 14px;
      color: rgba(0, 0, 0, .85);
      margin-bottom: 5px;
  }
  .review a{
    color: #1890ff;
    font-size: 15px;
    font-weight: 500;
    background-color: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: color .3s;
  }
</style>
