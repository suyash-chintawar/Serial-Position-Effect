var animalList = ["Tiger", "Lion", "Monkey", "Bear",
                "Fox", "Kangaroo", "Leopard", "Horse",
                "Dog", "Cat", "Zebra", "Rabbit",
                "Giraffe", "Deer","Cow","Goat",
                "Hamster","Donkey","Turtle","Camel"]
var targetList;


function startGame1() {
    window.location.href="game1.html";
}

function restartGame() {
    sessionStorage.removeItem("targetList");
    sessionStorage.removeItem("selectedList");
    window.location.href="index.html";
}

function startTime() {
	var today = new Date();
	var dd =today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	var hr = today.getHours();
	var min = today.getMinutes();
	var sec = today.getSeconds();
	hr= check(hr);
	min= check(min);
	sec= check(sec);
	dd= check(dd);
	mm= check(mm);
	document.getElementById("time").innerHTML = dd+'/'+mm+'/'+yyyy+"  "+hr+":"+min+":"+sec;
	var t=setTimeout(startTime, 1000);
}

function check(i) {
		if (i<10) i=("0"+i);
		return i;
}

function getList(idx) {
    animalList.sort(() => Math.random() - 0.5);
    if(idx==10) 
    {
        targetList = animalList.slice(0,10);
        sessionStorage.setItem("targetList", JSON.stringify(targetList));
    }
    else{
        targetList = JSON.parse(sessionStorage.getItem("targetList"));
    }
    for (let i = 0; i < idx; i++) {
        document.getElementById(i.toString()).innerHTML = animalList[i];
    }   
}

var remaining_time_game1 = 10;
function startCountdown1() {
    document.getElementById("countdown").innerHTML = "Remaining time: " + remaining_time_game1 + " seconds";
    remaining_time_game1--;
    var t=setTimeout(startCountdown1, 1000);
}

var remaining_time_game2 = 20;
function startCountdown2() {
    document.getElementById("countdown").innerHTML = "Remaining time: " + remaining_time_game2 + " seconds";
    remaining_time_game2--;
    var t=setTimeout(startCountdown2, 1000);
}

num_clicks = 0;
var selectedList = [];
function handleClick(id) {
    var selected = document.getElementById(id.toString());
    var color = window.getComputedStyle(selected).getPropertyValue("color");    
    
    if(color == "rgb(0, 0, 0)" && num_clicks<=9)
    {
        num_clicks++;
        document.getElementById(id).style.color = "green";
        document.getElementById(id).style.fontWeight = "bold";
        selectedList.push(selected.innerHTML);
        sessionStorage.setItem("selectedList", JSON.stringify(selectedList));
    }
    else if(color == "rgb(0, 128, 0)"){
        num_clicks--;
        document.getElementById(id).style.color = "black";
        document.getElementById(id).style.fontWeight = "normal";
        selectedList = selectedList.filter(e => e !== selected.innerHTML);
        sessionStorage.setItem("selectedList", JSON.stringify(selectedList));
    }
}


function getResult() {
    targetList = JSON.parse(sessionStorage.getItem("targetList"));
    selectedList = JSON.parse(sessionStorage.getItem("selectedList"));
    console.log(targetList);
    console.log(selectedList);

    var scoreStart = 0, scoreMid = 0, scoreEnd = 0, scoreTotal;

    if(selectedList==null)
    {
        document.getElementById("score").innerHTML = "Oops, you missed! Better luck next time. Play again!";
        return;
    }

    selectedList.forEach(item => {
        var i = targetList.indexOf(item);
        if(i!=-1)
        {
            if(i<=2) scoreStart++;
            else if(i>=7) scoreEnd++;
            else scoreMid++;
        }
    });
    scoreTotal = scoreMid + scoreStart + scoreEnd;
    if(scoreTotal==0)
    {
        document.getElementById("score").innerHTML = "Oops, you missed! Better luck next time. Play again!";
        return;
    }
    document.getElementById("score").innerHTML = "You identified " + scoreTotal + "/10 animals correctly!";
    document.getElementById("recallStart").innerHTML = "Recall(%) of beginning of list: " + scoreStart*100/3 + "%";
    document.getElementById("recallMid").innerHTML = "Recall(%) of middle of list: " + scoreMid*100/4 + "%";
    document.getElementById("recallEnd").innerHTML = "Recall(%) of end of list: " + scoreEnd*100/3 + "%";

    var a = scoreStart*100/3;
    var c = scoreEnd*100/3;
    var b = scoreMid*100/4;
    if(a>=c)
    {
        if(a>=b) document.getElementById("analysis").innerHTML = "You tend to remember words at the start of the list!";
        else document.getElementById("analysis").innerHTML = "You tend to remember words at the middle of the list!";
    }
    else{
        if(c>=b) document.getElementById("analysis").innerHTML = "You tend to remember words at the end of the list!";
        else document.getElementById("analysis").innerHTML = "You tend to remember words at the middle of the list!";
    }
        
}





    

