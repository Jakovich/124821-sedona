var menu = document.querySelector(".main-nav__wrapper");
var menuClose = menu.querySelector(".main-nav__close");
var menuToogle = document.querySelector(".main-nav__toogle");

onload = function() {
  menu.classList.add("main-nav__wrapper--closed");
};

menuToogle.addEventListener("click", function (event) {
  event.preventDefault;
  menu.classList.remove("main-nav__wrapper--closed");
});

menuClose.addEventListener("click", function (){
  menu.classList.add("main-nav__wrapper--closed");
});
