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
    

    // ! Images starts from here
    
back_wall_full : new Dom("back_wall_full"),
front_connector_1 : new Dom("front_connector_1"),
front_connector_10 : new Dom("front_connector_10"),
front_connector_11 : new Dom("front_connector_11"),
front_connector_12 : new Dom("front_connector_12"),
front_connector_2 : new Dom("front_connector_2"),
front_connector_3 : new Dom("front_connector_3"),
front_connector_4 : new Dom("front_connector_4"),
front_connector_5 : new Dom("front_connector_5"),
front_connector_6 : new Dom("front_connector_6"),
front_connector_7 : new Dom("front_connector_7"),
front_connector_8 : new Dom("front_connector_8"),
front_connector_9 : new Dom("front_connector_9"),
front_connector_nut_1 : new Dom("front_connector_nut_1"),
front_connector_nut_10 : new Dom("front_connector_nut_10"),
front_connector_nut_11 : new Dom("front_connector_nut_11"),
front_connector_nut_12 : new Dom("front_connector_nut_12"),
front_connector_nut_2 : new Dom("front_connector_nut_2"),
front_connector_nut_3 : new Dom("front_connector_nut_3"),
front_connector_nut_4 : new Dom("front_connector_nut_4"),
front_connector_nut_5 : new Dom("front_connector_nut_5"),
front_connector_nut_6 : new Dom("front_connector_nut_6"),
front_connector_nut_7 : new Dom("front_connector_nut_7"),
front_connector_nut_8 : new Dom("front_connector_nut_8"),
front_connector_nut_9 : new Dom("front_connector_nut_9"),
front_ct_prop_1 : new Dom("front_ct_prop_1"),
front_ct_prop_2 : new Dom("front_ct_prop_2"),
front_ct_prop_3 : new Dom("front_ct_prop_3"),
front_ct_prop_4 : new Dom("front_ct_prop_4"),
front_ct_prop_base_1 : new Dom("front_ct_prop_base_1"),
front_ct_prop_base_2 : new Dom("front_ct_prop_base_2"),
front_ct_prop_pin_1 : new Dom("front_ct_prop_pin_1"),
front_ct_prop_pin_2 : new Dom("front_ct_prop_pin_2"),
front_ct_prop_pin_3 : new Dom("front_ct_prop_pin_3"),
front_ct_prop_pin_4 : new Dom("front_ct_prop_pin_4"),
front_panel_1 : new Dom("front_panel_1"),
front_panel_2 : new Dom("front_panel_2"),
front_panel_3 : new Dom("front_panel_3"),
front_panel_4 : new Dom("front_panel_4"),
front_panel_5 : new Dom("front_panel_5"),
front_panel_6 : new Dom("front_panel_6"),
front_panel_7 : new Dom("front_panel_7"),
front_panel_8 : new Dom("front_panel_8"),
front_wedge_pin_1 : new Dom("front_wedge_pin_1"),
front_wedge_pin_10 : new Dom("front_wedge_pin_10"),
front_wedge_pin_11 : new Dom("front_wedge_pin_11"),
front_wedge_pin_12 : new Dom("front_wedge_pin_12"),
front_wedge_pin_13 : new Dom("front_wedge_pin_13"),
front_wedge_pin_14 : new Dom("front_wedge_pin_14"),
front_wedge_pin_2 : new Dom("front_wedge_pin_2"),
front_wedge_pin_3 : new Dom("front_wedge_pin_3"),
front_wedge_pin_4 : new Dom("front_wedge_pin_4"),
front_wedge_pin_5 : new Dom("front_wedge_pin_5"),
front_wedge_pin_6 : new Dom("front_wedge_pin_6"),
front_wedge_pin_7 : new Dom("front_wedge_pin_7"),
front_wedge_pin_8 : new Dom("front_wedge_pin_8"),
front_wedge_pin_9 : new Dom("front_wedge_pin_9"),
left_stop_end : new Dom("left_stop_end"),
left_stop_end_waler_1 : new Dom("left_stop_end_waler_1"),
left_stop_end_waler_1_nut : new Dom("left_stop_end_waler_1_nut"),
left_stop_end_waler_2 : new Dom("left_stop_end_waler_2"),
left_stop_end_waler_2_nut : new Dom("left_stop_end_waler_2_nut"),
panel_back : new Dom("panel_back"),
panel_front : new Dom("panel_front"),
photoscap : new Dom("photoscap"),
right_stop_end_full : new Dom("right_stop_end_full"),
temp2 : new Dom("temp2"),
template_img : new Dom("template_img"),




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

    (step1 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 1",
        "Making one side of the wall."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      //! Required Items
     

      // ! final pos

      // //panels
      // Scenes.items.front_panel_1.set(0,0)
      // Scenes.items.front_panel_2.set(0,0)
      // Scenes.items.front_panel_3.set(0,0)
      // Scenes.items.front_panel_4.set(0,0)
      // Scenes.items.front_panel_5.set(0,0)
      // Scenes.items.front_panel_6.set(0,0)
      // Scenes.items.front_panel_7.set(0,0)
      // Scenes.items.front_panel_8.set(0,0)

      // // wedge pins
      // Scenes.items.front_wedge_pin_1.set(0,0)
      // Scenes.items.front_wedge_pin_2.set(0,0)
      // Scenes.items.front_wedge_pin_3.set(0,0)
      // Scenes.items.front_wedge_pin_4.set(0,0)
      // Scenes.items.front_wedge_pin_5.set(0,0)
      // Scenes.items.front_wedge_pin_6.set(0,0)
      // Scenes.items.front_wedge_pin_7.set(0,0)
      // Scenes.items.front_wedge_pin_8.set(0,0)
      // Scenes.items.front_wedge_pin_9.set(0,0)
      // Scenes.items.front_wedge_pin_10.set(0,0)
      // Scenes.items.front_wedge_pin_11.set(0,0)
      // Scenes.items.front_wedge_pin_12.set(0,0)      
      // Scenes.items.front_wedge_pin_13.set(0,0)
      // Scenes.items.front_wedge_pin_14.set(0,0)

      // //props
      // Scenes.items.front_ct_prop_1.set(0,0).zIndex(1)
      // Scenes.items.front_ct_prop_2.set(0,0).zIndex(1)
      // Scenes.items.front_ct_prop_base_1.set(0,0).zIndex(1)
      // Scenes.items.front_ct_prop_pin_1.set(0,0).zIndex(1)
      // Scenes.items.front_ct_prop_pin_2.set(0,0).zIndex(1)

      
      // Scenes.items.front_ct_prop_3.set(0,0).zIndex(1)
      // Scenes.items.front_ct_prop_4.set(0,0).zIndex(1)
      // Scenes.items.front_ct_prop_base_2.set(0,0).zIndex(1)
      // Scenes.items.front_ct_prop_pin_2.set(0,0).zIndex(1)
      // Scenes.items.front_ct_prop_pin_4.set(0,0).zIndex(1)



      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("Panel")
      Scenes.contentAdderAddBtn("Wedge Pin")
      Scenes.contentAdderAddBtn("Props")
      Scenes.contentAdderAddBtn("Repeat")
      

      //!Final position 
      let internalSoffit = [
        Scenes.items.left_wall_soffit_internal_1.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_2.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_3.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_4.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_5.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_6.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_7.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_8.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_9.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_10.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_11.set(0,0).zIndex(65).hide(),
      ]

      let internalWedgePin = [
        Scenes.items.left_wall_soffit_internal_wedge_pin_1.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_2.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_3.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_4.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_5.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_6.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_7.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_8.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_9.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_10.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_11.set(0,0).zIndex(70).hide(),
      ]

      let menuItemAnimes = [
        // Internal soffit anime
        ()=>{
          let target = Scenes.items.left_wall_panel_soffit_internal_1.set(80,-60).zIndex(65)

          anime({
            targets: target.item,
            keyframes: [
              {
                begin(){
                  // Scenes.items.left_wall_panel_external_croner_1.set(-60,-30)
                },
                duration: 0,
              },
              {left: 0},
              {top: 0}
            ],
            easing: 'easeInOutQuad',
            duration: 2000,
          })
        },
        // Internal wedge pin
        ()=>{
          let target = Scenes.items.left_wall_soffit_internal_wedge_pin_11.set(80,-60).zIndex(70)
          anime({
            targets: target.item,
            keyframes: [
              {
                begin(){
                  // Scenes.items.left_wall_panel_external_1.set(-60,-30)
                },
                duration: 0,
              },
              {left: 0},
              {top: 0}
            ],
            easing: 'easeInOutQuad',
            duration: 2000,
          })
        },
        // repeat anime btn
        ()=>{
          function allAnimeRecursive(idx=0){
            if(idx == internalSoffit.length){
              return
            }
            let defSetL = 80
            let defSetT = -60

            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: internalSoffit[idx].item,
              keyframes: [
                {
                  begin(){
                    internalSoffit[idx].set(defSetL,defSetT)
                  },
                  duration: 0,
                },
                {left: 0},
                {top: 0}
              ],
            })
            .add({
              targets: internalWedgePin[idx].item,
              keyframes: [
                {
                  begin(){
                    internalWedgePin[idx].set(defSetL,defSetT)
                  },
                  duration: 0,
                },
                {top: 0},
                {left: 0},
              ],
              complete(){
                allAnimeRecursive(idx+1)
              }
            })
          }
          allAnimeRecursive()
        },
         // External soffit anime
         ()=>{
          let target = Scenes.items.left_wall_soffit_external.set(80,-60).zIndex(71)
          anime({
            targets: target.item,
            keyframes: [
              {
                begin(){
                  // Scenes.items.left_wall_wedge_pin_external_1.set(-60,-30)
                },
                duration: 0,
              },
              {top: 0},
              {left: 0},
            ],
            easing: 'easeInOutQuad',
            duration: 2000,
          })
        }
      ]

        // Attaching onclick functions with menu
        let contentAdderBtns = getAll(".content-adder-box .btn")
        contentAdderBtns.forEach((menuItem,idx) =>{
          menuItem.onclick = ()=>{
            Dom.setBlinkArrow(-1)
            menuItemAnimes[idx]()
          }
        })
      
      setCC("Click on the 'Sheathing' to add sheathing in the lab.");      
      Dom.setBlinkArrow(true, 720,-35).play();
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
    (step2 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 2",
        "Making one side of the wall."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      //! Required Items from previous steps
      
      //panels
      Scenes.items.front_panel_1.set(0,0)
      Scenes.items.front_panel_2.set(0,0)
      Scenes.items.front_panel_3.set(0,0)
      Scenes.items.front_panel_4.set(0,0)
      Scenes.items.front_panel_5.set(0,0)
      Scenes.items.front_panel_6.set(0,0)
      Scenes.items.front_panel_7.set(0,0)
      Scenes.items.front_panel_8.set(0,0)

      // wedge pins
      Scenes.items.front_wedge_pin_1.set(0,0)
      Scenes.items.front_wedge_pin_2.set(0,0)
      Scenes.items.front_wedge_pin_3.set(0,0)
      Scenes.items.front_wedge_pin_4.set(0,0)
      Scenes.items.front_wedge_pin_5.set(0,0)
      Scenes.items.front_wedge_pin_6.set(0,0)
      Scenes.items.front_wedge_pin_7.set(0,0)
      Scenes.items.front_wedge_pin_8.set(0,0)
      Scenes.items.front_wedge_pin_9.set(0,0)
      Scenes.items.front_wedge_pin_10.set(0,0)
      Scenes.items.front_wedge_pin_11.set(0,0)
      Scenes.items.front_wedge_pin_12.set(0,0)      
      Scenes.items.front_wedge_pin_13.set(0,0)
      Scenes.items.front_wedge_pin_14.set(0,0)

      //props
      Scenes.items.front_ct_prop_1.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_2.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_base_1.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_pin_1.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_pin_2.set(0,0).zIndex(1)

      
      Scenes.items.front_ct_prop_3.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_4.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_base_2.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_pin_2.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_pin_4.set(0,0).zIndex(1)

      // ! final pos

      Scenes.items.front_connector_1.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_1.set(400, 40).zIndex(10)
      Scenes.items.front_connector_2.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_2.set(400, 40).zIndex(10)
      Scenes.items.front_connector_3.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_3.set(400, 40).zIndex(10)
      Scenes.items.front_connector_4.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_4.set(400, 40).zIndex(10)
      Scenes.items.front_connector_5.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_5.set(400, 40).zIndex(10)
      Scenes.items.front_connector_6.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_6.set(400, 40).zIndex(10)
      Scenes.items.front_connector_7.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_7.set(400, 40).zIndex(10)
      Scenes.items.front_connector_8.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_8.set(400, 40).zIndex(10)
      Scenes.items.front_connector_9.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_9.set(400, 40).zIndex(10)
      Scenes.items.front_connector_10.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_10.set(400, 40).zIndex(10)
      Scenes.items.front_connector_11.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_11.set(400, 40).zIndex(10)
      Scenes.items.front_connector_12.set(400, 40).zIndex(10)
      Scenes.items.front_connector_nut_12.set(400, 40).zIndex(10)





      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("Connector")
      Scenes.contentAdderAddBtn("Nut")
      Scenes.contentAdderAddBtn("Repeat")
      

      //!Final position 
      let internalSoffit = [
        Scenes.items.left_wall_soffit_internal_1.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_2.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_3.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_4.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_5.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_6.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_7.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_8.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_9.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_10.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_11.set(0,0).zIndex(65).hide(),
      ]

      let internalWedgePin = [
        Scenes.items.left_wall_soffit_internal_wedge_pin_1.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_2.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_3.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_4.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_5.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_6.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_7.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_8.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_9.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_10.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_11.set(0,0).zIndex(70).hide(),
      ]

      let menuItemAnimes = [
        // Internal soffit anime
        ()=>{
          let target = Scenes.items.left_wall_panel_soffit_internal_1.set(80,-60).zIndex(65)

          anime({
            targets: target.item,
            keyframes: [
              {
                begin(){
                  // Scenes.items.left_wall_panel_external_croner_1.set(-60,-30)
                },
                duration: 0,
              },
              {left: 0},
              {top: 0}
            ],
            easing: 'easeInOutQuad',
            duration: 2000,
          })
        },
        // Internal wedge pin
        ()=>{
          let target = Scenes.items.left_wall_soffit_internal_wedge_pin_11.set(80,-60).zIndex(70)
          anime({
            targets: target.item,
            keyframes: [
              {
                begin(){
                  // Scenes.items.left_wall_panel_external_1.set(-60,-30)
                },
                duration: 0,
              },
              {left: 0},
              {top: 0}
            ],
            easing: 'easeInOutQuad',
            duration: 2000,
          })
        },
        // repeat anime btn
        ()=>{
          function allAnimeRecursive(idx=0){
            if(idx == internalSoffit.length){
              return
            }
            let defSetL = 80
            let defSetT = -60

            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: internalSoffit[idx].item,
              keyframes: [
                {
                  begin(){
                    internalSoffit[idx].set(defSetL,defSetT)
                  },
                  duration: 0,
                },
                {left: 0},
                {top: 0}
              ],
            })
            .add({
              targets: internalWedgePin[idx].item,
              keyframes: [
                {
                  begin(){
                    internalWedgePin[idx].set(defSetL,defSetT)
                  },
                  duration: 0,
                },
                {top: 0},
                {left: 0},
              ],
              complete(){
                allAnimeRecursive(idx+1)
              }
            })
          }
          allAnimeRecursive()
        },
         // External soffit anime
         ()=>{
          let target = Scenes.items.left_wall_soffit_external.set(80,-60).zIndex(71)
          anime({
            targets: target.item,
            keyframes: [
              {
                begin(){
                  // Scenes.items.left_wall_wedge_pin_external_1.set(-60,-30)
                },
                duration: 0,
              },
              {top: 0},
              {left: 0},
            ],
            easing: 'easeInOutQuad',
            duration: 2000,
          })
        }
      ]

        // Attaching onclick functions with menu
        let contentAdderBtns = getAll(".content-adder-box .btn")
        contentAdderBtns.forEach((menuItem,idx) =>{
          menuItem.onclick = ()=>{
            Dom.setBlinkArrow(-1)
            menuItemAnimes[idx]()
          }
        })
      
      setCC("Click on the 'Sheathing' to add sheathing in the lab.");      
      Dom.setBlinkArrow(true, 720,-35).play();
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
    (step3 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 3",
        "Making one side of the wall."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      //! Required Items from previous steps
      
      //panels
      Scenes.items.front_panel_1.set(0,0)
      Scenes.items.front_panel_2.set(0,0)
      Scenes.items.front_panel_3.set(0,0)
      Scenes.items.front_panel_4.set(0,0)
      Scenes.items.front_panel_5.set(0,0)
      Scenes.items.front_panel_6.set(0,0)
      Scenes.items.front_panel_7.set(0,0)
      Scenes.items.front_panel_8.set(0,0)

      // wedge pins
      Scenes.items.front_wedge_pin_1.set(0,0)
      Scenes.items.front_wedge_pin_2.set(0,0)
      Scenes.items.front_wedge_pin_3.set(0,0)
      Scenes.items.front_wedge_pin_4.set(0,0)
      Scenes.items.front_wedge_pin_5.set(0,0)
      Scenes.items.front_wedge_pin_6.set(0,0)
      Scenes.items.front_wedge_pin_7.set(0,0)
      Scenes.items.front_wedge_pin_8.set(0,0)
      Scenes.items.front_wedge_pin_9.set(0,0)
      Scenes.items.front_wedge_pin_10.set(0,0)
      Scenes.items.front_wedge_pin_11.set(0,0)
      Scenes.items.front_wedge_pin_12.set(0,0)      
      Scenes.items.front_wedge_pin_13.set(0,0)
      Scenes.items.front_wedge_pin_14.set(0,0)

      //props
      Scenes.items.front_ct_prop_1.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_2.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_base_1.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_pin_1.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_pin_2.set(0,0).zIndex(1)

      
      Scenes.items.front_ct_prop_3.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_4.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_base_2.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_pin_2.set(0,0).zIndex(1)
      Scenes.items.front_ct_prop_pin_4.set(0,0).zIndex(1)


      Scenes.items.front_connector_1.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_1.set(0, 0).zIndex(2)
      Scenes.items.front_connector_2.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_2.set(0, 0).zIndex(2)
      Scenes.items.front_connector_3.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_3.set(0, 0).zIndex(2)
      Scenes.items.front_connector_4.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_4.set(0, 0).zIndex(2)
      Scenes.items.front_connector_5.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_5.set(0, 0).zIndex(2)
      Scenes.items.front_connector_6.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_6.set(0, 0).zIndex(2)
      Scenes.items.front_connector_7.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_7.set(0, 0).zIndex(2)
      Scenes.items.front_connector_8.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_8.set(0, 0).zIndex(2)
      Scenes.items.front_connector_9.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_9.set(0, 0).zIndex(2)
      Scenes.items.front_connector_10.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_10.set(0, 0).zIndex(2)
      Scenes.items.front_connector_11.set(0, 0).zIndex(2)
      Scenes.items.front_connector_nut_11.set(0, 0).zIndex(2)
      Scenes.items.front_connector_12.set(0, 0).zIndex(3)
      Scenes.items.front_connector_nut_12.set(0, 40).zIndex(3)

      //!final position

      Scenes.items.back_wall_full.set(0,0)

      Scenes.items.left_stop_end.set(0,0)

      Scenes.items.left_stop_end_waler_1.set(0,0)
      Scenes.items.left_stop_end_waler_1_nut.set(0,0)
      
      Scenes.items.left_stop_end_waler_2.set(0,0)
      Scenes.items.left_stop_end_waler_2_nut.set(0,0)


      Scenes.items.right_stop_end_full.set(0,0)






      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("Back Wall")
      Scenes.contentAdderAddBtn("Stop End")
      Scenes.contentAdderAddBtn("Waler")
      Scenes.contentAdderAddBtn("Nut")
      

      //!Final position 
      let internalSoffit = [
        Scenes.items.left_wall_soffit_internal_1.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_2.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_3.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_4.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_5.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_6.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_7.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_8.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_9.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_10.set(0,0).zIndex(65).hide(),
        Scenes.items.left_wall_soffit_internal_11.set(0,0).zIndex(65).hide(),
      ]

      let internalWedgePin = [
        Scenes.items.left_wall_soffit_internal_wedge_pin_1.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_2.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_3.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_4.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_5.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_6.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_7.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_8.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_9.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_10.set(0,0).zIndex(70).hide(),
        Scenes.items.left_wall_soffit_internal_wedge_pin_11.set(0,0).zIndex(70).hide(),
      ]

      let menuItemAnimes = [
        // Internal soffit anime
        ()=>{
          let target = Scenes.items.left_wall_panel_soffit_internal_1.set(80,-60).zIndex(65)

          anime({
            targets: target.item,
            keyframes: [
              {
                begin(){
                  // Scenes.items.left_wall_panel_external_croner_1.set(-60,-30)
                },
                duration: 0,
              },
              {left: 0},
              {top: 0}
            ],
            easing: 'easeInOutQuad',
            duration: 2000,
          })
        },
        // Internal wedge pin
        ()=>{
          let target = Scenes.items.left_wall_soffit_internal_wedge_pin_11.set(80,-60).zIndex(70)
          anime({
            targets: target.item,
            keyframes: [
              {
                begin(){
                  // Scenes.items.left_wall_panel_external_1.set(-60,-30)
                },
                duration: 0,
              },
              {left: 0},
              {top: 0}
            ],
            easing: 'easeInOutQuad',
            duration: 2000,
          })
        },
        // repeat anime btn
        ()=>{
          function allAnimeRecursive(idx=0){
            if(idx == internalSoffit.length){
              return
            }
            let defSetL = 80
            let defSetT = -60

            anime.timeline({
              easing: "easeInOutQuad",
              duration: 2000,
            })
            .add({
              targets: internalSoffit[idx].item,
              keyframes: [
                {
                  begin(){
                    internalSoffit[idx].set(defSetL,defSetT)
                  },
                  duration: 0,
                },
                {left: 0},
                {top: 0}
              ],
            })
            .add({
              targets: internalWedgePin[idx].item,
              keyframes: [
                {
                  begin(){
                    internalWedgePin[idx].set(defSetL,defSetT)
                  },
                  duration: 0,
                },
                {top: 0},
                {left: 0},
              ],
              complete(){
                allAnimeRecursive(idx+1)
              }
            })
          }
          allAnimeRecursive()
        },
         // External soffit anime
         ()=>{
          let target = Scenes.items.left_wall_soffit_external.set(80,-60).zIndex(71)
          anime({
            targets: target.item,
            keyframes: [
              {
                begin(){
                  // Scenes.items.left_wall_wedge_pin_external_1.set(-60,-30)
                },
                duration: 0,
              },
              {top: 0},
              {left: 0},
            ],
            easing: 'easeInOutQuad',
            duration: 2000,
          })
        }
      ]

        // Attaching onclick functions with menu
        let contentAdderBtns = getAll(".content-adder-box .btn")
        contentAdderBtns.forEach((menuItem,idx) =>{
          menuItem.onclick = ()=>{
            Dom.setBlinkArrow(-1)
            menuItemAnimes[idx]()
          }
        })
      
      setCC("Click on the 'Sheathing' to add sheathing in the lab.");      
      Dom.setBlinkArrow(true, 720,-35).play();
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
    (step12 = function () {
      // ! fixing the overflow
      Scenes.items.anime_main_dom.item.style.overflow = "visible";

      // hide
      Scenes.items.projectIntro.hide()
      Dom.hideAll();
      setIsProcessRunning(true);
      Dom.setBlinkArrow(-1);
      
      Scenes.setStepHeading("Step 2", "Colums step.")

      // * Required Elements
      Scenes.items.column_front_panel.set(0,0)
      Scenes.items.column_front_push_prop_1.set(0,0)
      Scenes.items.column_front_push_prop_2.set(0,0)
      Scenes.items.column_front_kicker_brace.set(0,0)

      Scenes.items.column_front_push_prop_pin_1.set(10,10)
      Scenes.items.column_front_push_prop_pin_2.set(0,0)

      // ! Final Pos
      // Scenes.items.base_floor_cutout.set(0,0)

      Scenes.items.contentAdderBox.set(null,-50).show("flex")
      Scenes.contentAdderAddBtn("Form Panel")
      Scenes.contentAdderAddBtn("Brace Kicker")
      Scenes.contentAdderAddBtn("Push Prop")

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
            Dom.setBlinkArrow(true, 705,15).play();
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
            Dom.setBlinkArrow(true, 705,65).play();
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
            Dom.setBlinkArrow(true, 790, 408).play();
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
          }  
        })                     
      }

    


      setCC("Click on the 'Form Panel' to add it in the lab.");      
      Dom.setBlinkArrow(true, 705, -35).play()

      // onclick
      let contentAdderBtns = getAll(".content-adder-box .btn")
      contentAdderBtns[0].onclick = menuItem_1Anime
      contentAdderBtns[1].onclick = menuItem_2Anime
      contentAdderBtns[2].onclick = menuItem_3Anime
      // remove all the previous elements
      // Dom.hideAll();
      return true;  

    }),
    (step31 = function () {
      setIsProcessRunning(true);

      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step 3", "Adding all sides of Column.");
      
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
            Dom.setBlinkArrow(true, 705,15).play();
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
            Dom.setBlinkArrow(true, 705,15).play();
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
            Dom.setBlinkArrow(true, 790, 408).play();
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
          }  
        })                     
      }

    


      setCC("Click on the 'Left Side' to attach left side of column.");      
      Dom.setBlinkArrow(true, 705, -35).play()

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
        "Step 4",
        "Placing external corner in column all sides."
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
      
      //! final pos
      Scenes.items.column_corner_left_1.set(0,0).zIndex(3)
      Scenes.items.column_corner_left_2.set(0,0).zIndex(3)

      Scenes.items.column_corner_back_1.set(0,0).zIndex(1)
      Scenes.items.column_corner_back_2.set(0,0).zIndex(1)

      Scenes.items.column_corner_right_1.set(0,0).zIndex(3)
      Scenes.items.column_corner_right_2.set(0,0).zIndex(3)

      Scenes.items.column_corner_front_1.set(0,0).zIndex(5)
      Scenes.items.column_corner_front_2.set(0,0).zIndex(5)



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
            Dom.setBlinkArrow(true, 705,15).play();
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
            Dom.setBlinkArrow(true, 705,15).play();
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
            Dom.setBlinkArrow(true, 705,15).play();
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
            Dom.setBlinkArrow(true, 790, 408).play();
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
          }  
        })                     
      }

    


      setCC("Click on the 'Left Corner' to attach left external corner with column.");      
      Dom.setBlinkArrow(true, 705, -35).play()

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
        "Step 5",
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

      //! Final Position
      Scenes.items.column_wedge_pin_left_1.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_left_2.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_left_3.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_left_4.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_left_5.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_left_6.set(0,0).zIndex(6)

      Scenes.items.column_wedge_pin_right_1.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_right_2.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_right_3.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_right_4.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_right_5.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_right_6.set(0,0).zIndex(6)

      Scenes.items.column_wedge_pin_front_1.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_2.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_3.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_4.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_5.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_6.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_7.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_8.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_9.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_10.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_11.set(0,0).zIndex(6)
      Scenes.items.column_wedge_pin_front_12.set(0,0).zIndex(6)

      
      
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
            setCC("Click on the 'Right Wedge Pins' to attach external corner with column.");      
            Dom.setBlinkArrow(true, 705,15).play();
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
            setCC("Click on the 'Front Wedge Pins' to attach external corner with column.");      
            Dom.setBlinkArrow(true, 705,15).play();
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
            Dom.setBlinkArrow(true, 790, 408).play();
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
          } 
        })
      }

      
      setCC("Click on the 'Left Wedge Pins' to attach external corner with column.");      
      Dom.setBlinkArrow(true, 705, -35).play()

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
    (step6 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "Step 6",
        "Placing inner and outer beam with the help of beam forming support (BFS) with extension."
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
    
    Scenes.items.slab_timber_beam_1.set(200,-100).zIndex(31).hide()
    Scenes.items.slab_timber_beam_2.set(200,-100).zIndex(31).hide()
    Scenes.items.slab_timber_beam_3.set(200,-100).zIndex(31).hide()
    Scenes.items.slab_timber_beam_4.set(200,-100).zIndex(31).hide()
    Scenes.items.slab_timber_beam_5.set(200,-100).zIndex(31).hide()
    Scenes.items.slab_timber_beam_6.set(200,-100).zIndex(31).hide()
    Scenes.items.slab_timber_beam_7.set(200,-100).zIndex(31).hide()
    Scenes.items.slab_timber_beam_8.set(200,-100).zIndex(31).hide()
    Scenes.items.slab_timber_beam_9.set(200,-100).zIndex(31).hide()
    Scenes.items.slab_timber_beam_10.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_11.set(200,-100).zIndex(32).hide()
    Scenes.items.slab_timber_beam_12.set(200,-100).zIndex(32).hide()
    
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
          Dom.setBlinkArrow(true, 655, 65).play()
          setCC("Click on the 'Right Beam Bracing' to attach it with HD Towers.")
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
          Dom.setBlinkArrow(true, 655, 65).play()
          setCC("Click on the 'Right Beam Bracing' to attach it with HD Towers.")
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
          Dom.setBlinkArrow(true, 655, 65).play()
          setCC("Click on the 'Right Beam Bracing' to attach it with HD Towers.")
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
        },
        keyframes: [
          {left: 0},
          {top: 0}
        ],
        complete(){
          Dom.setBlinkArrow(true, 790, 408).play();
          setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false);
          // Quiz.loadQuiz()
        }
      })
    }
    setCC("Click on the 'BFS' to attach beam forming support with timber beam.")
    Dom.setBlinkArrow(true,705,-35).play()
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

// stepcalling
Scenes.currentStep = 4
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