// کارپێکردنی مۆنێی مۆبایل
const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ڕەنگکردنی ئەو بەشەی (مینیۆیەی) کە بەکارهێنەر تیایدایە
document.addEventListener("DOMContentLoaded", () => {
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html"; // ئەگەر لە پەڕەی سەرەتا بوو
  }

  const navItems = document.querySelectorAll("nav ul a");
  navItems.forEach((link) => {
    // ئەگەر لینکی مینیۆکە هەمان ناوی پەڕەکەی ئێستای هەبوو، ڕەنگەکەی شین بکە
    if (link.getAttribute("href") === currentPage) {
      link.style.color = "var(--primary)";
    }
  });
});

// شاردنەوەیا لۆدینگ سکرینێ
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 850);
  }
});

// سیستەمێ ژمێرکەرێ سەرەدانان
// سیستەمێ ژمێرکەرێ سەرەدانان بۆ هەمی لاپەران وەک ئێک
document.addEventListener("DOMContentLoaded", () => {
  const countElement = document.getElementById("view-count");
  if (countElement) {
    // یەک ناڤێ هەڤپشک (site_total_visits) بۆ هەمی لاپەران بکار دئینین
    let visits = localStorage.getItem("site_total_visits");

    if (visits) {
      // ئەگەر جارا ئێکێ نەبیت، یەکێ لێ زێدە بکە
      visits = parseInt(visits) + 1;
    } else {
      // ئەگەر جارا ئێکێ بیت، ل سەر ڤێ ژمارێ دەستپێ بکە
      visits = 1555;
    }

    // پاشکەفتکرنا ژمارێ دا کو لاپەرێن دی ژی هەمان تشت بخوینن
    localStorage.setItem("site_total_visits", visits);
    countElement.innerText = visits;
  }
});

// گۆڕینی تابەکانی پارەدان
function openPayment(evt, paymentMethod) {
  let tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }

  let tabBtns = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].classList.remove("active");
  }

  let selectedTab = document.getElementById(paymentMethod);
  if (selectedTab) {
    selectedTab.classList.add("active");
    if (evt && evt.currentTarget) {
      evt.currentTarget.classList.add("active");
    }
  }
}

// سیستەمی کۆپیکردنی ژمارەی پارەدان
function copyNumber(btn, number) {
  // کۆپیکردنی ژمارەکە
  navigator.clipboard.writeText(number);

  // گۆڕینی ئایکۆنەکە بۆ نیشانەی ڕاست (سەرکەوتوو)
  let icon = btn.querySelector("i");
  icon.classList.remove("fa-copy");
  icon.classList.add("fa-check");

  // گەڕانەوەی ئایکۆنەکە بۆ باری ئاسایی پاش ٢ چرکە
  setTimeout(() => {
    icon.classList.remove("fa-check");
    icon.classList.add("fa-copy");
  }, 2000);
}
// ناردنی فیدباک بێی چوونە دەرەوە لە پەڕەکە (AJAX)
document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm");
  const successMessage = document.getElementById("successMessage");
  const submitBtn = document.getElementById("submit-btn");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault(); // ڕێگری کردن لە چوونە پەڕەی تر

      // گۆڕینی دوگمەکە بۆ کاتی ناردن
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML =
        'چاوەڕێ بە... <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      const formData = new FormData(this);

      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json", // ئەمە وادەکات formsubmit پەڕەکە نەگۆڕێت
        },
      })
        .then((response) => {
          if (response.ok) {
            feedbackForm.style.display = "none"; // شاردنەوەی فۆڕمەکە
            successMessage.style.display = "block"; // نیشاندانی پەیامی سەرکەوتن
          } else {
            alert("هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵ بدەوە.");
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;
          }
        })
        .catch((error) => {
          alert("کێشە لە هێڵی ئینتەرنێت هەیە، تکایە دووبارە هەوڵ بدەوە.");
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.disabled = false;
        });
    });
  }
});
