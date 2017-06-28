/*****************************************************
*****************Welcome to my Game!****************
       ***********TIC TAC TOE************
        **********BEAT THE AI***********
---Turn will represent the player's or the computer's turn
---for now player will always start first
---and Player = X    Computer = O
****************************************************/
var grid = new Array(9);
var _HUMAN = "X";
var _AI    = "O";
var human_turn = true;
var ai_turn    = false;
var availableSpots;
var counter = 0;

document.getElementById("gameState").innerHTML = "Can you beat the AI!";
document.getElementById("startGame").addEventListener("click" , reset);


addEventListeners();
function addEventListeners()
{
    for(var a = 0; a < 9; a++)
    {
        document.getElementById("grid" + a).getElementsByClassName("content")[0].addEventListener("click" , start);
    }

}


function start()
{
    turn();
    console.log("Human turn : " +human_turn);
    if(human_turn)
    {
        if(this.innerHTML === "")
        {
            this.innerHTML = _HUMAN;
            counter++;
            human_turn = false;
            console.log("Counter : " + counter);
            updateGrid();
            if(winning(_HUMAN))
            {
                console.log("You won!!!");
                document.getElementById("gameState").innerHTML = "Yae!!!!!!!You Won"; 
                counter = -1;
                setTimeout(hardReset, 3000);
                return;
            }
            if(counter === 9 && !winning(_AI) && !winning(_HUMAN))
            {
                document.getElementById("gameState").innerHTML = "It's a Draw!";
                console.log("Its a draw, counter = " +counter);
                setTimeout(hardReset, 3000);
                return;
            }
            fireAi();
        
        }
        else
        {
        console.log("It's not empty");
        }
    }
    /*fireAi();*/
}

function fireAi()
{
    if(counter !== 0)
    {
        document.getElementById("gameState").innerHTML = ".AI.";
        setTimeout(loadingPattern,  500 ,     "..AI.."    );
        setTimeout(loadingPattern, 1000,     "...AI..."   );
        setTimeout(loadingPattern, 1500,    "....AI...."  );
        setTimeout(loadingPattern, 2000,   ".....AI....." );
        setTimeout(AI, 2000);
    }
}

function hardReset()
{
    for(var a = 0; a < 9; a++)
    {
        document.getElementById("grid" + a).getElementsByClassName("content")[0].removeEventListener("click" , start);
    }
    countdown("5");
    setTimeout(countdown, 1000, "4");
    setTimeout(countdown, 2000, "3");
    setTimeout(countdown, 3000, "2");
    setTimeout(countdown, 4000, "1");
    
    setTimeout(reset, 4500);
    setTimeout(addEventListeners, 4500);
    human_turn = true;
}

function countdown(sec)
{
    document.getElementById("gameState").innerHTML = ("Restarting in : " + sec);
}

function loadingPattern(pattern)
{
    document.getElementById("gameState").innerHTML = pattern;
}

function AI()
{
    turn();
    if(ai_turn && counter >= 0)
    {
        if(counter === 2){
            var grid =  document.getElementById("grid" +randomEmptyGrid()).getElementsByClassName("content")[0];
            grid.innerHTML = _AI;
            grid.style.color = "white";
             console.log("Counter : " + counter);
        }else{
            updateGrid();
            console.log("Best move : "+ getBestMove());
            var grid = document.getElementById("grid" +getBestMove()).getElementsByClassName("content")[0];
            grid.innerHTML = _AI;
            grid.style.color = "white";
            updateGrid();
            if(winning(_AI)){
                document.getElementById("gameState").innerHTML = "You Lost!!";
                setTimeout(hardReset, 3000);
                return;
            }
        }
        counter++;
        updateGrid();
        if(counter === 9 && !winning(_AI) && !winning(_HUMAN)){
                document.getElementById("gameState").innerHTML = "It's a Draw";
                console.log("Its a draw, counter = " +counter);
                setTimeout(hardReset, 3000);
                return;
            }else{
                console.log("Counter : " + counter);
                document.getElementById("gameState").innerHTML = "Your Turn";
                human_turn = true;
            }
    }
}

