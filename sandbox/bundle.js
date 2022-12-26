var GM;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GrowMap": () => (/* binding */ GrowMap)
/* harmony export */ });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var GrowMap = /** @class */ (function () {
    function GrowMap(container, things) {
        var _this = this;
        /**
         * Подготавливаем положение элементов
         */
        this.preparePositions = function () {
            _this.preparedThings = _this.preparedThings.map(_this.preparePosition);
            console.log('Things sizes are prepared.');
        };
        this.preparePosition = function (preparedThing, i, preparedThings) {
            var parent = preparedThing.parent;
            var globPadding = _this.params.globPadding;
            if (!parent) {
                if (i === 0) {
                    preparedThing.position.x = 0;
                    preparedThing.position.y = 0;
                }
                else {
                    var slicedPreparedThings = preparedThings.slice(0, i);
                    var previousGap = slicedPreparedThings.reduce(function (previousValue, currentValue) {
                        return previousValue + currentValue.size.width + globPadding;
                    }, 0);
                    preparedThing.position.x = previousGap;
                    preparedThing.position.y = 0;
                }
            }
            if (parent) {
                var isParentExists = true;
                var highParent = parent;
                var yPosition = 0;
                while (isParentExists) {
                    yPosition = yPosition + highParent.size.height + globPadding;
                    if (highParent.parent) {
                        highParent = highParent.parent;
                    }
                    else {
                        isParentExists = false;
                    }
                }
                preparedThing.position.y = yPosition;
                if (i === 0) {
                    preparedThing.position.x = parent.position.x;
                }
                else {
                    var slicedPreparedThings = preparedThings.slice(0, i);
                    var previousGap = slicedPreparedThings.reduce(function (previousValue, currentValue) {
                        return previousValue + currentValue.size.width + _this.params.globPadding;
                    }, 0);
                    previousGap = previousGap + parent.position.x;
                    preparedThing.position.x = previousGap;
                }
            }
            var getChildrenWidth = function (children) {
                var commonWidth = 0;
                children.forEach(function (element, index) {
                    if (index === 0) {
                        // const biggestElem =  (element.parent.size.width >= element.size.width) ? element.parent.size.width : element.size.width;
                        var smallestElem = (element.parent.size.width <= element.size.width) ? element.parent.size.width : element.size.width;
                        commonWidth = commonWidth - smallestElem;
                    }
                    commonWidth = commonWidth + element.size.width + _this.params.globPadding;
                    if (element.children) {
                        var anotherChildrenWidth = getChildrenWidth(element.children);
                        commonWidth = commonWidth + anotherChildrenWidth;
                    }
                });
                commonWidth = commonWidth - _this.params.globPadding;
                return commonWidth;
            };
            if (i !== 0) {
                var allChildrenWidth_1 = 0;
                var previousThings = preparedThings.slice(0, i);
                previousThings.forEach(function (thing) {
                    if (thing.children) {
                        allChildrenWidth_1 = allChildrenWidth_1 + getChildrenWidth(thing.children);
                    }
                });
                preparedThing.position.x = preparedThing.position.x + allChildrenWidth_1;
            }
            if (preparedThing.children) {
                preparedThing.children = preparedThing.children.map(function () {
                    var props = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        props[_i] = arguments[_i];
                    }
                    return _this.preparePosition.apply(_this, props);
                });
            }
            return preparedThing;
        };
        /**
         * ----------------------
         */
        /**
         * Вычисляем размеры элементов
         */
        this.prepareThingsSizes = function () {
            _this.preparedThings = _this.things.map(_this.prepareThingSize);
            console.log('Things sizes are prepared.');
        };
        this.prepareThingSize = function (thing, i, things, parentPreparedThing) {
            var preparedThing = {
                size: {
                    width: null,
                    height: null,
                    fontSize: null,
                    padding: null,
                },
                name: null,
                position: {
                    x: null,
                    y: null,
                }
            };
            preparedThing.name = thing.name;
            if (parentPreparedThing) {
                preparedThing.parent = parentPreparedThing;
            }
            // Вычисляем ширину и высоту текстового элемента
            var thingSize = _this.getThingSize(thing);
            preparedThing.size = {
                width: thingSize.width,
                height: thingSize.height,
                fontSize: thingSize.fontSize,
                padding: thingSize.padding,
            };
            if (thing.children) {
                preparedThing.children = thing.children.map(function () {
                    var props = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        props[_i] = arguments[_i];
                    }
                    return _this.prepareThingSize.apply(_this, __spreadArray(__spreadArray([], props, false), [preparedThing], false));
                });
            }
            return preparedThing;
        };
        /**
         * ----------------------
         */
        this.init = function () {
            console.log('App initialization is started.');
            _this.canvas = document.createElement('canvas');
            _this.ctx = _this.canvas.getContext('2d');
            _this.prepareThingsSizes();
            _this.preparePositions();
            var w = _this.container.clientWidth;
            var h = _this.container.clientHeight;
            _this.canvas.width = w;
            _this.canvas.height = h;
            _this.container.appendChild(_this.canvas);
            _this.ctx.translate(_this.canvas.width / 2, _this.canvas.height / 2);
            var observedContainerData = {
                previousWidth: null,
                previousHeight: null,
            };
            var containerResizeObserver = new ResizeObserver(function (entries) {
                if (!!(observedContainerData.previousWidth && observedContainerData.previousHeight) &&
                    ((entries[0].contentRect.width !== observedContainerData.previousWidth) ||
                        (entries[0].contentRect.height !== observedContainerData.previousHeight))) {
                    console.warn('Container size is changed - reload the app.');
                    containerResizeObserver.unobserve(_this.container);
                    _this.reload();
                }
                observedContainerData.previousWidth = entries[0].contentRect.width;
                observedContainerData.previousHeight = entries[0].contentRect.height;
            });
            containerResizeObserver.observe(_this.container);
            console.log('App is started.');
            window.requestAnimationFrame(function () {
                _this.drawBG();
                _this.drawThings(_this.preparedThings);
            });
        };
        this.drawThings = function (preparedThings) {
            preparedThings.forEach(function (preparedThing) {
                _this.drawRectangle(preparedThing);
                if (preparedThing.children) {
                    _this.drawThings(preparedThing.children);
                }
            });
        };
        this.reload = function () {
            console.log('App reload is started.');
            _this.container.innerHTML = '';
            _this.init();
        };
        this.getThingSize = function (thing) {
            var fontSize = _this.params.fontSize * _this.params.zoom;
            var textMetrics = _this.getTextSize(thing.name, fontSize);
            var p = (fontSize / 4);
            var rectW = (p + textMetrics.width + p);
            var rectH = (p + fontSize + p);
            return {
                fontSize: fontSize,
                width: rectW,
                height: rectH,
                padding: p,
            };
        };
        this.drawRectangle = function (thing) {
            _this.ctx.fillStyle = _this.params.rectColor;
            _this.ctx.fillRect(thing.position.x, thing.position.y, thing.size.width, thing.size.height);
            _this.drawText(thing.name, thing.position.x + thing.size.padding, thing.position.y + (thing.size.padding / 2) + thing.size.fontSize, thing.size.fontSize);
        };
        this.getTextSize = function (text, fontSize) {
            var previousFont = _this.ctx.font;
            _this.ctx.font = "".concat(fontSize, "px serif");
            var measuredText = _this.ctx.measureText(text);
            _this.ctx.font = previousFont;
            return measuredText;
        };
        this.drawText = function (text, x, y, fontSize) {
            _this.ctx.font = "".concat(fontSize, "px serif");
            _this.ctx.fillStyle = _this.params.fontColor;
            _this.ctx.fillText(text, x, y);
        };
        this.drawBG = function () {
            _this.ctx.fillStyle = _this.params.bgColor;
            _this.ctx.fillRect(-(_this.canvas.width / 2), -(_this.canvas.height / 2), _this.canvas.width, _this.canvas.height);
        };
        this.container = container;
        this.ctx = null;
        this.params = {
            bgColor: 'skyblue',
            fontSize: 26,
            fontColor: 'red',
            rectColor: 'white',
            zoom: 5,
            globPadding: 20,
        };
        Object.defineProperty(this.params, 'globPadding', {
            // value: 42,
            // writable: true,
            get: function () { return this.zoom * 20; },
        });
        this.things = things;
        this.preparedThings = null;
    }
    return GrowMap;
}());


