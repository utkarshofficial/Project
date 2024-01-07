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
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),
    
box_img : new Dom("box_img"),
component_battery : new Dom("component_battery"),
component_capacitor : new Dom("component_capacitor"),
component_diode : new Dom("component_diode"),
component_inductor : new Dom("component_inductor"),
component_mosfet : new Dom("component_mosfet"),
component_register : new Dom("component_register"),
full_circuit : new Dom("full_circuit"),
full_circuit2 : new Dom("full_circuit2"),
circuit_full_2 : new Dom("circuit_full_2"),
circuit_full_3 : new Dom("circuit_full_3"),
graph_arrow : new Dom("part_3_graph_arrow"),
part_3_option_1 : new Dom("part_3_option_1"),
part_3_option_2 : new Dom("part_3_option_2"),
part_3_option_3 : new Dom("part_3_option_3"),
part_3_option_4 : new Dom("part_3_option_4"),
record_btn : new Dom("record_btn"),
part3_table_one : new Dom(".part3_table_one"),
part3_table_two : new Dom(".part3_table_two"),
part3_table_three : new Dom(".part3_table_three"),
part3_table_four : new Dom(".part3_table_four"),
part3_table_four_2 : new Dom(".part3_table_four_2"),
slider_vIn : new Dom(".slider_vIn"),
slider_D : new Dom(".slider_D"),
slider_R : new Dom(".slider_R"),
part_2_circuit : new Dom("part_2_circuit"),
part_2_graph_1 : new Dom("part_2_graph_1"),
part_2_graph_2 : new Dom("part_2_graph_2"),
part_2_graph_3 : new Dom("part_2_graph_3"),
run_btn : new Dom("run_btn"),
slider_box : new Dom(".slider-box"),
right_tick_1 : new Dom("right_tick_1"),
right_tick_2 : new Dom("right_tick_2"),
right_tick_3: new Dom("right_tick_3"),
right_tick_4 : new Dom("right_tick_4"),
graph1: new Dom(".graph1"),
graph2: new Dom(".graph2"),
graph3: new Dom(".graph3"),
graph4: new Dom(".graph4"),
graph5: new Dom(".graph5"),
graph1_arrow : new Dom("graph1_arrow"),
graph2_arrow : new Dom("graph2_arrow"),
part_2_graph_empty : new Dom("part_2_graph_empty"),
part_3_option_4_graph : new Dom("part_3_option_4_graph"),
btn_delete : new Dom(".btn-delete"),
btn_reset : new Dom(".btn-reset"),


