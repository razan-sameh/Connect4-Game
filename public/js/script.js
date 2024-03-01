let gameContainer = document.querySelector(".gameContainer");
const rows = document.querySelectorAll(".row");
const triangle = document.querySelector(".triangle-down");
let row , col,ball;
let over = false;
let result = [];
var board = [
    [0, 0, 0, 0, 0, 0, 0], // Row 0
    [0, 0, 0, 0, 0, 0, 0], // Row 1
    [0, 0, 0, 0, 0, 0, 0], // Row 2
    [0, 0, 0, 0, 0, 0, 0], // Row 3
    [0, 0, 0, 0, 0, 0, 0], // Row 4
    [0, 0, 0, 0, 0, 0, 0]  // Row 5
  ];
let columnIndex ;
let clickCounter = 0;

for (let i = 0; i < 6; i++) {
    row = document.createElement("div");
    gameContainer.appendChild(row);
    row.setAttribute("class","row rowNum"+(i+1));
    for (let j = 0; j < 7; j++) {
        col = document.createElement("div");
        row.appendChild(col);
        col.setAttribute("class","col colNum"+(j+1));
    }
}



//hover
let elements = [] ;
for (let i = 0; i < 7; i++) {
  elements[i] = document.querySelectorAll('.colNum'+(i+1)); 
}
document.addEventListener('mouseover',function(e){
  if (over == true) {
    e.stopPropagation();
    e.preventDefault();
    return;
  }
  if (e.target.classList.contains("col")) {
    console.log(true);
    triangle.style.left =  "calc("+ e.target.offsetLeft+"px + 2%)";
    triangle.style.transition = "0.5s";
  }
})


//click
document.addEventListener('click',function(e){
    if (over == true) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (e.target.classList.contains("col")) {
        triangle.style.borderTopColor = clickCounter % 2 === 1 ? "#feff01" :"#e94b4a";
        clickCounter++;
        var cols = document.querySelectorAll('.col');
        let k =0;
        for (let j = 0; j < cols.length; j++) { //loop on all colls to get all the coll that has the same class that press on  
            if (cols[j].getAttribute("class") == e.target.getAttribute("class")) {
                result[k] = cols[j];
                columnIndex = Array.from(cols[j].parentNode.children).indexOf(cols[j]);
                k++;
            }
        }   
        for (let i = result.length-1; i >= 0; i--) {
            let ball = result[i].querySelector(".ball");
            if (!ball) { //check if the coll has ball
                ball = document.createElement("div");
                result[i].appendChild(ball);
                ball.className = clickCounter % 2 === 1 ? "ball p1" :"ball p2";
                // Set the value in the board array
                board[i][columnIndex] = clickCounter % 2 === 1 ? 1 : 2;
                checkWin();
                return;
            }      
        } 
    }
   })

// Function to check if there is a winning sequence
function checkWin() {
    Player1 = 1 ;
    Player2 = 2 ;
    let win = document.querySelector(".win");
    const rows = 5;
    const cols = 6;
    // Check horizontal sequences
    for (let row = rows; row > 0; row--) {
      for (let col = 0; col <= cols - 4; col++) {
        if (
          board[row][col] === Player1 &&
          board[row][col + 1] === Player1 &&
          board[row][col + 2] === Player1 &&
          board[row][col + 3] === Player1
        ) {
            win.innerHTML = "Player One Win"
            win.style.display = "block";
            over = true;
            return;
        }
        else if (
            board[row][col] === Player2 &&
            board[row][col + 1] === Player2 &&
            board[row][col + 2] === Player2 &&
            board[row][col + 3] === Player2
          ) {
            win.innerHTML = "Player Two Win"
            win.style.display = "block";
            win.style.color = "#e94b4a";
            over = true;
            return;
        }
      }
    }
    
    // Check vertical sequences
    for (let row = rows; row > rows - 2; row--) {
      for (let col = 0; col < cols; col++) {
        if (
            board[row][col] === Player1 &&
            board[row - 1][col] === Player1 &&
            board[row - 2][col] === Player1 &&
            board[row - 3][col] === Player1
          ) {
            win.innerHTML = "Player One Win"
            win.style.display = "block";
            over = true;
            return;
          }
          else if (
              board[row][col] === Player2 &&
              board[row - 1][col] === Player2 &&
              board[row - 2][col] === Player2 &&
              board[row - 3][col] === Player2
            ) {
              win.innerHTML = "Player Two Win"
              win.style.display = "block";
              win.style.color = "#e94b4a";
              over = true;
              return;
          }
      }
    }
  
    // Check diagonal sequences (top-left to bottom-right)
    for (let row = rows; row >= rows - 2; row--) {
      for (let col = 0; col <= cols - 4; col++) {
        if (
          board[row][col] === Player1 &&
          board[row - 1][col + 1] === Player1 &&
          board[row - 2][col + 2] === Player1 &&
          board[row - 3][col + 3] === Player1
        ) {
            win.innerHTML = "Player One Win"
            win.style.display = "block";
            over = true;
            return;        
        }
        else if (
            board[row][col] === Player2 &&
            board[row - 1][col + 1] === Player2 &&
            board[row - 2][col + 2] === Player2 &&
            board[row - 3][col + 3] === Player2
          ) {
            win.innerHTML = "Player Two Win"
            win.style.display = "block";
            win.style.color = "#e94b4a";
            over = true;
            return;          
        }
      }
    }
  
    // Check diagonal sequences (bottom-left to top-right)
    for (let row = 0; row < rows - 2; row++) {
      for (let col = 0; col <= cols - 2; col++) {
        if (
            board[row][col] === Player1 &&
            board[row + 1][col + 1] === Player1 &&
            board[row + 2][col + 2] === Player1 &&
            board[row + 3][col + 3] === Player1
          ) {
              win.innerHTML = "Player One Win"
              win.style.display = "block";
              over = true;
              return;        
          }
          else if (
              board[row][col] === Player2 &&
              board[row + 1][col + 1] === Player2 &&
              board[row + 2][col + 2] === Player2 &&
              board[row + 3][col + 3] === Player2
            ) {
              win.innerHTML = "Player Two Win"
              win.style.display = "block";
              win.style.color = "#e94b4a";
              over = true;
              return;          
          }
      }
    }
    over = false;
    return false;
  }


