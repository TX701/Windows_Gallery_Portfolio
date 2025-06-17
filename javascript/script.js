import { homeWindow } from "./windows.js";
import { aboutWindow } from "./windows.js";
import { galleryWindow } from "./windows.js"; 
import { minesweeperWindow } from "./windows.js"
import { draggableElement } from "./windows.js"
import { convertGallery } from "./data.js"

window.order = []; // array to check zindex placement for windows
window.popUp = ""; // a cookie that determines if the user sees the home screen on website launch
let gallery = []

const getCookie = () => { // gets the users page cookies
  let current = decodeURIComponent(document.cookie).split(';');
  for(let i = 0; i < current.length; i++) {
    let first = current[i];
    while (first.charAt(0) === " ") {
      first = first.substring(1);
    }
    if (first.indexOf("popup=") == 0) {
      return JSON.parse(first.substring(("popup=").length, first.length)); // return the value for popup
    }
  } 
  return "";
}

// when opening a new window we need to know how many of that "type" (home/gall/etc) are already open for id naming purposes
export const getWindowTotal = (name) => {
  let filteredArray = order.filter((e) => e.indexOf(name) != -1);

  if (filteredArray.length == 0) {
    return ""; // there are zero so the id will just be the type
  } else {
    return filteredArray.length + 1; // there are some so the id will be one more than the current amount
  }
};

document.getElementById("home-icon").addEventListener("dblclick", () => {
  homeWindow(getWindowTotal("home"));
});

// gallery icons start

document.getElementById("gallery-icon-traditional").addEventListener("dblclick", () => {
  galleryWindow(getWindowTotal("traditional"), "traditional", gallery);
});

document.getElementById("gallery-icon-digital").addEventListener("dblclick", () => {
  galleryWindow(getWindowTotal("digital"), "digital", gallery);
});

document.getElementById("gallery-icon-figure").addEventListener("dblclick", () => {
  galleryWindow(getWindowTotal("figure"), "figure", gallery);
});

document.getElementById("gallery-icon-game").addEventListener("dblclick", () => {
  galleryWindow(getWindowTotal("game"), "game", gallery);
});

// gallery icons end

document.getElementById("about-icon").addEventListener("dblclick", () => {
  aboutWindow(getWindowTotal("about"));
});

document.getElementById("minesweeper-icon").addEventListener("dblclick", () => {
  minesweeperWindow(getWindowTotal("minesweeper"));
});

const setUpIcons = () => {
  let locations = [];

  // placing the icons in nice rows for the start but changing their display to absolute to allow them to be moved

  document.querySelectorAll(".icons").forEach(element => {
    let bodyRect = document.body.getBoundingClientRect();
    let elemRect = element.getBoundingClientRect();

    locations.push({e: element, left: elemRect.left - bodyRect.left, top: elemRect.top - bodyRect.top});
  });

  locations.forEach(element => {
    element.e.style.position = "absolute"; // changing display to absolute
    element.e.style.left = `${element.left}px`; // setting the icons position back to its original position when its position was flex
    element.e.style.top = `${element.top}px`; // setting the icons position back to its original position when its position was flex

    draggableElement(element.e.id);
  });
}

const startUp = () => {
  popUp = getCookie();

  if (popUp === "") { // if it is the users first time on the website set a cookie named popup to true
    document.cookie = `popup=true`; 
    popUp = getCookie();
  }

  if (popUp === true) {
    homeWindow(""); // if popup is true open the home window
  }

  setUpIcons();

  gallery = convertGallery()
};

startUp();