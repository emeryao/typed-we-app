/**注册一个小程序 */
declare function App(param: AppParam);

/**指定小程序的生命周期函数等 */
declare interface AppParam {
    /**
     * 生命周期函数--监听小程序初始化
     * 当小程序初始化完成时 会触发 onLaunch（全局只触发一次）
     */
    onLaunch?: Function;
    /**
     * 生命周期函数--监听小程序显示 
     * 当小程序启动 或从后台进入前台显示 会触发 onShow
     */
    onShow?: Function;
    /**
     * 生命周期函数--监听小程序隐藏
     * 当小程序从前台进入后台 会触发 onHide
     */
    onHide?: Function;
    /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
    [others: string]: any;
}

/**全局函数 可以获取到小程序实例 */
declare function getApp();

/**获取当前页面栈的实例 以数组形式按栈的顺序给出 第一个元素为首页 最后一个元素为当前页面 */
declare function getCurrentPages();

/**注册一个页面 */
declare function Page(param: PageParam);

/**指定页面的初始数据 生命周期函数 事件处理函数等 */
declare interface PageParam {
    /**页面的初始数据 */
    data?: Object;
    /**生命周期函数--监听页面加载 */
    onLoad?: Function;
    /**生命周期函数--监听页面初次渲染完成 */
    onReady?: Function;
    /**生命周期函数--监听页面显示 */
    onShow?: Function
    /**生命周期函数--监听页面隐藏 */;
    onHide?: Function;
    /**生命周期函数--监听页面卸载 */
    onUnload?: Function;
    /**页面相关事件处理函数--监听用户下拉动作 */
    onPullDownRefreash?: Function;
    /**页面上拉触底事件的处理函数 */
    onReachBottom?: Function;
    /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
    [others: string]: any;
}

declare var wx: WeApp.wx;

declare namespace WeApp {
    interface wx {
        // 网络 API 列表 
        /**
         * 发起网络请求
         * 发起的是https请求
         * 一个微信小程序同时只能有5个网络请求连接
         */
        request(param: RequestParam);
        /**
         * 上传文件 
         * 将本地资源上传到开发者服务器
         * 如 页面通过 wx.chooseImage 等接口获取到一个本地资源的临时文件路径后 可通过此接口将本地资源上传到指定服务器 客户端发起一个 HTTPS POST 请求 其中 Content-Type 为 multipart/form-data 
         */
        uploadFile(param: UploadParam);
        /**
         * 下载文件
         * 下载文件资源到本地 客户端直接发起一个 HTTP GET 请求 把下载到的资源根据 type 进行处理 并返回文件的本地临时路径 
         */
        downloadFile(param: DownloadParam);
        /**
         * 创建 WebSocket 连接
         * 一个微信小程序同时只能有一个 WebSocket 连接 如果当前已存在一个 WebSocket 连接 会自动关闭该连接 并重新创建一个 WebSocket 连接
         */
        connectSocket(param: ConnectSocketParam);
        /**监听 WebSocket 打开 */
        onSocketOpen(callback: (res?: any) => void);
        /**监听 WebSocket 错误 */
        onSocketError(callback: (res?: any) => void);
        /**
         * 发送 WebSocket 消息
         * 通过 WebSocket 连接发送数据 需要先 wx.connectSocket 并在 wx.onSocketOpen 回调之后才能发送
        */
        sendSocketMessage(message: SocketMessage);
        /**接受 WebSocket 消息 */
        onSocketMessage(callback: (res?: { data: string | ArrayBuffer }) => void);
        /**关闭 WebSocket 连接 */
        closeSocket();
        /**监听 WebSocket 关闭 */
        onSocketClose(callback: (res?: any) => void);

