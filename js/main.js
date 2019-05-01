    var map;
    let infowindow;

    let path = [];
    
     function makeInfoWindow(position,msg){   
            if(infowindow) infowindow.close(); 
            infowindow = new google.maps.InfoWindow({ map: map, position: position, content: "<b>" + msg + "</b>"  }); 
        } 
    
    function addMarker(latitude, longitude, title) {  
            let position = {lat:latitude,lng:longitude}; 
            if(position.lat) { 
                path.push(position);
            } 
            
            //let marker = new google.maps.Marker({position: position, map:map});   marker.setTitle(title); 
            // Add a listener for the click event 
            /*google.maps.event.addListener(marker, 'click', function(e){ 
            makeInfoWindow(this.position,this.title); });
            */
    } 
    function drawLine(){
        console.log(path)
        let poly = new google.maps.Polyline({
            path: path,
            strokeColor : '#FFFFFF',
            strokeWeight : 2
            /*fillOpacity: 0*/
        });
        poly.setMap(map);

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