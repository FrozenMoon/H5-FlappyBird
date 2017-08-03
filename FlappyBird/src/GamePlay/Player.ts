class Player 
{
	// 帧动画
	private m_mc            : egret.MovieClip;
	private m_mcData        : any;
    private m_mcTexture     : egret.Texture;
	private m_mcName 		: string = "BirdYellow";
	private m_mcTexturePath : string = "BirdYellow_png";
	private m_mcJsonPath 	: string = "BirdYellow_json";
    private m_isFly         : boolean = false;
    private m_body          : p2.Body;

	public constructor() 
	{
	}

	public Init() : void
	{
        this.m_mc = MCFactory.Instance().getMovieClip(this.m_mcJsonPath, this.m_mcTexturePath, this.m_mcName);
        GamePlay.Instance().addChild(this.m_mc);
        this.m_mc.play(-1);
        this.SetPos(GameDefine.BirdX, GameDefine.BirdY);

        Functions.AddEventListener(GameEvents.TAP_BIRD, this.Jump, this);
	}

	public SetPos(x : number, y : number) : void
	{
		this.m_mc.x = x;
        this.m_mc.y = y;
	}

    public GetMC() : egret.MovieClip
    {
        return this.m_mc;
    }

    public Jump() : void
    {
        this.m_isFly = true;
        egret.Tween.removeTweens(this.m_mc);

        let tw1 = egret.Tween.get(this.m_mc);
        tw1.to( { y : this.m_mc.y - GameDefine.BirdFlyHeight, rotation: -45}, GameDefine.BirdFlyTime).call(this.onComplete2,this);
        GamePlay.Instance().m_TimeDrop = 0;

        SoundManage.Instance().Play("AudioJump_mp3");
    }

    private onComplete2() : void
    {

    }
}