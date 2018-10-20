// #region global declarations
/**注册一个小程序 */
declare function App(param: WeApp.AppParam): void;

/**注册一个页面 */
declare function Page(param: WeApp.PageParam): void;

/**注册一个组件 */
declare function Component(param: WeApp.ComponentParam): void

/**全局函数 可以获取到小程序实例 */
declare function getApp(): WeApp.AppParam;

/**获取当前页面栈的实例 以数组形式按栈的顺序给出 第一个元素为首页 最后一个元素为当前页面 */
declare function getCurrentPages(): Array<WeApp.Page>;

declare var wx: WeApp.wx;

// #endregion

declare namespace WeApp {

    // #region WeApp interfaces
    /**指定小程序的生命周期函数等 */
    interface AppParam {
        /**
         * 生命周期函数--监听小程序初始化
         * 当小程序初始化完成时 会触发 onLaunch（全局只触发一次）
         */
        onLaunch?: (info: LaunchData) => void;
        /**
         * 生命周期函数--监听小程序显示
         * 当小程序启动 或从后台进入前台显示 会触发 onShow
         */
        onShow?: (info: LaunchData) => void;
        /**
         * 生命周期函数--监听小程序隐藏
         * 当小程序从前台进入后台 会触发 onHide
         */
        onHide?: Function;
        /**
         * 错误监听函数
         * 当小程序发生脚本错误 或者 api 调用失败时 会触发 onError 并带上错误信息
         */
        onError?: Function;
        /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
        [others: string]: any;
    }

    /**指定页面的初始数据 生命周期函数 事件处理函数等 */
    interface PageParam {
        /**页面的初始数据 */
        data?: Object;
        /**生命周期函数--监听页面加载 */
        onLoad?: Function;
        /**生命周期函数--监听页面初次渲染完成 */
        onReady?: Function;
        /**生命周期函数--监听页面显示 */
        onShow?: Function
        /**生命周期函数--监听页面隐藏 */
        onHide?: Function;
        /**生命周期函数--监听页面卸载 */
        onUnload?: Function;
        /**页面相关事件处理函数--监听用户下拉动作 */
        onPullDownRefresh?: Function;
        /**页面上拉触底事件的处理函数 */
        onReachBottom?: Function;
        /**
         * 设置该页面的分享信息
         * * 只有定义了此事件处理函数 右上角菜单才会显示“分享”按钮
         * * 用户点击分享按钮的时候会调用
         * * 此事件需要 return 一个 Object 用于自定以分享内容
         */
        onShareAppMessage?: (options?: { from: string, target: Target }) => PageShareData;
        /**页面滚动触发事件的处理函数 */
        onPageScroll?: Function;

        /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
        [others: string]: any;
    }

    /**指定组件的生命周期函数 时间处理函数及方法等  */
    interface ComponentParam {
        /**组件的对外属性 是属性名到属性设置的映射表
         * 属性设置中可包含三个字段
         * type 表示属性类型
         * value 表示属性初始值
         * observer 表示属性值被更改时的响应函数
         */
        properties?: Object
        /**组件的内部数据 和 properties 一同用于组件的模版渲染 */
        data?: Object

        /**组件的方法 包括事件响应函数和任意的自定义方法 */
        methods?: {
            [others: string]: any
        }
        /**类似于mixins和traits的组件间代码复用机制 */
        behaviors?: Array<string>
        /**组件生命周期函数 在组件实例进入页面节点树时执行 注意此时不能调用 setData */
        created?: Function
        /**组件生命周期函数 在组件实例进入页面节点树时执行 */
        attached?: Function
        /**组件生命周期函数 在组件布局完成后执行 此时可以获取节点信息 */
        ready?: Function
        /**组件生命周期函数 在组件实例被移动到节点树另一个位置时执行 */
        moved?: Function
        /**组件生命周期函数 在组件实例被从页面节点树移除时执行 */
        detached?: Function
        /**组件间关系定义 */
        relations?: Object
        /**组件接受的外部样式类 */
        externalClasses?: Array<string>
        /**一些组件选项 请参见文档其他部分的说明 */
        options?: Object

        /**开发者可以添加任意的函数或数据到参数中 用 this 可以访问 */
        [others: string]: any
    }

    /**页面 */
    interface Page {
        /**用于将数据从逻辑层发送到视图层 */
        setData: (data: any, callback?: Function) => void;
        /**字段可以获取到当前页面的路径*/
        route: string;
        /**页面逻辑层数据 */
        data: any;
        [others: string]: any;
    }

    interface wx {
        // 网络 API 列表
        /**
         * 发起网络请求
         * 发起的是https请求
         * 一个微信小程序同时只能有5个网络请求连接
         */
        request(param: RequestParam): RequestTask;
        /**
         * 上传文件
         * 将本地资源上传到开发者服务器
         * 如 页面通过 wx.chooseImage 等接口获取到一个本地资源的临时文件路径后 可通过此接口将本地资源上传到指定服务器 客户端发起一个 HTTPS POST 请求 其中 Content-Type 为 multipart/form-data
         */
        uploadFile(param: UploadParam): UploadTask;
        /**
         * 下载文件
         * 下载文件资源到本地 客户端直接发起一个 HTTP GET 请求 把下载到的资源根据 type 进行处理 并返回文件的本地临时路径
         */
        downloadFile(param: DownloadParam): DownloadTask;
        /**
         * 创建 WebSocket 连接
         * 基础库 1.7.0 之前 一个微信小程序同时只能有一个 WebSocket 连接 如果当前已存在一个 WebSocket 连接 会自动关闭该连接 并重新创建一个 WebSocket 连接 基础库版本 1.7.0 及以后 支持存在多个 WebSokcet 连接 每次成功调用 wx.connectSocket 会返回一个新的 SocketTask
         */
        connectSocket(param: ConnectSocketParam): void;
        /**监听 WebSocket 打开 */
        onSocketOpen(callback: (res?: any) => void): void;
        /**监听 WebSocket 错误 */
        onSocketError(callback: (res?: any) => void): void;
        /**
         * 发送 WebSocket 消息
         * 通过 WebSocket 连接发送数据 需要先 wx.connectSocket 并在 wx.onSocketOpen 回调之后才能发送
        */
        sendSocketMessage(message: SocketMessage): void;
        /**接受 WebSocket 消息 */
        onSocketMessage(callback: (res?: { data: string | ArrayBuffer }) => void): void;
        /**关闭 WebSocket 连接 */
        closeSocket(param: CloseSocketParam): void;
        /**监听 WebSocket 关闭 */
        onSocketClose(callback: (res?: any) => void): void;

        // 媒体 API 列表
        /**从相册选择图片 或者拍照 */
        chooseImage(param: ChooseImageParam): void;
        /**预览图片 */
        previewImage(param: PreviewImageParam): void;
        /**获取图片信息 */
        getImageInfo(param: ImageInfoParam): void;
        /**
         * 开始录音
         * 当主动调用wx.stopRecord 或者录音超过1分钟时自动结束录音 返回录音文件的临时文件路径
         */
        startRecord(param: RecordParam): void;
        /**
         * 结束录音
         * 主动调用停止录音
         */
        stopRecord(): void;
        /**获取全局唯一的录音管理器 */
        getRecorderManager(): RecorderManager;
        /**
         * 播放语音
         * 开始播放语音 同时只允许一个语音文件正在播放 如果前一个语音文件还没播放完 将中断前一个语音播放
         */
        playVoice(param: VoiceParam): void;
        /**
         * 暂停播放语音
         * 暂停正在播放的语音 再次调用wx.playVoice播放同一个文件时 会从暂停处开始播放 如果想从头开始播放 需要先调用 wx.stopVoice
         */
        pauseVoice(): void;
        /**结束播放语音 */
        stopVoice(): void;
        /**获取音乐播放状态 */
        getBackgroundAudioPlayerState(param: GetBackgroundAudioPlayerStateParam): void;
        /**播放音乐 */
        playBackgroundAudio(param: PlayBackgroundAudioParam): void;
        /**暂停播放音乐 */
        pauseBackgroundAudio(): void;
        /**控制音乐播放进度 */
        seekBackgroundAudio(param: SeekBackgroundAudioParam): void;
        /**停止播放音乐 */
        stopBackgroundAudio(): void;
        /**监听音乐开始播放 */
        onBackgroundAudioPlay(callback: (res?: any) => void): void;
        /**监听音乐暂停 */
        onBackgroundAudioPause(callback: (res?: any) => void): void;
        /**监听音乐结束 */
        onBackgroundAudioStop(callback: (res?: any) => void): void;
        /**从相册选择视频 或者拍摄 */
        chooseVideo(param: ChooseVideoParam): void;
        /**创建并返回 audio 上下文 audioContext 对象 */
        createAudioContext(audioId: string): AudioContext;
        /**
         * @since 1.6.0
         * @description 创建并返回内部 audio 上下文 innerAudioContext 对象 本接口是 wx.createAudioContext 升级版
         */
        createInnerAudioContext(): InnerAudioContext;
        /**创建并返回 video 上下文 videoContext 对象 */
        createVideoContext(videoId: string): VideoContext;
        /**创建并返回 camera 上下文 cameraContext 对象 cameraContext 与页面的 camera 组件绑定 一个页面只能有一个camera 通过它可以操作对应的 <camera/> 组件 */
        createCameraContext(): CameraContext;