        // 媒体 API 列表 
        /**从相册选择图片 或者拍照 */
        chooseImage(param: ChooseImageParam);
        /**预览图片 */
        previewImage(param: PreviewImageParam);
        /**获取图片信息 */
        getImageInfo(param: ImageInfoParam);
        /**
         * 开始录音
         * 当主动调用wx.stopRecord 或者录音超过1分钟时自动结束录音 返回录音文件的临时文件路径 
         */
        startRecord(param: RecordParam);
        /**
         * 结束录音
         * 主动调用停止录音 
         */
        stopRecord();
        /**
         * 播放语音
         * 开始播放语音 同时只允许一个语音文件正在播放 如果前一个语音文件还没播放完 将中断前一个语音播放 
         */
        playVoice(param: VoiceParam);
        /**
         * 暂停播放语音
         * 暂停正在播放的语音 再次调用wx.playVoice播放同一个文件时 会从暂停处开始播放 如果想从头开始播放 需要先调用 wx.stopVoice
         */
        pauseVoice();
        /**结束播放语音 */
        stopVoice();
        /**获取音乐播放状态 */
        getBackgroundAudioPlayerState(param: GetBackgroundAudioPlayerStateParam);
        /**播放音乐 */
        playBackgroundAudio(param: PlayBackgroundAudioParam);
        /**暂停播放音乐 */
        pauseBackgroundAudio();
        /**控制音乐播放进度 */
        seekBackgroundAudio(param: SeekBackgroundAudioParam);
        /**停止播放音乐 */
        stopBackgroundAudio();
        /**监听音乐开始播放 */
        onBackgroundAudioPlay(callback: (res?: any) => void);
        /**监听音乐暂停 */
        onBackgroundAudioPause(callback: (res?: any) => void);
        /**监听音乐结束 */
        onBackgroundAudioStop(callback: (res?: any) => void);
        /**从相册选择视频 或者拍摄 */
        chooseVideo(param: ChooseVideoParam);
        /**创建并返回 audio 上下文 audioContext 对象 */
        createAudioContext(audioId: string): AudioContext;
        /**创建并返回 video 上下文 videoContext 对象 */
        createVideoContext(videoId: string): VideoContext;

        // 文件
        /**保存文件 */
        saveFile(param: SaveFileParam);
        /**获取本地已保存的文件列表 */
        getSavedFileList(param: FileListParam);
        /**获取本地文件的文件信息 */
        getSavedFileInfo(param: FileInfoParam);
        /**删除本地存储的文件 */
        removeSavedFile(param: RemoveFileParam);
        /**
         * 新开页面打开文档
         * 支持格式 doc/x,xls/x,ppt/x,pdf
         */
        openDocument(param: OpenDocumentParam);

        // 数据 API 列表 
        /**获取本地数据缓存 */
        getStorage(param: GetStorageParam);
        /**从本地缓存中同步获取指定 key 对应的内容 */
        getStorageSync(key: string): any;
        /**
         * 设置本地数据缓存
         * 将数据存储在本地缓存中指定的 key 中会覆盖掉原来该 key 对应的内容 这是一个异步接口
         */
        setStorage(param: SetStorageParam);
        /**将 data 存储在本地缓存中指定的 key 中 会覆盖掉原来该 key 对应的内容 这是一个同步接口 */
        setStorageSync(key: string, data: any);
        /**从本地缓存中异步移除指定key */
        removeStorage(param: RemoveStorageParam);
        /**从本地缓存中同步移除指定key */
        removeStorageSync(key: string);
        /**清理本地数据缓存 */
        clearStorage();
        /**同步清理本地数据缓存 */
        clearStorageSync();
        /**异步获取当前storage的相关信息 */
        getStorageInfo(pram: StorageInfoParam);
        /**同步获取当前storage的相关信息 */
        getStorageInfoSync(): StorageInfo;

        // 位置 API 列表 
        /**获取当前的地理位置 速度 */
        getLocation(param: GetLocationParam);
        /**使用微信内置地图查看位置 */
        openLocation(param: OpenLocationParam);
        /**打开地图选择位置 */
        chooseLocation(param: ChooseLocationParam);

        // 设备 API 列表 
        /**获取网络类型 */
        getNetworkType(param: NetworkTypeParam);
        /**获取系统信息 */
        getSystemInfo(param: SystemInfoParam);
        /**同步获取系统信息 */
        getSystemInfoSync(): SystemInfo;
        /**
         * 监听重力感应数据
         * 频率 5次/秒
         */
        onAccelerometerChange(callback: (res?: AccelerometerInfo) => void);
        /**
         * 监听罗盘数据
         * 频率 5次/秒
         */
        onCompassChange(callback: (res?: CompassInfo) => void);
        /**打电话 */
        makePhoneCall(param: PhoneCallParam);

