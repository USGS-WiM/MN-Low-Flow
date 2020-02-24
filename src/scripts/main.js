//////// NATHAN'S AMAZING MN-LOW-FLOW PROJECT ////////

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
var Sites;
var Huc8;
var measurementCounts;
var findCount = function() {return;};

//////// BEGIN removing and adding the layers ////////

function myFunction0(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(layer0);
	} else {
		map.removeLayer(layer0)
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
function myFunction9(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(Sites);
	} else {
		map.removeLayer(Sites)
	}}
function myFunction10(checkbox) {
	if(checkbox.checked == true){
		map.addLayer(Huc8);
	} else {
		map.removeLayer(Huc8)
	}};

//////// END removing and adding the layers ////////

$( document ).ready(function() {

//////// BEGIN create map + switching basemap utility ////////

L.Control.ZoomMin = L.Control.Zoom.extend({
	options: {
	  position: "topleft",
	  zoomInText: "+",
	  zoomInTitle: "Zoom in",
	  zoomOutText: "-",
	  zoomOutTitle: "Zoom out",
	  zoomMinText: "<i class='far fa-globe-americas'></i>",
	  zoomMinTitle: "Reset Zoom"
	},
  
	onAdd: function (map) {
	  var zoomName = "leaflet-control-zoom"
		, container = L.DomUtil.create("div", zoomName + " leaflet-bar")
		, options = this.options
  
	  this._map = map
  
	  this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
	   zoomName + '-in', container, this._zoomIn, this)
  
	  this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
	   zoomName + '-out', container, this._zoomOut, this)
  
	  this._zoomMinButton = this._createButton(options.zoomMinText, options.zoomMinTitle,
	   zoomName + '-min', container, this._zoomMin, this)
  
	  this._updateDisabled()
	  map.on('zoomend zoomlevelschange', this._updateDisabled, this)
  
	  return container
	},
  
	_zoomMin: function () {
	  if (this.options.minBounds) {
		//return this._map.fitBounds(this.options.minBounds);
	}
	  map.flyTo([46.39, -94.63], 7)
	},
  
	_updateDisabled: function () {
	  var map = this._map
		, className = "leaflet-disabled"
  
	  L.DomUtil.removeClass(this._zoomInButton, className)
	  L.DomUtil.removeClass(this._zoomOutButton, className)
	  L.DomUtil.removeClass(this._zoomMinButton, className)
  
	  if (map._zoom === map.getMinZoom()) {
		L.DomUtil.addClass(this._zoomOutButton, className)
	  }
  
	  if (map._zoom === map.getMaxZoom()) {
		L.DomUtil.addClass(this._zoomInButton, className)
	  }
  
	  if (map._zoom === map.getMinZoom()) {
		L.DomUtil.addClass(this._zoomMinButton, className)
	  }
	}
  })

	map = L.map('mapDiv', {
		layers: layer = L.esri.basemapLayer('Topographic'),
		center: [46.39, -94.63],
		zoom: 7,
		minZoom: 7,
		maxZoom: 16,
		zoomControl: false
	  })
	  
	  map.addControl(new L.Control.ZoomMin())	
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

	$('.basemap-button').on('click',function() {
		$(".basemap-button").removeClass("active");
	  	var baseMap = this.id.replace('btn','');
	  	switch (baseMap) {
		    case 'Streets': baseMap = 'Streets'; break;
		    case 'Satellite': baseMap = 'Imagery'; break;
		    case 'Topo': baseMap = 'Topographic'; break;
		    case 'Terrain': baseMap = 'ShadedRelief'; break;
		    case 'Gray': baseMap = 'Gray'; break;
		    case 'NatGeo': baseMap = 'NationalGeographic'; break;
		}
		setBasemap(baseMap);
		$(this).addClass("active")
	});

//////// END create map + switching basemap utility ////////

