Overview of Work & Known Issues - Nathan Krawza
============
**Overview**

This project was to update the old Low-Flow webpage developed by Tom Van Heel. I created a new repo and used an example from "wim-leaflet-examples" to build the project off of. I was the lead developer for this project - creating and resolving issues, updating the page, and coordinating with Chris Sanocki & Carol Sinden from MPCA (the cooperator). The first versions of MN-Low-Flow were to get the functionality of the old Low-Flow page, and I visually updated it to WIM standards. In later versions, I pulled in the MPCA data points, added the HUC8 layer, added Geosearch functionality, and tied in the data to each of the points.

**Known Issues**

Right now, the gage data is out of date and static. Each of the gage locations is stored in a JSON file within the project and the Log data is linked to the old site. (The MPCA & HUC8 Layer are being pulled live from ArcGis so they're good)

Ideally, we'd like to have all of the gage data (Log Pearson, Log Nornal, etc...) in the popup itself instead of linking to a seperate page. From my understanding, there is not currently a server/datastore where this data is being updated continually. However, each point is linked to the NWIS data and it looks like that could be an option. 