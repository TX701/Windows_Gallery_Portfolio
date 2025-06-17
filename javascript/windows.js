import { getHtml } from "./data.js";
import { startMs } from "./minesweeper.js"
  import { stopTime } from "./minesweeper.js"
import { getWindowTotal } from "./script.js"; 
import { convertGallery } from "./data.js"

let gallery = convertGallery();

export class Window {
  constructor(type, num) {
    this.name = `${type}${num}`
    this.type = type;
    this.num = num;
    this.moveable = null;
    this.winHeight = null;
    this.winWidth = null;

    document.getElementById("windows").insertAdjacentHTML("beforeend", getHtml(type, num));

    this.container = document.getElementById(`${type}${num}`);
    this.windowSetUp(); // add functions for window

    if (this.type == "minesweeper") {
      startMs(this.num);
    } else if (this.type == "traditional" || this.type == "digital" || this.type ==  "figure" || this.type == "game") {
      gallerySetUp(this.type, this.num);
    } else if (this.type == "home") {
      setUpHomeWindow(this.num);
    }
  }

  draggableElement = () => {
    this.container.addEventListener("mousedown", (e) => {
      let initialX = e.clientX;
      let initialY = e.clientY;
   
      const moveElement = (e) => { // allow windows and icons to move
        if (this.moveable == true) {
          let currentX = e.clientX;
          let currentY = e.clientY;
          this.container.style.left = this.container.offsetLeft + (currentX - initialX) + "px";
          this.container.style.top = this.container.offsetTop + (currentY - initialY) + "px";
          initialX = currentX;
          initialY = currentY;
        }
      };
  
      const stopElement = () => { // stops the element from moving after mouse up
        document.removeEventListener("mousemove", moveElement);
        document.removeEventListener("mouseup", stopElement);
      };
  
      document.addEventListener("mousemove", moveElement);
      document.addEventListener("mouseup", stopElement);
    });
  };

  // seperated as its own function some of the windows can be maximized on open
  maximize = () => {
    this.container.style.height = `100%`;
    this.container.style.width = "100%";
    this.container.style.top = "0";
    this.container.style.left = "0";
    this.container.style.overflow = "hidden";

    document.querySelector(`#${this.name}-topbar`).style.top = "0";
    document.querySelector(`#${this.name}-topbar`).style.width = "100%";

    this.moveable = false;

    document.getElementById(`${this.name}-max`).style.display = "none";
    document.getElementById(`${this.name}-min`).style.display = "block";
  }

  windowSetUp = () => {
    this.draggableElement(); // make the window moveable
  
    this.moveable = true;
    this.winHeight = this.container.offsetHeight + "px";
    this.winWidth = this.container.offsetWidth + "px";
  
    this.container.addEventListener("mousedown", () => {
      this.bringToTop(); // bring to top if the window is clicked on
    });
  
    this.addToTaskBar(); // add icon to task bar
  
    // home is not included in these options as it is just meant as a notice, theres no need for the user to maximize or minimize it
    if (this.type != "home") {
      // adds functionality to the maximize button (not offered for minesweeper or images)
      if (this.type != "minesweeper" && this.type.indexOf(".") == -1) {
        document.getElementById(`${this.name}-max`).addEventListener("click", () => {
          this.maximize();
        });
      }
  
      // adds functionality to the minimize button
      document.getElementById(`${this.name}-min`).addEventListener("click", () => {
        this.container.style.height = this.winHeight;
        this.container.style.width = this.winWidth;
  
        this.container.style.top = "";
        this.container.style.left = "";
        this.container.style.overflow = "";
  
        document.querySelector(`#${this.name}-topbar`).style.top = "0.1%";
        document.querySelector(`#${this.name}-topbar`).style.width = "100%";
  
        this.moveable = true;
        
        document.getElementById(`${this.name}-max`).style.display = "block";
        document.getElementById(`${this.name}-min`).style.display = "none";
      });
  
      // adds functionality to the tray button
      document.getElementById(`${this.name}-tray`).addEventListener("click", () => {
        this.container.style.display = "none";
        document.getElementById(`${this.name}tab`).style.backgroundColor = "#bfbfbf";
      });
    }
  
    // adds functionality to the exit button
    document.getElementById(`${this.name}-exit`).addEventListener("click", () => {
      document.getElementById("windows").removeChild(this.container);
  
      document.getElementById("window-tabs").removeChild(document.getElementById(`${this.name}tab`));
  
      let filteredArray = order.filter((e) => e != this.name); // remove window from order array
      order = filteredArray;
  
      if (this.type == "minesweeper") {
        stopTime()
      }
    });
  
    this.bringToTop(); // bring to top and add window to the order array
  };

