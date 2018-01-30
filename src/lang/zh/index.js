module.exports = {
  langBtn: 'English',
  intro: require('./intro.md').default,
  storage: '相关仓库：',
  typeTitle: '这是一个：',
  repoSubtitle: '请确保将 issue 发往相关的仓库。',
  title: 'Issue 标题',
  bugReport: {
    name: '错误报告',
    version: '版本：',
    choose: '请选择',
    versionSubtitle: '请检查问题是否存在于最新版本中。',
    reTitle: '重现链接：',
    reSubtitle: require('./re-subtitle.md').default,
    envir: '环境',
    envirSubtitle: '系统版本、浏览器版本、 react-native 版本等等信息',
    stepTitle: '重现步骤',
    stepSubtitle: require('./restep-subtitle.md').default,
    expectedTitle: '期望的结果是什么？：',
    actualTitle: '实际的结果是什么？：',
    extraTitle: '补充说明（可选）：',
    extraSubtitle: '比如：遇到这个 bug 的业务场景、上下文。',
    reviewModal: require('./repor-modal.md').default,
    review: '什么是最小化重现，为什么这是必需的？',
    modalTitle: '关于重现',
    reproduction: 'Reproduction link'
  },
  featureRequest: {
    name: '功能请求',
    rationaleTitle: '这个功能解决了什么问题？',
    rationaleSubtitle: require('./rationale-subtitle.md').default,
    proposalTitle: '你期望的 API 是怎样的？',
    proposalSubtitle: require('./proposal-subtitle.md').default
  },
  preview: '预览',
  previewModal: 'Issue 预览'
}
