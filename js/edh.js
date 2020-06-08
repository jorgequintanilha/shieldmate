/*
This file is part of EDH SHIELDMATE
Copyright (C) 2018 Jorge Quintanilha, Paulo Mendonça

EDH SHIELDMATE is free software: you can redistribute it
under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

EDH SHIELDMATE is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with EDH SHIELDMATE.  If not, see http://www.gnu.org/licenses/.
*/
"use strict";

function setGame(numPlayers, ori, mode) {
  sessionStorage.setItem("orientation", ori);
  sessionStorage.setItem("mode", (mode == 0 ? 0 : 1));
  sessionStorage.setItem("sessionPlayers", numPlayers);
  setTableInitialValues(numPlayers);
  setGameScreenFunctions(numPlayers, mode);
  setManaSidebarFunctions(numPlayers);
  setStyleSidebarFunctions();
  setCmdDmgSidebarFunctions(numPlayers);
  setManaPoolDefaultValues();
  setSettingsSidebarFunctions();
  setPlayersSidebarFunctions();
  setTimerFunctions(numPlayers);
  setDefaultSettings();
  AndroidFullScreen.immersiveMode(console.log(1), console.log(0));
  window.plugins.insomnia.keepAwake();
}

function getViewportWidth() {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function hasClass(elem, className) {
  return new RegExp(" " + className + " ").test(" " + elem.className + " ");
}

function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += " " + className;
  }
}

function removeClass(elem, className) {
  var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
  if (hasClass(elem, className)) {
    while (newClass.indexOf(" " + className + " ") >= 0) {
      newClass = newClass.replace(" " + className + " ", " ");
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, "");
  }
}

