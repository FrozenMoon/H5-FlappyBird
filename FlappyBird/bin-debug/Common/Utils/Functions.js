/**
   * 游戏公用方法汇总
   * by dily
   * (c) copyright 2014 - 2035
   * All Rights Reserved.
   * 使用方法如：Global.setCookie()
   */
var Functions;
(function (Functions) {
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    Functions.createBitmapByName = createBitmapByName;
    //新建事件
    function Event(type, obj, bubbles, cancelable) {
        if (obj === void 0) { obj = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return new lcp.LEvent(type, obj, bubbles, cancelable);
    }
    Functions.Event = Event;
    //派发事件
    function DispatchEvent(type, obj, bubbles, cancelable) {
        if (obj === void 0) { obj = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var event = new lcp.LEvent(type, obj, bubbles, cancelable);
        lcp.LListener.getInstance().dispatchEvent(event);
    }
    Functions.DispatchEvent = DispatchEvent;
    //监听事件
    function AddEventListener(type, listener, thisObject, useCapture, priority) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        lcp.LListener.getInstance().addEventListener(type, listener, thisObject, useCapture, priority);
    }
    Functions.AddEventListener = AddEventListener;
    //移除事件
    function RemoveEventListener(type, listener, thisObject, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        lcp.LListener.getInstance().removeEventListener(type, listener, thisObject, useCapture);
    }
    Functions.RemoveEventListener = RemoveEventListener;
    /**
     * 生成范围随机数
     * @param Min
     * @param Max
     */
    function RandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入       
        return num;
    }
    Functions.RandomNum = RandomNum;
    //多平台分享组件主要针对 微信、微博、qqzone、qq
    //一键分享到新浪微博、腾讯微博、qq空间等代码
    function shareUtils(name) {
        var title = GlobalConfig.desc;
        var shareUrl = GlobalConfig.link;
        var imgUrl = GlobalConfig.imgUrl;
        var desc = GlobalConfig.title;
        if (name == "weibo") {
            //分享到新浪微博
            var url = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + shareUrl + '&content=utf-8&sourceUrl=' + shareUrl + '&pic=' + imgUrl;
            window.open(url);
        }
        else if (name == "txmicroblog") {
            //分享到腾讯微博
            var url = 'http://v.t.qq.com/share/share.php?title=' + title + '&url=' + shareUrl + '&pic=' + imgUrl;
            window.open(url);
        }
        else if (name == "qzone") {
            //分享到QQ空间
            var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + shareUrl + '&pics=' + imgUrl;
            window.open(url);
        }
        else if (name == "qq") {
            var url = 'http://connect.qq.com/widget/shareqq/index.html?title=' + title + '&url=' + shareUrl + '&pic=' + imgUrl;
            window.open(url);
        }
        else if (name == "renren") {
            var url = 'http://share.renren.com/share/buttonshare.do?link=' + shareUrl + '&title=' + title;
            window.open(url);
        }
        else if (name == "kaixin") {
            var url = 'http://www.kaixin001.com/repaste/share.php?rurl=' + shareUrl + '&rcontent=' + title;
            window.open(url);
        }
        else if (name == "douban") {
            var url = 'http://www.douban.com/recommend/?url=' + shareUrl + '&title=' + title;
            window.open(url);
        }
        else if (name == "tieba") {
            var url = 'http://tieba.baidu.com/f/commit/share/openShareApi?url=' + shareUrl + '&title=' + title;
            window.open(url);
        }
    }
    Functions.shareUtils = shareUtils;
})(Functions || (Functions = {}));
//# sourceMappingURL=Functions.js.map