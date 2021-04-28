//canvas declare
var cMotion=document.getElementById("motion").getContext("2d");
var cInf=document.getElementById("infectionOutline").getContext("2d");
var cStats=document.getElementById("statistics").getContext("2d");
var cBack=document.getElementById("background").getContext("2d");

//variable and default settings
var population=1000, initialInfection=1, infectionRadius=10, infectionP=0.2;
var centralCity=0, patientIsolation=0, isolationSpeed=5, socialDistance=0, citysetting=0, urban=0, gamemode=0;
var motionCounter=1, time=0, infectionRecord=[], distanceRecord=[], intercityPopulation=0, quarantineCounter=-140, currentcentral=0, gameSettings=96, finalScore=0;

function disableButton() {
	document.getElementById("locationFrequency").disabled=true;
	document.getElementById("isolationSpeed").disabled=true;
	document.getElementById("asymptomatic").disabled=true;
	document.getElementById("intercitymovement").disabled=true;
	document.getElementById("centralCity").disabled=true;
}

//reaction to input
//checkbox
function isolation() {
	if (document.getElementById("isolation").checked==true) {
		document.getElementById("isolationSpeed").disabled=false;
		document.getElementById("asymptomatic").disabled=false;
		document.getElementById("isolationSpeed").classList.remove("hide");
		document.getElementById("isolationSpeed1").classList.remove("hide");
		document.getElementById("isolationSpeed2").classList.remove("hide");
		document.getElementById("asymptomatic").classList.remove("hide");
		document.getElementById("asymptomatic1").classList.remove("hide");
		document.getElementById("asymptomatic2").classList.remove("hide");

	} else {
		document.getElementById("isolationSpeed").disabled=true;
		document.getElementById("asymptomatic").disabled=true;
		document.getElementById("isolationSpeed").classList.add("hide");
		document.getElementById("isolationSpeed1").classList.add("hide");
		document.getElementById("isolationSpeed2").classList.add("hide");
		document.getElementById("asymptomatic").classList.add("hide");
		document.getElementById("asymptomatic1").classList.add("hide");
		document.getElementById("asymptomatic2").classList.add("hide");
	}
}

function centerMarket() {
	if (document.getElementById("centralLocation").checked==true) {
		document.getElementById("locationFrequency").disabled=false;
		document.getElementById("locationFrequency").classList.remove("hide");
		document.getElementById("locationFrequency1").classList.remove("hide");
		document.getElementById("locationFrequency2").classList.remove("hide");
	} else {;
		document.getElementById("locationFrequency").disabled=true;
		document.getElementById("locationFrequency").classList.add("hide");
		document.getElementById("locationFrequency1").classList.add("hide");
		document.getElementById("locationFrequency2").classList.add("hide");
	}
}

function city() {
	if (document.getElementById("city").checked==true) {
		document.getElementById("centralCity").disabled=false;
		document.getElementById("intercitymovement").disabled=false;
		document.getElementById("cityCentral").classList.remove("hide");
		document.getElementById("cityCentral").classList.add("show");
		document.getElementById("cityCentral1").classList.remove("hide");
		document.getElementById("cityCentral1").classList.add("show");
		document.getElementById("intercitymovement").classList.remove("hide");
		document.getElementById("intercitymovement1").classList.remove("hide");
		document.getElementById("intercitymovement2").classList.remove("hide");
	} else {
		document.getElementById("centralCity").disabled=true;
		document.getElementById("intercitymovement").disabled=true;
		document.getElementById("cityCentral").classList.add("hide");
		document.getElementById("cityCentral").classList.remove("show");
		document.getElementById("cityCentral1").classList.add("hide");
		document.getElementById("cityCentral1").classList.remove("show");
		document.getElementById("intercitymovement").classList.add("hide");
		document.getElementById("intercitymovement1").classList.add("hide");
		document.getElementById("intercitymovement2").classList.add("hide");
	}
}

//range slider
function rangeSliderCheck() {
	infectionP=document.getElementById("infectionP").value/10
	infectionRadius=document.getElementById("infectionRadius").value*5
	isolationSpeed=document.getElementById("isolationSpeed").value
}

//keyboard
window.onkeydown=function(e) {
	if (e.keyCode==32) {
		motionCounter=motionCounter*-1;
		if (motionCounter==1) {repeat()}
	}
}

//outline of the settings
function panelOutline() {
	cBack.lineWidth=4;
	cBack.fillStyle="#16171D"
	cBack.strokeStyle="#C0C0C0"
	cBack.beginPath();
	cBack.rect(1310,72,200,648)
	cBack.fill()
	cBack.stroke()
}