        //交互反馈
        /**显示消息提示框 */
        showToast(param: ToastParam);
        /**隐藏消息提示框 */
        hideToast();
        /**显示模态弹窗 */
        showModal(param: ModalParam);
        /**显示操作菜单 */
        showActionSheet(param: ActionSheetParam);

        // 界面 API 列表
        /**设置当前页面标题 */
        setNavigationBarTitle(param: NavigationBarTitleParam);
        /**在当前页面显示导航条加载动画 */
        showNavigationBarLoading();
        /**隐藏导航条加载动画 */
        hideNavigationBarLoading();
        /**新窗口打开页面 */
        navigateTo(param: NavigateToParam);
        /**原窗口打开页面 */
        redirectTo(param: NavigateToParam);
        /**关闭当前页面 回退前一页面 */
        navigateBack(param?: { /**返回的页面数 如果 delta 大于现有页面数 则返回到首页 默认1 */delta: number });
        /**动画 */
        createAnimation(param: AnimationParam): Animation;
        /**创建绘图上下文 */
        createContext(): Context;
        /**绘图 */
        drawCanvas(param: DrawCanvasParam);
        /**把当前画布的内容导出生成图片 并返回文件路径 */
        canvasToTempFilePath(param: { canvasId: string });

        /**隐藏键盘 */
        hideKeyboard();
        /**停止下拉刷新动画 */
        stopPullDownRefresh();

        // 开放接口 
        /**登录 */
        login(param: LoginParam);
        /**获取用户信息 */
        getUserInfo(param: UserInfoParam);
        /**发起微信支付 */
        requestPayment();
        /**检查登陆态是否过期 */
        checkSession(param: CallbackParam);
    }

    interface CallbackParam {
        /**接口调用成功的回调函数 */
        success?: (res?: any) => void;
        /**接口调用失败的回调函数 */
        fail?: (res?: any) => void;
        /**接口调用结束的回调函数(调用成功/失败都会执行) */
        complete?: Function;
    }

    interface RequestParam extends CallbackParam {
        /**开发者服务器接口地址 */
        url: string;
        /**请求的参数 */
        data?: Object | string;
        /**设置请求的 header,header 中不能设置 Referer */
        header?: Object
        /**默认为 GET 有效值:OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT */
        method?: string;
        /**收到开发者服务成功返回的回调函数 res = { data: '开发者服务器返回的内容' } */
        success?: (res?: { data: HttpResponse }) => void;
    }

    interface HttpResponse {
        data: any;
        errMsg: string;
        statusCode: number;
    }

    interface UploadParam extends CallbackParam {
        /**开发者服务器 url */
        url: string;
        /**要上传文件资源的路径 */
        filePath: string;
        /**文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容 */
        name: string;
        /**HTTP 请求 Header , header 中不能设置 Referer */
        header?: Object;
        /**HTTP 请求中其他额外的 form data */
        formData?: Object;
    }

    interface DownloadParam extends CallbackParam {
        /**下载资源的 url */
        url: string;
        /**
         * 下载资源的类型
         * 用于客户端识别处理 有效值: image|audio|video 
         */
        type?: string;
        /**HTTP 请求 Header */
        header?: Object;
        /**	下载成功后以 tempFilePath 的形式传给页面 res = { tempFilePath: '文件的临时路径' } */
        success?: (res?: { tempFilePath: string }) => void
    }

    interface ConnectSocketParam extends CallbackParam {
        /**开发者服务器接口地址 必须是 HTTPS 协议 且域名必须是后台配置的合法域名 */
        url: string;
        /**请求的数据 */
        data?: Object;
        /**	HTTP Header header 中不能设置 Referer */
        header?: Object;
        /**默认是GET 有效值为: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT */
        method?: string;
    }

    interface SocketMessage extends CallbackParam {
        /**需要发送的内容 */
        data: string | ArrayBuffer;
    }

    interface ChooseImageParam extends CallbackParam {
        /**最多可以选择的图片张数 默认9 */
        count?: number;
        /**original 原图 compressed 压缩图 默认二者都有 */
        sizeType?: Array<string>;
        /**album 从相册选图 camera 使用相机 默认二者都有 */
        sourceType?: Array<string>;
    }

    interface PreviewImageParam extends CallbackParam {
        /**当前显示图片的链接 不填则默认为 urls 的第一张 */
        current?: string;
        /**需要预览的图片链接列表 */
        urls: Array<string>;
    }

