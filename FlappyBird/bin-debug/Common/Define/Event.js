// 注意不能重名
var GameEvents;
(function (GameEvents) {
    // 游戏状态
    GameEvents.GAME_READY = "GameEventsGameReady";
    GameEvents.GAME_START = "GameEventsGameStart";
    GameEvents.GAME_PLAY = "GameEventsGamePlay";
    GameEvents.GAME_OVER = "GameEventsGameOver";
    // 游戏逻辑
    GameEvents.ADD_SCORE = "GameEventsAddScore";
    GameEvents.TAP_BIRD = "GameEventsTapBird";
})(GameEvents || (GameEvents = {}));
var UIEvents;
(function (UIEvents) {
    UIEvents.OPEN_PANEL = "UIEventsOpenPanel";
    UIEvents.CLOSE_PANEL = "UIEventsUiClosePanel";
})(UIEvents || (UIEvents = {}));
//# sourceMappingURL=Event.js.map