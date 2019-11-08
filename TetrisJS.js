var box=document.getElementById("window");
w=box.width;
h=box.height;
var ctx=box.getContext("2d");
var pos={x:140,y:0};
var score=0;
var s=[
    [0,1,1],
    [1,1,0],
    [0,0,0]
];
const ms=[
    [1,1,0],
    [0,1,1],
    [0,0,0]
];
const t=[
    [0,0,0],
    [1,1,1],
    [0,1,0]
];
const l=[
    [0,1,0],
    [0,1,0],
    [0,1,1]
];
const ml=[
    [0,1,0],
    [0,1,0],
    [1,1,0]
];
const sq=[
    [0,0,0],
    [1,1,0],
    [1,1,0]
];
const rod=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,1]
];
const rodRotate=[
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0]
]
const board=[];
for(var i=0;i<h/10;i++)
    board.push(new Array(w/10).fill(0));
var dir="down";
document.addEventListener("keydown",dirInput);
function dirInput(event)
{
    if((event.keyCode==65 || event.keyCode==37) && dir!="right")
        dir="left";
    else if((event.keyCode==68 || event.keyCode==39) && dir!="left")
        dir="right";
    else if((event.keyCode==32 || event.keyCode==96) && block!=sq)
    {
        if(block==rod)
            block=rodRotate;
        else if(block==rodRotate)
            block=rod;
        else
            dir="rotate";
    }
}
function down()
{
    pos.y+=10;
}
function left(block)
{
    var colVal=-1;
    for(var j=0;j<block.length;j++)
    {
        for(var i=0;i<block[j].length;i++)
        {
            if(block[i][j])
            {
                colVal=j;
                break;
            }
        }
        if(colVal!=-1)
            break;
    }
    if(pos.x+colVal*10>0)
        pos.x-=10;
}
function right(block)
{
    var colVal=-1;
    for(var j=block.length-1;j>=0;j--)
    {
        for(var i=0;i<block[j].length;i++)
        {
            if(block[i][j])
            {
                colVal=j;
                break;
            }
        }
        if(colVal!=-1)
            break;
    }
    if(pos.x+colVal*10<=280)
        pos.x+=10;
}
function up()
{
    pos.y-=10;
}
function newBlock()
{
    var choice=Math.floor(Math.random()*1000)%7;
    switch(choice)
    {
        case 0:block=s;
                break;
        case 1:block=ms;
                break;
        case 2:block=t;
                break;
        case 3:block=l;
                break;
        case 4:block=ml;
                break;
        case 5:block=sq;
                break;
        case 6:block=rod;
                break;
    }
}
function mergeBoard(block)
{
    var colour=0;
    switch(block)
    {
        case s:colour=1;
                break;
        case ms:colour=2;
                break;
        case t:colour=3;
                break;
        case l:colour=4;
                break;
        case ml:colour=5;
                break;
        case sq:colour=6;
                break;
        case rod:colour=7;
                break;
        case rodRotate:colour=7
                        break;
    };
    for(var i=0;i<block.length;i++)
        for(var j=0;j<block[i].length;j++)
        {
            if(block[i][j])
                board[pos.y/10+i][pos.x/10+j]=colour;
        }
}
function checkRow()
{
    var rowFill;
    for(var i=0;i<h/10;i++)
    {
        rowFill=true;
        for(var j=0;j<w/10;j++)
        {
            if(board[i][j]==0)
            {
                rowFill=false;
                break;
            }
        }
        
        if(rowFill)
        {
            board.splice(i,1);
            score+=10;
            board.unshift(new Array(w/10).fill(0));
            checkRow();
            break;
        }
    }
}
function checkGame()
{
    for(var i=0;i<3;i++)
        for(var j=0;j<w/10;j++)
        {
            if(board[i][j])
            {
                if(!alert("Game Over\nScore:"+score))  
                    location.reload();
            }
        }
}
function drawBoard()
{
    for(var i=0;i<h/10;i++)
        for(var j=0;j<w/10;j++)
        {
            if(board[i][j])
            {
                switch(board[i][j])
                {
                    case 0:ctx.fillStyle="#1C0F13";
                            break;
                    case 1:ctx.fillStyle="green";
                            break;
                    case 2:ctx.fillStyle="#D6F599";
                            break;
                    case 3:ctx.fillStyle="red";
                            break;
                    case 4:ctx.fillStyle="yellow";
                            break;
                    case 5:ctx.fillStyle="pink";
                            break;
                    case 6:ctx.fillStyle="blue";
                            break;
                    case 7:ctx.fillStyle="#CCC9E7";
                            break;
                };
                ctx.strokeRect(j*10,i*10,10,10);
                ctx.fillRect(j*10,i*10,10,10);
            }
        }
    checkRow();
    checkGame();
}
function chkBottom()
{
    var colVal=-1;
    for(var i=block.length-1;i>=0;i--)
    {
        for(var j=0;j<block[i].length;j++)
        {
            if(block[i][j])
            {
                colVal=i;
                break;
            }
        }
        if(colVal!=-1)
            break;
    }
    return colVal;
}
function rotateBlock()
{
    var N=block.length;
    for (var i = 0; i < N / 2; i++) 
    { 
        for (var j = i; j < N-i-1; j++) 
        { 
            var temp = block[i][j]; 
            block[i][j] = block[j][N-1-i]; 
            block[j][N-1-i] = block[N-1-i][N-1-j]; 
            block[N-1-i][N-1-j] = block[N-1-j][i]; 
            block[N-1-j][i] = temp; 
        } 
    }
}
function drawShape(block,pos)
{
    drawBoard();
    for(var i=0;i<block.length;i++)
        for(var j=0;j<block[i].length;j++)
        {
            if(block[i][j] && !board[pos.y/10+i][pos.x/10+j])
            {
                ctx.strokeRect(pos.x+j*10,pos.y+i*10,10,10);
                ctx.fillRect(pos.x+j*10,pos.y+i*10,10,10);
            }
            else if((block[i][j] && board[pos.y/10+i][pos.x/10+j]) || pos.y+chkBottom()*10>490)
            {
                pos.y-=10;
                mergeBoard(block);
                pos.x=150;
                pos.y=0;
                newBlock();
                return;
            }
        }
    switch(block)
    {
        case s:ctx.fillStyle="green";
                break;
        case ms:ctx.fillStyle="#D6F599";
                break;
        case t:ctx.fillStyle="red";
                break;
        case l:ctx.fillStyle="yellow";
                break;
        case ml:ctx.fillStyle="pink";
                break;
        case sq:ctx.fillStyle="blue";
                break;
        case rod:ctx.fillStyle="#CCC9E7";
                break;
    };
    for(var i=0;i<block.length;i++)
        for(var j=0;j<block[i].length;j++)
        {
            if(block[i][j])
            {
                ctx.strokeRect(pos.x+j*10,pos.y+i*10,10,10);
                ctx.fillRect(pos.x+j*10,pos.y+i*10,10,10);
            }
        }
    down();
}
function play()
{
    
    ctx.clearRect(0,0,w,h);
    if(dir=="left")
    {
        left(block);
        dir="down";
    }
    else if(dir=="right")
    {
        right(block);
        dir="down";
    }
    else if(dir=="rotate")
    {
        rotateBlock();
        dir="down";
    }
    drawShape(block,pos);
}
newBlock();
setInterval(play,75);
