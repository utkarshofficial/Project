// support class for axis
class Img{
    constructor(imgName=null,left=null,top=null,bottom=null,right=null){
        // coordinates 
        this.left = left
        this.top= top
        this.bottom = bottom;
        this.right = right;
        this.img = Src.allImgs[imgName]
        return this
    }
    set(){
        if(this.left !== null)
            this.img.style.left = String(this.left);
        if(this.top !== null)
            this.img.style.top = String(this.top);
        if(this.bottom !== null)
            this.img.style.bottom = String(this.bottom);
        if(this.right !== null)
            this.img.style.right = String(this.right);
    }
    show(){
        this.img.style.display = "block";
    }
    hide(){
        this.img.style.display = "none";
    }
}

const src = {
    // pick imgs from the dom 
    allImgs:[],
    allImgsDom: document.querySelectorAll(".main-window-imgs"),
    set(){
        this.allImgs = {
            "000":this.allImgsDom[0],
            "875":this.allImgsDom[1],
            "arrow":this.allImgsDom[2],
            "bare_raber":this.allImgsDom[3],
            "bare_raber2":this.allImgsDom[4],
            "bare_raber2marked":this.allImgsDom[5],
            "bare_reber_marked - Copy":this.allImgsDom[6],
            "bare_reber_marked":this.allImgsDom[7],
            "bare_reber_markedbrake":this.allImgsDom[8],
            "bare_reber_markedbrake":this.allImgsDom[9],
            "bare_reber_markedbrake2":this.allImgsDom[10],
            "betweenlayer":this.allImgsDom[11],
            "br1bottom":this.allImgsDom[12],
            "br2up":this.allImgsDom[13],
            "brake1":this.allImgsDom[14],
            "brake2":this.allImgsDom[15],
            "brakeraber":this.allImgsDom[16],
            "brakeraberjoin":this.allImgsDom[17],
            "brakezoom":this.allImgsDom[18],
            "broken1":this.allImgsDom[19],
            "broken2":this.allImgsDom[20],
            "dash":this.allImgsDom[21],
            "dashblack":this.allImgsDom[22],
            "dispvarniar":this.allImgsDom[23],
            "extract":this.allImgsDom[24],
            "gif1":this.allImgsDom[25],
            "gif2":this.allImgsDom[26],
            "gif3":this.allImgsDom[27],
            "gif4":this.allImgsDom[28],
            "graph1":this.allImgsDom[29],
            "grip":this.allImgsDom[30],
            "hand6":this.allImgsDom[31],
            "handmarker":this.allImgsDom[32],
            "header":this.allImgsDom[33],
            "iron_rod":this.allImgsDom[34],
            "laerrow":this.allImgsDom[35],
            "laerrow2":this.allImgsDom[36],
            "man":this.allImgsDom[37],
            "marker":this.allImgsDom[38],
            "measure1 - Copy":this.allImgsDom[39],
            "measure1":this.allImgsDom[40],
            "measure2":this.allImgsDom[41],
            "measurearrow":this.allImgsDom[42],
            "measuretape":this.allImgsDom[43],
            "Next":this.allImgsDom[44],
            "off_screen":this.allImgsDom[45],
            "Picture2":this.allImgsDom[46],
            "Picture3":this.allImgsDom[47],
            "Picture4":this.allImgsDom[48],
            "Picture5":this.allImgsDom[49],
            "Picture6":this.allImgsDom[50],
            "README":this.allImgsDom[51],
            "reber1":this.allImgsDom[52],
            "reberafter1":this.allImgsDom[53],
            "reberafter2":this.allImgsDom[54],
            "reberafter3":this.allImgsDom[55],
            "reberafter4":this.allImgsDom[56],
            "redsize":this.allImgsDom[57],
            "S0_formula":this.allImgsDom[58],
            "S0_formula2":this.allImgsDom[59],
            "S0_formula3":this.allImgsDom[60],
            "S0_formula4":this.allImgsDom[61],
            "S0_formula5":this.allImgsDom[62],
            "S0_formulaul":this.allImgsDom[63],
            "Screenshot_6":this.allImgsDom[64],
            "sheet":this.allImgsDom[65],
            "size":this.allImgsDom[66],
            "transbox":this.allImgsDom[67],
            "utm":this.allImgsDom[68],
            "varniar":this.allImgsDom[69],
            "varniar2":this.allImgsDom[70],
            "varniar3":this.allImgsDom[71],
            "varniar37":this.allImgsDom[72],
            "varniarfull":this.allImgsDom[73],
            "varniarfullopen - Copy":this.allImgsDom[74],
            "varniarfullopen":this.allImgsDom[75],
            "weight":this.allImgsDom[76],
        }
    },
    allImgsInitialAxis:[],
    get(imgName){
        console.log(this.allImgs[imgName])
        return this.allImgs[imgName];
    }
}

Src.set()
Src.get("000")


class Render{
    constructor(){
        this.processStack = []
        this.processQueue = []
        this.currentScene = null

    }
    back(){}
    next(){}
}


class Scene{
    constructor(){
        this.imgs = []
        this.imgsAxis = []
        this.subtitles = []
        this.animes = []
        this.currentAnime = 0;
    }
    next(){

    }
    back(){

    }
    run(){

    }
    // all steps

}













// i really enjoyed the voice of keybord 
// its amazing