    interface ImageInfoParam extends CallbackParam {
        /**图片的路径 可以是相对路径 临时文件路径 存储文件路径 */
        src: string;
        success?: (res?: { width: number, height: number }) => void;
    }

    interface RecordParam extends CallbackParam {
        success?: (res?: { tempFilePath: string }) => void;
    }

    interface VoiceParam extends CallbackParam {
        /**需要播放的语音文件的文件路径 */
        filePath: string;
    }

    interface GetBackgroundAudioPlayerStateParam extends CallbackParam {
        success?: (res?: BackgroundAudioPlayerState) => void;
    }

    interface BackgroundAudioPlayerState {
        /**选定音频的长度 单位:s 只有在当前有音乐播放时返回 */
        duration: number;
        /**选定音频的播放位置 单位:s 只有在当前有音乐播放时返回 */
        currentPosition: number;
        /**	播放状态 2:没有音乐在播放 1:播放中 0:暂停中 */
        status: number;
        /**音频的下载进度 整数 80 代表 80% 只有在当前有音乐播放时返回 */
        downloadPercent: number;
        /**歌曲数据链接 只有在当前有音乐播放时返回 */
        dataUrl: string;
    }

    interface PlayBackgroundAudioParam extends CallbackParam {
        /**音乐链接 */
        dataUrl: string;
        /**音乐标题 */
        title?: string;
        /**封面URL */
        coverImgUrl?: string;
    }

    interface SeekBackgroundAudioParam extends CallbackParam {
        /**音乐位置 单位:秒 */
        position: number;
    }

    interface SaveFileParam extends CallbackParam {
        /**需要保存的文件的临时路径 */
        tempFilePath: string;
        success?: (res?: { savedFilePath?: string }) => void;
    }

    interface FileListParam extends CallbackParam {
        success?: (res?: { errMsg: string, fileList: Array<FileInfo> }) => void;
    }

    interface FileInfo {
        /**文件的本地路径 */
        filePath: string;
        /**文件的保存时的时间戳 从1970/01/01 08:00:00到当前时间的秒数 */
        createTime: number;
        /**文件大小 单位B */
        size: number;
    }

    interface FileInfoParam extends CallbackParam {
        /**文件路径 */
        filePath: string;
        success?: (res?: { errMsg: string, size: number, createTime: number }) => void;
    }

    interface RemoveFileParam extends CallbackParam {
        /**需要删除的文件路径 */
        filePath: string;
    }

    interface OpenDocumentParam extends CallbackParam {
        /**文件路径 可通过 downFile 获得 */
        filePath: string;
    }

    interface ChooseVideoParam extends CallbackParam {
        /**album 从相册选视频 camera 使用相机拍摄 默认为:['album', 'camera'] */
        sourceType?: Array<string>;
        /**拍摄视频最长拍摄时间 单位秒 最长支持60秒 */
        maxDuration?: number;
        /**前置或者后置摄像头 默认为前后都有 即:['front', 'back'] */
        camera?: Array<string>;
        /**接口调用成功 返回视频文件的临时文件路径 */
        success?: (res?: VideoInfo) => void;
    }

    interface AudioContext {
        /**播放 */
        play();
        /**暂停 */
        pause();
        /**跳转到指定位置 单位 s */
        seek(position: number);
    }

    interface VideoContext {
        /**播放 */
        play();
        /**暂停 */
        pause();
        /**跳转到指定位置 单位 s */
        seek(position: number);
        /**发送弹幕 danmu 包含两个属性 text,color */
        sendDanmu(danmu: { text: string, color: string });
    }

    interface VideoInfo {
        /**选定视频的临时文件路径 */
        tempFilePath: string;
        /**选定视频的时间长度 */
        duration: number;
        /**选定视频的数据量大小 */
        size: number;
        /**返回选定视频的长 */
        height: number;
        /**返回选定视频的宽 */
        width: number;
    }

    interface SetStorageParam extends CallbackParam {
        /**本地缓存中的指定的 key */
        key: string;
        /**需要存储的内容 */
        data: any;
    }

    interface GetStorageParam extends CallbackParam {
        /**本地缓存中的指定的 key */
        key: string;
        success: (res?: { data: any }) => void;
    }

    interface RemoveStorageParam extends CallbackParam {
        key: string;
        success: (res?: { data: any }) => void;
    }