//main panel settings and functions
function start() {
	document.getElementById("gamemode").style.display="none";
	document.getElementById("start").style.display="none";
	document.getElementById("default").style.display="none";
	document.getElementById("box").style.display="none";
	document.getElementById("instructions").style.display="none";
	if (document.getElementById("initialPopulation").value>2500) {document.getElementById("initialPopulation").value=2500}
	if (document.getElementById("initialPopulation").value<1) {document.getElementById("initialPopulation").value=1}
	if (document.getElementById("infectedPopulation").value>10) {document.getElementById("infectedPopulation").value=10}
	if (document.getElementById("infectedPopulation").value<1) {document.getElementById("infectedPopulation").value=1}
	document.getElementById("initialPopulation").value=Math.floor(document.getElementById("initialPopulation").value)
	document.getElementById("infectedPopulation").value=Math.floor(document.getElementById("infectedPopulation").value)
	//motion
	cBack.lineWidth=4;
	cBack.strokeStyle="#EC4444"
	cBack.beginPath();
	cBack.rect(680,498,220,220);
	cBack.stroke();
	cBack.lineWidth=1;
	//stats
	cBack.strokeStyle="#FFFFFF";
	cBack.lineWidth=3;
	cBack.beginPath();
	cBack.moveTo(700,70);
	cBack.lineTo(700,450);
	cBack.stroke();
	cBack.moveTo(680,431);
	cBack.lineTo(1300,431);
	cBack.stroke();
	cBack.lineWidth=1.5;
	cBack.beginPath();
	for (var i=0; i<10; i++) {
		cBack.moveTo(690,36*i+70);
		cBack.lineTo(710,36*i+70);
	}
	cBack.stroke();
	//info
	cBack.strokeStyle="#FFFFFF";
	cBack.lineWidth=4;
	cBack.beginPath();
	cBack.rect(910,497,388,222);
	cBack.stroke();
	population=document.getElementById("initialPopulation").value;
	initialInfection=document.getElementById("infectedPopulation").value;
	infectionP=document.getElementById("infectionP").value/10;
	infectionRadius=document.getElementById("infectionRadius").value*5;
	if (document.getElementById("centralLocation").checked==true) {centralCity=1} else {centralCity=0};
	if (document.getElementById("isolation").checked==true) {patientIsolation=1} else {patientIsolation=0};
	if (document.getElementById("socialDistance").checked==true) {socialDistance=1} else {socialDistance=0};
	if (document.getElementById("city").checked==true) {citysetting=1} else {citysetting=0};
	if (document.getElementById("centralCity").checked==true) {urban=1} else {urban=0};
	particlePositionX=[];
	particlePositionY=[];
	particleMotionX=[];
	particleMotionY=[];
	particleSIR=[];
	particleILifeSpan=[];
	particleAnimation=[];
	particleCentralLocation=[];
	particleMemoryX=[];
	particleMemoryY=[];
	particleIsolation=[];
	particleCityX=[];
	particleCityY=[];
	particleInterCity=[];
	cBack.strokeStyle="#FFFFFF";
	cBack.lineWidth=4;
	cBack.beginPath();
	if (citysetting==0) {
		for (var i=0; i<population; i++) {
			particlePositionX[i]=Math.random()*600+25;
			particlePositionY[i]=Math.random()*600+25;
		}
		cBack.rect(22,72,646,646);
	} 
	if (citysetting==1) {
		for (var i=0; i<population; i++) {
			if (urban==0) {
				particleCityX[i]=Math.floor(Math.random()*3)
				particleCityY[i]=Math.floor(Math.random()*3)
			} 
			if (urban==1) {
				particleCityX[i]=Math.floor(Math.random()*4)
				if (particleCityX[i]==3) {particleCityX[i]=1}
				particleCityY[i]=Math.floor(Math.random()*4)
				if (particleCityY[i]==3) {particleCityY[i]=1}
			}
			particlePositionX[i]=Math.random()*190+10;
			particlePositionY[i]=Math.random()*190+10;
		}
		for (var i=0; i<3; i++) {
			for (var j=0; j<3; j++) {
				cBack.rect(22+220*i,72+220*j,206,206)
			}
		}
	}
	cBack.stroke();
	for (var i=0; i<population; i++) {
		particleCentralLocation[i]=0;
		particleIsolation[i]=0;
		particleMotionX[i]=Math.random()*4-2;
		particleMotionY[i]=Math.random()*4-2;
		particleInterCity[i]=0;
		if (i<initialInfection) {
			particleSIR[i]=1;
			particleILifeSpan[i]=250;
			particleAnimation[i]=0;
		} else {
			particleSIR[i]=0;
		}
	}
	settingDisable=["start","initialPopulation","infectedPopulation","city","centralCity"]
	for (var i=0; i<5; i++) {document.getElementById(settingDisable[i]).disabled=true;}
	repeat();
}

