let Start = document.querySelector(".start-btn");
let button = document.querySelector(".btn");
let container = document.querySelector(".subContainer");
let database = ["items", "hello", "apple", "house", "stamp", "knife", "lemon", "nurse", "space", "taste", "train", "wheel", "bread", "cloud", "dance", "flute"];



    

    
let randomletter = (max) => {
  let boxes = document.querySelectorAll(".boxes");
  boxes.forEach((box) => {
    box.setAttribute("draggable", true);
    box.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", box.innerHTML);
    });
  });

  let dropbox = document.querySelectorAll(".box");
  dropbox.forEach((boxs) => {
    boxs.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    boxs.addEventListener("drop", (e) => {
      e.preventDefault();
      let droppedInnerHTML = e.dataTransfer.getData("text");
      boxs.innerHTML = `<h1>${droppedInnerHTML}</h1>`;
      if (areAllBoxesFilled()) {
        checkWinCondition();
      }
    });
  });
    
let start=true;
    Start.addEventListener("click", () => {
     if(start){
       Swal.fire({
  title: "Game started!",
  
});
         let word = database[Math.floor(Math.random() * database.length)];
         let letters = word.split("");

    for (let i = letters.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = letters[i];
      letters[i] = letters[j];
      letters[j] = temp;
    }
         boxes.forEach((box, index) => {
         box.innerHTML = `<h1>${letters[index]}</h1>`;
    });
    dropbox.forEach((boxs) => {
      boxs.innerHTML = "";
    });
            start=false
            
        }
        else if (start===false){
            
        Swal.fire({
        title: "Game already started!",
          icon: "warning"
});
        } 
        
     
  });
 
    /*shuffle button*/


    button.addEventListener("click", () => {
    let word = database[Math.floor(Math.random() * database.length)];
    let letters = word.split("");

    for (let i = letters.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = letters[i];
      letters[i] = letters[j];
      letters[j] = temp;
    }

    boxes.forEach((box, index) => {
      box.innerHTML = `<h1>${letters[index]}</h1>`;
      box.classList.add("flip");
      setTimeout(()=>{
        box.classList.remove("flip")
      },500)
      
    });
    dropbox.forEach((boxs) => {
      boxs.innerHTML = "";
    });
  });
};

    


function areAllBoxesFilled() {
  let dropbox = document.querySelectorAll(".box");
  for (let box of dropbox) {
    if (box.innerHTML === "") {
      return false;
    }
  }
  return true;
}

function checkWinCondition() {
  let dropbox = document.querySelectorAll(".box");
  let word = "";
  dropbox.forEach((boxs) => {
    word += boxs.innerHTML.replace(/<\/?h1>/g, "").toLowerCase();
  });
  if (database.includes(word)) {
    Swal.fire({
        title: "YOU WIN!",
        text:"You Guess It Correct!",
      icon: "success"
});
  } else {
    Swal.fire({
    title: "TRY AGAIN!",
      text:"You Guess It Wrong!",
      icon: "error"
});
  }
  setTimeout(() => {
    location.reload();
  }, 2000);
    
}

randomletter(26);