        // 文件
        /**保存文件 */
        saveFile(param: SaveFileParam): void;
        /**获取本地已保存的文件列表 */
        getSavedFileList(param: FileListParam): void;
        /**获取本地文件的文件信息 */
        getSavedFileInfo(param: FileInfoParam): void;
        /**删除本地存储的文件 */
        removeSavedFile(param: RemoveFileParam): void;
        /**
         * 新开页面打开文档
         * 支持格式 doc/x,xls/x,ppt/x,pdf
         */
        openDocument(param: OpenDocumentParam): void;

        // 数据 API 列表
        /**获取本地数据缓存 */
        getStorage(param: GetStorageParam): void;
        /**从本地缓存中同步获取指定 key 对应的内容 */
        getStorageSync(key: string): any;
        /**
         * 设置本地数据缓存
         * 将数据存储在本地缓存中指定的 key 中会覆盖掉原来该 key 对应的内容 这是一个异步接口
         */
        setStorage(param: SetStorageParam): void;
        /**将 data 存储在本地缓存中指定的 key 中 会覆盖掉原来该 key 对应的内容 这是一个同步接口 */
        setStorageSync(key: string, data: any): void;
        /**从本地缓存中异步移除指定key */
        removeStorage(param: RemoveStorageParam): void;
        /**从本地缓存中同步移除指定key */
        removeStorageSync(key: string): void;
        /**清理本地数据缓存 */
        clearStorage(): void;
        /**同步清理本地数据缓存 */
        clearStorageSync(): void;
        /**异步获取当前storage的相关信息 */
        getStorageInfo(pram: StorageInfoParam): void;
        /**同步获取当前storage的相关信息 */
        getStorageInfoSync(): StorageInfo;

        // 位置 API 列表
        /**获取当前的地理位置 速度 */
        getLocation(param: GetLocationParam): void;
        /**使用微信内置地图查看位置 */
        openLocation(param: OpenLocationParam): void;
        /**打开地图选择位置 */
        chooseLocation(param: ChooseLocationParam): void;
        /**创建并返回 map 上下文 mapContext 对象 */
        createMapContext(mapId: string): void;

        // 设备 API 列表
        /**获取网络类型 */
        getNetworkType(param: NetworkTypeParam): void;
        /**获取系统信息 */
        getSystemInfo(param: SystemInfoParam): void;
        /**同步获取系统信息 */
        getSystemInfoSync(): SystemInfo;
        /**
         * 监听重力感应数据
         * 频率 5次/秒
         */
        onAccelerometerChange(callback: (res?: AccelerometerInfo) => void): void;
        /**
         * 监听罗盘数据
         * 频率 5次/秒
         */
        onCompassChange(callback: (res?: CompassInfo) => void): void;
        /**打电话 */
        makePhoneCall(param: PhoneCallParam): void;

        //交互反馈
        /**显示消息提示框 */
        showToast(param: ToastParam): void;
        /**隐藏消息提示框 */
        hideToast(): void;
        /**显示模态弹窗 */
        showModal(param: ModalParam): void;
        /**显示操作菜单 */
        showActionSheet(param: ActionSheetParam): void;

        // 界面 API 列表
        /**设置置顶信息 */
        setTopBarText(param: TopBarTextParam): void;
        /**设置当前页面标题 */
        setNavigationBarTitle(param: NavigationBarTitleParam): void;
        /**在当前页面显示导航条加载动画 */
        showNavigationBarLoading(): void;
        /**隐藏导航条加载动画 */
        hideNavigationBarLoading(): void;
        /**新窗口打开页面 */
        navigateTo(param: NavigateToParam): void;
        /**原窗口打开页面 */
        redirectTo(param: NavigateToParam): void;
        /**关闭当前页面 回退前一页面 */
        navigateBack(param?: { /**返回的页面数 如果 delta 大于现有页面数 则返回到首页 默认1 */delta: number }): void;
        /**动画 */
        createAnimation(param: AnimationParam): Animation;
        /**把当前画布的内容导出生成图片 并返回文件路径 */
        canvasToTempFilePath(param: CanvasToTempFilePathParam): void;
        /**
       * @deprecated 不推荐使用
       * @description 创建绘图上下文
       */
        createContext(): CanvasContext;
        /**
         * @deprecated 不推荐使用
         * @description 绘图
         */
        drawCanvas(param: DrawCanvasParam): void;
        /**创建 canvas 绘图上下文(指定 canvasId) */
        createCanvasContext(canvasId: string): CanvasContext;

        /**隐藏键盘 */
        hideKeyboard(): void;
        /**停止下拉刷新动画 */
        stopPullDownRefresh(): void;
        /**
         * @since 1.5.0
         * @description 开始下拉刷新 调用后触发下拉刷新动画 效果与用户手动下拉刷新一致
         */
        startPullDownRefresh(param: CallbackWithErrMsgParam): never;

        // 开放接口
        /**登录 */
        login(param: LoginParam): void;
        /**获取用户信息 */
        getUserInfo(param: UserInfoParam): void;
        /**发起微信支付 */
        requestPayment(param: RequestPaymentParam): void;
        /**检查登陆态是否过期 */
        checkSession(param: CallbackParam): void;
        /**跳转到 tabBar 页面 并关闭其他所有非 tabBar 页面 */
        switchTab(param: SwitchTabParam): void;
        /**调起客户端扫码界面 扫码成功后返回对应的结果 */
        scanCode(param: ScanCodeParam): void;

        // 蓝牙相关
        /**初始化蓝牙适配器 */
        openBluetoothAdapter(param: CallbackParam): void;
        /**关闭蓝牙模块 调用该方法将断开所有已建立的链接并释放系统资源 */
        closeBluetoothAdapter(param: CallbackParam): void;
        /**获取本机蓝牙适配器状态 */
        getBluetoothAdapterState(param: BluetoothAdapterStateParam): void;
        /**监听蓝牙适配器状态变化事件 */
        onBluetoothAdapterStateChange(param: BluetoothAdapterStateChangeParam): void;
        /**开始搜寻附近的蓝牙外围设备 */
        startBluetoothDevicesDiscovery(param: BluetoothDevicesDiscoveryParam): void;
        /**停止搜寻附近的蓝牙外围设备 */
        stopBluetoothDevicesDiscovery(param: CallbackWithErrMsgParam): void;
        /**获取所有已发现的蓝牙设备 包括已经和本机处于连接状态的设备 */
        getBluetoothDevices(param: BluetoothDevicesParam): void;
        /**监听寻找到新设备的事件 */
        onBluetoothDeviceFound(callback: (devices: Array<BluetoothDevice>) => void): void;
        /**根据 uuid 获取处于已连接状态的设备 */
        getConnectedBluetoothDevices(param: ConnectedBluetoothDevicesParam): void;
        /**连接低功耗蓝牙设备 */
        createBLEConnection(param: BLEConnectionParam): void;
        /**断开与低功耗蓝牙设备的连接 */
        closeBLEConnection(param: BLEConnectionParam): void;
        /**监听低功耗蓝牙连接的错误事件 包括设备丢失 连接异常断开等等 */
        onBLEConnectionStateChange(callback: (res: { deviceId: string; connected: boolean }) => void): void;
        /**获取蓝牙设备所有 service */
        getBLEDeviceServices(param: BLEDeviceServicesParam): void;
        /**获取蓝牙设备所有 characteristic */
        getBLEDeviceCharacteristics(param: BLEDeviceCharacteristicsParam): void;
        /**读取低功耗蓝牙设备的特征值的二进制数据值 */
        readBLECharacteristicValue(parm: BLECharacteristicValueParam): void;
        /**向低功耗蓝牙设备特征值中写入二进制数据 */
        writeBLECharacteristicValue(param: WriteBLECharacteristicValueParam): void;
        /**启用低功耗蓝牙设备特征值变化时的 notify 功能 */
        notifyBLECharacteristicValueChange(param: BLECharacteristicValueChangedParam): void;
        /**监听低功耗蓝牙设备的特征值变化 必须先启用notify */
        onBLECharacteristicValueChange(callback: (res: { deviceId: string; connected: boolean; characteristicId: string; value: ArrayBuffer }) => void): void;

