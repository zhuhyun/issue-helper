<template>
  <div>
    <Modal v-model="visible" width="720">
      <p slot="header" style="font-size: 20px">
        <span>{{$t('bugReport.modalTitle')}}</span>
      </p>
      <div v-html="review" style="font-size: 16px">
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        show: true
      }
    },
    computed: {
      review () {
        return marked(this.$t('bugReport.reviewModal').trim())
      }
    }
  }
</script>

<style>

</style>
