chrome.runtime.onInstalled.addListener(() => {
  setInterval(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }, 10 * 60 * 1000); // 10 minutes in milliseconds
});
