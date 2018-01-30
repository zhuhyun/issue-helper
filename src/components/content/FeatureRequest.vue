<template>
  <div class="feature-request">
    <Form>
      <FormItem class="form-title">
        <p class="form-title-required">{{$t('featureRequest.rationaleTitle')}}</p>
        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." v-model="featureInfo.resolution" />
        <p class="form-explain" v-html="featureI18n.rational"></p>
      </FormItem>
      <FormItem class="form-title">
        <p class="form-title-required">{{$t('featureRequest.proposalTitle')}}</p>
        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." v-model="featureInfo.API"/>
        <p class="form-explain" v-html="featureI18n.proposal"></p>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    data () {
      return {
        featureInfo: {
          resolution: '',
          API: ''
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
      featureInfo (val, oldVal) {
        this.featureInfo = val
        this.$emit('getInfo', val)
      }
    },
    mounted () {
      this.$emit('getInfo', this.featureInfo)
    }
  }
</script>

<style>

</style>
