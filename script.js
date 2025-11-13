
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}


// ... کدهای بالا (لوگو و انیمیشن و ... دست نخورده) ...

document.addEventListener('DOMContentLoaded', () => {
  // المان‌ها
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const clearBtn = document.getElementById('clearBtn');
  const formMsg = document.getElementById('formMsg');
  const emailError = document.getElementById('emailError');

  // --- 1) پاک کردن فرم (با دکمه) ---
  clearBtn.addEventListener('click', () => {
    form.reset();
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    formMsg.style.display = 'none';
    emailError.style.display = 'none';
  });

  // --- 2) ارسال فرم با Node.js backend ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // بررسی خالی بودن
    if (!name || !email || !message) {
      alert('لطفاً همه فیلدها را پر کنید.');
      return;
    }

    // الگوی ساده برای ایمیل
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      emailError.textContent = 'ایمیل وارد شده معتبر نیست.';
      emailError.style.display = 'block';
      emailInput.focus();
      return;
    } else {
      emailError.style.display = 'none';
    }

    // ارسال داده‌ها به بک‌اند (Node.js)
    try {
      const res = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();
      formMsg.style.display = 'block';
      formMsg.textContent = data.msg || data.error;
      form.reset();
    } catch (error) {
      formMsg.style.display = 'block';
      formMsg.textContent = "خطایی رخ داد، دوباره تلاش کنید!";
    }
  });

  // --- 3) انیمیشن‌های progress (همون قبلی) ---
  window.addEventListener('load', () => {
    document.querySelectorAll('.progress-bar span').forEach(span => {
      const percent = parseFloat(span.getAttribute('data-percent')) || 0;
      if (span.animate) {
        span.animate(
          [{ width: '0%' }, { width: percent + '%' }],
          { duration: 1600, easing: 'ease-in-out', fill: 'forwards' }
        );
        span.style.width = percent + '%';
      } else {
        span.style.transition = 'width 1.6s ease-in-out';
        span.style.width = percent + '%';
      }
    });

    document.querySelectorAll('.circle').forEach(circle => {
      const progressEl = circle.querySelector('.progress');
      const percentEl = circle.querySelector('.percent');
      let r = 45;
      try {
        const rAttr = progressEl.getAttribute('r');
        if (rAttr) r = parseFloat(rAttr);
        else if (progressEl.r && progressEl.r.baseVal) r = progressEl.r.baseVal.value;
      } catch (err) { r = 45; }

      const circumference = 2 * Math.PI * r;
      progressEl.style.strokeDasharray = circumference;
      progressEl.style.strokeDashoffset = circumference;

      const cs = getComputedStyle(circle);
      let percent = parseFloat(cs.getPropertyValue('--percent')) || parseFloat(circle.dataset.percent) || 0;
      percent = Math.max(0, Math.min(100, percent));

      const targetOffset = circumference * (1 - percent / 100);
      if (progressEl.animate) {
        progressEl.animate(
          [{ strokeDashoffset: circumference }, { strokeDashoffset: targetOffset }],
          { duration: 1600, easing: 'ease-in-out', fill: 'forwards' }
        );
        progressEl.style.strokeDashoffset = targetOffset;
      } else {
        progressEl.style.transition = 'stroke-dashoffset 1.6s ease-in-out';
        progressEl.style.strokeDashoffset = targetOffset;
      }

      if (percentEl) {
        const duration = 1600;
        let start = null;
        function step(ts) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const value = Math.floor(progress * percent);
          percentEl.textContent = value + '%';
          if (progress < 1) requestAnimationFrame(step);
          else percentEl.textContent = Math.round(percent) + '%';
        }
        requestAnimationFrame(step);
      }
    });
  });
});
//  بزای مدارک 
    function toggleCertificates() {
      const section = document.getElementById("certs");
      if (section.style.display === "none" || section.style.display === "") {
        section.style.display = "block"; // باز کردن
      } else {
        section.style.display = "none";  // بستن
      }
    }
