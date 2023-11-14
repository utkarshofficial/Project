// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


      
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
};

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
};

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
const setIsProcessRunning = (value) => {
  isRunning = value;
  if(value){
    Dom.hideAll()
  }
};

// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const 


textToSpeach = (text) => {
  // if(isMute){
  //   return;
  // }
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = null) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: 25,
    onStringTyped(){
      console.log(ccQueue);
      ccQueue.shift();
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())
      // }
    }
  });
  if (!isMute) textToSpeach(text);
  return ccDom;
}
   
class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector
    // push
  }
  hidden(isHidden){
    if(isHidden == false)
      this.item.style.visibility = "visible"
    else
      this.item.style.visibility = "hidden"
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    //! push for every element
    this.push()

    // coordinates
    this.left = left
    this.top = top
    this.bottom = bottom
    this.right = right
    this.height = height
    this.width = width
    this.item.style.opacity = 1
    this.item.style.transform = "translateX(0) translateY(0)"

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj){
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems(){
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes){
      // to reset each anime after back btn pressed
      i.reset();
    } 
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom("blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(200);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    if(this.selector != ".anime-header")
      Dom.arrayOfItems.push(this);
    return this;
  }
}

// support class for axis
// class Img {
//   constructor(
//     imgName = null
//     // left = null,
//     // top = null,
//     // height = null,
//     // width = null,
//     // bottom = null,
//     // right = null
//   ) {
//     // coordinates
//     // this.left = left;
//     // this.top = top;
//     // this.bottom = bottom;
//     // this.right = right;
//     // this.height = height;
//     // this.width = this.width;
//     this.img = src.get(imgName);
//     return this;
//   }
//   zIndex(idx) {
//     this.img.style.zIndex = idx;
//     return this;
//   }
//   opacity(val = 1) {
//     this.img.style.opacity = val;
//     return this;
//   }
//   rotate(deg) {
//     this.img.style.transform = `rotate(${deg}deg)`;
//     return this;
//   }
//   scale(val = 1) {
//     this.img.style.scale = val;
//     return this;
//   }
//   get() {
//     return this.img;
//   }
//   set(
//     left = null,
//     top = null,
//     height = null,
//     width = null,
//     bottom = null,
//     right = null
//   ) {
//     // coordinates
//     this.left = left;
//     this.top = top;
//     this.bottom = bottom;
//     this.right = right;
//     this.height = height;
//     this.width = width;
//     this.img.style.opacity = 1;
//     this.img.style.transform = "translateX(0) translateY(0)";

//     if (this.left !== null) this.img.style.left = String(this.left) + "px";
//     if (this.top !== null) this.img.style.top = String(this.top) + "px";
//     if (this.bottom !== null)
//       this.img.style.bottom = String(this.bottom) + "px";
//     if (this.right !== null) this.img.style.right = String(this.right) + "px";
//     if (this.height !== null)
//       this.img.style.height = String(this.height) + "px";
//     if (this.width !== null) this.img.style.width = String(this.width) + "px";
//     this.show();
//     return this;
//   }
//   show() {
//     this.img.style.display = "block";
//     this.opacity();
//     return this;
//   }
//   hide() {
//     this.img.style.display = "none";
//     return this;
//   }
//   static arrayOfImages = [];
//   static hideAll() {
//     for (let i of Img.arrayOfImages) {
//       i.hide();
//       i.opacity();
//     }
//     Img.resetImages();
//   }
//   static resetImages() {
//     Img.arrayOfImages = [];
//   }
//   static setBlinkArrow(
//     isX = true,
//     left = null,
//     top = null,
//     height = 60,
//     width = null,
//     rotate = 0
//   ) {
//     let blinkArrow = new Img("blinkArrow")
//       .set(left, top, height, width)
//       .rotate(rotate)
//       .zIndex(200);
//     if (isX === -1) {
//       blinkArrow.hide();
//       return;
//     }
//     let x = 0,
//       y = 0;
//     if (isX) {
//       x = 20;
//     } else {
//       y = 20;
//     }
//     var blink = anime({
//       targets: blinkArrow.img,
//       easing: "easeInOutQuad",
//       opacity: 1,
//       translateX: x,
//       translateY: y,
//       direction: "alternate",
//       loop: true,
//       autoplay: false,
//       duration: 300,
//     });

//     return blink;
//   }
//   push() {
//     Img.arrayOfImages.push(this);
//     return this;
//   }
// }

// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),
    land: new Dom("land"),
    chalk_with_hand: new Dom("chalk_with_hand"),
    chalk_markings1: new Dom("chalk_markings1"),
    chalk_markings2: new Dom("chalk_markings2"),
    chalk_markings3: new Dom("chalk_markings3"),
    chalk_markings4: new Dom("chalk_markings4"),
    chalk_markings5: new Dom("chalk_markings5"),
    chalk_markings6: new Dom("chalk_markings6"),
    marking_surface1: new Dom("marking_surface1"),
    marking_surface2: new Dom("marking_surface2"),
    marking_surface3: new Dom("marking_surface3"),
    marking_surface4: new Dom("marking_surface4"),
    marking_surface5: new Dom("marking_surface5"),
    marking_surface6: new Dom("marking_surface6"),
    anchor_plate1: new Dom("anchor_plate1"),
    anchor_plate2: new Dom("anchor_plate2"),
    anchor_plate3: new Dom("anchor_plate3"),
    beam_3d_1: new Dom("beam_3d_1"),
    beam_3d_2: new Dom("beam_3d_2"),
    beam_3d_with_holes1: new Dom("beam_3d_with_holes1"),
    beam_3d_with_holes2: new Dom("beam_3d_with_holes2"),
    ct_prop1: new Dom("ct_prop1"),
    ct_prop2: new Dom("ct_prop2"),
    ct_prop3: new Dom("ct_prop3"),
    ct_prop4: new Dom("ct_prop4"),
    ct_prop5: new Dom("ct_prop5"),
    ct_prop6: new Dom("ct_prop6"),
    foot_adapter1: new Dom("foot_adapter1"),
    foot_adapter2: new Dom("foot_adapter2"),
    foot_adapter3: new Dom("foot_adapter3"),

    head_adapter1: new Dom("head_adapter1"),
    head_adapter2: new Dom("head_adapter2"),
    head_adapter3: new Dom("head_adapter3"),
    head_adapter4: new Dom("head_adapter4"),

    full_column: new Dom("full_column"),
    drill_machine: new Dom("drill_machine"),
    hammer: new Dom("hammer"),
    nail1: new Dom("nail1"),
    nail2: new Dom("nail2"),
    nail3: new Dom("nail3"),
    nail4: new Dom("nail4"),
    objective: new Dom("objective"),
    real_foot_adapter: new Dom("real_foot_adapter"),
    real_head_adapter: new Dom("real_head_adapter"),
    sheathing: new Dom("sheathing"),
    sheathing1: new Dom("sheathing1"),
    sheathing2: new Dom("sheathing2"),
    sheathing3: new Dom("sheathing3"),
    sheathing4: new Dom("sheathing4"),
    steel_waler1: new Dom("steel_waler1"),
    steel_waler2: new Dom("steel_waler2"),
    steel_waler3: new Dom("steel_waler3"),
    tie_rod1: new Dom("tie_rod1"),
    tie_rod2: new Dom("tie_rod2"),
    tie_rod3: new Dom("tie_rod3"),
    tie_rod4: new Dom("tie_rod4"),
    wing_nut_top1: new Dom("wing_nut_top1"),
    wing_nut_top2: new Dom("wing_nut_top2"),
    wing_nut_top3: new Dom("wing_nut_top3"),
    wing_nut_top4: new Dom("wing_nut_top4"),
    wing_nut_top5: new Dom("wing_nut_top5"),
    wing_nut_top6: new Dom("wing_nut_top6"),
    wing_nut_top7: new Dom("wing_nut_top7"),
    wing_nut_top8: new Dom("wing_nut_top8"),
    wing_nut_full: new Dom("wing_nut_full"),
    beam_3d_with_one_hole: new Dom("beam_3d_with_one_hole"),
    beam_3d_with_holes_nailing_helper: new Dom("beam_3d_with_holes_nailing_helper"),
    beam_3d_with_holes3: new Dom("beam_3d_with_holes3"),
    beam_3d_with_holes4: new Dom("beam_3d_with_holes4"),
    sheathing_full2: new Dom("sheathing_full2"),
    sheathing_full3: new Dom("sheathing_full3"),
    flange_claw1: new Dom("flange_claw1"),
    flange_claw2: new Dom("flange_claw2"),
    flange_claw3: new Dom("flange_claw3"),
    flange_claw4: new Dom("flange_claw4"),
    steel_waler_blue1: new Dom("steel_waler_blue1"),
    steel_waler_blue2: new Dom("steel_waler_blue2"),
    steel_waler_tilt1: new Dom("steel_waler_tilt1"),
    steel_waler_tilt2: new Dom("steel_waler_tilt2"),
    column_side1: new Dom("column_side1"),
    column_front_side: new Dom("column_front_side"),
    column_back_side: new Dom("column_back_side"),
    column_left_side: new Dom("column_left_side"),
    column_right_side: new Dom("column_right_side"),
    column_sides_all: new Dom("column_sides_all"),
    drill_helper: new Dom("drill_helper"),

    _wall_beam1: new Dom("_wall_beam1"),
    _wall_beam1_drill_layer: new Dom("_wall_beam1_drill_layer"),
    _wall_beam1_with_holes: new Dom("_wall_beam1_with_holes"),
    _wall_beam1_with_one_hole: new Dom("_wall_beam1_with_one_hole"),
    _wall_beam2: new Dom("_wall_beam2"),
    _wall_beam3: new Dom("_wall_beam3"),
    _wall_beam3_drill_layer: new Dom("_wall_beam3_drill_layer"),
    _wall_beam3_with_holes: new Dom("_wall_beam3_with_holes"),
    _wall_beam3_with_one_hole: new Dom("_wall_beam3_with_one_hole"),
    _wall_beam4: new Dom("_wall_beam4"),
    _wall_beam5: new Dom("_wall_beam5"),
    _wall_beam5_drill_layer: new Dom("_wall_beam5_drill_layer"),
    _wall_beam5_with_holes: new Dom("_wall_beam5_with_holes"),
    _wall_beam5_with_one_hole: new Dom("_wall_beam5_with_one_hole"),
    _wall_beam6: new Dom("_wall_beam6"),
    _wall_flange_claw1: new Dom("_wall_flange_claw1"),
    _wall_flange_claw2: new Dom("_wall_flange_claw2"),
    _wall_flange_claw3: new Dom("_wall_flange_claw3"),
    _wall_flange_claw4: new Dom("_wall_flange_claw4"),
    _wall_flange_claw5: new Dom("_wall_flange_claw5"),
    _wall_flange_claw6: new Dom("_wall_flange_claw6"),
    _wall_nail1: new Dom("_wall_nail1"),
    _wall_nail10: new Dom("_wall_nail10"),
    _wall_nail11: new Dom("_wall_nail11"),
    _wall_nail12: new Dom("_wall_nail12"),
    _wall_nail2: new Dom("_wall_nail2"),
    _wall_nail3: new Dom("_wall_nail3"),
    _wall_nail4: new Dom("_wall_nail4"),
    _wall_nail5: new Dom("_wall_nail5"),
    _wall_nail6: new Dom("_wall_nail6"),
    _wall_nail7: new Dom("_wall_nail7"),
    _wall_nail8: new Dom("_wall_nail8"),
    _wall_nail9: new Dom("_wall_nail9"),
    _wall_sheathing1: new Dom("_wall_sheathing1"),
    _wall_sheathing2: new Dom("_wall_sheathing2"),
    _wall_steel_waler1: new Dom("_wall_steel_waler1"),
    _wall_steel_waler2: new Dom("_wall_steel_waler2"),
    _wall_wall_back_side: new Dom("_wall_wall_back_side"),
    _wall_wall_front_side: new Dom("_wall_wall_front_side"),
    _wall_wall_left_side: new Dom("_wall_wall_left_side"),
    _wall_wall_right_side: new Dom("_wall_wall_right_side"),
    _wall_wall_without_rotate: new Dom("_wall_wall_without_rotate"),
    _wall_wall_without_rotate_layer: new Dom("_wall_wall_without_rotate_layer"),
    _wall_wall_with_rotate: new Dom("_wall_wall_with_rotate"),
    _wall_wall_with_steel_waler_and_flange_claw: new Dom("_wall_wall_with_steel_waler_and_flange_claw"),
    _wall_wall_with_steel_waler_down: new Dom("_wall_wall_with_steel_waler_down"),
    _wall_wall_front_side_with_ct_prop: new Dom("_wall_wall_front_side_with_ct_prop"),
  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      };
      return true;
    }),
    (objective = function () {
      setIsProcessRunning(true);
      Dom.hideAll()

      // to stop current voice
      window.speechSynthesis.cancel();
 
      Scenes.items.welcomeBox.hide();
      Dom.setBlinkArrow(-1);
      setCC("");
      
      // * Required Items
      Scenes.items.projectIntro.show()
      Scenes.items.objective.set(0,55)
      

    anime({
      duration:4000, 
      complete(){
        setIsProcessRunning(false);
        Dom.setBlinkArrow(true, 790, 444).play();
        setCC("Click 'Next' to go to next step");

      }

    })
    return true;
  }),
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);

      Scenes.setStepHeading("Step 1", "Marking the area (rectangularly)");
      Scenes.items.land.set(0,0,404,950)

      Scenes.items.chalk_with_hand.set(140,138,80,70).zIndex(6)
      
      Scenes.items.chalk_markings1.set(140,150,6,670).zIndex(5)
      Scenes.items.marking_surface1.set(140,150,8,670).zIndex(5)

      Scenes.items.chalk_markings2.set(757,200,6,100).rotate(90).zIndex(5)
      Scenes.items.marking_surface2.set(757,200,8,100).rotate(90).zIndex(5)

      Scenes.items.chalk_markings3.set(140,252,6,670).zIndex(5)
      Scenes.items.marking_surface3.set(140,252,8,670).zIndex(5)

      Scenes.items.chalk_markings4.set(94,200,6,100).rotate(90).zIndex(4)
      Scenes.items.marking_surface4.set(94,200,8,100).rotate(90).zIndex(4)

      // Scenes.items.chalk_markings5.set(284,201,6,282.8).rotate(45).zIndex(3)
      // Scenes.items.marking_surface5.set(284,201,8,282.8).rotate(45).zIndex(3)

      // Scenes.items.chalk_markings6.set(284,201,6,282.8).rotate(-45).zIndex(2)
      // Scenes.items.marking_surface6.set(284,201,8,282.8).rotate(-45).zIndex(2)

      Scenes.items.tempTitle1.set(815,190).setContent("300 mm").hidden()
      Scenes.items.tempTitle2.set(425,260).setContent("2400 mm").hidden()

      setCC("Click on the hand to mark the area rectangularly.")
      Dom.setBlinkArrow(true,65,130 ).play()
      // onclick
      Scenes.items.chalk_with_hand.item.onclick = ()=>{
        Dom.setBlinkArrow(-1);

        anime.timeline({
          easing: "easeOutExpo"
        })
        .add({
          begin(){
            Scenes.items.anime_main_dom.item.style.overflow = "hidden";
          },
          targets: [Scenes.items.chalk_with_hand.item,Scenes.items.marking_surface1.item],
          translateX: 670,
          duration: 3000,
        })
        .add({
          begin(){
            setCC("Marking the vertical length of 300mm")
          },
          targets: [Scenes.items.chalk_with_hand.item],
          translateY: 100,
          duration: 3000,
          complete(){
            Scenes.items.tempTitle1.hidden(false)
          }
        },3000)// marking of right vertical surface
        .add({
          targets: [Scenes.items.marking_surface2.item],
          translateX: 100,
          duration: 3000,
        },3000)
        .add({
          begin(){
            setCC("Marking the horizontal length of 2400mm")
          },
          targets: [Scenes.items.marking_surface3.item],
          translateX: -670,
          duration: 3000,
          complete(){
            Scenes.items.tempTitle2.hidden(false)
          }
        },6000)
        .add({
          targets: [Scenes.items.chalk_with_hand.item],
          translateX: 0,
          duration: 3000,
        },6000)
        .add({
          targets: [Scenes.items.chalk_with_hand.item],
          translateY: 0,
          duration: 3000,
        },9000)// marking of left vertical surface
        .add({
          targets: [Scenes.items.marking_surface4.item],
          top: "-=100",
          duration: 3000,
          complete(){
            Dom.setBlinkArrow(true, 790, 408).play()
            // Quiz.loadQuiz()
            setCC("Click 'Next' to go to next step")
            setIsProcessRunning(false)
          }
        },9000)
        // .add({
        //   targets: [Scenes.items.chalk_with_hand.item],
        //   left: "+=200",
        //   top: "+=200",
        //   duration: 3000,
        // },12000)
        // .add({
        //   targets: [Scenes.items.marking_surface5.item],
        //   translateX: 282.8,
        //   duration: 3000,
        // },12000)
        // .add({
        //   begin(){
        //     Scenes.items.chalk_with_hand.set(525,88)
        //   },
        //   endDelay: 500,
        // })
        // .add({
        //   targets: [Scenes.items.chalk_with_hand.item],
        //   translateX: -200.8,
        //   translateY: 200.8,
        //   duration: 3000,
        // },15500)
        // .add({
        //   targets: [Scenes.items.marking_surface6.item],
        //   translateX: -282.8,
        //   duration: 3000,
        //   complete(){
        //     Dom.setBlinkArrow(true, 790, 408).play()
        //     // Quiz.loadQuiz()
        //     setCC("Click 'Next' to go to next step")
        //     setIsProcessRunning(false)
        //   }
        // },15500)
      }
      return true
    }),
    (step2 = function () {
      // ! fixing the overflow
      Scenes.items.anime_main_dom.item.style.overflow = "visible";

      // hide
      Dom.hideAll();
      setIsProcessRunning(true);
      Dom.setBlinkArrow(-1);
      
      Scenes.setStepHeading("Step 2", "Bring timber beam in the lab and drill holes on it.")

      // * Required Elements
      Scenes.items.beam_3d_1.set(-170,73,350).rotate(-55)
      Scenes.items.beam_3d_2.set(950,93,350).zIndex(1)
      Scenes.items.drill_machine.set(820,325,60).zIndex(2) 

      // ! remove
      // Scenes.items.beam_3d_1.set(170,73,350)
      // Scenes.items.beam_3d_with_one_hole.set(170,73,350)
      // Scenes.items.beam_3d_with_holes1.set(170,73,350)
      // Scenes.items.beam_3d_2.set(250,93,350)
      // Scenes.items.beam_3d_with_holes2.set(250,93,350)
      
      // Scenes.items.drill_helper.set(170,73,350)
      // Scenes.items.drill_helper.set(250,93,350)

      // Scenes.items.sheathing1.set(170,73,350)


      // Scenes.items.drill_machine.set(394,150,60)
      // Scenes.items.drill_machine.set(236,254,60)
      // Scenes.items.drill_machine.set(471,170,60)
      // Scenes.items.drill_machine.set(317,274,60) 

      Scenes.items.contentAdderBox.set(null,-50).show("flex")
      Scenes.contentAdderAddBtn("Timber Beam")
      Scenes.contentAdderAddBtn("Drill Machine")

      let contentAdderBtns = getAll(".content-adder-box .btn")
      contentAdderBtns[0].onclick = timberBeamAnime
      contentAdderBtns[1].onclick = drillMachineAnime
      
      let timberBeamCount = 0
      let drillMachineCount = 0

      function timberBeamAnime(){
        switch(timberBeamCount){
          case 0:
            anime({

              targets: Scenes.items.beam_3d_1.item,
              keyframes : [
                {left : 170},
                {rotate: 0},
              ],
              easing: "easeInOutQuad",
              duration: 2500,
              complete(){
                Scenes.items.drill_helper.set(170,73,350).zIndex(100)
                setCC("Click on the 'Drill Machine' to drill holes on timber beam.");      
                Dom.setBlinkArrow(true, 705,15).play();
              }
            })
            break;
            case 1:
              anime({
                targets: Scenes.items.beam_3d_2.item,
                keyframes : [
                  {left : 250},
                  {rotate: 0},
                ],
                easing: "easeInOutQuad",
                duration: 2500,
                complete(){
                  Scenes.items.drill_helper.set(250,93,350)
                  setCC("Click on the 'Drill Machine' to drill holes on timber beam.");      
                  Dom.setBlinkArrow(true, 705,15).play();
                }
              })

              break
        }
        timberBeamCount++
      }

      function drillMachineAnime(){
        switch(drillMachineCount){
          case 0:
            anime.timeline({
              easing: "easeInOutQuad",
                targets: Scenes.items.drill_machine.item,
                duration: 4000,
            })
              .add({
                keyframes: [                  {left: 394,top: 150},
                  { left: "-=17",duration: 1500,},
                  {left: "+=17",duration: 1500,}
                ],
                complete(){
                  Scenes.items.beam_3d_1.hide()
                      Scenes.items.beam_3d_with_one_hole.set(170,73,350)
                }
              })
              .add({
                top: 254,
              })
              .add({
                keyframes: [
                  {left: 236,top: 254},
                  { left: "-=11",duration: 1500,},
                  {left: "+=11",duration: 1500,}
                ],
                complete(){
                  Scenes.items.beam_3d_with_one_hole.hide()
                  Scenes.items.beam_3d_with_holes1.set(170,73,350) 
                    
                }
              })    
              .add({
                left: 820,
                top: 325,
                duration: 1000,
                complete(){
                  setCC("Click on the 'Timber Beam' to add another tim ber beam in the lab.");      
                      Dom.setBlinkArrow(true, 705,-35).play();
                }
              })      
              break;

              case 1:
                anime.timeline({
                  easing: "easeInOutQuad",
                    targets: Scenes.items.drill_machine.item,
                    duration: 2000,
                })
                  .add({
                    keyframes: [
                      {left: 471,top: 170,},
                      { left: "-=15",duration: 1500,},
                      {left: "+=15",duration: 1500,}
                    ],
                    complete(){
                      Scenes.items.beam_3d_2.hide()
                      Scenes.items.beam_3d_with_one_hole.set(250,93,350)        
                    }
                  })
                  .add({
                    top: 274,
                  })
                  .add({
                    
                    keyframes: [
                      {left: 317,},
                      { left: "-=12",duration: 1500,},
                      {left: "+=12",duration: 1500,}
                    ],
                    complete(){
                      Scenes.items.beam_3d_with_one_hole.hide()
                      Scenes.items.beam_3d_with_holes2.set(250,93,350) 
                        
                    }
                  })    
                  .add({
                    left: 820,
                    top: 325,
                
                    complete(){
                      setCC("Click on the 'Next' to go to next step.");      
                      Dom.setBlinkArrow(true, 790, 408).play()
            setIsProcessRunning(false);
            // Quiz.loadQuiz()
          }
                  })     
                break
        }                
        drillMachineCount++                                     
        }


      setCC("Click on the 'Timber Beam' to add Timber beam in the lab.");      
      Dom.setBlinkArrow(true, 705, -35).play()
      // onclick
      contentAdderBtns[0].onclick = timberBeamAnime
      contentAdderBtns[1].onclick = drillMachineAnime
      // remove all the previous elements
      // Dom.hideAll();
      return true;  

    }),
    (step3 = function () {
      setIsProcessRunning(true);

      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      // Required Elements
      Scenes.setStepHeading("Step 3", "Place plywood sheathing on timber beam with the help of nailing ");

      Scenes.items.beam_3d_with_holes1.set(178,78,345)
      Scenes.items.beam_3d_with_holes2.set(250,93,350)
      Scenes.items.beam_3d_with_holes_nailing_helper.set(250,93,350).zIndex(5)
      Scenes.items.hammer.set(800,350,45).zIndex(6)
      Scenes.items.nail1.set(780,370,30).zIndex(3)
      Scenes.items.nail2.set(770,370,30).zIndex(3)
      Scenes.items.nail3.set(760,370,30).zIndex(3)
      Scenes.items.nail4.set(750,370,30).zIndex(3)
      Scenes.items.sheathing.set(-370,20,358).zIndex(2)

      let hammerAnime  =  anime({
        targets: Scenes.items.hammer.item,
        keyframes: [
          {rotateZ: [0, 30]},
          {rotateZ: [0, 30]},
          {rotateZ: [0, 30]},
          {rotateZ: [0, 30]},
        ],
        autoplay: false,
        duration: 3000,
      })
      
      //! Remove
      // Scenes.items.sheathing.set(170,73,358)

      // Scenes.items.sheathing1.set(384,149,30,10).zIndex(4)
      // Scenes.items.nail1.set(385,119,30).zIndex(3)
      
      // Scenes.items.sheathing2.set(263,230,30,10).zIndex(4)
      // Scenes.items.nail2.set(263,200,30).zIndex(3)
      // Scenes.items.sheathing3.set(330,248,30,10).zIndex(4)
      // Scenes.items.nail3.set(460,135,30).zIndex(3)
      
      // Scenes.items.sheathing4.set(459,165,30,10).zIndex(4)0
      // Scenes.items.nail4.set(329,218,30).zIndex(3)
      
      
      // Scenes.items.hammer.set(387,86,42).zIndex(6)
      // Scenes.items.hammer.set(264,166,42).zIndex(6)
      // Scenes.items.hammer.set(462,102,42).zIndex(6)
      // Scenes.items.hammer.set(330, 184, 42).zIndex(6)
      
      // Scenes.items.nail1.set(385,146,30).zIndex(3)
      
      Scenes.items.contentAdderBox.set(null,-50).show("flex")
      Scenes.contentAdderAddBtn("Sheathing")
      Scenes.contentAdderAddBtn("Nailing")

      let contentAdderBtns = getAll(".content-adder-box .btn")
      
      //* remove


      const sheathingAnime = ()=>{
        Dom.setBlinkArrow(-1)
            anime({
              easing: "easeInOutQuad",
              targets: [Scenes.items.sheathing.item],
              duration: 6000,
              keyframes: [
                {left: 170},
                {top: 73},
              ],
              complete(){
                Scenes.items.sheathing1.set(384,149,30,10).zIndex(4)
                Scenes.items.sheathing2.set(263,230,30,10).zIndex(4)
                Scenes.items.sheathing3.set(330,248,30,10).zIndex(4)
                Scenes.items.sheathing4.set(459,165,30,10).zIndex(4)

                Dom.setBlinkArrow(true, 710,15).play();
                setCC("Click on the 'Nailing' to nail on the sheathing.");
              }
            })
          }

      const nailingAnime = ()=>{
        Dom.setBlinkArrow(-1)
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            // * First nailing anime
            .add({
              targets: Scenes.items.nail1.item,
              keyframes:[
                {top: 119},
                {left: 385},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 387,
              top: 86,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items.nail1.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9","+=9"],
              duration: 3000
            })
            // * Second nailing animation
            .add({
              targets: Scenes.items.nail2.item,
              keyframes:[
                {top: 200},
                {left: 263},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 264,
              top: 166,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items.nail2.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9","+=9"],
              duration: 3000
            })
            // * Second nailing animation
            .add({
              targets: Scenes.items.nail3.item,
              keyframes:[
                {top: 135},
                {left: 460},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 462,
              top: 102,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items.nail3.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9","+=9"],
              duration: 3000
            })
            // * Fourth nailing animation
            .add({
              targets: Scenes.items.nail4.item,
              keyframes:[
                {top: 218},
                {left: 329},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 330,
              top: 184,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items.nail4.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9","+=9"],
              duration: 3000,
            })
            // * nailing completed ---xxx---
            .add({
              targets: Scenes.items.hammer.item,
              left: 800,
              top: 350,
              rotate: 0,
              complete(){
                Dom.setBlinkArrow(true, 790, 408).play();
                setCC("Click 'Next' to go to next step");
                setIsProcessRunning(false);
                Quiz.loadQuiz()
              }
            })
      }

      Dom.setBlinkArrow(true, 710, -35).play();
      setCC("Click on the 'Sheathing' to put it on the beam.");
      // onclick
      contentAdderBtns[0].onclick = sheathingAnime;
      contentAdderBtns[1].onclick = nailingAnime;

      return true;
    }),
    (step4 = function () {
      Dom.hideAll(); 
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "Step 4",
        "Join the steel waler with timber beam using flenge claw assembly."
      );

    // required items

    Scenes.items.flange_claw1.set(569,280,50,60).rotate(0).zIndex(4)
    Scenes.items.flange_claw2.set(630,280,50,60).rotate(0).zIndex(4)
    Scenes.items.flange_claw3.set(599,330,50,60).rotate(0).zIndex(4)
    Scenes.items.flange_claw4.set(660,330,50,60).rotate(0).zIndex(4)
    Scenes.items.steel_waler_blue1.set(748,280,30,135).zIndex(5)
    Scenes.items.steel_waler_blue2.set(748,330,30,135).zIndex(5)

 

    // Scenes.items.flange_claw1.set(611,352,50)
    // Scenes.items.flange_claw2.set(622,270,50)
    // Scenes.items.flange_claw3.set(555,352,50)
    // Scenes.items.flange_claw4.set(562,270,50)

    // ! before rotation
    Scenes.items.beam_3d_with_holes1.set(178-160,78,345)
    Scenes.items.beam_3d_with_holes2.set(250-160,93,350)
    Scenes.items.beam_3d_with_holes_nailing_helper.set(250-160,93,350).zIndex(5)
    Scenes.items.sheathing.set(170-160,75,358).zIndex(2)
    Scenes.items.sheathing1.set(384-160,149,30,10).zIndex(4)
    Scenes.items.sheathing2.set(263-160,230,30,10).zIndex(4)
    Scenes.items.sheathing3.set(330-160,248,30,10).zIndex(4)
    Scenes.items.sheathing4.set(459-160,165,30,10).zIndex(4)
    Scenes.items.nail1.set(385-160,148,30).zIndex(3)
    Scenes.items.nail2.set(263-160,229,30).zIndex(3)
    Scenes.items.nail3.set(460-160,162,30).zIndex(3)
    Scenes.items.nail4.set(329-160,247,30).zIndex(3)
    Scenes.items.tempTitle1.set(40,327).setContent("Before Rotation").hide()
    
    // ! after rotation
    Scenes.items.beam_3d_with_holes3.set(178+150,78,345).zIndex(2).hide()
    Scenes.items.beam_3d_with_holes4.set(250+150,93,350).zIndex(2).hide()
    Scenes.items.sheathing_full2.set(173+150,110,358).hide()
    Scenes.items.tempTitle2.set(340,327).setContent("After Rotation").hide()
    
    // Scenes.items.steel_waler1.set()
    // Scenes.items.steel_waler2.set()

    

    //! final pos
    // Scenes.items.steel_waler1.set(734,328,30)
    // Scenes.items.steel_waler2.set(734,373,30)
    // Scenes.items.steel_waler_tilt1.set(300,125,65).zIndex(5).rotate(-4)
    // Scenes.items.steel_waler_tilt2.set(155,224,65).zIndex(5).rotate(-4)
    // Scenes.items.flange_claw1.set(378,143,50,60).rotate(127).zIndex(4)
    // Scenes.items.flange_claw2.set(303,122,50,60).rotate(127).zIndex(4)
    // Scenes.items.flange_claw3.set(240,244,50,60).rotate(130).zIndex(4)
    // Scenes.items.flange_claw4.set(156,220,50,60).rotate(130).zIndex(4)
    

    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push()
    Scenes.contentAdderAddBtn("Steel Waler")
    Scenes.contentAdderAddBtn("Flange Claw")
    let contentAdderBtns = getAll(".content-adder-box .btn")
      
    const beforeAfterRotationAnime = ()=>{
      anime.timeline({
        easing: "easeInOutQuad",
        duration: 1000,
      })
      .add({
        complete(){
          Scenes.items.arrowRound.set(350,70,80)
        }
      })
      .add({
        complete(){
          Scenes.items.beam_3d_with_holes3.show()
          Scenes.items.beam_3d_with_holes4.show()
          Scenes.items.sheathing_full2.show()
        }
      })
      .add({
        complete(){
          Scenes.items.tempTitle1.set(40,327).setContent("Before Rotation").show()
          Scenes.items.tempTitle2.set(390,327).setContent("After Rotation").show()      
        }
      })
      .add({
        duration: 4000,
        complete(){
          Scenes.items.arrowRound.hide()
          Scenes.items.tempTitle1.hide()
          Scenes.items.tempTitle2.hide()


          Scenes.items.beam_3d_with_holes1.hide()
          Scenes.items.beam_3d_with_holes2.hide()
          Scenes.items.beam_3d_with_holes_nailing_helper.hide()
          Scenes.items.sheathing.hide()
          Scenes.items.sheathing1.hide()
          Scenes.items.sheathing2.hide()
          Scenes.items.sheathing3.hide()
          Scenes.items.sheathing4.hide()
          Scenes.items.nail1.hide()
          Scenes.items.nail2.hide()
          Scenes.items.nail3.hide()
          Scenes.items.nail4.hide()

        }
      })
      .add({
        targets: [Scenes.items.beam_3d_with_holes4.item,Scenes.items.beam_3d_with_holes3.item,Scenes.items.sheathing_full2.item],
        left: "-=200",
        complete(){
          Dom.setBlinkArrow(true,718,-35).play()
          setCC("Click on the 'Steel Waler' to put it on the beam.")
        }
      })
      .add({
        targets: Scenes.items.beam_3d_with_holes4.item,
        // left: 
      })

    }
    
    let steelWalerCount = 0
    const steelWalerAnime = ()=>{
    switch(steelWalerCount){
      case 0:
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.steel_waler_blue1.item,
          left: 300,
          top: 125,
          complete(){
            Scenes.items.steel_waler_blue1.hide()
            // tilt position of stel waler
            Scenes.items.steel_waler_tilt1.set(300,125,65).zIndex(5).rotate(-4)

            Dom.setBlinkArrow(true,718,15).play()
            setCC("Click on the 'Flange Claw' to attach it with steel waler.")
          }
        })
        break
      
      case 1:
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.steel_waler_blue2.item,
          left: 155,
          top: 224,
          complete(){
            Scenes.items.steel_waler_blue2.hide()
            // tilt position of steel waler
            Scenes.items.steel_waler_tilt2.set(155,224,65).zIndex(5).rotate(-4)
            Dom.setBlinkArrow(true,718,15).play()
            setCC("Click on the 'Flange Claw' to attach it with steel waler.")
          }
        })
        break
    }
    steelWalerCount++
    }

    let flangeClawCount = 0
    const flangeClawAnime = ()=>{
      switch(flangeClawCount){
        case 0:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 2000
          })
          .add({
            targets: Scenes.items.flange_claw1.item,
            left: 303,
            top: 122,
            rotate: 127,
          })
          .add({
            targets: Scenes.items.flange_claw2.item,
            left: 378,
            top: 143,
            rotate: 127,
            complete(){
              Dom.setBlinkArrow(true,718,-35).play()
              setCC("Click on the 'Steel Waler' to put it on the beam.")
            }
          })
          break

          case 1:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000
            })
            .add({
              targets: Scenes.items.flange_claw3.item,
              left: 156,
              top: 220,
              rotate: 130,
            })
            .add({
              targets: Scenes.items.flange_claw4.item,
              left: 240,
              top: 244,
              rotate: 130,
              complete(){
                Dom.setBlinkArrow(true, 790, 408).play();
                setCC("Click 'Next' to go to next step");
                setIsProcessRunning(false);
                Quiz.loadQuiz()
              }
            })
            break
      }
      flangeClawCount++;
    }

     //! starter animes
     beforeAfterRotationAnime()
     
     
     //onclick pipe waler 
     contentAdderBtns[0].onclick = steelWalerAnime;
     contentAdderBtns[1].onclick = flangeClawAnime;

     return true;

    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 5",
        "Lift the one side of column and attach CT prop."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      //! Required Items
      Scenes.items.beam_3d_with_holes3.set(178-100,78,345).zIndex(2)
      Scenes.items.beam_3d_with_holes4.set(250-100,93,350).zIndex(2)
      Scenes.items.sheathing_full2.set(173-100,110,358)
      Scenes.items.tempTitle1.set(500,370).setContent("After Lifting").hide()

      Scenes.items.steel_waler_tilt1.set(300-50,125,65).zIndex(5).rotate(-4)
      Scenes.items.steel_waler_tilt2.set(155-50,224,65).zIndex(5).rotate(-4)
      Scenes.items.flange_claw1.set(378-50,143,50,60).rotate(127).zIndex(4)
      Scenes.items.flange_claw2.set(303-50,122,50,60).rotate(127).zIndex(4)
      Scenes.items.flange_claw3.set(240-50,244,50,60).rotate(130).zIndex(4)
      Scenes.items.flange_claw4.set(156-50,220,50,60).rotate(130).zIndex(4)
      Scenes.items.column_side1.set(400,10,350).hide()
      
      
      // !final pos
      // Scenes.items.head_adapter1.set(220+150,90,25).rotate(35).zIndex(10)
      // Scenes.items.head_adapter2.set(220+150,250,25).rotate(35).zIndex(10)
      // Scenes.items.ct_prop1.     set(135+150,80,280,50).rotate(32).zIndex(11)
      // Scenes.items.ct_prop2.     set(135+150,210,178,50).rotate(60).zIndex(11)
      // Scenes.items.foot_adapter1.set(55+150,280,75).zIndex(12)
     

      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("Head Adapter");
      Scenes.contentAdderAddBtn("Foot Adapter");
      Scenes.contentAdderAddBtn("CT Prop");

      let contentAdderBtns = getAll(".content-adder-box .btn");

      const beforeAfterAnime = ()=>{
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 1000,
        })
        .add({
          complete(){
            Scenes.items.arrowRound.set(350,50,65)
          }
        })
        .add({
          complete(){
            Scenes.items.column_side1.show()
          }
        })
        .add({
          complete(){
            Scenes.items.tempTitle1.show()      
          }
        })
        .add({
          duration: 4000,
          complete(){
            Scenes.items.arrowRound.hide()
            Scenes.items.tempTitle1.hide()
  
  
            Scenes.items.beam_3d_with_holes3.hide()
            Scenes.items.beam_3d_with_holes4.hide()
            Scenes.items.sheathing_full2.hide()
            Scenes.items.steel_waler_tilt1.hide()
            Scenes.items.steel_waler_tilt2.hide()
            Scenes.items.flange_claw1.hide()
            Scenes.items.flange_claw2.hide()
            Scenes.items.flange_claw3.hide()
            Scenes.items.flange_claw4.hide()
      
  
          }
        })        .add({
          targets: Scenes.items.column_side1.item,
          left: "-=150",
          complete(){
           
            Scenes.items.head_adapter1.set(400,360,25    ).zIndex(10)
            Scenes.items.head_adapter2.set(440,360,25    ).zIndex(10)
            Scenes.items.foot_adapter1.set(510,310,75    ).zIndex(12)
            Scenes.items.ct_prop1.     set(187,225,280,50).rotate(90).zIndex(11)
            Scenes.items.ct_prop2.     set(153,305,178,50).rotate(90).zIndex(11)

            setCC("Click on the 'Head Adapter' to connect it with steel waler.")
            Dom.setBlinkArrow(true,700,-35).play()

          }
        })  
      }

      const headAdapterAnime = ()=>{
            anime.timeline({
                easing: "easeInOutQuad",
                duration: 1000,
            })
            .add({
              targets: Scenes.items.head_adapter1.item,
              left:220+150,
              top:90,
              rotate: 35
            })
            .add({
              targets: Scenes.items.head_adapter2.item,
              left:220+150,
              top:250,
              rotate: 35,
              complete(){
                setCC("Click on the 'Foot Adapter' to support the CT Prop.")
                Dom.setBlinkArrow(true,700,15).play()
              }
            })
     
      }
      
      const footAdapterAnime = ()=>{
            anime({
              easing: "easeInOutQuad",
              targets: Scenes.items.foot_adapter1.item,
              left:55+150,
              top:280,
              duration: 1000,
              complete(){
                setCC("Click on the 'CT Prop' to support the form floor panel.")
                Dom.setBlinkArrow(true,700,65).play()
              }
            })
      }
  
      const ctPropAnime = ()=>{
            anime.timeline({
                easing: "easeInOutQuad",
                duration: 1000,
            })
            .add({
              targets: Scenes.items.ct_prop1.item,
              left:135+150, 
              top:80,
              rotate: 32
            })
            .add({
              targets: Scenes.items.ct_prop2.item,
              left:135+150, 
              top:210,
              rotate: 60,
              complete(){
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 408).play();
                setIsProcessRunning(false);
                Quiz.loadQuiz()
              }
            })
      }


    // !starter animes
    beforeAfterAnime()
    
    
    //onclick
    contentAdderBtns[0].onclick = headAdapterAnime
    contentAdderBtns[1].onclick = footAdapterAnime
    contentAdderBtns[2].onclick = ctPropAnime

    // setCC("Click 'Next' to go to next step");
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setIsProcessRunning(false);
        //   anime({
        //     duration: 1000,
        //     complete(){
        //       Quiz.loadQuiz()
        //     }
        //   });
        // };
      return true;
    }),
    (step6 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading(
        "Step 6",
        "Bring timber beam and drill holes on it to make other side."
      );

      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      // todo Required Items
      Scenes.items._wall_beam1.set(950,0)
      Scenes.items._wall_beam2.set(950,0)
      Scenes.items._wall_beam3.set(950,0)
      Scenes.items._wall_beam4.set(950,0)
      Scenes.items._wall_beam5.set(950,0)
      Scenes.items._wall_beam6.set(950,0)
        
      Scenes.items.drill_machine.set(820,325,60).zIndex(2) 

    // image Box
    // Scenes.items.imageBox.show("flex").set(750,200)
    // Scenes.items.imageBoxSrc.item.src = "./src/images/real_head_adapter.png"
    // Scenes.items.imageBoxTitle.setContent("Head Adapter")

    //! remove
    // Scenes.items._wall_beam1.set(0,0)
    // Scenes.items._wall_beam2.set(0,0)
    // Scenes.items._wall_beam3.set(0,0)
    // Scenes.items._wall_beam4.set(0,0)
    // Scenes.items._wall_beam5.set(0,0)
    // Scenes.items._wall_beam6.set(0,0)
    // Scenes.items._wall_beam1_drill_layer.set(0,0).zIndex(3)
    // Scenes.items._wall_beam3_drill_layer.set(0,0).zIndex(3)
    // Scenes.items._wall_beam5_drill_layer.set(0,0).zIndex(3)
    
    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push()
    
    Scenes.contentAdderAddBtn("Beam")
    Scenes.contentAdderAddBtn("Drill")
    Scenes.contentAdderAddBtn("Repeat")

    let contentAdderBtns = getAll(".content-adder-box .btn")
    
    let timberBeamCount = 0
    let drillMachineCount = 0

    function timberBeamAnime(){
      switch(timberBeamCount){
        case 0:
          anime(
          {
            targets: Scenes.items._wall_beam1.item,
            left : 0,
            easing: "easeInOutQuad",
            duration: 2500,
            complete(){
              Scenes.items._wall_beam1_drill_layer.set(0,0).zIndex(3)
              setCC("Click on the 'Drill Machine' to drill holes on timber beam.")
              Dom.setBlinkArrow(true, 740, 15).play()
            }
          })
          break

          case 1:
            anime({
              targets: Scenes.items._wall_beam2.item,
              left : 0,
              easing: "easeInOutQuad",
              duration: 2500,
              complete(){
              }
            })
            break

          case 2:
            anime({
              targets: Scenes.items._wall_beam3.item,
              left : 0,
              easing: "easeInOutQuad",
              duration: 2500,
              complete(){
                Scenes.items._wall_beam3_drill_layer.set(0,0).zIndex(3)
              }
            })
            break

          case 3:
            anime({
              targets: Scenes.items._wall_beam4.item,
              left : 0,
              easing: "easeInOutQuad",
              duration: 2500,
              complete(){
              }
            })
            break

          case 4:
            anime({
              targets: Scenes.items._wall_beam5.item,
              left : 0,
              easing: "easeInOutQuad",
              duration: 2500,
              complete(){
                Scenes.items._wall_beam5_drill_layer.set(0,0).zIndex(3)
              }
            })
            break

          case 5:
            anime({
              targets: Scenes.items._wall_beam6.item,
              left : 0,
              easing: "easeInOutQuad",
              duration: 2500,
              complete(){
                setCC("Click on the 'Next' to go to next step.")   
                Dom.setBlinkArrow(true, 790, 408).play()
                setIsProcessRunning(false)
                Quiz.loadQuiz()
              }
            })
            break
      }
      timberBeamCount++
    }

    function drillMachineAnime(){
      switch(drillMachineCount){
        case 0:
          anime.timeline({
            easing: "easeInOutQuad",
              targets: Scenes.items.drill_machine.item,
              duration: 3000,
          })
          .add({
            keyframes: [
              {left: 214,top: 130},
              {left: "-=17",duration: 1500},
              {left: "+=17",duration: 1500}
            ],
            complete(){
              Scenes.items._wall_beam1_with_one_hole.set(0,0)
            }
          })
          .add({
            top: 221,
          })
          .add({
            keyframes: [
              {left: 81,top: 221},
              { left: "-=17",duration: 1500,},
              {left: "+=17",duration: 1500,}
            ],
            complete(){
              Scenes.items._wall_beam1_with_holes.set(0,0).zIndex(1)
              // Scenes.items.beam_3d_with_holes1.set(170,73,350) 
            }
          })    
          .add({
            left: 820,
            top: 325,
            duration: 1000,
            complete(){
              setCC("Click on the 'Repeat' to repeat the previous step.")   
              Dom.setBlinkArrow(true, 740,65).play()
            }
          })      
          break

        case 1:
          anime.timeline({
            easing: "easeInOutQuad",
              targets: Scenes.items.drill_machine.item,
              duration: 2000,
          })
          .add({
            keyframes: [
              {left: 371,top: 157},
              {left: "-=15",duration: 1500,},
              {left: "+=15",duration: 1500,}
            ],
            complete(){
              Scenes.items._wall_beam3_with_one_hole.set(0,0)        
            }
          })
          .add({
            top: 247,
          })
          .add({
            keyframes: [
              {left: 236},
              { left: "-=17",duration: 1500,},
              {left: "+=17",duration: 1500,}
            ],
            complete(){
              Scenes.items._wall_beam3_with_holes.set(0,0).zIndex(1)
            }
          })    
          .add({
            left: 820,
            top: 325,
        
            
          })     
          break

          case 2:
            anime.timeline({
              easing: "easeInOutQuad",
                targets: Scenes.items.drill_machine.item,
                duration: 2000,
            })
            .add({
              keyframes: [
                {left: 543,top: 181},
                {left: "-=15",duration: 1500,},
                {left: "+=15",duration: 1500,}
              ],
              complete(){
                Scenes.items._wall_beam5_with_one_hole.set(0,0)        
              }
            })
            .add({
              top: 272,
            })
            .add({
              keyframes: [
                {left: 407},
                {left: "-=17",duration: 1500,},
                {left: "+=17",duration: 1500,}
              ],
              complete(){
                Scenes.items._wall_beam5_with_holes.set(0,0).zIndex(1)
              }
            })    
            .add({
              left: 820,
              top: 325,
          
              
            })     
            break
      }                
      drillMachineCount++                                     
    }

    function repeatBeamDrill(){
      timberBeamAnime()
      if(timberBeamCount == 3 || timberBeamCount == 5)
      anime({
        duration: 2000,
        complete(){
          drillMachineAnime()
        }
      })
    }
    
    setCC("Click on the 'Beam' to add beam in the lab.")
    Dom.setBlinkArrow(true,740,-35).play()
    //onclick
    contentAdderBtns[0].onclick = timberBeamAnime
    contentAdderBtns[1].onclick = drillMachineAnime
    contentAdderBtns[2].onclick = repeatBeamDrill

    // setCC("Click 'Next' to go to  next step");
    //       Dom.setBlinkArrow(true, 790, 408).play();
    //       setIsProcessRunning(false);
        //   anime({
        //     duration: 1000,
        //     complete(){
        //       Quiz.loadQuiz()
        //     }
        //   });
        // };
      return true
    }),

    (step7 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading(
        "Step 7",
        "Place playwood sheathing on a timberbeam with the help of nailing."
      );

      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      // todo Required Items
      Scenes.items._wall_beam1_with_holes.set( 0 , 0).zIndex(0)
      Scenes.items._wall_beam2.set( 0 , 0)
      Scenes.items._wall_beam3_with_holes.set( 0 , 0).zIndex(0)
      Scenes.items._wall_beam4.set( 0 , 0)
      Scenes.items._wall_beam5_with_holes.set( 0 , 0).zIndex(0)
      Scenes.items._wall_beam6.set( 0 , 0)

      Scenes.items._wall_sheathing1.set(-670,-60)
      Scenes.items._wall_sheathing2.set(-600,-60)

      Scenes.items.hammer.set(800,350,45).zIndex(6)

      Scenes.items._wall_nail1.set(400+100,210).zIndex(3)
      Scenes.items._wall_nail2.set(310+100,210).zIndex(3)
      Scenes.items._wall_nail3.set(220+100,210).zIndex(3)
      Scenes.items._wall_nail4.set(130+100,210).zIndex(3)
      Scenes.items._wall_nail5.set( 35+100,210).zIndex(3)
      Scenes.items._wall_nail6.set(-55+100,210).zIndex(3)
      
      Scenes.items._wall_nail7.set(400+300,115).zIndex(3)
      Scenes.items._wall_nail8.set(310+300,115).zIndex(3)
      Scenes.items._wall_nail9.set(220+300,115).zIndex(3)
      Scenes.items._wall_nail10.set(130+300,115).zIndex(3)
      Scenes.items._wall_nail11.set(35+300,115).zIndex(3)
      Scenes.items._wall_nail12.set(-55+300,115).zIndex(3)

      let hammerAnime  =  anime({
        targets: Scenes.items.hammer.item,
        keyframes: [
          {rotateZ: [0, 30]},
          {rotateZ: [0, 30]},
          {rotateZ: [0, 30]},
          {rotateZ: [0, 30]},
        ],
        autoplay: false,
        duration: 3000,
      })

    // image Box
    // Scenes.items.imageBox.show("flex").set(750,200)
    // Scenes.items.imageBoxSrc.item.src = "./src/images/real_head_adapter.png"
    // Scenes.items.imageBoxTitle.setContent("Head Adapter")

    //! remove
   
    
    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
    Scenes.contentAdderAddBtn("Sheathing")
    Scenes.contentAdderAddBtn("Nailing")
    let contentAdderBtns = getAll(".content-adder-box .btn");
    
     const sheathingAnime = ()=>{
        Dom.setBlinkArrow(-1)
            anime.timeline({
              easing: "easeInOutQuad",
              
            })
            .add({
              targets: [Scenes.items._wall_sheathing1.item],
              duration: 6000,
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: [Scenes.items._wall_sheathing2.item],
              duration: 6000,
              keyframes: [
                {left: 0},
                {top: 0},
              ],
              complete(){
                Scenes.items._wall_wall_without_rotate_layer.set(0,0).zIndex(3)
                Dom.setBlinkArrow(true, 710,15).play();
                setCC("Click on the 'Nailing' to nail on the sheathing.");
              }
            })
          }

      const nailingAnime = ()=>{
        Dom.setBlinkArrow(-1)
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            // ! First nailing anime
            .add({
              targets: Scenes.items._wall_nail1.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 215,
              top: 70,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail1.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! Second nailing animation
            .add({
              targets: Scenes.items._wall_nail2.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 294,
              top: 80,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail2.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! Third nailing animation
            .add({
              targets: Scenes.items._wall_nail3.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 372,
              top: 95,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail3.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! 4 nailing animation
            .add({
              targets: Scenes.items._wall_nail4.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 450,
              top: 106,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail4.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! 5 nailing animation
            .add({
              targets: Scenes.items._wall_nail5.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 533,
              top: 118,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail5.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! 6 nailing animation
            .add({
              targets: Scenes.items._wall_nail6.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 610,
              top: 130,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail6.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! 7 nailing animation
            .add({
              targets: Scenes.items._wall_nail7.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 73,
              top: 160,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail7.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! 8 nailing animation
            .add({
              targets: Scenes.items._wall_nail8.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 151,
              top: 167,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail8.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! 9 nailing animation
            .add({
              targets: Scenes.items._wall_nail9.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 229,
              top: 180,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail9.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! 10 nailing animation
            .add({
              targets: Scenes.items._wall_nail10.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 307,
              top: 190,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail10.item, Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! 11 nailing animation
            .add({
              targets: Scenes.items._wall_nail11.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 390,
              top: 200,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail11.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! 12  nailing animation
            .add({
              targets: Scenes.items._wall_nail12.item,
              keyframes:[
                {top: 0},
                {left: 0},
              ],
            })
            .add({
              targets: Scenes.items.hammer.item,
              left: 468,
              top: 215,
            })
            .add({
              begin(){
                hammerAnime.play()
              },
              targets: [Scenes.items._wall_nail12.item,Scenes.items.hammer.item],
              top: ["+=0","+=9","+=9"],
              duration: 3000
            })
            // ! nailing completed ---xxx---
            .add({
              targets: Scenes.items.hammer.item,
              left: 800,
              top: 350,
              rotate: 0,
              complete(){
                Dom.setBlinkArrow(true, 790, 408).play();
                setCC("Click 'Next' to go to next step");
                setIsProcessRunning(false);
                Quiz.loadQuiz()
              }
            })
      }

      Dom.setBlinkArrow(true, 710, -35).play();
      setCC("Click on the 'Sheathing' to put it on the beam.");
      // onclick
      contentAdderBtns[0].onclick = sheathingAnime;
      contentAdderBtns[1].onclick = nailingAnime;
      return true;
    }),
    (step8 = function () {
      Dom.hideAll(); 
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "Step 8",
        "Join the steel waler with timber beam using flenge claw assembly."
      );

    // required items
    
    let tup = -70
    // Scenes.items._wall_flange_claw1.set(700,250).zIndex(1)
    Scenes.items._wall_flange_claw1.set(416,250 +  tup).zIndex(1)
    Scenes.items._wall_flange_claw2.set(350,227 + tup).zIndex(1)
    Scenes.items._wall_flange_claw3.set(250,203 + tup).zIndex(1)
    Scenes.items._wall_flange_claw4.set(520,230 + tup).zIndex(1)
    Scenes.items._wall_flange_claw5.set(450,205 + tup).zIndex(1)
    Scenes.items._wall_flange_claw6.set(350,180 + tup).zIndex(1)
    

    // Scenes.items.flange_claw1.set(569,280,50,60).rotate(0).zIndex(4)
    // Scenes.items.flange_claw2.set(630,280,50,60).rotate(0).zIndex(4)
    // Scenes.items.flange_claw3.set(599,330,50,60).rotate(0).zIndex(4)
    // Scenes.items.flange_claw4.set(660,330,50,60).rotate(0).zIndex(4)
    Scenes.items.steel_waler_blue1.set(20,300,30,435).zIndex(5)
    Scenes.items.steel_waler_blue2.set(20,340,30,435).zIndex(5)

 

    // Scenes.items.flange_claw1.set(611,352,50)
    // Scenes.items.flange_claw2.set(622,270,50)
    // Scenes.items.flange_claw3.set(555,352,50)
    // Scenes.items.flange_claw4.set(562,270,50)

    // ! before rotation

    // Scenes.items._wall_wall_without_rotate.set(5,-120)
    // Scenes.items._wall_wall_with_rotate.set(0,70)
    Scenes.items._wall_wall_with_rotate.set(0,0+tup)
    // Scenes.items.arrowRound.set(620,120,70).rotate(75)

  
    Scenes.items.tempTitle1.set(10,170).setContent("Before Rotation").rotate(7).hide()
    
    // ! after rotation
    Scenes.items.tempTitle2.set(10,360).setContent("After Rotation").rotate(7).hide()
    
    // Scenes.items.steel_waler1.set()
    // Scenes.items.steel_waler2.set()

    

    //! final pos
    
    // Scenes.items._wall_flange_claw1.set(0,0+tup).zIndex(1)
    // Scenes.items._wall_flange_claw2.set(0,0+tup).zIndex(1)
    // Scenes.items._wall_flange_claw3.set(0,0+tup).zIndex(1)
    // Scenes.items._wall_flange_claw4.set(-20,5+tup).zIndex(1)
    // Scenes.items._wall_flange_claw5.set(-20,5+tup).zIndex(1)
    // Scenes.items._wall_flange_claw6.set(-20,5+tup).zIndex(1)
    
    // Scenes.items._wall_steel_waler1.set(0,0+tup).zIndex(1)
    // Scenes.items._wall_steel_waler2.set(0,4+tup).zIndex(1)
    
    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push()

    Scenes.contentAdderAddBtn("Steel Waler")
    Scenes.contentAdderAddBtn("Flange Claw")
    let contentAdderBtns = getAll(".content-adder-box .btn")
      
    const beforeAfterRotationAnime = ()=>{
      anime.timeline({
        easing: "easeInOutQuad",
        duration: 1000,
      })
      .add({
        complete(){
          Scenes.items.arrowRound.set(620,120,70).rotate(75)
        }
      })
      .add({
        complete(){
          Scenes.items._wall_wall_with_rotate.set(0,70)
        }
      })
      .add({
        complete(){
          Scenes.items.tempTitle1.show()
          Scenes.items.tempTitle2.show()      
        }
      })
      .add({
        duration: 4000,
        complete(){
          Scenes.items.arrowRound.hide()
          Scenes.items.tempTitle1.hide()
          Scenes.items.tempTitle2.hide()
          
          Scenes.items._wall_wall_without_rotate.hide()

        }
      })
      .add({
        targets: Scenes.items._wall_wall_with_rotate.item,
        top: 0,
        duration: 1000,
        complete(){
          Dom.setBlinkArrow(true,718,-35).play()
          setCC("Click on the 'Steel Waler' to put it on the beam.")
        }
      })
    }
    
    let steelWalerCount = 0
    const steelWalerAnime = ()=>{
    switch(steelWalerCount){
      case 0:
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.steel_waler_blue1.item,
          left: 144,
          top: 22,
          complete(){
            Scenes.items.steel_waler_blue1.hide()
            // tilt position of stel waler
            Scenes.items._wall_steel_waler1.set(0,0+tup).zIndex(1)

            Dom.setBlinkArrow(true,710,15).play()
            setCC("Click on the 'Flange Claw' to attach it with steel waler.")
          }
        })
        break
      
      case 1:
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.steel_waler_blue2.item,
          left: 40,
          top: 113,
          complete(){
            Scenes.items.steel_waler_blue2.hide()
            // tilt position of steel waler
            Scenes.items._wall_steel_waler2.set(0,4+tup).zIndex(1)
            Dom.setBlinkArrow(true,710,15).play()
            setCC("Click on the 'Flange Claw' to attach it with steel waler.")
          }
        })
        break
    }
    steelWalerCount++
    }

    let flangeClawCount = 0
    const flangeClawAnime = ()=>{
      switch(flangeClawCount){
        case 0:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 2000
          })
          .add({
            targets: Scenes.items._wall_flange_claw1.item,
            left: 0,
            top: tup,
          })
          .add({
            targets: Scenes.items._wall_flange_claw2.item,
            left: 0,
            top: tup,
          })
          .add({
            targets: Scenes.items._wall_flange_claw3.item,
            left: 0,
            top: tup,
            complete(){
              Dom.setBlinkArrow(true,710,-35).play()
              setCC("Click on the 'Steel Waler' to put it on the beam.")
            }
          })
          break

          case 1:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000
            })
            .add({
              targets: Scenes.items._wall_flange_claw4.item,
              left: -20,
              top: 5+tup,
            })
            .add({
              targets: Scenes.items._wall_flange_claw5.item,
              left: -20,
              top: 5+tup,
            })
            .add({
              targets: Scenes.items._wall_flange_claw6.item,
              left: -20,
              top: 5+tup,
              complete(){
                Dom.setBlinkArrow(true, 790, 408).play();
                setCC("Click 'Next' to go to next step");
                setIsProcessRunning(false);
                // Quiz.loadQuiz()
              }
            })
            break
      }
      flangeClawCount++;
    }

     //! starter animes
    //  beforeAfterRotationAnime()
     
    Dom.setBlinkArrow(true,710,-35).play()
     setCC("Click on the 'Steel Waler' to put it on the beam.")
     //onclick pipe waler 
     contentAdderBtns[0].onclick = steelWalerAnime;
     contentAdderBtns[1].onclick = flangeClawAnime;

     return true;

    }),
    (step9 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 9",
        "Lift the one side of wall and attach CT prop."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      //! Required Items
      // Scenes.items._wall_wall_with_steel_waler_and_flange_claw.set(200,-150,800).hide()
      Scenes.items._wall_wall_with_steel_waler_and_flange_claw.set(200,-150,800).hide()
      Scenes.items._wall_wall_with_steel_waler_down.set(0,80,300)
      Scenes.items.arrowRound.set(380 ,60,80).rotate(-20).hide()
      Scenes.items.tempTitle1.set(529, 86).rotate(-45).setContent("After Lifting").hide()

      Scenes.items.head_adapter1.set(500, 230, 25).zIndex(10).hide() 
      Scenes.items.head_adapter2.set(540, 230, 25).zIndex(10).hide()
      Scenes.items.head_adapter3.set(500, 270, 25).zIndex(10).hide()
      Scenes.items.head_adapter4.set(540, 270, 25).zIndex(10).hide()
      
      Scenes.items.ct_prop1     .set(755,130,220,40).rotate(-90).zIndex(11).hide()
      Scenes.items.ct_prop2     .set(755,190,150,40).rotate(-90).zIndex(11).hide()
      Scenes.items.ct_prop3     .set(755,200,220,40).rotate(-90).zIndex(11).hide()
      Scenes.items.ct_prop4     .set(755,260,150,40).rotate(-90).zIndex(11).hide()

      Scenes.items.foot_adapter1.set(480-15, 310, 75).zIndex(12).hide()
      Scenes.items.foot_adapter2.set(540-15, 310, 75).zIndex(12).hide()
        
     
      
      
      // !final pos
      // Scenes.items.head_adapter1.set(205,154,25).rotate(50).zIndex(10) 
      // Scenes.items.head_adapter2.set(206,240,25).rotate(50).zIndex(10)
      // Scenes.items.ct_prop1     .set(265,130,220,40).rotate(-40).zIndex(11)
      // Scenes.items.ct_prop2     .set(265,215,150,40).rotate(-65).zIndex(11)
      // Scenes.items.foot_adapter1.set(310, 260, 75).zIndex(12)

      // Scenes.items.head_adapter3.set(205+80, 154-90 ,25).rotate(50).zIndex(10)
      // Scenes.items.head_adapter4.set(206+80, 240-90 ,25).rotate(50).zIndex(10)
      // Scenes.items.ct_prop3     .set(265+80, 130-90 ,220,40).rotate(-40).zIndex(11)
      // Scenes.items.ct_prop4     .set(265+80, 215-90 ,150,40).rotate(-65).zIndex(11)
      // Scenes.items.foot_adapter2.set(310+80, 260-90 , 75).zIndex(12)
     
      // content adder         
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("Head Adapter");
      Scenes.contentAdderAddBtn("Foot Adapter");
      Scenes.contentAdderAddBtn("CT Prop");

      let contentAdderBtns = getAll(".content-adder-box .btn");

      const beforeAfterAnime = ()=>{
      
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 1000,
        })
        .add({
          complete(){
            Scenes.items.arrowRound.show()
          }
        })
        .add({
          complete(){
            Scenes.items._wall_wall_with_steel_waler_and_flange_claw.show()
          }
        })
        .add({
          complete(){
            Scenes.items.tempTitle1.show()      
          }
        })
        .add({
          duration: 4000,
          complete(){
            Scenes.items.arrowRound.hide()
            Scenes.items.tempTitle1.hide()
          }
        })
        .add({
          complete(){
            Scenes.items._wall_wall_with_steel_waler_down.hide()
          }
        })
        .add({
          targets: Scenes.items._wall_wall_with_steel_waler_and_flange_claw.item,
          left: -200,
          complete(){
            setCC("Click on the 'Head Adapter' to connect it with steel waler.")
            Dom.setBlinkArrow(true,700,-35).play()

            Scenes.items.head_adapter1.show() 
            Scenes.items.head_adapter2.show()
            Scenes.items.head_adapter3.show()
            Scenes.items.head_adapter4.show()
            
            Scenes.items.ct_prop1.show()
            Scenes.items.ct_prop2.show()
            Scenes.items.ct_prop3.show()
            Scenes.items.ct_prop4.show()
      
            Scenes.items.foot_adapter1.show()
            Scenes.items.foot_adapter2.show()
          }
        })  
      }

      let headAdapterCount = 0
      const headAdapterAnime = ()=>{
            switch(headAdapterCount){
              case 0:
                anime.timeline({
                  easing: "easeInOutQuad",
                  duration: 1000,
              })
              .add({
                targets: Scenes.items.head_adapter1.item,
                left:205,
                top:154,
                rotate: 50
              })
              .add({
                targets: Scenes.items.head_adapter2.item,
                left:206,
                top:240,
                rotate: 50,
                complete(){
                  setCC("Click on the 'Foot Adapter' to support the CT Prop.")
                  Dom.setBlinkArrow(true,700,15).play()
                }
              })
              break

              case 1:
                anime.timeline({
                  easing: "easeInOutQuad",
                  duration: 1000,
              })
              .add({
                targets: Scenes.items.head_adapter3.item,
                left:205+80,
                top:154-90,
                rotate: 50
              })
              .add({
                targets: Scenes.items.head_adapter4.item,
                left:205+80,
                top:240-90,
                rotate: 50,
                complete(){
                  setCC("Click on the 'Foot Adapter' to support the CT Prop.")
                  Dom.setBlinkArrow(true,700,15).play()
                }
              })
              break 
            }
            headAdapterCount++
    }
    
      let footAdapterCount = 0
      const footAdapterAnime = ()=>{
            switch(footAdapterCount){
              case 0:
                anime({
                  easing: "easeInOutQuad",
                  targets: Scenes.items.foot_adapter1.item,
                  left:310,
                  top:260,
                  duration: 1000,
                  complete(){
                    setCC("Click on the 'CT Prop' to support the form floor panel.")
                    Dom.setBlinkArrow(true,700,65).play()
                  }
                })
                break
                
                case 1:
                  anime({
                    easing: "easeInOutQuad",
                    targets: Scenes.items.foot_adapter2.item,
                    left:310+80,
                    top:260-90,
                    duration: 1000,
                    complete(){
                      setCC("Click on the 'CT Prop' to support the form floor panel.")
                      Dom.setBlinkArrow(true,700,65).play()
                    }
                  })
                  break
            }
            footAdapterCount++
      }
  
      let ctPropCount = 0
      const ctPropAnime = ()=>{
           switch(ctPropCount){
            case 0:
              anime.timeline({
                easing: "easeInOutQuad",
                duration: 1000,
            })
            .add({
              targets: Scenes.items.ct_prop1.item,
              left:265, 
              top:130,
              rotate: -40
            })
            .add({
              targets: Scenes.items.ct_prop2.item,
              left:265, 
              top:215,
              rotate: -65,
              complete(){
                setCC("Click on the 'Head Adapter' to connect it with steel waler.")
                Dom.setBlinkArrow(true,700,-35).play()
              }
            })
            break

            case 1:
              anime.timeline({
                easing: "easeInOutQuad",
                duration: 1000,
            })
            .add({
              targets: Scenes.items.ct_prop3.item,
              left:265+80, 
              top:130-90,
              rotate: -40
            })
            .add({
              targets: Scenes.items.ct_prop4.item,
              left:265+80, 
              top:215-90,
              rotate: -65,
              complete(){
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 408).play();
                setIsProcessRunning(false);
                // Quiz.loadQuiz()
              }
            })
            break
           }

           ctPropCount++
      }


    // !starter animes
    beforeAfterAnime()
    
    
    //onclick
    contentAdderBtns[0].onclick = headAdapterAnime
    contentAdderBtns[1].onclick = footAdapterAnime
    contentAdderBtns[2].onclick = ctPropAnime

    // setCC("Click 'Next' to go to next step");
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setIsProcessRunning(false);
        //   anime({
        //     duration: 1000,
        //     complete(){
        //       Quiz.loadQuiz()
        //     }
        //   });
        // };
      return true;
    }),
    (step10 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 10",
        "Repeat step 2 to step 9 to build remaining three sides of the wall."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      //! Required Items
      Scenes.items._wall_wall_front_side.set(170-120,-30-50,700).zIndex(3)

      // Scenes.items._wall_wall_left_side .set(-255,-30+45 ,470).zIndex(4)
      // Scenes.items._wall_wall_back_side .set(170-100,-30-50,600).zIndex(2)
      // Scenes.items._wall_wall_right_side.set(170-65 ,-30-10,400).zIndex(1)
        
     
      
      
      // !final pos
       // Scenes.items._wall_wall_left_side .set(170-255,-30+45 ,470).zIndex(4).hide()
      // Scenes.items._wall_wall_back_side .set(170-100,-30-50,600).zIndex(2)
      // Scenes.items._wall_wall_right_side.set(170-65 ,-30-10,400).zIndex(1).hide()
     
      // content adder         
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("Left Side");
      Scenes.contentAdderAddBtn("Back Side");
      Scenes.contentAdderAddBtn("Right Side");

      let contentAdderBtns = getAll(".content-adder-box .btn");


      const leftSideAnime = ()=>{
        // ! solution 
              Scenes.items._wall_wall_left_side .set(-255,-30+45 ,470).zIndex(4)

                anime.timeline({
                  easing: "easeInOutQuad",
                  duration: 2000,
              })
              .add({
                targets: Scenes.items._wall_wall_left_side.item,
                left:170-255,
                complete(){
                  setCC("Click on the 'Back Side' to add back side of the wall.")
                  Dom.setBlinkArrow(true,720,15).play()
                }
              })
              
    }

    const backSideAnime = ()=>{
      // ! solution 
            Scenes.items._wall_wall_back_side .set(-100,-30-50,600).zIndex(2)

              anime.timeline({
                easing: "easeInOutQuad",
                duration: 2000,
            })
            .add({
              targets: Scenes.items._wall_wall_back_side.item,
              left:170-100,
              complete(){
                setCC("Click on the 'Right Side' to add right side of the wall.")
                Dom.setBlinkArrow(true,720,65).play()
              }
            })
            
  }
    const rightSideAnime = ()=>{
      // ! solution 
            Scenes.items._wall_wall_right_side .set(400 ,-30-10,400).zIndex(1)

              anime.timeline({
                easing: "easeInOutQuad",
                duration: 2000,
            })
            .add({
              targets: Scenes.items._wall_wall_right_side.item,
              left:170-65,
              complete(){
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 408).play();
                setIsProcessRunning(false);
              }
            })
            
  }

    setCC("Click on the 'Left Side' to add left side of the wall.")
    Dom.setBlinkArrow(true,720,-35).play()
    //onclick
    contentAdderBtns[0].onclick = leftSideAnime
    contentAdderBtns[1].onclick = backSideAnime
    contentAdderBtns[2].onclick = rightSideAnime

    // setCC("Click 'Next' to go to next step");
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setIsProcessRunning(false);
        //   anime({
        //     duration: 1000,
        //     complete(){
        //       Quiz.loadQuiz()
        //     }
        //   });
        // };
      return true;
    }),
    // (step11 = function () {
    //   setIsProcessRunning(true);
    //   Scenes.setStepHeading(
    //     "Step 11",
    //     "Attach tie rod and wing nut to tighten the wall."
    //   );
    //   // todo remove all previous
    //   Scenes.items.contentAdderBox.setContent("");

    //   // todo Required Items
    //   Scenes.items.column_sides_all.set(0,0)
    //  Scenes.items.tie_rod1.set(763,270,150,50).rotate(90).zIndex(2)
    //  Scenes.items.wing_nut_top1.set(766,365,14).zIndex(10)
    //  Scenes.items.wing_nut_top2.set(800,365,14).zIndex(10)

    //   // ! Final Position
    // //  Scenes.items.column_sides_all.set(0,0)
    // // Scenes.items.tie_rod1.set(355,85,150,50).rotate(57).zIndex(2)
    // // Scenes.items.tie_rod2.set(259,130,130,50).rotate(-57).zIndex(2)
    // // Scenes.items.tie_rod3.set(259,210,140,50).rotate(-52).zIndex(2)
    // // Scenes.items.tie_rod4.set(355,245,135,50).rotate(58).zIndex(2)
    
    // // Scenes.items.wing_nut_top1.set(304,187,14).zIndex(10).rotate(-90)
    // // Scenes.items.wing_nut_top2.set(431,106,14).zIndex(10).rotate(60)
    // // Scenes.items.wing_nut_top3.set(216,160,14).zIndex(10).rotate(-70)
    // // Scenes.items.wing_nut_top4.set(327,228,14).zIndex(10).rotate(100)
    // // Scenes.items.wing_nut_top5.set(216,239,14).zIndex(10).rotate(-70)
    // // Scenes.items.wing_nut_top6.set(327,320,14).zIndex(10).rotate(100)
    // // Scenes.items.wing_nut_top7.set(307,335,14).zIndex(10).rotate(-100)
    // // Scenes.items.wing_nut_top8.set(429,264,14).zIndex(10).rotate(60)
     
    // // content adder
    // Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
    // Scenes.contentAdderAddBtn("Tie Rod");
    // Scenes.contentAdderAddBtn("Wing Nut");
    // Scenes.contentAdderAddBtn("Repeat");
    // let contentAdderBtns = getAll(".content-adder-box .btn");

    // let tieRodCount = 0
    // const tieRodAnime = ()=>{
    //   switch(tieRodCount){
    //     case 0:
    //       anime({
    //         easing: "easeInOutQuad",
    //         targets: Scenes.items.tie_rod1.item,
    //         left: 355, 
    //         top: 85,
    //         rotate: 57,
    //         complete(){
    //           setCC("Click on the 'Wing Nut' to tighten the tie rod.")
    //           Dom.setBlinkArrow(true,725,15).play()
    //         }
    //       })          
    //       break

    //       case 1:
    //         anime({
    //           easing: "easeInOutQuad",
    //           targets: Scenes.items.tie_rod2.item,
    //           left: 259, 
    //           top: 130,
    //           rotate: -57,
    //         })
    //         break
          
    //         case 2:
    //         anime({
    //           easing: "easeInOutQuad",
    //           targets: Scenes.items.tie_rod3.item,
    //           left: 259, 
    //           top: 210,
    //           rotate: -52,
    //         })
    //         break
            
    //         case 3:
    //         anime({
    //           easing: "easeInOutQuad",
    //           targets: Scenes.items.tie_rod4.item,
    //           left: 355, 
    //           top: 245,
    //           rotate: 58,
    //         })
    //         break
    //   }
    //   tieRodCount++;
    // }
    
    // let wingNutCount = 0
    // const wingNutAnime = ()=>{
    //   switch(wingNutCount){
    //     case 0:
    //       anime.timeline({
    //         easing: "easeOutQuad",
    //         duration: 3000,
    //       })
    //       .add({
    //         targets: Scenes.items.wing_nut_top1.item,
    //         left: 304,
    //         top: 187,
    //         rotate: -90,
    //       })
    //       .add({
    //         targets: Scenes.items.wing_nut_top2.item,
    //         left: 431,
    //         top: 106,
    //         rotate: 60,
    //         complete(){
    //           setCC("Click on the 'Repeat' the above steps.")
    //           Dom.setBlinkArrow(true,725,65).play()

    //           Scenes.items.tie_rod2.set(763,270,130,50).rotate(90).zIndex(2)
    //           Scenes.items.wing_nut_top3.set(766,365,14).zIndex(10)
    //           Scenes.items.wing_nut_top4.set(800,365,14).zIndex(10)
    //         }
    //       })
    //       break

    //       case 1:
    //         anime.timeline({
    //           easing: "easeOutQuad",
    //           duration: 3000,
    //         })
    //         .add({
    //           targets: Scenes.items.wing_nut_top3.item,
    //           left: 216,
    //           top: 160,
    //           rotate: -70,
    //         })
    //         .add({
    //           targets: Scenes.items.wing_nut_top4.item,
    //           left: 327,
    //           top: 228,
    //           rotate: 100,
    //           complete(){
    //             Scenes.items.tie_rod3.set(763,270,140,50).rotate(90).zIndex(2)
    //             Scenes.items.wing_nut_top5.set(766,365,14).zIndex(10)
    //             Scenes.items.wing_nut_top6.set(800,365,14).zIndex(10)
    //           }
    //         })
    //         break
            
    //       case 2:
    //         anime.timeline({
    //           easing: "easeOutQuad",
    //           duration: 3000,
    //         })
    //         .add({
    //           targets: Scenes.items.wing_nut_top5.item,
    //           left: 216,
    //           top: 239,
    //           rotate: -70,
    //         })
    //         .add({
    //           targets: Scenes.items.wing_nut_top6.item,
    //           left: 327,
    //           top: 320,
    //           rotate: 100,
    //           complete(){
    //             Scenes.items.tie_rod4.set(763,270,135,50).rotate(90).zIndex(2)
    //             Scenes.items.wing_nut_top7.set(766,365,14).zIndex(10)
    //             Scenes.items.wing_nut_top8.set(800,365,14).zIndex(10)
    //           }
    //         })
    //         break

    //         case 3:
    //           anime.timeline({
    //             easing: "easeOutQuad",
    //             duration: 3000,
    //           })
    //           .add({
    //             targets: Scenes.items.wing_nut_top7.item,
    //             left: 307,
    //             top: 335,
    //             rotate: -100,
    //           })
    //           .add({
    //             targets: Scenes.items.wing_nut_top8.item,
    //             left: 429,
    //             top: 264,
    //             rotate: 60,
    //             complete(){
    //               setCC("Click 'Next' to go to next step");
    //               Dom.setBlinkArrow(true, 790, 408).play();
    //               setIsProcessRunning(false);
    //             }
    //           })
    //           break
    //   }
    //   wingNutCount++

    // }

    // const repeatAnime = ()=>{
    //   anime.timeline({
    //     duration: 1000,
    //   })
    //   .add({
    //     complete(){
    //       tieRodAnime()
    //     }
    //   })
    //   .add({
    //     complete(){
    //       wingNutAnime()
    //     }
    //   })
    // }

    // Dom.setBlinkArrow(true,725,-35).play()
    // setCC("Click on the 'Tie Rod' to attach it with steel waler.")
    // //onclick
    // contentAdderBtns[0].onclick = tieRodAnime
    // contentAdderBtns[1].onclick = wingNutAnime
    // contentAdderBtns[2].onclick = repeatAnime

    // // setCC("Click 'Next' to go to next step");
    // //       Dom.setBlinkArrow(true, 790, 408).play();
    // //       setIsProcessRunning(false);
    //     //   anime({
    //     //     duration: 1000,
    //     //     complete(){
    //     //       Quiz.loadQuiz()
    //     //     }
    //     //   });
    //     // };
    //   return true;
    // }),


    (completed = function () {
      Dom.hideAll();
      Scenes.items.contentAdderBox.setContent("");

      // get(".btn-save").style.display = "block";
      Scenes.items.btn_save.show().push();
      Dom.setBlinkArrow(-1);
      setCC("Download it and share with your friends.");
      // certificate name
      let certificateStuName = get("#certificateStuName");
      certificateStuName.innerHTML = student_name;
      // get("#quizScore").innerHTML = Quiz.score;
      get("#certificateDate").innerHTML = currentDateGlobal;
      Scenes.items.certificate.show("flex").push();

      // * restart btn

      let nxtBtn = get(".btn-next");
      nxtBtn.innerHTML = "Restart";
      nxtBtn.onclick = function () {
        location.reload();
      }

      return true;
    }),
  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

// Scenes.steps[2]() 
// Scenes.currentStep = 12
Scenes.next()  
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next");

const backBtn = get(".btn-back");
nextBtn.addEventListener("click", () => {
  Scenes.next();
});
backBtn.addEventListener("click", () => {
  Scenes.back();
});

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
function getCursor(event) {
  let x = event.clientX;
  let y = event.clientY;
  let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

  const infoElement = document.getElementById("info");
  infoElement.innerHTML = _position;
  infoElement.style.top = y + "px";
  infoElement.style.left = x + 20 + "px";
}