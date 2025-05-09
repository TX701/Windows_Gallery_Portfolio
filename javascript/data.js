// array for gallery items
export const gallery = [
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "G",
      file: "Game_Pitch",
      ext: "pdf",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "T",
      file: "T1",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "T",
      file: "T2",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "D",
      file: "D3",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "D",
      file: "D4",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F5",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F6",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "D",
      file: "D7",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "D",
      file: "D8",
      ext: "gif",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "T",
      file: "T9",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "T",
      file: "T10",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F11",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "D",
      file: "D12",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "D",
      file: "D13",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F14",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F15",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "T",
      file: "T16",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "D",
      file: "D17",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F18",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "D",
      file: "D19",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F20",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F21",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "G",
      file: "G4",
      ext: "png",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "G",
      file: "G3",
      ext: "png",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "G",
      file: "G2",
      ext: "png",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "G",
      file: "G1",
      ext: "png",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F24",
      ext: "jpg",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F23",
      ext: "png",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F22",
      ext: "png",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F61",
      ext: "png",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "F",
      file: "F60",
      ext: "png",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "D",
      file: "D35",
      ext: "png",
    },
    {
      name: "Sample Name",
      description: "Consider putting meanings dates tools or classes here",
      filter: "D",
      file: "D34",
      ext: "png",
    },
    
];

export const homeHTML = (num) => {
    return `<div class="home" id="home${num}">
                <div class="topbar" id="home${num}-topbar">
                <div class="left">
                    <img src="./assets/icons/home.png" alt="Broken Image" />
                    <h1>Home</h1>
                </div>
                <div class="right">
                    <img id="home${num}-exit" src="./assets/icons/close-icon.png" alt="" />
                </div>
                </div>

                <div class="home-content">
                <h1>Hi</h1>
                </div>
                <div class="home-footer">
                    <div class="icon"></div>
                    <p>Show this screen each time the website starts</p>
                </div>
            </div>`;
}

    export const homeText = `<p>Welcome.</p>
                            <p>Please click the icons on the desktop to explore around.</p>
                            <p>You can click on the menu to the left to learn more about each icon.</p>`;

    export const iconsText = `<p>Each icon will open a different window.</p>
                            <p>You will need to double click on an icon to open a new window.</p>
                            <p>You may open multiple of the same window.</p>`;

    export const windowsText = `<p>Windows work how you would expect.</p>
                                <p>Open, close, and move them as you would like.</p>
                                <p>Most windows will also have functions to minimize to the tray or expand to be bigger, these functions will be in the top left of a window.</p>`;


export const imageHTML = (image, num) => {
    return `<div class="image-window" id="${image.file}${num}">
                <div class="topbar" id="${image.file}${num}-topbar">
                <div class="left">
                    <h1>${image.file}.${image.ext}</h1>
                </div>
                <div class="right">
                    <img class="tray" draggable="false" id="${image.file}${num}-tray" src="./assets/icons/tray-icon.png" alt="" />
                    <img class="min" draggable="false" id="${image.file}${num}-min" src="./assets/icons/restoredown-icon.png" alt="" />

                    <img id="${image.file}${num}-exit" draggable="false"  src="./assets/icons/close-icon.png" alt="" />
                </div>
                </div>
                <img src="./assets/gallery/originals/${image.file}.${image.ext}" alt="Broken Image" draggable="false">
            </div>`;
}