function setDefault() {
	document.getElementById("initialPopulation").value=1000;
	document.getElementById("infectedPopulation").value=1;
	document.getElementById("infectionP").value=2;
	document.getElementById("infectionRadius").value=2;
	document.getElementById("locationFrequency").value=6;
	document.getElementById("isolationSpeed").value=5;
	document.getElementById("asymptomatic").value=2;
	document.getElementById("intercitymovement").value=6;
	document.getElementById("centralLocation").checked=false;
	document.getElementById("isolation").checked=false;
	document.getElementById("socialDistance").checked=false;
	document.getElementById("city").checked=false;
	document.getElementById("centralCity").checked=false;
	isolation();
	centerMarket();
	city();
}

function gameMode() {
	if (gamemode==0) {
		gamemode++;
		if (localStorage.getItem("highscore")>0) {}
		else {localStorage.setItem("highscore",0)}
		gameSettingsTracker();
	} else {gamemode=0;}
}

function gameSettingsTracker() {
	if (document.getElementById("start").disabled==false) {
		if (gamemode==1) {
			gameSettings=96
			gameSettings+=document.getElementById("infectedPopulation").value*4
			gameSettings+=(document.getElementById("infectionP").value-2)*10
			gameSettings+=(document.getElementById("infectionRadius").value-2)*10
			if (document.getElementById("centralLocation").checked==true) {
				gameSettings+=document.getElementById("locationFrequency").value*5}
			if (document.getElementById("isolation").checked==true) {
				gameSettings-=30
				gameSettings-=document.getElementById("isolationSpeed").value*6
				gameSettings+=document.getElementById("asymptomatic").value*5
			}
			if (document.getElementById("socialDistance").checked==true) {gameSettings-=40}
			if (document.getElementById("city").checked==true) {
				gameSettings+=document.getElementById("intercitymovement").value*4
				if (document.getElementById("centralCity").checked==true) {gameSettings+=5}
			}
			if (gameSettings<10) {gameSettings=10}
			document.getElementById("scoreMultiplier").innerHTML="<p>Gamemode: Highscore</p><p>Score Multiplier: "+gameSettings+"</p>";
			window.setTimeout(gameSettingsTracker,150)
		} else {
			document.getElementById("scoreMultiplier").innerHTML="<p>Gamemode: Sandbox</p><p>Score Multiplier: None</p>"
		}
	} else if (document.getElementById("start").disabled==true) {
		document.getElementById("centralLocation").disabled=true;
		document.getElementById("isolation").disabled=true;
		document.getElementById("socialDistance").disabled=true;
		document.getElementById("city").disabled=true;
		document.getElementById("infectionP").disabled=true;
		document.getElementById("infectionRadius").disabled=true;
		disableButton();
	} 
}

//function repetition
function repeat() {
	if (motionCounter==1) {
		//check checkboxes
		if (document.getElementById("centralLocation").checked==true) {centralCity=1} else {centralCity=0}
		if (document.getElementById("isolation").checked==true) {patientIsolation=1} else {patientIsolation=0}
		if (document.getElementById("socialDistance").checked==true) {
			if (socialDistance==0) {distanceRecord[distanceRecord.length]=time;}
			socialDistance=1
		} else {
			if (socialDistance==1) {distanceRecord[distanceRecord.length]=time;}
			socialDistance=0
		};
		//main functions
		animation();
		centralLocation();
		motion();
		quarantine();
		infectionCheck();
		graph();
		rangeSliderCheck();
		//active cases
		cBack.clearRect(920,507,368,202)
		cBack.clearRect(720,470,150,20)
		cBack.beginPath();
		cBack.fillStyle="White"
		cBack.font='30px georgia serif'
		cBack.fillText("# of Active Cases = "+(population-infectionRecord[time-1][0]-infectionRecord[time-1][2]),940,540)
		if (gamemode==1) {cBack.fillText("Score: "+gameSettings*infectionRecord[time-1][0],940,690)}
		cBack.font='italic 30px georgia serif'
		cBack.fillText("R"+'\u2080'+" = ",940,650)
		cBack.font='20px georgia serif'
		cBack.fillText("# of Closed Cases = "+infectionRecord[time-1][2],940,580)
		cBack.fillText("# of Healthy Population = "+infectionRecord[time-1][0],940,605)
		cBack.beginPath();
		cBack.fillStyle="#EC4444"
		cBack.fillText("Quarantine Zone",720,490)
		if (time>10) {
			if (population-infectionRecord[time-2][0]-infectionRecord[time-2][2]==0 && gamemode==1) {
				motionCounter=0;
				finalScore=gameSettings*infectionRecord[time-1][0]
			}
		}
		window.setTimeout(repeat,33)
	}
	if (motionCounter==0 && gamemode==1 && population-infectionRecord[time-1][0]-infectionRecord[time-1][2]==0) {
		if (localStorage.getItem("highscore")<finalScore) {localStorage.setItem("highscore",finalScore)}
		cBack.clearRect(920,507,368,202)
		cBack.font='30px georgia serif'
		cBack.beginPath();
		cBack.fillStyle="#EF4E4E"
		cBack.fillText("Final Score: "+finalScore,940,690)
		cBack.beginPath();
		cBack.fillStyle="#F2F2F2"
		cBack.fillText("Simulation Over . . .",940,580)
		cBack.fillText("High Score: "+localStorage.getItem("highscore"),940,650)
	}
}