// ! new items dom
 domQs1: new Dom("domQs1"),
 domQs2: new Dom("domQs2"),
 domQs3: new Dom("domQs3"),
 domQs4: new Dom("domQs4"),
 domQs5: new Dom("domQs5"),
 domQs6: new Dom("domQs6"),






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
  optionsDone:[0,0,0,0],
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
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);

      Scenes.setStepHeading("Step-1", "Circuit Formulation");
        

      setCC("Click on the correct BOX(?) for placing the highlighted component.")
      Scenes.items.full_circuit.set(0,0)

      // box img mapping to domQus
      let boxCount = 1;
 
      // ! Required Postion
      Scenes.items.box_img.set(58,-20,160)
      // Scenes.items.box_img.set(190,-10,150,80)
      // Scenes.items.box_img.set(270,10,100,150)
      // Scenes.items.box_img.set(445,13,100,180)
      // Scenes.items.box_img.set(625,-10,160,120)
      // Scenes.items.box_img.set(740,-10,130,100)

      Scenes.items.component_mosfet.set(-300,-220)
      Scenes.items.component_register.set(-470,-215)
      Scenes.items.component_diode.set(-190,-120)
      Scenes.items.component_inductor.set(200,-120).zIndex(2)
      Scenes.items.component_battery.set(440,-215).zIndex(2) 
      Scenes.items.component_capacitor.set(160,-220)

      Scenes.items.slider_box.hide()

      let tempText = Scenes.items.tempText.set(50,200).hide()
      
      // * Part One Logic
      Scenes.items.domQs1.set(388,227).zIndex(3)
      Scenes.items.domQs2.set(677,236).zIndex(3)
      Scenes.items.domQs3.set(504,138).zIndex(3)
      Scenes.items.domQs4.set(285,143).zIndex(3)
      Scenes.items.domQs5.set(203,226).zIndex(3)
      Scenes.items.domQs6.set(598,238).zIndex(3)
      let qsBtns = document.querySelectorAll(".qs")

      // Adding onclick to all qs
      for(let i of qsBtns){
        i.onclick = function(){
          checkClick(i)
        }
      }
      Scenes.items.domQs6.item.onclick = function(){
          if(boxCount>5){
            // after complete
            Scenes.items.box_img.hide()
            // Dom.setBlinkArrow(true, 790, 408).play();
            setCC("Click 'Next' to go to next step");
            setIsProcessRunning(false);
          }
          checkClick(Scenes.items.domQs6.item)
      }

      const checkClick = (qsBtnDom) =>{
        let isSame = qsBtnDom.classList.contains(`qs${boxCount}`)
        if(isSame){
          animateComponent(qsBtnDom);
          // to go to next component
          boxCount++
          tempText.show()
          tempText.setContent("Correct component click.")
          tempText.item.style.color = "green"
          anime({
            targets: tempText.item,
            duration: 400,
            opacity: [0,0.5,1]
          })
        }
        else{
          tempText.show()
          tempText.setContent("Incorrect component click.")
          tempText.item.style.color = "RED"
          anime({
            targets: tempText.item,
            duration: 400,
            opacity: [0,0.5,1]
          })
          
          qsBtnDom.style.backgroundColor = 'red';
        }
       
      }

      // * for animate after check click
      const animateComponent = (qsBtnDom)=>{
        let compo = [
          Scenes.items.component_mosfet.item,
          Scenes.items.component_register.item,
          Scenes.items.component_diode.item,
          Scenes.items.component_inductor.item,
          Scenes.items.component_battery.item ,
          Scenes.items.component_capacitor.item,
        ]

        let props = [
          [190,-10,150,80],
          [270,10,100,150],
          [445,13,100,180],
          [625,-10,160,120],
          [740,-10,130,100],
        ]

        anime.timeline({
          duration: 2000,
          easing: "easeInOutQuad",
        })
        .add({
          targets:compo[boxCount - 1],
          top: 0,
          left: 0,
          begin(){
            anime({
              targets: qsBtnDom,
              opacity: 0,
              duration: 2000,
              complete(){
                qsBtnDom.style.display = "none"
              }
            })
          },

          complete(){
            for(let i of qsBtns){
              i.style.backgroundColor = "#05bc57";
            }
          }
        })
        .add({
          targets: Scenes.items.box_img.item,
          left: props[boxCount-1][0],
          top: props[boxCount-1][1],
          height: props[boxCount-1][2],
          width: props[boxCount-1][3],
          
        })

        
        

      }
      
      // ! Final Position
      // Scenes.items.box_img.set(0,0)
      // Scenes.items.component_mosfet.set(0,0)
      // Scenes.items.component_register.set(0,0)
      // Scenes.items.component_diode.set(0,0)
      // Scenes.items.component_inductor.set(0,0)
      // Scenes.items.component_battery.set(0,0) 
      // Scenes.items.component_capacitor.set(0,0)
      
      // Dom.setBlinkArrow(true,65,130 ).play()
      // onclick
      
      return true
    }),
    (step2 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "Step-2",
        "Voltage and current waveforms."
      )
      setCC("Select the parameter(s): Vin, D, R to see the current and voltage waveforms of various components.")
      Scenes.items.slider_box.show("flex")

      //! Required Items
      let hConst = 15
       Scenes.items.run_btn.set(60,340,55)
       Scenes.items.part_2_circuit.set(5,180,140)
       Scenes.items.part_2_graph_empty.set(280,hConst-40,430)
       Scenes.items.part_2_graph_1.set(280,hConst-40,430).hide()
       Scenes.items.part_2_graph_2.set(280,hConst-40,430).hide()
       Scenes.items.part_2_graph_3.set(280,hConst-40,430).hide()
       Scenes.items.run_btn.item.style.cursor = "pointer"
       
       let graphLeft = 280, graphTop = -40, graphHeight = 430

       // temp text on required positions
       let allTempTitles = [
        Scenes.items.tempTitle1.setContent("0").set(370,hConst+118),
        Scenes.items.tempTitle2.setContent("0").set(450,hConst+118),
        Scenes.items.tempTitle3.setContent("0").set(370,hConst+141),
        Scenes.items.tempTitle4.setContent("0").set(445,hConst+141),

        Scenes.items.tempTitle5.setContent("0").set(597,hConst+121),
        Scenes.items.tempTitle6.setContent("0").set(665,hConst+141),

        Scenes.items.tempTitle7.setContent("0").set(808,hConst+121),
        Scenes.items.tempTitle8.setContent("0").set(878,hConst+121),
        Scenes.items.tempTitle21.setContent("0").set(808,hConst+141),
        Scenes.items.tempTitle9.setContent("0").set(878,hConst+141),

        Scenes.items.tempTitle10.setContent("0").set(381,hConst+342),
        Scenes.items.tempTitle11.setContent("0").set(449,hConst+342),
        Scenes.items.tempTitle12.setContent("0").set(378,hConst+364),
        Scenes.items.tempTitle13.setContent("0").set(446,hConst+364),
        
        Scenes.items.tempTitle14.setContent("0").set(665,hConst+342),
        Scenes.items.tempTitle15.setContent("0").set(596,hConst+364),

        Scenes.items.tempTitle16.setContent("0").set(812,hConst+344),
        Scenes.items.tempTitle17.setContent("0").set(875,hConst+344),
        Scenes.items.tempTitle18.setContent("0").set(806,hConst+364),
        Scenes.items.tempTitle19.setContent("0").set(870,hConst+364)
       ]
 
       let currentGraph = Scenes.items.part_2_graph_empty

       // *  chage the step size of the sliders
       let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
       dutyRatioSlider.min = "0.25"
       dutyRatioSlider.max = "0.75"
       dutyRatioSlider.step = "0.25"        
       Scenes.items.slider_D.item.children[1].children[1].innerHTML = "0.25"
        
       // ! onclick for record
       Scenes.items.run_btn.item.onclick = function(){
          // ! Activate the next btn right after the click 
          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          // setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false);

          let allSliderValue = $(".range-slider__value");
 
          let vInValue = Number(allSliderValue[0].innerHTML)
          let dutyRatioValue = Number(allSliderValue[1].innerHTML)
          let resistanceValue = Number(allSliderValue[2].value)

          updateValues(vInValue,dutyRatioValue,resistanceValue)

          let v0 = Number(Formulas.step2.v0(values)).toFixed(1)
          let iIn = Number(Formulas.step2.iIn(values)).toFixed(1)
          let i0 = Number(Formulas.step2.i0(values)).toFixed(1)

          Scenes.items.tempTitle2.setContent(v0)

          if(dutyRatioValue==0.25){
            updateValues(vInValue,dutyRatioValue,resistanceValue)

            Scenes.items.tempTitle1.setContent(vInValue)
            Scenes.items.tempTitle2.setContent(Number(v0 - iIn).toFixed(1))
            Scenes.items.tempTitle3.setContent(iIn)
            Scenes.items.tempTitle4.setContent(iIn)

            Scenes.items.tempTitle5.setContent(v0)
            Scenes.items.tempTitle6.setContent(iIn)

            Scenes.items.tempTitle7.setContent(v0)
            Scenes.items.tempTitle8.setContent(v0)
            Scenes.items.tempTitle9.setContent(Number(iIn - i0).toFixed(1))
            Scenes.items.tempTitle21.setContent(i0)

            Scenes.items.tempTitle10.setContent(vInValue)
            Scenes.items.tempTitle11.setContent(vInValue)
            Scenes.items.tempTitle12.setContent(iIn)
            Scenes.items.tempTitle13.setContent(iIn)
            
            Scenes.items.tempTitle14.setContent(v0)
            Scenes.items.tempTitle15.setContent(iIn)

            Scenes.items.tempTitle16.setContent(v0)
            Scenes.items.tempTitle17.setContent(v0)
            Scenes.items.tempTitle18.setContent(i0)
            Scenes.items.tempTitle19.setContent(i0) 

            currentGraph.hide()
            Scenes.items.part_2_graph_1.show()
            currentGraph = Scenes.items.part_2_graph_1
          }


          if(dutyRatioValue==0.5){
            updateValues(vInValue,dutyRatioValue,resistanceValue)

            Scenes.items.tempTitle1.setContent(vInValue)
            Scenes.items.tempTitle2.setContent(Number(v0 - iIn).toFixed(1))
            Scenes.items.tempTitle3.setContent(iIn)
            Scenes.items.tempTitle4.setContent(iIn)

            Scenes.items.tempTitle5.setContent(v0)
            Scenes.items.tempTitle6.setContent(iIn)

            Scenes.items.tempTitle7.setContent(v0)
            Scenes.items.tempTitle8.setContent(v0)
            Scenes.items.tempTitle9.setContent(Number(iIn - i0).toFixed(1))

            Scenes.items.tempTitle10.setContent(vInValue)
            Scenes.items.tempTitle11.setContent(vInValue)
            Scenes.items.tempTitle12.setContent(iIn)
            Scenes.items.tempTitle13.setContent(iIn)
            
            Scenes.items.tempTitle14.setContent(v0)
            Scenes.items.tempTitle15.setContent(iIn)

            Scenes.items.tempTitle16.setContent(v0)
            Scenes.items.tempTitle17.setContent(v0)
            Scenes.items.tempTitle18.setContent(i0)
            Scenes.items.tempTitle19.setContent(i0) 

            currentGraph.hide()
            Scenes.items.part_2_graph_2.show()
            currentGraph = Scenes.items.part_2_graph_2
          }


          if(dutyRatioValue==0.75){
             updateValues(vInValue,dutyRatioValue,resistanceValue)

            Scenes.items.tempTitle1.setContent(vInValue)
            Scenes.items.tempTitle2.setContent(Number(v0 - iIn).toFixed(1))
            Scenes.items.tempTitle3.setContent(iIn)
            Scenes.items.tempTitle4.setContent(iIn)

            Scenes.items.tempTitle5.setContent(v0)
            Scenes.items.tempTitle6.setContent(iIn)

            Scenes.items.tempTitle7.setContent(v0)
            Scenes.items.tempTitle8.setContent(v0)
            Scenes.items.tempTitle9.setContent(Number(iIn - i0).toFixed(1))

            Scenes.items.tempTitle10.setContent(vInValue)
            Scenes.items.tempTitle11.setContent(vInValue)
            Scenes.items.tempTitle12.setContent(iIn)
            Scenes.items.tempTitle13.setContent(iIn)
            
            Scenes.items.tempTitle14.setContent(v0)
            Scenes.items.tempTitle15.setContent(iIn)

            Scenes.items.tempTitle16.setContent(v0)
            Scenes.items.tempTitle17.setContent(v0)
            Scenes.items.tempTitle18.setContent(i0)
            Scenes.items.tempTitle19.setContent(i0) 

            currentGraph.hide()
            Scenes.items.part_2_graph_3.show()
            currentGraph = Scenes.items.part_2_graph_3

            // completed
          }

          

       }    
      

      
      return true
    }),
    (step3 = function () {
      setIsProcessRunning(true);
      
      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step-3", "Performance Analysis.");
      setCC("Click on the 'ICON' to plot the performance characteristics.")
      
      // * remove all previous restrictions
      
      // * Required Elements

      Scenes.items.circuit_full_2.set(230,-20,200)
      Scenes.items.part_3_option_1.set(100-60, 270)
      Scenes.items.part_3_option_2.set(250-60, 270)
      Scenes.items.part_3_option_3.set(470-60, 270)
      Scenes.items.part_3_option_4.set(660-60, 270)
      // hide the slider
      Scenes.items.slider_box.hide()

      let rightTicks = [
        Scenes.items.right_tick_1.set(20,280).hide(),
        Scenes.items.right_tick_2.set(208,280).hide(),
        Scenes.items.right_tick_3.set(435,280).hide(),
        Scenes.items.right_tick_4.set(630,280).hide()
      ]

      // hide all tables
      Scenes.items.part3_table_one.hide()
      Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      Scenes.items.part3_table_four.hide()
      Scenes.items.part3_table_four_2.hide()

      // active all sliders
      Scenes.items.slider_vIn.item.children[1].children[0].disabled = false
      Scenes.items.slider_vIn.item.classList.remove("deactive")
      Scenes.items.slider_D.item.children[1].children[0].disabled = false
      Scenes.items.slider_D.item.classList.remove("deactive")
      Scenes.items.slider_R.item.classList.remove("deactive")
      Scenes.items.slider_R.item.children[1].children[0].disabled = false

      // * showing right tick if done
      for(let i in rightTicks){
        if(Scenes.optionsDone[i] == 1){
          rightTicks[i].show()
        }
      }


      // ! Final Position
    //  Scenes.items.tableCalc.show()

    // ! onclicks for all options
      let options = [
        Scenes.items.part_3_option_1,
        Scenes.items.part_3_option_2,
        Scenes.items.part_3_option_3,
        Scenes.items.part_3_option_4,
      ]
      function resetSlider(){
        // Scenes.items.slider_vIn.item.value = 12
        // Scenes.items.slider_D.item.value = 0.1
        // Scenes.items.slider_R.item.value = 10

        $(".slider_vIn").val(12)
        $(".slider_D").val(0.1)
        $(".slider_R").val(10)
        document.querySelector(".resistance-input").value = 10
        rangeSlider()
        // Scenes.items.slider_R.item.style.opacity = 1
        // Scenes.items.slider_D.item.style.opacity = 1
        // Scenes.items.slider_R.show("flex")
        // Scenes.items.slider_D.show("flex")
  
      }
      
      const opOne = ()=>{
        // ! show the slider
        Scenes.items.slider_box.show()

        // * reset the slider
        resetSlider()

        Scenes.optionsDone[0]=1;
        Scenes.steps[0+5]()
      }
      const opTwo = ()=>{
        // ! show the slider
        Scenes.items.slider_box.show()

        // * reset the slider
        resetSlider()

        Scenes.optionsDone[1]=1;
        Scenes.steps[1+5]()
      }
      const opThree = ()=>{
        // ! show the slider
        Scenes.items.slider_box.show()

        // * reset the slider
        resetSlider()

        Scenes.optionsDone[2]=1;
        Scenes.steps[2+5]()
      }
      const opFour = ()=>{
        // ! show the slider
        Scenes.items.slider_box.show()

        // * reset the slider
        resetSlider()

        Scenes.optionsDone[3]=1;
        Scenes.steps[3+5]()
      }
      options[0].item.onclick = opOne
      rightTicks[0].item.onclick = opOne

      options[1].item.onclick =  opTwo
      rightTicks[1].item.onclick = opTwo

      options[2].item.onclick =  opThree
      rightTicks[2].item.onclick = opThree

      options[3].item.onclick =  opFour
      rightTicks[3].item.onclick = opFour

      // ! if all options done then exit
      let exit = true
      for(let i of Scenes.optionsDone){
        if(i==0){
          exit = false
          break
        }
      }      

      if(exit){
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulator Done");
        setIsProcessRunning(false);
      }

      return true;

    }),
    (step4 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "",
        "Ideal voltage gain plot."
      );

      setCC("Record  7 reading for different Duty Ratio.")

      // * change the position of D <-> R
      function swapPositionSlider(){
        Scenes.items.slider_box.item.innerHTML = `
        <div class="slider slider_vIn">
                  <span class="title">V<sub>in</sub></span>
                  <div class="range-slider">
                    <input
                      class="range-slider__range"
                      type="range"
                      value="12"
                      min="12"
                      max="36"
                      step="12"
                    />
                    <span class="range-slider__value">0</span>
                    <span> V</span>
                  </div>
                </div>
          
                <div class="slider slider_R">
                  <span class="title">R</span>
                  <div class="range-slider">
                    <input
                      class="range-slider__range"
                      type="range"
                      value="10"
                      min="10"
                      max="500"
                    />
                    <input
                      value="10"
                      type="input"
                      class="range-slider__value resistance-input"
                    />
                    <span> Ω</span>
                  </div>
                </div>
                
                <div class="slider slider_D">
                  <span class="title">D</span>
                  <div class="range-slider">
                    <input
                      class="range-slider__range"
                      type="range"
                      value="0.1"
                      min="0.1"
                      max="0.95"
                      step="0.01"
                    />
                    <span class="range-slider__value">0</span>
                    <span></span>
                  </div>
                </div>
        `
      }
      // swapPositionSlider()
      
      // ! required item
      Scenes.items.circuit_full_3.set(230,-50,150)
      Scenes.items.part_3_option_1.set(10, 170-15)
      Scenes.items.right_tick_1.set(-12,185-15)
      Scenes.items.part3_table_one.show()
      Scenes.items.graph1_arrow.set(-5,6)
      Scenes.items.record_btn.set(60,270,70)
      Scenes.items.btn_reset.set(10+20,350)
      Scenes.items.btn_delete.set(100+20,350)

      let table = Scenes.items.part3_table_one.item      

      // ! graph
      // * add x,y parameters for graph
      // let graphData = []
      

      Scenes.items.graph1.set(null,null,190,355)
      let ctx = Scenes.items.graph1.item

      function plotGraph(data,label,xLabel,yLabel){
        var x = new Chart(ctx, {
          type: "scatter",
          data: {
            datasets: [
                {
                  label: label,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
      }
      // const graph = {
      //   addDataset(chart,label,bgColor,data){
      //     chart.data.datasets.push(
      //       {
      //         label: label,
      //         fill: true,
      //         borderColor: bgColor,
      //         data: data,
      //       }
      //     )
      //     chart.update()
      //   },
      //   addData(chart,index,data){
      //     if(data.length > 0){
      //       chart.data.datasets[index].data = data
      //     }else{
      //       chart.data.datasets[index].data.push(data)
      //     }
      //     chart.update()
      //   }
      // }
      

      // get data
      function setDataToGraph(){
        let graphData = []
        var rows = table.tBodies[0].rows
        let n = 7
        for(let i=0;i<n;i++){
          graphData.push(
            {
              x: rows[i].cells[2].innerHTML,
              y: rows[i].cells[5].innerHTML
            }
          )
        }
        plotGraph(graphData,"Voltage Gain","Duty Ratio (D)","Voltage Gain (M)")
        Scenes.items.graph1.set(null,null,190,355)
      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        // setDataToGraph()= 
          setIsProcessRunning(false)
          Scenes.currentStep = 4
      }else{
        plotGraph([{}],"Voltage Gain","Duty Ratio (D)","Voltage Gain (M)")
        Scenes.items.graph1.set(null,null,190,355)
      }
       

      

      // *  chage the step size of the sliders
      let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
      dutyRatioSlider.min = "0.1"
      dutyRatioSlider.max = "0.9"
      dutyRatioSlider.step = "0.01"        
      dutyRatioSlider.value = 0.1
      rangeSlider()
      // Scenes.items.slider_D.item.children[1].children[1].innerHTML = "0.1"
       
      
      // * index to handle records
      let recordBtnClickIdx = 0
      
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 ){
          return
        }
        let row = Scenes.items.part3_table_one.item.tBodies[0].rows
        let n=7
        for(let i=1;i<=n;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=7

        for(let i=0;i<n;i++){
          for(let j=1;j<=n;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        // reset all the parameters
        recordBtnClickIdx=0;
        plotGraph([{}],"Voltage Gain","Duty Ratio (D)","Voltage Gain (M)")
        Scenes.items.slider_vIn.item.children[1].children[0].disabled = false
        Scenes.items.slider_vIn.item.classList.remove("deactive")

        Scenes.items.slider_D.item.children[1].children[0].disabled = false
        Scenes.items.slider_D.item.classList.remove("deactive")

        Scenes.items.slider_R.item.children[1].children[0].disabled = false
        Scenes.items.slider_R.item.classList.remove("deactive")
        
      }
      
      // ! onclick for record
      Scenes.items.record_btn.item.onclick = function(){

        // ! sort the data
        if(recordBtnClickIdx==7){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let n=7
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    if(rows[j].cells[2].innerHTML > rows[j+1].cells[2].innerHTML){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()

          // * plot the graph
          // adding parameter to x,y graph
          // ! calling the graph update function
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 4
        }

        let allSliderValue = $(".range-slider__value");

        let vInValue = Number(allSliderValue[0].innerHTML)
        let dutyRatioValue = Number(allSliderValue[1].innerHTML)
        let resistanceValue = Number(allSliderValue[2].value)

        // let vInValue = Number(allSliderValue[0].innerHTML)
        // let resistanceValue = Number(allSliderValue[1].value)
        // let dutyRatioValue = Number;(allSliderValue[2].innerHTML)
        console.log(resistanceValue)
        updateValues(vInValue,dutyRatioValue,resistanceValue)

        // deactivate the sliders after first value done
        // todo
        if(recordBtnClickIdx == 0){
          Scenes.items.slider_vIn.item.classList.add("deactive")
          Scenes.items.slider_vIn.item.children[1].children[0].disabled = true
          Scenes.items.slider_R.item.children[1].children[0].disabled = true
          Scenes.items.slider_R.item.classList.add("deactive")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = dutyRatioValue
        tableRow.cells[3].innerHTML = resistanceValue
        tableRow.cells[4].innerHTML = Number(Formulas.ideal.v0(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.ideal.M(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.ideal.iIn(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.ideal.i0(values)).toFixed(2)

        

        // warning for sorting the data
        if(recordBtnClickIdx==7){
          setCC("Click 'Record' to sort the table according to D and plot the graph.")
        }

        
      }    

      return true;

    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "",
        "Non-ideal voltage gain plot."
      );
      setCC("Record  7 reading for 3 different load resistances.")

      //! Required Items
      Scenes.items.circuit_full_3.set(230,-50,150)
      Scenes.items.part_3_option_2.set(-20, 170)
      Scenes.items.record_btn.set(40,310,70)
      Scenes.items.part3_table_two.show("flex")
      Scenes.items.right_tick_1.set(-3,185)
      Scenes.items.graph2_arrow.set(-5,0)
        // to access thead of the table 
      // Scenes.items.part3_table_two.item.children[0].tHead.rows[0].innerHTML

       let table = Scenes.items.part3_table_two.item
       let table1 = table.children[0]
       let table2 = table.children[1]
       let table3 = table.children[2]

      // hide side bar
      // Scenes.items.slider_R.item.style.opacity = 0
      // Scenes.items.slider_D.item.style.opacity = 0
      // Scenes.items.slider_R.hide()
      // Scenes.items.slider_D.hide()
      


       // ! graph
      Scenes.items.graph2.set(null,null,190,355)
      let ctx = Scenes.items.graph2.item

      let xLabel = "Duty Ratio (D)"
      let yLabel = "Voltage Gain (M)"
      let chart = null

      function plotGraph(){
        chart = new Chart(ctx,{
          type: "scatter",
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
      }

      const graph = {
        addDataset: (label,bgColor,data)=>{
          chart.data.datasets.push(
            {
              label: label,
              fill: false,
              borderColor: bgColor,
              backgroundColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(index,data){
          chart.data.datasets[index].data.push(data)
          chart.update()
        }
      }

      // ! ------------> If data already present plot the graph
      if(table3.tBodies[0].rows[6].cells[1].innerHTML !== ""){
          setIsProcessRunning(false)
          Scenes.currentStep = 4
      }else{
        plotGraph()
      Scenes.items.graph2.set(null,null,190,355)
      }   

       // ! 7 fixed dutry ration
       let dutyRatio = [0.1,0.5,0.8,0.83,0.86,0.89,0.92]

       // vIn already set to 12
       Scenes.items.slider_vIn.item.children[1].children[0].value = 12

       // duty ratio will be disabled for all
       Scenes.items.slider_D.item.children[1].children[0].disabled = true
       Scenes.items.slider_D.item.classList.add("deactive")
      
       
       // *  chage the step size of  the sliders
        let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
        dutyRatioSlider.min = "0.1"
        dutyRatioSlider.max = "0.95"
        dutyRatioSlider.step = "0.01"        
        dutyRatioSlider.value = 0.1
        rangeSlider()

       //! final pos

      
      //  console.log("sneha")
      //  console.log(table1.tHead.rows[0])
      // ! Reset Button onclick
      const resetAll = ()=>{
        // todo reset the button style 5,10,15...
        // and table data
      }
      
      // * Resistance Btn
      let resistanceBtnPressed = false
      let resistanceValue = 0
      let resistanceBtns = document.querySelectorAll(".table-btn")
      // loop on only three btns
      for (let i=0;i<3;i++){
        resistanceBtns[i].onclick = ()=>{
          // ! value from btn
          resistanceValue = Number(resistanceBtns[i].innerHTML)
          resistanceBtns[i].style.backgroundColor = 'black'

          // remove all the onclick event after one click done
          for (let i=0;i<3;i++){
            resistanceBtns[i].onclick = ()=>{}
          }
          
          // if pressed then calculate
          resistanceBtnPressed = true;
        }
      }

       // ! onclick for record
       let recordBtnClickIdx = 0
       Scenes.items.record_btn.item.onclick = function(){
        // * if not select any resistance value
        if(!resistanceBtnPressed){
          setCC("Please select resistance first.")
          return
        }
        
         let allSliderValue = $(".range-slider__value");
 
         let vInValue = Number(allSliderValue[0].innerHTML)
 
         let tableHead1 = table1.tHead.rows[0]
         let tableHead2 = table2.tHead.rows[0]
         let tableHead3 = table3.tHead.rows[0]

        //  tableHead1.innerHTML = resistanceValue
        //  tableHead2.innerHTML = resistanceValue
        //  tableHead3.innerHTML = resistanceValue
         
          if(recordBtnClickIdx < 7){
                               
            if(recordBtnClickIdx==0){

              // ! add dataset to graph
              graph.addDataset(
                `R = ${resistanceValue}`,
                "blue",
                []
              ) 

              // disable the vIn slider after first click
              Scenes.items.slider_vIn.item.children[1].children[0].disabled = true
              Scenes.items.slider_vIn.item.classList.add("deactive")

              tableHead1.cells[0].innerHTML = `R1 = ${resistanceValue} Ω`
              // Scenes.items.slider_R.item.children[1].children[0].disabled = true
              // Scenes.items.slider_R.item.classList.add("deactive")
            }

            
            updateValues(
              vInValue,
              dutyRatio[(recordBtnClickIdx)%7],
              resistanceValue
            )
            
            let tableRow = table1.tBodies[0].rows[recordBtnClickIdx++]
            tableRow.cells[1].innerHTML = Number(Formulas.nonIdeal.M(values)).toFixed(2)

            let x = tableRow.cells[0].innerHTML
            let y = Number(Formulas.nonIdeal.M(values)).toFixed(2)

            // ! add data to graph
            graph.addData(0,{x:x,y:y})

            if(recordBtnClickIdx==7){
              // Scenes.items.slider_R.item.children[1].children[0].disabled = false
              // Scenes.items.slider_R.item.classList.remove("deactive")
              document.querySelector(".btn-box2").classList.remove("deactive")
              resistanceBtnPressed = false;

              // loop on only three btns
              for (let i=3;i<6;i++){
                resistanceBtns[i].onclick = ()=>{
                  // ! value from btn
                  resistanceValue = Number(resistanceBtns[i].innerHTML)
                  resistanceBtns[i].style.backgroundColor = 'black'

                  // remove all the onclick event after one click done
                  for (let i=3;i<6;i++){
                    resistanceBtns[i].onclick = ()=>{}
                  }
                  // if pressed then calculate
                  resistanceBtnPressed = true;
                }
              }
            }
          }
          else if(recordBtnClickIdx < 15){

            Scenes.items.slider_vIn.item.children[1].children[0].disabled = true

            if(recordBtnClickIdx==7){
              // ! add dataset to graph
              graph.addDataset(
                `R = ${resistanceValue}`,
                "red",
                []
              )
            }

            if(recordBtnClickIdx%7==0){

              tableHead2.cells[0].innerHTML =  `R2 = ${resistanceValue} Ω`
              // Scenes.items.slider_R.item.children[1].children[0].disabled = true
              // Scenes.items.slider_R.item.classList.add("deactive")
            }
            

            updateValues(
              vInValue,
              dutyRatio[(recordBtnClickIdx-1)%7],
              resistanceValue
            )

            let tableRow = table2.tBodies[0].rows[recordBtnClickIdx++%8]
            tableRow.cells[1].innerHTML = Number(Formulas.nonIdeal.M(values)).toFixed(2)

            let x = tableRow.cells[0].innerHTML
            let y = Number(Formulas.nonIdeal.M(values)).toFixed(2)

            // ! add data to graph
            graph.addData(1,{x:x,y:y})

            if(recordBtnClickIdx==15){
              // Scenes.items.slider_R.item.children[1].children[0].disabled = false
              // Scenes.items.slider_R.item.classList.remove("deactive")
              document.querySelector(".btn-box3").classList.remove("deactive")
              resistanceBtnPressed = false;

              // loop on only three btns
              for (let i=6;i<9;i++){
                resistanceBtns[i].onclick = ()=>{
                  // ! value from btn
                  resistanceValue = Number(resistanceBtns[i].innerHTML)
                  resistanceBtns[i].style.backgroundColor = 'black'

                  // remove all the onclick event after one click done
                  for (let i=6;i<9;i++){
                    resistanceBtns[i].onclick = ()=>{}
                  }
                  // if pressed then calculate
                  resistanceBtnPressed = true;
                }
              }
            }
          } 
          else if(recordBtnClickIdx < 24){
              if(recordBtnClickIdx==15){
                // ! add dataset to graph
                graph.addDataset(
                  `R = ${resistanceValue}`,
                  "green",
                  []
                )
              }
 
             if(recordBtnClickIdx == 15){
               tableHead3.cells[0].innerHTML =  `R3 = ${resistanceValue} Ω`
               Scenes.items.slider_R.item.children[1].children[0].disabled = true
               Scenes.items.slider_R.item.classList.add("deactive")
             }
             
 
             updateValues(
              vInValue,
              dutyRatio[(recordBtnClickIdx-2)%7],
              resistanceValue
            )
 
            let tableRow = table3.tBodies[0].rows[recordBtnClickIdx++%8]
             tableRow.cells[1].innerHTML = Number(Formulas.nonIdeal.M(values)).toFixed(2)

             let x = tableRow.cells[0].innerHTML
             let y = Number(Formulas.nonIdeal.M(values)).toFixed(2)
 
             // ! add data to graph
             graph.addData(2,{x:x,y:y})

             if(recordBtnClickIdx>22){
              // after complete
              Dom.setBlinkArrow(true, 790, 408).play();
              setCC("Click 'Next' to go to next step");
              setIsProcessRunning(false); 
              Scenes.currentStep = 4
             }
          } 
       }    
 
  
      

      
      return true;
    }),
    (step6 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        "Efficiency Plot."
      )
      setCC("Record  7 reading for different Load Resistances (R0)")


      //! Required Items
      Scenes.items.circuit_full_3.set(230,-50,150)
       Scenes.items.part_3_option_3.set(-30, 170)
       Scenes.items.record_btn.set(40,310,70)
       Scenes.items.part3_table_three.show()
       Scenes.items.right_tick_1.set(-5,185)
       let table = Scenes.items.part3_table_three.item


       // ! graph
      Scenes.items.graph3.set(null,null,220,355)
      let ctx = Scenes.items.graph3.item
      
      // let xLabel = "Output Power (Po)"
      let xLabel = ""
      let yLabel = "Efficiency (%)"
      function plotGraph(data,label,xLabel,yLabel){
        let x = new Chart(ctx, {
          type: "scatter",
          plugins: [{
            afterDraw: chart => {
              var ctx = chart.chart.ctx;
              ctx.save();
              ctx.textAlign = 'center';
              ctx.font = '18px Arial';
              ctx.fillStyle = 'black';
              ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
              ctx.textAlign = 'left';
              ctx.font = '10px Arial';
              ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
              ctx.restore();
            },
            
          }],
          data: {
            datasets: [
                {
                  label: label,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:false,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:false,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
      }

      

      // let chart = new Chart(ctx,{
      //   type: "scatter",
      //   plugins: [{
      //     afterDraw: chart => {
      //       var ctx = chart.chart.ctx;
      //       ctx.save();
      //       ctx.textAlign = 'center';
      //       ctx.font = '18px Arial';
      //       ctx.fillStyle = 'black';
      //       ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
      //       ctx.textAlign = 'left';
      //       ctx.font = '10px Arial';
      //       ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
      //       ctx.restore();
      //     },
          
      //   }],
      //   options: {
      //     scales: {
      //       yAxes: [
      //         {
      //           scaleLabel: {
      //             display: true,
      //             labelString: yLabel,
      //             fontColor: 'black',
      //             fontSize: 17,

      //           },
      //           ticks: { 
      //             beginAtZero:true,
      //             fontColor: 'black',
      //             fontSize: 14,
      //           }
      //         },
      //       ],
      //       xAxes: [
      //         {
      //           scaleLabel: {
      //             display: true,
      //             labelString: xLabel,
      //             fontColor: 'black',
      //             fontSize: 17,
      //           },
      //           ticks: { 
      //             beginAtZero:true,
      //             fontColor: 'black',
      //             fontSize: 14,
      //           }
      //         },
      //       ],
      //     },
      //   },
      // })

      // const graph = {
      //   addDataset: (label,bgColor,data)=>{
      //     chart.data.datasets.push(
      //       {
      //         label: label,
      //         fill: false,
      //         borderColor: bgColor,
      //         backgroundColor: bgColor,
      //         data: data,
      //       }
      //     )
      //     chart.update()
      //   },
      //   addData(index,data){
      //     chart.data.datasets[index].data.push(data)
      //     chart.update()
      //   }
      // }

      // get data
      function setDataToGraph(){
        let graphData = []
        var rows = table.tBodies[0].rows
        let n = 7
        for(let i=0;i<n;i++){
          graphData.push(
            {
              x: rows[i].cells[9].innerHTML,
              y: rows[i].cells[10].innerHTML
            }
          )
        }
        plotGraph(graphData,"Efficiency","",yLabel)
        Scenes.items.graph3.set(null,null,220,355)
      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 4
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph([{}],"Efficiency","",yLabel) 
        Scenes.items.graph3.set(null,null,220,355)
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       
      // ! onclick for record
      let recordBtnClickIdx = 0
      Scenes.items.record_btn.item.onclick = function(){          

        // ! sort the data
        if(recordBtnClickIdx==7){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let n=7
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[9].innerHTML)
                    let val2 = Number(rows[j+1].cells[9].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()

          // * plot the graph
          // adding parameter to x,y graph
          // var rows = table.tBodies[0].rows
          // let n = 7
          // for(let i=0;i<n;i++){
          //   graph.addData(0,
          //     {
          //       x: rows[i].cells[9].innerHTML,
          //       y: rows[i].cells[10].innerHTML
          //     }
          //   )
          // }
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 4
        }


        let allSliderValue = $(".range-slider__value");

        let vInValue = Number(allSliderValue[0].innerHTML)
        let dutyRatioValue = Number(allSliderValue[1].innerHTML)
        let resistanceValue = Number(allSliderValue[2].value)
        updateValues(vInValue,dutyRatioValue,resistanceValue)

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          Scenes.items.slider_vIn.item.classList.add("deactive")
          Scenes.items.slider_vIn.item.children[1].children[0].disabled = true
          Scenes.items.slider_D.item.children[1].children[0].disabled = true
          Scenes.items.slider_D.item.classList.add("deactive")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = dutyRatioValue
        tableRow.cells[3].innerHTML = resistanceValue
        tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
        tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
        tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if(recordBtnClickIdx==7){
          setCC("Click 'Record' to sort the table according to D and plot the graph.")
        }
      }    
       
      

      
      return true
    }),
    (step7 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        "Component Stress and Selection"
      )


      //! Required Items
      Scenes.items.circuit_full_2.set(270,0,160)
       Scenes.items.part_3_option_4.set(-30, 170,100,220)
       Scenes.items.record_btn.set(40,310,70)
       Scenes.items.part3_table_four.show()
       Scenes.items.part3_table_four_2.show()
       Scenes.items.right_tick_1.set(-12,185)
       Scenes.items.part_3_option_4_graph.set(295,-60,60)
       let graph_box5 = new Dom(".graph_box5")
       // ! graph
      Scenes.items.graph4.set(null,null,190,290)
      Scenes.items.graph5.set(null,200,190,290)
      graph_box5.set(null,140)
      let table = Scenes.items.part3_table_four.item

      let ctx1 = Scenes.items.graph4.item
      let ctx2 = Scenes.items.graph5.item
      let chart1 = null
      let chart2 = null
      
      let xLabel = ""
      let yLabel = ""

      let config = {
        type: "bar",
        data: {
          labels: ["Vs", "Vd", "Vc", "Vo"],
          datasets: [
            {
              backgroundColor: ['blue','red','purple','green'],
              // data: [10,10,20],
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
          title:{
            display: true,
            text: "Voltage Stress"
          },
          plugins: [{
            afterDraw: chart => {
              var ctx = chart.chart.ctx;
              ctx.save();
              ctx.textAlign = 'center';
              ctx.font = '18px Arial';
              ctx.fillStyle = 'black';
              ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
              ctx.textAlign = 'left';
              ctx.font = '10px Arial';
              ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
              ctx.restore();
            },
            
          }],
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: false,
                  labelString:yLabel,
                },
                ticks: { beginAtZero:true }
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: false,
                  labelString: xLabel,
                },
                ticks: { beginAtZero:true }
              },
            ],
          },
        },
      }

      function plotGraph(){
        chart1 = new Chart(ctx1,
          {
            type: "bar",
            data: {
              labels: ["", "", "", ""],
              datasets: [
                {
                  backgroundColor: ['blue','red','purple', 'green'],
                  // data: [10,10,20],
                },
              ]
            },
            plugins: [{
              afterDraw: chart => {
                var ctx = chart.chart.ctx;
                ctx.save();
                ctx.textAlign = 'center';
                ctx.font = '20px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText('v         v         v        v', chart.chart.width - 120- 10 , chart.chart.height - 24);
                ctx.textAlign = 'left';
                ctx.font = '12px Arial';
                ctx.fillText('S               D               C              0', chart.chart.width - 200- 10, chart.chart.height - 16);
                ctx.restore();
              },
              
            }],
            options: {
              legend: {
                display: false
              },
              title:{
                display: true,
                text: "Voltage Stress",
                fontColor: 'black',
                fontSize: 15,
              },
              scales: {
                yAxes: [
                  {
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                    },
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
              },
            },
          }
        )
        chart2 = new Chart(ctx2,
          {
            type: "bar",
            data: {
              labels: ["", "", "", ''],
              datasets: [
                {
                  backgroundColor: ['blue','red','purple', 'brown'],
                  // data: [10,10,20],
                },
              ]
            },
            plugins: [{
              afterDraw: chart => {
                var ctx = chart.chart.ctx;
                ctx.save();
                ctx.textAlign = 'center';
                ctx.font = '20px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText('i          i          i          i', chart.chart.width - 110 - 30 , chart.chart.height - 24);
                ctx.textAlign = 'left';
                ctx.font = '12px Arial';
                ctx.fillText('S               D               C                in', chart.chart.width - 195 - 30, chart.chart.height - 16);
                ctx.restore();
              },
              
            }],
            options: {
              legend: {
                display: false
              },
              title:{
                display: true,
                text: "Current Stress",
                fontColor: 'black',
                fontSize: 15,
              },
              scales: {
                yAxes: [
                  {
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                    },
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
              },
            },
          }  
        )
      }


      const graph = {
        addDataset(chart,label,bgColor,data){
          chart.data.datasets.push(
            {
              label: label,
              fill: true,
              borderColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(chart,index,data){
          console.log(data)
          if(data.length > 0){
            chart.data.datasets[index].data = data
          }else{
            chart.data.datasets[index].data.push(data)
          }
          chart.update()
        }
      }

       // ! ------------> If data already present plot the graph
        if(table.tBodies[0].rows[0].cells[6].innerHTML !== ""){
          setIsProcessRunning(false)
          Scenes.currentStep = 4
        }else{
          plotGraph()
          // Scenes.items.graph2.set(null,null,190,355)
          Scenes.items.graph4.set(null,null,190,290)
          Scenes.items.graph5.set(null,200,190,290)
        }   


       // *  chage the step size of the sliders
       let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
       dutyRatioSlider.min = "0.1"
       dutyRatioSlider.max = "0.9"
       dutyRatioSlider.step = "0.1"        
       dutyRatioSlider.value = 0.1

       // *  chage the step size of the sliders
       var resistanceSlider = Scenes.items.slider_R.item.children[1].children[0];
       resistanceSlider.min = "10"
       resistanceSlider.value = "10"
       resistanceSlider.max = "70"
       resistanceSlider.step = "1"
      //  Scenes.items.slider_R.item.children[1].children[1].innerHTML = "10"

      // Resistance slider
      // resistanceSlider.oninput = ()=>{
      //   let val = resistanceSlider.value
      //       if(val < 100){
      //           resistanceSlider.value = 50
      //       }else if(val < 200){
      //           resistanceSlider.value = 100
      //       }else if(val > 100){
      //           resistanceSlider.value = 200
      //       }
      //       Scenes.items.slider_R.item.children[1].children[1].innerHTML = resistanceSlider.value
      // }
        

      
       
       // ! onclick for record
       Scenes.items.record_btn.item.onclick = function(){
         let allSliderValue = $(".range-slider__value");
 
         let vInValue = Number(allSliderValue[0].innerHTML)
         let dutyRatioValue = Number(allSliderValue[1].innerHTML)
         let resistanceValue = Number(allSliderValue[2].value)

         updateValues(vInValue,dutyRatioValue,resistanceValue)
 
         let tableRow = table.tBodies[0].rows[0]
         tableRow.cells[1-1].innerHTML = vInValue
         tableRow.cells[2-1].innerHTML = dutyRatioValue
         tableRow.cells[3-1].innerHTML = resistanceValue
         tableRow.cells[4-1].innerHTML = Number(Formulas.stress.v0(values)).toFixed(2)
         tableRow.cells[5-1].innerHTML = Number(Formulas.stress.M(values)).toFixed(2)
         tableRow.cells[6-1].innerHTML = Number(Formulas.stress.i_L2(values)).toFixed(2)
         tableRow.cells[7-1].innerHTML = Number(Formulas.stress.i0(values)).toFixed(2)

         let iIn = Number(Formulas.stress.I_In(values)).toFixed(2)
         let v0 = Number(Formulas.stress.v0(values)).toFixed(2)
         let iL2 = Number(Formulas.stress.i_L2(values)).toFixed(2)
         let ic = Number(Formulas.stress.i_L2(values) - Formulas.stress.i0(values)).toFixed(2)
         // table two changes
         let table2Row = Scenes.items.part3_table_four_2.item.tBodies[0].rows
        table2Row[0].cells[1].innerHTML = `> v<sub>S</sub> (${v0})`
        table2Row[1].cells[1].innerHTML = `> v<sub>D</sub> (${v0})`
        table2Row[2].cells[1].innerHTML = `> v<sub>C</sub> (${v0})`
        
        table2Row[0].cells[2].innerHTML = `> i<sub>S</sub> (${iL2})`
        table2Row[1].cells[2].innerHTML = `> i<sub>D</sub> (${iL2})`
        table2Row[2].cells[2].innerHTML = `> i<sub>C</sub> (${ic})`

        // ! add values to graph
        let graph1_data = [v0,v0,v0,v0]
        let graph2_data = [iL2,iL2,ic,iIn]

        plotGraph()
        graph.addData(chart1,0,graph1_data)
        graph.addData(chart2,0,graph2_data)
        
          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false); 
          Scenes.currentStep = 4

          // ! fix resistance value to its original
          // resistanceSlider.min = 10
          // resistanceSlider.max = 500
          // resistanceSlider.step = 1        
          // resistanceSlider.value = 10
          // resistanceSlider.oninput = ()=>{}
       }    
      

      
      return true
    }),
    // (completed = function () {
    //   Dom.hideAll();
    //   Scenes.items.contentAdderBox.setContent("");

    //   // get(".btn-save").style.display = "block";
    //   Scenes.items.btn_save.show().push();
    //   Dom.setBlinkArrow(-1);
    //   setCC("Download it and share with your friends.");
    //   // certificate name
    //   let certificateStuName = get("#certificateStuName");
    //   certificateStuName.innerHTML = student_name;
    //   // get("#quizScore").innerHTML = Quiz.score;
    //   get("#certificateDate").innerHTML = currentDateGlobal;
    //   Scenes.items.certificate.show("flex").push();

    //   // * restart btn

    //   let nxtBtn = get(".btn-next");
    //   nxtBtn.innerHTML = "Restart";
    //   nxtBtn.onclick = function () {
    //     location.reload();
    //   }

    //   return true;
    // }),
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

// * slider
var rangeSlider = function () {
  var slider = $(".range-slider"),
    range = $(".range-slider__range"),
    value = $(".range-slider__value");

  slider.each(function () {
    value.each(function () {
      var value = $(this).prev().attr("value");
      $(this).html(value);
    });

    range.on("input", function () {
      $(this).next(value).html(this.value);
      $(this).next(value).val(this.value);
    });
  });
};
$(".resistance-input").on("keyup", () => {
  let slider = $(".slider_R .range-slider__range");
  let input = document.querySelector(".resistance-input");

  let min = 1;
  let max = Number(slider.attr("max"));
  // if (input.value < min) {
  //   input.value = min;
  // }
  if (input.value > max) {
    input.value = max;
  }
  slider.val(input.value);
});
rangeSlider();

// stepcalling
Scenes.currentStep = 5
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
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }