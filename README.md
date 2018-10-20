# typed-we-app
[TypeScript](http://www.typescriptlang.org) declaration file for WeApp API  

[![NPM](https://nodei.co/npm/typed-we-app.png?downloads=true&stars=true)](https://nodei.co/npm/typed-we-app/)

## Install

* With [`npm`](https://www.npmjs.com/) installed  

    ```batch
    npm install typed-we-app --save-dev
    ```

* With [`typings`](https://github.com/typings/typings) installed  

    ```batch
    typings install github:Emeryao/typed-we-app -SG
    ```

* Or get the declaration file [here](./we-app.d.ts) and include it to your project

## About
Based on the official WeApp API [documentation](https://mp.weixin.qq.com/debug/wxadoc/dev/api/)   
Wechat Web DevTool Version `1.01.1712150`  
WAService.js Version `1.7.0`

## Sample
* TypeScript
```typescript
wx.request({
    url: 'request/url',
    success: (res) => {
        console.log(res.data);
    }
});

let ctx = wx.createCanvasContext();
ctx.fillText('hello', 0, 0);

let actions = ctx.getActions();
wx.drawCanvas({
    canvasId: 'canvas-id',
    actions
});

wx.getBLEDeviceServices({
    deviceId: '',
    success: (res) => {
        console.log(res.services[0].uuid);
    },
});
```

## Last Update
`2018.10.20`
