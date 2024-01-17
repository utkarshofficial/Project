// * progress bar
const prevBtns = document.querySelector(".btn-prev");
const nextBtns = document.querySelector(".btn-next");
const progress = document.getElementById("progress");
const progressSteps = document.querySelectorAll(".progress-step");


let currProgressStep = -1;
// total steps from the number of drawer items
let totalProgressSteps = document.querySelectorAll(".step").length;

const nextProgressBar = () => {
    if(currProgressStep < totalProgressSteps - 1){
        currProgressStep++;
        updateProgressbar();
    }
};

const backProgressBar =  () => {
    if(currProgressStep > 0){
        currProgressStep--;
        updateProgressbar();
    }
};

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < currProgressStep + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
        progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}
