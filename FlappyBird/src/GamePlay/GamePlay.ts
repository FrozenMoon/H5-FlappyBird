
class GamePlay extends egret.DisplayObjectContainer　
{
	private m_TimeScale 	     : number = 0;
	private m_LastTimeEnterFrame : number = 0;
	private m_PipesCount   		 : number = 4;
	private m_Sky 				 : egret.Bitmap;
	private m_Land_1 			 : egret.Bitmap;
	private m_Land_2 			 : egret.Bitmap;
	private m_Pipes 			 : Array<egret.Bitmap> = [];
	private m_GameState 		 : GameDefine.GAME_STATE;
	private m_Player			 : Player;

	// 单例
	private static m_instance : GamePlay;
	public static Instance() : GamePlay 
	{
		if (GamePlay.m_instance == null)
		{
			GamePlay.m_instance = new GamePlay();
		}
		return GamePlay.m_instance;
	}

	public constructor()
	{
        super();
    }

	public Init():void
	{
		this.addEventListener(egret.Event.ENTER_FRAME, this.GameLoop, this);
		
		Functions.AddEventListener(GameEvents.GAME_START, this.OnGameStart, this);
		Functions.AddEventListener(GameEvents.GAME_READY, this.OnGameReady, this);
		Functions.AddEventListener(GameEvents.GAME_PLAY,  this.OnGamePlay, this);
		Functions.AddEventListener(GameEvents.GAME_OVER, this.OnGameOver, this);
	}

	private CreateScene() : void
	{
		// 背景
		this.m_Sky = Functions.createBitmapByName("gameplay_json.bg_day");
		this.addChild(this.m_Sky);

		// 土地
		this.m_Land_1 = Functions.createBitmapByName("gameplay_json.land");
		this.m_Land_1.x = 0;
		this.m_Land_1.y = 400;
		this.addChild(this.m_Land_1);

		this.m_Land_2 = Functions.createBitmapByName("gameplay_json.land");
		this.m_Land_2.x = this.m_Land_2.width - 10;
		this.m_Land_2.y = 400;
		this.addChild(this.m_Land_2);

		// 土地移动
		let tw1 = egret.Tween.get(this.m_Land_1, {loop : true});
        tw1.to( { x : -this.m_Land_1.width}, GameDefine.landMoveTime);

		let tw2 = egret.Tween.get(this.m_Land_2, {loop : true});
        tw2.to( { x : 0}, GameDefine.landMoveTime);
	}

	private OnGameStart() : void 
	{
		this.m_GameState = GameDefine.GAME_STATE.GameStart;
		Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGameStart);

		this.CreateScene();
	}

	private OnGameReady() : void 
	{
		this.m_GameState = GameDefine.GAME_STATE.GameReady;

		Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameStart);
		Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameOver);
		Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGameReady);

		// 小鸟
		if (this.m_Player == null)
		{
			this.m_Player = new Player();
			this.m_Player.Init();
		}
		else
		{
			this.m_Player.ResetPos();
		}
		
		// 水管
		if (this.m_Pipes[1] == null)
		{
			this.m_Pipes[1] = Functions.createBitmapByName("gameplay_json.pipe_up");
			this.addChildAt(this.m_Pipes[1], 1);

			this.m_Pipes[2] = Functions.createBitmapByName("gameplay_json.pipe_down");
			this.addChildAt(this.m_Pipes[2], 1);

			this.m_Pipes[3] = Functions.createBitmapByName("gameplay_json.pipe_up");
			this.addChildAt(this.m_Pipes[3], 1);

			this.m_Pipes[4] = Functions.createBitmapByName("gameplay_json.pipe_down");
			this.addChildAt(this.m_Pipes[4], 1);
		}

		this.m_Pipes[1].x = GlobalConfig.curWidth() - (this.m_Pipes[1].width / 2);
		this.m_Pipes[1].y = Functions.RandomNum(GameDefine.PipeMinY, GameDefine.PipeMaxY);

		this.m_Pipes[2].x = this.m_Pipes[1].x;
		this.m_Pipes[2].y = this.m_Pipes[1].y - GameDefine.PipeDistance - this.m_Pipes[2].height;

		this.m_Pipes[3].x = this.m_Pipes[1].x + (GlobalConfig.curWidth() / 2) + (this.m_Pipes[1].width / 2);
		this.m_Pipes[3].y = Functions.RandomNum(GameDefine.PipeMinY, GameDefine.PipeMaxY);

		this.m_Pipes[4].x = this.m_Pipes[3].x;
		this.m_Pipes[4].y = this.m_Pipes[3].y - GameDefine.PipeDistance - this.m_Pipes[3].height;

		egret.Tween.resumeTweens(this.m_Land_1);
		egret.Tween.resumeTweens(this.m_Land_2);
	}

	private OnGamePlay() : void 
	{
		this.m_GameState = GameDefine.GAME_STATE.GamePlay;

		Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameReady);
		Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGamePlay);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTap, this);
	}

	private OnGameOver() : void 
	{
		this.m_GameState = GameDefine.GAME_STATE.GameOver;

		egret.Tween.pauseTweens(this.m_Land_1);
		egret.Tween.pauseTweens(this.m_Land_2);

		Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGamePlay);
		Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGameOver);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnGamePlay, this);
	}

	private GameLoop(e : egret.Event) : void 
	{
		let nowTime = egret.getTimer();
		let timeEnterFrame = nowTime
		this.m_TimeScale = timeEnterFrame - this.m_LastTimeEnterFrame;
		let state = this.m_GameState;

		if (state == GameDefine.GAME_STATE.GamePlay)
		{
			for (let i = 1; i <= this.m_PipesCount; ++i)
			{
				this.m_Pipes[i].x -= this.m_TimeScale * GameDefine.PipeMoveSpeed;
			}

			for (let i = 1; i <= this.m_PipesCount; ++i)
			{
				this.PipeMove(i);
			}
		}

		this.m_LastTimeEnterFrame = nowTime;
	}

	private PipeMove(indexPipe : number) : void
	{
		if (indexPipe % 2 == 0 && this.m_Pipes[indexPipe].x <= -this.m_Pipes[indexPipe].width)
		{
			this.m_Pipes[indexPipe - 1].x = GlobalConfig.curWidth();;
			this.m_Pipes[indexPipe - 1].y = Functions.RandomNum(GameDefine.PipeMinY, GameDefine.PipeMaxY);

			this.m_Pipes[indexPipe].x = GlobalConfig.curWidth();;
			this.m_Pipes[indexPipe].y = this.m_Pipes[indexPipe - 1].y - GameDefine.PipeDistance - this.m_Pipes[indexPipe].height;
		}
	}

	public GamePause() : void
	{
		
	}

	public GameResume() : void
	{
		this.m_LastTimeEnterFrame = egret.getTimer();
	}

	private OnTap() : void
	{
		Functions.DispatchEvent(GameEvents.GAME_OVER);
	}
}