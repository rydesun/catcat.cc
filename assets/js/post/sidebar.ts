import { ArticleReadState } from "./article";

const container = document.getElementById("article-and-sidebar");
const sidebarTOC = document.getElementById("TableOfContents");
const discussionArea = document.getElementById("discussion-area");

export class SidebarManager {
  private tocIsRewritten = false;
  private discussionAreaLink: HTMLLIElement | null = null;

  constructor(private articleReadState: ArticleReadState) {
    this.rewriteTOC();
  }

  private rewriteTOC() {
    if (this.tocIsRewritten) {
      return;
    }
    const ol = sidebarTOC?.querySelector("ol");
    if (ol === null || ol === undefined) {
      return;
    }
    this.iterOrderList(ol, [], (level, item) => {
      const link = item.querySelector("a");
      if (link === null) {
        return;
      }
      const span = document.createElement("span");
      span.textContent = level.join(".");
      span.classList.add("counter");

      const textNode = link.firstChild;
      link.insertBefore(span, textNode);
    });

    // 在最上面添加标题的链接
    this.addTitleLink(ol);
    if (discussionArea) {
      // 在末尾添加留言区的链接
      this.addDiscussionLink(ol);
    }

    sidebarTOC?.classList.add("rewritten");
    this.tocIsRewritten = true;
  }

  private addTitleLink(ol: HTMLOListElement) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = "顶部标题";
    link.href = "#";
    link.onclick = function (event) {
      event.preventDefault();
      window.scrollManager.gotoTop();
    };
    listItem.appendChild(link);
    ol.insertBefore(listItem, ol.firstChild);
  }

  private addDiscussionLink(ol: HTMLOListElement) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = "留言区";
    link.href = "#discussion-area";
    listItem.appendChild(link);
    ol.appendChild(listItem);
    this.discussionAreaLink = listItem;
  }

  toggle() {
    const isEnabled = container?.classList.toggle("enabled");
    if (isEnabled) {
      this.autoSetSidebarActiveTitle();
    } else {
      window.removeEventListener("scroll", this.setSidebarActiveTitle);
    }
  }

  autoSetSidebarActiveTitle() {
    this.setSidebarActiveTitle();
    window.addEventListener("scroll", this.setSidebarActiveTitle, {
      passive: true,
    });
  }

  private isTitleVisible(element: HTMLElement) {
    const containerTop = sidebarTOC!.scrollTop + 16; // TODO: 去掉硬编码
    const containerBottom = containerTop + sidebarTOC!.clientHeight;

    const elementTop = element.offsetTop;
    const elementBottom = elementTop + element.clientHeight;

    return elementTop >= containerTop && elementBottom <= containerBottom;
  }

  private setSidebarActiveTitle = () => {
    if (sidebarTOC === null) {
      return;
    }

    // 先判断是否在留言区，再判断是否处于次级标题下
    if (discussionArea && discussionArea.offsetTop - window.scrollY < 120) {
      this.clearSidebarActiveState("active");
      this.discussionAreaLink?.classList.add("active");
      sidebarTOC.scrollTo({ top: this.discussionAreaLink?.offsetTop });
      return;
    }

    // 标题与上文正文的边距为24~20px
    const id = this.articleReadState.findActiveTitleId(40);
    if (id === null) {
      this.clearSidebarActiveState("active");
      sidebarTOC.scrollTo({ top: 0 });
      return;
    }
    const title = this.setSidebarActiveTitleClass(id, "active");
    if (title && !this.isTitleVisible(title)) {
      sidebarTOC.scrollTo({ top: title.offsetTop - 16 - 12 }); // TODO: 去掉硬编码;
    }
  };

  private clearSidebarActiveState(className: string) {
    if (sidebarTOC === null) {
      return null;
    }
    Array.from(sidebarTOC.querySelectorAll("li")).forEach((li) => {
      li.classList.remove(className);
    });
  }

  private setSidebarActiveTitleClass(
    id: string,
    className: string,
  ): HTMLLIElement | null {
    if (sidebarTOC === null) {
      return null;
    }
    let activeTitle: HTMLElement | null = null;
    Array.from(sidebarTOC.querySelectorAll("li")).forEach((li) => {
      // 不能直接用.href获取链接
      const href = li.querySelector("a")?.getAttribute("href");
      if (href === "#" + id) {
        activeTitle = li;
        if (!li.classList.contains(className)) {
          li.classList.add(className);
        }
      } else {
        li.classList.remove(className);
      }
    });
    return activeTitle;
  }

  private iterOrderList(
    ol: HTMLOListElement,
    level: number[],
    cb: (level: number[], item: HTMLLIElement) => void,
  ) {
    // 用 :scope > 只查第一级的li
    const items: NodeListOf<HTMLLIElement> = ol.querySelectorAll(":scope > li");

    level.push(0);
    items.forEach((item) => {
      level[level.length - 1] += 1;
      cb(level, item);
      const nestedOl = item.querySelector("ol");
      if (nestedOl) {
        this.iterOrderList(nestedOl, level, cb);
      }
    });
    level.pop();
  }
}
