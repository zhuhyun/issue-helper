# issue-helper

> A client for issue reporting which use the ui-nuclear compoents and ui design.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 项目结构
- components
    - content (主要内容部分)
        - BugReport (错误报告表单)
        - FeatureRequest (功能请求表单)
        - LayoutContent (共用表单部分)
        - modal (备用弹出框)
        - modal-body (预览弹出框内容)
    - header (页面顶部)
    - Home (整体页面)
- lang
    - en (英文)
    - zh (中文)

