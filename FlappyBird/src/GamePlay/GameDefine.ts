module GameDefine 
{
	export enum GAME_STATE 
	{
		GameStart = 1,
		GameReady,
		GamePlay,
        GameOver,
	}

	export var landMoveTime : number = 3000;

	export var BirdFlyTime : number = 500;

	export var PipeMoveSpeed : number = 0.08;

	export var BirdDownSpeed : number = 0.1;

	export var PipeDistance : number = 100;

	export var PipeMinY : number = 136;
	export var PipeMaxY : number = 364;

	export var BirdX : number = 50;
	export var BirdY : number = 150;

}