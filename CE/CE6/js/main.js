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
    
    aluminium_beam1: new Dom("aluminium_beam1"),
    aluminium_beam2: new Dom("aluminium_beam2"),
    base_plate1: new Dom("base_plate1"),
    base_plate2: new Dom("base_plate2"),
    base_plate3: new Dom("base_plate3"),
    base_plate4: new Dom("base_plate4"),
    beam1: new Dom("beam1"),
    beam2: new Dom("beam2"),
    beam3: new Dom("beam3"),
    beam4: new Dom("beam4"),
    beam5: new Dom("beam5"),
    beam6: new Dom("beam6"),
    beam_left1: new Dom("beam_left1"),
    beam_left2: new Dom("beam_left2"),
    beam_right1: new Dom("beam_right1"),
    beam_right2: new Dom("beam_right2"),
    bfs_extension: new Dom("bfs_extension"),
    bfs_left1: new Dom("bfs_left1"),
    bfs_left2: new Dom("bfs_left2"),
    bfs_left3: new Dom("bfs_left3"),
    bfs_right1: new Dom("bfs_right1"),
    bfs_right2: new Dom("bfs_right2"),
    bfs_right3: new Dom("bfs_right3"),
    brace_1: new Dom("brace_1"),
    brace_2: new Dom("brace_2"),
    brace_back1: new Dom("brace_back1"),
    brace_back2: new Dom("brace_back2"),
    brace_front1: new Dom("brace_front1"),
    brace_front2: new Dom("brace_front2"),
    brace_left1: new Dom("brace_left1"),
    brace_left2: new Dom("brace_left2"),
    brace_right1: new Dom("brace_right1"),
    brace_right2: new Dom("brace_right2"),
    ct_prop1: new Dom("ct_prop1"),
    ct_prop2: new Dom("ct_prop2"),
    ct_prop3: new Dom("ct_prop3"),
    ct_prop4: new Dom("ct_prop4"),
    hammer: new Dom("hammer"),
    nail1: new Dom("nail1"),
    nail2: new Dom("nail2"),
    nail3: new Dom("nail3"),
    nail4: new Dom("nail4"),
    nail_helper: new Dom("nail_helper"),
    nutbtn: new Dom("nut"),
    objective: new Dom("objective"),
    real_basic_frame1: new Dom("real_basic_frame1"),
    real_basic_frame2: new Dom("real_basic_frame2"),
    real_basic_frame3: new Dom("real_basic_frame3"),
    real_basic_frame4: new Dom("real_basic_frame4"),
    real_beam1: new Dom("real_beam1"),
    real_beam2: new Dom("real_beam2"),
    real_bfs_removebg: new Dom("real_bfs_removebg"),
    real_bfs: new Dom("real_bfs"),
    sheathing1: new Dom("sheathing1"),
    sheathing2: new Dom("sheathing2"),
    sheathing3: new Dom("sheathing3"),
    u_head1: new Dom("u_head1"),
    u_head2: new Dom("u_head2"),
    u_head3: new Dom("u_head3"),
    u_head4: new Dom("u_head4"),
    bolt1: new Dom("bolt1"),
    bolt2: new Dom("bolt2"),
    bolt3: new Dom("bolt3"),
    bolt4: new Dom("bolt4"),
    bolt5: new Dom("bolt5"),
    bolt6: new Dom("bolt6"),
    bolt7: new Dom("bolt7"),
    bolt8: new Dom("bolt8"),
    nail_helper_beam: new Dom("nail_helper_beam"),
    bfs_video: new Dom("bfs_video"),
    brace_3: new Dom("brace_3"),
    brace_4: new Dom("brace_4"),
    brace_5: new Dom("brace_5"),
    brace_6: new Dom("brace_6"),
    brace_7: new Dom("brace_7"),
    brace_8: new Dom("brace_8"),
    brace_9: new Dom("brace_9"),
    brace_10: new Dom("brace_10"),
    brace_11: new Dom("brace_11"),
    brace_12: new Dom("brace_12"),
    brace_13: new Dom("brace_13"),
    brace_14: new Dom("brace_14"),
    brace_15: new Dom("brace_15"),
    brace_16: new Dom("brace_16"),
    brace_back_horizontal_1: new Dom("brace_back_horizontal_1"),
    brace_back_horizontal_2: new Dom("brace_back_horizontal_2"),
    brace_back_vertical_1: new Dom("brace_back_vertical_1"),
    brace_back_vertical_2: new Dom("brace_back_vertical_2"),
    brace_front_horizontal_1: new Dom("brace_front_horizontal_1"),
    brace_front_horizontal_2: new Dom("brace_front_horizontal_2"),
    brace_front_vertical_1: new Dom("brace_front_vertical_1"),
    brace_front_vertical_2: new Dom("brace_front_vertical_2"),
    brace_left_horizontal_1: new Dom("brace_left_horizontal_1"),
    brace_left_horizontal_2: new Dom("brace_left_horizontal_2"),
    brace_left_vertical_1: new Dom("brace_left_vertical_1"),
    brace_left_vertical_2: new Dom("brace_left_vertical_2"),
    brace_right_horizontal_1: new Dom("brace_right_horizontal_1"),
    brace_right_horizontal_2: new Dom("brace_right_horizontal_2"),
    brace_right_vertical_1: new Dom("brace_right_vertical_1"),
    brace_right_vertical_2: new Dom("brace_right_vertical_2"),
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
    // (step1 = function () {
    //   setIsProcessRunning(true);
    //   // to hide previous step
    //   Dom.hideAll();
    //   Scenes.items.projectIntro.hide()
    //   Dom.setBlinkArrow(-1);

    //   Scenes.setStepHeading("Step 1", "Marking the area (rectangularly)");
    //   Scenes.items.land.set(0,0,404,950)

    //   Scenes.items.chalk_with_hand.set(140,138,80,70).zIndex(6)
      
    //   Scenes.items.chalk_markings1.set(140,150,6,670).zIndex(5)
    //   Scenes.items.marking_surface1.set(140,150,8,670).zIndex(5)

    //   Scenes.items.chalk_markings2.set(757,200,6,100).rotate(90).zIndex(5)
    //   Scenes.items.marking_surface2.set(757,200,8,100).rotate(90).zIndex(5)

    //   Scenes.items.chalk_markings3.set(140,252,6,670).zIndex(5)
    //   Scenes.items.marking_surface3.set(140,252,8,670).zIndex(5)

    //   Scenes.items.chalk_markings4.set(94,200,6,100).rotate(90).zIndex(4)
    //   Scenes.items.marking_surface4.set(94,200,8,100).rotate(90).zIndex(4)

    //   // Scenes.items.chalk_markings5.set(284,201,6,282.8).rotate(45).zIndex(3)
    //   // Scenes.items.marking_surface5.set(284,201,8,282.8).rotate(45).zIndex(3)

    //   // Scenes.items.chalk_markings6.set(284,201,6,282.8).rotate(-45).zIndex(2)
    //   // Scenes.items.marking_surface6.set(284,201,8,282.8).rotate(-45).zIndex(2)

    //   Scenes.items.tempTitle1.set(815,190).setContent("300 mm").hidden()
    //   Scenes.items.tempTitle2.set(425,260).setContent("2400 mm").hidden()

    //   setCC("Click on the hand to mark the area rectangularly.")
    //   Dom.setBlinkArrow(true,65,130 ).play()
    //   // onclick
    //   Scenes.items.chalk_with_hand.item.onclick = ()=>{
    //     Dom.setBlinkArrow(-1);

    //     anime.timeline({
    //       easing: "easeOutExpo"
    //     })
    //     .add({
    //       begin(){
    //         Scenes.items.anime_main_dom.item.style.overflow = "hidden";
    //       },
    //       targets: [Scenes.items.chalk_with_hand.item,Scenes.items.marking_surface1.item],
    //       translateX: 670,
    //       duration: 3000,
    //     })
    //     .add({
    //       begin(){
    //         setCC("Marking the vertical length of 300mm")
    //       },
    //       targets: [Scenes.items.chalk_with_hand.item],
    //       translateY: 100,
    //       duration: 3000,
    //       complete(){
    //         Scenes.items.tempTitle1.hidden(false)
    //       }
    //     },3000)// marking of right vertical surface
    //     .add({
    //       targets: [Scenes.items.marking_surface2.item],
    //       translateX: 100,
    //       duration: 3000,
    //     },3000)
    //     .add({
    //       begin(){
    //         setCC("Marking the horizontal length of 300mm")
    //       },
    //       targets: [Scenes.items.marking_surface3.item],
    //       translateX: -670,
    //       duration: 3000,
    //       complete(){
    //         Scenes.items.tempTitle2.hidden(false)
    //       }
    //     },6000)
    //     .add({
    //       targets: [Scenes.items.chalk_with_hand.item],
    //       translateX: 0,
    //       duration: 3000,
    //     },6000)
    //     .add({
    //       targets: [Scenes.items.chalk_with_hand.item],
    //       translateY: 0,
    //       duration: 3000,
    //     },9000)// marking of left vertical surface
    //     .add({
    //       targets: [Scenes.items.marking_surface4.item],
    //       top: "-=100",
    //       duration: 3000,
    //       complete(){
    //         Dom.setBlinkArrow(true, 790, 408).play()
    //         // Quiz.loadQuiz()
    //         setCC("Click 'Next' to go to next step")
    //         setIsProcessRunning(false)
    //       }
    //     },9000)
    //     // .add({
    //     //   targets: [Scenes.items.chalk_with_hand.item],
    //     //   left: "+=200",
    //     //   top: "+=200",
    //     //   duration: 3000,
    //     // },12000)
    //     // .add({
    //     //   targets: [Scenes.items.marking_surface5.item],
    //     //   translateX: 282.8,
    //     //   duration: 3000,
    //     // },12000)
    //     // .add({
    //     //   begin(){
    //     //     Scenes.items.chalk_with_hand.set(525,88)
    //     //   },
    //     //   endDelay: 500,
    //     // })
    //     // .add({
    //     //   targets: [Scenes.items.chalk_with_hand.item],
    //     //   translateX: -200.8,
    //     //   translateY: 200.8,
    //     //   duration: 3000,
    //     // },15500)
    //     // .add({
    //     //   targets: [Scenes.items.marking_surface6.item],
    //     //   translateX: -282.8,
    //     //   duration: 3000,
    //     //   complete(){
    //     //     Dom.setBlinkArrow(true, 790, 408).play()
    //     //     // Quiz.loadQuiz()
    //     //     setCC("Click 'Next' to go to next step")
    //     //     setIsProcessRunning(false)
    //     //   }
    //     // },15500)
    //   }
    //   return true
    // }),
    (step2 = function () {
      // ! fixing the overflow
      Scenes.items.anime_main_dom.item.style.overflow = "visible";

      // hide
      Scenes.items.projectIntro.hide()
      Dom.hideAll();
      setIsProcessRunning(true);
      Dom.setBlinkArrow(-1);
      
      Scenes.setStepHeading("Step 2", "Placing HD Towers in the lab.")

      // * Required Elements
      Scenes.items.base_plate1.set(540,-50+20)
      Scenes.items.base_plate2.set(475,12+20)
      Scenes.items.base_plate3.set(560,-126+20)
      Scenes.items.base_plate4.set(487,-60+20)
      
      Scenes.items.ct_prop1.set(300,420).rotate(90)
      Scenes.items.ct_prop2.set(380,370).rotate(90)
      Scenes.items.ct_prop3.set(314,275).rotate(90)
      Scenes.items.ct_prop4.set(246,368).rotate(90)

      Scenes.items.u_head1.set(540,220)
      Scenes.items.u_head2.set(518,148)
      Scenes.items.u_head3.set(520,285)
      Scenes.items.u_head4.set(487,215)

      // ! remove
      // Scenes.items.base_plate1.set(0,0)
      // Scenes.items.base_plate2.set(0,0)
      // Scenes.items.base_plate3.set(0,0)
      // Scenes.items.base_plate4.set(0,0)
      
      // Scenes.items.ct_prop1.set(0,0)
      // Scenes.items.ct_prop2.set(0,0)
      // Scenes.items.ct_prop3.set(0,0)
      // Scenes.items.ct_prop4.set(0,0)

      // Scenes.items.u_head1.set(0,0)
      // Scenes.items.u_head2.set(0,0)
      // Scenes.items.u_head3.set(0,0)
      // Scenes.items.u_head4.set(0,0)


      Scenes.items.contentAdderBox.set(null,-50).show("flex")
      Scenes.contentAdderAddBtn("Base Plate")
      Scenes.contentAdderAddBtn("HD Tower")
      Scenes.contentAdderAddBtn("U-Head")

      
      

      function basePlateAnime(){
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
          
        })
        .add({
          targets: Scenes.items.base_plate1.item,
          left : 0,
          top: 0,
        })
        .add({
          targets: Scenes.items.base_plate2.item,
          left : 0,
          top: 0,
        })
        .add({
          targets: Scenes.items.base_plate3.item,
          left : 0,
          top: 0,
        })
        .add({
          targets: Scenes.items.base_plate4.item,
          left : 0,
          top: 0,
          complete(){
            setCC("Click on the 'HD Tower' to put it on the base plate.");      
            Dom.setBlinkArrow(true, 705,15).play();
          }  
        })
      }

      function hdTowerAnime(){
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.ct_prop1.item,
          left : 0,
          top: 0,
          rotate: 0,
        })
        .add({
          targets: Scenes.items.ct_prop2.item,
          left : 0,
          top: 0,
          rotate: 0,
        })
        .add({
          targets: Scenes.items.ct_prop3.item,
          left : 0,
          top: 0,
          rotate: 0,
        })
        .add({
          targets: Scenes.items.ct_prop4.item,
          left : 0,
          top: 0,
          rotate: 0,
          complete(){
            setCC("Click on the 'U-Head' to put it on the CT Prop");      
            Dom.setBlinkArrow(true, 705,65).play();
          }  
        })        
      }

      function uHeadAnime(){
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.u_head1.item,
          keyframes : [
            {top: 0},
            {left : 0},
          ]             
        })
        .add({
          targets: Scenes.items.u_head2.item,
          keyframes : [
            {top: 0},
            {left : 0},
          ]             
        })
        .add({
          targets: Scenes.items.u_head3.item,
          keyframes : [
            {top: 0},
            {left : 0},
          ]             
        })
        .add({
          targets: Scenes.items.u_head4.item,
          keyframes : [
            {top: 0},
            {left : 0},
          ],
          complete(){
            Dom.setBlinkArrow(true, 790, 408).play();
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
            // Quiz.loadQuiz()
          } 
        })        
      }

    


      setCC("Click on the 'Base Plate' to place it in the lab.");      
      Dom.setBlinkArrow(true, 705, -35).play()

      // onclick
      let contentAdderBtns = getAll(".content-adder-box .btn")
      contentAdderBtns[0].onclick = basePlateAnime
      contentAdderBtns[1].onclick = hdTowerAnime
      contentAdderBtns[2].onclick = uHeadAnime
      // remove all the previous elements
      // Dom.hideAll();
      return true;  

    }),
    (step3 = function () {
      setIsProcessRunning(true);

      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step 3", "Attaching horizontal and diagonal bracing to support HD Tower.");
      
      // Required Elements
      Scenes.items.base_plate1.set(0,0)
      Scenes.items.base_plate2.set(0,0)
      Scenes.items.base_plate3.set(0,0)
      Scenes.items.base_plate4.set(0,0)
      
      Scenes.items.ct_prop1.set(0,0).zIndex(0)
      Scenes.items.ct_prop2.set(0,0)
      Scenes.items.ct_prop3.set(0,0).zIndex(1)
      Scenes.items.ct_prop4.set(0,0).zIndex(2)

      Scenes.items.u_head1.set(0,0)
      Scenes.items.u_head2.set(0,0)
      Scenes.items.u_head3.set(0,0)
      Scenes.items.u_head4.set(0,0)

      Scenes.items.bolt1.set(637,368).zIndex(2)
      Scenes.items.bolt2.set(637+15*1,368).zIndex(2)
      Scenes.items.bolt3.set(637+15*2,368).zIndex(2)
      Scenes.items.bolt4.set(637+15*3,368).zIndex(2)
      Scenes.items.bolt5.set(637+15*4,368).zIndex(2)
      Scenes.items.bolt6.set(637+15*5,368).zIndex(2)
      Scenes.items.bolt7.set(637+15*6,368).zIndex(0)
      Scenes.items.bolt8.set(637+15*7,368).zIndex(0)
     
      //! Final position
      // Scenes.items.brace_back1.set(0,0)
      // Scenes.items.brace_back2.set(0,0)
      // Scenes.items.brace_left1.set(0,0).zIndex(1)
      // Scenes.items.brace_left2.set(0,0).zIndex(1)
      // Scenes.items.brace_right1.set(0,0).zIndex(1)
      // Scenes.items.brace_right2.set(0,0).zIndex(1)
      // Scenes.items.brace_front1.set(0,0).zIndex(2)
      // Scenes.items.brace_front2.set(0,0).zIndex(2)
      
      // Scenes.items.bolt1.set(132,199).rotate(20).zIndex(2)
      // Scenes.items.bolt2.set(138,274).rotate(20).zIndex(2)
      // Scenes.items.bolt3.set(209,272).rotate(-20).zIndex(2)
      // Scenes.items.bolt4.set(209,340).rotate(-20).zIndex(2)
      // Scenes.items.bolt5.set(330,202).rotate(-20).zIndex(2)
      // Scenes.items.bolt6.set(334,273).rotate(-20).zIndex(2)
      // Scenes.items.bolt7.set(258,133).rotate(-120).zIndex(0)
      // Scenes.items.bolt8.set(257,200).rotate(-120).zIndex(0)

      // bracing
      Scenes.items.brace_1.set(540,200+15*1,12) 
      Scenes.items.brace_2.set(540,200+15*2,12) 
      Scenes.items.brace_3.set(540,200+15*3,12) 
      Scenes.items.brace_4.set(540,200+15*4,12) 
      Scenes.items.brace_5.set(540,200+15*5,12) 
      Scenes.items.brace_6.set(540,200+15*6,12) 
      Scenes.items.brace_7.set(540,200+15*7,12) 
      Scenes.items.brace_8.set(540,200+15*8,12) 

      Scenes.items.brace_9 .set(700,200+15*1,12) 
      Scenes.items.brace_10.set(700,200+15*2,12) 
      Scenes.items.brace_11.set(700,200+15*3,12) 
      Scenes.items.brace_12.set(700,200+15*4,12) 
      Scenes.items.brace_13.set(700,200+15*5,12) 
      Scenes.items.brace_14.set(700,200+15*6,12) 
      Scenes.items.brace_15.set(700,200+15*7,12) 
      Scenes.items.brace_16.set(700,200+15*8,12)      
      
      
      
      Scenes.items.contentAdderBox.set(null,-50).show("flex")
      Scenes.contentAdderAddBtn("Horizontal Bracing")
      Scenes.contentAdderAddBtn("Diagonal Bracing")
      Scenes.contentAdderAddBtn("Bolt")

      let contentAdderBtns = getAll(".content-adder-box .btn")
      


      const horizontalBracingAnime = ()=>{
        Dom.setBlinkArrow(-1)
        anime.timeline({
          easing: "easeInOutQuad",
          duration: 2000,
        })
        .add({
          targets: Scenes.items.brace_1.item,
          keyframes: [
            {top: 70},
            {left: 130},
            {top: 230,rotate: -35},
          ],
          complete(){
            Scenes.items.brace_back_horizontal_1.set(0,0);
            Scenes.items.brace_1.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_2.item,
          keyframes: [
            {top: 70},
            {left: 130},
            {top: 155,rotate: -35},
          ],
          complete(){
            Scenes.items.brace_back_horizontal_2.set(0,0);
            Scenes.items.brace_2.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_3.item,
          keyframes: [
            {top: 70},
            {left: 130},
            {top: 310,rotate: 42,width: "-=30"},
          ],
          complete(){
            Scenes.items.brace_left_horizontal_1.set(0,0)
            Scenes.items.brace_3.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_4.item,
          keyframes: [
            {top: 70},
            {left: 130},
            {top: 234,rotate: 40,width: "-=30"},
          ],
          complete(){
            Scenes.items.brace_left_horizontal_2.set(0,0)
            Scenes.items.brace_4.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_5.item,
          keyframes: [
            {top: 70},
            {left: 204},
            {top: 310,rotate: -30},
          ],
          complete(){
            Scenes.items.brace_front_horizontal_1.set(0,0)
            Scenes.items.brace_5.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_6.item,
          keyframes: [
            {top: 70},
            {left: 204},
            {top: 240,rotate: -30},
          ],
          complete(){
            Scenes.items.brace_front_horizontal_2.set(0,0)
            Scenes.items.brace_6.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_7.item,
          keyframes: [
            {top: 70},
            {left: 250},
            {top: 230,rotate: 42,width: "-=30"},
          ],
          complete(){
            Scenes.items.brace_right_horizontal_1.set(0,0)
            Scenes.items.brace_7.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_8.item,
          keyframes: [
            {top: 70},
            {left: 250},
            {top: 160,rotate: 42,width: "-=30"},
          ],
          complete(){
            Scenes.items.brace_right_horizontal_2.set(0,0)
            Scenes.items.brace_8.hide()

            Dom.setBlinkArrow(true, 667, 15).play()
            setCC("Click on the 'Diagonal Bracing' to attach it with HD Towers.")
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
          targets: Scenes.items.brace_9.item,
          keyframes: [
            {top: 70},
            {left: 130},
            {top: 230,rotate: -35},
          ],
          complete(){
            Scenes.items.brace_back_vertical_1.set(0,0);
            Scenes.items.brace_9.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_10.item,
          keyframes: [
            {top: 70},
            {left: 130},
            {top: 155,rotate: -35},
          ],
          complete(){
            Scenes.items.brace_back_vertical_2.set(0,0);
            Scenes.items.brace_10.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_11.item,
          keyframes: [
            {top: 70},
            {left: 130},
            {top: 310,rotate: 42,width: "-=30"},
          ],
          complete(){
            Scenes.items.brace_left_vertical_1.set(0,0)
            Scenes.items.brace_11.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_12.item,
          keyframes: [
            {top: 70},
            {left: 130},
            {top: 234,rotate: 40,width: "-=30"},
          ],
          complete(){
            Scenes.items.brace_left_vertical_2.set(0,0)
            Scenes.items.brace_12.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_13.item,
          keyframes: [
            {top: 70},
            {left: 204},
            {top: 310,rotate: -30},
          ],
          complete(){
            Scenes.items.brace_front_vertical_1.set(0,0)
            Scenes.items.brace_13.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_14.item,
          keyframes: [
            {top: 70},
            {left: 204},
            {top: 240,rotate: -30},
          ],
          complete(){
            Scenes.items.brace_front_vertical_2.set(0,0)
            Scenes.items.brace_14.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_15.item,
          keyframes: [
            {top: 70},
            {left: 250},
            {top: 230,rotate: 42,width: "-=30"},
          ],
          complete(){
            Scenes.items.brace_right_vertical_1.set(0,0)
            Scenes.items.brace_15.hide()
          }
        })
        .add({
          targets: Scenes.items.brace_16.item,
          keyframes: [
            {top: 70},
            {left: 250},
            {top: 160,rotate: -42,width: "-=30"},
          ],
          complete(){
            Scenes.items.brace_right_vertical_2.set(0,0)
            Scenes.items.brace_16.hide()

            Dom.setBlinkArrow(true, 667, 65).play()
            setCC("Click on the 'Bolt' to attach it with bracing.")
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
          targets: Scenes.items.bolt1.item,
          keyframes: [
            {top: 199},
            {left: 132},
            {rotate: 20},
          ],
        })
        .add({
          targets: Scenes.items.bolt2.item,
          keyframes: [
            {top: 274},
            {left: 138},
            {rotate: 20},
          ],
        })
        .add({
          targets: Scenes.items.bolt3.item,
          keyframes: [
            {top: 272},
            {left: 209},
            {rotate: -20},
          ],
        })
        .add({
          targets: Scenes.items.bolt4.item,
          keyframes: [
            {top: 340},
            {left: 209},
            {rotate: -20},
          ],
        })
        .add({
          targets: Scenes.items.bolt5.item,
          keyframes: [
            {top: 202},
            {left: 330},
            {rotate: -20},
          ],
        })
        .add({
          targets: Scenes.items.bolt6.item,
          keyframes: [
            {top: 273},
            {left: 334},
            {rotate: -20},
          ],
        })
        .add({
          targets: Scenes.items.bolt7.item,
          keyframes: [
            {top: 133},
            {left: 258},
            {rotate: -120},
          ],
        })
        .add({
          targets: Scenes.items.bolt8.item,
          keyframes: [
            {top: 200},
            {left: 257},
            {rotate: -120},
          ],
          complete(){
            Dom.setBlinkArrow(true, 790, 408).play();
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
          }
        })
      }

      Dom.setBlinkArrow(true, 667, -35).play();
      setCC("Click on the 'Horizontal Bracing' to attach it with HD Towers.");
      // onclick
      contentAdderBtns[0].onclick = horizontalBracingAnime;
      contentAdderBtns[1].onclick = diagonalBracingAnime;
      contentAdderBtns[2].onclick = boltAnime;

      return true;

    }),
    (step4 = function () {
      Dom.hideAll(); 
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "Step 4",
        "Placing aluminum beam and timber beam on the top of basic frame."
      );

    // ! required item
    Scenes.items.base_plate1.set(0,0)
    Scenes.items.base_plate2.set(0,0)
    Scenes.items.base_plate3.set(0,0)
    Scenes.items.base_plate4.set(0,0)
    
    Scenes.items.ct_prop1.set(0,0).zIndex(0)
    Scenes.items.ct_prop2.set(0,0)
    Scenes.items.ct_prop3.set(0,0)
    Scenes.items.ct_prop4.set(0,0).zIndex(2)

    Scenes.items.u_head1.set(0,0)
    Scenes.items.u_head2.set(0,0)
    Scenes.items.u_head3.set(0,0)
    Scenes.items.u_head4.set(0,0)

    Scenes.items.brace_back1.set(0,0)
    Scenes.items.brace_back2.set(0,0)
    Scenes.items.brace_left1.set(0,0).zIndex(1)
    Scenes.items.brace_left2.set(0,0).zIndex(1)
    Scenes.items.brace_right1.set(0,0).zIndex(1)
    Scenes.items.brace_right2.set(0,0).zIndex(1)
    Scenes.items.brace_front1.set(0,0).zIndex(1)
    Scenes.items.brace_front2.set(0,0).zIndex(1)
    
    Scenes.items.bolt1.set(132,199).rotate(20).zIndex(2)
    Scenes.items.bolt2.set(138,274).rotate(20).zIndex(2)
    Scenes.items.bolt3.set(209,272).rotate(-20).zIndex(2)
    Scenes.items.bolt4.set(209,340).rotate(-20).zIndex(2)
    Scenes.items.bolt5.set(330,202).rotate(-20).zIndex(2)
    Scenes.items.bolt6.set(334,273).rotate(-20).zIndex(2)
    Scenes.items.bolt7.set(258,133).rotate(-120).zIndex(0)
    Scenes.items.bolt8.set(257,200).rotate(-120).zIndex(0)

    Scenes.items.aluminium_beam1.set(300,350).zIndex(4).rotate(30)
    Scenes.items.aluminium_beam2.set(265,290).zIndex(4).rotate(30)
    Scenes.items.beam1.set(510,-20).zIndex(4).rotate(-38.5)
    Scenes.items.beam2.set(520,-15).zIndex(4).rotate(-38.5)
    Scenes.items.beam3.set(530,-10).zIndex(4).rotate(-38.5)
    Scenes.items.beam4.set(540,0).zIndex(4).rotate(-37)
    Scenes.items.beam5.set(550,6).zIndex(4).rotate(-37)
    Scenes.items.beam6.set(560,7).zIndex(4).rotate(-38)

    //! final pos

    // content adder
    Scenes.items.contentAdderBox.set(null, -50).show("flex").push()
    Scenes.contentAdderAddBtn("Aluminium Beam")
    Scenes.contentAdderAddBtn("Timber Beam")
    let contentAdderBtns = getAll(".content-adder-box .btn")
      
    function aluminiumBeamAnime(){
      anime.timeline({
        easing: "easeInOutQuad",
        duration: 2000,
      })
      .add({  
        targets: Scenes.items.aluminium_beam1.item,
        left : 0,
        top: 0,
        rotate: 0,
      })
      .add({
        targets: Scenes.items.aluminium_beam2.item,
        left : 0,
        top: 0,
        rotate: 0,
        complete(){
          setCC("Click on the 'Timber Beam' to add timber beam.");  a    
          Dom.setBlinkArrow(true, 655,15).play();
        }  
      })
    }

    function timberBeamAnime(){
      anime.timeline({
        easing: "easeInOutQuad",
        duration: 2000,
      })
      .add({
        targets: Scenes.items.beam1.item,
        left : 0,
        top: 0,
        rotate: 0,
      })
      .add({
        targets: Scenes.items.beam2.item,
        left : 0,
        top: 0,
        rotate: 0,
      })
      .add({
        targets: Scenes.items.beam3.item,
        left : 0,
        top: 0,
        rotate: 0,
      })
      .add({
        targets: Scenes.items.beam4.item,
        left : 0,
        top: 0,
        rotate: 0,
      })
      .add({
        targets: Scenes.items.beam5.item,
        left : 0,
        top: 0,
        rotate: 0,
      })
      .add({
        targets: Scenes.items.beam6.item,
        left : 0,
        top: 0,
        rotate: 0,
        complete(){
          Dom.setBlinkArrow(true, 790, 408).play();
          setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false);
          // Quiz.loadQuiz()
        }   
      })        
    }
     
     
      Dom.setBlinkArrow(true, 655, -35).play();
      setCC("Click on the 'Aluminium Beam' and attach it with basic frame");
     //onclick pipe waler 
     contentAdderBtns[0].onclick = aluminiumBeamAnime;
     contentAdderBtns[1].onclick = timberBeamAnime;

     return true;

    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 5",
        "Placing sheathing on the top of timber beam."
      );
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");

      //! Required Items
      Scenes.items.base_plate1.set(0,0)
      Scenes.items.base_plate2.set(0,0)
      Scenes.items.base_plate3.set(0,0)
      Scenes.items.base_plate4.set(0,0)
      
      Scenes.items.ct_prop1.set(0,0).zIndex(0)
      Scenes.items.ct_prop2.set(0,0)
      Scenes.items.ct_prop3.set(0,0)
      Scenes.items.ct_prop4.set(0,0).zIndex(2)

      Scenes.items.u_head1.set(0,0)
      Scenes.items.u_head2.set(0,0)
      Scenes.items.u_head3.set(0,0)
      Scenes.items.u_head4.set(0,0)

      Scenes.items.brace_back1.set(0,0)
      Scenes.items.brace_back2.set(0,0)
      Scenes.items.brace_left1.set(0,0).zIndex(1)
      Scenes.items.brace_left2.set(0,0).zIndex(1)
      Scenes.items.brace_right1.set(0,0).zIndex(1)
      Scenes.items.brace_right2.set(0,0).zIndex(1)
      Scenes.items.brace_front1.set(0,0).zIndex(1)
      Scenes.items.brace_front2.set(0,0).zIndex(1)
      
      Scenes.items.bolt1.set(132,199).rotate(20).zIndex(2)
      Scenes.items.bolt2.set(138,274).rotate(20).zIndex(2)
      Scenes.items.bolt3.set(209,272).rotate(-20).zIndex(2)
      Scenes.items.bolt4.set(209,340).rotate(-20).zIndex(2)
      Scenes.items.bolt5.set(330,202).rotate(-20).zIndex(2)
      Scenes.items.bolt6.set(334,273).rotate(-20).zIndex(2)
      Scenes.items.bolt7.set(258,133).rotate(-120).zIndex(0)
      Scenes.items.bolt8.set(257,200).rotate(-120).zIndex(0)

      Scenes.items.aluminium_beam1.set(0,0).zIndex(4)
      Scenes.items.aluminium_beam2.set(0,0).zIndex(4)
      Scenes.items.beam1.set(0,0).zIndex(4)
      Scenes.items.beam2.set(0,0).zIndex(4)
      Scenes.items.beam3.set(0,0).zIndex(4)
      Scenes.items.beam4.set(0,0).zIndex(4)
      Scenes.items.beam5.set(0,0).zIndex(4)
      Scenes.items.beam6.set(0,0).zIndex(4)                                 
      
      Scenes.items.sheathing1.set(-330,-80).zIndex(5)

      Scenes.items.nail1.set(580,200).zIndex(6)
      Scenes.items.nail2.set(560,177).zIndex(6)
      Scenes.items.nail3.set(478,270).zIndex(6)
      Scenes.items.nail4.set(457,243).zIndex(6)

      Scenes.items.hammer.set(790, 332,30).zIndex(7)


      // ! final pos
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
          targets: [Scenes.items.sheathing1.item],
          duration: 4000,
          keyframes: [
            {left: 0},
            {top: 0},
          ],
          complete(){
            Scenes.items.nail_helper.set(0,0).zIndex(6)
            Scenes.items.nail_helper_beam.set(0,0).zIndex(6)

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
          targets: Scenes.items.nail1.item,
          keyframes:[
            {top: 0},
            {left: 0},
          ],
        })
        .add({
          targets: Scenes.items.hammer.item,
          left: 144,
          top: 130,
        })
        .add({
          begin(){
            hammerAnime.play()
          },
          targets: [Scenes.items.nail1.item,Scenes.items.hammer.item],
          top: ["+=0","+=9","+=6"],
          duration: 3000
        })
        // ! Second nailing animation
        .add({
          targets: Scenes.items.nail2.item,
          keyframes:[
            {top: 0},
            {left: 0},
          ],
        })
        .add({
          targets: Scenes.items.hammer.item,
          left: 180,
          top: 155,
        })
        .add({
          begin(){
            hammerAnime.play()
          },
          targets: [Scenes.items.nail2.item,Scenes.items.hammer.item],
          top: ["+=0","+=9","+=9"],
          duration: 3000
        })
        // ! Third nailing animation
        .add({
          targets: Scenes.items.nail3.item,
          keyframes:[
            {top: 0},
            {left: 0},
          ],
        })
        .add({
          targets: Scenes.items.hammer.item,
          left: 278,
          top: 61,
        })
        .add({
          begin(){
            hammerAnime.play()
          },
          targets: [Scenes.items.nail3.item,Scenes.items.hammer.item],
          top: ["+=0","+=9","+=5"],
          duration: 3000
        })
        // ! 4 nailing animation
        .add({
          targets: Scenes.items.nail4.item,
          keyframes:[
            {top: 0},     
            {left: 0},
          ],
        })
        .add({
          targets: Scenes.items.hammer.item,
          left: 314,
          top: 87,
        })
        .add({
          begin(){
            hammerAnime.play()
          },
          targets: [Scenes.items.nail4.item,Scenes.items.hammer.item],
          top: ["+=0","+=9","+=5"],
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
            // Quiz.loadQuiz()
          }
        })
      }
  
      setCC("Click on the 'Sheathing' to add sheathing in the lab.");      
      Dom.setBlinkArrow(true, 720,-35).play();
    //onclick
    contentAdderBtns[0].onclick = sheathingAnime
    contentAdderBtns[1].onclick = nailingAnime

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
      );


    // todo Required Items
    Scenes.items.base_plate1.set(0,0)
    Scenes.items.base_plate2.set(0,0)
    Scenes.items.base_plate3.set(0,0)
    Scenes.items.base_plate4.set(0,0)
    
    Scenes.items.ct_prop1.set(0,0).zIndex(0)
    Scenes.items.ct_prop2.set(0,0)
    Scenes.items.ct_prop3.set(0,0)
    Scenes.items.ct_prop4.set(0,0).zIndex(2)

    Scenes.items.u_head1.set(0,0)
    Scenes.items.u_head2.set(0,0)
    Scenes.items.u_head3.set(0,0)
    Scenes.items.u_head4.set(0,0)

    Scenes.items.brace_back1.set(0,0)
    Scenes.items.brace_back2.set(0,0)
    Scenes.items.brace_left1.set(0,0).zIndex(1)
    Scenes.items.brace_left2.set(0,0).zIndex(1)
    Scenes.items.brace_right1.set(0,0).zIndex(1)
    Scenes.items.brace_right2.set(0,0).zIndex(1)
    Scenes.items.brace_front1.set(0,0).zIndex(1)
    Scenes.items.brace_front2.set(0,0).zIndex(1)
    
    Scenes.items.bolt1.set(132,199).rotate(20).zIndex(2)
    Scenes.items.bolt2.set(138,274).rotate(20).zIndex(2)
    Scenes.items.bolt3.set(209,272).rotate(-20).zIndex(2)
    Scenes.items.bolt4.set(209,340).rotate(-20).zIndex(2)
    Scenes.items.bolt5.set(330,202).rotate(-20).zIndex(2)
    Scenes.items.bolt6.set(334,273).rotate(-20).zIndex(2)
    Scenes.items.bolt7.set(258,133).rotate(-120).zIndex(0)
    Scenes.items.bolt8.set(257,200).rotate(-120).zIndex(0)

    Scenes.items.aluminium_beam1.set(0,0).zIndex(4)
    Scenes.items.aluminium_beam2.set(0,0).zIndex(4)
    Scenes.items.beam1.set(0,0).zIndex(4)
    Scenes.items.beam2.set(0,0).zIndex(4)
    Scenes.items.beam3.set(0,0).zIndex(4)
    Scenes.items.beam4.set(0,0).zIndex(4)
    Scenes.items.beam5.set(0,0).zIndex(4)
    Scenes.items.beam6.set(0,0).zIndex(4)                                 
    
    Scenes.items.sheathing1.set(0,0).zIndex(5)
    Scenes.items.nail_helper.set(0,0).zIndex(6)
    Scenes.items.nail_helper_beam.set(0,0).zIndex(6)

    Scenes.items.nail1.set(0,15).zIndex(6)
    Scenes.items.nail2.set(0,18).zIndex(6)
    Scenes.items.nail3.set(0,14).zIndex(6)
    Scenes.items.nail4.set(0,14).zIndex(6)

    Scenes.items.bfs_left1.set(430-150,270-120).zIndex(7)
    Scenes.items.bfs_left2.set(538-150,238-120).zIndex(7)
    Scenes.items.bfs_left3.set(640-150,205-120).zIndex(7)
    
    Scenes.items.beam_left1.set(300,268).zIndex(8).rotate(26.5)
    Scenes.items.beam_left2.set(285,325).zIndex(8).rotate(26.5)

    Scenes.items.sheathing2.set(270,360).zIndex(9).rotate(28)
  

    Scenes.items.videoBox.set(710,140,null).show("flex")
    Scenes.items.videoBoxSrc.set(0,null,200)
    Scenes.items.videoBoxSrc.item.src= Scenes.items.bfs_video.item.src
    Scenes.items.videoBoxTitle.setContent("BFS Installation")
    Scenes.items.videoBoxRestartBtn.item.onclick = ()=>{
      Scenes.items.videoBoxSrc.item.play()
    }

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
    
    Scenes.contentAdderAddBtn("BFS")
    Scenes.contentAdderAddBtn("Timber Beam")
    Scenes.contentAdderAddBtn("Sheathing")

    let contentAdderBtns = getAll(".content-adder-box .btn")
    
    let bfsCount = 0
    function bfsAnime(){
      switch(bfsCount){
        case 0:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 2000,
            
          })
          .add({
            targets: Scenes.items.bfs_left1.item,
            keyframes: [
              {top: -50},
              {left : -60},
              {top: 0,left: 0}
            ]
          })
          .add({
            targets: Scenes.items.bfs_left2.item,
            keyframes: [
              {top: -80},
              {left: -60},
              {top: 0,left: 0}
            ]
          })
          .add({
            targets: Scenes.items.bfs_left3.item,
            keyframes: [
              {top: -110},
              {left: -60},
              {top: 0,left: 0}
            ],
            complete(){
              setCC("Click on the 'Timber Beam' to attach it with bfs.");      
              Dom.setBlinkArrow(true, 705,15).play();
            }  
          })
          break
        
        case 1:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 2000,
            
          })
          .add({
            targets: Scenes.items.bfs_right1.item,
            left : 0,
            top: 0,
          })
          .add(
            {
            targets: Scenes.items.bfs_right2.item,
            left : 0,
            top: 0,
          })
          .add({
            targets: Scenes.items.bfs_right3.item,
            left : 0,
            top: 0,
            complete(){
              setCC("Click on the 'Timber Beam' to attach it with bfs.");      
              Dom.setBlinkArrow(true, 705,15).play();
            }  
          })
          break
      }
      bfsCount++
    }

    let timberBeamCount = 0
    function timberBeamAnime(){
      switch(timberBeamCount){
        case 0:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 2000,
          })
          .add({
            targets: Scenes.items.beam_left1.item,
            keyframes: [
              {top: -130,rotate: 0},
              {top: 0,left: 0}
            ]
          })
          .add({
            targets: Scenes.items.beam_left2.item,
            keyframes: [
              {top: -130,rotate: 0},
              {top: 0,left: 0}
            ],
            complete(){
              setCC("Click on the 'Sheathing' and attach with timber beam");      
              Dom.setBlinkArrow(true, 705,65).play();
            }
          })     
          break
          
        case 1:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 2000,
          })
          .add({
            targets: Scenes.items.beam_right1.item,
            left : 0,
            top: 0,
            rotate: 0,
          })
          .add({
            targets: Scenes.items.beam_right2.item,
            left : 0,
            top: 0,
            rotate: 0,
            complete(){
              setCC("Click on the 'Sheathing' and attach with timber beam");      
              Dom.setBlinkArrow(true, 705,65).play();
            }  
          })     
          break
      }   
      timberBeamCount++
    }

    let sheathingCount = 0
    function sheathingAnime(){
      switch(sheathingCount){
        case 0:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 2000,
          })
          .add({
            targets: Scenes.items.sheathing2.item,
            keyframes: [
              {top: -80,rotate: 0},
              {left: "-=110"},
              {top: 0,left: 0}
            ],
            complete(){
              setCC("Click on the 'BFS' to attach beam forming support with timber beam.")
              Dom.setBlinkArrow(true,705,-35).play()
              
             
              Scenes.items.bfs_right1.set(430-200,270-200).zIndex(8)
              Scenes.items.bfs_right2.set(538-200,238-200).zIndex(8)
              Scenes.items.bfs_right3.set(640-200,205-200).zIndex(8)
              
              Scenes.items.beam_right1.set(300,268-70).zIndex(7).rotate(26.5)
              Scenes.items.beam_right2.set(285,325-70).zIndex(7).rotate(26.5)

              Scenes.items.sheathing3.set(290,360-60).zIndex(6).rotate(28)
            
            } 
          })   
          break
        case 1:
          anime.timeline({
            easing: "easeInOutQuad",
            duration: 2000,
          })
          .add({
            targets: Scenes.items.sheathing3.item,
            left: 0,
            top: 0,
            rotate: 0,
            complete(){
              Dom.setBlinkArrow(true, 790, 408).play();
              setCC("Click 'Next' to go to next step");
              setIsProcessRunning(false);
              // Quiz.loadQuiz()
            } 
          })   
          break
      }      
      sheathingCount++ 
    }
    setCC("Click on the 'BFS' to attach beam forming support with timber beam.")
    Dom.setBlinkArrow(true,705,-35).play()
    //onclick
    contentAdderBtns[0].onclick = bfsAnime
    contentAdderBtns[1].onclick = timberBeamAnime
    contentAdderBtns[2].onclick = sheathingAnime

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