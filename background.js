const REFRESH_ALARM = 'refreshAlarm';

function getFormattedTimestamp() {
  const now = new Date();
  return now.toLocaleString();
}

function logger(message) {
  console.log(`[${getFormattedTimestamp()}] ${message}`);
}

chrome.action.onClicked.addListener((tab) => {
  logger('Action button clicked.');

  // Store the active tab's ID
  const activeTabId = tab.id;
  logger(`Active tab ID stored: ${activeTabId}`);

  // Check if the alarm "refreshAlarm" already exists
  chrome.alarms.getAll((alarms) => {
    const refreshAlarmExists = alarms.some(alarm => alarm.name === REFRESH_ALARM);

    if (!refreshAlarmExists) {
      // Create the alarm, setting its period to 5 minutes (in milliseconds)
      chrome.alarms.create(REFRESH_ALARM, { periodInMinutes: 5 });
      logger('Alarm "refreshAlarm" created with a period of 5 minutes.');
    } else {
      logger('Alarm "refreshAlarm" already exists.');
    }
  });

  const alarmListener = (alarm) => {
    logger(`Alarm triggered: ${alarm.name}`);
    if (alarm.name === REFRESH_ALARM) {
      // Check if the tab is still open before reloading
      chrome.tabs.get(activeTabId, (tab) => {
        if (chrome.runtime.lastError) {
          logger(`Tab with ID ${activeTabId} is closed or does not exist. Removing listener.`);
          chrome.alarms.onAlarm.removeListener(alarmListener);
        } else {
          logger(`Tab with ID ${activeTabId} reloaded.`);
          chrome.tabs.reload(activeTabId);
        }
      });
    }
  };

  chrome.alarms.onAlarm.addListener(alarmListener);
});