GM = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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M0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFFBQVEsRUFBRSxFQUFFO1lBQ1osU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLE9BQU87WUFDbEIsSUFBSSxFQUFFLENBQUM7WUFDUCxXQUFXLEVBQUUsRUFBRTtTQUNsQjtRQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUU7WUFDOUMsYUFBYTtZQUNiLGtCQUFrQjtZQUNsQixHQUFHLGdCQUFLLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUMsQ0FBQztTQUNsQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBeVFMLGNBQUM7QUFBRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vR00vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vR00vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0dNL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vR00vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9HTS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICog0JrQsNGA0YLQsCDRgNC+0YHRgtCwXG4gKiBcbiAqINCi0YDQtdCx0L7QstCw0L3QuNGPOlxuICogKyAxKSDQn9GA0Lgg0YHQvtC30LTQsNC90LjQuCDQutCw0YDRgtGLINC90YPQttC90L4g0YPQutCw0LfQsNGC0Ywg0LrQvtC90YLQtdC50L3QtdGAXG4gKiArIDIpINCf0YDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQutCw0YDRgtGLINCyINC60L7QvdGC0LXQudC90LXRgCDQtNC+0LHQsNCy0LvRj9C10YLRgdGPINC60LDQvdCy0LDRgVxuICogKyAzKSDQmtCw0L3QstCw0YEg0LTQvtC70LbQtdC9INGA0LDRgdGC0Y/QvdGD0YLRjNGB0Y8g0L/QviDRgNCw0LfQvNC10YDRgyDQutC+0L3RgtC10LnQvdC10YDQsFxuICogKyA0KSDQmtCw0L3QstCw0YEg0LTQvtC70LbQtdC9INGB0LvQtdC00LjRgtGMINC30LAg0YDQsNC30LzQtdGA0L7QvCDQutC+0L3RgtC10LnQvdC10YDQsCDQuCDQtdGB0LvQuCDQvtC9INC80LXQvdGP0LXRgtGB0Y8gLSDQv9C10YDQtdC30LDQs9GA0YPQttCw0YLRjCDQv9GA0LjQu9C+0LbQtdC90LjQtVxuICogNSkg0JrQsNC90LLQsNGBINC00L7Qu9C20LXQvSDQv9GA0LjQvdC40LzQsNGC0Ywg0L3QsCDQstGF0L7QtCDQvtCx0YrQtdC60YIg0LjQu9C4INC80LDRgdGB0LjQsiDQvtCx0YXQtdC60YLQvtCyINC4INGA0LjRgdC+0LLQsNGC0Ywg0LPRgNCw0YTQuNC60YNcbiAqIDYpINCa0LDQvNC10YDQsCDQtNC+0LvQttC90LAg0YbQtdC90YLRgNC+0LLQsNGC0YzRgdGPINC/0L4g0LPQu9Cw0LLQvdC+0LzRgyDQvtCx0YzQtdC60YLRgyDQuNC70Lgg0L3QsNCx0L7RgNGDINCz0LvQsNCy0L3Ri9GFINC+0LHRitC10LrRgtC+0LJcbiAqIDcpINCSINC/0YDQvtCz0YDQsNC80LzQtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YDQtdCw0LvQuNC30L7QstCw0L0g0LfRg9C8XG4gKiA4KSDQn9GA0L7Qs9GA0LDQvNC80LAg0LzQvtC20LXRgiDQsdGL0YLRjCDQt9Cw0L/Rg9GJ0LXQvdCwINC30LDQt9Cw0YPQvNC70LXQvdC+0Lkg0Log0L7RgdC90L7QstC90YvQvCDQvtCx0LXQutGC0LDQvCDQuNC70Lgg0L7RhdCy0LDRgtGL0LLQsNGPINC+0LHRidC40Lkg0YDQsNC30LzQtdGAXG4gKiA5KSDQvNC40L3QuNC80LDQu9GM0L3Ri9C5INC30YPQvCDQvtC/0YDQtdC00LXQu9GP0LXRgtGB0Y8g0YDQsNC30LzQtdGA0L7QvCDQvtGB0L3QvtCy0L3QvtCz0L4g0LHQu9C+0LrQsCAtINC80LDQutGB0LjQvNCw0LvRjNC90YvQuSDQt9GD0Lwg0L7RhdCy0LDRgtC+0Lwg0LLRgdC10YUg0LHQu9C+0LrQvtCyINC/0LvRjtGBINC+0YLRgdGC0YPQv9GLXG4gKiAxMCkg0KDQsNC30LvQuNGH0L3Ri9C1INC90LDRgdGC0YDQvtC50LrQuCDQvNC+0LbQvdC+INCy0YvQstC+0LTQuNGC0Ywg0L3QsCDRjdC60YDQsNC9INGH0YLQvtCx0Ysg0L3QsNGB0YLRgNCw0LjQstCw0YLRjCDQuNGFINC/0L7Qu9C30YPQvdC60LDQvNC4XG4gKiAxMSkg0JrQsNC20LTRi9C5INGA0L7QtNC40YLQtdC70YzRgdC60LjQuSDQvtCx0YrQtdC60YIg0LzQvtC20LXRgiDQuNC80LXRgtGMINC00L7Rh9C10YDQvdC40LlcbiAqIDEyKSDQldGB0LvQuCDQsiDQtNC+0YfQtdGA0L3QtdC8INC90LUg0YPQutCw0LfQsNC90L4g0LIg0LrQsNC60YPRjiDRgdGC0L7RgNC+0L3RgyDQvtC9INGB0LzQtdGJ0LDQtdGC0YHRjyAtINGC0L4g0L7QvSDRgdC80LXRidCw0LXRgtGB0Y8g0LIg0YHQu9GD0YfQsNC50L3Rg9GOINGB0YLQvtGA0L7QvdGDXG4gKiAxMykg0JTQvtGH0LXRgNC90LjQtSDRjdC70LXQvNC10L3RgtGLINC40LzQtdGO0YIg0L7RgtGB0YLRg9C/INC+0YIg0YDQvtC00LjRgtC10LvRjNGB0LrQvtC60L4g0Lgg0YLQsNC6INC20LUg0LjQvNC10LXRgiDQvtGC0YHRgtGD0L8g0L7RgiDRgdCy0L7QuNGFINC60YPQt9C10L3QvtCyXG4gKiAxNCkg0JXRgdGC0Ywg0LLQvtC30LzQvtC20L3QvtGB0YLRjCDQvNGL0YjQutC+0Lkg0LTQstC40LPQsNGC0Ywg0LrQsNC80LXRgNGDXG4gKiAxNSkg0KMg0L/RgNC40LvQvtC20LXQvdC40Y8g0LXRgdGC0Ywg0L3QtdC60L7RgtC+0YDQvtC1INGB0L7RgdGC0L7Rj9C90LjQtSAtINGB0L7RgdGC0L7Rj9C90LjQtSDRhdGA0LDQvdC40YIg0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INC+0LHQtdC60YLRiyDQuCDQuNGFINGB0L7RgdGC0L7Rj9C90LjQtSAo0YDQsNGB0L/QvtC70L7QttC10L3QuNC1INC4INGC0LDQuiDQtNCw0LvQtdC10LUpXG4gKiAxNikg0J/QviDRjdC70LXQvNC10L3RgtGDINC80L7QttC90L4g0LrQu9C40LrQvdGD0YLRjCDQuCDQv9C+0LvRg9GH0LjRgtGMINCw0LrRgtC40LLQsNC40YDQvtCy0LDQvdC90YvQuSDRjdC70LXQvNC10L3RgiAtINGN0LvQtdC80LXQvdGCINC80L7QttC10YIg0LHRi9GC0Ywg0L/QvtC00YHQstC10YfQtdC9XG4gKiAxNykg0JXRgdC70Lgg0L/RgNC+0LjRgdGF0L7QtNC40YIg0LrQu9C40Log0L/QviDQtNGA0YPQs9C+0LzRgyDRjdC70LXQvNC10L3RgtGDIC0g0L/RgNC10LTRi9C00YPRidC40Lkg0L/QtdGA0LXRgdGC0LDQtdGCINCx0YvRgtGMINCw0LrRgtC40LLQvdGL0LxcbiAqIDE4KSDQldGB0LvQuCDQutC70LjQuiDQvdC1INCx0YvQuyDQutC70LjQutC90YPRgiDQvdC1INC/0L4g0L7QtNC90L7QvNGDINGN0LvQtdC80LXQvdGC0YMg0YLQviDQvdC40LrQsNC60L7Qs9C+INCw0LrRgtC40LLQvdC+0LPQviDRjdC70LXQvNC10L3RgtCwINC90LXRglxuICogMTkpINCjINGN0LvQtdC80LXQvdGC0L7QsiDQtdGB0YLRjCB6LWluZGV4IC0geiBpbmRleCDQstC70LjRj9C10YIg0L3QsCDQvtGC0YDQuNGB0L7QstC60YMg0Y3Qu9C10LzQtdC90YLQvtCyXG4gKiAyMCkg0JLRgdC1INC60YPQt9C10L3RiyDQuNC80LXRjtGCINC+0LTQuNC9INC4INGC0L7RgiDQttC1INC40L3QtNC10LrRgSAtINCy0YHQtSDQtNC+0YfQtdGA0L3QuNC1INC90LAg0LXQtNC40L3QuNGG0YMg0LHQvtC70YzRiNC1INGC0L4g0LXRgdGC0Ywg0L3QuNC20LVcbiAqIDIxKSDQkiDQutCw0LbQtNC+0Lwg0Y3Qu9C10LzQtdC90YLQtS/QsdC70L7QutC1INC80L7QttC90L4g0L3QsNC/0LjRgdCw0YLRjCDRgtC10LrRgdGCIC0g0YLQtdC60YHRgiDQvNC10L3Rj9C10YIg0YDQsNC30LzQtdGAINCx0LvQvtC60LAg0Y3Qu9C10LzQtdC90YLQsCAtINCy0YHQtSDQvtGB0YLQsNC70YzQvdGL0LUg0Y3Qu9C10LzQtdC90YLRiyDQv9C+0LTRgdGC0YDQsNCy0LjQstCw0Y7RgtGB0Y8g0L/QvtC0INC90L7QstGL0Lkg0YDQsNC30LzQtdGAINCx0LvQvtC60LBcbiAqL1xudHlwZSBUaGluZyA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2hpbGRyZW4/OiBBcnJheTxUaGluZz5cbn1cblxudHlwZSBUaGluZ3MgPSBBcnJheTxUaGluZz47XG5cbnR5cGUgUHJlcGFyZWRUaGluZ3MgPSBQcmVwYXJlZFRoaW5nW107XG5cbnR5cGUgUHJlcGFyZWRUaGluZyA9IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGNoaWxkcmVuPzogQXJyYXk8UHJlcGFyZWRUaGluZz5cbiAgICBwYXJlbnQ/OiBQcmVwYXJlZFRoaW5nO1xuICAgIHBvc2l0aW9uPzoge1xuICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgIHk6IG51bWJlcixcbiAgICB9LFxuICAgIHNpemU/OiB7XG4gICAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgICAgIGhlaWdodDogbnVtYmVyO1xuICAgICAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgICAgICBwYWRkaW5nOiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3Jvd01hcCB7XG4gICAgY29udGFpbmVyOiBFbGVtZW50O1xuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcGFyYW1zOiB7XG4gICAgICAgIGJnQ29sb3I6IHN0cmluZztcbiAgICAgICAgZm9udFNpemU6IG51bWJlcjtcbiAgICAgICAgZm9udENvbG9yOiBzdHJpbmc7XG4gICAgICAgIHJlY3RDb2xvcjogc3RyaW5nO1xuICAgICAgICBnbG9iUGFkZGluZzogbnVtYmVyO1xuICAgICAgICB6b29tOiBudW1iZXI7XG4gICAgfTtcbiAgICB0aGluZ3M6IFRoaW5ncztcbiAgICBwcmVwYXJlZFRoaW5nczogQXJyYXk8UHJlcGFyZWRUaGluZz47XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEVsZW1lbnQsIHRoaW5nczogVGhpbmdzKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICAgICAgYmdDb2xvcjogJ3NreWJsdWUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDI2LFxuICAgICAgICAgICAgZm9udENvbG9yOiAncmVkJyxcbiAgICAgICAgICAgIHJlY3RDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgIHpvb206IDUsXG4gICAgICAgICAgICBnbG9iUGFkZGluZzogMjAsXG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucGFyYW1zLCAnZ2xvYlBhZGRpbmcnLCB7XG4gICAgICAgICAgICAvLyB2YWx1ZTogNDIsXG4gICAgICAgICAgICAvLyB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIHRoaXMuem9vbSAqIDIwIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRoaW5ncyA9IHRoaW5ncztcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncyA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/QvtC00LPQvtGC0LDQstC70LjQstCw0LXQvCDQv9C+0LvQvtC20LXQvdC40LUg0Y3Qu9C10LzQtdC90YLQvtCyXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcmVwYXJlUG9zaXRpb25zID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gdGhpcy5wcmVwYXJlZFRoaW5ncy5tYXAodGhpcy5wcmVwYXJlUG9zaXRpb24pO1xuICAgICAgICBjb25zb2xlLmxvZygnVGhpbmdzIHNpemVzIGFyZSBwcmVwYXJlZC4nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVQb3NpdGlvbiA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nLCBpOiBudW1iZXIsIHByZXBhcmVkVGhpbmdzOiBQcmVwYXJlZFRoaW5ncykgPT4ge1xuICAgICAgICBjb25zdCB7IHBhcmVudCB9ID0gcHJlcGFyZWRUaGluZztcbiAgICAgICAgY29uc3QgeyBnbG9iUGFkZGluZyB9ID0gdGhpcy5wYXJhbXM7XG5cbiAgICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gMDtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRQcmVwYXJlZFRoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzR2FwID0gc2xpY2VkUHJlcGFyZWRUaGluZ3MucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWUgKyBjdXJyZW50VmFsdWUuc2l6ZS53aWR0aCArIGdsb2JQYWRkaW5nO1xuICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJldmlvdXNHYXA7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGxldCBpc1BhcmVudEV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICBsZXQgaGlnaFBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIGxldCB5UG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGlzUGFyZW50RXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgeVBvc2l0aW9uID0geVBvc2l0aW9uICsgaGlnaFBhcmVudC5zaXplLmhlaWdodCArIGdsb2JQYWRkaW5nO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpZ2hQYXJlbnQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2hQYXJlbnQgPSBoaWdoUGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpc1BhcmVudEV4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA9IHlQb3NpdGlvbjtcbiAgICBcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcGFyZW50LnBvc2l0aW9uLng7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZFByZXBhcmVkVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzR2FwID0gc2xpY2VkUHJlcGFyZWRUaGluZ3MucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWUgKyBjdXJyZW50VmFsdWUuc2l6ZS53aWR0aCArIHRoaXMucGFyYW1zLmdsb2JQYWRkaW5nO1xuICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgcHJldmlvdXNHYXAgPSBwcmV2aW91c0dhcCArIHBhcmVudC5wb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXZpb3VzR2FwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ2V0Q2hpbGRyZW5XaWR0aCA9IChjaGlsZHJlbjogUHJlcGFyZWRUaGluZ1tdKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tbW9uV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBiaWdnZXN0RWxlbSA9ICAoZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA+PSBlbGVtZW50LnNpemUud2lkdGgpID8gZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA6IGVsZW1lbnQuc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc21hbGxlc3RFbGVtID0gIChlbGVtZW50LnBhcmVudC5zaXplLndpZHRoIDw9IGVsZW1lbnQuc2l6ZS53aWR0aCkgPyBlbGVtZW50LnBhcmVudC5zaXplLndpZHRoIDogZWxlbWVudC5zaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoIC0gc21hbGxlc3RFbGVtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggKyBlbGVtZW50LnNpemUud2lkdGggKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcblxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFub3RoZXJDaGlsZHJlbldpZHRoID0gZ2V0Q2hpbGRyZW5XaWR0aChlbGVtZW50LmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCArIGFub3RoZXJDaGlsZHJlbldpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoIC0gdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgICAgIHJldHVybiBjb21tb25XaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgICBsZXQgYWxsQ2hpbGRyZW5XaWR0aDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICBwcmV2aW91c1RoaW5ncy5mb3JFYWNoKCh0aGluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbldpZHRoID0gYWxsQ2hpbGRyZW5XaWR0aCArIGdldENoaWxkcmVuV2lkdGgodGhpbmcuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggKyBhbGxDaGlsZHJlbldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcuY2hpbGRyZW4gPSBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuLm1hcCgoLi4ucHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlUG9zaXRpb24oLi4ucHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwcmVwYXJlZFRoaW5nOyBcbiAgICB9XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICog0JLRi9GH0LjRgdC70Y/QtdC8INGA0LDQt9C80LXRgNGLINGN0LvQtdC80LXQvdGC0L7QslxuICAgICAqL1xuICAgIHByaXZhdGUgcHJlcGFyZVRoaW5nc1NpemVzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gdGhpcy50aGluZ3MubWFwKHRoaXMucHJlcGFyZVRoaW5nU2l6ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUaGluZ3Mgc2l6ZXMgYXJlIHByZXBhcmVkLicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZVRoaW5nU2l6ZSA9ICh0aGluZzogVGhpbmcsIGk6IG51bWJlciwgdGhpbmdzOiBUaGluZ3MsIHBhcmVudFByZXBhcmVkVGhpbmc/OiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcgPSB7XG4gICAgICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBudWxsLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgeDogbnVsbCxcbiAgICAgICAgICAgICAgICB5OiBudWxsLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJlcGFyZWRUaGluZy5uYW1lID0gdGhpbmcubmFtZTtcblxuICAgICAgICBpZiAocGFyZW50UHJlcGFyZWRUaGluZykge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wYXJlbnQgPSBwYXJlbnRQcmVwYXJlZFRoaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INGI0LjRgNC40L3RgyDQuCDQstGL0YHQvtGC0YMg0YLQtdC60YHRgtC+0LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuICAgICAgICBjb25zdCB0aGluZ1NpemUgPSB0aGlzLmdldFRoaW5nU2l6ZSh0aGluZyk7XG5cbiAgICAgICAgcHJlcGFyZWRUaGluZy5zaXplID0ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaW5nU2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpbmdTaXplLmhlaWdodCxcbiAgICAgICAgICAgIGZvbnRTaXplOiB0aGluZ1NpemUuZm9udFNpemUsXG4gICAgICAgICAgICBwYWRkaW5nOiB0aGluZ1NpemUucGFkZGluZyxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5jaGlsZHJlbiA9IHRoaW5nLmNoaWxkcmVuLm1hcCgoLi4ucHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlVGhpbmdTaXplKC4uLnByb3BzLCBwcmVwYXJlZFRoaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0FwcCBpbml0aWFsaXphdGlvbiBpcyBzdGFydGVkLicpO1xuXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLnByZXBhcmVUaGluZ3NTaXplcygpO1xuICAgICAgICB0aGlzLnByZXBhcmVQb3NpdGlvbnMoKTtcblxuICAgICAgICBjb25zdCB3ID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMuY2FudmFzLndpZHRoIC8gMiwgdGhpcy5jYW52YXMuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZWRDb250YWluZXJEYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBwcmV2aW91c1dpZHRoOiBudWxsLFxuICAgICAgICAgICAgcHJldmlvdXNIZWlnaHQ6IG51bGwsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250YWluZXJSZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICEhKG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoICYmIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodCkgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIChlbnRyaWVzWzBdLmNvbnRlbnRSZWN0LndpZHRoICE9PSBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNXaWR0aCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKGVudHJpZXNbMF0uY29udGVudFJlY3QuaGVpZ2h0ICE9PSBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNIZWlnaHQpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb250YWluZXIgc2l6ZSBpcyBjaGFuZ2VkIC0gcmVsb2FkIHRoZSBhcHAuJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyUmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNXaWR0aCA9IGVudHJpZXNbMF0uY29udGVudFJlY3Qud2lkdGg7XG4gICAgICAgICAgICBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNIZWlnaHQgPSBlbnRyaWVzWzBdLmNvbnRlbnRSZWN0LmhlaWdodDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRhaW5lclJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdBcHAgaXMgc3RhcnRlZC4nKTtcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0JHKCk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhd1RoaW5ncyh0aGlzLnByZXBhcmVkVGhpbmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZHJhd1RoaW5ncyA9IChwcmVwYXJlZFRoaW5nczogUHJlcGFyZWRUaGluZ1tdKSA9PiB7XG4gICAgICAgIHByZXBhcmVkVGhpbmdzLmZvckVhY2goKHByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1JlY3RhbmdsZShwcmVwYXJlZFRoaW5nKTtcblxuICAgICAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdUaGluZ3MocHJlcGFyZWRUaGluZy5jaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVsb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnQXBwIHJlbG9hZCBpcyBzdGFydGVkLicpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaGluZ1NpemUgPSAodGhpbmc6IFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdGhpcy5wYXJhbXMuZm9udFNpemUgKiB0aGlzLnBhcmFtcy56b29tO1xuICAgICAgICBjb25zdCB0ZXh0TWV0cmljcyA9IHRoaXMuZ2V0VGV4dFNpemUodGhpbmcubmFtZSwgZm9udFNpemUpO1xuXG4gICAgICAgIGNvbnN0IHAgPSAoZm9udFNpemUgLyA0KTtcblxuICAgICAgICBjb25zdCByZWN0VyA9IChwICsgdGV4dE1ldHJpY3Mud2lkdGggKyBwKTtcbiAgICAgICAgY29uc3QgcmVjdEggPSAocCArIGZvbnRTaXplICsgcCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0VyxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdEgsXG4gICAgICAgICAgICBwYWRkaW5nOiBwLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UmVjdGFuZ2xlID0gKHRoaW5nOiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLnJlY3RDb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpbmcucG9zaXRpb24ueCwgdGhpbmcucG9zaXRpb24ueSwgdGhpbmcuc2l6ZS53aWR0aCwgdGhpbmcuc2l6ZS5oZWlnaHQpO1xuICAgICAgICB0aGlzLmRyYXdUZXh0KFxuICAgICAgICAgICAgdGhpbmcubmFtZSxcbiAgICAgICAgICAgIHRoaW5nLnBvc2l0aW9uLnggKyB0aGluZy5zaXplLnBhZGRpbmcsXG4gICAgICAgICAgICB0aGluZy5wb3NpdGlvbi55ICsgKHRoaW5nLnNpemUucGFkZGluZyAvIDIpICsgdGhpbmcuc2l6ZS5mb250U2l6ZSxcbiAgICAgICAgICAgIHRoaW5nLnNpemUuZm9udFNpemUsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUZXh0U2l6ZSA9ICh0ZXh0OiBzdHJpbmcsIGZvbnRTaXplOiBudW1iZXIpOiBUZXh0TWV0cmljcyA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRm9udCA9IHRoaXMuY3R4LmZvbnQ7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBzZXJpZmA7XG4gICAgICAgIGNvbnN0IG1lYXN1cmVkVGV4dCA9IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gcHJldmlvdXNGb250O1xuICAgICAgICByZXR1cm4gbWVhc3VyZWRUZXh0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1RleHQgPSAodGV4dDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgZm9udFNpemU6IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gYCR7Zm9udFNpemV9cHggc2VyaWZgO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5mb250Q29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRleHQsIHgsIHkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0JHID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5iZ0NvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgtKHRoaXMuY2FudmFzLndpZHRoIC8gMiksIC0odGhpcy5jYW52YXMuaGVpZ2h0IC8gMiksIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==