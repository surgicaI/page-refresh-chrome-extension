const REFRESH_ALARM = "refreshAlarm"

// global variable to store last few logs
const logs = []
const MAX_LOGS = 50

function getFormattedTimestamp() {
    const now = new Date()
    return now.toLocaleString()
}

function logger(message) {
    let formattedMessage = `[${getFormattedTimestamp()}] ${message}`

    // Add the message to the logs array while keeping its length to MAX_LOGS
    if (logs.length >= MAX_LOGS) {
        logs.shift()
    }
    logs.push(formattedMessage)

    console.log(formattedMessage)
}

function status(numLogs = 10) {
    // print the last numLogs logs
    const logsToPrint = logs.slice(-numLogs)
    logsToPrint.forEach((log) => {
        console.log(log)
    })
}

chrome.action.onClicked.addListener((tab) => {
    logger("Action button clicked.")

    // Store the active tab's ID in chrome.storage.local
    const activeTabId = tab.id
    chrome.storage.local.get({ activeTabIds: [] }, (result) => {
        let activeTabIds = result.activeTabIds
        if (!activeTabIds.includes(activeTabId)) {
            activeTabIds.push(activeTabId)
            chrome.storage.local.set({ activeTabIds: activeTabIds }, () => {
                logger(`Active tab ID stored: ${activeTabId}`)
            })
        } else {
            logger(`Active tab ID ${activeTabId} is already stored.`)
        }
    })

    // Check if the alarm "refreshAlarm" already exists
    chrome.alarms.getAll((alarms) => {
        const refreshAlarmExists = alarms.some(
            (alarm) => alarm.name === REFRESH_ALARM
        )

        if (!refreshAlarmExists) {
            // Create the alarm, setting its period to 5 minutes (in milliseconds)
            chrome.alarms.create(REFRESH_ALARM, { periodInMinutes: 5 })
            logger('Alarm "refreshAlarm" created with a period of 5 minutes.')
        } else {
            logger('Alarm "refreshAlarm" already exists.')
        }
    })
})

const alarmListener = (alarm) => {
    logger(`Alarm triggered: ${alarm.name}`)
    if (alarm.name === REFRESH_ALARM) {
        // Retrieve the active tab IDs from chrome.storage.local
        chrome.storage.local.get("activeTabIds", (result) => {
            const activeTabIds = result.activeTabIds || []
            const updatedTabIds = [] // to store the tab IDs that are still open
            activeTabIds.forEach((activeTabId) => {
                // Check if the tab is still open before reloading
                chrome.tabs.get(activeTabId, (tab) => {
                    if (chrome.runtime.lastError) {
                        logger(
                            `Tab with ID ${activeTabId} is closed or does not exist. Removing tab ID from storage.`
                        )
                    } else {
                        logger(`Tab with ID ${activeTabId} reloaded.`)
                        chrome.tabs.reload(activeTabId)
                        updatedTabIds.push(activeTabId)
                    }
                })
            })
            // Update the active tab IDs in chrome.storage.local
            chrome.storage.local.set({ activeTabIds: updatedTabIds })
        })
    }
}

chrome.alarms.onAlarm.addListener(alarmListener)
