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

function initOptions() {
	var blanks = document.querySelectorAll("a[target='_blank']");
	for(var i=0; i<blanks.length;i++) {
		blanks[i].addEventListener("click", function(e) {
			e.preventDefault();
			window.open((e.currentTarget).getAttribute('href'), "_system", "");
		});
	}
	
	if (localStorage.getItem('autoRandom')==1) {
		document.getElementById('checkapplyrandom').checked = true;
		document.getElementById('checkapplydeftable').checked = false;
	}
	else if (localStorage.getItem('autoDefault')==1) {
		document.getElementById('checkapplydeftable').checked = true;
		document.getElementById('checkapplyrandom').checked = false;
	}

	if (localStorage.getItem('bindDamage')==1) {document.getElementById('checkbinddamage').checked = true;}
	if (localStorage.getItem('hideButtonsDef')==1) {document.getElementById('checkhidebuttons').checked = true;}
	if (localStorage.getItem('negativeLife')==1) {document.getElementById('checknegativelife').checked = true;}
	
	var playerlist = document.getElementById("playersList");
	var playernum = localStorage.getItem("numDefPlayers");
	for (var i=1; i<=playernum; i++) {
		if (localStorage.getItem("savedP"+i)) {
			var player = localStorage.getItem("savedP"+i).split(',');
			var playerhtml = "<div class='regPlayer row h08p col100p' id='rowP" + player[0] + "'>" 
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
					+ "<button class='btnMenu btnDefaultPlayer' onclick='openTableMap(" + player[0] + ")'></button>"
					+ "</div>"
					+ "<div class='h100p col10p'>"
					+ "<span class='fontGreen txt3 playerPosition' id='playerDefaultP" + player[0] + "'>" + isPlayerDefault(player[0]) + "</span>"
					+ "</div>";
			playerlist.insertAdjacentHTML("beforeend",playerhtml);
		}
		else { continue; }
	}

	setOptionsFunctions();
}

function getViewportWidth() {
	return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function setOptionsFunctions() {
	var deflp = localStorage.getItem('default_lp');
	if (!localStorage.getItem("numDefPlayers")) {localStorage.setItem("numDefPlayers","0");}
	if (deflp && deflp.length > 0) {document.getElementById('txtSetSideBarLifeSet').innerHTML ='('+deflp+')';}
	
	document.getElementById('btnLife20').addEventListener('click',function(){
		localStorage.setItem('default_lp',20);
		document.getElementById('txtSetSideBarLifeSet').innerHTML ='('+localStorage.getItem('default_lp')+')';
	},false);
	
	document.getElementById('btnLife25').addEventListener('click',function(){
		localStorage.setItem('default_lp',25);
		document.getElementById('txtSetSideBarLifeSet').innerHTML ='('+localStorage.getItem('default_lp')+')';
	},false);
	
	document.getElementById('btnLife30').addEventListener('click',function(){
		localStorage.setItem('default_lp',30);
		document.getElementById('txtSetSideBarLifeSet').innerHTML ='('+localStorage.getItem('default_lp')+')';
	},false);
	
	document.getElementById('btnLife40').addEventListener('click',function(){
		localStorage.setItem('default_lp',40);
		document.getElementById('txtSetSideBarLifeSet').innerHTML ='('+localStorage.getItem('default_lp')+')';
	},false);
	
	document.getElementById('btnLifeCS').addEventListener('click',function(){
		var x = prompt('ENTER CUSTOM VALUE');
		if (parseInt(x,10)) {
			if (parseInt(x,10) > 999) { localStorage.setItem('default_lp',999); }
			else { localStorage.setItem('default_lp',parseInt(x,10)); }
		}
		else if(x=='0') {
			localStorage.setItem('default_lp',0);
		}
		document.getElementById('txtSetSideBarLifeSet').innerHTML ='('+localStorage.getItem('default_lp')+')';
	},false);
	
	document.getElementById('checkapplyrandom').addEventListener('change',function(){
		if(document.getElementById('checkapplyrandom').checked) {
			document.getElementById('checkapplydeftable').checked = false;
			localStorage.setItem('autoRandom',1);
			localStorage.setItem('autoDefault',0);
		} 
		else {localStorage.setItem('autoRandom',0);}
	},false);
	
	document.getElementById('checkapplydeftable').addEventListener('change',function(){
		if(document.getElementById('checkapplydeftable').checked) {
			document.getElementById('checkapplyrandom').checked = false;
			localStorage.setItem('autoDefault',1);
			localStorage.setItem('autoRandom',0);
		} 
		else {localStorage.setItem('autoDefault',0);}
	},false);
	
	document.getElementById('checkbinddamage').addEventListener('change',function(){
		if(document.getElementById('checkbinddamage').checked) {
			localStorage.setItem('bindDamage',1);
		} 
		else {localStorage.setItem('bindDamage',0);}
	},false);
	
	document.getElementById('checkhidebuttons').addEventListener('change',function(){
		if(document.getElementById('checkhidebuttons').checked) {
			localStorage.setItem('hideButtonsDef',1);
		} 
		else {localStorage.setItem('hideButtonsDef',0);}
	},false);
	
	document.getElementById('checknegativelife').addEventListener('change',function(){
		if(document.getElementById('checknegativelife').checked) {
			localStorage.setItem('negativeLife',1);
		} 
		else {localStorage.setItem('negativeLife',0);}
	},false);
	
	document.getElementById("btnCloseTableMap").addEventListener("click", function () {
		toggleClass(document.getElementById("tablemap"), "invisible");
	}, false);
	
	var defbuttons = document.getElementsByClassName("btnDefPosition");
	for (var i=0; i < defbuttons.length; i++) {
		defbuttons[i].addEventListener("click", function () {
		  regDefaultPlayer(this.id.substring(1,2),document.getElementById("playerId").innerHTML);
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
				var playerhtml = "<div class='regPlayer row h08p col100p' id='rowP" + playernum + "'>" 
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
					+ "<button class='btnMenu btnDefaultPlayer' onclick='openTableMap(" + playernum + ")'></button>"
					+ "</div>"
					+ "<div class='h100p col10p'>"
					+ "<span class='fontGreen txt3 playerPosition' id='playerDefaultP" + playernum + "'>&nbsp;</span>"
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
}

function delPlayerRow(pnum) {
	var element = document.getElementById("rowP"+pnum);
	element.parentNode.removeChild(element);
	localStorage.removeItem("savedP"+pnum);
}

function openTableMap(playernum) {
	document.getElementById("playerId").innerHTML = playernum;
	toggleClass(document.getElementById("tablemap"), "invisible");
}

function regDefaultPlayer(pnum,id) {
	var player = localStorage.getItem("savedP"+id).split(',');
	
	localStorage.setItem("P" + pnum + "defID",player[0]);
	localStorage.setItem("P" + pnum + "name",player[1]);
	localStorage.setItem("P" + pnum + "style",player[2]);
	
	var playerPosList = document.getElementsByClassName("playerPosition");
	for (var j = 0; j < playerPosList.length; j++) {
		if (playerPosList[j].innerHTML == pnum) { playerPosList[j].innerHTML = "&nbsp;" }
	}
	
	document.getElementById("playerDefaultP"+id).innerHTML = pnum;
}

function isPlayerDefault(id) {
	var pnum = "&nbsp;";
	for (var i = 1; i < 7; i++) {
		pnum = localStorage.getItem("P" + i + "defID") == id ? i : pnum;
	}
	return pnum;
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

function hasClass(elem, className) {
  return new RegExp(" " + className + " ").test(" " + elem.className + " ");
}