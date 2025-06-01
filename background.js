chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "hide-text",
    title: "Hide Selected Text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "hide-text") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          const span = document.createElement("span");
          const selectedText = range.toString();
          const symbol = localStorage.getItem("maskSymbol") || "*";
          span.textContent = symbol.repeat(selectedText.length);
          span.style.backgroundColor = "";
          span.dataset.originalText = selectedText;
          range.deleteContents();
          range.insertNode(span);
        }
      }
    });
  }
});