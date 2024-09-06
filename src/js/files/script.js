// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// 1. ПЛАВНАЯ ПРОКРУТКА СТРАНИЦЫ =========================

// 1. Добавить к тегу body на странице атрибут data-smooth-scroll="true"
// 2. Вставить следующий код в скрипт
// 3. Настройка плавного скролла будет осуществляться в изменении параметров в вызове функции smoothScroll(0.08, 0.85);

function smoothScroll(smoothness = 0.1, inertia = 0.9) {
  let scrollPosition = window.pageYOffset; // Текущая позиция скролла
  let targetPosition = scrollPosition; // Целевая позиция скролла
  let isScrolling = false; // Флаг для отслеживания состояния скролла

  function updateScroll() {
    // Рассчитываем смещение
    scrollPosition += (targetPosition - scrollPosition) * smoothness;

    // Обновляем скролл окна
    window.scrollTo(0, scrollPosition);

    // Проверяем, нужно ли продолжать анимацию
    if (Math.abs(targetPosition - scrollPosition) > 0.5) {
      requestAnimationFrame(updateScroll);
    } else {
      isScrolling = false; // Останавливаем анимацию
    }
  }

  window.addEventListener('wheel', function(event) {
    targetPosition += event.deltaY; // Обновляем целевую позицию

    // Ограничиваем целевую позицию в пределах документа
    targetPosition = Math.max(0, Math.min(document.body.scrollHeight - window.innerHeight, targetPosition));

    event.preventDefault(); // Предотвращаем стандартное поведение скролла

    // Если не прокручивается, запускаем анимацию
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive: false });
}


if (document.body.getAttribute('data-smooth-scroll') === 'true') {
    smoothScroll(0.08, 0.85);
}
// ========================================================




// ==  2. VIDEO YOUTUBE ON CLICK BUTTON ==================================================
const videoYoutubeButtons = document.querySelectorAll('.video-youtube__button');
videoYoutubeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const youTubeCode = this.getAttribute('data-youtube');
        let autoplay = true; // Автоплей разрешено (true) или нет (false)

        let urlVideo = `https://www.youtube.com/embed/${youTubeCode}?rel=0&showinfo=0`;

        const iframe = document.createElement('iframe');
        iframe.setAttribute('allowfullscreen', '');

        if (autoplay) {
            urlVideo += '&autoplay=1';
            iframe.setAttribute('allow', 'autoplay; encrypted-media');
        }

        iframe.setAttribute('src', urlVideo);

        const body = this.closest('.video-youtube__body');
        body.innerHTML = '';
        body.appendChild(iframe);
        body.classList.add('video-added');
    });
});
// =====================================================================================
  