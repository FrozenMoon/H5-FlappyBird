class UIGameStart extends UIBase 
{
	private m_BtnPlay : eui.Button;

	protected OnInit() : void
	{
		this.m_BtnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
	}

	private onBtnPlay():void
	{
		Global.dispatchEvent(GameEvents.GAME_READY);
	}
}