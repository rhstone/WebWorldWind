/*
 * Copyright (C) 2014 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
define([
    '../../../util/extend',
    '../util/ImagePyramid',
    './../KmlElements',
    './KmlOverlay',
    '../geom/KmlPoint',
    '../util/ViewVolume'
], function (extend,
             ImagePyramid,
             KmlElements,
             KmlOverlay,
             KmlPoint,
             ViewVolume) {
    "use strict";

    /**
     * Constructs an KmlPhotoOverlay. Applications usually don't call this constructor. It is called by {@link KmlFile}
     * as objects from Kml file are read. This object is already concrete implementation.
     * @alias KmlPhotoOverlay
     * @classdesc Contains the data associated with PhotoOverlay node.
     * @param options {Object}
     * @param options.objectNode {Node} Node representing Photo Overlay.
     * @constructor
     * @throws {ArgumentError} If the node is null or undefined.
     * @see https://developers.google.com/kml/documentation/kmlreference#photooverlay
     * @augments KmlOverlay
     */
    var KmlPhotoOverlay = function (options) {
        KmlOverlay.call(this, options);
    };

    KmlPhotoOverlay.prototype = Object.create(KmlOverlay.prototype);

    Object.defineProperties(KmlPhotoOverlay.prototype, {
        /**
         * Adjusts how the photo is placed inside the field of view. This element is useful if your photo has been
         * rotated and deviates slightly from a desired horizontal view.
         * @memberof KmlPhotoOverlay.prototype
         * @readonly
         * @type {String}
         */
        kmlRotation: {
            get: function () {
                return this.retrieve({name: 'rotation'});
            }
        },

        /**
         * The PhotoOverlay is projected onto the &lt;shape&gt;. The &lt;shape&gt; can be one of the following:
         * rectangle (default) - for an ordinary photo
         * @memberof KmlPhotoOverlay.prototype
         * @readonly
         * @type {String}
         */
        kmlShape: {
            get: function () {
                return this.retrieve({name: 'shape'});
            }
        },

        /**
         * The &lt;Point&gt; element acts as a &lt;Point&gt; inside a &lt;Placemark&gt; element. It draws an icon to mark the
         * position of the PhotoOverlay. The icon drawn is specified by the &lt;styleUrl&gt; and &lt;StyleSelector&gt; fields,
         * just as it is for
         * &lt;Placemark&gt;.
         * @memberof KmlPhotoOverlay.prototype
         * @readonly
         * @type {KmlPoint}
         */
        kmlPoint: {
            get: function () {
                return this.createChildElement({
                    name: KmlPoint.prototype.getTagNames()
                });
            }
        },

        /**
         * Defines how much of the current scene is visible. Specifying the field of view is analogous to
         * specifying the lens opening in a physical camera. A small field of view, like a telephoto lens, focuses
         * on a small part of the scene. A large field of view, like a wide-angle lens, focuses on a large part of
         * the scene.
         * @memberof KmlPhotoOverlay.prototype
         * @readonly
         * @type {ViewVolume}
         */
        kmlViewVolume: {
            get: function () {
                return this.createChildElement({
                    name: ViewVolume.prototype.getTagNames()
                });
            }
        },

        /**
         * For very large images, you'll need to construct an image pyramid, which is a hierarchical set of images,
         * each of which is an increasingly lower resolution version of the original image. Each image in the
         * pyramid is subdivided into tiles, so that only the portions in view need to be loaded. Google Earth
         * calculates the current viewpoint and loads the tiles that are appropriate to the user's distance from
         * the image. As the viewpoint moves closer to the PhotoOverlay, Google Earth loads higher resolution
         * tiles. Since all the pixels in the original image can't be viewed on the screen at once, this
         * preprocessing allows Google Earth to achieve maximum performance because it loads only the portions of
         * the image that are in view, and only the pixel details that can be discerned by the user at the current
         * viewpoint. When you specify an image pyramid, you also modify the &lt;href&gt; in the &lt;Icon&gt; element to
         * include specifications for which tiles to load.
         * @memberof KmlPhotoOverlay.prototype
         * @readonly
         * @type {ImagePyramid}
         */
        kmlImagePyramid: {
            get: function () {
                return this.createChildElement({
                    name: ImagePyramid.prototype.getTagNames()
                });
            }
        }
    });

    /**
     * @inheritDoc
     */
    KmlPhotoOverlay.prototype.getTagNames = function () {
        return ['PhotoOverlay'];
    };

    KmlElements.addKey(KmlPhotoOverlay.prototype.getTagNames[0], KmlPhotoOverlay);

    return KmlPhotoOverlay;
});