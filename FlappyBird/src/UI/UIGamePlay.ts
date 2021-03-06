class UIGamePlay extends UIBase 
{
	private m_LabelScore : eui.Label;
	private m_Group 	 : eui.Group;
	private m_Main		 : eui.Panel;
	private m_Type       : number = 0;

	protected OnInit() : void
	{
		Functions.AddEventListener(GameEvents.ADD_SCORE, this.OnAddScore, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTap, this);
	}

	public OnOpen() : void
	{
		this.m_LabelScore.text = "0";
		this.m_Type = 0;
	}

	private OnAddScore(event) : void
	{	
		let nAddType : number = event.param;
		if (this.m_Type == nAddType)
		{
			return;
		}
		this.m_Type = nAddType;

		let nNowScore : number = parseInt(this.m_LabelScore.text);
		this.m_LabelScore.text = String(nNowScore + 1);

		GamePlay.Instance().OnAddScore();

		SoundManage.Instance().Play("AudioScore_mp3");
	}

	private OnTap() : void
	{
		Functions.DispatchEvent(GameEvents.TAP_BIRD);
	}
}