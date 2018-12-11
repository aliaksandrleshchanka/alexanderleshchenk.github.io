function Map (list) {
	this.list = list;

	this.getList = function() {
		var elem = document.getElementById('list');
		list = this.list;
		elem.innerHTML = '<ul id="listComp">';
		var elem1 = document.getElementById('listComp');
		 for (var i in list) {
		 	elem1.innerHTML += '<li>' + list[i] + '</li>\n';
		 }
		 
		
	}

	this.getMarker = function(){
		var mapList = normalize(this.list);
		 for(var i in mapList){
		 var layer = L.marker([mapList[i].sh,mapList[i].dol]);
		 layer.addTo(map);
		 layer.bindPopup(mapList[i].cityName);
		}
		for(var i in mapList){
		 var layer = L.marker([mapList[i].sh,mapList[i].dol]);
		 layer.addTo(map1);
		 layer.bindPopup(mapList[i].cityName);
		}
	}

	this.addElem = function() {
		var list = this.list;
		var cityName = document.getElementById("cityName").value;
		var abbreviation = document.getElementById("abbreviation").value;
		var newLatitude = document.getElementById("newLatitude").value;
		var newLongitude = document.getElementById("newLongitude").value;
		var newElem = '"'+cityName+', ' + abbreviation + '", ' + newLatitude + ', ' + newLongitude;
		list.push('"'+cityName+', ' + abbreviation + '", ' + newLatitude + ', ' + newLongitude);
		var layer = L.marker([newLatitude,newLongitude]);
		 layer.addTo(map);
		 layer.bindPopup('"'+ cityName+ ', '+ abbreviation+'"');
		this.getList();
	}

	this.delElem = function() {
		var del = document.getElementById("deleteNumber").value - 1;
		var list = this.list;
		list.splice(del,1);
		this.getList();
	}


	this.first = function() {
		var mapList = normalize(this.list);
		var name = document.getElementById("sizeOf").value;
		var sortable = [];
		var sortableTwo = [];
		for (var i in mapList) {
			sortable.push(mapList[i].sh);
			sortableTwo.push(mapList[i].dol);
		}
		sortable.sort(function(a,b) {
			return a-b;
		});
		sortableTwo.sort(function(a,b) {
			return a-b;
		});
		if(name == "southernmost") {
			for (var i in mapList) {	
				if(sortable[0]== mapList[i].sh){
					var elem = document.getElementById('resultFirst');
 					elem.innerHTML = "The southernmost city is <strong>" + mapList[i].cityName + "</strong>";
				}
			};
		} else if(name == "northernmost") {
			sortable.reverse();
			for (var i in mapList) {	
				if(sortable[0]== mapList[i].sh){
					var elem = document.getElementById('resultFirst');
 					elem.innerHTML = "The northernmost city is <strong>" + mapList[i].cityName + "</strong>";
				}
			};
		} else if (name == "westernmost") {
			for (var i in mapList) {	
				if(sortableTwo[0]==mapList[i].dol) {
					var elem = document.getElementById('resultFirst');
 					elem.innerHTML = "The westernmost city is <strong>" + mapList[i].cityName + "</strong>";
 				}
			};
		} else if(name == "easternmost") {
			sortableTwo.reverse();
			for (var i in mapList) {	
				if(sortableTwo[0]==mapList[i].dol) {
					var elem = document.getElementById('resultFirst');
 					elem.innerHTML = "The easternmost city is <strong>" + mapList[i].cityName + "</strong>";
 				}
			};
		} else {
			var elem = document.getElementById('resultFirst');
 			elem.innerHTML = "Uncorrect form! Change size of the world and try again";
 		};
	}

	this.second = function() {
		var mapList = normalize(this.list); 
		var sh0 = document.getElementById("latitude").value;
		var dol0 = document.getElementById("longitude").value;
		var layer = L.marker([sh0,dol0]);
		 layer.addTo(map1);
		 layer.bindPopup('Your latitude and longitude');
		if (sh0.length == 0) {
			var elem = document.getElementById('resultTwo');
			elem.innerHTML = "Please enter latitude";
			return false;
		}else if (dol0.length == 0) {
			var elem = document.getElementById('resultTwo');
			elem.innerHTML = "Please enter longitude";
			return false;
		};
		var lineLength = [];
		var lineLengthSorteble = [];
		var it = 0;
		for(var iter in mapList) {
			var i = 0;
			i = Math.sqrt(Math.pow(mapList[iter].sh - sh0,2) + Math.pow(mapList[iter].dol - dol0,2));
			lineLength.push(i);
		}
		for(var iter in lineLength) {
			lineLengthSorteble.push(lineLength[iter]);
		}
		lineLengthSorteble.sort(function(a,b) {
			return a-b;
		});
		while(lineLengthSorteble[0] !== lineLength[it])
			it++;
		var elem = document.getElementById('resultTwo');
		elem.innerHTML = "The name of the city that closest to that location is <strong>" + mapList[it].cityName + "</strong>";
		var latlngs = [
   		 [sh0, dol0],
    	[mapList[it].sh, mapList[it].dol]
		];
		var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map1);
	}

	this.third = function() {
		var mapList = normalize(this.list); 
		var idCity = [];
		for (var i in mapList) {
			idCity.push(mapList[i].cityName);
			var lineSlice = idCity[i].slice(-3,-1);
			idCity[i] = lineSlice;
		}
		for(var i in idCity) {
			for(var j in idCity) {
				if(i !== j) {
					if(idCity[i] == idCity[j]) {
						idCity.splice(idCity[i],1);
					};
				};
			};
		};
		var id = idCity.join(" ");
		var elem = document.getElementById('resultThree');
		elem.innerHTML = "<strong>" + id + "</strong>";
	}

}

function normalize(list) {
		var mapList = [];
		for (var i in list) {
			var result = list[i].split(/, /);
			if(result.length == 4){
					var cn = result[0] + ", " +result[1];
				} else {
					var cn = result[0] + result[1] +", " + result[2];
				}
			var sh1 = result[result.length - 2];
			var dl1 = result[result.length - 1];
			var t = {
				cityName: cn ,
				sh: sh1,
				dol: dl1
			};
			mapList.push(t);
		}
		return mapList;
	}

var mpList = new Map([
	'"Nadolville, TN", 36.17, -86.78',
	'"New York, NY", 40.71, -74.00',
	'"Atlanta, GA", 33.75, -84.39',
	'"Denver, CO", 39.74, -104.98',
	'"Seattle, WA", 47.61, -122.33',
	'"Los Angeles, CA", 34.05, -118.24',
	'"Memphis, TN", 35.15, -90.05'
	]);



console.log("hi!");


var map = L.map('map', {
	zoom: 4,
	center: [38.16857,-94.25285]
});
L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 15
	}).addTo(map);

var map1 = L.map('map1', {
	zoom: 4,
	center: [38.16857,-94.25285]
});
L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 15
	}).addTo(map1);

// L.marker([40.17,-86.78]).addTo(map);
// const customIcon = L.icon({
//   iconUrl: 'icon.png',
//   iconSize: [100, 100],
// });