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

	export var PipeMoveSpeed : number = 0.08;

	export var PipeDistance : number = 100;

	export var PipeMinY : number = 136;
	export var PipeMaxY : number = 364;

}