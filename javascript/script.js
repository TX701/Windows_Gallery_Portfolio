import { Window } from "./windows.js";

window.order = []; // array to check zindex placement for windows
window.popUp = ""; // a cookie that determines if the user sees the home screen on website launch

class Icon { // icon object for opening windows
  constructor(container) {
    this.container = container;
    this.name = container.id.substring(0, container.id.indexOf("-"));

    if (this.name != "recycle") { // the recylce bin doesnt have a window
      this.setIcon();
    }
  }

  setIcon() {
    this.container.addEventListener("dblclick", () => {
      new Window(this.name, getWindowTotal(this.name)); // double clicking on an icon will "open" that icons window
    });
  }

  draggableIcon = () => {
    this.container.addEventListener("mousedown", (e) => {
      let initialX = e.clientX;
      let initialY = e.clientY;
   
      const moveElement = (e) => { // allow windows and icons to move
        let currentX = e.clientX;
        let currentY = e.clientY;
        this.container.style.left = this.container.offsetLeft + (currentX - initialX) + "px";
        this.container.style.top = this.container.offsetTop + (currentY - initialY) + "px";
        initialX = currentX;
        initialY = currentY;
      };
  
      const stopElement = () => { // stops the element from moving after mouse up
        document.removeEventListener("mousemove", moveElement);
        document.removeEventListener("mouseup", stopElement);
  
        if (this.name != "recycle") { // if an icon was being moved and that icon was not the recycling bin
          const rect = document.querySelector(`#${this.container.id} img`).getBoundingClientRect();
          const recycle = document.querySelector("#recycle-icon img").getBoundingClientRect();
  
          let overlap = !(rect.right < recycle.left + 10 || 
                        10 + rect.left > recycle.right || 
                        rect.bottom < recycle.top + 10 || 
                        10 + rect.top > recycle.bottom)
      
          if (overlap) { // if the icon overlaps with the recycle
            this.container.remove(); // remove that icon
          }
        }
      };
  
      document.addEventListener("mousemove", moveElement);
      document.addEventListener("mouseup", stopElement);
    });
  };
}

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
export const getWindowTotal = (name) => { // not a part of the icon class as it is used by non icon objects
  let filteredArray = order.filter((e) => e.indexOf(name) != -1);

  if (filteredArray.length == 0) {
    return ""; // there are zero so the id will just be the type
  } else {
    return filteredArray.length + 1; // there are some so the id will be one more than the current amount
  }
};

const setUpIcons = () => {
  let locations = [];
  
  // placing the icons in nice rows for the start but changing their display to absolute to allow them to be moved

  document.querySelectorAll(".icons").forEach(element => {
    let icon = new Icon(element); // create icon object

    let bodyRect = document.body.getBoundingClientRect();
    let elemRect = element.getBoundingClientRect();

    locations.push({i: icon, left: elemRect.left - bodyRect.left, top: elemRect.top - bodyRect.top});
  });

  locations.forEach(element => {
    element.i.container.style.position = "absolute"; // changing display to absolute
    element.i.container.style.left = `${element.left}px`; // setting the icons position back to its original position when its position was flex
    element.i.container.style.top = `${element.top}px`; // setting the icons position back to its original position when its position was flex

    element.i.draggableIcon();
  });
}

const startUp = () => {
  popUp = getCookie();

  if (popUp === "") { // if it is the users first time on the website set a cookie named popup to true
    document.cookie = `popup=true`; 
    popUp = getCookie();
  }

  if (popUp === true) {
    new Window("home", getWindowTotal("home"));
  }

  setUpIcons();
};

startUp();