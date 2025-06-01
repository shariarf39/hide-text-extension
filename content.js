const sensitiveKeywords = ["password", "email", "username", "ssn", "card", "phone"];

function hideSensitiveText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    sensitiveKeywords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      text = text.replace(regex, match => "•".repeat(match.length));
    });
    node.textContent = text;
  } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
    node.childNodes.forEach(hideSensitiveText);
  }
}

window.addEventListener("load", () => {
  hideSensitiveText(document.body);
});