function toggleClass(elem, className) {
  var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
  if (hasClass(elem, className)) {
    while (newClass.indexOf(" " + className + " ") >= 0) {
      newClass = newClass.replace(" " + className + " ", " ");
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, "");
  } else {
    elem.className += " " + className;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function flashRandomPlayer() {
  document.getElementById("btnRandomize").disabled = true;
  document.getElementById("btnRandomize").style.opacity = 0.5;

  var playerCards = document.getElementsByClassName("card");
  for (let i = 0; i < playerCards.length; i++) {
	  highlight(playerCards[i]);
  }
  
  var rand = getRandomInt(1, sessionStorage.getItem("sessionPlayers"));

  sleep(700).then(() => {
    highlight(playerCards[rand-1]);
	sleep(700).then(() => {
      highlight(playerCards[rand-1]);
	  sleep(1000).then(() => {
        document.getElementById("btnRandomize").disabled = false;
		document.getElementById("btnRandomize").style.opacity = 1;
		if (localStorage.getItem('negativeLife')==1) {
			var playerLife = document.getElementsByClassName("txtLifePoints");
			for (let i = 0; i < playerLife.length; i++) { 
				if(parseInt(playerLife[i].innerHTML) < 1) { 
					let pnum = playerLife[i].id.substr(14,1);
					document.getElementById("cardP" + pnum).style.opacity = 0.6;
				}
			}
		}
	  });
	});
  });
}

function getRandomColor() {
  return ("#" + (getRandomInt(0, 16777215)).toString(16));
}

function flash(element) {
  var op = element.style.opacity = 0.8;
  element.style.backgroundColor = "#dddddd";
  var timer = setInterval(function () {
    if (op < 0.6) {
      element.style.backgroundColor = "transparent";
      clearInterval(timer);
    }
    element.style.opacity = op;
    op -= 0.05;
  }, 25);
}

function highlight(element) {
  var op = element.style.opacity = 0.0;
  var timer = setInterval(function () {
    if (op >= 1) {
      element.style.opacity = 1.0;
      clearInterval(timer);
    }
    op += 0.1;
    element.style.opacity = op;
  }, 50);
}

function getManaPoolMode() {
  if (sessionStorage.getItem("manaClearMode") == 1) {
    return 0;
  } else if (sessionStorage.getItem("manaSubMode") == 1) {
    return 1;
  } else if (sessionStorage.getItem("manaAddMode") == 1) {
    return 2;
  } else {
    return -1;
  }
}

function startTimer(time) {
  sessionStorage.setItem("Timer", 1);
  var secs = parseInt(time.substr(6, 2)) == NaN ? 0 : parseInt(time.substr(6, 2));
  var mins = parseInt(time.substr(3, 2)) == NaN ? 0 : parseInt(time.substr(3, 2));
  var hrs = parseInt(time.substr(0, 2)) == NaN ? 0 : parseInt(time.substr(0, 2));
  var countdown = setInterval(function () {
    secs = ++secs;
    if (secs > 59) {
      mins = ++mins;
      secs = 0;
    }
    if (mins > 59) {
      hrs = ++hrs;
      mins = 0;
    }
    document.getElementById("txtTimerDisplay").innerHTML = (hrs < 10 ? "0" + hrs : hrs) + ":" + (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
  }, 1000);
  sessionStorage.setItem("timer_id", countdown);
  return countdown;
}

function setTimerFunctions(numPlayers) {
  sessionStorage.setItem("Timer", 0);
  sessionStorage.setItem("TimerPaused", "00:00:00");
  document.getElementById("btnPlayPause").addEventListener("click", function () {
    if (sessionStorage.getItem("Timer") == 1) {
      clearInterval(sessionStorage.getItem("timer_id"));
      sessionStorage.setItem("TimerPaused", document.getElementById("txtTimerDisplay").innerHTML);
      sessionStorage.setItem("Timer", 0);
      highlight(document.getElementById("txtTimerDisplay"));
    } else {
      startTimer(sessionStorage.getItem("TimerPaused"));
      highlight(document.getElementById("txtTimerDisplay"));
    }
  }, false);
  document.getElementById("btnResetTimer").addEventListener("click", function () {
    removeClass(document.getElementById("timerConfirmation"), "invisible");
    if (numPlayers == 2) {
      removeClass(document.getElementById("timerConfirmation2"), "invisible");
    }
  }, false);
  document.getElementById("btnResetConfirmYes").addEventListener("click", function () {
    addClass(document.getElementById("timerConfirmation"), "invisible");
    if (numPlayers == 2) {
      addClass(document.getElementById("timerConfirmation2"), "invisible");
    }
    clearInterval(sessionStorage.getItem("timer_id"));
    document.getElementById("txtTimerDisplay").innerHTML = "00:00:00";
    highlight(document.getElementById("txtTimerDisplay"));
    startTimer("00:00:00");
  }, false);
  document.getElementById("btnResetConfirmNo").addEventListener("click", function () {
    addClass(document.getElementById("timerConfirmation"), "invisible");
    if (numPlayers == 2) {
      addClass(document.getElementById("timerConfirmation2"), "invisible");
    }
  }, false);
}

function setPlayerLife(op, amount, pnum) {
  if (isNaN(parseInt(amount, 10))) {
    return;
  }
  var lp = document.getElementById("txtLifePointsP" + pnum);
  if (!lp) {
    return;
  }
  switch (op) {
    case 1:
      lp.innerHTML = (parseInt(lp.innerHTML, 10) + amount);
      if (lp.innerHTML > 998) {
        lp.innerHTML = "999";
      }
      if (document.getElementById("cardP" + pnum).style.opacity < 1 && lp.innerHTML > 0) {
        document.getElementById("cardP" + pnum).style.opacity = 1;
      }
      return;
      break;
    case -1:
      lp.innerHTML = (parseInt(lp.innerHTML, 10) - amount);
      if (lp.innerHTML < 1) {
		if (localStorage.getItem('negativeLife')==1) {
			  document.getElementById("cardP" + pnum).style.opacity = 0.6; return;
			  }
        lp.innerHTML = "0";
        document.getElementById("cardP" + pnum).style.opacity = 0.4;
      }
      return;
      break;
    case 0:
      if (parseInt(amount, 10)) {
        if (parseInt(amount, 10) > 998) {
          lp.innerHTML = "999";
        } else if (parseInt(amount, 10) < 1) {
		  if (localStorage.getItem('negativeLife')==1) {
			  lp.innerHTML = parseInt(amount, 10); document.getElementById("cardP" + pnum).style.opacity = 0.6; return;
			  }
          lp.innerHTML = "0";
          document.getElementById("cardP" + pnum).style.opacity = 0.4;
          return;
        } else {
          lp.innerHTML = parseInt(amount, 10);
        }
      } else if (amount == "0" || parseInt(amount, 10) < 0) {
        lp.innerHTML = "0";
        document.getElementById("cardP" + pnum).style.opacity = 0.4;
        return;
      }

      if (document.getElementById("cardP" + pnum).style.opacity < 1) {
        document.getElementById("cardP" + pnum).style.opacity = 1;
      }
      return;
      break;
    default:
      return;
      break;
  }
}

function setTableInitialValues() {
  var mode = sessionStorage.getItem("mode");
  if (mode == 1) {
    var lifepoints = document.getElementsByClassName("txtLifePoints");
    for (var i = 0; i < lifepoints.length; i++) {
      if (i == 0) {
        lifepoints[i].innerHTML = "40";
      } else {
        lifepoints[i].innerHTML = "20";
      }
    }
    return;
  }
  if (isNaN(parseInt(localStorage.getItem("default_lp"),10)) || localStorage.getItem("default_lp") == null) {
    localStorage.setItem("default_lp", 40);
  }
  var lp = localStorage.getItem("default_lp");
  var lifepoints = document.getElementsByClassName("txtLifePoints");
  for (var i = 0; i < lifepoints.length; i++) {
    lifepoints[i].innerHTML = lp;
  }
}

function setDefaultSettings() {
  if (localStorage.getItem("autoRandom") == 1) {
    setRandomStyles();
  } else if (localStorage.getItem("autoDefault") == 1) {
    loadTable();
  }
  
  if (localStorage.getItem("hideButtonsDef") == 1) {
    toggleClass(document.getElementById("btnToggleExp"), "inactive");
    toggleClass(document.getElementById("btnToggleBls"), "inactive");
    toggleClass(document.getElementById("btnTogglePoison"), "inactive");
    toggleClass(document.getElementById("btnToggleMon"), "inactive");
    toggleClass(document.getElementById("btnToggleCast"), "inactive");
	toggleClass(document.getElementById("btnToggleSig"), "inactive");
	var auxbtns = document.getElementsByClassName("btnAux");
	for (var i = 0; i < auxbtns.length; i++) {
		toggleClass(auxbtns[i], "invisible");
	}
	var auxdivs = document.getElementsByClassName("divAux");
	for (var i = 0; i < auxdivs.length; i++) {
		toggleClass(auxdivs[i], "noDimensions");
	}
  }
  else {
	toggleClass(document.getElementById("btnToggleSig"), "inactive");
	var auxbtns = document.getElementsByClassName("btnSig");
	for (var i = 0; i < auxbtns.length; i++) {
		toggleClass(auxbtns[i], "invisible");
	}
	var auxdivs = document.getElementsByClassName("divSig");
	for (var i = 0; i < auxdivs.length; i++) {
		toggleClass(auxdivs[i], "noDimensions");
	}
  }
  
}

function saveTable() {
  for (var i = 1; i <= sessionStorage.getItem("numPlayers"); i++) {
    localStorage.setItem("P" + i + "style", ((sessionStorage.getItem("P" + i + "style") == null) ? "Blank" : (sessionStorage.getItem("P" + i + "style"))));
    localStorage.setItem("P" + i + "name", document.getElementById("txtPlayerNameP" + i).innerHTML);
  }
}

function loadTable() {
  for (var i = 1; i <= sessionStorage.getItem("numPlayers"); i++) {
    var pstyle = localStorage.getItem("P" + i + "style");
    var pname = localStorage.getItem("P" + i + "name");
    if (pstyle) {
      setStyle(localStorage.getItem("P" + i + "style"), "P" + i);
    }
    if (pname) {
      setPlayerName(localStorage.getItem("P" + i + "name"), "P" + i);
    }
  }
}

function openSidebar(sidebar, side) {
  closeSidebars();
  document.getElementById(sidebar).style[side] = "0px";
  sessionStorage.setItem("sidebarStatus",1);
}

function closeSidebars() {
  var offset = getViewportWidth();
  document.getElementById("manaSidebar").style["right"] = "-" + offset + "px";
  document.getElementById("cmdDmgSidebar").style["right"] = "-" + offset + "px";
  document.getElementById("settingsSidebar").style["left"] = "-" + offset + "px";
  document.getElementById("styleSidebar").style["left"] = "-" + offset + "px";
  document.getElementById("playerSidebar").style["left"] = "-" + offset + "px";
  document.getElementById("styleInpPlayerName").value = "";
  document.getElementById("setDiceResult").value = "";
  document.getElementById("inpSetStatus").value = "";
  sessionStorage.setItem("sidebarStatus",0);
}

function setGameScreenFunctions(numPlayers, mode) {
	
  document.getElementById("btnSettings").addEventListener("click", function () {
    openSidebar("settingsSidebar", "left");
  }, false);
  document.getElementById("btnManaPool").addEventListener("click", function () {
    openSidebar("manaSidebar", "right");
  }, false);
  document.getElementById("btnCmdDmg").addEventListener("click", function () {
    openSidebar("cmdDmgSidebar", "right");
  }, false);
  document.getElementById("btnPlayers").addEventListener("click", function () {
    openSidebar("playerSidebar", "left");
  }, false);
  document.getElementById("btnManaSidebarClose").addEventListener("click", function () {
    closeSidebars();
  }, false);
  document.getElementById("btnCmdDmgSidebarClose").addEventListener("click", function () {
    closeSidebars();
  }, false);
  document.getElementById("btnSetSideBarClose").addEventListener("click", function () {
    closeSidebars();
  }, false);
  document.getElementById("btnStyleSideBarClose").addEventListener("click", function () {
    closeSidebars();
  }, false);
  document.getElementById("btnSidePlayersClose").addEventListener("click", function () {
    closeSidebars();
  }, false);

  if (numPlayers > 1) {
	document.getElementById("btnRandomize").addEventListener("click", function () {
	  flashRandomPlayer();
	}, false);
  }
  
  var elemset = document.getElementsByClassName("txtPlayerName");
  for (let i = 0; i < elemset.length; i++) {
    elemset[i].addEventListener("long-press", function () {
      var id = this.id;
      let pnum = id.substr(id.length - 2);
      highlight(document.getElementById("blkPlayerName" + id.substr(id.length - 2)));
      document.getElementById("txtStyleSideBarPad").innerHTML = id.substr(id.length - 2);
      document.getElementById("txtStyleSideBarSelectedTheme").innerHTML = sessionStorage.getItem(id.substr(id.length - 2 + "style"));
      if (hasClass(document.getElementById("btnExp" + pnum), "invisible")) {
        addClass(document.getElementById("btnToggleExp"), "inactive");
      } else {
        removeClass(document.getElementById("btnToggleExp"), "inactive");
      }
      if (hasClass(document.getElementById("btnBless" + pnum), "invisible")) {
        addClass(document.getElementById("btnToggleBls"), "inactive");
      } else {
        removeClass(document.getElementById("btnToggleBls"), "inactive");
      }
      if (hasClass(document.getElementById("btnPoison" + pnum), "invisible")) {
        addClass(document.getElementById("btnTogglePoison"), "inactive");
      } else {
        removeClass(document.getElementById("btnTogglePoison"), "inactive");
      }
      if (hasClass(document.getElementById("btnMonarch" + pnum), "invisible")) {
        addClass(document.getElementById("btnToggleMon"), "inactive");
      } else {
        removeClass(document.getElementById("btnToggleMon"), "inactive");
      }
      if (hasClass(document.getElementById("btnCast" + pnum), "invisible")) {
        addClass(document.getElementById("btnToggleCast"), "inactive");
      } else {
        removeClass(document.getElementById("btnToggleCast"), "inactive");
      }
	  if (hasClass(document.getElementById("btnSig" + pnum), "invisible")) {
        addClass(document.getElementById("btnToggleSig"), "inactive");
      } else {
        removeClass(document.getElementById("btnToggleSig"), "inactive");
      }
      openSidebar("styleSidebar", "left");
    }, false);
  }

  var elemset = document.getElementsByClassName("txtLifePoints");
  for (let i = 0; i < elemset.length; i++) {
    elemset[i].addEventListener("long-press", function () {
      var x = prompt("ENTER CUSTOM VALUE");
      var pnum = this.id.substr(this.id.length - 1);
      setPlayerLife(0, x, pnum);
    }, false);
  }

  for (let i = 1; i <= (numPlayers); i++) {
	let np = hasClass(document.getElementById("cardP" + i), "ptr") ? "7vh 7vh" : "5vh 5vh";
	  
    document.getElementById("btnIncPlusMainP" + i).addEventListener("click", function () {
      setPlayerLife(1, 1, i);
    }, false);

    document.getElementById("btnIncPlusExtP" + i).addEventListener("click", function () {
      setPlayerLife(1, 5, i);
    }, false);

    document.getElementById("btnIncMinusMainP" + i).addEventListener("click", function () {
      setPlayerLife(-1, 1, i);
    }, false);

    document.getElementById("btnIncMinusExtP" + i).addEventListener("click", function () {
      setPlayerLife(-1, 5, i);
    }, false);

    document.getElementById("btnExpP" + i).addEventListener("click", function () {
      var tp = document.getElementById("txtExpP" + i);
      if (isNaN(parseInt(tp.innerHTML,10))) {
        tp.innerHTML = "0";
      }

      tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
      if (tp.innerHTML > 99) {
        tp.innerHTML = "99";
      }

      var bid = document.getElementById("btnExpP" + i);
      bid.style.background = "url(./img/expiv.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);

    document.getElementById("btnExpP" + i).addEventListener("long-press", function () {
      var tp = document.getElementById("txtExpP" + i);
      tp.innerHTML = "&nbsp;";

      var bid = document.getElementById("btnExpP" + i);
      bid.style.background = "url(./img/exptp.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);

    document.getElementById("btnBlessP" + i).addEventListener("click", function () {
      var bid = document.getElementById("btnBlessP" + i);
      bid.style.background = "url(./img/blsiv.png) no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);

    document.getElementById("btnBlessP" + i).addEventListener("long-press", function () {
      var bid = document.getElementById("btnBlessP" + i);
      bid.style.background = "url(./img/blstp.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);

    document.getElementById("btnPoisonP" + i).addEventListener("click", function () {
      var tp = document.getElementById("txtPoisonP" + i);
      if (isNaN(parseInt(tp.innerHTML,10))) {
        tp.innerHTML = "0";
      }

      tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
      if (tp.innerHTML > 99) {
        tp.innerHTML = "99";
      }

      var bid = document.getElementById("btnPoisonP" + i);
      bid.style.background = "url(./img/psniv.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);

    document.getElementById("btnPoisonP" + i).addEventListener("long-press", function () {
      var tp = document.getElementById("txtPoisonP" + i);
      tp.innerHTML = "&nbsp;";

      var bid = document.getElementById("btnPoisonP" + i);
      bid.style.background = "url(./img/psntp.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);
	
	document.getElementById("btnSigP" + i).addEventListener("click", function () {
      var tp = document.getElementById("txtSigP" + i);
      if (isNaN(parseInt(tp.innerHTML,10))) {
        tp.innerHTML = "0";
      }

      tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
      if (tp.innerHTML > 99) {
        tp.innerHTML = "99";
      }

      var bid = document.getElementById("btnSigP" + i);
      bid.style.background = "url(./img/sigiv.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);

    document.getElementById("btnSigP" + i).addEventListener("long-press", function () {
      var tp = document.getElementById("txtSigP" + i);
      tp.innerHTML = "&nbsp;";

      var bid = document.getElementById("btnSigP" + i);
      bid.style.background = "url(./img/sigtp.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);

    document.getElementById("btnMonarchP" + i).addEventListener("click", function () {
      var elemset = document.getElementsByClassName("btnMonarch");
      for (let i = 0; i < elemset.length; i++) {
        elemset[i].style.background = "url(./img/montp.png)  no-repeat center center";
		let cardnum = i + 1;
        elemset[i].style.backgroundSize = hasClass(document.getElementById("cardP" + cardnum), "ptr") ? "7vh 7vh" : "5vh 5vh";
      }

      var bid = document.getElementById("btnMonarchP" + i);
      bid.style.background = "url(./img/moniv.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);

    document.getElementById("btnMonarchP" + i).addEventListener("long-press", function () {
      var bid = document.getElementById("btnMonarchP" + i);
      bid.style.background = "url(./img/montp.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);

    document.getElementById("btnCastP" + i).addEventListener("click", function () {
      var tp = document.getElementById("txtCastP" + i);
      if (isNaN(parseInt(tp.innerHTML,10))) {
        tp.innerHTML = "0";
      }

      tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
      if (tp.innerHTML > 99) {
        tp.innerHTML = "99";
      }

      var bid = document.getElementById("btnCastP" + i);
      bid.style.background = "url(./img/cstiv.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);

    document.getElementById("btnCastP" + i).addEventListener("long-press", function () {
      var tp = document.getElementById("txtCastP" + i);
      tp.innerHTML = "&nbsp;";

      var bid = document.getElementById("btnCastP" + i);
      bid.style.background = "url(./img/csttp.png)  no-repeat center center";
      bid.style.backgroundSize = np;
    }, false);
  }
}

function setManaSidebarFunctions(numPlayers) {
  document.getElementById("btnManaSideBarClear").addEventListener("click", function () {
    var mode = sessionStorage.getItem("manaClearMode");
    mode = mode == 0 ? 1 : 0;
    sessionStorage.setItem("manaClearMode", mode);
    sessionStorage.setItem("manaSubMode", 0);
    sessionStorage.setItem("manaAddMode", 0);
    setManaPoolMode(0, mode, numPlayers);
  }, false);

  document.getElementById("btnManaSideBarMinus").addEventListener("click", function () {
    var mode = sessionStorage.getItem("manaSubMode");
    mode = mode == 0 ? 1 : 0;
    sessionStorage.setItem("manaClearMode", 0);
    sessionStorage.setItem("manaSubMode", mode);
    sessionStorage.setItem("manaAddMode", 0);
    setManaPoolMode(1, mode, numPlayers);
  }, false);

  document.getElementById("btnManaSideBarPlus").addEventListener("click", function () {
    var mode = sessionStorage.getItem("manaAddMode");
    mode = mode == 0 ? 1 : 0;
    sessionStorage.setItem("manaClearMode", 0);
    sessionStorage.setItem("manaSubMode", 0);
    sessionStorage.setItem("manaAddMode", mode);
    setManaPoolMode(2, mode, numPlayers);
  }, false);

  var playerNames = document.getElementsByClassName("playerNameManaDiv");
  for (let i = 0; i < playerNames.length; i++) {
    let pnum = playerNames[i].id.substr(playerNames[i].id.length - 2);
    playerNames[i].addEventListener("click", function () {
      let mode = getManaPoolMode(false);
      if (mode == 0) {
        document.getElementById("txtManaW" + pnum).innerHTML = "&nbsp;";
        document.getElementById("btnManaW" + pnum).className = "btnMana btnMenuWhite" + (numPlayers > 2 ? " tilt" : " upfix");
        document.getElementById("txtManaU" + pnum).innerHTML = "&nbsp;";
        document.getElementById("btnManaU" + pnum).className = "btnMana btnMenuBlue" + (numPlayers > 2 ? " tilt" : " upfix");
        document.getElementById("txtManaB" + pnum).innerHTML = "&nbsp;";
        document.getElementById("btnManaB" + pnum).className = "btnMana btnMenuBlack" + (numPlayers > 2 ? " tilt" : " upfix");
        document.getElementById("txtManaR" + pnum).innerHTML = "&nbsp;";
        document.getElementById("btnManaR" + pnum).className = "btnMana btnMenuRed" + (numPlayers > 2 ? " tilt" : " upfix");
        document.getElementById("txtManaG" + pnum).innerHTML = "&nbsp;";
        document.getElementById("btnManaG" + pnum).className = "btnMana btnMenuGreen" + (numPlayers > 2 ? " tilt" : " upfix");
        document.getElementById("txtManaC" + pnum).innerHTML = "&nbsp;";
        document.getElementById("btnManaC" + pnum).className = "btnMana btnMenuColorless" + (numPlayers > 2 ? " tilt" : " upfix");
        document.getElementById("txtManaE" + pnum).innerHTML = "&nbsp;";
        document.getElementById("btnManaE" + pnum).className = "btnMana btnMenuEnergy" + (numPlayers > 2 ? " tilt" : " upfix");
      }
    }, false);
  }

  for (let i = 1; i <= (numPlayers); i++) {
    document.getElementById("btnManaWP" + i).addEventListener("click", function () {
      let mode = getManaPoolMode(false);
      var tp = document.getElementById("txtManaWP" + i);

      switch (mode) {
        case 0:
          tp.innerHTML = "&nbsp;";
          removeClass(this, "btnMenuWhiteDk");
          addClass(this, "btnMenuWhite");
          break;
        case 1:
          if (!isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = (parseInt(tp.innerHTML, 10) - 1);
            if (tp.innerHTML < 1) {
              tp.innerHTML = "&nbsp;";
              removeClass(this, "btnMenuWhiteDk");
              addClass(this, "btnMenuWhite");
            }
          }
          break;
        case 2:
          if (isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = "0";
            removeClass(this, "btnMenuWhite");
            addClass(this, "btnMenuWhiteDk");
          }
          tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
          if (tp.innerHTML > 999) {
            tp.innerHTML = "999";
          }
          break;
        case 3:
        default:
          break;
      }
    }, false);

    document.getElementById("btnManaUP" + i).addEventListener("click", function () {
      let mode = getManaPoolMode(false);
      var tp = document.getElementById("txtManaUP" + i);

      switch (mode) {
        case 0:
          tp.innerHTML = "&nbsp;";
          removeClass(this, "btnMenuBlueDk");
          addClass(this, "btnMenuBlue");
          break;
        case 1:
          if (!isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = (parseInt(tp.innerHTML, 10) - 1);
            if (tp.innerHTML < 1) {
              tp.innerHTML = "&nbsp;";
              removeClass(this, "btnMenuBlueDk");
              addClass(this, "btnMenuBlue");
            }
          }
          break;
        case 2:
          if (isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = "0";
            removeClass(this, "btnMenuBlue");
            addClass(this, "btnMenuBlueDk");
          }
          tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
          if (tp.innerHTML > 999) {
            tp.innerHTML = "999";
          }
          break;
        case 3:
        default:
          break;
      }
    }, false);

    document.getElementById("btnManaBP" + i).addEventListener("click", function () {
      let mode = getManaPoolMode(false);
      var tp = document.getElementById("txtManaBP" + i);

      switch (mode) {
        case 0:
          tp.innerHTML = "&nbsp;";
          removeClass(this, "btnMenuBlackDk");
          addClass(this, "btnMenuBlack");
          break;
        case 1:
          if (!isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = (parseInt(tp.innerHTML, 10) - 1);
            if (tp.innerHTML < 1) {
              tp.innerHTML = "&nbsp;";
              removeClass(this, "btnMenuBlackDk");
              addClass(this, "btnMenuBlack");
            }
          }
          break;
        case 2:
          if (isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = "0";
            removeClass(this, "btnMenuBlack");
            addClass(this, "btnMenuBlackDk");
          }
          tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
          if (tp.innerHTML > 999) {
            tp.innerHTML = "999";
          }
          break;
        case 3:
        default:
          break;
      }
    }, false);

    document.getElementById("btnManaRP" + i).addEventListener("click", function () {
      let mode = getManaPoolMode(false);
      var tp = document.getElementById("txtManaRP" + i);

      switch (mode) {
        case 0:
          tp.innerHTML = "&nbsp;";
          removeClass(this, "btnMenuRedDk");
          addClass(this, "btnMenuRed");
          break;
        case 1:
          if (!isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = (parseInt(tp.innerHTML, 10) - 1);
            if (tp.innerHTML < 1) {
              tp.innerHTML = "&nbsp;";
              removeClass(this, "btnMenuRedDk");
              addClass(this, "btnMenuRed");
            }
          }
          break;
        case 2:
          if (isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = "0";
            removeClass(this, "btnMenuRed");
            addClass(this, "btnMenuRedDk");
          }
          tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
          if (tp.innerHTML > 999) {
            tp.innerHTML = "999";
          }
          break;
        case 3:
        default:
          break;
      }
    }, false);

    document.getElementById("btnManaGP" + i).addEventListener("click", function () {
      let mode = getManaPoolMode(false);
      var tp = document.getElementById("txtManaGP" + i);

      switch (mode) {
        case 0:
          tp.innerHTML = "&nbsp;";
          removeClass(this, "btnMenuGreenDk");
          addClass(this, "btnMenuGreen");
          break;
        case 1:
          if (!isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = (parseInt(tp.innerHTML, 10) - 1);
            if (tp.innerHTML < 1) {
              tp.innerHTML = "&nbsp;";
              removeClass(this, "btnMenuGreenDk");
              addClass(this, "btnMenuGreen");
            }
          }
          break;
        case 2:
          if (isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = "0";
            removeClass(this, "btnMenuGreen");
            addClass(this, "btnMenuGreenDk");
          }
          tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
          if (tp.innerHTML > 999) {
            tp.innerHTML = "999";
          }
          break;
        case 3:
        default:
          break;
      }
    }, false);

    document.getElementById("btnManaCP" + i).addEventListener("click", function () {
      let mode = getManaPoolMode(false);
      var tp = document.getElementById("txtManaCP" + i);

      switch (mode) {
        case 0:
          tp.innerHTML = "&nbsp;";
          removeClass(this, "btnMenuColorlessDk");
          addClass(this, "btnMenuColorless");
          break;
        case 1:
          if (!isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = (parseInt(tp.innerHTML, 10) - 1);
            if (tp.innerHTML < 1) {
              tp.innerHTML = "&nbsp;";
              removeClass(this, "btnMenuColorlessDk");
              addClass(this, "btnMenuColorless");
            }
          }
          break;
        case 2:
          if (isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = "0";
            removeClass(this, "btnMenuColorless");
            addClass(this, "btnMenuColorlessDk");
          }
          tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
          if (tp.innerHTML > 999) {
            tp.innerHTML = "999";
          }
          break;
        case 3:
        default:
          break;
      }
    }, false);

    document.getElementById("btnManaEP" + i).addEventListener("click", function () {
      let mode = getManaPoolMode(false);
      var tp = document.getElementById("txtManaEP" + i);

      switch (mode) {
        case 0:
          tp.innerHTML = "&nbsp;";
          removeClass(this, "btnMenuEnergyDk");
          addClass(this, "btnMenuEnergy");
          break;
        case 1:
          if (!isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = (parseInt(tp.innerHTML, 10) - 1);
            if (tp.innerHTML < 1) {
              tp.innerHTML = "&nbsp;";
              removeClass(this, "btnMenuEnergyDk");
              addClass(this, "btnMenuEnergy");
            }
          }
          break;
        case 2:
          if (isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = "0";
            removeClass(this, "btnMenuEnergy");
            addClass(this, "btnMenuEnergyDk");
          }
          tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
          if (tp.innerHTML > 999) {
            tp.innerHTML = "999";
          }
          break;
        case 3:
        default:
          break;
      }
    }, false);
  }

  var elemset = document.getElementsByClassName("btnMana");
  for (let i = 0; i < elemset.length; i++) {
    elemset[i].addEventListener("long-press", function () {
      var x = prompt("ENTER CUSTOM VALUE");
      var id = this.id;
      if (parseInt(x, 10)) {
        if (parseInt(x, 10) <= 0) {
          document.getElementById("txtMana" + id.substr(id.length - 3)).innerHTML = "0";
        } else if (parseInt(x, 10) > 999) {
          document.getElementById("txtMana" + id.substr(id.length - 3)).innerHTML = "999";
        } else {
          document.getElementById("txtMana" + id.substr(id.length - 3)).innerHTML = parseInt(x, 10);
        }
      }
    }, false);
  }
}

function setCmdDmgSidebarFunctions(numPlayers) {
  if (numPlayers == 1) {
    setCmdDmgSidebarFunc1p();
    return;
  }
  var binding = localStorage.getItem("bindDamage") == 1 ? true : false;
  for (let i = 1; i <= numPlayers; i++) {
    for (let j = 1; j <= numPlayers; j++) {
      var elem = document.getElementById("btnDmgCmdP" + i + "fromP" + j);
      if (elem) {
        elem.addEventListener("click", function () {
          var tp = document.getElementById("txtDmgCmdP" + i + "fromP" + j);
          if (isNaN(parseInt(tp.innerHTML,10))) {
            tp.innerHTML = "0";
          }
          tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
          if (tp.innerHTML > 99) {
            tp.innerHTML = "99";
          } else {
            if (binding) {
              setPlayerLife(-1, 1, i);
            }
          }
        }, false);

        document.getElementById("btnDmgCmdP" + i + "fromP" + j).addEventListener("long-press", function () {
          var tp = document.getElementById("txtDmgCmdP" + i + "fromP" + j);
          if (binding) {
            setPlayerLife(1, parseInt(tp.innerHTML, 10), i);
          }
          tp.innerHTML = "&nbsp;";
        }, false);
      }
    }

    document.getElementById("btnDmgCmdExtra1P" + i).addEventListener("click", function () {
      var tp = document.getElementById("txtDmgCmdExtra1P" + i);
      if (isNaN(parseInt(tp.innerHTML,10))) {
        tp.innerHTML = "0";
      }
      tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
      if (tp.innerHTML > 99) {
        tp.innerHTML = "99";
      } else {
        if (binding) {
          setPlayerLife(-1, 1, i);
        }
      }
    }, false);

    document.getElementById("btnDmgCmdExtra1P" + i).addEventListener("long-press", function () {
      var tp = document.getElementById("txtDmgCmdExtra1P" + i);
      if (binding) {
        setPlayerLife(1, parseInt(tp.innerHTML, 10), i);
      }
      tp.innerHTML = "&nbsp;";
    }, false);

    document.getElementById("btnDmgCmdExtra2P" + i).addEventListener("click", function () {
      var tp = document.getElementById("txtDmgCmdExtra2P" + i);
      if (isNaN(parseInt(tp.innerHTML,10))) {
        tp.innerHTML = "0";
      }
      tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
      if (tp.innerHTML > 99) {
        tp.innerHTML = "99";
      } else {
        if (binding) {
          setPlayerLife(-1, 1, i);
        }
      }
    }, false);

    document.getElementById("btnDmgCmdExtra2P" + i).addEventListener("long-press", function () {
      var tp = document.getElementById("txtDmgCmdExtra2P" + i);
      if (binding) {
        setPlayerLife(1, parseInt(tp.innerHTML, 10), i);
      }
      tp.innerHTML = "&nbsp;";
    }, false);
  }

  var elemset = document.getElementsByClassName("txtPlayerNameCmd");
  for (let i = 0; i < elemset.length; i++) {
    elemset[i].addEventListener("long-press", function () {
      let pnum = this.id.substr(this.id.length - 1);
      for (let k = 1; k <= numPlayers; k++) {
        var tcmd = document.getElementById("txtDmgCmdP" + pnum + "fromP" + k);
        if (tcmd) {
          if (binding) {
            setPlayerLife(1, parseInt(tcmd.innerHTML, 10), pnum);
          }
          tcmd.innerHTML = "&nbsp;";
        }
      }
      document.getElementById("txtDmgCmdExtra1P" + pnum).innerHTML = "&nbsp;";
      if (binding) {
        setPlayerLife(1, parseInt(tcmd.innerHTML, 10), pnum);
      }
      document.getElementById("txtDmgCmdExtra2P" + pnum).innerHTML = "&nbsp;";
      if (binding) {
        setPlayerLife(1, parseInt(tcmd.innerHTML, 10), pnum);
      }

    }, false);
  }

  document.getElementById("btnCmdSideBarClear").addEventListener("click", function () {
	var lang = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
	if(lang=='br') {
		navigator.notification.confirm("CUIDADO! Deseja apagar tudo nesta dela?", onConfirmClearCmd, "Confirmação", "Sim,Não"); 
	} else {
		navigator.notification.confirm("WARNING! Do wish you wish to clear everything on this screen?", onConfirmClearCmd, "Confirmation", "Yes,No"); 
	}
  }, false);
}

function onConfirmClearCmd(button) {
	var binding = localStorage.getItem("bindDamage") == 1 ? true : false;
	
	if(button==2){
		return;
	} 
	else {
		var elemset = document.getElementsByClassName("txtDmgCmd");
		for (let i = 0; i < elemset.length; i++) {
			if (binding) {
			let pnum = elemset[i].id.substr(elemset[i].id.length - 7,1);
				if (!isNaN(parseInt(elemset[i].innerHTML))) {setPlayerLife(1, parseInt(elemset[i].innerHTML, 10), pnum);}
			}
			elemset[i].innerHTML = "&nbsp;";
		}
		var elemset = document.getElementsByClassName("txtDmgCmdExtra");
		for (let i = 0; i < elemset.length; i++) {
			if (binding) {
			var pnum = elemset[i].id.substr(elemset[i].id.length - 1);
				if (!isNaN(parseInt(elemset[i].innerHTML))) {setPlayerLife(1, parseInt(elemset[i].innerHTML, 10), pnum);}
			}
			elemset[i].innerHTML = "&nbsp;";
		}
	}
}

function setCmdDmgSidebarFunc1p() {
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      document.getElementById("btnDmgCmdP" + i + j).addEventListener("click", function () {
        var tp = document.getElementById("txtDmgCmdP" + i + j);
        if (isNaN(parseInt(tp.innerHTML,10))) {
          tp.innerHTML = "0";
        }
        tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
        if (tp.innerHTML > 99) {
          tp.innerHTML = "99";
        }
      }, false);

      document.getElementById("btnDmgCmdP" + i + j).addEventListener("long-press", function () {
        var tp = document.getElementById("txtDmgCmdP" + i + j);
        tp.innerHTML = "&nbsp;";
      }, false);
    }

    for (let k = 1; k < 3; k++) {
      document.getElementById("btnExtraDmgCmd" + k + "P" + i).addEventListener("click", function () {
        var tp = document.getElementById("txtExtraDmgCmd" + k + "P" + i);
        if (isNaN(parseInt(tp.innerHTML,10))) {
          tp.innerHTML = "0";
        }

        tp.innerHTML = (parseInt(tp.innerHTML, 10) + 1);
        if (tp.innerHTML > 99) {
          tp.innerHTML = "99";
        }
      }, false);

      document.getElementById("btnExtraDmgCmd" + k + "P" + i).addEventListener("long-press", function () {
        var tp = document.getElementById("txtExtraDmgCmd" + k + "P" + i);
        tp.innerHTML = "&nbsp;";
      }, false);
    }

    document.getElementById("btnCmdSideBarClear").addEventListener("click", function () {
      var elemset = document.getElementsByClassName("txtDmgCmd");
      for (let i = 0; i < elemset.length; i++) {
        elemset[i].innerHTML = "&nbsp;";
      }
      var elemset = document.getElementsByClassName("txtDmgCmdExtra");
      for (let i = 0; i < elemset.length; i++) {
        elemset[i].innerHTML = "&nbsp;";
      }
    }, false);
  }
}

function setSettingsSidebarFunctions() {
  var np = sessionStorage.getItem("numPlayers") > 2 ? "5vh 5vh" : "8vh 8vh";
  var lang = localStorage.getItem("language") ? localStorage.getItem("language") : "en";
  document.getElementById("txtSetSideBarLifeSet").innerHTML = "(" + localStorage.getItem("default_lp") + ")";
  
  document.getElementById("btnInfo").addEventListener("click", function () {
    toggleClass(document.getElementById("infoPanel"), "invisible");
  }, false);
  
  document.getElementById("btnCloseInfoPanel").addEventListener("click", function () {
    toggleClass(document.getElementById("infoPanel"), "invisible");
  }, false);

  document.getElementById("btnSetSideBarRandomStyles").addEventListener("click", function () {
    setRandomStyles();
    document.getElementById("inpSetStatus").value = lang == "br" ? "ESTILOS APLICADOS!" : "STYLES SET!";
  }, false);

  document.getElementById("btnSetSideBarTimerToggle").addEventListener("click", function () {
    toggleClass(document.getElementById("timerLnd"), "invisible");
	if (sessionStorage.getItem("numPlayers") == 2) {toggleClass(document.getElementById("timerLnd2"), "invisible");}
    if (hasClass(document.getElementById("timerLnd"), "invisible")) {
      document.getElementById("inpSetStatus").value = lang == "br" ? "CRONÔMETRO DESATIVADO" : "TIMER OFF";
    } else {
      document.getElementById("inpSetStatus").value = lang == "br" ? "CRONÔMETRO ATIVADO" : "TIMER ON";
    }
  }, false);

  document.getElementById("btnSetSideBarResetGame").addEventListener("click", function () {
    setTableInitialValues();
    var elemset = document.getElementsByClassName("txtDmgCmd");
    for (let i = 0; i < elemset.length; i++) {
      elemset[i].innerHTML = "&nbsp;";
    }
    var elemset = document.getElementsByClassName("txtDmgCmdExtra");
    for (let i = 0; i < elemset.length; i++) {
      elemset[i].innerHTML = "&nbsp;";
    }
    var elemset = document.getElementsByClassName("txtMana");
    for (let i = 0; i < elemset.length; i++) {
      elemset[i].innerHTML = "&nbsp;";
    }
    var elemset = document.getElementsByClassName("txtAux");
    for (let i = 0; i < elemset.length; i++) {
      elemset[i].innerHTML = "&nbsp;";
    }
    var elemset = document.getElementsByClassName("btnExp");
    for (let i = 0; i < elemset.length; i++) {
      elemset[i].style.background = "url(./img/exptp.png)  no-repeat center center";
      elemset[i].style.backgroundSize = np;
    }
    var elemset = document.getElementsByClassName("btnBless");
    for (let i = 0; i < elemset.length; i++) {
      elemset[i].style.background = "url(./img/blstp.png)  no-repeat center center";
      elemset[i].style.backgroundSize = np;
    }
    var elemset = document.getElementsByClassName("btnPoison");
    for (let i = 0; i < elemset.length; i++) {
      elemset[i].style.background = "url(./img/psntp.png)  no-repeat center center";
      elemset[i].style.backgroundSize = np;
    }
    var elemset = document.getElementsByClassName("btnMonarch");
    for (let i = 0; i < elemset.length; i++) {
      elemset[i].style.background = "url(./img/montp.png)  no-repeat center center";
      elemset[i].style.backgroundSize = np;
    }
    var elemset = document.getElementsByClassName("btnCast");
    for (let i = 0; i < elemset.length; i++) {
      elemset[i].style.background = "url(./img/csttp.png)  no-repeat center center";
      elemset[i].style.backgroundSize = np;
    }
	var elemset = document.getElementsByClassName("btnSig");
    for (let i = 0; i < elemset.length; i++) {
      elemset[i].style.background = "url(./img/sigtp.png)  no-repeat center center";
      elemset[i].style.backgroundSize = np;
    }
    var numPlayers = sessionStorage.getItem("numPlayers");
    for (var i = 1; i <= numPlayers; i++) {
      document.getElementById("cardP" + i).style.opacity = 1;
      document.getElementById("btnManaWP" + i).className = "btnMana btnMenuWhite" + (numPlayers > 2 ? " tilt" : " upfix");
      document.getElementById("btnManaUP" + i).className = "btnMana btnMenuBlue" + (numPlayers > 2 ? " tilt" : " upfix");
      document.getElementById("btnManaBP" + i).className = "btnMana btnMenuBlack" + (numPlayers > 2 ? " tilt" : " upfix");
      document.getElementById("btnManaRP" + i).className = "btnMana btnMenuRed" + (numPlayers > 2 ? " tilt" : " upfix");
      document.getElementById("btnManaGP" + i).className = "btnMana btnMenuGreen" + (numPlayers > 2 ? " tilt" : " upfix");
      document.getElementById("btnManaCP" + i).className = "btnMana btnMenuColorless" + (numPlayers > 2 ? " tilt" : " upfix");
      document.getElementById("btnManaEP" + i).className = "btnMana btnMenuEnergy" + (numPlayers > 2 ? " tilt" : " upfix");
    }
    document.getElementById("btnManaSideBarClear").className = "btnMenu btnSideBar btnClearSub btnClearOff";
    document.getElementById("btnManaSideBarMinus").className = "btnMenu btnSideBar btnIncSub btnMinusOff" + (numPlayers > 2 ? "Lnd" : "Ptr");
    document.getElementById("btnManaSideBarPlus").className = "btnMenu btnSideBar btnIncSub btnPlusOff";
    document.getElementById("inpSetStatus").value = lang == "br" ? "O JOGO FOI REINICIADO!" : "GAME HAS BEEN RESET!";
  }, false);

  document.getElementById("btnSetSideBarResetStyles").addEventListener("click", function () {
    var nump = sessionStorage.getItem("numPlayers");
    for (var i = 1; i <= nump; i++) {
      setStyle("Blank", "P" + i);
      setPlayerName("Player " + i, "P" + i);
      if (sessionStorage.getItem("mode") == 1 && i == 1) {
        setPlayerName("ARCHENEMY", "P" + i);
      }
    }
    document.getElementById("inpSetStatus").value = lang == "br" ? "OS ESTILOS FORAM APAGADOS!" : "STYLES HAVE BEEN RESET!";
  }, false);

  document.getElementById("btnSetSideBarRLP20").addEventListener("click", function () {
    localStorage.setItem("default_lp", 20);
    document.getElementById("txtSetSideBarLifeSet").innerHTML = "(" + localStorage.getItem("default_lp") + ")";
    document.getElementById("inpSetStatus").value = (lang == "br" ? "PVS INICIAIS GRAVADOS! (" : "Default starting life set! (") + localStorage.getItem("default_lp") + ")";
  }, false);

  document.getElementById("btnSetSideBarRLP25").addEventListener("click", function () {
    localStorage.setItem("default_lp", 25);
    document.getElementById("txtSetSideBarLifeSet").innerHTML = "(" + localStorage.getItem("default_lp") + ")";
    document.getElementById("inpSetStatus").value = (lang == "br" ? "PVS INICIAIS GRAVADOS! (" : "Default starting life set! (") + localStorage.getItem("default_lp") + ")";
  }, false);

  document.getElementById("btnSetSideBarRLP30").addEventListener("click", function () {
    localStorage.setItem("default_lp", 30);
    document.getElementById("txtSetSideBarLifeSet").innerHTML = "(" + localStorage.getItem("default_lp") + ")";
    document.getElementById("inpSetStatus").value = (lang == "br" ? "PVS INICIAIS GRAVADOS! (" : "Default starting life set! (") + localStorage.getItem("default_lp") + ")";
  }, false);

  document.getElementById("btnSetSideBarRLP40").addEventListener("click", function () {
    localStorage.setItem("default_lp", 40);
    document.getElementById("txtSetSideBarLifeSet").innerHTML = "(" + localStorage.getItem("default_lp") + ")";
    document.getElementById("inpSetStatus").value = (lang == "br" ? "PVS INICIAIS GRAVADOS! (" : "Default starting life set! (") + localStorage.getItem("default_lp") + ")";
  }, false);

  document.getElementById("btnDiceD4").addEventListener("click", function () {
    flash(document.getElementById("setDiceResult"));
    document.getElementById("setDiceResult").value = getRandomInt(1, 4);
  }, false);

  document.getElementById("btnDiceD6").addEventListener("click", function () {
    flash(document.getElementById("setDiceResult"));
    document.getElementById("setDiceResult").value = getRandomInt(1, 6);
  }, false);

  document.getElementById("btnDiceD8").addEventListener("click", function () {
    flash(document.getElementById("setDiceResult"));
    document.getElementById("setDiceResult").value = getRandomInt(1, 8);
  }, false);

  document.getElementById("btnDiceD10").addEventListener("click", function () {
    flash(document.getElementById("setDiceResult"));
    document.getElementById("setDiceResult").value = getRandomInt(1, 10);
  }, false);

  document.getElementById("btnDiceD12").addEventListener("click", function () {
    flash(document.getElementById("setDiceResult"));
    document.getElementById("setDiceResult").value = getRandomInt(1, 12);
  }, false);

  document.getElementById("btnDiceD20").addEventListener("click", function () {
    flash(document.getElementById("setDiceResult"));
    document.getElementById("setDiceResult").value = getRandomInt(1, 20);
  }, false);

  document.getElementById("btnDicePlanar").addEventListener("click", function () {
    flash(document.getElementById("setDiceResult"));
    var x = getRandomInt(1, 6);
    document.getElementById("setDiceResult").value = (x == 1 ? (lang == "br" ? "Transplanar!" : "Planeswalk!") : (x == 6 ? (lang == "br" ? "Caos!" : "Chaos!") : "- -"));
  }, false);

  document.getElementById("btnDiceCoin").addEventListener("click", function () {
    flash(document.getElementById("setDiceResult"));
    var x = getRandomInt(1, 2);
    document.getElementById("setDiceResult").value = (x == 1 ? (lang == "br" ? "Cara!" : "Heads!") : (lang == "br" ? "Coroa!" : "Tails!"));
    document.getElementById("setDiceResult").style.opacity = 1;
  }, false);
}

function setPlayersSidebarFunctions() {
	var playerlist = document.getElementById("playersList");
	var playernum = localStorage.getItem("numDefPlayers");
	for (var i=1; i<=playernum; i++) {
		if (localStorage.getItem("savedP"+i)) {
			var player = localStorage.getItem("savedP"+i).split(',');
			var playerhtml = "<div class='regPlayer row h08p col100p' id='playerRowP" + player[0] + "'>" 
					+ "<div class='h100p col10p'>"
					+ "<button class='btnMenu btnDeletePlayer' onclick='delPlayerRow(" + player[0] + ")'></button>"
					+ "</div>"
					+ "<div class='h100p col35p'>"
					+ "<span class='fontBlack fontFaded txt3'>" + player[1] + "</span>"
					+ "</div>"
					+ "<div class='h100p col35p'>"
					+ "<span class='fontDmg" + player[2] + " txt3'>" + player[2] + "</span>"
					+ "</div>"
					+ "<div class='h100p col10p'>"
					+ "<button class='btnMenu btnInsertPlayer' onclick='openTableMap(" + player[0] + ")'></button>"
					+ "</div>"
					+ "<div class='h100p col10p centerContent'>"
					+ "<span class='fontBlue txt3 playerPosition' id='playerPositionP" + player[0] + "'>&nbsp;</span>"
					+ "</div>";
			playerlist.insertAdjacentHTML("beforeend",playerhtml);
		}
		else { continue; }
	}
	
	document.getElementById("btnCloseTableMap").addEventListener("click", function () {
		toggleClass(document.getElementById("tablemap"), "invisible");
	}, false);
	
	var mapbuttons = document.getElementsByClassName("btnMapPosition");
	for (var i=0; i < mapbuttons.length; i++) {
		mapbuttons[i].addEventListener("click", function () {
          var savedplayer = localStorage.getItem("savedP"+document.getElementById("playerId").innerHTML).split(',');
		  if (savedplayer) {
			  var insertedPnum = document.getElementById("playerPositionP"+savedplayer[0]).innerHTML;
			  if (!isNaN(parseInt(insertedPnum, 10))) {
				setStyle("Blank", "P" + insertedPnum);
				setPlayerName("Player " + insertedPnum, "P" + insertedPnum);
			  }
			  
			  setPlayerName(savedplayer[1],this.id.substring(0,2));
			  setStyle(savedplayer[2],this.id.substring(0,2));
			  clearPlayerFromPositionList(this.id.substring(1,2));
			  document.getElementById("playerPositionP"+savedplayer[0]).innerHTML = this.id.substring(1,2);
		  }
		  toggleClass(document.getElementById("tablemap"), "invisible");
        }, false);
	}
	
	document.getElementById('btnRegister').addEventListener('click',function(){
		var lang = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
		var theme = document.getElementById('selectThemes');
		var name = document.getElementById('inpDefaultPName').value;

		if ((name && name.length > 0)) {
			if (theme.selectedIndex > 0) {
				var playernum = localStorage.getItem("numDefPlayers");
				playernum = ++playernum;
				var playerlist = document.getElementById("playersList");
				var playerhtml = "<div class='regPlayer row h08p col100p' id='playerRowP" + playernum + "'>" 
					+ "<div class='h100p col10p'>"
					+ "<button class='btnMenu btnDeletePlayer' onclick='delPlayerRow(" + playernum + ")'></button>"
					+ "</div>"
					+ "<div class='h100p col35p'>"
					+ "<span class='fontBlack fontFaded txt3'>" + name + "</span>"
					+ "</div>"
					+ "<div class='h100p col35p'>"
					+ "<span class='fontDmg" + theme[theme.selectedIndex].value + " txt3'>" + theme[theme.selectedIndex].value + "</span>"
					+ "</div>"
					+ "<div class='h100p col10p'>"
					+ "<button class='btnMenu btnInsertPlayer' onclick='openTableMap(" + playernum + ")'></button>"
					+ "</div>"
					+ "<div class='h100p col10p centerContent'>"
					+ "<span class='fontBlue txt3 playerPosition' id='playerPositionP" + playernum + "'>&nbsp;</span>"
					+ "</div>";
				playerlist.insertAdjacentHTML("beforeend",playerhtml);
				localStorage.setItem("numDefPlayers",playernum);
				localStorage.setItem("savedP"+playernum,[playernum,name,theme[theme.selectedIndex].value])
			}
			else {
				alert(lang == 'br' ? "Selecione um tema!" : "Select a theme!");
			}
		}
		else {
			alert(lang == 'br' ? "Digite o nome do jogador!" : "Type the player's name!");
		}
	},false);
	
	document.getElementById("btnLoadTable").addEventListener("click", function() {
		loadTable();
	},false);
}

function delPlayerRow(pnum) {
	var element = document.getElementById("playerRowP"+pnum);
	if (!element) {return;}
	element.parentNode.removeChild(element);
	localStorage.removeItem("savedP"+pnum);
}

function clearPlayerFromPositionList(num) {
	var playerPosList = document.getElementsByClassName("playerPosition");
	for (var j = 0; j < playerPosList.length; j++) {
		if (playerPosList[j].innerHTML == num) { playerPosList[j].innerHTML = "&nbsp;" }
	}
}

function openTableMap(pnum) {
	document.getElementById("playerId").innerHTML = pnum;
	toggleClass(document.getElementById("tablemap"), "invisible");
}

function setStyleSidebarFunctions() {
  var num = 1;
  for (let i = 1; i < 9; i++) {
    for (let j = 1; j < 6; j++) {
      let styleName = getStyleName(num);
      if (styleName !== "Blank") {
        document.getElementById("btnStyleBtn_" + styleName).addEventListener("click", function () {
          document.getElementById("txtStyleSideBarSelectedTheme").innerHTML = styleName;
		  document.getElementById("txtStyleSideBarSelectedTheme").className = "txt3h fontDmg" + styleName;
        }, false);
      }
      num++;
    }
  }
  
  document.getElementById("btnStyleSideBarClear").addEventListener("click", function () {
    let pnumDiv = document.getElementById("txtStyleSideBarPad");
    setStyle("", pnumDiv.innerHTML);
    setPlayerName(("Player " + pnumDiv.innerHTML.substring(1,2)), pnumDiv.innerHTML);
	clearPlayerFromPositionList(pnumDiv.innerHTML.substring(1,2));
    closeSidebars();
  }, false);

  document.getElementById("btnStyleSideBarSave").addEventListener("click", function () {
    let pnumDiv = document.getElementById("txtStyleSideBarPad");
    let styleName = document.getElementById("txtStyleSideBarSelectedTheme");
    if (styleName.innerHTML != "") {
      setStyle(styleName.innerHTML, pnumDiv.innerHTML);
    } else {
      setPlayerName(document.getElementById("styleInpPlayerName").value, pnumDiv.innerHTML);
    }
	clearPlayerFromPositionList(pnumDiv.innerHTML.substring(1,2));
    closeSidebars();
  }, false);

  document.getElementById("styleInpPlayerName").addEventListener("blur", function () {
    AndroidFullScreen.immersiveMode(console.log(1), console.log(0));
  }, false);

  document.getElementById("styleInpPlayerName").addEventListener("keypress", function () {
    var keycode = event.keyCode || event.which;
    if (keycode == "13") {
      if (document.activeElement != document.body) {
        document.activeElement.blur();
      } else {
        this.blur();
      }
      AndroidFullScreen.immersiveMode(console.log(1), console.log(0));
    }
  }, false);

  document.getElementById("btnToggleExp").addEventListener("click", function () {
    let pnum = document.getElementById("txtStyleSideBarPad").innerHTML;
    toggleClass(document.getElementById("btnToggleExp"), "inactive");
    toggleClass(document.getElementById("btnExp" + pnum), "invisible");
	toggleClass(document.getElementById("divAuxExp" + pnum), "noDimensions");
  }, false);

  document.getElementById("btnToggleBls").addEventListener("click", function () {
    let pnum = document.getElementById("txtStyleSideBarPad").innerHTML;
    toggleClass(document.getElementById("btnToggleBls"), "inactive");
    toggleClass(document.getElementById("btnBless" + pnum), "invisible");
	toggleClass(document.getElementById("divAuxBless" + pnum), "noDimensions");
  }, false);

  document.getElementById("btnTogglePoison").addEventListener("click", function () {
    let pnum = document.getElementById("txtStyleSideBarPad").innerHTML;
    toggleClass(document.getElementById("btnTogglePoison"), "inactive");
    toggleClass(document.getElementById("btnPoison" + pnum), "invisible");
	toggleClass(document.getElementById("divAuxPoison" + pnum), "noDimensions");
  }, false);

  document.getElementById("btnToggleMon").addEventListener("click", function () {
    let pnum = document.getElementById("txtStyleSideBarPad").innerHTML;
    toggleClass(document.getElementById("btnToggleMon"), "inactive");
    toggleClass(document.getElementById("btnMonarch" + pnum), "invisible");
	toggleClass(document.getElementById("divAuxMonarch" + pnum), "noDimensions");
  }, false);

  document.getElementById("btnToggleCast").addEventListener("click", function () {
    let pnum = document.getElementById("txtStyleSideBarPad").innerHTML;
    toggleClass(document.getElementById("btnToggleCast"), "inactive");
    toggleClass(document.getElementById("btnCast" + pnum), "invisible");
	toggleClass(document.getElementById("divAuxCast" + pnum), "noDimensions");
  }, false);
  
  document.getElementById("btnToggleSig").addEventListener("click", function () {
    let pnum = document.getElementById("txtStyleSideBarPad").innerHTML;
    toggleClass(document.getElementById("btnToggleSig"), "inactive");
    toggleClass(document.getElementById("btnSig" + pnum), "invisible");
	toggleClass(document.getElementById("divAuxSig" + pnum), "noDimensions");
  }, false);
}

function setRandomStyles() {
  var numPlayers = sessionStorage.getItem("numPlayers");
  for (let i = 1; i <= numPlayers; i++) {
	var stylenum = getRandomInt(1, 40);
    setStyle(getStyleName(stylenum), "P" + i);
  }
}

function setStyle(style, pnum) {
  var or = hasClass(document.getElementById("card" + pnum), "ptr") ? "Ptr" : "Lnd";
  var styleName = style.toLowerCase() + or;
  var cardStyleDiv = document.getElementById("cardBack" + pnum);
  var numPlayers = sessionStorage.getItem("numPlayers");
  var mode = sessionStorage.getItem("mode");
  var fivepfix = (pnum == "P5" && or == "Ptr") ? " fix5p": "";
  cardStyleDiv.className = "cardBack h100p col100p " + ((mode == 1 && pnum == "P1") ? (style == "Blank" ? "" : "btnDmg") + (style != "" ? style : "Blank") : styleName) + fivepfix;
  setPlayerName(document.getElementById("styleInpPlayerName").value, pnum);
  sessionStorage.setItem(pnum + "style", style);
  if (numPlayers > 1) {
    var dmgButtons = document.getElementsByClassName("btnDmg" + pnum);
    for (var i = 0; i < dmgButtons.length; i++) {
      dmgButtons[i].className = "btnDmg btnDmg" + (numPlayers > 2 ? "Lnd" : "Ptr") + " btnDmg" + (style != "" ? style : "Blank") + " btnDmg" + pnum + (numPlayers > 2 ? " tilt" : "");
    }
  } else {
    var dmgButtons = document.getElementsByClassName("btnDmg");
    for (var i = 0; i < dmgButtons.length; i++) {
      if (!hasClass(dmgButtons[i], "btnDmgExtra")) {
        dmgButtons[i].className = "btnDmg btnDmgPtr btnDmg" + (style != "" ? style : "Blank");
      }
    }
  }

  if (mode == 1 && pnum == "P1") {
    var aepads = document.getElementsByClassName("AEPad");
    for (var i = 0; i < aepads.length; i++) {
      aepads[i].className = "AEPad row h25p col100p " + styleName;
    }
  }
}

function setPlayerName(name, pnum) {
  if (pnum) {
    var playerNameTxt = document.getElementById("txtPlayerName" + pnum);
    var playerNameManaTxt = document.getElementById("txtPlayerNameMana" + pnum);
    var playerNameCmdTxt = document.getElementById("txtPlayerNameCmd" + pnum);
	var playerNameBlock = document.getElementById("blkPlayerName" + pnum);

    if (name == "" || name == null) {
      return;
    } else {
      let pid = "txtPlayerName" + pnum;

      if (playerNameTxt) {
        playerNameTxt.innerHTML = name.substring(0,20);
      }
      if (playerNameManaTxt) {
        playerNameManaTxt.innerHTML = name.substring(0,14);
      }
      if (playerNameCmdTxt) {
        playerNameCmdTxt.innerHTML = name.substring(0,14);
      }
      sessionStorage.setItem(pnum + "name", name.toLowerCase());
	  
	  if(hasClass(document.getElementById("card" + pnum), "ptr")) { 
		if (playerNameTxt.offsetWidth > playerNameBlock.clientWidth) {
		  var textsize = parseFloat(window.getComputedStyle(playerNameTxt).fontSize);
		  do {
			var textsize = textsize - 1;
			playerNameTxt.style.fontSize = textsize + "px";
		  }
		  while (playerNameTxt.offsetWidth > playerNameBlock.clientWidth);
	    }  
	  }
	  else {
		if (playerNameTxt.offsetHeight > playerNameBlock.clientHeight) {
		  var textsize = parseFloat(window.getComputedStyle(playerNameTxt).fontSize);
		  do {
			var textsize = textsize - 1;
			playerNameTxt.style.fontSize = textsize + "px";
		  }
		  while (playerNameTxt.offsetHeight > playerNameBlock.clientHeight);
	    }
	  }
	  
    }
  } else {
    return;
  }
}

function setManaPoolDefaultValues() {
  sessionStorage.setItem("manaClearMode", 0);
  sessionStorage.setItem("manaAddMode", 0);
  sessionStorage.setItem("manaSubMode", 0);
}

function setManaPoolMode(toggle, mode, numPlayers) {
  document.getElementById("btnManaSideBarClear").className = "btnMenu btnSideBar btnClearSub btnClearOff";
  document.getElementById("btnManaSideBarMinus").className = "btnMenu btnSideBar btnIncSub btnMinusOff" + (numPlayers > 2 ? "Lnd" : "Ptr");
  document.getElementById("btnManaSideBarPlus").className = "btnMenu btnSideBar btnIncSub btnPlusOff";

  switch (toggle) {
    case 0:
      if (mode == 1) {
        document.getElementById("btnManaSideBarClear").className = "btnMenu btnSideBar btnClearSub btnClearOn";
      }
      break;
    case 1:
      if (mode == 1) {
        document.getElementById("btnManaSideBarMinus").className = "btnMenu btnSideBar btnIncSub btnMinusOn" + (numPlayers > 2 ? "Lnd" : "Ptr");
      }
      break;
    case 2:
      if (mode == 1) {
        document.getElementById("btnManaSideBarPlus").className = "btnMenu btnSideBar btnIncSub btnPlusOn";
      }
      break;
    default:
      setManaPoolDefaultValues();
      break;
  }
}

function getStyleName(num) {
  switch (num) {
    case 0:
      return "x";
      break;
    case 1:
      return "White";
      break;
    case 2:
      return "Blue";
      break;
    case 3:
      return "Black";
      break;
    case 4:
      return "Red";
      break;
    case 5:
      return "Green";
      break;
    case 6:
      return "Azorius";
      break;
    case 7:
      return "Boros";
      break;
    case 8:
      return "Dimir";
      break;
    case 9:
      return "Golgari";
      break;
    case 10:
      return "Gruul";
      break;
    case 11:
      return "Izzet";
      break;
    case 12:
      return "Orzhov";
      break;
    case 13:
      return "Rakdos";
      break;
    case 14:
      return "Selesnya";
      break;
    case 15:
      return "Simic";
      break;
    case 16:
      return "Abzan";
      break;
    case 17:
      return "Jeskai";
      break;
    case 18:
      return "Mardu";
      break;
    case 19:
      return "Sultai";
      break;
    case 20:
      return "Temur";
      break;
    case 21:
      return "Bant";
      break;
    case 22:
      return "Esper";
      break;
    case 23:
      return "Grixis";
      break;
    case 24:
      return "Jund";
      break;
    case 25:
      return "Naya";
      break;
    case 26:
      return "Artificer";
      break;
    case 27:
      return "Enchantress";
      break;
    case 28:
      return "Snow";
      break;
    case 29:
      return "Spellslinger";
      break;
    case 30:
      return "Voltron";
      break;
    case 31:
      return "Coalition";
      break;
    case 32:
      return "Planeswalker";
      break;
    case 33:
      return "Colorless";
      break;
    case 34:
      return "Bolas";
      break;
    case 35:
      return "Phyrexia";
      break;
    case 36:
      return "Yawgmoth";
      break;
    case 37:
      return "Eldrazi";
      break;
    case 38:
      return "Five";
      break;
    case 39:
      return "Avacyn";
      break;
    case 40:
      return "Mirran";
      break;
    default:
      return "Blank";
      break;
  }
}