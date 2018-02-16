# And another Translator with JSON Backend (aaot-json)
Localizer with Jquery and JSON Backend
## Setup
### Dependencies
1. JQuery: https://jquery.com/
2. JS-Cookie: https://github.com/js-cookie/js-cookie
### Installation
1. Download Git Repo
2. Include Script in your Project
## How to use
### Setup
```javascript
localize.url = "yourapi/translation/&lang&"; // &lang& get replaced by the Script with the language
localize.fallBack = "de";
localize.langSupported = ["en", "de"];
localize.cookieExpires = 3; // Default: 7 (Days)

localize.successCallback = function() {..};
localize.errorCallback = function() {...};
localize.beforeSwitch = function() {...};
localize.debug = true;
```
### Run Localizer
```javascript
localize.setup();
```
### Switch Language
```javascript
localize.switch("de");
```
After switching the Language the Script calls automatically `localize.setup()`
## Note
This Script is currently in Development.
### not working Things
- Load from a File
