// Define the function
// to screenshot the div

const FixStyling = {
    isMobileUser: false,
    mainContainerHeight: 638,
    // 1 step aage
    init() {
      this.stopImageDrag();
      this.disableRightClick();
      this.detectMobileUser();
    //   this.detectZoomLevel()
      // TODO UNCOMMENT
      this.setHeightOfMainContainerAuto();
    },
    stopImageDrag() {
      $("img").on("dragstart", function (event) {
        event.preventDefault();
      });
    },
    disableRightClick() {
      document.addEventListener("contextmenu", (event) => event.preventDefault());
    },
    detectMobileUser() {
      let ratio = window.innerWidth / window.innerHeight;
      if (ratio <= 1) {
        this.isMobileUser = true;
      }
      // alert(`h: ${window.innerHeight}\nw: ${window.innerWidth}`)
    },
    // ! set main-container height according to display
    setHeightOfMainContainerAuto() {
      // ! for mobile resising using width
      if (this.isMobileUser) {
        return;
      }
      // alert(this.isMobileUser)
      const windowInnerHeight = parseFloat(window.innerHeight);
      const mainContainerHeight = this.mainContainerHeight
      let scalePercent = windowInnerHeight / mainContainerHeight;
      let translateYValue =
      (windowInnerHeight - mainContainerHeight) / 2 / scalePercent;
      
      // ! scale maxed up to 2x
      if(scalePercent > 2){
        scalePercent = 2
        translateYValue = 160.4
      }

      // alert(scalePercent)
      document.querySelector(
        ".main-container"
      ).style.transform = `scale(${scalePercent}) translateY(${translateYValue}px)`;
    },
    detectZoomLevel() {
      var screenCssPixelRatio = (window.outerWidth - 8) / window.innerWidth;
      let zoomLevel = ""
      if (screenCssPixelRatio >= 0.46 && screenCssPixelRatio <= 0.54) {
        zoomLevel = "-4";
      } else if (screenCssPixelRatio <= 0.64) {
        zoomLevel = "-3";
      } else if (screenCssPixelRatio <= 0.76) {
        zoomLevel = "-2";
      } else if (screenCssPixelRatio <= 0.92) {
        zoomLevel = "-1";
      } else if (screenCssPixelRatio <= 1.1) {
        zoomLevel = "0";
      } else if (screenCssPixelRatio <= 1.32) {
        zoomLevel = "1";
      } else if (screenCssPixelRatio <= 1.58) {
        zoomLevel = "2";
      } else if (screenCssPixelRatio <= 1.9) {
        zoomLevel = "3";
      } else if (screenCssPixelRatio <= 2.28) {
        zoomLevel = "4";
      } else if (screenCssPixelRatio <= 2.7) {
        zoomLevel = "5";
      } else {
        zoomLevel = "unknown";
      }
      //! if zoom not 100% just show message warning
      if(zoomLevel != "0" && !this.isMobileUser){
        $(".main-spinner .text").show();
        this.spinnerTimeoutSeconds = 5000
      }
      if(this.isMobileUser){
        $(".main-spinner .text").show();
        $(".main-spinner .text").html("For better user experience use <br><span>🖥️ Desktop Site</span> and");
        this.spinnerTimeoutSeconds = 5000
      }
      // alert(zoomLevel)
    },
  };
  
  $(document).ready(function () {
    FixStyling.init();
  });
  
  