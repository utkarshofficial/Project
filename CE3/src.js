const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom: document.querySelectorAll(".main-window-imgs"),
  allVideosDom: document.querySelectorAll(".main-window-videos"),
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
      land: this.allImgsDom[13],
      chalk_with_hand: this.allImgsDom[14],
      chalk_markings5: this.allImgsDom[15],
      chalk_markings2: this.allImgsDom[16],
      chalk_markings6: this.allImgsDom[17],
      chalk_markings1: this.allImgsDom[18],
      chalk_markings3: this.allImgsDom[19],
      chalk_markings4: this.allImgsDom[20],
      marking_surface1: this.allImgsDom[21],
      marking_surface2: this.allImgsDom[22],
      marking_surface3: this.allImgsDom[23],
      marking_surface4: this.allImgsDom[24],
      marking_surface5: this.allImgsDom[25],
      marking_surface6: this.allImgsDom[26],
      form_floor_corner1: this.allImgsDom[27],
      form_floor_corner2: this.allImgsDom[28],
      ct_prop1: this.allImgsDom[29],
      ct_prop2: this.allImgsDom[30],
      ct_prop3: this.allImgsDom[31],
      ct_prop4: this.allImgsDom[32],
      ct_prop5: this.allImgsDom[33],
      ct_prop6: this.allImgsDom[34],
      ct_prop7: this.allImgsDom[35],
      ct_prop8: this.allImgsDom[36],
      foot_adapter1: this.allImgsDom[37],
      foot_adapter2: this.allImgsDom[38],
      foot_adapter3: this.allImgsDom[39],
      foot_adapter4: this.allImgsDom[40],
      panel1: this.allImgsDom[41],
      panel2: this.allImgsDom[42],
      panel3: this.allImgsDom[43],
      pipe_waler_cutout1: this.allImgsDom[44],
      pipe_waler_cutout2: this.allImgsDom[45],
      plywood: this.allImgsDom[46],
      steel_waler_connector1: this.allImgsDom[47],
      steel_waler_connector2: this.allImgsDom[48],
      steel_waler_connector3: this.allImgsDom[49],
      steel_waler_connector4: this.allImgsDom[50],
      steel_waler_connector5: this.allImgsDom[51],
      steel_waler_connector6: this.allImgsDom[52],
      steel_waler_connector7: this.allImgsDom[53],
      steel_waler_connector8: this.allImgsDom[54],
      steel_waler1: this.allImgsDom[55],
      steel_waler2: this.allImgsDom[56],
      steel_waler3: this.allImgsDom[57],
      steel_waler4: this.allImgsDom[58],
      steel_waler_other: this.allImgsDom[59],
      pipe_waler_connector1: this.allImgsDom[60],
      pipe_waler_connector2: this.allImgsDom[61],
      pipe_waler_connector3: this.allImgsDom[62],
      pipe_waler_connector4: this.allImgsDom[63],
      pipe_waler_connector5: this.allImgsDom[64],
      pipe_waler_connector6: this.allImgsDom[65],
      pipe_waler_connector7: this.allImgsDom[66],
      pipe_waler_connector8: this.allImgsDom[67],
      waler_clip1: this.allImgsDom[68],
      waler_clip2: this.allImgsDom[69],
      waler_clip3: this.allImgsDom[70],
      waler_clip4: this.allImgsDom[71],
      waler_clip5: this.allImgsDom[72],
      waler_clip6: this.allImgsDom[73],
      waler_clip7: this.allImgsDom[74],
      waler_clip8: this.allImgsDom[75],
      waler_clip9: this.allImgsDom[76],
      waler_clip10: this.allImgsDom[77],
      waler_clip11: this.allImgsDom[78],
      waler_clip12: this.allImgsDom[79],
      waler_clip13: this.allImgsDom[80],
      waler_clip14: this.allImgsDom[81],
      waler_clip15: this.allImgsDom[82],
      waler_clip16: this.allImgsDom[83], 
      anchor_plate1: this.allImgsDom[84], 
      anchor_plate2: this.allImgsDom[85], 
      anchor_plate3: this.allImgsDom[86], 
      anchor_plate4: this.allImgsDom[87], 
      anchor_plate5: this.allImgsDom[88], 
      anchor_plate6: this.allImgsDom[89], 
      anchor_plate7: this.allImgsDom[90], 
      anchor_plate8: this.allImgsDom[91], 
      wing_nut1: this.allImgsDom[92], 
      wing_nut2: this.allImgsDom[93], 
      wing_nut3: this.allImgsDom[94], 
      wing_nut4: this.allImgsDom[95], 
      wing_nut5: this.allImgsDom[96], 
      wing_nut6: this.allImgsDom[97], 
      wing_nut7: this.allImgsDom[98], 
      wing_nut8: this.allImgsDom[99], 
      head_adapter1: this.allImgsDom[100], 
      head_adapter2: this.allImgsDom[101], 
      head_adapter3: this.allImgsDom[102], 
      head_adapter4: this.allImgsDom[103], 
      head_adapter5: this.allImgsDom[104], 
      head_adapter6: this.allImgsDom[105], 
      foot_adapter1: this.allImgsDom[106], 
      foot_adapter2: this.allImgsDom[107], 
      foot_adapter3: this.allImgsDom[108], 
      full_foundation_front1: this.allImgsDom[109], 
      full_foundation_front2: this.allImgsDom[110], 
      full_foundation_front3: this.allImgsDom[111], 
      full_foundation_front4: this.allImgsDom[112], 
      pipe_waler_clamp_full: this.allImgsDom[113], 
      wing_nut_full: this.allImgsDom[114], 
      
      // * Videos
      // yoke_front_to_back: this.allVideosDom[0],
      // yoke_front_to_side: this.allVideosDom[1],
      // panel1: this.allVideosDom[2],
      // panel2: this.allVideosDom[3],
    };
  },
  allImgsInitialAxis: [],
  get(itemName) {
    return this.allItems[itemName];
  },
};
// setting src
src.set();
