/* Peretto Engenharia — site institucional estático, sem rastreamento e sem banco de dados. */
(() => {
  document.documentElement.classList.add('js');
  const header = document.querySelector('#site-header');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  menu.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    if (expanded) { closeMenu(); return; }
    menu.classList.add('is-open');
    menu.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-label', 'Fechar menu');
    nav.classList.add('is-open');
    document.body.classList.add('menu-open');
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const filterBtns = [...document.querySelectorAll('[data-filter]')];
  const serviceCards = [...document.querySelectorAll('.service-card')];
  filterBtns.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterBtns.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    serviceCards.forEach(card => {
      const visible = category === 'todos' || card.dataset.category.split(' ').includes(category);
      card.hidden = !visible;
    });
  }));

  const form = document.getElementById('quote-form');
  const serviceSelect = document.getElementById('lead-service');
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
    serviceSelect.value = link.dataset.service;
  }));

  // Fluxo em duas etapas, sem pop-ups automáticos bloqueados pelo navegador.
  // Etapa 1: preparar e conferir; etapa 2: clicar em um link real do WhatsApp.
  const whatsappPhone = '5567991306749';
  const feedback = document.getElementById('form-feedback');
  const previewSection = document.getElementById('whatsapp-preview-section');
  const preview = document.getElementById('whatsapp-preview');
  const openWhatsapp = document.getElementById('whatsapp-open');
  const copyBtn = document.getElementById('copy-message');
  const createWhatsappUrl = message =>
    `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;

  function updateWhatsappLink() {
    const message = preview.value.trim();
    openWhatsapp.href = message ? createWhatsappUrl(message) : '#whatsapp-preview';
    openWhatsapp.setAttribute('aria-disabled', String(!message));
    openWhatsapp.classList.toggle('is-disabled', !message);
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = document.getElementById('lead-name').value.trim();
    const company = document.getElementById('lead-company').value.trim();
    const phone = document.getElementById('lead-phone').value.trim();
    const service = serviceSelect.value;
    const notes = document.getElementById('lead-message').value.trim();

    preview.value = [
      'Olá! Gostaria de solicitar uma avaliação/orçamento à Peretto Engenharia.',
      '',
      `Nome: ${name}`,
      ...(company ? [`Empresa: ${company}`] : []),
      `Telefone: ${phone}`,
      `Serviço de interesse: ${service}`,
      ...(notes ? [`Descrição: ${notes}`] : []),
      '',
      'Aguardo o contato. Obrigado!'
    ].join('\n');
    updateWhatsappLink();
    previewSection.hidden = false;
    feedback.textContent = 'Mensagem preparada! Confira os dados abaixo e clique em "Abrir WhatsApp com a mensagem" para continuar.';
    feedback.hidden = false;
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  preview.addEventListener('input', updateWhatsappLink);
  openWhatsapp.addEventListener('click', event => {
    if (!preview.value.trim()) {
      event.preventDefault();
      preview.focus();
      feedback.textContent = 'Digite uma mensagem antes de abrir o WhatsApp.';
    }
  });

  copyBtn.addEventListener('click', async () => {
    const message = preview.value;
    if (!message.trim()) {
      feedback.textContent = 'Prepare a mensagem antes de copiá-la.';
      return;
    }
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard indisponível');
      await navigator.clipboard.writeText(message);
      feedback.textContent = 'Mensagem copiada! Abra o WhatsApp e cole o texto na conversa.';
    } catch {
      // Alternativa para páginas visualizadas localmente ou sem HTTPS.
      preview.focus();
      preview.select();
      try {
        const copied = document.execCommand && document.execCommand('copy');
        feedback.textContent = copied
          ? 'Mensagem copiada! Abra o WhatsApp e cole o texto na conversa.'
          : 'Mensagem selecionada. Copie com Ctrl+C (ou Copiar no celular).';
      } catch {
        feedback.textContent = 'Mensagem selecionada. Copie com Ctrl+C (ou Copiar no celular).';
      }
    }
  });
  // Galeria de trabalhos: ampliar, avançar/voltar e fechar por Escape.
  const galleryDialog = document.getElementById('gallery-dialog');
  const galleryImages = [
    { src:'assets/trabalho-projeto-residencial.webp', title:'Projeto residencial em 3D', alt:'Perspectiva tridimensional de residência com telhado de telhas cerâmicas e muro frontal' },
    { src:'assets/trabalho-area-industrial.webp', title:'Atuação em instalações industriais', alt:'Galpão industrial, área operacional com cones e materiais armazenados' },
    { src:'assets/trabalho-acompanhamento-obra.webp', title:'Registro de obra em execução', alt:'Obra em alvenaria com pilares e equipe em campo' },
    { src:'assets/trabalho-regularizacao-curia.jpg', title:'Regularizações', alt:'Galpão industrial, área operacional com cones e materiais armazenados' },
    { src:'assets/trabalho-treinamentos.jfif', title:'Treinamentos', alt:'Galpão industrial, área operacional com cones e materiais armazenados' },
    { src:'assets/trabalho-obra.jfif', title:'Registro de estrutura sendo confeccionada', alt:'Obra em alvenaria com pilares e equipe em campo' },
  ];
  let galleryIndex = 0;
  function showGalleryImage(index) {
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    const item = galleryImages[galleryIndex];
    document.getElementById('gallery-image').src = item.src;
    document.getElementById('gallery-image').alt = item.alt;
    document.getElementById('gallery-caption').textContent = item.title;
    document.getElementById('gallery-counter').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / 05`;
  }
  document.querySelectorAll('[data-gallery-index]').forEach(button => button.addEventListener('click', () => {
    showGalleryImage(Number(button.dataset.galleryIndex));
    if (typeof galleryDialog.showModal === 'function') galleryDialog.showModal();
    else window.open(galleryImages[galleryIndex].src, '_blank', 'noopener');
  }));
  galleryDialog.querySelector('.gallery-close').addEventListener('click', () => galleryDialog.close());
  galleryDialog.querySelector('.gallery-prev').addEventListener('click', () => showGalleryImage(galleryIndex - 1));
  galleryDialog.querySelector('.gallery-next').addEventListener('click', () => showGalleryImage(galleryIndex + 1));
  galleryDialog.addEventListener('click', event => { if (event.target === galleryDialog) galleryDialog.close(); });
  document.addEventListener('keydown', event => {
    if (!galleryDialog.open) return;
    if (event.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
    if (event.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
  });

  document.getElementById('current-year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px 30px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
})();
