let tableObserver = null;
let domObserver = null;
let debounceTimer = null;
let isActive = true; // 功能激活状态
let config = null; // 配置缓存

// 标记脚本已注入
window.tableExporterInjected = true;

// 防止重复初始化
if (!window.tableExporterInitialized) {
    window.tableExporterInitialized = true;
    // 脚本注入后立即初始化
    loadConfigAndInit();
} else {
    console.log('Table Exporter: 脚本已存在，跳过重复初始化');
}

// 加载配置并初始化
async function loadConfigAndInit() {
    try {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            const result = await chrome.storage.sync.get(['tableExporterConfig']);
            config = result.tableExporterConfig || getDefaultConfig();
        } else {
            console.warn('Table Exporter: Chrome Storage API 不可用，使用默认配置');
            config = getDefaultConfig();
        }
    } catch (error) {
        console.warn('Table Exporter: 无法加载配置，使用默认设置', error);
        config = getDefaultConfig();
    }
    
    // 确保在DOM准备好后再初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initObservers);
    } else {
        initObservers();
    }
}

// 获取默认配置
function getDefaultConfig() {
    return {
        buttonText: '导出数据到Excel（{count}条）',
        buttonStyle: 'default',
        buttonPosition: 'top',
        customStyle: {
            bgColor: '#ff9800',
            textColor: '#ffffff',
            fontSize: 17,
            borderRadius: 6
        },
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
        maxRows: 10000,
        processingDelay: 600,
        showProgress: true,
        enableDebug: false
    };
}

// 切换功能状态的全局函数
window.toggleTableExporter = function() {
    isActive = !isActive;
    if (isActive) {
        // 激活：显示按钮并开始监听
        addExportButtons();
        observeTables();
        console.log('Table Exporter 已激活');
    } else {
        // 停用：隐藏按钮并停止监听
        hideExportButtons();
        stopObservers();
        console.log('Table Exporter 已停用');
    }
};

function initObservers() {
    addExportButtons();
    observeTables();
}

function debounceAddExportButtons() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (isActive) {
            addExportButtons();
        }
    }, 200); // 200ms防抖
}

// 隐藏所有导出按钮
function hideExportButtons() {
    const buttons = document.querySelectorAll('.table-export-btn');
    buttons.forEach(btn => btn.remove());
}

// 停止所有监听器
function stopObservers() {
    if (tableObserver) {
        tableObserver.disconnect();
        tableObserver = null;
    }
    if (domObserver) {
        domObserver.disconnect();
        domObserver = null;
    }
    if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
    }
}

// 获取按钮样式
function getButtonStyle() {
    if (!config) {
        return {
            background: 'linear-gradient(90deg, #ff9800 0%, #ff3d00 100%)',
            color: '#ffffff',
            fontSize: 17,
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(255, 152, 0, 0.18)'
        };
    }
    
    const buttonStyles = {
        default: {
            background: 'linear-gradient(90deg, #ff9800 0%, #ff3d00 100%)',
            color: '#ffffff',
            fontSize: 17,
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(255, 152, 0, 0.18)'
        },
        blue: {
            background: 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)',
            color: '#ffffff',
            fontSize: 17,
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(33, 150, 243, 0.3)'
        },
        green: {
            background: 'linear-gradient(90deg, #4caf50 0%, #388e3c 100%)',
            color: '#ffffff',
            fontSize: 17,
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)'
        },
        purple: {
            background: 'linear-gradient(90deg, #9c27b0 0%, #7b1fa2 100%)',
            color: '#ffffff',
            fontSize: 17,
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(156, 39, 176, 0.3)'
        },
        red: {
            background: 'linear-gradient(90deg, #f44336 0%, #d32f2f 100%)',
            color: '#ffffff',
            fontSize: 17,
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(244, 67, 54, 0.3)'
        },
        dark: {
            background: 'linear-gradient(90deg, #424242 0%, #212121 100%)',
            color: '#ffffff',
            fontSize: 17,
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(66, 66, 66, 0.3)'
        },
        minimal: {
            background: '#ffffff',
            color: '#333333',
            fontSize: 17,
            borderRadius: 6,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '2px solid #ddd'
        }
    };
    
    if (config.buttonStyle === 'custom') {
        return {
            background: config.customStyle.bgColor,
            color: config.customStyle.textColor,
            fontSize: config.customStyle.fontSize,
            borderRadius: config.customStyle.borderRadius,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        };
    }
    
    return buttonStyles[config.buttonStyle] || buttonStyles.default;
}

