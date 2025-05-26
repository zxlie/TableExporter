# TableExporter - 表格导出神器

> 🚀 智能识别网页表格，一键导出Excel！支持复杂表格、数据分析必备，让数据处理变得简单高效。

## ✨ 主要特性

### 🎨 可自定义的界面
- **多种按钮样式预设**：默认橙色、蓝色商务、绿色清新、紫色科技、红色警示、暗色主题、极简风格
- **自定义样式**：支持自定义背景色、文字颜色、字体大小、圆角
- **按钮文案模板**：支持变量模板，如 `导出数据到Excel（{count}条）`
- **按钮位置控制**：可选择显示在表格上方、下方或上下方同时显示

### 📊 完整的Excel导出功能
- **"所见即所得"**：完整保持原始样式格式
- **图片导出**：自动将网页图片转换为Excel嵌入图片
- **超链接保持**：保持链接的可点击性和蓝色下划线样式
- **合并单元格支持**：准确处理rowspan和colspan
- **样式保持**：字体、颜色、背景、对齐方式、边框等
- **自动列宽调整**：根据内容自动调整列宽

### ⚙️ 丰富的配置选项
- **文件名模板**：支持变量 `{title}`, `{date}`, `{time}`, `{index}`
- **工作表名称**：自定义Excel工作表名称
- **日期格式**：多种日期格式选择（YYYYMMDD、YYYY-MM-DD等）
- **图片尺寸控制**：设置最大图片宽度和高度
- **性能设置**：最大导出行数、处理延迟等
- **功能开关**：可选择性开启/关闭图片、链接、样式导出

### 🔧 便捷的操作体验
- **按需加载**：点击插件图标时才注入脚本，不影响页面性能
- **Toggle开关**：首次点击注入脚本，再次点击可激活/停用功能
- **动态监听**：自动监听表格内容变化
- **进度提示**：导出过程中显示进度动画
- **配置管理**：支持配置导出/导入

## 🚀 快速开始

### 安装方法
1. 下载插件源码
2. 打开Chrome浏览器，进入 `chrome://extensions/`
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择插件文件夹
6. **安装完成后会自动打开配置页面**，方便进行首次设置

### 基本使用
1. **首次配置**：安装后自动打开的配置页面中设置样式和参数
2. **注入脚本**：在需要导出表格的页面，首次点击插件图标注入脚本
3. **激活功能**：脚本注入后，再次点击插件图标可切换激活/停用状态
4. **自动识别**：激活后插件会自动识别页面上的表格
5. **导出表格**：点击表格上方/下方的"导出数据到Excel"按钮
6. **文件下载**：Excel文件会自动下载到默认下载文件夹

### 配置选项
1. **打开设置**：右键点击插件图标，选择"选项"
2. **修改配置**：在设置页面中调整各项参数
3. **保存应用**：点击"保存设置"使配置生效
4. **测试效果**：在包含表格的页面测试新配置

## ⚙️ 详细配置说明

### 按钮样式设置

#### 预设样式
- **default**：橙色渐变（默认）
- **blue**：蓝色商务风格
- **green**：绿色清新风格
- **purple**：紫色科技风格
- **red**：红色警示风格
- **dark**：暗色主题
- **minimal**：极简边框风格

#### 自定义样式
```javascript
// 自定义样式配置示例
{
    bgColor: '#ff9800',      // 背景色
    textColor: '#ffffff',    // 文字颜色
    fontSize: 17,            // 字体大小(px)
    borderRadius: 6          // 圆角大小(px)
}
```

#### 按钮文案模板
```javascript
// 支持的变量
{
    buttonText: '导出数据到Excel（{count}条）'  // {count}会被替换为实际行数
}
```

### Excel导出设置

#### 文件名模板
```javascript
// 文件名变量说明
{
    filename: '{title}_{date}_{index}'
    // {title} - 页面标题
    // {date} - 日期（格式可配置）
    // {time} - 时间（HHMM格式）
    // {index} - 表格序号
}
```

#### 日期格式选项
- `YYYYMMDD`: 20240101
- `YYYY-MM-DD`: 2024-01-01
- `YYYY/MM/DD`: 2024/01/01
- `MMDDYYYY`: 01012024
- `DD-MM-YYYY`: 01-01-2024

