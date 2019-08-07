// Generated on 2015-08-12 using generator-wim 0.0.1

//main document ready function
$( document ).ready(function() {

	//for jshint
	//'use strict';
    //
	///* create map */
	//var map = L.map('mapDiv').setView([39.833333, -98.583333], 4);
	//var layer = L.esri.basemapLayer('Gray').addTo(map);
	//var layerLabels;
    //
	//$('#mapDiv').height($('body').height());
	//map.invalidateSize();


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////Example 1: stn sites from plain json, not clustered(5000+ sites, all the same symbol)
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//$.ajax({
	//	dataType: "json",
	//	url: "http://wim.usgs.gov/STNData/stnSitesSm.js",
	//	success: function (json) {
    //
	//		//var markers = [];
    //
	//		for (var i = 0; i < json.length; i++) {
	//			var a = json[i];
	//			//var marker = L.marker(new L.LatLng(a['latitude'], a['longitude']), { title: title });
	//			var marker = L.circleMarker(new L.LatLng(a['latitude'], a['longitude']), {color: '#3366FF', radius: 3, fillOpacity: 0.95 });
	//			marker.bindPopup("Site ID: " + a.SITE_NO);
	//			//markers.addLayer(marker);
	//			map.addLayer(marker);
	//		}
    //
    //
	//	}
	//});
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////end stn sites from plain json, not clustered
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////////////////////////////////
	////Example 2: stn sites, from geojson, not clustered (5000+ sites, all the same symbol)
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//$.ajax({
	//	dataType: "json",
	//	url: "http://wim.usgs.gov/STNData/stnSitesSmGeo.js",
	//	success: function (geojson) {
	//
	//		var geojsonLayer = L.geoJson(geojson, {
	//			style: function(feature) {
	//				return {color: '#3366FF'};
	//			},
	//			pointToLayer: function(feature, latlng) {
	//				return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.95});
	//			},
	//			onEachFeature: function (feature, layer) {
	//				layer.bindPopup("Site number:" + feature.properties.SITE_NO);
	//			}
	//		});
	//
	//		map.addLayer(geojsonLayer);
	//
	//
	//	}
	//});
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	////end stn sites, from geojson, not clustered
	///////////////////////////////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////Example 3: stn sites, from plain json, clustered (5000+ sites, all the same symbol)
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//$.ajax({
	//	dataType: "json",
	//	url: "http://wim.usgs.gov/STNData/stnSitesSm.js",
	//	success: function (json) {
	//
	//		var markers = L.markerClusterGroup();
	//
	//		for (var i = 0; i < json.length; i++) {
	//			var a = json[i];
	//			//var marker = L.marker(new L.LatLng(a['latitude'], a['longitude']), { title: title });
	//			var marker = L.circleMarker(new L.LatLng(a['latitude'], a['longitude']), {color: '#3366FF', radius: 3, fillOpacity: 0.95 });
	//			marker.bindPopup("Site ID: " + a.SITE_NO);
	//			markers.addLayer(marker);
	//		}
	//		map.addLayer(markers);
	//
	//	}
	//});
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////end stn sites from plain json, clustered
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////Example 4: stn sites from geojson, clustered
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//$.ajax({
	//	dataType: "json",
	//	url: "http://wim.usgs.gov/STNData/stnSitesSmGeo.js",
	//	success: function (geojson) {
    //
	//		console.log(geojson);
    //
	//		var geojsonLayer = L.geoJson(geojson, {
	//			style: function(feature) {
	//				return {color: '#3366FF'};
	//			},
	//			pointToLayer: function(feature, latlng) {
	//				return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.95});
	//			},
	//			onEachFeature: function (feature, layer) {
	//				layer.bindPopup("Site number:" + feature.properties.SITE_NO);
	//			}
	//		});
    //
	//		var markers = L.markerClusterGroup({disableClusteringAtZoom: 12});
	//		markers.addLayer(geojsonLayer);
	//		map.addLayer(markers);
	//		//map.addLayer(geojsonLayer);
    //
	//		markers.on('click', function (a) {
	//			console.log('marker ' + a.layer);
	//		});
    //
    //
	//	}
	//});
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////end stn sites clustered
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	////Example 5: sandy sensors from plain json, unclustered, symbolized by type (235 sites, symbolized by category in attributes)
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//$.ajax({
	//	dataType: "json",
	//	url: "http://stn.wim.usgs.gov/STNServices/Instruments.json?Event=24&EventType=&EventStatus=0&States=&County=&CurrentStatus=&CollectionCondition=&DeploymentType=",
	//	success: function (json) {
    //
	//		console.log(json);
    //
	//		//var markers = L.markerClusterGroup({disableClusteringAtZoom: 12});
    //
	//		for (var i = 0; i < json.length; i++) {
	//			var a = json[i];
    //
	//			var marker = L.circleMarker(new L.LatLng(a['LATITUDE'], a['LONGITUDE']), { radius: 3, fillOpacity: 0.95 });
    //
	//			//Baro
	//			if (a.SENSOR_TYPE_ID == 1 && a.DEPLOYMENT_TYPE_ID == 3) {marker.setStyle({color: '#FFFF00'});}
	//			//meteorological
	//			if (a.SENSOR_TYPE_ID == 2 ) {marker.setStyle({color: '#FFC0CB'});}
	//			//rapid deploy gage
	//			if (a.SENSOR_TYPE_ID == 5 ) {marker.setStyle({color: '#32BF32'});}
	//			//storm tide
	//			if (a.SENSOR_TYPE_ID == 1 && a.DEPLOYMENT_TYPE_ID == 1 || a.DEPLOYMENT_TYPE_ID == 2 ) {marker.setStyle({color: '#FF0000'});}
	//			//wave height
	//			if (a.SENSOR_TYPE_ID == 1 && a.DEPLOYMENT_TYPE_ID == 1) {marker.setStyle({color: '#800080'});}
    //
	//			marker.bindPopup("Site ID: " + a.SITE_NO);
	//			map.addLayer(marker);
    //
	//		}
    //
	//	}
	//});
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////end sandy sensors from plain json, unclustered, symbolized by type
	//////////////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	////Example 6: sandy sensors from geojson, unclustered, symbolized by type (235 sites, symbolized by category in attributes)
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//$.ajax({
	//	dataType: "json",
	//	url: "http://wim.usgs.gov/STNData/sensors/sandygeoJSON.js",
	//	success: function (geojson) {
    //
	//		console.log(geojson);
    //
	//		var geojsonLayer = L.geoJson(geojson, {
	//			style: function(feature) {
    //
	//				//Baro
	//				if (feature.properties.SENSOR_TYPE_ID == 1 && feature.properties.DEPLOYMENT_TYPE_ID == 3) {return {color: '#FFFF00'};}
	//				//meteorological
	//				if (feature.properties.SENSOR_TYPE_ID == 2 ) {return {color: '#FFC0CB'};}
	//				//rapid deploy gage
	//				if (feature.properties.SENSOR_TYPE_ID == 5 ) {return {color: '#32BF32'};}
	//				//storm tide
	//				if (feature.properties.SENSOR_TYPE_ID == 1 && feature.properties.DEPLOYMENT_TYPE_ID == 1 || feature.properties.DEPLOYMENT_TYPE_ID == 2 ) {return {color: '#FF0000'};}
	//				//wave height
	//				if (feature.properties.SENSOR_TYPE_ID == 1 && feature.properties.DEPLOYMENT_TYPE_ID == 1) {return {color: '#800080'};}
    //
	//			},
	//			pointToLayer: function(feature, latlng) {
	//				return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.95});
	//			},
	//			onEachFeature: function (feature, layer) {
	//				layer.bindPopup("Site number:" + feature.properties.SITE_NO);
	//			}
	//		});
    //
	//		//var markers = L.markerClusterGroup({disableClusteringAtZoom: 12});
	//		//markers.addLayer(geojsonLayer);
	//		//map.addLayer(markers);
	//		map.addLayer(geojsonLayer);
    //
	//		markers.on('click', function (a) {
	//			console.log('marker ' + a.layer);
	//		});
    //
	//	}
	//});
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	////end sandy sensors from geojson, unclustered, symbolized by type
	////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	////Example 7: sandy sensors from plain json, clustered, symbolized by type (235 sites, symbolized by category in attributes)
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//$.ajax({
	//	dataType: "json",
	//	url: "http://stn.wim.usgs.gov/STNServices/Instruments.json?Event=24&EventType=&EventStatus=0&States=&County=&CurrentStatus=&CollectionCondition=&DeploymentType=",
	//	success: function (json) {
    //
	//		console.log(json);
    //
	//		var markers = L.markerClusterGroup({disableClusteringAtZoom: 12});
    //
	//		for (var i = 0; i < json.length; i++) {
	//			var a = json[i];
    //
	//			var marker = L.circleMarker(new L.LatLng(a['LATITUDE'], a['LONGITUDE']), { radius: 3, fillOpacity: 0.95 });
    //
	//			//Baro
	//			if (a.SENSOR_TYPE_ID == 1 && a.DEPLOYMENT_TYPE_ID == 3) {marker.setStyle({color: '#FFFF00'});}
	//			//meteorological
	//			if (a.SENSOR_TYPE_ID == 2 ) {marker.setStyle({color: '#FFC0CB'});}
	//			//rapid deploy gage
	//			if (a.SENSOR_TYPE_ID == 5 ) {marker.setStyle({color: '#32BF32'});}
	//			//storm tide
	//			if (a.SENSOR_TYPE_ID == 1 && a.DEPLOYMENT_TYPE_ID == 1 || a.DEPLOYMENT_TYPE_ID == 2 ) {marker.setStyle({color: '#FF0000'});}
	//			//wave height
	//			if (a.SENSOR_TYPE_ID == 1 && a.DEPLOYMENT_TYPE_ID == 1) {marker.setStyle({color: '#800080'});}
    //
	//			marker.bindPopup("Site ID: " + a.SITE_NO);
	//			markers.addLayer(marker);
	//		}
	//		map.addLayer(markers);
    //
	//		markers.on('click', function (a) {
	//			console.log('marker ' + a.layer);
	//		});
    //
	//	}
	//});
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	////end sandy sensors from plain json, clustered, symbolized by type
	//////////////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	////Example 8: sandy sensors from geojson, clustered, symbolized by type (235 sites, symbolized by category in attributes)
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//$.ajax({
	//	dataType: "json",
	//	url: "http://wim.usgs.gov/STNData/sensors/sandygeoJSON.js",
	//	success: function (geojson) {
    //
	//		console.log(geojson);
    //
	//		var geojsonLayer = L.geoJson(geojson, {
	//			style: function(feature) {
    //
	//				//Baro
	//				if (feature.properties.SENSOR_TYPE_ID == 1 && feature.properties.DEPLOYMENT_TYPE_ID == 3) {return {color: '#FFFF00'};}
	//				//meteorological
	//				if (feature.properties.SENSOR_TYPE_ID == 2 ) {return {color: '#FFC0CB'};}
	//				//rapid deploy gage
	//				if (feature.properties.SENSOR_TYPE_ID == 5 ) {return {color: '#32BF32'};}
	//				//storm tide
	//				if (feature.properties.SENSOR_TYPE_ID == 1 && feature.properties.DEPLOYMENT_TYPE_ID == 1 || feature.properties.DEPLOYMENT_TYPE_ID == 2 ) {return {color: '#FF0000'};}
	//				//wave height
	//				if (feature.properties.SENSOR_TYPE_ID == 1 && feature.properties.DEPLOYMENT_TYPE_ID == 1) {return {color: '#800080'};}
	//			},
	//			pointToLayer: function(feature, latlng) {
	//				return new L.CircleMarker(latlng, {radius: 3, fillOpacity: 0.95});
	//			},
	//			onEachFeature: function (feature, layer) {
	//				layer.bindPopup("Site number:" + feature.properties.SITE_NO);
	//			}
	//		});
    //
	//		var markers = L.markerClusterGroup({disableClusteringAtZoom: 12});
	//		markers.addLayer(geojsonLayer);
	//		map.addLayer(markers);
	//		//map.addLayer(geojsonLayer);
    //
	//		markers.on('click', function (a) {
	//			console.log('marker ' + a.layer);
	//		});
    //
	//	}
	//});
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	////end sandy sensors from geojson symbolized by type
	////////////////////////////////////////////////////////////////////////////////////////////////////////////


});