// * Audio Mute
let isMute = false;

// * Current Date
// let cd = new Date();
// var currentDateGlobal = `${cd.getDate()} - ${
//   cd.getMonth() + 1
// } - ${cd.getFullYear()}`

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
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    // this.ansDom.style.display = "none";
  },
  init() {
    // onclick for quiz close btn
    document.querySelector("#closeQuiz").onclick = () => {
      this.close();
    };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").addEventListener("click", () => {
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
    });
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
let currentDateGlobal = "";

// ! text to audio

const textToSpeach = (text) => {
  // if(isMute){
  //   return;
  // }
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(utterance);
  return utterance;
};

// for subtitile
let ccObj = null;
function setCC(text = null, speed = null) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  let ccDom = get(".steps-subtitle .subtitle");
  ccObj = new Typed(ccDom, {
    strings: ["", text],
    typeSpeed: 25,
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
    // coordinates
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.height = height;
    this.width = width;
    this.item.style.opacity = 1;
    this.item.style.transform = "translateX(0) translateY(0)";

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
  static arrayOfItems = [];
  static hideAll() {
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
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
      easing: "easeInOutExpo",
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
//       easing: "easeInOutExpo",
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
    yoke_front_to_back: new Dom("yoke_front_to_back"),
    yoke_front_to_side: new Dom("yoke_front_to_side"),
    yoke_front: new Dom("yoke_front"),
    yoke_back: new Dom("yoke_back"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBox: new Dom(".video-box"),
    videoBoxTitle: new Dom(".video-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    contentAdderBox: new Dom(".content-adder-box"),
    footing: new Dom("footing"),
    footingWithNailer: new Dom("footingWithNailer"),
    panelWall1: new Dom("FormPanelWall1"),
    panelWall2: new Dom("FormPanelWall2"),
    leftNut1: new Dom("leftNut1"),
    leftNut2: new Dom("leftNut2"),
    leftNut3: new Dom("leftNut3"),
    rightNut1: new Dom("rightNut1"),
    rightNut2: new Dom("rightNut2"),
    rightNut3: new Dom("rightNut3"),
    panel1: new Dom("panel1"),
    panel2: new Dom("panel2"),
    leftSheathing: new Dom("leftSheathing"),
    rightSheathing: new Dom("rightSheathing"),
    washer1: new Dom("washer1"),
    washer2: new Dom("washer2"),
    washer3: new Dom("washer3"),
    washer4: new Dom("washer4"),
    washer5: new Dom("washer5"),
    washer6: new Dom("washer6"),
    spacer1: new Dom("spacer1"),
    spacer2: new Dom("spacer2"),
    spacer3: new Dom("spacer3"),
    steelRod1: new Dom("steelRod1"),
    steelRod2: new Dom("steelRod2"),
    steelRod3: new Dom("steelRod3"),
    full_footing: new Dom("full_footing"),
    strongBack1: new Dom("strongBack1"),
    strongBack2: new Dom("strongBack2"),

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
      setIsProcessRunning(true);

      // starting elements

      // running
      isRunning = true;
      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on start to start the experiment");
      }, 1000);
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
                "Welcome to tensile strength of reinforcement bars experiment of concrete structures virtual lab developed by professor sahil bansal department of civil engineering iit delhi"
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
            },
            endDelay: 2000,
            opacity: [0, 1],
            complete() {
              // to hide previous step images
              intru.destroy();
              Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
              setCC("Click 'Next' to go to next step");
              Dom.setBlinkArrow(true, 790, 444).play();
              setIsProcessRunning(false);
            },
          });
      };
      return true;
    }),
    (objective = function () {
      isRunning = true;
      // to stop current voice
      window.speechSynthesis.cancel();

      Scenes.items.welcomeBox.hide();

      Dom.setBlinkArrow(true, 790, 444);
      setCC("Click 'Next' to go to next step");

      Scenes.items.projectIntro.show().push();
      // Scenes.items.bare_raber.set(680, 185, 200, 10).zIndex(1).rotate(70).push(),
      //   Scenes.items.extensometer.set(550, 235, 45).zIndex(1).push(),
      //   Scenes.items.varniarfull.set(585, 250, 30).zIndex(1).rotate(160).push(),
      //   // Scenes.items.table.set(520, 130, 120).push(),
      //   Scenes.items.table.set(520, 245, 120).push(),
      //   Scenes.items.man.set(380, 120, 250).push(),
      //   Scenes.items.new_utm.set(140, 120, 250).push();
      setIsProcessRunning(false);

      return true;
    }),
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Dom.setBlinkArrow(-1);

      Scenes.setStepHeading("Step 1", "Bring the form panel in the lab");

      anime
        .timeline({
          easing: "easeOutExpo",
        })
        .add({
          begin() {
            Scenes.items.videoBox.show("flex").set(700, 157).push();
            Scenes.items.videoBoxSrc.item.src =
              "./src/videos/yoke_front_to_back.mp4";

            // * Video restart Btn
            let restartBtn = get(".video-box .controls .restart");
            restartBtn.onclick = function () {
              Scenes.items.videoBoxSrc.item.play();
            };

            Scenes.items.videoBoxSrc
              .set(null, null, 150)
              .show("flex")
              .play(0.4);
            Scenes.items.videoBoxTitle.item.innerHTML = "360 View";

            Scenes.items.yoke_back.set(100, 0, 350).push();
            Scenes.items.yoke_front.set(400, 0, 350).push();
          },
          duration: 4000,
        })
        .add({
          begin() {
            Scenes.items.larrow2.set(120, 340, 40).rotate(-90).zIndex(3).push();
            Scenes.items.larrow.set(490, -30, 40).rotate(-90).zIndex(3).push();
            Scenes.items.tempTitle1
              .set(175, 367)
              .setContent("Sheathing (Playwood)")
              .push();
            Scenes.items.tempTitle2
              .set(540, -40)
              .setContent("Yoke (Brackets/Braces)")
              .push();
            Scenes.items.tempTitle3
              .set(690, 10, null, 220)
              .setContent(
                "Form panel: A form panel refers to a large, flat panel used to create temporary molds or forms for casting concrete structures."
              )
              .push();
          },
        })
        .add({
          begin() {
            setCC("Click 'Next' to go to next step");
            Dom.setBlinkArrow(true, 790, 408).play();
            Quiz.loadQuiz();
            setIsProcessRunning(false);
          },
        });
      return true;
    }),
    (step2 = function () {
      // hide
      Dom.hideAll()

      setIsProcessRunning(true);

      Dom.setBlinkArrow(-1);

      Scenes.setStepHeading("Step 2", "Placing form panel in concrete footing");

      Scenes.items.contentAdderBox.show("flex").push();

      // onclick
      // Scenes.contentAdderAddBtn("Footing",0).addEventListener('click',()=>{
      //   Dom.setBlinkArrow(-1);
      //   Scenes.items.footing.set(0,0).zIndex(1);
      //   console.log("print")
      // })

      Scenes.contentAdderAddBtn("Footing");
      Scenes.contentAdderAddBtn("Nailer Insert");
      Scenes.contentAdderAddBtn("Form Panel");

      let contentAdderBtns = getAll(".content-adder-box .btn");

      setCC("Click on the 'Footing' to add footing in the lab.");
      Dom.setBlinkArrow(true, 710, 15).play();
      // onclick
      contentAdderBtns[0].onclick = () => {
        Dom.setBlinkArrow(-1);
        Scenes.items.footing.set(290, 350, 60, 250).zIndex(1).push();

        // Scenes.items.larrow2.set(735, 143, 40);
        // Scenes.items.tempTitle1
        //   .set(615, 180, null, 150)
        //   .setContent(
        //     "A footing supports and distributes the load of a building."
        //   );
        setCC("Click on the 'Nailer Insert' to add footing in the lab.");
        Dom.setBlinkArrow(true, 710, 65).play();

        // onclick
        contentAdderBtns[1].onclick = function () {
          Dom.setBlinkArrow(-1);
          Scenes.items.footingWithNailer.set(290, 350, 60, 250).zIndex(2).push();

          // Scenes.items.larrow2.set(735, 183, 40);
          // Scenes.items.tempTitle1
          // .set(615, 220, null, 150)
          // .setContent(
          //   "The purpose of a nailer insert is to create a secure attachment point for paneling."
          // );

          setCC("Click on the 'Form Panel' to add footing in the lab.");
          Dom.setBlinkArrow(true, 710, 115).play();
          //onclick
          contentAdderBtns[2].onclick = () => {
            // emptry onclick after use
            contentAdderBtns[2].onclick = () => {};

            Dom.setBlinkArrow(-1);
            Scenes.items.panel1.set(100, 0, 370).play(0.4).zIndex(1).push();
            anime
              .timeline({
                easing: "easeOutExpo",
              })
              .add({
                begin() {},
                duration: 5000,
                targets: Scenes.items.panel1.item,
                left: 270,
                complete() {
                  Scenes.items.panel2
                    .set(440, 0, 370)
                    .play(0.4)
                    .zIndex(1)
                    .show().push()
                },
              })
              .add({
                delay: 400,
                targets: Scenes.items.panel2.item,
                translateX: -75,
                duration: 5000,
                complete() {
                  setCC("Click 'Next' to go to next step");
                  Dom.setBlinkArrow(true, 790, 408).play();
                  Quiz.loadQuiz();
                  setIsProcessRunning(false);
                },
              });
          };
        };
      };
      return true;
      // remove all the previous elements
      // Dom.hideAll();
    }),
    (step3 = function () {
      setIsProcessRunning(true);

      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = "";

      // Required Elements
      Scenes.setStepHeading("Step 3", "Placing Sheathing in the panel");
      Scenes.items.footingWithNailer.set(290, 350, 60, 250).zIndex(1);
      Scenes.items.panelWall1.set(340, 0, 370);
      Scenes.items.panelWall2.set(480, 0, 370);

      // content adder
      Scenes.items.contentAdderBox.show("flex").push();
      Scenes.contentAdderAddBtn("Sheathing Left");
      Scenes.contentAdderAddBtn("Sheathing Right");

      setCC("Click on the 'Sheathing Left' to add footing in the lab.");
      Dom.setBlinkArrow(true, 685, 15).play();

      let contentAdderBtns = getAll(".content-adder-box .btn");

      contentAdderBtns[0].onclick = () => {
        Scenes.items.leftSheathing.set(360, 0, 370, 10);

        setCC("Click on the 'Sheathing Right' to add footing in the lab.");
        Dom.setBlinkArrow(true, 685, 65).play();
        // onclick
        contentAdderBtns[1].onclick = () => {
          Dom.setBlinkArrow(-1);
          Scenes.items.rightSheathing
            .set(470, 0, 370, 10)
            .zIndex(0)
            .rotate(180);

          setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 408).play();
          Quiz.loadQuiz();
          setIsProcessRunning(false);
        };
      };
      return true;
    }),
    (step4 = function () {
      setIsProcessRunning(true);
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "Step 4",
        "Insert the spread washer, spacer, steel rod, lock nuts in the form panel"
      );

      // Required elements
      Scenes.items.footingWithNailer.set(140, 350, 60, 250).zIndex(4);
      Scenes.items.panelWall1.set(190, 0, 370).zIndex(3);
      Scenes.items.panelWall2.set(330, 0, 370).zIndex(3);
      Scenes.items.rightSheathing
        .set(320, 0, 370, 10)
        .zIndex(0)
        .rotate(180)
        .zIndex(3);
      Scenes.items.leftSheathing.set(210, 0, 370, 10).zIndex(3);

      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push();
      Scenes.contentAdderAddBtn("Spread Washer");
      Scenes.contentAdderAddBtn("Spacer");
      Scenes.contentAdderAddBtn("Steel Rod");
      Scenes.contentAdderAddBtn("Lock Nut");
      let contentAdderBtns = getAll(".content-adder-box .btn");

      // ! add to onclick
      // Scenes.items.washer1.set(217,63,25,8).zIndex(3)
      // Scenes.items.washer2.set(217,183,25,8).zIndex(3)
      // Scenes.items.washer3.set(217,303,25,8).zIndex(3)
      // Scenes.items.washer4.set(313,63,25,8).zIndex(3)
      // Scenes.items.washer5.set(313,183,25,8).zIndex(3)
      // Scenes.items.washer6.set(313,303,25,8).zIndex(3)

      // Scenes.items.spacer1.set(212.5,60,30,112).zIndex(2)
      // Scenes.items.spacer2.set(212.5,180,30,112).zIndex(2)
      // Scenes.items.spacer3.set(212.5,300,30,112).zIndex(2)

      // Scenes.items.steelRod1.set(125,62,25,290).zIndex(0)
      // Scenes.items.steelRod2.set(125,182,25,290).zIndex(0)
      // Scenes.items.steelRod3.set(125,302,25,290).zIndex(0)

      // Scenes.items.leftNut1.set(155,45,60,38).zIndex(1)
      // Scenes.items.leftNut2.set(155,165,60,38).zIndex(1)
      // Scenes.items.leftNut3.set(155,285,60,38).zIndex(1)

      // Scenes.items.rightNut1.set(350,45,60,38).zIndex(1)
      // Scenes.items.rightNut2.set(350,165,60,38).zIndex(1)
      // Scenes.items.rightNut3.set(350,285,60,38).zIndex(1)

      // default washer position
      Scenes.items.washer1.set(467, 320, 25, 8).zIndex(3);
      Scenes.items.washer2.set(467, 320, 25, 8).zIndex(3);
      Scenes.items.washer3.set(467, 320, 25, 8).zIndex(3);
      Scenes.items.washer4.set(467, 320, 25, 8).zIndex(3);
      Scenes.items.washer5.set(467, 320, 25, 8).zIndex(3);
      Scenes.items.washer6.set(467, 320, 25, 8).zIndex(3);

      // default spacer position
      Scenes.items.spacer1.set(520, 320, 30, 112).zIndex(2);
      Scenes.items.spacer2.set(520, 320, 30, 112).zIndex(2);
      Scenes.items.spacer3.set(520, 320, 30, 112).zIndex(2);

      // default steel rod position
      Scenes.items.steelRod1.set(417, 370, 25, 290).zIndex(0);
      Scenes.items.steelRod2.set(417, 370, 25, 290).zIndex(0);
      Scenes.items.steelRod3.set(417, 370, 25, 290).zIndex(0);

      // default nut position
      Scenes.items.leftNut1.set(30, 340, 60, 38).zIndex(1).rotate(40);
      Scenes.items.leftNut2.set(30, 340, 60, 38).zIndex(1).rotate(40);
      Scenes.items.leftNut3.set(30, 340, 60, 38).zIndex(1).rotate(40);
      Scenes.items.rightNut1.set(80, 340, 60, 38).zIndex(1).rotate(-40);
      Scenes.items.rightNut2.set(80, 340, 60, 38).zIndex(1).rotate(-40);
      Scenes.items.rightNut3.set(80, 340, 60, 38).zIndex(1).rotate(-40);

      setCC("Click on the 'Spread Washer' to place it on the form panel.");
      Dom.setBlinkArrow(true, 690, -35).play();
      // onclick
      let washerIdx = 0;
      let positionIdx = 0;
      contentAdderBtns[0].onclick = () => {
        let allWasherDom = getAll(".washer");
        let position = [63, 183, 303];
        anime
          .timeline({
            easing: "easeOutQuad",
          })
          .add({
            targets: allWasherDom[washerIdx++],
            keyframes: [{ top: position[positionIdx] }, { left: 217 }],
            duration: 2000,
          })
          .add({
            targets: allWasherDom[washerIdx++],
            keyframes: [{ top: position[positionIdx++] }, { left: 313 }],
            duration: 2000,
            complete() {
              // onclick
              if (washerIdx >= allWasherDom.length) {
                contentAdderBtns[0].onclick = () => {};

                setCC("Click on the 'Spacer' to place it in the form panel.");
                Dom.setBlinkArrow(true, 690, 10).play();

                // onclick
                let spacerIdx = 0;
                contentAdderBtns[1].onclick = () => {
                  let allSpacerDom = getAll(".spacer");
                  let position = [60, 180, 300];
                  anime
                    .timeline({
                      easing: "easeOutQuad",
                    })
                    .add({
                      targets: allSpacerDom[spacerIdx],
                      keyframes: [
                        { top: position[spacerIdx++] },
                        { left: 212.5 },
                      ],
                      duration: 1500,
                    });

                  if (spacerIdx >= allSpacerDom.length) {
                    // to blank the onlclick
                    contentAdderBtns[1].onclick = () => {};

                    setCC(
                      "Click on the 'Steel Rod' to place it in the form panel."
                    );
                    Dom.setBlinkArrow(true, 690, 65).play();

                    // onclick
                    let steelRodIdx = 0;
                    contentAdderBtns[2].onclick = () => {
                      let allSteelRodDom = getAll(".steelrod");
                      let position = [62, 182, 302];
                      anime
                        .timeline({
                          easing: "easeOutQuad",
                        })
                        .add({
                          targets: allSteelRodDom[steelRodIdx],
                          keyframes: [
                            { top: position[steelRodIdx++] },
                            { left: 125 },
                          ],
                          duration: 1500,
                        });

                      // onclick
                      if (steelRodIdx >= allSteelRodDom.length) {
                        contentAdderBtns[2].onclick = () => {};

                        setCC(
                          "Click on the 'Lock Nut' to place it in the form panel."
                        );
                        Dom.setBlinkArrow(true, 690, 120).play();

                        // onclick lock nut
                        let nutIdx = 0;
                        contentAdderBtns[3].onclick = () => {
                          let allLeftNutDom = getAll(".leftNut");
                          let allRightNutDom = getAll(".rightNut");
                          const allNuts = [...allLeftNutDom,...allRightNutDom]
                          for(let i of allNuts){
                            i.style.transform = "rotate(0deg)";
                          }
                          let position = [45, 165, 285];
                          anime
                            .timeline({
                              easing: "easeOutQuad",
                            })
                            .add({
                              targets: allLeftNutDom[nutIdx],
                              keyframes: [
                                { top: position[nutIdx] },
                                { left: 155 },
                              ],
                              duration: 1500,
                            })
                            .add({
                              targets: allRightNutDom[nutIdx],
                              keyframes: [
                                { top: position[nutIdx++] },
                                { left: 350 },
                              ],
                              duration: 1500,
                            });
                          if(nutIdx >= allLeftNutDom.length){
                            setCC("Click 'Next' to go to next step");
                            Dom.setBlinkArrow(true, 790, 408).play();
                            Quiz.loadQuiz()
                            setIsProcessRunning(false);
                          }
                        };
                      }
                    };
                  }
                };
              }
            },
          });
      };
      return true;
    }),
    (step5 = function(){
      setIsProcessRunning(true);
      Scenes.setStepHeading("Step 5","Insert the strong back to support the form panel.")
      // todo remove all previous
      Scenes.items.contentAdderBox.setContent("");


      // todo Required Items
      Scenes.items.footingWithNailer.set(340, 350, 60, 250).zIndex(4).push()
      Scenes.items.full_footing.set(0, 350, 60, 950).zIndex(3).push()
      Scenes.items.panelWall1.set(390, 0, 370).zIndex(3).push()
      Scenes.items.panelWall2.set(530, 0, 370).zIndex(3).push()
      Scenes.items.rightSheathing.set(520, 0, 370, 10).zIndex(0).rotate(180).zIndex(3).push()
      Scenes.items.leftSheathing.set(410, 0, 370, 10).zIndex(3).push()
      
      Scenes.items.washer1.set(417,63,25,8).zIndex(3).push()
      Scenes.items.washer2.set(417,183,25,8).zIndex(3).push()
      Scenes.items.washer3.set(417,303,25,8).zIndex(3).push()

      Scenes.items.washer4.set(513,63,25,8).zIndex(3).push()
      Scenes.items.washer5.set(513,183,25,8).zIndex(3).push()
      Scenes.items.washer6.set(513,303,25,8).zIndex(3).push()

      Scenes.items.spacer1.set(412.5,60,30,112).zIndex(2).push()
      Scenes.items.spacer2.set(412.5,180,30,112).zIndex(2).push()
      Scenes.items.spacer3.set(412.5,300,30,112).zIndex(2).push()

      Scenes.items.steelRod1.set(325,62,25,290).zIndex(0).push()
      Scenes.items.steelRod2.set(325,182,25,290).zIndex(0).push()
      Scenes.items.steelRod3.set(325,302,25,290).zIndex(0).push()

      Scenes.items.leftNut1.set(355,45,60,38).zIndex(1).push()
      Scenes.items.leftNut2.set(355,165,60,38).zIndex(1).push()
      Scenes.items.leftNut3.set(355,285,60,38).zIndex(1).push()

      Scenes.items.rightNut1.set(550,45,60,38).zIndex(1).push()
      Scenes.items.rightNut2.set(550,165,60,38).zIndex(1).push()
      Scenes.items.rightNut3.set(550,285,60,38).zIndex(1).push()

      // content adder
      Scenes.items.contentAdderBox.set(null, -50).show("flex").push().push()
      Scenes.contentAdderAddBtn("Strong Back Left") 
      Scenes.contentAdderAddBtn("Strong Back Right") 
      let contentAdderBtns = getAll(".content-adder-box .btn")

      Dom.setBlinkArrow(true,670,-34).play()
      setCC("Click on the 'Strong Back Left' to add strong back to support panel.")

      // onclick 
      contentAdderBtns[0].onclick = ()=>{
        Scenes.items.strongBack1.set(250,50).rotate(50)
        Dom.setBlinkArrow(true,670,10).play()
        setCC("Click on the 'Strong Back Right' to add strong back to support panel.")
        // onclick 
        contentAdderBtns[1].onclick = ()=>{
          Scenes.items.strongBack2.set(670,50).rotate(-50)
          setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 408).play();
          Quiz.loadQuiz();
          setIsProcessRunning(false);
        }

      }
      return true;
    }),
    (completed = function () {
      Dom.hideAll();
      Scenes.items.contentAdderBox.setContent("");

      get(".btn-save").style.display = "block";
      Dom.setBlinkArrow(-1);
      setCC("Download it and share with your friends.")
      // certificate name
      let certificateStuName = get("#certificateStuName");
      certificateStuName.innerHTML = student_name;
      get("#quizScore").innerHTML = Quiz.score;
      get("#certificateDate").innerHTML = "13-10-2023";
      Scenes.items.certificate.show("flex");

      // * restart btn

      let nxtBtn = get(".btn-next");
      nxtBtn.innerHTML = "Restart";
      nxtBtn.onclick = function(){
        location.reload();
      }

      return true;
    }),
  ],
  back() {
    //! animation isRunning
    if (isRunning) {
      return;
    }
    if (this.currentStep > 1) {
      Scenes.deleteAll();
      this.currentStep -= 2;
      this.steps[this.currentStep]();
      this.currentStep++;
      nextDrawerItem();
      nextProgressBar();
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
};

// Scenes.steps[7]();
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
// Scenes.steps[2]();
// Scenes.steps[4]()
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
//   let _position = `X: ${x - 232}<br>Y: ${y - 230}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }
