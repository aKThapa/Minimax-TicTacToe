/*****************************************************
*****************Welcome to my Game!****************
       ***********TIC TAC TOE************
        **********BEAT THE AI***********
---Turn will represent the player's or the computer's turn
---for now player will always start first
---odd number = player's turn
---even number = computer's turn
---and Player = X    Computer = O
****************************************************/
var turn = 0;
var player = "X";
var aI = "O";
var fillGridNo;
var gridLastFilled;

document.getElementById("gameState").innerHTML = "Welcome!"

document.getElementById("startGame").addEventListener("click" , reset);
/*reset();*/



//add click event to all the td elements
var a;
for(a = 0; a < 9; a++){
    document.getElementById("grid" + a).getElementsByClassName("content")[0].addEventListener("click" , start);
}

/*reset();*/

function start(){
    
    /****************************************************
    ---checks the remainder when divided by 2, to determine if the 
    ---turn is even or odd, if it's 0 it means it's even else it's odd
    ****************************************************/
    if( turn % 2 != 0){//not equal to 0 so it's odd
        if(this.innerHTML === ''){
            this.innerHTML = player;
            turn++;
           console.log("Value of turn, after clicking in empty cell = " + turn);
        }
        
        else{
            console.log("Its not empty");
            console.log("value of turn : "+turn);
        }
    }
    
    fireAi();

}

function fireAi()
{
    if(turn !== 0)
    {
    document.getElementById("gameState").innerHTML = "Ai's Turn, it's working.........";
    setTimeout(AI, 2000);
    }
}

/*****************************************************
---This is the main AI function which will call other
---AI functions to make sure that player has a very 
---little chance of winning the game or maximise AIs
---potential to atleast make a draw
*****************************************************/
function AI(){
    /*****************************************************
    ---This function is called everytime the player clicks on 
    ---the table, but it will only do something if its the AIs
    ---turn
    *****************************************************/
    if( turn % 2 == 0){
        console.log("AI has been fired");
        if(turn === 2){
            fillGridNo = randomEmptyGrid();
            gridLastFilled = fillGridNo;
            document.getElementById("grid" +fillGridNo).getElementsByClassName("content")[0].innerHTML = aI;
            console.log("fillGridNo = " + fillGridNo);
        }
        else{
            fillGridNo = checkBestMoveForAI(gridLastFilled);
            gridLastFilled = fillGridNo;
            document.getElementById("grid" +fillGridNo).getElementsByClassName("content")[0].innerHTML = aI;
        }
        turn++;
        document.getElementById("gameState").innerHTML = "Your Turn";
        console.log("Value of turn after AI : " +turn);
    }
}




