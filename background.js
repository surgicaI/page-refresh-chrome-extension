chrome.action.onClicked.addListener((tab) => {
  console.log('Action button clicked.');

  // Store the active tab's ID
  const activeTabId = tab.id;
  console.log(`Active tab ID stored: ${activeTabId}`);

  // Create the alarm, setting its period to 5 minutes (in milliseconds)
  chrome.alarms.create('refreshAlarm', { periodInMinutes: 5 });
  console.log('Alarm "refreshAlarm" created with a period of 5 minutes.');

  chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(`Alarm triggered: ${alarm.name}`);
    if (alarm.name === 'refreshAlarm') {
      // Refresh the stored tab
      console.log(`Tab with ID ${activeTabId} reloaded.`);
      chrome.tabs.reload(activeTabId);
    }
  });
});