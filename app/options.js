// Table Exporter Options Script

// 默认配置
const defaultConfig = {
    // 按钮样式设置
    buttonText: '导出数据到Excel（{count}条）',
    buttonStyle: 'default',
    buttonPosition: 'top',
    customStyle: {
        bgColor: '#ff9800',
        textColor: '#ffffff',
        fontSize: 17,
        borderRadius: 6
    },
    
    // Excel导出设置
    filename: '{title}_{date}_{index}',
    sheetName: 'Sheet1',
    dateFormat: 'YYYYMMDD',
    includeImages: true,
    includeLinks: true,
    preserveStyles: true,
    autoColumnWidth: true,
    freezeHeader: false,
    addBorders: true,
    maxImageWidth: 200,
    maxImageHeight: 150,
    compression: 'normal',
    
    // 性能设置
    maxRows: 10000,
    processingDelay: 600,
    showProgress: true,
    enableDebug: false
};

// 按钮样式预设
const buttonStyles = {
    default: {
        background: 'linear-gradient(90deg, #ff9800 0%, #ff3d00 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 16px rgba(255, 152, 0, 0.18)'
    },
    blue: {
        background: 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 16px rgba(33, 150, 243, 0.3)'
    },
    green: {
        background: 'linear-gradient(90deg, #4caf50 0%, #388e3c 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)'
    },
    purple: {
        background: 'linear-gradient(90deg, #9c27b0 0%, #7b1fa2 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 16px rgba(156, 39, 176, 0.3)'
    },
    red: {
        background: 'linear-gradient(90deg, #f44336 0%, #d32f2f 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 16px rgba(244, 67, 54, 0.3)'
    },
    dark: {
        background: 'linear-gradient(90deg, #424242 0%, #212121 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 16px rgba(66, 66, 66, 0.3)'
    },
    minimal: {
        background: '#ffffff',
        color: '#333333',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '2px solid #ddd'
    }
};

// DOM元素
let elements = {};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    loadSettings();
    bindEvents();
    updatePreview();
    checkWelcomeSection();
});

// 初始化DOM元素引用
function initializeElements() {
    elements = {
        // 按钮样式
        buttonText: document.getElementById('buttonText'),
        buttonStyle: document.getElementById('buttonStyle'),
        buttonPosition: document.getElementById('buttonPosition'),
        customStyleSection: document.getElementById('customStyleSection'),
        bgColor: document.getElementById('bgColor'),
        textColor: document.getElementById('textColor'),
        fontSize: document.getElementById('fontSize'),
        fontSizeValue: document.getElementById('fontSizeValue'),
        borderRadius: document.getElementById('borderRadius'),
        borderRadiusValue: document.getElementById('borderRadiusValue'),
        previewButton: document.getElementById('previewButton'),
        
        // Excel设置
        filename: document.getElementById('filename'),
        sheetName: document.getElementById('sheetName'),
        dateFormat: document.getElementById('dateFormat'),
        includeImages: document.getElementById('includeImages'),
        includeLinks: document.getElementById('includeLinks'),
        preserveStyles: document.getElementById('preserveStyles'),
        autoColumnWidth: document.getElementById('autoColumnWidth'),
        freezeHeader: document.getElementById('freezeHeader'),
        addBorders: document.getElementById('addBorders'),
        maxImageWidth: document.getElementById('maxImageWidth'),
        maxImageHeight: document.getElementById('maxImageHeight'),
        compression: document.getElementById('compression'),
        
        // 性能设置
        maxRows: document.getElementById('maxRows'),
        processingDelay: document.getElementById('processingDelay'),
        showProgress: document.getElementById('showProgress'),
        enableDebug: document.getElementById('enableDebug'),
        
        // 操作按钮
        saveButton: document.getElementById('saveButton'),
        resetButton: document.getElementById('resetButton'),
        exportConfig: document.getElementById('exportConfig'),
        importConfig: document.getElementById('importConfig'),
        configFile: document.getElementById('configFile'),
        status: document.getElementById('status'),
        welcomeSection: document.getElementById('welcomeSection'),
        dismissWelcome: document.getElementById('dismissWelcome')
    };
}

