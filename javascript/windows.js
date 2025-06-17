import { getHtml } from "./data.js";
import { startMs } from "./minesweeper.js"
  import { stopTime } from "./minesweeper.js"
import { getWindowTotal } from "./script.js"; 

const windowDetails = new Map(); // [windowname, {moveable: boolean, winHeight: valuepx, winWidth: valuepx}]

// dynamically changes zindex of windows based off of what was clicked most recently
const bringToTop = (name) => {
  if (order.indexOf(name) != -1) {
    let filteredArray = order.filter((e) => e != name); // if its open remove it  from the order index
    order = filteredArray;
  }

  order.unshift(name); // make window the first element in order

  order.forEach((element) => {
    document.getElementById(`${element}tab`).style.backgroundColor = name == element ? "#e8e8e8" : "#bfbfbf";

    let placement = order.length - order.indexOf(element); // go through order and make the zindex of each window match its placement in reverse (ie 0 = length, 1 = length - 1)
    document.getElementById(element).style.zIndex = placement;
  });

  document.getElementById("footer").style.zIndex = order.length + 1; // give the footer the highest zindex
};

export const draggableElement = (name) => {
  document.getElementById(name).addEventListener("mousedown", (e) => {
    let initialX = e.clientX;
    let initialY = e.clientY;

    if (name.indexOf("icon") > 0 && windowDetails.get(name) == null) {
      windowDetails.set(name, {moveable: true, winHeight: document.getElementById(name).offsetHeight + "px", winWidth: document.getElementById(name).offsetWidth + "px"}); // add icon to details map (for moving the desktop icons)
    }
 
    const moveElement = (e) => { // allow windows and icons to move
      if (windowDetails.get(name).moveable) {
        let currentX = e.clientX;
        let currentY = e.clientY;
        document.getElementById(name).style.left = document.getElementById(name).offsetLeft + (currentX - initialX) + "px";
        document.getElementById(name).style.top = document.getElementById(name).offsetTop + (currentY - initialY) + "px";
        initialX = currentX;
        initialY = currentY;
      }
    };

    const stopElement = () => { // stops the element from moving after mouse up
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", stopElement);

      if (name != "recycle-icon" && name.indexOf("icon") > 0) { // if an icon was being moved and that icon was not the recycling bin
        const rect = document.querySelector(`#${name} img`).getBoundingClientRect();
        const recycle = document.querySelector("#recycle-icon img").getBoundingClientRect();

        let overlap = !(rect.right < recycle.left + 10 || 
                      10 + rect.left > recycle.right || 
                      rect.bottom < recycle.top + 10 || 
                      10 + rect.top > recycle.bottom)
    
        if (overlap) { // if the icon overlaps with the recycle
          document.getElementById(name).remove(); // remove that icon
        }
      }
    };

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", stopElement);
  });
};

// add element to the task bar at the bottom of the page
const addToTaskBar = (name, type) => {
  let url = `<img src="./assets/icons/${type}.png" alt="Image Broken" />`;

  if (type.indexOf(".") > 0) { // if an image window is being added to the task bar
    let fileName = type 

    if (type.indexOf("gif") > 0) {
      fileName = type.substring(0, type.indexOf("gif")) + "jpg" // handle thumbnails for gifs
    }

    url = `<img src="./assets/gallery/thumbnails/TB${fileName}" alt="Image Broken" />`; // url for taskbar thumbnail
  } else if (type == "traditional" || type == "digital" || type == "figure" || type == "game") {
    url = `<img src="./assets/icons/gallery.png" alt="Image Broken" />`;
  }

  let newTab = `<div class="tabs" id="${name}tab">
                  ${url}
                  <p>${type.charAt(0).toUpperCase()}${type.substring(1)}</p>
                </div>`;

  document.getElementById("window-tabs").insertAdjacentHTML("beforeend", newTab);

  document.getElementById(`${name}tab`).addEventListener("click", () => {
    bringToTop(name); // clicking on a tab brings its window to the top of the z axis

    if (document.getElementById(name).style.display === "none") {
      document.getElementById(name).style.display = "block"; // if the window is in the tray get it out of the tray
    }
  });
};

