function getFormattedTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').split('.')[0];
}

chrome.action.onClicked.addListener((tab) => {
  console.log(`[${getFormattedTimestamp()}] Action button clicked.`);

  // Store the active tab's ID
  const activeTabId = tab.id;
  console.log(`[${getFormattedTimestamp()}] Active tab ID stored: ${activeTabId}`);

  // Create the alarm, setting its period to 5 minutes (in milliseconds)
  chrome.alarms.create('refreshAlarm', { periodInMinutes: 5 });
  console.log(`[${getFormattedTimestamp()}] Alarm "refreshAlarm" created with a period of 5 minutes.`);

  const alarmListener = (alarm) => {
    console.log(`[${getFormattedTimestamp()}] Alarm triggered: ${alarm.name}`);
    if (alarm.name === 'refreshAlarm') {
      // Check if the tab is still open before reloading
      chrome.tabs.get(activeTabId, (tab) => {
        if (chrome.runtime.lastError) {
          console.log(`[${getFormattedTimestamp()}] Tab with ID ${activeTabId} is closed or does not exist. Removing listener.`);
          chrome.alarms.onAlarm.removeListener(alarmListener);
        } else {
          console.log(`[${getFormattedTimestamp()}] Tab with ID ${activeTabId} reloaded.`);
          chrome.tabs.reload(activeTabId);
        }
      });
    }
  };

  chrome.alarms.onAlarm.addListener(alarmListener);
});