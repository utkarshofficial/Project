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
    

    back_left_aluminimum_beam_1 : new Dom("back_left_aluminimum_beam_1"),
    back_left_aluminimum_beam_2 : new Dom("back_left_aluminimum_beam_2"),
    back_left_aluminimum_beam_3 : new Dom("back_left_aluminimum_beam_3"),
    back_left_aluminimum_beam_4 : new Dom("back_left_aluminimum_beam_4"),
    back_left_back_bfs : new Dom("back_left_back_bfs"),
    back_left_back_sheathing : new Dom("back_left_back_sheathing"),
    back_left_back_timber_beams : new Dom("back_left_back_timber_beams"),
    back_left_front_bfs : new Dom("back_left_front_bfs"),
    back_left_front_sheathing : new Dom("back_left_front_sheathing"),
    back_left_front_timber_beams : new Dom("back_left_front_timber_beams"),
    back_left_stand_1 : new Dom("back_left_stand_1"),
    back_left_stand_1helper : new Dom("back_left_stand_1helper"),
    back_left_stand_2 : new Dom("back_left_stand_2"),
    back_left_stand_2helper : new Dom("back_left_stand_2helper"),
    back_left_stand_3 : new Dom("back_left_stand_3"),
    back_left_stand_3helper : new Dom("back_left_stand_3helper"),
    back_left_timber_beams : new Dom("back_left_timber_beams"),
    back_right_aluminimum_beam_1 : new Dom("back_right_aluminimum_beam_1"),
    back_right_aluminimum_beam_2 : new Dom("back_right_aluminimum_beam_2"),
    back_right_aluminimum_beam_3 : new Dom("back_right_aluminimum_beam_3"),
    back_right_aluminimum_beam_4 : new Dom("back_right_aluminimum_beam_4"),
    back_right_back_bfs : new Dom("back_right_back_bfs"),
    back_right_back_sheathing : new Dom("back_right_back_sheathing"),
    back_right_back_timber_beams : new Dom("back_right_back_timber_beams"),
    back_right_front_bfs : new Dom("back_right_front_bfs"),
    back_right_front_sheathing : new Dom("back_right_front_sheathing"),
    back_right_front_timber_beams : new Dom("back_right_front_timber_beams"),
    back_right_stand_1 : new Dom("back_right_stand_1"),
    back_right_stand_1helper : new Dom("back_right_stand_1helper"),
    back_right_stand_2 : new Dom("back_right_stand_2"),
    back_right_stand_2helper : new Dom("back_right_stand_2helper"),
    back_right_stand_3 : new Dom("back_right_stand_3"),
    back_right_stand_3helper : new Dom("back_right_stand_3helper"),
    back_right_timber_beams : new Dom("back_right_timber_beams"),
    base_floor : new Dom("base_floor"),
    beam : new Dom("beam"),
    beam_aluminimum : new Dom("beam_aluminimum"),
    beam_aluminimum_flipped : new Dom("beam_aluminimum_flipped"),
    beam_flipped : new Dom("beam_flipped"),
    beam_flipped_small : new Dom("beam_flipped_small"),
    beam_flipped_without_holes : new Dom("beam_flipped_without_holes"),
    beam_small : new Dom("beam_small"),
    beam_without_holes : new Dom("beam_without_holes"),
    bfs_full1 : new Dom("bfs_full1"),
    column1 : new Dom("column1"),
    column2 : new Dom("column2"),
    column_1 : new Dom("column_1"),
    column_1_rods : new Dom("column_1_rods"),
    column_2 : new Dom("column_2"),
    column_2_rods : new Dom("column_2_rods"),
    column_3 : new Dom("column_3"),
    column_3_rods : new Dom("column_3_rods"),
    column_4 : new Dom("column_4"),
    column_4_rods : new Dom("column_4_rods"),
    column_back : new Dom("column_back"),
    column_front : new Dom("column_front"),
    column_left : new Dom("column_left"),
    column_right : new Dom("column_right"),
    ct_prop : new Dom("ct_prop"),
    front_left_aluminimum_beam_1 : new Dom("front_left_aluminimum_beam_1"),
    front_left_aluminimum_beam_2 : new Dom("front_left_aluminimum_beam_2"),
    front_left_aluminimum_beam_3 : new Dom("front_left_aluminimum_beam_3"),
    front_left_aluminimum_beam_4 : new Dom("front_left_aluminimum_beam_4"),
    front_left_back_bfs : new Dom("front_left_back_bfs"),
    front_left_back_sheathing : new Dom("front_left_back_sheathing"),
    front_left_back_timber_beams : new Dom("front_left_back_timber_beams"),
    front_left_front_bfs : new Dom("front_left_front_bfs"),
    front_left_front_sheathing : new Dom("front_left_front_sheathing"),
    front_left_front_timber_beams : new Dom("front_left_front_timber_beams"),
    front_left_stand_1 : new Dom("front_left_stand_1"),
    front_left_stand_1helper : new Dom("front_left_stand_1helper"),
    front_left_stand_2 : new Dom("front_left_stand_2"),
    front_left_stand_2helper : new Dom("front_left_stand_2helper"),
    front_left_stand_3 : new Dom("front_left_stand_3"),
    front_left_stand_3helper : new Dom("front_left_stand_3helper"),
    front_left_stand_4 : new Dom("front_left_stand_4"),
    front_left_stand_4helper : new Dom("front_left_stand_4helper"),
    front_left_stand_5 : new Dom("front_left_stand_5"),
    front_left_stand_5helper : new Dom("front_left_stand_5helper"),
    front_left_stand_6 : new Dom("front_left_stand_6"),
    front_left_stand_6helper : new Dom("front_left_stand_6helper"),
    front_left_timber_beams : new Dom("front_left_timber_beams"),
    front_right_aluminimum_beam_1 : new Dom("front_right_aluminimum_beam_1"),
    front_right_aluminimum_beam_2 : new Dom("front_right_aluminimum_beam_2"),
    front_right_aluminimum_beam_3 : new Dom("front_right_aluminimum_beam_3"),
    front_right_aluminimum_beam_4 : new Dom("front_right_aluminimum_beam_4"),
    front_right_back_bfs_1 : new Dom("front_right_back_bfs_1"),
    front_right_back_bfs_2 : new Dom("front_right_back_bfs_2"),
    front_right_back_bfs_3 : new Dom("front_right_back_bfs_3"),
    front_right_back_bfs_4 : new Dom("front_right_back_bfs_4"),
    front_right_back_sheathing_1 : new Dom("front_right_back_sheathing_1"),
    front_right_back_sheathing_2 : new Dom("front_right_back_sheathing_2"),
    front_right_back_timber_beam_1 : new Dom("front_right_back_timber_beam_1"),
    front_right_back_timber_beam_2 : new Dom("front_right_back_timber_beam_2"),
    front_right_back_timber_beam_3 : new Dom("front_right_back_timber_beam_3"),
    front_right_back_timber_beam_4 : new Dom("front_right_back_timber_beam_4"),
    front_right_bottom_sheathing_1 : new Dom("front_right_bottom_sheathing_1"),
    front_right_bottom_sheathing_2 : new Dom("front_right_bottom_sheathing_2"),
    front_right_ct_prop_1 : new Dom("front_right_ct_prop_1"),
    front_right_ct_prop_2 : new Dom("front_right_ct_prop_2"),
    front_right_ct_prop_3 : new Dom("front_right_ct_prop_3"),
    front_right_ct_prop_4 : new Dom("front_right_ct_prop_4"),
    front_right_ct_prop_5 : new Dom("front_right_ct_prop_5"),
    front_right_ct_prop_6 : new Dom("front_right_ct_prop_6"),
    front_right_fourway_head_1 : new Dom("front_right_fourway_head_1"),
    front_right_fourway_head_1helper : new Dom("front_right_fourway_head_1helper"),
    front_right_fourway_head_2 : new Dom("front_right_fourway_head_2"),
    front_right_fourway_head_2helper : new Dom("front_right_fourway_head_2helper"),
    front_right_fourway_head_3 : new Dom("front_right_fourway_head_3"),
    front_right_fourway_head_3helper : new Dom("front_right_fourway_head_3helper"),
    front_right_fourway_head_4 : new Dom("front_right_fourway_head_4"),
    front_right_fourway_head_4helper : new Dom("front_right_fourway_head_4helper"),
    front_right_fourway_head_5 : new Dom("front_right_fourway_head_5"),
    front_right_fourway_head_5helper : new Dom("front_right_fourway_head_5helper"),
    front_right_fourway_head_6 : new Dom("front_right_fourway_head_6"),
    front_right_fourway_head_6helper : new Dom("front_right_fourway_head_6helper"),
    front_right_front_bfs_1 : new Dom("front_right_front_bfs_1"),
    front_right_front_bfs_2 : new Dom("front_right_front_bfs_2"),
    front_right_front_bfs_3 : new Dom("front_right_front_bfs_3"),
    front_right_front_bfs_4 : new Dom("front_right_front_bfs_4"),
    front_right_front_sheathing_1 : new Dom("front_right_front_sheathing_1"),
    front_right_front_sheathing_2 : new Dom("front_right_front_sheathing_2"),
    front_right_front_timber_beam_1 : new Dom("front_right_front_timber_beam_1"),
    front_right_front_timber_beam_2 : new Dom("front_right_front_timber_beam_2"),
    front_right_front_timber_beam_3 : new Dom("front_right_front_timber_beam_3"),
    front_right_front_timber_beam_4 : new Dom("front_right_front_timber_beam_4"),
    front_right_timber_beams : new Dom("front_right_timber_beams"),
    front_right_timber_beam_1 : new Dom("front_right_timber_beam_1"),
    front_right_timber_beam_2 : new Dom("front_right_timber_beam_2"),
    front_right_timber_beam_3 : new Dom("front_right_timber_beam_3"),
    front_right_timber_beam_4 : new Dom("front_right_timber_beam_4"),
    front_right_timber_beam_5 : new Dom("front_right_timber_beam_5"),
    front_right_timber_beam_6 : new Dom("front_right_timber_beam_6"),
    front_right_timber_beam_7 : new Dom("front_right_timber_beam_7"),
    front_right_timber_beam_8 : new Dom("front_right_timber_beam_8"),
    front_right_timber_beam_9 : new Dom("front_right_timber_beam_9"),
    front_right_tripod_1 : new Dom("front_right_tripod_1"),
    front_right_tripod_2 : new Dom("front_right_tripod_2"),
    front_right_tripod_3 : new Dom("front_right_tripod_3"),
    front_right_tripod_4 : new Dom("front_right_tripod_4"),
    front_right_tripod_5 : new Dom("front_right_tripod_5"),
    front_right_tripod_6 : new Dom("front_right_tripod_6"),
    back_left_bottom_sheathing : new Dom("back_left_bottom_sheathing"),
