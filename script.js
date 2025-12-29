document.addEventListener("DOMContentLoaded", () => {

  // ===== Mobile menu toggle =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ===== Smooth scroll =====
  navItems.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
      navLinks.classList.remove("active");
    });
  });

  // ===== Contact form (Formspree-safe) =====
  const form = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", function (e) {
      const submitBtn = this.querySelector("button[type='submit']");
      const name = this.querySelector("#name");
      const email = this.querySelector("#email");
      const message = this.querySelector("#message");

      // ❌ Invalid → STOP submission
      if (!name.value || !email.value || !message.value) {
        e.preventDefault();
        formSuccess.textContent = "⚠️ Please fill in all fields!";
        formSuccess.classList.add("show");
        setTimeout(() => formSuccess.classList.remove("show"), 3000);
        return;
      }

      // ✅ Valid → let Formspree submit normally
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    });
  }

  // ===== Dark mode toggle =====
  const themeBtn = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // ===== Scroll fade-in animation =====
  const faders = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  }, { threshold: 0.2 });

  faders.forEach(el => observer.observe(el));

  // ===== Active nav link on scroll =====
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 100) {
        current = section.id;
      }
    });

    navItems.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  });

});
