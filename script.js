
// we start with an empty sudoku...
//we use a single dimentional array 
var sudoku = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
//Making Copies of the Initial unsolved soduku board

var puzzledBoard=sudoku.slice();
var InitialSoduku = sudoku.slice();
var solvedBoard = sudoku.slice();

// properties

// ... and we solve it!!
solvedBoard=solve(sudoku);

// Console log 

//unsolved board 
console.log('unsolved initial soduku');
console.log(InitialSoduku);
// //solved soduku
console.log('solved soduku');
console.log(solvedBoard);

// // stringify vertion of  soduku
console.log('Stringify vertioin of solved soduku');
var solution = stringifySolvedBoard(solvedBoard);
console.log(solution);

//Making PuzzleBoard from solution board

console.log('Stringify vertioin of puzzled soduku');
var easypuzzle = puzzleBoard(solvedBoard,30);
console.log("Easy"+ easypuzzle);

var mediumPuzzle = puzzleBoard(solvedBoard,40);
console.log("Medium" + mediumPuzzle);

var hardPuzzle = puzzleBoard(solvedBoard,50);
console.log("Hard"+hardPuzzle);
//Making PuzzleBoard from solution board

// console.log('puzzledboardStringfy');
//  var puzzledboardStringfy=puzzleBoard(solvedBoard,35);
//  console.log(puzzledboardStringfy);

//It takes the Initial board as an Input and return the stringify vertion of solved board
 function stringifySolvedBoard(board)
 {
   
    return board.join("");

 }

 // It takes the solver sudoku board and difficulty level as an Input and It returnes 
 // the strngify vertion of that board 
function puzzleBoard(board1,difficultyLevel)
{
	for (var i=0; i<difficultyLevel; i++) {
		var randomIndex=Math.floor(Math.random() * 80);

		board1[randomIndex]=0;
	}
    
	return  board1.join("").replace(/0/g, "-");


}



// given a sudoku cell, returns the row

function returnRow(cell) {
	return Math.floor(cell / 9);
}

// given a sudoku cell, returns the column
function returnCol(cell) {
	return cell % 9;
}

// given a sudoku cell, returns the 3x3 block
function returnBlock(cell) {

	return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3);
}









function isPossibleRow(number,row,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[row*9+i] == number) {
			return false;
		}
	}
	return true;
}

// given a number, a column and a sudoku, returns true if the number can be placed in the column
function isPossibleCol(number,col,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[col+9*i] == number) {
			return false;
		}
	}
	return true;
}

// given a number, a 3x3 block and a sudoku, returns true if the number can be placed in the block
function isPossibleBlock(number,block,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[Math.floor(block/3)*27 + i%3 + 9*Math.floor(i/3) + 3*(block%3)] == number) {
			return false;
		}
	}
	return true;
}





// given a cell, a number and a sudoku, returns true if the number can be placed in the cell
function isPossibleNumber(cell,number,sudoku) {
	var row = returnRow(cell);
	var col = returnCol(cell);
	var block = returnBlock(cell);
	return isPossibleRow(number,row,sudoku) && isPossibleCol(number,col,sudoku) && isPossibleBlock(number,block,sudoku);
}





function isCorrectRow(row,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var rowTemp= new Array();
	for (var i=0; i<=8; i++) {
		rowTemp[i] = sudoku[row*9+i];
	}
	rowTemp.sort();
	return rowTemp.join() == rightSequence.join();
}




// given a column and a sudoku, returns true if it's a legal column
function isCorrectCol(col,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var colTemp= new Array();
	for (var i=0; i<=8; i++) {
		colTemp[i] = sudoku[col+i*9];
	}
	colTemp.sort();
	return colTemp.join() == rightSequence.join();
}

// given a 3x3 block and a sudoku, returns true if it's a legal block 
function isCorrectBlock(block,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var blockTemp= new Array();
	for (var i=0; i<=8; i++) {
		blockTemp[i] = sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
	}
	blockTemp.sort();
	return blockTemp.join() == rightSequence.join();
}

// given a sudoku, returns true if the sudoku is solved
function isSolvedSudoku(sudoku) {
	for (var i=0; i<=8; i++) {
		if (!isCorrectBlock(i,sudoku) || !isCorrectRow(i,sudoku) || !isCorrectCol(i,sudoku)) {
			return false;
		}
	}
	return true;
}




// given a cell and a sudoku, returns an array with all possible values we can write in the cell
function determinePossibleValues(cell,sudoku) {
	var possible = new Array();
	for (var i=1; i<=9; i++) {
		if (isPossibleNumber(cell,i,sudoku)) {
			possible.unshift(i);
		}
	}
	return possible;
}




function scanSudokuForUnique(sudoku) {
	var possible = new Array();
	for (var i=0; i<=80; i++) {
		if (sudoku[i] == 0) {
			//Making a 2-D array
			// Making an array at every cell
			possible[i] = new Array();
			possible[i] = determinePossibleValues(i,sudoku);
			if (possible[i].length==0) {
				return false;
			}
		}
	}
	return possible;
}