// seperated as its own function some of the windows can be maximized on open
const maximize = (name) => {
  document.getElementById(name).style.height = `100%`;
  console.log(document.getElementById(name).offsetHeight);
  document.getElementById(name).style.width = "100%";
  document.getElementById(name).style.top = "0";
  document.getElementById(name).style.left = "0";
  document.getElementById(name).style.overflow = "hidden";

  document.querySelector(`#${name}-topbar`).style.top = "0";
  document.querySelector(`#${name}-topbar`).style.width = "100%";

  windowDetails.set(name, {moveable: false, winHeight: windowDetails.get(name).winHeight, winWidth: windowDetails.get(name).winWidth}); // the window cannot move in fullscreen mode

  document.getElementById(`${name}-max`).style.display = "none";
  document.getElementById(`${name}-min`).style.display = "block";
}

const windowSetUp = (name, type) => {
  draggableElement(name); // make the window moveable

  windowDetails.set(name, {moveable: true, winHeight: document.getElementById(name).offsetHeight + "px", winWidth: document.getElementById(name).offsetWidth + "px"}); // add window to details map

  document.getElementById(name).addEventListener("mousedown", () => {
    bringToTop(name); // bring to top if the window is clicked on
  });

  addToTaskBar(name, type); // add icon to task bar

  // home is not included in these options as it is just meant as a notice, theres no need for the user to maximize or minimize it
  if (type != "home") {
    // adds functionality to the maximize button (not offered for minesweeper or images)
    if (type != "minesweeper" && type.indexOf(".") == -1) {
      document.getElementById(`${name}-max`).addEventListener("click", () => {
        maximize(name);
      });
    }

    // adds functionality to the minimize button
    document.getElementById(`${name}-min`).addEventListener("click", () => {
      document.getElementById(name).style.height = windowDetails.get(name).winHeight;
      document.getElementById(name).style.width = windowDetails.get(name).winWidth;

      document.getElementById(name).style.top = "";
      document.getElementById(name).style.left = "";
      document.getElementById(name).style.overflow = "";

      document.querySelector(`#${name}-topbar`).style.top = "0.1%";
      document.querySelector(`#${name}-topbar`).style.width = "100%";

      windowDetails.set(name, {moveable: true, winHeight: windowDetails.get(name).winHeight, winWidth: windowDetails.get(name).winWidth});

      document.getElementById(`${name}-max`).style.display = "block";
      document.getElementById(`${name}-min`).style.display = "none";
    });

    // adds functionality to the tray button
    document.getElementById(`${name}-tray`).addEventListener("click", () => {
      document.getElementById(name).style.display = "none";
      document.getElementById(`${name}tab`).style.backgroundColor = "#bfbfbf";
    });
  }

  // adds functionality to the exit button
  document.getElementById(`${name}-exit`).addEventListener("click", () => {
    document.getElementById("windows").removeChild(document.getElementById(name));

    document.getElementById("window-tabs").removeChild(document.getElementById(`${name}tab`));

    let filteredArray = order.filter((e) => e != name); // remove window from order array
    order = filteredArray;

    if (type == "minesweeper") {
      stopTime()
    }

    windowDetails.delete(name); // remove window from movement array
  });

  bringToTop(name); // bring to top and add window to the order array
};

export const homeWindow = (num) => {
  document.getElementById("windows").insertAdjacentHTML("beforeend", getHtml("home", null, num));

  if (popUp == true) {
    document.querySelector(`#home${num} .home-footer .icon`).innerHTML = `<i class="bx bx-checkbox-checked home-popup"></i>`; // check check box
  } else {
    document.querySelector(`#home${num} .home-footer .icon`).innerHTML = `<i class="bx bx-checkbox home-popup"></i>`; // leave check box empty
  }

  document.querySelector(`#home${num} .icon`).addEventListener("click", () => { 
    if (popUp == true) { // checking a checked check box will change the cookie so the popup will not show up on launch
      popUp = false;
      document.cookie = `popup=${popUp}`; 

      document.querySelectorAll(".home").forEach(element => {
        document.querySelector(`#${element.id} .home-footer .icon`).innerHTML = `<i class="bx bx-checkbox home-popup"></i>`;
      });
    } else if (popUp == false) { // checking an empty check box will change the cookie so the popup will show up on launch
      popUp = true;
      document.cookie = `popup=${popUp}`; 

      document.querySelectorAll(".home").forEach(element => {
        document.querySelector(`#${element.id} .home-footer .icon`).innerHTML = `<i class="bx bx-checkbox-checked home-popup"></i>`; // makes the checkbox state on all open home windows match eachother
      });
    }
  });
  
  windowSetUp(`home${num}`, "home"); // add functions for window
};

