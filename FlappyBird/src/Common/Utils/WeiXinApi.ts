/**
 * 微信工具类
 * @author chenkai
 * @date 2017/3/1
 * 
 * 微信JSSDK接口测试
 * 1. 分享功能
 * 2. 图片功能
 * 3. 录音功能
 * 4. 音频识别
 * 5. 地理位置
 */
class WeiXinApi extends egret.EventDispatcher{
    /**选择相册图片成功*/
    public static CHOOSE_IMAGE_SUCCESS: string = "CHOOSE_IMAGE_SUCCESS";
    /**上传图片成功*/
    public static UPLOAD_IMAGE_SUCCESS: string = "UPLOAD_IMAGE_SUCCESS";
    /**下载图片成功*/
    public static DOWNLOAD_IMAGE_SUCCESS: string = "DOWNLOAD_IMAGE_SUCCESS";
    /**停止录音*/
    public static STOP_RECORD: string = "STOP_RECORD";
    /**播放录音完毕*/
    public static VOICE_PLAY_END: string = "VOICE_PLAY_END";
    /**上传录音成功*/
    public static UPLOAD_VOICE_SUCCESS: string = "UPLOAD_VOICE_SUCCESS";
    /**下载录音成功*/
    public static DOWNLOAD_VOICE_SUCCESS: string = "DOWNLOAD_VOICE_SUCCESS";
    /**音频识别成功*/
    public static TRANSLATE_VOICE_SUCCESS: string = "TRANSLATE_VOICE_SUCCESS";
    /**获取地理位置成功*/
    public static GET_LOCATION_SUCCESS: string = "GET_LOCATION_SUCCESS";
    
    /**分享标题*/
    public title:string = "飞翔的小鸟";
    /**分享描述*/
    public desc: string = "我已经打败了全球98%的小鸟，快来和我一起挑战吧！";
    /**分享链接*/
    public link:string = "http://ec2-13-229-49-79.ap-southeast-1.compute.amazonaws.com/index.php";
    /**分享图片*/
    public imgUrl: string = "http://ec2-13-229-49-79.ap-southeast-1.compute.amazonaws.com/icon.png";
    
    private static instance:WeiXinApi;
    public static getInstance():WeiXinApi{
    	if(this.instance == null){
        	this.instance = new WeiXinApi();
      }
      return this.instance;
    }
    
    /**
     * 配置微信接口
     * @wxInfo 微信配置信息
     */ 
    public config(wxInfo){
        var bodyConfig: BodyConfig = new BodyConfig();
        bodyConfig.debug = wxInfo.debug;
        bodyConfig.appId = wxInfo.appId;
        bodyConfig.timestamp = wxInfo.timestamp;
        bodyConfig.nonceStr = wxInfo.nonceStr;
        bodyConfig.signature = wxInfo.signature;
        bodyConfig.jsApiList = [
            "onMenuShareTimeline",     //分享朋友圈
            "onMenuShareAppMessage",   //分享好友
            "onMenushareQQ",           //分享QQ
            "onMenuShareWeibo",        //分享腾讯微博
        ];
            
        if(wx) {
            // 通过config接口注入权限验证配置
            wx.config(bodyConfig);
            
            //接口验证失败
            wx.error(function() {
            });
            
            //接口验证成功
            wx.ready(function() {
                WeiXinApi.getInstance().setShareContent();
            });
        }
    }
    
    /**
     * 设置分享内容
     * @title 分享标题(用于标题显示得分)
     */ 
    public setShareContent(title:string = this.title){
        this.shareTimeLine(title);    //朋友圈
        this.shareAppMessage(title);  //好友
        this.shareQQ(title);          //QQ空间
        this.shareWeiBo(title);       //微博
    }
    
    /**分享朋友圈*/
    private shareTimeLine(title:string){
        var body: BodyMenuShareTimeline = new BodyMenuShareTimeline();
        body.title = GlobalConfig.title;
        body.imgUrl = GlobalConfig.imgUrl + Functions.GetVersionByTime();
        body.link = GlobalConfig.linkUrl + Functions.GetVersionByTime();
        //分享成功
        body.success = function() {
            
        }
        //分享失败
        body.fail = function(){
            
        }
        //分享撤销
        body.cancel = function(){
            
        }
        wx.onMenuShareTimeline(body);
    }
    
    /**分享好友*/
    private shareAppMessage(title:string){
        var bodyFriend: BodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyFriend.title = GlobalConfig.title;
        bodyFriend.desc = GlobalConfig.desc;
        bodyFriend.imgUrl = GlobalConfig.imgUrl + Functions.GetVersionByTime();
        bodyFriend.link = GlobalConfig.linkUrl + Functions.GetVersionByTime();
        bodyFriend.success = function(){

        }
        wx.onMenuShareAppMessage(bodyFriend);
    }
    
    /**分享QQ空间*/
    private shareQQ(title:string){
        var bodyQQ:BodyMenuShareQQ = new BodyMenuShareQQ();
        bodyQQ.title = GlobalConfig.title;
        bodyQQ.desc = GlobalConfig.desc;
        bodyQQ.link = GlobalConfig.linkUrl + Functions.GetVersionByTime();
        bodyQQ.imgUrl = GlobalConfig.imgUrl + Functions.GetVersionByTime();
        bodyQQ.success = function() {
        }
        wx.onMenuShareQQ(bodyQQ);
    }
    