function getExportFileName(idx) {
    if (!config) return `table_${idx+1}.xlsx`;
    
    let filename = config.filename || '{title}_{date}_{index}';
    
    // 获取页面标题
    let title = document.title && document.title.trim();
    if (!title) {
        try {
            title = location.hostname.replace(/^www\./, '');
        } catch {
            title = 'table';
        }
    }
    
    // 获取日期
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    
    let dateStr;
    switch (config.dateFormat) {
        case 'YYYY-MM-DD':
            dateStr = `${yyyy}-${mm}-${dd}`;
            break;
        case 'YYYY/MM/DD':
            dateStr = `${yyyy}/${mm}/${dd}`;
            break;
        case 'MMDDYYYY':
            dateStr = `${mm}${dd}${yyyy}`;
            break;
        case 'DD-MM-YYYY':
            dateStr = `${dd}-${mm}-${yyyy}`;
            break;
        default:
            dateStr = `${yyyy}${mm}${dd}`;
    }
    
    const timeStr = `${hh}${min}`;
    
    // 替换模板变量
    filename = filename
        .replace('{title}', title)
        .replace('{date}', dateStr)
        .replace('{time}', timeStr)
        .replace('{index}', idx + 1);
    
    return `${filename}.xlsx`;
}

// 图片转base64
function imgToBase64(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth || img.width || 100;
                canvas.height = img.naturalHeight || img.height || 100;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const base64 = canvas.toDataURL('image/png');
                resolve(base64.split(',')[1]); // 只返回base64数据部分
            } catch (e) {
                console.warn('图片转换失败:', e);
                resolve(null);
            }
        };
        img.onerror = () => {
            console.warn('图片加载失败:', url);
            resolve(null);
        };
        img.src = url;
    });
}

