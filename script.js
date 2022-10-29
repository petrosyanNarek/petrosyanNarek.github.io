class LotoCards{
    constructor(number){
        this.number = number;
        this.matrix = [];
        this.obj = {
            0:[],
            1:[],
            2:[]
        }
    }
    creatMatrix(){
        for(let i = 0; i < 3; i++){
            this.matrix[i] = [];
            for (let j = 0 ; j < 9; j++) {
                this.matrix[i][j] = "";
            }
        }
    }
    randomNumPosition(rN){

        const randomArr = [];
        let syun = Math.floor(rN/10)
        if(rN == 90){
            syun -= 1;
        }
        randomArr.push(syun,rN);

        return randomArr;
    }
    writeMatrix(line,rMatInfo,matrix,index,object,table){

        if(matrix[line][rMatInfo[0]] === ""){
            if(object[line].length < 5){
                matrix[line][rMatInfo[0]] = rMatInfo[1];
                index++
                table[line][rMatInfo[0]].childNodes[0].childNodes[0].innerHTML = rMatInfo[1];
                table[line][rMatInfo[0]].classList.add("myNums");
                object[line].push(rMatInfo[1]);
            }else{
                object[line].length = 5;
            }
        }
        return index;
    }
    write(){
  
        let myTable = Array.from(document.getElementsByClassName("myTr"));
        myTable[0] = Array.from(document.getElementsByClassName("td0"));
        myTable[1] = Array.from(document.getElementsByClassName("td1"));
        myTable[2] = Array.from(document.getElementsByClassName("td2"));

        let i = 0;
        let rF;
        this.creatMatrix();
        let k = 0;
        let temp = 0;
        while(i < 15){ 
            if(this.obj[k].length === 5){
                k++;
            }
            rF = this.randomNumPosition(this.number[temp]);
            i = this.writeMatrix(k,rF,this.matrix,i,this.obj,myTable);
            temp ++;

        }
    }
}


let obectLoto = new LotoCards(RandomNumGen());
obectLoto.write();


function RandomNumGen(){
    let lotoNum = [];
    function retArrN(){
        let arr = [];
        for(let i = 1; i <= 90; i++){
            arr.push(i);
        }
        return arr;
    }
    function getRandomN(arr){
        let randomNum = Math.floor((Math.random()*arr.length));
        randomNum = Number(arr.splice(randomNum,1));
        lotoNum.push(randomNum);
        return randomNum;
    }
    let x = retArrN();
    for(let i = 0; i < 90; i++){
        getRandomN(x);
    }
    return lotoNum;
}


let arr = RandomNumGen();
let lotoAudio =  document.createElement("audio");
lotoAudio.src = "audio.mp3";
let il = 0;
let myInterval = setInterval(function getMynum(){
    let myRnum = document.getElementById("myRnum");
    let finish = document.getElementById("finish");
        myRnum.innerHTML = arr[il];
        lotoAudio.play();

        if(il === 89){
            clearInterval(myInterval);
            myRnum.innerHTML = "";
            finish.innerHTML = "Finish Numbers";
            lotoAudio.pause();
        }

        if(obectLoto.obj[0].length == 0 || obectLoto.obj[1].length == 0 || obectLoto.obj[2].length == 0){
            clearInterval(myInterval);
            myRnum.innerHTML = "";
            finish.innerHTML = "You Won";
            lotoAudio.pause();
        }
        il++
}, 3000)

let myNums = document.getElementsByClassName("myNums");
let myRnum = document.getElementById("myRnum");

for(let i = 0; i < myNums.length; i++){
    myNums[i].onclick = function(){
        if(this.childNodes[0].childNodes[0].innerText === myRnum.innerText){
            this.childNodes[0].classList.add("myTd");
            obectLoto.obj[+this.classList[0].split("")[2]].pop();
        }
    };
}