    /**分享微博*/
    private shareWeiBo(title:string){
        var bodyWeiBo:BodyMenuShareWeibo = new BodyMenuShareWeibo();
        bodyWeiBo.title = GlobalConfig.title;
        bodyWeiBo.desc = GlobalConfig.desc;
        bodyWeiBo.link = GlobalConfig.linkUrl + Functions.GetVersionByTime();
        bodyWeiBo.imgUrl = GlobalConfig.imgUrl + Functions.GetVersionByTime();
        wx.onMenuShareWeibo(bodyWeiBo);
    }
    
    /**打开相册，选择图片*/
    public chooseImg(){
        //选择相册图片
        var chooseImageBody = {
        count: 1, // 最多选择几张图片，默认9
        sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album','camera'],      // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                WeiXinApi.getInstance().dispatchEventWith(WeiXinApi.CHOOSE_IMAGE_SUCCESS, false, localIds);
            },
            fail: function() {
                
            }
        };
        wx.chooseImage(chooseImageBody);
    }
    
    /**预览图片*/
    public previewImage(){
        var previewImage = {
            current: '', // 当前显示图片的http链接
            urls: []     // 需要预览的图片http链接列表
        }
    }
    
    /**
     * 上传图片
     * @localId 需要上传图片的本地ID
     */ 
    public uploadImage(localId){
        wx.uploadImage({
            localId: localId,      // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                WeiXinApi.getInstance().dispatchEventWith(WeiXinApi.UPLOAD_IMAGE_SUCCESS, false, serverId);
            }
        });
    }
    
    /**
     * 下载图片
     * @serverId 下载图片的服务器地址
     */ 
    public downloadImage(serverId){
        wx.downloadImage({
            serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
                var localId = res.localId; // 返回图片下载后的本地ID
                WeiXinApi.getInstance().dispatchEventWith(WeiXinApi.DOWNLOAD_IMAGE_SUCCESS,false,localId);
            }
        });
    }
    
    /**开始录音*/
    public startRecord(){
        wx.startRecord({});
        
        //监听录音超时
        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function(res) {
                var localId = res.localId;
                WeiXinApi.getInstance().dispatchEventWith(WeiXinApi.STOP_RECORD, false, localId);
            }
        });
    }
    
    /**停止录音*/
    public stopRecord(){
        wx.stopRecord({
            success: function(res) {
                var localId = res.localId;  //本地录音id
                WeiXinApi.getInstance().dispatchEventWith(WeiXinApi.STOP_RECORD, false, localId);
            }
        });
    }
    
    /**
     * 播放录音
     * @localId 录音本地id
     */ 
    public playVoice(localId){
        wx.playVoice({
            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
        });
        
        //监听录音播放完毕
        wx.onVoicePlayEnd({
            success: function(res) {
                var localId = res.localId; // 返回音频的本地ID
                WeiXinApi.getInstance().dispatchEventWith(WeiXinApi.VOICE_PLAY_END, false, localId);
            }
        });
    }
    
    /**
     * 暂停播放录音
     * @localId 录音id
     */ 
    public pauseVoice(localId){
       wx.pauseVoice({
           localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
        }); 
    }
    
    /**
     * 停止播放录音
     * @localId 录音id
     */ 
    public stopVoice(localId){
        wx.stopVoice({
            localId: localId // 需要停止的音频的本地ID，由stopRecord接口获得
        });
    }
    
    /**
     * 上传录音
     * @localId
     */ 
    public uploadVoice(localId){
        wx.uploadVoice({
            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
                var serverId = res.serverId; // 返回音频的服务器端ID
                WeiXinApi.getInstance().dispatchEventWith(WeiXinApi.UPLOAD_VOICE_SUCCESS, false, serverId);
            }
        });
    }
    
    /**
     * 下载录音
     * @serverId 录音服务器id
     */ 
    public downloadVocie(serverId){
        wx.downloadVoice({
            serverId: serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
                var localId = res.localId; // 返回音频的本地ID
                WeiXinApi.getInstance().dispatchEventWith(WeiXinApi.DOWNLOAD_VOICE_SUCCESS, false, localId);
            }
        });
    }
    
    /**
     * 音频识别
     * @localId 本地录音id
     */ 
    public translateVoice(localId){
        wx.translateVoice({
            localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
                //音频识别结果
                var result = res.translateResult;
                WeiXinApi.getInstance().dispatchEventWith(WeiXinApi.TRANSLATE_VOICE_SUCCESS,false,result);
            }
        });
    }
    
    /**
     * 微信内置地图查看位置接口
     * @latitude
     * @longitude
     * @name
     * @address
     * @scale
     * @infoUrl
     */ 
    public openLocation(latitude = 0,longitude = 0,name = '',address = '',scale = 28,infoUrl = ''){
        wx.openLocation({
            latitude: latitude,   // 纬度，浮点数，范围为90 ~ -90
            longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
            name: name,           // 位置名
            address: address,     // 地址详情说明
            scale: scale,         // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: infoUrl      // 在查看位置界面底部显示的超链接,可点击跳转
        });
    }
    
    /**
     * 获取地理位置
     * @type 位置类型
     */ 
    public getLocation(type = 'wgs84'){
        wx.getLocation({
            type: type, // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function(res) {
                var latitude = res.latitude;   // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed;         // 速度，以米/每秒计
                var accuracy = res.accuracy;   // 位置精度
                WeiXinApi.getInstance().dispatchEventWith(WeiXinApi.GET_LOCATION_SUCCESS,false,res);
            }
        });
    }
}