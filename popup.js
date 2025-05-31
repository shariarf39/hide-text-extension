const symbolSelect = document.getElementById('symbolSelect');
const clearButton = document.getElementById('clearHidden');

symbolSelect.addEventListener('change', () => {
  chrome.storage.local.set({ replaceSymbol: symbolSelect.value });
});

clearButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const originalMap = window._hiddenOriginalMap || {};
        for (const [key, val] of Object.entries(originalMap)) {
          const el = document.querySelector(`[data-hide-id="${key}"]`);
          if (el) {
            el.textContent = val;
            el.style.backgroundColor = "";
            el.removeAttribute('data-hide-id');
          }
        }
        window._hiddenOriginalMap = {};
      }
    });
  });
});
