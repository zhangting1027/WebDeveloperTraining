# 用VUE(H5 + Javascript + css) + Electron 开发居于SensingStoreCloud的答题拍照互动。 

## 业务流程说明及接口简介


1.  初始化本地配置（先从SenisngStoreCLoud建立相应的活动，获取活动游戏的SecurityKey，[详细参考文档](https://docs.troncell.com)） 
2.  从SensingStoreCloud平台获取，答题数据，进行答题 
  答题完成后，提交答题数据至云平台
3.  进行拍照，拍照完成后，上传照片到云服务器，并获取相下载二维码
4.  用户微信手机扫码访问下载照片页面

![业务流程图](https://raw.githubusercontent.com/troncell/WebDeveloperTraining/e956fa834ca38a20a323f26eaf8f8c8618f00224/02-Bussiness/assests/QA_Photing_flow.png)

## 界面设计及程序开发

1.  采用Vue 2.0开发前端界面，用[Electron](https://github.com/electron/)打包成windows的桌面应用程序


##