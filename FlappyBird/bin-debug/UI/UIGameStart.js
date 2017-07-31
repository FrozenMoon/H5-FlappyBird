var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIGameStart = (function (_super) {
    __extends(UIGameStart, _super);
    function UIGameStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIGameStart.prototype.OnInit = function () {
        this.m_BtnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
    };
    UIGameStart.prototype.onBtnPlay = function () {
        Global.dispatchEvent(GameEvents.GAME_READY);
    };
    return UIGameStart;
}(UIBase));
__reflect(UIGameStart.prototype, "UIGameStart");
//# sourceMappingURL=UIGameStart.js.map