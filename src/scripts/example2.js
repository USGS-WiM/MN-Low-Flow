/**
 * Created by bdraper on 8/19/2015.
 */

///////////////////////////////////////////////////////////////////////////////////////////////////////
////Example 2: stn sites, from geojson, not clustered
//// this example demonstrates display of 5000+ points, all with the same symbol
////////////////////////////////////////////////////////////////////////////////////////////////////////
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

			map.addLayer(geojsonLayer);


		}
	});
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
////end stn sites, from geojson, not clustered
///////////////////////////////////////////////////////////////////////////////////////////////////////