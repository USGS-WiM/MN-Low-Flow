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

$( document ).ready(function() {

	/* create map */
	map = L.map('mapDiv').setView([46.39, -94.63], 6);
	var layer = L.esri.basemapLayer('Topographic').addTo(map);
	var layerLabels;

	$('#mapDiv').height($('body').height());
	map.invalidateSize();

	function setBasemap(basemap) {
	    if (layer) {
	      map.removeLayer(layer);
	    }
	    layer = L.esri.basemapLayer(basemap);
	    map.addLayer(layer);
	    if (layerLabels) {
	      map.removeLayer(layerLabels);
	    }

	    if (basemap === 'ShadedRelief' || basemap === 'Oceans' || basemap === 'Gray' || basemap === 'DarkGray' || basemap === 'Imagery' || basemap === 'Terrain') {

	      layerLabels = L.esri.basemapLayer(basemap + 'Labels');
	      map.addLayer(layerLabels);
	    }
	}

	$('.basemapBtn').on('click',function() {
	  	var baseMap = this.id.replace('btn','');

	  	// https://github.com/Esri/esri-leaflet/issues/504 submitted issue that esri-leaflet basemaps dont match esri jsapi

	  	switch (baseMap) {
		    case 'Streets': baseMap = 'Streets'; break;
		    case 'Satellite': baseMap = 'Imagery'; break;
		    case 'Topo': baseMap = 'Topographic'; break;
		    case 'Terrain': baseMap = 'ShadedRelief'; break;
		    case 'Gray': baseMap = 'Gray'; break;
		    case 'NatGeo': baseMap = 'NationalGeographic'; break;
		}

		setBasemap(baseMap);

	});

	var searchScript = document.createElement('script');
	searchScript.src = 'https://txpub.usgs.gov/DSS/search_api/1.1/api/search_api.min.js';
	searchScript.onload = function() {
		setSearchAPI();
	};
	document.body.appendChild(searchScript);

	function setSearchAPI() {
		// setup must be done after the search_api is loaded and ready ('load' event triggered)
		search_api.on('load', function() {

			$('#chkExtent').change(function(){
				if($(this).is(':checked')){
					console.log('Checked',map.getBounds().getSouth(),map.getBounds().getNorth(),map.getBounds().getWest(),map.getBounds().getEast());
					var mapBounds = map.getBounds();

					search_api.setOpts({
						'LATmin' : mapBounds.getSouth(),
						'LATmax' : mapBounds.getNorth(),
						'LONmin' : mapBounds.getWest(),
						'LONmax' : mapBounds.getEast()
					});
				}
			});

			search_api.setOpts({
				'textboxPosition': 'user-defined',
				'theme': 'user-defined',
				'DbSearchIncludeUsgsSiteSW': true,
				'DbSearchIncludeUsgsSiteGW': true,
				'DbSearchIncludeUsgsSiteSP': true,
				'DbSearchIncludeUsgsSiteAT': true,
				'DbSearchIncludeUsgsSiteOT': true
			});
			
			// define what to do when a location is found
			search_api.on('location-found', function(lastLocationFound) {

				$('#geosearchModal').modal('hide');

				var zoomlevel = 14;
				if (lastLocationFound.Category === 'U.S. State or Territory') zoomlevel = 9;

				map.setView([lastLocationFound.y, lastLocationFound.x], zoomlevel);

				L.popup()
					.setLatLng([lastLocationFound.y,lastLocationFound.x])
					.setContent(
						'<p>' +
							'<b>' + lastLocationFound.label + '</b> '                + '<br/>' +
							'<br/>' +
							'<b>NAME:            </b> ' + lastLocationFound.name     + '<br/>' +
							'<b>CATEGORY:        </b> ' + lastLocationFound.category + '<br/>' +
							'<b>STATE:           </b> ' + lastLocationFound.state    + '<br/>' +
							'<b>COUNTY:          </b> ' + lastLocationFound.county   + '<br/>' +
							'<br/>' +
							'<b>LATITUDE:        </b> ' + lastLocationFound.y        + '<br/>' +
							'<b>LONGITUDE:       </b> ' + lastLocationFound.x        + '<br/>' +
							'<b>ELEVATION (FEET):</b> ' + lastLocationFound.elevFt   + '<br/>' +
							'<br/>' +
							'<b>PERCENT MATCH:   </b> ' + lastLocationFound.pctMatch + '<br/>' +
						'</p>'
					)
					.openOn(map);

			});
			
			// define what to do when no location is found
			search_api.on('no-result', function() {
				// show alert dialog
				console.error('No location matching the entered text could be found.');
			});
			
			// define what to do when a search times out
			search_api.on('timeout', function() {
				// show alert dialog
				console.error('The search operation timed out.');
			});
		});


		$('#searchSubmit').on('click', function(){
			console.log('in search submit');
			$('#sapi-searchTextBox').keyup();
		});
	}

	$('.check').on('click', function(){
		$(this).find('span').toggle();
	});

	function showGeosearchModal() {
		$('#geosearchModal').modal('show');
	}
	$('#geosearchNav').click(function(){
		showGeosearchModal();
	});
	function showAboutModal () {
		$('#aboutModal').modal('show');
	}
	$('#aboutNav').click(function(){
		showAboutModal();
	});

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
				var link = "https://mn.water.usgs.gov/infodata/lowflow/disContData/" + a.site_no + ".txt"
				var link2 = "https://mn.water.usgs.gov/infodata/lowflow/contData/freqOutput/" + a.site_no + ".txt"
				var link3 = "https://mn.water.usgs.gov/infodata/lowflow/contData/logNormal/p" + a.site_no + ".pdf"
				var link4 = "https://mn.water.usgs.gov/infodata/lowflow/contData/logPearson/p" + a.site_no + ".pdf"
				var link5 = "https://mn.water.usgs.gov/infodata/lowflow/contData/stationDescription/" + a.site_no + ".txt"

				 // continuous gages //
				if (a.pt_symbol == "symbol0") {
					
					var marker0 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon0
					}).bindPopup("Station: " + a.station_nm + "<br>" + "<a href='"+ link5 +"'> Station Description </a>" + "<br>" + "<a href='"+ link2 +"'> Frequency Output </a>" + "<br>" + "<a href='"+ link3 +"'> Log Normal </a>" + "<br>" + "<a href='"+ link4 +"'> Log Pearson </a>"); 
					layer0.addLayer(marker0)
				}
				// regulated gages //
				if (a.pt_symbol == "symbol1") {
					
					var marker1 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon1
					}).bindPopup("Station: " + a.station_nm + "<br>" + "<a href='"+ link +"'> Data </a>");
					layer1.addLayer(marker1)
				}
				// discontinuous gages (0-1 years) //
				if (a.pt_symbol == "symbol2") {
					
					var marker2 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon2
					}).bindPopup("Station: " + a.station_nm + "<br>" + "<a href='"+ link +"'> Data </a>");
					layer2.addLayer(marker2)
				}
				// discontinuous gages (2-5 years) //
				if (a.pt_symbol == "symbol3") {
					
					var marker3 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon3
					}).bindPopup("Station: " + a.station_nm + "<br>" + "<a href='"+ link +"'> Data </a>");
					layer3.addLayer(marker3)
				}
				// discontinuous gages (6-10 years) //
				if (a.pt_symbol == "symbol4") {
					
					var marker4 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon4
					}).bindPopup("Station: " + a.station_nm + "<br>" + "<a href='"+ link +"'> Data </a>");
					layer4.addLayer(marker4)
				}
				// discontinuous gages (10-15 years) //
				if (a.pt_symbol == "symbol5") {
					
					var marker5 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon5
					}).bindPopup("Station: " + a.station_nm + "<br>" + "<a href='"+ link +"'> Data </a>");
					layer5.addLayer(marker5)
				}
				// discontinuous gages (16-25 years) //
				if (a.pt_symbol == "symbol6") {
					
					var marker6 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon6
					}).bindPopup("Station: " + a.station_nm + "<br>" + "<a href='"+ link +"'> Data </a>");
					layer6.addLayer(marker6)
				}
				// discontinuous gages (26-49 years) //
				if (a.pt_symbol == "symbol7") {
					
					var marker7 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon7
					}).bindPopup("Station: " + a.station_nm + "<br>" + "<a href='"+ link +"'> Data </a>");
					layer7.addLayer(marker7)
				}
				// discontinuous gages (50+ years) //
				if (a.pt_symbol == "symbol8") {
					
					var marker8 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
						radius: 3,
						fillOpacity: 0.95,
						icon: icon8
					}).bindPopup("Station: " + a.station_nm + "<br>" + "<a href='"+ link +"'> Data </a>");
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