module GameDefine 
{
	export enum GAME_STATE 
	{
		GameStart = 1,
		GameReady,
		GamePlay,
        GameOver,
	}

	export var landMoveTime 	: number = 3000;

	export var PipeMoveSpeed 	: number = 0.1;
	export var PipeDistance 	: number = 120;
	export var PipeMinY 		: number = 140;
	export var PipeMaxY 		: number = 370;

	export var BirdFlyTime 		: number = 300;
	export var BirdFlyHeight 	: number = 60;
	export var BirdX 			: number = 50;
	export var BirdY 			: number = 200;

	export var ShareTimes       : number = 5;

	///////////////////////////////////////////
	export var StoregeKeyMaxScore  : string = "StoregeKeyMaxScore";
	export var StoregeKeyGameTimes : string = "StoregeKeyGameTimes";
}

module UIDefine 
{
	export enum PanelID 
	{
		UIGameStart = 1,
		UIGameReady,
		UIGamePlay,
		UIGameOver,
		UIGameShare,
		Max,
	}
}