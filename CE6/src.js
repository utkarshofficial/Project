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
      
aluminium_beam1:this.allImgsDom[13],
aluminium_beam2:this.allImgsDom[14],
base_plate1:this.allImgsDom[15],
base_plate2:this.allImgsDom[16],
base_plate3:this.allImgsDom[17],
base_plate4:this.allImgsDom[18],
beam1:this.allImgsDom[19],
beam2:this.allImgsDom[20], 
beam3:this.allImgsDom[21],
beam4:this.allImgsDom[22],
beam5:this.allImgsDom[23],
beam6:this.allImgsDom[24],
beam_left1:this.allImgsDom[25],
beam_left2:this.allImgsDom[26],
beam_right1:this.allImgsDom[27],
beam_right2:this.allImgsDom[28],
bfs_extension:this.allImgsDom[29],
bfs_left1:this.allImgsDom[30],
bfs_left2:this.allImgsDom[31],
bfs_left3:this.allImgsDom[32],
bfs_right1:this.allImgsDom[33],
bfs_right2:this.allImgsDom[34],
bfs_right3:this.allImgsDom[35],
brace_1:this.allImgsDom[36],
brace_2:this.allImgsDom[37],
brace_back1:this.allImgsDom[38],
brace_back2:this.allImgsDom[39],
brace_front1:this.allImgsDom[40],
brace_front2:this.allImgsDom[41],
brace_left1:this.allImgsDom[42],
brace_left2:this.allImgsDom[43],
brace_right1:this.allImgsDom[44],
brace_right2:this.allImgsDom[45],
ct_prop1:this.allImgsDom[46],
ct_prop2:this.allImgsDom[47],
ct_prop3:this.allImgsDom[48],
ct_prop4:this.allImgsDom[49],
hammer:this.allImgsDom[50],
nail1:this.allImgsDom[51],
nail2:this.allImgsDom[52],
nail3:this.allImgsDom[53],
nail4:this.allImgsDom[54],
nail_helper:this.allImgsDom[55],
nut:this.allImgsDom[56],
objective:this.allImgsDom[57],
real_basic_frame1:this.allImgsDom[58],
real_basic_frame2:this.allImgsDom[59],
real_basic_frame3:this.allImgsDom[60],
real_basic_frame4:this.allImgsDom[61],
real_beam1:this.allImgsDom[62],
real_beam2:this.allImgsDom[63],
real_bfs_removebg:this.allImgsDom[64],
real_bfs:this.allImgsDom[65],
sheathing1:this.allImgsDom[66],
sheathing2:this.allImgsDom[67],
sheathing3:this.allImgsDom[68],
u_head1:this.allImgsDom[69],
u_head2:this.allImgsDom[70],
u_head3:this.allImgsDom[71],
u_head4:this.allImgsDom[72],
bolt1:this.allImgsDom[73],
bolt2:this.allImgsDom[74],
bolt3:this.allImgsDom[75],
bolt4:this.allImgsDom[76],
bolt5:this.allImgsDom[77],
bolt6:this.allImgsDom[78],
bolt7:this.allImgsDom[79],
bolt8:this.allImgsDom[80],
nail_helper_beam:this.allImgsDom[81],
brace_3:this.allImgsDom[82],
brace_4:this.allImgsDom[83],
brace_5:this.allImgsDom[84],
brace_6:this.allImgsDom[85],
brace_7:this.allImgsDom[86],
brace_8:this.allImgsDom[87],
brace_9:this.allImgsDom[88],
brace_10:this.allImgsDom[89],
brace_11:this.allImgsDom[90],
brace_12:this.allImgsDom[91],
brace_13:this.allImgsDom[92],
brace_14:this.allImgsDom[93],
brace_15:this.allImgsDom[94],
brace_16:this.allImgsDom[95],
brace_back_horizontal_1:this.allImgsDom[96],
brace_back_horizontal_2:this.allImgsDom[97],
brace_back_vertical_1:this.allImgsDom[98],
brace_back_vertical_2:this.allImgsDom[99],
brace_front_horizontal_1:this.allImgsDom[100],
brace_front_horizontal_2:this.allImgsDom[101],
brace_front_vertical_1:this.allImgsDom[102],
brace_front_vertical_2:this.allImgsDom[103],
brace_left_horizontal_1:this.allImgsDom[104],
brace_left_horizontal_2:this.allImgsDom[105],
brace_left_vertical_1:this.allImgsDom[106],
brace_left_vertical_2:this.allImgsDom[107],
brace_right_horizontal_1:this.allImgsDom[108],
brace_right_horizontal_2:this.allImgsDom[109],
brace_right_vertical_1:this.allImgsDom[110],
brace_right_vertical_2:this.allImgsDom[111],


      
      
      
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
