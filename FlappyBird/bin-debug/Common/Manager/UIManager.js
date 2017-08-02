var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIManager = (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super.call(this) || this;
        _this.m_uiPanels = new Array();
        return _this;
    }
    UIManager.Instance = function () {
        if (UIManager.m_instance == null) {
            UIManager.m_instance = new UIManager();
        }
        return UIManager.m_instance;
    };
    UIManager.prototype.Init = function () {
        Functions.AddEventListener(UIEvents.OPEN_PANEL, this.OpenPanel, this);
        Functions.AddEventListener(UIEvents.CLOSE_PANEL, this.ClosePanel, this);
    };
    UIManager.prototype.OpenPanel = function (event) {
        var id = event.param;
        if (!this.m_uiPanels[id]) {
            switch (id) {
                case UIDefine.PanelID.UIGameStart:
                    this.m_uiPanels[id] = new UIGameStart;
                    break;
                case UIDefine.PanelID.UIGameReady:
                    this.m_uiPanels[id] = new UIGameReady;
                    break;
                case UIDefine.PanelID.UIGamePlay:
                    this.m_uiPanels[id] = new UIGamePlay;
                    break;
                case UIDefine.PanelID.UIGameOver:
                    this.m_uiPanels[id] = new UIGameOver;
                    break;
            }
        }
        if (this.m_uiPanels[id]) {
            if (!this.IsOpen(id))
                this.addChild(this.m_uiPanels[id]);
        }
    };
    UIManager.prototype.ClosePanel = function (event) {
        var id = event.param;
        var ui = this.m_uiPanels[id];
        if (ui && this.IsOpen(id)) {
            this.removeChild(this.m_uiPanels[id]);
        }
    };
    UIManager.prototype.IsOpen = function (id) {
        var bShow = false;
        if (this.m_uiPanels[id]) {
            bShow = this.contains(this.m_uiPanels[id]);
        }
        return bShow;
    };
    return UIManager;
}(eui.UILayer));
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map