        /**调起用户编辑收货地址原生界面 并在编辑完成后返回用户选择的地址 */
        chooseAddress(param: AddressParam): void;

        /**调起客户端小程序设置界面 返回用户设置的操作结果 */
        openSetting(param: SettingParam): void;
        /**获取用户的当前设置 */
        getSetting(param: SettingParam): void;
        /**提前授权 */
        authorize(param: AuthorizeParam): void;

        /**关闭所有页面 打开到应用内的某个页面 */
        reLaunch(param: ReLaunchParam): void;

        /**将 ArrayBuffer 数据转成 Base64 字符串 */
        arrayBufferToBase64(data: ArrayBuffer): string;
        /**将 Base64 字符串转成 ArrayBuffer 数据 */
        base64ToArrayBuffer(data: string): ArrayBuffer;

        /**显示 loading 提示框 */
        showLoading(param: LoadingParam): void;
        /**隐藏消息提示框 */
        hideLoading(): void;

        /**开始监听加速度数据 */
        startAccelerometer(param: CallbackParam): void;
        /**停止监听加速度数据 */
        stopAccelerometer(param: CallbackParam): void;

        /**设置系统剪贴板的内容 */
        setClipboardData(param: SetClipboardParam): void;
        /**获取系统剪贴板内容 */
        getClipboardData(param: CallbackParam): void;

        /**批量添加卡券 */
        addCard(param: CardParam): void;
        /**查看微信卡包中的卡券 */
        openCard(param: CardParam): void;

        /**监听网络状态变化 */
        onNetworkStatusChange(callback: (res: { isConnected: boolean; networkType: string; }) => void): void;

        /**显示分享按钮 */
        showShareMenu(param: ShareMenuParam): void;
        /**隐藏分享按钮 */
        hideShareMenu(param: CallbackParam): void;
        /**获取分享详细信息 */
        getShareInfo(param: ShareInfoParam): void;
        /**更新转发属性 */
        updateShareMenu(param: ShareMenuParam): void;

        /**获取第三方平台自定义的数据字段 */
        getExtConfig(param: ExtConfigParam): void;
        /**获取第三方平台自定义的数据字段的同步接口 */
        getExtConfigSync(): object;
        /**
         * 判断小程序的API 回调 参数 组件等是否在当前版本可用
         * @param param 使用${API}.${method}.${param}.${options}或者${component}.${attribute}.${option}方式来调用
         */
        canIUse(param: string): never;

        /**开始搜索附近的iBeacon设备 */
        startBeaconDiscovery(param: CallbackWithErrMsgParam): void;
        /**停止搜索附近的iBeacon设备 */
        stopBeaconDiscovery(param: CallbackWithErrMsgParam): void;
        /**获取所有已搜索到的iBeacon设备 */
        getBeacons(param: BeaconsParam): void;
        /**监听 iBeacon 设备的更新事件 */
        onBeaconUpdate(callback: (res: { beacons: Array<IBeacon> }) => void): void;
        /**监听 iBeacon 服务的状态变化 */
        onBeaconServiceChange(callback: (res: { /**服务目前是否可用 */available: boolean; /**目前是否处于搜索状态 */discovering: boolean }) => void): void;

        /**获取屏幕亮度 */
        getScreenBrightness(param: GetScreenBrightnessParam): void;
        /**设置屏幕亮度 */
        setScreenBrightness(param: SetScreenBrightnessParam): void;

        /**保存联系人到系统通讯录 */
        addPhoneContact(param: AddPhoneContactParam): void;
        /**使手机发生较长时间的振动 400ms */
        vibrateLong(param: CallbackParam): void;
        /**使手机发生较短时间的振动 15ms */
        vibrateShort(param: CallbackParam): void;
        /**获取用户过去三十天微信运动步数 需要先调用 wx.login 接口 */
        getWeRunData(param: GetWeRunDataParam): void;
        /**保存图片到系统相册 需要用户授权 scope.writePhotosAlbum */
        saveImageToPhotosAlbum(param: SaveImageToPhotosAlbumParam): void;
        /**保存视频到系统相册 */
        saveVideoToPhotosAlbum(param: SaveImageToPhotosAlbumParam): void;
        /**获取全局唯一的背景音频管理器 */
        getBackgroundAudioManager(): BackgroundAudioManager;
        /**打开同一公众号下关联的另一个小程序 */
        navigateToMiniProgram(param: NavigateToMiniProgramParam): void;
        /**返回到上一个小程序 只有在当前小程序是被其他小程序打开时可以调用成功 */
        navigateBackMiniProgram(param: NavigateBackMiniProgramParam): void;
        /**
         * 返回一个SelectorQuery对象实例
         * 可以在这个实例上使用select等方法选择节点 并使用boundingClientRect等方法选择需要查询的信息
         */
        createSelectorQuery(): SelectorQuery;
        /**获取文件信息 */
        getFileInfo(param: GetFileInfoParam): never;
        /**监听用户主动截屏事件 用户使用系统截屏按键截屏时触发此事件 */
        onUserCaptureScreen(callback?: Function): never;
        /**将页面滚动到目标位置 单位px */
        pageScrollTo(scrollTop: number): never;
        /**支持小程序修改标题栏颜色 */
        setNavigationBarColor(param: SetNavigationBarColorParam): never;
        /**设置是否打开调试开关 此开关对正式版也能生效 */
        setEnableDebug(param: SetEnableDebugParam): never;
        /**设置是否保持常亮状态 仅在当前小程序生效 离开小程序后设置失效 */
        setKeepScreenOn(param: SetKeepScreenOnParam): never;
        /**
         * @since 1.5.0
         * @description 获取本机支持的 SOTER 生物认证方式
         */
        checkIsSupportSoterAuthentication(param: CheckIsSupportSoterAuthenticationParam): never;
        /**
         * @since 1.5.0
         * @description 开始 SOTER 生物认证
         */
        startSoterAuthentication(param: StartSoterAuthenticationParam): never;
        /**获取设备内是否录入如指纹等生物信息的接口 */
        checkIsSoterEnrolledInDevice(param: CheckIsSoterEnrolledInDeviceParam): never;
        /**
         * @since 1.5.0
         * @description 选择用户的发票抬头
         */
        chooseInvoiceTitle(param: ChooseInvoiceTitleParam): never;

        /**
         * 获取日志管理器对象
         * @since 2.1.0
         */
        getLogManager(): LogManager;
    }
    // #endregion

    // #region interfaces
    interface CallbackParam {
        /**接口调用成功的回调函数 */
        success?: (res?: any) => void;
        /**接口调用失败的回调函数 */
        fail?: (res?: any) => void;
        /**接口调用结束的回调函数(调用成功/失败都会执行) */
        complete?: Function;
    }

    interface CallbackWithErrMsgParam extends CallbackParam {
        success?: (res?: {/**成功：ok 错误：详细信息 */errMsg: string }) => void;
    }

    interface RequestParam extends CallbackParam {
        /**开发者服务器接口地址 */
        url: string;
        /**请求的参数 */
        data?: Object | string;
        /**设置请求的 header,header 中不能设置 Referer */
        header?: Object
        /**默认为 GET 有效值:OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT */
        method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
        /**如果设为json 会尝试对返回的数据做一次 JSON.parse */
        dataType?: string;
        /**
         * @description 设置响应的数据类型
         * @since 1.7.0
         */
        responseType?: 'text' | 'arraybuffer';
        /**收到开发者服务成功返回的回调函数 res = { data: '开发者服务器返回的内容' } */
        success?: (res?: HttpResponse) => void;
    }

