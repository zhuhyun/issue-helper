<template>
  <Form class="feature-request" ref="featureInfo" :model="featureInfo" :rules="ruleValidate">
    <FormItem class="form-title" prop="resolution" :show-message="false">
      <p class="form-title-required">{{$t('featureRequest.rationaleTitle')}}</p>
      <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="featureInfo.resolution"/>
      <p class="form-explain" v-html="featureI18n.rational" :class="{'error-msg': isResoNull}"></p>
    </FormItem>
    <FormItem class="form-title" prop="API" :show-message="false">
      <p class="form-title-required">{{$t('featureRequest.proposalTitle')}}</p>
      <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="featureInfo.API"/>
      <p class="form-explain" v-html="featureI18n.proposal" :class="{'error-msg': isApiNull}"></p>
    </FormItem>
  </Form>
</template>

<script>
  import marked from 'marked'
  import generate from '../generate'

  export default {
    data () {
      return {
        featureInfo: {
          resolution: '',
          API: ''
        },
        isResoNull: false,
        isApiNull: false,
        ruleValidate: {
          resolution: [
            {required: true, trigger: 'change'}
          ],
          API: [
            {required: true, trigger: 'change'}

          ]
        }
      }
    },
    computed: {
      featureI18n () {
        return {
          rational: marked(this.$t('featureRequest.rationaleSubtitle').trim()),
          proposal: marked(this.$t('featureRequest.proposalSubtitle').trim())
        }
      }
    },
    watch: {
      featureInfo: {
        handler (val, oldVal) {
          this.featureInfo = val
          if (val.resolution !== '') {
            this.isResoNull = false
          }
          if (val.API !== '') {
            this.isApiNull = false
          }
          this.$emit('getInfo', val)
        },
        deep: true
      }
    },
    methods: {
      generate () {
        const { resolution, API } = this.featureInfo
        if (resolution !== '' && API !== '') {
          return generate(`
### What problem does this feature solve?
${resolution}

### What does the proposed API look like?
${API}`.trim())
        }
      },
      handleSubmit () {
        const name = 'featureInfo'
        const info = this.featureInfo
        this.$refs[name].validate()
        if (info.resolution === '') {
          this.isResoNull = true
        }
        if (info.API === '') {
          this.isApiNull = true
        }
      }
    },
    mounted () {
      this.$emit('getInfo', this.featureInfo)
    }
  }
</script>

<style>
  .error-msg{
    color: #f5222d
  }
</style>
