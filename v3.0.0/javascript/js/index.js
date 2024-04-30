window.addEventListener("load",function(){

    const adX=document.querySelector("#ad-x");
    const xalX=document.querySelector("#xal-x");
    const adO=document.querySelector("#ad-o");
    const xalO=document.querySelector("#xal-o");
    const say=document.querySelector("#say");
    const oyun=document.querySelectorAll("#oyun div");

    if(!localStorage.getItem("adx") && !localStorage.getItem("ado")){
        localStorage.setItem("adx",prompt("X oyuncusu adini yazsin"));
        localStorage.setItem("ado",prompt("O oyuncusu adini yazsin"));
    }

    adX.innerText=localStorage.getItem("adx");
    adO.innerText=localStorage.getItem("ado");

    if(!localStorage.getItem("xalx") && !localStorage.getItem("xalo")){
        localStorage.setItem("xalx",0);
        localStorage.setItem("xalo",0);
    }
    
    if(!localStorage.getItem("say")){
        localStorage.setItem("say",1);
    }else{
        let i=parseInt(localStorage.getItem("say"))+1;
        localStorage.setItem("say",i);
    }

    adX.innerText=localStorage.getItem("adx");
    adO.innerText=localStorage.getItem("ado");

    xalX.innerText=localStorage.getItem("xalx");
    xalO.innerText=localStorage.getItem("xalo");
    say.innerText=localStorage.getItem("say");

    const x='<img src="./img/x.png">';
    const o='<img src="./img/o.png">';
    let pnt=x;
    let status=true;

    const udus=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];


    for(let i=0;i<oyun.length;i++){
        oyun[i].addEventListener("click",function(){
            if(status){
                if(oyun[i].innerHTML==""){
                    Yaz(oyun[i]);
                    Yoxla();
                    Bos();
                }else{
                    alert("zehmet olmasa bos damaya yazin");
                }
            }else{
                window.open("index.html","_parent");
            }
        });
    }

    function Yaz(dom){

        dom.innerHTML=pnt;

        pnt=(pnt==x)?o:x;
    }

    function Yoxla(){
        for(let i=0;i<udus.length;i++){
            let a=oyun[udus[i][0]].innerHTML;
            let b=oyun[udus[i][1]].innerHTML;
            let c=oyun[udus[i][2]].innerHTML;

            if(a!="" && b!="" && c!=""){
                if(a==b && b==c){
                    status=false;
                    
                    if(pnt==x){
                        xalO.innerText=parseInt(xalO.innerText)+1;
                        localStorage.setItem("xalo",xalO.innerText);
                        alert(`Oyunu ${adO.innerText} qazandi`);
                    }else{
                        xalX.innerText=parseInt(xalX.innerText)+1;
                        localStorage.setItem("xalx",xalX.innerText);
                        alert(`Oyunu ${adX.innerText} qazandi`);
                    }

                }
            }

        }
    }

    function Bos(){

        if(status){
            let bosSay=oyun.length;

            for(let i=0;i<oyun.length;i++){
                if(oyun[i].innerHTML!=""){
                    bosSay--;
                }
            }

            if(bosSay<=0){
                status=false;
                alert("Oyun Hec-Hec-e bitdi kimse qalib olmadi");
            }
        }

    }

});