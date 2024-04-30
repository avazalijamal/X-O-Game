window.addEventListener("load",function(){

    //domlar
    const user1=document.querySelector("#user1");
    const user2=document.querySelector("#user2");
    const score1=document.querySelector("#score1");
    const score2=document.querySelector("#score2");
    const timer=document.querySelector("#timer");
    const _X=document.querySelector("#x");
    const _O=document.querySelector("#o");
    const gameObj=document.querySelectorAll("#game div");

    //deyisenler
    var T=5;
    var start="o";
    var status=true;
    var interval;
    const x='<img src="./img/x.png">';
    const o='<img src="./img/o.png">';

    const wins=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    //adlari daxil et

    user1.innerText="user-1";//prompt("1-ci Oyuncunun adini yazin");
    user2.innerText="user-2";//prompt("2-ci Oyuncunun adini yazin");
    score1.innerText=0;
    score2.innerText=0;
    timer.innerText=T;



    //RUN
    gamerPointer();
    Start();


    //gamer pointer

    function gamerPointer(){
        for(let i=0;i<gameObj.length;i++){

        gameObj[i].addEventListener("mouseover",function(){
            if(gameObj[i].innerHTML=="" && status){
                gameObj[i].style.backgroundImage=`url(${Pointer()})`;
                // gameObj[i].style.cursor="pointer";
            }else{
                gameObj[i].style.cursor="no-drop";
            }
        });

        gameObj[i].addEventListener("mouseout",function(){

            gameObj[i].style.backgroundImage="none";
        });

        }
    }

    //pointer icon
    function Pointer(){
        return (start=="x")?"./img/x.png":"./img/o.png";
    }
    //start Game

    function Start(){

        changeGamer();

        if(!status){

            for(let i=0;i<gameObj.length;i++){
                gameObj[i].innerHTML="";
            }
            status=true;

        }else{
        //xanlara click etme bolumu

        for(let i=0;i<gameObj.length;i++){

            gameObj[i].innerHTML="";

            gameObj[i].addEventListener("click",function(){

                if(status){

                   if(gameObj[i].innerHTML==""){
                        Yaz(gameObj[i]);
                        oyunBitib();
                        controlGame();

                   }else{
                       alert("Xahis edirik bos xana secin");
                   }

                }else{
    let s=window.confirm("Oyun bitib yenidən oynamaq isdeyirsinizmi?");

                    if(s){
                        Start();
                    } 

                }


            });

         }
        }

    }



//yazmaq funksiyasi

function Yaz(dom){
    if(start=="x"){
        dom.innerHTML=x;
        // start="o";
    }else{
        dom.innerHTML=o;
        // start="x";
    }

    changeGamer();
    
}

//oyun bitib?

function oyunBitib(){


    for(let i=0;i<wins.length;i++){


        let a=gameObj[wins[i][0]].innerHTML;
        let b=gameObj[wins[i][1]].innerHTML;
        let c=gameObj[wins[i][2]].innerHTML;

        if(a!="" && b!="" && c!=""){
            if(a==b && b==c){
                stopTimer();
                status=false;
                Winner();
                removeGamer();
            }
        }

    }

}

//qalibi tap


function Winner(){
    if(start=="x"){
        score2.innerText=parseInt(score2.innerText)+1;
    }else{
        score1.innerText=parseInt(score1.innerText)+1;
    }
}

//control box

function controlGame(){
    let say=gameObj.length;

    for(let i=0;i<gameObj.length;i++){
        if(gameObj[i].innerHTML!=""){
            say--;
        }
    }

    if(say<=0){
        status=false;
        stopTimer();
        removeGamer();
    }

}

//remove gamer
function removeGamer(){
    _X.classList.remove("selected");
    _O.classList.remove("selected");
}
//change gamer
function changeGamer(){
    if(start=="x"){
        start="o";
        _X.classList.remove("selected");
        _O.classList.add("selected");
    }else{
        start="x";
        _O.classList.remove("selected");
        _X.classList.add("selected");
    }
    startTimer();
}

//start Timer

function startTimer(){

    let t=T;
    timer.innerText=t;

    stopTimer();

    interval=window.setInterval(function(){

        if(t>0){
            t--;
            timer.innerText=t;
        }else{
            stopTimer();
            changeGamer();
        }

    },1000);

}

//stop timer

function stopTimer(){
    window.clearInterval(interval);
}

});

