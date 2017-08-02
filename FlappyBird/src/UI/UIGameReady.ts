class UIGameReady extends UIBase 
{
	protected OnInit() : void
	{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnGamePlay, this);
	}

	private OnGamePlay() : void
	{
		Functions.DispatchEvent(GameEvents.GAME_PLAY);
	}
}