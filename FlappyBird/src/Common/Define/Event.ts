// 注意不能重名

module GameEvents {
	// 游戏状态
	export var GAME_READY : string = "GameEventsGameReady";
	export var GAME_START : string = "GameEventsGameStart";
	export var GAME_PLAY  : string = "GameEventsGamePlay";
	export var GAME_OVER  : string = "GameEventsGameOver";

	// 游戏逻辑
	export var ADD_SCORE : string = "GameEventsAddScore";
	export var TAP_BIRD  : string = "GameEventsTapBird";
}

module UIEvents {
	export var OPEN_PANEL  : string = "UIEventsOpenPanel";
	export var CLOSE_PANEL : string = "UIEventsUiClosePanel";
}