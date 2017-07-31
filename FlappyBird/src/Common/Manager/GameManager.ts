class GameManager
{
	// 总舞台
	public m_stage : egret.Stage;

	// 单例
	private static m_instance : GameManager;
	public static Instance() : GameManager 
	{
		if (GameManager.m_instance == null)
		{
			GameManager.m_instance = new GameManager();
		}
		return GameManager.m_instance;
	}

	// 管理游戏场景和UI的层级关系
	public Init(stage : egret.Stage):void
	{
		// 初始化模块
        this.m_stage = stage;

		GamePlay.Instance().Init();
		this.m_stage.addChild(GamePlay.Instance());
		
		UIManager.Instance().Init();
		this.m_stage.addChild(UIManager.Instance());

		// 开始游戏
		Functions.DispatchEvent(GameEvents.GAME_START);
	}

	public GamePause() : void
	{
		GamePlay.Instance().GamePause();
	}

	public GameResume() : void
	{
		GamePlay.Instance().GameResume();
	}
}