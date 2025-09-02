function toggleMode() {
  const body = document.body;
  const screentnow = body.getAttribute("class"); 

  if (screentnow === "light-mode") {
    body.setAttribute("class", "dark-mode");
    localStorage.setItem("theme", "dark"); 
  } else {
    body.setAttribute("class", "light-mode"); 
    localStorage.setItem("theme", "light");   
  }
}
window.onload = function() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.setAttribute("class", "dark-mode");
  } else {
    document.body.setAttribute("class", "light-mode");
  }
};
