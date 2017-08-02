var GlobalConfig;
(function (GlobalConfig) {
    /*********************分享全局变量**********************/
    //title
    GlobalConfig.title = "";
    //desc
    GlobalConfig.desc = "";
    //link
    GlobalConfig.link = "";
    //imgUrl
    GlobalConfig.imgUrl = "";
    //是否调试显示帧频
    // 以下语句写在游戏初始化方法里
    // if(GameConfig.isDebug){
    //     egret.Profiler.getInstance().run();
    // }
    GlobalConfig.isDebug = false;
    //是否在线
    GlobalConfig.isOnLine = navigator.onLine;
    //全局字体颜色表--可以扩展
    GlobalConfig.TextColors = {
        white: 0xFFFFFF,
        milkWhite: 0xfbf1af,
        grayWhite: 0xceb6a2,
        yellow: 0xffff00,
        lightYellow: 0xffd375,
        orangeYellow: 0xff9900,
        red: 0xf11300,
        green: 0x00e500,
        blue: 0x1a94d7,
        grayBlue: 0x2f5177,
        purple: 0xe938f2,
        pink: 0xFF3030,
        black: 0x2e2d2d,
        golden: 0xFFD700 //金色
    };
    //全局字体大小表--可以扩展
    GlobalConfig.LabelFontSize = {
        littleSize: 12,
        middleSize: 18,
        normalSize: 24,
        bigSize: 36 //大型字体大小
    };
    //是不是微信浏览
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (microStr == "null") {
            return false;
        }
        else if (microStr == "micromessenger") {
            return true;
        }
    }
    GlobalConfig.isWeiXin = isWeiXin;
    //是不是大屏
    function isBigScreen() {
        return (document.body.clientHeight / document.body.clientWidth > 1.32);
    }
    GlobalConfig.isBigScreen = isBigScreen;
    //获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
    function systemType() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        }
        else if (("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        }
        else if (("" + ua.match(/android/i)) == "android") {
            return "android";
        }
        else if (("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        }
        else if (("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        }
        else if (("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        }
        else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        }
        else {
            console.log("未知系统类型");
        }
    }
    GlobalConfig.systemType = systemType;
    //获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
    function platformType() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        }
        else if (("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        }
        else if (("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        }
        else if (("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        }
        else if (("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        }
        else if (("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        }
        else if (("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        }
        else {
            return "other";
        }
    }
    GlobalConfig.platformType = platformType;
    //当前舞台
    function curStage() {
        return egret.MainContext.instance.stage;
    }
    GlobalConfig.curStage = curStage;
    //当前游戏宽度
    function curWidth() {
        return egret.MainContext.instance.stage.stageWidth;
    }
    GlobalConfig.curWidth = curWidth;
    //当前游戏宽度
    function curHeight() {
        return egret.MainContext.instance.stage.stageHeight;
    }
    GlobalConfig.curHeight = curHeight;
    //是横屏还是竖屏
    function isVertical() {
        var angle = window["orientation"];
        if (angle == 90) {
            return false;
        }
        else {
            return true;
        }
    }
    GlobalConfig.isVertical = isVertical;
    /**----------------------------------FAQ:-----------------------------*/
    // 横屏解决方法 by 张宇
    // http://bbs.egret-labs.org/thread-529-1-1.html
    //声音解决方法 by east
    // http://bbs.egret-labs.org/forum.php?mod=viewthread&tid=386&pid=1770&page=1&extra=#pid1770
    //js调用ts的方法
    // document_class 查看egretProperties
    // 在egret_loader中有如下代码：
    // var rootClass;
    // if(document_class){
    //     rootClass = egret.getDefinitionByName(document_class);
    // }
    // var rootContainer = new rootClass();
    // rootContainer就是主ts中的this
    // 在index中直接调用rootContainer就ok了
    //ts调用js的方法
    // 使用如下方法：
    // window["_smq"]
    //上传图片
    // http://a3147972.blog.51cto.com/2366547/1551066
})(GlobalConfig || (GlobalConfig = {}));
//# sourceMappingURL=GlobalConfig.js.map