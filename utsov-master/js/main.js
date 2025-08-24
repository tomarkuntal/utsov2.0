'use scrict';

jQuery(window).load(function () {
    jQuery("#loader").fadeOut("slow");
});

/* affix the navbar after scroll below header */
/*$('#nav').affix({
      offset: {
        top: $('header').height()
      }
});	*/

jQuery(document).ready(function () {

    //Scrolling
    jQuery('#nav-main [href^=#]').click(function (e) {
        e.preventDefault();
        var div = jQuery(this).attr('href');
        jQuery("html, body").animate({
            scrollTop: $(div).position().top
        }, "slow");
    });

    //resizing map on dialog show
    $('#mapModal').on('shown.bs.modal', function (e) {
        initPujoMap();
    });

    $('#liveStreamModal').on('shown.bs.modal', function (e) {
        fitVideo();
    });

    openDonateDialog();
});

function openDonateDialog() {
    const href = window.location.href.toLowerCase();
    const donateText = "covid19";

    if (href.indexOf(donateText) > -1) {
        $("#covid19").click();
    }
}

function initPujoMap() {

    // create a LatLng object containing the coordinate for the center of the map
    //var latlng = new google.maps.LatLng(40.43288, -74.39765);
    var latlng = new google.maps.LatLng(40.419851, -74.39574479999999);

    // prepare the map properties
    var options = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControl: true,
        mapTypeControl: true,
        scrollwheel: false,
        disableDoubleClickZoom: true
    };

    // initialize the map object
    var pujoMap = new google.maps.Map(document.getElementById('map_canvas'), options);

    // add Marker
    var pujoMarker = new google.maps.Marker({
        position: latlng,
        map: pujoMap
    });

    // add listener for a click on the pin
    google.maps.event.addListener(pujoMarker, 'click', function () {
        infowindow.open(pujoMap, pujoMarker);
    });

    // add information window
    var infowindow = new google.maps.InfoWindow({
        content: '<div class="info"><address><strong>Utsov 2018 Puja Location</strong><br>200 Rues Lane,<br> East Brunswick, NJ 08816.</address></div>'
    });

}

function fitVideo() {
    //nothing to do yet
}


