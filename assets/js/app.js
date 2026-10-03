// NEXORA Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      htmlElement.classList.toggle('dark');
      const isDark = htmlElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if(themeToggleBtn) {
      themeToggleBtn.innerHTML = isDark 
        ? '<i class="fas fa-sun text-xl text-yellow-400"></i>' 
        : '<i class="fas fa-moon text-xl text-indigo-600"></i>';
    }
  }

  // Init Theme
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
    updateThemeIcon(true);
  } else {
    htmlElement.classList.remove('dark');
    updateThemeIcon(false);
  }

  // RTL Toggle
  const rtlToggleBtn = document.getElementById('rtl-toggle');
  if(rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const currentDir = htmlElement.getAttribute('dir');
      if (currentDir === 'rtl') {
        htmlElement.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
      } else {
        htmlElement.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
      }
    });
  }

  if (localStorage.dir === 'rtl') {
    htmlElement.setAttribute('dir', 'rtl');
  }

  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('glass', 'shadow-lg');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('glass', 'shadow-lg');
      header.classList.add('bg-transparent');
    }
  });

  // Active Navigation Link Highlighter
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('header nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      // Add active state classes
      link.classList.add('text-primary-600', 'dark:text-primary-400', 'border-b-2', 'border-primary-600', 'pb-1');
      // Make it slightly bolder
      link.classList.remove('font-medium');
      link.classList.add('font-bold');
    }
  });

  // Init AOS Animation Library
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: false, // animate every time you scroll up/down
      offset: 50,
      duration: 1000,
      easing: 'ease-out-cubic',
    });
  }

  // Init VanillaTilt for 3D Cards
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      perspective: 1000,
      scale: 1.05
    });
  }
  // Dashboard Logic
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const dashboardSidebar = document.getElementById('dashboard-sidebar');
  
  if (sidebarToggle && dashboardSidebar) {
    sidebarToggle.addEventListener('click', () => {
      dashboardSidebar.classList.toggle('-translate-x-full');
    });
  }

  // Dashboard Sidebar Links Active State
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('.dashboard-section');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Remove active from all
      sidebarLinks.forEach(l => {
        l.classList.remove('active', 'bg-primary-50', 'dark:bg-primary-900/20', 'text-primary-600');
        l.classList.add('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-50', 'dark:hover:bg-gray-700/50');
      });
      // Add active to clicked
      link.classList.remove('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-50', 'dark:hover:bg-gray-700/50');
      link.classList.add('active', 'bg-primary-50', 'dark:bg-primary-900/20', 'text-primary-600');
      
      // Hide all sections, show target
      const targetId = link.getAttribute('data-target');
      if (targetId && sections.length > 0) {
        sections.forEach(sec => {
          sec.classList.remove('block');
          sec.classList.add('hidden');
        });
        const targetSec = document.getElementById(targetId);
        if (targetSec) {
          targetSec.classList.remove('hidden');
          targetSec.classList.add('block');
        }
      }

      // On mobile, close sidebar on link click
      if (window.innerWidth < 768 && dashboardSidebar) {
        dashboardSidebar.classList.add('-translate-x-full');
      }
    });
  });
});

// Global Password Toggle Function
function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);
  const icon = button.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
    icon.classList.add('text-primary-500');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash', 'text-primary-500');
    icon.classList.add('fa-eye');
  }
}
