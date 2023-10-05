// for restriction on next button ;
let isPerformNext = false;
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
const opacity = (ele, val=1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for(let ele of eles){
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
  show(ele)
};

let student_name = "";

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
  opacity(val = 1){
    this.img.style.opacity=val;
  }
  rotate(deg) {
    this.img.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  scale(val=1) {
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
    this.opacity()
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
  static resetImages(){
    Img.arrayOfImages = []
  }
  push(){
    Img.arrayOfImages.push(this);
    return this;
  }
}

class Dom{
  static arrayOfDom = []
  
}

class Render {
  constructor() {
    this.processStack = [];
    this.processQueue = [];
    this.currentScene = null;
  }
  back() {}
  next() {}
}

// class Scene {
//   constructor(imgs, imgsAxis, subtitles, steps) {
//     this.imgs = imgs;
//     this.imgsAxis = imgsAxis;
//     this.subtitles = subtitles;
//     this.steps = steps;
//     this.currentAnime = 0;
//   }
//   next() {}
//   back() {}
//   run() {}
//   // all steps
// }

// let scene1 = new Scene([], [[500, 300]], ["Enter your name to start"], {
//   step1() {
//     let header = get(".anime-header");
//     setTop(header, 120);
//     let inputWindow = get(".user-input");
//     show(inputWindow, "flex");
//     console.log(inputWindow);
//     let man = new Img("man", 650, 80);
//     let submitBtn = get("#nameSubmitBtn");
//     submitBtn.onclick = () => {
//       student_name = get("#stuName").value;
//       let tl = anime.timeline({
//         easing: "easeOutExpo",
//         duration: 1000,
//       });
//       tl.add({
//         targets: ".anime-header",
//         top: "-60px",
//         opacity: 0,
//       })
//         .add({
//           targets: ".user-input",
//           opacity: 0,
//         })
//         .add({
//           targets: man.img,
//           translateX: -210,
//         });
//     };
//   },
//   step2: ()=>{
//     let projectIntro = get(".project-intro");
//     show(projectIntro);
//     let bare_raber = new Img("bare_raber",720, 90, 150).zIndex(1).rotate(70);
//     let extensometer = new Img("grip", 550, 75, 80).zIndex(1);
//     let varniarfull = new Img("varniarfull",545, 120, 60).zIndex(1).rotate(160);
//     let table = new Img("table", 520, 130, 120);
//     let man = new Img("man", 380, 0, 250);
//     let new_utm = new Img("new_utm", 140, 0, 250);
//     this.imgs = [bare_raber, extensometer, varniarfull, table,man,new_utm];
//   },
//   step2delete: ()=>{
//     Img.hideAll(this.imgs)
//   }
// });

// let scene2 = new Scene([],[],[],{
//   step1:()=>{

//   }
// })

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
  },  
  domItems: {
    projectIntro: get(".project-intro"),
    header: get(".anime-header"),
    stepHeading: get(".step-heading"),
    stepTitle: get(".step-title"),
    stepDescription: get(".step-description"),
    tableCalc: get(".measurements"),
    tempText: get(".temp-text"),
    tempInputBox: get(".temp-input"),
    tempInputBoxInput: get(".temp-input #ipnum"),
    tempInputT1: get(".temp-input .text1"),
    tempInputT2: get(".temp-input .text2"),
    tempInputError: get(".temp-input .error"),
    tempInputBtn: get(".temp-input .submit-btn"),
    utmBtn: get(".utm-button"),
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
    (s1 = function () {
      set(Scenes.domItems.header, 0, 120);
      show(Scenes.domItems.header,"flex")
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Img("man").set(650, 80);
      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
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
            begin(){
              Scenes.domItems.tempText.innerHTML = `Hey!<br>${student_name}`
              Scenes.domItems.tempText.style.fontWeight = "bold"
              show(Scenes.domItems.tempText)
              set(Scenes.domItems.tempText,482,1)
              Scenes.img.cloud.set(450,-40,180)
            },
            opacity: [0,1],
          })
          .add({
            delay: 400,
            begin(){
              Scenes.img.man.hide();
              Scenes.img.cloud.hide();
              hide(Scenes.domItems.tempText)
              inputWindow.style.display = "none";
            },
          })
      };

      return true;
    }),
    (s2 = function () {
      console.log("s2:",Scenes.subCurrentStep);
      switch (Scenes.subCurrentStep) {
        case 0:
          show(Scenes.domItems.projectIntro);
          Scenes.img.bare_raber.set(720, 90, 150).zIndex(1).rotate(70).push(),
          Scenes.img.extensometer.set(550, 75, 80).zIndex(1).push(),
          Scenes.img.varniarfull.set(545, 120, 60).zIndex(1).rotate(160).push(),
          Scenes.img.table.set(520, 130, 120).push(),
          Scenes.img.man.set(380, 0, 250).push(),
          Scenes.img.new_utm.set(140, 0, 250).push(),
          Scenes.incCurrentSubStep();
          break;
        case 1:
          hide(Scenes.domItems.projectIntro);
          Img.hideAll();
          Scenes.incCurrentSubStep();
          Scenes.resetSubStep();
          return true;
          break;
        }
      return false;
    }),
    (s3 = function () {
      switch (Scenes.subCurrentStep) {
        case 0:
          show(Scenes.domItems.stepHeading, "flex");
          Scenes.img.bare_raber.set(450, 55, 200).zIndex(3).rotate(310).push();
          Scenes.img.tape.set(330, 170, 80).zIndex(1).rotate(0).push();
          Scenes.img.weight.set(140, 140, 120).zIndex(1).push();
          Scenes.img.tableCrop.set(20, 50, 320, 680).push();
          var table = Scenes.domItems.tableCalc
          show(table);
          set(table, 680, 45);
          Scenes.incCurrentSubStep();
          break;

        case 1:
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
          });
          Scenes.incCurrentSubStep();
          break;

        case 2:
          anime({
            targets: Scenes.img.tape.img,
            left: 30,
            top: 70,
            duration: 1000,
            scale: 0.7,
            easing: "easeInOutExpo",
          });
          Scenes.incCurrentSubStep();
          break;

        case 3:
          Scenes.img.measure1.set(93, 60, 137, 0).zIndex(1).push();
          set(Scenes.domItems.tempText, 260, 65);
          Scenes.domItems.tempText.innerHTML = "Total Length (m) = 0.805m";
          Scenes.img.measurearrow.set(355, 35, 90).zIndex(1).rotate(90).push();
          Scenes.img.measurearrow2.set(355, 35, 90).zIndex(1).rotate(270).push();
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
            .add(
              {
                targets: Scenes.domItems.tempText,
                begin: function (anim) {
                  show(Scenes.domItems.tempText);
                },
              },
              1200
            )
            .add({
              targets: calcLength,
              begin: function (anime) {
                calcLength.innerHTML = "0.805";
              },
              backgroundColor: ["#000", "#FFF"],
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
            });
          Scenes.incCurrentSubStep();
          break;

        case 4:
          let w000 = new Img("000").push();
          let w698 = new Img("875").push();
          anime.timeline({
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
              targets: Scenes.domItems.tableCalc.tBodies[0].rows[2].cells[1],
              begin: function (anime) {
                Scenes.domItems.tableCalc.tBodies[0].rows[2].cells[1].innerHTML =
                  "0.698";
              },
              backgroundColor: ["#000", "#FFF"],
              duration: 200,
            })
            .add({
              targets: [Scenes.img.bare_raber.img, Scenes.img.weight.img,Scenes.img.tableCrop.img,w698.img],
              opacity: 0,
              delay: 600,
              complete(){
                Img.hideAll();
              }
            })
            Scenes.incCurrentSubStep();
          break;

          case 5:
            let s0formula = new Img("S0_formula").set(122,36,null,200).zIndex(5).push();
            let text = Scenes.domItems.tempText;
            text.innerHTML = "weight (kg) and L(m)";
            set(text,315,47)
            show(text);
            show(Scenes.domItems.tempInputBox)
            set(Scenes.domItems.tempInputBox,120,129)
            Scenes.domItems.tempInputT1.innerHTML = "S<sub>0</sub> = ";
            Scenes.domItems.tempInputT2.innerHTML = "mm<sup>2</sup>";


            show(Scenes.domItems.tableCalc);
            set(Scenes.domItems.tableCalc,680,45);
            
            // onclick
            Scenes.domItems.tempInputBtn.onclick = function(){
                let s0 = Scenes.domItems.tempInputBoxInput.value;
                if(s0 != 110.4){
                  show(Scenes.domItems.tempInputError);
                  Scenes.domItems.tempInputError.innerHTML = "Please enter correct value = 110.4";
                }else{
                  // for reseting the value of input
                  Scenes.domItems.tempInputBoxInput.value = "";

                  hide(Scenes.domItems.tempInputError);
                  anime.timeline({
                    easing: "easeInOutExpo"
                  })
                  .add({
                    targets: Scenes.domItems.tableCalc.tBodies[0].rows[3].cells[1],
                    begin: function (anime) {
                      Scenes.domItems.tableCalc.tBodies[0].rows[3].cells[1].innerHTML = "110.4";
                    },
                    backgroundColor: ["#000", "#FFF"],
                    duration: 1000,
                  })
                  .add({
                    targets: Scenes.domItems.tableCalc,
                    // Todo increase size of table
                    left: 401,
                    top: 125,
                  })
                  .add({
                    targets: [s0formula.img,text,Scenes.domItems.tempInputBox],
                    opacity: 0,
                    complete(){
                      Img.hideAll();
                    }
                  })
                }
            }
            Scenes.resetSubStep();
            return true;
            break;
            
          
              
      }
      return false;
    }),
    // Step 2
    s4 = function(){
      show(Scenes.domItems.stepHeading,"flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 2"
      Scenes.domItems.stepDescription.innerHTML = "Calculation of gauge length:"
      show(Scenes.domItems.tableCalc)
      Scenes.domItems.tableCalc.tBodies[0].innerHTML += `
      <tr>
        <th  class="cell" scope="col">Gauge Length (mm)</th>
        <td class="cell" ></td>
      </tr>
        `;
        anime.timeline({
          easing: "easeInOutExpo",
        })
        .add({
          targets: Scenes.domItems.tableCalc,
          // Todo increase size of table
          left: 680,
          top: 45,
        })

        let s0formula = new Img("S0_formula3").set(122,36,null,200).zIndex(5).push();
            let text = Scenes.domItems.tempText;
            text.innerHTML = "mm<sup>2</sup>";
            set(text,315,47)
            show(text);
            show(Scenes.domItems.tempInputBox)
            set(Scenes.domItems.tempInputBox,120,129)
            Scenes.domItems.tempInputT1.innerHTML = "L = ";
            Scenes.domItems.tempInputT2.innerHTML = "mm";

            Scenes.domItems.tempInputBtn.onclick = function(){
                let s0 = Scenes.domItems.tempInputBoxInput.value;
                if(s0 != 59.4){
                  show(Scenes.domItems.tempInputError);
                  Scenes.domItems.tempInputError.innerHTML = "Please enter correct value = 59.4";
                }else{
                  // for reseting the value of input
                  Scenes.domItems.tempInputBoxInput.value = "";

                  hide(Scenes.domItems.tempInputError);
                  anime.timeline({
                    easing: "easeInOutExpo"
                  })
                  .add({
                    targets: Scenes.domItems.tableCalc.tBodies[0].rows[4].cells[1],
                    begin: function (anime) {
                      Scenes.domItems.tableCalc.tBodies[0].rows[4].cells[1].innerHTML = "59.4";
                    },
                    backgroundColor: ["#000", "#FFF"],
                    duration: 1000,
                  })
                  .add({
                    targets: [s0formula.img,text,Scenes.domItems.tempInputBox],
                    opacity: 0,
                    complete(){
                      Img.hideAll();
                    }
                  })
                  .add({
                    targets: Scenes.domItems.tableCalc,
                    // Todo increase size of table
                    left: 401,
                    top: 125,
                  })
                }
            }
            return  true;
    },
    s5 = function(){
      show(Scenes.domItems.stepHeading);
      Scenes.domItems.stepTitle.innerHTML = "Step 3"
          Scenes.domItems.stepDescription.innerHTML = "Choose gauge length which is rounded to nearest multiple of 5 mm of the original gauge length:"
        show(Scenes.domItems.tableCalc)
        Scenes.domItems.tableCalc.tBodies[0].innerHTML += `
        <tr>
          <th  class="cell" scope="col">Choosen Gauge Length (mm)</th>
          <td class="cell" ></td>
        </tr>
        `;
        anime.timeline({
          easing: "easeInOutExpo",
        })
        .add({
          targets: Scenes.domItems.tableCalc,
          // Todo increase size of table
          left: 680,
          top: 45,
        })

        
            show(Scenes.domItems.tempInputBox)
            set(Scenes.domItems.tempInputBox,120,129)
            Scenes.domItems.tempInputT1.innerHTML = "Choosen gauge length L<sub>0</sub> = ";
            Scenes.domItems.tempInputT2.innerHTML = "mm";

            Scenes.domItems.tempInputBtn.onclick = function(){
                let s0 = Scenes.domItems.tempInputBoxInput.value;
                console.log(s0);
                if(s0 != 60){
                  show(Scenes.domItems.tempInputError);
                  Scenes.domItems.tempInputError.innerHTML = "Please enter correct value = 60";
                }else{
                  hide(Scenes.domItems.tempInputError);
                  anime.timeline({
                    easing: "easeInOutExpo"
                  })
                  .add({
                    targets: Scenes.domItems.tableCalc.tBodies[0].rows[5].cells[1],
                    begin: function (anime) {
                      Scenes.domItems.tableCalc.tBodies[0].rows[5].cells[1].innerHTML = "60";
                    },
                    backgroundColor: ["#000", "#FFF"],
                    duration: 1000,
                  })
                  .add({
                    targets: [Scenes.domItems.tempInputBox,Scenes.domItems.tempInputBox],
                    opacity: 0,
                  })
                  .add({
                    targets: Scenes.domItems.tableCalc,
                    // Todo increase size of table
                    left: 401,
                    top: 125,
                  })
                }
            }
            return true;
    },
    s6 = function(){
      switch(Scenes.subCurrentStep){
        case 0:
          // ! remove this line
      show(Scenes.domItems.stepHeading,"flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 4"
        Scenes.domItems.stepDescription.innerHTML = "Mark the specimen at the continuous interval of Lo/2 or Lo/3:"
        show(Scenes.domItems.tableCalc)
        anime.timeline({
          easing: "easeInOutExpo",
        })
        .add({
          targets: Scenes.domItems.tableCalc,
          // Todo increase size of table
          left: 680,
          top: 230,
        })
        Scenes.img.tableCrop.set(20, 50, 320, 680).push();
        Scenes.img.bare_raber2.set(43, 132, 25).zIndex(5).push();
        Scenes.img.marker.set(350,130,150).zIndex(5).rotate(50).push()
        
        Scenes.incCurrentSubStep()
        break;

        case 1:

          anime.timeline({
            easing: "easeInOutExpo"
          })
          .add({
            targets: Scenes.img.marker.img,
            rotate: 0,
            top: 10,
            left: 6,
            duration: 1000,
          })
          .add({
            targets: Scenes.img.marker.img,
            rotate: 0,
            top: 10,
            left: [6,50,94,138,182,226,270,314,358,402,446,490,534,578,622],
            duration: 5000,
          },800)
          .add({
            targets: ".markings",
            opacity: 1,
            left: anime.stagger(),
            duration: anime.stagger(900),
          },800)
          .add({
            begin(){
              Scenes.img.bare_raber2marked.set(43, 132, null,650).zIndex(5).push();
            }
          },800)
          .add({
            begin(){
              Scenes.img.larrow.set(60,170,35).zIndex(5).rotate(180).push()
              show(Scenes.domItems.tempText)
              set(Scenes.domItems.tempText,108,187)
              Scenes.domItems.tempText.innerHTML = "30mm";
            },
          },800)
          .add({
            begin(){
              // // remove all images and dom
              Img.hideAll();
              hide(Scenes.domItems.tableCalc)
              // // remove all markings
              hideAll(".markings");
              hide(Scenes.domItems.tempText);
            }
          },9000)
          Scenes.resetSubStep()
          return true;
          break;
      }
      return false;
    },
    s7 = function(){
      switch(Scenes.subCurrentStep){
        case 0:
          show(Scenes.domItems.stepHeading,"flex");
          Scenes.domItems.stepTitle.innerHTML = "Step 5"
          Scenes.domItems.stepDescription.innerHTML = "Insert the specimen in the UTM such that the load is axially applied on the specimen:"
          Scenes.img.new_utm.set(30,0,380,400).push();
          Scenes.img.bare_raber2marked.set(670,220,null,230).zIndex(5).rotate(30).push()
          Scenes.img.extensometer.set(610, 130, 120).zIndex(1).push()
          Scenes.img.table.set(560, 200, 150).push()
          Scenes.incCurrentSubStep();
          break;
        
        case 1:
          anime({
            targets: Scenes.img.bare_raber2marked.img,
            easing: "easeInOutQuad",
            rotate: 90,
            top: "-=60",
            left: 88,
            height:"+=1",
            width: "-=95",
            duration: 2000,
          })
          Scenes.resetSubStep();
          return true;
      }
      return false;
    },
    s8 = function(){
      switch(Scenes.subCurrentStep){
        case 0:
          show(Scenes.domItems.stepHeading,"flex");
          Scenes.domItems.stepTitle.innerHTML = "Step 6"
          Scenes.domItems.stepDescription.innerHTML = "Attach the extensometer to the specimen:"
          Scenes.img.size.set(545,184,null,105).zIndex(5).rotate(90).push();
          Scenes.domItems.tempText.innerHTML = "<center>50 mm<center>(Gauge Length)";
          set(Scenes.domItems.tempText,440,163);
          Scenes.incCurrentSubStep();
          break;
        
        case 1:
          anime({
            targets: Scenes.img.extensometer.img,
            easing: "easeInOutQuad",
            begin(){
              hide(Scenes.domItems.tempText);
              Scenes.img.size.hide();
            },
            left: 161,
            top: "+=50",
            height: 40,
            duration: 1500,
            complete(){
              Scenes.img.table.hide();
            }
          })
          Scenes.resetSubStep();
          return true;
      }
      return false;
    },
    s9 = function(){
      switch(Scenes.subCurrentStep){
        case 0:
          show(Scenes.domItems.stepHeading,"flex");
          Scenes.domItems.stepTitle.innerHTML = "Step 7"
          Scenes.domItems.stepDescription.innerHTML = "Start the Universal Testing Machine:"
          anime({
            targets: Scenes.domItems.utmBtn,
            opacity: 1,
          })
          Scenes.img.highlightArrow.set(232,90,50).rotate(-90).push();
          var arrowBlink = anime({
            targets: Scenes.img.highlightArrow.img,
            easing: "easeInOutExpo",
            opacity: 1,
            translateX: 20,
            direction: "alternate",
            loop: true,
            autoplay: false,
            duration: 300,
          })
          arrowBlink.play();
          // onclick
          Scenes.domItems.utmBtn.onclick = function(){
            arrowBlink.pause();
            Scenes.img.highlightArrow.hide();
            Scenes.img.arrow.set(320,80,null,200).rotate(-20).zIndex(5).push();
            Scenes.img.graph1.set(508,129,220)

          }
          Scenes.resetSubStep();
          return true;
          break;          
      }
      return false;
    },
    s10 = function(){
        show(Scenes.domItems.stepHeading,"flex");
        Scenes.domItems.stepTitle.innerHTML = "Step 8"
        Scenes.domItems.stepDescription.innerHTML = "Record Simultaneously the readings of load from the UTM and elongation from the extensometer:"
        return true;
    },
    s11 = function(){
          show(Scenes.domItems.stepHeading,"flex");
          Scenes.domItems.stepTitle.innerHTML = "Step 9"
          Scenes.domItems.stepDescription.innerHTML = "Remove the extensometer carefully close to the ultimate strength:"
          // Scenes.img.graph1.hide()  
          // Scenes.img.arrow.hide()
          anime({
            targets: Scenes.img.graph1.img,
            
          })
          Scenes.img.highlightArrow.set(150,120,50).rotate(-90).push().zIndex(7);
          var arrowBlink = anime({
            targets: Scenes.img.highlightArrow.img,
            easing: "easeInOutExpo",
            opacity: 1,
            translateX: 20,
            direction: "alternate",
            loop: true,
            autoplay: false,
            duration: 300,
          })
          arrowBlink.play();
          // onclick
          Scenes.img.extensometer.img.onclick = function(){
            arrowBlink.pause();
            Scenes.img.highlightArrow.hide();
            anime.timeline({
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
              begin(){
                Scenes.img.arrow.set(320,80,null,200).rotate(-20).zIndex(5).push()
                Scenes.img.graph2.set(508,129,220)
              }
            })
          }
      return true;
    },
    s12 = function(){
      switch(Scenes.subCurrentStep){

        case 0:
          Scenes.img.graph1.hide()
      show(Scenes.domItems.stepHeading,"flex");
      Scenes.domItems.stepTitle.innerHTML = "Step 10"
      Scenes.domItems.stepDescription.innerHTML = "This maximum reading of load in stress strain curve corresponds to the Ultimate load:"
      Scenes.domItems.utmBtn.style.backgroundColor = "red"
      set(Scenes.domItems.utmBtn,240,184)
      Scenes.img.highlightArrow.set(220,198,50).rotate(90).push().zIndex(7);
      var arrowBlink = anime({
        targets: Scenes.img.highlightArrow.img,
        easing: "easeInOutExpo",
        opacity: 1,
        translateX: 20,
        direction: "alternate",
        loop: true,
        autoplay: false,
        duration: 300,
      })
      arrowBlink.play();
      Scenes.domItems.utmBtn.onclick = function(){
        console.log("ram")
        arrowBlink.pause();
        Scenes.img.highlightArrow.hide();
        Scenes.img.graph2.hide()
        Scenes.img.arrow.set(320,80,null,200).rotate(-20).zIndex(5).push()
        Scenes.img.graph3.set(508,129,220).opacity(0);
        anime.timeline({
          easing: "easeInOutExpo"
        })
        .add({
          targets: Scenes.img.graph3.img,
          opacity: 1,
        })
      }
      Scenes.incCurrentSubStep();
      break;
      case 1:
        Scenes.img.new_utm.hide();
        Scenes.img.bare_raber2marked.hide();
        Scenes.img.extensometer.hide();
        Scenes.img.arrow.hide();
        Scenes.img.graph2.hide();
        Scenes.img.graph3.hide();
        hide(Scenes.domItems.utmBtn);
        Scenes.domItems.stepDescription.innerHTML += "<br><br><b><u>Calculations:<u><b>"
        Scenes.img.graph4.set(160,0,250);
        Scenes.domItems.tempText.innerHTML = "<b>Reading at Yield Point = 480.84 MPa<br>(from 0.2% offset method)<br>Reading of ultimate strength point = 600.62 MPa";
        show(Scenes.domItems.tempText)
        set(Scenes.domItems.tempText,172,297)
        Scenes.resetSubStep()
      return true;
      break;
      }
      return false
    },
    s13 = function(){
          Scenes.img.graph4.hide();
          hide(Scenes.domItems.tempText);
          show(Scenes.domItems.stepHeading,"flex");
          Scenes.domItems.stepTitle.innerHTML = "Step 11"
          Scenes.domItems.stepDescription.innerHTML = "Fit the two pieces together so that their axes lies in a straight line:"
          Scenes.img.tableCrop.set(50,70,null,800);
          Scenes.img.break1.set(220,100,null,450).zIndex(5)
          Scenes.img.break2.set(320,100,null,450).zIndex(7)
          Scenes.img.varniarfull.set(180,120,null,300).zIndex(5)
          // onclick 
          Scenes.img.break2.img.onclick = function(){
            anime({
              easing: "easeInOutQuad",
              targets : Scenes.img.break2.img,
              left: 180,
              duration: 1000,
            })
          }
          // onclick
          Scenes.img.varniarfull.img.onclick = function(){
            anime.timeline({
              easing: "easeInOutQuad"
            })
            .add({
              targets : Scenes.img.varniarfull.img,
              left: 435,
              scale: 1.4,
              duration: 1000,
              complete(){
                Scenes.img.varniarfull.hide()
                Scenes.img.varniarLeft.set(435,120,null,300).zIndex(6).scale(1.4);
                Scenes.img.varniarRight.set(410,128,null,100).zIndex(6).scale(1.4);
                anime({
                easing: "easeInOutQuad",
                targets:  Scenes.img.varniarRight.img,
                  left: 462,
                  duration: 1000,
                  complete(){
                    Scenes.img.reading1.set(462,128,null,100).zIndex(6).scale(1.4);
                  }
                })
              }
            })
          
          }

          // varniar right and left
          Scenes.img.varniarLeft.img.onclick = varniarVerticalMove;
          Scenes.img.reading1.img.onclick = varniarVerticalMove;
          function varniarVerticalMove(){
            Scenes.img.reading1.hide();
            anime.timeline({
              easing: "easeInOutQuad",
            })
            .add({
              targets: Scenes.img.varniarRight.img,
              left: 410,
              complete(){
                Scenes.img.varniarLeft.hide()
                Scenes.img.varniarRight.hide()
                Scenes.img.varniarfull.show().zIndex(8)

              }
            })
            .add({
              targets: Scenes.img.varniarfull.img,
              rotate: 90,
              top: 220,
            })
            .add({
              targets: Scenes.img.varniarfull.img,
              left: 330,
              complete(){
                Scenes.img.varniarLeft.set(330,220).rotate(90).zIndex(8)
                Scenes.img.varniarRight.set(427,100,null,100).rotate(90).zIndex(8)
                Scenes.img.varniarfull.hide();
              }
            })
            .add({
              targets: Scenes.img.varniarRight.img,
              top:114,
              complete(){
                Scenes.img.reading2.set(427,114,null,100).scale(1.4).rotate(90).zIndex(9)
              }
            })
          }
      return true
  },
  s14 = function(){
    Scenes.img.varniarLeft.hide();
    Scenes.img.varniarRight.hide();
    Scenes.img.varniarfull.hide();
    Scenes.img.break1.hide();
    Scenes.img.break2.hide();
    Scenes.img.reading2.hide();
    Scenes.img.tableCrop.hide();
    hide(Scenes.domItems.stepHeading);
    Scenes.domItems.tempText.innerHTML = '<b><u>Calculations:</u><b>'
    set(Scenes.domItems.tempText,0,0)
    Scenes.img.lastCalc.set(120,5)
    return true;
  },
  s15 = function(){
    Scenes.img.lastCalc.hide()
    let currentDate = new Date()
    currentDate = `${currentDate.getDate()} - ${currentDate.getMonth()+1} - ${currentDate.getFullYear()}<br>Grade of Steel:       550 SD steel`
    Scenes.domItems.tempText.innerHTML = `<b>Results<br>Date of test:       ${currentDate}</b>`
    set(Scenes.domItems.tempText,40,0)
    Scenes.img.finalLastCalc.set(40,80,350,800)
    return true;
  },
  s16 = function(){
    Scenes.img.finalLastCalc.hide();
    Scenes.domItems.tempText.backgroundColor = "transparent"
    Scenes.domItems.tempText.innerHTML = `<b>Hurray !! ${student_name}, you are completed<b>`;
    let cele = get(".celebration");
    cele.style.height = "400px";
    set(cele,200,0)
    set(Scenes.domItems.tempText,350,50)
    opacity(Scenes.domItems.tempText,0)
    anime({
      targets: Scenes.domItems.tempText,
      opacity:1,
    })
    return true;
  }
  ],
  back() {},
  next() {
    if (this.currentStep < this.steps.length) {
      if ( this.steps[this.currentStep]()) {
        this.currentStep++;
      } 
      else { 
      }
    }
  },
};



// Scenes.steps[5]();
// Scenes.steps[5]();
// Scenes.steps[5]();
// Scenes.steps[6]();
// Scenes.steps[6]();
// Scenes.steps[6]();
// Scenes.steps[7]();
// Scenes.steps[7]();
// Scenes.steps[8]();
// Scenes.steps[8]();
// Scenes.steps[9]();
// Scenes.steps[10]();
// Scenes.steps[11]();
// Scenes.steps[11]();
// Scenes.steps[6]();
// Scenes.steps[6]();
// Scenes.steps[6]();
// Scenes.steps[7]();
// Scenes.steps[7]();
// Scenes.steps[7]();
// Scenes.steps[8]();
// Scenes.steps[8]();
// Scenes.steps[9]();
// Scenes.steps[10]();
// Scenes.steps[11]();
// Scenes.steps[11]();
// Scenes.steps[12]();
// Scenes.steps[15]();





const nextBtn = get(".btn-next")
nextBtn.onclick = function(){
  Scenes.next();
}




// Scenes.steps[2]()
// Scenes.steps[3]()
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
