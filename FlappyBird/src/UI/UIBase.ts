class UIBase extends eui.Component implements eui.UIComponent 
{
	protected m_inited : boolean = false;

	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.Init, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.OnClose, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.Open, this);
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
		this.m_inited = true;
		this.OnInit();
		this.OnOpen();
	}
	
	protected OnInit() : void
	{
		
	}

	public Open() : void
	{
		if (this.m_inited)
		{
			this.OnOpen();
		}
	}

	protected OnOpen() : void 
	{
		
	}

	public OnClose() : void
	{
		
	}
}
