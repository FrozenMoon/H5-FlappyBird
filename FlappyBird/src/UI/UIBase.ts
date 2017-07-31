class UIBase extends eui.Component implements eui.UIComponent 
{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.Init, this);
	}

	protected partAdded(partName:string, instance:any) : void
	{
		super.partAdded(partName, instance);
	}

	protected partRemoved(partName:string, instance:any) : void
	{
		super.partRemoved(partName, instance);
	}

	protected childrenCreated() : void
	{
		super.childrenCreated();
	}

	private Init() : void
	{
		this.removeEventListener(eui.UIEvent.COMPLETE , this.Init, this);
		// 默认是全屏居中的布局，需要自定义可在OnInit()修改
		//this.horizontalCenter = 0;
        //this.verticalCenter = 0;
		//this.width = GlobalConfig.curWidth();
        //this.height = GlobalConfig.curHeight();

		this.OnInit();
	}
	
	protected OnInit() : void
	{
		
	}

	protected OnOpen() : void
	{

	}

	public OnClose() : void
	{
		
	}
}
