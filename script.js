document.addEventListener("DOMContentLoaded", () => {

  // ===== Mobile menu toggle =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ===== Smooth scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
      navLinks.classList.remove("active"); // Close menu on link click
    });
  });

  // ===== Contact form =====
const form = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.submit();


    const submitBtn = this.querySelector("button[type='submit']");

    // Check if all fields are filled
    const name = this.querySelector("#name");
    const email = this.querySelector("#email");
    const message = this.querySelector("#message");

    if (!name.value || !email.value || !message.value) {
      formSuccess.textContent = "⚠️ Please fill in all fields!";
      formSuccess.classList.add("show");
      setTimeout(() => formSuccess.classList.remove("show"), 3000);
      return; // stop submission
    }

    // Disable button while sending
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Show success message with fade-in
    formSuccess.textContent = "✅ Message sent successfully!";
    formSuccess.classList.add("show");

    // Clear form fields
    this.reset();

    // Re-enable button after 2 seconds
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      formSuccess.classList.remove("show");
    }, 2000);
  });
}

  // ===== 🌙 Dark mode toggle with persistence =====
  const themeBtn = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙";
      }
    });
  }

  // ===== Scroll fade-in animation (works in both modes & multiple times) =====
  const faders = document.querySelectorAll(".fade-in");

  const appearOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show"); // animate again when out of view
        }
      });
    },
    { threshold: 0.2 }
  );

  faders.forEach(fade => {
    appearOnScroll.observe(fade);
  });

});
// ===== Active nav link on scroll =====
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");
  
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
window.addEventListener("scroll", () => {
  navLinks.classList.remove("active");
});
