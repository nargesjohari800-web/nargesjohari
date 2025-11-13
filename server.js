
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1️⃣ سرو کردن فایل‌های استاتیک از پوشه public
app.use(express.static(path.join(__dirname, 'public')));

// 2️⃣ مسیر اصلی
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3️⃣ SPA support: مسیرهای داخلی به index.html هدایت شوند
app.get('/:page', (req, res, next) => {
  const pagePath = path.join(__dirname, 'public', req.params.page + '.html');
  res.sendFile(pagePath, (err) => {
    if (err) {
      next(); // اگر فایل وجود نداشت => به 404 می‌رود
    }
  });
});

// 4️⃣ مسیر catch-all برای صفحات 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// 5️⃣ اجرای سرور
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// =================== افکت ذره‌بین / زوم پویا ===================
document.querySelectorAll('.cert-image').forEach(container => {
  const img = container.querySelector('img');

  container.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = 'scale(2)'; // میزان زوم دلخواه
  });

  container.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center';
  });
});
// فعال کردن زوم در موبایل با لمس
document.querySelectorAll('.cert-image img').forEach(img => {
  img.addEventListener('click', () => {
    if (!img.classList.contains('zoomed')) {
      // فقط زوم کن و بقیه تصاویر رو ریست کن
      document.querySelectorAll('.cert-image img').forEach(i => i.classList.remove('zoomed'));
      img.classList.add('zoomed');
    } else {
      // اگر دوباره زد، زوم رو بردار
      img.classList.remove('zoomed');
    }
  });
});

