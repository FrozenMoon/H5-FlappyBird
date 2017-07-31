class Player 
{
	// 帧动画
	private m_mc : egret.MovieClip;
	private m_mcData : any;
    private m_mcTexture:egret.Texture;
	private m_mcName 		: string = "BirdYellow";
	private m_mcTexturePath : string = "resource/assets/animation/BirdYellow.png";
	private m_mcJsonPath 	: string = "resource/assets/animation/BirdYellow.json";

	// 物理系统
	//private m_body : p2.Body;

	public constructor() 
	{
	}

	public Init() : void
	{
		this.load(this.LoadMCCompeleted);
	}

	private LoadMCCompeleted() : void
	{
        var mcDataFactory = new egret.MovieClipDataFactory(this.m_mcData, this.m_mcTexture);
		var mcData : egret.MovieClipData = mcDataFactory.generateMovieClipData(this.m_mcName);
        this.m_mc = new egret.MovieClip(mcData);
        GamePlay.Instance().addChild(this.m_mc);
        this.m_mc.play(-1);

        this.ResetPos();
	}

	private load(callback:Function) : void 
	{
        var count:number = 0;
        var self = this;
        
        var check = function () 
		{
            count++;
            if (count == 2) 
			{
                callback.call(self);
            }
        }
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) 
		{
            var loader = e.currentTarget;
            this.m_mcTexture = loader.data;
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest(this.m_mcTexturePath);
        loader.load(request);
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) 
		{
            var loader = e.currentTarget;
            this.m_mcData = JSON.parse(loader.data);
            check();
        }, this);

        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest(this.m_mcJsonPath);
        loader.load(request);
    }

	public ResetPos() : void
	{
		this.m_mc.x = 50;
        this.m_mc.y = 150;
	}

}