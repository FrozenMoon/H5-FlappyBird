var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Player = (function () {
    function Player() {
        this.m_mcName = "BirdYellow";
        this.m_mcTexturePath = "BirdYellow_png";
        this.m_mcJsonPath = "BirdYellow_json";
        this.m_isFly = false;
    }
    Player.prototype.Init = function () {
        this.m_mc = MCFactory.Instance().getMovieClip(this.m_mcJsonPath, this.m_mcTexturePath, this.m_mcName);
        GamePlay.Instance().addChild(this.m_mc);
        this.m_mc.play(-1);
        this.SetPos(GameDefine.BirdX, GameDefine.BirdY);
        Functions.AddEventListener(GameEvents.TAP_BIRD, this.OnTap, this);
    };
    Player.prototype.SetPos = function (x, y) {
        this.m_mc.x = x;
        this.m_mc.y = y;
    };
    Player.prototype.GetMC = function () {
        return this.m_mc;
    };
    Player.prototype.OnTap = function () {
        this.m_isFly = true;
        egret.Tween.removeTweens(this.m_mc);
        var tw1 = egret.Tween.get(this.m_mc);
        tw1.to({ y: this.m_mc.y - GameDefine.BirdFlyHeight, rotation: -45 }, GameDefine.BirdFlyTime);
        GamePlay.Instance().m_TimeDrop = 0;
        var sound = RES.getRes("AudioJump_mp3");
        sound.play(0, 1);
    };
    return Player;
}());
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map