import { remarkStyle } from "@params";

export function addRemarkStyle() {
  const container = document.getElementById("remark42");
  if (!container) {
    return;
  }

  // 当remark注入提前完成时
  if (container.firstChild) {
    const remark42Iframe = container.firstChild as HTMLIFrameElement;
    // remark注入完成，但页面还没加载
    remark42Iframe.addEventListener("load", () => {
      addStyleFile(remark42Iframe.contentDocument!);
    });
  } else {
    // remark注入后完成时
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type !== "childList" || mutation.addedNodes.length === 0) {
          return;
        }

        const addedNode = mutation.addedNodes[0] as HTMLElement;
        if (
          !addedNode.tagName ||
          addedNode.tagName.toLowerCase() !== "iframe"
        ) {
          return;
        }

        const remark42Iframe = addedNode as HTMLIFrameElement;
        remark42Iframe.addEventListener("load", () => {
          addStyleFile(remark42Iframe.contentDocument!);
        });

        observer.disconnect();
      });
    });
    observer.observe(container, { childList: true });
  }

  // 点击用户名弹出的侧边栏
  const bodyObserver = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type !== "childList" || mutation.addedNodes.length === 0) {
        return;
      }

      mutation.addedNodes.forEach((addedNode) => {
        if (
          !(addedNode instanceof Element) ||
          !addedNode.tagName ||
          addedNode.tagName.toLowerCase() !== "div" ||
          !(addedNode.firstChild instanceof Element) ||
          !addedNode.firstChild.tagName ||
          addedNode.firstChild.tagName.toLowerCase() !== "iframe"
        ) {
          return;
        }
        const remark42Iframe = addedNode.firstChild as HTMLIFrameElement;
        remark42Iframe.addEventListener("load", () => {
          addStyleFile(remark42Iframe.contentDocument!);
          bodyObserver.disconnect();
          // 替换为在div上，因为iframe会删除div不会删除
          observeUserCommentsContainer(addedNode as HTMLElement);
        });
      });
    });
  });
  bodyObserver.observe(document.body, { childList: true });
}

function observeUserCommentsContainer(container: HTMLElement) {
  new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type !== "childList" || mutation.addedNodes.length === 0) {
        return;
      }

      mutation.addedNodes.forEach((addedNode) => {
        if (
          !(addedNode instanceof Element) ||
          !addedNode.tagName ||
          addedNode.tagName.toLowerCase() !== "iframe"
        ) {
          return;
        }
        const remark42Iframe = addedNode as HTMLIFrameElement;
        remark42Iframe.addEventListener("load", () => {
          addStyleFile(remark42Iframe.contentDocument!);
        });
      });
    });
  }).observe(container, { childList: true });
}

function addStyleFile(iframeDoc: Document) {
  const linkElement = iframeDoc.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = remarkStyle.url;
  linkElement.integrity = remarkStyle.integrity;
  iframeDoc.head.appendChild(linkElement);
}