    interface RequestTask {
        abort(): never;
    }

    interface HttpResponse {
        data?: Object | string | ArrayBuffer;
        errMsg: string;
        statusCode: number;
        /**@since 1.2.0 */
        header?: Object;
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

    interface UploadTask {
        onProgressUpdate: (res: { progress: number; totalBytesSent: number; totalBytesExpectedToSend: number; }) => never;
        abort(): never;
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

    interface DownloadTask {
        onProgressUpdate: (res: { progress: number; totalBytesWritten: number; totalBytesExpectedToWrite: number; }) => never;
        abort(): never;
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
        /**子协议数组 */
        protocols?: Array<string>;
    }

    interface SocketMessage extends CallbackParam {
        /**需要发送的内容 */
        data: string | ArrayBuffer;
    }

    interface CloseSocketParam extends CallbackParam {
        /**一个数字值表示关闭连接的状态号 表示连接被关闭的原因 如果这个参数没有被指定 默认的取值是1000 */
        code?: number;
        /**一个可读的字符串 表示连接被关闭的原因 这个字符串必须是不长于123字节的UTF-8 文本 */
        reason?: string;
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
        duration?: number;
        success?: (res?: { tempFilePath: string }) => void;
    }

    interface RecorderManager {
        /**开始录音 */
        start(options: RecorderManagerStartOption): void;
        /**暂停录音 */
        pause(): void;
        /**继续录音 */
        resume(): void;
        /**停止录音 */
        stop(): void;
        /**录音开始事件 */
        onStart: () => void;
        /**录音暂停事件 */
        onPause: () => void;
        /**录音停止事件 会回调文件地址 */
        onStop: (res?: { tempPath: string }) => void;
        /**已录制完指定帧大小的文件 会回调录音分片结果数据。如果设置了 frameSize  则会回调此事件 */
        onFrameRecorded: (res?: { frameBuffer: ArrayBuffer; isLastFrame: boolean }) => void;
        /**录音错误事件 会回调错误信息 */
        onError: (res?: { errMsg: string }) => void;
    }

    interface RecorderManagerStartOption {
        /**
         * 指定录音的时长 单位 ms  如果传入了合法的 duration  在到达指定的 duration 后会自动停止录音 最大值 600000(10 分钟),默认值 60000(1分钟)
         */
        duration?: number;
        /**采样率 */
        sampleRate?: 8000 | 16000 | 44100;
        /**录音通道数 */
        numberOfChannels?: 1 | 2;
        encodeBitRate?: 8000 | 11025 | 12000 | 16000 | 22050 | 24000 | 32000 | 44100 | 48000;
        /**音频格式 */
        format?: 'aac' | 'mp3';
        /**指定帧大小 单位 KB 传入 frameSize 后 每录制指定帧大小的内容后 会回调录制的文件内容 不指定则不会回调 暂仅支持 mp3 格式  */
        frameSize?: number;
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
        /**文件类型 指定文件类型打开文件 */
        fileType?: 'doc' | 'xls' | 'ppt' | 'pdf' | 'docx' | 'xlsx' | 'pptx';
    }

    interface ChooseVideoParam extends CallbackParam {
        /**album 从相册选视频 camera 使用相机拍摄 默认为:['album', 'camera'] */
        sourceType?: Array<string>;
        /**
         * @since 1.6.0
         * @description 是否压缩所选的视频源文件 默认值为true 需要压缩
         */
        compressed?: boolean;
        /**拍摄视频最长拍摄时间 单位秒 最长支持60秒 */
        maxDuration?: number;
        /**前置或者后置摄像头 默认为前后都有 即:['front', 'back'] */
        camera?: Array<string>;
        /**接口调用成功 返回视频文件的临时文件路径 */
        success?: (res?: VideoInfo) => void;
    }

    interface AudioContext {
        /**设置音频的地址 */
        setSrc(src: string): void;
        /**播放 */
        play(): void;
        /**暂停 */
        pause(): void;
        /**跳转到指定位置 单位 s */
        seek(position: number): void;
    }

    interface InnerAudioContext {
        /**音频的数据链接 用于直接播放 */
        src: string;
        /**开始播放的位置 单位:s 默认 0 */
        startTime: number;
        /**是否自动开始播放 默认 false */
        autoplay: boolean;
        /**是否循环播放 默认 false */
        loop: boolean;
        /**是否遵循系统静音开关 当此参数为 false 时 即使用户打开了静音开关 也能继续发出声音 默认值 true */
        obeyMuteSwitch: boolean;
        /**当前音频的长度 单位:s 只有在当前有合法的 src 时返回 */
        readonly duration: number;
        /**当前音频的播放位置 单位:s 只有在当前有合法的 src 时返回 时间不取整 保留小数点后 6 位 */
        readonly currentTime: number;
        /**当前是是否暂停或停止状态 true 表示暂停或停止 false 表示正在播放 */
        readonly paused: boolean;
        /**音频缓冲的时间点 仅保证当前播放时间点到此时间点内容已缓冲 */
        readonly buffered: number;
        /**播放 */
        play(): void;
        /**暂停 */
        pause(): void;
        /**停止 */
        stop(): void;
        /**跳转到指定位置 单位 s */
        seek(position: number): void;
        /**销毁当前实例 */
        destroy(): void;
        /**音频进入可以播放状态 但不保证后面可以流畅播放 */
        onCanplay: () => void;
        /**音频播放事件 */
        onPlay: () => void;
        /**音频暂停事件 */
        onPause: () => void;
        /**音频停止事件 */
        onStop: () => void;
        /**音频自然播放结束事件 */
        onEnded: () => void;
        /**音频播放进度更新事件 */
        onTimeUpdate: () => void;
        /**音频播放错误事件 */
        onError: () => void;
        /**音频加载中事件 当音频因为数据不足 需要停下来加载时会触发 */
        onWaiting: () => void;
        /**音频进行 seek 操作事件 */
        onSeeking: () => void;
        /**音频完成 seek 操作事件 */
        onSeeked: () => void;
    }

    interface VideoContext {
        /**播放 */
        play(): never;
        /**暂停 */
        pause(): never;
        /**跳转到指定位置 单位 s */
        seek(position: number): never;
        /**发送弹幕 danmu 包含两个属性 text,color */
        sendDanmu(danmu: { text: string, color: string }): never;
        /**设置倍速播放 支持的倍率有 0.5/0.8/1.0/1.25/1.5 */
        playbackRate(rate: number): never;
        /**进入全屏 */
        requestFullScreen(): never;
        /**退出全屏 */
        exitFullScreen(): never;
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

    interface CameraContext {
        /**拍照 可指定质量 成功则返回图片 */
        takePhoto(param: CameraContextTakePhotoParam): void;
        /**开始录像 */
        startRecord(param: CameraContextStartRecordParam): void;
        /**结束录像 成功则返回封面与视频 */
        stopRecord(param: CameraContextStopRecord): void;
    }

    interface CameraContextTakePhotoParam extends CallbackParam {
        /**成像质量 值为high, normal, low 默认normal */
        quality?: 'high' | 'normal' | 'low';
        success?: (res?: { tempImagePath: string }) => void;
    }

    interface CameraContextStartRecordParam extends CallbackParam {
        /**超过30s或页面onHide时会结束录像 */
        timeoutCallback?: (res?: { tempThumbPath: string; tempVideoPath: string }) => void;
    }

    interface CameraContextStopRecord extends CallbackParam {
        success?: (res?: { tempThumbPath: string; tempVideoPath: string }) => void;
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
        success?: (res?: { data: any }) => void;
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

