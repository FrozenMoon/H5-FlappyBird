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
    GameDefine.PipeMoveSpeed = 0.08;
    GameDefine.PipeDistance = 100;
    GameDefine.PipeMinY = 136;
    GameDefine.PipeMaxY = 364;
})(GameDefine || (GameDefine = {}));
//# sourceMappingURL=GameDefine.js.map