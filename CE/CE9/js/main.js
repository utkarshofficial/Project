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
}

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
}

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
    width = 60,
    rotate = 0
  ) {
    // because we added the blinkArrow image out of the anime-main
    top += 130
    let blinkArrow = new Dom(".blinkArrow")
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

//! content adder btn click stop

let moveCover = function(topIdx, bottomIdx){
  Scenes.items.menu_cover_top.set()
  Scenes.items.menu_cover_bottom.set()
}

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
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
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
    blur_bcg: new Dom(".blur_bcg"),
    

    // ! Images starts from here
    column_back_full : new Dom("column_back_full"),
column_corner : new Dom("column_corner"),
column_corner_2 : new Dom("column_corner_2"),
column_corner_back_1 : new Dom("column_corner_back_1"),
column_corner_back_2 : new Dom("column_corner_back_2"),
column_corner_front_1 : new Dom("column_corner_front_1"),
column_corner_front_2 : new Dom("column_corner_front_2"),
column_corner_left : new Dom("column_corner_left"),
column_corner_left_1 : new Dom("column_corner_left_1"),
column_corner_left_2 : new Dom("column_corner_left_2"),
column_corner_right : new Dom("column_corner_right"),
column_corner_right_1 : new Dom("column_corner_right_1"),
column_corner_right_2 : new Dom("column_corner_right_2"),
column_front_kicker_brace : new Dom("column_front_kicker_brace"),
column_front_panel : new Dom("column_front_panel"),
column_front_push_prop_1 : new Dom("column_front_push_prop_1"),
column_front_push_prop_2 : new Dom("column_front_push_prop_2"),
column_front_push_prop_pin_1 : new Dom("column_front_push_prop_pin_1"),
column_front_push_prop_pin_2 : new Dom("column_front_push_prop_pin_2"),
column_left_full : new Dom("column_left_full"),
column_right_full : new Dom("column_right_full"),
column_wedge_pin_front_1 : new Dom("column_wedge_pin_front_1"),
column_wedge_pin_front_10 : new Dom("column_wedge_pin_front_10"),
column_wedge_pin_front_11 : new Dom("column_wedge_pin_front_11"),
column_wedge_pin_front_12 : new Dom("column_wedge_pin_front_12"),
column_wedge_pin_front_2 : new Dom("column_wedge_pin_front_2"),
column_wedge_pin_front_3 : new Dom("column_wedge_pin_front_3"),
column_wedge_pin_front_4 : new Dom("column_wedge_pin_front_4"),
column_wedge_pin_front_5 : new Dom("column_wedge_pin_front_5"),
column_wedge_pin_front_6 : new Dom("column_wedge_pin_front_6"),
column_wedge_pin_front_7 : new Dom("column_wedge_pin_front_7"),
column_wedge_pin_front_8 : new Dom("column_wedge_pin_front_8"),
column_wedge_pin_front_9 : new Dom("column_wedge_pin_front_9"),
column_wedge_pin_left_1 : new Dom("column_wedge_pin_left_1"),
column_wedge_pin_left_2 : new Dom("column_wedge_pin_left_2"),
column_wedge_pin_left_3 : new Dom("column_wedge_pin_left_3"),
column_wedge_pin_left_4 : new Dom("column_wedge_pin_left_4"),
column_wedge_pin_left_5 : new Dom("column_wedge_pin_left_5"),
column_wedge_pin_left_6 : new Dom("column_wedge_pin_left_6"),
column_wedge_pin_right_1 : new Dom("column_wedge_pin_right_1"),
column_wedge_pin_right_2 : new Dom("column_wedge_pin_right_2"),
column_wedge_pin_right_3 : new Dom("column_wedge_pin_right_3"),
column_wedge_pin_right_4 : new Dom("column_wedge_pin_right_4"),
column_wedge_pin_right_5 : new Dom("column_wedge_pin_right_5"),
column_wedge_pin_right_6 : new Dom("column_wedge_pin_right_6"),
menu_cover_top : new Dom("menu_cover_top"),
menu_cover_bottom : new Dom("menu_cover_bottom"),
objective : new Dom("objective"),

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

    let menuLeftOffset = get(".content-adder-box").offsetLeft
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
    let allMenuItems = getAll(".content-adder-box li")
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
  experimentNameIntro: "Column Formwork (PERI) Experiment",
  experimentNameCertificate: "Column Formwork (PERI)",
  experimentNameSpeech: "Column Formwork (PERI)",
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
      Scenes.items.objective.set(0,45)
      

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
    (step2 = function () {
      // ! fixing the overflow
      Scenes.items.anime_main_dom.item.style.overflow = "visible";

      // hide
      Scenes.items.projectIntro.hide()
      Dom.hideAll();
      setIsProcessRunning(true);
      Dom.setBlinkArrow(-1);
      
      Scenes.setStepHeading("Step 1", "Make one side of a column.")

      //required elements

      Scenes.items.column_front_panel.set(-400,0)
      Scenes.items.column_front_push_prop_1.set(-400,0)
      Scenes.items.column_front_push_prop_2.set(-400,0)
      Scenes.items.column_front_kicker_brace.set(-400,0)

      Scenes.items.column_front_push_prop_pin_1.set(-400,10)
      Scenes.items.column_front_push_prop_pin_2.set(-400,0)
      // * Required Elements
      // Scenes.items.column_front_panel.set(0,0)
      // Scenes.items.column_front_push_prop_1.set(0,0)
      // Scenes.items.column_front_push_prop_2.set(0,0)
      // Scenes.items.column_front_kicker_brace.set(0,0)

      // Scenes.items.column_front_push_prop_pin_1.set(10,10)
      // Scenes.items.column_front_push_prop_pin_2.set(0,0)

      // ! Final Pos
      // Scenes.items.base_floor_cutout.set(0,0)

      Scenes.items.contentAdderBox.set(null,-50).show("flex")
      Scenes.contentAdderAddBtn("Form Panel")
      Scenes.contentAdderAddBtn("Brace Kicker")
      Scenes.contentAdderAddBtn("Push Prop")

      //function call for stop click on menu item
      Scenes.items.menu_cover_top.set(null, 20, null, null, null, 80).zIndex(150);          
      Scenes.items.menu_cover_bottom.set(null, 20, null, null, null, 80).zIndex(150);          


      function menuItem_1Anime(){ 
        Dom.setBlinkArrow(-1)
        anime({
          easing: "easeInOutQuad",
          targets: Scenes.items.column_front_panel.item,
          // begin(){
          //   Scenes.items.base_floor.show();
          // },  
          keyframes:[
            {left : 0},
            {top: 0},
          ],
          duration: 3000,
          complete(){
            setCC("Click on the 'Brace Kicker' to add it in the lab.");      
            Scenes.showArrowForMenuItem()
          }  
        })
      }

      function menuItem_2Anime(){
        Dom.setBlinkArrow(-1)
        anime({
          easing: "easeInOutQuad",
          duration: 3000,
          targets: Scenes.items.column_front_kicker_brace.item,
          keyframes:[
            {left: 0},
            {top: 0},
          ],
          complete(){
            setCC("Click on the 'Push Prop' to attach it with Form Panel.");      
            Scenes.showArrowForMenuItem()
          }  
        })        
      }

      function menuItem_3Anime(){
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.column_front_push_prop_1.item,
          keyframes:[
            {left: 0},
            {top: 0},
          ],
          rotate: 0,
        })
        .add({
          targets: Scenes.items.column_front_push_prop_pin_1.item,
          keyframes:[
            {top: 10},
            {left: 10},
            {left: 0,top: 0},
          ],
        })
        .add({
          targets: Scenes.items.column_front_push_prop_2.item,
          keyframes:[
            {left: 0},
            {top: 0},
          ],
          rotate: 0,
        })
        .add({
          targets: Scenes.items.column_front_push_prop_pin_2.item,
          keyframes:[
            {top: 10},
            {left: 10},
            {left: 0,top: 0},
          ],
          complete(){
            setIsProcessRunning(false);
          }  
        })                     
      }

    


      setCC("Click on the 'Form Panel' to add it in the lab.");      
      Scenes.showArrowForMenuItem()

      // onclick
      let contentAdderBtns = getAll(".content-adder-box .btn")
      contentAdderBtns[0].onclick = menuItem_1Anime
      contentAdderBtns[1].onclick = menuItem_2Anime
      contentAdderBtns[2].onclick = menuItem_3Anime
      // remove all the previous elements
      // Dom.hideAll();
      return true;  

    }),
    (step3 = function () {
      setIsProcessRunning(true);

      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step 2", "Adding all sides of Column.");
      
      // * Required Elements
      Scenes.items.column_front_panel.set(0,0).zIndex(2)
      Scenes.items.column_front_push_prop_1.set(0,0).zIndex(2)
      Scenes.items.column_front_push_prop_2.set(0,0).zIndex(2)
      Scenes.items.column_front_kicker_brace.set(0,0).zIndex(2)
      Scenes.items.column_front_push_prop_pin_1.set(10,10).zIndex(2)
      Scenes.items.column_front_push_prop_pin_2.set(0,0).zIndex(2)

      // ! Final Position
      Scenes.items.column_left_full.set(-70,-40).hide()
      Scenes.items.column_back_full.set(70,-40).hide()
      Scenes.items.column_right_full.set(70,20).zIndex(2).hide()
     

      Scenes.items.contentAdderBox.set(null,-50).show("flex")
      Scenes.contentAdderAddBtn("Left Side")
      Scenes.contentAdderAddBtn("Back Side")
      Scenes.contentAdderAddBtn("Right Side")

      function menuItem_1Anime(){ 
        Dom.setBlinkArrow(-1)
        anime({
          easing: "easeInOutQuad",
          targets: Scenes.items.column_left_full.item,
          begin(){
            Scenes.items.column_left_full.show();
          },  
          left: 0,
          top: 0,
          duration: 4000,
          complete(){
            setCC("Click on the 'Back Side' to attach left side of column.");      
            Scenes.showArrowForMenuItem()
          }  
        })
      }

      function menuItem_2Anime(){
        Dom.setBlinkArrow(-1)
        anime({
          easing: "easeInOutQuad",
          targets: Scenes.items.column_back_full.item,
          begin(){
            Scenes.items.column_back_full.show();
          },  
          left: 0,
          top: 0,
          duration: 4000,
          complete(){
            setCC("Click on the 'Right Side' to attach left side of column.");      
            Scenes.showArrowForMenuItem()
          }  
        })      
      }

      function menuItem_3Anime(){
        Dom.setBlinkArrow(-1)
        anime({
          easing: "easeInOutQuad",
          targets: Scenes.items.column_right_full.item,
          begin(){
            Scenes.items.column_right_full.show();
          },  
          left: 0,
          top: 0,
          duration: 4000,
          complete(){
            setIsProcessRunning(false);
          }  
        })                     
      }

    


      setCC("Click on the 'Left Side' to attach left side of column.");      
      Scenes.showArrowForMenuItem()

      // onclick
      let contentAdderBtns = getAll(".content-adder-box .btn")
      contentAdderBtns[0].onclick = menuItem_1Anime
      contentAdderBtns[1].onclick = menuItem_2Anime
      contentAdderBtns[2].onclick = menuItem_3Anime

      return true;

    }),
    (step4 = function () {
      Dom.hideAll(); 
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "Step 3",
        "Placing external corner to attach all sides of columns."
      );

      // ! required item
      Scenes.items.column_front_panel.set(0,0).zIndex(4)
      Scenes.items.column_front_push_prop_1.set(0,0).zIndex(4)
      Scenes.items.column_front_push_prop_2.set(0,0).zIndex(4)
      Scenes.items.column_front_kicker_brace.set(0,0).zIndex(4)
      Scenes.items.column_front_push_prop_pin_1.set(10,10).zIndex(4)
      Scenes.items.column_front_push_prop_pin_2.set(0,0).zIndex(4)

      Scenes.items.column_left_full.set(0,0).zIndex(2)
      Scenes.items.column_back_full.set(0,0).zIndex(2)
      Scenes.items.column_right_full.set(0,0).zIndex(4)
      
      Scenes.items.column_corner_left_1.set(-400,0).zIndex(3)
      Scenes.items.column_corner_left_2.set(-400,0).zIndex(3)

      Scenes.items.column_corner_back_1.set(700,0).zIndex(1)
      Scenes.items.column_corner_back_2.set(700,0).zIndex(1)

      Scenes.items.column_corner_right_1.set(700,0).zIndex(3)
      Scenes.items.column_corner_right_2.set(700,0).zIndex(3)

      Scenes.items.column_corner_front_1.set(-400,0).zIndex(5)
      Scenes.items.column_corner_front_2.set(-400,0).zIndex(5)

      //! final pos
      // Scenes.items.column_corner_left_1.set(0,0).zIndex(3)
      // Scenes.items.column_corner_left_2.set(0,0).zIndex(3)

      // Scenes.items.column_corner_back_1.set(0,0).zIndex(1)
      // Scenes.items.column_corner_back_2.set(0,0).zIndex(1)

      // Scenes.items.column_corner_right_1.set(0,0).zIndex(3)
      // Scenes.items.column_corner_right_2.set(0,0).zIndex(3)

      // Scenes.items.column_corner_front_1.set(0,0).zIndex(5)
      // Scenes.items.column_corner_front_2.set(0,0).zIndex(5)



      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push()
      Scenes.contentAdderAddBtn("Left Corner")
      Scenes.contentAdderAddBtn("Back Corner")
      Scenes.contentAdderAddBtn("Right Corner")
      Scenes.contentAdderAddBtn("Front Corner")

      function menuItem_1Anime(){ 
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 3000,
        })
        .add({
          targets: Scenes.items.column_corner_left_1.item,
          keyframes:[
            {top: 0},
            {left : -10},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_corner_left_2.item,
          keyframes:[
            {top: 0},
            {left : -10},
            {top: 0,left: 0},
          ], 
          complete(){
            setCC("Click on the 'Back Corner' to attach external corner with column.");      
            Scenes.showArrowForMenuItem()
          } 
        })
      }

      function menuItem_2Anime(){
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 3000,
        })
        .add({
          targets: Scenes.items.column_corner_back_1.item,
          keyframes:[
            {left : 0},
            {top: -10},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_corner_back_2.item,
          keyframes:[
            {left : 0},
            {top: -10},
            {top: 0,left: 0},
          ], 
          complete(){
            setCC("Click on the 'Right Corner' to attach external corner with column.");      
            Scenes.showArrowForMenuItem()
          } 
        })     
      }

      function menuItem_3Anime(){
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 3000,
        })
        .add({
          targets: Scenes.items.column_corner_right_1.item,
          keyframes:[
            {top: 0},
            {left : 10},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_corner_right_2.item,
          keyframes:[
            {top: 0},
            {left : 10},
            {top: 0,left: 0},
          ], 
          complete(){
            setCC("Click on the 'Front Corner' to attach external corner with column.");      
            Scenes.showArrowForMenuItem()
          } 
        })                     
      }

      function menuItem_4Anime(){
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 3000,
        })
        .add({
          targets: Scenes.items.column_corner_front_1.item,
          keyframes:[
            {top: 0},
            {left : 10},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_corner_front_2.item,
          keyframes:[
            {left : 0},
            {top: 10},
            {top: 0,left: 0},
          ], 
          complete(){
            setIsProcessRunning(false);
          }  
        })                     
      }

    


      setCC("Click on the 'Left Corner' to attach left external corner with column.");      
      Scenes.showArrowForMenuItem()

      // onclick
      let contentAdderBtns = getAll(".content-adder-box .btn")
      contentAdderBtns[0].onclick = menuItem_1Anime
      contentAdderBtns[1].onclick = menuItem_2Anime
      contentAdderBtns[2].onclick = menuItem_3Anime
      contentAdderBtns[3].onclick = menuItem_4Anime

      return true;

    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 4",
        "Add wedge pin to connect panel and corner rigidly."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      //! Required Items
      Scenes.items.column_front_panel.set(0,0).zIndex(4)
      Scenes.items.column_front_push_prop_1.set(0,0).zIndex(4)
      Scenes.items.column_front_push_prop_2.set(0,0).zIndex(4)
      Scenes.items.column_front_kicker_brace.set(0,0).zIndex(4)
      Scenes.items.column_front_push_prop_pin_1.set(0,0).zIndex(4)
      Scenes.items.column_front_push_prop_pin_2.set(0,0).zIndex(4)

      Scenes.items.column_left_full.set(0,0).zIndex(2)
      Scenes.items.column_back_full.set(0,0).zIndex(2)
      Scenes.items.column_right_full.set(0,0).zIndex(4)
      
      Scenes.items.column_corner_left_1.set(0,0).zIndex(3)
      Scenes.items.column_corner_left_2.set(0,0).zIndex(3)

      Scenes.items.column_corner_back_1.set(0,0).zIndex(1)
      Scenes.items.column_corner_back_2.set(0,0).zIndex(1)

      Scenes.items.column_corner_right_1.set(0,0).zIndex(3)
      Scenes.items.column_corner_right_2.set(0,0).zIndex(3)

      Scenes.items.column_corner_front_1.set(0,0).zIndex(5)
      Scenes.items.column_corner_front_2.set(0,0).zIndex(5)


      //required elements before animation
      
      Scenes.items.blur_bcg.set(365,130)
      Scenes.items.column_wedge_pin_left_1.set(480+50,-10).zIndex(6)
      Scenes.items.column_wedge_pin_left_2.set(480+50+40,42).zIndex(6)
      Scenes.items.column_wedge_pin_left_3.set(480+50+80,74).zIndex(6)
      Scenes.items.column_wedge_pin_left_4.set(480+50,160).zIndex(6)
      Scenes.items.column_wedge_pin_left_5.set(480+50+40,210).zIndex(6)
      Scenes.items.column_wedge_pin_left_6.set(480+50+80,283).zIndex(6)

      // Scenes.items.column_wedge_pin_right_1.set(20+350,-20).zIndex(6)
      // Scenes.items.column_wedge_pin_right_2.set(20+350+40,35).zIndex(6)
      // Scenes.items.column_wedge_pin_right_3.set(20+350+80,85).zIndex(6)
      // Scenes.items.column_wedge_pin_right_4.set(20+350,155).zIndex(6)
      // Scenes.items.column_wedge_pin_right_5.set(20+350+40,208).zIndex(6)
      // Scenes.items.column_wedge_pin_right_6.set(20+350+80,268).zIndex(6)

      // Scenes.items.column_wedge_pin_front_1.set(420+8,-50).zIndex(6)
      // Scenes.items.column_wedge_pin_front_2.set(420+8+30,20).zIndex(6)
      // Scenes.items.column_wedge_pin_front_3.set(420+8+60,68).zIndex(6)
      // Scenes.items.column_wedge_pin_front_4.set(420+8+90,101).zIndex(6)
      // Scenes.items.column_wedge_pin_front_5.set(420+8+120,173).zIndex(6)
      // Scenes.items.column_wedge_pin_front_6.set(420+8+150,215).zIndex(6)
      // Scenes.items.column_wedge_pin_front_7.set(408+8,-40).zIndex(6)
      // Scenes.items.column_wedge_pin_front_8.set(408+8+30,25).zIndex(6)
      // Scenes.items.column_wedge_pin_front_9.set(408+8+60,80).zIndex(6)
      // Scenes.items.column_wedge_pin_front_10.set(408+8+90,110).zIndex(6)
      // Scenes.items.column_wedge_pin_front_11.set(408+8+120,178).zIndex(6)
      // Scenes.items.column_wedge_pin_front_12.set(408+8+150,235).zIndex(6)
      //! Final Position
      // Scenes.items.column_wedge_pin_left_1.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_left_2.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_left_3.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_left_4.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_left_5.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_left_6.set(0,0).zIndex(6)

      // Scenes.items.column_wedge_pin_right_1.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_right_2.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_right_3.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_right_4.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_right_5.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_right_6.set(0,0).zIndex(6)

      // Scenes.items.column_wedge_pin_front_1.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_2.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_3.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_4.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_5.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_6.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_7.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_8.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_9.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_10.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_11.set(0,0).zIndex(6)
      // Scenes.items.column_wedge_pin_front_12.set(0,0).zIndex(6)

      
      
      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("Left Wedge Pins")
      Scenes.contentAdderAddBtn("Right Wedge Pins")
      Scenes.contentAdderAddBtn("Front Wedge Pins")

      function menuItem_1Anime(){ 
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 3000,
        })
        .add({
          targets: Scenes.items.column_wedge_pin_left_1.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_left_2.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_left_3.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_left_4.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_left_5.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_left_6.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
          complete(){

                  Scenes.items.column_wedge_pin_right_1.set(20+350,-20).zIndex(6)
                  Scenes.items.column_wedge_pin_right_2.set(20+350+40,35).zIndex(6)
                  Scenes.items.column_wedge_pin_right_3.set(20+350+80,85).zIndex(6)
                  Scenes.items.column_wedge_pin_right_4.set(20+350,155).zIndex(6)
                  Scenes.items.column_wedge_pin_right_5.set(20+350+40,208).zIndex(6)
                  Scenes.items.column_wedge_pin_right_6.set(20+350+80,268).zIndex(6)
            setCC("Click on the 'Right Wedge Pins' to attach external corner with column.");      
            Scenes.showArrowForMenuItem()
          } 
        })
      }

      function menuItem_2Anime(){
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 3000,
        })
        .add({
          targets: Scenes.items.column_wedge_pin_right_1.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_right_2.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_right_3.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_right_4.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_right_5.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_right_6.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
          complete(){

   
      Scenes.items.column_wedge_pin_front_1.set(420+8,-50).zIndex(6)
      Scenes.items.column_wedge_pin_front_2.set(420+8+30,20).zIndex(6)
      Scenes.items.column_wedge_pin_front_3.set(420+8+60,68).zIndex(6)
      Scenes.items.column_wedge_pin_front_4.set(420+8+90,101).zIndex(6)
      Scenes.items.column_wedge_pin_front_5.set(420+8+120,173).zIndex(6)
      Scenes.items.column_wedge_pin_front_6.set(420+8+150,215).zIndex(6)
      Scenes.items.column_wedge_pin_front_7.set(408+8,-40).zIndex(6)
      Scenes.items.column_wedge_pin_front_8.set(408+8+30,25).zIndex(6)
      Scenes.items.column_wedge_pin_front_9.set(408+8+60,80).zIndex(6)
      Scenes.items.column_wedge_pin_front_10.set(408+8+90,110).zIndex(6)
      Scenes.items.column_wedge_pin_front_11.set(408+8+120,178).zIndex(6)
      Scenes.items.column_wedge_pin_front_12.set(408+8+150,235).zIndex(6)
      setCC("Click on the 'Front Wedge Pins' to attach external corner with column.");      
      Scenes.showArrowForMenuItem()
          } 
        })
      }

      function menuItem_3Anime(){
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 3000,
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_1.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_2.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_3.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_4.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_5.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_6.item,
          keyframes:[
            {top: 5},
            {left : -5},
            {top: 0,left: 0},
          ], 
        }) 
        .add({
          targets: Scenes.items.column_wedge_pin_front_7.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_8.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_9.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_10.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_11.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
        })
        .add({
          targets: Scenes.items.column_wedge_pin_front_12.item,
          keyframes:[
            {top: 5},
            {left : 5},
            {top: 0,left: 0},
          ], 
          complete(){
            setIsProcessRunning(false);
          } 
        })
      }

      
      setCC("Click on the 'Left Wedge Pins' to attach external corner with column.");      
      Scenes.showArrowForMenuItem()

      // onclick
      let contentAdderBtns = getAll(".content-adder-box .btn")
      contentAdderBtns[0].onclick = menuItem_1Anime
      contentAdderBtns[1].onclick = menuItem_2Anime
      contentAdderBtns[2].onclick = menuItem_3Anime

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
      backProgressBar();
      // reset menu item for showArrow
      this.menuItemNumber = 1
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

// stepcalling
Scenes.currentStep = 0
Scenes.next()  
// Scenes.steps[3]()
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
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
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

 