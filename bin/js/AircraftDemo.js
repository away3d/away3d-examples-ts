(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/AircraftDemo.ts":[function(require,module,exports){
var Sampler2D = require("awayjs-core/lib/image/Sampler2D");
var LoaderEvent = require("awayjs-core/lib/events/LoaderEvent");
var Matrix = require("awayjs-core/lib/geom/Matrix");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");
var URLRequest = require("awayjs-core/lib/net/URLRequest");
var Debug = require("awayjs-core/lib/utils/Debug");
var RequestAnimationFrame = require("awayjs-core/lib/utils/RequestAnimationFrame");
var DisplayObjectContainer = require("awayjs-display/lib/display/DisplayObjectContainer");
var View = require("awayjs-display/lib/View");
var DirectionalLight = require("awayjs-display/lib/display/DirectionalLight");
var Sprite = require("awayjs-display/lib/display/Sprite");
var Skybox = require("awayjs-display/lib/display/Skybox");
var StaticLightPicker = require("awayjs-display/lib/materials/lightpickers/StaticLightPicker");
var PrimitivePlanePrefab = require("awayjs-display/lib/prefabs/PrimitivePlanePrefab");
var SingleCubeTexture = require("awayjs-display/lib/textures/SingleCubeTexture");
var Single2DTexture = require("awayjs-display/lib/textures/Single2DTexture");
var ElementsType = require("awayjs-display/lib/graphics/ElementsType");
var Style = require("awayjs-display/lib/base/Style");
var DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
var MethodMaterial = require("awayjs-methodmaterials/lib/MethodMaterial");
var EffectEnvMapMethod = require("awayjs-methodmaterials/lib/methods/EffectEnvMapMethod");
var NormalSimpleWaterMethod = require("awayjs-methodmaterials/lib/methods/NormalSimpleWaterMethod");
var SpecularFresnelMethod = require("awayjs-methodmaterials/lib/methods/SpecularFresnelMethod");
var OBJParser = require("awayjs-parsers/lib/OBJParser");
var AircraftDemo = (function () {
    //}
    function AircraftDemo() {
        var _this = this;
        //{ state
        this._maxStates = 2;
        this._cameraIncrement = 0;
        this._rollIncrement = 0;
        this._loopIncrement = 0;
        this._state = 0;
        this._appTime = 0;
        this._seaInitialized = false;
        this._f14Initialized = false;
        this._skyboxInitialized = false;
        Debug.LOG_PI_ERRORS = false;
        Debug.THROW_ERRORS = false;
        this.initView();
        this.initLights();
        this.initAnimation();
        this.initParsers();
        this.loadAssets();
        window.onresize = function (event) { return _this.onResize(event); };
    }
    AircraftDemo.prototype.loadAssets = function () {
        this.loadAsset('assets/sea_normals.jpg');
        this.loadAsset('assets/f14/f14d.obj');
        this.loadAsset('assets/skybox/CubeTextureTest.cube');
    };
    AircraftDemo.prototype.loadAsset = function (path) {
        var _this = this;
        var session = AssetLibrary.getLoader();
        session.addEventListener(LoaderEvent.LOAD_COMPLETE, function (event) { return _this.onResourceComplete(event); });
        session.load(new URLRequest(path));
    };
    AircraftDemo.prototype.initParsers = function () {
        AssetLibrary.enableParser(OBJParser);
    };
    AircraftDemo.prototype.initAnimation = function () {
        this._timer = new RequestAnimationFrame(this.render, this);
    };
    AircraftDemo.prototype.initView = function () {
        this._view = new View(new DefaultRenderer());
        this._view.camera.z = -500;
        this._view.camera.y = 250;
        this._view.camera.rotationX = 20;
        this._view.camera.projection.near = 0.5;
        this._view.camera.projection.far = 14000;
        this._view.backgroundColor = 0x2c2c32;
        this.onResize();
    };
    AircraftDemo.prototype.initializeScene = function () {
        if (this._skyboxImageCube && this._f14Geom && this._seaNormalImage) {
            this.initF14();
            this.initSea();
            this._timer.start();
        }
    };
    AircraftDemo.prototype.initLights = function () {
        var light = new DirectionalLight();
        light.color = 0x974523;
        light.direction = new Vector3D(-300, -300, -5000);
        light.ambient = 1;
        light.ambientColor = 0x7196ac;
        light.diffuse = 1.2;
        light.specular = 1.1;
        this._view.scene.addChild(light);
        this._lightPicker = new StaticLightPicker([light]);
    };
    AircraftDemo.prototype.initF14 = function () {
        var _this = this;
        this._f14Initialized = true;
        var f14Material = new MethodMaterial(this._seaNormalImage); // will be the cubemap
        f14Material.style.sampler = new Sampler2D(true, true, false);
        f14Material.lightPicker = this._lightPicker;
        this._view.scene.addChild(this._f14Geom);
        this._f14Geom.transform.scaleTo(20, 20, 20);
        this._f14Geom.rotationX = 90;
        this._f14Geom.y = 200;
        this._view.camera.lookAt(this._f14Geom.transform.position);
        document.onmousedown = function (event) { return _this.onMouseDown(event); };
    };
    AircraftDemo.prototype.initSea = function () {
        this._seaMaterial = new MethodMaterial(this._seaNormalImage); // will be the cubemap
        this._seaMaterial.style.sampler = new Sampler2D(true, true, false);
        this._waterMethod = new NormalSimpleWaterMethod(new Single2DTexture(this._seaNormalImage), new Single2DTexture(this._seaNormalImage));
        var fresnelMethod = new SpecularFresnelMethod();
        fresnelMethod.normalReflectance = .3;
        fresnelMethod.gloss = 10;
        fresnelMethod.strength = 1;
        this._seaMaterial.alphaBlending = true;
        this._seaMaterial.lightPicker = this._lightPicker;
        this._seaMaterial.style.sampler = new Sampler2D(true);
        this._seaMaterial.animateUVs = true;
        this._seaMaterial.normalMethod = this._waterMethod;
        this._seaMaterial.addEffectMethod(new EffectEnvMapMethod(new SingleCubeTexture(this._skyboxImageCube)));
        this._seaMaterial.specularMethod = fresnelMethod;
        this._seaGeom = new PrimitivePlanePrefab(this._seaMaterial, ElementsType.TRIANGLE, 50000, 50000, 1, 1, true, false);
        this._seaSprite = this._seaGeom.getNewObject();
        this._seaSprite.graphics.scaleUV(100, 100);
        this._seaSprite.style = new Style();
        this._seaSprite.style.uvMatrix = new Matrix();
        this._view.scene.addChild(new Skybox(this._skyboxImageCube));
        this._view.scene.addChild(this._seaSprite);
    };
    AircraftDemo.prototype.onResourceComplete = function (event) {
        var loader = event.target;
        var numAssets = loader.baseDependency.assets.length;
        var i = 0;
        switch (event.url) {
            case "assets/sea_normals.jpg":
                this._seaNormalImage = loader.baseDependency.assets[0];
                break;
            case 'assets/f14/f14d.obj':
                this._f14Geom = new DisplayObjectContainer();
                for (i = 0; i < numAssets; ++i) {
                    var asset = loader.baseDependency.assets[i];
                    switch (asset.assetType) {
                        case Sprite.assetType:
                            var sprite = asset;
                            this._f14Geom.addChild(sprite);
                            break;
                    }
                }
                break;
            case 'assets/skybox/CubeTextureTest.cube':
                this._skyboxImageCube = loader.baseDependency.assets[0];
                break;
        }
        this.initializeScene();
    };
    AircraftDemo.prototype.render = function (dt) {
        if (this._f14Geom) {
            this._rollIncrement += 0.02;
            switch (this._state) {
                case 0:
                    this._f14Geom.rotationZ = Math.sin(this._rollIncrement) * 25;
                    break;
                case 1:
                    this._loopIncrement += 0.05;
                    this._f14Geom.z += Math.cos(this._loopIncrement) * 20;
                    this._f14Geom.y += Math.sin(this._loopIncrement) * 20;
                    this._f14Geom.rotationX += -1 * ((Math.PI / 180) * Math.atan2(this._f14Geom.z, this._f14Geom.y)); //* 20;
                    this._f14Geom.rotationZ = Math.sin(this._rollIncrement) * 25;
                    if (this._loopIncrement > (Math.PI * 2)) {
                        this._loopIncrement = 0;
                        this._state = 0;
                    }
                    break;
            }
        }
        if (this._f14Geom) {
            this._view.camera.lookAt(this._f14Geom.transform.position);
        }
        if (this._view.camera) {
            this._cameraIncrement += 0.01;
            this._view.camera.x = Math.cos(this._cameraIncrement) * 400;
            this._view.camera.z = Math.sin(this._cameraIncrement) * 400;
        }
        if (this._f14Geom) {
            this._view.camera.lookAt(this._f14Geom.transform.position);
        }
        if (this._seaMaterial) {
            this._seaSprite.style.uvMatrix.ty -= 0.04;
        }
        this._appTime += dt;
        this._view.render();
    };
    AircraftDemo.prototype.onResize = function (event) {
        if (event === void 0) { event = null; }
        this._view.y = 0;
        this._view.x = 0;
        this._view.width = window.innerWidth;
        this._view.height = window.innerHeight;
    };
    AircraftDemo.prototype.onMouseDown = function (event) {
        this._state++;
        if (this._state >= this._maxStates)
            this._state = 0;
    };
    return AircraftDemo;
})();
window.onload = function () {
    new AircraftDemo();
};

},{"awayjs-core/lib/events/LoaderEvent":undefined,"awayjs-core/lib/geom/Matrix":undefined,"awayjs-core/lib/geom/Vector3D":undefined,"awayjs-core/lib/image/Sampler2D":undefined,"awayjs-core/lib/library/AssetLibrary":undefined,"awayjs-core/lib/net/URLRequest":undefined,"awayjs-core/lib/utils/Debug":undefined,"awayjs-core/lib/utils/RequestAnimationFrame":undefined,"awayjs-display/lib/View":undefined,"awayjs-display/lib/base/Style":undefined,"awayjs-display/lib/display/DirectionalLight":undefined,"awayjs-display/lib/display/DisplayObjectContainer":undefined,"awayjs-display/lib/display/Skybox":undefined,"awayjs-display/lib/display/Sprite":undefined,"awayjs-display/lib/graphics/ElementsType":undefined,"awayjs-display/lib/materials/lightpickers/StaticLightPicker":undefined,"awayjs-display/lib/prefabs/PrimitivePlanePrefab":undefined,"awayjs-display/lib/textures/Single2DTexture":undefined,"awayjs-display/lib/textures/SingleCubeTexture":undefined,"awayjs-methodmaterials/lib/MethodMaterial":undefined,"awayjs-methodmaterials/lib/methods/EffectEnvMapMethod":undefined,"awayjs-methodmaterials/lib/methods/NormalSimpleWaterMethod":undefined,"awayjs-methodmaterials/lib/methods/SpecularFresnelMethod":undefined,"awayjs-parsers/lib/OBJParser":undefined,"awayjs-renderergl/lib/DefaultRenderer":undefined}]},{},["./src/AircraftDemo.ts"])


//# sourceMappingURL=AircraftDemo.js.map