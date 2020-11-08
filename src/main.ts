import {
  addIcon,
  App,
  ItemView,
  Notice,
  Plugin,
  WorkspaceLeaf,
} from "obsidian";
import Reminder from "./Reminder.svelte";

const VIEW_TYPE_REMINDER = "reminder";
const ICON_ID_REMINDER = "reminder";

addIcon(
  ICON_ID_REMINDER,
  `
	<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="width: 48px; height: 48px; opacity: 1;" xml:space="preserve">
	<g>
		<path d="M193.499,459.298c5.237,30.54,31.518,52.702,62.49,52.702c30.98,0,57.269-22.162,62.506-52.702l0.32-1.86
			H193.179L193.499,459.298z" fill="currentColor" stroke="currentColor"></path>
		<path d="M469.782,371.98c-5.126-5.128-10.349-9.464-15.402-13.661c-21.252-17.648-39.608-32.888-39.608-96.168v-50.194
			c0-73.808-51.858-138.572-123.61-154.81c2.876-5.64,4.334-11.568,4.334-17.655C295.496,17.718,277.777,0,255.995,0
			c-21.776,0-39.492,17.718-39.492,39.492c0,6.091,1.456,12.018,4.334,17.655c-71.755,16.238-123.61,81.002-123.61,154.81v50.194
			c0,63.28-18.356,78.521-39.608,96.168c-5.052,4.196-10.276,8.533-15.402,13.661l-0.466,0.466v49.798h428.496v-49.798
			L469.782,371.98z" fill="currentColor" stroke="currentColor"></path>
	</g>
	</svg>
	`
);

export default class MyPlugin extends Plugin {
  private view: ReminderView;
  onload() {
    console.log("loading plugin");

    this.registerView(
      VIEW_TYPE_REMINDER,
      (leaf: WorkspaceLeaf) => (this.view = new ReminderView(leaf))
    );

    this.addCommand({
      id: "open-sample-modal",
      name: "Open Sample Modal",
      callback: () => {
        console.log("Simple Callback");
        console.log(this);
      },
    });

    if (this.app.workspace.layoutReady) {
      this.initLeaf();
    } else {
      this.registerEvent(
        this.app.workspace.on("layout-ready", this.initLeaf.bind(this))
      );
    }
  }

  initLeaf() {
    if (this.app.workspace.getLeavesOfType("reminder").length) {
      return;
    }
    this.app.workspace.getRightLeaf(false).setViewState({
      type: "reminder",
    });
  }

  onunload() {
    console.log("unloading plugin");
  }
}

class ReminderView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    console.log("in view constructor");
    super(leaf);
    this.update = this.update.bind(this);
  }

  private reminder: Reminder;

  async onOpen() {
    this.reminder = new Reminder({ target: (this as any).contentEl });
  }

  getViewType() {
    return VIEW_TYPE_REMINDER;
  }

  getDisplayText() {
    return "Reminder";
  }

  getIcon() {
    return ICON_ID_REMINDER;
  }

  // load() {
  //   this.update();
  // }

  async update() {
    // console.log("in update");
    // const container = this.leaf.createEl("div", {
    //   cls: "calendarview__container",
    // });
    // const container = this.containerEl;
    // const viewContent = container.children[1];
    // viewContent.createEl("div", { cls: "unko", text: "unichi!" });
    // const read = await this.app.vault.adapter.read("./_reminder.md");
    // const splitted = read.split("\n");
    // console.log(read);
    // let list = new HTMLDivElement();
    // console.log(list);
    // for (let line of splitted) {
    //   console.log(line);
    //   let div = new HTMLDivElement();
    //   div.appendText(line);
    //   list.append(div);
    //   // list.push(div);
    // }
    // console.log(list);
    // viewContent.append(list);
  }
}
