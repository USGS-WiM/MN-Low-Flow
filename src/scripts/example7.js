/**
 * Created by bdraper on 8/19/2015.
 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////Example 7: sandy sensors from plain json, clustered, symbolized by type (235 sites, symbolized by category in attributes)
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
        url: "http://stn.wim.usgs.gov/STNServices/Instruments.json?Event=24&EventType=&EventStatus=0&States=&County=&CurrentStatus=&CollectionCondition=&DeploymentType=",
        success: function (json) {

            console.log(json);

            var markers = L.markerClusterGroup({disableClusteringAtZoom: 12});

            for (var i = 0; i < json.length; i++) {
                var a = json[i];

                var marker = L.circleMarker(new L.LatLng(a['LATITUDE'], a['LONGITUDE']), {
                    radius: 3,
                    fillOpacity: 0.95
                });

                //Baro
                if (a.SENSOR_TYPE_ID == 1 && a.DEPLOYMENT_TYPE_ID == 3) {
                    marker.setStyle({color: '#FFFF00'});
                }
                //meteorological
                if (a.SENSOR_TYPE_ID == 2) {
                    marker.setStyle({color: '#FFC0CB'});
                }
                //rapid deploy gage
                if (a.SENSOR_TYPE_ID == 5) {
                    marker.setStyle({color: '#32BF32'});
                }
                //storm tide
                if (a.SENSOR_TYPE_ID == 1 && a.DEPLOYMENT_TYPE_ID == 1 || a.DEPLOYMENT_TYPE_ID == 2) {
                    marker.setStyle({color: '#FF0000'});
                }
                //wave height
                if (a.SENSOR_TYPE_ID == 1 && a.DEPLOYMENT_TYPE_ID == 1) {
                    marker.setStyle({color: '#800080'});
                }

                marker.bindPopup("Site ID: " + a.SITE_NO);
                markers.addLayer(marker);
            }
            map.addLayer(markers);

            markers.on('click', function (a) {
                console.log('marker ' + a.layer);
            });

        }
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
////end sandy sensors from plain json, clustered, symbolized by type
//////////////////////////////////////////////////////////////////////////////////////////////////////////