back_right_bottom_sheathing : new Dom("back_right_bottom_sheathing"),
column_1_only_rods : new Dom("column_1_only_rods"),
column_2_only_rods : new Dom("column_2_only_rods"),
column_3_only_rods : new Dom("column_3_only_rods"),
column_4_only_rods : new Dom("column_4_only_rods"),
front_left_bottom_sheathing : new Dom("front_left_bottom_sheathing"),
front_right_bottom_sheathing : new Dom("front_right_bottom_sheathing"),
slab_aluminium_beam_1 : new Dom("slab_aluminium_beam_1"),
slab_aluminium_beam_2 : new Dom("slab_aluminium_beam_2"),
slab_aluminium_beam_3 : new Dom("slab_aluminium_beam_3"),
slab_aluminium_beam_4 : new Dom("slab_aluminium_beam_4"),
slab_sheathing : new Dom("slab_sheathing"),
slab_stand_1 : new Dom("slab_stand_1"),
slab_stand_2 : new Dom("slab_stand_2"),
slab_stand_3 : new Dom("slab_stand_3"),
slab_stand_4 : new Dom("slab_stand_4"),
slab_stand_5 : new Dom("slab_stand_5"),
slab_stand_6 : new Dom("slab_stand_6"),
slab_stand_helper : new Dom("slab_stand_helper"),
slab_timber_beam_1 : new Dom("slab_timber_beam_1"),
slab_timber_beam_10 : new Dom("slab_timber_beam_10"),
slab_timber_beam_11 : new Dom("slab_timber_beam_11"),
slab_timber_beam_12 : new Dom("slab_timber_beam_12"),
slab_timber_beam_2 : new Dom("slab_timber_beam_2"),
slab_timber_beam_3 : new Dom("slab_timber_beam_3"),
slab_timber_beam_4 : new Dom("slab_timber_beam_4"),
slab_timber_beam_5 : new Dom("slab_timber_beam_5"),
slab_timber_beam_6 : new Dom("slab_timber_beam_6"),
slab_timber_beam_7 : new Dom("slab_timber_beam_7"),
slab_timber_beam_8 : new Dom("slab_timber_beam_8"),
slab_timber_beam_9 : new Dom("slab_timber_beam_9"),
base_floor_helper : new Dom("base_floor_helper"),
base_floor_cutout : new Dom("base_floor_cutout"),
base_floor_helper_for_back : new Dom("base_floor_helper_for_back"),

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
  showArrowForMenuItem(repeat=false){
    if(repeat){
      this.menuItemNumber--;
    }
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
  repeatShowArrowForMenuItem(){
    this.showArrowForMenuItem(true)
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
  experimentNameCertificate: "Beam and Slab Formwork Using Flex System",
  experimentNameIntro: "Beam and Slab Formwork Using Flex System Experiment",
  experimentNameSpeech: "Beam and Slab Formwork Using Flex System",
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
      }

    })
    return true;
    }),
    // (step2 = function () {
    //   // ! fixing the overflow
    //   Scenes.items.anime_main_dom.item.style.overflow = "visible";

    //   // hide
    //   Scenes.items.projectIntro.hide()
    //   Dom.hideAll();
    //   setIsProcessRunning(true);
    //   Dom.setBlinkArrow(-1);
      
    //   Scenes.setStepHeading("Step 2", "Colums step.")

    //   // * Required Elements
    //   Scenes.items.base_floor.set(100,-100).hide()

    //   // Scenes.items.column_1_rods.set(0,0)
    //   // Scenes.items.column_2_rods.set(0,0).zIndex(1)
    //   // Scenes.items.column_3_rods.set(0,0)
    //   // Scenes.items.column_4_rods.set(0,0)
      
    //   // Scenes.items.column_1.set(0,0).zIndex(1)
    //   // Scenes.items.column_2.set(0,0).zIndex(2)
    //   // Scenes.items.column_3.set(0,0).zIndex(1)
    //   // Scenes.items.column_4.set(0,0).zIndex(1)


    //   // ! Final Pos
    //   // Scenes.items.base_floor_cutout.set(0,0)

    //   Scenes.items.base_floor.set(0,0)
    //   Scenes.items.base_floor_helper.set(0,0).zIndex(5)
    //   Scenes.items.base_floor_helper_for_back.set(0,0).zIndex(6)

    //   Scenes.items.column_1_rods.set(0,210)
    //   Scenes.items.column_2_rods.set(0,210).zIndex(2)
    //   Scenes.items.column_3_rods.set(0,210)
    //   Scenes.items.column_4_rods.set(0,210)

    //   Scenes.items.column_back.set(0,410).zIndex(1)
    //   Scenes.items.column_front.set(0,210).zIndex(8)
    //   Scenes.items.column_right.set(0,210).zIndex(1)
    //   Scenes.items.column_left.set(0,210).zIndex(1)

    //   Scenes.items.contentAdderBox.set(null,-50).show("flex")
    //   Scenes.contentAdderAddBtn("Base")
    //   Scenes.contentAdderAddBtn("Bare Rebar")
    //   Scenes.contentAdderAddBtn("Columns")

    //   function basePlateAnime(){ 
    //     Dom.setBlinkArrow(-1)
    //     anime.timeline({
    //       easing: "easeInOutQuad",
    //     })
    //     .add({
    //       targets: Scenes.items.base_floor.item,
    //       begin(){
    //         Scenes.items.base_floor.show();
    //       },  
    //       keyframes:[
    //         {left : 0},
    //         {top: 0},
    //       ],
    //       duration: 3000,
    //       complete(){
    //         setCC("Click on the 'HD Tower' to put it on the base plate.");      
    //         Scenes.showArrowForMenuItem()
    //       }  
    //     })
    //   }

    //   function hdTowerAnime(){
    //     Dom.setBlinkArrow(-1)
    //     anime.timeline({
    //       easing: "easeInOutQuad",
    //       duration: 2000,
    //     })
    //     .add({
    //       targets: Scenes.items.column_1_rods.item,
    //       keyframes:[
    //         {top: 0},
    //       ],
    //       rotate: 0,
    //     })
    //     .add({
    //       targets: Scenes.items.column_4_rods.item,
    //       keyframes:[
    //         {top: 0},
    //       ],
    //       rotate: 0,
    //       complete(){
    //         Scenes.items.base_floor_helper_for_back.hide()
    //       }
    //     })
    //     .add({
    //       targets: Scenes.items.column_3_rods.item,
    //       keyframes:[
    //         {top: 0},
    //       ],
    //       rotate: 0,
    //     })
    //     .add({
    //       targets: Scenes.items.column_2_rods.item,
    //       keyframes:[
    //         {top: 0},
    //       ],
    //       complete(){
    //         setCC("Click on the 'U-Head' to put it on the CT Prop");      
    //         Scenes.showArrowForMenuItem()
    //         Scenes.items.base_floor_helper_for_back.show()
    //         Scenes.items.column_2_rods.set(0,0).zIndex(7)

    //       }  
    //     })        
    //   }

    //   function uHeadAnime(){
    //     Dom.setBlinkArrow(-1)
    //     anime.timeline({
    //       easing: "easeInOutQuad",
    //       duration: 2000,
    //     })
    //     .add({
    //       targets: Scenes.items.column_left.item,
    //       keyframes:[
    //         {top: 3},
    //       ],
    //       rotate: 0,
    //     })
    //     .add({
    //       targets: Scenes.items.column_back.item,
    //       keyframes:[
    //         {top: 3},
    //       ],
    //       rotate: 0,
    //     })
    //     .add({
    //       targets: Scenes.items.column_right.item,
    //       keyframes:[
    //         {top: 3},
    //       ],
    //       rotate: 0,
    //       complete(){
    //         Scenes.items.base_floor_helper_for_back.hide()
    //       }
    //     })
    //     .add({
    //       targets: Scenes.items.column_front.item,
    //       keyframes:[
    //         {top: 3},
    //       ],
    //       complete(){
    //         setIsProcessRunning(false);
    //       }  
    //     })                     
    //   }

    


    //   setCC("Click on the 'Base Plate' to place it in the lab.");      
    //   Scenes.showArrowForMenuItem()

    //   // onclick
    //   let contentAdderBtns = getAll(".content-adder-box .btn")
    //   contentAdderBtns[0].onclick = basePlateAnime
    //   contentAdderBtns[1].onclick = hdTowerAnime
    //   contentAdderBtns[2].onclick = uHeadAnime
    //   // remove all the previous elements
    //   // Dom.hideAll();
    //   return true;  

    // }),
    (step1 = function () {
      setIsProcessRunning(true);

      // todo all previous elements hide
      Scenes.items.projectIntro.hide()
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step 1", "Construct the basic frame to support beam and slab.");
      
      // * Required Elements
      Scenes.items.base_floor.set(0,0)
      
      Scenes.items.column_1.set(0,0).zIndex(2)
      Scenes.items.column_2.set(0,0).zIndex(4)
      Scenes.items.column_3.set(0,0).zIndex(3)
      Scenes.items.column_4.set(0,0)

      Scenes.items.front_right_tripod_1.set(290,-100).zIndex(3).hide()
      Scenes.items.front_right_tripod_2.set(290,-100).zIndex(3).hide()
      Scenes.items.front_right_tripod_3.set(290,-100).zIndex(3).hide()
      Scenes.items.front_right_tripod_4.set(290,-100).zIndex(3).hide()
      Scenes.items.front_right_tripod_5.set(290,-100).zIndex(3).hide()
      Scenes.items.front_right_tripod_6.set(290,-100).zIndex(3).hide()

      Scenes.items.front_right_ct_prop_1.set(300,-30).zIndex(3).hide()
      Scenes.items.front_right_ct_prop_2.set(300,-30).zIndex(3).hide()
      Scenes.items.front_right_ct_prop_3.set(300,-30).zIndex(3).hide()
      Scenes.items.front_right_ct_prop_4.set(300,-30).zIndex(3).hide()
      Scenes.items.front_right_ct_prop_5.set(300,-30).zIndex(3).hide()
      Scenes.items.front_right_ct_prop_6.set(300,-30).zIndex(3).hide()

      Scenes.items.front_right_fourway_head_1.set(300,-30).zIndex(3).hide()
      Scenes.items.front_right_fourway_head_2.set(300,-30).zIndex(3).hide()
      Scenes.items.front_right_fourway_head_3.set(300,-30).zIndex(3).hide()
      Scenes.items.front_right_fourway_head_4.set(300,-30).zIndex(3).hide()
      Scenes.items.front_right_fourway_head_5.set(300,-30).zIndex(3).hide()
      Scenes.items.front_right_fourway_head_6.set(300,-30).zIndex(3).hide()

      // ! Final Position
      // Scenes.items.front_right_tripod_1.set(0,0)
      // Scenes.items.front_right_tripod_2.set(0,0)
      // Scenes.items.front_right_tripod_3.set(0,0)
      // Scenes.items.front_right_tripod_4.set(0,0)
      // Scenes.items.front_right_tripod_5.set(0,0)
      // Scenes.items.front_right_tripod_6.set(0,0)

      // Scenes.items.front_right_ct_prop_1.set(0,0)
      // Scenes.items.front_right_ct_prop_2.set(0,0)
      // Scenes.items.front_right_ct_prop_3.set(0,0)
      // Scenes.items.front_right_ct_prop_4.set(0,0)
      // Scenes.items.front_right_ct_prop_5.set(0,0)
      // Scenes.items.front_right_ct_prop_6.set(0,0)

      // Scenes.items.front_right_fourway_head_1.set(0,0)
      // Scenes.items.front_right_fourway_head_2.set(0,0)
      // Scenes.items.front_right_fourway_head_3.set(0,0)
      // Scenes.items.front_right_fourway_head_4.set(0,0)
      // Scenes.items.front_right_fourway_head_5.set(0,0)
      // Scenes.items.front_right_fourway_head_6.set(0,0)
      
      // for next step
      // Scenes.items.front_right_fourway_head_1.set(0,0)
      // Scenes.items.front_right_fourway_head_2.set(0,0)
      // Scenes.items.front_right_fourway_head_3.set(0,0)
      // Scenes.items.front_right_fourway_head_4.set(0,0)
      // Scenes.items.front_right_fourway_head_5.set(0,0)
      // Scenes.items.front_right_fourway_head_6.set(0,0)

      Scenes.items.front_left_stand_1.set(380,-120).zIndex(2).hide()
      Scenes.items.front_left_stand_2.set(380,-120).zIndex(1).hide()
      Scenes.items.front_left_stand_3.set(380,-120).zIndex(2).hide()
      Scenes.items.front_left_stand_4.set(380,-120).zIndex(1).hide()
      Scenes.items.front_left_stand_5.set(380,-120).zIndex(2).hide()
      Scenes.items.front_left_stand_6.set(380,-120).zIndex(1).hide()
      
      Scenes.items.back_left_stand_1.set(-100,-120).zIndex(1).hide() 
      Scenes.items.back_left_stand_2.set(-100,-120).zIndex(1).hide() 
      Scenes.items.back_left_stand_3.set(-100,-120).zIndex(1).hide()
      
      Scenes.items.back_right_stand_1.set(150,-100).zIndex(1).hide()
      Scenes.items.back_right_stand_2.set(150,-100).zIndex(1).hide()
      Scenes.items.back_right_stand_3.set(150,-100).zIndex(1).hide()

      Scenes.items.contentAdderBox.set(null,-50).show("flex")
      Scenes.contentAdderAddBtn("Tripod Stand")
      Scenes.contentAdderAddBtn("CT Prop")
      Scenes.contentAdderAddBtn("Fourway Head")
      Scenes.contentAdderAddBtn("Repeat")

      let contentAdderBtns = getAll(".content-adder-box .btn")
      


      const horizontalBracingAnime = ()=>{
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.front_right_tripod_1.item,
          begin(){
            Scenes.items.front_right_tripod_1.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_tripod_2.item,
          begin(){
            Scenes.items.front_right_tripod_2.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_tripod_3.item,
          begin(){
            Scenes.items.front_right_tripod_3.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_tripod_4.item,
          begin(){
            Scenes.items.front_right_tripod_4.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_tripod_5.item,
          begin(){
            Scenes.items.front_right_tripod_5.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_tripod_6.item,
          begin(){
            Scenes.items.front_right_tripod_6.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
          complete(){
            Scenes.showArrowForMenuItem()
            setCC("Click on the 'CT Prop' to attach it with tripod stand.")
          }
        })
      }

      const diagonalBracingAnime = ()=>{
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.front_right_ct_prop_1.item,
          begin(){
            Scenes.items.front_right_ct_prop_1.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_ct_prop_2.item,
          begin(){
            Scenes.items.front_right_ct_prop_2.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_ct_prop_3.item,
          begin(){
            Scenes.items.front_right_ct_prop_3.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_ct_prop_4.item,
          begin(){
            Scenes.items.front_right_ct_prop_4.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_ct_prop_5.item,
          begin(){
            Scenes.items.front_right_ct_prop_5.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_ct_prop_6.item,
          begin(){
            Scenes.items.front_right_ct_prop_6.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
          complete(){
            Scenes.showArrowForMenuItem()
            setCC("Click on the Fourway Head' to attach it with CT prop.")
          }
        })
      }

      const boltAnime = ()=>{
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.front_right_fourway_head_1.item,
          begin(){
            Scenes.items.front_right_fourway_head_1.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_fourway_head_2.item,
          begin(){
            Scenes.items.front_right_fourway_head_2.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_fourway_head_3.item,
          begin(){
            Scenes.items.front_right_fourway_head_3.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_fourway_head_4.item,
          begin(){
            Scenes.items.front_right_fourway_head_4.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_fourway_head_5.item,
          begin(){
            Scenes.items.front_right_fourway_head_5.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_fourway_head_6.item,
          begin(){
            Scenes.items.front_right_fourway_head_6.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
          complete(){
            Scenes.showArrowForMenuItem()
            setCC("Click on the 'Repeat' to repeat the above steps.")
          }
        })
      }

      let repeatCount = 1
      const repeat = ()=>{
        Dom.setBlinkArrow(-1)
        switch(repeatCount){
          case 1:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: Scenes.items.front_left_stand_1.item,
              begin(){
                Scenes.items.front_left_stand_1.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_left_stand_2.item,
              begin(){
                Scenes.items.front_left_stand_2.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_left_stand_3.item,
              begin(){
                Scenes.items.front_left_stand_3.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_left_stand_4.item,
              begin(){
                Scenes.items.front_left_stand_4.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_left_stand_5.item,
              begin(){
                Scenes.items.front_left_stand_5.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_left_stand_6.item,
              begin(){
                Scenes.items.front_left_stand_6.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
              complete(){
                Scenes.repeatShowArrowForMenuItem()
              }
            })
            break;
        
          case 2:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: Scenes.items.back_left_stand_1.item,
              begin(){
                Scenes.items.back_left_stand_1.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.back_left_stand_2.item,
              begin(){
                Scenes.items.back_left_stand_2.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.back_left_stand_3.item,
              begin(){
                Scenes.items.back_left_stand_3.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
              complete(){
                Scenes.repeatShowArrowForMenuItem()
              }
            })
          break

          case 3:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: Scenes.items.back_right_stand_1.item,
              begin(){
                Scenes.items.back_right_stand_1.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.back_right_stand_2.item,
              begin(){
                Scenes.items.back_right_stand_2.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.back_right_stand_3.item,
              begin(){
                Scenes.items.back_right_stand_3.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
              complete(){
                setIsProcessRunning(false);
              }
            })
            break
        
          }
          repeatCount++
      }

      Scenes.showArrowForMenuItem()
      setCC("Click on the 'Tripod Stand' to place the stands.");
      // onclick
      contentAdderBtns[0].onclick = horizontalBracingAnime;
      contentAdderBtns[1].onclick = diagonalBracingAnime;
      contentAdderBtns[2].onclick = boltAnime;
      contentAdderBtns[3].onclick = repeat;

      return true;

    }),
    (step2 = function () {
      Dom.hideAll(); 
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "Step 2",
        "Placing aluminum beam and timber beam on the top of basic frame."
      );

      // ! required item
      Scenes.items.base_floor.set(0,0)
      
      Scenes.items.column_1.set(0,0).zIndex(8)
      Scenes.items.column_2.set(0,0).zIndex(21)
      Scenes.items.column_3.set(0,0).zIndex(11)
      Scenes.items.column_4.set(0,0)

      Scenes.items.front_right_tripod_1.set(0,0).zIndex(3)
      Scenes.items.front_right_tripod_2.set(0,0).zIndex(3)
      Scenes.items.front_right_tripod_3.set(0,0).zIndex(3)
      Scenes.items.front_right_tripod_4.set(0,0).zIndex(3)
      Scenes.items.front_right_tripod_5.set(0,0).zIndex(3)
      Scenes.items.front_right_tripod_6.set(0,0).zIndex(3)

      Scenes.items.front_right_ct_prop_1.set(0,0).zIndex(3)
      Scenes.items.front_right_ct_prop_2.set(0,0).zIndex(3)
      Scenes.items.front_right_ct_prop_3.set(0,0).zIndex(3)
      Scenes.items.front_right_ct_prop_4.set(0,0).zIndex(3)
      Scenes.items.front_right_ct_prop_5.set(0,0).zIndex(3)
      Scenes.items.front_right_ct_prop_6.set(0,0).zIndex(3)

      Scenes.items.front_right_fourway_head_1.set(0,0).zIndex(3)
      Scenes.items.front_right_fourway_head_2.set(0,0).zIndex(3)
      Scenes.items.front_right_fourway_head_3.set(0,0).zIndex(3)
      Scenes.items.front_right_fourway_head_4.set(0,0).zIndex(3)
      Scenes.items.front_right_fourway_head_5.set(0,0).zIndex(3)
      Scenes.items.front_right_fourway_head_6.set(0,0).zIndex(3)

      Scenes.items.front_right_tripod_1.set(0,0)
      Scenes.items.front_right_tripod_2.set(0,0)
      Scenes.items.front_right_tripod_3.set(0,0)
      Scenes.items.front_right_tripod_4.set(0,0)
      Scenes.items.front_right_tripod_5.set(0,0)
      Scenes.items.front_right_tripod_6.set(0,0)

      Scenes.items.front_right_ct_prop_1.set(0,0)
      Scenes.items.front_right_ct_prop_2.set(0,0)
      Scenes.items.front_right_ct_prop_3.set(0,0)
      Scenes.items.front_right_ct_prop_4.set(0,0)
      Scenes.items.front_right_ct_prop_5.set(0,0)
      Scenes.items.front_right_ct_prop_6.set(0,0)

      Scenes.items.front_right_fourway_head_1.set(0,0)
      Scenes.items.front_right_fourway_head_2.set(0,0)
      Scenes.items.front_right_fourway_head_3.set(0,0)
      Scenes.items.front_right_fourway_head_4.set(0,0)
      Scenes.items.front_right_fourway_head_5.set(0,0)
      Scenes.items.front_right_fourway_head_6.set(0,0)
      
      Scenes.items.front_right_fourway_head_1.set(0,0)
      Scenes.items.front_right_fourway_head_2.set(0,0)
      Scenes.items.front_right_fourway_head_3.set(0,0)
      Scenes.items.front_right_fourway_head_4.set(0,0)
      Scenes.items.front_right_fourway_head_5.set(0,0)
      Scenes.items.front_right_fourway_head_6.set(0,0)

      Scenes.items.front_left_stand_1.set(0,0).zIndex(1)
      Scenes.items.front_left_stand_2.set(0,0).zIndex(1)
      Scenes.items.front_left_stand_3.set(0,0).zIndex(2)
      Scenes.items.front_left_stand_4.set(0,0).zIndex(1)
      Scenes.items.front_left_stand_5.set(0,0).zIndex(2)
      Scenes.items.front_left_stand_6.set(0,0).zIndex(1)
      
      Scenes.items.back_left_stand_1.set(-0,0).zIndex(1) 
      Scenes.items.back_left_stand_2.set(-0,0).zIndex(1) 
      Scenes.items.back_left_stand_3.set(-0,0).zIndex(1)
      
      Scenes.items.back_right_stand_1.set(0,0).zIndex(1)
      Scenes.items.back_right_stand_2.set(0,0).zIndex(1)
      Scenes.items.back_right_stand_3.set(0,0).zIndex(1)

      Scenes.items.back_left_stand_1helper.set(0,0).zIndex(8)
      Scenes.items.back_left_stand_2helper.set(0,0).zIndex(8)
      Scenes.items.back_left_stand_3helper.set(0,0).zIndex(8)

      Scenes.items.back_right_stand_1helper.set(0,0).zIndex(8)
      Scenes.items.back_right_stand_2helper.set(0,0).zIndex(8)
      Scenes.items.back_right_stand_3helper.set(0,0).zIndex(8)
      
      Scenes.items.front_left_stand_1helper.set(0,0).zIndex(8)
      // Scenes.items.front_left_stand_2helper.set(0,0).zIndex(8)
      Scenes.items.front_left_stand_3helper.set(0,0).zIndex(8)
      Scenes.items.front_left_stand_4helper.set(0,0).zIndex(8)
      Scenes.items.front_left_stand_5helper.set(0,0).zIndex(8)
      Scenes.items.front_left_stand_6helper.set(0,0).zIndex(8)

      Scenes.items.front_right_fourway_head_1helper.set(0,0).zIndex(8)
      Scenes.items.front_right_fourway_head_2helper.set(0,0).zIndex(8)
      Scenes.items.front_right_fourway_head_3helper.set(0,0).zIndex(8)
      Scenes.items.front_right_fourway_head_4helper.set(0,0).zIndex(8) 
      Scenes.items.front_right_fourway_head_5helper.set(0,0).zIndex(8)
      Scenes.items.front_right_fourway_head_6helper.set(0,0).zIndex(8)

      // aluminium beam
      Scenes.items.front_right_aluminimum_beam_1.set(100,-40).zIndex(6).hide()
      Scenes.items.front_right_aluminimum_beam_2.set(100,-40).zIndex(6).hide()
      Scenes.items.front_right_aluminimum_beam_3.set(100,-40).zIndex(6).hide()
      Scenes.items.front_right_aluminimum_beam_4.set(100,-40).zIndex(8).hide()
      
      Scenes.items.front_left_aluminimum_beam_1.set(-90,-40).zIndex(8).hide()
      Scenes.items.front_left_aluminimum_beam_2.set(-90,-40).zIndex(8).hide()
      Scenes.items.front_left_aluminimum_beam_3.set(-90,-40).zIndex(8).hide()
      Scenes.items.front_left_aluminimum_beam_4.set(-90,-40).zIndex(8).hide()
      
      Scenes.items.back_left_aluminimum_beam_1.set(-100,-40).zIndex(4).hide()
      Scenes.items.back_left_aluminimum_beam_2.set(-100,-40).zIndex(4).hide()
      Scenes.items.back_left_aluminimum_beam_3.set(-100,-40).zIndex(4).hide()
      Scenes.items.back_left_aluminimum_beam_4.set(-100,-40).zIndex(4).hide()
      
      Scenes.items.back_right_aluminimum_beam_1.set(100,-40).zIndex(4).hide()
      Scenes.items.back_right_aluminimum_beam_2.set(100,-40).zIndex(4).hide()
      Scenes.items.back_right_aluminimum_beam_3.set(100,-40).zIndex(4).hide()
      Scenes.items.back_right_aluminimum_beam_4.set(100,-40).zIndex(4).hide()
      
      Scenes.items.front_right_timber_beam_1.set(100,-40).zIndex(20).hide()
      Scenes.items.front_right_timber_beam_2.set(100,-40).zIndex(19).hide()
      Scenes.items.front_right_timber_beam_3.set(100,-40).zIndex(18).hide()
      Scenes.items.front_right_timber_beam_4.set(100,-40).zIndex(17).hide()
      Scenes.items.front_right_timber_beam_5.set(100,-40).zIndex(16).hide()
      Scenes.items.front_right_timber_beam_6.set(100,-40).zIndex(15).hide()
      Scenes.items.front_right_timber_beam_7.set(100,-40).zIndex(14).hide()
      Scenes.items.front_right_timber_beam_8.set(100,-40).zIndex(13).hide()
      Scenes.items.front_right_timber_beam_9.set(100,-40).zIndex(12).hide()

      Scenes.items.front_left_timber_beams.set(100,-40).zIndex(10).hide()
      Scenes.items.back_right_timber_beams.set(100,-40).zIndex(10).hide()
      Scenes.items.back_left_timber_beams.set(100,-40).zIndex(9) .hide() 

      Scenes.items.front_right_bottom_sheathing_1.set(200,-20).zIndex(24).hide()
      Scenes.items.front_right_bottom_sheathing_2.set(200,-20).zIndex(24).hide()

      Scenes.items.front_left_bottom_sheathing.set(-200,-20).zIndex(32).hide()

      Scenes.items.back_left_bottom_sheathing.set(-200,-20).zIndex(27).hide()

      Scenes.items.back_right_bottom_sheathing.set(200,-20).zIndex(27).hide()
      
      Scenes.items.column_1_only_rods.set(0,0).zIndex(33)
      Scenes.items.column_2_only_rods.set(0,0).zIndex(33)
      Scenes.items.column_3_only_rods.set(0,0).zIndex(33)
      Scenes.items.column_4_only_rods.set(0,0)
      
      //! final pos
      // Scenes.items.front_right_aluminimum_beam_1.set(0,0).zIndex(6)
      // Scenes.items.front_right_aluminimum_beam_2.set(0,0).zIndex(6)
      // Scenes.items.front_right_aluminimum_beam_3.set(0,0).zIndex(6)
      // Scenes.items.front_right_aluminimum_beam_4.set(0,0).zIndex(8)
      
      // Scenes.items.front_left_aluminimum_beam_1.set(0,0).zIndex(8)
      // Scenes.items.front_left_aluminimum_beam_2.set(0,0).zIndex(8)
      // Scenes.items.front_left_aluminimum_beam_3.set(0,0).zIndex(8)
      // Scenes.items.front_left_aluminimum_beam_4.set(0,0).zIndex(8)
      
      // Scenes.items.back_left_aluminimum_beam_1.set(0,0).zIndex(4)
      // Scenes.items.back_left_aluminimum_beam_2.set(0,0).zIndex(4)
      // Scenes.items.back_left_aluminimum_beam_3.set(0,0).zIndex(4)
      // Scenes.items.back_left_aluminimum_beam_4.set(0,0).zIndex(4)
      
      // Scenes.items.back_right_aluminimum_beam_1.set(0,0).zIndex(4)
      // Scenes.items.back_right_aluminimum_beam_2.set(0,0).zIndex(4)
      // Scenes.items.back_right_aluminimum_beam_3.set(0,0).zIndex(4)
      // Scenes.items.back_right_aluminimum_beam_4.set(0,0).zIndex(4)
      
      // Scenes.items.front_right_timber_beam_1.set(0,0).zIndex(8)
      // Scenes.items.front_right_timber_beam_2.set(0,0).zIndex(8)
      // Scenes.items.front_right_timber_beam_3.set(0,0).zIndex(8)
      // Scenes.items.front_right_timber_beam_4.set(0,0).zIndex(8)
      // Scenes.items.front_right_timber_beam_5.set(0,0).zIndex(8)
      // Scenes.items.front_right_timber_beam_6.set(0,0).zIndex(8)
      // Scenes.items.front_right_timber_beam_7.set(0,0).zIndex(8)
      // Scenes.items.front_right_timber_beam_8.set(0,0).zIndex(8)
      // Scenes.items.front_right_timber_beam_9.set(0,0).zIndex(8)

      // Scenes.items.front_left_timber_beams.set(0,0).zIndex(8)
      // Scenes.items.back_right_timber_beams.set(0,0).zIndex(7)
      // Scenes.items.back_left_timber_beams.set(0,0).zIndex(9)



      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push()
      Scenes.contentAdderAddBtn("Aluminium Beam")
      Scenes.contentAdderAddBtn("Timber Beam")
      Scenes.contentAdderAddBtn("Sheathing")
      let contentAdderBtns = getAll(".content-adder-box .btn")
        
      function aluminiumBeamAnime(){
        Dom.setBlinkArrow(-1)
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: Scenes.items.front_right_aluminimum_beam_1.item,
              begin(){
                Scenes.items.front_right_aluminimum_beam_1.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_right_aluminimum_beam_2.item,
              begin(){
                Scenes.items.front_right_aluminimum_beam_2.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_right_aluminimum_beam_3.item,
              begin(){
                Scenes.items.front_right_aluminimum_beam_3.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_right_aluminimum_beam_4.item,
              begin(){
                Scenes.items.front_right_aluminimum_beam_4.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
              
            })
            
              .add({
                targets: Scenes.items.front_left_aluminimum_beam_1.item,
                begin(){
                  Scenes.items.front_left_aluminimum_beam_1.show()
                },
                keyframes: [
                  {left: 0},
                  {top: 0},
                ],
              })
              .add({
                targets: Scenes.items.front_left_aluminimum_beam_2.item,
                begin(){
                  Scenes.items.front_left_aluminimum_beam_2.show()
                },
                keyframes: [
                  {left: 0},
                  {top: 0},
                ],
              })
              .add({
                targets: Scenes.items.front_left_aluminimum_beam_3.item,
                begin(){
                  Scenes.items.front_left_aluminimum_beam_3.show()
                },
                keyframes: [
                  {left: 0},
                  {top: 0},
                ],
              })
              .add({
                targets: Scenes.items.front_left_aluminimum_beam_4.item,
                begin(){
                  Scenes.items.front_left_aluminimum_beam_4.show()
                },
                keyframes: [
                  {left: 0},
                  {top: 0},
                ],
              
              })
              
                .add({
                  targets: Scenes.items.back_left_aluminimum_beam_1.item,
                  begin(){
                    Scenes.items.back_left_aluminimum_beam_1.show()
                  },
                  keyframes: [
                    {left: 0},
                    {top: 0},
                  ],
                })
                .add({
                  targets: Scenes.items.back_left_aluminimum_beam_2.item,
                  begin(){
                    Scenes.items.back_left_aluminimum_beam_2.show()
                  },
                  keyframes: [
                    {left: 0},
                    {top: 0},
                  ],
                })
                .add({
                  targets: Scenes.items.back_left_aluminimum_beam_3.item,
                  begin(){
                    Scenes.items.back_left_aluminimum_beam_3.show()
                  },
                  keyframes: [
                    {left: 0},
                    {top: 0},
                  ],
                })
                .add({
                  targets: Scenes.items.back_left_aluminimum_beam_4.item,
                  begin(){
                    Scenes.items.back_left_aluminimum_beam_4.show()
                  },
                  keyframes: [
                    {left: 0},
                    {top: 0},
                  ],
                
                })
                
                  .add({
                    targets: Scenes.items.back_right_aluminimum_beam_1.item,
                    begin(){
                      Scenes.items.back_right_aluminimum_beam_1.show()
                    },
                    keyframes: [
                      {left: 0},
                      {top: 0},
                    ],
                  })
                  .add({
                    targets: Scenes.items.back_right_aluminimum_beam_2.item,
                    begin(){
                      Scenes.items.back_right_aluminimum_beam_2.show()
                    },
                    keyframes: [
                      {left: 0},
                      {top: 0},
                    ],
                  })
                  .add({
                    targets: Scenes.items.back_right_aluminimum_beam_3.item,
                    begin(){
                      Scenes.items.back_right_aluminimum_beam_3.show()
                    },
                    keyframes: [
                      {left: 0},
                      {top: 0},
                    ],
                  })
                  .add({
                    targets: Scenes.items.back_right_aluminimum_beam_4.item,
                    begin(){
                      Scenes.items.back_right_aluminimum_beam_4.show()
                    },
                    keyframes: [
                      {left: 0},
                      {top: 0},
                    ],
                    complete(){
                      Scenes.showArrowForMenuItem()
                      setCC("Click on the 'Timber Beam' to place it on aluminium beams.")
                    }
                  })
      }

      function timberBeamAnime(){
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.front_right_timber_beam_1.item,
          begin(){
            Scenes.items.front_right_timber_beam_1.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_timber_beam_2.item,
          begin(){
            Scenes.items.front_right_timber_beam_2.show()
          },
          keyframes: [
            {left: 0},
            {top: 0}, 
          ],
        })
        
        .add({
          targets: Scenes.items.front_right_timber_beam_3.item,
          begin(){
            Scenes.items.front_right_timber_beam_3.show()
          },
          keyframes: [
            {left: 0},
            {top: 0}
          ],
        })
        .add({
          targets: Scenes.items.front_right_timber_beam_4.item,
          begin(){
            Scenes.items.front_right_timber_beam_4.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
          
        })
        .add({
          targets: Scenes.items.front_right_timber_beam_5.item,
          begin(){
            Scenes.items.front_right_timber_beam_5.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
          
        })
        .add({
          targets: Scenes.items.front_right_timber_beam_6.item,
          begin(){
            Scenes.items.front_right_timber_beam_6.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
          
        })
        .add({
          targets: Scenes.items.front_right_timber_beam_7.item,
          begin(){
            Scenes.items.front_right_timber_beam_7.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
          
        })
        .add({
          targets: Scenes.items.front_right_timber_beam_8.item,
          begin(){
            Scenes.items.front_right_timber_beam_8.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
          
        })
        .add({
          targets: Scenes.items.front_right_timber_beam_9.item,
          begin(){
            Scenes.items.front_right_timber_beam_9.show()
          },
          keyframes: [
            {left: 0},
            {top: 0},
          ],
          
        })
        
          .add({
            targets: Scenes.items.front_left_timber_beams.item,
            begin(){
              Scenes.items.front_left_timber_beams.show()
            },
            keyframes: [
              {left: 0},
              {top: 0},
            ],
          })
          .add({
            targets: Scenes.items.back_left_timber_beams.item,
            begin(){
              Scenes.items.back_left_timber_beams.show()
            },
            keyframes: [
              {left: 0},
              {top: 0},
            ],
          })
          .add({
            targets: Scenes.items.back_right_timber_beams.item,
            begin(){
              Scenes.items.back_right_timber_beams.show()
            },
            keyframes: [
              {left: 0},
              {top: 0},
            ],
            complete(){
              Scenes.showArrowForMenuItem()
              setCC("Click on the 'Sheathing' to place sheathing on timber beams.")
            }
          })
         
      }
     
      function sheathingAnime(){
        Dom.setBlinkArrow(-1)
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: Scenes.items.front_right_bottom_sheathing_1.item,
              begin(){
                Scenes.items.front_right_bottom_sheathing_1.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_right_bottom_sheathing_2.item,
              begin(){
                Scenes.items.front_right_bottom_sheathing_2.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_left_bottom_sheathing.item,
              begin(){
                Scenes.items.front_left_bottom_sheathing.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.back_left_bottom_sheathing.item,
              begin(){
                Scenes.items.back_left_bottom_sheathing.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
            })
            .add({
              targets: Scenes.items.back_right_bottom_sheathing.item,
              begin(){
                Scenes.items.back_right_bottom_sheathing.show()
              },
              keyframes: [
                {left: 0},
                {top: 0},
              ],
                complete(){
                  setIsProcessRunning(false);
                }
              })
      }
     
      Scenes.showArrowForMenuItem()
      setCC("Click on the 'Aluminium Beam' and attach it with basic frame");
      //onclick pipe waler 
      contentAdderBtns[0].onclick = aluminiumBeamAnime;
      contentAdderBtns[1].onclick = timberBeamAnime;
      contentAdderBtns[2].onclick = sheathingAnime;

      return true;

    }),
    (step3 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 3",
        "Construct beam using beam forming support (BFS)."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      //! Required Items
      Scenes.items.base_floor.set(0,0)
      
      Scenes.items.column_1.set(0,0).zIndex(8)
      Scenes.items.column_2.set(0,0).zIndex(21)
      Scenes.items.column_3.set(0,0).zIndex(11)
      Scenes.items.column_4.set(0,0)

      Scenes.items.front_right_tripod_1.set(0,0).zIndex(3)
      Scenes.items.front_right_tripod_2.set(0,0).zIndex(3)
      Scenes.items.front_right_tripod_3.set(0,0).zIndex(3)
      Scenes.items.front_right_tripod_4.set(0,0).zIndex(3)
      Scenes.items.front_right_tripod_5.set(0,0).zIndex(3)
      Scenes.items.front_right_tripod_6.set(0,0).zIndex(3)

      Scenes.items.front_right_ct_prop_1.set(0,0).zIndex(3)
      Scenes.items.front_right_ct_prop_2.set(0,0).zIndex(3)
      Scenes.items.front_right_ct_prop_3.set(0,0).zIndex(3)
      Scenes.items.front_right_ct_prop_4.set(0,0).zIndex(3)
      Scenes.items.front_right_ct_prop_5.set(0,0).zIndex(3)
      Scenes.items.front_right_ct_prop_6.set(0,0).zIndex(3)

      Scenes.items.front_right_fourway_head_1.set(0,0).zIndex(3)
      Scenes.items.front_right_fourway_head_2.set(0,0).zIndex(3)
      Scenes.items.front_right_fourway_head_3.set(0,0).zIndex(3)
      Scenes.items.front_right_fourway_head_4.set(0,0).zIndex(3)
      Scenes.items.front_right_fourway_head_5.set(0,0).zIndex(3)
      Scenes.items.front_right_fourway_head_6.set(0,0).zIndex(3)

      Scenes.items.front_right_tripod_1.set(0,0)
      Scenes.items.front_right_tripod_2.set(0,0)
      Scenes.items.front_right_tripod_3.set(0,0)
      Scenes.items.front_right_tripod_4.set(0,0)
      Scenes.items.front_right_tripod_5.set(0,0)
      Scenes.items.front_right_tripod_6.set(0,0)

      Scenes.items.front_right_ct_prop_1.set(0,0)
      Scenes.items.front_right_ct_prop_2.set(0,0)
      Scenes.items.front_right_ct_prop_3.set(0,0)
      Scenes.items.front_right_ct_prop_4.set(0,0)
      Scenes.items.front_right_ct_prop_5.set(0,0)
      Scenes.items.front_right_ct_prop_6.set(0,0)

      Scenes.items.front_right_fourway_head_1.set(0,0)
      Scenes.items.front_right_fourway_head_2.set(0,0)
      Scenes.items.front_right_fourway_head_3.set(0,0)
      Scenes.items.front_right_fourway_head_4.set(0,0)
      Scenes.items.front_right_fourway_head_5.set(0,0)
      Scenes.items.front_right_fourway_head_6.set(0,0)
      
      Scenes.items.front_right_fourway_head_1.set(0,0)
      Scenes.items.front_right_fourway_head_2.set(0,0)
      Scenes.items.front_right_fourway_head_3.set(0,0)
      Scenes.items.front_right_fourway_head_4.set(0,0)
      Scenes.items.front_right_fourway_head_5.set(0,0)
      Scenes.items.front_right_fourway_head_6.set(0,0)

      Scenes.items.front_left_stand_1.set(0,0).zIndex(1)
      Scenes.items.front_left_stand_2.set(0,0).zIndex(1)
      Scenes.items.front_left_stand_3.set(0,0).zIndex(2)
      Scenes.items.front_left_stand_4.set(0,0).zIndex(1)
      Scenes.items.front_left_stand_5.set(0,0).zIndex(2)
      Scenes.items.front_left_stand_6.set(0,0).zIndex(1)
      
      Scenes.items.back_left_stand_1.set(-0,0).zIndex(1) 
      Scenes.items.back_left_stand_2.set(-0,0).zIndex(1) 
      Scenes.items.back_left_stand_3.set(-0,0).zIndex(1)
      
      Scenes.items.back_right_stand_1.set(0,0).zIndex(1)
      Scenes.items.back_right_stand_2.set(0,0).zIndex(1)
      Scenes.items.back_right_stand_3.set(0,0).zIndex(1)

      Scenes.items.back_left_stand_1helper.set(0,0).zIndex(8)
      Scenes.items.back_left_stand_2helper.set(0,0).zIndex(8)
      Scenes.items.back_left_stand_3helper.set(0,0).zIndex(8)

      Scenes.items.back_right_stand_1helper.set(0,0).zIndex(8)
      Scenes.items.back_right_stand_2helper.set(0,0).zIndex(8)
      Scenes.items.back_right_stand_3helper.set(0,0).zIndex(8)
      
      Scenes.items.front_left_stand_1helper.set(0,0).zIndex(8)
      // Scenes.items.front_left_stand_2helper.set(0,0).zIndex(8)
      Scenes.items.front_left_stand_3helper.set(0,0).zIndex(8)
      Scenes.items.front_left_stand_4helper.set(0,0).zIndex(8)
      Scenes.items.front_left_stand_5helper.set(0,0).zIndex(8)
      Scenes.items.front_left_stand_6helper.set(0,0).zIndex(8)

      Scenes.items.front_right_fourway_head_1helper.set(0,0).zIndex(8)
      Scenes.items.front_right_fourway_head_2helper.set(0,0).zIndex(8)
      Scenes.items.front_right_fourway_head_3helper.set(0,0).zIndex(8)
      Scenes.items.front_right_fourway_head_4helper.set(0,0).zIndex(8) 
      Scenes.items.front_right_fourway_head_5helper.set(0,0).zIndex(8)
      Scenes.items.front_right_fourway_head_6helper.set(0,0).zIndex(8)

      // aluminium beam
      Scenes.items.front_right_aluminimum_beam_1.set(0,0).zIndex(6)
      Scenes.items.front_right_aluminimum_beam_2.set(0,0).zIndex(6)
      Scenes.items.front_right_aluminimum_beam_3.set(0,0).zIndex(6)
      Scenes.items.front_right_aluminimum_beam_4.set(0,0).zIndex(8)
      
      Scenes.items.front_left_aluminimum_beam_1.set(0,0).zIndex(8)
      Scenes.items.front_left_aluminimum_beam_2.set(0,0).zIndex(8)
      Scenes.items.front_left_aluminimum_beam_3.set(0,0).zIndex(8)
      Scenes.items.front_left_aluminimum_beam_4.set(0,0).zIndex(8)
      
      Scenes.items.back_left_aluminimum_beam_1.set(-0,0).zIndex(4)
      Scenes.items.back_left_aluminimum_beam_2.set(-0,0).zIndex(4)
      Scenes.items.back_left_aluminimum_beam_3.set(-0,0).zIndex(4)
      Scenes.items.back_left_aluminimum_beam_4.set(-0,0).zIndex(4)
      
      Scenes.items.back_right_aluminimum_beam_1.set(0,0).zIndex(4)
      Scenes.items.back_right_aluminimum_beam_2.set(0,0).zIndex(4)
      Scenes.items.back_right_aluminimum_beam_3.set(0,0).zIndex(4)
      Scenes.items.back_right_aluminimum_beam_4.set(0,0).zIndex(4)
      
      Scenes.items.front_right_timber_beam_1.set(0,0).zIndex(20)
      Scenes.items.front_right_timber_beam_2.set(0,0).zIndex(19)
      Scenes.items.front_right_timber_beam_3.set(0,0).zIndex(18)
      Scenes.items.front_right_timber_beam_4.set(0,0).zIndex(17)
      Scenes.items.front_right_timber_beam_5.set(0,0).zIndex(16)
      Scenes.items.front_right_timber_beam_6.set(0,0).zIndex(15)
      Scenes.items.front_right_timber_beam_7.set(0,0).zIndex(14)
      Scenes.items.front_right_timber_beam_8.set(0,0).zIndex(13)
      Scenes.items.front_right_timber_beam_9.set(0,0).zIndex(12)

      Scenes.items.front_left_timber_beams.set(0,0).zIndex(10)
      Scenes.items.back_right_timber_beams.set(0,0).zIndex(10)
      Scenes.items.back_left_timber_beams.set(0,0).zIndex(9)  

      Scenes.items.front_right_bottom_sheathing_1.set(0,0).zIndex(31)
      Scenes.items.front_right_bottom_sheathing_2.set(0,0).zIndex(31)

      Scenes.items.front_left_bottom_sheathing.set(0,0).zIndex(32)

      Scenes.items.back_left_bottom_sheathing.set(0,0).zIndex(27)

      Scenes.items.back_right_bottom_sheathing.set(0,0).zIndex(27)
      
      Scenes.items.column_1_only_rods.set(0,0).zIndex(33)
      Scenes.items.column_2_only_rods.set(0,0).zIndex(33)
      Scenes.items.column_3_only_rods.set(0,0).zIndex(33)
      Scenes.items.column_4_only_rods.set(0,0).zIndex(26)

      // ! final pos

      // ! Inner beam
      // * front right beam
      // // let all bottom sheathing zindex 22
      // // Scenes.items.front_right_bottom_sheathing_1.set(0,0).zIndex(24)
      // // Scenes.items.front_right_bottom_sheathing_2.set(0,0).zIndex(24)
      // // Scenes.items.back_right_sheathing.set(0,0).zIndex(22)

      Scenes.items.front_right_back_bfs_1.set(-100,-20).zIndex(30).hide()
      Scenes.items.front_right_back_bfs_2.set(-100,-20).zIndex(30).hide()
      Scenes.items.front_right_back_bfs_3.set(-100,-20).zIndex(30).hide()
      Scenes.items.front_right_back_bfs_4.set(-100,-20).zIndex(30).hide()

      Scenes.items.front_right_back_timber_beam_1.set(250,-70).zIndex(31).hide()
      Scenes.items.front_right_back_timber_beam_2.set(250,-70).zIndex(31).hide()
      Scenes.items.front_right_back_timber_beam_3.set(250,-70).zIndex(31).hide()
      Scenes.items.front_right_back_timber_beam_4.set(250,-70).zIndex(31).hide()

      Scenes.items.front_right_back_sheathing_1.set(250,-70).zIndex(32).hide()
      Scenes.items.front_right_back_sheathing_2.set(250,-70).zIndex(32).hide()

      // // * front left beam
      // // Scenes.items.front_left_bottom_sheathing_1.set(0,0).zIndex(24)
      Scenes.items.front_left_back_bfs.set(100,-20).zIndex(30).hide()
      Scenes.items.front_left_back_timber_beams.set(-250,-70).zIndex(31).hide()
      Scenes.items.front_left_back_sheathing.set(-250,-70).zIndex(32).hide()

      // // * back left beam
      // // Scenes.items.back_left_bottom_sheathing_1.set(0,0).zIndex(24)
      Scenes.items.back_left_front_bfs.set(100,40).zIndex(29).hide()
      Scenes.items.back_left_front_timber_beams.set(250,-90).zIndex(28).hide()
      Scenes.items.back_left_front_sheathing.set(250,-90).zIndex(27).hide()

      // // * back right beam
      // // Scenes.items.back_right_bottom_sheathing_1.set(0,0).zIndex(24)
      Scenes.items.back_right_front_bfs.set(-70,20).zIndex(29).hide()
      Scenes.items.back_right_front_timber_beams.set(250,70).zIndex(28).hide()
      Scenes.items.back_right_front_sheathing.set(250,70).zIndex(27).hide()

      // // ! add new image for iron rods of column so zindex problem will be fixed

      // ! Outer beam

      // * front right beam
      Scenes.items.front_right_front_bfs_1.set(80,40).zIndex(36).hide()
      Scenes.items.front_right_front_bfs_2.set(80,40).zIndex(36).hide()
      Scenes.items.front_right_front_bfs_3.set(80,40).zIndex(36).hide()
      Scenes.items.front_right_front_bfs_4.set(80,40).zIndex(36).hide()

      Scenes.items.front_right_front_timber_beam_1.set(250,-70).zIndex(35).hide()
      Scenes.items.front_right_front_timber_beam_2.set(250,-70).zIndex(35).hide()
      Scenes.items.front_right_front_timber_beam_3.set(250,-70).zIndex(35).hide()
      Scenes.items.front_right_front_timber_beam_4.set(250,-70).zIndex(35).hide()

      Scenes.items.front_right_front_sheathing_1.set(250,-70).zIndex(34).hide()
      Scenes.items.front_right_front_sheathing_2.set(250,-70).zIndex(34).hide()

      // * front left beam
      // Scenes.items.front_left_bottom_sheathing_1.set(0,0).zIndex(24)
      Scenes.items.front_left_front_bfs.set(-50,40).zIndex(36).hide()
      Scenes.items.front_left_front_timber_beams.set(-250,-70).zIndex(35).hide()
      Scenes.items.front_left_front_sheathing.set(-250,-70).zIndex(34).hide()

      //  // * back left beam
      // // Scenes.items.back_left_bottom_sheathing_1.set(0,0).zIndex(24)
      Scenes.items.back_left_back_bfs.set(-80,-30).zIndex(23).hide()
      Scenes.items.back_left_back_timber_beams.set(250,-70).zIndex(24).hide()
      Scenes.items.back_left_back_sheathing.set(250,-70).zIndex(25).hide()

      // // * back right beam
      // // Scenes.items.back_right_bottom_sheathing_1.set(0,0).zIndex(24)
      Scenes.items.back_right_back_bfs.set(70,-30).zIndex(23).hide()
      Scenes.items.back_right_back_timber_beams.set(250,70).zIndex(24).hide()
      Scenes.items.back_right_back_sheathing.set(250,70).zIndex(25).hide()

      

      
      
      // let hammerAnime  =  anime({
      //   targets: Scenes.items.hammer.item,
      //   keyframes: [
      //     {rotateZ: [0, 30]},
      //     {rotateZ: [0, 30]},
      //     {rotateZ: [0, 30]},
      //     {rotateZ: [0, 30]},
      //   ],
      //   autoplay: false,
      //   duration: 3000,
      // })

      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("BFS")
      Scenes.contentAdderAddBtn("Timber Beam")
      Scenes.contentAdderAddBtn("Sheating")
      Scenes.contentAdderAddBtn("Repeat")

      let contentAdderBtns = getAll(".content-adder-box .btn");

      const bfsAnime = ()=>{
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.front_right_back_bfs_1.item,
          begin(){
            Scenes.items.front_right_back_bfs_1.show()
          },
          keyframes: [
            {left: 0,top: 0}
          ],
        })
        .add({
          targets: Scenes.items.front_right_back_bfs_2.item,
          begin(){
            Scenes.items.front_right_back_bfs_2.show()
          },
          keyframes: [
            {left: 0,top: 0}
          ],
        })
        .add({
          targets: Scenes.items.front_right_back_bfs_3.item,
          begin(){
            Scenes.items.front_right_back_bfs_3.show()
          },
          keyframes: [
            {left: 0,top: 0}
          ],
        })
        .add({
          targets: Scenes.items.front_right_back_bfs_4.item,
          begin(){
            Scenes.items.front_right_back_bfs_4.show()
          },
          keyframes: [
            {left: 0,top: 0}
          ],
          complete(){
            Scenes.showArrowForMenuItem()
            setCC("Click on the 'Timber Beam' to add timber beams for creating beam.")
          }
        })
      }

      const timberBeamAnime = ()=>{
        Dom.setBlinkArrow(-1)
        anime.timeline({
          duration: 2000,
          easing: "easeInOutQuad",
        })
        .add({
          targets: Scenes.items.front_right_back_timber_beam_1.item,
          begin(){
            Scenes.items.front_right_back_timber_beam_1.show()
          },
          keyframes: [
            {left: 0,top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_back_timber_beam_2.item,
          begin(){
            Scenes.items.front_right_back_timber_beam_2.show()
          },
          keyframes: [
            {left: 0,top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_back_timber_beam_3.item,
          begin(){
            Scenes.items.front_right_back_timber_beam_3.show()
          },
          keyframes: [
            {left: 0,top: 0},
          ],
        })
        .add({
          targets: Scenes.items.front_right_back_timber_beam_4.item,
          begin(){
            Scenes.items.front_right_back_timber_beam_4.show()
          },
          keyframes: [
            {left: 0,top: 0},
          ],
          complete(){
            Scenes.showArrowForMenuItem()
            setCC("Click on the 'Sheathing' to add sheathing.")
          }
        })
      }
      
      const sheathingAnime = ()=>{
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.front_right_back_sheathing_1.item,
          begin(){
            Scenes.items.front_right_back_sheathing_1.show()
          },
          keyframes: [
            {left: 0,top: 0}
          ],
        })
        .add({
          targets: Scenes.items.front_right_back_sheathing_2.item,
          begin(){
            Scenes.items.front_right_back_sheathing_2.show()
          },
          keyframes: [
            {left: 0,top: 0}
          ],
          complete(){
            Scenes.showArrowForMenuItem()
            setCC("Click on the 'Repeat' to repeat the above steps.")
          }
        })
      }

      let repeatCount = 0
      const repeat = ()=>{
        Dom.setBlinkArrow(-1)
        switch(repeatCount){
          case 0:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: Scenes.items.front_right_front_bfs_1.item,
              begin(){
                Scenes.items.front_right_front_bfs_1.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.front_right_front_bfs_2.item,
              begin(){
                Scenes.items.front_right_front_bfs_2.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.front_right_front_bfs_3.item,
              begin(){
                Scenes.items.front_right_front_bfs_3.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.front_right_front_bfs_4.item,
              begin(){
                Scenes.items.front_right_front_bfs_4.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.front_right_front_timber_beam_1.item,
              begin(){
                Scenes.items.front_right_front_timber_beam_1.show()
              },
              keyframes: [
                {left: 0,top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_right_front_timber_beam_2.item,
              begin(){
                Scenes.items.front_right_front_timber_beam_2.show()
              },
              keyframes: [
                {left: 0,top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_right_front_timber_beam_3.item,
              begin(){
                Scenes.items.front_right_front_timber_beam_3.show()
              },
              keyframes: [
                {left: 0,top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_right_front_timber_beam_4.item,
              begin(){
                Scenes.items.front_right_front_timber_beam_4.show()
              },
              keyframes: [
                {left: 0,top: 0},
              ],
            })
            .add({
              targets: Scenes.items.front_right_front_sheathing_1.item,
              begin(){
                Scenes.items.front_right_front_sheathing_1.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.front_right_front_sheathing_2.item,
              begin(){
                Scenes.items.front_right_front_sheathing_2.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
              complete(){
                Scenes.repeatShowArrowForMenuItem()
              }
            })
            break

            case 1:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: Scenes.items.front_left_back_bfs.item,
              begin(){
                Scenes.items.front_left_back_bfs.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.front_left_back_timber_beams.item,
              begin(){
                Scenes.items.front_left_back_timber_beams.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.front_left_back_sheathing.item,
              begin(){
                Scenes.items.front_left_back_sheathing.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.front_left_front_bfs.item,
              begin(){
                Scenes.items.front_left_front_bfs.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.front_left_front_timber_beams.item,
              begin(){
                Scenes.items.front_left_front_timber_beams.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.front_left_front_sheathing.item,
              begin(){
                Scenes.items.front_left_front_sheathing.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
              complete(){
                Scenes.repeatShowArrowForMenuItem()
              }
            })
            break

            case 2:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: Scenes.items.back_left_back_bfs.item,
              begin(){
                Scenes.items.back_left_back_bfs.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.back_left_back_timber_beams.item,
              begin(){
                Scenes.items.back_left_back_timber_beams.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.back_left_back_sheathing.item,
              begin(){
                Scenes.items.back_left_back_sheathing.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.back_left_front_bfs.item,
              begin(){
                Scenes.items.back_left_front_bfs.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.back_left_front_timber_beams.item,
              begin(){
                Scenes.items.back_left_front_timber_beams.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.back_left_front_sheathing.item,
              begin(){
                Scenes.items.back_left_front_sheathing.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
              complete(){
                Scenes.repeatShowArrowForMenuItem()
              }
            })
            break

            case 3:
            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: Scenes.items.back_right_back_bfs.item,
              begin(){
                Scenes.items.back_right_back_bfs.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.back_right_back_timber_beams.item,
              begin(){
                Scenes.items.back_right_back_timber_beams.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.back_right_back_sheathing.item,
              begin(){
                Scenes.items.back_right_back_sheathing.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.back_right_front_bfs.item,
              begin(){
                Scenes.items.back_right_front_bfs.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.back_right_front_timber_beams.item,
              begin(){
                Scenes.items.back_right_front_timber_beams.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
            })
            .add({
              targets: Scenes.items.back_right_front_sheathing.item,
              begin(){
                Scenes.items.back_right_front_sheathing.show()
              },
              keyframes: [
                {left: 0,top: 0}
              ],
              complete(){
                setIsProcessRunning(false);
                // Quiz.loadQuiz()
              }
            })
            break
        }
        repeatCount++
      }
      
      setCC("Click on the 'BFS' to attach BFS with timber beams.");      
      Scenes.showArrowForMenuItem()

    //onclick
    contentAdderBtns[0].onclick = bfsAnime
    contentAdderBtns[1].onclick = timberBeamAnime
    contentAdderBtns[2].onclick = sheathingAnime
    contentAdderBtns[3].onclick = repeat

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
        "Step 4",
        "Construct the slab using CT prop, beam and sheathing."
      )


    // todo Required Items
    Scenes.items.base_floor.set(0,0)
      
    Scenes.items.column_1.set(0,0).zIndex(8)
    Scenes.items.column_2.set(0,0).zIndex(21)
    Scenes.items.column_3.set(0,0).zIndex(11)
    Scenes.items.column_4.set(0,0)

    Scenes.items.front_right_tripod_1.set(0,0).zIndex(3)
    Scenes.items.front_right_tripod_2.set(0,0).zIndex(3)
    Scenes.items.front_right_tripod_3.set(0,0).zIndex(3)
    Scenes.items.front_right_tripod_4.set(0,0).zIndex(3)
    Scenes.items.front_right_tripod_5.set(0,0).zIndex(3)
    Scenes.items.front_right_tripod_6.set(0,0).zIndex(3)

    Scenes.items.front_right_ct_prop_1.set(0,0).zIndex(3)
    Scenes.items.front_right_ct_prop_2.set(0,0).zIndex(3)
    Scenes.items.front_right_ct_prop_3.set(0,0).zIndex(3)
    Scenes.items.front_right_ct_prop_4.set(0,0).zIndex(3)
    Scenes.items.front_right_ct_prop_5.set(0,0).zIndex(3)
    Scenes.items.front_right_ct_prop_6.set(0,0).zIndex(3)

    Scenes.items.front_right_fourway_head_1.set(0,0).zIndex(3)
    Scenes.items.front_right_fourway_head_2.set(0,0).zIndex(3)
    Scenes.items.front_right_fourway_head_3.set(0,0).zIndex(3)
    Scenes.items.front_right_fourway_head_4.set(0,0).zIndex(3)
    Scenes.items.front_right_fourway_head_5.set(0,0).zIndex(3)
    Scenes.items.front_right_fourway_head_6.set(0,0).zIndex(3)

    Scenes.items.front_right_tripod_1.set(0,0)
    Scenes.items.front_right_tripod_2.set(0,0)
    Scenes.items.front_right_tripod_3.set(0,0)
    Scenes.items.front_right_tripod_4.set(0,0)
    Scenes.items.front_right_tripod_5.set(0,0)
    Scenes.items.front_right_tripod_6.set(0,0)

    Scenes.items.front_right_ct_prop_1.set(0,0)
    Scenes.items.front_right_ct_prop_2.set(0,0)
    Scenes.items.front_right_ct_prop_3.set(0,0)
    Scenes.items.front_right_ct_prop_4.set(0,0)
    Scenes.items.front_right_ct_prop_5.set(0,0)
    Scenes.items.front_right_ct_prop_6.set(0,0)

    Scenes.items.front_right_fourway_head_1.set(0,0)
    Scenes.items.front_right_fourway_head_2.set(0,0)
    Scenes.items.front_right_fourway_head_3.set(0,0)
    Scenes.items.front_right_fourway_head_4.set(0,0)
    Scenes.items.front_right_fourway_head_5.set(0,0)
    Scenes.items.front_right_fourway_head_6.set(0,0)
    
    Scenes.items.front_right_fourway_head_1.set(0,0)
    Scenes.items.front_right_fourway_head_2.set(0,0)
    Scenes.items.front_right_fourway_head_3.set(0,0)
    Scenes.items.front_right_fourway_head_4.set(0,0)
    Scenes.items.front_right_fourway_head_5.set(0,0)
    Scenes.items.front_right_fourway_head_6.set(0,0)

    Scenes.items.front_left_stand_1.set(0,0).zIndex(1)
    Scenes.items.front_left_stand_2.set(0,0).zIndex(1)
    Scenes.items.front_left_stand_3.set(0,0).zIndex(2)
    Scenes.items.front_left_stand_4.set(0,0).zIndex(1)
    Scenes.items.front_left_stand_5.set(0,0).zIndex(2)
    Scenes.items.front_left_stand_6.set(0,0).zIndex(1)
    
    Scenes.items.back_left_stand_1.set(-0,0).zIndex(1) 
    Scenes.items.back_left_stand_2.set(-0,0).zIndex(1) 
    Scenes.items.back_left_stand_3.set(-0,0).zIndex(1)
    
    Scenes.items.back_right_stand_1.set(0,0).zIndex(1)
    Scenes.items.back_right_stand_2.set(0,0).zIndex(1)
    Scenes.items.back_right_stand_3.set(0,0).zIndex(1)

    Scenes.items.back_left_stand_1helper.set(0,0).zIndex(8)
    Scenes.items.back_left_stand_2helper.set(0,0).zIndex(8)
    Scenes.items.back_left_stand_3helper.set(0,0).zIndex(8)

    Scenes.items.back_right_stand_1helper.set(0,0).zIndex(8)
    Scenes.items.back_right_stand_2helper.set(0,0).zIndex(8)
    Scenes.items.back_right_stand_3helper.set(0,0).zIndex(8)
    
    Scenes.items.front_left_stand_1helper.set(0,0).zIndex(8)
    // Scenes.items.front_left_stand_2helper.set(0,0).zIndex(8)
    Scenes.items.front_left_stand_3helper.set(0,0).zIndex(8)
    Scenes.items.front_left_stand_4helper.set(0,0).zIndex(8)
    Scenes.items.front_left_stand_5helper.set(0,0).zIndex(8)
    Scenes.items.front_left_stand_6helper.set(0,0).zIndex(8)

    Scenes.items.front_right_fourway_head_1helper.set(0,0).zIndex(8)
    Scenes.items.front_right_fourway_head_2helper.set(0,0).zIndex(8)
    Scenes.items.front_right_fourway_head_3helper.set(0,0).zIndex(8)
    Scenes.items.front_right_fourway_head_4helper.set(0,0).zIndex(8) 
    Scenes.items.front_right_fourway_head_5helper.set(0,0).zIndex(8)
    Scenes.items.front_right_fourway_head_6helper.set(0,0).zIndex(8)

    // aluminium beam
    Scenes.items.front_right_aluminimum_beam_1.set(0,0).zIndex(6)
    Scenes.items.front_right_aluminimum_beam_2.set(0,0).zIndex(6)
    Scenes.items.front_right_aluminimum_beam_3.set(0,0).zIndex(6)
    Scenes.items.front_right_aluminimum_beam_4.set(0,0).zIndex(8)
    
    Scenes.items.front_left_aluminimum_beam_1.set(0,0).zIndex(8)
    Scenes.items.front_left_aluminimum_beam_2.set(0,0).zIndex(8)
    Scenes.items.front_left_aluminimum_beam_3.set(0,0).zIndex(8)
    Scenes.items.front_left_aluminimum_beam_4.set(0,0).zIndex(8)
    
    Scenes.items.back_left_aluminimum_beam_1.set(-0,0).zIndex(4)
    Scenes.items.back_left_aluminimum_beam_2.set(-0,0).zIndex(4)
    Scenes.items.back_left_aluminimum_beam_3.set(-0,0).zIndex(4)
    Scenes.items.back_left_aluminimum_beam_4.set(-0,0).zIndex(4)
    
    Scenes.items.back_right_aluminimum_beam_1.set(0,0).zIndex(4)
    Scenes.items.back_right_aluminimum_beam_2.set(0,0).zIndex(4)
    Scenes.items.back_right_aluminimum_beam_3.set(0,0).zIndex(4)
    Scenes.items.back_right_aluminimum_beam_4.set(0,0).zIndex(4)
    
    Scenes.items.front_right_timber_beam_1.set(0,0).zIndex(20)
    Scenes.items.front_right_timber_beam_2.set(0,0).zIndex(19)
    Scenes.items.front_right_timber_beam_3.set(0,0).zIndex(18)
    Scenes.items.front_right_timber_beam_4.set(0,0).zIndex(17)
    Scenes.items.front_right_timber_beam_5.set(0,0).zIndex(16)
    Scenes.items.front_right_timber_beam_6.set(0,0).zIndex(15)
    Scenes.items.front_right_timber_beam_7.set(0,0).zIndex(14)
    Scenes.items.front_right_timber_beam_8.set(0,0).zIndex(13)
    Scenes.items.front_right_timber_beam_9.set(0,0).zIndex(12)

    Scenes.items.front_left_timber_beams.set(0,0).zIndex(10)
    Scenes.items.back_right_timber_beams.set(0,0).zIndex(10)
    Scenes.items.back_left_timber_beams.set(0,0).zIndex(9)  

    Scenes.items.front_right_bottom_sheathing_1.set(0,0).zIndex(31)
    Scenes.items.front_right_bottom_sheathing_2.set(0,0).zIndex(31)

    Scenes.items.front_left_bottom_sheathing.set(0,0).zIndex(32)

    Scenes.items.back_left_bottom_sheathing.set(0,0).zIndex(27)

    Scenes.items.back_right_bottom_sheathing.set(0,0).zIndex(27)
    
    Scenes.items.column_1_only_rods.set(0,0).zIndex(33)
    Scenes.items.column_2_only_rods.set(0,0).zIndex(33)
    Scenes.items.column_3_only_rods.set(0,0).zIndex(33) 
    Scenes.items.column_4_only_rods.set(0,0).zIndex(26)

    // ! Inner beam
    // * front right beam
    // // let all bottom sheathing zindex 22
    // // Scenes.items.front_right_bottom_sheathing_1.set(0,0).zIndex(24)
    // // Scenes.items.front_right_bottom_sheathing_2.set(0,0).zIndex(24)
    // // Scenes.items.back_right_sheathing.set(0,0).zIndex(22)

    Scenes.items.front_right_back_bfs_1.set(0,0).zIndex(30)
    Scenes.items.front_right_back_bfs_2.set(0,0).zIndex(30)
    Scenes.items.front_right_back_bfs_3.set(0,0).zIndex(30)
    Scenes.items.front_right_back_bfs_4.set(0,0).zIndex(30)

    Scenes.items.front_right_back_timber_beam_1.set(0,0).zIndex(31)
    Scenes.items.front_right_back_timber_beam_2.set(0,0).zIndex(31)
    Scenes.items.front_right_back_timber_beam_3.set(0,0).zIndex(31)
    Scenes.items.front_right_back_timber_beam_4.set(0,0).zIndex(31)

    Scenes.items.front_right_back_sheathing_1.set(0,0).zIndex(32)
    Scenes.items.front_right_back_sheathing_2.set(0,0).zIndex(32)

    // // * front left beam
    // // Scenes.items.front_left_bottom_sheathing_1.set(0,0).zIndex(24)
    Scenes.items.front_left_back_bfs.set(0,-0).zIndex(30)
    Scenes.items.front_left_back_timber_beams.set(-0,-0).zIndex(31)
    Scenes.items.front_left_back_sheathing.set(-0,-0).zIndex(32)

    // // * back left beam
    // // Scenes.items.back_left_bottom_sheathing_1.set(0,0).zIndex(24)
    Scenes.items.back_left_front_bfs.set(0,0).zIndex(29)
    Scenes.items.back_left_front_timber_beams.set(0,-0).zIndex(28)
    Scenes.items.back_left_front_sheathing.set(0,-0).zIndex(27)

    // // * back right beam
    // // Scenes.items.back_right_bottom_sheathing_1.set(0,0).zIndex(24)
    Scenes.items.back_right_front_bfs.set(0,0).zIndex(29)
    Scenes.items.back_right_front_timber_beams.set(0,0).zIndex(28)
    Scenes.items.back_right_front_sheathing.set(0,0).zIndex(27)

    // // ! add new image for iron rods of column so zindex problem will be fixed

    // ! Outer beam
    // * front right beam
    Scenes.items.front_right_front_bfs_1.set(0,0).zIndex(36)
    Scenes.items.front_right_front_bfs_2.set(0,0).zIndex(36)
    Scenes.items.front_right_front_bfs_3.set(0,0).zIndex(36)
    Scenes.items.front_right_front_bfs_4.set(0,0).zIndex(36)

    Scenes.items.front_right_front_timber_beam_1.set(0,0).zIndex(35)
    Scenes.items.front_right_front_timber_beam_2.set(0,0).zIndex(35)
    Scenes.items.front_right_front_timber_beam_3.set(0,0).zIndex(35)
    Scenes.items.front_right_front_timber_beam_4.set(0,0).zIndex(35)

    Scenes.items.front_right_front_sheathing_1.set(0,-0).zIndex(34)
    Scenes.items.front_right_front_sheathing_2.set(0,-0).zIndex(34)

    // * front left beam
    // Scenes.items.front_left_bottom_sheathing_1.set(0,0).zIndex(24)
    Scenes.items.front_left_front_bfs.set(0,0).zIndex(36)
    Scenes.items.front_left_front_timber_beams.set(0,-0).zIndex(35)
    Scenes.items.front_left_front_sheathing.set(0,-0).zIndex(34)

    //  // * back left beam
    // // Scenes.items.back_left_bottom_sheathing_1.set(0,0).zIndex(24)
    Scenes.items.back_left_back_bfs.set(0,0).zIndex(23)
    Scenes.items.back_left_back_timber_beams.set(0,0).zIndex(24)
    Scenes.items.back_left_back_sheathing.set(0,0).zIndex(25)

    // // * back right beam
    // // Scenes.items.back_right_bottom_sheathing_1.set(0,0).zIndex(24)
    Scenes.items.back_right_back_bfs.set(0,-0).zIndex(23)
    Scenes.items.back_right_back_timber_beams.set(0,0).zIndex(24)
    Scenes.items.back_right_back_sheathing.set(0,0).zIndex(25)

    // ! final pos
    Scenes.items.slab_stand_1.set(250,150).zIndex(30).hide()
    Scenes.items.slab_stand_2.set(250,150).zIndex(30).hide()
    Scenes.items.slab_stand_3.set(250,150).zIndex(30).hide()
    Scenes.items.slab_stand_4.set(250,150).zIndex(30).hide()
    Scenes.items.slab_stand_5.set(250,150).zIndex(30).hide()
    Scenes.items.slab_stand_6.set(250,150).zIndex(30).hide()
    Scenes.items.slab_stand_helper.set(0,0).zIndex(32).hide()
    
    Scenes.items.slab_aluminium_beam_1.set(-500,-50).zIndex(31).hide()
    Scenes.items.slab_aluminium_beam_2.set(-500,-50).zIndex(31).hide()
    Scenes.items.slab_aluminium_beam_3.set(-500,-50).zIndex(31).hide()
    Scenes.items.slab_aluminium_beam_4.set(-500,-50).zIndex(31).hide()
    
    Scenes.items.slab_timber_beam_1.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_2.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_3.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_4.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_5.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_6.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_7.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_8.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_9.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_10.set(200,-100).zIndex(33).hide()
    Scenes.items.slab_timber_beam_11.set(200,-100).zIndex(33).hide()
    Scenes.items.slab_timber_beam_12.set(200,-100).zIndex(33).hide()
    
    Scenes.items.slab_sheathing.set(-570,-70).zIndex(33).hide()

    
    // // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push()
    
    Scenes.contentAdderAddBtn("CT Prop")
    Scenes.contentAdderAddBtn("Aluminium Beam")
    Scenes.contentAdderAddBtn("Timber Beam")
    Scenes.contentAdderAddBtn("Sheathing")

    let contentAdderBtns = getAll(".content-adder-box .btn")
    
    const standAnime = ()=>{
      Dom.setBlinkArrow(-1)
      anime.timeline({
        easing: "easeInOutQuad",
        duration: 2000,
      })
      .add({
        targets: Scenes.items.slab_stand_1.item,
        begin(){
          Scenes.items.slab_stand_1.show()
        },
        keyframes: [
          {left: 0,top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_stand_2.item,
        begin(){
          Scenes.items.slab_stand_2.show()
        },
        keyframes: [
          {left: 0,top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_stand_3.item,
        begin(){
          Scenes.items.slab_stand_3.show()
        },
        keyframes: [
          {left: 0,top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_stand_4.item,
        begin(){
          Scenes.items.slab_stand_4.show()
        },
        keyframes: [
          {left: 0,top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_stand_5.item,
        begin(){
          Scenes.items.slab_stand_5.show()
        },
        keyframes: [
          {left: 0,top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_stand_6.item,
        begin(){
          Scenes.items.slab_stand_6.show()
        },
        keyframes: [
          {left: 0,top: 0}
        ],
        complete(){
          Scenes.items.slab_stand_helper.show()
          Scenes.showArrowForMenuItem()
          setCC("Click on the 'Aluminium Beam' to place them on CT Props.")
        }
      })
    }

    const aluminiumBeamAnime = ()=>{
      Dom.setBlinkArrow(-1)
      anime.timeline({
        duration: 2000,
        easing: "easeInOutQuad",
      })
      .add({
        targets: Scenes.items.slab_aluminium_beam_1.item,
        begin(){
          Scenes.items.slab_aluminium_beam_1.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0},
        ],
      })
      .add({
        targets: Scenes.items.slab_aluminium_beam_2.item,
        begin(){
          Scenes.items.slab_aluminium_beam_2.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0},
        ],
      })
      .add({
        targets: Scenes.items.slab_aluminium_beam_3.item,
        begin(){
          Scenes.items.slab_aluminium_beam_3.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_aluminium_beam_4.item,
        begin(){
          Scenes.items.slab_aluminium_beam_4.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
        complete(){
          Scenes.showArrowForMenuItem()
          setCC("Click on the 'Timber Beam' to place them on aluminium beams.")
        }
      })
    }
    
    const timberBeamAnime = ()=>{
      Dom.setBlinkArrow(-1)
      anime.timeline({
        easing: "easeInOutQuad",
        duration: 2000,
      })
      .add({
        targets: Scenes.items.slab_timber_beam_1.item,
        begin(){
          Scenes.items.slab_timber_beam_1.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_2.item,
        begin(){
          Scenes.items.slab_timber_beam_2.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_3.item,
        begin(){
          Scenes.items.slab_timber_beam_3.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_4.item,
        begin(){
          Scenes.items.slab_timber_beam_4.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_5.item,
        begin(){
          Scenes.items.slab_timber_beam_5.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_6.item,
        begin(){
          Scenes.items.slab_timber_beam_6.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_7.item,
        begin(){
          Scenes.items.slab_timber_beam_7.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_8.item,
        begin(){
          Scenes.items.slab_timber_beam_8.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_9.item,
        begin(){
          Scenes.items.slab_timber_beam_9.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_10.item,
        begin(){
          Scenes.items.slab_timber_beam_10.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_11.item,
        begin(){
          Scenes.items.slab_timber_beam_11.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
      })
      .add({
        targets: Scenes.items.slab_timber_beam_12.item,
        begin(){
          Scenes.items.slab_timber_beam_12.show()
        },
        keyframes: [
          {left: 0,},
          {top: 0}
        ],
        complete(){
          Scenes.showArrowForMenuItem()
          setCC("Click on the 'Sheathing' to add sheathing for the slab.")
        }
      })
    }

    const sheathingAnime = ()=>{
      Dom.setBlinkArrow(-1)
      anime.timeline({
        easing: "easeInOutQuad",
        duration: 2000,
      })
      .add({
        targets: Scenes.items.slab_sheathing.item,
        begin(){
          Scenes.items.slab_sheathing.show()
          Scenes.items.slab_timber_beam_10.zIndex(32)
          Scenes.items.slab_timber_beam_11.zIndex(32)
          Scenes.items.slab_timber_beam_12.zIndex(32)
        },
        keyframes: [
          {left: 0},
          {top: 0}
        ],
        complete(){
          setIsProcessRunning(false);
          // Quiz.loadQuiz()
        }
      })
    }
    Scenes.showArrowForMenuItem()
    setCC("Click on the 'CT Prop' to plcae the CT Props with tripod stand.")
    //onclick
    contentAdderBtns[0].onclick = standAnime
    contentAdderBtns[1].onclick = aluminiumBeamAnime
    contentAdderBtns[2].onclick = timberBeamAnime
    contentAdderBtns[3].onclick = sheathingAnime

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

 