// Script by Yannik Gartmann, 2018
// Version 1.0.1

// Localizer Element
var localize = {
    translation: undefined,
    cookieExpires : 7,
    lang : undefined,
    loadingType : "api",
    langSupported : ["en"],
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
            localize.lang = Cookies.get("lang");
        } else {
            localize.lang = navigator.language || localize.fallBack;
            localize.lang = localize.lang.split('-')[0];
        }
        if ($.inArray(localize.fallBack, localize.langSupported) == -1) {
            throw new Error("localize.fallBack must be in localize.langSupported!");
        }
        if ($.inArray(localize.lang, localize.langSupported) == -1) {
            localize.lang = localize.fallBack;
        }
        url =  localize.url.replace("&lang&", localize.lang);
        if (localize.loadingType ==  "file") {
            $.getJSON(url, function(data) {
                localize.translate = data;
                localize.translate();
            });
        }
        else if (localize.loadingType == "api") {
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
        }
    },

    // Switch Language
    // Parameter: "en", "de", "fr", ... as string
    switch: function (newLang) {
        localize.beforeSwitch();
        localize.lang = newLang;
        Cookies.set("lang", newLang, { expires: localize.cookieExpires, path: '' });
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