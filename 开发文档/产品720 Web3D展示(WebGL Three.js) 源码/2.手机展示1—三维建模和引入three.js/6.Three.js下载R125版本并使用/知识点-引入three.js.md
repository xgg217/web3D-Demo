
### 特定版本three.js下载

github链接查看所有版本：https://github.com/mrdoob/three.js/releases


官网文档是最新版本的文档，如果你想预览特定版本的文档，可以在下载的three.js官方文件中**doc**目录下打开**index.html**文件即可


### .html文件中import方式引入Three.js

原来浏览器并不支持在.html文件中通过import引入js文件，往往需要通过nodejs配置好开发环境才能使用关键词`export`和`import`进行模块化开发，现在浏览器普遍支持`export`和`import`。

```html
<script type="module">
// 现在浏览器支持ES6语法，自然包括import方式引入js文件
import * as THREE from '../../three.js-r125/build/three.module.js';
// 引入Three.js扩展库
import { OrbitControls } from '../../three.js-r125/examples/jsm/controls/OrbitControls.js';
</script>
```

### 版本变化

不同版本相对上一个版本都有一定变化，不过一般变化不大，所以开发的时候要注意版本之间的差异问题。

比如R125相对R124，就从核心中移除了`Geometry`相关的类。

### 查看特定版本文档

three.js官网的文档是最新版本的three.js，如果你想查看特定版本的文档，在github网站上直接下载对应版本的three.js文件，然后本地打开即可。

文档打开目录：`three.js-r125\docs\index.html`



### npm安装

一般学习教程或者编写一个demo，为了方便可以直接在.html文件中引入thre.js相关文件，不过在正式开发的时候，你可以在你的nodejs工程文件中，通过npm命令行安装three.js。



```JavaScript
npm install three --save
```
npm安装特定版本
```JavaScript
// npm地址：https://www.npmjs.com/package/three
// 125版本
npm install three@0.125.0 --save
// 122版本
npm install three@0.122.0 --save
```

模块化开发import引入。

```JavaScript
// 引入three.js，获得threejs库全部API
import * as THREE from 'three';
// 和在.html文件中一样使用threejs类
...
var geo = new THREE.PlaneGeometry(105,209)
...
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
```

```JavaScript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
```