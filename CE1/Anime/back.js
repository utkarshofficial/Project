let prog = anime({
    targets: '.container1',
    width: "100%",
    autoplay: false,
//   direction: '',
  loop: false,
  easing: 'easeInOutSine',

});

let boom = anime({
    targets: ".container",
    translateX: 200,
    duration: 20,
    delay: anime.stagger(1000, {direction: "",easing: "linear"}),
});

function show(){
    pd.value = prog.progress;
}

let p = document.getElementById("progress");
p.addEventListener("input", function() {
    prog.seek((p.value / 100) * prog.duration);

});


