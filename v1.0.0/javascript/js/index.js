window.addEventListener("load",function(){

    //domlar
    const user1=document.querySelector("#user1");
    const score1=document.querySelector("#score1");
    const user2=document.querySelector("#user2");
    const score2=document.querySelector("#score2");
    const time=document.querySelector("#time");
    const _X=document.querySelector("#x");
    const _O=document.querySelector("#o");
    const gameObj=document.querySelectorAll("#game div");
    //deyisenler
    var T=10;
    var interval;
    var start;
    var status=true;
    const x="<img src='./img/x.png'>";
    const o="<img src='./img/o.png'>";
    const wins=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    //ad ve xalin teyini
    user1.innerText=prompt("1-ci istifadəçinin adını yazın")+" (X)";
    user2.innerText="(O) "+prompt("2-ci istifadəçinin adını yazın");
    score1.innerText=0;
    score2.innerText=0;

    gamerPounter();
    Start();


    //gamer pointeri
    function gamerPounter(){
        
        for(let i=0;i<gameObj.length;i++){

            gameObj[i].addEventListener('mouseover',function(){
                if(gameObj[i].innerHTML=="" && status){
                    gameObj[i].style.backgroundImage=`url(${Ponter()})`;
                }
            });

            gameObj[i].addEventListener('mouseout',function(){
                gameObj[i].style.backgroundImage="none";
            });

        }

    }
    //ponter icon
    function Ponter(){
        return (start=="x")?"./img/x.png":"./img/o.png";
    }

    //start game
    function Start(){

            status=true;
            // startTimer();
            changeGamer();
            //xanlara click etmek

            for(let i=0;i<gameObj.length;i++){

                //game objectlerin icerisini bosaldir
                gameObj[i].innerHTML="";
        
                gameObj[i].addEventListener("click",function(){
        
                    if(status){
        
                        if(gameObj[i].innerHTML==""){
        
                            Yaz(gameObj[i]);
                            oyunBitib();
                            controlGame();
        
                        }else{
                            alert("Xahiş edirik boş olan bir xana seçin");
                        }
        
                    }else{
                        let s=window.confirm("Oyun bitib yenidən oynamaq isdeyirsinizmi?");
                        if(s){
                            restartGame();
                        }
                    }
        
                });
        
            }
    }

    //xananin icerisine deyer yazan

    function Yaz(dom){

        if(start=="x"){
            dom.innerHTML=x;
        }else{
            dom.innerHTML=o;
        }

        changeGamer();

    }

    //qalibi tapan

    function oyunBitib(){
        for(let i=0;i<wins.length;i++){

            let a=gameObj[wins[i][0]].innerHTML;
            let b=gameObj[wins[i][1]].innerHTML;
            let c=gameObj[wins[i][2]].innerHTML;

            if(a!="" && b!="" && c!=""){
                if(a==b && a==c && b==c){
                    stopTimer();
                    status=false;
                    Winner();
                }
            }

        }
    }

    //qalibi tapan

    function Winner(){

        if(start=="x"){
            score2.innerText=parseInt(score2.innerText)+1;
        }else{
            score1.innerText=parseInt(score1.innerText)+1;
        }
    }

    //restart game
    function restartGame(){

        status=true;
        
        for(let i=0;i<gameObj.length;i++){
            gameObj[i].innerHTML="";
        }
        
        startTimer();
    }

    //control game

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
        }

    }

//timer

function startTimer(){
    
    
    t=T;

    time.innerText=t;
    
    window.clearInterval(interval);

    interval=window.setInterval(function(){

            if(t>0){
                t--;
                time.innerText=t;
            }else{
                window.clearInterval(interval);
                changeGamer();
            }

    },1000);
}

//stop timer
function stopTimer(){
    window.clearInterval(interval);
}


//oyuncu deyis

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



});