export class ScrollManager {
  private discussion: HTMLElement | null;

  constructor() {
    this.discussion = document.querySelector(".article.discussion");
  }

  gotoTop(): void {
    // 去掉URL中的锚点
    history.pushState(
      null,
      document.title,
      window.location.pathname + window.location.search,
    );
    window.scrollTo({ top: 0 });
  }

  gotoDiscussion(): void {
    this.discussion?.scrollIntoView();
  }
}
