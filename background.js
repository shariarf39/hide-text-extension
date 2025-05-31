chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "hide-text",
    title: "Hide Selected Text",
    contexts: ["selection"]
  });

  chrome.storage.local.set({ replaceSymbol: "***" }); // default
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "hide-text") {
    chrome.storage.local.get("replaceSymbol", ({ replaceSymbol }) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [replaceSymbol],
        func: (symbol) => {
          const sel = window.getSelection();
          if (!sel.rangeCount) return;

          const range = sel.getRangeAt(0);
          const span = document.createElement("span");

          // Store original content
          const originalText = range.toString();
          const hideId = Math.random().toString(36).substr(2, 9);

          span.textContent = symbol;
          span.setAttribute("data-hide-id", hideId);
          span.style.backgroundColor = "rgba(255,0,0,0.1)";
          range.deleteContents();
          range.insertNode(span);

          // Save original to window map
          window._hiddenOriginalMap = window._hiddenOriginalMap || {};
          window._hiddenOriginalMap[hideId] = originalText;
        }
      });
    });
  }
});
