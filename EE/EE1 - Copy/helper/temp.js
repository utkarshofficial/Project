function sliderR(){
    let slider_R = document.querySelector(".slider_R")
    let sliderImg = document.querySelector(".slider-R-arrow")
    let sliderValueInput = document.querySelector(".r .value-box input")
    // ratio to move 450/50 = 1:10
    // max img 71px -> min 120 px
    let val = 0
    
    // slider function  
    function slide(e){
        e = e instanceof Event
        if(e){
            sliderValueInput.value = slider_R.value 
        }
        else{
            slider_R.value = sliderValueInput.value
        }
        val = (slider_R.value / 9.3) - 5
        sliderImg.style.top = `${120 - val}px`
    }

    const slideInput = ()=>{
        let val = sliderValueInput.value
        if(val > 500){
            val = 500
        }
        sliderValueInput.value = val
        slide(false)
    }

    slider_R.oninput = slide
    sliderValueInput.onkeyup = slideInput
    sliderValueInput.addEventListener("focusout",()=>{
        if(sliderValueInput.value < 50){
            sliderValueInput.value = 50
        }
        slide(false)
    })
}
function sliderD(){
    let slider_D = document.querySelector(".slider_D")
    let sliderImg = document.querySelector(".slider-D-arrow")
    let sliderValueInput = document.querySelector(".d .value-box input")
    let val = 0
    
    // slider function  
    function slide(e){
        e = e instanceof Event
        if(e){
            sliderValueInput.value = slider_D.value 
        }
        else{
            slider_D.value = sliderValueInput.value
        }
        val = ((slider_D.value*100) / 1.7) - 5
        sliderImg.style.left = `${218 + val}px`
    }

    const slideInput = ()=>{
        let val = sliderValueInput.value
        if(val > 0.95){
            val = 0.95
        }
        sliderValueInput.value = val
        slide(false)
    }

    slider_D.oninput = slide
    sliderValueInput.onkeyup = slideInput
    sliderValueInput.addEventListener("focusout",()=>{
        if(sliderValueInput.value < 0.1){
            sliderValueInput.value = 0.1
        }
        slide(false)
    })
}
function sliderV(){
    let sliderArrow = document.querySelector(".slider-V-arrow")
    let sliderValueInput = document.querySelector(".v .value-box input")
    
    // slider function  
    function rotateArrow(rot=0){
        if(sliderArrow.classList.contains("slider-v-r3")){
            sliderArrow.classList.remove("slider-v-r3")
            sliderArrow.classList.add("slider-v-r1")
            sliderValueInput.value = 24
            
        }else if(sliderArrow.classList.contains("slider-v-r1")){
            sliderArrow.classList.remove("slider-v-r1")
            sliderArrow.classList.add("slider-v-r2")
            sliderValueInput.value = 48
        }else if(sliderArrow.classList.contains("slider-v-r2")){
            sliderArrow.classList.remove("slider-v-r2")
            sliderArrow.classList.add("slider-v-r3")
            sliderValueInput.value = 72
        }
    }

    sliderArrow.onclick = rotateArrow
}
sliderV()
sliderR()
sliderD()