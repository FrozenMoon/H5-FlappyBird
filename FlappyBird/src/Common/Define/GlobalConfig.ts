module GlobalConfig {
	/*********************分享全局变量**********************/
	//title
	export var title:string = "飞翔的小鸟";
	//desc
	export var desc:string = "我已经打败了全球97%的小鸟，快来和我一起挑战吧";
	// 根目录
	export var rootUrl:string = "替换为你的分享地址，一般为你项目发布的地址";
	//link 根目录为当前地址
	export var linkUrl:string = rootUrl + "index.php";
	//imgUrl 根目录为当前地址
	export var imgUrl:string = rootUrl + "icon.png";
	
	//是否调试显示帧频
	// 以下语句写在游戏初始化方法里
    // if(GameConfig.isDebug){
    //     egret.Profiler.getInstance().run();
    // }
	export var isDebug : boolean = window["debug"];

	//是否在线
	export var isOnLine : boolean = navigator.onLine;

	export var isSound : boolean = true;

	// 全局字体 UI设计的时候也要选这个字体
	export var defaultFont : string = "Microsoft YaHei";

	//全局字体颜色表--可以扩展
	export var TextColors = {
		white:0xFFFFFF,//白色
		milkWhite:0xfbf1af,//乳白色 
		grayWhite:0xceb6a2,//灰白色
		yellow:0xffff00,//金黄色 
		lightYellow:0xffd375,//淡黄色
		orangeYellow:0xff9900,//橘黄色//道具名称 //玩家姓名
		red:0xf11300,//红色
		green:0x00e500,//绿色 
		blue:0x1a94d7,//蓝色 
		grayBlue:0x2f5177,//墨蓝色 
		purple:0xe938f2,//紫色 
		pink:0xFF3030,//粉色 
		black:0x2e2d2d,//黑色
		golden:0xFFD700 //金色
	}

	//全局字体大小表--可以扩展
	export var LabelFontSize = {
		littleSize:12,//小型字体大小
		middleSize:18,//中型字体大小
		normalSize:24,//正常字体大小
		bigSize:36//大型字体大小
	}

	//是不是微信浏览
	export function isWeiXin():boolean{ 
		var ua = window.navigator.userAgent.toLowerCase(); 
		var microStr = "" + ua.match(/MicroMessenger/i);
		if(microStr == "null"){
			return false;
		}else if(microStr == "micromessenger"){
			return true;
		}
	} 

	//是不是大屏
	export function isBigScreen():boolean{ 
		return (document.body.clientHeight/document.body.clientWidth > 1.32);
	} 

	//获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
	export function systemType():string{ 
		var ua = window.navigator.userAgent.toLowerCase(); 
		var microStr = "" + ua.match(/MicroMessenger/i);
		if(("" + ua.match(/windows nt/i)) == "windows nt"){
			return "windows";
		}else if(("" + ua.match(/iphone/i)) == "iphone"){
			return "ios";
		}else if(("" + ua.match(/android/i)) == "android"){
			return "android";
		}else if(("" + ua.match(/ipad/i)) == "ipad"){
			return "ipad";
		}else if(("" + ua.match(/linux/i)) == "linux"){
			return "linux";
		}else if(("" + ua.match(/mac/i)) == "mac"){
			return "mac";
		}else if(("" + ua.match(/ucbrower/i)) == "ucbrower"){
			return "ucbrower";
		}else{
			console.log("未知系统类型");
		}
	}  

	//获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
	export function platformType():string{ 
		var ua = window.navigator.userAgent.toLowerCase(); 
		if(("" + ua.match(/micromessenger/i)) == "micromessenger"){
			return "micromessenger";
		}else if(("" + ua.match(/qzone/i)) == "qzone"){
			return "qzone";
		}else if(("" + ua.match(/weibo/i)) == "weibo"){
			return "weibo";
		}else if(("" + ua.match(/qq/i)) == "qq"){
			return "qq";
		}else if(("" + ua.match(/renren/i)) == "renren"){
			return "renren";
		}else if(("" + ua.match(/txmicroblog/i)) == "txmicroblog"){
			return "txmicroblog";
		}else if(("" + ua.match(/douban/i)) == "douban"){
			return "douban";
		}else{
			return "other";
		}
	} 

	//当前舞台
	export function curStage():egret.Stage{ 
		return egret.MainContext.instance.stage;
	}

	//当前面板
	export var curPanel:egret.DisplayObjectContainer;

	//当前游戏宽度
	export function curWidth():number
	{ 
		return egret.MainContext.instance.stage.stageWidth;
	}

	//当前游戏宽度
	export function curHeight():number
	{ 
		return egret.MainContext.instance.stage.stageHeight;
	}

	//是横屏还是竖屏
	export function isVertical():boolean
	{ 
		var angle = window["orientation"]; 
		if(angle == 90){
			return false;
		}else{
			return true;
		}
	}

	//获取当前地址
	export function getCurUrl():string {
		return window.location.hostname;
    } 	
}