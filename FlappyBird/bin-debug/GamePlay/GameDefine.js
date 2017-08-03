var GameDefine;
(function (GameDefine) {
    var GAME_STATE;
    (function (GAME_STATE) {
        GAME_STATE[GAME_STATE["GameStart"] = 1] = "GameStart";
        GAME_STATE[GAME_STATE["GameReady"] = 2] = "GameReady";
        GAME_STATE[GAME_STATE["GamePlay"] = 3] = "GamePlay";
        GAME_STATE[GAME_STATE["GameOver"] = 4] = "GameOver";
    })(GAME_STATE = GameDefine.GAME_STATE || (GameDefine.GAME_STATE = {}));
    GameDefine.landMoveTime = 3000;
    GameDefine.PipeMoveSpeed = 0.1;
    GameDefine.PipeDistance = 120;
    GameDefine.PipeMinY = 140;
    GameDefine.PipeMaxY = 370;
    GameDefine.BirdFlyTime = 300;
    GameDefine.BirdFlyHeight = 50;
    GameDefine.BirdX = 50;
    GameDefine.BirdY = 150;
    GameDefine.P2Factor = 50;
    ///////////////////////////////////////////
    GameDefine.StoregeKeyMaxScore = "StoregeKeyMaxScore";
})(GameDefine || (GameDefine = {}));
var UIDefine;
(function (UIDefine) {
    var PanelID;
    (function (PanelID) {
        PanelID[PanelID["UIGameStart"] = 1] = "UIGameStart";
        PanelID[PanelID["UIGameReady"] = 2] = "UIGameReady";
        PanelID[PanelID["UIGamePlay"] = 3] = "UIGamePlay";
        PanelID[PanelID["UIGameOver"] = 4] = "UIGameOver";
        PanelID[PanelID["Max"] = 5] = "Max";
    })(PanelID = UIDefine.PanelID || (UIDefine.PanelID = {}));
})(UIDefine || (UIDefine = {}));
//# sourceMappingURL=GameDefine.js.map