//main motion of particles
function motion() {
	if (citysetting==0) {motionmultiplier=0.4}
	if (citysetting==1) {motionmultiplier=0.2}
	cMotion.clearRect(4,4,892,642)
	for (var i=0; i<particlePositionX.length; i++) {
		if (particleSIR[i]==0) {cMotion.fillStyle="#60E4F0"}
		else if (particleSIR[i]==1) {cMotion.fillStyle="#EC4444"}
		else if (particleSIR[i]==2) {cMotion.fillStyle="#6D6D6D"}
		else if (particleSIR[i]==3 && patientIsolation==1) {cMotion.fillStyle="#D6EA50"}
		else if (particleSIR[i]==3 && patientIsolation==0) {cMotion.fillStyle="#EC4444"}
		else if (particleSIR[i]==4) {cMotion.fillStyle="#EC4444"}
		particleMotionX[i]*=0.98
		particleMotionY[i]*=0.98
		cMotion.beginPath();
		if (citysetting==0) {
			if (particleCentralLocation[i]==0 && particleIsolation[i]==0) {
				//different motions if social distancing
				if (socialDistance==1) {
					particleMotionX[i]=0;
					particleMotionY[i]=0;
					counterX=0
					counterY=0
					counter=0
					for (var j=0; j<particleSIR.length; j++) {
						if (particleIsolation[j]==0) {
							if (particlePositionX[i]>particlePositionX[j]) {counterX++}
							if (particlePositionY[i]>particlePositionY[j]) {counterY++}
							counter++;
						}
					}
					if (counterX/counter>particlePositionX[i]/650) {particleMotionX[i]+=Math.random()*5} else {particleMotionX[i]-=Math.random()*3}
					if (counterY/counter>particlePositionY[i]/650) {particleMotionY[i]+=Math.random()*5} else {particleMotionY[i]-=Math.random()*3}
				}
				cMotion.arc(particlePositionX[i],particlePositionY[i],2,0,Math.PI*2)
				particlePositionX[i]+=particleMotionX[i]*motionmultiplier
				particlePositionY[i]+=particleMotionY[i]*motionmultiplier
			} else if (particleCentralLocation[i]!=0) {
				cMotion.arc(particlePositionX[i],particlePositionY[i],2,0,Math.PI*2)
				if (particleCentralLocation[i]==9.5) {
					particleMemoryX[i]=particlePositionX[i];
					particleMemoryY[i]=particlePositionY[i];
				}
				if (particleCentralLocation[i]>6) {
					particlePositionX[i]=particleMemoryX[i]+(328-particleMemoryX[i])*(particleCentralLocation[i]*-1+10)/4
					particlePositionY[i]=particleMemoryY[i]+(326-particleMemoryY[i])*(particleCentralLocation[i]*-1+10)/4
				} else if (particleCentralLocation[i]<4) {
					if (particleSIR[i]==1) {particleSIR[i]=4};
					if (particleSIR[i]==3) {particleSIR[i]=5};
					particlePositionX[i]=particleMemoryX[i]+(328-particleMemoryX[i])*(particleCentralLocation[i])/4
					particlePositionY[i]=particleMemoryY[i]+(326-particleMemoryY[i])*(particleCentralLocation[i])/4
				} else {
					if (particleSIR[i]==4) {particleSIR[i]=1};
					if (particleSIR[i]==5) {particleSIR[i]=3};
					particlePositionX[i]=328
					particlePositionY[i]=326
				}
			} else if (particleIsolation[i]!=0 && particleIsolation[i]!=1) {
				if (particleIsolation[i]==9) {
					particleMemoryX[i]=particlePositionX[i];
					particleMemoryY[i]=particlePositionY[i];
				}
				if (particleIsolation[i]>1) {
					particlePositionX[i]=particleMemoryX[i]+(770-particleMemoryX[i])*(particleIsolation[i]*-1+10)/8
					particlePositionY[i]=particleMemoryY[i]+(534-particleMemoryY[i])*(particleIsolation[i]*-1+10)/8
				} 
				cMotion.arc(particlePositionX[i],particlePositionY[i],2,0,Math.PI*2)
			}
			if (particleIsolation[i]==1) {
				cMotion.arc(particlePositionX[i],particlePositionY[i],2,0,Math.PI*2)
				particlePositionX[i]+=particleMotionX[i]*motionmultiplier
				particlePositionY[i]+=particleMotionY[i]*motionmultiplier
			}
			cMotion.fill()
			if (particleIsolation[i]==0) {
				if (particlePositionX[i]<20) {particleMotionX[i]+=(particlePositionX[i]-5)/-7.5+2}
				else if (particlePositionX[i]>630) {particleMotionX[i]-=(particlePositionX[i]-630)/7.5}
				else {particleMotionX[i]+=Math.random()-0.5}
				if (particlePositionY[i]<20) {particleMotionY[i]+=(particlePositionY[i]-5)/-7.5+2}
				else if (particlePositionY[i]>630) {particleMotionY[i]-=(particlePositionY[i]-630)/7.5}
				else {particleMotionY[i]+=Math.random()-0.5}
			}
			if (particleIsolation[i]==1) {
				if (particlePositionX[i]<680) {particleMotionX[i]+=(particlePositionX[i]-665)/-7.5+2}
				else if (particlePositionX[i]>860) {particleMotionX[i]-=(particlePositionX[i]-860)/7.5}
				else {particleMotionX[i]+=Math.random()-0.5}
				if (particlePositionY[i]<450) {particleMotionY[i]+=(particlePositionY[i]-435)/-7.5+2}
				else if (particlePositionY[i]>630) {particleMotionY[i]-=(particlePositionY[i]-630)/7.5}
				else {particleMotionY[i]+=Math.random()-0.5}
			}
			if (particleIsolation[i]==2) {
				particleMotionX[i]=Math.random()*2-1;
				particleMotionY[i]=Math.random()*2-1;
			}
		}
		if (citysetting==1 && particleInterCity[i]==0) {
			if (particleCentralLocation[i]==0 && particleIsolation[i]==0) {
				//different motions if social distancing
				if (socialDistance==1) {
					particleMotionX[i]=0
					particleMotionY[i]=0
					counterX=[0,0,0,0,0,0,0,0,0]
					counterY=[0,0,0,0,0,0,0,0,0]
					counter=[0,0,0,0,0,0,0,0,0]
					for (var j=0; j<particleSIR.length; j++) {
						if (particleCityX[i]==particleCityX[j] && particleCityY[i]==particleCityY[j]) {
							if (particlePositionX[i]>particlePositionX[j]) {counterX[particleCityX[i]+3*particleCityY[i]]++}
							if (particlePositionY[i]>particlePositionY[j]) {counterY[particleCityX[i]+3*particleCityY[i]]++}
							counter[particleCityX[i]+3*particleCityY[i]]++;
						}
					}
					if (counterX[particleCityX[i]+3*particleCityY[i]]/counter[particleCityX[i]+3*particleCityY[i]]>particlePositionX[i]/210) 
						{particleMotionX[i]+=Math.random()*5} else {particleMotionX[i]-=Math.random()*3}
					if (counterY[particleCityX[i]+3*particleCityY[i]]/counter[particleCityX[i]+3*particleCityY[i]]>particlePositionY[i]/210) 
						{particleMotionY[i]+=Math.random()*5} else {particleMotionY[i]-=Math.random()*3}
				}
				cMotion.arc(particlePositionX[i]+220*particleCityX[i],particlePositionY[i]+220*particleCityY[i],2,0,Math.PI*2)
				particlePositionX[i]+=particleMotionX[i]*motionmultiplier
				particlePositionY[i]+=particleMotionY[i]*motionmultiplier
			} else if (particleCentralLocation[i]!=0) {
				if (particleCentralLocation[i]==9.5) {
					particleMemoryX[i]=particlePositionX[i]+220*particleCityX[i];
					particleMemoryY[i]=particlePositionY[i]+220*particleCityY[i];
				}
				cMotion.arc(particlePositionX[i],particlePositionY[i],2,0,Math.PI*2)
				if (particleCentralLocation[i]>6) {
					particlePositionX[i]=particleMemoryX[i]+(328-particleMemoryX[i])*(particleCentralLocation[i]*-1+10)/4
					particlePositionY[i]=particleMemoryY[i]+(326-particleMemoryY[i])*(particleCentralLocation[i]*-1+10)/4
				} else if (particleCentralLocation[i]<4) {
					if (particleSIR[i]==1) {particleSIR[i]=4};
					if (particleSIR[i]==3) {particleSIR[i]=5};
					particlePositionX[i]=particleMemoryX[i]+(328-particleMemoryX[i])*(particleCentralLocation[i])/4
					particlePositionY[i]=particleMemoryY[i]+(326-particleMemoryY[i])*(particleCentralLocation[i])/4
				} else {
					if (particleSIR[i]==4) {particleSIR[i]=1};
					if (particleSIR[i]==5) {particleSIR[i]=3};
					particlePositionX[i]=328
					particlePositionY[i]=326
				}
			} else if (particleIsolation[i]!=0 && particleIsolation[i]!=1) {
				if (particleIsolation[i]==9) {
					particleMemoryX[i]=particlePositionX[i]+220*particleCityX[i]; 
					particleMemoryY[i]=particlePositionY[i]+220*particleCityY[i];
				}
				if (particleIsolation[i]>1) {
					particlePositionX[i]=particleMemoryX[i]+(770-particleMemoryX[i])*(particleIsolation[i]*-1+10)/8
					particlePositionY[i]=particleMemoryY[i]+(534-particleMemoryY[i])*(particleIsolation[i]*-1+10)/8
				} 
				cMotion.arc(particlePositionX[i],particlePositionY[i],2,0,Math.PI*2)
			}
			if (particleIsolation[i]==1) {
				cMotion.arc(particlePositionX[i],particlePositionY[i],2,0,Math.PI*2)
				particlePositionX[i]+=particleMotionX[i]*motionmultiplier
				particlePositionY[i]+=particleMotionY[i]*motionmultiplier
			}
			cMotion.fill();
			if (particleIsolation[i]==0 && particleCentralLocation[i]==0) {
				if (particlePositionX[i]<20) {particleMotionX[i]+=(particlePositionX[i]-5)/-7.5+2}
				else if (particlePositionX[i]>190) {particleMotionX[i]-=(particlePositionX[i]-190)/7.5}
				else {particleMotionX[i]+=Math.random()-0.5}
				if (particlePositionY[i]<20) {particleMotionY[i]+=(particlePositionY[i]-5)/-7.5+2}
				else if (particlePositionY[i]>190) {particleMotionY[i]-=(particlePositionY[i]-190)/7.5}
				else {particleMotionY[i]+=Math.random()-0.5}
			} 
			if (particleIsolation[i]==1) {
				if (particlePositionX[i]<680) {particleMotionX[i]+=(particlePositionX[i]-665)/-7.5+2}
				else if (particlePositionX[i]>860) {particleMotionX[i]-=(particlePositionX[i]-860)/7.5}
				else {particleMotionX[i]+=Math.random()-0.5}
				if (particlePositionY[i]<450) {particleMotionY[i]+=(particlePositionY[i]-435)/-7.5+2}
				else if (particlePositionY[i]>630) {particleMotionY[i]-=(particlePositionY[i]-630)/7.5}
				else {particleMotionY[i]+=Math.random()-0.5}
			}
			if (particleIsolation[i]==2) {
				particleMotionX[i]=Math.random()*2-1;
				particleMotionY[i]=Math.random()*2-1;
			}
		}
	}
	if (citysetting==1) {
		if (document.getElementById("intercitymovement").value/10>Math.random()) {
			interCity=Math.floor(Math.random()*population);
			if (particleCentralLocation[interCity]==0 && particleIsolation[interCity]==0 && intercityPopulation<population/5) {
				particleInterCity[interCity]=10;
				intercityPopulation++;
			}
		}
		for (var i=0; i<particleInterCity.length; i++) {
			if (particleInterCity[i]==10) {
				particleMemoryX[i]=particleCityX[i]
				particleMemoryY[i]=particleCityY[i]
				particlePositionX[i]+=220*particleCityX[i]
				particlePositionY[i]+=220*particleCityY[i]
				if (urban==0) {
					particleCityX[i]=Math.floor(Math.random()*3)
					particleCityY[i]=Math.floor(Math.random()*3)
				} 
				if (urban==1) {
					particleCityX[i]=Math.floor(Math.random()*4)
					if (particleCityX[i]==3) {particleCityX[i]=1}
					particleCityY[i]=Math.floor(Math.random()*4)
					if (particleCityY[i]==3) {particleCityY[i]=1}
				}
				particleMemoryX[i]=particleCityX[i]-particleMemoryX[i]
		 		particleMemoryY[i]=particleCityY[i]-particleMemoryY[i]
		 		particleMotionX[i]=0;
		 		particleMotionY[i]=0;
				if (particleSIR[i]==1) {particleSIR[i]=4}
				if (particleSIR[i]==3) {particleSIR[i]=5}
			}
			if (particleInterCity[i]==1) {
				particlePositionX[i]=particlePositionX[i]%220
				particlePositionY[i]=particlePositionY[i]%220
				if (particleSIR[i]==4) {particleSIR[i]=1}
				if (particleSIR[i]==5) {particleSIR[i]=3}
				intercityPopulation-=1
				cMotion.beginPath();
				cMotion.arc(particlePositionX[i]+particleCityX[i]*220,particlePositionY[i]+particleCityY[i]*220,2,0,Math.PI*2)
				particleMotionX[i]=Math.random()*4-2;
		 		particleMotionY[i]=Math.random()*4-2;
		 		particleInterCity[i]-=1;
			}
			if (particleInterCity[i]>1) {
				cMotion.beginPath();
				particleInterCity[i]-=1
				if (particleInterCity[i]!=9) {cMotion.arc(particlePositionX[i],particlePositionY[i],2,0,Math.PI*2)}
				particlePositionX[i]+=particleMemoryX[i]*220/9
				particlePositionY[i]+=particleMemoryY[i]*220/9
			}
			cMotion.fill();
		}
	}
}

