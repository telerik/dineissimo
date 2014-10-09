/*jslint browser: true */
/*global app, kendo */
"use strict";

//View Model for the About Us page.

(function (win) {
    win.app = win.app || {};

    win.app.AboutUs = kendo.observable({
        phone: "1-888-365-2779",
        email: "support@telerik.com",
        twitter: "http://twitter.com/telerik",
        facebook: "http://facebook.com/telerik",
        blog: "http://blogs.telerik.com",
        title: "About us",
        lat: 42.374990,
        lng: -71.273825,
        mapUrl: "http://maps.google.com/maps/api/staticmap?center=42.374923,-71.273964&zoom=16&markers=42.374923,-71.273964&size=320x150",
        description: "Opened Jul 2013, this cafe in downtown LA serves organic, gluten-free, and vegan food without added sugar, yeast, caffeine, or alcohol.  In early-2014 its menu added a few dairy options.",
        phoneLaunch: function () {
            win.open("tel://" + this.phone);
        },
        emailLaunch: function () {
            win.open("mailto://" + this.email);
        },
        directionLaunch: function () {
            if (kendo.support.mobileOS.android || kendo.support.mobileOS.wp) {
                win.open("http://maps.google.com/maps?saddr=current&daddr=" + this.lat + "," + this.lng);
            }
            else {
                 win.open("maps://maps.apple.com/?q=" + this.lat + "," + this.lng);
            }
           
        },
        blogLaunch: function () {
            win.open(this.blog, "_blank", "location=yes,hidden=no");
        },
        twitterLaunch: function () {
            win.open(this.twitter, "_blank", "location=yes,hidden=no");
        },
        facebookLaunch: function () {
            win.open(this.facebook, "_blank", "location=yes,hidden=no");
        }

    });
}(window));