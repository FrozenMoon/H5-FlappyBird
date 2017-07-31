
class UIManager extends eui.UILayer
{
	private m_uiPanels : Array<UIBase> = new Array();

	// 单例
	private static m_instance : UIManager;
	public static Instance() : UIManager 
	{
		if (UIManager.m_instance == null)
		{
			UIManager.m_instance = new UIManager();
		}
		return UIManager.m_instance;
	}
	
	public constructor() 
	{
		super();
	}

	public Init() : void
	{
		Functions.AddEventListener(UIEvents.OPEN_PANEL, this.OpenPanel, this);
		Functions.AddEventListener(UIEvents.CLOSE_PANEL, this.ClosePanel, this);
	}

	private OpenPanel(event) : void
	{
		let id : UIDefine.PanelID = event.param;
		if (!this.m_uiPanels[id])
		{
			switch(id)
			{
				case UIDefine.PanelID.UIGameStart:
					this.m_uiPanels[id] = new UIGameStart;
					break;
				case UIDefine.PanelID.UIGameReady:
					this.m_uiPanels[id] = new UIGameReady;
					break;
				case UIDefine.PanelID.UIGamePlay:
					this.m_uiPanels[id] = new UIGamePlay;
					break;
				case UIDefine.PanelID.UIGameOver:
					this.m_uiPanels[id] = new UIGameOver;
					break;
			}
		}

		if (this.m_uiPanels[id] && !this.IsOpen(id))
		{
			this.addChild(this.m_uiPanels[id]);
		}
	}

	private ClosePanel(event) : void
	{
		let id : UIDefine.PanelID = event.param;
		let ui = this.m_uiPanels[id];
		if (ui && this.IsOpen(id))
		{
			this.removeChild(this.m_uiPanels[id]);
		}
	}

	public IsOpen(id : UIDefine.PanelID) : boolean
	{
		let bShow : boolean = false;
		if (this.m_uiPanels[id])
		{
			bShow = this.contains(this.m_uiPanels[id]);
		}

		return bShow;
	}
}
