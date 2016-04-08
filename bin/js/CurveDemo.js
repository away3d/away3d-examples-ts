webpackJsonp([11],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AttributesBuffer_1 = __webpack_require__(64);
	var Event_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"awayjs-core/lib/events/Event\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var Vector3D_1 = __webpack_require__(18);
	var ColorTransform_1 = __webpack_require__(19);
	var URLLoader_1 = __webpack_require__(105);
	var URLLoaderDataFormat_1 = __webpack_require__(106);
	var URLRequest_1 = __webpack_require__(3);
	var ParserUtils_1 = __webpack_require__(206);
	var RequestAnimationFrame_1 = __webpack_require__(7);
	var CurveSubGeometry_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"awayjs-display/lib/base/CurveSubGeometry\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var Geometry_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"awayjs-display/lib/base/Geometry\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var View_1 = __webpack_require__(9);
	var DisplayObjectContainer_1 = __webpack_require__(12);
	var HoverController_1 = __webpack_require__(98);
	var DirectionalLight_1 = __webpack_require__(211);
	var Sprite_1 = __webpack_require__(57);
	var BasicMaterial_1 = __webpack_require__(94);
	var Single2DTexture_1 = __webpack_require__(96);
	var JSPickingCollider_1 = __webpack_require__(316);
	var RaycastPicker_1 = __webpack_require__(44);
	var MouseEvent_1 = __webpack_require__(55);
	var DefaultRenderer_1 = __webpack_require__(116);
	var MethodMaterial_1 = __webpack_require__(257);
	var CurveDemo = (function () {
	    function CurveDemo() {
	        var _this = this;
	        //picking
	        this._raycastPicker = new RaycastPicker_1.default(false);
	        this._container = new DisplayObjectContainer_1.default();
	        this.initView();
	        this._view.scene.addChild(this._container);
	        this._raf = new RequestAnimationFrame_1.default(this.render, this);
	        this._raf.start();
	        this.loadResources();
	        window.onresize = function (event) { return _this.onResize(event); };
	        this.onResize();
	        this._raycastPicker.onlyMouseEnabled = false;
	    }
	    /**
	     *
	     */
	    CurveDemo.prototype.initView = function () {
	        var _this = this;
	        this._view = new View_1.default(new DefaultRenderer_1.default()); // Create the Away3D View
	        this._view.backgroundColor = 0x224466; // Change the background color to black
	        this._view.mousePicker = new RaycastPicker_1.default(true);
	        //setup controller to be used on the camera
	        this._cameraController = new HoverController_1.default(this._view.camera, null, 0, 0, -150, 10, 90);
	        this._cameraController.lookAtPosition = new Vector3D_1.default(0, 0, 0);
	        this._cameraController.tiltAngle = 0;
	        this._cameraController.panAngle = 0;
	        this._cameraController.minTiltAngle = -60;
	        this._cameraController.maxTiltAngle = 60;
	        this._cameraController.autoUpdate = false;
	        document.onmousedown = function (event) { return _this.onMouseDown(event); };
	        document.onmouseup = function (event) { return _this.onMouseUp(event); };
	        document.onmousemove = function (event) { return _this.onMouseMove(event); };
	        document.onmousewheel = function (event) { return _this.onMouseWheel(event); };
	    };
	    /**
	     * Mouse down listener for navigation
	     */
	    CurveDemo.prototype.onMouseDown = function (event) {
	        this._lastPanAngle = this._cameraController.panAngle;
	        this._lastTiltAngle = this._cameraController.tiltAngle;
	        this._lastMouseX = event.clientX;
	        this._lastMouseY = event.clientY;
	        this._move = true;
	    };
	    /**
	     * Mouse up listener for navigation
	     */
	    CurveDemo.prototype.onMouseUp = function (event) {
	        this._move = false;
	    };
	    CurveDemo.prototype.onMouseMove = function (event) {
	        if (this._move) {
	            this._cameraController.panAngle = 0.3 * (event.clientX - this._lastMouseX) + this._lastPanAngle;
	            this._cameraController.tiltAngle = 0.3 * (event.clientY - this._lastMouseY) + this._lastTiltAngle;
	        }
	        //return;
	        //create a ray to cast
	        var rayPosition = this._view.unproject(this._view.mouseX, this._view.mouseY, 0);
	        var rayDirection = this._view.unproject(this._view.mouseX, this._view.mouseY, 1).subtract(rayPosition);
	        //console.log(this._view.mouseX, this._view.mouseY);
	        //console.log(rayPosition);
	        //console.log(rayDirection);
	        //project ray onto x/y plane to generate useful test points from mouse coordinates
	        var plane = new Vector3D_1.default(0, 0, -1, 0);
	        var result = new Vector3D_1.default();
	        var distance = plane.x * rayPosition.x + plane.y * rayPosition.y + plane.z * rayPosition.z + plane.w; //distance(position);
	        result.x = rayPosition.x - (plane.x * distance);
	        result.y = rayPosition.y - (plane.y * distance);
	        result.z = rayPosition.z - (plane.z * distance);
	        var normal = new Vector3D_1.default(plane.x, plane.y, plane.z);
	        var t = -(rayPosition.dotProduct(normal)) / (rayDirection.dotProduct(normal));
	        rayDirection.scaleBy(t);
	        var p = rayPosition.add(rayDirection);
	        var hitContainer = this._container.hitTestPoint(p.x, p.y, true);
	        console.log("hit container", hitContainer);
	        return;
	        //console.log(distance, t);
	        console.log(p);
	        for (var i = 0; i < this._view.scene.numChildren; i++) {
	            var child = this._view.scene.getChildAt(i);
	            var hitChild = child.hitTestPoint(p.x, p.y, true);
	            console.log("hitChild", hitChild);
	            var sprite = child;
	            if (sprite) {
	                if (sprite.pickingCollider) {
	                }
	                //console.log(sprite.geometry.subGeometries[0]._pIndices.length);
	                var hit = false;
	                for (var j = 0; j < sprite.geometry.subGeometries.length; j++) {
	                    var sub = sprite.geometry.subGeometries[j];
	                    hit = this.hittestSprite(p.x, p.y, sub);
	                    if (hit)
	                        break;
	                }
	                console.log("HIT::", hit);
	                if (hit) {
	                    var ct = sprite.transform.colorTransform;
	                    ct.alphaMultiplier = 0.2;
	                    sprite.transform.colorTransform = ct;
	                }
	                else {
	                    var ct = sprite.transform.colorTransform;
	                    ct.alphaMultiplier = 1;
	                    sprite.transform.colorTransform = ct;
	                }
	            }
	        }
	        //console.log(this._view.getRay(this._view.mouseX,this._view.mouseY,0));
	        //console.log(this._view.camera.unproject(this._view.mouseX,this._view.mouseY,0));
	        var collidingObject = this._raycastPicker.getSceneCollision(this._view.camera.transform.position, this._view.camera.transform.forwardVector, this._view.scene);
	        if (collidingObject) {
	            // Show tracers.
	            //this._scenePositionTracer.visible = this._sceneNormalTracer.visible = true;
	            // Update position tracer.
	            //this._scenePositionTracer.transform.position = collidingObject.displayObject.sceneTransform.transformVector(collidingObject.localPosition);
	            // Update normal tracer.
	            //this._sceneNormalTracer.transform.position = this._scenePositionTracer.transform.position;
	            //var normal:Vector3D = collidingObject.displayObject.sceneTransform.deltaTransformVector(collidingObject.localNormal);
	            //normal.normalize();
	            //normal.scaleBy( 25 );
	            //this._sceneNormalTracer.endPosition = normal.clone();
	            console.log("picking worked", collidingObject.index);
	        }
	    };
	    CurveDemo.prototype.hittestSprite = function (px, py, sub) {
	        var posDim = sub.positions.dimensions;
	        var curveDim = sub.curves.dimensions;
	        var indices = sub.indices.get(sub.indices.count);
	        var positions = sub.positions.get(sub.positions.count);
	        var curves = sub.curves.get(sub.curves.count);
	        for (var k = 0; k < sub.indices.length; k += 3) {
	            var id0 = indices[k];
	            var id1 = indices[k + 1] * posDim;
	            var id2 = indices[k + 2] * posDim;
	            var ax = positions[id0 * posDim];
	            var ay = positions[id0 * posDim + 1];
	            var bx = positions[id1];
	            var by = positions[id1 + 1];
	            var cx = positions[id2];
	            var cy = positions[id2 + 1];
	            var curvex = curves[id0 * curveDim];
	            var az = positions[id0 * posDim + 2];
	            //console.log(ax, ay, bx, by, cx, cy);
	            //from a to p
	            var dx = ax - px;
	            var dy = ay - py;
	            //edge normal (a-b)
	            var nx = by - ay;
	            var ny = -(bx - ax);
	            //console.log(ax,ay,bx,by,cx,cy);
	            var dot = (dx * nx) + (dy * ny);
	            //console.log("dot a",dot);
	            if (dot > 0)
	                continue;
	            dx = bx - px;
	            dy = by - py;
	            nx = cy - by;
	            ny = -(cx - bx);
	            dot = (dx * nx) + (dy * ny);
	            //console.log("dot b",dot);
	            if (dot > 0)
	                continue;
	            dx = cx - px;
	            dy = cy - py;
	            nx = ay - cy;
	            ny = -(ax - cx);
	            dot = (dx * nx) + (dy * ny);
	            //console.log("dot c",dot);
	            if (dot > 0)
	                continue;
	            //check if nmot solid
	            if (curvex != 2) {
	                var v0x = bx - ax;
	                var v0y = by - ay;
	                var v1x = cx - ax;
	                var v1y = cy - ay;
	                var v2x = px - ax;
	                var v2y = py - ay;
	                var den = v0x * v1y - v1x * v0y;
	                var v = (v2x * v1y - v1x * v2y) / den;
	                var w = (v0x * v2y - v2x * v0y) / den;
	                var u = 1 - v - w;
	                var uu = 0.5 * v + w; // (0 * u) + (0.5 * v) + (1 * w);// (lerp(0, 0.5, v) + lerp(0.5, 1, w) + lerp(1, 0, u)) / 1.5;
	                var vv = w; // (0 * u) + (0 * v) + (1 * w);// (lerp(0, 1, w) + lerp(1, 0, u)) / 1;
	                var d = uu * uu - vv;
	                if (d > 0 && az == -1) {
	                    continue;
	                }
	                else if (d < 0 && az == 1) {
	                    continue;
	                }
	            }
	            return true;
	        }
	        return false;
	    };
	    /**
	     * Mouse wheel listener for navigation
	     */
	    CurveDemo.prototype.onMouseWheel = function (event) {
	        this._cameraController.distance -= event.wheelDelta * 2;
	        if (this._cameraController.distance < 100)
	            this._cameraController.distance = 100;
	        else if (this._cameraController.distance > 2000)
	            this._cameraController.distance = 2000;
	    };
	    /**
	     *
	     */
	    CurveDemo.prototype.loadResources = function () {
	        var _this = this;
	        var imgLoader = new URLLoader_1.default();
	        imgLoader.dataFormat = URLLoaderDataFormat_1.default.BLOB;
	        imgLoader.addEventListener(Event_1.default.COMPLETE, function (event) { return _this.urlCompleteHandler(event); });
	        imgLoader.load(new URLRequest_1.default("assets/dots_alpha.png")); //new texture
	    };
	    /**
	     *
	     * @param event
	     */
	    CurveDemo.prototype.urlCompleteHandler = function (event) {
	        var _this = this;
	        this._image = ParserUtils_1.default.blobToImage(event.target.data);
	        this._image.onload = function (event) { return _this.imageCompleteHandler(event); };
	    };
	    /**
	     *
	     */
	    CurveDemo.prototype.initLights = function () {
	        this._light = new DirectionalLight_1.default();
	        this._light.diffuse = .7;
	        this._light.specular = 1;
	        //this._view.scene.addChild(this._light);
	        //this._lightPicker = new StaticLightPicker([this._light]);
	    };
	    /**
	     *
	     */
	    CurveDemo.prototype.initMaterial = function (image) {
	        this._texture = new Single2DTexture_1.default(ParserUtils_1.default.imageToBitmapImage2D(image));
	        this._material = new MethodMaterial_1.default(this._texture, true, true, false);
	        this._material.lightPicker = this._lightPicker;
	    };
	    /**
	     *
	     */
	    CurveDemo.prototype.initTorus = function () {
	        /*
	                var vertices:Array<number> = new Array<number>();
	                var uvs:Array<number> = new Array<number>();
	                var curves:Array<number> = new Array<number>();
	                var indices:Array<number> = new Array<number>();
	                indices.push(0);indices.push(1);indices.push(2);indices.push(3);indices.push(4);indices.push(5);indices.push(6);indices.push(7);indices.push(8);indices.push(9);indices.push(10);indices.push(11);indices.push(12);indices.push(13);indices.push(14);indices.push(15);indices.push(16);indices.push(17);indices.push(18);indices.push(19);indices.push(20);indices.push(21);indices.push(22);indices.push(23);indices.push(24);indices.push(25);indices.push(26);indices.push(27);indices.push(28);indices.push(29);indices.push(30);indices.push(31);indices.push(32);indices.push(33);indices.push(34);indices.push(35);indices.push(36);indices.push(37);indices.push(38);indices.push(39);indices.push(40);indices.push(41);indices.push(42);indices.push(43);indices.push(44);indices.push(45);indices.push(46);indices.push(47);indices.push(48);indices.push(49);indices.push(50);indices.push(51);indices.push(52);indices.push(53);indices.push(54);indices.push(55);indices.push(56);indices.push(57);indices.push(58);indices.push(59);indices.push(60);indices.push(61);indices.push(62);indices.push(63);indices.push(64);indices.push(65);indices.push(66);indices.push(67);indices.push(68);indices.push(69);indices.push(70);indices.push(71);indices.push(72);indices.push(73);indices.push(74);indices.push(75);indices.push(76);indices.push(77);indices.push(78);indices.push(79);indices.push(80);indices.push(81);indices.push(82);indices.push(83);indices.push(84);indices.push(85);indices.push(86);indices.push(87);indices.push(88);indices.push(89);indices.push(90);indices.push(91);indices.push(92);indices.push(93);indices.push(94);indices.push(95);indices.push(96);indices.push(97);indices.push(98);indices.push(99);indices.push(100);indices.push(101);indices.push(102);indices.push(103);indices.push(104);indices.push(105);indices.push(106);indices.push(107);indices.push(108);indices.push(109);indices.push(110);indices.push(111);indices.push(112);indices.push(113);indices.push(114);indices.push(115);indices.push(116);indices.push(117);indices.push(118);indices.push(119);indices.push(120);indices.push(121);indices.push(122);indices.push(123);indices.push(124);indices.push(125);indices.push(126);indices.push(127);indices.push(128);indices.push(129);indices.push(130);indices.push(131);indices.push(132);indices.push(133);indices.push(134);indices.push(135);indices.push(136);indices.push(137);indices.push(138);indices.push(139);indices.push(140);indices.push(141);indices.push(142);indices.push(143);indices.push(144);indices.push(145);indices.push(146);indices.push(147);indices.push(148);indices.push(149);indices.push(150);indices.push(151);indices.push(152);indices.push(153);indices.push(154);indices.push(155);indices.push(156);indices.push(157);indices.push(158);indices.push(159);indices.push(160);indices.push(161);indices.push(162);indices.push(163);indices.push(164);indices.push(165);indices.push(166);indices.push(167);indices.push(168);indices.push(169);indices.push(170);indices.push(171);indices.push(172);indices.push(173);indices.push(174);indices.push(175);indices.push(176);indices.push(177);indices.push(178);indices.push(179);indices.push(180);indices.push(181);indices.push(182);indices.push(183);indices.push(184);indices.push(185);indices.push(186);indices.push(187);indices.push(188);indices.push(189);indices.push(190);indices.push(191);indices.push(192);indices.push(193);indices.push(194);indices.push(195);indices.push(196);indices.push(197);indices.push(198);indices.push(199);indices.push(200);indices.push(201);indices.push(202);indices.push(203);indices.push(204);indices.push(205);indices.push(206);indices.push(207);indices.push(208);indices.push(209);indices.push(210);indices.push(211);indices.push(212);indices.push(213);indices.push(214);indices.push(215);indices.push(216);indices.push(217);indices.push(218);indices.push(219);indices.push(220);indices.push(221);indices.push(222);indices.push(223);indices.push(224);indices.push(225);indices.push(226);indices.push(227);indices.push(228);indices.push(229);indices.push(230);indices.push(231);indices.push(232);indices.push(233);indices.push(234);indices.push(235);indices.push(236);indices.push(237);indices.push(238);indices.push(239);indices.push(240);indices.push(241);indices.push(242);indices.push(243);indices.push(244);indices.push(245);indices.push(246);indices.push(247);indices.push(248);indices.push(249);indices.push(250);indices.push(251);indices.push(252);indices.push(253);indices.push(254);indices.push(255);indices.push(256);indices.push(257);indices.push(258);indices.push(259);indices.push(260);indices.push(261);indices.push(262);indices.push(263);indices.push(264);indices.push(265);indices.push(266);indices.push(267);indices.push(268);indices.push(269);indices.push(270);indices.push(271);indices.push(272);indices.push(273);indices.push(274);indices.push(275);indices.push(276);indices.push(277);indices.push(278);indices.push(279);indices.push(280);indices.push(281);indices.push(282);indices.push(283);indices.push(284);indices.push(285);indices.push(286);indices.push(287);indices.push(288);indices.push(289);indices.push(290);indices.push(291);indices.push(292);indices.push(293);indices.push(294);indices.push(295);indices.push(296);indices.push(297);indices.push(298);indices.push(299);indices.push(300);indices.push(301);indices.push(302);indices.push(303);indices.push(304);indices.push(305);indices.push(306);indices.push(307);indices.push(308);indices.push(309);indices.push(310);indices.push(311);indices.push(312);indices.push(313);indices.push(314);indices.push(315);indices.push(316);indices.push(317);indices.push(318);indices.push(319);indices.push(320);indices.push(321);indices.push(322);indices.push(323);indices.push(324);indices.push(325);indices.push(326);indices.push(327);indices.push(328);indices.push(329);indices.push(330);indices.push(331);indices.push(332);indices.push(333);indices.push(334);indices.push(335);indices.push(336);indices.push(337);indices.push(338);indices.push(339);indices.push(340);indices.push(341);indices.push(342);indices.push(343);indices.push(344);indices.push(345);indices.push(346);indices.push(347);indices.push(348);indices.push(349);indices.push(350);indices.push(351);indices.push(352);indices.push(353);indices.push(354);indices.push(355);indices.push(356);indices.push(357);indices.push(358);indices.push(359);indices.push(360);indices.push(361);indices.push(362);indices.push(363);indices.push(364);indices.push(365);indices.push(366);indices.push(367);indices.push(368);indices.push(369);indices.push(370);indices.push(371);indices.push(372);indices.push(373);indices.push(374);indices.push(375);indices.push(376);indices.push(377);indices.push(378);indices.push(379);indices.push(380);indices.push(381);indices.push(382);indices.push(383);indices.push(384);indices.push(385);indices.push(386);indices.push(387);indices.push(388);indices.push(389);indices.push(390);indices.push(391);indices.push(392);indices.push(393);indices.push(394);indices.push(395);indices.push(396);indices.push(397);indices.push(398);indices.push(399);indices.push(400);indices.push(401);indices.push(402);indices.push(403);indices.push(404);indices.push(405);indices.push(406);indices.push(407);indices.push(408);indices.push(409);indices.push(410);indices.push(411);indices.push(412);indices.push(413);indices.push(414);indices.push(415);indices.push(416);indices.push(417);indices.push(418);indices.push(419);indices.push(420);indices.push(421);indices.push(422);indices.push(423);indices.push(424);indices.push(425);indices.push(426);indices.push(427);indices.push(428);indices.push(429);indices.push(430);indices.push(431);indices.push(432);indices.push(433);indices.push(434);indices.push(435);indices.push(436);indices.push(437);indices.push(438);indices.push(439);indices.push(440);indices.push(441);indices.push(442);indices.push(443);indices.push(444);indices.push(445);indices.push(446);indices.push(447);indices.push(448);indices.push(449);indices.push(450);indices.push(451);indices.push(452);indices.push(453);indices.push(454);indices.push(455);indices.push(456);indices.push(457);indices.push(458);indices.push(459);indices.push(460);indices.push(461);indices.push(462);indices.push(463);indices.push(464);indices.push(465);indices.push(466);indices.push(467);indices.push(468);indices.push(469);indices.push(470);indices.push(471);indices.push(472);indices.push(473);indices.push(474);indices.push(475);indices.push(476);indices.push(477);indices.push(478);indices.push(479);indices.push(480);indices.push(481);indices.push(482);indices.push(483);indices.push(484);indices.push(485);indices.push(486);indices.push(487);indices.push(488);indices.push(489);indices.push(490);indices.push(491);indices.push(492);indices.push(493);indices.push(494);indices.push(495);indices.push(496);indices.push(497);indices.push(498);indices.push(499);indices.push(500);indices.push(501);indices.push(502);indices.push(503);indices.push(504);indices.push(505);indices.push(506);indices.push(507);indices.push(508);indices.push(509);indices.push(510);indices.push(511);indices.push(512);indices.push(513);indices.push(514);indices.push(515);indices.push(516);indices.push(517);indices.push(518);indices.push(519);indices.push(520);indices.push(521);indices.push(522);indices.push(523);indices.push(524);indices.push(525);indices.push(526);indices.push(527);indices.push(528);indices.push(529);indices.push(530);indices.push(531);indices.push(532);indices.push(533);indices.push(534);indices.push(535);indices.push(536);indices.push(537);indices.push(538);indices.push(539);indices.push(540);indices.push(541);indices.push(542);indices.push(543);indices.push(544);indices.push(545);indices.push(546);indices.push(547);indices.push(548);indices.push(549);indices.push(550);indices.push(551);indices.push(552);indices.push(553);indices.push(554);indices.push(555);indices.push(556);indices.push(557);indices.push(558);indices.push(559);indices.push(560);indices.push(561);indices.push(562);indices.push(563);indices.push(564);indices.push(565);indices.push(566);indices.push(567);indices.push(568);indices.push(569);indices.push(570);indices.push(571);indices.push(572);indices.push(573);indices.push(574);indices.push(575);indices.push(576);indices.push(577);indices.push(578);indices.push(579);indices.push(580);indices.push(581);indices.push(582);indices.push(583);indices.push(584);indices.push(585);indices.push(586);indices.push(587);indices.push(588);indices.push(589);indices.push(590);indices.push(591);indices.push(592);indices.push(593);indices.push(594);indices.push(595);indices.push(596);indices.push(597);indices.push(598);indices.push(599);indices.push(600);indices.push(601);indices.push(602);indices.push(603);indices.push(604);indices.push(605);indices.push(606);indices.push(607);indices.push(608);indices.push(609);indices.push(610);indices.push(611);indices.push(612);indices.push(613);indices.push(614);indices.push(615);indices.push(616);indices.push(617);indices.push(618);indices.push(619);indices.push(620);indices.push(621);indices.push(622);indices.push(623);indices.push(624);indices.push(625);indices.push(626);indices.push(627);indices.push(628);indices.push(629);indices.push(630);indices.push(631);indices.push(632);indices.push(633);indices.push(634);indices.push(635);indices.push(636);indices.push(637);indices.push(638);indices.push(639);indices.push(640);indices.push(641);indices.push(642);indices.push(643);indices.push(644);indices.push(645);indices.push(646);indices.push(647);indices.push(648);indices.push(649);indices.push(650);indices.push(651);indices.push(652);indices.push(653);indices.push(654);indices.push(655);indices.push(656);indices.push(657);indices.push(658);indices.push(659);indices.push(660);indices.push(661);indices.push(662);indices.push(663);indices.push(664);indices.push(665);indices.push(666);indices.push(667);indices.push(668);indices.push(669);indices.push(670);indices.push(671);indices.push(672);indices.push(673);indices.push(674);indices.push(675);indices.push(676);indices.push(677);indices.push(678);indices.push(679);indices.push(680);indices.push(681);indices.push(682);indices.push(683);indices.push(684);indices.push(685);indices.push(686);indices.push(687);indices.push(688);indices.push(689);indices.push(690);indices.push(691);indices.push(692);indices.push(693);indices.push(694);indices.push(695);indices.push(696);indices.push(697);indices.push(698);indices.push(699);indices.push(700);indices.push(701);indices.push(702);indices.push(703);indices.push(704);indices.push(705);indices.push(706);indices.push(707);indices.push(708);indices.push(709);indices.push(710);indices.push(711);indices.push(712);indices.push(713);indices.push(714);indices.push(715);indices.push(716);indices.push(717);indices.push(718);indices.push(719);indices.push(720);indices.push(721);indices.push(722);indices.push(723);indices.push(724);indices.push(725);indices.push(726);indices.push(727);indices.push(728);indices.push(729);indices.push(730);indices.push(731);indices.push(732);indices.push(733);indices.push(734);indices.push(735);indices.push(736);indices.push(737);indices.push(738);indices.push(739);indices.push(740);indices.push(741);indices.push(742);indices.push(743);indices.push(744);indices.push(745);indices.push(746);indices.push(747);indices.push(748);indices.push(749);indices.push(750);indices.push(751);indices.push(752);indices.push(753);indices.push(754);indices.push(755);indices.push(756);indices.push(757);indices.push(758);indices.push(759);indices.push(760);indices.push(761);indices.push(762);indices.push(763);indices.push(764);indices.push(765);indices.push(766);indices.push(767);indices.push(768);indices.push(769);indices.push(770);indices.push(771);indices.push(772);indices.push(773);indices.push(774);indices.push(775);indices.push(776);indices.push(777);indices.push(778);indices.push(779);indices.push(780);indices.push(781);indices.push(782);indices.push(783);indices.push(784);indices.push(785);indices.push(786);indices.push(787);indices.push(788);indices.push(789);indices.push(790);indices.push(791);indices.push(792);indices.push(793);indices.push(794);indices.push(795);indices.push(796);indices.push(797);indices.push(798);indices.push(799);indices.push(800);indices.push(801);indices.push(802);indices.push(803);indices.push(804);indices.push(805);indices.push(806);indices.push(807);indices.push(808);indices.push(809);indices.push(810);indices.push(811);indices.push(812);indices.push(813);indices.push(814);indices.push(815);indices.push(816);indices.push(817);indices.push(818);indices.push(819);indices.push(820);indices.push(821);indices.push(822);indices.push(823);indices.push(824);indices.push(825);indices.push(826);indices.push(827);indices.push(828);indices.push(829);indices.push(830);indices.push(831);indices.push(832);indices.push(833);indices.push(834);indices.push(835);indices.push(836);indices.push(837);indices.push(838);indices.push(839);indices.push(840);indices.push(841);indices.push(842);indices.push(843);indices.push(844);indices.push(845);indices.push(846);indices.push(847);indices.push(848);indices.push(849);indices.push(850);indices.push(851);indices.push(852);indices.push(853);indices.push(854);indices.push(855);indices.push(856);indices.push(857);indices.push(858);indices.push(859);indices.push(860);indices.push(861);indices.push(862);indices.push(863);indices.push(864);indices.push(865);indices.push(866);indices.push(867);indices.push(868);indices.push(869);indices.push(870);indices.push(871);indices.push(872);indices.push(873);indices.push(874);indices.push(875);indices.push(876);indices.push(877);indices.push(878);indices.push(879);indices.push(880);indices.push(881);indices.push(882);indices.push(883);indices.push(884);indices.push(885);indices.push(886);indices.push(887);indices.push(888);indices.push(889);indices.push(890);indices.push(891);indices.push(892);indices.push(893);indices.push(894);indices.push(895);indices.push(896);indices.push(897);indices.push(898);indices.push(899);indices.push(900);indices.push(901);indices.push(902);indices.push(903);indices.push(904);indices.push(905);indices.push(906);indices.push(907);indices.push(908);indices.push(909);indices.push(910);indices.push(911);indices.push(912);indices.push(913);indices.push(914);indices.push(915);indices.push(916);indices.push(917);indices.push(918);indices.push(919);indices.push(920);indices.push(921);indices.push(922);indices.push(923);indices.push(924);indices.push(925);indices.push(926);indices.push(927);indices.push(928);indices.push(929);indices.push(930);indices.push(931);indices.push(932);indices.push(933);indices.push(934);indices.push(935);indices.push(936);indices.push(937);indices.push(938);indices.push(939);indices.push(940);indices.push(941);indices.push(942);indices.push(943);indices.push(944);indices.push(945);indices.push(946);indices.push(947);indices.push(948);indices.push(949);indices.push(950);indices.push(951);indices.push(952);indices.push(953);indices.push(954);indices.push(955);indices.push(956);indices.push(957);indices.push(958);indices.push(959);indices.push(960);indices.push(961);indices.push(962);indices.push(963);indices.push(964);indices.push(965);indices.push(966);indices.push(967);indices.push(968);indices.push(969);indices.push(970);indices.push(971);indices.push(972);indices.push(973);indices.push(974);indices.push(975);indices.push(976);indices.push(977);indices.push(978);indices.push(979);indices.push(980);indices.push(981);indices.push(982);indices.push(983);indices.push(984);indices.push(985);indices.push(986);indices.push(987);indices.push(988);indices.push(989);indices.push(990);indices.push(991);indices.push(992);indices.push(993);indices.push(994);indices.push(995);indices.push(996);indices.push(997);indices.push(998);indices.push(999);indices.push(1000);indices.push(1001);indices.push(1002);indices.push(1003);indices.push(1004);indices.push(1005);indices.push(1006);indices.push(1007);indices.push(1008);indices.push(1009);indices.push(1010);indices.push(1011);indices.push(1012);indices.push(1013);indices.push(1014);indices.push(1015);indices.push(1016);indices.push(1017);indices.push(1018);indices.push(1019);indices.push(1020);indices.push(1021);indices.push(1022);indices.push(1023);indices.push(1024);indices.push(1025);indices.push(1026);indices.push(1027);indices.push(1028);indices.push(1029);indices.push(1030);indices.push(1031);indices.push(1032);indices.push(1033);indices.push(1034);indices.push(1035);indices.push(1036);indices.push(1037);indices.push(1038);indices.push(1039);indices.push(1040);indices.push(1041);indices.push(1042);indices.push(1043);indices.push(1044);indices.push(1045);indices.push(1046);indices.push(1047);indices.push(1048);indices.push(1049);indices.push(1050);indices.push(1051);indices.push(1052);indices.push(1053);indices.push(1054);indices.push(1055);indices.push(1056);indices.push(1057);indices.push(1058);indices.push(1059);indices.push(1060);indices.push(1061);indices.push(1062);indices.push(1063);indices.push(1064);indices.push(1065);indices.push(1066);indices.push(1067);indices.push(1068);indices.push(1069);indices.push(1070);indices.push(1071);indices.push(1072);indices.push(1073);indices.push(1074);indices.push(1075);indices.push(1076);indices.push(1077);indices.push(1078);indices.push(1079);indices.push(1080);indices.push(1081);indices.push(1082);indices.push(1083);indices.push(1084);indices.push(1085);indices.push(1086);indices.push(1087);indices.push(1088);indices.push(1089);indices.push(1090);indices.push(1091);indices.push(1092);indices.push(1093);indices.push(1094);indices.push(1095);indices.push(1096);indices.push(1097);indices.push(1098);indices.push(1099);indices.push(1100);indices.push(1101);indices.push(1102);indices.push(1103);indices.push(1104);indices.push(1105);indices.push(1106);indices.push(1107);indices.push(1108);indices.push(1109);indices.push(1110);indices.push(1111);indices.push(1112);indices.push(1113);indices.push(1114);indices.push(1115);indices.push(1116);indices.push(1117);indices.push(1118);indices.push(1119);indices.push(1120);indices.push(1121);indices.push(1122);indices.push(1123);indices.push(1124);indices.push(1125);indices.push(1126);indices.push(1127);indices.push(1128);indices.push(1129);indices.push(1130);indices.push(1131);indices.push(1132);indices.push(1133);indices.push(1134);indices.push(1135);indices.push(1136);indices.push(1137);indices.push(1138);indices.push(1139);indices.push(1140);indices.push(1141);indices.push(1142);indices.push(1143);indices.push(1144);indices.push(1145);indices.push(1146);indices.push(1147);indices.push(1148);indices.push(1149);indices.push(1150);indices.push(1151);indices.push(1152);indices.push(1153);indices.push(1154);indices.push(1155);indices.push(1156);indices.push(1157);
	                vertices.push(268.35);vertices.push(21.55);vertices.push(-1);vertices.push(263.5);vertices.push(24.849999999999998);vertices.push(-1);vertices.push(263.5);vertices.push(27.4);vertices.push(-1);vertices.push(279);vertices.push(15);vertices.push(1);vertices.push(294.5);vertices.push(5.099999999999996);vertices.push(1);vertices.push(294.5);vertices.push(-6.25);vertices.push(1);vertices.push(294.5);vertices.push(-6.25);vertices.push(1);vertices.push(294.5);vertices.push(-14.600000000000003);vertices.push(1);vertices.push(291.2);vertices.push(-18.9);vertices.push(1);vertices.push(291.2);vertices.push(-18.9);vertices.push(1);vertices.push(283.84999999999997);vertices.push(-28.550000000000004);vertices.push(1);vertices.push(261.5);vertices.push(-26.75);vertices.push(1);vertices.push(261.5);vertices.push(-26.75);vertices.push(1);vertices.push(260.69999999999993);vertices.push(-29.850000000000005);vertices.push(1);vertices.push(259.9);vertices.push(-31);vertices.push(1);vertices.push(259.9);vertices.push(-31);vertices.push(1);vertices.push(257.6499999999999);vertices.push(-34.25);vertices.push(1);vertices.push(252.75);vertices.push(-34.25);vertices.push(1);vertices.push(252.75);vertices.push(-34.25);vertices.push(1);vertices.push(235.04999999999993);vertices.push(-34.25);vertices.push(1);vertices.push(224.8);vertices.push(-24.1);vertices.push(1);vertices.push(224.8);vertices.push(-24.1);vertices.push(1);vertices.push(221.49999999999991);vertices.push(-20.85);vertices.push(1);vertices.push(219.45);vertices.push(-17);vertices.push(1);vertices.push(219.45);vertices.push(-17);vertices.push(1);vertices.push(217.99999999999991);vertices.push(-14.3);vertices.push(1);vertices.push(218);vertices.push(-13.6);vertices.push(1);vertices.push(218);vertices.push(-13.6);vertices.push(1);vertices.push(217.99999999999991);vertices.push(-10.650000000000002);vertices.push(1);vertices.push(220.05);vertices.push(-8);vertices.push(1);vertices.push(220.05);vertices.push(-8);vertices.push(1);vertices.push(222.54999999999993);vertices.push(-4.750000000000002);vertices.push(1);vertices.push(226.75);vertices.push(-4.75);vertices.push(1);vertices.push(226.75);vertices.push(-4.75);vertices.push(1);vertices.push(228.29999999999993);vertices.push(-4.750000000000002);vertices.push(1);vertices.push(234.1);vertices.push(-7.15);vertices.push(1);vertices.push(249.4);vertices.push(-9.5);vertices.push(-1);vertices.push(239.84999999999994);vertices.push(-9.500000000000002);vertices.push(-1);vertices.push(234.1);vertices.push(-7.15);vertices.push(-1);vertices.push(272.15);vertices.push(-0.5);vertices.push(-1);vertices.push(276.99999999999994);vertices.push(-3.6500000000000017);vertices.push(-1);vertices.push(277);vertices.push(-6);vertices.push(-1);vertices.push(261.5);vertices.push(5.8);vertices.push(1);vertices.push(245.99999999999994);vertices.push(15.45);vertices.push(1);vertices.push(246);vertices.push(27);vertices.push(1);vertices.push(246);vertices.push(27);vertices.push(1);vertices.push(245.99999999999994);vertices.push(34);vertices.push(1);vertices.push(250);vertices.push(39.65);vertices.push(1);vertices.push(250);vertices.push(39.65);vertices.push(1);vertices.push(253.49999999999994);vertices.push(44.699999999999996);vertices.push(1);vertices.push(258.75);vertices.push(46.85);vertices.push(1);vertices.push(259.55);vertices.push(47.15);vertices.push(1);vertices.push(260.99999999999994);vertices.push(48.44999999999999);vertices.push(1);vertices.push(263.1);vertices.push(49.6);vertices.push(1);vertices.push(263.1);vertices.push(49.6);vertices.push(1);vertices.push(269.54999999999995);vertices.push(53.19999999999999);vertices.push(1);vertices.push(278.75);vertices.push(54.25);vertices.push(1);vertices.push(278.75);vertices.push(54.25);vertices.push(1);vertices.push(287.99999999999994);vertices.push(55.34999999999999);vertices.push(1);vertices.push(294.4);vertices.push(53.2);vertices.push(1);vertices.push(294.4);vertices.push(53.2);vertices.push(1);vertices.push(301.49999999999994);vertices.push(50.79999999999999);vertices.push(1);vertices.push(301.5);vertices.push(45.25);vertices.push(1);vertices.push(301.5);vertices.push(45.25);vertices.push(1);vertices.push(301.49999999999994);vertices.push(43.449999999999996);vertices.push(1);vertices.push(300.35);vertices.push(41.4);vertices.push(1);vertices.push(300.35);vertices.push(41.4);vertices.push(1);vertices.push(298.7);vertices.push(38.55);vertices.push(1);vertices.push(295.5);vertices.push(37.25);vertices.push(1);vertices.push(272.75);vertices.push(34.75);vertices.push(-1);vertices.push(274.55);vertices.push(35.650000000000006);vertices.push(-1);vertices.push(284.85);vertices.push(36.45);vertices.push(-1);vertices.push(272.75);vertices.push(34.75);vertices.push(1);vertices.push(268.9);vertices.push(32.60000000000001);vertices.push(1);vertices.push(266.45);vertices.push(31.95);vertices.push(1);vertices.push(263.5);vertices.push(27.4);vertices.push(-1);vertices.push(263.5);vertices.push(29.20000000000001);vertices.push(-1);vertices.push(266.45);vertices.push(31.95);vertices.push(-1);vertices.push(174.75);vertices.push(-48.75);vertices.push(-1);vertices.push(177.1);vertices.push(-43.65);vertices.push(-1);vertices.push(184.4);vertices.push(-34.65);vertices.push(-1);vertices.push(174.75);vertices.push(-48.75);vertices.push(1);vertices.push(171.95);vertices.push(-57.25);vertices.push(1);vertices.push(168.75);vertices.push(-63.4);vertices.push(1);vertices.push(168.75);vertices.push(-63.4);vertices.push(1);vertices.push(162.6);vertices.push(-75.25);vertices.push(1);vertices.push(155.25);vertices.push(-75.25);vertices.push(1);vertices.push(155.25);vertices.push(-75.25);vertices.push(1);vertices.push(149.25);vertices.push(-75.25);vertices.push(1);vertices.push(147.05);vertices.push(-71.1);vertices.push(1);vertices.push(147.05);vertices.push(-71.1);vertices.push(1);vertices.push(146.35000000000002);vertices.push(-69.75);vertices.push(1);vertices.push(146.1);vertices.push(-68.1);vertices.push(1);vertices.push(146);vertices.push(-66.6);vertices.push(1);vertices.push(146.00000000000003);vertices.push(-64.75);vertices.push(1);vertices.push(151.95);vertices.push(-52.4);vertices.push(1);vertices.push(151.95);vertices.push(-52.4);vertices.push(1);vertices.push(157.10000000000002);vertices.push(-41.8);vertices.push(1);vertices.push(161.75);vertices.push(-33.25);vertices.push(1);vertices.push(161.75);vertices.push(-33.25);vertices.push(1);vertices.push(165.10000000000002);vertices.push(-27);vertices.push(1);vertices.push(174.35);vertices.push(-16.3);vertices.push(1);vertices.push(179.75);vertices.push(-10.2);vertices.push(1);vertices.push(172.35000000000002);vertices.push(-0.45000000000000107);vertices.push(1);vertices.push(161.25);vertices.push(18.7);vertices.push(1);vertices.push(141);vertices.push(50.75);vertices.push(-1);vertices.push(141.15000000000003);vertices.push(53.45);vertices.push(-1);vertices.push(147);vertices.push(43.5);vertices.push(-1);vertices.push(141);vertices.push(50.75);vertices.push(1);vertices.push(141.05000000000004);vertices.push(53.2);vertices.push(1);vertices.push(142.75);vertices.push(55.55);vertices.push(1);vertices.push(142.75);vertices.push(55.55);vertices.push(1);vertices.push(144.60000000000002);vertices.push(58.1);vertices.push(1);vertices.push(147.3);vertices.push(58.9);vertices.push(1);vertices.push(147.3);vertices.push(58.9);vertices.push(1);vertices.push(154.35000000000002);vertices.push(61.1);vertices.push(1);vertices.push(160.25);vertices.push(50.25);vertices.push(1);vertices.push(167.6);vertices.push(40);vertices.push(-1);vertices.push(163.00000000000003);vertices.push(45.75);vertices.push(-1);vertices.push(160.25);vertices.push(50.25);vertices.push(-1);vertices.push(176);vertices.push(30);vertices.push(1);vertices.push(184.05000000000004);vertices.push(20.55);vertices.push(1);vertices.push(193.6);vertices.push(6.1);vertices.push(1);vertices.push(212.3);vertices.push(41);vertices.push(-1);vertices.push(211.60000000000002);vertices.push(34.55);vertices.push(-1);vertices.push(210);vertices.push(32);vertices.push(-1);vertices.push(212.3);vertices.push(41);vertices.push(1);vertices.push(212.9);vertices.push(46);vertices.push(1);vertices.push(216.5);vertices.push(48.5);vertices.push(1);vertices.push(216.5);vertices.push(48.5);vertices.push(1);vertices.push(224.75);vertices.push(54.2);vertices.push(1);vertices.push(228.35);vertices.push(48);vertices.push(1);vertices.push(228.35);vertices.push(48);vertices.push(1);vertices.push(230.5);vertices.push(44.25);vertices.push(1);vertices.push(230.5);vertices.push(38.25);vertices.push(1);vertices.push(230.5);vertices.push(38.25);vertices.push(1);vertices.push(230.5);vertices.push(27.95);vertices.push(1);vertices.push(201.15);vertices.push(-13.05);vertices.push(1);vertices.push(131.5);vertices.push(9.75);vertices.push(1);vertices.push(131.5);vertices.push(7.1);vertices.push(1);vertices.push(129.75);vertices.push(4.45);vertices.push(1);vertices.push(129.75);vertices.push(4.45);vertices.push(1);vertices.push(127.3);vertices.push(0.7499999999999991);vertices.push(1);vertices.push(122.75);vertices.push(0.75);vertices.push(1);vertices.push(122.75);vertices.push(0.75);vertices.push(1);vertices.push(118.35);vertices.push(0.7499999999999991);vertices.push(1);vertices.push(114.95);vertices.push(5.1);vertices.push(1);vertices.push(114.95);vertices.push(5.1);vertices.push(1);vertices.push(112.04999999999998);vertices.push(8.849999999999998);vertices.push(1);vertices.push(112.5);vertices.push(10.5);vertices.push(1);vertices.push(102.3);vertices.push(7.3);vertices.push(-1);vertices.push(109.99999999999999);vertices.push(9.949999999999998);vertices.push(-1);vertices.push(112.5);vertices.push(10.5);vertices.push(-1);vertices.push(102.3);vertices.push(7.3);vertices.push(1);vertices.push(97.79999999999998);vertices.push(5.749999999999997);vertices.push(1);vertices.push(91.75);vertices.push(5.75);vertices.push(1);vertices.push(91.75);vertices.push(5.75);vertices.push(1);vertices.push(73.99999999999999);vertices.push(5.749999999999997);vertices.push(1);vertices.push(66.3);vertices.push(25.75);vertices.push(1);vertices.push(66.3);vertices.push(25.75);vertices.push(1);vertices.push(61.999999999999986);vertices.push(36.849999999999994);vertices.push(1);vertices.push(62);vertices.push(47.5);vertices.push(1);vertices.push(62);vertices.push(47.5);vertices.push(1);vertices.push(61.999999999999986);vertices.push(50.849999999999994);vertices.push(1);vertices.push(64.55);vertices.push(53.45);vertices.push(1);vertices.push(64.55);vertices.push(53.45);vertices.push(1);vertices.push(67.24999999999999);vertices.push(56.24999999999999);vertices.push(1);vertices.push(71.25);vertices.push(56.25);vertices.push(1);vertices.push(71.25);vertices.push(56.25);vertices.push(1);vertices.push(77.24999999999999);vertices.push(56.24999999999999);vertices.push(1);vertices.push(79.5);vertices.push(51.15);vertices.push(1);vertices.push(79.5);vertices.push(51.15);vertices.push(1);vertices.push(80.74999999999999);vertices.push(48.29999999999999);vertices.push(1);vertices.push(81.55);vertices.push(39.85);vertices.push(1);vertices.push(84.1);vertices.push(28.6);vertices.push(-1);vertices.push(82.34999999999998);vertices.push(31.849999999999994);vertices.push(-1);vertices.push(81.55);vertices.push(39.85);vertices.push(-1);vertices.push(93.65);vertices.push(23.5);vertices.push(-1);vertices.push(86.84999999999998);vertices.push(23.499999999999993);vertices.push(-1);vertices.push(84.1);vertices.push(28.6);vertices.push(-1);vertices.push(105.6);vertices.push(32.1);vertices.push(-1);vertices.push(100.79999999999998);vertices.push(23.499999999999993);vertices.push(-1);vertices.push(93.65);vertices.push(23.5);vertices.push(-1);vertices.push(111.85);vertices.push(49);vertices.push(-1);vertices.push(108.04999999999998);vertices.push(36.599999999999994);vertices.push(-1);vertices.push(105.6);vertices.push(32.1);vertices.push(-1);vertices.push(111.85);vertices.push(49);vertices.push(1);vertices.push(114.89999999999998);vertices.push(59.099999999999994);vertices.push(1);vertices.push(117.25);vertices.push(60.8);vertices.push(1);vertices.push(117.25);vertices.push(60.8);vertices.push(1);vertices.push(120.79999999999997);vertices.push(63.3);vertices.push(1);vertices.push(126.75);vertices.push(54);vertices.push(1);vertices.push(126.75);vertices.push(54);vertices.push(1);vertices.push(127.49999999999997);vertices.push(46.5);vertices.push(1);vertices.push(127.5);vertices.push(31.5);vertices.push(1);vertices.push(129.5);vertices.push(20.25);vertices.push(-1);vertices.push(127.49999999999997);vertices.push(27.35);vertices.push(-1);vertices.push(127.5);vertices.push(31.5);vertices.push(-1);vertices.push(129.5);vertices.push(20.25);vertices.push(1);vertices.push(131.49999999999997);vertices.push(13.2);vertices.push(1);vertices.push(131.5);vertices.push(9.75);vertices.push(1);vertices.push(45.5);vertices.push(34.4);vertices.push(1);vertices.push(45.5);vertices.push(27.549999999999997);vertices.push(1);vertices.push(45.2);vertices.push(26.2);vertices.push(1);vertices.push(45.2);vertices.push(26.2);vertices.push(1);vertices.push(44.25);vertices.push(22.149999999999995);vertices.push(1);vertices.push(39.5);vertices.push(16.75);vertices.push(1);vertices.push(39.5);vertices.push(16.75);vertices.push(1);vertices.push(46.1);vertices.push(9.349999999999993);vertices.push(1);vertices.push(47.55);vertices.push(5.4);vertices.push(1);vertices.push(47.55);vertices.push(5.4);vertices.push(1);vertices.push(48.50000000000001);vertices.push(2.8499999999999925);vertices.push(1);vertices.push(48.5);vertices.push(-4.6);vertices.push(1);vertices.push(48.5);vertices.push(-4.6);vertices.push(1);vertices.push(48.50000000000001);vertices.push(-17.950000000000006);vertices.push(1);vertices.push(27.55);vertices.push(-26.75);vertices.push(1);vertices.push(27.55);vertices.push(-26.75);vertices.push(1);vertices.push(5.000000000000007);vertices.push(-36.25000000000001);vertices.push(1);vertices.push(-33.25);vertices.push(-36.25);vertices.push(1);vertices.push(-33.25);vertices.push(-36.25);vertices.push(1);vertices.push(-45.05);vertices.push(-36.25000000000001);vertices.push(1);vertices.push(-48.2);vertices.push(-31.35);vertices.push(1);vertices.push(-48.2);vertices.push(-31.35);vertices.push(1);vertices.push(-49.199999999999996);vertices.push(-29.750000000000007);vertices.push(1);vertices.push(-49.2);vertices.push(-27.85);vertices.push(1);vertices.push(-49);vertices.push(-26.1);vertices.push(1);vertices.push(-48.99999999999999);vertices.push(-15.750000000000009);vertices.push(1);vertices.push(-40.25);vertices.push(-15.75);vertices.push(1);vertices.push(-40.25);vertices.push(-15.75);vertices.push(1);vertices.push(-39.699999999999996);vertices.push(-15.750000000000009);vertices.push(1);vertices.push(-37.55);vertices.push(-16.55);vertices.push(1);vertices.push(-37.55);vertices.push(-16.55);vertices.push(1);vertices.push(-34.949999999999996);vertices.push(-17.550000000000008);vertices.push(1);vertices.push(-34);vertices.push(-18.5);vertices.push(1);vertices.push(11.15);vertices.push(-13.35);vertices.push(-1);vertices.push(-7.599999999999994);vertices.push(-17.800000000000008);vertices.push(-1);vertices.push(-24.5);vertices.push(-18.5);vertices.push(-1);vertices.push(31);vertices.push(-4.5);vertices.push(-1);vertices.push(31.000000000000007);vertices.push(-8.65000000000001);vertices.push(-1);vertices.push(11.15);vertices.push(-13.35);vertices.push(-1);vertices.push(21.8);vertices.push(4.6);vertices.push(-1);vertices.push(31.000000000000007);vertices.push(2.1999999999999913);vertices.push(-1);vertices.push(31);vertices.push(-4.5);vertices.push(-1);vertices.push(1.5);vertices.push(7.2);vertices.push(1);vertices.push(-12.299999999999994);vertices.push(8.749999999999991);vertices.push(1);vertices.push(-18.8);vertices.push(12.65);vertices.push(1);vertices.push(-18.8);vertices.push(12.65);vertices.push(1);vertices.push(-27.999999999999993);vertices.push(18.14999999999999);vertices.push(1);vertices.push(-28);vertices.push(30.25);vertices.push(1);vertices.push(-28);vertices.push(30.25);vertices.push(1);vertices.push(-28.249999999999993);vertices.push(32.099999999999994);vertices.push(1);vertices.push(-28.15);vertices.push(33.9);vertices.push(1);vertices.push(-28.15);vertices.push(33.9);vertices.push(1);vertices.push(-27.949999999999992);vertices.push(37.349999999999994);vertices.push(1);vertices.push(-26.2);vertices.push(40);vertices.push(1);vertices.push(-26.2);vertices.push(40);vertices.push(1);vertices.push(-20.89999999999999);vertices.push(48.24999999999999);vertices.push(1);vertices.push(-2.25);vertices.push(48.25);vertices.push(1);vertices.push(-2.25);vertices.push(48.25);vertices.push(1);vertices.push(11.300000000000008);vertices.push(48.24999999999999);vertices.push(1);vertices.push(15.25);vertices.push(43.75);vertices.push(1);vertices.push(15.25);vertices.push(43.75);vertices.push(1);vertices.push(17.250000000000007);vertices.push(41.49999999999999);vertices.push(1);vertices.push(16.5);vertices.push(39.25);vertices.push(1);vertices.push(16.5);vertices.push(39.25);vertices.push(1);vertices.push(16.500000000000007);vertices.push(35.99999999999999);vertices.push(1);vertices.push(13.6);vertices.push(33.9);vertices.push(1);vertices.push(13.6);vertices.push(33.9);vertices.push(1);vertices.push(7.300000000000007);vertices.push(29.29999999999999);vertices.push(1);vertices.push(-10.5);vertices.push(30.25);vertices.push(1);vertices.push(-4);vertices.push(26.4);vertices.push(-1);vertices.push(-9.449999999999992);vertices.push(28.69999999999999);vertices.push(-1);vertices.push(-10.5);vertices.push(30.25);vertices.push(-1);vertices.push(2.75);vertices.push(23.75);vertices.push(-1);vertices.push(-1.149999999999992);vertices.push(25.19999999999999);vertices.push(-1);vertices.push(-4);vertices.push(26.4);vertices.push(-1);vertices.push(20);vertices.push(23.75);vertices.push(1);vertices.push(17.10000000000001);vertices.push(36.09999999999999);vertices.push(1);vertices.push(20.45);vertices.push(43.85);vertices.push(1);vertices.push(20.45);vertices.push(43.85);vertices.push(1);vertices.push(23.35000000000001);vertices.push(50.499999999999986);vertices.push(1);vertices.push(29.6);vertices.push(51.65);vertices.push(1);vertices.push(29.6);vertices.push(51.65);vertices.push(1);vertices.push(35.60000000000001);vertices.push(52.69999999999998);vertices.push(1);vertices.push(40.35);vertices.push(48.15);vertices.push(1);vertices.push(40.35);vertices.push(48.15);vertices.push(1);vertices.push(45.50000000000001);vertices.push(43.19999999999998);vertices.push(1);vertices.push(45.5);vertices.push(34.4);vertices.push(1);vertices.push(-50.5);vertices.push(-85);vertices.push(1);vertices.push(-50.5);vertices.push(-90.35);vertices.push(1);vertices.push(-54.95);vertices.push(-98.5);vertices.push(1);vertices.push(-54.95);vertices.push(-98.5);vertices.push(1);vertices.push(-60.900000000000006);vertices.push(-109.25);vertices.push(1);vertices.push(-69.75);vertices.push(-109.25);vertices.push(1);vertices.push(-69.75);vertices.push(-109.25);vertices.push(1);vertices.push(-75.9);vertices.push(-109.25);vertices.push(1);vertices.push(-83.05);vertices.push(-95);vertices.push(1);vertices.push(-83.05);vertices.push(-95);vertices.push(1);vertices.push(-85.35000000000001);vertices.push(-90.3);vertices.push(1);vertices.push(-87.35);vertices.push(-85);vertices.push(1);vertices.push(-89);vertices.push(-80);vertices.push(1);vertices.push(-89.00000000000001);vertices.push(-67.3);vertices.push(1);vertices.push(-83);vertices.push(-61.6);vertices.push(1);vertices.push(-83);vertices.push(-61.6);vertices.push(1);vertices.push(-77.70000000000002);vertices.push(-56.599999999999994);vertices.push(1);vertices.push(-69.75);vertices.push(-58.45);vertices.push(1);vertices.push(-69.75);vertices.push(-58.45);vertices.push(1);vertices.push(-62.05000000000001);vertices.push(-60.24999999999999);vertices.push(1);vertices.push(-56.5);vertices.push(-67.3);vertices.push(1);vertices.push(-56.5);vertices.push(-67.3);vertices.push(1);vertices.push(-50.500000000000014);vertices.push(-75);vertices.push(1);vertices.push(-50.5);vertices.push(-85);vertices.push(1);vertices.push(-104.5);vertices.push(80.65);vertices.push(1);vertices.push(-104.5);vertices.push(76.9);vertices.push(1);vertices.push(-106.25);vertices.push(74.25);vertices.push(1);vertices.push(-106.25);vertices.push(74.25);vertices.push(1);vertices.push(-108.55);vertices.push(70.75);vertices.push(1);vertices.push(-113.25);vertices.push(70.75);vertices.push(1);vertices.push(-113.25);vertices.push(70.75);vertices.push(1);vertices.push(-116.1);vertices.push(70.75);vertices.push(1);vertices.push(-123.75);vertices.push(79);vertices.push(1);vertices.push(-123.75);vertices.push(79);vertices.push(1);vertices.push(-131);vertices.push(86.85);vertices.push(1);vertices.push(-131);vertices.push(88.15);vertices.push(1);vertices.push(-131);vertices.push(88.15);vertices.push(1);vertices.push(-131);vertices.push(93.94999999999999);vertices.push(1);vertices.push(-126.85);vertices.push(97.35);vertices.push(1);vertices.push(-126.85);vertices.push(97.35);vertices.push(1);vertices.push(-122.94999999999999);vertices.push(100.55);vertices.push(1);vertices.push(-117.75);vertices.push(100);vertices.push(1);vertices.push(-117.75);vertices.push(100);vertices.push(1);vertices.push(-112.24999999999999);vertices.push(99.4);vertices.push(1);vertices.push(-108.65);vertices.push(94.85);vertices.push(1);vertices.push(-108.65);vertices.push(94.85);vertices.push(1);vertices.push(-104.49999999999999);vertices.push(89.60000000000001);vertices.push(1);vertices.push(-104.5);vertices.push(80.65);vertices.push(1);vertices.push(-96.5);vertices.push(-2.75);vertices.push(1);vertices.push(-96.5);vertices.push(-9.3);vertices.push(1);vertices.push(-96.95);vertices.push(-11.05);vertices.push(1);vertices.push(-96.95);vertices.push(-11.05);vertices.push(1);vertices.push(-98.65);vertices.push(-17.25);vertices.push(1);vertices.push(-105.25);vertices.push(-17.25);vertices.push(1);vertices.push(-105.25);vertices.push(-17.25);vertices.push(1);vertices.push(-114.2);vertices.push(-17.25);vertices.push(1);vertices.push(-117.95);vertices.push(7.45);vertices.push(1);vertices.push(-117.95);vertices.push(7.45);vertices.push(1);vertices.push(-119.15);vertices.push(15.299999999999999);vertices.push(1);vertices.push(-119.7);vertices.push(24.7);vertices.push(1);vertices.push(-120);vertices.push(33);vertices.push(1);vertices.push(-120);vertices.push(38.75);vertices.push(1);vertices.push(-119.65);vertices.push(43.8);vertices.push(1);vertices.push(-119.65);vertices.push(43.8);vertices.push(1);vertices.push(-119);vertices.push(53.65);vertices.push(1);vertices.push(-117.25);vertices.push(54.75);vertices.push(1);vertices.push(-117.25);vertices.push(54.75);vertices.push(1);vertices.push(-108);vertices.push(60.65);vertices.push(1);vertices.push(-104.15);vertices.push(52.95);vertices.push(1);vertices.push(-104.15);vertices.push(52.95);vertices.push(1);vertices.push(-102.75);vertices.push(50.199999999999996);vertices.push(1);vertices.push(-102.4);vertices.push(46.25);vertices.push(1);vertices.push(-102.4);vertices.push(46.25);vertices.push(1);vertices.push(-102.05000000000001);vertices.push(42.89999999999999);vertices.push(1);vertices.push(-102.5);vertices.push(40.75);vertices.push(1);vertices.push(-99.5);vertices.push(17.8);vertices.push(-1);vertices.push(-102.50000000000001);vertices.push(32.05);vertices.push(-1);vertices.push(-102.5);vertices.push(40.75);vertices.push(-1);vertices.push(-99.5);vertices.push(17.8);vertices.push(1);vertices.push(-96.50000000000001);vertices.push(3.549999999999997);vertices.push(1);vertices.push(-96.5);vertices.push(-2.75);vertices.push(1);vertices.push(-212.5);vertices.push(59.5);vertices.push(1);vertices.push(-168.3);vertices.push(59.9);vertices.push(1);vertices.push(-152.55);vertices.push(35.9);vertices.push(1);vertices.push(-152.55);vertices.push(35.9);vertices.push(1);vertices.push(-144.5);vertices.push(23.65);vertices.push(1);vertices.push(-144.5);vertices.push(3.15);vertices.push(1);vertices.push(-144.25);vertices.push(-1.25);vertices.push(1);vertices.push(-144.05);vertices.push(-5.400000000000002);vertices.push(1);vertices.push(-144.5);vertices.push(-8.5);vertices.push(1);vertices.push(-144.5);vertices.push(-8.5);vertices.push(1);vertices.push(-145.9);vertices.push(-18.25);vertices.push(1);vertices.push(-153.25);vertices.push(-18.25);vertices.push(1);vertices.push(-153.25);vertices.push(-18.25);vertices.push(1);vertices.push(-158.15);vertices.push(-18.25);vertices.push(1);vertices.push(-160.65);vertices.push(-8.9);vertices.push(1);vertices.push(-164.75);vertices.push(11.6);vertices.push(-1);vertices.push(-163.05);vertices.push(4.15);vertices.push(-1);vertices.push(-160.65);vertices.push(-8.9);vertices.push(-1);vertices.push(-173.35);vertices.push(32.15);vertices.push(-1);vertices.push(-167.85);vertices.push(25.25);vertices.push(-1);vertices.push(-164.75);vertices.push(11.6);vertices.push(-1);vertices.push(-194.25);vertices.push(41.5);vertices.push(-1);vertices.push(-180.85);vertices.push(41.5);vertices.push(-1);vertices.push(-173.35);vertices.push(32.15);vertices.push(-1);vertices.push(-215.05);vertices.push(33);vertices.push(-1);vertices.push(-214.1);vertices.push(38.7);vertices.push(-1);vertices.push(-212.75);vertices.push(41.25);vertices.push(-1);vertices.push(-215.05);vertices.push(33);vertices.push(1);vertices.push(-216.2);vertices.push(25.8);vertices.push(1);vertices.push(-216.5);vertices.push(24.75);vertices.push(1);vertices.push(-218.45);vertices.push(-29.85);vertices.push(1);vertices.push(-220.85);vertices.push(-33.25);vertices.push(1);vertices.push(-225.25);vertices.push(-33.25);vertices.push(1);vertices.push(-225.25);vertices.push(-33.25);vertices.push(1);vertices.push(-232.5);vertices.push(-33.25);vertices.push(1);vertices.push(-233.95);vertices.push(-12.25);vertices.push(1);vertices.push(-233.95);vertices.push(-12.25);vertices.push(1);vertices.push(-234.45);vertices.push(-5.7);vertices.push(1);vertices.push(-234.25);vertices.push(2.3);vertices.push(1);vertices.push(-234);vertices.push(9.15);vertices.push(1);vertices.push(-234);vertices.push(17.25);vertices.push(1);vertices.push(-232);vertices.push(39.3);vertices.push(1);vertices.push(-230);vertices.push(66.9);vertices.push(-1);vertices.push(-230);vertices.push(61.3);vertices.push(-1);vertices.push(-232);vertices.push(39.3);vertices.push(-1);vertices.push(-234);vertices.push(93.45);vertices.push(-1);vertices.push(-230);vertices.push(78.24999999999999);vertices.push(-1);vertices.push(-230);vertices.push(66.9);vertices.push(-1);vertices.push(-234);vertices.push(93.45);vertices.push(1);vertices.push(-238);vertices.push(106.49999999999999);vertices.push(1);vertices.push(-238);vertices.push(107.4);vertices.push(1);vertices.push(-238);vertices.push(107.4);vertices.push(1);vertices.push(-238);vertices.push(109.3);vertices.push(1);vertices.push(-236.2);vertices.push(112.1);vertices.push(1);vertices.push(-236.2);vertices.push(112.1);vertices.push(1);vertices.push(-234.25);vertices.push(115.14999999999999);vertices.push(1);vertices.push(-231.65);vertices.push(116.7);vertices.push(1);vertices.push(-231.65);vertices.push(116.7);vertices.push(1);vertices.push(-224.55);vertices.push(120.99999999999999);vertices.push(1);vertices.push(-219.25);vertices.push(111);vertices.push(1);vertices.push(-216.3);vertices.push(102.65);vertices.push(1);vertices.push(-214.55);vertices.push(97.3);vertices.push(1);vertices.push(-214);vertices.push(93.75);vertices.push(1);vertices.push(-214);vertices.push(93.75);vertices.push(1);vertices.push(-212.85);vertices.push(86.55);vertices.push(1);vertices.push(-212.6);vertices.push(76.6);vertices.push(1);vertices.push(-106.5);vertices.push(-94.6);vertices.push(1);vertices.push(-106.5);vertices.push(-100.3);vertices.push(1);vertices.push(-109.25);vertices.push(-104.75);vertices.push(1);vertices.push(-109.25);vertices.push(-104.75);vertices.push(1);vertices.push(-113.95);vertices.push(-112.25);vertices.push(1);vertices.push(-125.25);vertices.push(-112.25);vertices.push(1);vertices.push(-125.25);vertices.push(-112.25);vertices.push(1);vertices.push(-143.7);vertices.push(-112.25);vertices.push(1);vertices.push(-152.2);vertices.push(-95.75);vertices.push(1);vertices.push(-152.2);vertices.push(-95.75);vertices.push(1);vertices.push(-154.85);vertices.push(-90.65);vertices.push(1);vertices.push(-156.2);vertices.push(-84.5);vertices.push(1);vertices.push(-157);vertices.push(-79.6);vertices.push(1);vertices.push(-157);vertices.push(-69.75);vertices.push(1);vertices.push(-149.1);vertices.push(-65.7);vertices.push(1);vertices.push(-149.1);vertices.push(-65.7);vertices.push(1);vertices.push(-141.9);vertices.push(-62.050000000000004);vertices.push(1);vertices.push(-131.75);vertices.push(-64.65);vertices.push(1);vertices.push(-131.75);vertices.push(-64.65);vertices.push(1);vertices.push(-121.4);vertices.push(-67.30000000000001);vertices.push(1);vertices.push(-114.4);vertices.push(-74.8);vertices.push(1);vertices.push(-114.4);vertices.push(-74.8);vertices.push(1);vertices.push(-106.5);vertices.push(-83.30000000000001);vertices.push(1);vertices.push(-106.5);vertices.push(-94.6);vertices.push(1);vertices.push(-40.5);vertices.push(-131.5);vertices.push(1);vertices.push(-40.5);vertices.push(-147.5);vertices.push(1);vertices.push(-47.2);vertices.push(-163);vertices.push(1);vertices.push(-47.2);vertices.push(-163);vertices.push(1);vertices.push(-59.400000000000006);vertices.push(-191.1);vertices.push(1);vertices.push(-88.25);vertices.push(-191.1);vertices.push(1);vertices.push(-88.25);vertices.push(-191.1);vertices.push(1);vertices.push(-123.2);vertices.push(-191.1);vertices.push(1);vertices.push(-146.45);vertices.push(-167.5);vertices.push(1);vertices.push(-146.45);vertices.push(-167.5);vertices.push(1);vertices.push(-154.7);vertices.push(-159.15);vertices.push(1);vertices.push(-159.8);vertices.push(-149.45);vertices.push(1);vertices.push(-159.8);vertices.push(-149.45);vertices.push(1);vertices.push(-163.99999999999997);vertices.push(-141.50000000000003);vertices.push(1);vertices.push(-164);vertices.push(-137.5);vertices.push(1);vertices.push(-164);vertices.push(-137.5);vertices.push(1);vertices.push(-163.99999999999997);vertices.push(-134.45000000000002);vertices.push(1);vertices.push(-163);vertices.push(-132.25);vertices.push(1);vertices.push(-163);vertices.push(-132.25);vertices.push(1);vertices.push(-160.94999999999996);vertices.push(-127.75000000000003);vertices.push(1);vertices.push(-155.25);vertices.push(-127.75);vertices.push(1);vertices.push(-155.25);vertices.push(-127.75);vertices.push(1);vertices.push(-150.99999999999997);vertices.push(-127.75000000000003);vertices.push(1);vertices.push(-147);vertices.push(-134.85);vertices.push(1);vertices.push(-138.2);vertices.push(-150.5);vertices.push(-1);vertices.push(-140.54999999999998);vertices.push(-147.05000000000004);vertices.push(-1);vertices.push(-143.15);vertices.push(-142.15);vertices.push(-1);vertices.push(-88);vertices.push(-173.25);vertices.push(-1);vertices.push(-122.69999999999999);vertices.push(-173.25000000000003);vertices.push(-1);vertices.push(-138.2);vertices.push(-150.5);vertices.push(-1);vertices.push(-62.95);vertices.push(-152.75);vertices.push(-1);vertices.push(-71.24999999999999);vertices.push(-173.25000000000003);vertices.push(-1);vertices.push(-88);vertices.push(-173.25);vertices.push(-1);vertices.push(-58.95);vertices.push(-138.6);vertices.push(-1);vertices.push(-60.34999999999999);vertices.push(-146.35000000000002);vertices.push(-1);vertices.push(-62.95);vertices.push(-152.75);vertices.push(-1);vertices.push(-59.5);vertices.push(-127.15);vertices.push(-1);vertices.push(-57.999999999999986);vertices.push(-129.25000000000003);vertices.push(-1);vertices.push(-58);vertices.push(-132);vertices.push(-1);vertices.push(-59.5);vertices.push(-127.15);vertices.push(1);vertices.push(-60.999999999999986);vertices.push(-125.05000000000004);vertices.push(1);vertices.push(-61);vertices.push(-121.85);vertices.push(1);vertices.push(-61);vertices.push(-121.85);vertices.push(1);vertices.push(-60.999999999999986);vertices.push(-116.50000000000004);vertices.push(1);vertices.push(-57.8);vertices.push(-114.35);vertices.push(1);vertices.push(-57.8);vertices.push(-114.35);vertices.push(1);vertices.push(-54.84999999999998);vertices.push(-112.40000000000003);vertices.push(1);vertices.push(-50.75);vertices.push(-113.95);vertices.push(1);vertices.push(-50.75);vertices.push(-113.95);vertices.push(1);vertices.push(-46.549999999999976);vertices.push(-115.50000000000003);vertices.push(1);vertices.push(-43.7);vertices.push(-119.85);vertices.push(1);vertices.push(-43.7);vertices.push(-119.85);vertices.push(1);vertices.push(-40.49999999999997);vertices.push(-124.80000000000003);vertices.push(1);vertices.push(-40.5);vertices.push(-131.5);vertices.push(1);vertices.push(291.20001220703125);vertices.push(-18.899999618530273);vertices.push(1);vertices.push(279);vertices.push(15);vertices.push(1);vertices.push(294.5);vertices.push(-6.25);vertices.push(1);vertices.push(291.20001220703125);vertices.push(-18.899999618530273);vertices.push(1);vertices.push(277);vertices.push(-6);vertices.push(1);vertices.push(279);vertices.push(15);vertices.push(1);vertices.push(291.20001220703125);vertices.push(-18.899999618530273);vertices.push(1);vertices.push(276.75);vertices.push(-8.149999618530273);vertices.push(1);vertices.push(277);vertices.push(-6);vertices.push(1);vertices.push(291.20001220703125);vertices.push(-18.899999618530273);vertices.push(1);vertices.push(276.5);vertices.push(-8.75);vertices.push(1);vertices.push(276.75);vertices.push(-8.149999618530273);vertices.push(1);vertices.push(261.5);vertices.push(-26.75);vertices.push(1);vertices.push(276.5);vertices.push(-8.75);vertices.push(1);vertices.push(291.20001220703125);vertices.push(-18.899999618530273);vertices.push(1);vertices.push(252.75);vertices.push(-34.25);vertices.push(1);vertices.push(261.5);vertices.push(-26.75);vertices.push(1);vertices.push(259.8999938964844);vertices.push(-31);vertices.push(1);vertices.push(252.75);vertices.push(-34.25);vertices.push(1);vertices.push(276.5);vertices.push(-8.75);vertices.push(1);vertices.push(261.5);vertices.push(-26.75);vertices.push(1);vertices.push(252.75);vertices.push(-34.25);vertices.push(1);vertices.push(249.39999389648438);vertices.push(-9.5);vertices.push(1);vertices.push(276.5);vertices.push(-8.75);vertices.push(1);vertices.push(252.75);vertices.push(-34.25);vertices.push(1);vertices.push(239.85000610351563);vertices.push(-9.5);vertices.push(1);vertices.push(249.39999389648438);vertices.push(-9.5);vertices.push(1);vertices.push(252.75);vertices.push(-34.25);vertices.push(1);vertices.push(234.10000610351563);vertices.push(-7.150000095367432);vertices.push(1);vertices.push(239.85000610351563);vertices.push(-9.5);vertices.push(1);vertices.push(252.75);vertices.push(-34.25);vertices.push(1);vertices.push(226.75);vertices.push(-4.75);vertices.push(1);vertices.push(234.10000610351563);vertices.push(-7.150000095367432);vertices.push(1);vertices.push(224.8000030517578);vertices.push(-24.100000381469727);vertices.push(1);vertices.push(226.75);vertices.push(-4.75);vertices.push(1);vertices.push(252.75);vertices.push(-34.25);vertices.push(1);vertices.push(224.8000030517578);vertices.push(-24.100000381469727);vertices.push(1);vertices.push(220.0500030517578);vertices.push(-8);vertices.push(1);vertices.push(226.75);vertices.push(-4.75);vertices.push(1);vertices.push(219.4499969482422);vertices.push(-17);vertices.push(1);vertices.push(220.0500030517578);vertices.push(-8);vertices.push(1);vertices.push(224.8000030517578);vertices.push(-24.100000381469727);vertices.push(1);vertices.push(220.0500030517578);vertices.push(-8);vertices.push(1);vertices.push(219.4499969482422);vertices.push(-17);vertices.push(1);vertices.push(218);vertices.push(-13.600000381469727);vertices.push(1);vertices.push(277);vertices.push(-3.6500000953674316);vertices.push(1);vertices.push(279);vertices.push(15);vertices.push(1);vertices.push(277);vertices.push(-6);vertices.push(1);vertices.push(272.1499938964844);vertices.push(-0.5);vertices.push(1);vertices.push(279);vertices.push(15);vertices.push(1);vertices.push(277);vertices.push(-3.6500000953674316);vertices.push(1);vertices.push(272.1499938964844);vertices.push(-0.5);vertices.push(1);vertices.push(268.3500061035156);vertices.push(21.549999237060547);vertices.push(1);vertices.push(279);vertices.push(15);vertices.push(1);vertices.push(272.1499938964844);vertices.push(-0.5);vertices.push(1);vertices.push(263.5);vertices.push(24.850000381469727);vertices.push(1);vertices.push(268.3500061035156);vertices.push(21.549999237060547);vertices.push(1);vertices.push(263.5);vertices.push(24.850000381469727);vertices.push(1);vertices.push(263.5);vertices.push(29.200000762939453);vertices.push(1);vertices.push(263.5);vertices.push(27.399999618530273);vertices.push(1);vertices.push(263.5);vertices.push(24.850000381469727);vertices.push(1);vertices.push(263.1000061035156);vertices.push(49.599998474121094);vertices.push(1);vertices.push(263.5);vertices.push(29.200000762939453);vertices.push(1);vertices.push(261.5);vertices.push(5.800000190734863);vertices.push(1);vertices.push(263.5);vertices.push(24.850000381469727);vertices.push(1);vertices.push(272.1499938964844);vertices.push(-0.5);vertices.push(1);vertices.push(261.5);vertices.push(5.800000190734863);vertices.push(1);vertices.push(263.1000061035156);vertices.push(49.599998474121094);vertices.push(1);vertices.push(263.5);vertices.push(24.850000381469727);vertices.push(1);vertices.push(261.5);vertices.push(5.800000190734863);vertices.push(1);vertices.push(259.54998779296875);vertices.push(47.150001525878906);vertices.push(1);vertices.push(263.1000061035156);vertices.push(49.599998474121094);vertices.push(1);vertices.push(261.5);vertices.push(5.800000190734863);vertices.push(1);vertices.push(258.75);vertices.push(46.849998474121094);vertices.push(1);vertices.push(259.54998779296875);vertices.push(47.150001525878906);vertices.push(1);vertices.push(261.5);vertices.push(5.800000190734863);vertices.push(1);vertices.push(250);vertices.push(39.650001525878906);vertices.push(1);vertices.push(258.75);vertices.push(46.849998474121094);vertices.push(1);vertices.push(250);vertices.push(39.650001525878906);vertices.push(1);vertices.push(261.5);vertices.push(5.800000190734863);vertices.push(1);vertices.push(246);vertices.push(27);vertices.push(1);vertices.push(295.5);vertices.push(37.25);vertices.push(1);vertices.push(301.5);vertices.push(45.25);vertices.push(1);vertices.push(300.3500061035156);vertices.push(41.400001525878906);vertices.push(1);vertices.push(295.5);vertices.push(37.25);vertices.push(1);vertices.push(294.3999938964844);vertices.push(53.20000076293945);vertices.push(1);vertices.push(301.5);vertices.push(45.25);vertices.push(1);vertices.push(284.8500061035156);vertices.push(36.45000076293945);vertices.push(1);vertices.push(294.3999938964844);vertices.push(53.20000076293945);vertices.push(1);vertices.push(295.5);vertices.push(37.25);vertices.push(1);vertices.push(284.8500061035156);vertices.push(36.45000076293945);vertices.push(1);vertices.push(278.75);vertices.push(54.25);vertices.push(1);vertices.push(294.3999938964844);vertices.push(53.20000076293945);vertices.push(1);vertices.push(274.54998779296875);vertices.push(35.650001525878906);vertices.push(1);vertices.push(278.75);vertices.push(54.25);vertices.push(1);vertices.push(284.8500061035156);vertices.push(36.45000076293945);vertices.push(1);vertices.push(272.75);vertices.push(34.75);vertices.push(1);vertices.push(278.75);vertices.push(54.25);vertices.push(1);vertices.push(274.54998779296875);vertices.push(35.650001525878906);vertices.push(1);vertices.push(266.45001220703125);vertices.push(31.950000762939453);vertices.push(1);vertices.push(278.75);vertices.push(54.25);vertices.push(1);vertices.push(272.75);vertices.push(34.75);vertices.push(1);vertices.push(263.5);vertices.push(29.200000762939453);vertices.push(1);vertices.push(278.75);vertices.push(54.25);vertices.push(1);vertices.push(266.45001220703125);vertices.push(31.950000762939453);vertices.push(1);vertices.push(278.75);vertices.push(54.25);vertices.push(1);vertices.push(263.5);vertices.push(29.200000762939453);vertices.push(1);vertices.push(263.1000061035156);vertices.push(49.599998474121094);vertices.push(1);vertices.push(177.10000610351563);vertices.push(-43.650001525878906);vertices.push(1);vertices.push(179.75);vertices.push(-10.199999809265137);vertices.push(1);vertices.push(184.39999389648438);vertices.push(-34.650001525878906);vertices.push(1);vertices.push(174.75);vertices.push(-48.75);vertices.push(1);vertices.push(179.75);vertices.push(-10.199999809265137);vertices.push(1);vertices.push(177.10000610351563);vertices.push(-43.650001525878906);vertices.push(1);vertices.push(174.75);vertices.push(-48.75);vertices.push(1);vertices.push(174.35000610351563);vertices.push(-16.299999237060547);vertices.push(1);vertices.push(179.75);vertices.push(-10.199999809265137);vertices.push(1);vertices.push(168.75);vertices.push(-63.400001525878906);vertices.push(1);vertices.push(174.35000610351563);vertices.push(-16.299999237060547);vertices.push(1);vertices.push(174.75);vertices.push(-48.75);vertices.push(1);vertices.push(168.75);vertices.push(-63.400001525878906);vertices.push(1);vertices.push(161.75);vertices.push(-33.25);vertices.push(1);vertices.push(174.35000610351563);vertices.push(-16.299999237060547);vertices.push(1);vertices.push(155.25);vertices.push(-75.25);vertices.push(1);vertices.push(161.75);vertices.push(-33.25);vertices.push(1);vertices.push(168.75);vertices.push(-63.400001525878906);vertices.push(1);vertices.push(155.25);vertices.push(-75.25);vertices.push(1);vertices.push(151.9499969482422);vertices.push(-52.400001525878906);vertices.push(1);vertices.push(161.75);vertices.push(-33.25);vertices.push(1);vertices.push(147.0500030517578);vertices.push(-71.0999984741211);vertices.push(1);vertices.push(151.9499969482422);vertices.push(-52.400001525878906);vertices.push(1);vertices.push(155.25);vertices.push(-75.25);vertices.push(1);vertices.push(146.10000610351563);vertices.push(-68.0999984741211);vertices.push(1);vertices.push(151.9499969482422);vertices.push(-52.400001525878906);vertices.push(1);vertices.push(147.0500030517578);vertices.push(-71.0999984741211);vertices.push(1);vertices.push(151.9499969482422);vertices.push(-52.400001525878906);vertices.push(1);vertices.push(146.10000610351563);vertices.push(-68.0999984741211);vertices.push(1);vertices.push(146);vertices.push(-66.5999984741211);vertices.push(1);vertices.push(230.5);vertices.push(38.25);vertices.push(1);vertices.push(216.5);vertices.push(48.5);vertices.push(1);vertices.push(228.35000610351563);vertices.push(48);vertices.push(1);vertices.push(230.5);vertices.push(38.25);vertices.push(1);vertices.push(212.3000030517578);vertices.push(41);vertices.push(1);vertices.push(216.5);vertices.push(48.5);vertices.push(1);vertices.push(230.5);vertices.push(38.25);vertices.push(1);vertices.push(211.60000610351563);vertices.push(34.54999923706055);vertices.push(1);vertices.push(212.3000030517578);vertices.push(41);vertices.push(1);vertices.push(230.5);vertices.push(38.25);vertices.push(1);vertices.push(210);vertices.push(32);vertices.push(1);vertices.push(211.60000610351563);vertices.push(34.54999923706055);vertices.push(1);vertices.push(201.14999389648438);vertices.push(-13.050000190734863);vertices.push(1);vertices.push(210);vertices.push(32);vertices.push(1);vertices.push(230.5);vertices.push(38.25);vertices.push(1);vertices.push(201.14999389648438);vertices.push(-13.050000190734863);vertices.push(1);vertices.push(199.8000030517578);vertices.push(15.350000381469727);vertices.push(1);vertices.push(210);vertices.push(32);vertices.push(1);vertices.push(199.5);vertices.push(-15.550000190734863);vertices.push(1);vertices.push(199.8000030517578);vertices.push(15.350000381469727);vertices.push(1);vertices.push(201.14999389648438);vertices.push(-13.050000190734863);vertices.push(1);vertices.push(198.5);vertices.push(-16.75);vertices.push(1);vertices.push(199.8000030517578);vertices.push(15.350000381469727);vertices.push(1);vertices.push(199.5);vertices.push(-15.550000190734863);vertices.push(1);vertices.push(196.5);vertices.push(-19.5);vertices.push(1);vertices.push(199.8000030517578);vertices.push(15.350000381469727);vertices.push(1);vertices.push(198.5);vertices.push(-16.75);vertices.push(1);vertices.push(196.5);vertices.push(-19.5);vertices.push(1);vertices.push(193.60000610351563);vertices.push(6.099999904632568);vertices.push(1);vertices.push(199.8000030517578);vertices.push(15.350000381469727);vertices.push(1);vertices.push(184.39999389648438);vertices.push(-34.650001525878906);vertices.push(1);vertices.push(193.60000610351563);vertices.push(6.099999904632568);vertices.push(1);vertices.push(196.5);vertices.push(-19.5);vertices.push(1);vertices.push(179.75);vertices.push(-10.199999809265137);vertices.push(1);vertices.push(193.60000610351563);vertices.push(6.099999904632568);vertices.push(1);vertices.push(184.39999389648438);vertices.push(-34.650001525878906);vertices.push(1);vertices.push(179.75);vertices.push(-10.199999809265137);vertices.push(1);vertices.push(176);vertices.push(30);vertices.push(1);vertices.push(193.60000610351563);vertices.push(6.099999904632568);vertices.push(1);vertices.push(179.75);vertices.push(-10.199999809265137);vertices.push(1);vertices.push(167.60000610351563);vertices.push(40);vertices.push(1);vertices.push(176);vertices.push(30);vertices.push(1);vertices.push(179.75);vertices.push(-10.199999809265137);vertices.push(1);vertices.push(163);vertices.push(45.75);vertices.push(1);vertices.push(167.60000610351563);vertices.push(40);vertices.push(1);vertices.push(161.25);vertices.push(18.700000762939453);vertices.push(1);vertices.push(163);vertices.push(45.75);vertices.push(1);vertices.push(179.75);vertices.push(-10.199999809265137);vertices.push(1);vertices.push(161.25);vertices.push(18.700000762939453);vertices.push(1);vertices.push(160.25);vertices.push(50.25);vertices.push(1);vertices.push(163);vertices.push(45.75);vertices.push(1);vertices.push(161.25);vertices.push(18.700000762939453);vertices.push(1);vertices.push(147.3000030517578);vertices.push(58.900001525878906);vertices.push(1);vertices.push(160.25);vertices.push(50.25);vertices.push(1);vertices.push(147);vertices.push(43.5);vertices.push(1);vertices.push(147.3000030517578);vertices.push(58.900001525878906);vertices.push(1);vertices.push(161.25);vertices.push(18.700000762939453);vertices.push(1);vertices.push(147);vertices.push(43.5);vertices.push(1);vertices.push(142.75);vertices.push(55.54999923706055);vertices.push(1);vertices.push(147.3000030517578);vertices.push(58.900001525878906);vertices.push(1);vertices.push(142.75);vertices.push(55.54999923706055);vertices.push(1);vertices.push(147);vertices.push(43.5);vertices.push(1);vertices.push(141.66500854492188);vertices.push(52.574031829833984);vertices.push(1);vertices.push(129.75);vertices.push(4.449999809265137);vertices.push(1);vertices.push(129.5);vertices.push(20.25);vertices.push(1);vertices.push(131.5);vertices.push(9.75);vertices.push(1);vertices.push(129.75);vertices.push(4.449999809265137);vertices.push(1);vertices.push(127.5);vertices.push(27.350000381469727);vertices.push(1);vertices.push(129.5);vertices.push(20.25);vertices.push(1);vertices.push(127.5);vertices.push(27.350000381469727);vertices.push(1);vertices.push(126.75);vertices.push(54);vertices.push(1);vertices.push(127.5);vertices.push(31.5);vertices.push(1);vertices.push(122.75);vertices.push(0.75);vertices.push(1);vertices.push(127.5);vertices.push(27.350000381469727);vertices.push(1);vertices.push(129.75);vertices.push(4.449999809265137);vertices.push(1);vertices.push(122.75);vertices.push(0.75);vertices.push(1);vertices.push(126.75);vertices.push(54);vertices.push(1);vertices.push(127.5);vertices.push(27.350000381469727);vertices.push(1);vertices.push(122.75);vertices.push(0.75);vertices.push(1);vertices.push(117.25);vertices.push(60.79999923706055);vertices.push(1);vertices.push(126.75);vertices.push(54);vertices.push(1);vertices.push(114.94999694824219);vertices.push(5.099999904632568);vertices.push(1);vertices.push(117.25);vertices.push(60.79999923706055);vertices.push(1);vertices.push(122.75);vertices.push(0.75);vertices.push(1);vertices.push(112.5);vertices.push(10.5);vertices.push(1);vertices.push(117.25);vertices.push(60.79999923706055);vertices.push(1);vertices.push(114.94999694824219);vertices.push(5.099999904632568);vertices.push(1);vertices.push(112.5);vertices.push(10.5);vertices.push(1);vertices.push(111.8499984741211);vertices.push(49);vertices.push(1);vertices.push(117.25);vertices.push(60.79999923706055);vertices.push(1);vertices.push(110);vertices.push(9.949999809265137);vertices.push(1);vertices.push(111.8499984741211);vertices.push(49);vertices.push(1);vertices.push(112.5);vertices.push(10.5);vertices.push(1);vertices.push(110);vertices.push(9.949999809265137);vertices.push(1);vertices.push(108.05000305175781);vertices.push(36.599998474121094);vertices.push(1);vertices.push(111.8499984741211);vertices.push(49);vertices.push(1);vertices.push(110);vertices.push(9.949999809265137);vertices.push(1);vertices.push(105.5999984741211);vertices.push(32.099998474121094);vertices.push(1);vertices.push(108.05000305175781);vertices.push(36.599998474121094);vertices.push(1);vertices.push(102.30000305175781);vertices.push(7.300000190734863);vertices.push(1);vertices.push(105.5999984741211);vertices.push(32.099998474121094);vertices.push(1);vertices.push(110);vertices.push(9.949999809265137);vertices.push(1);vertices.push(102.30000305175781);vertices.push(7.300000190734863);vertices.push(1);vertices.push(100.80000305175781);vertices.push(23.5);vertices.push(1);vertices.push(105.5999984741211);vertices.push(32.099998474121094);vertices.push(1);vertices.push(102.30000305175781);vertices.push(7.300000190734863);vertices.push(1);vertices.push(93.6500015258789);vertices.push(23.5);vertices.push(1);vertices.push(100.80000305175781);vertices.push(23.5);vertices.push(1);vertices.push(91.75);vertices.push(5.75);vertices.push(1);vertices.push(93.6500015258789);vertices.push(23.5);vertices.push(1);vertices.push(102.30000305175781);vertices.push(7.300000190734863);vertices.push(1);vertices.push(91.75);vertices.push(5.75);vertices.push(1);vertices.push(86.8499984741211);vertices.push(23.5);vertices.push(1);vertices.push(93.6500015258789);vertices.push(23.5);vertices.push(1);vertices.push(91.75);vertices.push(5.75);vertices.push(1);vertices.push(84.0999984741211);vertices.push(28.600000381469727);vertices.push(1);vertices.push(86.8499984741211);vertices.push(23.5);vertices.push(1);vertices.push(91.75);vertices.push(5.75);vertices.push(1);vertices.push(82.3499984741211);vertices.push(31.850000381469727);vertices.push(1);vertices.push(84.0999984741211);vertices.push(28.600000381469727);vertices.push(1);vertices.push(82.3499984741211);vertices.push(31.850000381469727);vertices.push(1);vertices.push(79.5);vertices.push(51.150001525878906);vertices.push(1);vertices.push(81.55000305175781);vertices.push(39.849998474121094);vertices.push(1);vertices.push(82.3499984741211);vertices.push(31.850000381469727);vertices.push(1);vertices.push(71.25);vertices.push(56.25);vertices.push(1);vertices.push(79.5);vertices.push(51.150001525878906);vertices.push(1);vertices.push(91.75);vertices.push(5.75);vertices.push(1);vertices.push(71.25);vertices.push(56.25);vertices.push(1);vertices.push(82.3499984741211);vertices.push(31.850000381469727);vertices.push(1);vertices.push(66.30000305175781);vertices.push(25.75);vertices.push(1);vertices.push(71.25);vertices.push(56.25);vertices.push(1);vertices.push(91.75);vertices.push(5.75);vertices.push(1);vertices.push(66.30000305175781);vertices.push(25.75);vertices.push(1);vertices.push(64.55000305175781);vertices.push(53.45000076293945);vertices.push(1);vertices.push(71.25);vertices.push(56.25);vertices.push(1);vertices.push(64.55000305175781);vertices.push(53.45000076293945);vertices.push(1);vertices.push(66.30000305175781);vertices.push(25.75);vertices.push(1);vertices.push(62);vertices.push(47.5);vertices.push(1);vertices.push(48.5);vertices.push(-4.599999904632568);vertices.push(1);vertices.push(39.5);vertices.push(16.75);vertices.push(1);vertices.push(47.54999923706055);vertices.push(5.400000095367432);vertices.push(1);vertices.push(48.5);vertices.push(-4.599999904632568);vertices.push(1);vertices.push(31);vertices.push(-8.649999618530273);vertices.push(1);vertices.push(39.5);vertices.push(16.75);vertices.push(1);vertices.push(27.549999237060547);vertices.push(-26.75);vertices.push(1);vertices.push(31);vertices.push(-8.649999618530273);vertices.push(1);vertices.push(48.5);vertices.push(-4.599999904632568);vertices.push(1);vertices.push(27.549999237060547);vertices.push(-26.75);vertices.push(1);vertices.push(11.149999618530273);vertices.push(-13.350000381469727);vertices.push(1);vertices.push(31);vertices.push(-8.649999618530273);vertices.push(1);vertices.push(27.549999237060547);vertices.push(-26.75);vertices.push(1);vertices.push(-7.599999904632568);vertices.push(-17.799999237060547);vertices.push(1);vertices.push(11.149999618530273);vertices.push(-13.350000381469727);vertices.push(1);vertices.push(27.549999237060547);vertices.push(-26.75);vertices.push(1);vertices.push(-24.5);vertices.push(-18.5);vertices.push(1);vertices.push(-7.599999904632568);vertices.push(-17.799999237060547);vertices.push(1);vertices.push(-33.25);vertices.push(-36.25);vertices.push(1);vertices.push(-24.5);vertices.push(-18.5);vertices.push(1);vertices.push(27.549999237060547);vertices.push(-26.75);vertices.push(1);vertices.push(-33.25);vertices.push(-36.25);vertices.push(1);vertices.push(-34);vertices.push(-18.5);vertices.push(1);vertices.push(-24.5);vertices.push(-18.5);vertices.push(1);vertices.push(-33.25);vertices.push(-36.25);vertices.push(1);vertices.push(-37.54999923706055);vertices.push(-16.549999237060547);vertices.push(1);vertices.push(-34);vertices.push(-18.5);vertices.push(1);vertices.push(-33.25);vertices.push(-36.25);vertices.push(1);vertices.push(-40.25);vertices.push(-15.75);vertices.push(1);vertices.push(-37.54999923706055);vertices.push(-16.549999237060547);vertices.push(1);vertices.push(-48.20000076293945);vertices.push(-31.350000381469727);vertices.push(1);vertices.push(-40.25);vertices.push(-15.75);vertices.push(1);vertices.push(-33.25);vertices.push(-36.25);vertices.push(1);vertices.push(-48.20000076293945);vertices.push(-31.350000381469727);vertices.push(1);vertices.push(-49);vertices.push(-26.100000381469727);vertices.push(1);vertices.push(-40.25);vertices.push(-15.75);vertices.push(1);vertices.push(-49);vertices.push(-26.100000381469727);vertices.push(1);vertices.push(-48.20000076293945);vertices.push(-31.350000381469727);vertices.push(1);vertices.push(-49.20000076293945);vertices.push(-27.850000381469727);vertices.push(1);vertices.push(45.20000076293945);vertices.push(26.200000762939453);vertices.push(1);vertices.push(40.349998474121094);vertices.push(48.150001525878906);vertices.push(1);vertices.push(45.5);vertices.push(34.400001525878906);vertices.push(1);vertices.push(39.5);vertices.push(16.75);vertices.push(1);vertices.push(40.349998474121094);vertices.push(48.150001525878906);vertices.push(1);vertices.push(45.20000076293945);vertices.push(26.200000762939453);vertices.push(1);vertices.push(31);vertices.push(-8.649999618530273);vertices.push(1);vertices.push(40.349998474121094);vertices.push(48.150001525878906);vertices.push(1);vertices.push(39.5);vertices.push(16.75);vertices.push(1);vertices.push(31);vertices.push(-4.5);vertices.push(1);vertices.push(40.349998474121094);vertices.push(48.150001525878906);vertices.push(1);vertices.push(31);vertices.push(-8.649999618530273);vertices.push(1);vertices.push(31);vertices.push(2.200000047683716);vertices.push(1);vertices.push(40.349998474121094);vertices.push(48.150001525878906);vertices.push(1);vertices.push(31);vertices.push(-4.5);vertices.push(1);vertices.push(31);vertices.push(2.200000047683716);vertices.push(1);vertices.push(29.600000381469727);vertices.push(51.650001525878906);vertices.push(1);vertices.push(40.349998474121094);vertices.push(48.150001525878906);vertices.push(1);vertices.push(21.799999237060547);vertices.push(4.599999904632568);vertices.push(1);vertices.push(29.600000381469727);vertices.push(51.650001525878906);vertices.push(1);vertices.push(31);vertices.push(2.200000047683716);vertices.push(1);vertices.push(21.799999237060547);vertices.push(4.599999904632568);vertices.push(1);vertices.push(20.450000762939453);vertices.push(43.849998474121094);vertices.push(1);vertices.push(29.600000381469727);vertices.push(51.650001525878906);vertices.push(1);vertices.push(21.799999237060547);vertices.push(4.599999904632568);vertices.push(1);vertices.push(20);vertices.push(23.75);vertices.push(1);vertices.push(20.450000762939453);vertices.push(43.849998474121094);vertices.push(1);vertices.push(21.799999237060547);vertices.push(4.599999904632568);vertices.push(1);vertices.push(2.75);vertices.push(23.75);vertices.push(1);vertices.push(20);vertices.push(23.75);vertices.push(1);vertices.push(1.5);vertices.push(7.199999809265137);vertices.push(1);vertices.push(2.75);vertices.push(23.75);vertices.push(1);vertices.push(21.799999237060547);vertices.push(4.599999904632568);vertices.push(1);vertices.push(1.5);vertices.push(7.199999809265137);vertices.push(1);vertices.push(-1.149999976158142);vertices.push(25.200000762939453);vertices.push(1);vertices.push(2.75);vertices.push(23.75);vertices.push(1);vertices.push(1.5);vertices.push(7.199999809265137);vertices.push(1);vertices.push(-4);vertices.push(26.399999618530273);vertices.push(1);vertices.push(-1.149999976158142);vertices.push(25.200000762939453);vertices.push(1);vertices.push(1.5);vertices.push(7.199999809265137);vertices.push(1);vertices.push(-9.449999809265137);vertices.push(28.700000762939453);vertices.push(1);vertices.push(-4);vertices.push(26.399999618530273);vertices.push(1);vertices.push(1.5);vertices.push(7.199999809265137);vertices.push(1);vertices.push(-10.5);vertices.push(30.25);vertices.push(1);vertices.push(-9.449999809265137);vertices.push(28.700000762939453);vertices.push(1);vertices.push(-10.5);vertices.push(30.25);vertices.push(1);vertices.push(1.5);vertices.push(7.199999809265137);vertices.push(1);vertices.push(-18.799999237060547);vertices.push(12.649999618530273);vertices.push(1);vertices.push(13.600000381469727);vertices.push(33.900001525878906);vertices.push(1);vertices.push(15.25);vertices.push(43.75);vertices.push(1);vertices.push(16.5);vertices.push(39.25);vertices.push(1);vertices.push(13.600000381469727);vertices.push(33.900001525878906);vertices.push(1);vertices.push(-2.25);vertices.push(48.25);vertices.push(1);vertices.push(15.25);vertices.push(43.75);vertices.push(1);vertices.push(-10.5);vertices.push(30.25);vertices.push(1);vertices.push(-2.25);vertices.push(48.25);vertices.push(1);vertices.push(13.600000381469727);vertices.push(33.900001525878906);vertices.push(1);vertices.push(-18.799999237060547);vertices.push(12.649999618530273);vertices.push(1);vertices.push(-2.25);vertices.push(48.25);vertices.push(1);vertices.push(-10.5);vertices.push(30.25);vertices.push(1);vertices.push(-18.799999237060547);vertices.push(12.649999618530273);vertices.push(1);vertices.push(-26.200000762939453);vertices.push(40);vertices.push(1);vertices.push(-2.25);vertices.push(48.25);vertices.push(1);vertices.push(-28);vertices.push(30.25);vertices.push(1);vertices.push(-26.200000762939453);vertices.push(40);vertices.push(1);vertices.push(-18.799999237060547);vertices.push(12.649999618530273);vertices.push(1);vertices.push(-26.200000762939453);vertices.push(40);vertices.push(1);vertices.push(-28);vertices.push(30.25);vertices.push(1);vertices.push(-28.149999618530273);vertices.push(33.900001525878906);vertices.push(1);vertices.push(-54.95000076293945);vertices.push(-98.5);vertices.push(1);vertices.push(-56.5);vertices.push(-67.30000305175781);vertices.push(1);vertices.push(-50.5);vertices.push(-85);vertices.push(1);vertices.push(-69.75);vertices.push(-109.25);vertices.push(1);vertices.push(-56.5);vertices.push(-67.30000305175781);vertices.push(1);vertices.push(-54.95000076293945);vertices.push(-98.5);vertices.push(1);vertices.push(-69.75);vertices.push(-109.25);vertices.push(1);vertices.push(-69.75);vertices.push(-58.45000076293945);vertices.push(1);vertices.push(-56.5);vertices.push(-67.30000305175781);vertices.push(1);vertices.push(-69.75);vertices.push(-109.25);vertices.push(1);vertices.push(-83);vertices.push(-61.599998474121094);vertices.push(1);vertices.push(-69.75);vertices.push(-58.45000076293945);vertices.push(1);vertices.push(-83.05000305175781);vertices.push(-95);vertices.push(1);vertices.push(-83);vertices.push(-61.599998474121094);vertices.push(1);vertices.push(-69.75);vertices.push(-109.25);vertices.push(1);vertices.push(-87.3499984741211);vertices.push(-85);vertices.push(1);vertices.push(-83);vertices.push(-61.599998474121094);vertices.push(1);vertices.push(-83.05000305175781);vertices.push(-95);vertices.push(1);vertices.push(-83);vertices.push(-61.599998474121094);vertices.push(1);vertices.push(-87.3499984741211);vertices.push(-85);vertices.push(1);vertices.push(-89);vertices.push(-80);vertices.push(1);vertices.push(-106.25);vertices.push(74.25);vertices.push(1);vertices.push(-108.6500015258789);vertices.push(94.8499984741211);vertices.push(1);vertices.push(-104.5);vertices.push(80.6500015258789);vertices.push(1);vertices.push(-113.25);vertices.push(70.75);vertices.push(1);vertices.push(-108.6500015258789);vertices.push(94.8499984741211);vertices.push(1);vertices.push(-106.25);vertices.push(74.25);vertices.push(1);vertices.push(-113.25);vertices.push(70.75);vertices.push(1);vertices.push(-117.75);vertices.push(100);vertices.push(1);vertices.push(-108.6500015258789);vertices.push(94.8499984741211);vertices.push(1);vertices.push(-123.75);vertices.push(79);vertices.push(1);vertices.push(-117.75);vertices.push(100);vertices.push(1);vertices.push(-113.25);vertices.push(70.75);vertices.push(1);vertices.push(-123.75);vertices.push(79);vertices.push(1);vertices.push(-126.8499984741211);vertices.push(97.3499984741211);vertices.push(1);vertices.push(-117.75);vertices.push(100);vertices.push(1);vertices.push(-126.8499984741211);vertices.push(97.3499984741211);vertices.push(1);vertices.push(-123.75);vertices.push(79);vertices.push(1);vertices.push(-131);vertices.push(88.1500015258789);vertices.push(1);vertices.push(-96.94999694824219);vertices.push(-11.050000190734863);vertices.push(1);vertices.push(-99.5);vertices.push(17.799999237060547);vertices.push(1);vertices.push(-96.5);vertices.push(-2.75);vertices.push(1);vertices.push(-96.94999694824219);vertices.push(-11.050000190734863);vertices.push(1);vertices.push(-102.5);vertices.push(32.04999923706055);vertices.push(1);vertices.push(-99.5);vertices.push(17.799999237060547);vertices.push(1);vertices.push(-102.5);vertices.push(32.04999923706055);vertices.push(1);vertices.push(-104.1500015258789);vertices.push(52.95000076293945);vertices.push(1);vertices.push(-102.5);vertices.push(40.75);vertices.push(1);vertices.push(-105.25);vertices.push(-17.25);vertices.push(1);vertices.push(-102.5);vertices.push(32.04999923706055);vertices.push(1);vertices.push(-96.94999694824219);vertices.push(-11.050000190734863);vertices.push(1);vertices.push(-105.25);vertices.push(-17.25);vertices.push(1);vertices.push(-104.1500015258789);vertices.push(52.95000076293945);vertices.push(1);vertices.push(-102.5);vertices.push(32.04999923706055);vertices.push(1);vertices.push(-105.25);vertices.push(-17.25);vertices.push(1);vertices.push(-117.25);vertices.push(54.75);vertices.push(1);vertices.push(-104.1500015258789);vertices.push(52.95000076293945);vertices.push(1);vertices.push(-117.94999694824219);vertices.push(7.449999809265137);vertices.push(1);vertices.push(-117.25);vertices.push(54.75);vertices.push(1);vertices.push(-105.25);vertices.push(-17.25);vertices.push(1);vertices.push(-117.94999694824219);vertices.push(7.449999809265137);vertices.push(1);vertices.push(-119.6500015258789);vertices.push(43.79999923706055);vertices.push(1);vertices.push(-117.25);vertices.push(54.75);vertices.push(1);vertices.push(-119.69999694824219);vertices.push(24.700000762939453);vertices.push(1);vertices.push(-119.6500015258789);vertices.push(43.79999923706055);vertices.push(1);vertices.push(-117.94999694824219);vertices.push(7.449999809265137);vertices.push(1);vertices.push(-119.6500015258789);vertices.push(43.79999923706055);vertices.push(1);vertices.push(-119.69999694824219);vertices.push(24.700000762939453);vertices.push(1);vertices.push(-120);vertices.push(33);vertices.push(1);vertices.push(-102.4000015258789);vertices.push(46.25);vertices.push(1);vertices.push(-102.5);vertices.push(40.75);vertices.push(1);vertices.push(-104.1500015258789);vertices.push(52.95000076293945);vertices.push(1);vertices.push(-216.5);vertices.push(-25.5);vertices.push(1);vertices.push(-218.4499969482422);vertices.push(-29.850000381469727);vertices.push(1);vertices.push(-216.5);vertices.push(24.75);vertices.push(1);vertices.push(-144.5);vertices.push(-8.5);vertices.push(1);vertices.push(-144.5);vertices.push(3.1500000953674316);vertices.push(1);vertices.push(-144.25);vertices.push(-1.25);vertices.push(1);vertices.push(-144.5);vertices.push(-8.5);vertices.push(1);vertices.push(-152.5500030517578);vertices.push(35.900001525878906);vertices.push(1);vertices.push(-144.5);vertices.push(3.1500000953674316);vertices.push(1);vertices.push(-153.25);vertices.push(-18.25);vertices.push(1);vertices.push(-152.5500030517578);vertices.push(35.900001525878906);vertices.push(1);vertices.push(-144.5);vertices.push(-8.5);vertices.push(1);vertices.push(-160.64999389648438);vertices.push(-8.899999618530273);vertices.push(1);vertices.push(-152.5500030517578);vertices.push(35.900001525878906);vertices.push(1);vertices.push(-153.25);vertices.push(-18.25);vertices.push(1);vertices.push(-163.0500030517578);vertices.push(4.150000095367432);vertices.push(1);vertices.push(-152.5500030517578);vertices.push(35.900001525878906);vertices.push(1);vertices.push(-160.64999389648438);vertices.push(-8.899999618530273);vertices.push(1);vertices.push(-164.75);vertices.push(11.600000381469727);vertices.push(1);vertices.push(-152.5500030517578);vertices.push(35.900001525878906);vertices.push(1);vertices.push(-163.0500030517578);vertices.push(4.150000095367432);vertices.push(1);vertices.push(-167.85000610351563);vertices.push(25.25);vertices.push(1);vertices.push(-152.5500030517578);vertices.push(35.900001525878906);vertices.push(1);vertices.push(-164.75);vertices.push(11.600000381469727);vertices.push(1);vertices.push(-173.35000610351563);vertices.push(32.150001525878906);vertices.push(1);vertices.push(-152.5500030517578);vertices.push(35.900001525878906);vertices.push(1);vertices.push(-167.85000610351563);vertices.push(25.25);vertices.push(1);vertices.push(-180.85000610351563);vertices.push(41.5);vertices.push(1);vertices.push(-152.5500030517578);vertices.push(35.900001525878906);vertices.push(1);vertices.push(-173.35000610351563);vertices.push(32.150001525878906);vertices.push(1);vertices.push(-180.85000610351563);vertices.push(41.5);vertices.push(1);vertices.push(-212.5);vertices.push(59.5);vertices.push(1);vertices.push(-152.5500030517578);vertices.push(35.900001525878906);vertices.push(1);vertices.push(-194.25);vertices.push(41.5);vertices.push(1);vertices.push(-212.5);vertices.push(59.5);vertices.push(1);vertices.push(-180.85000610351563);vertices.push(41.5);vertices.push(1);vertices.push(-212.75);vertices.push(41.25);vertices.push(1);vertices.push(-212.5);vertices.push(59.5);vertices.push(1);vertices.push(-194.25);vertices.push(41.5);vertices.push(1);vertices.push(-212.75);vertices.push(41.25);vertices.push(1);vertices.push(-212.60000610351563);vertices.push(76.5999984741211);vertices.push(1);vertices.push(-212.5);vertices.push(59.5);vertices.push(1);vertices.push(-212.75);vertices.push(41.25);vertices.push(1);vertices.push(-214);vertices.push(93.75);vertices.push(1);vertices.push(-212.60000610351563);vertices.push(76.5999984741211);vertices.push(1);vertices.push(-214.10000610351563);vertices.push(38.70000076293945);vertices.push(1);vertices.push(-214);vertices.push(93.75);vertices.push(1);vertices.push(-212.75);vertices.push(41.25);vertices.push(1);vertices.push(-215.0500030517578);vertices.push(33);vertices.push(1);vertices.push(-214);vertices.push(93.75);vertices.push(1);vertices.push(-214.10000610351563);vertices.push(38.70000076293945);vertices.push(1);vertices.push(-215.0500030517578);vertices.push(33);vertices.push(1);vertices.push(-216.3000030517578);vertices.push(102.6500015258789);vertices.push(1);vertices.push(-214);vertices.push(93.75);vertices.push(1);vertices.push(-216.5);vertices.push(24.75);vertices.push(1);vertices.push(-216.3000030517578);vertices.push(102.6500015258789);vertices.push(1);vertices.push(-215.0500030517578);vertices.push(33);vertices.push(1);vertices.push(-218.4499969482422);vertices.push(-29.850000381469727);vertices.push(1);vertices.push(-216.3000030517578);vertices.push(102.6500015258789);vertices.push(1);vertices.push(-216.5);vertices.push(24.75);vertices.push(1);vertices.push(-218.4499969482422);vertices.push(-29.850000381469727);vertices.push(1);vertices.push(-219.25);vertices.push(111);vertices.push(1);vertices.push(-216.3000030517578);vertices.push(102.6500015258789);vertices.push(1);vertices.push(-225.25);vertices.push(-33.25);vertices.push(1);vertices.push(-219.25);vertices.push(111);vertices.push(1);vertices.push(-218.4499969482422);vertices.push(-29.850000381469727);vertices.push(1);vertices.push(-230);vertices.push(61.29999923706055);vertices.push(1);vertices.push(-219.25);vertices.push(111);vertices.push(1);vertices.push(-225.25);vertices.push(-33.25);vertices.push(1);vertices.push(-230);vertices.push(66.9000015258789);vertices.push(1);vertices.push(-219.25);vertices.push(111);vertices.push(1);vertices.push(-230);vertices.push(61.29999923706055);vertices.push(1);vertices.push(-230);vertices.push(78.25);vertices.push(1);vertices.push(-219.25);vertices.push(111);vertices.push(1);vertices.push(-230);vertices.push(66.9000015258789);vertices.push(1);vertices.push(-230);vertices.push(78.25);vertices.push(1);vertices.push(-231.64999389648438);vertices.push(116.69999694824219);vertices.push(1);vertices.push(-219.25);vertices.push(111);vertices.push(1);vertices.push(-234);vertices.push(93.44999694824219);vertices.push(1);vertices.push(-231.64999389648438);vertices.push(116.69999694824219);vertices.push(1);vertices.push(-230);vertices.push(78.25);vertices.push(1);vertices.push(-234);vertices.push(93.44999694824219);vertices.push(1);vertices.push(-236.1999969482422);vertices.push(112.0999984741211);vertices.push(1);vertices.push(-231.64999389648438);vertices.push(116.69999694824219);vertices.push(1);vertices.push(-236.1999969482422);vertices.push(112.0999984741211);vertices.push(1);vertices.push(-234);vertices.push(93.44999694824219);vertices.push(1);vertices.push(-238);vertices.push(107.4000015258789);vertices.push(1);vertices.push(-225.25);vertices.push(-33.25);vertices.push(1);vertices.push(-232);vertices.push(39.29999923706055);vertices.push(1);vertices.push(-230);vertices.push(61.29999923706055);vertices.push(1);vertices.push(-233.9499969482422);vertices.push(-12.25);vertices.push(1);vertices.push(-232);vertices.push(39.29999923706055);vertices.push(1);vertices.push(-225.25);vertices.push(-33.25);vertices.push(1);vertices.push(-233.9499969482422);vertices.push(-12.25);vertices.push(1);vertices.push(-234);vertices.push(9.149999618530273);vertices.push(1);vertices.push(-232);vertices.push(39.29999923706055);vertices.push(1);vertices.push(-234);vertices.push(9.149999618530273);vertices.push(1);vertices.push(-233.9499969482422);vertices.push(-12.25);vertices.push(1);vertices.push(-234.25);vertices.push(2.299999952316284);vertices.push(1);vertices.push(-109.25);vertices.push(-104.75);vertices.push(1);vertices.push(-114.4000015258789);vertices.push(-74.80000305175781);vertices.push(1);vertices.push(-106.5);vertices.push(-94.5999984741211);vertices.push(1);vertices.push(-125.25);vertices.push(-112.25);vertices.push(1);vertices.push(-114.4000015258789);vertices.push(-74.80000305175781);vertices.push(1);vertices.push(-109.25);vertices.push(-104.75);vertices.push(1);vertices.push(-125.25);vertices.push(-112.25);vertices.push(1);vertices.push(-131.75);vertices.push(-64.6500015258789);vertices.push(1);vertices.push(-114.4000015258789);vertices.push(-74.80000305175781);vertices.push(1);vertices.push(-125.25);vertices.push(-112.25);vertices.push(1);vertices.push(-149.10000610351563);vertices.push(-65.69999694824219);vertices.push(1);vertices.push(-131.75);vertices.push(-64.6500015258789);vertices.push(1);vertices.push(-152.1999969482422);vertices.push(-95.75);vertices.push(1);vertices.push(-149.10000610351563);vertices.push(-65.69999694824219);vertices.push(1);vertices.push(-125.25);vertices.push(-112.25);vertices.push(1);vertices.push(-156.1999969482422);vertices.push(-84.5);vertices.push(1);vertices.push(-149.10000610351563);vertices.push(-65.69999694824219);vertices.push(1);vertices.push(-152.1999969482422);vertices.push(-95.75);vertices.push(1);vertices.push(-149.10000610351563);vertices.push(-65.69999694824219);vertices.push(1);vertices.push(-156.1999969482422);vertices.push(-84.5);vertices.push(1);vertices.push(-157);vertices.push(-79.5999984741211);vertices.push(1);vertices.push(-47.20000076293945);vertices.push(-163);vertices.push(1);vertices.push(-43.70000076293945);vertices.push(-119.8499984741211);vertices.push(1);vertices.push(-40.5);vertices.push(-131.5);vertices.push(1);vertices.push(-47.20000076293945);vertices.push(-163);vertices.push(1);vertices.push(-50.75);vertices.push(-113.94999694824219);vertices.push(1);vertices.push(-43.70000076293945);vertices.push(-119.8499984741211);vertices.push(1);vertices.push(-47.20000076293945);vertices.push(-163);vertices.push(1);vertices.push(-57.79999923706055);vertices.push(-114.3499984741211);vertices.push(1);vertices.push(-50.75);vertices.push(-113.94999694824219);vertices.push(1);vertices.push(-47.20000076293945);vertices.push(-163);vertices.push(1);vertices.push(-58);vertices.push(-132);vertices.push(1);vertices.push(-57.79999923706055);vertices.push(-114.3499984741211);vertices.push(1);vertices.push(-47.20000076293945);vertices.push(-163);vertices.push(1);vertices.push(-58.95000076293945);vertices.push(-138.60000610351563);vertices.push(1);vertices.push(-58);vertices.push(-132);vertices.push(1);vertices.push(-47.20000076293945);vertices.push(-163);vertices.push(1);vertices.push(-60.349998474121094);vertices.push(-146.35000610351563);vertices.push(1);vertices.push(-58.95000076293945);vertices.push(-138.60000610351563);vertices.push(1);vertices.push(-47.20000076293945);vertices.push(-163);vertices.push(1);vertices.push(-62.95000076293945);vertices.push(-152.75);vertices.push(1);vertices.push(-60.349998474121094);vertices.push(-146.35000610351563);vertices.push(1);vertices.push(-47.20000076293945);vertices.push(-163);vertices.push(1);vertices.push(-71.25);vertices.push(-173.25);vertices.push(1);vertices.push(-62.95000076293945);vertices.push(-152.75);vertices.push(1);vertices.push(-88.25);vertices.push(-191.10000610351563);vertices.push(1);vertices.push(-71.25);vertices.push(-173.25);vertices.push(1);vertices.push(-47.20000076293945);vertices.push(-163);vertices.push(1);vertices.push(-88.25);vertices.push(-191.10000610351563);vertices.push(1);vertices.push(-88);vertices.push(-173.25);vertices.push(1);vertices.push(-71.25);vertices.push(-173.25);vertices.push(1);vertices.push(-88.25);vertices.push(-191.10000610351563);vertices.push(1);vertices.push(-122.69999694824219);vertices.push(-173.25);vertices.push(1);vertices.push(-88);vertices.push(-173.25);vertices.push(1);vertices.push(-146.4499969482422);vertices.push(-167.5);vertices.push(1);vertices.push(-122.69999694824219);vertices.push(-173.25);vertices.push(1);vertices.push(-88.25);vertices.push(-191.10000610351563);vertices.push(1);vertices.push(-146.4499969482422);vertices.push(-167.5);vertices.push(1);vertices.push(-138.1999969482422);vertices.push(-150.5);vertices.push(1);vertices.push(-122.69999694824219);vertices.push(-173.25);vertices.push(1);vertices.push(-146.4499969482422);vertices.push(-167.5);vertices.push(1);vertices.push(-140.5500030517578);vertices.push(-147.0500030517578);vertices.push(1);vertices.push(-138.1999969482422);vertices.push(-150.5);vertices.push(1);vertices.push(-146.4499969482422);vertices.push(-167.5);vertices.push(1);vertices.push(-143.14999389648438);vertices.push(-142.14999389648438);vertices.push(1);vertices.push(-140.5500030517578);vertices.push(-147.0500030517578);vertices.push(1);vertices.push(-146.4499969482422);vertices.push(-167.5);vertices.push(1);vertices.push(-147);vertices.push(-134.85000610351563);vertices.push(1);vertices.push(-143.14999389648438);vertices.push(-142.14999389648438);vertices.push(1);vertices.push(-146.4499969482422);vertices.push(-167.5);vertices.push(1);vertices.push(-155.25);vertices.push(-127.75);vertices.push(1);vertices.push(-147);vertices.push(-134.85000610351563);vertices.push(1);vertices.push(-159.8000030517578);vertices.push(-149.4499969482422);vertices.push(1);vertices.push(-155.25);vertices.push(-127.75);vertices.push(1);vertices.push(-146.4499969482422);vertices.push(-167.5);vertices.push(1);vertices.push(-159.8000030517578);vertices.push(-149.4499969482422);vertices.push(1);vertices.push(-163);vertices.push(-132.25);vertices.push(1);vertices.push(-155.25);vertices.push(-127.75);vertices.push(1);vertices.push(-163);vertices.push(-132.25);vertices.push(1);vertices.push(-159.8000030517578);vertices.push(-149.4499969482422);vertices.push(1);vertices.push(-164);vertices.push(-137.5);vertices.push(1);vertices.push(-58);vertices.push(-129.25);vertices.push(1);vertices.push(-57.79999923706055);vertices.push(-114.3499984741211);vertices.push(1);vertices.push(-58);vertices.push(-132);vertices.push(1);vertices.push(-59.5);vertices.push(-127.1500015258789);vertices.push(1);vertices.push(-57.79999923706055);vertices.push(-114.3499984741211);vertices.push(1);vertices.push(-58);vertices.push(-129.25);vertices.push(1);vertices.push(-57.79999923706055);vertices.push(-114.3499984741211);vertices.push(1);vertices.push(-59.5);vertices.push(-127.1500015258789);vertices.push(1);vertices.push(-61);vertices.push(-121.8499984741211);vertices.push(1);
	                curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(1);curves.push(1);curves.push(0.5);curves.push(0);curves.push(0);curves.push(0);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);curves.push(0.5);curves.push(1);
	        */
	        this.addSolidTris();
	        this.addTexturedTris();
	        this._view.camera.z += 750;
	    };
	    CurveDemo.prototype.addSolidTris = function () {
	        var vertices = new Array();
	        vertices.push(-300, -50, 1);
	        vertices.push(-200, 50, 1);
	        vertices.push(-100, -50, 1);
	        vertices.push(-100, -50, -1);
	        vertices.push(0, 50, -1);
	        vertices.push(100, -50, -1);
	        vertices.push(100, -50, 1);
	        vertices.push(200, 50, 1);
	        vertices.push(300, -50, 1);
	        vertices.push(-100, 20, -1);
	        vertices.push(-150, 40, -1);
	        vertices.push(-100, 60, -1);
	        vertices.push(100, 20, 1);
	        vertices.push(50, 40, 1);
	        vertices.push(100, 60, 1);
	        vertices.push(0, 0 + 50, 1);
	        vertices.push(50, 0 + 50, 1);
	        vertices.push(0, -50 + 50, 1);
	        vertices.push(0, 0 + 50, 1);
	        vertices.push(0, -50 + 50, 1);
	        vertices.push(-50, 0 + 50, 1);
	        vertices.push(0, 0 + 50, 1);
	        vertices.push(-50, 0 + 50, 1);
	        vertices.push(0, 50 + 50, 1);
	        vertices.push(0, 0 + 50, 1);
	        vertices.push(0, 50 + 50, 1);
	        vertices.push(50, 0 + 50, 1);
	        vertices.push(0, 0 + 150, 1);
	        vertices.push(50, 0 + 150, 1);
	        vertices.push(0, -50 + 150, 1);
	        vertices.push(0, 0 + 150, 1);
	        vertices.push(0, -50 + 150, 1);
	        vertices.push(-50, 0 + 150, 1);
	        vertices.push(0, 0 + 150, 1);
	        vertices.push(-50, 0 + 150, 1);
	        vertices.push(0, 50 + 150, 1);
	        vertices.push(0, 0 + 150, 1);
	        vertices.push(0, 50 + 150, 1);
	        vertices.push(50, 0 + 150, 1);
	        var indices = new Array();
	        indices.push(0, 1, 2);
	        indices.push(3, 4, 5);
	        indices.push(6, 7, 8);
	        indices.push(9, 10, 11);
	        indices.push(12, 13, 14);
	        indices.push(15, 16, 17);
	        indices.push(18, 19, 20);
	        indices.push(21, 22, 23);
	        indices.push(24, 25, 26);
	        indices.push(27, 28, 29);
	        indices.push(30, 31, 32);
	        indices.push(33, 34, 35);
	        indices.push(36, 37, 38);
	        var curves = new Array();
	        curves.push(2, 1);
	        curves.push(2, 0);
	        curves.push(2, 0);
	        curves.push(0, 0);
	        curves.push(0.5, 0);
	        curves.push(1, 1);
	        curves.push(0, 0);
	        curves.push(0.5, 0);
	        curves.push(1, 1);
	        curves.push(0, 0);
	        curves.push(0.5, 0);
	        curves.push(1, 1);
	        curves.push(0, 0);
	        curves.push(0.5, 0);
	        curves.push(1, 1);
	        curves.push(2, 1);
	        curves.push(2, 0);
	        curves.push(2, 0);
	        curves.push(2, 1);
	        curves.push(2, 0);
	        curves.push(2, 0);
	        curves.push(2, 1);
	        curves.push(2, 0);
	        curves.push(2, 0);
	        curves.push(2, 1);
	        curves.push(2, 0);
	        curves.push(2, 0);
	        curves.push(2, 1);
	        curves.push(3, 1);
	        curves.push(4, 1);
	        curves.push(2, 1);
	        curves.push(3, 1);
	        curves.push(4, 1);
	        curves.push(2, 1);
	        curves.push(3, 1);
	        curves.push(4, 1);
	        curves.push(2, 1);
	        curves.push(3, 1);
	        curves.push(4, 1);
	        var curveSubGeometry = new CurveSubGeometry_1.default(new AttributesBuffer_1.default());
	        curveSubGeometry.autoDeriveUVs = false;
	        curveSubGeometry.setPositions(vertices);
	        curveSubGeometry.setIndices(indices);
	        curveSubGeometry.setCurves(curves);
	        var geom = new Geometry_1.default();
	        geom.addSubGeometry(curveSubGeometry);
	        var curveSprite = new Sprite_1.default(geom);
	        curveSprite.transform.colorTransform = new ColorTransform_1.default(1, 1, 1, 1, 0, 0, 0, 0);
	        var curveMaterial = new BasicMaterial_1.default(0xFFFFFF, 0.5);
	        curveMaterial.preserveAlpha = true;
	        curveMaterial.alphaBlending = true;
	        curveMaterial.useColorTransform = true;
	        curveSprite.material = curveMaterial;
	        //this._view.scene.addChild(curveSprite);
	        this._container.addChild(curveSprite);
	    };
	    CurveDemo.prototype.addTexturedTris = function () {
	        var _this = this;
	        var vertices = new Array();
	        vertices.push(-300, -50 - 100, 1);
	        vertices.push(-200, 50 - 100, 1);
	        vertices.push(-100, -50 - 100, 1);
	        vertices.push(-100, -50 - 100, -1);
	        vertices.push(0, 50 - 100, -1);
	        vertices.push(100, -50 - 100, -1);
	        vertices.push(100, -50 - 100, 1);
	        vertices.push(200, 50 - 100, 1);
	        vertices.push(300, -50 - 100, 1);
	        var indices = new Array();
	        indices.push(0, 1, 2);
	        indices.push(3, 4, 5);
	        indices.push(6, 7, 8);
	        var curves = new Array();
	        curves.push(2, 1);
	        curves.push(3, 1);
	        curves.push(4, 1);
	        curves.push(0, 0);
	        curves.push(0.5, 0);
	        curves.push(1, 1);
	        curves.push(0, 0);
	        curves.push(0.5, 0);
	        curves.push(1, 1);
	        var uvs = new Array();
	        uvs.push(0, 0);
	        uvs.push(0.5, 1);
	        uvs.push(1, 0);
	        uvs.push(0, 0);
	        uvs.push(0.5, 1);
	        uvs.push(1, 0);
	        uvs.push(0, 0);
	        uvs.push(0.5, 1);
	        uvs.push(1, 0);
	        var curveSubGeometry = new CurveSubGeometry_1.default(new AttributesBuffer_1.default());
	        curveSubGeometry.autoDeriveUVs = false;
	        curveSubGeometry.setPositions(vertices);
	        curveSubGeometry.setIndices(indices);
	        curveSubGeometry.setCurves(curves);
	        curveSubGeometry.setUVs(uvs);
	        var geom = new Geometry_1.default();
	        geom.addSubGeometry(curveSubGeometry);
	        var curveSprite = new Sprite_1.default(geom);
	        curveSprite._pPickingCollider = new JSPickingCollider_1.default();
	        curveSprite.mouseEnabled = true;
	        curveSprite.mouseChildren = true;
	        curveSprite.addEventListener(MouseEvent_1.default.MOUSE_OVER, function (event) { return _this.onSpriteMouseOver(event); });
	        var curveMaterial = new BasicMaterial_1.default(this._texture);
	        curveMaterial.preserveAlpha = true;
	        curveMaterial.alphaBlending = true;
	        //curveMaterial.blendMode = BlendMode.ALPHA;
	        //curveMaterial.alphaPremultiplied = false;
	        //curveMaterial.alphaThreshold = 0;
	        curveSprite.transform.colorTransform = new ColorTransform_1.default(1, 1, 1, 1, 0, 0, 0, 0);
	        //curveSprite.subSpritees[0].colorTransform = new ColorTransform(1,1,1,1, 0,0,0,0);
	        curveSprite.material = curveMaterial;
	        curveMaterial.useColorTransform = true;
	        //this._view.scene.addChild(curveSprite);
	        this._container.addChild(curveSprite);
	    };
	    /**
	     * sprite listener for mouse over interaction
	     */
	    CurveDemo.prototype.onSpriteMouseOver = function (event) {
	        var sprite = event.object;
	        console.log("MESH MOUSE OVER");
	    };
	    /**
	     *
	     */
	    CurveDemo.prototype.imageCompleteHandler = function (event) {
	        this.initLights();
	        this.initMaterial(event.target);
	        this.initTorus();
	    };
	    /**
	     *
	     */
	    CurveDemo.prototype.render = function (dt) {
	        if (dt === void 0) { dt = null; }
	        if (this._sprite)
	            this._sprite.rotationY += 1;
	        this._view.render();
	    };
	    /**
	     *
	     */
	    CurveDemo.prototype.onResize = function (event) {
	        if (event === void 0) { event = null; }
	        this._view.y = 0;
	        this._view.x = 0;
	        this._view.width = window.innerWidth;
	        this._view.height = window.innerHeight;
	    };
	    return CurveDemo;
	}());
	window.onload = function () {
	    new CurveDemo();
	};


/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BitmapImage2D_1 = __webpack_require__(74);
	var ByteArray_1 = __webpack_require__(126);
	var ParserUtils = (function () {
	    function ParserUtils() {
	    }
	    ParserUtils.arrayBufferToBase64 = function (data, mimeType) {
	        var byteStr = '';
	        var bytes = new Uint8Array(data);
	        var len = bytes.byteLength;
	        for (var i = 0; i < len; i++)
	            byteStr += String.fromCharCode(bytes[i]);
	        var base64Image = window.btoa(byteStr);
	        return 'data:' + mimeType + ';base64,' + base64Image;
	    };
	    ParserUtils.arrayBufferToAudio = function (data, fileType) {
	        var str = ParserUtils.arrayBufferToBase64(data, 'audio/' + fileType);
	        var audio = new Audio();
	        audio.src = str;
	        return audio;
	    };
	    /**
	     * Converts an ArrayBuffer to a base64 string
	     *
	     * @param image data as a ByteArray
	     *
	     * @return HTMLImageElement
	     *
	     */
	    ParserUtils.arrayBufferToImage = function (data) {
	        var str = ParserUtils.arrayBufferToBase64(data, 'image/png');
	        var img = new Image();
	        img.src = str;
	        return img;
	    };
	    /**
	     * Converts an ByteArray to an Image - returns an HTMLImageElement
	     *
	     * @param image data as a ByteArray
	     *
	     * @return HTMLImageElement
	     *
	     */
	    ParserUtils.byteArrayToImage = function (data) {
	        var str = ParserUtils.arrayBufferToBase64(data.arraybytes, 'image/png');
	        var img = new Image();
	        img.src = str;
	        return img;
	    };
	    ParserUtils.byteArrayToAudio = function (data, filetype) {
	        var str = ParserUtils.arrayBufferToBase64(data.arraybytes, 'audio/' + filetype);
	        var audio = new Audio();
	        audio.src = str;
	        return audio;
	    };
	    /**
	     * Converts an Blob to an Image - returns an HTMLImageElement
	     *
	     * @param image data as a Blob
	     *
	     * @return HTMLImageElement
	     *
	     */
	    ParserUtils.blobToImage = function (data) {
	        var URLObj = window['URL'] || window['webkitURL'];
	        var src = URLObj.createObjectURL(data);
	        var img = new Image();
	        img.src = src;
	        return img;
	    };
	    /**
	     * Converts an Blob to audio - returns an HTMLAudioElement
	     *
	     * @param audio data as a Blob
	     *
	     * @return HTMLAudioElement
	     *
	     */
	    ParserUtils.blobToAudio = function (data) {
	        var URLObj = window['URL'] || window['webkitURL'];
	        var src = URLObj.createObjectURL(data);
	        var img = new Audio();
	        img.src = src;
	        return img;
	    };
	    /**
	     *
	     */
	    ParserUtils.imageToBitmapImage2D = function (img, powerOfTwo) {
	        if (powerOfTwo === void 0) { powerOfTwo = true; }
	        var bitmapData = new BitmapImage2D_1.default(img.width, img.height, true, null, powerOfTwo);
	        bitmapData.draw(img);
	        return bitmapData;
	    };
	    /**
	     * Returns a object as ByteArray, if possible.
	     *
	     * @param data The object to return as ByteArray
	     *
	     * @return The ByteArray or null
	     *
	     */
	    ParserUtils.toByteArray = function (data) {
	        var b = new ByteArray_1.default();
	        b.setArrayBuffer(data);
	        return b;
	    };
	    /**
	     * Returns a object as String, if possible.
	     *
	     * @param data The object to return as String
	     * @param length The length of the returned String
	     *
	     * @return The String or null
	     *
	     */
	    ParserUtils.toString = function (data, length) {
	        if (length === void 0) { length = 0; }
	        if (typeof data === 'string') {
	            var s = data;
	            if (s['substr'] != null)
	                return s.substr(0, s.length);
	        }
	        if (data instanceof ByteArray_1.default) {
	            var ba = data;
	            ba.position = 0;
	            return ba.readUTFBytes(Math.min(ba.getBytesAvailable(), length));
	        }
	        return null;
	        /*
	         var ba:ByteArray;

	         length ||= uint.MAX_VALUE;

	         if (data is String)
	         return String(data).substr(0, length);

	         ba = toByteArray(data);
	         if (ba) {
	         ba.position = 0;
	         return ba.readUTFBytes(Math.min(ba.bytesAvailable, length));
	         }

	         return null;

	         */
	    };
	    return ParserUtils;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ParserUtils;


/***/ },

/***/ 256:
/***/ function(module, exports) {

	"use strict";
	var MethodMaterialMode = (function () {
	    function MethodMaterialMode() {
	    }
	    /**
	     *
	     */
	    MethodMaterialMode.SINGLE_PASS = "singlePass";
	    /**
	     *
	     */
	    MethodMaterialMode.MULTI_PASS = "multiPass";
	    return MethodMaterialMode;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MethodMaterialMode;


/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Image2D_1 = __webpack_require__(75);
	var MaterialBase_1 = __webpack_require__(95);
	var Single2DTexture_1 = __webpack_require__(96);
	var ContextGLCompareMode_1 = __webpack_require__(117);
	var MethodMaterialMode_1 = __webpack_require__(256);
	var AmbientBasicMethod_1 = __webpack_require__(258);
	var DiffuseBasicMethod_1 = __webpack_require__(261);
	var NormalBasicMethod_1 = __webpack_require__(263);
	var SpecularBasicMethod_1 = __webpack_require__(264);
	/**
	 * MethodMaterial forms an abstract base class for the default shaded materials provided by Stage,
	 * using material methods to define their appearance.
	 */
	var MethodMaterial = (function (_super) {
	    __extends(MethodMaterial, _super);
	    function MethodMaterial(imageColor, alpha) {
	        if (imageColor === void 0) { imageColor = null; }
	        if (alpha === void 0) { alpha = 1; }
	        _super.call(this, imageColor, alpha);
	        this._effectMethods = new Array();
	        this._ambientMethod = new AmbientBasicMethod_1.default();
	        this._diffuseMethod = new DiffuseBasicMethod_1.default();
	        this._normalMethod = new NormalBasicMethod_1.default();
	        this._specularMethod = new SpecularBasicMethod_1.default();
	        this._depthCompareMode = ContextGLCompareMode_1.default.LESS_EQUAL;
	        this._mode = MethodMaterialMode_1.default.SINGLE_PASS;
	        //add default methods owners
	        this._ambientMethod.iAddOwner(this);
	        this._diffuseMethod.iAddOwner(this);
	        this._normalMethod.iAddOwner(this);
	        this._specularMethod.iAddOwner(this);
	        //set a texture if an image is present
	        if (imageColor instanceof Image2D_1.default)
	            this._ambientMethod.texture = new Single2DTexture_1.default();
	    }
	    Object.defineProperty(MethodMaterial.prototype, "assetType", {
	        /**
	         *
	         */
	        get: function () {
	            return MethodMaterial.assetType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MethodMaterial.prototype, "mode", {
	        get: function () {
	            return this._mode;
	        },
	        set: function (value) {
	            if (this._mode == value)
	                return;
	            this._mode = value;
	            this.invalidate();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MethodMaterial.prototype, "depthCompareMode", {
	        /**
	         * The depth compare mode used to render the renderables using this material.
	         *
	         * @see away.stagegl.ContextGLCompareMode
	         */
	        get: function () {
	            return this._depthCompareMode;
	        },
	        set: function (value) {
	            if (this._depthCompareMode == value)
	                return;
	            this._depthCompareMode = value;
	            this.invalidate();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MethodMaterial.prototype, "diffuseTexture", {
	        /**
	         * The texture object to use for the ambient colour.
	         */
	        get: function () {
	            return this._diffuseMethod.texture;
	        },
	        set: function (value) {
	            this._diffuseMethod.texture = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MethodMaterial.prototype, "ambientMethod", {
	        /**
	         * The method that provides the ambient lighting contribution. Defaults to AmbientBasicMethod.
	         */
	        get: function () {
	            return this._ambientMethod;
	        },
	        set: function (value) {
	            if (this._ambientMethod == value)
	                return;
	            if (this._ambientMethod)
	                this._ambientMethod.iRemoveOwner(this);
	            this._ambientMethod = value;
	            if (this._ambientMethod)
	                this._ambientMethod.iAddOwner(this);
	            this.invalidate();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MethodMaterial.prototype, "shadowMethod", {
	        /**
	         * The method used to render shadows cast on this surface, or null if no shadows are to be rendered. Defaults to null.
	         */
	        get: function () {
	            return this._shadowMethod;
	        },
	        set: function (value) {
	            if (this._shadowMethod == value)
	                return;
	            if (this._shadowMethod)
	                this._shadowMethod.iRemoveOwner(this);
	            this._shadowMethod = value;
	            if (this._shadowMethod)
	                this._shadowMethod.iAddOwner(this);
	            this.invalidate();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MethodMaterial.prototype, "diffuseMethod", {
	        /**
	         * The method that provides the diffuse lighting contribution. Defaults to DiffuseBasicMethod.
	         */
	        get: function () {
	            return this._diffuseMethod;
	        },
	        set: function (value) {
	            if (this._diffuseMethod == value)
	                return;
	            if (this._diffuseMethod)
	                this._diffuseMethod.iRemoveOwner(this);
	            this._diffuseMethod = value;
	            if (this._diffuseMethod)
	                this._diffuseMethod.iAddOwner(this);
	            this.invalidate();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MethodMaterial.prototype, "specularMethod", {
	        /**
	         * The method that provides the specular lighting contribution. Defaults to SpecularBasicMethod.
	         */
	        get: function () {
	            return this._specularMethod;
	        },
	        set: function (value) {
	            if (this._specularMethod == value)
	                return;
	            if (this._specularMethod)
	                this._specularMethod.iRemoveOwner(this);
	            this._specularMethod = value;
	            if (this._specularMethod)
	                this._specularMethod.iAddOwner(this);
	            this.invalidate();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MethodMaterial.prototype, "normalMethod", {
	        /**
	         * The method used to generate the per-pixel normals. Defaults to NormalBasicMethod.
	         */
	        get: function () {
	            return this._normalMethod;
	        },
	        set: function (value) {
	            if (this._normalMethod == value)
	                return;
	            if (this._normalMethod)
	                this._normalMethod.iRemoveOwner(this);
	            this._normalMethod = value;
	            if (this._normalMethod)
	                this._normalMethod.iAddOwner(this);
	            this.invalidate();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MethodMaterial.prototype, "numEffectMethods", {
	        get: function () {
	            return this._effectMethods.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Appends an "effect" shading method to the shader. Effect methods are those that do not influence the lighting
	     * but modulate the shaded colour, used for fog, outlines, etc. The method will be applied to the result of the
	     * methods added prior.
	     */
	    MethodMaterial.prototype.addEffectMethod = function (method) {
	        method.iAddOwner(this);
	        this._effectMethods.push(method);
	        this.invalidate();
	    };
	    /**
	     * Returns the method added at the given index.
	     * @param index The index of the method to retrieve.
	     * @return The method at the given index.
	     */
	    MethodMaterial.prototype.getEffectMethodAt = function (index) {
	        return this._effectMethods[index];
	    };
	    /**
	     * Adds an effect method at the specified index amongst the methods already added to the material. Effect
	     * methods are those that do not influence the lighting but modulate the shaded colour, used for fog, outlines,
	     * etc. The method will be applied to the result of the methods with a lower index.
	     */
	    MethodMaterial.prototype.addEffectMethodAt = function (method, index) {
	        method.iAddOwner(this);
	        this._effectMethods.splice(index, 0, method);
	        this.invalidate();
	    };
	    /**
	     * Removes an effect method from the material.
	     * @param method The method to be removed.
	     */
	    MethodMaterial.prototype.removeEffectMethod = function (method) {
	        method.iRemoveOwner(this);
	        this._effectMethods.splice(this._effectMethods.indexOf(method), 1);
	        this.invalidate();
	    };
	    MethodMaterial.assetType = "[materials MethodMaterial]";
	    return MethodMaterial;
	}(MaterialBase_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MethodMaterial;


/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AssetEvent_1 = __webpack_require__(1);
	var ShadingMethodBase_1 = __webpack_require__(259);
	/**
	 * AmbientBasicMethod provides the default shading method for uniform ambient lighting.
	 */
	var AmbientBasicMethod = (function (_super) {
	    __extends(AmbientBasicMethod, _super);
	    /**
	     * Creates a new AmbientBasicMethod object.
	     */
	    function AmbientBasicMethod() {
	        _super.call(this);
	        this._alpha = 1;
	        this._colorR = 1;
	        this._colorG = 1;
	        this._colorB = 1;
	        this._strength = 1;
	    }
	    /**
	     * @inheritDoc
	     */
	    AmbientBasicMethod.prototype.iInitVO = function (shader, methodVO) {
	        if (this._texture) {
	            methodVO.textureGL = shader.getAbstraction(this._texture);
	            shader.uvDependencies++;
	        }
	        else if (methodVO.textureGL) {
	            methodVO.textureGL.onClear(new AssetEvent_1.default(AssetEvent_1.default.CLEAR, this._texture));
	            methodVO.textureGL = null;
	        }
	    };
	    /**
	     * @inheritDoc
	     */
	    AmbientBasicMethod.prototype.iInitConstants = function (shader, methodVO) {
	        if (!methodVO.textureGL) {
	            this._color = shader.numLights ? 0xFFFFFF : methodVO.pass._surface.style.color;
	            this.updateColor();
	        }
	    };
	    Object.defineProperty(AmbientBasicMethod.prototype, "strength", {
	        /**
	         * The strength of the ambient reflection of the surface.
	         */
	        get: function () {
	            return this._strength;
	        },
	        set: function (value) {
	            if (this._strength == value)
	                return;
	            this._strength = value;
	            this.updateColor();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AmbientBasicMethod.prototype, "alpha", {
	        /**
	         * The alpha component of the surface.
	         */
	        get: function () {
	            return this._alpha;
	        },
	        set: function (value) {
	            if (this._alpha == value)
	                return;
	            this._alpha = value;
	            this.updateColor();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AmbientBasicMethod.prototype, "texture", {
	        /**
	         * The texture to use to define the diffuse reflection color per texel.
	         */
	        get: function () {
	            return this._texture;
	        },
	        set: function (value) {
	            if (this._texture == value)
	                return;
	            if (this._texture)
	                this.iRemoveTexture(this._texture);
	            this._texture = value;
	            if (this._texture)
	                this.iAddTexture(this._texture);
	            this.iInvalidateShaderProgram();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @inheritDoc
	     */
	    AmbientBasicMethod.prototype.copyFrom = function (method) {
	        var m = method;
	        var b = m;
	    };
	    /**
	     * @inheritDoc
	     */
	    AmbientBasicMethod.prototype.iGetFragmentCode = function (shader, methodVO, targetReg, registerCache, sharedRegisters) {
	        var code = "";
	        if (methodVO.textureGL) {
	            code += methodVO.textureGL._iGetFragmentCode(targetReg, registerCache, sharedRegisters, sharedRegisters.uvVarying);
	            if (shader.alphaThreshold > 0) {
	                var cutOffReg = registerCache.getFreeFragmentConstant();
	                methodVO.fragmentConstantsIndex = cutOffReg.index * 4;
	                code += "sub " + targetReg + ".w, " + targetReg + ".w, " + cutOffReg + ".x\n" +
	                    "kil " + targetReg + ".w\n" +
	                    "add " + targetReg + ".w, " + targetReg + ".w, " + cutOffReg + ".x\n";
	            }
	        }
	        else {
	            var ambientInputRegister = registerCache.getFreeFragmentConstant();
	            methodVO.fragmentConstantsIndex = ambientInputRegister.index * 4;
	            code += "mov " + targetReg + ", " + ambientInputRegister + "\n";
	        }
	        return code;
	    };
	    /**
	     * @inheritDoc
	     */
	    AmbientBasicMethod.prototype.iActivate = function (shader, methodVO, stage) {
	        if (methodVO.textureGL) {
	            methodVO.textureGL.activate(methodVO.pass._render);
	            if (shader.alphaThreshold > 0)
	                shader.fragmentConstantData[methodVO.fragmentConstantsIndex] = shader.alphaThreshold;
	        }
	        else {
	            var index = methodVO.fragmentConstantsIndex;
	            var data = shader.fragmentConstantData;
	            data[index] = this._colorR;
	            data[index + 1] = this._colorG;
	            data[index + 2] = this._colorB;
	            data[index + 3] = this._alpha;
	        }
	    };
	    AmbientBasicMethod.prototype.iSetRenderState = function (shader, methodVO, renderable, stage, camera) {
	        if (methodVO.textureGL)
	            methodVO.textureGL._setRenderState(renderable);
	    };
	    /**
	     * Updates the ambient color data used by the render state.
	     */
	    AmbientBasicMethod.prototype.updateColor = function () {
	        this._colorR = ((this._color >> 16) & 0xff) / 0xff * this._strength;
	        this._colorG = ((this._color >> 8) & 0xff) / 0xff * this._strength;
	        this._colorB = (this._color & 0xff) / 0xff * this._strength;
	    };
	    return AmbientBasicMethod;
	}(ShadingMethodBase_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AmbientBasicMethod;


/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AssetBase_1 = __webpack_require__(27);
	var ShadingMethodEvent_1 = __webpack_require__(260);
	/**
	 * ShadingMethodBase provides an abstract base method for shading methods, used by compiled passes to compile
	 * the final shading program.
	 */
	var ShadingMethodBase = (function (_super) {
	    __extends(ShadingMethodBase, _super);
	    /**
	     * Create a new ShadingMethodBase object.
	     */
	    function ShadingMethodBase() {
	        _super.call(this);
	        this._textures = new Array();
	        this._owners = new Array();
	        this._counts = new Array();
	    }
	    Object.defineProperty(ShadingMethodBase.prototype, "assetType", {
	        /**
	         * @inheritDoc
	         */
	        get: function () {
	            return ShadingMethodBase.assetType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ShadingMethodBase.prototype.iIsUsed = function (shader) {
	        return true;
	    };
	    /**
	     * Initializes the properties for a MethodVO, including register and texture indices.
	     *
	     * @param methodVO The MethodVO object linking this method with the pass currently being compiled.
	     *
	     * @internal
	     */
	    ShadingMethodBase.prototype.iInitVO = function (shader, methodVO) {
	    };
	    /**
	     * Initializes unchanging shader constants using the data from a MethodVO.
	     *
	     * @param methodVO The MethodVO object linking this method with the pass currently being compiled.
	     *
	     * @internal
	     */
	    ShadingMethodBase.prototype.iInitConstants = function (shader, methodVO) {
	    };
	    /**
	     * Indicates whether or not this method expects normals in tangent space. Override for object-space normals.
	     */
	    ShadingMethodBase.prototype.iUsesTangentSpace = function () {
	        return true;
	    };
	    /**
	     * Cleans up any resources used by the current object.
	     */
	    ShadingMethodBase.prototype.dispose = function () {
	    };
	    ShadingMethodBase.prototype.iAddOwner = function (owner) {
	        //a method can be used more than once in the same material, so we check for this
	        var index = this._owners.indexOf(owner);
	        if (index != -1) {
	            this._counts[index]++;
	        }
	        else {
	            this._owners.push(owner);
	            this._counts.push(1);
	            //add textures
	            var len = this._textures.length;
	            for (var i = 0; i < len; i++)
	                owner.addTexture(this._textures[i]);
	        }
	    };
	    ShadingMethodBase.prototype.iRemoveOwner = function (owner) {
	        var index = this._owners.indexOf(owner);
	        if (this._counts[index] != 1) {
	            this._counts[index]--;
	        }
	        else {
	            this._owners.splice(index, 1);
	            this._counts.splice(index, 1);
	            //remove textures
	            var len = this._textures.length;
	            for (var i = 0; i < len; i++)
	                owner.removeTexture(this._textures[i]);
	        }
	    };
	    /**
	     *
	     */
	    ShadingMethodBase.prototype.iAddTexture = function (texture) {
	        this._textures.push(texture);
	        var len = this._owners.length;
	        for (var i = 0; i < len; i++)
	            this._owners[i].addTexture(texture);
	    };
	    /**
	     *
	     */
	    ShadingMethodBase.prototype.iRemoveTexture = function (texture) {
	        this._textures.splice(this._textures.indexOf(texture), 1);
	        var len = this._owners.length;
	        for (var i = 0; i < len; i++)
	            this._owners[i].removeTexture(texture);
	    };
	    /**
	     * Resets the compilation state of the method.
	     *
	     * @internal
	     */
	    ShadingMethodBase.prototype.iReset = function () {
	        this.iCleanCompilationData();
	    };
	    /**
	     * Resets the method's state for compilation.
	     *
	     * @internal
	     */
	    ShadingMethodBase.prototype.iCleanCompilationData = function () {
	    };
	    /**
	     * Get the vertex shader code for this method.
	     * @param vo The MethodVO object linking this method with the pass currently being compiled.
	     * @param regCache The register cache used during the compilation.
	     *
	     * @internal
	     */
	    ShadingMethodBase.prototype.iGetVertexCode = function (shader, methodVO, registerCache, sharedRegisters) {
	        return "";
	    };
	    /**
	     * @inheritDoc
	     */
	    ShadingMethodBase.prototype.iGetFragmentCode = function (shader, methodVO, targetReg, registerCache, sharedRegisters) {
	        return null;
	    };
	    /**
	     * Sets the render state for this method.
	     *
	     * @param methodVO The MethodVO object linking this method with the pass currently being compiled.
	     * @param stage The Stage object currently used for rendering.
	     *
	     * @internal
	     */
	    ShadingMethodBase.prototype.iActivate = function (shader, methodVO, stage) {
	    };
	    /**
	     * Sets the render state for a single renderable.
	     *
	     * @param vo The MethodVO object linking this method with the pass currently being compiled.
	     * @param renderable The renderable currently being rendered.
	     * @param stage The Stage object currently used for rendering.
	     * @param camera The camera from which the scene is currently rendered.
	     *
	     * @internal
	     */
	    ShadingMethodBase.prototype.iSetRenderState = function (shader, methodVO, renderable, stage, camera) {
	    };
	    /**
	     * Clears the render state for this method.
	     * @param vo The MethodVO object linking this method with the pass currently being compiled.
	     * @param stage The Stage object currently used for rendering.
	     *
	     * @internal
	     */
	    ShadingMethodBase.prototype.iDeactivate = function (shader, methodVO, stage) {
	    };
	    /**
	     * Marks the shader program as invalid, so it will be recompiled before the next render.
	     *
	     * @internal
	     */
	    ShadingMethodBase.prototype.iInvalidateShaderProgram = function () {
	        this.dispatchEvent(new ShadingMethodEvent_1.default(ShadingMethodEvent_1.default.SHADER_INVALIDATED));
	    };
	    /**
	     * Copies the state from a ShadingMethodBase object into the current object.
	     */
	    ShadingMethodBase.prototype.copyFrom = function (method) {
	    };
	    ShadingMethodBase.assetType = "[asset ShadingMethod]";
	    return ShadingMethodBase;
	}(AssetBase_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ShadingMethodBase;


/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AssetEvent_1 = __webpack_require__(1);
	var LightingMethodBase_1 = __webpack_require__(262);
	/**
	 * DiffuseBasicMethod provides the default shading method for Lambert (dot3) diffuse lighting.
	 */
	var DiffuseBasicMethod = (function (_super) {
	    __extends(DiffuseBasicMethod, _super);
	    /**
	     * Creates a new DiffuseBasicMethod object.
	     */
	    function DiffuseBasicMethod() {
	        _super.call(this);
	        this._multiply = true;
	        this._ambientColorR = 1;
	        this._ambientColorG = 1;
	        this._ambientColorB = 1;
	        this._color = 0xffffff;
	        this._colorR = 1;
	        this._colorG = 1;
	        this._colorB = 1;
	    }
	    DiffuseBasicMethod.prototype.iIsUsed = function (shader) {
	        if (!shader.numLights)
	            return false;
	        return true;
	    };
	    Object.defineProperty(DiffuseBasicMethod.prototype, "multiply", {
	        /**
	         * Set internally if diffuse color component multiplies or replaces the ambient color
	         */
	        get: function () {
	            return this._multiply;
	        },
	        set: function (value) {
	            if (this._multiply == value)
	                return;
	            this._multiply = value;
	            this.iInvalidateShaderProgram();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DiffuseBasicMethod.prototype.iInitVO = function (shader, methodVO) {
	        if (this._texture) {
	            methodVO.textureGL = shader.getAbstraction(this._texture);
	            shader.uvDependencies++;
	        }
	        else if (methodVO.textureGL) {
	            methodVO.textureGL.onClear(new AssetEvent_1.default(AssetEvent_1.default.CLEAR, null));
	            methodVO.textureGL = null;
	        }
	        if (shader.numLights > 0) {
	            shader.usesCommonData = true;
	            methodVO.needsNormals = true;
	        }
	    };
	    /**
	     * @inheritDoc
	     */
	    DiffuseBasicMethod.prototype.iInitConstants = function (shader, methodVO) {
	        if (shader.numLights > 0) {
	            this._ambientColor = methodVO.pass._surface.style.color;
	            this.updateAmbientColor();
	        }
	        else {
	            this._ambientColor = null;
	        }
	    };
	    Object.defineProperty(DiffuseBasicMethod.prototype, "color", {
	        /**
	         * The color of the diffuse reflection when not using a texture.
	         */
	        get: function () {
	            return this._color;
	        },
	        set: function (value) {
	            if (this._color == value)
	                return;
	            this._color = value;
	            this.updateColor();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DiffuseBasicMethod.prototype, "texture", {
	        /**
	         * The texture to use to define the diffuse reflection color per texel.
	         */
	        get: function () {
	            return this._texture;
	        },
	        set: function (value) {
	            if (this._texture == value)
	                return;
	            if (this._texture)
	                this.iRemoveTexture(this._texture);
	            this._texture = value;
	            if (this._texture)
	                this.iAddTexture(this._texture);
	            this.iInvalidateShaderProgram();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @inheritDoc
	     */
	    DiffuseBasicMethod.prototype.dispose = function () {
	        this._texture = null;
	    };
	    /**
	     * @inheritDoc
	     */
	    DiffuseBasicMethod.prototype.copyFrom = function (method) {
	        var diff = method;
	        this.texture = diff.texture;
	        this.multiply = diff.multiply;
	        this.color = diff.color;
	    };
	    /**
	     * @inheritDoc
	     */
	    DiffuseBasicMethod.prototype.iCleanCompilationData = function () {
	        _super.prototype.iCleanCompilationData.call(this);
	        this._pTotalLightColorReg = null;
	    };
	    /**
	     * @inheritDoc
	     */
	    DiffuseBasicMethod.prototype.iGetFragmentPreLightingCode = function (shader, methodVO, registerCache, sharedRegisters) {
	        var code = "";
	        this._pIsFirstLight = true;
	        registerCache.addFragmentTempUsages(this._pTotalLightColorReg = registerCache.getFreeFragmentVectorTemp(), 1);
	        return code;
	    };
	    /**
	     * @inheritDoc
	     */
	    DiffuseBasicMethod.prototype.iGetFragmentCodePerLight = function (shader, methodVO, lightDirReg, lightColReg, registerCache, sharedRegisters) {
	        var code = "";
	        var t;
	        // write in temporary if not first light, so we can add to total diffuse colour
	        if (this._pIsFirstLight) {
	            t = this._pTotalLightColorReg;
	        }
	        else {
	            t = registerCache.getFreeFragmentVectorTemp();
	            registerCache.addFragmentTempUsages(t, 1);
	        }
	        code += "dp3 " + t + ".x, " + lightDirReg + ", " + sharedRegisters.normalFragment + "\n" +
	            "max " + t + ".w, " + t + ".x, " + sharedRegisters.commons + ".y\n";
	        if (shader.usesLightFallOff)
	            code += "mul " + t + ".w, " + t + ".w, " + lightDirReg + ".w\n";
	        if (this._iModulateMethod != null)
	            code += this._iModulateMethod(shader, methodVO, t, registerCache, sharedRegisters);
	        code += "mul " + t + ", " + t + ".w, " + lightColReg + "\n";
	        if (!this._pIsFirstLight) {
	            code += "add " + this._pTotalLightColorReg + ".xyz, " + this._pTotalLightColorReg + ", " + t + "\n";
	            registerCache.removeFragmentTempUsage(t);
	        }
	        this._pIsFirstLight = false;
	        return code;
	    };
	    /**
	     * @inheritDoc
	     */
	    DiffuseBasicMethod.prototype.iGetFragmentCodePerProbe = function (shader, methodVO, cubeMapReg, weightRegister, registerCache, sharedRegisters) {
	        var code = "";
	        var t;
	        // write in temporary if not first light, so we can add to total diffuse colour
	        if (this._pIsFirstLight) {
	            t = this._pTotalLightColorReg;
	        }
	        else {
	            t = registerCache.getFreeFragmentVectorTemp();
	            registerCache.addFragmentTempUsages(t, 1);
	        }
	        code += "tex " + t + ", " + sharedRegisters.normalFragment + ", " + cubeMapReg + " <cube,linear,miplinear>\n" +
	            "mul " + t + ".xyz, " + t + ".xyz, " + weightRegister + "\n";
	        if (this._iModulateMethod != null)
	            code += this._iModulateMethod(shader, methodVO, t, registerCache, sharedRegisters);
	        if (!this._pIsFirstLight) {
	            code += "add " + this._pTotalLightColorReg + ".xyz, " + this._pTotalLightColorReg + ", " + t + "\n";
	            registerCache.removeFragmentTempUsage(t);
	        }
	        this._pIsFirstLight = false;
	        return code;
	    };
	    /**
	     * @inheritDoc
	     */
	    DiffuseBasicMethod.prototype.iGetFragmentPostLightingCode = function (shader, methodVO, targetReg, registerCache, sharedRegisters) {
	        var code = "";
	        var diffuseColor;
	        var cutOffReg;
	        // incorporate input from ambient
	        if (sharedRegisters.shadowTarget)
	            code += this.pApplyShadow(shader, methodVO, registerCache, sharedRegisters);
	        registerCache.addFragmentTempUsages(diffuseColor = registerCache.getFreeFragmentVectorTemp(), 1);
	        var ambientColorRegister = registerCache.getFreeFragmentConstant();
	        methodVO.fragmentConstantsIndex = ambientColorRegister.index * 4;
	        if (this._texture) {
	            code += methodVO.textureGL._iGetFragmentCode(diffuseColor, registerCache, sharedRegisters, sharedRegisters.uvVarying);
	        }
	        else {
	            var diffuseInputRegister = registerCache.getFreeFragmentConstant();
	            code += "mov " + diffuseColor + ", " + diffuseInputRegister + "\n";
	        }
	        code += "sat " + this._pTotalLightColorReg + ", " + this._pTotalLightColorReg + "\n" +
	            "mul " + diffuseColor + ".xyz, " + diffuseColor + ", " + this._pTotalLightColorReg + "\n";
	        if (this._multiply) {
	            code += "add " + diffuseColor + ".xyz, " + diffuseColor + ", " + ambientColorRegister + "\n" +
	                "mul " + targetReg + ".xyz, " + targetReg + ", " + diffuseColor + "\n";
	        }
	        else if (this._texture) {
	            code += "mul " + targetReg + ".xyz, " + targetReg + ", " + ambientColorRegister + "\n" +
	                "mul " + this._pTotalLightColorReg + ".xyz, " + targetReg + ", " + this._pTotalLightColorReg + "\n" +
	                "sub " + targetReg + ".xyz, " + targetReg + ", " + this._pTotalLightColorReg + "\n" +
	                "add " + targetReg + ".xyz, " + targetReg + ", " + diffuseColor + "\n"; //add diffuse color and ambient color
	        }
	        else {
	            code += "mul " + this._pTotalLightColorReg + ".xyz, " + ambientColorRegister + ", " + this._pTotalLightColorReg + "\n" +
	                "sub " + this._pTotalLightColorReg + ".xyz, " + ambientColorRegister + ", " + this._pTotalLightColorReg + "\n" +
	                "add " + diffuseColor + ".xyz, " + diffuseColor + ", " + this._pTotalLightColorReg + "\n" +
	                "mul " + targetReg + ".xyz, " + targetReg + ", " + diffuseColor + "\n"; // multiply by target which could be texture or white
	        }
	        registerCache.removeFragmentTempUsage(this._pTotalLightColorReg);
	        registerCache.removeFragmentTempUsage(diffuseColor);
	        return code;
	    };
	    /**
	     * Generate the code that applies the calculated shadow to the diffuse light
	     * @param methodVO The MethodVO object for which the compilation is currently happening.
	     * @param regCache The register cache the compiler is currently using for the register management.
	     */
	    DiffuseBasicMethod.prototype.pApplyShadow = function (shader, methodVO, regCache, sharedRegisters) {
	        return "mul " + this._pTotalLightColorReg + ".xyz, " + this._pTotalLightColorReg + ", " + sharedRegisters.shadowTarget + ".w\n";
	    };
	    /**
	     * @inheritDoc
	     */
	    DiffuseBasicMethod.prototype.iActivate = function (shader, methodVO, stage) {
	        if (this._texture) {
	            methodVO.textureGL.activate(methodVO.pass._render);
	        }
	        else {
	            var index = methodVO.fragmentConstantsIndex;
	            var data = shader.fragmentConstantData;
	            if (this._multiply) {
	                data[index + 4] = this._colorR * this._ambientColorR;
	                data[index + 5] = this._colorG * this._ambientColorG;
	                data[index + 6] = this._colorB * this._ambientColorB;
	            }
	            else {
	                data[index + 4] = this._colorR;
	                data[index + 5] = this._colorG;
	                data[index + 6] = this._colorB;
	            }
	            data[index + 7] = 1;
	        }
	    };
	    /**
	     * Updates the diffuse color data used by the render state.
	     */
	    DiffuseBasicMethod.prototype.updateColor = function () {
	        this._colorR = ((this._color >> 16) & 0xff) / 0xff;
	        this._colorG = ((this._color >> 8) & 0xff) / 0xff;
	        this._colorB = (this._color & 0xff) / 0xff;
	    };
	    /**
	     * Updates the ambient color data used by the render state.
	     */
	    DiffuseBasicMethod.prototype.updateAmbientColor = function () {
	        this._ambientColorR = ((this._ambientColor >> 16) & 0xff) / 0xff;
	        this._ambientColorG = ((this._ambientColor >> 8) & 0xff) / 0xff;
	        this._ambientColorB = (this._ambientColor & 0xff) / 0xff;
	    };
	    /**
	     * @inheritDoc
	     */
	    DiffuseBasicMethod.prototype.iSetRenderState = function (shader, methodVO, renderable, stage, camera) {
	        if (this._texture)
	            methodVO.textureGL._setRenderState(renderable);
	        //TODO move this to Activate (ambientR/G/B currently calc'd in render state)
	        var index = methodVO.fragmentConstantsIndex;
	        var data = shader.fragmentConstantData;
	        data[index] = shader.ambientR * this._ambientColorR;
	        data[index + 1] = shader.ambientG * this._ambientColorG;
	        data[index + 2] = shader.ambientB * this._ambientColorB;
	        data[index + 3] = 1;
	    };
	    return DiffuseBasicMethod;
	}(LightingMethodBase_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = DiffuseBasicMethod;


/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ShadingMethodBase_1 = __webpack_require__(259);
	/**
	 * LightingMethodBase provides an abstract base method for shading methods that uses lights.
	 * Used for diffuse and specular shaders only.
	 */
	var LightingMethodBase = (function (_super) {
	    __extends(LightingMethodBase, _super);
	    /**
	     * Creates a new LightingMethodBase.
	     */
	    function LightingMethodBase() {
	        _super.call(this);
	    }
	    /**
	     * Get the fragment shader code that will be needed before any per-light code is added.
	     * @param methodVO The MethodVO object containing the method data for the currently compiled material pass.
	     * @param regCache The register cache used during the compilation.
	     * @private
	     */
	    LightingMethodBase.prototype.iGetFragmentPreLightingCode = function (shader, methodVO, registerCache, sharedRegisters) {
	        return "";
	    };
	    /**
	     * Get the fragment shader code that will generate the code relevant to a single light.
	     *
	     * @param methodVO The MethodVO object containing the method data for the currently compiled material pass.
	     * @param lightDirReg The register containing the light direction vector.
	     * @param lightColReg The register containing the light colour.
	     * @param regCache The register cache used during the compilation.
	     */
	    LightingMethodBase.prototype.iGetFragmentCodePerLight = function (shader, methodVO, lightDirReg, lightColReg, registerCache, sharedRegisters) {
	        return "";
	    };
	    /**
	     * Get the fragment shader code that will generate the code relevant to a single light probe object.
	     *
	     * @param methodVO The MethodVO object containing the method data for the currently compiled material pass.
	     * @param cubeMapReg The register containing the cube map for the current probe
	     * @param weightRegister A string representation of the register + component containing the current weight
	     * @param regCache The register cache providing any necessary registers to the shader
	     */
	    LightingMethodBase.prototype.iGetFragmentCodePerProbe = function (shader, methodVO, cubeMapReg, weightRegister, registerCache, sharedRegisters) {
	        return "";
	    };
	    /**
	     * Get the fragment shader code that should be added after all per-light code. Usually composits everything to the target register.
	     *
	     * @param methodVO The MethodVO object containing the method data for the currently compiled material pass.
	     * @param regCache The register cache used during the compilation.
	     * @param targetReg The register containing the final shading output.
	     * @private
	     */
	    LightingMethodBase.prototype.iGetFragmentPostLightingCode = function (shader, methodVO, targetReg, registerCache, sharedRegisters) {
	        return "";
	    };
	    return LightingMethodBase;
	}(ShadingMethodBase_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = LightingMethodBase;


/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ShadingMethodBase_1 = __webpack_require__(259);
	/**
	 * NormalBasicMethod is the default method for standard tangent-space normal mapping.
	 */
	var NormalBasicMethod = (function (_super) {
	    __extends(NormalBasicMethod, _super);
	    /**
	     * Creates a new NormalBasicMethod object.
	     */
	    function NormalBasicMethod(texture) {
	        if (texture === void 0) { texture = null; }
	        _super.call(this);
	        this._texture = texture;
	        if (this._texture)
	            this.iAddTexture(this._texture);
	    }
	    NormalBasicMethod.prototype.iIsUsed = function (shader) {
	        if (this._texture && shader.normalDependencies)
	            return true;
	        return false;
	    };
	    /**
	     * @inheritDoc
	     */
	    NormalBasicMethod.prototype.iInitVO = function (shader, methodVO) {
	        if (this._texture) {
	            methodVO.textureGL = shader.getAbstraction(this._texture);
	            shader.uvDependencies++;
	        }
	    };
	    /**
	     * Indicates whether or not this method outputs normals in tangent space. Override for object-space normals.
	     */
	    NormalBasicMethod.prototype.iOutputsTangentNormals = function () {
	        return true;
	    };
	    /**
	     * @inheritDoc
	     */
	    NormalBasicMethod.prototype.copyFrom = function (method) {
	        var s = method;
	        var bnm = method;
	        if (bnm.texture != null)
	            this.texture = bnm.texture;
	    };
	    Object.defineProperty(NormalBasicMethod.prototype, "texture", {
	        /**
	         * A texture to modulate the direction of the surface for each texel (normal map). The default normal method expects
	         * tangent-space normal maps, but others could expect object-space maps.
	         */
	        get: function () {
	            return this._texture;
	        },
	        set: function (value) {
	            if (this._texture == value)
	                return;
	            if (this._texture)
	                this.iRemoveTexture(this._texture);
	            this._texture = value;
	            if (this._texture)
	                this.iAddTexture(this._texture);
	            this.iInvalidateShaderProgram();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @inheritDoc
	     */
	    NormalBasicMethod.prototype.dispose = function () {
	        if (this._texture)
	            this._texture = null;
	    };
	    /**
	     * @inheritDoc
	     */
	    NormalBasicMethod.prototype.iActivate = function (shader, methodVO, stage) {
	        if (this._texture)
	            methodVO.textureGL.activate(methodVO.pass._render);
	    };
	    NormalBasicMethod.prototype.iSetRenderState = function (shader, methodVO, renderable, stage, camera) {
	        if (this._texture)
	            methodVO.textureGL._setRenderState(renderable);
	    };
	    /**
	     * @inheritDoc
	     */
	    NormalBasicMethod.prototype.iGetFragmentCode = function (shader, methodVO, targetReg, registerCache, sharedRegisters) {
	        var code = "";
	        if (this._texture)
	            code += methodVO.textureGL._iGetFragmentCode(targetReg, registerCache, sharedRegisters, sharedRegisters.uvVarying);
	        code += "sub " + targetReg + ".xyz, " + targetReg + ".xyz, " + sharedRegisters.commons + ".xxx\n" +
	            "nrm " + targetReg + ".xyz, " + targetReg + "\n";
	        return code;
	    };
	    return NormalBasicMethod;
	}(ShadingMethodBase_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = NormalBasicMethod;


/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AssetEvent_1 = __webpack_require__(1);
	var LightingMethodBase_1 = __webpack_require__(262);
	/**
	 * SpecularBasicMethod provides the default shading method for Blinn-Phong specular highlights (an optimized but approximated
	 * version of Phong specularity).
	 */
	var SpecularBasicMethod = (function (_super) {
	    __extends(SpecularBasicMethod, _super);
	    /**
	     * Creates a new SpecularBasicMethod object.
	     */
	    function SpecularBasicMethod() {
	        _super.call(this);
	        this._gloss = 50;
	        this._strength = 1;
	        this._color = 0xffffff;
	        this._iSpecularR = 1;
	        this._iSpecularG = 1;
	        this._iSpecularB = 1;
	    }
	    SpecularBasicMethod.prototype.iIsUsed = function (shader) {
	        if (!shader.numLights)
	            return false;
	        return true;
	    };
	    /**
	     * @inheritDoc
	     */
	    SpecularBasicMethod.prototype.iInitVO = function (shader, methodVO) {
	        methodVO.needsNormals = shader.numLights > 0;
	        methodVO.needsView = shader.numLights > 0;
	        if (this._texture) {
	            methodVO.textureGL = shader.getAbstraction(this._texture);
	            shader.uvDependencies++;
	        }
	        else if (methodVO.textureGL) {
	            methodVO.textureGL.onClear(new AssetEvent_1.default(AssetEvent_1.default.CLEAR, null));
	            methodVO.textureGL = null;
	        }
	    };
	    Object.defineProperty(SpecularBasicMethod.prototype, "gloss", {
	        /**
	         * The glossiness of the material (sharpness of the specular highlight).
	         */
	        get: function () {
	            return this._gloss;
	        },
	        set: function (value) {
	            this._gloss = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SpecularBasicMethod.prototype, "strength", {
	        /**
	         * The overall strength of the specular highlights.
	         */
	        get: function () {
	            return this._strength;
	        },
	        set: function (value) {
	            if (value == this._strength)
	                return;
	            this._strength = value;
	            this.updateSpecular();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SpecularBasicMethod.prototype, "color", {
	        /**
	         * The colour of the specular reflection of the surface.
	         */
	        get: function () {
	            return this._color;
	        },
	        set: function (value) {
	            if (this._color == value)
	                return;
	            // specular is now either enabled or disabled
	            if (this._color == 0 || value == 0)
	                this.iInvalidateShaderProgram();
	            this._color = value;
	            this.updateSpecular();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SpecularBasicMethod.prototype, "texture", {
	        /**
	         * A texture that defines the strength of specular reflections for each texel in the red channel,
	         * and the gloss factor (sharpness) in the green channel. You can use Specular2DTexture if you want to easily set
	         * specular and gloss maps from grayscale images, but correctly authored images are preferred.
	         */
	        get: function () {
	            return this._texture;
	        },
	        set: function (value) {
	            if (this._texture == value)
	                return;
	            if (this._texture)
	                this.iRemoveTexture(this._texture);
	            this._texture = value;
	            if (this._texture)
	                this.iAddTexture(this._texture);
	            this.iInvalidateShaderProgram();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * @inheritDoc
	     */
	    SpecularBasicMethod.prototype.copyFrom = function (method) {
	        var m = method;
	        var bsm = method;
	        var spec = bsm; //SpecularBasicMethod(method);
	        this.texture = spec.texture;
	        this.strength = spec.strength;
	        this.color = spec.color;
	        this.gloss = spec.gloss;
	    };
	    /**
	     * @inheritDoc
	     */
	    SpecularBasicMethod.prototype.iCleanCompilationData = function () {
	        _super.prototype.iCleanCompilationData.call(this);
	        this._pTotalLightColorReg = null;
	        this._pSpecularTexData = null;
	        this._pSpecularDataRegister = null;
	    };
	    /**
	     * @inheritDoc
	     */
	    SpecularBasicMethod.prototype.iGetFragmentPreLightingCode = function (shader, methodVO, registerCache, sharedRegisters) {
	        var code = "";
	        this._pIsFirstLight = true;
	        this._pSpecularDataRegister = registerCache.getFreeFragmentConstant();
	        methodVO.fragmentConstantsIndex = this._pSpecularDataRegister.index * 4;
	        if (this._texture) {
	            this._pSpecularTexData = registerCache.getFreeFragmentVectorTemp();
	            registerCache.addFragmentTempUsages(this._pSpecularTexData, 1);
	            code += methodVO.textureGL._iGetFragmentCode(this._pSpecularTexData, registerCache, sharedRegisters, sharedRegisters.uvVarying);
	        }
	        this._pTotalLightColorReg = registerCache.getFreeFragmentVectorTemp();
	        registerCache.addFragmentTempUsages(this._pTotalLightColorReg, 1);
	        return code;
	    };
	    /**
	     * @inheritDoc
	     */
	    SpecularBasicMethod.prototype.iGetFragmentCodePerLight = function (shader, methodVO, lightDirReg, lightColReg, registerCache, sharedRegisters) {
	        var code = "";
	        var t;
	        if (this._pIsFirstLight) {
	            t = this._pTotalLightColorReg;
	        }
	        else {
	            t = registerCache.getFreeFragmentVectorTemp();
	            registerCache.addFragmentTempUsages(t, 1);
	        }
	        var viewDirReg = sharedRegisters.viewDirFragment;
	        var normalReg = sharedRegisters.normalFragment;
	        // blinn-phong half vector model
	        code += "add " + t + ", " + lightDirReg + ", " + viewDirReg + "\n" +
	            "nrm " + t + ".xyz, " + t + "\n" +
	            "dp3 " + t + ".w, " + normalReg + ", " + t + "\n" +
	            "sat " + t + ".w, " + t + ".w\n";
	        if (this._texture) {
	            // apply gloss modulation from texture
	            code += "mul " + this._pSpecularTexData + ".w, " + this._pSpecularTexData + ".y, " + this._pSpecularDataRegister + ".w\n" +
	                "pow " + t + ".w, " + t + ".w, " + this._pSpecularTexData + ".w\n";
	        }
	        else {
	            code += "pow " + t + ".w, " + t + ".w, " + this._pSpecularDataRegister + ".w\n";
	        }
	        // attenuate
	        if (shader.usesLightFallOff)
	            code += "mul " + t + ".w, " + t + ".w, " + lightDirReg + ".w\n";
	        if (this._iModulateMethod != null)
	            code += this._iModulateMethod(shader, methodVO, t, registerCache, sharedRegisters);
	        code += "mul " + t + ".xyz, " + lightColReg + ", " + t + ".w\n";
	        if (!this._pIsFirstLight) {
	            code += "add " + this._pTotalLightColorReg + ".xyz, " + this._pTotalLightColorReg + ", " + t + "\n";
	            registerCache.removeFragmentTempUsage(t);
	        }
	        this._pIsFirstLight = false;
	        return code;
	    };
	    /**
	     * @inheritDoc
	     */
	    SpecularBasicMethod.prototype.iGetFragmentCodePerProbe = function (shader, methodVO, cubeMapReg, weightRegister, registerCache, sharedRegisters) {
	        var code = "";
	        var t;
	        // write in temporary if not first light, so we can add to total diffuse colour
	        if (this._pIsFirstLight) {
	            t = this._pTotalLightColorReg;
	        }
	        else {
	            t = registerCache.getFreeFragmentVectorTemp();
	            registerCache.addFragmentTempUsages(t, 1);
	        }
	        var normalReg = sharedRegisters.normalFragment;
	        var viewDirReg = sharedRegisters.viewDirFragment;
	        code += "dp3 " + t + ".w, " + normalReg + ", " + viewDirReg + "\n" +
	            "add " + t + ".w, " + t + ".w, " + t + ".w\n" +
	            "mul " + t + ", " + t + ".w, " + normalReg + "\n" +
	            "sub " + t + ", " + t + ", " + viewDirReg + "\n" +
	            "tex " + t + ", " + t + ", " + cubeMapReg + " <cube," + "linear" + ",miplinear>\n" +
	            "mul " + t + ".xyz, " + t + ", " + weightRegister + "\n";
	        if (this._iModulateMethod != null)
	            code += this._iModulateMethod(shader, methodVO, t, registerCache, sharedRegisters);
	        if (!this._pIsFirstLight) {
	            code += "add " + this._pTotalLightColorReg + ".xyz, " + this._pTotalLightColorReg + ", " + t + "\n";
	            registerCache.removeFragmentTempUsage(t);
	        }
	        this._pIsFirstLight = false;
	        return code;
	    };
	    /**
	     * @inheritDoc
	     */
	    SpecularBasicMethod.prototype.iGetFragmentPostLightingCode = function (shader, methodVO, targetReg, registerCache, sharedRegisters) {
	        var code = "";
	        if (sharedRegisters.shadowTarget)
	            code += "mul " + this._pTotalLightColorReg + ".xyz, " + this._pTotalLightColorReg + ", " + sharedRegisters.shadowTarget + ".w\n";
	        if (this._texture) {
	            // apply strength modulation from texture
	            code += "mul " + this._pTotalLightColorReg + ".xyz, " + this._pTotalLightColorReg + ", " + this._pSpecularTexData + ".x\n";
	            registerCache.removeFragmentTempUsage(this._pSpecularTexData);
	        }
	        // apply material's specular reflection
	        code += "mul " + this._pTotalLightColorReg + ".xyz, " + this._pTotalLightColorReg + ", " + this._pSpecularDataRegister + "\n" +
	            "add " + targetReg + ".xyz, " + targetReg + ", " + this._pTotalLightColorReg + "\n";
	        registerCache.removeFragmentTempUsage(this._pTotalLightColorReg);
	        return code;
	    };
	    /**
	     * @inheritDoc
	     */
	    SpecularBasicMethod.prototype.iActivate = function (shader, methodVO, stage) {
	        if (this._texture)
	            methodVO.textureGL.activate(methodVO.pass._render);
	        var index = methodVO.fragmentConstantsIndex;
	        var data = shader.fragmentConstantData;
	        data[index] = this._iSpecularR;
	        data[index + 1] = this._iSpecularG;
	        data[index + 2] = this._iSpecularB;
	        data[index + 3] = this._gloss;
	    };
	    SpecularBasicMethod.prototype.iSetRenderState = function (shader, methodVO, renderable, stage, camera) {
	        if (this._texture)
	            methodVO.textureGL._setRenderState(renderable);
	    };
	    /**
	     * Updates the specular color data used by the render state.
	     */
	    SpecularBasicMethod.prototype.updateSpecular = function () {
	        this._iSpecularR = ((this._color >> 16) & 0xff) / 0xff * this._strength;
	        this._iSpecularG = ((this._color >> 8) & 0xff) / 0xff * this._strength;
	        this._iSpecularB = (this._color & 0xff) / 0xff * this._strength;
	    };
	    return SpecularBasicMethod;
	}(LightingMethodBase_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SpecularBasicMethod;


/***/ }

});