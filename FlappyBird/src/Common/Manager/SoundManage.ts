class SoundManage {
	private m_sounds : any;
	private m_soundChanels : any;

	public constructor() {
        this.m_sounds = {};
		this.m_soundChanels = {};
    }

	// 单例
	private static m_instance : SoundManage;
	public static Instance() : SoundManage 
	{
		if (SoundManage.m_instance == null)
		{
			SoundManage.m_instance = new SoundManage();
		}
		return SoundManage.m_instance;
	}

	// 暂时只能播放已经加载的资源
	public Play(name : string, startTimes : number = 0, loops : number = 1) : boolean
	{
		if (!this.m_sounds[name])
			this.m_sounds[name] = RES.getRes(name);

		if (!this.m_sounds[name])
			return false;

		if (this.m_sounds[name] && GlobalConfig.isSound)
		{
			this.m_soundChanels[name] = this.m_sounds[name].play(startTimes, loops);
		}

		return true;
	}

	public SetOpenSound(open : boolean) : void 
	{
		GlobalConfig.isSound = open;
		for(var index in this.m_soundChanels)
		{   
			var sc : egret.SoundChannel = this.m_soundChanels[index];
			sc.volume = open == true ? 1 : 0;
		}  
	}
}
