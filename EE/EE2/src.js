const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom: document.querySelectorAll(".main-window-imgs"),
  allVideosDom: document.querySelectorAll(".main-window-videos"),

  // ! new added
  allQsDom: document.querySelectorAll(".qs"),

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

      //experiment images

      
component_battery:this.allImgsDom[13],
component_capacitor_resistance:this.allImgsDom[14],
component_diode:this.allImgsDom[15],
component_inductor:this.allImgsDom[16],
component_mosfet:this.allImgsDom[17],
Exp_2_img :this.allImgsDom[18],
right_tick:this.allImgsDom[19],
step1_btn1:this.allImgsDom[20],
step1_btn1_active:this.allImgsDom[21],
step1_btn2:this.allImgsDom[22],
step1_btn2_active:this.allImgsDom[23],
step1_logo:this.allImgsDom[24],
step1_text_msg:this.allImgsDom[25],
step1_text_msg_wrong_connection:this.allImgsDom[26],
step2_default:this.allImgsDom[27],
step2_graph1:this.allImgsDom[28],
step2_graph2:this.allImgsDom[29],
step2_graph3:this.allImgsDom[30],
step2_logo:this.allImgsDom[31],
step3_circuit:this.allImgsDom[32],
step3_option1:this.allImgsDom[33],
step3_option2:this.allImgsDom[34],
step3_option3:this.allImgsDom[35],
step3_option4:this.allImgsDom[36],
step3_option_select:this.allImgsDom[37],
step1_circuit:this.allImgsDom[38],

  

// Theory




      // * Question Mark
      domQs1: this.allQsDom[0],
      domQs2: this.allQsDom[1],
      domQs3: this.allQsDom[2],
      domQs4: this.allQsDom[3],
      domQs5: this.allQsDom[4],
      domQs6: this.allQsDom[5],
      
      
      // * Videos
      // yoke_front_to_back: this.allVideosDom[0],
      // yoke_front_to_side: this.allVideosDom[1],
      // panel1: this.allVideosDom[2],
      // panel2: this.allVideosDom[3],

      bfs_video: this.allVideosDom[0],
    };
  },
  allImgsInitialAxis: [],
  get(itemName) {
    return this.allItems[itemName];
  },
};
// setting src
src.set();