// given an array and a number, removes the number from the array
function removeAttempt(attemptArray,number) {
	var newArray = new Array();
	for (var i=0; i<attemptArray.length; i++) {
		if (attemptArray[i] != number) {
			newArray.unshift(attemptArray[i]);
		}
	}
	return newArray;
}


// given an 2-d array of possible values assignable to all the  cells,
// returns a random value picked from the array for that particualr cell

function determineRandomPossibleValue(possible,cell) {
	var randomPicked = Math.floor(Math.random() * possible[cell].length);
	return possible[cell][randomPicked];
}




function nextRandom(possible) {
	var max = 9;
	var minChoices = 0;
	for (var i=0; i<=80; i++) {
		if (possible[i]!=undefined) {
			if ((possible[i].length<=max) && (possible[i].length>0)) {
				max = possible[i].length;
				minChoices = i;
			}
		}
	}
	return minChoices;
}

// given a sudoku, solves it
function solve(sudoku) {
	var saved = new Array();
	var savedSudoku = new Array();
	var i=0;
	var nextMove;
	var whatToTry;
	var attempt;
	while (!isSolvedSudoku(sudoku)) {
		i++;
		nextMove = scanSudokuForUnique(sudoku);
		// console.table(nextMove);
		if (nextMove == false) {
			nextMove = saved.pop();
			sudoku = savedSudoku.pop();
		}
		whatToTry = nextRandom(nextMove);
		attempt = determineRandomPossibleValue(nextMove,whatToTry);
		if (nextMove[whatToTry].length>1) {
			// given an array and a number, removes the number from the array
			nextMove[whatToTry] = removeAttempt(nextMove[whatToTry],attempt);

			saved.push(nextMove.slice());
			savedSudoku.push(sudoku.slice());
		}
		sudoku[whatToTry] = attempt;
	}
    console.log("My Board: "+ sudoku);
	return sudoku;
	//showSudoku(sudoku,i);
}

// 
count=0;
for (var i=0;i<9;i++){
    count=9*i;
    document.getElementsByClassName("row")[i].innerHTML="<div class='cell'><input type='text' id='"+(count+1)+"' class='input'></div><div class='cell'><input type='text' id='"+(count+2)+"' class='input'></div><div class='cell'><input type='text' id='"+(count+3)+"' class='input'></div><div class='cell'><input type='text' id='"+(count+4)+"' class='input'></div><div class='cell'><input type='text' id='"+(count+5)+"' class='input'></div><div class='cell'><input type='text' id='"+(count+6)+"' class='input'></div><div class='cell'><input type='text' id='"+(count+7)+"' class='input'></div><div class='cell'><input type='text' id='"+(count+8)+"' class='input'></div><div class='cell'><input type='text' id='"+(count+9)+"' class='input'></div>"
}

//how to play game instruction

function help(){
    window.open(
        "https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/", "_blank");
}
var level;
var choosen;

// Easy Level Generator
easy_board = easypuzzle;
easy = solution;
// Medium Level Generator
medium_board = mediumPuzzle;
medium = solution;
// Hard Level Generator
hard_board = hardPuzzle;
hard = solution;

function start(){
    for(var i=0;i<1;i++){
        document.getElementsByClassName("label")[i].setAttribute("onclick","return false;");
    }
    timer();
    //easy game
    if(document.getElementById("easy").checked){
        level='easy';
        for(var i=0;i<81;i++){
            if(easy_board[i]!='-'){
                document.getElementById((i+1).toString()).value=easy_board[i];
                document.getElementById((i+1).toString()).readOnly=true;
            }
        }
    }

    //medium game
    else if(document.getElementById("medium").checked){
        level='medium';
        for(var i=0;i<81;i++){
            if(medium_board[i]!='-'){
                document.getElementById((i+1).toString()).value=medium_board[i];
                document.getElementById((i+1).toString()).readOnly=true;
            }
        }
    }


//hard game
else{
    level='hard';
        for(var i=0;i<81;i++){
            if(hard_board[i]!='-'){
                document.getElementById((i+1).toString()).value=hard_board[i];
                document.getElementById((i+1).toString()).readOnly=true;
            }
        }
}
document.getElementById("start").removeAttribute("onclick");  
}


