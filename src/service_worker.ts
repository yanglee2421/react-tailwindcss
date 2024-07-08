chrome.storage.sync.onChanged.addListener((data) => {
  const newValue = JSON.parse(data.useSettingStore.newValue);

  toggleContextMenus(newValue.state.showContextMenus);
});

chrome.runtime.onStartup.addListener(async () => {
  const data = await chrome.storage.sync.get("useSettingStore");

  console.log("onStartup", data);

  if (!data.useSettingStore) {
    return;
  }

  const newValue = JSON.parse(data.useSettingStore);

  toggleContextMenus(newValue.state.showContextMenus);
});

chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.sync.get("useSettingStore");

  console.log("onInstalled", data);

  if (!data.useSettingStore) {
    return;
  }

  const newValue = JSON.parse(data.useSettingStore);

  toggleContextMenus(newValue.state.showContextMenus);
});

function toggleContextMenus(showContextMenus: boolean) {
  const id = "WarpDriven Crawler";
  const title = chrome.i18n.getMessage("contextMenus");

  if (showContextMenus) {
    chrome.contextMenus.create({ id, title });
    chrome.contextMenus.onClicked.addListener(contextMenusListener);
    return;
  }

  chrome.contextMenus.removeAll();
  chrome.contextMenus.onClicked.removeListener(contextMenusListener);
}

function contextMenusListener(
  btn: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab,
) {
  console.log(btn, tab);
}