// ... بقیه کدها (هاور موبایل، منو، لوگو و ...) مثل قبل دست نخورده ...
// نمایش پیام برای لوگو (دسکتاپ و موبایل)
const logo = document.getElementById('logo');

if (logo) {
  function showMsg() {
    // اگه قبلاً پیام ساخته شده بود دوباره نسازه
    if (document.getElementById('logoMsg')) return;

    const msg = document.createElement('div');
    msg.id = 'logoMsg';
    msg.textContent = 'طراحی سایت و سئو پذیرا هستم';
    msg.style.position = 'absolute';
    msg.style.top = '70px';
    msg.style.left = '20px';
    msg.style.padding = '8px 12px';
    msg.style.background = 'rgba(0,0,0,0.7)';
    msg.style.color = '#fff';
    msg.style.borderRadius = '6px';
    msg.style.fontSize = '14px';
    msg.style.zIndex = '9999';
    document.body.appendChild(msg);
  }

  function hideMsg() {
    const msg = document.getElementById('logoMsg');
    if (msg) msg.remove();
  }

  // --- دسکتاپ: وقتی موس میره روی لوگو
  logo.addEventListener('mouseenter', showMsg);
  logo.addEventListener('mouseleave', hideMsg);

  // --- موبایل: وقتی روی لوگو کلیک کنی
  logo.addEventListener('click', () => {
    const msg = document.getElementById('logoMsg');
    if (msg) {
      hideMsg();
    } else {
      showMsg();
    }
  });
}
//  برای نمایش گواهینامه با عکس
document.querySelectorAll('.cert-list li').forEach(item => {
  item.addEventListener('click', () => {
    // اگر از قبل باز است، ببندش
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    } else {
      // بقیه را ببند
      document.querySelectorAll('.cert-list li').forEach(li => li.classList.remove('active'));
      // فقط همین را باز کن
      item.classList.add('active');
    }
  });
});

 // ===== بزرگ و کوچک شدن عکس پروفایل با کلیک =====
const profile = document.getElementById('portfolio');
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