//check answer
var id=setInterval(() => {
    if (level=="easy"){
    if(document.activeElement.className=="input"){
        if((document.getElementById(document.activeElement.id).value==easy[document.activeElement.id-1])||(document.getElementById(document.activeElement.id).value=='')){
            for(var i=0;i<81;i++){
                if(i==80 && document.getElementById((81).toString()).value!='' ){
                        alert("you win !! congratulation.....");
                        clearInterval(id);
                        window.location.reload();
                }
                else if(document.getElementById((i+1).toString()).value==''){
                    break;
                }
            }
        }
        else{
            if(document.getElementById("rem_live").innerHTML==1){
                document.getElementById("rem_live").innerHTML==0;
                alert("you lost !!");
                document.activeElement.value='';
                window.location.reload();

            }
            else{
            alert("you choose wrong number, you loose your one life !!");
            document.getElementById("rem_live").innerHTML=document.getElementById("rem_live").innerHTML-1;
            document.activeElement.value='';
            }
        }

    }
}

else if(level=="medium"){

    if(document.activeElement.className=="input"){
        if((document.getElementById(document.activeElement.id).value==medium[document.activeElement.id-1])||(document.getElementById(document.activeElement.id).value=='')){
            for(var i=0;i<81;i++){
                if(i==80 && document.getElementById((81).toString()).value!='' ){
                        alert("you win !! congratulation.....");
                        clearInterval(id);
                        window.location.reload();
                }
                else if(document.getElementById((i+1).toString()).value==''){
                    break;
                }
            }
        }
        else{
            if(document.getElementById("rem_live").innerHTML==1){
                document.getElementById("rem_live").innerHTML==0;
                alert("you lost !!");
                document.activeElement.value='';
                window.location.reload();

            }
            else{
            alert("you choose wrong number, you loose your one life !!");
            document.getElementById("rem_live").innerHTML=document.getElementById("rem_live").innerHTML-1;
            document.activeElement.value='';
            }
        }

    }
}

else{

    if(document.activeElement.className=="input"){
        if((document.getElementById(document.activeElement.id).value==hard[document.activeElement.id-1])||(document.getElementById(document.activeElement.id).value=='')){
            for(var i=0;i<81;i++){
                if(i==80 && document.getElementById((81).toString()).value!='' ){
                        alert("you win !! congratulation.....");
                        clearInterval(id);
                        window.location.reload();
                }
                else if(document.getElementById((i+1).toString()).value==''){
                    break;
                }
            }
        }
        else{
            if(document.getElementById("rem_live").innerHTML==1){
                document.getElementById("rem_live").innerHTML==0;
                alert("you lost !!");
                document.activeElement.value='';
                window.location.reload();

            }
            else{
            alert("you choose wrong number, you loose your one life !!");
            document.getElementById("rem_live").innerHTML=document.getElementById("rem_live").innerHTML-1;
            document.activeElement.value='';
            }
        }

    }
}
}, 500);



//answer
function answer(){
    if(level=="easy"){
        for(var i=0;i<81;i++){
            document.getElementById((i+1).toString()).value=easy[i];
        }
    }
    else if(level=="medium"){
        for(var i=0;i<81;i++){
            document.getElementById((i+1).toString()).value=medium[i];
        }
    }
    else if(level=="hard"){
        for(var i=0;i<81;i++){
            document.getElementById((i+1).toString()).value=hard[i];
        }
    }
    else{
        alert("first choose the game and start it !!");
    }
}
//new game

function replay(){
    for(var i=0;i<81;i++){
        document.getElementById((i+1).toString()).value='';
    }
    start();
}


//timer
function timer(){
if(document.getElementById("time1").checked==true){
    document.getElementById("time_min").innerHTML="0"+(document.getElementById("time1_min").innerHTML-1).toString();
    document.getElementById("time_sec").innerHTML='59';
}

else if(document.getElementById("time2").checked==true){
    document.getElementById("time_min").innerHTML="0"+(document.getElementById("time2_min").innerHTML-1).toString();
    document.getElementById("time_sec").innerHTML='59';
}
else{
    document.getElementById("time_min").innerHTML="0"+(document.getElementById("time3_min").innerHTML-1).toString();
    document.getElementById("time_sec").innerHTML='59';
}

    setInterval(() => {
        if(document.getElementById("time_sec").innerHTML=='00'){
            document.getElementById("time_sec").innerHTML="59";
        }
        else{
            if(parseInt(document.getElementById("time_sec").innerHTML)<=10){
            document.getElementById("time_sec").innerHTML="0"+(document.getElementById("time_sec").innerHTML-1).toString();
            }
            else{
                document.getElementById("time_sec").innerHTML=document.getElementById("time_sec").innerHTML-1;
            }
        }
    }, 1000);


    setInterval(() => {
        if(document.getElementById("time_min").innerHTML=='00'){
            document.getElementById("time_sec").innerHTML='00';
            setTimeout(() => {
                alert("you lost !!");
            }, 50);
        }
        else{
            if(parseInt(document.getElementById("time_min").innerHTML)<=10){
            document.getElementById("time_min").innerHTML="0"+(document.getElementById("time_min").innerHTML-1).toString();
            }
            else{
                document.getElementById("time_min").innerHTML=document.getElementById("time_min").innerHTML-1;
            }
        }
    }, 60*1000);

}