// RGB颜色转换为hex
function rgbToHex(rgb) {
    if (!rgb || rgb === 'rgba(0, 0, 0, 0)' || rgb === 'transparent') return null;
    
    if (rgb.startsWith('#')) {
        return rgb.replace('#', '').toUpperCase().padStart(6, '0');
    }
    
    const result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return null;
    
    const hex = result.slice(0, 3)
        .map(x => parseInt(x).toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
    
    return hex === '000000' ? null : hex;
}

// 获取字体大小（转换为磅值）
function getFontSize(fontSize) {
    if (!fontSize) return 11;
    const size = parseInt(fontSize);
    return Math.max(8, Math.min(72, Math.round(size * 0.75))); // px转pt的近似值
}

// 复制单元格样式
function copyCellStyle(excelCell, domCell) {
    if (!config || !config.preserveStyles) return;
    
    const style = window.getComputedStyle(domCell);
    
    // 字体样式
    const fontColor = rgbToHex(style.color);
    const fontSize = getFontSize(style.fontSize);
    const fontWeight = style.fontWeight;
    const fontStyle = style.fontStyle;
    
    excelCell.font = {
        name: style.fontFamily.split(',')[0].replace(/['"]/g, '').trim() || 'Arial',
        size: fontSize,
        bold: fontWeight === 'bold' || parseInt(fontWeight) >= 700,
        italic: fontStyle === 'italic',
        color: fontColor ? { argb: 'FF' + fontColor } : undefined
    };
    
    // 背景色
    const bgColor = rgbToHex(style.backgroundColor);
    if (bgColor) {
        excelCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF' + bgColor }
        };
    }
    
    // 对齐方式
    let horizontal = 'left';
    if (style.textAlign === 'center') horizontal = 'center';
    else if (style.textAlign === 'right') horizontal = 'right';
    
    excelCell.alignment = {
        horizontal: horizontal,
        vertical: 'middle',
        wrapText: true
    };
    
    // 边框
    const borderStyle = 'thin';
    const borderColor = { argb: 'FF000000' };
    
    if (style.borderTopWidth && parseFloat(style.borderTopWidth) > 0) {
        excelCell.border = excelCell.border || {};
        excelCell.border.top = { style: borderStyle, color: borderColor };
    }
    if (style.borderBottomWidth && parseFloat(style.borderBottomWidth) > 0) {
        excelCell.border = excelCell.border || {};
        excelCell.border.bottom = { style: borderStyle, color: borderColor };
    }
    if (style.borderLeftWidth && parseFloat(style.borderLeftWidth) > 0) {
        excelCell.border = excelCell.border || {};
        excelCell.border.left = { style: borderStyle, color: borderColor };
    }
    if (style.borderRightWidth && parseFloat(style.borderRightWidth) > 0) {
        excelCell.border = excelCell.border || {};
        excelCell.border.right = { style: borderStyle, color: borderColor };
    }
}

// 处理单元格内容
async function fillCellContent(excelCell, domCell, worksheet) {
    // 处理图片
    const img = domCell.querySelector('img');
    if (img && img.src && !img.src.startsWith('data:') && config && config.includeImages) {
        try {
            const base64 = await imgToBase64(img.src);
            if (base64) {
                const imageId = worksheet.workbook.addImage({
                    base64: base64,
                    extension: 'png'
                });
                
                // 获取图片显示尺寸
                const imgWidth = img.offsetWidth || img.width || 80;
                const imgHeight = img.offsetHeight || img.height || 40;
                
                const maxWidth = config ? config.maxImageWidth : 200;
                const maxHeight = config ? config.maxImageHeight : 150;
                
                worksheet.addImage(imageId, {
                    tl: { col: excelCell.col - 1, row: excelCell.row - 1 },
                    ext: { width: Math.min(imgWidth, maxWidth), height: Math.min(imgHeight, maxHeight) }
                });
                
                // 调整行高以适应图片
                const row = worksheet.getRow(excelCell.row);
                const requiredHeight = Math.max(row.height || 15, (imgHeight * 0.75) + 5);
                row.height = Math.min(requiredHeight, 150);
                
                excelCell.value = ''; // 图片单元格不设置文本
                return;
            }
        } catch (e) {
            console.warn('处理图片失败:', e);
        }
    }
    
    // 处理超链接
    const link = domCell.querySelector('a');
    if (link && link.href && config && config.includeLinks) {
        const text = link.textContent || link.innerText || link.href;
        
        // 设置超链接值
        excelCell.value = {
            text: text,
            hyperlink: link.href
        };
        
        // 标记这个单元格包含超链接，稍后统一设置样式
        excelCell._isHyperlink = true;
        
        return;
    }
    
    // 处理普通文本内容
    let cellText = domCell.innerText || domCell.textContent || '';
    cellText = cellText.trim();
    
    // 尝试转换数字
    if (cellText && !isNaN(cellText) && !isNaN(parseFloat(cellText))) {
        const num = parseFloat(cellText);
        if (num.toString() === cellText || num.toFixed(2).toString() === cellText) {
            excelCell.value = num;
            return;
        }
    }
    
    excelCell.value = cellText;
}

// 主要的导出函数
async function exportTableToExcelJS(table, idx) {
    if (typeof window.ExcelJS === 'undefined') {
        alert('ExcelJS库未加载，请刷新页面重试');
        return;
    }
    
    const workbook = new window.ExcelJS.Workbook();
    const sheetName = config ? config.sheetName : 'Sheet1';
    const worksheet = workbook.addWorksheet(sheetName);
    
    // 记录合并单元格的信息
    const mergedCells = new Set();
    
    // 遍历表格行
    for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
        const row = table.rows[rowIndex];
        let colOffset = 0;
        
        for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
            const domCell = row.cells[cellIndex];
            
            // 计算实际的Excel列位置（跳过已合并的单元格）
            let excelCol = colOffset + 1;
            while (mergedCells.has(`${rowIndex + 1},${excelCol}`)) {
                excelCol++;
            }
            
            const excelCell = worksheet.getCell(rowIndex + 1, excelCol);
            
            // 填充单元格内容
            await fillCellContent(excelCell, domCell, worksheet);
            
            // 复制样式
            copyCellStyle(excelCell, domCell);
            
            // 处理合并单元格
            const rowSpan = domCell.rowSpan || 1;
            const colSpan = domCell.colSpan || 1;
            
            if (rowSpan > 1 || colSpan > 1) {
                const startRow = rowIndex + 1;
                const startCol = excelCol;
                const endRow = startRow + rowSpan - 1;
                const endCol = startCol + colSpan - 1;
                
                worksheet.mergeCells(startRow, startCol, endRow, endCol);
                
                // 标记被合并的单元格
                for (let r = startRow; r <= endRow; r++) {
                    for (let c = startCol; c <= endCol; c++) {
                        if (r !== startRow || c !== startCol) {
                            mergedCells.add(`${r},${c}`);
                        }
                    }
                }
            }
            
            colOffset = excelCol + (domCell.colSpan || 1) - 1;
        }
    }
    
    // 自动调整列宽
    worksheet.columns.forEach((column, index) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: false }, (cell) => {
            const cellLength = cell.value ? cell.value.toString().length : 0;
            maxLength = Math.max(maxLength, cellLength);
        });
        column.width = Math.min(Math.max(maxLength + 2, 10), 50);
    });
    
    // 统一设置超链接样式
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell._isHyperlink) {
                cell.font = {
                    name: 'Arial',
                    size: 11,
                    color: { argb: 'FF0563C1' }, // Excel默认超链接蓝色
                    underline: true
                };
            }
        });
    });
    
    // 生成文件并下载
    try {
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = getExportFileName(idx);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('导出失败:', error);
        alert('导出失败，请重试');
    }
}

