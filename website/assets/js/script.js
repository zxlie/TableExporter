// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initDemo();
    initFAQ();
    initScrollEffects();
    initBackToTop();
    initSmoothScroll();
});

// 导航栏功能
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 移动端菜单切换
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // 点击菜单项后关闭移动端菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// 演示区域功能
function initDemo() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // 演示按钮点击效果
    const exportBtns = document.querySelectorAll('.export-btn');
    exportBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 添加加载效果
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在导出...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // 模拟导出过程
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> 导出成功！';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                }, 1500);
            }, 2000);
            
            // 显示提示信息
            showNotification('演示：表格导出功能已触发！实际使用中会下载Excel文件。', 'success');
        });
    });
}

// FAQ功能
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // 关闭所有其他FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前项状态
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// 滚动动画效果
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // 需要动画的元素
    const animateElements = document.querySelectorAll(
        '.feature-card, .step-item, .faq-item, .hero-text, .hero-image'
    );
    
    animateElements.forEach(element => {
        element.classList.add('fade-in-up');
        observer.observe(element);
    });
    
    // 数字动画
    const statNumbers = document.querySelectorAll('.stat-number');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                numberObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => {
        numberObserver.observe(number);
    });
}

// 数字动画函数
function animateNumber(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[\d,]/g, '');
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        if (suffix.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (suffix.includes('K')) {
            element.textContent = Math.floor(current / 1000) + 'K+';
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, 16);
}

// 回到顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑固定导航栏的高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 通知提示功能
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // 关闭按钮样式
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 14px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动移除
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// 页面加载动画
window.addEventListener('load', function() {
    // 隐藏加载动画（如果有的话）
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // 开始英雄区域动画
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.style.animation = 'fadeInUp 1s ease forwards';
    }
    
    if (heroImage) {
        heroImage.style.animation = 'fadeInUp 1s ease 0.3s forwards';
        heroImage.style.opacity = '0';
        setTimeout(() => {
            heroImage.style.opacity = '1';
        }, 300);
    }
});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭移动端菜单
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面发生错误:', e.error);
});

// 图片懒加载
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 在DOMContentLoaded中调用懒加载
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
});

// 分享项目功能
function shareProject() {
    const shareData = {
        title: 'TableExporter - 表格导出神器',
        text: '智能识别网页表格，一键导出Excel！支持复杂表格、数据分析必备，让数据处理变得简单高效。',
        url: window.location.href
    };
    
    // 检查是否支持Web Share API
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => {
                showNotification('感谢您的分享！', 'success');
            })
            .catch((error) => {
                console.log('分享失败:', error);
                fallbackShare();
            });
    } else {
        fallbackShare();
    }
}

// 备用分享方法
function fallbackShare() {
    const shareText = `TableExporter - 表格导出神器\n智能识别网页表格，一键导出Excel！\n${window.location.href}`;
    
    // 尝试复制到剪贴板
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText)
            .then(() => {
                showNotification('分享链接已复制到剪贴板！', 'success');
            })
            .catch(() => {
                showShareModal(shareText);
            });
    } else {
        showShareModal(shareText);
    }
}

// 显示分享模态框
function showShareModal(shareText) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <div class="share-modal-header">
                <h3>分享 TableExporter</h3>
                <button class="share-modal-close">&times;</button>
            </div>
            <div class="share-modal-body">
                <p>复制下面的文本分享给朋友：</p>
                <textarea readonly class="share-text">${shareText}</textarea>
                <div class="share-buttons">
                    <button class="btn btn-primary copy-btn">复制文本</button>
                    <a href="https://weibo.com/intent/tweet?text=${encodeURIComponent(shareText)}" target="_blank" class="btn btn-secondary">
                        <i class="fab fa-weibo"></i> 分享到微博
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .share-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .share-modal-content {
            background: white;
            border-radius: 12px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }
        
        .share-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .share-modal-header h3 {
            margin: 0;
            color: #333;
        }
        
        .share-modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .share-modal-body {
            padding: 20px;
        }
        
        .share-text {
            width: 100%;
            height: 100px;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            resize: none;
            font-family: inherit;
            margin: 15px 0;
        }
        
        .share-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .copy-btn {
            flex: 1;
            min-width: 120px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // 绑定事件
    const closeBtn = modal.querySelector('.share-modal-close');
    const copyBtn = modal.querySelector('.copy-btn');
    const textarea = modal.querySelector('.share-text');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });
    
    copyBtn.addEventListener('click', () => {
        textarea.select();
        document.execCommand('copy');
        showNotification('文本已复制到剪贴板！', 'success');
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    // 自动选中文本
    textarea.select();
}

// 导出给全局使用
window.TableExporterSite = {
    showNotification,
    removeNotification,
    shareProject
};

// 将shareProject函数暴露到全局作用域，以便HTML中的onclick可以调用
window.shareProject = shareProject; 