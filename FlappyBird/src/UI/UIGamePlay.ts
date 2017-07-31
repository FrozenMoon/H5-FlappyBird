class UIGamePlay extends UIBase 
{
	private m_LabelScore : eui.Label;
	private m_Main : eui.Panel;

	protected OnInit() : void
	{
		this.m_LabelScore.touchEnabled = false;
		this.m_LabelScore.text = "0";
		Functions.AddEventListener(GameEvents.ADD_SCORE, this.OnAddScore, this);
		this.m_Main.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTap, this);
	}

	private OnAddScore(event) : void
	{
		let nNowScore : number = parseInt(this.m_LabelScore.text);
		let nAddScore : number = event.param;
		nNowScore += nAddScore;
		this.m_LabelScore.text = String(nNowScore);
	}

	private OnTap() : void
	{
		Functions.DispatchEvent(GameEvents.GAME_OVER);
	}
}