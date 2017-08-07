class UIGameOver extends UIBase 
{
	private m_LabelBest 	: eui.Label;
	private m_LabelScore 	: eui.Label;
	private m_BtnPlay 		: eui.Button;
	private m_BtnRank 		: eui.Button;
	private m_ImgMedal 		: eui.Image;
	private m_ImgNewScore 	: eui.Image;

	protected OnInit() : void
	{
		this.m_BtnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlay, this);
	}

	public OnOpen() : void
	{
		var maxScore = GamePlay.Instance().m_MaxScore;
		var nowScore = GamePlay.Instance().m_NowScore;
		
		this.m_LabelScore.text = String(nowScore);

		this.m_ImgMedal.source = "UI_json.medals_0";
		if (nowScore > 0)
			this.m_ImgMedal.source = "UI_json.medals_1";
		else if (nowScore > 10)
			this.m_ImgMedal.source = "UI_json.medals_2";
		else if (nowScore > 30)
			this.m_ImgMedal.source = "UI_json.medals_3";
		
		if (nowScore > maxScore)
		{
			this.m_LabelBest.text = String(nowScore);
			this.m_ImgNewScore.visible = true;
			this.m_ImgMedal.source = "UI_json.medals_3";
			Functions.writeLocalData(GameDefine.StoregeKeyMaxScore, String(nowScore));
		}
		else
		{
			this.m_LabelBest.text = String(maxScore);
			this.m_ImgNewScore.visible = false;
		}
			
		var sound:egret.Sound = RES.getRes("AudioDie_mp3");
        sound.play(0, 1);
	}

	private onBtnPlay() : void
	{
		Functions.DispatchEvent(GameEvents.GAME_READY);
	}
}