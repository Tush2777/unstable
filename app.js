document.addEventListener("DOMContentLoaded", function() {
  // ======= Announcements =======
  fetch('announcements.json')
    .then(res => res.json())
    .then(data => {
      let bar = document.getElementById('announcement-bar');
      let panel = document.getElementById('announcements-list');
      bar.innerHTML = '';
      panel.innerHTML = '';
      data.forEach((a, i) => {
        bar.innerHTML += `
          <span class="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-800/80 border border-green-200 dark:border-green-700 rounded-xl font-semibold text-green-800 dark:text-green-200 shadow-sm mr-2 whitespace-nowrap">
            <i data-feather="alert-circle" class="w-5 h-5"></i>
            ${a.title} <span class="text-xs text-gray-400 ml-2">${a.date}</span>
          </span>
        `;
        panel.innerHTML += `
          <li class="py-3">
            <div class="flex items-start gap-2">
              <i data-feather="alert-triangle" class="text-green-600 dark:text-green-300 mt-1"></i>
              <div>
                <div class="font-bold">${a.title}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">${a.description}</div>
                <div class="text-xs text-gray-400 mt-1">${a.date}</div>
              </div>
            </div>
          </li>
        `;
      });
      feather.replace();
    });

  // Announcements Modal
  const annPanel = document.getElementById('ann-panel-modal');
  document.getElementById('ann-panel-open').onclick = () => {
    annPanel.classList.remove('hidden');
    annPanel.classList.add('open');
  };
  document.getElementById('ann-panel-close').onclick = () => {
    annPanel.classList.remove('open');
    annPanel.classList.add('hidden');
  };

  // ======= Events =======
  fetch('events.json')
    .then(res => res.json())
    .then(data => {
      let el = document.getElementById('events-list');
      el.innerHTML = '';
      data.forEach(ev => {
        el.innerHTML += `
          <div class="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg neumorph-card flex flex-col gap-2">
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
              <i data-feather="calendar"></i> ${ev.date}
            </div>
            <div class="font-bold text-lg mb-1">${ev.title}</div>
            <div class="text-gray-700 dark:text-gray-100 mb-2">${ev.description}</div>
            <div class="flex items-center gap-2 mt-2">
              <i data-feather="map-pin"></i> <span class="text-xs">${ev.location}</span>
            </div>
          </div>
        `;
      });
      feather.replace();
    });

  // ======= News =======
  fetch('news.json')
    .then(res => res.json())
    .then(data => {
      let el = document.getElementById('news-list');
      el.innerHTML = '';
      data.forEach(news => {
        el.innerHTML += `
          <div class="min-w-[260px] max-w-xs bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-md neumorph-card mr-4 flex flex-col">
            <div class="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-300 px-4 pt-4">
              <i data-feather="clock"></i>
              ${news.date}
            </div>
            <div class="px-4 pt-2 pb-4 flex-1">
              <div class="font-bold text-lg mb-1">${news.title}</div>
              <div class="text-gray-700 dark:text-gray-100 text-sm">${news.summary}</div>
            </div>
          </div>
        `;
      });
      feather.replace();
    });

  // ======= Gallery (Splide) =======
  const galleryImgs = [
    'https://picsum.photos/id/1015/600/400',
    'https://picsum.photos/id/1012/600/400',
    'https://picsum.photos/id/1018/600/400',
    'https://picsum.photos/id/1025/600/400',
    'https://picsum.photos/id/1031/600/400',
    'https://picsum.photos/id/1047/600/400'
  ];
  let splideList = document.querySelector('.splide__list');
  galleryImgs.forEach(src => {
    splideList.innerHTML += `<li class="splide__slide"><img src="${src}" alt="School Gallery Image" class="object-cover"/></li>`;
  });
  new Splide('#splide', {
    type    : 'loop',
    perPage : 3,
    gap     : '1.5rem',
    autoplay: true,
    breakpoints: {
      1024: { perPage: 2 },
      640: { perPage: 1 }
    }
  }).mount();

  // ======= Student Reviews (AI-powered style) =======
  fetch('reviews.json')
    .then(res => res.json())
    .then(reviews => {
      let idx = 0;
      const content = document.getElementById('review-content');
      function showReview(i) {
        let r = reviews[i];
        content.innerHTML = `
          <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=${r.name.split(' ')[0]}" alt="reviewer" class="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-green-200 dark:border-green-800 bg-gray-100 dark:bg-gray-900 object-cover"/>
          <div class="font-bold text-lg mb-1">${r.name}</div>
          <div class="text-yellow-500 flex justify-center mb-2">
            ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
          </div>
          <div class="italic text-gray-600 dark:text-gray-200 text-md mb-1">"${r.comment}"</div>
          <div class="text-xs text-green-700 dark:text-green-200">${r.year} | ${r.class}</div>
        `;
        feather.replace();
      }
      showReview(idx);
      document.getElementById('prev-review').onclick = () => {
        idx = (idx - 1 + reviews.length) % reviews.length; showReview(idx);
      };
      document.getElementById('next-review').onclick = () => {
        idx = (idx + 1) % reviews.length; showReview(idx);
      };
    });

  // ======= Tenders =======
  fetch('tenders.json')
    .then(res => res.json())
    .then(data => {
      let el = document.getElementById('tenders-list');
      el.innerHTML = '';
      data.forEach(td => {
        el.innerHTML += `
          <div class="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg neumorph-card flex flex-col gap-2 border-l-4 border-orange-400 dark:border-orange-600">
            <div class="font-bold text-lg mb-1">${td.title}</div>
            <div class="text-gray-700 dark:text-gray-100 text-sm">${td.description}</div>
            <div class="flex items-center gap-2 text-xs mt-2">
              <i data-feather="calendar"></i> Deadline: <span>${td.deadline}</span>
              ${td.link ? `<a href="${td.link}" target="_blank" class="ml-2 text-orange-700 dark:text-orange-400 hover:underline">Download</a>` : ''}
            </div>
          </div>
        `;
      });
      feather.replace();
    });

  // ======= Mobile Navigation =======
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  mobileBtn.onclick = () => {
    mobileNav.classList.toggle('hidden');
  };
  document.querySelectorAll('.nav-link').forEach(link =>
    link.onclick = () => { mobileNav.classList.add('hidden'); }
  );

  // ======= Student Portal Button =======
  document.getElementById('portal-btn').onclick = () => {
    window.open('https://studentportal.unityhigh.ac.ke', '_blank');
  };

  // ======= AI Chatbot Modal =======
  const aiBtn = document.getElementById('ai-chat-btn');
  const aiModal = document.getElementById('ai-chat-modal');
  document.getElementById('ai-chat-btn').onclick = () => {
    aiModal.classList.remove('hidden');
    aiModal.classList.add('open');
  };
  document.getElementById('ai-chat-close').onclick = () => {
    aiModal.classList.remove('open');
    aiModal.classList.add('hidden');
  };

  // ======= Dark/Light Mode Toggle =======
  const themeToggle = document.getElementById('theme-toggle');
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark', theme === 'dark');
    themeToggle.innerHTML = theme === 'dark' ?
      '<i data-feather="sun"></i>' : '<i data-feather="moon"></i>';
    feather.replace();
  }
  let theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  if (document.documentElement.getAttribute('data-theme')) {
    theme = document.documentElement.getAttribute('data-theme');
  }
  setTheme(theme);
  themeToggle.onclick = () => {
    theme = (theme === 'dark') ? 'light' : 'dark';
    setTheme(theme);
  };

  // ======= Animate icons when switching theme =======
  themeToggle.addEventListener('click', () => {
    themeToggle.classList.add('animate-spin');
    setTimeout(() => themeToggle.classList.remove('animate-spin'), 350);
  });
});
