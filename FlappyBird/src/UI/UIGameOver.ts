class UIGameOver extends UIBase 
{
	private m_LabelBest 	: eui.Label;
	private m_LabelScore 	: eui.Label;
	private m_BtnPlay 		: eui.Button;
	private m_BtnRank 		: eui.Button;
	private m_BtnShare 		: eui.Button;
	private m_ImgMedal 		: eui.Image;
	private m_ImgNewScore 	: eui.Image;

	protected OnInit() : void
	{
		this.m_BtnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
	}

	private onBtnPlay() : void
	{
		Global.dispatchEvent(GameEvents.GAME_READY);
	}
}