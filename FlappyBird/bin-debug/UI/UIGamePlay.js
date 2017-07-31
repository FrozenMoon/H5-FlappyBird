var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIGamePlay = (function (_super) {
    __extends(UIGamePlay, _super);
    function UIGamePlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIGamePlay.prototype.OnInit = function () {
        this.m_LabelScore.touchEnabled = false;
        this.m_LabelScore.text = "0";
        Functions.AddEventListener(GameEvents.ADD_SCORE, this.OnAddScore, this);
        this.m_Main.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTap, this);
    };
    UIGamePlay.prototype.OnAddScore = function (event) {
        var nNowScore = parseInt(this.m_LabelScore.text);
        var nAddScore = event.param;
        nNowScore += nAddScore;
        this.m_LabelScore.text = String(nNowScore);
    };
    UIGamePlay.prototype.OnTap = function () {
        Functions.DispatchEvent(GameEvents.GAME_OVER);
    };
    return UIGamePlay;
}(UIBase));
__reflect(UIGamePlay.prototype, "UIGamePlay");
//# sourceMappingURL=UIGamePlay.js.map