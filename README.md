#### 基本配置

```javascript
const baseURL = '/static/vue/js/libs';

new AssetsCDNWebpackPlugin({
  baseURL, // not must (default: '/')
  rename: (type, name) => `${name}.min.${type}`, // not must
  fullURL: (baseURL, type, name) => `${baseURL}/${name}.${type}?tamp`,
  htmls: {
    home: {
      // js: ['axios', 'lodash'], // slot default: footer
      js: {
        slot: 'footer', // not must
        libs: ['axios', 'lodash'] // not must
      },
      // css: ['common'], // slot defualt: header
      css: {
        slot: 'header',
        libs: ['common']
      }
    }
  }
})
```

#### 配置等级

1. 资源注入优先级:

- level 1: 模板注释
```html
<!-- assets-cdn-slot-css -->
<!-- assets-cdn-slot-js -->
```

- level 2: 插件参数
```javascript
options = {
  pageName: {
    js: {
      slot: 'header', // header|footer
    },
    css: {
      slot: 'footer', // header|footer
    },
  }
}
```

2. 文件路径优先级

- level 1: 使用完整路径
```javascript
/**
 * @description - 生成资源完整路径
 * @params {string} BaseUrl - 资源基础路径
 * @params {string} type - 文件类型(css|js)
 * @params {string} name - 资源文件名
 */
options = {
  pageName: {
    fullURL: (baseURL, type, name) => resourceUrl
  }
}
```

- level 2: 使用资源命名
```javascript
/**
 * @description - 生成资源文件名称
 * @params {string} type - 文件类型(css|js)
 * @params {string} name - 资源文件名
 */
options = {
  pageName: {
    rename: (type, name) => `${name}.min.js`
  }
}
```

- level 3: 默认命名
```
rename 默认为 (type, name) => `${name}.${type}`
```