    interface StorageInfoParam extends CallbackParam {
        success: (res?: { data: StorageInfo }) => void;
    }

    interface StorageInfo {
        /**当前storage中所有的key */
        keys: Array<string>;
        /**当前占用的空间大小 单位kb */
        currentSize: number;
        /**限制的空间大小 单位kb */
        limitSize: number;
    }

    interface GetLocationParam extends CallbackParam {
        /**默认为 wgs84 返回 gps 坐标 gcj02 返回可用于wx.openLocation的坐标 */
        type?: string;
        /**接口调用成功的回调函数 */
        success: (res?: LocationInfo) => void;
    }

    interface LocationInfo {
        /**纬度 浮点数 范围为 -90~90 负数表示南纬 */
        latitude: number;
        /**经度 浮点数 范围为 -180~180 负数表示西经 */
        longitude: number;
        /**速度 浮点数 单位 m/s */
        speed: number;
        /**位置的精确度 */
        accuracy: number;
    }

    interface OpenLocationParam extends CallbackParam {
        /**纬度 范围为 -90~90 负数表示南纬 */
        latitude: number;
        /**经度 范围为 -180~180 负数表示西经 */
        longitude: number;
        /**缩放比例 范围1~28 默认为28 */
        scale?: number;
        /**位置名 */
        name?: string;
        /**地址的详细说明 */
        address?: string;
    }

    interface ChooseLocationParam extends CallbackParam {
        success: (res?: ChoosedLoaction) => void;
    }

    interface ChoosedLoaction {
        /**位置名称 */
        name: string;
        /**详细地址 */
        address: string;
        /**纬度 浮点数 范围为-90~90 负数表示南纬 */
        latitude: number;
        /**经度 浮点数 范围为-180~180 负数表示西经 */
        longitude: number
    }

    interface NetworkTypeParam extends CallbackParam {
        success: (res?: { /**返回网络类型2g|3g|4g|wifi */networkType: string }) => void;
    }

    interface SystemInfoParam extends CallbackParam {
        success: (res?: SystemInfo) => void;
    }

    interface SystemInfo {
        /**手机型号 */
        model: string;
        /**设备像素比 */
        pixelRatio: string;
        /**窗口宽度 */
        windowWidth: string;
        /**窗口高度 */
        windowHeight: string;
        /**微信设置的语言 */
        language: string;
        /**微信版本号 */
        version: string;
    }

    interface AccelerometerInfo {
        /**X 轴 */
        x: number;
        /**Y 轴 */
        y: number;
        /**Z 轴 */
        z: number;
    }

    interface CompassInfo {
        /**面对的方向度数 */
        direction: number;
    }

    interface PhoneCallParam extends CallbackParam {
        /**需要拨打的电话号码 */
        phoneNumber: string;
        success: () => void;
    }

    interface ToastParam extends CallbackParam {
        /**提示的内容 */
        title: string;
        /**图标 只支持 success|loading */
        icon?: string;
        /**提示的延迟时间 单位毫秒 默认 1500 最大为10000 */
        duration?: string;
    }

    interface ModalParam extends CallbackParam {
        /**提示的标题 */
        title: string;
        /**提示的内容 */
        content: string;
        /**是否显示取消按钮 默认为 false */
        showCancel?: boolean;
        /**取消按钮的文字 默认为 取消 */
        cancelText?: string;
        /**取消按钮的文字颜色 默认为 #000000 */
        cancelColor?: string;
        /**确定按钮的文字 默认为 确定 */
        confirmText?: string;
        /**确定按钮的文字颜色 默认为 #3CC51F */
        confirmColor?: string;
        /**
         * 接口调用成功的回调函数
         * 返回res.confirm==1时 表示用户点击确定按钮
         */
        success?: (res?: { confirm: number }) => void;
    }

    interface ActionSheetParam extends CallbackParam {
        /**按钮的文字数组 数组长度最大为10个 */
        itemList: Array<string>;
        /**按钮的文字颜色 默认为 #000000 */
        itemColor?: string;
        success?: (res?: ActionSheetResponse) => void;
    }

    interface ActionSheetResponse {
        /**用户是否取消选择 */
        cancel: boolean;
        /**用户点击的按钮 从上到下的顺序 从0开始 */
        tapIndex: number;
    }

    interface NavigationBarTitleParam extends CallbackParam {
        /**页面标题 */
        title?: string;
    }

