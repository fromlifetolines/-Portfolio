/**
 * Cinematic Kinetic Studio Interactive Engine
 * Ref: Layers.ai New Era / Foldcraft
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

// 行動端漢堡選單旋轉切換
let mobileMenuOpen = false;
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const content = document.getElementById('mobile-content');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  mobileMenuOpen = !mobileMenuOpen;

  if (mobileMenuOpen) {
    menu.classList.remove('h-0', 'opacity-0', 'pointer-events-none');
    menu.classList.add('h-screen', 'opacity-100');
    
    iconMenu.classList.add('opacity-0', 'scale-50', 'rotate-90');
    iconClose.classList.remove('opacity-0', 'scale-50', '-rotate-90');
    iconClose.classList.add('opacity-100', 'scale-100', 'rotate-0');

    setTimeout(() => {
      content.classList.remove('translate-y-8', 'opacity-0');
      content.classList.add('translate-y-0', 'opacity-100');
    }, 100);
  } else {
    menu.classList.add('h-0', 'opacity-0', 'pointer-events-none');
    menu.classList.remove('h-screen', 'opacity-100');

    iconMenu.classList.remove('opacity-0', 'scale-50', 'rotate-90');
    iconClose.classList.add('opacity-0', 'scale-50', '-rotate-90');
    iconClose.classList.remove('opacity-100', 'scale-100', 'rotate-0');

    content.classList.add('translate-y-8', 'opacity-0');
    content.classList.remove('translate-y-0', 'opacity-100');
  }
}

// 全螢幕精選作品抽屜開關
let projectsOpen = false;
function toggleProjectsDrawer() {
  const drawer = document.getElementById('projects-drawer');
  projectsOpen = !projectsOpen;

  if (projectsOpen) {
    drawer.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
    drawer.classList.add('translate-y-0', 'opacity-100');
  } else {
    drawer.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
    drawer.classList.remove('translate-y-0', 'opacity-100');
  }
}

// 關於我哲學彈窗
let aboutOpen = false;
function toggleAboutModal() {
  const modal = document.getElementById('about-modal');
  aboutOpen = !aboutOpen;

  if (aboutOpen) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
  } else {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
  }
}

function toggleServicesModal() {
  toggleProjectsDrawer();
}
