///when screen gets small
/////1. we will display menue small
/////2. we will add class to menue to show it in list

/* window.addEventListener('resize', handleWindowResize); */
let menue = document.querySelector("#menue");
let menueIcon = document.querySelector(".menue-small");
if (window.innerWidth < 728) {
  menue.className = "menue-list";
  menueIcon.style.display = "flex";
} else if (window.innerWidth > 728) {
  menue.className = "menue";
  menueIcon.style.display = "none";
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////3. show list menue on mouseover
menueIcon.addEventListener("click", () => {
  menue.style.visibility = "visible";
  menue.style.animation = "m 1s";
  menue.style.position = "relative";
  menueIcon.style.display = "none";
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
///// MOVING SLIDER TO FOCUS

let slid = document.querySelectorAll(".slide");

////declared a function to do:
//////1. append targted element on focus div
//////2. change the class name of e to focusContent
function foc(event) {
  let e = event.currentTarget;

  let focs = document.querySelector(".focus");
  ///Regular expression to detect elements ID
  let reg = /(?:id=")(\w+")/g;
  ///
  focs.append(e);
  e.className = "focusContent";
  ///
  let focusContent = document.querySelectorAll(".focusContent");
  let slider = document.querySelector(".slider");

  //////If condition to check if focus has more than one element
  ////then return first element back to slider and return its ID if true
  if (focusContent.length > 1) {
    slider.append(focusContent[0]);
    let x = slider.querySelectorAll(".focusContent");
    let retid = sessionStorage.getItem("id");
    x[0].id = retid.slice(4, -1);
    x[0].className = "slide";
  }
  ///// store the ID for element that we will move in Session Storage
  let sl = e.outerHTML;
  let id = String(sl).match(reg);
  sessionStorage.setItem("id", id);
  //// remove the id from targeted element
  e.removeAttribute("id");
  /////scroll to the focus on click
  focs.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}
//////////
for (i = 0; i < slid.length; i++) {
  slid[i].addEventListener("click", foc);
}

/////// Motion of Kings section

///Select all elements in NodeList
let kings = document.querySelectorAll(".kings > *");

///Add event listener on scroll
window.addEventListener("scroll", kingsMotionIn);

function kingsMotionIn() {
  ///determine the height of the window as a trigger
  let trigger = window.innerHeight;
  /// forEach to iterate through NodeList and 1.Determine the postion & 2.Add/Remove class on condition
  kings.forEach((el) => {
    const targetKing = el.getBoundingClientRect().top;

    ///condition to compare between the innerHeight & top postion of element
    if (trigger > targetKing) {
      el.classList.add("kings-Motion");
      el.classList.remove("king");
    } else if (trigger < targetKing) {
      el.classList.add("king");
      el.classList.remove("kings-Motion");
    }
  });
}

/////// Motion of Letters section

///Select all elements in NodeList
let letters = document.querySelectorAll(".block");

///Add event listener on scroll
window.addEventListener("scroll", lettersMotionIn);

function lettersMotionIn() {
  ///determine the height of the window as a trigger
  let trigger = window.innerHeight;
  /// forEach to iterate through NodeList and 1.Determine the postion & 2.Add/Remove class on condition
  letters.forEach((el) => {
    const targetletter = el.getBoundingClientRect().top;

    ///condition to compare between the innerHeight & top postion of element
    if (trigger > targetletter) {
      el.style.transform = "translate(0)";
    } else if (trigger < targetletter) {
      el.style.transform = "translate(1000%)";
    }
  });
}

////add event listner on mouse enter
for (let i = 0; i < 32; i++) {
  letters[i].addEventListener("mouseenter", lettercard);
}

/// function to adjust the show the card by adjustig opacity & visabilty
function lettercard(event) {
  let e = event.currentTarget;

  e.childNodes[3].style.opacity = "1";
  e.childNodes[3].style.visibility = "visible";
  console.log(e.childNodes[3]);
  e.style.top = "-35px";
}

////same function as above (I think I can use foreach with callback function)
for (let i = 0; i <= letters.length; i++) {
  letters[i].addEventListener("mouseleave", lettercardexit);
}
function lettercardexit(event) {
  let e = event.currentTarget;
  e.childNodes[3].style.opacity = "0";
  e.childNodes[3].style.visibility = "hidden";
  e.style.top = "0";
}

///////////////Gallery auto switch photos

let img = document.querySelectorAll(".outFocus");

let imgUrls = Array.from(img).map((e) => {
  let imgElement = e.querySelector("img");
  return imgElement ? imgElement.getAttribute("src") : null;
});

console.log(imgUrls);

function imgAlbum() {
  let divv = document.querySelector(".history .text");
  imgUrls.forEach((e) => {
    divv.style.backgroundImage = `url(/${e})`;
  });
}
let index = 0;

function imgloop() {
  let divv = document.querySelector(".history .text");
  let imgs = imgUrls[index];
  divv.style.backgroundImage = `url(/${imgs})`;
  index = index + 1;
  if (index === imgUrls.length) {
    index = 0;
  }
}

setInterval(imgloop, 2000);
