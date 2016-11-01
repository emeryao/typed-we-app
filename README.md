# typed-we-app
[TypeScript](http://www.typescriptlang.org) declaration file for WeApp API

## Install
Get the declaration [file](./typings/we-app.d.ts) under `typings` and copy/paste to your working folder

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
2016.11.01