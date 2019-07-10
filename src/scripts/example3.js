/**
 * Created by bdraper on 8/19/2015.
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////Example 3: stn sites, from plain json, clustered
////// this example demonstrates display of 5000+ clustered points, all with the same symbol
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
$( document ).ready(function() {

	//for jshint
	'use strict';

	/* create map */
	var map = L.map('mapDiv').setView([39.833333, -98.583333], 4);
	var layer = L.esri.basemapLayer('Gray').addTo(map);
	var layerLabels;

	$('#mapDiv').height($('body').height());
	map.invalidateSize();
	$.ajax({
		dataType: "json",
		url: "http://wim.usgs.gov/STNData/stnSitesSm.js",
		success: function (json) {

			var markers = L.markerClusterGroup();

			for (var i = 0; i < json.length; i++) {
				var a = json[i];
				//var marker = L.marker(new L.LatLng(a['latitude'], a['longitude']), { title: title });
				var marker = L.circleMarker(new L.LatLng(a['latitude'], a['longitude']), {
					color: '#3366FF',
					radius: 3,
					fillOpacity: 0.95
				});
				marker.bindPopup("Site ID: " + a.SITE_NO);
				markers.addLayer(marker);
			}
			map.addLayer(markers);

		}
	});
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////end stn sites from plain json, clustered
///////////////////////////////////////////////////////////////////////////////////////////////////////////////