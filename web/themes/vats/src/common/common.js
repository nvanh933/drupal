import './styles/header.scss';
import './styles/footer.scss';

const initMobileNavigation = () => {
  const header = document.querySelector('#header');
  const toggle = document.querySelector('#mobile-nav-toogle');

  if (!header || !toggle || toggle.dataset.vatsBound === 'true') {
    return;
  }

  const showIcon = toggle.querySelector('.mobile-nav-show');
  const hideIcon = toggle.querySelector('.mobile-nav-hide');

  const setMenuState = (isOpen) => {
    header.classList.toggle('is-menu-open', isOpen);
    if (showIcon && hideIcon) {
      showIcon.classList.toggle('d-none', isOpen);
      hideIcon.classList.toggle('d-none', !isOpen);
    }
  };

  setMenuState(false);

  toggle.addEventListener('click', () => {
    const isOpen = !header.classList.contains('is-menu-open');
    setMenuState(isOpen);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      setMenuState(false);
    }
  });

  toggle.dataset.vatsBound = 'true';
};

document.addEventListener('DOMContentLoaded', initMobileNavigation);
