module.exports = {
  langBtn: '中文',
  intro: require('../../lang/en/intro.md').default,
  storage: 'I am opening an issue for:',
  typeTitle: 'This is a:',
  repoSubtitle: 'Please make sure to file the issue at appropriate repo.',
  title: 'Title',
  bugReport: {
    name: 'Bug report',
    version: 'Version:',
    choose: 'please choose...',
    versionSubtitle: 'Check if the issue is reproducible with the latest stable version.',
    reTitle: 'Link to minimal reproduction:',
    reSubtitle: require('./re-subtitle.md').default,
    envir: 'Environment:',
    envirSubtitle: 'os version, browser version, react-native version...',
    stepTitle: 'Step to reproduce:',
    stepSubtitle: require('./restep-subtitle.md').default,
    expectedTitle: 'What is expected?:',
    actualTitle: 'What is actually happening?:',
    extraTitle: 'Any additional comments? (optional):',
    extraSubtitle: 'e.g. some background/context of how you ran into this bug.',
    reviewModal: require('./repor-modal.md').default,
    review: 'What is a minimal reproduction, and why is it required?',
    modalTitle: 'About Reproductions',
    reproduction: 'Reproduction link'
  },
  featureRequest: {
    name: 'Feature Request',
    rationaleTitle: 'What problem does this feature solve?:',
    rationaleSubtitle: require('./rationale-subtitle.md').default,
    proposalTitle: 'What does the proposed API look like?:',
    proposalSubtitle: require('./proposal-subtitle.md').default
  },
  preview: 'Preview',
  previewModal: 'Preview Issue'
}