export const galleryHTML = (num, folder) => {
    return `<div class="gallery" id="gallery${num}">
                <div class="topbar" id="gallery${num}-topbar">
                <div class="left">
                    <img src="./assets/icons/gallery.png" alt="Broken Image" />
                    <h1>${folder.charAt(0).toUpperCase()}${folder.substring(1)}</h1>
                </div>
                <div class="right">
                    <img class="tray" draggable="false" id="gallery${num}-tray" src="./assets/icons/tray-icon.png" alt="" />
                    <img class="max" draggable="false" id="gallery${num}-max" src="./assets/icons/max-icon.png" alt="" />
                    <img class="min" draggable="false" id="gallery${num}-min" src="./assets/icons/restoredown-icon.png" alt="" />
                    <img id="gallery${num}-exit" src="./assets/icons/close-icon.png" alt="" />
                </div>
                </div>

                <div class="options-bar">
                <div class="options-bar-divider"></div>
                <div class="options-bar-elements">
                    <p><span>F</span>ile</p>
                    <p><span>E</span>dit</p>
                    <p><span>V</span>iew</p>
                    <p><span>G</span>o</p>
                    <p>F<span>a</span>vorites</p>
                    <p><span>T</span>ools</p>
                    <p><span>H</span>elp</p>
                </div>
                <div class="options-bar-divider"></div>
                </div>

                <div class="img-gallery">
                <div class="left">
                    <img src="./assets/icons/gallery.png" alt="" />
                    <h1>${folder.charAt(0).toUpperCase()}${folder.substring(1)} Works</h1>
                    <div class="divider">
                        <div class="red"></div>
                        <div class="yellow"></div>
                        <div class="green"></div>
                        <div class="blue"></div>
                    </div>
                    <div class="img-text">
                    <p>Select an image to view its description</p>
                    <p>Double click to open the picture in its own window</p>
                    </div>
                </div>
                <div class="images"></div>
                </div>

                <div class="gallery-footer">
                    <div class="object-amt"></div>
                    <div class="location">
                        <img src="./assets/icons/home.png" alt="">
                        <p>My Computer</p>
                    </div>
                </div>
            </div>`
}

export const gamePitchHTML = (num) => {
  return `<div class="game" id="game${num}">
              <div class="topbar" id="game${num}-topbar">
              <div class="left">
                  <img src="./assets/icons/gallery.png" alt="Broken Image" />
                  <h1>Game Pitch</h1>
              </div>
              <div class="right">
                  <img class="tray" id="game${num}-tray" src="./assets/icons/tray-icon.png" alt="" />
                  <img class="max" id="game${num}-max" src="./assets/icons/max-icon.png" alt="" />
                  <img class="min" id="game${num}-min" src="./assets/icons/restoredown-icon.png" alt=""/>
                  <img id="game${num}-exit" src="./assets/icons/close-icon.png" alt=""/>
              </div>
              </div>

                <div class="options-bar">
                    <div class="options-bar-divider"></div>
                    <div class="options-bar-elements">
                    <p><span>F</span>ile</p>
                    <p><span>E</span>dit</p>
                    <p><span>V</span>iew</p>
                    <p><span>G</span>o</p>
                    <p>F<span>a</span>vorites</p>
                    <p><span>T</span>ools</p>
                    <p><span>H</span>elp</p>
                    </div>
                    <div class="options-bar-divider"></div>
                    <div class="search-bar">
                    <h1>A<span>d</span>dress</h1>
                    <div class="bar">
                        <div class="bar-wrapper"> 
                        <img src="./assets/icons/game.png" alt="">
                        <p>https://www.game_pitch.com</p>
                        </div>
                        <button><img src="./assets/icons/arrow-down.png" alt=""></button>
                    </div>
                    <h1>Go</h1>
                    <h1>Links</h1>
                    </div>
                </div>

                <div class=game-container>
                    
                </div>
              <div class="game-footer">
              <h2>Game_Pitch.pdf</h2>
              <a href="./assets/game_pitch/PITCH_final.pdf" download><button>Download</button></a>
              </div>
          </div>`;
}

