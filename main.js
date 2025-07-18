// عناصر القائمة الجانبية وزر الفتح والإغلاق
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const menuClose = document.getElementById('menu-close');
const menuBackdrop = document.getElementById('menu-backdrop');

// فتح القائمة الجانبية
function openMenu() {
  if (mainNav) {
    mainNav.classList.add('open');
    mainNav.style.display = 'block';
  }
  if (menuBackdrop) menuBackdrop.style.display = 'block';
}

// غلق القائمة الجانبية
function closeMenu() {
  if (mainNav) {
    mainNav.classList.remove('open');
    mainNav.style.display = 'none';
  }
  if (menuBackdrop) menuBackdrop.style.display = 'none';
}

// تفعيل زر القائمة
if (menuToggle) {
  menuToggle.style.display = 'block';
  menuToggle.onclick = openMenu;
}

// تفعيل زر الإغلاق
if (menuClose) menuClose.onclick = closeMenu;

// إغلاق عند الضغط على خلفية القائمة (التعتيم)
if (menuBackdrop) menuBackdrop.onclick = closeMenu;

// حالة البداية: إخفاء القائمة الجانبية وخلفية التعتيم
if (mainNav) mainNav.style.display = 'none';
if (menuBackdrop) menuBackdrop.style.display = 'none';