  bringToTop = () => {
    if (order.indexOf(this.name) != -1) {
      let filteredArray = order.filter((e) => e != this.name); // if its open remove it  from the order index
      order = filteredArray;
    }
  
    order.unshift(this.name); // make window the first element in order
  
    order.forEach((element) => {
      document.getElementById(`${element}tab`).style.backgroundColor = this.name == element ? "#e8e8e8" : "#bfbfbf";
  
      let placement = order.length - order.indexOf(element); // go through order and make the zindex of each window match its placement in reverse (ie 0 = length, 1 = length - 1)
      document.getElementById(element).style.zIndex = placement;
    });
  
    document.getElementById("footer").style.zIndex = order.length + 1; // give the footer the highest zindex
  };

  // add element to the task bar at the bottom of the page
  addToTaskBar = () => {
    let url = `<img src="./assets/icons/${this.type}.png" alt="Image Broken" />`;

    if (this.type.indexOf(".") > 0) { // if an image window is being added to the task bar
      let fileName = this.type 

      if (this.type.indexOf("gif") > 0) {
        fileName = this.type.substring(0, this.type.indexOf("gif")) + "jpg" // handle thumbnails for gifs
      }

      url = `<img src="./assets/gallery/thumbnails/TB${fileName}" alt="Image Broken" />`; // url for taskbar thumbnail
    } else if (this.type == "traditional" || this.type == "digital" || this.type == "figure" || this.type == "game") {
      url = `<img src="./assets/icons/gallery.png" alt="Image Broken" />`;
    }

    let newTab = `<div class="tabs" id="${this.name}tab">
                    ${url}
                    <p>${this.type.charAt(0).toUpperCase()}${this.type.substring(1)}</p>
                  </div>`;

    document.getElementById("window-tabs").insertAdjacentHTML("beforeend", newTab);

    document.getElementById(`${this.name}tab`).addEventListener("click", () => {
      this.bringToTop(); // clicking on a tab brings its window to the top of the z axis

      if (this.container.style.display === "none") {
        this.container.style.display = "block"; // if the window is in the tray get it out of the tray
      }
    });
  };
}

const setUpHomeWindow = (num) => {
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
}

export const homeWindow = (num) => {
  let homeObject = new Window("home", num);
  setUpHomeWindow(num);
};

export const imageWindow = (image, num) => { // window showing just an image
  let imageObject = new Window(image.file, num);
};

export const gamePitchWindow = (num) => { // window showing game pitch PDF
  let pitchObject = new Window("game-pitch", num);

  for (let i = 1; i < 18; i++) { // PDF has been split into 17 images
    let img = `<img src="./assets/game_pitch/PITCH_final-${i}.png" alt="Broken Image" draggable="false">`;
    document.querySelector(`#game-pitch${num} .game-pitch-container`).insertAdjacentHTML("beforeend", img);
  }

  pitchObject.maximize(); // automatically maximize window
}

const gallerySetUp = (folder, num) => { // setting up the images in the galleries
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

export const galleryWindow = (num, folder) => { // creates gallery window - folder determines the image filter
  let galleryObject = new Window(folder, num);
  gallerySetUp(num, folder, gallery);
}

export const aboutWindow = (num) => { // creates about window
  let aboutObject = new Window("about", num);
}

export const minesweeperWindow = (num) => { // creates minesweeper window
  let msObject = new Window("minesweeper", num);
  
}