//see if any gets infected in the iteration
function infectionCheck() {
	for (var i=0; i<particlePositionX.length; i++) {
		if (particleSIR[i]==1 || particleSIR[i]==3) {
			for (j=0; j<particlePositionX.length; j++) {
				if (particleSIR[j]==0 && citysetting==0) {
					if (Math.pow(particlePositionX[i]-particlePositionX[j],2)+Math.pow(particlePositionY[i]-particlePositionY[j],2)<Math.pow(infectionRadius,2) && Math.random()<1-Math.pow(1-infectionP,0.2)) {
						if (Math.random()<document.getElementById("asymptomatic").value/10) {particleSIR[j]=3;
						} else {particleSIR[j]=1;}
						particleILifeSpan[j]=Math.random()*100+150;
						particleAnimation[j]=0;
					} 
				} else if (particleSIR[j]==0 && citysetting==1) {
					if (Math.pow(particlePositionX[i]-particlePositionX[j],2)+Math.pow(particlePositionY[i]-particlePositionY[j],2)<Math.pow(infectionRadius,2) && Math.random()<1-Math.pow(1-infectionP,0.2) && particleCityX[i]==particleCityX[j] && particleCityY[i]==particleCityY[j]) {
						if (Math.random()<document.getElementById("asymptomatic").value/10) {particleSIR[j]=3;
						} else {particleSIR[j]=1;}
						particleILifeSpan[j]=Math.random()*100+150;
						particleAnimation[j]=0;
					}
					if (Math.random()<1-Math.pow(1-infectionP,0.2) && particleCentralLocation[i]>4 && particleCentralLocation[i]<6 && particleCentralLocation[j]>4 && particleCentralLocation[j]<6 ) {
						if (Math.random()<document.getElementById("asymptomatic").value/10) {particleSIR[j]=3;
						} else {particleSIR[j]=1;}
						particleILifeSpan[j]=Math.random()*100+150;
						particleAnimation[j]=0;
					}
				}
			}
	 	}
	 	if (particleILifeSpan[i]<0) {particleSIR[i]=2}
	 	if (particleSIR[i]!=2 && particleSIR[i]!=0) {
	 		particleILifeSpan[i]-=1;
	 	}
	}
}

