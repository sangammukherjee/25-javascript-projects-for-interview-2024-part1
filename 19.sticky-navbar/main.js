const navbar = document.querySelector(".navbar");
let navTop = navbar.offsetTop;

window.onscroll = function () {
  handleStickyNavbarOnScroll();
};

function handleStickyNavbarOnScroll() {
  if (window.scrollY >= navTop) navbar.classList.add("fix-navbar");
  else navbar.classList.remove("fix-navbar");
}
