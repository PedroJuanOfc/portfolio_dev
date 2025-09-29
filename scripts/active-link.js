(function() {
  const path = window.location.pathname.split("/").pop().toLowerCase();
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const href = link.getAttribute("href").toLowerCase();

    const isHome = (path === "" || path === "index.html") && href.includes("index.html");
    const isMatch = path === href || isHome || (href.startsWith("#") && path === "");

    if (isMatch) {
      link.classList.add("active");
    }
  });
})();
