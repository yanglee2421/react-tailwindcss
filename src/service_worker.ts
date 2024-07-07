chrome.storage.sync.onChanged.addListener((data) => {
  if (!data.settings) return;

  const { newValue } = data.settings;
  if (!newValue) return;

  const showContextMenus = Boolean(newValue.showContextMenus);
  toggleContextMenus(showContextMenus);
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
  chrome.tabs.sendMessage(tab?.id || 0, "msg");
}
