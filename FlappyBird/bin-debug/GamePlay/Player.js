var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Player = (function () {
    function Player() {
        this.m_mcName = "BirdYellow";
        this.m_mcTexturePath = "resource/assets/animation/BirdYellow.png";
        this.m_mcJsonPath = "resource/assets/animation/BirdYellow.json";
        this.m_isFly = false;
    }
    Player.prototype.Init = function () {
        this.load(this.LoadMCCompeleted);
        Functions.AddEventListener(GameEvents.TAP_BIRD, this.OnTap, this);
    };
    Player.prototype.LoadMCCompeleted = function () {
        var mcDataFactory = new egret.MovieClipDataFactory(this.m_mcData, this.m_mcTexture);
        var mcData = mcDataFactory.generateMovieClipData(this.m_mcName);
        this.m_mc = new egret.MovieClip(mcData);
        GamePlay.Instance().addChild(this.m_mc);
        this.m_mc.play(-1);
        this.SetPos(GameDefine.BirdX, GameDefine.BirdY);
    };
    Player.prototype.load = function (callback) {
        var count = 0;
        var self = this;
        var check = function () {
            count++;
            if (count == 2) {
                callback.call(self);
            }
        };
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this.m_mcTexture = loader.data;
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest(this.m_mcTexturePath);
        loader.load(request);
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this.m_mcData = JSON.parse(loader.data);
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest(this.m_mcJsonPath);
        loader.load(request);
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
        tw1.to({ y: this.m_mc.y - GameDefine.BirdFlyHeight }, GameDefine.BirdFlyTime);
        GamePlay.Instance().m_TimeDrop = 0;
    };
    return Player;
}());
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map