// 绑定事件
function bindEvents() {
    // 按钮样式相关
    elements.buttonText.addEventListener('input', updatePreview);
    elements.buttonStyle.addEventListener('change', handleStyleChange);
    elements.bgColor.addEventListener('input', updateCustomStyle);
    elements.textColor.addEventListener('input', updateCustomStyle);
    elements.fontSize.addEventListener('input', updateFontSize);
    elements.borderRadius.addEventListener('input', updateBorderRadius);
    
    // 操作按钮
    elements.saveButton.addEventListener('click', saveSettings);
    elements.resetButton.addEventListener('click', resetSettings);
    elements.exportConfig.addEventListener('click', exportConfiguration);
    elements.importConfig.addEventListener('click', () => elements.configFile.click());
    elements.configFile.addEventListener('change', importConfiguration);
    
    // 欢迎提示相关事件
    if (elements.dismissWelcome) {
        elements.dismissWelcome.addEventListener('click', dismissWelcome);
    }
}

// 处理样式切换
function handleStyleChange() {
    const selectedStyle = elements.buttonStyle.value;
    if (selectedStyle === 'custom') {
        elements.customStyleSection.style.display = 'block';
    } else {
        elements.customStyleSection.style.display = 'none';
    }
    updatePreview();
}

// 更新字体大小显示
function updateFontSize() {
    const size = elements.fontSize.value;
    elements.fontSizeValue.textContent = size + 'px';
    updateCustomStyle();
}

// 更新边框圆角显示
function updateBorderRadius() {
    const radius = elements.borderRadius.value;
    elements.borderRadiusValue.textContent = radius + 'px';
    updateCustomStyle();
}

// 更新自定义样式
function updateCustomStyle() {
    if (elements.buttonStyle.value === 'custom') {
        updatePreview();
    }
}

// 更新预览
function updatePreview() {
    const text = elements.buttonText.value || '导出数据到Excel（示例）';
    const displayText = text.replace('{count}', '示例');
    elements.previewButton.textContent = displayText;
    
    const selectedStyle = elements.buttonStyle.value;
    
    if (selectedStyle === 'custom') {
        const bgColor = elements.bgColor.value;
        const textColor = elements.textColor.value;
        const fontSize = elements.fontSize.value;
        const borderRadius = elements.borderRadius.value;
        
        elements.previewButton.style.cssText = `
            background: ${bgColor} !important;
            color: ${textColor} !important;
            font-size: ${fontSize}px !important;
            border-radius: ${borderRadius}px !important;
            padding: 12px 24px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        `;
    } else {
        const style = buttonStyles[selectedStyle];
        elements.previewButton.style.cssText = `
            background: ${style.background} !important;
            color: ${style.color} !important;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            border: ${style.border || 'none'};
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: ${style.boxShadow};
        `;
    }
}

// 加载设置
async function loadSettings() {
    try {
        const result = await chrome.storage.sync.get(['tableExporterConfig']);
        const config = result.tableExporterConfig || defaultConfig;
        
        // 按钮样式设置
        elements.buttonText.value = config.buttonText || defaultConfig.buttonText;
        elements.buttonStyle.value = config.buttonStyle || defaultConfig.buttonStyle;
        elements.buttonPosition.value = config.buttonPosition || defaultConfig.buttonPosition;
        
        // 自定义样式
        if (config.customStyle) {
            elements.bgColor.value = config.customStyle.bgColor || defaultConfig.customStyle.bgColor;
            elements.textColor.value = config.customStyle.textColor || defaultConfig.customStyle.textColor;
            elements.fontSize.value = config.customStyle.fontSize || defaultConfig.customStyle.fontSize;
            elements.borderRadius.value = config.customStyle.borderRadius || defaultConfig.customStyle.borderRadius;
            updateFontSize();
            updateBorderRadius();
        }
        
        // Excel设置
        elements.filename.value = config.filename || defaultConfig.filename;
        elements.sheetName.value = config.sheetName || defaultConfig.sheetName;
        elements.dateFormat.value = config.dateFormat || defaultConfig.dateFormat;
        elements.includeImages.checked = config.includeImages !== false;
        elements.includeLinks.checked = config.includeLinks !== false;
        elements.preserveStyles.checked = config.preserveStyles !== false;
        elements.autoColumnWidth.checked = config.autoColumnWidth !== false;
        elements.freezeHeader.checked = config.freezeHeader === true;
        elements.addBorders.checked = config.addBorders !== false;
        elements.maxImageWidth.value = config.maxImageWidth || defaultConfig.maxImageWidth;
        elements.maxImageHeight.value = config.maxImageHeight || defaultConfig.maxImageHeight;
        elements.compression.value = config.compression || defaultConfig.compression;
        
        // 性能设置
        elements.maxRows.value = config.maxRows || defaultConfig.maxRows;
        elements.processingDelay.value = config.processingDelay || defaultConfig.processingDelay;
        elements.showProgress.checked = config.showProgress !== false;
        elements.enableDebug.checked = config.enableDebug === true;
        
        handleStyleChange();
        updatePreview();
    } catch (error) {
        console.error('加载设置失败:', error);
        showStatus('加载设置失败', 'error');
    }
}