    interface NavigateToParam extends CallbackParam {
        /**需要跳转的应用内页面的路径 */
        url: string;
    }

    interface AnimationParam {
        /**动画持续时间 单位ms 默认值 400 */
        duration?: number;
        /**定义动画的效果 默认值 linear 有效值 linear,ease,ease-in,ease-in-out,ease-out,step-start,step-end */
        timingFunction?: string;
        /**动画延迟时间 单位 ms 默认值 0 */
        delay?: string;
        /**设置transform- origin 默认为"50% 50% 0" */
        transformOrigin?: string;
    }

    /**
     * 动画实例可以调用以下方法来描述动画
     * 调用结束后会返回自身
     * 支持链式调用的写法 
     */
    interface Animation {
        /**
         * 通过动画实例的export方法导出动画数据传递给组件的animation属性
         * export 方法每次调用后会清掉之前的动画操作
         */
        export();
        /**
         * 调用动画操作方法后要调用 step() 来表示一组动画完成
         * 可以在一组动画中调用任意多个动画方法
         * 一组动画中的所有动画会同时开始
         * 一组动画完成后才会进行下一组动画
         * step 可以传入一个跟 wx.createAnimation() 一样的配置参数用于指定当前组动画的配置
         */
        step();

        /**
         * 透明度
         * @param value 参数范围 0~1
         */
        opacity(value: number): Animation;
        /**颜色值 */
        backgroundColor(color: string): Animation;
        /**
         * 长度值
         * @param length 如果传入 Number 则默认使用 px 可传入其他自定义单位的长度值
         */
        width(length: number | string): Animation;
        /**
         * 长度值
         * @param length 如果传入 Number 则默认使用 px 可传入其他自定义单位的长度值
         */
        height(length: number | string): Animation;
        /**
         * 长度值
         * @param length 如果传入 Number 则默认使用 px 可传入其他自定义单位的长度值
         */
        top(length: number | string): Animation;
        /**
         * 长度值
         * @param length 如果传入 Number 则默认使用 px 可传入其他自定义单位的长度值
         */
        left(length: number | string): Animation;
        /**
         * 长度值
         * @param length 如果传入 Number 则默认使用 px 可传入其他自定义单位的长度值
         */
        bottom(length: number | string): Animation;
        /**
         * 长度值
         * @param length 如果传入 Number 则默认使用 px 可传入其他自定义单位的长度值
         */
        right(length: number | string): Animation;

        /**deg的范围-180~180 从原点顺时针旋转一个deg角度 */
        rotate(deg: number): Animation;
        /**deg的范围-180~180 在X轴旋转一个deg角度 */
        rotateX(deg: number): Animation;
        /**deg的范围-180~180 在Y轴旋转一个deg角度 */
        rotateY(deg: number): Animation;
        /**deg的范围-180~180 在Z轴旋转一个deg角度 */
        rotateZ(deg: number): Animation;
        rotate3d(x: number, y: number, z: number, deg: number): Animation;

        /**一个参数时 表示在X轴 Y轴同时缩放sx倍数 两个参数时表示在X轴缩放sx倍数 在Y轴缩放sy倍数 */
        scale(sx: number, sy?: number): Animation;
        /**在X轴缩放sx倍数 */
        scaleX(sx: number): Animation;
        /**在Y轴缩放sy倍数 */
        scaleY(sy: number): Animation;
        /**在Z轴缩放sz倍数 */
        scaleZ(sz: number): Animation;
        /**在X轴缩放sx倍数 在Y轴缩放sy倍数 在Z轴缩放sz倍数 */
        scale3d(sx: number, sy: number, sz: number): Animation;

        /**一个参数时 表示在X轴偏移tx 单位px 两个参数时 表示在X轴偏移tx 在Y轴偏移ty 单位px */
        translate(tx: number, ty?: number): Animation;
        /**在X轴偏移tx 单位px */
        translateX(tx: number): Animation;
        /**在Y轴偏移tx 单位px */
        translateY(ty: number): Animation;
        /**在Z轴偏移tx 单位px */
        translateZ(tz: number): Animation;
        /**在X轴偏移tx 在Y轴偏移ty 在Z轴偏移tz 单位px */
        translate3d(tx: number, ty: number, tz: number): Animation;

