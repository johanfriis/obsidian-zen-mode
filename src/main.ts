import { Plugin } from "obsidian";
import { ZenModeSettings, DEFAULT_SETTINGS, Settings } from "./settings";

/**
 * Classes that can be hidden
 *
 * - workspace-ribbon side-dock-ribbon mod-left
 * - workspace-split mod-horizontal mod-left-split
 * - workspace-tab-header-container
 * - status-bar
 *
 *
 */

export default class ZenMode extends Plugin {
  settings: Settings;

  enabled: boolean = false;

  uiClasses = [
    ".workspace-ribbon.side-dock-ribbon.mod-left",
    ".workspace-split.mod-horizontal.mod-left-split",
    ".workspace-tab-header-container",
    ".status-bar",
  ];

  async onload() {
    console.log("Loading Zen Mode ...");

    await this.loadSettings();
    this.addSettingTab(new ZenModeSettings(this.app, this));

    this.addCommand({
      id: "toggle-zen-mode",
      name: "Toggle Zen Mode",
      callback: () => {
        this.toggleZenMode();
      },
    });

    this.startPlugin();

    console.log("Zen Mode running ...");
  }

  async onunload() {
    console.log("Zen Mode running ...");
  }

  startPlugin() {
    console.log("Zen Mode is starting");
    console.log();

    /**
     * Here we can actually start manipulating the view
     */
    this.app.workspace.onLayoutReady(async () => {});
  }

  toggleZenMode() {
    console.log({ enabled: this.enabled });

    if (this.enabled) {
      this.unzenify();
    } else {
      this.zenify();
    }
  }

  zenify() {
    this.enabled = true;
    console.log("zenify");
    this.toggleVisibleElements(false);
  }

  unzenify() {
    this.enabled = false;
    console.log("unzenify");
    this.toggleVisibleElements(true);
  }

  toggleVisibleElements(visible: boolean) {
    const parentEl = this.app.dom.appContainerEl;
    this.uiClasses.forEach((cls) => {
      const el = parentEl.querySelector(cls);
      if (visible) {
        el.style.display = "inherit";
      } else {
        el.style.display = "none";
      }
    });
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.startPlugin();
  }
}
