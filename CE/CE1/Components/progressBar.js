const prevBtns = document.querySelector(".btn-prev");
const nextBtns = document.querySelector(".btn-next");
const progress = document.getElementById("progress");
const progressSteps = document.querySelectorAll(".progress-step");

let steps = 0;
let totalSteps = 6;

nextBtns.addEventListener("click", () => {
    if(steps < totalSteps - 1){
        steps++;
        updateProgressbar();
    }
});

prevBtns.addEventListener("click", () => {
    if(steps > 0){
        steps--;
        updateProgressbar();
    }
});

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < steps + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
        progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}
