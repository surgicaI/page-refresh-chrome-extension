chrome.action.onClicked.addListener((tab) => {
  setInterval(() => {
    chrome.tabs.reload(tab.id);
  }, 10 * 60 * 1000); // 10 minutes in milliseconds
});
