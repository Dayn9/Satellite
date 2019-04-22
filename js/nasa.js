
const APIKEY = "qrWL5i54WiZdxSZju5asfUvvLnnfC3ZP8iufQxFW"
const SEARCH0 = "https://api.nasa.gov/planetary/apod?api_key="
const sscUrl = "https://sscweb.sci.gsfc.nasa.gov/WS/sscr/2"

let earthRadiusKm = 6378;

const rPart1 = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><DataRequest xmlns="http://sscweb.gsfc.nasa.gov/schema"><TimeInterval><Start>';
const rPart2 = '</Start><End>'
const rPart3 = '</End></TimeInterval><BFieldModel><InternalBFieldModel>IGRF-10</InternalBFieldModel><ExternalBFieldModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Tsyganenko89cBFieldModel"><KeyParameterValues>KP3_3_3</KeyParameterValues></ExternalBFieldModel><TraceStopAltitude>100</TraceStopAltitude></BFieldModel><Satellites><Id>';
const rPart4 = '</Id><ResolutionFactor>2</ResolutionFactor></Satellites><OutputOptions><AllLocationFilters>true</AllLocationFilters><CoordinateOptions><CoordinateSystem>Geo</CoordinateSystem><Component>X</Component></CoordinateOptions><CoordinateOptions><CoordinateSystem>Geo</CoordinateSystem><Component>Y</Component></CoordinateOptions><CoordinateOptions><CoordinateSystem>Geo</CoordinateSystem><Component>Z</Component></CoordinateOptions><MinMaxPoints>2</MinMaxPoints></OutputOptions></DataRequest>';

let satellites = [];

function getData(){

    let request = rPart1 + getStartTime() + 
                  rPart2 + getEndTime() + 
                  rPart3 + app.selected.satId +
                  rPart4; 
    console.log(request);

    $.ajax({
        type: 'POST',
        url: sscUrl + '/locations',
        data: request,
        dataType: 'xml',
        contentType: 'application/xml',
        processData: false,
        success: dataLoaded,
        error: dataError
    });
}  

function getStartTime(){
    return app.selectedYear + app.selected.start.substring(4, 24);
}

function getEndTime(){
    if(app.selectedYear == parseInt(app.selected.end.substring(0,4))){
        return selected.end;
    }
    return (app.selectedYear + 1) + app.selected.start.substring(4,24);
}

function dataLoaded(myresult){

    app.result = [];

    $('Data', myresult).each(function() {

        let satId = $(this).find('Id').text();
        //let satName = sats[satId].Name;

        let coordSystem = $(this).find('CoordinateSystem').text();

        let time = $(this).find('Time').map(function() {
            return $(this).text();
        }).get();
        let x = $(this).find('X').map(function() {
            return $(this).text();
        }).get();
        let y = $(this).find('Y').map(function() {
            return $(this).text();
        }).get();
        let z = $(this).find('Z').map(function() {
            return $(this).text();
        }).get();

        app.result.push({
            satId: satId,
            //satName: satName,
            coordSystem: coordSystem,
            time: time,
            x: x,
            y: y,
            z: z 
        });
    });

    console.log(app.result)

    for(let i = 0; i < app.result[0].x.length; i++){
        addMarker(getLatitude(app.result[0].z[i] / earthRadiusKm), getLongitude(app.result[0].x[i] / earthRadiusKm, app.result[0].y[i]/earthRadiusKm), "Satelite at time: " + app.result[0].time[i])
    }
    
}

function dataError(e){
    console.log("An error occured");
}

function displayObservatories(observatories){
    let data = observatories.Observatory[1]
    for(let i = 0; i < data.length; i++)
        app.observatories.push({
            satId: data[i].Id,
            name: data[i].Name,
            start: data[i].StartTime[1].substring(0, 23) + "Z",
            end: data[i].EndTime[1].substring(0,23) + "Z"
        });

    app.selected = app.observatories[0];
    app.getYears();
    console.log(app.selected);
}

function displayGroundStations(stations){
}

function getLatitude(z){
    return (Math.acos(z) * 180 / Math.PI) - 90;
}

function getLongitude(x,y){
    return Math.atan2(y, x) * 180 / Math.PI;
}

$(document).ready(function() {
    /*$('#dataTableVisibility').click(function() {
        $('#data').toggle();
    });*/
    document.body.style.cursor = 'wait';
    $.get(sscUrl + '/observatories', displayObservatories, 'json');
    //$.get(sscUrl + '/groundStations', displayGroundStations, 'json');
});



/*
https://stackoverflow.com/questions/1185408/converting-from-longitude-latitude-to-cartesian-coordinates

lat = asin(z / R)
lon = atan2(y, x)

x = R * cos(lat) * cos(lon)
y = R * cos(lat) * sin(lon)
z = R *sin(lat)
*/