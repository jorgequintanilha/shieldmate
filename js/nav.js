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

function initMenu() {
	if(document.getElementById("btnSide1")) {
		document.getElementById("btnSide1").addEventListener("click",function(){openSidebar("sidebar1","left");}, false)
		document.getElementById("btnSide1Close").addEventListener("click",function(){closeSidebars();},false);
	};
	
	if(document.getElementById("btnSide2")) {
		document.getElementById("btnSide2").addEventListener("click",function(){openSidebar("sidebar2","right");}, false);
		document.getElementById("btnSide2Close").addEventListener("click",function(){closeSidebars();},false);
	}
	
	if(document.getElementById("btnSide3")) {
		document.getElementById("btnSide3").addEventListener("click",function(){openSidebar("sidebar3","left");}, false);
		document.getElementById("btnSide3Close").addEventListener("click",function(){closeSidebars();},false);
	}
	
	if(document.getElementById("btnSide4")) {
		document.getElementById("btnSide4").addEventListener("click",function(){openSidebar("sidebar4","right");}, false);
		document.getElementById("btnSide4Close").addEventListener("click",function(){closeSidebars();},false);
	}
	
	if(document.getElementById("btnSide5")) {
		document.getElementById("btnSide5").addEventListener("click",function(){openSidebar("sidebar5","left");}, false);
		document.getElementById("btnSide5Close").addEventListener("click",function(){closeSidebars();},false);
	}
	
	if(document.getElementById("btnSide6")) {
		document.getElementById("btnSide6").addEventListener("click",function(){openSidebar("sidebar6","right");}, false);
		document.getElementById("btnSide6Close").addEventListener("click",function(){closeSidebars();},false);
	}
	
	var blanks = document.querySelectorAll("a[target='_blank']");
	for(var i=0; i<blanks.length;i++) {
		blanks[i].addEventListener("click", function(e) {
			e.preventDefault();
			window.open((e.currentTarget).getAttribute('href'), "_system", "");
		});
	}
}

function getViewportWidth() {
	return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function openSidebar(sidebar, side) {
	closeSidebars();
	document.getElementById(sidebar).style[side] = "0px";
}

function closeSidebars() {
	var offset = getViewportWidth();
	if(document.getElementById("btnSide1")) {document.getElementById("sidebar1").style["left"] = "-"+offset+"px"};
	if(document.getElementById("btnSide2")) {document.getElementById("sidebar2").style["right"] = "-"+offset+"px"};
	if(document.getElementById("btnSide3")) {document.getElementById("sidebar3").style["left"] = "-"+offset+"px"};
	if(document.getElementById("btnSide4")) {document.getElementById("sidebar4").style["right"] = "-"+offset+"px"};
	if(document.getElementById("btnSide5")) {document.getElementById("sidebar5").style["left"] = "-"+offset+"px"};
	if(document.getElementById("btnSide6")) {document.getElementById("sidebar6").style["right"] = "-"+offset+"px"};
}

