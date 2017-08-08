class UIGameShare extends UIBase
{
	protected OnInit() : void
	{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
	}

	private Close():void
	{
		Functions.DispatchEvent(UIEvents.CLOSE_PANEL, UIDefine.PanelID.UIGameShare);
	}
}