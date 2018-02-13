// Script by Yannik Gartmann, 2018
// Version 1.0.0

// Localizer Element
var localize = {
    translation: undefined,
    lang : undefined,
    fallBack : "en",
    apiTimeOut: 5000,
    debug: false,
    url: "/api/translation/&lang&",
    // Callback when the localzier is done
    successCallback: function () {
        if (localize.debug) {
            console.log("successCallback");
        }
    },

    //Action before Switch
    beforeSwitch: function () {
        if (localize.debug) {
            console.log("beforeSwitch");
        }
    },

    // Callback when the localizer is done but with errors
    errorCallback: function () {
        if (localize.debug) {
            console.log("errorCallback");
        }
    },

    // Prep the localizer and start the first translation
    setup: function () {
        if (Cookies.get("lang")) {
            this.lang = Cookies.get("lang");
        } else {
            localize.lang = navigator.language || localize.fallBack;
            localize.lang = localize.lang.split('-')[0];
        }        
        url =  localize.url.replace("&lang&", localize.lang);
        $.ajax({
            type: "GET",
            url: url,
            timeout :localize. apiTimeOut,
            dataType: "json",
            success: function (data) {
                localize.translation = data;
                localize.translate();
            },
            error: function () {
                localize.errorCallback();
            }
        });
    },

    // Switch Language
    // Parameter: "en", "de", "fr", ... as string
    switch: function (newLang) {
        localize.beforeSwitch();
        localize.lang = newLang;
        Cookies.set("lang", newLang, { path: '' });
        localize.setup();
    },

    // Translate all elements with the data-tag "data-tk"
    translate: function () {
        $("*[data-tk]").each(function (index, elem) {
            key = $(elem).data("tk");
            $(elem).text(localize.getTranslation(key));
        });
        localize.successCallback();      
    },

    // Get a specific translation of a key
    getTranslation(key) {
        try {
            return eval("localize.translation." + key);
        } catch (e) {
            return "Key has no Value!";
        }
    }
};