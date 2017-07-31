  /**
	* 游戏公用方法汇总
	* by dily
	* (c) copyright 2014 - 2035
	* All Rights Reserved. 
	* 使用方法如：Global.setCookie()
    */

module Global {

	// 在游戏初始化的地方增加如下代码
	// this.stage.addChild(GameConfig.gameScene());

	//新建事件
	export function Event(type:string, obj:Object = null, bubbles:boolean = false, cancelable:boolean = false):egret.Event
	{ 
		 return new lcp.LEvent(type,obj,bubbles,cancelable); 
	}

	//派发事件
	export function dispatchEvent(type:string, obj:Object = null, bubbles:boolean = false, cancelable:boolean = false):void
	{ 	
		var event = new lcp.LEvent(type,obj,bubbles,cancelable);
		lcp.LListener.getInstance().dispatchEvent(event);
	}

	//监听事件
	export function addEventListener(type:string,listener:Function,thisObject:any,useCapture:boolean=false,priority:number=0):void
	{ 
		lcp.LListener.getInstance().addEventListener(type,listener,thisObject,useCapture,priority);
	}
	
	//多平台分享组件主要针对 微信、微博、qqzone、qq
	//一键分享到新浪微博、腾讯微博、qq空间等代码
	export function shareUtils(name:string):void
	{ 
		var title = GlobalConfig.desc;
		var shareUrl = GlobalConfig.link;
		var imgUrl = GlobalConfig.imgUrl;
		var desc = GlobalConfig.title;
		if(name == "weibo"){
		    //分享到新浪微博
			var url:string='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+shareUrl+'&content=utf-8&sourceUrl='+shareUrl+'&pic='+imgUrl;
			window.open(url);
		}else if(name == "txmicroblog"){
			//分享到腾讯微博
			var url:string='http://v.t.qq.com/share/share.php?title='+title+'&url='+shareUrl+'&pic='+imgUrl;
			window.open(url);
		}else if(name == "qzone"){
			//分享到QQ空间
			var url:string='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+shareUrl+'&pics='+imgUrl;
			window.open(url);
		}else if(name == "qq"){
			var url:string='http://connect.qq.com/widget/shareqq/index.html?title='+title+'&url='+shareUrl+'&pic='+imgUrl;
			window.open(url);
		}else if(name == "renren"){//没有图片
			var url='http://share.renren.com/share/buttonshare.do?link='+shareUrl+'&title='+title;
			window.open(url);
		}else if(name == "kaixin"){//没有图片   ---暂时不支持 用户量太低
			var url='http://www.kaixin001.com/repaste/share.php?rurl='+shareUrl+'&rcontent='+title;
			window.open(url);
		}else if(name == "douban"){//没有图片
			var url='http://www.douban.com/recommend/?url='+shareUrl+'&title='+title;
			window.open(url);
		}else if(name == "tieba"){
			var url='http://tieba.baidu.com/f/commit/share/openShareApi?url='+shareUrl+'&title='+title;
			window.open(url);
		}
	} 
}