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
        _this.m_TimeDrop = 0;
        _this.m_LastTimeEnterFrame = 0;
        _this.m_PipesCount = 4;
        _this.m_Pipes = [];
        _this.m_MaxScore = 0;
        _this.m_NowScore = 0;
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
        // TODO p2的使用不熟悉，以后再考虑加入
        this.m_pWorld = new p2.World({ gravity: [0, 9.82] });
        this.m_pWorld.sleepMode = p2.World.BODY_SLEEPING;
    };
    GamePlay.prototype.OnAddScore = function () {
        this.m_NowScore += 1;
    };
    GamePlay.prototype.AddWorld = function (body) {
        this.m_pWorld.addBody(body);
    };
    GamePlay.prototype.CreateScene = function () {
        // 背景
        this.m_Sky = Functions.createBitmapByName("gameplay_json.bg_day");
        this.addChild(this.m_Sky);
        // 土地
        this.m_Land_1 = Functions.createBitmapByName("gameplay_json.land");
        this.m_Land_1.x = 0;
        this.m_Land_1.y = this.m_Sky.height - this.m_Land_1.height;
        this.addChild(this.m_Land_1);
        this.m_Land_2 = Functions.createBitmapByName("gameplay_json.land");
        this.m_Land_2.x = this.m_Land_2.width - 10;
        this.m_Land_2.y = this.m_Sky.height - this.m_Land_1.height;
        this.addChild(this.m_Land_2);
        //创建调试试图
        this.m_debugDraw = new p2DebugDraw(this.m_pWorld);
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.m_debugDraw.setSprite(sprite);
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
        this.m_MaxScore = Math.max(this.m_NowScore, Functions.readLocalNumberData(GameDefine.StoregeKeyMaxScore));
        this.m_NowScore = 0;
        Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameStart);
        Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameOver);
        Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGameReady);
        // 小鸟
        if (this.m_Player == null) {
            this.m_Player = new Player();
            this.m_Player.Init();
        }
        else {
            this.m_Player.GetMC().play(-1);
            this.m_Player.SetPos(GameDefine.BirdX, GameDefine.BirdY);
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
        this.m_TimeDrop = 0;
        Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameReady);
        Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGamePlay);
    };
    GamePlay.prototype.OnGameOver = function () {
        this.m_GameState = GameDefine.GAME_STATE.GameOver;
        var sound = RES.getRes("AudioHit_mp3");
        sound.play(0, 1);
        this.m_Player.GetMC().stop();
        egret.Tween.pauseTweens(this.m_Land_1);
        egret.Tween.pauseTweens(this.m_Land_2);
        Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGamePlay);
        var timer = new egret.Timer(1000, 1);
        timer.once(egret.TimerEvent.TIMER_COMPLETE, this.OnGameOverScore, this);
        timer.start();
    };
    GamePlay.prototype.OnGameOverScore = function () {
        Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGameOver);
    };
    GamePlay.prototype.GameLoop = function (e) {
        var nowTime = egret.getTimer();
        var timeEnterFrame = nowTime;
        this.m_TimeScale = timeEnterFrame - this.m_LastTimeEnterFrame;
        var state = this.m_GameState;
        this.m_pWorld.step(60 / 1000);
        if (state == GameDefine.GAME_STATE.GamePlay) {
            for (var i = 1; i <= this.m_PipesCount; ++i) {
                this.PipeMove(i);
            }
            // 小鸟下降
            var birdY = this.m_Player.GetMC().y;
            var birdX = this.m_Player.GetMC().x;
            this.BirdMove();
            var birdMaxY = this.m_Land_1.y - this.m_Player.GetMC().height - 10;
            if (birdY >= birdMaxY) {
                Functions.DispatchEvent(GameEvents.GAME_OVER);
            }
            // 碰撞柱子
            var rectBird = new egret.Rectangle(birdX, birdY, this.m_Player.GetMC().width, this.m_Player.GetMC().height);
            for (var i = 1; i <= this.m_PipesCount; ++i) {
                var isCrash = this.CheckPipeCrash(rectBird, this.m_Pipes[i]);
                if (isCrash) {
                    Functions.DispatchEvent(GameEvents.GAME_OVER);
                    break;
                }
            }
            // 得分
            if (this.CheckScore(rectBird, this.m_Pipes[1])) {
                Functions.DispatchEvent(GameEvents.ADD_SCORE, 1);
            }
            if (this.CheckScore(rectBird, this.m_Pipes[3])) {
                Functions.DispatchEvent(GameEvents.ADD_SCORE, 3);
            }
        }
        else if (state == GameDefine.GAME_STATE.GameOver) {
            this.BirdMove();
        }
        this.m_debugDraw.drawDebug();
        this.m_LastTimeEnterFrame = nowTime;
    };
    GamePlay.prototype.CheckPipeCrash = function (rectBird, pipi) {
        var isCrash = false;
        var rect = new egret.Rectangle(pipi.x, pipi.y, pipi.width, pipi.height);
        isCrash = rectBird.intersects(rect);
        return isCrash;
    };
    GamePlay.prototype.CheckScore = function (rectBird, pipi) {
        var isScore = false;
        var rectScore = new egret.Rectangle(pipi.x + pipi.width / 2, pipi.y - GameDefine.PipeDistance, pipi.width / 2, GameDefine.PipeDistance);
        isScore = rectBird.intersects(rectScore);
        return isScore;
    };
    // 模拟重力 h = vt + g * t / 2
    GamePlay.prototype.BirdMove = function () {
        var birdY = this.m_Player.GetMC().y;
        var birdX = this.m_Player.GetMC().x;
        this.m_TimeDrop += this.m_TimeScale;
        birdY += (this.m_TimeDrop / 800) * (this.m_TimeDrop / 800) * 9.8 / 2;
        var birdMaxY = this.m_Land_1.y - this.m_Player.GetMC().height - 10;
        if (birdY >= birdMaxY) {
            birdY = birdMaxY;
        }
        this.m_Player.SetPos(birdX, birdY);
    };
    GamePlay.prototype.PipeMove = function (indexPipe) {
        this.m_Pipes[indexPipe].x -= this.m_TimeScale * GameDefine.PipeMoveSpeed;
        if (indexPipe % 2 == 0 && this.m_Pipes[indexPipe].x <= -this.m_Pipes[indexPipe].width) {
            this.m_Pipes[indexPipe - 1].x = GlobalConfig.curWidth();
            this.m_Pipes[indexPipe - 1].y = Functions.RandomNum(GameDefine.PipeMinY, GameDefine.PipeMaxY);
            this.m_Pipes[indexPipe].x = GlobalConfig.curWidth();
            this.m_Pipes[indexPipe].y = this.m_Pipes[indexPipe - 1].y - GameDefine.PipeDistance - this.m_Pipes[indexPipe].height;
        }
    };
    GamePlay.prototype.GamePause = function () {
    };
    GamePlay.prototype.GameResume = function () {
        this.m_LastTimeEnterFrame = egret.getTimer();
    };
    return GamePlay;
}(egret.DisplayObjectContainer));
__reflect(GamePlay.prototype, "GamePlay");
//# sourceMappingURL=GamePlay.js.map