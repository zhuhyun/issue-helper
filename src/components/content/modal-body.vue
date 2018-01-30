<template>
  <div class="mdInfo">
    <div class="bug paragraph preview " v-if="isBug">
      <h3>Version</h3>
      <p>{{modalInfo.curVersion}}</p>
      <h3>Environment</h3>
      <p v-html="environment"></p>
      <h3>Reproduction link</h3>
      <p><a :href="modalInfo.reviewLink">{{modalInfo.reviewLink}}</a></p>
      <h3>Steps to reproduce</h3>
      <p v-html="reSteps"></p>
      <h3>What is expected?</h3>
      <p v-html="expectResult"></p>
      <h3>What is actually happening?</h3>
      <p v-html="actual"></p>
      <h3>Any additional comments?</h3>
      <p v-html="added"></p>
    </div>
    <div class="feature paragraph preview" v-else>
      <h3>What problem does this feature solve?</h3>
      <p v-html="resolution"></p>
      <h3>What does the proposed API look like?</h3>
      <p v-html="API"></p>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    props: ['isBug', 'modalInfo', 'isVisible'],
    data () {
      return {
        environment: '',
        reSteps: '',
        expectResult: '',
        actual: '',
        added: '',
        resolution: '',
        API: ''
      }
    },
    methods: {
      transferMD (value) {
        if (!this.modalInfo || !value || typeof value !== 'string') {
        } else {
          return marked(value.trim())
        }
      }
    },
    watch: {
      isVisible (val) {
        if (val) {
          const info = this.modalInfo
          this.environment = this.transferMD(info.environment)
          this.reSteps = this.transferMD(info.reSteps)
          this.expectResult = this.transferMD(info.expectResult)
          this.actual = this.transferMD(info.actual)
          this.added = this.transferMD(info.added)
          this.resolution = this.transferMD(info.resolution)
          this.API = this.transferMD(info.API)
        }
      }
    },
    mounted () {
      console.log(this.modalInfo.expectResult)
    }
  }
</script>

<style lang="less">
h3{
  margin-top: 0;
  margin-bottom: .5em;
  color: rgba(0,0,0,.85);
  font-weight: 500;
}
.paragraph {
  p{
    margin-bottom: 15px;
    font-size: 14px;
  }
  h3{
    font-size: 18px;
    line-height: 1.5em;
  }
  ul{
    list-style: disc;
    padding-left: 20px;
  }
}
.preview pre {
  padding: 15px 20px;
  background-color: #f3f3f3;
  border-radius: 4px;
}
</style>
