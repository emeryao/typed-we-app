wx.request({
    url: '',
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