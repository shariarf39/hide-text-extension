// Handle symbol selection for masking
const symbolSelect = document.getElementById("symbol");
if (symbolSelect) {
  // Initialize from localStorage on load
  const savedSymbol = localStorage.getItem("maskSymbol");
  if (savedSymbol) symbolSelect.value = savedSymbol;

  symbolSelect.addEventListener("change", () => {
    localStorage.setItem("maskSymbol", symbolSelect.value);
  });
}

// Undo hidden/masked text
const undoBtn = document.getElementById("undoBtn");
if (undoBtn) {
  undoBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          document.querySelectorAll("span[data-original-text]").forEach(span => {
            const text = document.createTextNode(span.dataset.originalText);
            span.replaceWith(text);
          });
        }
      });
    });
  });
}

// Take a screenshot
const screenshotBtn = document.getElementById("screenshotBtn");
if (screenshotBtn) {
  screenshotBtn.addEventListener("click", () => {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "screenshot.png";
      a.click();
    });
  });
}

// Handle dark mode toggle
const darkToggle = document.getElementById("darkModeToggle");
if (darkToggle) {
  darkToggle.addEventListener("change", () => {
    if (darkToggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  });
}

// Initialize dark mode and masking toggle on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  // Dark mode init
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    if (darkToggle) darkToggle.checked = true;
  }

  // Mask symbol init
  if (symbolSelect) {
    const savedSymbol = localStorage.getItem("maskSymbol");
    if (savedSymbol) symbolSelect.value = savedSymbol;
  }

  // Initialize masking toggle from Chrome storage
  const toggleMasking = document.getElementById("toggleMasking");
  if (toggleMasking) {
    chrome.storage.local.get("maskingEnabled", (result) => {
      toggleMasking.checked = result.maskingEnabled || false;
    });

    toggleMasking.addEventListener("change", () => {
      chrome.storage.local.set({ maskingEnabled: toggleMasking.checked });
    });
  }
});
