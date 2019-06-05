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

function loadJSON(url,callback) {
	//https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
        if(req.readyState === 4){
            callback(req.responseText);
        }
    }
	req.overrideMimeType("application/json");
	req.open("GET", url, true);
	req.send();
}

function localize(page) {
	var lang = localStorage.getItem("language") ? localStorage.getItem("language") : "en";
	var url = getLanguage(lang);
	loadJSON(url,function(response){
		var jsonobj = JSON.parse(response);
		var translate = document.getElementsByClassName("loc");
		for(var i=0;i<translate.length;i++) {
			var keys = translate[i].id.split(".");
			translate[i].innerHTML = jsonobj[keys[0]][keys[1]];
		}
		
		var translate = document.getElementsByClassName("locph");
		for(var i=0;i<translate.length;i++) {
			translate[i].placeholder = jsonobj[page][translate[i].id];
		}
	});
	
	if(page == "index" || page == "about"){
		loadJSON("./loc/vv.json",function(response){
			var jsonobj = JSON.parse(response);
			var translate = document.getElementsByClassName("version");
			for(var i=0;i<translate.length;i++) {
				var keys = translate[i].id.split(".");
				translate[i].innerHTML = jsonobj[keys[0]][keys[1]];
			}
		});
	}
}

function getMessage(key,subkey) {
	var lang = localStorage.getItem("language") ? localStorage.getItem("language") : "en";
	var url = getLanguage(lang);
	loadJSON(url,function(response){
		var jsonobj = JSON.parse(response);
		console.log(jsonobj[key][subkey]);
	});
}

function configConfirmation(save) {
	/* this is ugly, but I can"t use return on async functions */
	var lang = localStorage.getItem("language") ? localStorage.getItem("language") : "en";
	var url = getLanguage(lang);
	loadJSON(url,function(response){
		var jsonobj = JSON.parse(response);
		sessionStorage.setItem("confTitle",jsonobj["exit"]["confirmation"]);
		sessionStorage.setItem("confMsg",jsonobj["exit"][save ? "savesession" : "areyousure"]);
		sessionStorage.setItem("confOptions",jsonobj["exit"]["yesno"]);
	});
}

function setLanguage(locale) {
	localStorage.setItem("language",locale);
}

function getLanguage(locale) {
	switch(locale) {
		case "br":
		case "BR":
		case "pt-BR":
		return "./loc/br.json";
		break;
		case "en":
		case "EN":
		case "en-US":
		default:
		return "./loc/en.json";
		break;
	}
}