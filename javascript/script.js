import { homeWindow } from "./windows.js";
import { aboutWindow } from "./windows.js";
import { galleryWindow } from "./windows.js"; 
import { minesweeperWindow } from "./windows.js"
import { Window } from "./windows.js";

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

const draggableIcon = (icon) => {
  document.getElementById(icon).addEventListener("mousedown", (e) => {
    let initialX = e.clientX;
    let initialY = e.clientY;
 
    const moveElement = (e) => { // allow windows and icons to move
      let currentX = e.clientX;
      let currentY = e.clientY;
      document.getElementById(icon).style.left = document.getElementById(icon).offsetLeft + (currentX - initialX) + "px";
      document.getElementById(icon).style.top = document.getElementById(icon).offsetTop + (currentY - initialY) + "px";
      initialX = currentX;
      initialY = currentY;
    };

    const stopElement = () => { // stops the element from moving after mouse up
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", stopElement);

      if (icon != "recycle-icon") { // if an icon was being moved and that icon was not the recycling bin
        const rect = document.querySelector(`#${icon} img`).getBoundingClientRect();
        const recycle = document.querySelector("#recycle-icon img").getBoundingClientRect();

        let overlap = !(rect.right < recycle.left + 10 || 
                      10 + rect.left > recycle.right || 
                      rect.bottom < recycle.top + 10 || 
                      10 + rect.top > recycle.bottom)
    
        if (overlap) { // if the icon overlaps with the recycle
          document.getElementById(icon).remove(); // remove that icon
        }
      }
    };

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", stopElement);
  });
};

document.getElementById("home-icon").addEventListener("dblclick", () => {
  let home = new Window("home", getWindowTotal("home"));
});

// gallery icons start

document.getElementById("gallery-icon-traditional").addEventListener("dblclick", () => {
  let traditional = new Window("traditional", getWindowTotal("traditional"));
});

document.getElementById("gallery-icon-digital").addEventListener("dblclick", () => {
  let ms = new Window("digital", getWindowTotal("digital"));
});

document.getElementById("gallery-icon-figure").addEventListener("dblclick", () => {
  let ms = new Window("figure", getWindowTotal("figure"));
});

document.getElementById("gallery-icon-game").addEventListener("dblclick", () => {
  let ms = new Window("game", getWindowTotal("game"));
});

// gallery icons end

document.getElementById("about-icon").addEventListener("dblclick", () => {
  let about = new Window("about", getWindowTotal("about"));
});

document.getElementById("minesweeper-icon").addEventListener("dblclick", () => {
  let ms = new Window("minesweeper", getWindowTotal("minesweeper"));
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

    draggableIcon(element.e.id);
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
};

startUp();