chrome.action.onClicked.addListener(async (tab: chrome.tabs.Tab) => {
  if (!tab || !tab.id) {
    return;
  }

  await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['worker.js']
  });
});
