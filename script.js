document.getElementById('yr').textContent = new Date().getFullYear();

const clock = document.getElementById('clock');

function updateClock() {
  clock.textContent = new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
    hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
  }) + ' PHT';
}

updateClock();
setInterval(updateClock, 1000);

const form = document.getElementById('cf');
const formStatus = document.getElementById('st');

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  formStatus.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      formStatus.textContent = 'Thank you! Your message was sent. I’ll get back to you soon.';
      form.reset();
    } else {
      formStatus.textContent = 'Something went wrong. Please email me at jusbylim@gmail.com.';
    }
  } catch {
    formStatus.textContent = 'Network error. Please email me at jusbylim@gmail.com.';
  }
});

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function setMenu(open) {
  mobileMenu.classList.toggle('hidden', !open);
  menuBtn.setAttribute('aria-expanded', String(open));
}

menuBtn.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
document.querySelectorAll('.mm-link').forEach(a => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => { if (window.innerWidth >= 768) setMenu(false); });
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        // fallback if the clipboard API is blocked (e.g. file:// pages)
        const t = document.createElement("textarea");
        t.value = text;
        document.body.appendChild(t);
        t.select();
        document.execCommand("copy");
        t.remove();
      }
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = original), 2000);
    });
  });
});