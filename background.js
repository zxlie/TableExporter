// Table Exporter - Background Script
// 点击插件图标时切换功能状态

// 插件安装或更新时自动打开配置页面
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // 首次安装时打开配置页面
    chrome.tabs.create({
      url: chrome.runtime.getURL('options.html')
    });
  } else if (details.reason === 'update') {
    // 更新时也可以选择打开配置页面（可选）
    // chrome.tabs.create({
    //   url: chrome.runtime.getURL('options.html')
    // });
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  try {
    // 检查页面是否已经注入了脚本
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => window.tableExporterInjected === true
    });
    
    const isInjected = result[0].result;
    
    if (!isInjected) {
      // 第一次点击：注入脚本
      await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["exceljs.min.js", "content.js"]
      });
      console.log('Table Exporter 脚本已注入');
    } else {
      // 再次点击：切换显示状态
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          if (window.toggleTableExporter) {
            window.toggleTableExporter();
          }
        }
      });
    }
  } catch (error) {
    console.error('Table Exporter 执行失败:', error);
    // 某些特殊页面可能无法执行脚本
    console.warn('Table Exporter: 此页面不支持脚本注入');
  }
}); 
