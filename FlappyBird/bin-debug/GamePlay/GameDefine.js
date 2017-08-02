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
})(GameDefine || (GameDefine = {}));
//# sourceMappingURL=GameDefine.js.map