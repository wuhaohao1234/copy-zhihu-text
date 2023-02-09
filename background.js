let color = '#3aa757';

// 首次安装插件、插件更新、chrome浏览器更新时触发
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('插件默认颜色为: %c #3aa757', `color: ${color}`);
});