import jsonPreviewPlugin from "./json-preview/JsonPreview.vue"

export const JsonPreview = jsonPreviewPlugin


// 此处文件自己再源插件基础上封装一层，暴露该插件本体和封装插件方法逻辑提供给外部，方便管理调用，减轻页面逻辑，同时也能方便追溯方法源头