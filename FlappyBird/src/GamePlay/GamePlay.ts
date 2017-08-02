
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
	private m_pWorld			 : p2.World;
	private m_debugDraw			 : p2DebugDraw;

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

		this.m_pWorld = new p2.World({gravity : [0, 9.82]});
	}

	public AddWorld(body : p2.Body) : void
	{
		this.m_pWorld.addBody(body);
	}

	private CreateScene() : void
	{
		// 背景
		this.m_Sky = Functions.createBitmapByName("gameplay_json.bg_day");
		this.addChild(this.m_Sky);

		// 土地
		this.m_Land_1 = Functions.createBitmapByName("gameplay_json.land");
		this.m_Land_1.x = 0;
		this.m_Land_1.y = this.m_Sky.height - this.m_Land_1.height;
		this.addChild(this.m_Land_1);

		this.m_Land_2 = Functions.createBitmapByName("gameplay_json.land");
		this.m_Land_2.x = this.m_Land_2.width - 10;
		this.m_Land_2.y = this.m_Sky.height - this.m_Land_1.height;
		this.addChild(this.m_Land_2);

		var planeShape = new p2.Plane();
        var plane = new p2.Body
		(
			{
            position:[0, -this.m_Land_1.y],
            collisionResponse: false
			}
		);
        plane.addShape(planeShape);
		this.AddWorld(plane);

		var boxShape: p2.Shape = new p2.Box({width: 100, height: 100});
        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [100, 100] });
        boxBody.addShape(boxShape);
        this.AddWorld(boxBody);

		//创建调试试图
        this.m_debugDraw = new p2DebugDraw(this.m_pWorld);
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.m_debugDraw.setSprite(sprite);

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
			this.m_Player.GetMC().play(-1);
			this.m_Player.SetPos(GameDefine.BirdX, GameDefine.BirdY);
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
	}

	private OnGameOver() : void 
	{
		this.m_GameState = GameDefine.GAME_STATE.GameOver;

		this.m_Player.GetMC().stop();
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

		this.m_pWorld.step(60 / 1000);

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

			// 小鸟匀速下降
			var birdY = this.m_Player.GetMC().y;
			var birdX = this.m_Player.GetMC().x;
		//	this.BirdMove();

			var birdMaxY = this.m_Land_1.y - this.m_Player.GetMC().height - 10;
			if (birdY >= birdMaxY)
			{
				Functions.DispatchEvent(GameEvents.GAME_OVER);
			}

			// 碰撞柱子
			var rectBird : egret.Rectangle = new egret.Rectangle(birdX, birdY, this.m_Player.GetMC().width, this.m_Player.GetMC().height);
			for (let i = 1; i <= this.m_PipesCount; ++i)
			{
				var isCrash = this.CheckPipeCrash(rectBird, this.m_Pipes[i]);
				if (isCrash)
				{
			//		Functions.DispatchEvent(GameEvents.GAME_OVER);
					break;
				}
			}

			// 得分
			if (this.CheckScore(rectBird, this.m_Pipes[1]))
			{
				Functions.DispatchEvent(GameEvents.ADD_SCORE, 1);
			}

			if (this.CheckScore(rectBird, this.m_Pipes[3]))
			{
				Functions.DispatchEvent(GameEvents.ADD_SCORE, 3);
			}
		}
		else if (state == GameDefine.GAME_STATE.GameOver)
		{
			this.BirdMove();
		}

		this.m_debugDraw.drawDebug();

		this.m_LastTimeEnterFrame = nowTime;
	}

	private CheckPipeCrash(rectBird : egret.Rectangle, pipi : egret.Bitmap) : boolean 
	{
		var isCrash : boolean = false;
		var rect : egret.Rectangle = new egret.Rectangle(pipi.x, pipi.y, pipi.width, pipi.height);
		isCrash = rectBird.intersects(rect);
		return isCrash;
	}

	private CheckScore(rectBird : egret.Rectangle, pipi : egret.Bitmap) : boolean 
	{
		var isScore : boolean = false;
		var rectScore : egret.Rectangle = new egret.Rectangle(pipi.x + pipi.width / 2, pipi.y - GameDefine.PipeDistance, pipi.width / 2, GameDefine.PipeDistance);
		isScore = rectBird.intersects(rectScore);
		return isScore;
	}

	private BirdMove() : void
	{
		var birdY = this.m_Player.GetMC().y;
		var birdX = this.m_Player.GetMC().x;
		birdY += this.m_TimeScale * GameDefine.BirdDownSpeed;
		var birdMaxY = this.m_Land_1.y - this.m_Player.GetMC().height - 10;
		if (birdY >= birdMaxY)
		{
			birdY = birdMaxY;
		}
		this.m_Player.SetPos(birdX, birdY);
	}

	private PipeMove(indexPipe : number) : void
	{
		if (indexPipe % 2 == 0 && this.m_Pipes[indexPipe].x <= -this.m_Pipes[indexPipe].width)
		{
			this.m_Pipes[indexPipe - 1].x = GlobalConfig.curWidth();
			this.m_Pipes[indexPipe - 1].y = Functions.RandomNum(GameDefine.PipeMinY, GameDefine.PipeMaxY);

			this.m_Pipes[indexPipe].x = GlobalConfig.curWidth();
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
}