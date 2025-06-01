const symbolSelect = document.getElementById("symbol");
symbolSelect.addEventListener("change", () => {
  localStorage.setItem("maskSymbol", symbolSelect.value);
});

const undoBtn = document.getElementById("undoBtn");
undoBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        document.querySelectorAll("span[data-original-text]").forEach(span => {
          const text = document.createTextNode(span.dataset.originalText);
          span.replaceWith(text);
        });
      }
    });
  });
});

const screenshotBtn = document.getElementById("screenshotBtn");
screenshotBtn.addEventListener("click", () => {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "screenshot.png";
    a.click();
  });
});

const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("darkMode", "disabled");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }
});