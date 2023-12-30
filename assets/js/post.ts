import * as copyCode from "./post/copyCode";
import * as remark from "./post/remark";
import { SidebarManager } from "./post/sidebar";
import { ArticleReadState } from "./post/article";
import { ScrollManager } from "./post/scroll";

copyCode.addButtons();
remark.themeAutoChange();

declare global {
  let sidebarManager: SidebarManager;
  let scrollManager: ScrollManager;
}

sidebarManager = new SidebarManager(
  new ArticleReadState("article.article", "h1, h2, h3, h4"),
);

scrollManager = new ScrollManager();

sidebarManager.autoSetSidebarActiveTitle();