#### 功能开关
```javascript
{
    includeImages: true,     // 是否导出图片
    includeLinks: true,      // 是否保持超链接
    preserveStyles: true,    // 是否保持样式
    autoColumnWidth: true,   // 是否自动调整列宽
    freezeHeader: false,     // 是否冻结表头
    addBorders: true         // 是否添加边框
}
```

#### 图片设置
```javascript
{
    maxImageWidth: 200,      // 最大图片宽度(px)
    maxImageHeight: 150      // 最大图片高度(px)
}
```

#### 性能设置
```javascript
{
    maxRows: 10000,          // 最大导出行数
    processingDelay: 600,    // 处理延迟(ms)
    showProgress: true,      // 显示进度动画
    enableDebug: false       // 启用调试日志
}
```

### 配置管理

#### 导出配置
1. 在选项页面点击"导出配置"
2. 下载 `table-exporter-config.json` 文件
3. 可用于备份或分享配置

#### 导入配置
1. 在选项页面点击"导入配置"
2. 选择之前导出的JSON配置文件
3. 配置会立即生效

#### 重置配置
1. 点击"重置默认"按钮
2. 确认后恢复到默认配置

## 🛠️ 技术实现

### 核心技术栈
- **ExcelJS**：用于生成Excel文件
- **Chrome Extension API**：插件核心功能
- **MutationObserver**：监听DOM变化
- **Canvas API**：图片base64转换
- **Chrome Storage API**：配置数据存储

### 主要功能模块

#### 1. 配置管理 (`options.js`)
- 配置加载和保存
- 实时预览效果
- 配置导入导出
- 默认值管理

#### 2. 内容脚本 (`content.js`)
- 表格识别和监听
- 按钮动态添加
- 样式复制和处理
- Excel文件生成

#### 3. 后台脚本 (`background.js`)
- 插件状态管理
- 脚本注入控制
- Toggle功能实现

#### 4. 样式处理
```javascript
// 样式复制示例
function copyCellStyle(excelCell, domCell) {
    const style = window.getComputedStyle(domCell);
    
    // 字体样式
    excelCell.font = {
        name: style.fontFamily.split(',')[0],
        size: parseInt(style.fontSize) * 0.75,
        bold: style.fontWeight === 'bold',
        color: { argb: 'FF' + rgbToHex(style.color) }
    };
    
    // 背景色
    excelCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF' + rgbToHex(style.backgroundColor) }
    };
}
```

## 📋 测试说明

### 功能测试
1. **网页测试**：使用 `test-page.html` 测试页面
2. **配置测试**：在 `options.html` 中验证各项配置功能
3. **导出质量检查**：验证Excel文件的格式和内容完整性

### 兼容性测试
- ✅ Chrome 88+
- ✅ 静态表格
- ✅ 动态表格
- ✅ 复杂样式表格
- ✅ 包含图片和链接的表格

### 已知限制
- 跨域图片可能无法导出
- 某些CSS3样式可能不完全支持
- 超大表格（>10000行）可能影响性能
- Chrome内部页面（`chrome://`、`chrome-extension://`）无法注入脚本

## 🤝 贡献指南

### 开发环境
```bash
# 安装依赖（如果需要）
npm install

# 开发模式
# 直接修改源文件，在Chrome扩展管理页面重新加载即可
```

### 代码结构
```
table-exporter/
├── manifest.json           # 插件配置文件
├── background.js           # 后台脚本
├── content.js             # 内容脚本
├── options.html           # 选项页面
├── options.css            # 选项页面样式
├── options.js             # 选项页面脚本
├── exceljs.min.js         # ExcelJS库
├── test-page.html         # 测试页面
├── img/                   # 图标文件夹
└── README.md             # 说明文档
```

### 提交规范
- 功能开发请提交到 `feature/*` 分支
- Bug修复请提交到 `hotfix/*` 分支
- 确保代码通过测试

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🆘 问题反馈

如果遇到问题或有功能建议，请：

1. 检查控制台是否有错误信息
2. 确认插件是否已正确安装和激活
3. 尝试刷新页面后重试
4. 提交Issue时请附上：
   - Chrome版本
   - 错误页面URL
   - 控制台错误信息
   - 复现步骤

---

**享受所见即所得的表格导出体验！** 🚀 