function checkBestMoveForAI(lastFilledGrid){
    console.log("BestMoverForAI fired");
    var grids = new Array(9);
    var c;
    for(c = 0; c < grids.length; c++){
            grids[c] = document.getElementById("grid" +c).getElementsByClassName("content")[0].innerHTML;
    }
    
    //grid0
    if(lastFilledGrid === 0){
        if( grids[1] === "" && grids[2] === ""){
            fillGridNo = 2;
            console.log("I am at grid0 first if");
        }else if( grids[3] === "" && grids[6] === ""){
            fillGridNo = 3;
            console.log("I am at grid0 second if");
        }else{
            if(grids[4] === ""){
                fillGridNo = 4;
                console.log("I am at grid0 else, first if");
            }
            if(grids[8] === ""){
                fillGridNo = 8;
                console.log("I am at grid0 else, second if");
            }
        }
    }
    //grid1
    if(lastFilledGrid === 1){
        if( grids[0] === "" && grids[2] === ""){
            fillGridNo = 0;
            console.log("I am at grid1 first if");
        }else if( grids[4]  === "" && grids[7] === ""){
            fillGridNo = 4;
            console.log("I am at grid1 second if");
        }else{
            fillGridNo = randomEmptyGrid();
            console.log("I am at grid1 random empty grid");
        }
    }
    //grid2
    if(lastFilledGrid === 2){
        if( grids[0] === "" && grids[1] === ""){
            fillGridNo = 0;
            console.log("I am at grid2 first if");
        }else if( grids[4] === "" && grids[6] === ""){
            fillGridNo = 4;
            console.log("I am at grid2 second if");
        }else{
            if(grids[5] === ""){
                fillGridNo = 5;
                console.log("I am at grid2 else, first if");
            }
            if(grids[8] === ""){
                fillGridNo = 8;
                console.log("I am at grid2 else, second if");
            }
        }
    }
    //grid3
    if(lastFilledGrid === 3){
        if( grids[0] === "" && grids[6] === ""){
            fillGridNo = 6;
            console.log("I am at grid3 first if");
        }else if( grids[4] === "" && grids[5] === ""){
            fillGridNo = 4;
            console.log("I am at grid3 second if");
        }else{
            fillGridNo = randomEmptyGrid();
            console.log("I am at grid3 random empty grid");
        }
    }
    //grid4
    if(lastFilledGrid === 4){
        if( grids[1] === "" && grids[7] === ""){
            fillGridNo = 7;
            console.log("I am at grid4 first if");
        }else if( grids[3] === "" && grids[5] === ""){
            fillGridNo = 5;
            console.log("I am at grid4 second if");
        }else if( grids[0] === "" && grids[8] === ""){
            fillGridNo = 8;
            console.log("I am at grid4 third if");
        }else{
            if(grids[2] === ""){
                fillGridNo = 2;
                console.log("I am at grid4 else, first if");
            }
            if(grids[6] === "")
            {
                fillGridNo = 6;
                console.log("I am at grid4 else, second if");
            }
        }
    }
    //grid5
    if(lastFilledGrid === 5){
        if( grids[2] === "" && grids[8] === ""){
            fillGridNo = 8;
            console.log("I am at grid5 first if");
        }else if( grids[3] === "" && grids[4] === ""){
            fillGridNo = 4;
            console.log("I am at grid5 second if");
        }else{
            fillGridNo = randomEmptyGrid();
            console.log("I am at grid5 random empty grid");
        }
    }
    //grid6
    if(lastFilledGrid === 6){
        if( grids[0] === "" && grids[3] === ""){
            fillGridNo = 0;
            console.log("I am at grid6 first if");
        }else if( grids[2] === "" && grids[4] === ""){
            fillGridNo = 2;
            console.log("I am at grid6 second if");
        }else{
            if(grids[7] === ""){
                fillGridNo = 7;
                console.log("I am at grid6 else, first if");
            }
            if(grids[8] === "")
            {
                fillGridNo = 8;
                console.log("I am at grid6 else, second if");
            }
        }
    }
    //grid7
    if(lastFilledGrid === 7){
        if( grids[1] === "" && grids[4] === ""){
            fillGridNo = 1;
            console.log("I am at grid7 first if");
        }else if( grids[6] === "" && grids[8] === ""){
            fillGridNo = 8;
            console.log("I am at grid7 second if");
        }else{
            fillGridNo = randomEmptyGrid();
            console.log("I am at grid7 random empty grid");
        }
    }
    //grid8
    if(lastFilledGrid === 8){
        if( grids[0] === "" && grids[4] === ""){
            fillGridNo = 0;
            console.log("I am at grid8 first if");
        }else if( grids[2] === "" && grids[5] === ""){
            fillGridNo = 2;
            console.log("I am at grid8 second if");
        }else{
            if(grids[6]  === "" ){
                fillGridNo = 6;
                console.log("I am at grid8 else, first if");
            }
            if(grids[7]  === ""){
                fillGridNo = 7;
                console.log("I am at grid8 else, second if");
            }
        }
    }
    return fillGridNo;
}


function randomEmptyGrid()
{
    var emptyGrids = [];
    var d;
    for(d = 0; d < 9; d++)
        {
            if(document.getElementById("grid" + d).getElementsByClassName("content")[0].innerHTML === "")
                {
                    emptyGrids.push(d);
                    //console.log("Empty grid at : " + d);
                }
        }
    
    var randomGrid = emptyGrids[Math.floor(Math.random() * (emptyGrids.length+1))];
    return randomGrid;
}



function checkForAIsWin(){
    /*
    ---In order to check for the win the AI must know the value
    ---in every cell of the table, so the code below does exactly
    ---that, it stores value inside every cell in an array
    */
    var grids = new Array(9);
    var e;
    for(e = 0; e < grids.length; e++ ){
        grids[e] = document.getElementById("grid"+e).getElementsByClassName("content")[0].innerHTML;
    }
}

function checkForPlayersWin(){}



function reset() {
    //console.log("I am clickable");
    turn = 1;
    var i;
    for (i = 0; i < 9; i++) {
            document.getElementById("grid" + i).getElementsByClassName("content")[0].innerHTML = "";
        }
    document.getElementById("gameState").innerHTML = "Your Turn";
}


/*document.getElementById('grid1').addEventListener('click' , reset);*/