//////// BEGIN geosearch utility ////////

	var searchScript = document.createElement('script');
	searchScript.src = 'https://txpub.usgs.gov/DSS/search_api/1.1/api/search_api.min.js';
	searchScript.onload = function() {
		setSearchAPI();
	};
	document.body.appendChild(searchScript);

	function setSearchAPI() {
		search_api.on('load', function() {

			// setting the bounds of the search to MN Area //
			var mapBounds = map.getBounds();

			search_api.setOpts({
				'LATmin' : mapBounds.getSouth(),
				'LATmax' : mapBounds.getNorth(),
				'LONmin' : mapBounds.getWest(),
				'LONmax' : mapBounds.getEast()
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

				map.setView([lastLocationFound.y + 0.01, lastLocationFound.x], zoomlevel);

				L.popup()
					.setLatLng([lastLocationFound.y,lastLocationFound.x])
					.setContent(
							'<b>NAME:            </b> ' + lastLocationFound.name     + '<br/>' +
							'<b>CATEGORY:        </b> ' + lastLocationFound.category + '<br/>' +
							'<b>STATE:           </b> ' + lastLocationFound.state    + '<br/>' +
							'<b>COUNTY:          </b> ' + lastLocationFound.county   + '<br/>' +
							'<b>LATITUDE:        </b> ' + lastLocationFound.y        + '<br/>' +
							'<b>LONGITUDE:       </b> ' + lastLocationFound.x        + '<br/>' +
							'<b>ELEVATION (FEET):</b> ' + lastLocationFound.elevFt   + '<br/>'
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

//////// END geosearch utility ////////

//////// BEGIN about modal ////////

	function showAboutModal () {
		$('#aboutModal').modal('show');
	}
	$('#aboutNav').click(function(){
		showAboutModal();
	});

//////// END about modal ////////

//////// BEGIN latLngScale utility logic ////////

		map.whenReady( function() {
			var mapScale =  scaleLookup(map.getZoom());
			$('#scale')[0].innerHTML = mapScale;
			console.log('Initial Map scale registered as ' + mapScale, map.getZoom());
			var initMapCenter = map.getCenter();
			$('#latitude').html(initMapCenter.lat.toFixed(4));
			$('#longitude').html(initMapCenter.lng.toFixed(4));
		});
	
	//displays map scale on scale change (i.e. zoom level)
		map.on( 'zoomend', function () {
			var mapZoom = map.getZoom();
			var mapScale = scaleLookup(mapZoom);
			$('#scale')[0].innerHTML = mapScale;
			$('#zoomLevel')[0].innerHTML = mapZoom;
		});
	//updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes 'map center' label
		map.on( 'mousemove', function (cursorPosition) {
			$('#mapCenterLabel').css('display', 'none');
			if (cursorPosition.latlng !== null) {
				$('#latitude').html(cursorPosition.latlng.lat.toFixed(4));
				$('#longitude').html(cursorPosition.latlng.lng.toFixed(4));
			}
		});
	//updates lat/lng indicator to map center after pan and shows 'map center' label.
		map.on( 'dragend', function () {
			//displays latitude and longitude of map center
			$('#mapCenterLabel').css('display', 'inline');
			var geographicMapCenter = map.getCenter();
			$('#latitude').html(geographicMapCenter.lat.toFixed(4));
			$('#longitude').html(geographicMapCenter.lng.toFixed(4));
		});
		function scaleLookup(mapZoom) {
			switch (mapZoom) {
				case 19: return '1,128';
				case 18: return '2,256';
				case 17: return '4,513';
				case 16: return '9,027';
				case 15: return '18,055';
				case 14: return '36,111';
				case 13: return '72,223';
				case 12: return '144,447';
				case 11: return '288,895';
				case 10: return '577,790';
				case 9: return '1,155,581';
				case 8: return '2,311,162';
				case 7: return '4,622,324';
				case 6: return '9,244,649';
				case 5: return '18,489,298';
				case 4: return '36,978,596';
				case 3: return '73,957,193';
				case 2: return '147,914,387';
				case 1: return '295,828,775';
				case 0: return '591,657,550';
			}
		}

//////// END latLngScale utility logic ////////

//////// BEGIN defining each gage layer, grouping them, and showing them w/checkbox ////////

// defining each icon //
	
	var icon0 = L.icon({ iconUrl: 'images/markers/cont.png', iconAnchor: [7, 7], popupAnchor: [0, 0], iconSize: [16, 16]});
	var icon1 = L.icon({ iconUrl: 'images/markers/yellow.png', iconAnchor: [10, 10], popupAnchor: [0, 2], iconSize: [20, 20] })
	var icon2 = L.icon({ iconUrl: 'images/markers/green.png', iconAnchor: [10, 10], popupAnchor: [0, 2], iconSize: [20, 20] })
	var icon3 = L.icon({ iconUrl: 'images/markers/blue.png', iconAnchor: [10, 10], popupAnchor: [0, 2], iconSize: [20, 20] })

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
	$.getJSON("./data/LookupCount.json",
		function(json){
			measurementCounts = json;
			
			findCount = function(id){

				var found = measurementCounts[id];

				//console.log('id: ' + id + ' found: ' + found[0]);
				if (found > 0){
					if (found < 3) {
						return "s"
					}
					if (found >= 3 && found <= 10) {
						return "m"
					}
					if (found > 10) {
						return "l"
					} else {
						console.log("ERROR@: " + found);
					}
				}else{
					console.log("not found: " + id);
					return "m"
				}
			}});

			$.getJSON("./data/data.json",
				function (json) {
					//console.log(json);
					//console.log("measurements" + measurementCounts);
					for (var i = 0; i < json.items.length; i++) {
						var a = json.items[i];
						// links to data //
						var link = "https://mn.water.usgs.gov/infodata/lowflow/disContData/" + a.site_no + ".txt"
						var link2 = "https://mn.water.usgs.gov/infodata/lowflow/contData/freqOutput/" + a.site_no + ".txt"
						var link3 = "https://mn.water.usgs.gov/infodata/lowflow/contData/logNormal/p" + a.site_no + ".pdf"
						var link4 = "https://mn.water.usgs.gov/infodata/lowflow/contData/logPearson/p" + a.site_no + ".pdf"
						var link5 = "https://mn.water.usgs.gov/infodata/lowflow/contData/stationDescription/" + a.site_no + ".txt"
						var linkNWIS = "https://waterdata.usgs.gov/monitoring-location/" + a.site_no + "/"

						var content = "<label>Gage #: </label><b>" + a.site_no + "<label>Station: </label><b>" + a.station_nm + "</b><div class='leaflet-popup-buttons'><a class='btn-sm btn-primary' target='_blank' href='"+ link +"'> Data </a>"+
						"<a class='btn-sm btn-primary' target='_blank' href='"+ linkNWIS +"'> NWIS </a></div>";

						var content0 = "<label>Gage #: </label><b>" + a.site_no + "<label>Station: </label><b>" + a.station_nm + "</b><div class='leaflet-popup-buttons'><a class='btn-sm btn-primary' target='_blank' href='"+ link5 
						+"'> Station Description </a>" + "<a class='btn-sm btn-primary' target='_blank' href='"+ link2 +"'> Frequency Output </a>" 
						 + "<a class='btn-sm btn-primary' target='_blank' href='"+ link3 +"'> Log Normal </a>" + "<a class='btn-sm btn-primary' target='_blank' href='"
						+ link4 +"'> Log Pearson </a>" + "<a class='btn-sm btn-primary' target='_blank' href='"+ linkNWIS +"'> NWIS </a></div>";
					
						// continuous gages //
						if (a.pt_symbol == "symbol0") {
							var marker0 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
								radius: 3,
								fillOpacity: 0.95,
								icon: icon0
							}).bindPopup(content0); 
							layer0.addLayer(marker0)
						}
						if (a.pt_symbol !== "symbol0") {
							var category = findCount(a.site_no);
							if (category == "s"){
								var marker2 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
									radius: 3,
									fillOpacity: 0.95,
									icon: icon1
								}).bindPopup(content);
								layer2.addLayer(marker2);
						}
							if (category == "l") {
								var marker4 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
									radius: 3,
									fillOpacity: 0.95,
									icon: icon3
								}).bindPopup(content);
								layer4.addLayer(marker4);
						}
							if (category == "m") {
								var marker3 = L.marker(new L.LatLng(a['LATDD'], a['LONGDD']), {
									radius: 3,
									fillOpacity: 0.95,
									icon: icon2
								}).bindPopup(content);
								layer3.addLayer(marker3);
						}};
					if($("#Check9").prop('checked')) {
						map.addLayer(Sites)
					}
					if($("#Check10").prop('checked')) {
						map.addLayer(Huc8)
					}
					}
				});
					// checkboxes //
					if($("#Check0").prop('checked')) {
						map.addLayer(layer0)
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
		//////// END defining each gage layer, grouping them, and showing them w/checkbox ////////

		// Discharge Points //

		var iconFs = L.icon({
			iconUrl: 'images/markers/watershed.png',
			iconSize: [13,13]
		});
		Sites = L.esri.featureLayer({url:'https://pca-gis02.pca.state.mn.us/arcgis/rest/services/agol/ww_facility/MapServer/6',
			pointToLayer: function (feature, latlng) {
				//return L.marker(latlng, { icon:  iconFs} );
				var mypopup = L.popup().setContent("Permit Number : " + feature.properties.permit_number + "<br>"
				+ "Facility : " + feature.properties.ai_name + "<br>"
				+ "Station # : " + feature.properties.si_designation + "<br>" + "<br>"
				 + "Station description : " + feature.properties.description);
				var mymarker = L.marker(latlng, { icon:  iconFs} );
				mymarker.bindPopup(mypopup);
				return mymarker;               
			}
		});

		  // If MPCA layer is unavailable //
		//   if (map.hasLayer(Sites) == true ) {
		// 	$("#snackbar").hide()
		// } else {
		// 	$("#snackbar").show()
		// 	$("#snackbar").click(function(){
		// 		$("#snackbar").hide()
		// 	});
		// 	 };

		  //////// HUC 8 Layer ////////

		  Huc8 = L.esri.dynamicMapLayer({
			url: "https://gis.wim.usgs.gov/arcgis/rest/services/MNLowFlow/MNHuc8DarkRed/MapServer/",
			layers: [0]
		});

		map.on('click', function(e){
			//console.log(e);
			if (map.hasLayer(Huc8)){
				Huc8.identify().on(map).at(e.latlng).run(function (error, featureCollection) {
					if (error) {
						return false;
					}
					//only show popups if user clicks on a MN feature
					if (featureCollection.features[0].properties.STATES.indexOf("MN") >= 0) {
						var infos = featureCollection.features[0].properties
						//console.log(infos)
						var Huc8Popup = L.popup().setLatLng(e.latlng).setContent('<p></p><p><b>HUC8: </b>' + infos.HUC8 + '<br><b>Name: </b>' + infos.NAME + '<br><b>Area: </b>' + infos.AREASQKM + ' square kilometers</p>').openOn(map);
					} else {
						return false;

					}
				});
			}
			
		});
});