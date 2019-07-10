/**
 * Created by bdraper on 8/19/2015.
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////Example 4: stn sites from geojson, clustered
//// this example demonstrates display of 5000+ clustered points, all with the same symbol
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
		url: "http://wim.usgs.gov/STNData/stnSitesSmGeo.js",
		success: function (geojson) {

			console.log(geojson);

			var geojsonLayer = L.geoJson(geojson, {
				style: function (feature) {
					return {color: '#3366FF'};
				},
				pointToLayer: function (feature, latlng) {
					return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.95});
				},
				onEachFeature: function (feature, layer) {
					layer.bindPopup("Site number:" + feature.properties.SITE_NO);
				}
			});

			var markers = L.markerClusterGroup({disableClusteringAtZoom: 12});
			markers.addLayer(geojsonLayer);
			map.addLayer(markers);
			//map.addLayer(geojsonLayer);

			markers.on('click', function (a) {
				console.log('marker ' + a.layer);
			});


		}
	});
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////end stn sites clustered
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
