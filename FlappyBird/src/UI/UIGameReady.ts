class UIGameReady extends UIBase 
{
	protected OnInit() : void
	{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnGamePlay, this);
	}

	public OnOpen() : void
	{
		var sound:egret.Sound = RES.getRes("AudioSwitch_mp3");
        sound.play(0, 1);
	}

	private OnGamePlay() : void
	{
		Functions.DispatchEvent(GameEvents.GAME_PLAY);
	}
}