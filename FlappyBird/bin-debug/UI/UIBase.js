var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIBase = (function (_super) {
    __extends(UIBase, _super);
    function UIBase() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.Init, _this);
        return _this;
    }
    UIBase.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    UIBase.prototype.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    UIBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    UIBase.prototype.Init = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.Init, this);
        // 默认是全屏居中的布局，需要自定义可在OnInit()修改
        //this.horizontalCenter = 0;
        //this.verticalCenter = 0;
        //this.width = GlobalConfig.curWidth();
        //this.height = GlobalConfig.curHeight();
        this.OnInit();
    };
    UIBase.prototype.OnInit = function () {
    };
    UIBase.prototype.OnOpen = function () {
    };
    UIBase.prototype.OnClose = function () {
    };
    return UIBase;
}(eui.Component));
__reflect(UIBase.prototype, "UIBase", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=UIBase.js.map