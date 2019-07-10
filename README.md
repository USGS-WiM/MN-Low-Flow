# wim-leaflet-examples
Example code for common leaflet needs, arranged bespoke for WiM's needs.

## Installation and Run Instructions
 - Clone the repo
 
 - run `npm install` & `bower install`
 
 - Use `gulp-watch` to run locally

## Leaflet JSON/geoJSON point display ##

This repo contains examples of point display in a Leaflet-based map, using ajax calls to retrieve either plain JSON or geoJSON for display. Examples include standard display and clustered display, using the [Leaflet marker cluster plugin](https://github.com/Leaflet/Leaflet.markercluster).

Examples are spread among 8 javascript files. Refer to the appropriate js file in the index page to test. All the code also remains in commented out in core.js and can be uncommented there for use.

Example 1: demonstrates display of 5000+ points, all with the same symbol, from JSON

Example 2: demonstrates display of 5000+ points, all with the same symbol, from geoJSON

Example 3: demonstrates display of 5000+ clustered points, all with the same symbol, from JSON

Example 4: demonstrates display of 5000+ clustered points, all with the same symbol, from geoJSON

Example 5: demonstrates display of 235 points, with multiple, attribute-dependent symbols, presented as a single layer, from JSON

Example 6: demonstrates display of 235 points, with multiple, attribute-dependent symbols, presented as a single layer, from geoJSON

Example 7: demonstrates display of 235 clustered points, with multiple, attribute-dependent symbols, presented as a single layer, with a single cluster symbol, from JSON

Example 8: demonstrates display of 235 clustered points, with multiple, attribute-dependent symbols, presented as a single layer, with a single cluster symbol, from geoJSON
