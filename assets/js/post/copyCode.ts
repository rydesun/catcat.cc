// https://github.com/adityatelange/hugo-PaperMod/blob/master/layouts/partials/footer.html

export function addButtons() {
  const selector = ".highlight td:last-child > pre > code";
  document.querySelectorAll(selector).forEach((codeblock) => {
    const textCopy = "复制";
    const textCopied = "✓已复制";
    const container = codeblock.parentNode!.parentNode!;

    const copyButton = document.createElement("button");
    copyButton.classList.add("copy-code");
    copyButton.innerHTML = textCopy;
    container.appendChild(copyButton);

    copyButton.addEventListener("click", () => {
      if ("clipboard" in navigator && codeblock.textContent !== null) {
        navigator.clipboard.writeText(codeblock.textContent);
      } else {
        // 安卓不支持navigator.clipboard
        const range = document.createRange();
        range.selectNodeContents(codeblock);
        const selection = window.getSelection();
        if (selection === null) {
          return;
        }
        selection.removeAllRanges();
        selection.addRange(range);
        try {
          document.execCommand("copy");
        } catch (e) {
          console.error(e);
        }
        selection.removeRange(range);
      }

      copyButton.innerHTML = textCopied;
      setTimeout(() => {
        copyButton.innerHTML = textCopy;
      }, 2000);
      return;
    });
  });
}
