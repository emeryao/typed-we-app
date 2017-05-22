wx.request({
    url: '',
    success: (res) => {
        console.log(res.data);
    },
});

let ctx = wx.createCanvasContext('');
ctx.fillText('hello', 0, 0);

let actions = ctx.getActions();

wx.getBLEDeviceServices({
    deviceId: '',
    success: (res) => {
        console.log(res.services[0].uuid);
    },
});

let mgr = wx.getBackgroundAudioManager();
mgr.play();
mgr.seek(3);
