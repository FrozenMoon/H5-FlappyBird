var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameManager = (function () {
    function GameManager() {
    }
    GameManager.Instance = function () {
        if (GameManager.m_instance == null) {
            GameManager.m_instance = new GameManager();
        }
        return GameManager.m_instance;
    };
    // 管理游戏场景和UI的层级关系
    GameManager.prototype.Init = function (stage) {
        // 初始化模块
        this.m_stage = stage;
        GamePlay.Instance().Init();
        this.m_stage.addChild(GamePlay.Instance());
        UIManager.Instance().Init();
        this.m_stage.addChild(UIManager.Instance());
        // 开始游戏
        Functions.DispatchEvent(GameEvents.GAME_START);
    };
    GameManager.prototype.GamePause = function () {
        GamePlay.Instance().GamePause();
    };
    GameManager.prototype.GameResume = function () {
        GamePlay.Instance().GameResume();
    };
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map