//ongoing graph of infection
function graph() {
	infectioncount=[0,0,0,0,0]
	for (var i=0; i<particleSIR.length; i++) {
		infectioncount[particleSIR[i]]++;
	}
	infectionRecord[time]=infectioncount;
	for (var i=0; i<=time; i++) {
		cStats.beginPath();
		cStats.fillStyle="#6D6D6D";
		cStats.fillRect(600/time*i,0,600/time,infectionRecord[i][2]/population*360);
		cStats.beginPath();
		cStats.fillStyle="#31838F";
		cStats.fillRect(600/time*i,infectionRecord[i][2]/population*360,600/time,infectionRecord[i][0]/population*360)
		cStats.beginPath();
		cStats.fillStyle="#E64C4C"
		cStats.fillRect(600/time*i,360-(population-infectionRecord[i][0]-infectionRecord[i][2])/population*360,600/time,(population-infectionRecord[i][0]-infectionRecord[i][2])/population*360)
	}
	cStats.fillStyle="#B4F034"
	for (var i=0; i<distanceRecord.length; i++) {
		cStats.beginPath();
		cStats.fillRect(600/time*distanceRecord[i],0,2,360)
	}
	cStats.clearRect(600,0,110,450)
	cStats.clearRect(20,360,600,50)
	cStats.beginPath()
	cStats.strokeStyle="#FFFFFF"
	cStats.fillStyle="White"
	cStats.textAlign="center"
	cStats.font='19px georgia serif'
	if (time<400) {
		for (var i=1; 40*i<time; i++) {
			cStats.moveTo(24000/time*i,350)
			cStats.lineTo(24000/time*i,370)
			cStats.stroke();
			cStats.fillText(i,24000/time*i,384);
		}
	} else {
		for (var i=1; 200*i<time; i++) {
			cStats.moveTo(120000/time*i,350)
			cStats.lineTo(120000/time*i,370)
			cStats.stroke();
			cStats.fillText(5*i,120000/time*i,384);
		}
	}
	time++;
}