export const aboutHTML = (num) => {
    return `<div class="about" id="about${num}">
                <div class="topbar" id="about${num}-topbar">
                <div class="left">
                    <img src="./assets/icons/about.png" alt="Broken Image" />
                    <h1>About</h1>
                </div>
                <div class="right">
                    <img class="tray" id="about${num}-tray" src="./assets/icons/tray-icon.png" alt="" />
                    <img class="min" id="about${num}-min" src="./assets/icons/restoredown-icon.png" alt="" />
                    <img class="max" id="about${num}-max" src="./assets/icons/max-icon.png" alt="" />
                    <img id="about${num}-exit" src="./assets/icons/close-icon.png" alt="" />
                </div>
                </div>

                <div class="options-bar">
                    <div class="options-bar-divider"></div>
                    <div class="options-bar-elements">
                    <p><span>F</span>ile</p>
                    <p><span>E</span>dit</p>
                    <p><span>V</span>iew</p>
                    <p><span>G</span>o</p>
                    <p>F<span>a</span>vorites</p>
                    <p><span>T</span>ools</p>
                    <p><span>H</span>elp</p>
                    </div>
                    <div class="options-bar-divider"></div>
                    <div class="search-bar">
                    <h1>A<span>d</span>dress</h1>
                    <div class="bar">
                        <div class="bar-wrapper"> 
                        <img src="./assets/icons/about.png" alt="">
                        <p>https://www.WebsiteName.com/about</p>
                        </div>
                        <button><img src="./assets/icons/arrow-down.png" alt=""></button>
                    </div>
                    <h1>Go</h1>
                    <h1>Links</h1>
                    </div>
                </div>

                <div class="about-container">
                    <div class="about-wrapper">
                        <h1>Name here</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, magnam! Doloremque harum iure asperiores ea repellat impedit, officiis rem cumque tenetur earum voluptas expedita corporis! Doloremque tenetur ratione ipsa possimus?</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut nihil fugit ipsam totam, aspernatur cum veritatis quo in culpa quas provident. Sunt, aperiam? Veritatis consectetur corporis dicta, illum expedita ex. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt optio et cupiditate aliquam accusamus tenetur laudantium, totam quaerat mollitia doloremque ipsam aspernatur nisi tempora facilis voluptatem, a qui consectetur sed!</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit tempore quis exercitationem, nam beatae fugiat doloribus deleniti consectetur obcaecati culpa, iusto velit quas accusamus magni quam error repellendus ut rerum!</p>
    
                        <div class="contact">
                        <h2>Contact: </h2>
                        <a href="mailto:">username@gmail.com</a>
                        <p>(123) 456-7890</p>
                        </div>
                    </div>
                <img src="./assets/profile.jpg" alt="" draggable="false"/>
                </div>
            </div>`;
}

export const minesweeperHTML = (num) => {
    return `<div class="minesweeper" id="minesweeper${num}">
                <div class="topbar" id="minesweeper${num}-topbar">
                    <div class="left">
                        <img src="./assets/icons/about.png" alt="Broken Image" />
                        <h1>Minesweeper</h1>
                    </div>
                    <div class="right">
                        <img class="tray" id="minesweeper${num}-tray" src="./assets/icons/tray-icon.png" alt="" />
                        <img class="min" id="minesweeper${num}-min" src="./assets/icons/restoredown-icon.png" alt="" />
                        <img id="minesweeper${num}-exit" src="./assets/icons/close-icon.png" alt="" />
                    </div>
                </div>

                <div class="options-bar">
                <div class="options-bar-divider"></div>
                <div class="options-bar-elements">
                    <p class="game-options-B"><span>B</span>eginner</p>
                    <p class="game-options-I"><span>I</span>ntermediate</p>
                    <p class="game-options-E"><span>E</span>xpert</p>
                </div>
                <div class="options-bar-divider"></div>
                </div>

                <div class="game-elements">
                        <div class="information-panel">
                            <div class="bomb-count-containter"><h1 class="bomb-count"></h1></div>
                            <button class="reset-button"><img class="status" src="./assets/ms/standard.png" alt=""></button>
                            <div class="timer"><h1 class="time">000</h1></div>
                        </div>
                        <div class="grid"></div>
                </div>
            </div>`
}