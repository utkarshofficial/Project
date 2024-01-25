let listItems = document.querySelectorAll(".steps ol li");
let activeIdx = 0;
// handle list items click
// for (const item of listItems) {
//     item.addEventListener("click", (event) => {
//         event.
//     });
// }
function nextDrawerItem() {
  if (activeIdx < listItems.length) {
    listItems[activeIdx].classList.add("active");
    if (activeIdx > 0) {
      listItems[activeIdx - 1].classList.add("completed");
      listItems[activeIdx - 1].classList.remove("active");
    }
  }
  activeIdx = activeIdx < listItems.length ? activeIdx + 1 : activeIdx;
}

function backDrawerItem() {
  if (activeIdx <= 1) return;
  activeIdx--;
  listItems[activeIdx].classList.remove("active");
  listItems[activeIdx].classList.add("completed");
  if (activeIdx > 0) {
    listItems[activeIdx - 1].classList.add("active");
  }
}


