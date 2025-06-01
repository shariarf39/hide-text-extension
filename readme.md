

## 📌 Hide Sensitive Text – Chrome Extension

A lightweight Chrome extension that allows users to **hide sensitive information** on any webpage before taking a screenshot. Simply select any text, right-click, and choose "Hide Selected Text" to replace it with a symbol (e.g., `***`, `❤️`, etc.). You can also undo hidden text from the popup.

---

### 📷 Use Case

* Privacy before screenshots
* Blur personal or secret information
* Clean UI for documentation

---

## 🔧 Features

* ✅ Right-click context menu to hide selected text
* ✅ Replace text with symbols like `***`, `🔒`, `❤️`, or `❌`
* ✅ Popup settings to choose your preferred symbol
* ✅ Undo all hidden text with one click
* ✅ Lightweight, fast, and offline-capable

---

## 📁 Folder Structure

```
hide-text-extension/
├── manifest.json         # Extension manifest file
├── background.js         # Handles context menu logic
├── content.js            # (Optional for extra features)
├── popup.html            # Popup interface
├── popup.js              # Symbol selection & undo logic
├── style.css             # Popup styling
├── README.md             # Documentation
```

---

## 🛠️ Installation (for Development)

1. Clone this repo:

   ```bash
   git clone https://github.com/your-username/hide-text-extension.git
   ```
2. Open **Google Chrome** and go to `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the `hide-text-extension` folder

---

## 🚀 How to Use

1. Select any text on a webpage
2. Right-click → Click **"Hide Selected Text"**
3. The text will be replaced with your selected symbol
4. To undo, click the extension icon and press **Undo All**

---

## ⚙️ Customization

You can choose a replacement symbol from:

* `***`
* `❤️`
* `🔒`
* `❌`

Just open the extension popup and select your preferred option.

---

## 📦 loaded

* 🔄 Automatic hiding of sensitive keywords (e.g., “password”, “email”)
* 🖼️ One-click screenshot after hiding
* 🌙 Dark mode for popup UI

---

## 📜 License

MIT License. Free for personal and commercial use.

---

## 🤝 Contributing

Pull requests are welcome! If you find bugs or want a feature, feel free to open an issue.

---

## 🔗 Author

**Md Fahim Shariar**
[🔗 Website](http://fabred.net) | [📧 Email](mailto:shariarfahim21@gmail.com)

---

