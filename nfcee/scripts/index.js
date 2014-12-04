// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    var meds = {

    };

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        

        nfc.addNdefListener(onNfcRead);
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function bin2String(array) {
        var result = "";
        for (var i = 0; i < array.length; i++) {
            result += String.fromCharCode(parseInt(array[i], 2));
        }
        return result;
    }

    function onNfcRead(nfcEvent) {
        console.log(nfcEvent);
        var tag = nfcEvent.tag,
            message = tag.ndefMessage,
            record = message[0],
            value;

        if (util.isType(record, ndef.TNF_WELL_KNOWN, ndef.RTD_URI)) {
            value = ndef.uriHelper.decodePayload(record.payload);

        } else if (util.isType(record, ndef.TNF_WELL_KNOWN, ndef.RTD_TEXT)) {
            value = ndef.textHelper.decodePayload(record.payload);

        } else {
            value = JSON.stringify(record);

        }

        var u = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        console.log(voices);
        u.voice = voices[0];
        u.lang = "en-US";



        u.text = "Take 2 " + value;
        speechSynthesis.speak(u);

        //alert(value);
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();