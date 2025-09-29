(function () {
  // Copiar e-mail
  const copyBtn = document.getElementById('copy-email');
  const emailLink = document.getElementById('contact-email');
  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', async () => {
      const email = emailLink.dataset.email || emailLink.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'Copiado';
        setTimeout(() => (copyBtn.textContent = 'Copiar'), 1600);
      } catch (_) {
        copyBtn.textContent = 'Falhou';
        setTimeout(() => (copyBtn.textContent = 'Copiar'), 1600);
      }
    });
  }

  // Formulário -> mailto
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  function val(value) {
    return String(value || '').trim();
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot simples
      const hp = document.getElementById('company');
      if (hp && val(hp.value)) {
        status.textContent = 'Falha no envio.';
        return;
      }

      const name = val(form.name.value);
      const from = val(form.email.value);
      const subject = val(form.subject.value);
      const message = val(form.message.value);

      if (!name || !from || !subject || !message) {
        status.textContent = 'Preencha todos os campos obrigatórios.';
        return;
      }

      const to = (emailLink && (emailLink.dataset.email || emailLink.textContent.trim())) || 'seuemail@exemplo.com';
      const body =
        `Nome: ${name}\n` +
        `E-mail: ${from}\n\n` +
        `${message}`;

      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
})();
