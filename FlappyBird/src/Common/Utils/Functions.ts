 /**
	* 游戏公用方法汇总
	* by dily modify by frozenmoon 201708
	* (c) copyright 2014 - 2035
	* All Rights Reserved. 
	* 使用方法如：Global.setCookie()
    */

module Functions {
	 /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    export function createBitmapByName(name: string): egret.Bitmap 
	{
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

	 //写入数据
    export function writeLocalData(key: string,value: string) {
        egret.localStorage.setItem(key,value);
    }
    //读取数据
    export function readLocalData(key: string,defaultValue?: string): string {
        if(defaultValue == undefined || defaultValue == null) defaultValue = "";
        var value = egret.localStorage.getItem(key);
        return (value == "" || value == undefined || value == null) ? defaultValue : value;
    }
	export function readLocalNumberData(key: string,defaultValue?: number): number {
        if(defaultValue == undefined || defaultValue == null) defaultValue = 0;
        var value = egret.localStorage.getItem(key);
		return (value == "" || value == undefined || value == null) ? defaultValue : parseInt(value);
    }
    //移除数据
    export function removeLocalData(key:string){
        egret.localStorage.removeItem(key);
    }

	//新建事件
	export function Event(type:string, obj:Object = null, bubbles:boolean = false, cancelable:boolean = false):egret.Event
	{ 
		 return new lcp.LEvent(type,obj,bubbles,cancelable); 
	}

	//派发事件
	export function DispatchEvent(type:string, obj:Object = null, bubbles:boolean = false, cancelable:boolean = false):void
	{ 	
		var event = new lcp.LEvent(type,obj,bubbles,cancelable);
		lcp.LListener.getInstance().dispatchEvent(event);
	}

	//监听事件
	export function AddEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false, priority:number = 0):void
	{ 
		lcp.LListener.getInstance().addEventListener(type,listener,thisObject,useCapture,priority);
	}

	//移除事件
	export function RemoveEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false):void
	{ 
		lcp.LListener.getInstance().removeEventListener(type,listener,thisObject,useCapture);
	}

	/**
     * 生成范围随机数
     * @param Min 
     * @param Max 
     */
    export function RandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入       
        return num;
    }

	/**
    * 获取以当前时间戳为参数的版本控制
    */
    export function GetVersionByTime() {
        var timestamp = new Date().getTime();
		return "?v=" + String(timestamp);
    }

	/**
    * 获取以当前版本号为参数的版本控制
    */
    export function GetVersionByVersion(Min, Max) {
		return "?v=" + window["version"];
    }
}