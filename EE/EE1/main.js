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
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
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
part_3_graph_arrow : new Dom("part_3_graph_arrow"),
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

      Scenes.setStepHeading("Step 1", "Circuit Formulation");
        

      setCC("Click on the correct BOX(?) for placing the highlighed component.")
      Scenes.items.full_circuit.set(0,0)

      // box img mapping to domQus
      let boxCount = 1;
 
      // ! Required Postion
      Scenes.items.box_img.set(58,-10,150)
      // Scenes.items.box_img.set(190,-10,150,80)
      // Scenes.items.box_img.set(270,10,100,150)
      // Scenes.items.box_img.set(445,13,100,180)
      // Scenes.items.box_img.set(625,-10,160,120)
      // Scenes.items.box_img.set(740,-10,130,100)

      Scenes.items.component_mosfet.set(-300,-220)
      Scenes.items.component_register.set(-470,-215)
      Scenes.items.component_diode.set(-190,-120)
      Scenes.items.component_inductor.set(200,-120)
      Scenes.items.component_battery.set(440,-215) 
      Scenes.items.component_capacitor.set(160,-220)

      Scenes.items.slider_box.hide()
      
      // * Part One Logic
      Scenes.items.domQs1.set(388,227)
      Scenes.items.domQs2.set(677,236)
      Scenes.items.domQs3.set(504,138)
      Scenes.items.domQs4.set(285,143)
      Scenes.items.domQs5.set(203,226)
      Scenes.items.domQs6.set(598,238)
      let qsBtns = document.querySelectorAll(".qs")

      // Adding onclick to all qs
      for(let i of qsBtns){
        i.onclick = function(){
          checkClick(i)
        }
      }

      const checkClick = (qsBtnDom) =>{
        let isSame = qsBtnDom.classList.contains(`qs${boxCount}`)
        if(isSame){
          animateComponent(qsBtnDom);
          // to go to next component
          boxCount++
          console.log(boxCount)
          if(boxCount>5){
              // after complete
              Dom.setBlinkArrow(true, 790, 408).play();
              setCC("Click 'Next' to go to next step");
              setIsProcessRunning(false);
          }
        }
        else{
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
        "Step 2",
        "Part 2"
      )


      //! Required Items
       Scenes.items.run_btn.set(60,340,55)
       Scenes.items.part_2_circuit.set(5,180,140)
       Scenes.items.part_2_graph_1.set(280,-40,430)
       Scenes.items.part_2_graph_2.set(280,-40,430).hide()
       Scenes.items.part_2_graph_3.set(280,-40,430).hide()
       
       let graphLeft = 280, graphTop = -40, graphHeight = 430

       // temp text on required positions
       let allTempTitles = [
        Scenes.items.tempTitle1.setContent("0").set(381,118),
        Scenes.items.tempTitle2.setContent("0").set(460,118),
        Scenes.items.tempTitle3.setContent("0").set(378,141),
        Scenes.items.tempTitle4.setContent("0").set(449,141),
        Scenes.items.tempTitle5.setContent("0").set(597,121),
        Scenes.items.tempTitle6.setContent("0").set(665,141),
        Scenes.items.tempTitle7.setContent("0").set(817,121),
        Scenes.items.tempTitle8.setContent("0").set(884,121),
        Scenes.items.tempTitle9.setContent("0").set(890,141),
        Scenes.items.tempTitle10.setContent("0").set(381,342),
        Scenes.items.tempTitle11.setContent("0").set(449,342),
        Scenes.items.tempTitle12.setContent("0").set(378,364),
        Scenes.items.tempTitle13.setContent("0").set(446,364),
        Scenes.items.tempTitle14.setContent("0").set(665,342),
        Scenes.items.tempTitle15.setContent("0").set(596,364),
        Scenes.items.tempTitle16.setContent("0").set(818,344),
        Scenes.items.tempTitle17.setContent("0").set(886,344),
        Scenes.items.tempTitle18.setContent("0").set(817,364),
        Scenes.items.tempTitle19.setContent("0").set(886,364)
       ]

       let currentGraph = Scenes.items.part_2_graph_1

       // *  chage the step size of the sliders
       let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
       dutyRatioSlider.min = "0.25"
       dutyRatioSlider.max = "0.75"
       dutyRatioSlider.step = "0.25"        
       Scenes.items.slider_D.item.children[1].children[1].innerHTML = "0.25"
       
       // ! onclick for record
       Scenes.items.run_btn.item.onclick = function(){
          let allSliderValue = $(".range-slider__value");

          let vInValue = Number(allSliderValue[0].innerHTML)
          let dutyRatioValue = Number(allSliderValue[1].innerHTML)
          let resistanceValue = Number(allSliderValue[2].innerHTML)

          updateValues(vInValue,dutyRatioValue,resistanceValue)


          if(dutyRatioValue==0.25){
            // for(let i of allTempTitles){
            //   i.hide()
            // }

            // anime.timeline({
            //   easing: "easeInOutQuad",
            //   duration: 2000,
            // })  
            // .add({
            //   targets: currentGraph.item,
            //   opacity: 0,
            // })
            // .add({
            //   targets: Scenes.items.part_2_graph_1.item,
            //   opacity: 1
            // })

            currentGraph.hide()
            Scenes.items.part_2_graph_1.show()
            currentGraph = Scenes.items.part_2_graph_1
          }


          if(dutyRatioValue==0.5){
            // for(let i of allTempTitles){
            //   i.hide()
            // }

            // anime.timeline({
            //   easing: "easeInOutQuad",
            //   duration: 2000,
            // })  
            // .add({
            //   targets: currentGraph.item,
            //   opacity: 0,
            // })
            // .add({
            //   targets: Scenes.items.part_2_graph_3.item,
            //   opacity: 1,
            //   complete(){
            //     for(let i of allTempTitles){
            //       i.show()
            //     }
            //   }
            // })
            currentGraph.hide()
            Scenes.items.part_2_graph_2.show()
            currentGraph = Scenes.items.part_2_graph_2
          }


          if(dutyRatioValue==0.75){
            // for(let i of allTempTitles){
            //   i.hide()
            // }

            // anime.timeline({
            //   easing: "easeInOutQuad",
            //   duration: 2000,
            // })  
            // .add({
            //   targets: currentGraph.item,
            //   opacity: 0,
            // })
            // .add({
            //   targets: Scenes.items.part_2_graph_3.item,
            //   opacity: 1,
            //   complete(){
            //     for(let i of allTempTitles){
            //       i.show()
            //     }
            //   }
            // })

            currentGraph.hide()
            Scenes.items.part_2_graph_3.show()
            currentGraph = Scenes.items.part_2_graph_3

            // after complete
            Dom.setBlinkArrow(true, 790, 408).play();
            setCC("If all reading done, Click 'Next' to go to next step");
            setIsProcessRunning(false);
          }

          

       }    
      

      
      return true
    }),
    (step3 = function () {
      setIsProcessRunning(true);
      
      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step 3", "Performance Analysis.");
      
      // * Required Elements

      Scenes.items.circuit_full_2.set(230,-20,200)
      Scenes.items.part_3_option_1.set(100-60, 270)
      Scenes.items.part_3_option_2.set(250-60, 270)
      Scenes.items.part_3_option_3.set(470-60, 270)
      Scenes.items.part_3_option_4.set(660-60, 270)

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
      options[0].item.onclick = ()=>{
        if(Scenes.optionsDone[0]==1){
          return
        }
        
        Scenes.optionsDone[0]=1;

        Scenes.steps[0+5]()
      }
      options[1].item.onclick = ()=>{
        if(Scenes.optionsDone[1]==1){
          return
        }
        
        Scenes.optionsDone[1]=1;

        Scenes.steps[1+5]()
      }
      options[2].item.onclick = ()=>{
        if(Scenes.optionsDone[2]==1){
          return
        }
        
        Scenes.optionsDone[2]=1;

        Scenes.steps[2+5]()
      }
      options[3].item.onclick = ()=>{
        if(Scenes.optionsDone[3]==1){
          return
        }
        
        Scenes.optionsDone[3]=1;

        Scenes.steps[3+5]()

      }

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
        Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulator Done");
        setIsProcessRunning(false);
      }

      return true;

    }),
    (step4 = function () {
      Dom.hideAll(); 
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "Step 4",
        "Ideal voltage gain plot."
      );
      // ! required item
      Scenes.items.circuit_full_3.set(230,-70,200)
      Scenes.items.part_3_option_1.set(10, 170)
      Scenes.items.record_btn.set(40,310,70)
      Scenes.items.part3_table_one.show()


      
      let table = Scenes.items.part3_table_one.item
      // ! onclick for record
      let recordBtnClickIdx = 0
      Scenes.items.record_btn.item.onclick = function(){
        let allSliderValue = $(".range-slider__value");

        let vInValue = Number(allSliderValue[0].innerHTML)
        let dutyRatioValue = Number(allSliderValue[1].innerHTML)
        let resistanceValue = Number(allSliderValue[2].innerHTML)
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
        tableRow.cells[4].innerHTML = Formulas.v0(values)
        tableRow.cells[5].innerHTML = Formulas.M_1(values)
        tableRow.cells[6].innerHTML = Formulas.iIn(values)
        tableRow.cells[7].innerHTML = Formulas.i0(values)

        if(recordBtnClickIdx>6){
          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false); 
          Scenes.currentStep = 4
        }
      }    

      

      

      return true;

    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "Step 5",
        "Non-ideal voltage gain plot."
      );

      //! Required Items
      Scenes.items.circuit_full_3.set(230,-70,200)
      Scenes.items.part_3_option_2.set(-20, 170)
       Scenes.items.record_btn.set(40,310,70)
       Scenes.items.part3_table_two.show("flex")

       // vIn already set to 12
       Scenes.items.slider_vIn.item.children[1].children[0].value = 12
       Scenes.items.slider_vIn.item.children[1].children[0].disabled = true
       Scenes.items.slider_vIn.item.children[1].children[0].classList.add("deactive")
       
       //! final pos

       //to access thead of the table 
      //  Scenes.items.part3_table_two.item.children[0].tHead.rows[0].innerHTML

       let table = Scenes.items.part3_table_two.item
       let table1 = table.children[0]
       let table2 = table.children[1]
       let table3 = table.children[2]
      //  console.log("sneha")
      //  console.log(table1.tHead.rows[0])
       // ! onclick for record
       let recordBtnClickIdx = 0
       Scenes.items.record_btn.item.onclick = function(){
         let allSliderValue = $(".range-slider__value");
 
         let vInValue = Number(allSliderValue[0].innerHTML)
         let dutyRatioValue = Number(allSliderValue[1].innerHTML)
         let resistanceValue = Number(allSliderValue[2].innerHTML)
         updateValues(vInValue,dutyRatioValue,resistanceValue)
 
         // deactivate the sliders after first value done
         // todo
        //  if(recordBtnClickIdx == 0){
        //    Scenes.items.slider_vIn.item.classList.add("deactive")
        //    Scenes.items.slider_vIn.item.children[1].children[0].disabled = true
        //    Scenes.items.slider_R.item.children[1].children[0].disabled = true
        //    Scenes.items.slider_R.item.classList.add("deactive")
        //  }


               
         let tableHead1 = table1.tHead.rows[0]
         let tableHead2 = table2.tHead.rows[0]
         let tableHead3 = table3.tHead.rows[0]

        //  tableHead1.innerHTML = resistanceValue
        //  tableHead2.innerHTML = resistanceValue
        //  tableHead3.innerHTML = resistanceValue
         
          if(recordBtnClickIdx < 7){
            

            if(recordBtnClickIdx==0){
              tableHead1.cells[0].innerHTML = "R = " + resistanceValue
              Scenes.items.slider_R.item.children[1].children[0].disabled = true
              Scenes.items.slider_R.item.classList.add("deactive")
            }
            
            updateValues(vInValue,dutyRatioValue,resistanceValue)
            
            let tableRow = table1.tBodies[0].rows[recordBtnClickIdx++]
            tableRow.cells[0].innerHTML = dutyRatioValue
            tableRow.cells[1].innerHTML = Formulas.M_2(values)
            
            if(recordBtnClickIdx==7){
              Scenes.items.slider_R.item.children[1].children[0].disabled = false
              Scenes.items.slider_R.item.classList.remove("deactive")
            }
          }
          else if(recordBtnClickIdx < 15){
            // vIn already 
            Scenes.items.slider_vIn.item.children[1].children[0].value = 24
            Scenes.items.slider_vIn.item.children[1].children[1].value = 24
            Scenes.items.slider_vIn.item.children[1].children[0].disabled = true

            if(recordBtnClickIdx%7==0){
              tableHead2.cells[0].innerHTML = "R = " + resistanceValue
              Scenes.items.slider_R.item.children[1].children[0].disabled = true
              Scenes.items.slider_R.item.classList.add("deactive")
            }
            

            updateValues(vInValue,dutyRatioValue,resistanceValue)

            let tableRow = table2.tBodies[0].rows[recordBtnClickIdx++%8]
            tableRow.cells[0].innerHTML = dutyRatioValue
            tableRow.cells[1].innerHTML = Formulas.M_2(values)

            if(recordBtnClickIdx==14){
              Scenes.items.slider_R.item.children[1].children[0].disabled = false
              Scenes.items.slider_R.item.classList.remove("deactive")
            }
          } 
          else{
             // vIn already 
             Scenes.items.slider_vIn.item.children[1].children[0].value = 36
             Scenes.items.slider_vIn.item.children[1].children[1].value = 36
             Scenes.items.slider_vIn.item.children[1].children[0].disabled = true
 
             if(recordBtnClickIdx%7==0){
               tableHead3.cells[0].innerHTML = "R = " + resistanceValue
               Scenes.items.slider_R.item.children[1].children[0].disabled = true
               Scenes.items.slider_R.item.classList.add("deactive")
             }
             
 
             updateValues(vInValue,dutyRatioValue,resistanceValue)
 
             let tableRow = table3.tBodies[0].rows[recordBtnClickIdx++%8]
             tableRow.cells[0].innerHTML = dutyRatioValue
             tableRow.cells[1].innerHTML = Formulas.M_2(values)

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
        "Step 6",
        "Efficiency. Plot"
      )


      //! Required Items
      Scenes.items.circuit_full_3.set(230,-70,200)
       Scenes.items.part_3_option_3.set(-30, 170)
       Scenes.items.record_btn.set(40,310,70)
       Scenes.items.part3_table_three.show()

       
       let table = Scenes.items.part3_table_three.item
      // ! onclick for record
      let recordBtnClickIdx = 0
      Scenes.items.record_btn.item.onclick = function(){
        let allSliderValue = $(".range-slider__value");

        let vInValue = Number(allSliderValue[0].innerHTML)
        let dutyRatioValue = Number(allSliderValue[1].innerHTML)
        let resistanceValue = Number(allSliderValue[2].innerHTML)
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
        tableRow.cells[4].innerHTML = Formulas.v0(values)
        tableRow.cells[5].innerHTML = Formulas.M_1(values)
        tableRow.cells[6].innerHTML = Formulas.iIn(values)
        tableRow.cells[7].innerHTML = Formulas.i0(values)
        tableRow.cells[8].innerHTML = Formulas.pIn(values)
        tableRow.cells[9].innerHTML = Formulas.p0(values)
        tableRow.cells[10].innerHTML = Formulas.eff(values)

        if(recordBtnClickIdx>6){
          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false); 
          Scenes.currentStep = 4
        }
      }    
       
      

      
      return true
    }),
    (step7 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "Step 7",
        "Component Stress and Selection"
      )


      //! Required Items
      Scenes.items.circuit_full_2.set(230,-25,200)
       Scenes.items.part_3_option_4.set(-30, 170)
       Scenes.items.record_btn.set(40,310,70)
       Scenes.items.part3_table_four.show()
       Scenes.items.part3_table_four_2.show()

       // *  chage the step size of the sliders
       let resistanceSlider = Scenes.items.slider_R.item.children[1].children[0];
       resistanceSlider.min = "50"
       resistanceSlider.max = "200"

      // Resistance slider
      resistanceSlider.addEventListener('input',()=>{
        let val = resistanceSlider.value
        resistanceSlider.step = (val < 100) ? "50" : "80";
      })
        

       //! final pos
       let table = Scenes.items.part3_table_four.item
       // ! onclick for record
       Scenes.items.record_btn.item.onclick = function(){
         let allSliderValue = $(".range-slider__value");
 
         let vInValue = Number(allSliderValue[0].innerHTML)
         let dutyRatioValue = Number(allSliderValue[1].innerHTML)
         let resistanceValue = Number(allSliderValue[2].innerHTML)
         updateValues(vInValue,dutyRatioValue,resistanceValue)
 
         let tableRow = table.tBodies[0].rows[0]
         tableRow.cells[1-1].innerHTML = vInValue
         tableRow.cells[2-1].innerHTML = dutyRatioValue
         tableRow.cells[3-1].innerHTML = resistanceValue
         tableRow.cells[4-1].innerHTML = Formulas.v0(values)
         tableRow.cells[5-1].innerHTML = Formulas.M_1(values)
         tableRow.cells[6-1].innerHTML = Formulas.iIn(values)
         tableRow.cells[7-1].innerHTML = Formulas.i0(values)
        
          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false); 
          Scenes.currentStep = 4
       }    
      

      
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
    });
  });
};
rangeSlider();

// stepcalling
Scenes.currentStep = 2

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