// 保存设置
async function saveSettings() {
    try {
        const config = {
            // 按钮样式设置
            buttonText: elements.buttonText.value,
            buttonStyle: elements.buttonStyle.value,
            buttonPosition: elements.buttonPosition.value,
            customStyle: {
                bgColor: elements.bgColor.value,
                textColor: elements.textColor.value,
                fontSize: parseInt(elements.fontSize.value),
                borderRadius: parseInt(elements.borderRadius.value)
            },
            
            // Excel设置
            filename: elements.filename.value,
            sheetName: elements.sheetName.value,
            dateFormat: elements.dateFormat.value,
            includeImages: elements.includeImages.checked,
            includeLinks: elements.includeLinks.checked,
            preserveStyles: elements.preserveStyles.checked,
            autoColumnWidth: elements.autoColumnWidth.checked,
            freezeHeader: elements.freezeHeader.checked,
            addBorders: elements.addBorders.checked,
            maxImageWidth: parseInt(elements.maxImageWidth.value) || 200,
            maxImageHeight: parseInt(elements.maxImageHeight.value) || 150,
            compression: elements.compression.value,
            
            // 性能设置
            maxRows: parseInt(elements.maxRows.value) || 10000,
            processingDelay: parseInt(elements.processingDelay.value) || 600,
            showProgress: elements.showProgress.checked,
            enableDebug: elements.enableDebug.checked
        };
        
        await chrome.storage.sync.set({ tableExporterConfig: config });
        showStatus('设置已保存！', 'success');
    } catch (error) {
        console.error('保存设置失败:', error);
        showStatus('保存设置失败', 'error');
    }
}

// 重置设置
async function resetSettings() {
    if (confirm('确定要重置所有设置为默认值吗？')) {
        try {
            await chrome.storage.sync.set({ tableExporterConfig: defaultConfig });
            await loadSettings();
            showStatus('设置已重置为默认值', 'success');
        } catch (error) {
            console.error('重置设置失败:', error);
            showStatus('重置设置失败', 'error');
        }
    }
}

// 导出配置
async function exportConfiguration() {
    try {
        const result = await chrome.storage.sync.get(['tableExporterConfig']);
        const config = result.tableExporterConfig || defaultConfig;
        
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'table-exporter-config.json';
        link.click();
        
        showStatus('配置已导出', 'success');
    } catch (error) {
        console.error('导出配置失败:', error);
        showStatus('导出配置失败', 'error');
    }
}

// 导入配置
function importConfiguration(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const config = JSON.parse(e.target.result);
            await chrome.storage.sync.set({ tableExporterConfig: config });
            await loadSettings();
            showStatus('配置已导入', 'success');
        } catch (error) {
            console.error('导入配置失败:', error);
            showStatus('导入配置失败：文件格式不正确', 'error');
        }
    };
    reader.readAsText(file);
}

// 显示状态消息
function showStatus(message, type) {
    elements.status.textContent = message;
    elements.status.className = `status ${type}`;
    elements.status.classList.remove('hidden');
    
    setTimeout(() => {
        elements.status.classList.add('hidden');
    }, 3000);
}

// 检查是否显示欢迎提示
async function checkWelcomeSection() {
    try {
        const result = await chrome.storage.local.get(['welcomeDismissed']);
        if (result.welcomeDismissed) {
            // 用户已经关闭过欢迎提示，隐藏它
            if (elements.welcomeSection) {
                elements.welcomeSection.style.display = 'none';
            }
        }
    } catch (error) {
        console.warn('检查欢迎提示状态失败:', error);
    }
}

// 关闭欢迎提示
async function dismissWelcome() {
    try {
        // 保存用户已关闭欢迎提示的状态
        await chrome.storage.local.set({ welcomeDismissed: true });
        
        // 隐藏欢迎提示
        if (elements.welcomeSection) {
            elements.welcomeSection.style.transition = 'opacity 0.3s ease';
            elements.welcomeSection.style.opacity = '0';
            setTimeout(() => {
                elements.welcomeSection.style.display = 'none';
            }, 300);
        }
        
        showStatus('欢迎提示已关闭', 'success');
    } catch (error) {
        console.error('关闭欢迎提示失败:', error);
        showStatus('操作失败', 'error');
    }
} 