    interface TranslateMarkerParam extends CallbackParam {
        /**指定marker */
        markerId: number;
        /**指定marker移动到的目标点 */
        destination: any;
        /**移动过程中是否自动旋转marker */
        autoRotate: boolean;
        /**marker的旋转角度 */
        rotate: number
        /**动画持续时长 默认值1000ms 平移与旋转分别计算 */
        duration?: number;
        /**动画结束回调函数 */
        animationEnd?: Function;
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
        /**高度 单位 m */
        altitude: number;
        /**垂直精度 单位 m Android 无法获取 返回 0  */
        verticalAccuracy: number;
        /**水平精度 单位 m */
        horizontalAccuracy: number;
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
        /**手机品牌 */
        brand: string;
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
        /**操作系统版本 */
        system: string;
        /**客户端平台 */
        platform: string;
        /**屏幕宽度 */
        screenWidth: string;
        /**屏幕高度 */
        screenHeight: string;
        /**用户字体大小设置 */
        fontSizeSetting: string;
        /**客户端基础库版本 */
        SDKVersion: string;
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
        success?: () => void;
    }

    interface ToastParam extends CallbackParam {
        /**提示的内容 */
        title: string;
        /**图标 只支持 success|loading|none */
        icon?: 'success' | 'loading' | 'none';
        /**自定义图标的本地路径 image 的优先级高于 icon */
        image?: string;
        /**提示的延迟时间 单位毫秒 默认 1500 最大为10000 */
        duration?: number;
        /**是否显示透明蒙层 防止触摸穿透 默认 false */
        mask?: boolean;
    }

    interface ModalParam extends CallbackParam {
        /**提示的标题 */
        title: string;
        /**提示的内容 */
        content: string;
        /**是否显示取消按钮 默认为 false */
        showCancel?: boolean;
        /**取消按钮的文字 默认为 取消 最多 4 个字符 */
        cancelText?: string;
        /**取消按钮的文字颜色 默认为 #000000 */
        cancelColor?: string;
        /**确定按钮的文字 默认为 确定 最多 4 个字符 */
        confirmText?: string;
        /**确定按钮的文字颜色 默认为 #3CC51F */
        confirmColor?: string;
        /**
         * 接口调用成功的回调函数
         * 返回res.confirm==1时 表示用户点击确定按钮
         */
        success?: (res?: { confirm: boolean, cancel: boolean }) => void;
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

    interface TopBarTextParam extends CallbackParam {
        /**置顶栏文字内容 */
        text: string;
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
        export(): void;
        /**
         * 调用动画操作方法后要调用 step() 来表示一组动画完成
         * 可以在一组动画中调用任意多个动画方法
         * 一组动画中的所有动画会同时开始
         * 一组动画完成后才会进行下一组动画
         * step 可以传入一个跟 wx.createAnimation() 一样的配置参数用于指定当前组动画的配置
         */
        step(): void;

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
        matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): void;
    }

    /**
     * context只是一个记录方法调用的容器
     * 用于生成记录绘制行为的actions数组
     * context跟<canvas/>不存在对应关系
     * 一个context生成画布的绘制动作数组可以应用于多个<canvas/>
     */
    interface CanvasContext {
        /**获取当前context上存储的绘图动作 */
        getActions(): Array<any>;
        /**清空当前的存储绘图动作 */
        clearActions(): void;

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
        scale(scaleWidth: number, scaleHeight: number): void;
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
        rotate(rotate: number): void;
        /**
         * 对坐标原点进行缩放
         * 对当前坐标系的原点(0,0)进行变换
         * 默认的坐标系原点为页面左上角
         * @param x 水平坐标平移量
         * @param y 竖直坐标平移量
         */
        translate(x: number, y: number): void;
        /**保存当前坐标轴的缩放 旋转 平移信息 */
        save(): void;
        /**恢复之前保存过的坐标轴的缩放 旋转 平移信息 */
        restore(): void;
        /**
         * 在给定的矩形区域内 清除画布上的像素
         * @param x 矩形区域左上角的x坐标
         * @param y 矩形区域左上角的y坐标
         * @param width 矩形区域的宽度
         * @param height 矩形区域的高度
         */
        clearRect(x: number, y: number, width: number, height: number): void;
        /**
         * 在画布上绘制被填充的文本
         * @param text 在画布上输出的文本
         * @param x 绘制文本的左上角x坐标位置
         * @param y 绘制文本的左上角y坐标位置
         */
        fillText(text: string, x?: number, y?: number): void;
        /**
         * 在画布上绘制图像 图像保持原始尺寸
         * @param imageResource	通过chooseImage得到一个文件路径或者一个项目目录内的图片 所要绘制的图片资源
         * @param x 图像左上角的x坐标
         * @param y 图像左上角的y坐标
         * @param width 图像宽度
         * @param height 图像高度
         */
        drawImage(imageResource: string, x?: number, y?: number, width?: number, height?: number): void;
        /**对当前路径进行填充 */
        fill(): void;
        /**对当前路径进行描边 */
        stroke(): void;
        /**
         * 开始一个路径
         * 开始创建一个路径 需要调用fill或者stroke才会使用路径进行填充或描边 同一个路径内的多次setFillStyle setStrokeStyle setLineWidth等设置 以最后一次设置为准
         */
        beginPath(): void;
        /**关闭一个路径 */
        closePath(): void;
        /**
         * 把路径移动到画布中的指定点 但不创建线条
         */
        moveTo(x: number, y: number): void;
        /**
         * 添加一个新点 然后在画布中创建从该点到最后指定点的线条
         * @param x 目标位置的x坐标
         * @param y 目标位置的y坐标
         */
        lineTo(x: number, y: number): void;
        /**
         * 添加一个矩形路径到当前路径
         * @param x 矩形路径左上角的x坐标
         * @param y 矩形路径左上角的y坐标
         * @param width 矩形路径的宽度
         * @param height 矩形路径的高度
         */
        rect(x: number, y: number, width: number, height: number): void;
        /**
         * 画一条弧线
         * @param x 圆的x坐标
         * @param y 圆的y坐标
         * @param r 圆的半径
         * @param sAngle 起始弧度 单位弧度(在3点钟方向)
         * @param eAngle 终止弧度
         * @param counterclockwise 指定弧度的方向是逆时针还是顺时针 默认是false 即顺时针
         */
        arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise?: boolean): void;
        /**
         * 创建二次贝塞尔曲线路径
         * @param cpx 贝塞尔控制点的x坐标
         * @param cpy 贝塞尔控制点的y坐标
         * @param x 结束点的x坐标
         * @param y 结束点的y坐标
         */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
        /**
         * 创建三次方贝塞尔曲线路径
         * @param cp1x 第一个贝塞尔控制点的x坐标
         * @param cp1y 第一个贝塞尔控制点的y坐标
         * @param cp2x 第二个贝塞尔控制点的x坐标
         * @param cp2y 第二个贝塞尔控制点的y坐标
         * @param x 结束点的x坐标
         * @param y 结束点的y坐标
         */
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        /**
         * 设置纯色填充
         * @param color 设置为填充样式的颜色 'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
         */
        setFillStyle(color: string): void;
        /**
          * 设置纯色描边
          * @param color 设置为填充样式的颜色 'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
          */
        setStrokeStyle(color: string): void;
        /**
         * 设置阴影
         * @param offsetX 阴影相对于形状在水平方向的偏移
         * @param offsetY 阴影相对于形状在竖直方向的偏移
         * @param blur 阴影的模糊级别 数值越大越模糊 0~100
         * @param color 阴影的颜色 'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
         */
        setShadow(offsetX: number, offsetY: number, blur: number, color: string): void;
        /**设置字体的字号 */
        setFontSize(fontSize: number): void;
        /**设置线条的宽度 */
        setLineWidth(lineWidth: number): void;
        /**设置线条的结束端点样式 */
        setLineCap(lineCap: 'butt' | 'round' | 'square'): void;
        /**
         * 设置两条线相交时
         * 所创建的拐角类型
         */
        setLineJoin(lineJoin: 'bevel' | 'round' | 'miter'): void;
        /**
         * 设置最大斜接长度
         * 斜接长度指的是在两条线交汇处内角和外角之间的距离
         * 当 setLineJoin为 miter 时才有效
         * 超过最大倾斜长度的
         * 连接处将以 lineJoin 为 bevel 来显示
         */
        setMiterLimit(miterLimit: number): void;
        /**
         * 填充一个矩形
         * @param x 矩形路径左上角的x坐标
         * @param y 矩形路径左上角的y坐标
         * @param width 矩形路径的宽度
         * @param height 矩形路径的高度
         */
        fillRect(x: number, y: number, width: number, height: number): void;
        /**
         * 画一个矩形(非填充)
         * @param x 矩形路径左上角的x坐标
         * @param y 矩形路径左上角的y坐标
         * @param width 矩形路径的宽度
         * @param height 矩形路径的高度
         */
        strokeRect(x: number, y: number, width: number, height: number): void;
        /**
         * 创建一个线性的渐变颜色
         * @param x0 起点的x坐标
         * @param y0 起点的y坐标
         * @param x1 终点的x坐标
         * @param y1 终点的y坐标
         */
        createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
        /**
         * 创建一个圆形的渐变颜色
         * @param x 圆心的x坐标
         * @param y 圆心的y坐标
         * @param r 圆的半径
         */
        createCircularGradient(x: number, y: number, r: number): CanvasGradient;
        /**用于设置文字的对齐 */
        setTextAlign(align: 'left' | 'center' | 'right'): void;
        /**用于设置文字的水平对齐 */
        setTextBaseline(textBaseline: 'top' | 'bottom' | 'middle' | 'normal'): void;
        /**
         * @description 将之前在绘图上下文中的描述(路径 变形 样式) 画到 canvas 中
         * @since 1.7.0
         */
        draw(reserve?: boolean, callback?: Function): void;
    }

