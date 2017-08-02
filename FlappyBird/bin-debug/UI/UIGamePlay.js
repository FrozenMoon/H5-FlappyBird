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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_Type = 0;
        return _this;
    }
    UIGamePlay.prototype.OnInit = function () {
        Functions.AddEventListener(GameEvents.ADD_SCORE, this.OnAddScore, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTap, this);
        this.OnOpen();
    };
    UIGamePlay.prototype.OnOpen = function () {
        this.m_LabelScore.text = "0";
    };
    UIGamePlay.prototype.OnAddScore = function (event) {
        var nAddType = event.param;
        if (this.m_Type == nAddType) {
            return;
        }
        this.m_Type = nAddType;
        var nNowScore = parseInt(this.m_LabelScore.text);
        this.m_LabelScore.text = String(nNowScore + 1);
    };
    UIGamePlay.prototype.OnTap = function () {
        Functions.DispatchEvent(GameEvents.TAP_BIRD);
    };
    return UIGamePlay;
}(UIBase));
__reflect(UIGamePlay.prototype, "UIGamePlay");
//# sourceMappingURL=UIGamePlay.js.map