var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIGameOver = (function (_super) {
    __extends(UIGameOver, _super);
    function UIGameOver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIGameOver.prototype.OnInit = function () {
        this.m_BtnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
    };
    UIGameOver.prototype.OnOpen = function () {
        var maxScore = GamePlay.Instance().m_MaxScore;
        var nowScore = GamePlay.Instance().m_NowScore;
        this.m_LabelBest.text = String(nowScore + "->" + maxScore);
        this.m_LabelScore.text = String(nowScore);
        this.m_ImgNewScore.visible = nowScore > maxScore ? true : false;
        this.m_ImgMedal.source = "UI_json.medals_0";
        if (nowScore > 0)
            this.m_ImgMedal.source = "UI_json.medals_1";
        else if (nowScore > 10)
            this.m_ImgMedal.source = "UI_json.medals_2";
        else if (nowScore > 30)
            this.m_ImgMedal.source = "UI_json.medals_3";
        if (nowScore > maxScore)
            Functions.writeLocalData(GameDefine.StoregeKeyMaxScore, String(nowScore));
        var sound = RES.getRes("AudioDie_mp3");
        sound.play(0, 1);
    };
    UIGameOver.prototype.onBtnPlay = function () {
        Global.dispatchEvent(GameEvents.GAME_READY);
    };
    return UIGameOver;
}(UIBase));
__reflect(UIGameOver.prototype, "UIGameOver");
//# sourceMappingURL=UIGameOver.js.map