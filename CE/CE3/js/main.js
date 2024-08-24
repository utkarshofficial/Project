// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
 ;

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
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}
const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }
  // the step is ended
  if(!value){
    // reset showArrowMenuItemNumber 
    Scenes.menuItemNumber = 1
    setCC("Click 'Next' to go to next step");
    get(".blinkArrow").classList.add("bright");
    Dom.setBlinkArrow(true, 790, 415).play();
    Scenes.activeAllMenuItems()
  }
  isRunning = value;
  if(value){
    Dom.hideAll()
    get(".blinkArrow").classList.remove("bright");
    window.speechSynthesis.cancel();
    if(ccQueue)
      ccQueue = []
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
       ;
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
    form_floor_corner1: new Dom("form_floor_corner1"),
    form_floor_corner2: new Dom("form_floor_corner2"),
    ct_prop1: new Dom("ct_prop1"),
    ct_prop2: new Dom("ct_prop2"),
    ct_prop3: new Dom("ct_prop3"),
    ct_prop4: new Dom("ct_prop4"),
    ct_prop5: new Dom("ct_prop5"),
    ct_prop6: new Dom("ct_prop6"),
    ct_prop7: new Dom("ct_prop7"),
    ct_prop8: new Dom("ct_prop8"),
    foot_adapter1: new Dom("foot_adapter1"),
    foot_adapter2: new Dom("foot_adapter2"),
    foot_adapter3: new Dom("foot_adapter3"),
    foot_adapter4: new Dom("foot_adapter4"),
    panel1: new Dom("panel1"),
    panel2: new Dom("panel2"),
    panel3: new Dom("panel3"),
    pipe_waler_cutout1: new Dom("pipe_waler_cutout1"),
    pipe_waler_cutout2: new Dom("pipe_waler_cutout2"),
    plywood: new Dom("plywood"),
    steel_waler_connector1: new Dom("steel_waler_connector1"),
    steel_waler_connector2: new Dom("steel_waler_connector2"),
    steel_waler_connector3: new Dom("steel_waler_connector3"),
    steel_waler_connector4: new Dom("steel_waler_connector4"),
    steel_waler_connector5: new Dom("steel_waler_connector5"),
    steel_waler_connector6: new Dom("steel_waler_connector6"),
    steel_waler_connector7: new Dom("steel_waler_connector7"),
    steel_waler_connector8: new Dom("steel_waler_connector8"),
    steel_waler1: new Dom("steel_waler1"),
    steel_waler2: new Dom("steel_waler2"),
    steel_waler3: new Dom("steel_waler3"),
    steel_waler4: new Dom("steel_waler4"),
    steel_waler_other: new Dom("steel_waler_other"),
    pipe_waler_connector1: new Dom("pipe_waler_connector1"),
    pipe_waler_connector2: new Dom("pipe_waler_connector2"),
    pipe_waler_connector3: new Dom("pipe_waler_connector3"),
    pipe_waler_connector4: new Dom("pipe_waler_connector4"),
    pipe_waler_connector5: new Dom("pipe_waler_connector5"),
    pipe_waler_connector6: new Dom("pipe_waler_connector6"),
    pipe_waler_connector7: new Dom("pipe_waler_connector7"),
    pipe_waler_connector8: new Dom("pipe_waler_connector8"),
    waler_clip1: new Dom("waler_clip1"),
    waler_clip2: new Dom("waler_clip2"),
    waler_clip3: new Dom("waler_clip3"),
    waler_clip4: new Dom("waler_clip4"),
    waler_clip5: new Dom("waler_clip5"),
    waler_clip6: new Dom("waler_clip6"),
    waler_clip7: new Dom("waler_clip7"),
    waler_clip8: new Dom("waler_clip8"),
    waler_clip9: new Dom("waler_clip9"),
    waler_clip10: new Dom("waler_clip10"),
    waler_clip11: new Dom("waler_clip11"),
    waler_clip12: new Dom("waler_clip12"),
    waler_clip13: new Dom("waler_clip13"),
    waler_clip14: new Dom("waler_clip14"),
    waler_clip15: new Dom("waler_clip15"),
    waler_clip16: new Dom("waler_clip16"),
    anchor_plate1: new Dom("anchor_plate1"),
    anchor_plate2: new Dom("anchor_plate2"),
    anchor_plate3: new Dom("anchor_plate3"),
    anchor_plate4: new Dom("anchor_plate4"),
    anchor_plate5: new Dom("anchor_plate5"),
    anchor_plate6: new Dom("anchor_plate6"),
    anchor_plate7: new Dom("anchor_plate7"),
    anchor_plate8: new Dom("anchor_plate8"),
    wing_nut1: new Dom("wing_nut1"),
    wing_nut2: new Dom("wing_nut2"),
    wing_nut3: new Dom("wing_nut3"),
    wing_nut4: new Dom("wing_nut4"),
    wing_nut5: new Dom("wing_nut5"),
    wing_nut6: new Dom("wing_nut6"),
    wing_nut7: new Dom("wing_nut7"),
    wing_nut8: new Dom("wing_nut8"),
    head_adapter1: new Dom("head_adapter1"),
    head_adapter2: new Dom("head_adapter2"),
    head_adapter3: new Dom("head_adapter3"),
    head_adapter4: new Dom("head_adapter4"),
    head_adapter5: new Dom("head_adapter5"),
    head_adapter6: new Dom("head_adapter6"),
    foot_adapter1: new Dom("foot_adapter1"),
    foot_adapter2: new Dom("foot_adapter2"),
    foot_adapter3: new Dom("foot_adapter3"),
    full_foundation_front1: new Dom("full_foundation_front1"),
    full_foundation_front2: new Dom("full_foundation_front2"),
    full_foundation_front3: new Dom("full_foundation_front3"),
    full_foundation_front4: new Dom("full_foundation_front4"),
    pipe_waler_clamp_full: new Dom("pipe_waler_clamp_full"),
    wing_nut_full: new Dom("wing_nut_full"),
    real_head_adapter: new Dom("real_head_adapter"),
    real_foot_adapter: new Dom("real_foot_adapter"),
    
    

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
  // ! Show arrow according to menu item number
  menuItemNumber: 1,
  showArrowForMenuItem(){
    this.disableInvalidMenuItemsClick()

    let menuLeftOffset = get("ul").offsetLeft
    let gapArrowWith = 71

    this.leftGap = menuLeftOffset - gapArrowWith

    let initialFixedTop = -35
    let gapTopFixed = 50
    let finalTop = initialFixedTop

    for(let i=1;i< this.menuItemNumber;i++){
      finalTop+=gapTopFixed 
    }

    this.menuItemNumber++
    Dom.setBlinkArrow(true, this.leftGap, finalTop).play()
  },
  // ! to disable menu item clicks
  disableInvalidMenuItemsClick(){
    let allMenuItems = getAll("ul li")
    allMenuItems.forEach(menuItem => {
      menuItem.style.pointerEvents = "none"
    })

    allMenuItems[this.menuItemNumber - 1].style.pointerEvents = ""
  },
  activeAllMenuItems(){
    getAll(".content-adder-box li").forEach(item=>item.style.pointerEvents = "")
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
  experimentNameIntro: "Monolithic Formwork Experiment",
  experimentNameCertificate: "Monolithic Formwork",
  experimentNameSpeech: "Monolithic Formwork",
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // ! set The experiment name
      let welcomeBoxExpName = get(".welcome-box .title span:nth-child(2)")
      welcomeBoxExpName.innerHTML = Scenes.experimentNameIntro

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
        let spaceIndex = student_name.indexOf(" ")
        spaceIndex = spaceIndex == -1 ? student_name.length : spaceIndex + 1 
        let fName = student_name.slice(0, spaceIndex);
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
                `Welcome to ${Scenes.experimentNameSpeech} Experiment of Formwork Technology in Civil Engineering Virtual Lab developed by Professor K N Jha, Department of Civil Engineering, IIT Delhi.`
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
      Scenes.items.projectIntro.show().push();

      Scenes.items.panel1.set(37,159)
      Scenes.items.tempTitle1.set(37,400).setContent("(Form Floor Panel)")
      
      Scenes.items.form_floor_corner1.set(306,159)
      Scenes.items.tempTitle2.set(247,405).setContent("(Form Floor Corner)")
      
      Scenes.items.steel_waler1.set(306,270,40,240).rotate(90)
      Scenes.items.tempTitle3.set(380,150).setContent("(Steel Waler)")
      
      Scenes.items.ct_prop1.set(480,170,240)
      Scenes.items.tempTitle4.set(470,410).setContent("(CT Prop)")
      
      Scenes.items.waler_clip1.set(570,170,50)
      Scenes.items.tempTitle5.set(550,220).setContent("(Waler Clip)")
      
      Scenes.items.steel_waler_connector1.set(690,140,50)
      Scenes.items.tempTitle6.set(649,190).setContent("(Waler Connector)")
      
      Scenes.items.anchor_plate1.set(820,170,50)
      Scenes.items.tempTitle7.set(801,220).setContent("(Anchor Plate)")
      
      Scenes.items.pipe_waler_clamp_full.set(570,260,50)
      Scenes.items.tempTitle8.set(530,320).setContent("(Pipe Waler Clamp)")
      
      Scenes.items.foot_adapter1.set(690,200,80)
      Scenes.items.tempTitle9.set(680,280).setContent("(Foot Adapter)")
      
      Scenes.items.wing_nut_full.set(820,260,50)
      Scenes.items.tempTitle10.set(810,310).setContent("(Wing Nut)")
      
      Scenes.items.pipe_waler_cutout1.set(570,360,20,330)
      Scenes.items.tempTitle11.set(689,380).setContent("(Waler Pipe)")

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
      Dom.setBlinkArrow(-1);

      Scenes.setStepHeading("Step 1", "Marking the area (Diagonally and rectangularly)");
      Scenes.items.land.set(0,0,404,950)

      Scenes.items.chalk_with_hand.set(170,3,80,70).zIndex(6)
      
      Scenes.items.chalk_markings1.set(170,18,6,600).zIndex(5)
      Scenes.items.marking_surface1.set(170,18,8,600).zIndex(5)

      Scenes.items.chalk_markings2.set(600,182,6,334).rotate(90).zIndex(5)
      Scenes.items.marking_surface2.set(600,182,8,334).rotate(90).zIndex(5)

      Scenes.items.chalk_markings3.set(170,350,6,600).zIndex(5)
      Scenes.items.marking_surface3.set(170,350,8,600).zIndex(5)

      Scenes.items.chalk_markings4.set(5,182,6,334).rotate(90).zIndex(4)
      Scenes.items.marking_surface4.set(5,182,8,334).rotate(90).zIndex(4)

      Scenes.items.chalk_markings5.set(130,184,6,680).rotate(29).zIndex(3)
      Scenes.items.marking_surface5.set(130,184,8,680).rotate(29).zIndex(3)

      Scenes.items.chalk_markings6.set(130,185,6,680).rotate(-29).zIndex(2)
      Scenes.items.marking_surface6.set(130,185,8,680).rotate(-29).zIndex(2)

      Scenes.items.tempTitle1.set(788,198).setContent("2400mm").hidden()
      Scenes.items.tempTitle2.set(455,364).setContent("2700mm").hidden()

      setCC("Click on the hand to mark the area rectangularly.")
      Dom.setBlinkArrow(true,90,0).play()
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
          left: 770,
          duration: 3000,
        })
        .add({
          begin(){
            setCC("Marking the vertical length of 2400mm")
          },
          targets: [Scenes.items.chalk_with_hand.item],
          top: 334,
          duration: 3000,
          complete(){
            Scenes.items.tempTitle1.hidden(false)
          }
        },3000)// marking of right vertical surface
        .add({
          targets: [Scenes.items.marking_surface2.item],
          top: 516,
          duration: 3000,
        },3000)
        .add({
          begin(){
            setCC("Marking the horizontal length of 2700mm")
          },
          targets: [Scenes.items.marking_surface3.item],
          left: -430,
          duration: 3000,
          complete(){
            Scenes.items.tempTitle2.hidden(false)
          }
        },6000)
        .add({
          targets: [Scenes.items.chalk_with_hand.item],
          left: 170,
          duration: 3000,
        },6000)
        .add({
          targets: [Scenes.items.chalk_with_hand.item],
          top: 4,
          duration: 3000,
        },9000)// marking of left vertical surface
        .add({
          targets: [Scenes.items.marking_surface4.item],
          top: -152,
          duration: 3000,
        },9000)
        .add({
          targets: [Scenes.items.marking_surface4.item],
          top: -152,
          duration: 3000,
        },9000)
        .add({
          targets: [Scenes.items.chalk_with_hand.item],
          left: 770,
          top: 338,
          duration: 3000,
        },12000)
        .add({
          targets: [Scenes.items.marking_surface5.item],
          translateX: 700,
          duration: 3000,
        },12000)
        .add({
          begin(){
            Scenes.items.chalk_with_hand.set(770,3)
          },
          endDelay: 500,
        })
        .add({
          targets: [Scenes.items.chalk_with_hand.item],
          translateX: -605,
          translateY: 335,
          duration: 3000,
        },15500)
        .add({
          targets: [Scenes.items.marking_surface6.item],
          translateX: -680,
          duration: 3000,
          complete(){
            Dom.setBlinkArrow(true, 790, 408).play()
            // Quiz.loadQuiz()
            setCC("Click 'Next' to go to next step")
            setIsProcessRunning(false)
          }
        },15500)
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
      
      Scenes.setStepHeading("Step 2", "Bring the form floor corner, form floor panel and waler clip in the lab")

      Scenes.items.panel1.set()
            
      Scenes.items.contentAdderBox.set(null,-50).show("flex").push()
      Scenes.contentAdderAddBtn("Waler Clip")
      Scenes.contentAdderAddBtn("Form Floor Panel")
      Scenes.contentAdderAddBtn("Form Floor Corner")

      let contentAdderBtns = getAll(".content-adder-box .btn")

      Scenes.items.form_floor_corner1.set(-50,75)
      Scenes.items.panel1.set(-250,75)
      Scenes.items.waler_clip1.set(-50,252,50)

      function walerClicpAnime(){
        anime({
          targets: Scenes.items.waler_clip1.item,
          left: 556,
          easing: "easeInOutQuad",
          duration: 2000,
          complete(){
            setCC("Click on the 'Form Floor Panel' to add panel in the lab.");      
            Dom.setBlinkArrow(true, 670,15).play();
            
          }
        })
      }

      function formFloorPanelAnime(){
        anime({
          targets: Scenes.items.panel1.item,
          left: 245,
          easing: "easeInOutQuad",
          duration: 2000,
          complete(){
            setCC("Click on the 'Form Floor Corner' to add corner in the lab.")
            Dom.setBlinkArrow(true, 670,65);
          }
        })
      }

      function formFloorCornerAinme(){
        anime({
          targets: Scenes.items.form_floor_corner1.item,
          left: 73,
          easing: "easeInOutQuad",
          duration: 2000,
          complete(){
            
            Dom.setBlinkArrow(true, 790, 408).play();
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
          }
        })
      }

      setCC("Click on the 'Waler Clip' to add clip in the lab.");
      Dom.setBlinkArrow(true, 670, -35).play()
      // onclick
      contentAdderBtns[0].onclick = walerClicpAnime
      contentAdderBtns[1].onclick = formFloorPanelAnime
      contentAdderBtns[2].onclick = formFloorCornerAinme
      // remove all the previous elements
      // Dom.hideAll();
      return true;  

    }),
    (step3 = function () {
      setIsProcessRunning(true);

      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = "";

      // Required Elements
      Scenes.setStepHeading("Step 3", "Connect form floor corner with form form floor corner using waler clip,");

      Scenes.items.contentAdderBox.set(null,-50).show("flex").push();
      Scenes.contentAdderAddBtn("Floor Corner");
      Scenes.contentAdderAddBtn("Floor Panel");
      Scenes.contentAdderAddBtn("Waler Clip");
      Scenes.contentAdderAddBtn("Repeat")

      let contentAdderBtns = getAll(".content-adder-box .btn");
      
      
      Scenes.items.form_floor_corner1.set(15,220,190).rotate(1).zIndex(2)
      Scenes.items.form_floor_corner2.set(50,220,190).rotate(-1).zIndex(2)
      
      Scenes.items.panel1.set(697,226,178)
      Scenes.items.panel2.set(710,215,178)
      Scenes.items.panel3.set(723,200,178)

      Scenes.items.waler_clip1.set(130,359,20).zIndex(3)
      Scenes.items.waler_clip2.set(135,349,20).zIndex(3)
      Scenes.items.waler_clip3.set(140,339,20).zIndex(3)
      Scenes.items.waler_clip4.set(145,329,20).zIndex(3)
      
      Scenes.items.waler_clip5.set(180,359,20)
      Scenes.items.waler_clip6.set(185,349,20)
      Scenes.items.waler_clip7.set(190,339,20)
      Scenes.items.waler_clip8.set(195,329,20)
      
      Scenes.items.waler_clip9 .set(240,359,20)
      Scenes.items.waler_clip10.set(245,349,20)
      Scenes.items.waler_clip11.set(250,339,20)
      Scenes.items.waler_clip12.set(255,329,20)
      
      Scenes.items.waler_clip13.set(290,359,20).zIndex(3)
      Scenes.items.waler_clip14.set(295,349,20).zIndex(3)
      Scenes.items.waler_clip15.set(300,339,20).zIndex(3)
      Scenes.items.waler_clip16.set(305,329,20).zIndex(3)

      Scenes.items.tempTitle1.set(10,170).setContent("Form Floor<br>Corner")
      Scenes.items.tempTitle3.set(730,178).setContent("Form Floor Panel")
      Scenes.items.tempTitle2.set(188,296).setContent("Waler Clips")
      
    
      let cornerCount = 0;
      let panelCount = 0;
      let walerClipCount = 0;

      const floorCornerAnime = ()=>{
        Dom.setBlinkArrow(-1);
        switch(cornerCount){
          case 0:
            anime({
              easing: "easeInOutQuad",
              targets: [Scenes.items.form_floor_corner2.item],
              left: 121,
              top: 89,
              duration: 1000,
              complete(){
                Dom.setBlinkArrow(true, 710,15).play();
                setCC("Click on the 'Floor Panel' to add it in the lab.");
              }
            })
            break;

          case 1:
            anime({
              easing: "easeInOutQuad",
              targets: [Scenes.items.form_floor_corner1.item],
              left: 626,
              top: 87,
              duration: 2000,
            })
            break;
        }
        cornerCount++;
      }

      const floorPanelAnime = ()=>{
        Dom.setBlinkArrow(-1)
        switch(panelCount){
          case 0:
            anime({
              easing: "easeInOutQuad",
              targets: [Scenes.items.panel3.item],
              left: 153,
              top: 95,
              duration: 2000,
              complete(){
                Dom.setBlinkArrow(true, 710,65).play();
                setCC("Click on the 'Waler Clip' to add it in the lab.");
              }
            })
            break;
          
          case 1:
            anime({
              easing: "easeInOutQuad",
              targets: [Scenes.items.panel2.item],
              left: 311,
              top: 95,
              duration: 2000,
            })
            break;
          
          case 2:
            anime({
              easing: "easeInOutQuad",
              targets: [Scenes.items.panel1.item],
              left: 469,
              top: 95,
              duration: 2000,
              
            })
            break;
          
        }
        panelCount++;
      }

      const walerClipAnime = ()=>{
        Dom.setBlinkArrow(-1)
        let gap;
        switch(walerClipCount){
          case 0:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 1500,
            })
            .add({
              targets: Scenes.items.waler_clip1.item,
              left: 150,
              top: 110,
            })
            .add({
              targets: Scenes.items.waler_clip2.item,
              left: 150,
              top: 150,
            })
            .add({
              targets: Scenes.items.waler_clip3.item,
              left: 150,
              top: 190,
            })
            .add({
              targets: Scenes.items.waler_clip4.item,
              left: 150,
              top: 230,
              complete(){
                Dom.setBlinkArrow(true, 710,115).play();
                setCC("Click on the 'Repeat' to repeat the above steps.");
              }
            })
            break;
          
          case 1:
            gap = (156*walerClipCount);
            anime.timeline({
              easing: "easeInOutQuad",
            })
            .add({
              targets: Scenes.items.waler_clip5.item,
              left: 150+gap,
              top: 110,
            })
            .add({
              targets: Scenes.items.waler_clip6.item,
              left: 150+gap,
              top: 150,
            })
            .add({
              targets: Scenes.items.waler_clip7.item,
              left: 150+gap,
              top: 190,
            })
            .add({
              targets: Scenes.items.waler_clip8.item,
              left: 150+gap,
              top: 230,
              complete(){
                Dom.setBlinkArrow(true, 710,115).play();
              }
            })
            break;
          
          case 2:
            gap = (156*walerClipCount);
            anime.timeline({
              easing: "easeInOutQuad",
            })
            .add({
              targets: Scenes.items.waler_clip9.item,
              left: 150+gap,
              top: 110,
            })
            .add({
              targets: Scenes.items.waler_clip10.item,
              left: 150+gap,
              top: 150,
            })
            .add({
              targets: Scenes.items.waler_clip11.item,
              left: 150+gap,
              top: 190,
            })
            .add({
              targets: Scenes.items.waler_clip12.item,
              left: 150+gap,
              top: 230,
              complete(){
                Dom.setBlinkArrow(true, 710,115).play();
              }
            })
            break;
          
            case 3:
              gap = (156*walerClipCount);
              anime.timeline({
                easing: "easeInOutQuad",
              })
              .add({
                delay: 2000,
                targets: Scenes.items.waler_clip13.item,
                left: 150+gap,
                top: 110,
              })
              .add({
                targets: Scenes.items.waler_clip14.item,
                left: 150+gap,
                top: 150,
              })
              .add({
                targets: Scenes.items.waler_clip15.item,
                left: 150+gap,
                top: 190,
              })
              .add({
                targets: Scenes.items.waler_clip16.item,
                left: 150+gap,
                top: 230,
                complete(){
                  Quiz.loadQuiz();
                  Dom.setBlinkArrow(true, 790, 408).play();
                  setCC("Click 'Next' to go to next step");
                  setIsProcessRunning(false);
                }
              })
              break;
        }
        walerClipCount++;
      }
            
      Dom.setBlinkArrow(true, 710, -35).play();
      setCC("Click on the 'Floor Corner' to add it in the lab.");
      // onclick
      contentAdderBtns[0].onclick = floorCornerAnime;
      contentAdderBtns[1].onclick = floorPanelAnime;
      contentAdderBtns[2].onclick = walerClipAnime;
      contentAdderBtns[3].onclick = ()=>{
        floorPanelAnime()
        if(walerClipCount===3){
          floorCornerAnime()
        }
        setTimeout(walerClipAnime,1500);
      };

      //!remove
      // floorCornerAnime()
      // floorPanelAnime()
      // floorPanelAnime()
      // Scenes.items.waler_clip1.set(150,110,20)
      // Scenes.items.waler_clip2.set(150,150,20)
      // Scenes.items.waler_clip3.set(150,190,20)
      // Scenes.items.waler_clip4.set(150,230,20)

      // Scenes.items.waler_clip5.set(306,110,20)
      // Scenes.items.waler_clip6.set(306,150,20)
      // Scenes.items.waler_clip7.set(306,190,20)
      // Scenes.items.waler_clip8.set(306,230,20)

      
      // setCC("Click on the 'Sheathing Left' to add sheathing in form panel.");
      // Dom.setBlinkArrow(true, 685, -35).play();

      return true;
    }),
    (step4 = function () {
      Dom.hideAll();
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "Step 4",
        "Attach waler pipes using pipe waler clamp."
      );

    // required items
    Scenes.items.form_floor_corner1.set(626,87,190).rotate(1).zIndex(2)
    Scenes.items.form_floor_corner2.set(121,89,190).rotate(-1).zIndex(2)
    
    Scenes.items.panel1.set(153,95,178)
    Scenes.items.panel2.set(311,95,178)
    Scenes.items.panel3.set(469,95,178)

    Scenes.items.waler_clip1.set(150,110,20).zIndex(3)
    Scenes.items.waler_clip2.set(150,150,20).zIndex(3)
    Scenes.items.waler_clip3.set(150,190,20).zIndex(3)
    Scenes.items.waler_clip4.set(150,230,20).zIndex(3)
    
    Scenes.items.waler_clip5.set(306,110,20)
    Scenes.items.waler_clip6.set(306,150,20)
    Scenes.items.waler_clip7.set(306,190,20)
    Scenes.items.waler_clip8.set(306,230,20)
    
    Scenes.items.waler_clip9 .set(462,110,20)
    Scenes.items.waler_clip10.set(462,150,20)
    Scenes.items.waler_clip11.set(462,190,20)
    Scenes.items.waler_clip12.set(462,230,20)
    
    Scenes.items.waler_clip13.set(618,110,20).zIndex(3)
    Scenes.items.waler_clip14.set(618,150,20).zIndex(3)
    Scenes.items.waler_clip15.set(618,190,20).zIndex(3)
    Scenes.items.waler_clip16.set(618,230,20).zIndex(3)

    Scenes.items.pipe_waler_cutout1.set(37,360,18,550).zIndex(4)
    Scenes.items.pipe_waler_cutout2.set(37,380,18,550).zIndex(4)
    
     Scenes.items.pipe_waler_connector1.set(700,370,30,20).zIndex(5)
     Scenes.items.pipe_waler_connector2.set(725,370,30,20).zIndex(5)
     Scenes.items.pipe_waler_connector3.set(750,370,30,20).zIndex(5)
     Scenes.items.pipe_waler_connector4.set(775,370,30,20).zIndex(5)
     Scenes.items.pipe_waler_connector5.set(710,330,30,20).zIndex(5)
     Scenes.items.pipe_waler_connector6.set(735,330,30,20).zIndex(5)
     Scenes.items.pipe_waler_connector7.set(760,330,30,20).zIndex(5)
     Scenes.items.pipe_waler_connector8.set(785,330,30,20).zIndex(5)

     Scenes.items.larrow2.set(783,280,50)
     Scenes.items.pipe_waler_clamp_full.set(850,250,60)
     Scenes.items.tempTitle1.set(850,320,60).setContent("Waler clamp")

     

    //! final pos
    //  Scenes.items.pipe_waler_cutout1.set(115,130,18,550).zIndex(4)
    //  Scenes.items.pipe_waler_cutout2.set(115,215,18,550).zIndex(4)

    //  Scenes.items.pipe_waler_connector1.set(142,118,30,20).zIndex(5)
    //  Scenes.items.pipe_waler_connector2.set(300,118,30,20).zIndex(5)
    //  Scenes.items.pipe_waler_connector3.set(456,118,30,20).zIndex(5)
    //  Scenes.items.pipe_waler_connector4.set(612,118,30,20).zIndex(5)
    //  Scenes.items.pipe_waler_connector5.set(142,204,30,20).zIndex(5)
    //  Scenes.items.pipe_waler_connector6.set(300,204,30,20).zIndex(5)
    //  Scenes.items.pipe_waler_connector7.set(456,204,30,20).zIndex(5)
    //  Scenes.items.pipe_waler_connector8.set(612,204,30,20).zIndex(5)

    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push()
    Scenes.contentAdderAddBtn("Pipe Waler")
    Scenes.contentAdderAddBtn("Pipe Clamp")
    let contentAdderBtns = getAll(".content-adder-box .btn")
      
     let pipeCount = 0;
     const pipeWalerAnime = ()=>{
      switch(pipeCount){
        case 0:
          anime({
            easing: "easeInOutQuad",
            targets: Scenes.items.pipe_waler_cutout1.item,
            left: 115,
            top: 130,
            duration: 2000,
            complete(){
              Dom.setBlinkArrow(true,718,15).play()
              setCC("Click on the 'Pipe Clamp' to add it in the lab.")
            }
          })
          break;
          
        case 1:
          anime({
            easing: "easeInOutQuad",
            targets: Scenes.items.pipe_waler_cutout2.item,
            left: 115,
            top: 215,
            duration: 2000,
            complete(){
              Dom.setBlinkArrow(true,718,15).play()
              setCC("Click on the 'Pipe Clamp' to add it in the lab.")
            }
          })
          break;
      }
      pipeCount++;
     }

     let walerClampCount = 0;
     const walerClampAnime = ()=>{
      switch(walerClampCount){
        case 0:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 1000,
          })
          .add({
            targets: Scenes.items.pipe_waler_connector1.item,
            left: 142,
            top: 118,
          })
          .add({
            targets: Scenes.items.pipe_waler_connector2.item,
            left: 300,
            top: 118,
          })
          .add({
            targets: Scenes.items.pipe_waler_connector3.item,
            left: 456,
            top: 118,
          })
          .add({
            targets: Scenes.items.pipe_waler_connector4.item,
            left: 612,
            top: 118,
            complete(){
              Dom.setBlinkArrow(true,718,-35).play()
              setCC("Click on the 'Pipe Waler' to add it in the lab.")
            }
          })
        break;
          
        case 1:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 1000,
          })
          .add({
            begin(){
              Scenes.items.larrow2.hide()
              Scenes.items.pipe_waler_clamp_full.hide()
              Scenes.items.tempTitle1.hide()
            },
            targets: Scenes.items.pipe_waler_connector5.item,
            left: 142,
            top: 204,
          })
          .add({
            targets: Scenes.items.pipe_waler_connector6.item,
            left: 300,
            top: 204,
          })
          .add({
            targets: Scenes.items.pipe_waler_connector7.item,
            left: 456,
            top: 204,
          })
          .add({
            targets: Scenes.items.pipe_waler_connector8.item,
            left: 612,
            top: 204,
            complete(){
              Quiz.loadQuiz();
              Dom.setBlinkArrow(true, 790, 408).play();
              setCC("Click 'Next' to go to next step");
              setIsProcessRunning(false);
            }
          })
          break;
          
      }
      walerClampCount++;
     }
     
     Dom.setBlinkArrow(true,718,-35).play()
     setCC("Click on the 'Pipe Waler' to add it in the lab.")
     //onclick pipe waler 
     contentAdderBtns[0].onclick = pipeWalerAnime;
     contentAdderBtns[1].onclick = walerClampAnime;

     return true;

    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 5",
        "Attach steel waler with pipe waler using steel waler connector."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      // todo Required Items
      Scenes.items.form_floor_corner1.set(626,87,190).rotate(1).zIndex(2)
    Scenes.items.form_floor_corner2.set(121,89,190).rotate(-1).zIndex(2)
    
    Scenes.items.panel1.set(153,95,178)
    Scenes.items.panel2.set(311,95,178)
    Scenes.items.panel3.set(469,95,178)

    Scenes.items.waler_clip1.set(150,110,20).zIndex(3)
    Scenes.items.waler_clip2.set(150,150,20).zIndex(3)
    Scenes.items.waler_clip3.set(150,190,20).zIndex(3)
    Scenes.items.waler_clip4.set(150,230,20).zIndex(3)
    
    Scenes.items.waler_clip5.set(306,110,20)
    Scenes.items.waler_clip6.set(306,150,20)
    Scenes.items.waler_clip7.set(306,190,20)
    Scenes.items.waler_clip8.set(306,230,20)
    
    Scenes.items.waler_clip9 .set(462,110,20)
    Scenes.items.waler_clip10.set(462,150,20)
    Scenes.items.waler_clip11.set(462,190,20)
    Scenes.items.waler_clip12.set(462,230,20)
    
    Scenes.items.waler_clip13.set(618,110,20).zIndex(3)
    Scenes.items.waler_clip14.set(618,150,20).zIndex(3)
    Scenes.items.waler_clip15.set(618,190,20).zIndex(3)
    Scenes.items.waler_clip16.set(618,230,20).zIndex(3)

    Scenes.items.pipe_waler_cutout1.set(37,360,18,550).zIndex(4)
    Scenes.items.pipe_waler_cutout2.set(37,380,18,550).zIndex(4)
    
    Scenes.items.pipe_waler_connector1.set(700,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector2.set(725,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector3.set(750,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector4.set(775,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector5.set(710,330,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector6.set(735,330,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector7.set(760,330,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector8.set(785,330,30,20).zIndex(5)

    Scenes.items.pipe_waler_cutout1.set(115,130,18,550).zIndex(4)
    Scenes.items.pipe_waler_cutout2.set(115,215,18,550).zIndex(4)

    Scenes.items.pipe_waler_connector1.set(142,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector2.set(300,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector3.set(456,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector4.set(612,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector5.set(142,204,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector6.set(300,204,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector7.set(456,204,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector8.set(612,204,30,20).zIndex(5)

    Scenes.items.steel_waler1.set(30,315,30,185).zIndex(7)
    Scenes.items.steel_waler2.set(20,348,30,185).zIndex(7)
    Scenes.items.steel_waler3.set(10,380,30,185).zIndex(7)
    
    Scenes.items.steel_waler_connector1.set(300,320,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector2.set(280,366,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector3.set(320,320,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector4.set(300,366,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector5.set(340,320,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector6.set(320,366,30).rotate(-40).zIndex(6)

    Scenes.items.anchor_plate1.set(427,353,25).zIndex(8)
    Scenes.items.anchor_plate2.set(417,380,25).zIndex(8)
    Scenes.items.anchor_plate3.set(454,353,25).zIndex(8)
    Scenes.items.anchor_plate4.set(443,380,25).zIndex(8)
    Scenes.items.anchor_plate5.set(481,353,25).zIndex(8)
    Scenes.items.anchor_plate6.set(470,380,25).zIndex(8)

    Scenes.items.wing_nut1.set(570,374.5,8).zIndex(9)
    Scenes.items.wing_nut2.set(551,393.5,8).zIndex(9)
    Scenes.items.wing_nut3.set(600,374.5,8).zIndex(9)
    Scenes.items.wing_nut4.set(580,393.5,8).zIndex(9)
    Scenes.items.wing_nut5.set(630,374.5,8).zIndex(9)
    Scenes.items.wing_nut6.set(608,393.5,8).zIndex(9)

    Scenes.items.larrow2.set(635,330,40)
    Scenes.items.wing_nut_full.set(680,300,50)
    Scenes.items.tempTitle1.set(680,350).setContent("Wing Nut")

    // !remove
    // Scenes.items.steel_waler1.set(140,168,30,185).rotate(90).zIndex(7)
    // Scenes.items.steel_waler2.set(300,168,30,185).rotate(90).zIndex(7)
    // Scenes.items.steel_waler3.set(455,168,30,185).rotate(90).zIndex(7)
    
    // Scenes.items.steel_waler_connector1.set(220,130,30).rotate(-40).zIndex(6)
    // Scenes.items.steel_waler_connector2.set(220,216,30).rotate(-40).zIndex(6)
    // Scenes.items.steel_waler_connector3.set(380,130,30).rotate(-40).zIndex(6)
    // Scenes.items.steel_waler_connector4.set(380,216,30).rotate(-40).zIndex(6)
    // Scenes.items.steel_waler_connector5.set(535,130,30).rotate(-40).zIndex(6)
    // Scenes.items.steel_waler_connector6.set(535,216,30).rotate(-40).zIndex(6)

    // Scenes.items.anchor_plate1.set(220,129,25).zIndex(8)
    // Scenes.items.anchor_plate2.set(220,212,25).zIndex(8)
    // Scenes.items.anchor_plate3.set(380,129,25).zIndex(8)
    // Scenes.items.anchor_plate4.set(380,212,25).zIndex(8)
    // Scenes.items.anchor_plate5.set(536,129,25).zIndex(8)
    // Scenes.items.anchor_plate6.set(536,212,25).zIndex(8)

    // Scenes.items.wing_nut1.set(219,137.5,8).zIndex(9)
    // Scenes.items.wing_nut2.set(219,220.5,8).zIndex(9)
    // Scenes.items.wing_nut3.set(379,137.5,8).zIndex(9)
    // Scenes.items.wing_nut4.set(379,220.5,8).zIndex(9)
    // Scenes.items.wing_nut5.set(535,137.5,8).zIndex(9)
    // Scenes.items.wing_nut6.set(535,220.5,8).zIndex(9)

    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
    Scenes.contentAdderAddBtn("Waler Connector");
    Scenes.contentAdderAddBtn("Steel Waler");
    Scenes.contentAdderAddBtn("Anchor Plate");
    Scenes.contentAdderAddBtn("Wing Nut");
    Scenes.contentAdderAddBtn("Repeat");
    let contentAdderBtns = getAll(".content-adder-box .btn");

    let walerConnectorCount = 0;
    let steelWalerCount = 0;
    let anchorPlateCount = 0;
    let wingNutCount = 0; 

    const walerConnectorAnime = ()=>{
      switch(walerConnectorCount){
        case 0:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.steel_waler_connector1.item,
            left:220,
            top:130,
          })
          .add({
            targets: Scenes.items.steel_waler_connector2.item,
            left:220,
            top:216,
            complete(){
              Dom.setBlinkArrow(true,680,15).play()
              setCC("Click on the 'Steel Waler' to attach it with the steel waler connector.")
            }
          })
          break
        case 1:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.steel_waler_connector3.item,
            left:380,
            top:130,
          })
          .add({
            targets: Scenes.items.steel_waler_connector4.item,
            left:380,
            top:216,
          })
          break
        case 2:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.steel_waler_connector5.item,
            left:535,
            top:130,
          })
          .add({
            targets: Scenes.items.steel_waler_connector6.item,
            left:535,
            top:216,
          })
          break

      }
      walerConnectorCount++;
    }
    
    const steelWalerAnime = ()=>{
      switch(steelWalerCount){
        case 0:
          anime({
            easing: "easeInOutQuad",
            targets: Scenes.items.steel_waler1.item,
            left:140,
            top:168,
            duration: 1000,
            rotate: 90,
            complete(){
              Dom.setBlinkArrow(true,680,65).play()
              setCC("Click on the 'Anchor Plate' to attach it with the steel waler connector.")
            }
          })
          break
        case 1:
          anime({
            easing: "easeInOutQuad",
            targets: Scenes.items.steel_waler2.item,
            left:300,
            top:168,
            duration: 1000,
            rotate: 90
          })
          break
        case 2:
          anime({
            easing: "easeInOutQuad",
            targets: Scenes.items.steel_waler3.item,
            left:455,
            top:168,
            duration: 1000,
            rotate: 90
          })
          break

        
      }
      steelWalerCount++;
    }

    const anchorPlateAnime = ()=>{
      let rotationCount = 1;
      switch(anchorPlateCount){
        case 0:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.anchor_plate1.item,
            keyframes: [
              {left:220, top:129,},
              {rotate: 360 * rotationCount, duration: 3000}
            ]
          })
          .add({
            targets: Scenes.items.anchor_plate2.item,
            keyframes: [
              {left:220, top:212,},
              {rotate: 360 * rotationCount, duration: 3000}
            ],
            complete(){
              Dom.setBlinkArrow(true,680,115).play()
              setCC("Click on the 'Wing Nut' to tighten it.")
            }
          })
          break
        case 1:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.anchor_plate3.item,
            keyframes: [
              {left:380, top:129,},
              {rotate: 360 * rotationCount, duration: 3000}
            ]
          })
          .add({
            targets: Scenes.items.anchor_plate4.item,
            keyframes: [
              {left:380, top:212,},
              {rotate: 360 * rotationCount, duration: 3000}
            ]
          })
          break
        case 2:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 1000,
          })
          .add({
            targets: Scenes.items.anchor_plate5.item,
            keyframes: [
              {left:536, top:129,},
              {rotate: 360 * rotationCount, duration: 3000}
            ]
          })
          .add({
            targets: Scenes.items.anchor_plate6.item,
            keyframes: [
              {left:536, top:212,},
              {rotate: 360 * rotationCount, duration: 3000}
            ]
          })
          break
      }
      anchorPlateCount++;
    }

    const wingNutAnime = ()=>{
      let rotationCount = 1;
      switch(wingNutCount){
        case 0:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.wing_nut1.item,
            keyframes: [
              {left:219, top:137,},
              {rotate: 360 * rotationCount, duration: 3000}
            ]
          })
          .add({
            targets: Scenes.items.wing_nut2.item,
            keyframes: [
              {left:219, top:220,},
              {rotate: 360 * rotationCount, duration: 3000}
            ],
            complete(){
              Dom.setBlinkArrow(true,680,165).play()
              setCC("Click on the 'Repeat' to repeat the previous steps.")
            }
          })
          break
        case 1:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.wing_nut3.item,
            keyframes: [
              {left:379, top:137,},
              {rotate: 360 * rotationCount, duration: 3000}
            ]
          })
          .add({
            targets: Scenes.items.wing_nut4.item,
            keyframes: [
              {left:379, top:220,},
              {rotate: 360 * rotationCount, duration: 3000}
            ]
          })
          break
        case 2:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 1000,
          })
          .add({
            targets: Scenes.items.wing_nut5.item,
            left:535,
            top:137,
            keyframes: [
              {left:535, top:137,},
              {rotate: 360 * rotationCount, duration: 3000}
            ]
          })
          .add({
            targets: Scenes.items.wing_nut6.item,
            keyframes: [
              {left:535, top:220,},
              {rotate: 360 * rotationCount, duration: 3000}
            ],
            complete(){
              Scenes.items.larrow2.hide()
              Scenes.items.wing_nut_full.hide()
              Scenes.items.tempTitle1.hide()
              Quiz.loadQuiz();


              setCC("Click 'Next' to go to next step");
              Dom.setBlinkArrow(true, 790, 408).play();
              setIsProcessRunning(false);
            }
          })
          break
      }
      wingNutCount++;
    }
    Dom.setBlinkArrow(true,680,-35).play()
    setCC("Click on the 'Waler Connector' to connect it with the pipe.")
    //onclick
    contentAdderBtns[0].onclick = walerConnectorAnime
    contentAdderBtns[1].onclick = steelWalerAnime
    contentAdderBtns[2].onclick = anchorPlateAnime
    contentAdderBtns[3].onclick = wingNutAnime
    contentAdderBtns[4].onclick = ()=>{
      anime.timeline()
      .add({
        duration: 2000,
        begin(){
          walerConnectorAnime()
        }
      })
      .add({
        duration: 1000,
        begin(){
          steelWalerAnime()
        }
      })
      .add({
        duration: 1000,
        begin(){
          anchorPlateAnime()
        }
      })
      .add({
        duration: 1000,
        begin(){
          wingNutAnime()
        }
      })
    }
    




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
        "Attaching CT prop with steel waler for providing support."
      );

      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      // todo Required Items
      Scenes.items.form_floor_corner1.set(626,87,190).rotate(1).zIndex(2)
    Scenes.items.form_floor_corner2.set(121,89,190).rotate(-1).zIndex(2)
    
    Scenes.items.panel1.set(153,95,178)
    Scenes.items.panel2.set(311,95,178)
    Scenes.items.panel3.set(469,95,178)

    Scenes.items.waler_clip1.set(150,110,20).zIndex(3)
    Scenes.items.waler_clip2.set(150,150,20).zIndex(3)
    Scenes.items.waler_clip3.set(150,190,20).zIndex(3)
    Scenes.items.waler_clip4.set(150,230,20).zIndex(3)
    
    Scenes.items.waler_clip5.set(306,110,20)
    Scenes.items.waler_clip6.set(306,150,20)
    Scenes.items.waler_clip7.set(306,190,20)
    Scenes.items.waler_clip8.set(306,230,20)
    
    Scenes.items.waler_clip9 .set(462,110,20)
    Scenes.items.waler_clip10.set(462,150,20)
    Scenes.items.waler_clip11.set(462,190,20)
    Scenes.items.waler_clip12.set(462,230,20)
    
    Scenes.items.waler_clip13.set(618,110,20).zIndex(3)
    Scenes.items.waler_clip14.set(618,150,20).zIndex(3)
    Scenes.items.waler_clip15.set(618,190,20).zIndex(3)
    Scenes.items.waler_clip16.set(618,230,20).zIndex(3)

    Scenes.items.pipe_waler_cutout1.set(37,360,18,550).zIndex(4)
    Scenes.items.pipe_waler_cutout2.set(37,380,18,550).zIndex(4)
    
    Scenes.items.pipe_waler_connector1.set(700,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector2.set(725,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector3.set(750,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector4.set(775,370,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector5.set(710,330,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector6.set(735,330,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector7.set(760,330,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector8.set(785,330,30,20).zIndex(5)

    Scenes.items.pipe_waler_cutout1.set(115,130,18,550).zIndex(4)
    Scenes.items.pipe_waler_cutout2.set(115,215,18,550).zIndex(4)

    Scenes.items.pipe_waler_connector1.set(142,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector2.set(300,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector3.set(456,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector4.set(612,118,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector5.set(142,204,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector6.set(300,204,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector7.set(456,204,30,20).zIndex(5)
    Scenes.items.pipe_waler_connector8.set(612,204,30,20).zIndex(5)

    Scenes.items.steel_waler1.set(140,168,30,185).rotate(90).zIndex(7)
    Scenes.items.steel_waler2.set(300,168,30,185).rotate(90).zIndex(7)
    Scenes.items.steel_waler3.set(455,168,30,185).rotate(90).zIndex(7)
    
    Scenes.items.steel_waler_connector1.set(220,130,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector2.set(220,216,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector3.set(380,130,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector4.set(380,216,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector5.set(535,130,30).rotate(-40).zIndex(6)
    Scenes.items.steel_waler_connector6.set(535,216,30).rotate(-40).zIndex(6)

    Scenes.items.anchor_plate1.set(220,129,25).zIndex(8)
    Scenes.items.anchor_plate2.set(220,212,25).zIndex(8)
    Scenes.items.anchor_plate3.set(380,129,25).zIndex(8)
    Scenes.items.anchor_plate4.set(380,212,25).zIndex(8)
    Scenes.items.anchor_plate5.set(536,129,25).zIndex(8)
    Scenes.items.anchor_plate6.set(536,212,25).zIndex(8)

    Scenes.items.wing_nut1.set(219,137.5,8).zIndex(9)
    Scenes.items.wing_nut2.set(219,220.5,8).zIndex(9)
    Scenes.items.wing_nut3.set(379,137.5,8).zIndex(9)
    Scenes.items.wing_nut4.set(379,220.5,8).zIndex(9)
    Scenes.items.wing_nut5.set(535,137.5,8).zIndex(9)
    Scenes.items.wing_nut6.set(535,220.5,8).zIndex(9)

    Scenes.items.ct_prop1.set(187,250,250,50).rotate(90).zIndex(11)
    Scenes.items.ct_prop2.set(153,305,185,50).rotate(90).zIndex(11)
    
    Scenes.items.head_adapter1.set(400,360,25).zIndex(10)
    Scenes.items.head_adapter2.set(440,360,25).zIndex(10)
    
    Scenes.items.foot_adapter1.set(510,310,75).zIndex(12)

    // image Box
    Scenes.items.imageBox.show("flex").set(750,200)
    Scenes.items.imageBoxSrc.item.src = "./src/images/real_head_adapter.png";
    Scenes.items.imageBoxTitle.setContent("Head Adapter")

    //! remove
    // Scenes.items.head_adapter1.set(220,129,25).zIndex(10)
    // Scenes.items.head_adapter2.set(220,212,25).zIndex(10)
    // Scenes.items.head_adapter3.set(380,129,25).zIndex(10)
    // Scenes.items.head_adapter4.set(380,212,25).zIndex(10)
    // Scenes.items.head_adapter5.set(536,129,25).zIndex(10)
    // Scenes.items.head_adapter6.set(536,212,25).zIndex(10)

    // Scenes.items.ct_prop1.set(135,115,250,50).rotate(35).zIndex(11)
    // Scenes.items.ct_prop2.set(135,190,185,50).rotate(50).zIndex(11)
    // Scenes.items.ct_prop3.set(295,115,250,50).rotate(35).zIndex(11)
    // Scenes.items.ct_prop4.set(295,190,185,50).rotate(50).zIndex(11)
    // Scenes.items.ct_prop5.set(455,115,250,50).rotate(35).zIndex(11)
    // Scenes.items.ct_prop6.set(455,190,185,50).rotate(50).zIndex(11)

    // Scenes.items.foot_adapter1.set(55,280,75).zIndex(12)
    // Scenes.items.foot_adapter2.set(216,280,75).zIndex(12)
    // Scenes.items.foot_adapter3.set(376,280,75).zIndex(12)
    
    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
    Scenes.contentAdderAddBtn("Head Adapter");
    Scenes.contentAdderAddBtn("Foot Adapter");
    Scenes.contentAdderAddBtn("CT Prop");
    Scenes.contentAdderAddBtn("Repeat");
    let contentAdderBtns = getAll(".content-adder-box .btn");

    let headAdapterCount = 0; 
    let footAdapterCount = 0;
    let ctPropCount = 0;

    const headAdapterAnime = ()=>{
      switch(headAdapterCount){
        case 0:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.head_adapter1.item,
            left:220,
            top:129,
          })
          .add({
            targets: Scenes.items.head_adapter2.item,
            left:220,
            top:212,
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
            left:380,
            top:129,
          })
          .add({
            targets: Scenes.items.head_adapter4.item,
            left:380,
            top:212,
          })
          break

        case 2:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.head_adapter5.item,
            left:536,
            top:129,
          })
          .add({
            targets: Scenes.items.head_adapter6.item,
            left:536,
            top:212,
          })
          break

      }
      headAdapterCount++;
    }
    
    const footAdapterAnime = ()=>{
      switch(footAdapterCount){
        case 0:
          anime({
            easing: "easeInOutQuad",
            targets: Scenes.items.foot_adapter1.item,
            left:55,
            top:280,
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
            left:216,
            top:280,
            duration: 1000,
          })
          break
        case 2:
          anime({
            easing: "easeInOutQuad",
            targets: Scenes.items.foot_adapter3.item,
            left:376,
            top:280,
            duration: 1000,
          })
          break

        
      }
      footAdapterCount++;
    }

    const ctPropAnime = ()=>{
      let rotationCount = 2;
      switch(ctPropCount){
        case 0:
          anime.timeline({
              easing: "easeInOutQuad",
              duration: 1000,
          })
          .add({
            targets: Scenes.items.ct_prop1.item,
            left:135, 
            top:115,
            rotate: 35
          })
          .add({
            targets: Scenes.items.ct_prop2.item,
            left:135, 
            top:190,
            rotate: 50,
            complete(){
              // for next step
              Scenes.items.ct_prop3.set(187,250,250,50).rotate(90).zIndex(11)
              Scenes.items.ct_prop4.set(153,305,185,50).rotate(90).zIndex(11)
              
              Scenes.items.head_adapter3.set(400,360,25).zIndex(10)
              Scenes.items.head_adapter4.set(440,360,25).zIndex(10)
              
              Scenes.items.foot_adapter2.set(510,310,75).zIndex(12)

              setCC("Click on the 'Repeat' to repeat the previous steps.")
              Dom.setBlinkArrow(true,700,115).play()
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
            left:295, 
            top:115,
            rotate: 35
              
          })
          .add({
            targets: Scenes.items.ct_prop4.item,
            left:295, 
            top:190,
            rotate: 50,
            complete(){
              Scenes.items.ct_prop5.set(187,250,250,50).rotate(90).zIndex(11)
              Scenes.items.ct_prop6.set(153,305,185,50).rotate(90).zIndex(11)
              
              Scenes.items.head_adapter5.set(400,360,25).zIndex(10)
              Scenes.items.head_adapter6.set(440,360,25).zIndex(10)
              
              Scenes.items.foot_adapter3.set(510,310,75).zIndex(12)

              //! for image box
              Scenes.items.imageBoxSrc.item.src = "./src/images/real_foot_adapter.png";
              Scenes.items.imageBoxTitle.setContent("Foot Adapter")
            }  
          })
          
          break
        case 2:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 1000,
          })
          .add({
            targets: Scenes.items.ct_prop5.item,
            left:455, 
            top:115,
            rotate: 35
              
          })
          .add({
            targets: Scenes.items.ct_prop6.item,
            left:455, 
            top:190,
            rotate: 50,
            complete(){
              Quiz.loadQuiz();

              

              setCC("Click 'Next' to go to next step");
              Dom.setBlinkArrow(true, 790, 408).play();
              setIsProcessRunning(false);
            }
          })
          break
      }

      ctPropCount++;
    }

    setCC("Click on the 'Head Adapter' to attach it with steel waler.")
    Dom.setBlinkArrow(true,700,-35).play()
    //onclick
    contentAdderBtns[0].onclick = headAdapterAnime
    contentAdderBtns[1].onclick = footAdapterAnime
    contentAdderBtns[2].onclick = ctPropAnime
    contentAdderBtns[3].onclick = function(){
      headAdapterAnime()
      footAdapterAnime()
      ctPropAnime()
    }

    // setCC("Click 'Next' to go to next step");
    //       Dom.setBlinkArrow(true, 790, 408).play();
    //       setIsProcessRunning(false);
        //   anime({
        //     duration: 1000,
        //     complete(){
        //       Quiz.loadQuiz()
        //     }
        //   });
        // };
      return true;
    }),
    (step7 = function () {
      setIsProcessRunning(true);
      Scenes.setStepHeading(
        "Step 7",
        "Repeat Step 2 to Step 6 for remainnig three sides."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      // todo Required Items
     Scenes.items.full_foundation_front1.set(0,0).zIndex(4)
     Scenes.items.full_foundation_front2.set(-400,0).zIndex(3).hidden()
     Scenes.items.full_foundation_front3.set(-50,-50).zIndex(2).hidden()
     Scenes.items.full_foundation_front4.set(100,0).zIndex(1).hidden()
    
    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
    Scenes.contentAdderAddBtn("Left Side");
    Scenes.contentAdderAddBtn("Back Side");
    Scenes.contentAdderAddBtn("Right Side");
    let contentAdderBtns = getAll(".content-adder-box .btn");

    const leftSideAnime = ()=>{
      Scenes.items.full_foundation_front2.hidden(false)
      anime({
        targets: Scenes.items.full_foundation_front2.item,
        left: 0,
        easing: "easeOutQuad",
        duration: 3000,
      })
    }
    
    const backSideAnime = ()=>{
      Scenes.items.full_foundation_front3.hidden(false)
      anime({
        targets: Scenes.items.full_foundation_front3.item,
        top: 0,
        left: 0,
        easing: "easeOutQuad",
        duration: 3000,
      })
    }

    const rightSideAnime = ()=>{
      Scenes.items.full_foundation_front4.hidden(false)
      anime({
        targets: Scenes.items.full_foundation_front4.item,
        left: 0,
        easing: "easeOutQuad",
        duration: 3000,
        complete(){
          Quiz.loadQuiz();

          setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 408).play();
          setIsProcessRunning(false);
        }
      })
    }

    //onclick
    contentAdderBtns[0].onclick = leftSideAnime
    contentAdderBtns[1].onclick = backSideAnime
    contentAdderBtns[2].onclick = rightSideAnime

    // setCC("Click 'Next' to go to next step");
    //       Dom.setBlinkArrow(true, 790, 408).play();
    //       setIsProcessRunning(false);
        //   anime({
        //     duration: 1000,
        //     complete(){
        //       Quiz.loadQuiz()
        //     }
        //   });
        // };
      return true;
    }),


    (completed = function () {
      Dom.hideAll();
      Scenes.items.contentAdderBox.setContent("");

            let certificateExpName = get(".certificate .student-detail .row span:nth-child(2)")
      certificateExpName.innerHTML = Scenes.experimentNameCertificate

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
      };

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
      this.steps[this.currentStep]();
      this.currentStep++;
      backDrawerItem();
      backProgressBar();
      // reset menu item for showArrow
      this.menuItemNumber = 1;
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return;
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

// Scenes.steps[6](); 
Scenes.next();
// Scenes.next();
// Scenes.next();

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
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }
