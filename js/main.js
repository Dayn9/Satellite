    var map;
    let infowindow;
    
     function makeInfoWindow(position,msg){   
            if(infowindow) infowindow.close(); 
            infowindow = new google.maps.InfoWindow({ map: map, position: position, content: "<b>" + msg + "</b>"  }); 
        } 
    
    function addMarker(latitude, longitude, title) {  
            let position = {lat:latitude,lng:longitude}; 
            let marker = new google.maps.Marker({position: position, map:map});   marker.setTitle(title); 
            //console.log(latitude + " " + longitude);
            // Add a listener for the click event 
            //google.maps.event.addListener(marker, 'click', function(e){ 
            //makeInfoWindow(this.position,this.title); });

        } 
        
    function initMap() {
        let mapOptions = {
            center: {lat: 43.083848, lng: -77.6799},
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMA
        }  
        
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        map.mapTypeId = 'satellite'; map.setTilt(45); 
    }

document.querySelector("#worldZoomButton").onclick = function(){map.setZoom(1);};
document.querySelector("#defaultZoomButton").onclick = function(){map.setZoom(16);};
document.querySelector("#buildingZoomButton").onclick = function(){map.setZoom(20);};        