document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelector(".nav-links");
  const openNav = document.querySelector(".open-nav");
  const closeNav = document.querySelector(".close-nav");

  openNav.addEventListener("click", () => {
    navLinks.classList.add("active");
  });

  closeNav.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
