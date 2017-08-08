// from http://bbs.egret.com/forum.php?mod=viewthread&tid=20554 by lixin2628
// modify by frozenmoon

class ProcessBar extends egret.Sprite {
    public background:egret.Bitmap;
    public bar:egret.Bitmap;
    public barMask:egret.Rectangle;
    /**
     * 反向进度条
     * */
    public reverse = false;
    public constructor(background:egret.Bitmap, bar:egret.Bitmap)
	 {
        super();
        this.background = background;
		this.background.width = GlobalConfig.curWidth();

        this.bar = bar;
		this.bar.width = GlobalConfig.curWidth();

        this.bar.x = (this.background.width - this.bar.width) / 2;
        this.bar.y = (this.background.height - this.bar.height) / 2;
        this.barMask = new egret.Rectangle(0, 0, this.bar.width, this.bar.height);
        this.bar.mask = this.barMask;

		this.height = this.background.height;
		this.addChild(this.background);
        this.addChild(this.bar);

		this.setProgress(0);
    }

    public setProgress(_p) 
	{
        this.barMask = new egret.Rectangle(0, 0, (this.reverse ? (1 - _p) : _p) * this.bar.width, this.bar.height);
        this.bar.mask = this.barMask;
    }
}