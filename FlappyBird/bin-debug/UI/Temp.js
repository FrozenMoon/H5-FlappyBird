var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Temp = (function (_super) {
    __extends(Temp, _super);
    function Temp() {
        return _super.call(this) || this;
    }
    Temp.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Temp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return Temp;
}(eui.Component));
__reflect(Temp.prototype, "Temp", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Temp.js.map