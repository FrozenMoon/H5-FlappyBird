
class GamePlay extends egret.DisplayObjectContainer　
{
	private m_TimeScale 	     : number = 0;
	public  m_TimeDrop  	     : number = 0;
	private m_LastTimeEnterFrame : number = 0;
	private m_PipesCount   		 : number = 4;
	private m_Sky 				 : egret.Bitmap;
	private m_Land_1 			 : egret.Bitmap;
	private m_Land_2 			 : egret.Bitmap;
	private m_Pipes 			 : Array<egret.Bitmap> = [];
	private m_GameState 		 : GameDefine.GAME_STATE;
	private m_Player			 : Player;
	private m_pWorld			 : p2.World;	// TODO p2的使用不熟悉，以后再考虑加入
	private m_debugDraw			 : p2DebugDraw;
	public  m_MaxScore			 : number = 0;
	public  m_NowScore			 : number = 0;

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

		// TODO p2的使用不熟悉，以后再考虑加入
		this.m_pWorld = new p2.World({gravity : [0, 9.82]});
		this.m_pWorld.sleepMode = p2.World.BODY_SLEEPING;

		
	}

	public OnAddScore() : void
	{
		this.m_NowScore += 1;
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
		this.m_MaxScore = Math.max(this.m_NowScore, Functions.readLocalNumberData(GameDefine.StoregeKeyMaxScore));
		this.m_NowScore = 0;

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
			this.m_Player.GetMC().rotation = 0;
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
		this.m_TimeDrop = 0;

		Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameReady);
		Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGamePlay);
	}

	private OnGameOver() : void 
	{
		this.m_GameState = GameDefine.GAME_STATE.GameOver;
		var sound:egret.Sound = RES.getRes("AudioHit_mp3");
        sound.play(0, 1);

		// 碰撞特效
		var mcHit = MCFactory.Instance().getMovieClip("EffectHit_json", "EffectHit_png", "EffectHit");
		mcHit.x = this.m_Player.GetMC().x;
		mcHit.y = this.m_Player.GetMC().y;
		mcHit.scaleX = 2;
		mcHit.scaleY = 2;
        this.addChild(mcHit);
        mcHit.play(1);
		mcHit.addEventListener(egret.Event.COMPLETE, () =>{this.removeChild(mcHit);}, this);

		this.m_Player.GetMC().stop();
		egret.Tween.pauseTweens(this.m_Land_1);
		egret.Tween.pauseTweens(this.m_Land_2);

		Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGamePlay);

		var timer:egret.Timer = new egret.Timer(1000, 1);
		timer.once(egret.TimerEvent.TIMER_COMPLETE, this.OnGameOverScore, this);
		timer.start();
	}
	
	private OnGameOverScore() : void 
	{
		Functions.DispatchEvent(UIEvents.OPEN_PANEL, UIDefine.PanelID.UIGameOver);
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
				this.PipeMove(i);
			}

			// 小鸟下降
			var birdY = this.m_Player.GetMC().y;
			var birdX = this.m_Player.GetMC().x;
			this.BirdMove();

			var birdMaxY = this.m_Land_1.y - this.m_Player.GetMC().height / 2;
			if (birdY >= birdMaxY)
			{
				Functions.DispatchEvent(GameEvents.GAME_OVER);
			}

			// 碰撞柱子
			var rectBird : egret.Rectangle = new egret.Rectangle(birdX - this.m_Player.GetMC().width / 2, birdY - this.m_Player.GetMC().height / 2, this.m_Player.GetMC().width, this.m_Player.GetMC().height);
			for (let i = 1; i <= this.m_PipesCount; ++i)
			{
				var isCrash = this.CheckPipeCrash(rectBird, this.m_Pipes[i]);
				if (isCrash)
				{
					Functions.DispatchEvent(GameEvents.GAME_OVER);
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

	// 模拟重力 h = vt + g * t / 2
	private BirdMove() : void
	{
		var birdY = this.m_Player.GetMC().y;
		var birdX = this.m_Player.GetMC().x;
		this.m_TimeDrop += this.m_TimeScale;
		birdY += (this.m_TimeDrop / 800) * (this.m_TimeDrop / 800) * 9.8 / 2 ;
		var birdMaxY = this.m_Land_1.y - this.m_Player.GetMC().height / 2;
		if (birdY >= birdMaxY)
		{
			birdY = birdMaxY;
		}
		this.m_Player.SetPos(birdX, birdY);

		var rotation = this.m_Player.GetMC().rotation + 0.1 * this.m_TimeScale;
		rotation = Math.min(70, rotation);
		this.m_Player.GetMC().rotation = rotation;
	}

	private PipeMove(indexPipe : number) : void
	{
		this.m_Pipes[indexPipe].x -= this.m_TimeScale * GameDefine.PipeMoveSpeed;

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