# TableExporter - 表格导出神器 🚀

<div align="center">

![TableExporter Logo](app/img/icon-128.png)

**智能识别网页表格，一键导出Excel！**

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue?style=for-the-badge&logo=google-chrome)](https://chrome.google.com/webstore/detail/kiiicbilcnneedomahkhhmmoaojdcdmo)
[![Version](https://img.shields.io/badge/version-2025.0526.2200-green?style=for-the-badge)](https://github.com/yourusername/TableExporter)
[![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)](LICENSE)
[![Downloads](https://img.shields.io/badge/downloads-10K+-brightgreen?style=for-the-badge)](https://chrome.google.com/webstore/detail/kiiicbilcnneedomahkhhmmoaojdcdmo)

[🌐 官方网站](https://www.baidufe.com/table-reporter) | [📖 使用文档](#使用教程) | [🐛 问题反馈](https://github.com/yourusername/TableExporter/issues) | [💬 讨论交流](https://github.com/yourusername/TableExporter/discussions)

</div>

## 📖 项目简介

TableExporter 是一款专业的 Chrome 浏览器扩展插件，专注于网页表格数据的智能识别和导出。无论是简单的数据表格还是复杂的合并单元格表格，TableExporter 都能完美处理，让数据分析工作变得简单高效。

### 🎯 核心优势

- **🧠 智能识别**：自动识别页面中的所有表格，支持动态内容和复杂结构
- **🎨 完美还原**：所见即所得的样式保持，包括颜色、字体、图片、链接等
- **⚡ 高性能**：按需加载设计，支持万行级数据处理，不影响页面性能
- **🛡️ 安全可靠**：完全本地处理，零数据上传，保护用户隐私
- **🎛️ 高度自定义**：丰富的配置选项，满足各种个性化需求

## ✨ 功能特性

### 🎨 界面自定义
- **7种预设主题**：默认橙色、蓝色商务、绿色清新、紫色科技、红色警示、暗色主题、极简风格
- **完全自定义样式**：支持自定义背景色、文字颜色、字体大小、圆角等
- **灵活按钮位置**：可选择显示在表格上方、下方或上下方同时显示
- **文案模板支持**：支持变量模板，如 `导出数据到Excel（{count}条）`

### 📊 Excel导出功能
- **所见即所得**：完整保持原始样式格式，包括字体、颜色、背景、对齐方式
- **图片完美导出**：自动将网页图片转换为Excel嵌入图片，支持尺寸控制
- **超链接保持**：保持链接的可点击性和样式
- **合并单元格支持**：准确处理 rowspan 和 colspan
- **自动列宽调整**：根据内容智能调整列宽

### ⚙️ 高级配置
- **文件名模板**：支持变量 `{title}`, `{date}`, `{time}`, `{index}`
- **多种日期格式**：YYYYMMDD、YYYY-MM-DD、YYYY/MM/DD 等
- **图片尺寸控制**：设置最大图片宽度和高度
- **性能参数调节**：最大导出行数、处理延迟等
- **功能开关**：可选择性开启/关闭图片、链接、样式导出

### 🔧 便捷操作
- **按需加载**：点击插件图标时才注入脚本，不影响页面性能
- **Toggle开关**：首次点击注入脚本，再次点击可激活/停用功能
- **动态监听**：自动监听表格内容变化，实时更新按钮状态
- **进度提示**：导出过程中显示进度动画
- **配置管理**：支持配置导出/导入，方便备份和分享

## 🚀 快速开始

### 📦 安装方法

#### 方法一：Chrome Web Store（推荐）
1. 访问 [Chrome Web Store](https://chrome.google.com/webstore/detail/kiiicbilcnneedomahkhhmmoaojdcdmo)
2. 点击"添加至 Chrome"按钮
3. 确认安装权限
4. 安装完成后会自动打开配置页面

#### 方法二：开发者模式安装
1. 下载最新版本的 [table-reporter-extension.zip](https://github.com/yourusername/TableExporter/releases)
2. 解压到本地文件夹
3. 打开 Chrome 浏览器，进入 `chrome://extensions/`
4. 开启右上角的"开发者模式"
5. 点击"加载已解压的扩展程序"
6. 选择解压后的插件文件夹
7. 安装完成后会自动打开配置页面

### 📋 使用教程

#### 第一步：配置插件
1. **首次配置**：安装后自动打开的配置页面中设置样式和参数
2. **后续配置**：右键点击插件图标，选择"选项"进入配置页面
3. **选择样式**：从7种预设主题中选择，或自定义样式
4. **设置参数**：配置文件名模板、导出选项等
5. **保存设置**：点击"保存设置"使配置生效

#### 第二步：激活功能
1. **注入脚本**：在需要导出表格的页面，首次点击插件图标注入脚本
2. **激活功能**：脚本注入后，再次点击插件图标可切换激活/停用状态
3. **状态指示**：插件图标会显示不同状态（灰色=未注入，彩色=已激活）

#### 第三步：导出表格
1. **自动识别**：激活后插件会自动识别页面上的表格
2. **显示按钮**：在每个表格上方/下方显示"导出数据到Excel"按钮
3. **点击导出**：点击按钮开始导出，显示进度动画
4. **文件下载**：Excel文件会自动下载到默认下载文件夹

## 🛠️ 开发构建

### 环境要求
- Node.js 14.0+
- npm 6.0+

### 本地开发
```bash
# 克隆项目
git clone https://github.com/yourusername/TableExporter.git
cd TableExporter

# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run watch

# 构建项目
npm run build

# 构建并打包
npm run zip
```

### 项目结构
```
TableExporter/
├── app/                    # 源代码目录
│   ├── img/               # 图标资源
│   ├── background.js      # 后台脚本
│   ├── content.js         # 内容脚本
│   ├── options.html       # 配置页面
│   ├── options.js         # 配置脚本
│   ├── options.css        # 配置样式
│   ├── manifest.json      # 插件清单
│   └── exceljs.min.js     # Excel处理库
├── dist/                  # 构建输出目录
├── website/               # 官方网站
├── gulpfile.js           # 构建配置
└── package.json          # 项目配置
```

## ⚙️ 配置说明

### 按钮样式配置

#### 预设主题
```javascript
const themes = {
    default: { bgColor: '#ff9800', textColor: '#ffffff' },  // 橙色渐变
    blue: { bgColor: '#2196f3', textColor: '#ffffff' },     // 蓝色商务
    green: { bgColor: '#4caf50', textColor: '#ffffff' },    // 绿色清新
    purple: { bgColor: '#9c27b0', textColor: '#ffffff' },   // 紫色科技
    red: { bgColor: '#f44336', textColor: '#ffffff' },      // 红色警示
    dark: { bgColor: '#424242', textColor: '#ffffff' },     // 暗色主题
    minimal: { bgColor: 'transparent', textColor: '#333' }  // 极简边框
};
```

#### 自定义样式
```javascript
{
    bgColor: '#ff9800',      // 背景色
    textColor: '#ffffff',    // 文字颜色
    fontSize: 17,            // 字体大小(px)
    borderRadius: 6,         // 圆角大小(px)
    position: 'both'         // 按钮位置: top/bottom/both
}
```

### 导出配置

#### 文件名模板
```javascript
{
    filename: '{title}_{date}_{index}',
    // 支持变量：
    // {title} - 页面标题
    // {date} - 日期（格式可配置）
    // {time} - 时间（HHMM格式）
    // {index} - 表格序号
}
```

#### 功能开关
```javascript
{
    includeImages: true,     // 导出图片
    includeLinks: true,      // 保持超链接
    preserveStyles: true,    // 保持样式
    autoColumnWidth: true,   // 自动调整列宽
    freezeHeader: false,     // 冻结表头
    addBorders: true         // 添加边框
}
```

## 🔧 技术实现

### 核心技术栈
- **Chrome Extension Manifest V3**：现代化的扩展开发框架
- **ExcelJS**：强大的Excel文件生成库
- **MutationObserver**：监听DOM变化，实现动态表格识别
- **Canvas API**：图片处理和base64转换
- **Chrome Storage API**：配置数据持久化存储

### 关键算法

#### 表格识别算法
```javascript
function findTables() {
    const tables = document.querySelectorAll('table');
    return Array.from(tables).filter(table => {
        const rows = table.querySelectorAll('tr');
        const cells = table.querySelectorAll('td, th');
        return rows.length >= 2 && cells.length >= 2;
    });
}
```

#### 样式复制算法
```javascript
function copyCellStyle(excelCell, domCell) {
    const style = window.getComputedStyle(domCell);
    
    excelCell.font = {
        name: style.fontFamily.split(',')[0],
        size: parseInt(style.fontSize) * 0.75,
        bold: style.fontWeight === 'bold',
        color: { argb: 'FF' + rgbToHex(style.color) }
    };
    
    excelCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF' + rgbToHex(style.backgroundColor) }
    };
}
```

## 📊 性能优化

### 内存管理
- 按需加载脚本，避免内存泄漏
- 图片处理采用流式处理，减少内存占用
- 及时清理临时对象和事件监听器

### 处理速度
- 异步处理大数据量表格
- 分批处理图片转换
- 智能跳过隐藏和无效元素

### 兼容性
- 支持 Chrome 88+
- 兼容各种网站的表格结构
- 处理动态生成的表格内容

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献
1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范
- 遵循 ESLint 代码规范
- 添加必要的注释和文档
- 确保新功能有对应的测试
- 更新相关文档

## 📝 更新日志

### v2025.0526.2200
- 🎉 全新的界面设计和用户体验
- ✨ 新增7种预设主题样式
- 🚀 性能优化，支持更大数据量
- 🐛 修复若干已知问题
- 📚 完善文档和使用教程

### v2024.1201.1800
- 🎨 新增自定义样式功能
- 📊 改进Excel导出质量
- 🔧 优化配置管理
- 🛡️ 增强安全性

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [ExcelJS](https://github.com/exceljs/exceljs) - 优秀的Excel处理库
- [Chrome Extensions](https://developer.chrome.com/docs/extensions/) - 强大的扩展开发平台
- 所有贡献者和用户的支持与反馈

## 📞 联系我们

- 🌐 官方网站：[https://www.baidufe.com/table-reporter](https://www.baidufe.com/table-reporter)
- 📧 邮箱：support@baidufe.com
- 🐛 问题反馈：[GitHub Issues](https://github.com/zxlie/TableExporter/issues)
- 💬 讨论交流：[GitHub Discussions](https://github.com/zxlie/TableExporter/discussions)

---

<div align="center">

**如果这个项目对你有帮助，请给我们一个 ⭐ Star！**

Made with ❤️ by [TableExporter Team](https://github.com/zxlie/TableExporter)

</div> 
