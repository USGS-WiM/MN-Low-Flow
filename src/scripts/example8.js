/**
 * Created by bdraper on 8/19/2015.
 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////Example 8: sandy sensors from geojson, clustered, symbolized by type (235 sites, symbolized by category in attributes)
//// this example demonstrates display of 235 clustered points, with multiple, attribute-dependent symbols, presented as a single layer, with a single cluster symbol
/////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        url: "http://wim.usgs.gov/STNData/sensors/sandygeoJSON.js",
        success: function (geojson) {

            console.log(geojson);

            var geojsonLayer = L.geoJson(geojson, {
                style: function(feature) {

                    //Baro
                    if (feature.properties.SENSOR_TYPE_ID == 1 && feature.properties.DEPLOYMENT_TYPE_ID == 3) {return {color: '#FFFF00'};}
                    //meteorological
                    if (feature.properties.SENSOR_TYPE_ID == 2 ) {return {color: '#FFC0CB'};}
                    //rapid deploy gage
                    if (feature.properties.SENSOR_TYPE_ID == 5 ) {return {color: '#32BF32'};}
                    //storm tide
                    if (feature.properties.SENSOR_TYPE_ID == 1 && feature.properties.DEPLOYMENT_TYPE_ID == 1 || feature.properties.DEPLOYMENT_TYPE_ID == 2 ) {return {color: '#FF0000'};}
                    //wave height
                    if (feature.properties.SENSOR_TYPE_ID == 1 && feature.properties.DEPLOYMENT_TYPE_ID == 1) {return {color: '#800080'};}
                },
                pointToLayer: function(feature, latlng) {
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////
////end sandy sensors from geojson symbolized by type
////////////////////////////////////////////////////////////////////////////////////////////////////////////
