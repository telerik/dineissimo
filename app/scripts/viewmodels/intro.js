/*jslint browser: true */
/*global app, kendo */
"use strict";

(function (win) {
    win.app = win.app || {};
    
    win.app.Intro = kendo.observable({
        handleSwipe: function (e) {
            if( e.direction === "right" ) {
                switch( e.sender.element[0].id) {
                    case "img2":
                        app.mobileApp.navigate( "#intro-1", "slide:right");
                        break;
                    case "img3":
                        app.mobileApp.navigate( "#intro-2", "slide:right");
                        break;
                }
            } else {
                switch( e.sender.element[0].id) {
                    case "img1":
                        app.mobileApp.navigate( "#intro-2", "slide:left");
                        break;
                    case "img2":
                        app.mobileApp.navigate( "#intro-3", "slide:left");
                        break;
                    case "img3":
                        app.mobileApp.navigate( "views/menu.html", "slide:left");
                        break;
                }
            }
            
        }
    });
}(window));