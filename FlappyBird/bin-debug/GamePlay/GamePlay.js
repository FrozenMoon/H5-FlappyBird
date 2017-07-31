var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GamePlay = (function (_super) {
    __extends(GamePlay, _super);
    function GamePlay() {
        var _this = _super.call(this) || this;
        _this.m_TimeScale = 0;
        _this.m_LastTimeEnterFrame = 0;
        _this.m_PipesCount = 4;
        _this.m_Pipes = [];
        return _this;
    }
    GamePlay.Instance = function () {
        if (GamePlay.m_instance == null) {
            GamePlay.m_instance = new GamePlay();
        }
        return GamePlay.m_instance;
    };
    GamePlay.prototype.Init = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.GameLoop, this);
        Functions.AddEventListener(GameEvents.GAME_START, this.OnGameStart, this);
        Functions.AddEventListener(GameEvents.GAME_READY, this.OnGameReady, this);
        Functions.AddEventListener(GameEvents.GAME_PLAY, this.OnGamePlay, this);
        Functions.AddEventListener(GameEvents.GAME_OVER, this.OnGameOver, this);
    };
    GamePlay.prototype.CreateScene = function () {
        // 背景
        this.m_Sky = Functions.createBitmapByName("gameplay_json.bg_day");
        this.addChild(this.m_Sky);
        // 土地
        this.m_Land_1 = Functions.createBitmapByName("gameplay_json.land");
        this.m_Land_1.x = 0;
        this.m_Land_1.y = 400;
        this.addChild(this.m_Land_1);
        this.m_Land_2 = Functions.createBitmapByName("gameplay_json.land");
        this.m_Land_2.x = this.m_Land_2.width - 10;
        this.m_Land_2.y = 400;
        this.addChild(this.m_Land_2);
        // 土地移动
        var tw1 = egret.Tween.get(this.m_Land_1, { loop: true });
        tw1.to({ x: -this.m_Land_1.width }, GameDefine.landMoveTime);
        var tw2 = egret.Tween.get(this.m_Land_2, { loop: true });
        tw2.to({ x: 0 }, GameDefine.landMoveTime);
    };
    GamePlay.prototype.OnGameStart = function () {
        this.m_GameState = GameDefine.GAME_STATE.GameStart;
        Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGameStart);
        this.CreateScene();
    };
    GamePlay.prototype.OnGameReady = function () {
        this.m_GameState = GameDefine.GAME_STATE.GameReady;
        Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameStart);
        Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameOver);
        Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGameReady);
        // 小鸟
        if (this.m_Player == null) {
            this.m_Player = new Player();
            this.m_Player.Init();
        }
        else {
            this.m_Player.ResetPos();
        }
        // 水管
        if (this.m_Pipes[1] == null) {
            this.m_Pipes[1] = Functions.createBitmapByName("gameplay_json.pipe_up");
            this.addChildAt(this.m_Pipes[1], 1);
            this.m_Pipes[2] = Functions.createBitmapByName("gameplay_json.pipe_down");
            this.addChildAt(this.m_Pipes[2], 1);
            this.m_Pipes[3] = Functions.createBitmapByName("gameplay_json.pipe_up");
            this.addChildAt(this.m_Pipes[3], 1);
            this.m_Pipes[4] = Functions.createBitmapByName("gameplay_json.pipe_down");
            this.addChildAt(this.m_Pipes[4], 1);
        }
        this.m_Pipes[1].x = GlobalConfig.curWidth() - (this.m_Pipes[1].width / 2);
        this.m_Pipes[1].y = Functions.RandomNum(GameDefine.PipeMinY, GameDefine.PipeMaxY);
        this.m_Pipes[2].x = this.m_Pipes[1].x;
        this.m_Pipes[2].y = this.m_Pipes[1].y - GameDefine.PipeDistance - this.m_Pipes[2].height;
        this.m_Pipes[3].x = this.m_Pipes[1].x + (GlobalConfig.curWidth() / 2) + (this.m_Pipes[1].width / 2);
        this.m_Pipes[3].y = Functions.RandomNum(GameDefine.PipeMinY, GameDefine.PipeMaxY);
        this.m_Pipes[4].x = this.m_Pipes[3].x;
        this.m_Pipes[4].y = this.m_Pipes[3].y - GameDefine.PipeDistance - this.m_Pipes[3].height;
        egret.Tween.resumeTweens(this.m_Land_1);
        egret.Tween.resumeTweens(this.m_Land_2);
    };
    GamePlay.prototype.OnGamePlay = function () {
        this.m_GameState = GameDefine.GAME_STATE.GamePlay;
        Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameReady);
        Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGamePlay);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTap, this);
    };
    GamePlay.prototype.OnGameOver = function () {
        this.m_GameState = GameDefine.GAME_STATE.GameOver;
        egret.Tween.pauseTweens(this.m_Land_1);
        egret.Tween.pauseTweens(this.m_Land_2);
        Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGamePlay);
        Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGameOver);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnGamePlay, this);
    };
    GamePlay.prototype.GameLoop = function (e) {
        var nowTime = egret.getTimer();
        var timeEnterFrame = nowTime;
        this.m_TimeScale = timeEnterFrame - this.m_LastTimeEnterFrame;
        var state = this.m_GameState;
        if (state == GameDefine.GAME_STATE.GamePlay) {
            for (var i = 1; i <= this.m_PipesCount; ++i) {
                this.m_Pipes[i].x -= this.m_TimeScale * GameDefine.PipeMoveSpeed;
            }
            for (var i = 1; i <= this.m_PipesCount; ++i) {
                this.PipeMove(i);
            }
        }
        this.m_LastTimeEnterFrame = nowTime;
    };
    GamePlay.prototype.PipeMove = function (indexPipe) {
        if (indexPipe % 2 == 0 && this.m_Pipes[indexPipe].x <= -this.m_Pipes[indexPipe].width) {
            this.m_Pipes[indexPipe - 1].x = GlobalConfig.curWidth();
            ;
            this.m_Pipes[indexPipe - 1].y = Functions.RandomNum(GameDefine.PipeMinY, GameDefine.PipeMaxY);
            this.m_Pipes[indexPipe].x = GlobalConfig.curWidth();
            ;
            this.m_Pipes[indexPipe].y = this.m_Pipes[indexPipe - 1].y - GameDefine.PipeDistance - this.m_Pipes[indexPipe].height;
        }
    };
    GamePlay.prototype.GamePause = function () {
    };
    GamePlay.prototype.GameResume = function () {
        this.m_LastTimeEnterFrame = egret.getTimer();
    };
    GamePlay.prototype.OnTap = function () {
        Functions.DispatchEvent(GameEvents.GAME_OVER);
    };
    return GamePlay;
}(egret.DisplayObjectContainer));
__reflect(GamePlay.prototype, "GamePlay");
//# sourceMappingURL=GamePlay.js.map