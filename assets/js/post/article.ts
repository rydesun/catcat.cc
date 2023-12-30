export class ArticleReadState {
  private titleElements?: NodeListOf<HTMLElement>;

  constructor(articleQuery: string, titleQuery: string) {
    const article = document.querySelector(articleQuery);
    if (article === null) {
      return;
    }
    this.titleElements = article.querySelectorAll(titleQuery);
  }

  /**
   * @param distance - 允许提前发现的标题距屏幕顶部的最大距离
   */
  findActiveTitleId(distance: number): string | null {
    if (this.titleElements === undefined) {
      return null;
    }
    const foundElement = Array.from(this.titleElements)
      .reverse() // 必须查找符合条件的最后一个
      .find((e) => {
        return e.offsetTop - window.scrollY < distance;
      });
    return foundElement ? foundElement.id : null;
  }
}