export const imageWindow = (image, num) => { // window showing just an image
  let name = image.file.substring(0, image.file.indexOf("."));

  document.getElementById("windows").insertAdjacentHTML("beforeend", getHtml(name, image, num));
  windowSetUp(`${name}`, `${image.file}`);
};

export const gamePitchWindow = (num) => { // window showing game pitch PDF
  document.getElementById("windows").insertAdjacentHTML("beforeend", getHtml("game-pitch", null, num));

  for (let i = 1; i < 18; i++) { // PDF has been split into 17 images
    let img = `<img src="./assets/game_pitch/PITCH_final-${i}.png" alt="Broken Image" draggable="false">`;
    document.querySelector(`#game-pitch${num} .game-pitch-container`).insertAdjacentHTML("beforeend", img);
  }

  windowSetUp(`game-pitch${num}`, "game-pitch");
  maximize(`game-pitch${num}`); // automatically maximize window
}

const gallerySetUp = (num, folder, gallery) => { // setting up the images in the galleries
  let prevImg = ""; // keeps track of previous image so the blue highlight can be removed
  let amt = 0; // amount of images being shown in folder 

  gallery.filter((gallery) => gallery.filter == folder.charAt(0).toUpperCase()).forEach((element) => { // only gets images of the specified filter type (which is the first letter of the image file)
    let imgHTML = ` <div class="gall-icon" id="${element.name}-icon">
                      <div class="img-icon"><img rel=preload src="./assets/gallery/${element.thumbnail}" alt=""><div class="img-filter"></div></div>
                      <p>${element.file}</p>
                    </div>`; // HTML for the image icon within the folder

    document.querySelector(`#${folder}${num} .images`).insertAdjacentHTML("beforeend", imgHTML); // add icon to folder
 
    document.querySelector(`#${folder}${num} #${element.name}-icon`).addEventListener("click", () => {
      document.querySelector(`#${folder}${num} #${element.name}-icon p`).style.color = "#fff"; // change text to white
      document.querySelector(`#${folder}${num} #${element.name}-icon p`).style.background = "rgba(0, 0, 128, 1)"; // make text background blue
      
      document.querySelector(`#${folder}${num} .img-text`).innerHTML = `<p>${element.name}</p> <p>${element.description}</p>`; // change the side bar text to match the selected image

      if (prevImg != "") {
        document.querySelector(`#${folder}${num} #${prevImg.name}-icon p`).style.color = "#000"; // make the previously selected images text go back to normal
        document.querySelector(`#${folder}${num} #${prevImg.name}-icon p`).style.background = ""; // set the previous images text background to nothing
      }

      prevImg = element; // change the previous image to the current image
    });

    document.querySelector(`#${folder}${num} #${element.name}-icon`).addEventListener("dblclick", (e) => { // if the user double clicks on an icon in the gallery folder
      if (e.explicitOriginalTarget.src.indexOf("Game_Pitch") > -1) { // if the icon is for the game pitch PDF
        gamePitchWindow(getWindowTotal("game-pitch")); // open the game pitch window
      } else {
        imageWindow(element, getWindowTotal(element.name)) // otherwise open image window
      }
    });

    document.querySelector(`#${folder}${num} .object-amt`).innerHTML = `<p>${++amt} Object(s)</p>`; // lists the number of images in the folder
  });
}

export const galleryWindow = (num, folder, gallery) => { // creates gallery window - folder determines the image filter
  document.getElementById("windows").insertAdjacentHTML("beforeend", getHtml(folder, null, num));
  gallerySetUp(num, folder, gallery);
  windowSetUp(`${folder}${num}`, folder);
}

export const aboutWindow = (num) => { // creates about window
  document.getElementById("windows").insertAdjacentHTML("beforeend", getHtml("about", null, num));
  windowSetUp(`about${num}`, "about");
}

export const minesweeperWindow = (num) => { // creates minesweeper window
  document.getElementById("windows").insertAdjacentHTML("beforeend", getHtml("minesweeper", null, num));
  startMs(num);
  windowSetUp(`minesweeper${num}`, "minesweeper");
}