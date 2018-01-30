<template>
  <div class="layout">
    <Header />
    <LayoutContent />
    <footer class="layout-footer">
      <p>
        Built with
        <a href="https://github.com/vuejs/vue-cli">vue-cli</a>
        &centerdot;
        Check out source on <a href="https://github.com/vuejs/vue-issue">GitHub</a>
      </p>
    </footer>
  </div>
</template>

<script>
import Header from './Header'
import LayoutContent from './content/LayoutContent'
export default {
  name: 'Home',
  components: {
    Header,
    LayoutContent
  },
  data () {
    return {

    }
  }
}
</script>

<style>
footer.layout-footer p{
  padding: 24px 50px;
  color: rgba(0,0,0,.65);
  font-size: 16px;
  text-align: center;
}
</style>
