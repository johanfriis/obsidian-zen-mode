import { Plugin } from "obsidian";

export default class ZenMode extends Plugin {
  enabled: boolean = false;
  zenModeClass = "zen-mode";

  async onload() {
    this.addCommand({
      id: "toggle-zen-mode",
      name: "Toggle Zen Mode",
      callback: () => {
        this.toggleZenMode();
      },
    });
  }

  async onunload() {
    this.unzenify();
  }

  toggleZenMode() {
    if (this.enabled) {
      this.unzenify();
    } else {
      this.zenify();
    }
  }

  zenify() {
    this.enabled = true;
    document.body.classList.add(this.zenModeClass);
  }

  unzenify() {
    this.enabled = false;
    document.body.classList.remove(this.zenModeClass);
  }
}
