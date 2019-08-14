// NATHAN'S AMAZING MN-LOW-FLOW PROJECT //

var map;
var layer0;
var layer1;
var layer2;
var layer3;
var layer4;
var layer5;
var layer6;
var layer7;
var layer8;

// removing and adding the layers when boxes are checked/unchecked //
function myFunction0(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(layer0);
	} else {
		map.removeLayer(layer0)
	}}
function myFunction1(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(layer1);
	} else {
		map.removeLayer(layer1)
	}}
function myFunction2(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(layer2);
	} else {
		map.removeLayer(layer2)
	}}
function myFunction3(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(layer3);
	} else {
		map.removeLayer(layer3)
	}}
function myFunction4(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(layer4);
	} else {
		map.removeLayer(layer4)
	}}
function myFunction5(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(layer5);
	} else {
		map.removeLayer(layer5)
	}}
function myFunction6(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(layer6);
	} else {
		map.removeLayer(layer6)
	}}
function myFunction7(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(layer7);
	} else {
		map.removeLayer(layer7)
	}}
function myFunction8(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(layer8);
	} else {
		map.removeLayer(layer8)
	}}

	function setBasemap(basemap) {
		if (layer) {
		  map.removeLayer(layer);
		}
	
		layer = L.esri.basemapLayer(basemap);
	
		map.addLayer(layer);
	
		if (layerLabels) {
		  map.removeLayer(layerLabels);
		}
	
		if (basemap === 'ShadedRelief'
		 || basemap === 'Oceans'
		 || basemap === 'Gray'
		 || basemap === 'DarkGray'
		 || basemap === 'Terrain'
	   ) {
		  layerLabels = L.esri.basemapLayer(basemap + 'Labels');
		  map.addLayer(layerLabels);
		} else if (basemap.includes('Imagery')) {
		  layerLabels = L.esri.basemapLayer('ImageryLabels');
		  map.addLayer(layerLabels);
		}
	  }
	
	  function changeBasemap(button){
		var basemap = button.value;
		setBasemap(basemap);
	  }

$( document ).ready(function() {

	/* create map */
	map = L.map('mapDiv').setView([46.39, -94.63], 6);
	var layer = L.esri.basemapLayer('Topographic').addTo(map);
	var layerLabels;

	map.addControl( L.control.search() );

	$('#mapDiv').height($('body').height());
	map.invalidateSize();

// defining each icon //
	var icon0 = L.icon({iconUrl: 'images/image1.png', iconAnchor: [8, 8], popupAnchor: [0, 2], iconSize: [16,16]});
	var icon1 = L.icon({iconUrl: 'images/image2.png', iconAnchor: [8, 8], popupAnchor: [0, 2], iconSize: [16,16]});
	var icon2 = L.icon({iconUrl: 'images/rdg.png', iconAnchor: [8, 8], popupAnchor: [0, 2], iconSize: [16,16]});
	var icon3 = L.icon({iconUrl: 'images/image3.png', iconAnchor: [8, 8], popupAnchor: [0, 2], iconSize: [16,16]});
	var icon4 = L.icon({iconUrl: 'images/image4.png', iconAnchor: [8, 8], popupAnchor: [0, 2], iconSize: [16,16]});
	var icon5 = L.icon({iconUrl: 'images/image5.png', iconAnchor: [8, 8], popupAnchor: [0, 2], iconSize: [16,16]});
	var icon6 = L.icon({iconUrl: 'images/image6.png', iconAnchor: [8, 8], popupAnchor: [0, 2], iconSize: [16,16]});
	var icon7 = L.icon({iconUrl: 'images/nwis.png', iconAnchor: [8, 8], popupAnchor: [0, 2], iconSize: [16,16]});
	var icon8 = L.icon({iconUrl: 'images/image8.png', iconAnchor: [8, 8], popupAnchor: [0,2], iconSize: [16,16]})


	layer0 = L.layerGroup();
	layer1 = L.layerGroup();
	layer2 = L.layerGroup();
	layer3 = L.layerGroup();
	layer4 = L.layerGroup();
	layer5 = L.layerGroup();
	layer6 = L.layerGroup();
	layer7 = L.layerGroup();
	layer8 = L.layerGroup();

	// JSON DATA //
	$.ajax({
		dataType: "json",
		url: "./data/data.json",
		success: function (json) {

			console.log(json);

			for (var i = 0; i < json.items.length; i++) {
				var a = json.items[i];
				var data = a.site_no;
				var link = "https://mn.water.usgs.gov/infodata/lowflow/disContData/" + data + ".txt"

				 // continuous gages //
				if (a.pt_symbol == "symbol0") {
					
					var marker0 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon0
					}).bindPopup("Station: " + a.station_nm + " " + link);
					layer0.addLayer(marker0)
				}
				// regulated gages //
				if (a.pt_symbol == "symbol1") {
					
					var marker1 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon1
					}).bindPopup("Station: " + a.station_nm + " " + link);
					layer1.addLayer(marker1)
				}
				// discontinuous gages (0-1 years) //
				if (a.pt_symbol == "symbol2") {
					
					var marker2 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon2
					}).bindPopup("Station: " + a.station_nm + " " + link);
					layer2.addLayer(marker2)
				}
				// discontinuous gages (2-5 years) //
				if (a.pt_symbol == "symbol3") {
					
					var marker3 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon3
					}).bindPopup("Station: " + a.station_nm + " " + link);
					layer3.addLayer(marker3)
				}
				// discontinuous gages (6-10 years) //
				if (a.pt_symbol == "symbol4") {
					
					var marker4 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon4
					}).bindPopup("Station: " + a.station_nm + " " + link);
					layer4.addLayer(marker4)
				}
				// discontinuous gages (10-15 years) //
				if (a.pt_symbol == "symbol5") {
					
					var marker5 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon5
					}).bindPopup("Station: " + a.station_nm + " " + link);
					layer5.addLayer(marker5)
				}
				// discontinuous gages (16-25 years) //
				if (a.pt_symbol == "symbol6") {
					
					var marker6 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon6
					}).bindPopup("Station: " + a.station_nm + " " + link);
					layer6.addLayer(marker6)
				}
				// discontinuous gages (26-49 years) //
				if (a.pt_symbol == "symbol7") {
					
					var marker7 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon7
					}).bindPopup("Station: " + a.station_nm + " " + link);
					layer7.addLayer(marker7)
				}
				// discontinuous gages (50+ years) //
				if (a.pt_symbol == "symbol8") {
					
					var marker8 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon8
					}).bindPopup("Station: " + a.station_nm + " " + link);
					layer8.addLayer(marker8)
				}
			}
			if($("#Check0").prop('checked')) {
				map.addLayer(layer0)
			}
			if($("#Check1").prop('checked')) {
				map.addLayer(layer1)
			}
			if($("#Check2").prop('checked')) {
				map.addLayer(layer2)
			}
			if($("#Check3").prop('checked')) {
				map.addLayer(layer3)
			}
			if($("#Check4").prop('checked')) {
				map.addLayer(layer4)
			}
			if($("#Check5").prop('checked')) {
				map.addLayer(layer5)
			}
			if($("#Check6").prop('checked')) {
				map.addLayer(layer6)
			}
			if($("#Check7").prop('checked')) {
				map.addLayer(layer7)
			}
			if($("#Check8").prop('checked')) {
				map.addLayer(layer8)
			}
		}
	});
});