//animation of infected particles
function animation() {
	cInf.clearRect(0,0,900,650);
	for (var i=0; i<particleSIR.length; i++) {
		if (particleSIR[i]==1 || particleSIR[i]==4) {cInf.strokeStyle="#EC4444"}
		if ((particleSIR[i]==3 || particleSIR[i]==5) && patientIsolation==1) {cInf.strokeStyle="#D6EA50"}
		if (particleSIR[i]!=0 && particleSIR[i]!=2) {
			cInf.beginPath();
			if (particleAnimation[i]>0 && particleAnimation[i]<=3*infectionRadius) {
				cInf.lineWidth=3
				if (citysetting==0) {cInf.arc(particlePositionX[i],particlePositionY[i],particleAnimation[i]/3,0,Math.PI*2)}
				if (citysetting==1) {cInf.arc(particlePositionX[i]+220*particleCityX[i],particlePositionY[i]+220*particleCityY[i],particleAnimation[i]/3,0,Math.PI*2)}
			} else if (particleAnimation[i]>3*infectionRadius && particleAnimation[i]<3.5*infectionRadius) {
				animationConstant=(particleAnimation[i]-3*infectionRadius)/infectionRadius
				cInf.lineWidth=3-animationConstant*6
				if (citysetting==0) {cInf.arc(particlePositionX[i],particlePositionY[i],infectionRadius+animationConstant*4,0,Math.PI*2)}
				if (citysetting==1) {cInf.arc(particlePositionX[i]+220*particleCityX[i],particlePositionY[i]+220*particleCityY[i],infectionRadius+animationConstant*4,0,Math.PI*2)}
			}
			cInf.stroke();
			particleAnimation[i]++
			if (particleAnimation[i]>infectionRadius*3.5 && particleILifeSpan[i]>particleAnimation[i]*4) {
				particleAnimation[i]=-10;
			}
		}
		if (patientIsolation==0) {cInf.clearRect(650,0,280,650)}
	}
}

