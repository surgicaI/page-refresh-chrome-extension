# Auto Refresh Chrome Extension

## Description

Auto Refresh is a simple Chrome extension that automatically refreshes the active tab every 10 minutes. This can be useful for keeping web pages up-to-date without manual intervention.

## Installation

Follow these steps to install the Auto Refresh extension in Chrome:

1. **Download or Clone the Repository**:
   - Download the repository as a ZIP file and extract it, or clone it using Git:
     ```sh
     git clone https://github.com/yourusername/page-refresh-chrome-extension.git
     ```

2. **Navigate to the Extension Directory**:
   - Open your terminal and navigate to the directory where the extension files are located:
     ```sh
     cd /path/to/page-refresh-chrome-extension
     ```

3. **Open Chrome Extensions Page**:
   - Open Google Chrome and go to `chrome://extensions/`.

4. **Enable Developer Mode**:
   - In the top right corner, toggle the switch to enable "Developer mode".

5. **Load Unpacked Extension**:
   - Click the "Load unpacked" button and select the directory where the extension files are located.

6. **Verify Installation**:
   - The Auto Refresh extension should now appear in your list of installed extensions. It will automatically refresh the active tab every 10 minutes.

## Files

- `manifest.json`: Contains the metadata for the Chrome extension.
- `background.js`: Contains the logic to refresh the active tab every 10 minutes.
- `images/icon.png`: The icon for the extension.

## License

This project is licensed under the MIT License.

