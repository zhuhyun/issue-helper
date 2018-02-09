<template>
  <Form class="bug-report" ref="bugInfo" :model="bugInfo" :rules="ruleValidate">
    <FormItem>
      <Row type="flex" justify="space-between">
        <Col span="11">
          <p class="version-tit">{{$t('bugReport.version')}}</p>
          <FormItem prop="curVersion">
            <Select v-model="bugInfo.curVersion" style="width:100%">
              <Option v-for="item in version" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          <p class="form-explain">{{$t('bugReport.versionSubtitle')}}</p>
        </Col>
        <Col span="11" >
          <p class="form-title-required">{{$t('bugReport.reTitle')}}</p>
          <FormItem prop="reviewLink" :show-message="false">
            <Input v-model="bugInfo.reviewLink" />
          </FormItem>
          <i18n id="reSubtitle" @click- ="visible = true" class="form-explain" :class="{'error-msg': isReLinkNull}"></i18n>
          <Modal v-model="visible" width="720">
            <p slot="header" style="font-size: 20px">
              <span>{{$t('bugReport.modalTitle')}}</span>
            </p>
            <i18n id="reviewModal" style="font-size: 16px"></i18n>
            <div slot="footer">
            </div>
          </Modal>
        </Col>
      </Row>
    </FormItem>
    <FormItem class="form-title" prop="environment" :show-message="false">
      <p class="form-title-required">{{$t('bugReport.envir')}}</p>
      <Input v-model="bugInfo.environment"/>
      <p class="form-explain" :class="{'error-msg': isEnvirNull}">{{$t('bugReport.envirSubtitle')}}</p>
    </FormItem>
    <FormItem class="form-title" prop="reSteps" :show-message="false">
      <p class="form-title-required">{{$t('bugReport.stepTitle')}}</p>
      <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="bugInfo.reSteps"/>
      <p class="form-explain" v-html="bugI18n.stepSubtitle" :class="{'error-msg': isStepNull}"></p>
    </FormItem>
    <FormItem class="form-title" prop="expectResult">
      <p class="form-title-required">{{$t('bugReport.expectedTitle')}}</p>
      <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="bugInfo.expectResult"/>
    </FormItem>
    <FormItem class="form-title" prop="actual">
      <p class="form-title-required">{{$t('bugReport.actualTitle')}}</p>
      <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="bugInfo.actual"/>
    </FormItem>
    <FormItem class="form-title" prop="added">
      <p class="form-title-added">{{$t('bugReport.extraTitle')}}</p>
      <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="bugInfo.added"/>
      <p class="form-explain">{{$t('bugReport.extraSubtitle')}}</p>
    </FormItem>
  </Form>
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
        visible: false,
        isReLinkNull: false,
        isEnvirNull: false,
        isStepNull: false,
        ruleValidate: {
          reviewLink: [
            {required: true, trigger: 'change'}
          ],
          environment: [
            {required: true, trigger: 'change'}

          ],
          reSteps: [
            {required: true, trigger: 'change'}
          ],
          expectResult: [
            {required: true, message: 'expected is required', trigger: 'change'}
          ],
          actual: [
            {required: true, message: 'actual is required', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      bugI18n () {
        return {
          reSubtitle: marked(this.$t('reSubtitle').trim()),
          stepSubtitle: marked(this.$t('bugReport.stepSubtitle').trim())
        }
      }
    },
    watch: {
      bugInfo: {
        handler (val, oldVal) {
          this.bugInfo = val
          this.$emit('getInfo', this.bugInfo)
          if (val.reviewLink !== '') {
            this.isReLinkNull = false
          }
          if (val.environment !== '') {
            this.isEnvirNull = false
          }
          if (val.reSteps !== '') {
            this.isStepNull = false
          }
        },
        deep: true
      }

    },
    methods: {
      generate () {
        const info = this.bugInfo
        if (info.reviewLink !== '' && info.environment !== '' && info.reSteps !== '' && info.expectResult !== '' && info.actual !== '') {
          if (re.test(info.reviewLink)) {
            return generate(`
### Version
${info.curVersion}

### Reproduction link
[${info.reviewLink}](${info.reviewLink})

### Environment
${info.environment}

### Steps to reproduce
${info.reSteps}

### What is expected?
${info.expectResult}

### What is actually happening?
${info.actual}

${info.added ? `---\n${info.added}` : ''}`.trim())
          } else {
            this.$Message.error('请填写正确的网址')
          }
        }
      },
      handleSubmit () {
        const name = 'bugInfo'
        const info = this.bugInfo
        this.$refs[name].validate()
        if (info.reviewLink === '') {
          this.isReLinkNull = true
        }
        if (info.environment === '') {
          this.isEnvirNull = true
        }
        if (info.reSteps === '') {
          this.isStepNull = true
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
  .error-msg{
    color: #f5222d
  }
</style>
