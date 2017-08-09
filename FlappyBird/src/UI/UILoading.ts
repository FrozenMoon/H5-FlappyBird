//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class UILoading extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField : egret.TextField;
    private processBar : ProcessBar;

    private createView() : void {
        // bg
        let bg : egret.Bitmap = Functions.createBitmapByName("loading_json.bg_loading");
        bg.width = GlobalConfig.curWidth();
        bg.height = GlobalConfig.curHeight();
        bg.anchorOffsetX = 0;
        bg.anchorOffsetY = 0;
        this.addChild(bg);

        // process
        this.processBar = new ProcessBar(Functions.createBitmapByName("loading_json.processbar_bg"), Functions.createBitmapByName("loading_json.processbar"));
        this.processBar.width = GlobalConfig.curWidth();
        this.processBar.anchorOffsetX = 0;
        this.processBar.anchorOffsetY = 1;
        this.processBar.y = GlobalConfig.curHeight() - this.processBar.height;
        this.addChild(this.processBar);

        // text
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = GlobalConfig.curHeight() - 40;
        this.textField.anchorOffsetX = 0;
        this.textField.anchorOffsetY = 1;
        this.textField.width = GlobalConfig.curWidth();
        this.textField.height = 30;
        this.textField.textAlign = "center";
        this.textField.size = 14;
        this.textField.fontFamily = GlobalConfig.defaultFont;
    }

    public setProgress(current:number, total:number):void 
    {
        var percent = Math.floor(current / total * 100);
        this.textField.text = `玩命加载中 ... ${percent} / 100%`;

        this.processBar.setProgress(current / total);
    }
}
