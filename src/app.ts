wx.request({
    url: '',
    success: (res) => {
        if (res) {
            console.log(res.data);
        }
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

let logMgr = wx.getLogManager();

logMgr.warn(1, 2, 3, 4, 5);
