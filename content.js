function hideSensitiveText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;

    // Mask email
    text = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi, match => "•".repeat(match.length));

    // Mask Bangladeshi phone number
    text = text.replace(/\b01[0-9]{9}\b/g, match => "•".repeat(match.length));

    // Mask strong password-like strings
    text = text.replace(/\b[a-zA-Z0-9!@#$%^&*()_+=\-]{8,}\b/g, match => "•".repeat(match.length));

    node.textContent = text;
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    node.nodeName !== "SCRIPT" &&
    node.nodeName !== "STYLE"
  ) {
    node.childNodes.forEach(hideSensitiveText);
  }
}

// Wait for DOM and then run based on user setting
chrome.storage.local.get("maskingEnabled", (result) => {
  if (result.maskingEnabled) {
    hideSensitiveText(document.body);
  }
});
