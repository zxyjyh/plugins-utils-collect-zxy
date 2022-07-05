# 阿里云签名逻辑

## 简介

h5 项目, 请求接口的时候, 需要进行签名校验.

阿里云签名文档的地址: https://help.aliyun.com/document_detail/29475.html

## 使用

本项目主要是配合 axios 来使用的.

```javascript
const sign = new Sign('xxxx', 'xxxx')

axiosInstance.interceptors.request.use(function (config) {
    let signObj = sign.create(config)
    signObj.setHeaders(config.headers)

    return config
}, requestFail)
```

## 部署和部署

1. 检查并且修复代码格式问题, npm run lint
2. 构建最新的代码, npm run build
3. 更新 package.json 的版本号
4. npm publish