function addExportButtons() {
    // 如果功能未激活，直接返回
    if (!isActive) return;
    
    // 断开 observer，防止自身操作触发死循环
    if (tableObserver) tableObserver.disconnect();

    const tables = document.querySelectorAll('table');
    tables.forEach((table, idx) => {
        // 统计数据条数（tbody下tr的数量）
        let rowCount = 0;
        const tbodys = table.getElementsByTagName('tbody');
        for (let i = 0; i < tbodys.length; i++) {
            rowCount += tbodys[i].getElementsByTagName('tr').length;
        }
        
        // 如果没有tbody，计算table直接下的tr
        if (tbodys.length === 0) {
            rowCount = table.getElementsByTagName('tr').length;
        }
        
        // 先移除已有按钮，避免重复
        if (table.previousElementSibling && 
            table.previousElementSibling.classList && 
            table.previousElementSibling.classList.contains('table-export-btn')) {
            table.previousElementSibling.remove();
        }
        
        // 数据条数为0则不显示按钮
        if (rowCount === 0) {
            return;
        }
        
        const btn = document.createElement('button');
        const buttonText = config ? config.buttonText.replace('{count}', rowCount) : `导出数据到Excel（${rowCount}条）`;
        btn.textContent = buttonText;
        btn.className = 'table-export-btn';
        // 获取按钮样式
        let buttonStyle = getButtonStyle();
        
        btn.style.cssText = `
            display: block;
            margin: 8px 0;
            padding: 10px 22px;
            font-size: ${buttonStyle.fontSize}px;
            font-weight: bold;
            color: ${buttonStyle.color};
            background: ${buttonStyle.background};
            border: ${buttonStyle.border || 'none'};
            border-radius: ${buttonStyle.borderRadius}px;
            box-shadow: ${buttonStyle.boxShadow};
            cursor: pointer;
            outline: none;
            letter-spacing: 1px;
            transition: background 0.2s, box-shadow 0.2s;
            z-index: 9999;
            position: relative;
        `;
        
        btn.onmouseover = () => {
            btn.style.transform = 'translateY(-2px)';
            btn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        };
        
        btn.onmouseout = () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = buttonStyle.boxShadow;
        };
        
        btn.onclick = async function() {
            if (btn.disabled) return; // 防止重复点击
            
            btn.disabled = true;
            let progress = 0;
            const originalText = btn.textContent;
            btn.textContent = `正在导出...（0%）`;
            btn.style.opacity = '0.7';
            
            // 假进度条动画
            const fakeProgress = setInterval(() => {
                progress += Math.floor(Math.random() * 10) + 5;
                if (progress > 90) progress = 90;
                btn.textContent = `正在导出...（${progress}%）`;
            }, 120);
            
            const processingDelay = config ? config.processingDelay : 600;
            
            setTimeout(async () => {
                try {
                    await exportTableToExcelJS(table, idx);
                } catch (error) {
                    console.error('导出过程中出错:', error);
                    alert('导出失败，请重试');
                } finally {
                    clearInterval(fakeProgress);
                    btn.textContent = `正在导出...（100%）`;
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                        btn.style.opacity = '1';
                    }, Math.min(processingDelay, 600));
                }
            }, processingDelay + Math.random() * 400);
        };
        
        table.parentNode.insertBefore(btn, table);
    });

    // 操作完再恢复 observer（仅在激活状态下）
    if (isActive) {
        observeTables();
    }
}

// 监听所有table及其tbody的变化
function observeTables() {
    // 如果功能未激活，不启动监听
    if (!isActive) return;
    
    if (tableObserver) tableObserver.disconnect();
    tableObserver = new MutationObserver(() => {
        debounceAddExportButtons();
    });
    
    // 只监听tbody的子节点变化，减少无关触发
    document.querySelectorAll('table tbody').forEach(el => {
        tableObserver.observe(el, {childList: true, subtree: false});
    });
    
    // 也监听没有tbody的table
    document.querySelectorAll('table:not(:has(tbody))').forEach(el => {
        tableObserver.observe(el, {childList: true, subtree: false});
    });

    // 监听DOM新增table的情况
    if (!domObserver) {
        domObserver = new MutationObserver(() => {
            debounceAddExportButtons();
            observeTables(); // 新增table时重新监听
        });
        domObserver.observe(document.body, {childList: true, subtree: true});
    }
} 