function turn()
{
    if(human_turn === true){
        ai_turn = false;
    }else{
        ai_turn = true;
    }
}

function updateGrid()
{
    for(var i = 0; i < 9 ; i++ )
    {
        grid[i] = document.getElementById("grid"+i).getElementsByClassName("content")[0].innerHTML;
    }
}

function totalEmptyGrids(board)
{
    updateGrid();
    return board.filter(s => s != _HUMAN && s != _AI);
}

function randomEmptyGrid()
{
    var emptyGrids = [];
    for(var d = 0; d < 9; d++)
    {
        if(document.getElementById("grid" + d).getElementsByClassName("content")[0].innerHTML === "")
        {
            emptyGrids.push(d);
        }
    }
    var random = Math.floor(Math.random() * emptyGrids.length);
    var randomGrid = emptyGrids[random];
    return randomGrid;
}

function getEmptyGridsIndexes()
{
    availableSpots = new Array();
    console.log("Total Empty grid : "+ totalEmptyGrids(grid).length);
    for(var i = 0; i < 9; i++)
        {
            if(grid[i] == "")
                {availableSpots.push(i);}
        }
    console.log("Total empty index : " +availableSpots.length);
    for(var i = 0;i < availableSpots.length; i++)
        {
            console.log("Empty indexes : " +availableSpots[i] );
        }
}

function winning(player)
{
     if(
        (grid[0] == player && grid[1] == player && grid[2] == player) ||
        (grid[3] == player && grid[4] == player && grid[5] == player) ||
        (grid[6] == player && grid[7] == player && grid[8] == player) ||
        (grid[0] == player && grid[3] == player && grid[6] == player) ||
        (grid[1] == player && grid[4] == player && grid[7] == player) ||
        (grid[2] == player && grid[5] == player && grid[8] == player) ||
        (grid[0] == player && grid[4] == player && grid[8] == player) ||
        (grid[2] == player && grid[4] == player && grid[6] == player)
     ) {
         return true;
     } else {
         return false;
     }
}

/*main function for AI*/
function getBestMove()
{
    updateGrid();
    getEmptyGridsIndexes();
    var bestMove;
    var bestMoveFound = false;
    var bestMoveStillNotFound = true;
    console.log("Inside gestBestMove, availableSpots Length : " + availableSpots.length);
    
    /*check for AI win*/
    for(var i = 0; i < availableSpots.length; i++)
        {
            grid[availableSpots[i]] = _AI;
            
            if(winning(_AI)){
                console.log("inside best move if statement");
                bestMove = availableSpots[i];
                grid[availableSpots[i]] = "";/*reset your move*/
                bestMoveFound = true;
                break;
            }else{                
                grid[availableSpots[i]] = "";/*reset your move*/
            }
        }
    /*check for HUMAN win*/
    if(bestMoveFound === false)
        {
             //check for AI win
            for(var i = 0; i < availableSpots.length; i++)
                {
                    grid[availableSpots[i]] = _HUMAN;
                    if(winning(_HUMAN)){
                        bestMove = availableSpots[i];
                        grid[availableSpots[i]] = "";/*reset your move*/
                        bestMoveStillNotFound = false;
                        break;
                    }else{
                        grid[availableSpots[i]] = "";/*reset your move*/
                    }
                }
            
            if(bestMoveStillNotFound){
                    /*for(vari = 0; i < 100; i++)
                        {
                            console.log("Random : " + randomEmptyGrid());
                        }*/
                    bestMove = randomEmptyGrid();
                    console.log("Random move : " + bestMove);
            }
        }
    return bestMove;
}

function reset()
{
    counter = 0;
    human_turn = true;
    for (var i = 0; i < 9; i++)
    {
        document.getElementById("grid" + i).getElementsByClassName("content")[0].innerHTML = "";
        document.getElementById("grid" + i).getElementsByClassName("content")[0].style.color = "";
    }
    updateGrid();
    document.getElementById("gameState").innerHTML = "Your Turn";
    document.getElementById("start").style.display = "none";
}

