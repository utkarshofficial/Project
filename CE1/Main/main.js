// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine View Answer",
      correct: "a",
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
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
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
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  currentQuiz: 0,
  score: 0,
  loadQuiz() {
    this.deselectAnswers();

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
  close(){
    document.querySelector("#closeQuiz").onclick = function(){
      document.querySelector(".quiz-container").style.display = "none";
    }
  },
  init() {
    this.close();
    document.getElementById("submit").addEventListener("click", () => {
      const answer = this.getSelected();
      if (answer) {
        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;
        if (this.currentQuiz < this.quizData.length) {
          this.loadQuiz();
        } else {
          //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
          // <button onclick="#">Reload</button>
          // `;
          // todo show above string to certificate
        }
      }
    });
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

const show = (ele, disp = "block") => {
  ele.style.display = disp;
  ele.style.opacity = 1;
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

// for subtitile
function setCC(text = null, speed = null) {
  let ccDom = get(".steps-subtitle .subtitle");
  let typed2 = new Typed(ccDom, {
    strings: ["", text],
    typeSpeed: 25,
  });
  return ccDom;
}

// support class for axis
class Img {
  constructor(
    imgName = null
    // left = null,
    // top = null,
    // height = null,
    // width = null,
    // bottom = null,
    // right = null
  ) {
    // coordinates
    // this.left = left;
    // this.top = top;
    // this.bottom = bottom;
    // this.right = right;
    // this.height = height;
    // this.width = this.width;
    this.img = src.get(imgName);
    return this;
  }
  zIndex(idx) {
    this.img.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.img.style.opacity = val;
  }
  rotate(deg) {
    this.img.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  scale(val = 1) {
    this.img.style.scale = val;
    return this;
  }
  get() {
    return this.img;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null
  ) {
    // coordinates
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.height = height;
    this.width = width;
    this.img.style.opacity = 1;
    this.img.style.transform = "translateX(0) translateY(0)";

    if (this.left !== null) this.img.style.left = String(this.left) + "px";
    if (this.top !== null) this.img.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.img.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.img.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.img.style.height = String(this.height) + "px";
    if (this.width !== null) this.img.style.width = String(this.width) + "px";
    this.show();
    return this;
  }
  show() {
    this.img.style.display = "block";
    this.opacity();
    return this;
  }
  hide() {
    this.img.style.display = "none";
    return this;
  }
  static arrayOfImages = [];
  static hideAll() {
    for (let i of Img.arrayOfImages) {
      i.hide();
      i.opacity();
    }
    Img.resetImages();
  }
  static resetImages() {
    Img.arrayOfImages = [];
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Img("blinkArrow")
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
      targets: blinkArrow.img,
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
    Img.arrayOfImages.push(this);
    return this;
  }
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  img: {
    bare_raber: new Img("bare_raber"),
    bare_raber2: new Img("bare_raber2"),
    bare_raber2marked: new Img("bare_raber2marked"),
    extensometer: new Img("grip"),
    varniarfull: new Img("varniarfull"),
    table: new Img("table"),
    man: new Img("man"),
    new_utm: new Img("new_utm"),
    tape: new Img("tape"),
    tableCrop: new Img("tableCrop"),
    measure1: new Img("measure1"),
    measurearrow: new Img("measurearrow"),
    measurearrow2: new Img("measurearrow2"),
    weight: new Img("weight"),
    marker: new Img("marker"),
    larrow: new Img("laerrow"),
    larrow2: new Img("laerrow2"),
    marker: new Img("marker"),
    cloud: new Img("cloud"),
    size: new Img("size"),
    highlightArrow: new Img("highlightArrow"),
    arrow: new Img("arrow"),
    graph1: new Img("Picture3"),
    graph2: new Img("Picture4"),
    graph3: new Img("Picture5"),
    graph4: new Img("Picture6"),
    breakRaber: new Img("brakeraber"),
    breakRaberJoin: new Img("brakeraberjoin"),
    break1: new Img("brake1"),
    break2: new Img("brake2"),
    varniarLeft: new Img("varniar"),
    varniarRight: new Img("varniar2"),
    reading1: new Img("varniar3"),
    reading2: new Img("varniar37"),
    lastCalc: new Img("lastCalc"),
    finalLastCalc: new Img("finalLastCalc"),
    blinkArrow: new Img("blinkArrow"),
    s0formula: new Img("S0_formula"),
    s0formula2: new Img("S0_formula3"),
  },
  domItems: {
    projectIntro: get(".project-intro"),
    header: get(".anime-header"),
    stepHeading: get(".step-heading"),
    stepTitle: get(".step-title"),
    stepDescription: get(".step-description"),
    tableCalc: get(".measurements"),
    tempText: get(".temp-text"),
    tempText2: get(".temp-text2"),
    tempInputBox: get(".temp-input"),
    tempInputBoxInput: get(".temp-input #ipnum"),
    tempInputT1: get(".temp-input .text1"),
    tempInputT2: get(".temp-input .text2"),
    tempInputError: get(".temp-input .error"),
    tempInputBtn: get(".temp-input .submit-btn"),
    utmBtn: get(".utm-button"),
    inputWindow: get(".user-input"),
    resultTable: get(".result-table"),
    certificate: get(".certificate"),
  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.domItems) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.domItems[i]);
    }
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },

  steps: [
    (intro = function () {
      // running
      isRunning = true;
      // subtitle
      setCC("Enter your name and click on start to start the experiment");
      set(Scenes.domItems.header, 0, 120);
      show(Scenes.domItems.header, "flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Img("man").set(650, 80);
      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        // if(student_name.trim() == ""){
        //   console.log(student_name)
        //   show(error);
        //   return;
        // }
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
            targets: man.img,
            translateX: -280,
          })
          .add({
            targets: Scenes.img.cloud.img,
            begin() {
              Scenes.domItems.tempText.innerHTML = `Hey!<br>${student_name}`;
              Scenes.domItems.tempText.style.fontWeight = "bold";
              show(Scenes.domItems.tempText);
              set(Scenes.domItems.tempText, 482, 1);
              Scenes.img.cloud.set(450, -40, 180);
            },
            opacity: [0, 1],
            complete() {
              setCC("Click 'Next' to go to next step");
              Img.setBlinkArrow(true, 790, 444).play();
              isRunning = false;
            },
          });
      };
      return true;
    }),
    (objective = function () {
      isRunning = true;

      // to hide previous step images
      Scenes.img.man.hide();
      Scenes.img.cloud.hide();
      hide(Scenes.domItems.tempText);
      let inputWindow = get(".user-input");
      inputWindow.style.display = "none";
      Img.setBlinkArrow(true, 790, 348).play();
      setCC("Click 'Next' to go to next step");

      show(Scenes.domItems.projectIntro);
      Scenes.img.bare_raber.set(720, 90, 150).zIndex(1).rotate(70).push(),
        Scenes.img.extensometer.set(550, 75, 80).zIndex(1).push(),
        Scenes.img.varniarfull.set(545, 120, 60).zIndex(1).rotate(160).push(),
        Scenes.img.table.set(520, 130, 120).push(),
        Scenes.img.man.set(380, 0, 250).push(),
        Scenes.img.new_utm.set(140, 0, 250).push();
      isRunning = false;

      return true;
    }),
    (step1 = function () {
      isRunning = true;
      // to hide previous step
      hide(Scenes.domItems.projectIntro);
      Img.hideAll();
      Img.setBlinkArrow(-1);

      setCC("Click the bar to set the bar on the table");
      Img.setBlinkArrow(true, 500, 110, null, null, 150).play();

      Scenes.domItems.stepTitle.innerHTML = "Step 1";
      Scenes.domItems.stepDescription.innerHTML =
        "Calculation of cross-sectional area:";
      show(Scenes.domItems.stepHeading, "flex");

      console.log(Scenes.domItems.stepHeading);
      Scenes.img.bare_raber.set(450, 55, 200).zIndex(3).rotate(310).push();
      Scenes.img.tape.set(330, 170, 80).zIndex(1).rotate(0).push();
      Scenes.img.weight.set(140, 140, 120).zIndex(1).push();
      Scenes.img.tableCrop.set(20, 50, 320, 680).push();
      var table = Scenes.domItems.tableCalc;
      show(table);
      set(table, 680, 0);

      // onclick bare raber
      Scenes.img.bare_raber.img.onclick = function () {
        Img.setBlinkArrow(-1);

        anime({
          targets: Scenes.img.bare_raber.img,
          rotate: {
            value: 270,
          },
          scaleY: {
            value: 2.6,
          },
          left: 360,
          top: 0,
          duration: 1000,
          easing: "easeInOutExpo",
          complete() {
            setCC(" Click on the tape to measure the length of specimen.");
            Img.setBlinkArrow(true, 340, 90, null, null, 90).play();

            Scenes.img.tape.img.onclick = function () {
              Img.setBlinkArrow(-1);
              anime({
                targets: Scenes.img.tape.img,
                left: 30,
                top: 70,
                duration: 1000,
                scale: 0.7,
                easing: "easeInOutExpo",
                // next step
                complete() {
                  Img.setBlinkArrow(-1);
                  Scenes.img.measure1.set(93, 60, 137, 0).zIndex(1).push();
                  Scenes.domItems.tempText.innerHTML =
                    "Total Length (m) = 0.805m";
                  Scenes.img.measurearrow
                    .set(355, 35, 90)
                    .zIndex(1)
                    .rotate(90)
                    .push();
                  Scenes.img.measurearrow2
                    .set(355, 35, 90)
                    .zIndex(1)
                    .rotate(270)
                    .push();
                  let calcLength =
                    Scenes.domItems.tableCalc.tBodies[0].rows[1].cells[1];

                  anime
                    .timeline({
                      easing: "easeInOutExpo",
                    })
                    .add({
                      targets: Scenes.img.measure1.img,
                      width: 535,
                      duration: 1000,
                    })
                    .add({
                      targets: Scenes.img.tape.img,
                      opacity: 0,
                      duration: 500,
                    })
                    .add(
                      {
                        targets: Scenes.img.measurearrow2.img,
                        left: 145,
                        duration: 1000,
                      },
                      700
                    )
                    .add(
                      {
                        targets: Scenes.img.measurearrow.img,
                        left: 573,
                        duration: 1000,
                      },
                      700
                    )
                    .add({
                      begin: function (anim) {
                        set(Scenes.domItems.tempText, 260, 65);
                      },
                    })
                    .add({
                      targets: calcLength,
                      begin: function (anime) {
                        calcLength.innerHTML = "0.805";
                      },
                      backgroundColor: ["#9F91CC", "#FFF"],
                      duration: 1000,
                    })
                    .add({
                      targets: [
                        Scenes.img.measurearrow.img,
                        Scenes.img.measurearrow2.img,
                        Scenes.img.measure1.img,
                        Scenes.domItems.tempText,
                      ],
                      opacity: 0,
                      // * onclick weight machine
                      complete: function () {
                        Img.setBlinkArrow(true, 65, 170).play();
                        setCC(
                          " Click on the weighing machine to measure the weight of specimen."
                        );

                        Scenes.img.weight.img.onclick = function () {
                          Img.setBlinkArrow(-1);

                          let w000 = new Img("000").push();
                          let w698 = new Img("875").push();
                          anime
                            .timeline({
                              easing: "easeInOutExpo",
                            })
                            .add({
                              targets: Scenes.img.weight.img,
                              left: 290,
                              top: 130,
                              scale: 1.6,
                              duration: 1000,
                            })
                            .add({
                              begin: function () {
                                w000.set(305, 215, 12, 55).zIndex(5);
                              },
                            })
                            .add({
                              targets: Scenes.img.bare_raber.img,
                              top: 100,
                              height: 100,
                              duration: 1000,
                            })
                            .add({
                              begin: function () {
                                w000.hide();
                                w698.set(305, 215, 12, 55).zIndex(5);
                              },
                            })
                            .add({
                              targets:
                                Scenes.domItems.tableCalc.tBodies[0].rows[2]
                                  .cells[1],
                              begin: function (anime) {
                                Scenes.domItems.tableCalc.tBodies[0].rows[2].cells[1].innerHTML =
                                  "0.698";
                              },
                              backgroundColor: ["#9F91CC", "#FFF"],
                              duration: 200,
                            })
                            .add({
                              targets: [
                                Scenes.img.bare_raber.img,
                                Scenes.img.weight.img,
                                Scenes.img.tableCrop.img,
                                w698.img,
                              ],
                              opacity: 0,
                              delay: 600,
                              complete() {
                                Img.hideAll();

                                // * After hiding the table calculate the area
                                setCC(
                                  " Calculate the cross-sectional area of bar using above formula."
                                );
                                Scenes.img.s0formula
                                  .set(122, 36, null, 200)
                                  .zIndex(5)
                                  .push();
                                let text = Scenes.domItems.tempText;
                                text.innerHTML = "weight (kg) and L(m)";
                                set(text, 315, 47);
                                show(text);
                                show(Scenes.domItems.tempInputBox);
                                set(Scenes.domItems.tempInputBox, 120, 129);
                                Scenes.domItems.tempInputT1.innerHTML =
                                  "S<sub>0</sub> = ";
                                Scenes.domItems.tempInputT2.innerHTML =
                                  "mm<sup>2</sup>";

                                show(Scenes.domItems.tableCalc);
                                set(Scenes.domItems.tableCalc, 680, 45);

                                // onclick
                                Scenes.domItems.tempInputBtn.onclick =
                                  function () {
                                    let s0 =
                                      Scenes.domItems.tempInputBoxInput.value;
                                    if (s0 != 110.4) {
                                      show(Scenes.domItems.tempInputError);
                                      Scenes.domItems.tempInputError.innerHTML =
                                        "Please enter correct value = 110.4";
                                    } else {
                                      // for reseting the value of input
                                      Scenes.domItems.tempInputBoxInput.value =
                                        "";

                                      hide(Scenes.domItems.tempInputError);
                                      anime
                                        .timeline({
                                          easing: "easeInOutExpo",
                                        })
                                        .add({
                                          targets:
                                            Scenes.domItems.tableCalc.tBodies[0]
                                              .rows[3].cells[1],
                                          begin: function (anime) {
                                            Scenes.domItems.tableCalc.tBodies[0].rows[3].cells[1].innerHTML =
                                              "110.4";
                                          },
                                          backgroundColor: ["#9F91CC", "#FFF"],
                                          duration: 1000,
                                        })
                                        .add({
                                          targets: [
                                            Scenes.img.s0formula.img,
                                            text,
                                            Scenes.domItems.tempInputBox,
                                          ],
                                          opacity: 0,
                                        })
                                        .add({
                                          targets: Scenes.domItems.tableCalc,
                                          // Todo increase size of table
                                          left: 315,
                                          top: 93,
                                          scale: 1.2,
                                          complete() {
                                            Img.hideAll();

                                            setCC(
                                              "Click 'Next' to go to next step"
                                            );
                                            Img.setBlinkArrow(
                                              true,
                                              790,
                                              418
                                            ).play();
                                            isRunning = false;
                                          },
                                        });
                                    }
                                  };
                              },
                            });
                        };
                      },
                    });
                },
              });
            };
          },
        });
      };

      return true;
    }),
    // Step 2
    (step2 = function () {
      isRunning = true;
      setCC("Calculate the guage length sing above formula.");
      Img.setBlinkArrow(-1);

      show(Scenes.domItems.stepHeading, "flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 2";
      Scenes.domItems.stepDescription.innerHTML =
        "Calculation of gauge length:";
      show(Scenes.domItems.tableCalc);
      Scenes.domItems.tableCalc.tBodies[0].innerHTML += `
      <tr>
        <th  class="cell" scope="col">Gauge Length (mm)</th>
        <td class="cell" ></td>
      </tr>
        `;
      anime
        .timeline({
          easing: "easeInOutExpo",
        })
        .add({
          targets: Scenes.domItems.tableCalc,
          // Todo increase size of table
          left: 680,
          top: 45,
          scale: 1,
        });

      Scenes.img.s0formula2.set(122, 36, null, 200).zIndex(5).push();
      let text = Scenes.domItems.tempText;
      text.innerHTML = "mm<sup>2</sup>";
      set(text, 315, 47);
      show(text);
      show(Scenes.domItems.tempInputBox);
      set(Scenes.domItems.tempInputBox, 120, 129);
      Scenes.domItems.tempInputT1.innerHTML = "L = ";
      Scenes.domItems.tempInputT2.innerHTML = "mm";

      // onclick
      Scenes.domItems.tempInputBtn.onclick = function () {
        let s0 = Scenes.domItems.tempInputBoxInput.value;
        if (s0 != 59.4) {
          show(Scenes.domItems.tempInputError);
          Scenes.domItems.tempInputError.innerHTML =
            "Please enter correct value = 59.4";
        } else {
          // for reseting the value of input
          Scenes.domItems.tempInputBoxInput.value = "";

          hide(Scenes.domItems.tempInputError);
          anime
            .timeline({
              easing: "easeInOutExpo",
            })
            .add({
              targets: Scenes.domItems.tableCalc.tBodies[0].rows[4].cells[1],
              begin: function (anime) {
                Scenes.domItems.tableCalc.tBodies[0].rows[4].cells[1].innerHTML =
                  "59.4";
              },
              backgroundColor: ["#9F91CC", "#FFF"],
              duration: 1000,
            })
            .add({
              targets: [
                Scenes.img.s0formula2.img,
                text,
                Scenes.domItems.tempInputBox,
              ],
              opacity: 0,
              complete() {
                Img.hideAll();
              },
            })
            .add({
              targets: Scenes.domItems.tableCalc,
              // Todo increase size of table
              left: 316,
              top: 75,
              complete() {
                setCC("Click 'Next' to go to next step");
                Img.setBlinkArrow(true, 790, 418).play();
                isRunning = false;
              },
            });
        }
      };
      return true;
    }),
    (step3 = function () {
      isRunning = true;

      setCC("Chosen gauge length L");
      Img.setBlinkArrow(-1);
      show(Scenes.domItems.stepHeading, "flex ");
      Scenes.domItems.stepTitle.innerHTML = "Step 3";
      Scenes.domItems.stepDescription.innerHTML =
        "Choose gauge length which is rounded to nearest multiple of 5 mm of the original gauge length:";
      show(Scenes.domItems.tableCalc);
      Scenes.domItems.tableCalc.tBodies[0].innerHTML += `
        <tr>
          <th  class="cell" scope="col">Choosen Gauge Length (mm)</th>
          <td class="cell" ></td>
        </tr>
        `;
      anime
        .timeline({
          easing: "easeInOutExpo",
        })
        .add({
          targets: Scenes.domItems.tableCalc,
          left: 680,
          top: 45,
        });

      show(Scenes.domItems.tempInputBox);
      set(Scenes.domItems.tempInputBox, 120, 129);
      Scenes.domItems.tempInputT1.innerHTML =
        "Choosen gauge length L<sub>0</sub> = ";
      Scenes.domItems.tempInputT2.innerHTML = "mm";

      // onclick
      Scenes.domItems.tempInputBtn.onclick = function () {
        let s0 = Scenes.domItems.tempInputBoxInput.value;
        console.log(s0);
        if (s0 != 60) {
          show(Scenes.domItems.tempInputError);
          Scenes.domItems.tempInputError.innerHTML =
            "Please enter correct value = 60";
        } else {
          hide(Scenes.domItems.tempInputError);
          anime
            .timeline({
              easing: "easeInOutExpo",
            })
            .add({
              targets: Scenes.domItems.tableCalc.tBodies[0].rows[5].cells[1],
              begin: function (anime) {
                Scenes.domItems.tableCalc.tBodies[0].rows[5].cells[1].innerHTML =
                  "60";
              },
              backgroundColor: ["#9F91CC", "#FFF"],
              duration: 1000,
            })
            .add({
              targets: [
                Scenes.domItems.tempInputBox,
                Scenes.domItems.tempInputBox,
              ],
              opacity: 0,
            })
            .add({
              targets: Scenes.domItems.tableCalc,
              left: 315,
              top: 60,
              complete() {
                setCC("Click 'Next' to go to next step");
                Img.setBlinkArrow(true, 790, 418).play();
                isRunning = false;
              },
            });
        }
      };
      return true;
    }),
    (step4 = function () {
      setCC(
        " Click on the marker to mark the specimen at an interval of Lo/2 = 30 mm"
      );
      Img.setBlinkArrow(true, 415, 230, 70, null, -90).play();
      isRunning = true;
      show(Scenes.domItems.stepHeading, "flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 4";
      Scenes.domItems.stepDescription.innerHTML =
        "Mark the specimen at the continuous interval of Lo/2 or Lo/3:";
      show(Scenes.domItems.tableCalc);
      anime
        .timeline({
          easing: "easeInOutExpo",
        })
        .add({
          targets: Scenes.domItems.tableCalc,
          left: 680,
          top: 10,
        });
      Scenes.img.tableCrop.set(20, 50, 320, 680).push();
      Scenes.img.bare_raber2.set(43, 132, 25).zIndex(5).push();
      Scenes.img.marker.set(350, 130, 150).zIndex(5).rotate(50).push();

      // onclick marker
      Scenes.img.marker.img.onclick = function () {
        Img.setBlinkArrow(-1);
        anime
          .timeline({
            easing: "easeInOutExpo",
          })
          .add({
            targets: Scenes.img.marker.img,
            rotate: 0,
            top: 10,
            left: 6,
            duration: 1000,
          })
          .add(
            {
              targets: Scenes.img.marker.img,
              rotate: 0,
              top: 10,
              left: [
                6, 50, 94, 138, 182, 226, 270, 314, 358, 402, 446, 490, 534,
                578, 622,
              ],
              duration: 5000,
            },
            800
          )
          .add(
            {
              targets: ".markings",
              opacity: 1,
              left: anime.stagger(),
              duration: anime.stagger(900),
            },
            800
          )
          .add(
            {
              begin() {
                Scenes.img.bare_raber2marked
                  .set(43, 132, null, 650)
                  .zIndex(5)
                  .push();
              },
            },
            800
          )
          .add(
            {
              begin() {
                Scenes.img.larrow.set(60, 170, 35).zIndex(5).rotate(180).push();
                show(Scenes.domItems.tempText);
                set(Scenes.domItems.tempText, 108, 187);
                Scenes.domItems.tempText.innerHTML = "30mm";
              },
            },
            800
          )
          .add(
            {
              complete() {
                Img.setBlinkArrow(true, 790, 410).play();
                setCC("Click 'Next' to go to next step");
                isRunning = false;
              },
            },
            5000
          );
      };
      return true;
    }),
    (step5 = function () {
      isRunning = true;

      // to hide previous step img,dom
      Img.hideAll();
      hide(Scenes.domItems.tableCalc);
      // hide the markings
      hideAll(".markings");
      hide(Scenes.domItems.tempText);

      setCC("Click on the rebar to insert it on the specimen");
      Img.setBlinkArrow(true, 800, 145, 70, null, 120).play();
      show(Scenes.domItems.stepHeading, "flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 5";
      Scenes.domItems.stepDescription.innerHTML =
        "Insert the specimen in the UTM such that the load is axially applied on the specimen:";
      Scenes.img.new_utm.set(30, 0, 380, 400).push();
      Scenes.img.bare_raber2marked
        .set(670, 220, null, 230)
        .zIndex(5)
        .rotate(30)
        .push();
      Scenes.img.extensometer.set(610, 130, 120).zIndex(1).push();
      Scenes.img.table.set(560, 200, 150).push();

      // onclick
      Scenes.img.bare_raber2marked.img.onclick = function () {
        Img.setBlinkArrow(-1);
        anime({
          targets: Scenes.img.bare_raber2marked.img,
          easing: "easeInOutQuad",
          rotate: 90,
          top: "-=60",
          left: 88,
          height: "+=1",
          width: "-=95",
          duration: 2000,
          complete() {
            setCC("Click 'Next' to go to next step");
            Img.setBlinkArrow(true, 790, 410).play();
            isRunning = false;
          },
        });
      };
      return true;
    }),
    (step6 = function () {
      isRunning = true;
      show(Scenes.domItems.stepHeading, "flex");

      Scenes.domItems.stepTitle.innerHTML = "Step 6";
      Scenes.domItems.stepDescription.innerHTML =
        "Attach the extensometer to the specimen:";
      Scenes.img.size.set(545, 184, null, 105).zIndex(5).rotate(90).push();
      Scenes.domItems.tempText.innerHTML =
        "<center>50 mm<center>(Gauge Length)";
      set(Scenes.domItems.tempText, 440, 163);

      setCC("Click on the extensometer to attach it on the specimen.");
      Img.setBlinkArrow(true, 700, 160, 70, null, 180).play();
      // onclick extensometer
      Scenes.img.extensometer.img.onclick = function () {
        Img.setBlinkArrow(-1);
        anime({
          targets: Scenes.img.extensometer.img,
          easing: "easeInOutQuad",
          begin() {
            hide(Scenes.domItems.tempText);
            Scenes.img.size.hide();
          },
          left: 161,
          top: "+=50",
          height: 40,
          duration: 1500,
          complete() {
            Scenes.img.table.hide();
            setCC("Click 'Next' to go to next step");
            Img.setBlinkArrow(true, 790, 410).play();
            isRunning = false;
          },
        });
      };
      return true;
    }),
    (step7 = function () {
      isRunning = true;
      show(Scenes.domItems.stepHeading, "flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 7";
      Scenes.domItems.stepDescription.innerHTML =
        "Start the Universal Testing Machine:";
      set(Scenes.domItems.utmBtn);

      setCC("Click on the start button to start the UTM.");
      Img.setBlinkArrow(true, 223, 60, 70, null, 90).play();

      // onclick utm btn
      Scenes.domItems.utmBtn.onclick = function () {
        console.log("wlaslkdg");
        Img.setBlinkArrow(-1);
        Scenes.img.arrow.set(320, 80, null, 200).rotate(-20).zIndex(5).push();
        Scenes.img.graph1.set(508, 129, 220);
        anime({
          delay: 700,
          complete() {
            setCC("Click 'Next' to go to next step");
            Img.setBlinkArrow(true, 790, 410).play();
            isRunning = false;
          },
        });
      };
      return true;
    }),
    (step8 = function () {
      isRunning = true;
      show(Scenes.domItems.stepHeading, "flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 8";
      Scenes.domItems.stepDescription.innerHTML =
        "Record Simultaneously the readings of load from the UTM and elongation from the extensometer:";

      setCC("Click 'Next' to go to next step");
      Img.setBlinkArrow(true, 790, 410).play();
      isRunning = false;
      return true;
    }),
    (step9 = function () {
      isRunning = true;

      show(Scenes.domItems.stepHeading, "flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 9";
      Scenes.domItems.stepDescription.innerHTML =
        "Remove the extensometer carefully close to the ultimate strength:";
      // Scenes.img.graph1.hide()
      // Scenes.img.arrow.hide()
      anime({
        targets: Scenes.img.graph1.img,
      });
      Img.setBlinkArrow(true, 150, 117, 50, null, 90).play();
      setCC("Click on the extensometer to remove it.");
      // onclick
      Scenes.img.extensometer.img.onclick = function () {
        Img.setBlinkArrow(-1);
        Scenes.img.highlightArrow.hide();
        anime
          .timeline({
            easing: "easeInOutExpo",
            targets: Scenes.img.extensometer.img,
          })
          .add({
            top: "+=150",
          })
          .add({
            left: 450,
            scale: 2,
          })
          .add({
            begin() {
              Scenes.img.arrow
                .set(320, 80, null, 200)
                .rotate(-20)
                .zIndex(5)
                .push();
              Scenes.img.graph2.set(508, 129, 220);
            },
            complete() {
              setCC("Click 'Next' to go to next step");
              Img.setBlinkArrow(true, 790, 410).play();
              isRunning = false;
            },
          });
      };
      return true;
    }),
    (step10 = function () {
      isRunning = true;
      Scenes.img.graph1.hide();
      show(Scenes.domItems.stepHeading, "flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 10";
      Scenes.domItems.stepDescription.innerHTML =
        "This maximum reading of load in stress strain curve corresponds to the Ultimate load:";
      Scenes.domItems.utmBtn.style.backgroundColor = "red";
      Scenes.domItems.utmBtn.style.boxShadow = "1px 1px 10px 3px red";
      setCC("Click on stop button to stop the UTM.");
      set(Scenes.domItems.utmBtn, 243, 182);

      Img.setBlinkArrow(true, 213, 210, 70, null, -90).play();
      // onclick
      Scenes.domItems.utmBtn.onclick = function () {
        Img.setBlinkArrow(-1);

        Scenes.img.highlightArrow.hide();
        Scenes.img.graph2.hide();
        Scenes.img.arrow.set(320, 80, null, 200).rotate(-20).zIndex(5).push();
        Scenes.img.graph3.set(508, 129, 220).opacity(0);
        anime
          .timeline({
            easing: "easeInOutExpo",
          })
          .add({
            targets: Scenes.img.graph3.img,
            opacity: 1,
          })
          .add({
            begin() {
              Scenes.domItems.tempText.innerHTML = "Show Calculations";
              Scenes.domItems.tempText.style.backgroundColor = "#FFDBC3";

              Scenes.domItems.tempText.style.cursor = "pointer";
              set(Scenes.domItems.tempText, 835, 350);
              Img.setBlinkArrow(true, 895, 280, 51, null, 90).play();
              setCC("click on the 'Show Calculations' to see the calculations");
              // onclick
              Scenes.domItems.tempText.onclick = function () {
                Img.setBlinkArrow(-1);
                Scenes.img.new_utm.hide();
                Scenes.img.bare_raber2marked.hide();
                Scenes.img.extensometer.hide();
                Scenes.img.arrow.hide();
                Scenes.img.graph2.hide();
                Scenes.img.graph3.hide();
                hide(Scenes.domItems.utmBtn);
                Scenes.domItems.stepDescription.innerHTML +=
                  "<br><br><b><u>Calculations:<u><b>";
                Scenes.img.graph4.set(160, 0, 250);
                Scenes.domItems.tempText.innerHTML =
                  "<b>Reading at Yield Point = 480.84 MPa<br>(from 0.2% offset method)<br>Reading of ultimate strength point = 600.62 MPa";
                show(Scenes.domItems.tempText);
                set(Scenes.domItems.tempText, 172, 297);

                setCC("Click 'Next' to go to next step");
                Img.setBlinkArrow(true, 790, 410).play();
                Scenes.domItems.tempText.style.backgroundColor = "transparent";
                isRunning = false;
              };
            },
          });
      };
      return true;
    }),
    (step11 = function () {
      isRunning = true;
      Scenes.img.graph4.hide();
      hide(Scenes.domItems.tempText);
      show(Scenes.domItems.stepHeading, "flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 11";
      Scenes.domItems.stepDescription.innerHTML =
        "Fit the two pieces together so that their axes lies in a straight line:";
      Scenes.img.tableCrop.set(50, 70, null, 800);
      Scenes.img.break1.set(220, 100, null, 450).zIndex(5);
      Scenes.img.break2.set(320, 100, null, 450).zIndex(7);
      Scenes.img.varniarfull.set(180, 120, null, 300).zIndex(5);

      setCC("Click on the raber to join the raber.");
      Img.setBlinkArrow(true, 645, 130, 70, null, -90).play();
      // onclick
      Scenes.img.break2.img.onclick = function () {
        Img.setBlinkArrow(-1);
        anime({
          easing: "easeInOutQuad",
          targets: Scenes.img.break2.img,
          left: 180,
          duration: 1000,
          complete() {
            setCC(
              "Click on the vernier calliper to measure the final gauge length of the specimen."
            );
            Img.setBlinkArrow(true, 330, 180, 70, null, -90).play();
            // onclick
            Scenes.img.varniarfull.img.onclick = function () {
              Img.setBlinkArrow(-1);
              anime
                .timeline({
                  easing: "easeInOutQuad",
                })
                .add({
                  targets: Scenes.img.varniarfull.img,
                  left: 435,
                  scale: 1.4,
                  duration: 1000,
                  complete() {
                    Scenes.img.varniarfull.hide();
                    Scenes.img.varniarLeft
                      .set(435, 120, null, 300)
                      .zIndex(6)
                      .scale(1.4);
                    Scenes.img.varniarRight
                      .set(410, 128, null, 100)
                      .zIndex(6)
                      .scale(1.4);
                    anime({
                      easing: "easeInOutQuad",
                      targets: Scenes.img.varniarRight.img,
                      left: 462,
                      duration: 1000,
                      complete() {
                        Scenes.img.reading1
                          .set(462, 128, null, 100)
                          .zIndex(6)
                          .scale(1.4);
                        // next step
                        // varniar right and left
                        setCC(
                          "Click on vernier calliper to measure the minimum diameter of the specimen."
                        );
                        Img.setBlinkArrow(true, 560, 180, 70, null, -90);

                        Scenes.img.varniarLeft.img.onclick =
                          varniarVerticalMove;
                        Scenes.img.reading1.img.onclick = varniarVerticalMove;

                        function varniarVerticalMove() {
                          Img.setBlinkArrow(-1);
                          Scenes.img.reading1.hide();
                          anime
                            .timeline({
                              easing: "easeInOutQuad",
                            })
                            .add({
                              targets: Scenes.img.varniarRight.img,
                              left: 410,
                              complete() {
                                Scenes.img.varniarLeft.hide();
                                Scenes.img.varniarRight.hide();
                                Scenes.img.varniarfull.show().zIndex(8);
                              },
                            })
                            .add({
                              targets: Scenes.img.varniarfull.img,
                              rotate: 90,
                              top: 220,
                            })
                            .add({
                              targets: Scenes.img.varniarfull.img,
                              left: 330,
                              complete() {
                                Scenes.img.varniarLeft
                                  .set(330, 220)
                                  .rotate(90)
                                  .zIndex(8);
                                Scenes.img.varniarRight
                                  .set(427, 100, null, 100)
                                  .rotate(90)
                                  .zIndex(8);
                                Scenes.img.varniarfull.hide();
                              },
                            })
                            .add({
                              targets: Scenes.img.varniarRight.img,
                              top: 114,
                              complete() {
                                Scenes.img.reading2
                                  .set(427, 114, null, 100)
                                  .scale(1.4)
                                  .rotate(90)
                                  .zIndex(9);

                                setCC(
                                  "click on the 'Show Calculations' to see the calculations"
                                );
                                Scenes.domItems.tempText.innerHTML =
                                  "Show Calculations";
                                Scenes.domItems.tempText.style.backgroundColor =
                                  "#FFDBC3";

                                Scenes.domItems.tempText.style.cursor =
                                  "pointer";
                                set(Scenes.domItems.tempText, 835, 350);
                                Img.setBlinkArrow(
                                  true,
                                  895,
                                  280,
                                  51,
                                  null,
                                  90
                                ).play();
                                // onclick
                                Scenes.domItems.tempText.onclick = function () {
                                  Img.setBlinkArrow(-1);
                                  Scenes.img.varniarLeft.hide();
                                  Scenes.img.varniarRight.hide();
                                  Scenes.img.varniarfull.hide();
                                  Scenes.img.break1.hide();
                                  Scenes.img.break2.hide();
                                  Scenes.img.reading2.hide();
                                  Scenes.img.tableCrop.hide();
                                  hide(Scenes.domItems.stepHeading);
                                  Scenes.domItems.tempText.innerHTML =
                                    "<b><u>Calculations:</u><b>";
                                  set(Scenes.domItems.tempText, 0, 0);
                                  Scenes.img.lastCalc.set(120, 5);

                                  // for show result
                                  setCC(
                                    "Click on the 'Show Result' to see the result"
                                  );
                                  Img.setBlinkArrow(
                                    true,
                                    860,
                                    280,
                                    51,
                                    null,
                                    90
                                  ).play();
                                  Scenes.domItems.tempText2.innerHTML =
                                    "Show Result";
                                  Scenes.domItems.tempText2.style.backgroundColor =
                                    "#FFDBC3";

                                  Scenes.domItems.tempText2.style.cursor =
                                    "pointer";
                                  set(Scenes.domItems.tempText2, 835, 350);

                                  // onclick
                                  Scenes.domItems.tempText2.onclick =
                                    function () {
                                      hide(Scenes.domItems.tempText);

                                      Img.setBlinkArrow(-1);
                                      hide(Scenes.domItems.tempText2);
                                      Scenes.domItems.tempText.style.backgroundColor =
                                        "transperant";
                                      Img.setBlinkArrow(-1);
                                      Scenes.img.lastCalc.hide();
                                      let currentDate = new Date();
                                      currentDate = `${currentDate.getDate()} - ${
                                        currentDate.getMonth() + 1
                                      } - ${currentDate.getFullYear()}`;
                                      get("#date").innerHTML = currentDate;
                                      set(Scenes.domItems.resultTable, 175, 0);
                                      setCC("Click 'Next' to go to next step");
                                      Img.setBlinkArrow(true, 790, 444).play();
                                      isRunning = false;
                                      return true;
                                    };
                                };
                              },
                            });
                        }
                      },
                    });
                  },
                });
            };
          },
        });
      };

      return true;
    }),
    (completed = function () {
      hide(Scenes.domItems.resultTable);
      Scenes.domItems.tempText.backgroundColor = "transparent";
      // certificate name
      let certificateStuName = get("#certificateStuName");
      certificateStuName.innerHTML = student_name;
      get("#quizScore").innerHTML = Quiz.score;

      show(Scenes.domItems.certificate);
      set(Scenes.domItems.tempText, 350, 50);
      opacity(Scenes.domItems.tempText, 0);
      anime({
        targets: Scenes.domItems.tempText,
        opacity: 1,
      });
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

Scenes.steps[13]();
// Scenes.next();

const nextBtn = get(".btn-next");
const backBtn = get(".btn-back");
nextBtn.onclick = function () {
  Scenes.next();
};
backBtn.onclick = function () {
  Scenes.back();
};

// Scenes.steps[2]()
// Scenes.steps[4]()
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
  let _position = `X: ${x - 232}<br>Y: ${y - 230}`;

  const infoElement = document.getElementById("info");
  infoElement.innerHTML = _position;
  infoElement.style.top = y + "px";
  infoElement.style.left = x + 20 + "px";
}