    interface CanvasToTempFilePathParam extends CallbackParam {
        /**画布标识 传入 <canvas/> 的 cavas-id */
        canvasId: string;
        /**画布x轴起点 默认0 */
        x?: number;
        /**画布y轴起点 默认0 */
        y?: number;
        /**画布宽度 默认为canvas宽度 - x  */
        width?: number;
        /**画布高度 默认为canvas高度 - y  */
        height?: number;
        /**输出图片宽度 默认为width */
        destWidth?: number;
        /**输出图片高度 默认为height */
        destHeight?: number;
        /**
         * @description 目标文件的类型 默认为 'png'
         * @since 1.7.0
         */
        fileType?: 'jpg' | 'png';
        /**
         * @description 图片的质量 取值范围为 (0,1] 不在范围内时当作1.0处理
         * @since 1.7.0
         */
        quality?: number;
    }

    interface CanvasGradient {
        /**
         * 指定颜色渐变点的位置和颜色
         * @param position 位置必须位于0到1之间
         */
        addColorStop(position: number, color: string): void;
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
        /**是否带上登录态信息
         * 当 withCredentials 为 true 时 要求此前有调用过 wx.login 且登录态尚未过期
         * 此时返回的数据会包含 encryptedData iv 等敏感信息
         * 当 withCredentials 为 false 时不要求有登录态
         * 返回的数据不包含 encryptedData iv 等敏感信息
         */
        withCredentials?: boolean;
        /**指定返回用户信息的语言 zh_CN 简体中文 zh_TW 繁体中文 en 英文 */
        lang?: string;
        success?: (res?: UserInfo) => void;
    }

    interface WxUserInfo {
        /**用户昵称 */
        nickName: string;
        /**用户头像 最后一个数值代表正方形头像大小(有0 46 64 96 132数值可选 0代表640*640正方形头像) 用户没有头像时该项为空 若用户更换头像 原有头像URL将失效 */
        avatarUrl: string;
        /**用户的性别 值为1时是男性 值为2时是女性 值为0时是未知 */
        gender: string;
        /**用户所在城市 */
        city: string;
        /**用户所在省份 */
        province: string;
        /**用户所在国家 */
        country: string;
        /**用户的语言 简体中文为zh_CN */
        language: string;
    }

    interface UserInfo {
        /**用户信息对象 不包含 openid 等敏感信息 */
        userInfo: WxUserInfo;
        /**不包括敏感信息的原始数据字符串 用于计算签名 */
        rawData: string;
        /**使用sha1(rawData + sessionkey) 得到字符串 用于校验用户信息 */
        signature: string;
        /**包括敏感数据在内的完整用户信息的加密数据 */
        encryptedData: string;
        /**加密算法的初始向量 */
        iv: string;
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

    interface Target {
        /**组件的id */
        id: string;
        /**组件的类型 */
        tagName: string;
        /**组件上由`data-`开头的自定义属性组成的集合 */
        dataset: any;
    }

    /**
     * 事件对象
     * 如无特殊说明 当组件触发事件时 逻辑层绑定该事件的处理函数会收到一个事件对象
     */
    interface BaseEvent {
        /**事件类型 */
        type: string;
        /**
         * 事件生成时的时间戳
         * 页面打开到触发事件所经过的毫秒数
         */
        timeStamp: number;
        /**触发事件的源组件 */
        target: Target;
        /**事件绑定的当前组件 */
        currentTarget: Target
    }

    interface Touch {
        /**触摸点的标识符 */
        identifier: number;
        /**距离文档左上角的距离 文档的左上角为原点 横向为X轴 */
        pageX: number;
        /**距离文档左上角的距离 文档的左上角为原点 纵向为Y轴 */
        pageY: number;
        /**距离页面可显示区域(屏幕除去导航条)左上角距离 横向为X轴 */
        clientX: number;
        /**距离页面可显示区域(屏幕除去导航条)左上角距离 纵向为Y轴 */
        clientY: number;
    }

    interface TouchEvent extends BaseEvent {
        /**每个元素为一个 Touch 对象(canvas 触摸事件中携带的 touches 是 CanvasTouch 数组) 表示当前停留在屏幕上的触摸点 */
        touches: Array<Touch>;
        /**表示有变化的触摸点 如从无变有(touchstart) 位置变化(touchmove) 从有变无(touchend touchcancel) */
        changedTouches: Array<Touch>;
    }

    interface CustomEvent extends BaseEvent {
        /**
         * 额外的信息
         * 自定义事件所携带的数据 如表单组件的提交事件会携带用户的输入 媒体的错误事件会携带错误信息
         */
        detail: any;
    }

    interface SwitchTabParam extends CallbackParam {
        /**需要跳转的 tabBar 页面的路径(需在 app.json 的 tabBar 字段定义的页面) 路径后不能带参数 */
        url: string;
    }

    interface ScanCodeParam extends CallbackParam {
        /**是否只能从相机扫码 不允许从相册选择图片 */
        onlyFromCamera?: boolean;
        success?: (res?: ScanCodeResult) => void;
    }

    interface ScanCodeResult {
        /**所扫码的内容 */
        result: string;
        /**所扫码的类型 */
        scanType: string;
        /**所扫码的字符集 */
        charSet: string;
        /**当所扫的码为当前小程序的合法二维码时 会返回此字段 内容为二维码携带的 path */
        path: string;
    }

    /**通过 mapId 跟一个 <map/> 组件绑定 通过它可以操作对应的 <map/> 组件 */
    interface MapContext {
        /**获取当前地图中心的经纬度 返回的是 gcj02 坐标系 可以用于 wx.openLocation */
        getCenterLocation(param: GetLocationParam): void;
        /**将地图中心移动到当前定位点 需要配合map组件的show-location使用 */
        moveToLocation(): void;
        /**平移marker 带动画 */
        translateMarker(param: TranslateMarkerParam): void;
        /**缩放视野展示所有经纬度 */
        includePoints(param: { points: Array<{ latitude: number, longitude: number; }>; padding?: Array<any> }): void;
        /**获取当前地图的视野范围 */
        getRegion(param: CallbackParam): void;
        /**获取当前地图的缩放级别 */
        getScale(param: CallbackParam): void;
    }

    /**自定以分享内容 */
    interface PageShareData extends CallbackWithErrMsgParam {
        /**分享标题 默认 当前小程序名称 */
        title?: string;
        /**分享描述 默认 当前小程序名称 */
        desc?: string;
        /**分享路径 当前页面 path 必须是以 / 开头的完整路径 */
        path?: string;
        /**自定义图片路径 可以是本地文件路 代码包文件路径或者网络图片路径 支持PNG及JPG 不传入 imageUrl 则使用默认截图 */
        imageUrl?: string;
        success?: (res?: { errMsg: string; shareTickets?: Array<string> }) => void;
    }

    interface BluetoothAdapterStateParam extends CallbackParam {
        success?: (res?: { adapterState: AdapterState, /**成功：ok 错误：详细信息 */errMsg: string }) => void;
    }

    /**蓝牙适配器状态信息 */
    interface AdapterState {
        /**是否正在搜索设备 */
        discovering: boolean;
        /**蓝牙适配器是否可用 */
        available: boolean;
    }

    interface BluetoothAdapterStateChangeParam extends CallbackParam {
        success?: (res?: AdapterState) => void;
    }

    interface BluetoothDevicesDiscoveryParam extends CallbackWithErrMsgParam {
        /**蓝牙设备主 service 的 uuid 列表 */
        services: Array<string>;
    }

    interface BluetoothDevicesParam extends CallbackParam {
        /**蓝牙设备主 service 的 uuid 列表 */
        services: Array<string>;
        success: (res: { devices: Array<BluetoothDevice>, /**成功：ok 错误：详细信息 */errMsg: string }) => void;
    }

    interface BluetoothDevice {
        /**	蓝牙设备名称 某些设备可能没有 */
        name: string;
        /**低功耗设备广播名称 某些设备可能没有 */
        localName: string;
        /**用于区分设备的 id */
        deviceId: string;
        /**当前蓝牙设备的信号强度 */
        RSSI: number;
        /**当前蓝牙设备的广播内容 */
        advertisData: ArrayBuffer;
    }

    interface ConnectedBluetoothDevicesParam extends CallbackParam {
        /**蓝牙设备主 service 的 uuid 列表 */
        services: Array<string>;
        success: (res: { devices: Array<{ /**蓝牙设备名称 某些设备可能没有 */name: string, /**用于区分设备的 id */deviceId: string }>, /**成功：ok 错误：详细信息 */errMsg: string }) => void;
    }

    interface BLEConnectionParam extends CallbackWithErrMsgParam {
        /**蓝牙设备 id 参考 getDevices 接口 */
        deviceId: string;
    }

    interface BLEDeviceServicesParam extends CallbackParam {
        deviceId: string;
        success: (res: { services: Array<{ /**蓝牙设备服务的 uuid */uuid: string; /**该服务是否为主服务 */isPrimary: boolean }>; /**成功：ok 错误：详细信息 */errMsg: string }) => void;
    }

    interface BLEDeviceCharacteristicsParam extends CallbackParam {
        /**蓝牙设备 id 参考 device 对象 */
        deviceId: string;
        /**蓝牙服务 uuid */
        serviceId: string;
        success: (res: { characteristics: Array<{ uuid: string; properties: { read: boolean; write: boolean; notify: boolean; indicate: boolean; } }>; errMsg: string; }) => void;
    }

    interface BLECharacteristicValueParam extends CallbackParam {
        /**蓝牙设备 id 参考 device 对象 */
        deviceId: string;
        /**蓝牙服务 uuid */
        serviceId: string;
        /**蓝牙特征值的 uuid */
        characteristicId: string;
        success: (res: { characteristic: { characteristicId: string; serviceId: object; value: ArrayBuffer; }; errMsg: string; }) => void;
    }

    interface WriteBLECharacteristicValueParam extends CallbackWithErrMsgParam {
        /**蓝牙设备 id */
        deviceId: string;
        /**蓝牙特征值对应服务的 uuid */
        serviceId: string;
        /**蓝牙特征值的 uuid */
        characteristicId: string;
        /**蓝牙设备特征值对应的二进制值 */
        value: ArrayBuffer;
    }

    interface BLECharacteristicValueChangedParam extends CallbackWithErrMsgParam {
        /**蓝牙设备 id */
        deviceId: string;
        /**蓝牙特征值对应服务的 uuid */
        serviceId: string;
        /**蓝牙特征值的 uuid */
        characteristicId: string;
        state: boolean;
    }

    interface AddressParam extends CallbackParam {
        success: (res?: AddressData) => void;
    }

    interface AddressData {
        /**获取编辑收货地址成功返回 'openAddress:ok' */
        errMsg?: string;
        /**收货人姓名 */
        userName?: string;
        /**邮编 */
        postalCode?: string;
        /**国标收货地址第一级地址(省) */
        provinceName?: string;
        /**国标收货地址第二级地址(市) */
        cityName?: string;
        /**国标收货地址第三级地址(国家) */
        countryName?: string;
        /**详细收货地址信息 */
        detailInfo?: string;
        /**收货地址国家码 */
        nationCode?: string;
        /**收货人手机号码 */
        telNumber?: string;
    }

    interface SettingParam extends CallbackParam {
        success: (res: {
            /**用户信息 */
            'scope.userInfo': boolean;
            /**地理位置 */
            'scope.userLocation': boolean;
            /**通讯地址 */
            'scope.address': boolean;
            /**录音功能 */
            'scope.record': boolean;
            /**保存到相册 */
            'scope.writePhotosAlbum': boolean;
        }) => void;
    }

    interface AuthorizeParam extends CallbackWithErrMsgParam {
        scope: string;
    }

    interface ReLaunchParam extends CallbackParam {
        /**
         * 需要跳转的应用内非 tabBar 的页面的路径
         * 路径后可以带参数
         * 参数与路径之间使用?分隔
         * 参数键与参数值用=相连
         * 不同参数用&分隔
         * 如 'path?key=value&key2=value2'
         */
        url: string;
    }

    interface LoadingParam extends CallbackParam {
        /**提示的内容 */
        title: string;
        /**是否显示透明蒙层 防止触摸穿透 默认 false */
        mask?: boolean;
    }

    interface SetClipboardParam extends CallbackParam {
        data: string;
    }

    interface CardParam extends CallbackWithErrMsgParam {
        /**需要添加的卡券列表 */
        cardList: Array<any>;
    }

    interface LaunchData {
        /**打开小程序的路径 */
        path: string;
        /**打开小程序的query */
        query: object;
        /**打开小程序的场景值 */
        scene: number;
        shareTicket: string;
    }

    interface ShareInfoParam extends CallbackParam {
        shareTicket: string;
        success: (res: {
            /**错误信息 */
            errMsg: string;
            /**不包括敏感信息的原始数据字符串 用于计算签名 */
            rawData: string;
            /**使用sha1(rawData+sessionkey)得到字符串 用于校验分享信息 */
            signature: string;
            /**包括敏感数据在内的完整分享信息的加密数据 */
            encryptedData: string;
            /**加密算法的初始向量 */
            iv: string;
        }) => void;
    }

    interface ExtConfigParam extends CallbackParam {
        success: (res: { errMsg: string; extConfig: object }) => void;
    }

    interface ShareMenuParam extends CallbackParam {
        /**是否使用带 shareTicket 的分享 */
        withShareTicket?: boolean;
    }

    interface BeaconsParam extends CallbackParam {
        success: (res: { errMsg: string; beacons: Array<IBeacon> }) => void;
    }

    interface IBeacon {
        /**	iBeacon 设备广播的 uuid */
        uuid: string;
        /**	iBeacon 设备的主 id */
        major: string;
        /**iBeacon 设备的次 id */
        minor: string;
        /**	表示设备距离的枚举值 */
        proximity: number;
        /**	iBeacon 设备的距离 */
        accuracy: number;
        /**表示设备的信号强度 */
        rssi: number;
    }

    interface GetScreenBrightnessParam extends CallbackParam {
        success: (res?: { errMsg: string; value: number; }) => void;
    }

    interface SetScreenBrightnessParam extends CallbackParam {
        /**屏幕亮度值 范围 0~1 0 最暗 1 最亮 */
        value: number;
    }

    interface AddPhoneContactParam extends CallbackWithErrMsgParam {
        /**头像本地文件路径 */
        photoFilePath?: string;
        /**昵称 */
        nickName?: string;
        /**姓氏 */
        lastName?: string;
        /**中间名 */
        middleName?: string;
        /**名字 */
        firstName: string;
        /**	备注 */
        remark?: string;
        /**手机号 */
        mobilePhoneNumber?: string;
        /**微信号 */
        weChatNumber?: string;
        /**联系地址国家 */
        addressCountry?: string;
        /**联系地址省份 */
        addressState?: string;
        /**联系地址城市 */
        addressCity?: string;
        /**联系地址街道 */
        addressStreet?: string;
        /**联系地址邮政编码 */
        addressPostalCode?: string;
        /**公司 */
        organization?: string;
        /**职位 */
        title?: string;
        /**工作传真 */
        workFaxNumber?: string;
        /**工作电话 */
        workPhoneNumber?: string;
        /**公司电话 */
        hostNumber: string;
        /**电子邮件 */
        email?: string;
        /**网站 */
        url?: string;
        /**工作地址国家 */
        workAddressCountry?: string;
        /**工作地址省份 */
        workAddressState?: string;
        /**工作地址城市 */
        workAddressCity?: string;
        /**工作地址街道 */
        workAddressStreet?: string;
        /**工作地址邮政编码 */
        workAddressPostalCode?: string;
        /**住宅传真 */
        homeFaxNumber?: string;
        /**住宅电话 */
        homePhoneNumber?: string;
        /**住宅地址国家 */
        homeAddressCountry?: string;
        /**住宅地址省份 */
        homeAddressState?: string;
        /**住宅地址城市 */
        homeAddressCity?: string;
        /**住宅地址街道 */
        homeAddressStreet?: string;
        /**住宅地址邮政编码 */
        homeAddressPostalCode?: string;
    }

