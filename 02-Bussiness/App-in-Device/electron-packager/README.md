### vue项目通过electron打包为exe
1. npm i 下载依赖
2. npm start 预览
3. npm run packager 打包
4. 将vue项目打包
5. 把打包好的dist放到该目录下
> 目录结构如下
```
 >项目A
    >--dist
      >--static
      >--favicon.icon
      >--index.html
    >--main.js
    >--preload.js
    >--package.json
```
> 在main.js中修改配置
> - 将win.loadFile()中替换为自己的index.html地址

> 在package.json中配置
> - platform：设置平台，window，linux还是Mac
> - arch：x84还是x64，
> - outapp的位置可以替换成你打包后的exe名字
> - electron-version：electron的版本，必须要指定，这里设置为25.1.1，可查看package.json中electron安装的版本号
> - icon 图标地址

> 打包好的应用在build文件夹下

> [参考教程](https://juejin.cn/post/7078543710434099237)来自稀土掘金 平头哥cc
