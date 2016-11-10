# typed-we-app
[TypeScript](http://www.typescriptlang.org) declaration file for WeApp API

## Install
* With [`typings`](https://github.com/typings/typings) installed
    ```batch
    typings install env~we-app -SG
    ```
    Or
    ```batch
    typings install github:Emeryao/typed-we-app -SG
    ```
* Or get the declaration [file](./we-app.d.ts) and include it to your project

## About
Based on the official WeApp API [document](https://mp.weixin.qq.com/debug/wxadoc/dev/api/) version `0.10.102800`

## Sample
* TypeScript
```typescript
wx.request({
    url: 'request/url',
    success: (res) => {
        console.log(res.data);
    }
});

let ctx = wx.createContext();
ctx.fillText('hello', 0, 0);

let actions = ctx.getActions();
wx.drawCanvas({
    canvasId: 'canvas-id',
    actions
});
```

## Last Update
2016.11.10