    interface GetWeRunDataParam extends CallbackParam {
        success?: (res: { errMsg: string; encryptedData: string }) => void;
    }

    interface SaveImageToPhotosAlbumParam extends CallbackWithErrMsgParam {
        /**图片文件路径 可以是临时文件路径也可以是永久文件路径 */
        filePath: string;
    }

    interface BackgroundAudioManager {
        /**	当前音频的长度 单位 s 只有在当前有合法的 src 时返回 */
        readonly duration: number;
        /**	当前音频的播放位置 单位 s 只有在当前有合法的 src 时返回 */
        readonly currentTime: number;
        /**	当前是是否暂停或停止状态 true 表示暂停或停止 false 表示正在播放 */
        readonly paused: boolean;
        /**音频的数据源 默认为空字符串 当设置了新的 src 时 会自动开始播放 */
        src: string;
        /** 音频开始播放的位置 单位 s */
        startTime: number;
        /**音频缓冲的时间点仅保证当前播放时间点到此时间点内容已缓冲 */
        readonly buffered: number;
        /** 音频标题 用于做原生音频播放器音频标题 原生音频播放器中的分享功能 分享出去的卡片标题 也将使用该值 */
        title: string;
        /**专辑名 原生音频播放器中的分享功能 分享出去的卡片简介 也将使用该值 */
        epname: string;
        /**歌手名 原生音频播放器中的分享功能 分享出去的卡片简介 也将使用该值 */
        singer: string;
        /**封面图url 用于做原生音频播放器背景图 原生音频播放器中的分享功能 分享出去的卡片配图及背景也将使用该图 */
        coverImgUrl: string;
        /** 页面链接 原生音频播放器中的分享功能 分享出去的卡片简介 也将使用该值 */
        webUrl: string;

        /**播放 */
        play(): void;
        /**暂停 */
        pause(): void;
        /**停止 */
        stop(): void;
        /**跳转到指定位置 单位 s */
        seek(position: number): void;
        /**背景音频进入可以播放状态 但不保证后面可以流畅播放 */
        onCanplay(callback: Function): void;
        /**背景音频播放事件 */
        onPlay(callback: Function): void;
        /**背景音频暂停事件 */
        onPause(callback: Function): void;
        /**背景音频停止事件 */
        onStop(callback: Function): void;
        /**背景音频自然播放结束事件 */
        onEnded(callback: Function): void;
        /**背景音频播放进度更新事件 */
        onTimeUpdate(callback: Function): void;
        /**用户在系统音乐播放面板点击上一曲事件 iOS only  */
        onPrev(callback: Function): void;
        /**用户在系统音乐播放面板点击下一曲事件 iOS only  */
        onNext(callback: Function): void;
        /**背景音频播放错误事件 */
        onError(callback: Function): void;
        /**音频加载中事件 当音频因为数据不足 需要停下来加载时会触发 */
        onWaiting(callback: Function): void;
    }

    interface NavigateToMiniProgramParam extends CallbackWithErrMsgParam {
        /**要打开的小程序 appId*/
        appId: string;
        /**打开的页面路径 如果为空则打开首页 */
        path?: string
        /**需要传递给目标小程序的数据 目标小程序可在 App.onLaunch() App.onShow() 中获取到这份数据 */
        extraData?: object;
        /**要打开的小程序版本 有效值 develop trial release*/
        envVersion?: string;
    }

    interface NavigateBackMiniProgramParam extends CallbackWithErrMsgParam {
        /**需要返回给上一个小程序的数据 上一个小程序可在 App.onShow() 中获取到这份数据 */
        extraData: object;
    }

    interface SelectorQuery {
        /**在当前页面下选择第一个匹配选择器selector的节点 返回一个NodesRef对象实例 */
        select(selector: string): NodesRef;
        /**在当前页面下选择匹配选择器selector的节点 返回一个NodesRef对象实例 */
        selectAll(selector: string): NodesRef;
        /**选择显示区域 可用于获取显示区域的尺寸 滚动位置等信息 */
        selectViewport(): NodesRef;
        exec(callback?: (res: Array<any>) => void): void;
    }

    interface NodesRef {
        /**添加节点的布局位置的查询请求 相对于显示区域 以像素为单位 */
        boundingClientRect(callback: (rect: WxClientRect | Array<WxClientRect>) => void): SelectorQuery;
        /**添加节点的滚动位置查询请求 以像素为单位 */
        scrollOffset(callback: (rects: WxScrollOffset) => void): SelectorQuery;
        /**获取节点的相关信息 需要获取的字段在fields中指定 */
        fields(fields: NodeField, callback: (res: any) => void): SelectorQuery;
    }

    interface WxClientRect extends ClientRect {
        id: string;
        dataset: any;
    }

    interface WxScrollOffset {
        id: string;
        dataset: any;
        scrollLeft: number;
        scrollTop: number;
    }

    interface NodeField {
        id?: boolean;
        dataset?: boolean;
        rect?: boolean;
        size?: boolean;
        scrollOffset?: boolean;
    }

    interface GetFileInfoParam extends CallbackParam {
        /**本地文件路径 */
        filePath: string;
        /**计算文件摘要的算法 默认值 md5 */
        digestAlgorithm?: 'md5' | 'sha1';
        success: (res: { size: number; digest: string; errMsg: string }) => void;
    }

    interface SetNavigationBarColorParam extends CallbackWithErrMsgParam {
        frontColor: string;
        backgroundColor: string;
        animation?: {
            duration?: number;
            timingFunc?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
        }
    }

    interface SetEnableDebugParam extends CallbackWithErrMsgParam {
        enableDebug: boolean;
    }

    interface SetKeepScreenOnParam extends CallbackWithErrMsgParam {
        keepScreenOn: boolean;
    }

    interface CheckIsSupportSoterAuthenticationParam extends CallbackParam {
        success?: (res: { supportMode: Array<'fingerPrint' | 'facial' | 'speech'>, errMsg: string; }) => void;
    }

    interface StartSoterAuthenticationParam extends CallbackParam {
        /**请求使用的可接受的生物认证方式 */
        requestAuthModes: Array<string>;
        /**挑战因子 挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键是别信息 将作为result_json的一部分 供调用者识别本次请求 */
        challenge: string;
        /**验证描述 即识别过程中显示在界面上的对话框提示内容 */
        authContent?: string;
        success?: (res: { errCode: number; authMode: string; resultJSON: string; resultJSONSignature: string; errMsg: string; }) => void;
    }

    interface CheckIsSoterEnrolledInDeviceParam extends CallbackParam {
        checkAuthMode: 'fingerPrint' | 'facial' | 'speech';
        success?: (res: { isEnrolled: boolean, errMsg: string; }) => void;
    }

    interface ChooseInvoiceTitleParam extends CallbackParam {
        success?: (res: InvoiceTitle) => void;
    }

    interface InvoiceTitle {
        /**抬头类型 0 单位 1 个人 */
        type: string;
        /**抬头名称 */
        title: string;
        /**抬头税号 */
        taxNumber: string;
        /**单位地址 */
        companyAddress: string;
        /**手机号码 */
        telephone: string;
        /**银行名称 */
        bankName: string;
        /**银行账号 */
        bankAccount: string;
        /**接口调用结果 */
        errMsg: string;
    }

    interface LogManager {
        warn(...arg: any): void;
        log(...arg: any): void;
        info(...arg: any): void;
        debug(...arg: any): void;
    }
    // #endregion

}