        /**参数范围-180~180 一个参数时 Y轴坐标不变 X轴坐标延顺时针倾斜ax度 两个参数时 分别在X轴倾斜ax度 在Y轴倾斜ay度 */
        skew(ax: number, ay?: number): Animation;
        /**参数范围-180~180 Y轴坐标不变 X轴坐标延顺时针倾斜ax度 */
        skewX(ax: number): Animation;
        /**参数范围-180~180 X轴坐标不变 Y轴坐标延顺时针倾斜ay度 */
        skewY(ay: number): Animation;

        matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): Animation;
        matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number);
    }

    /**
     * context只是一个记录方法调用的容器
     * 用于生成记录绘制行为的actions数组
     * context跟<canvas/>不存在对应关系
     * 一个context生成画布的绘制动作数组可以应用于多个<canvas/>
     */
    interface Context {
        /**获取当前context上存储的绘图动作 */
        getActions(): Array<any>;
        /**清空当前的存储绘图动作 */
        clearActions();

        /**
         * 对横纵坐标进行缩放
         * 在调用scale方法后
         * 之后创建的路径其横纵坐标会被缩放
         * 多次调用scale 倍数会相乘
         * @param scaleWidth 横坐标缩放的倍数 
         * 1=100% 0.5=50% 2=200% 依次类推
         * @param scaleHeight 纵坐标轴缩放的倍数
         * 1=100% 0.5=50% 2=200% 依次类推
         */
        scale(scaleWidth: number, scaleHeight: number);
        /**
         * 对坐标轴进行顺时针旋转
         * 以原点为中心
         * 原点可以用 translate方法修改
         * 顺时针旋转当前坐标轴
         * 多次调用rotate
         * 旋转的角度会叠加
         * @param rotate 旋转角度 以弧度计
         * degrees*Math.PI/180 degrees范围为0~360
         */
        rotate(rotate: number);
        /**
         * 对坐标原点进行缩放
         * 对当前坐标系的原点(0,0)进行变换
         * 默认的坐标系原点为页面左上角
         * @param x 水平坐标平移量
         * @param y 竖直坐标平移量
         */
        translate(x: number, y: number);
        /**保存当前坐标轴的缩放 旋转 平移信息 */
        save();
        /**恢复之前保存过的坐标轴的缩放 旋转 平移信息 */
        restore();
        /**
         * 在给定的矩形区域内 清除画布上的像素
         * @param x 矩形区域左上角的x坐标
         * @param y 矩形区域左上角的y坐标
         * @param width 矩形区域的宽度
         * @param height 矩形区域的高度
         */
        clearRect(x: number, y: number, width: number, height: number);
        /**
         * 在画布上绘制被填充的文本
         * @param text 在画布上输出的文本
         * @param x 绘制文本的左上角x坐标位置
         * @param y 绘制文本的左上角y坐标位置
         */
        fillText(text: string, x?: number, y?: number);
        /**
         * 在画布上绘制图像 图像保持原始尺寸
         * @param imageResource	通过chooseImage得到一个文件路径或者一个项目目录内的图片 所要绘制的图片资源
         * @param x 图像左上角的x坐标
         * @param y 图像左上角的y坐标
         * @param width 图像宽度
         * @param height 图像高度
         */
        drawImage(imageResource: string, x?: number, y?: number, width?: number, height?: number);
        /**对当前路径进行填充 */
        fill();
        /**对当前路径进行描边 */
        stroke();
        /**
         * 开始一个路径
         * 开始创建一个路径 需要调用fill或者stroke才会使用路径进行填充或描边 同一个路径内的多次setFillStyle setStrokeStyle setLineWidth等设置 以最后一次设置为准
         */
        beginPath();
        /**关闭一个路径 */
        closePath();
        /**
         * 把路径移动到画布中的指定点 但不创建线条
         */
        moveTo(x: number, y: number);
        /**
         * 添加一个新点 然后在画布中创建从该点到最后指定点的线条
         * @param x 目标位置的x坐标
         * @param y 目标位置的y坐标
         */
        lineTo(x: number, y: number);
        /**
         * 添加一个矩形路径到当前路径 
         * @param x 矩形路径左上角的x坐标
         * @param y 矩形路径左上角的y坐标
         * @param width 矩形路径的宽度
         * @param height 矩形路径的高度
         */
        rect(x: number, y: number, width: number, height: number);
        /**
         * 添加一个弧形路径到当前路径 顺时针绘制
         * @param x 矩形路径左上角的x坐标
         * @param y 矩形路径左上角的y坐标
         * @param radius 矩形路径的宽度
         * @param startAngle 起始弧度 0到2π
         * @param sweepAngle 从起始弧度开始 扫过的弧度 0到2π
         */
        arc(x: number, y: number, radius: number, startAngle: number, sweepAngle: number);
        /**
         * 创建二次贝塞尔曲线路径
         * @param cpx 贝塞尔控制点的x坐标
         * @param cpy 贝塞尔控制点的y坐标
         * @param x 结束点的x坐标
         * @param y 结束点的y坐标
         */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number);
        /**
         * 创建三次方贝塞尔曲线路径
         * @param cp1x 第一个贝塞尔控制点的x坐标
         * @param cp1y 第一个贝塞尔控制点的y坐标
         * @param cp2x 第二个贝塞尔控制点的x坐标
         * @param cp2y 第二个贝塞尔控制点的y坐标
         * @param x 结束点的x坐标
         * @param y 结束点的y坐标
         */
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number);

        /**
         * 设置纯色填充
         * @param color 设置为填充样式的颜色 'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
         */
        setFillStyle(color: string);
        /**
          * 设置纯色描边
          * @param color 设置为填充样式的颜色 'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
          */
        setStrokeStyle(color: string);
        /**
         * 设置阴影
         * @param offsetX 阴影相对于形状在水平方向的偏移
         * @param offsetY 阴影相对于形状在竖直方向的偏移
         * @param blur 阴影的模糊级别 数值越大越模糊 0~100
         * @param color 阴影的颜色 'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
         */
        setShadow(offsetX: number, offsetY: number, blur: number, color: string);
        /**设置字体的字号 */
        setFontSize(fontSize: number);
        /**设置线条的宽度 */
        setLineWidth(lineWidth: number);
        /**设置线条的结束端点样式 */
        setLineCap(lineCap: 'butt' | 'round' | 'square');
        /**
         * 设置两条线相交时
         * 所创建的拐角类型
         */
        setLineJoin(lineJoin: 'bevel' | 'round' | 'miter');
        /**
         * 设置最大斜接长度
         * 斜接长度指的是在两条线交汇处内角和外角之间的距离
         * 当 setLineJoin为 miter 时才有效
         * 超过最大倾斜长度的
         * 连接处将以 lineJoin 为 bevel 来显示
         */
        setMiterLimit(miterLimit: number);
    }

    interface DrawCanvasParam {
        /**画布标识 传入 <canvas/> 的 cavas-id */
        canvasId: string;
        /**
         * 绘图动作数组
         * 由wx.createContext创建的context
         * 调用getActions方法导出绘图动作数组
         */
        actions: Array<any>;
    }

    interface LoginParam extends CallbackParam {
        success?: (res?: LoginResult) => void;
    }

    interface LoginResult {
        /**调用结果 */
        errMsg: string;
        /**
         * 用户允许登录后
         * 回调内容会带上code(有效期五分钟) 
         * 开发者需要将code发送到开发者服务器后台
         * 使用code换取session_key api
         * 将code换成openid和session_key
         */
        code: string
    }

    interface UserInfoParam extends CallbackParam {
        success?: (res?: UserInfo) => void;
    }

    interface UserInfo {
        /**	用户信息对象 不包含 openid 等敏感信息 */
        userInfo: Object;
        /**不包括敏感信息的原始数据字符串 用于计算签名 */
        rawData: string;
        /**使用sha1(rawData + sessionkey) 得到字符串 用于校验用户信息 */
        signature: string;
        /**包括敏感数据在内的完整用户信息的加密数据 */
        encryptData: string;
    }

    interface RequestPaymentParam extends CallbackParam {
        /**时间戳从1970年1月1日00: 00:00至今的秒数 即当前的时间 */
        timeStamp: number;
        /**随机字符串 长度为32个字符以下 */
        nonceStr: string;
        /**统一下单接口返回的prepay_id参数值 提交格式如 prepay_id=* */
        package: string;
        /**签名算法 暂支持 MD5 */
        signType: string;
        /**签名  具体签名方案参见微信公众号支付帮助文档 */
        paySign: string;
    }
}