if (profile) {
  profile.addEventListener('click', () => {
    profile.classList.toggle('enlarged');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    profile.classList.remove('enlarged');
    overlay.classList.remove('active');
  });
}
//  برای تغیر زبان 

    const resources = {
      fa: {
        translation: {
          title: "طراح وب | سئو کار —",
          intro: "من یک طراح و توسعه‌دهنده وب هستم که عاشق طراحی‌های مدرن و انیمیشن‌های زیباست.",
          name: "نرگس جوهری",
          role: "طراح وب (FrontEnd) و سئو (SEO)",
          location: "محل سکونت :بندر گناوه",
          workplace: "محل کار: دزفول",
          age: "سن: 23",
          skills: "مهارت‌ها",
          frontend: "FrontEnd",
          seo: "SEO",
          htmlcss: "HTML, CSS - 100%",
          javascript: "JavaScript - 100%",
          figma: "Figma - 100%",
          uiux: "UI/UX - 100%",
          gsc: "Google Search Console - 100%",
          ahref: "Ahref Webmaster Tools - 95%",
          screamingfrog: "Screaming Frog - 90%",
          vscode: "Visual Studio Code - 100%",
          wordpress: "WordPress - 95%",
          additionalSkills: "مهارت‌های تکمیلی",
          googlesheet: "Google Sheet - 100%",
          python: "Python - 60%",
          googleads: "Google Ads - 100%",
          analytics: "Google Analytics - 100%",
          icdl: "ICDL - 100%",
          english: "English - 50%",
          french: "Français - 10%",
          powershell: "PowerShell - 70%",
          tooltip: "طراحی سایت و سئو پذیرا هستم",
          heroTitle: "طراح وب | سئو کار —",
          heroIntro: "من یک طراح و توسعه‌دهنده وب هستم که عاشق طراحی‌های مدرن و انیمیشن‌های زیباست. هدفم اینه که تجربه کاربری شیک و لذت‌بخش ایجاد کنم.",
          project1Thumb: "وب‌سایت فروشگاهی",
          // project1Title: "ShopEase — فروشگاه آنلاین",
          // project1Desc: "طراحی رابط کاربری و تجربه کاربری برای پلتفرم تجارت الکترونیک.",
          project2Thumb: "داشبورد",
          project2Title: "AdminDash",
          project2Desc: "داشبورد مدیریت با نمودارها و فیلترهای پیچیده.",
          feature1Title: "ریسپانسیو کامل",
          feature1Desc: "سایت من روی موبایل، تبلت و دسکتاپ کاملاً سازگار است و تجربه کاربری راحت و جذابی ارائه می‌دهد",
          feature2Title: "سرعت بالا",
          feature2Desc: "صفحات به سرعت بارگذاری می‌شوند تا کاربران بدون انتظار طولانی از محتوا و نمونه کارها بازدید کنند",
          feature3Title: "قابل ویرایش",
          feature3Desc: "تمام بخش‌ها کامنت‌گذاری شده‌اند و به راحتی می‌توانید آن‌ها را طبق نیاز شخصی یا پروژه خود تغییر دهید",
          contactTitle: "تماس با ما",
          contactIntro: "فرم زیر را تکمیل کنید تا در کمتر از ۲۴ ساعت پاسخ بگیرید.",
          nameLabel: "نام",
          emailLabel: "ایمیل",
          messageLabel: "پیام",
          sendMessage: "ارسال پیام",
          clear: "پاک کردن",
          formMsg: "پیام ارسال شد. متشکرم!",
          Fully_responsive: "ریسپانسیو کامل",
          text0: "سایت من روی موبایل، تبلت و دسکتاپ کاملاً سازگار است و تجربه کاربری راحت و جذابی  ارائه می‌دهد",
          info_h3: "آموزش فرانت‌اند از صفر تا پروژه",
          infoh2: "آموزش های من",
          alt0: "پکیج آموزش فرانت‌اند",
          desc0: "به‌زودی پکیج‌های آموزشی من در پلتفرم‌های معتبر مثل و با‌سلام در این بخش قرار خواهند گرفت.",
          h22: "آموزش های من",
          h333: "گواهینامه‌ها",
          t0: "مشاهده گواهینامه‌ها",
          hoghogh: "© تمام حقوق برای نرگس جوهری محفوظ است. 2025",
          pack: "مشاهده پکیج",
          maktabkhooneh: "",
          Article: "مقاله",
          Article1p: "سوال اصلی این است آیا ممکن جئو جای سئو رو بگیرید؟",
          Article1: "مقاله رابطه بین سئو و جئو مکمل یا متضاد",
          Article2: "مقاله بررسی شایعات و واقعیت‌ها درباره الگوریتم گرگ گوگل و اثر آن بر سئو",
          Article2p: "الگوریتم معروف گرگ خاکستری بین سئو کاران چیست؟",
          Articledon: "دانلود فایل",
          // 
          project1Title: "seo— فروشگاه پکیج سئو",
          project1Desc:"طراحی فرانت اند و رابط کاربری و سئو بهیمه سازی یابت",
          project1Title1: "طراحی صحفه ساخت اکانت",
        project1Desc1:"طراحی رابط کاربری ",
project1Title2:"مقاله ماشین های کلاسیک",
  project1Title3:" سایت زندگی نامه کوروش کبیر",
project1Desc3:"طراحی انیمیشنی و رابط کاربری",
project1Title4:"سایت انجمن ",
project1Desc4:"طراحی رابط کاربری و تجربه کاربری برای پلتفرم تجارت الکترونیک",
    project1Title5:"ماگ فروشگاه آنلاین",   
    cleear:"پاک کردن ",
    send:"ارسال پیام",
}
      },
      en: {
        translation: {
          title: "Web Designer | SEO Specialist —",
          intro: "I am a web designer and developer who loves modern designs and smooth animations.",
          name: "Narges Johari",
          role: "Web Designer (FrontEnd) & SEO Specialist",
          location: "Location: Bandar Ganaveh",
          workplace: "Workplace: Dezful",
          age: "Age: 23",
          skills: "Skills",
          frontend: "FrontEnd",
          seo: "SEO",
          htmlcss: "HTML, CSS - 100%",
          javascript: "JavaScript - 100%",
          figma: "Figma - 100%",
          uiux: "UI/UX - 100%",
          gsc: "Google Search Console - 100%",
          ahref: "Ahref Webmaster Tools - 95%",
          screamingfrog: "Screaming Frog - 90%",
          vscode: "Visual Studio Code - 100%",
          wordpress: "WordPress - 95%",
          additionalSkills: "Additional Skills",
          googlesheet: "Google Sheet - 100%",
          python: "Python - 60%",
          googleads: "Google Ads - 100%",
          analytics: "Google Analytics - 100%",
          icdl: "ICDL - 100%",
          english: "English - 50%",
          french: "Français - 10%",
          powershell: "PowerShell - 70%",
          tooltip: "Open to website design and SEO projects",
          heroTitle: "Web Designer | SEO Specialist —",
          heroIntro: "I am a web designer and developer who loves modern designs and smooth animations. My goal is to create a sleek and enjoyable user experience.",
          project1Thumb: "E-commerce Website",
          project1Title: "ShopEase — Online Store",
          // project1Desc: "UI/UX design for an e-commerce platform.",
          project2Thumb: "Dashboard",
          project2Title: "AdminDash",
          project2Desc: "Management dashboard with charts and filters.",
          feature1Title: "Fully Responsive",
          feature1Desc: "My site works perfectly on mobile, tablet, and desktop with a smooth user experience.",
          feature2Title: "High Speed",
          feature2Desc: "Pages load quickly so users can view content and portfolios without long waits.",
          feature3Title: "Editable",
          feature3Desc: "All sections are commented so you can easily customize them for personal or project needs.",
          contactTitle: "Contact",
          contactIntro: "Fill out the form below to get a response within 24 hours.",
          nameLabel: "Name",
          emailLabel: "Email",
          messageLabel: "Message",
          sendMessage: "Send Message",
          clear: "Clear",
          formMsg: "Message sent. Thank you!",
          Fully_responsive: "Fully responsive",
          text0: "My site is fully responsive on mobile, tablet, and desktop, providing a comfortable and engaging user experience.",
          info_h3: "Front-end training from scratch to project",
          courseh2: "My tutorials",
          alt0: "Frontend Training Package",
          desc0: "Soon, my educational packages will be available in this section on reputable platforms such as Maktabkhoneh and Basalaam.",
          h22: "My training",
          h333: "Certificates",
          t0: "View certificates",
          hoghogh: "© All rights reserved to Narges Johari. 2025",
          pack: "View the package",
          maktabkhooneh: "maktabkhooneh",
          Article: "Article",
          Article1: "Article: The relationship between SEO and Geo is complementary or contradictory",
          Article1p: "The main question is, can Geo replace SEO?",
          Article2: "Article examining rumors and facts about Google's Wolf Algorithm and its impact on SEO",
          Article2p: "Article examining rumors and facts about Google's Wolf Algorithm and its impact on SEO",
          Articledon: "Download the file",
          // 
          project1Title: "SEO package store",
         project1Desc: "Front-end and user interface design and SEO optimization of Yabet",
    project1Title1:"Account creation page design",
project1Desc1:"User interface design",
project1Title2:"Classic cars article",
project1Title3:"Cyrus the Great Biography Site",
project1Desc3:"Animation and user interface design",
project1Title4:"Forum site",
project1Desc4:"User interface and user experience design for e-commerce platform",
project1Title5:"Mag online store",
    cleear:"Delete",
    send:"Send message ",
}
      }
    };

    i18next.init({ lng: 'fa', debug: false, resources }, function (err, t) {
      updateContent();
    });

    function updateContent() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerHTML = i18next.t(key);
      });
    }

    const langSwitch = document.getElementById('langSwitch');
    langSwitch.addEventListener('click', () => {
      const newLang = i18next.language === 'fa' ? 'en' : 'fa';
      i18next.changeLanguage(newLang, updateContent);
      langSwitch.textContent = newLang === 'fa' ? 'EN' : 'FA';
    });
