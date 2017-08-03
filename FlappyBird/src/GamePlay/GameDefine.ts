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
	export var BirdFlyHeight 	: number = 50;
	export var BirdX 			: number = 50;
	export var BirdY 			: number = 150;

	export var P2Factor 		: number = 50;

	///////////////////////////////////////////
	export var StoregeKeyMaxScore  : string = "StoregeKeyMaxScore";
}

module UIDefine 
{
	export enum PanelID 
	{
		UIGameStart = 1,
		UIGameReady,
		UIGamePlay,
		UIGameOver,
		Max,
	}
}