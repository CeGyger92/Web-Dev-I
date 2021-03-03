var atnScrn = document.getElementById("attendaceScreen");
var cnstScrn = document.getElementById("contestantScreen");
var raceScrn = document.getElementById("raceScreen");
var winScrn = document.getElementById("winnerScreen");

var pickBtn = document.getElementById("pickCon");
pickBtn.addEventListener("click", selectContestants);

var raceBtn = document.getElementById("race");
raceBtn.addEventListener("click", beginRace);

var cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", startOver);

var images = [];
var namePlates = [];
if (localStorage.names != null) {
    document.getElementById("contestantBox").value = localStorage.names;
}
function selectContestants() {
    var contestantCount = 0;
    var contestants = document.getElementById("contestantBox").value;
    localStorage.names = contestants;
    contestants = contestants.split("\n");
    //remove duplicates
    var tempArray = [];
    for (var i = 0; i < contestants.length; i++)
    {
        if (tempArray.includes(contestants[i]) == false)
        {
            tempArray.push(contestants[i]);
        }
    }
    contestants = tempArray;

    for (var i = 0; i < contestants.length; i++)
    {
        if (contestants[i] != "")
        {
            contestantCount++;
        }
    }

   
    if (contestantCount < 5) {
        window.alert("Please enter at least 5 unique names");
    } else {
        var raceParticipants = [];
        while (raceParticipants.length != 5) {
            var rndIndex;
            rndIndex = Math.floor(Math.random() * contestantCount);
            if (contestants[rndIndex] != "" && raceParticipants.includes(contestants[rndIndex]) == false) {
                raceParticipants.push(contestants[rndIndex]);
            }
        }

        showParticipants(raceParticipants);

        //for (var i = 0; i < raceParticipants.length; i++) {
        //    console.log(raceParticipants[i]);
        //}
    }
}


function showParticipants(raceParticipants)
{
    
    namePlates.push(document.getElementById("falconRacer"));
    namePlates.push(document.getElementById("tieRacer"));
    namePlates.push(document.getElementById("speedRacer"));
    namePlates.push(document.getElementById("slaveRacer"));
    namePlates.push(document.getElementById("wingRacer"));

    for (var i = 0; i < 5; i++)
    {
        namePlates[i].innerHTML = raceParticipants[i];
    }

    atnScrn.style.display = "none";
    cnstScrn.style.display = "block";
}

function startOver()
{
    atnScrn.style.display = "block";
    cnstScrn.style.display = "none";
}

function beginRace()
{
    atnScrn.style.display = "none";
    cnstScrn.style.display = "none";
    raceScrn.style.display = "block";
    
    var sWCrawl = document.getElementById('SWT');
    sWCrawl.play();
    setTimeout(function () {
        var countdown = document.getElementById("countdown");
        countdown.innerHTML = "GO!"
        animateRacers();
    }, 2200);


}


function animateRacers()
{
    var increment = 3.25;
	var rand = 1 + Math.random();
    var winnerIndex;
    images.push(document.getElementById("falcon"));
    images.push(document.getElementById("tie"));
    images.push(document.getElementById("speeder"));
    images.push(document.getElementById("slave"));
    images.push(document.getElementById("wing"));
    var playerKilled = false;
    var jumpedToHyperSpace = false;
    var moveImages = setInterval(function () {

        for (var i = 0; i < images.length; i++) {
            
            var left = parseFloat(images[i].style.left);

            if ((left + images[i].width) >= (document.body.clientWidth / 4) && playerKilled != true)
            {
                killPlayer();
                playerKilled = true;
            }

            if ((left + images[i].width) >= (document.body.clientWidth / 3) && jumpedToHyperSpace != true) {
                var hyper = document.getElementById("hyper");
                hyper.play();
                setTimeout(function () { increment *= 6; }, 8000);
                var removeKiller = setInterval(function () {
                    var top = parseFloat(vader.style.top);
                    if (top == -300) {
                        clearInterval(removeKiller);
                    } else {
                        vader.style.top = (top - 2) + "px";
                    }
                }, 1);
                jumpedToHyperSpace = true;
            }

            if (left + images[i].width >= document.body.clientWidth) {
                clearInterval(moveImages);
                winnerIndex = i;
                setTimeout(function () {
                    showWinner(winnerIndex);
                }, 2000);
            } else {
                images[i].style.left = left + (Math.random() * rand * increment ) + "px";

            }

        }

    }, 25);

}

function showWinner(i)
{
    var winnerImg = document.getElementById("winnerImg");
    winnerImg.src = images[i].src;
    var winnerId = document.getElementById("winnerId");
    winnerId.innerHTML = namePlates[i].innerHTML;


    atnScrn.style.display = "none";
    cnstScrn.style.display = "none";
    raceScrn.style.display = "none";
    winScrn.style.display = "block";

    
}


function killPlayer()
{
    var vader = document.getElementById("vader");

    

    var moveVader = setInterval(function () {


        
        var top = parseFloat(vader.style.top);
        if (top == 300) {
            clearInterval(moveVader);
           
            var shoot = document.getElementById("shoot");
            shoot.loop = false;
            shoot.play();
            setTimeout(function () {
                var playerToKill = Math.floor(Math.random() * 5);
                var boom = document.getElementById("boom");
                var pow = document.getElementById("pow");
                boom.style.left = images[playerToKill].style.left;
                boom.style.top = images[playerToKill].style.top;
                images[playerToKill].style.visibility= "hidden";
                boom.style.display = "block";
                boom.play();
                pow.play();
                images[playerToKill].style.left = "0px";
                setTimeout(function () { boom.style.display = "none"; }, 1000);


            }, 1500)
        } else {
            vader.style.top = top + 2 + "px";
        }

    }, 1)

    
   
}