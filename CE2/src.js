const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom:document.querySelectorAll(".main-window-imgs"),
  allVideosDom:document.querySelectorAll(".main-window-videos"),
  set() {
    this.allItems = {
      arrowRound: this.allImgsDom[0],
      blinkArrow: this.allImgsDom[1],
      laerrow: this.allImgsDom[2],
      laerrow2: this.allImgsDom[3],
      logo: this.allImgsDom[4],
      man: this.allImgsDom[5],
      measurearrow: this.allImgsDom[6],
      measurearrow2: this.allImgsDom[7],
      redsize: this.allImgsDom[8],
      speech_off_btn: this.allImgsDom[9],
      speech_on_btn: this.allImgsDom[10],
      talk_cloud: this.allImgsDom[11],
      iit_delhi_logo: this.allImgsDom[12],
      yoke_front: this.allImgsDom[13],
      yoke_back: this.allImgsDom[14],
      footing: this.allImgsDom[15],
      footingWithNailer: this.allImgsDom[16],
      FormPanelWall1: this.allImgsDom[17],
      FormPanelWall2: this.allImgsDom[18],
      leftNut1: this.allImgsDom[19],
      leftNut2: this.allImgsDom[20],
      leftNut3: this.allImgsDom[21],
      rightNut1: this.allImgsDom[22],
      rightNut2: this.allImgsDom[23],
      rightNut3: this.allImgsDom[24],
      leftSheathing: this.allImgsDom[25],
      rightSheathing: this.allImgsDom[26],
      washer1: this.allImgsDom[27],
      washer2: this.allImgsDom[28],
      washer3: this.allImgsDom[29],
      washer4: this.allImgsDom[30],
      washer5: this.allImgsDom[31],
      washer6: this.allImgsDom[32],
      spacer1: this.allImgsDom[33],
      spacer2: this.allImgsDom[34],
      spacer3: this.allImgsDom[35],
      steelRod1: this.allImgsDom[36],
      steelRod2: this.allImgsDom[37],
      steelRod3: this.allImgsDom[38],
      full_footing: this.allImgsDom[39],
      strongBack1: this.allImgsDom[40],
      strongBack2: this.allImgsDom[41],
      objective1: this.allImgsDom[42],
      objective2: this.allImgsDom[43],
      objective3: this.allImgsDom[44],
      
      // * Videos
      yoke_front_to_back: this.allVideosDom[0],
      yoke_front_to_side: this.allVideosDom[1],
      panel1: this.allVideosDom[2],
      panel2: this.allVideosDom[3],
    }
  },
  allImgsInitialAxis: [],
  get(itemName) {
    return this.allItems[itemName];
  },
};
// setting src
src.set();
