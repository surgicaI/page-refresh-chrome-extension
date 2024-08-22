chrome.action.onClicked.addListener((tab) => {
  // Store the active tab's ID
  const activeTabId = tab.id;

  // Create the alarm, setting its period to 5 minutes (in milliseconds)
  chrome.alarms.create('refreshAlarm', { periodInMinutes: 5 });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'refreshAlarm') {
      // Refresh the stored tab
      chrome.tabs.reload(activeTabId);
    }
  });
});