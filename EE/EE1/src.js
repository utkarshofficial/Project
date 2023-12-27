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

      
      box_img:this.allImgsDom[13],
component_battery:this.allImgsDom[14],
component_capacitor:this.allImgsDom[15],
component_diode:this.allImgsDom[16],
component_inductor:this.allImgsDom[17],
component_mosfet:this.allImgsDom[18],
component_register:this.allImgsDom[19],
full_circuit:this.allImgsDom[20],
full_circuit2:this.allImgsDom[21],

circuit_full_2:this.allImgsDom[22],
circuit_full_3:this.allImgsDom[23],
part_3_graph_arrow:this.allImgsDom[24],
part_3_option_1:this.allImgsDom[25],
part_3_option_2:this.allImgsDom[26],
part_3_option_3:this.allImgsDom[27],
part_3_option_4:this.allImgsDom[28],
record_btn:this.allImgsDom[29],

part_2_circuit:this.allImgsDom[30],
part_2_graph_1:this.allImgsDom[31],
part_2_graph_2:this.allImgsDom[32],
part_2_graph_3:this.allImgsDom[33],
run_btn:this.allImgsDom[34],
right_tick_1:this.allImgsDom[35],
right_tick_2:this.allImgsDom[36],
right_tick_3:this.allImgsDom[37],
right_tick_4:this.allImgsDom[38],
graph1_arrow:this.allImgsDom[40],
graph2_arrow:this.allImgsDom[41],


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