//create central location of movement
function centralLocation() {
	if (centralCity==1) {
		cBack.clearRect(320,370,50,50)
		cBack.beginPath();
		cBack.rect(338,386,20,20);
		cBack.stroke();
		centralLocationParticle=Math.floor(Math.random()*population);
		if (particleCentralLocation[centralLocationParticle]==0 && currentcentral<population*0.8 && particleIsolation[centralLocationParticle]==0 && particleInterCity[centralLocationParticle]==0 && Math.random()<document.getElementById("locationFrequency").value/10) {
			particleCentralLocation[centralLocationParticle]=10;
			if (particleSIR[i]==1) {particleSIR[i]=4};
			if (particleSIR[i]==3) {particleSIR[i]=5};
			currentcentral++;
		} 
	}
	for (var i=0; i<particleCentralLocation.length; i++) {
		if (particleCentralLocation[i]>0) {
			particleCentralLocation[i]-=0.5;
		} 
		if (particleCentralLocation[i]==0.5) {
			particleCentralLocation[i]=0;
			if (citysetting==0) {
				particlePositionX[i]=particleMemoryX[i];
				particlePositionY[i]=particleMemoryY[i];
			}
			if (citysetting==1) {
				particlePositionX[i]=particleMemoryX[i]-220*particleCityX[i];
				particlePositionY[i]=particleMemoryY[i]-220*particleCityY[i];
			}
			if (particleSIR[i]==4) {particleSIR[i]=1};
			if (particleSIR[i]==5) {particleSIR[i]=3};
			currentcentral-=1;
		}
	}
}		

//isolate positive patients
function quarantine() {
	if (patientIsolation==1) {
		for (i=0; i<population; i++) {
			if (particleSIR[i]==1 && particleILifeSpan[i]<220 && particleIsolation[i]==0 && particleInterCity[i]==0 && quarantineCounter==0 && particleInterCity[i]==0) {
				particleIsolation[i]=10
				quarantineCounter=isolationSpeed-10;
				particleCentralLocation[i]=0
				particleSIR[i]=4
			}
		}
		quarantineCounter++;
		if (quarantineCounter>0) {quarantineCounter=-5}
	}	
	for (var i=0; i<particleIsolation.length; i++) {
		if (particleIsolation[i]>1) {
			particleIsolation[i]-=1
		}
	}
}
