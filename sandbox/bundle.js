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
            _this.canvas = document.createElement('canvas');
            _this.canvas.id = 'growMapCanvas';
            _this.ctx = _this.canvas.getContext('2d');
            var w = _this.container.clientWidth;
            var h = _this.container.clientHeight;
            _this.canvas.width = w;
            _this.canvas.height = h;
            _this.container.appendChild(_this.canvas);
            // this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            // setTimeout(() => {
            //     this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            // }, 3000);
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
            // window.requestAnimationFrame(() => {
            //     this.drawBG();
            //     this.prepareThingsSizes();
            //     this.preparePositions();
            //     this.drawThings(this.preparedThings);
            // });
            var interval = setInterval(function () {
                _this.drawBG();
                _this.prepareThingsSizes();
                _this.preparePositions();
                _this.drawThings(_this.preparedThings);
                var elem = document.getElementById('growMapCanvas');
                if (!elem) {
                    clearInterval(interval);
                }
            }, 1000 / 30);
            _this.canvas.addEventListener('wheel', function (event) {
                var deltaY = (event.deltaY / 1000);
                _this.params.zoom = _this.params.zoom + deltaY;
                if (_this.params.zoom > 4) {
                    _this.params.zoom = 4;
                }
                else if (_this.params.zoom < 0.5) {
                    _this.params.zoom = 0.5;
                }
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
            // this.ctx.fillRect(-(this.canvas.width / 2), -(this.canvas.height / 2), this.canvas.width, this.canvas.height);
            // TODO: подумать можно ли использовать этот костыль
            _this.ctx.fillRect(-10000, -10000, 20000, 20000);
        };
        this.container = container;
        this.ctx = null;
        this.params = {
            bgColor: 'skyblue',
            fontSize: 26,
            fontColor: 'red',
            rectColor: 'white',
            zoom: 1,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRU8sV0FBTSxHQUFHO1lBQ2IsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDekMsaUhBQWlIO1lBQ2pILG9EQUFvRDtZQUNwRCxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQTlTRyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLFNBQVM7WUFDbEIsUUFBUSxFQUFFLEVBQUU7WUFDWixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsT0FBTztZQUNsQixJQUFJLEVBQUUsQ0FBQztZQUNQLFdBQVcsRUFBRSxFQUFFO1NBQ2xCO1FBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRTtZQUM5QyxhQUFhO1lBQ2Isa0JBQWtCO1lBQ2xCLEdBQUcsZ0JBQUssT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBQyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUE4UkwsY0FBQztBQUFELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9HTS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vR00vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0dNLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiDQmtCw0YDRgtCwINGA0L7RgdGC0LBcbiAqIFxuICog0KLRgNC10LHQvtCy0LDQvdC40Y86XG4gKiArIDEpINCf0YDQuCDRgdC+0LfQtNCw0L3QuNC4INC60LDRgNGC0Ysg0L3Rg9C20L3QviDRg9C60LDQt9Cw0YLRjCDQutC+0L3RgtC10LnQvdC10YBcbiAqICsgMikg0J/RgNC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC60LDRgNGC0Ysg0LIg0LrQvtC90YLQtdC50L3QtdGAINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LrQsNC90LLQsNGBXG4gKiArIDMpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0YDQsNGB0YLRj9C90YPRgtGM0YHRjyDQv9C+INGA0LDQt9C80LXRgNGDINC60L7QvdGC0LXQudC90LXRgNCwXG4gKiArIDQpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0YHQu9C10LTQuNGC0Ywg0LfQsCDRgNCw0LfQvNC10YDQvtC8INC60L7QvdGC0LXQudC90LXRgNCwINC4INC10YHQu9C4INC+0L0g0LzQtdC90Y/QtdGC0YHRjyAtINC/0LXRgNC10LfQsNCz0YDRg9C20LDRgtGMINC/0YDQuNC70L7QttC10L3QuNC1XG4gKiA1KSDQmtCw0L3QstCw0YEg0LTQvtC70LbQtdC9INC/0YDQuNC90LjQvNCw0YLRjCDQvdCwINCy0YXQvtC0INC+0LHRitC10LrRgiDQuNC70Lgg0LzQsNGB0YHQuNCyINC+0LHRhdC10LrRgtC+0LIg0Lgg0YDQuNGB0L7QstCw0YLRjCDQs9GA0LDRhNC40LrRg1xuICogNikg0JrQsNC80LXRgNCwINC00L7Qu9C20L3QsCDRhtC10L3RgtGA0L7QstCw0YLRjNGB0Y8g0L/QviDQs9C70LDQstC90L7QvNGDINC+0LHRjNC10LrRgtGDINC40LvQuCDQvdCw0LHQvtGA0YMg0LPQu9Cw0LLQvdGL0YUg0L7QsdGK0LXQutGC0L7QslxuICogNykg0JIg0L/RgNC+0LPRgNCw0LzQvNC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDRgNC10LDQu9C40LfQvtCy0LDQvSDQt9GD0LxcbiAqIDgpINCf0YDQvtCz0YDQsNC80LzQsCDQvNC+0LbQtdGCINCx0YvRgtGMINC30LDQv9GD0YnQtdC90LAg0LfQsNC30LDRg9C80LvQtdC90L7QuSDQuiDQvtGB0L3QvtCy0L3Ri9C8INC+0LHQtdC60YLQsNC8INC40LvQuCDQvtGF0LLQsNGC0YvQstCw0Y8g0L7QsdGJ0LjQuSDRgNCw0LfQvNC10YBcbiAqIDkpINC80LjQvdC40LzQsNC70YzQvdGL0Lkg0LfRg9C8INC+0L/RgNC10LTQtdC70Y/QtdGC0YHRjyDRgNCw0LfQvNC10YDQvtC8INC+0YHQvdC+0LLQvdC+0LPQviDQsdC70L7QutCwIC0g0LzQsNC60YHQuNC80LDQu9GM0L3Ri9C5INC30YPQvCDQvtGF0LLQsNGC0L7QvCDQstGB0LXRhSDQsdC70L7QutC+0LIg0L/Qu9GO0YEg0L7RgtGB0YLRg9C/0YtcbiAqIDEwKSDQoNCw0LfQu9C40YfQvdGL0LUg0L3QsNGB0YLRgNC+0LnQutC4INC80L7QttC90L4g0LLRi9Cy0L7QtNC40YLRjCDQvdCwINGN0LrRgNCw0L0g0YfRgtC+0LHRiyDQvdCw0YHRgtGA0LDQuNCy0LDRgtGMINC40YUg0L/QvtC70LfRg9C90LrQsNC80LhcbiAqIDExKSDQmtCw0LbQtNGL0Lkg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INC+0LHRitC10LrRgiDQvNC+0LbQtdGCINC40LzQtdGC0Ywg0LTQvtGH0LXRgNC90LjQuVxuICogMTIpINCV0YHQu9C4INCyINC00L7Rh9C10YDQvdC10Lwg0L3QtSDRg9C60LDQt9Cw0L3QviDQsiDQutCw0LrRg9GOINGB0YLQvtGA0L7QvdGDINC+0L0g0YHQvNC10YnQsNC10YLRgdGPIC0g0YLQviDQvtC9INGB0LzQtdGJ0LDQtdGC0YHRjyDQsiDRgdC70YPRh9Cw0LnQvdGD0Y4g0YHRgtC+0YDQvtC90YNcbiAqIDEzKSDQlNC+0YfQtdGA0L3QuNC1INGN0LvQtdC80LXQvdGC0Ysg0LjQvNC10Y7RgiDQvtGC0YHRgtGD0L8g0L7RgiDRgNC+0LTQuNGC0LXQu9GM0YHQutC+0LrQviDQuCDRgtCw0Log0LbQtSDQuNC80LXQtdGCINC+0YLRgdGC0YPQvyDQvtGCINGB0LLQvtC40YUg0LrRg9C30LXQvdC+0LJcbiAqIDE0KSDQldGB0YLRjCDQstC+0LfQvNC+0LbQvdC+0YHRgtGMINC80YvRiNC60L7QuSDQtNCy0LjQs9Cw0YLRjCDQutCw0LzQtdGA0YNcbiAqIDE1KSDQoyDQv9GA0LjQu9C+0LbQtdC90LjRjyDQtdGB0YLRjCDQvdC10LrQvtGC0L7RgNC+0LUg0YHQvtGB0YLQvtGP0L3QuNC1IC0g0YHQvtGB0YLQvtGP0L3QuNC1INGF0YDQsNC90LjRgiDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0L7QsdC10LrRgtGLINC4INC40YUg0YHQvtGB0YLQvtGP0L3QuNC1ICjRgNCw0YHQv9C+0LvQvtC20LXQvdC40LUg0Lgg0YLQsNC6INC00LDQu9C10LXQtSlcbiAqIDE2KSDQn9C+INGN0LvQtdC80LXQvdGC0YMg0LzQvtC20L3QviDQutC70LjQutC90YPRgtGMINC4INC/0L7Qu9GD0YfQuNGC0Ywg0LDQutGC0LjQstCw0LjRgNC+0LLQsNC90L3Ri9C5INGN0LvQtdC80LXQvdGCIC0g0Y3Qu9C10LzQtdC90YIg0LzQvtC20LXRgiDQsdGL0YLRjCDQv9C+0LTRgdCy0LXRh9C10L1cbiAqIDE3KSDQldGB0LvQuCDQv9GA0L7QuNGB0YXQvtC00LjRgiDQutC70LjQuiDQv9C+INC00YDRg9Cz0L7QvNGDINGN0LvQtdC80LXQvdGC0YMgLSDQv9GA0LXQtNGL0LTRg9GJ0LjQuSDQv9C10YDQtdGB0YLQsNC10YIg0LHRi9GC0Ywg0LDQutGC0LjQstC90YvQvFxuICogMTgpINCV0YHQu9C4INC60LvQuNC6INC90LUg0LHRi9C7INC60LvQuNC60L3Rg9GCINC90LUg0L/QviDQvtC00L3QvtC80YMg0Y3Qu9C10LzQtdC90YLRgyDRgtC+INC90LjQutCw0LrQvtCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0L3QtdGCXG4gKiAxOSkg0KMg0Y3Qu9C10LzQtdC90YLQvtCyINC10YHRgtGMIHotaW5kZXggLSB6IGluZGV4INCy0LvQuNGP0LXRgiDQvdCwINC+0YLRgNC40YHQvtCy0LrRgyDRjdC70LXQvNC10L3RgtC+0LJcbiAqIDIwKSDQktGB0LUg0LrRg9C30LXQvdGLINC40LzQtdGO0YIg0L7QtNC40L0g0Lgg0YLQvtGCINC20LUg0LjQvdC00LXQutGBIC0g0LLRgdC1INC00L7Rh9C10YDQvdC40LUg0L3QsCDQtdC00LjQvdC40YbRgyDQsdC+0LvRjNGI0LUg0YLQviDQtdGB0YLRjCDQvdC40LbQtVxuICogMjEpINCSINC60LDQttC00L7QvCDRjdC70LXQvNC10L3RgtC1L9Cx0LvQvtC60LUg0LzQvtC20L3QviDQvdCw0L/QuNGB0LDRgtGMINGC0LXQutGB0YIgLSDRgtC10LrRgdGCINC80LXQvdGP0LXRgiDRgNCw0LfQvNC10YAg0LHQu9C+0LrQsCDRjdC70LXQvNC10L3RgtCwIC0g0LLRgdC1INC+0YHRgtCw0LvRjNC90YvQtSDRjdC70LXQvNC10L3RgtGLINC/0L7QtNGB0YLRgNCw0LLQuNCy0LDRjtGC0YHRjyDQv9C+0LQg0L3QvtCy0YvQuSDRgNCw0LfQvNC10YAg0LHQu9C+0LrQsFxuICovXG50eXBlIFRoaW5nID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjaGlsZHJlbj86IEFycmF5PFRoaW5nPlxufVxuXG50eXBlIFRoaW5ncyA9IEFycmF5PFRoaW5nPjtcblxudHlwZSBQcmVwYXJlZFRoaW5ncyA9IFByZXBhcmVkVGhpbmdbXTtcblxudHlwZSBQcmVwYXJlZFRoaW5nID0ge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgY2hpbGRyZW4/OiBBcnJheTxQcmVwYXJlZFRoaW5nPlxuICAgIHBhcmVudD86IFByZXBhcmVkVGhpbmc7XG4gICAgcG9zaXRpb24/OiB7XG4gICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgeTogbnVtYmVyLFxuICAgIH0sXG4gICAgc2l6ZT86IHtcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgIGZvbnRTaXplOiBudW1iZXI7XG4gICAgICAgIHBhZGRpbmc6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcm93TWFwIHtcbiAgICBjb250YWluZXI6IEVsZW1lbnQ7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgYmdDb2xvcjogc3RyaW5nO1xuICAgICAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgICAgICBmb250Q29sb3I6IHN0cmluZztcbiAgICAgICAgcmVjdENvbG9yOiBzdHJpbmc7XG4gICAgICAgIGdsb2JQYWRkaW5nOiBudW1iZXI7XG4gICAgICAgIHpvb206IG51bWJlcjtcbiAgICB9O1xuICAgIHRoaW5nczogVGhpbmdzO1xuICAgIHByZXBhcmVkVGhpbmdzOiBBcnJheTxQcmVwYXJlZFRoaW5nPjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogRWxlbWVudCwgdGhpbmdzOiBUaGluZ3MpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgICAgICBiZ0NvbG9yOiAnc2t5Ymx1ZScsXG4gICAgICAgICAgICBmb250U2l6ZTogMjYsXG4gICAgICAgICAgICBmb250Q29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgcmVjdENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgem9vbTogMSxcbiAgICAgICAgICAgIGdsb2JQYWRkaW5nOiAyMCxcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5wYXJhbXMsICdnbG9iUGFkZGluZycsIHtcbiAgICAgICAgICAgIC8vIHZhbHVlOiA0MixcbiAgICAgICAgICAgIC8vIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gdGhpcy56b29tICogMjAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGhpbmdzID0gdGhpbmdzO1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LTQs9C+0YLQsNCy0LvQuNCy0LDQtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDRjdC70LXQvNC10L3RgtC+0LJcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVQb3NpdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MgPSB0aGlzLnByZXBhcmVkVGhpbmdzLm1hcCh0aGlzLnByZXBhcmVQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlUG9zaXRpb24gPSAocHJlcGFyZWRUaGluZzogUHJlcGFyZWRUaGluZywgaTogbnVtYmVyLCBwcmVwYXJlZFRoaW5nczogUHJlcGFyZWRUaGluZ3MpID0+IHtcbiAgICAgICAgY29uc3QgeyBwYXJlbnQgfSA9IHByZXBhcmVkVGhpbmc7XG4gICAgICAgIGNvbnN0IHsgZ2xvYlBhZGRpbmcgfSA9IHRoaXMucGFyYW1zO1xuXG4gICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IDA7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkUHJlcGFyZWRUaGluZ3MgPSBwcmVwYXJlZFRoaW5ncy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c0dhcCA9IHNsaWNlZFByZXBhcmVkVGhpbmdzLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlICsgY3VycmVudFZhbHVlLnNpemUud2lkdGggKyBnbG9iUGFkZGluZztcbiAgICAgICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXZpb3VzR2FwO1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBsZXQgaXNQYXJlbnRFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGhpZ2hQYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICBsZXQgeVBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpc1BhcmVudEV4aXN0cykge1xuICAgICAgICAgICAgICAgIHlQb3NpdGlvbiA9IHlQb3NpdGlvbiArIGhpZ2hQYXJlbnQuc2l6ZS5oZWlnaHQgKyBnbG9iUGFkZGluZztcblxuICAgICAgICAgICAgICAgIGlmIChoaWdoUGFyZW50LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBoaWdoUGFyZW50ID0gaGlnaFBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXNQYXJlbnRFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSB5UG9zaXRpb247XG4gICAgXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHBhcmVudC5wb3NpdGlvbi54O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRQcmVwYXJlZFRoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91c0dhcCA9IHNsaWNlZFByZXBhcmVkVGhpbmdzLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlICsgY3VycmVudFZhbHVlLnNpemUud2lkdGggKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcbiAgICAgICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgICAgIHByZXZpb3VzR2FwID0gcHJldmlvdXNHYXAgKyBwYXJlbnQucG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmV2aW91c0dhcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdldENoaWxkcmVuV2lkdGggPSAoY2hpbGRyZW46IFByZXBhcmVkVGhpbmdbXSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbW1vbldpZHRoOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgYmlnZ2VzdEVsZW0gPSAgKGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggPj0gZWxlbWVudC5zaXplLndpZHRoKSA/IGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggOiBlbGVtZW50LnNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNtYWxsZXN0RWxlbSA9ICAoZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA8PSBlbGVtZW50LnNpemUud2lkdGgpID8gZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA6IGVsZW1lbnQuc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCAtIHNtYWxsZXN0RWxlbTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoICsgZWxlbWVudC5zaXplLndpZHRoICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbm90aGVyQ2hpbGRyZW5XaWR0aCA9IGdldENoaWxkcmVuV2lkdGgoZWxlbWVudC5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggKyBhbm90aGVyQ2hpbGRyZW5XaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCAtIHRoaXMucGFyYW1zLmdsb2JQYWRkaW5nO1xuXG4gICAgICAgICAgICByZXR1cm4gY29tbW9uV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IGFsbENoaWxkcmVuV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1RoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgcHJldmlvdXNUaGluZ3MuZm9yRWFjaCgodGhpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5XaWR0aCA9IGFsbENoaWxkcmVuV2lkdGggKyBnZXRDaGlsZHJlbldpZHRoKHRoaW5nLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgYWxsQ2hpbGRyZW5XaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuID0gcHJlcGFyZWRUaGluZy5jaGlsZHJlbi5tYXAoKC4uLnByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVBvc2l0aW9uKC4uLnByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZzsgXG4gICAgfVxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqINCS0YvRh9C40YHQu9GP0LXQvCDRgNCw0LfQvNC10YDRiyDRjdC70LXQvNC10L3RgtC+0LJcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVUaGluZ3NTaXplcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncyA9IHRoaXMudGhpbmdzLm1hcCh0aGlzLnByZXBhcmVUaGluZ1NpemUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZVRoaW5nU2l6ZSA9ICh0aGluZzogVGhpbmcsIGk6IG51bWJlciwgdGhpbmdzOiBUaGluZ3MsIHBhcmVudFByZXBhcmVkVGhpbmc/OiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcgPSB7XG4gICAgICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBudWxsLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgeDogbnVsbCxcbiAgICAgICAgICAgICAgICB5OiBudWxsLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJlcGFyZWRUaGluZy5uYW1lID0gdGhpbmcubmFtZTtcblxuICAgICAgICBpZiAocGFyZW50UHJlcGFyZWRUaGluZykge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wYXJlbnQgPSBwYXJlbnRQcmVwYXJlZFRoaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INGI0LjRgNC40L3RgyDQuCDQstGL0YHQvtGC0YMg0YLQtdC60YHRgtC+0LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuICAgICAgICBjb25zdCB0aGluZ1NpemUgPSB0aGlzLmdldFRoaW5nU2l6ZSh0aGluZyk7XG5cbiAgICAgICAgcHJlcGFyZWRUaGluZy5zaXplID0ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaW5nU2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpbmdTaXplLmhlaWdodCxcbiAgICAgICAgICAgIGZvbnRTaXplOiB0aGluZ1NpemUuZm9udFNpemUsXG4gICAgICAgICAgICBwYWRkaW5nOiB0aGluZ1NpemUucGFkZGluZyxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5jaGlsZHJlbiA9IHRoaW5nLmNoaWxkcmVuLm1hcCgoLi4ucHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlVGhpbmdTaXplKC4uLnByb3BzLCBwcmVwYXJlZFRoaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMuaWQgPSAnZ3Jvd01hcENhbnZhcyc7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICBjb25zdCB3ID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICAgICAgLy8gdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMuY2FudmFzLndpZHRoIC8gMiwgdGhpcy5jYW52YXMuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy5jYW52YXMud2lkdGggLyAyLCB0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgLy8gfSwgMzAwMCk7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZWRDb250YWluZXJEYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBwcmV2aW91c1dpZHRoOiBudWxsLFxuICAgICAgICAgICAgcHJldmlvdXNIZWlnaHQ6IG51bGwsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250YWluZXJSZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICEhKG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoICYmIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodCkgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIChlbnRyaWVzWzBdLmNvbnRlbnRSZWN0LndpZHRoICE9PSBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNXaWR0aCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKGVudHJpZXNbMF0uY29udGVudFJlY3QuaGVpZ2h0ICE9PSBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNIZWlnaHQpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb250YWluZXIgc2l6ZSBpcyBjaGFuZ2VkIC0gcmVsb2FkIHRoZSBhcHAuJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyUmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNXaWR0aCA9IGVudHJpZXNbMF0uY29udGVudFJlY3Qud2lkdGg7XG4gICAgICAgICAgICBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNIZWlnaHQgPSBlbnRyaWVzWzBdLmNvbnRlbnRSZWN0LmhlaWdodDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRhaW5lclJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIC8vIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5kcmF3QkcoKTtcbiAgICAgICAgLy8gICAgIHRoaXMucHJlcGFyZVRoaW5nc1NpemVzKCk7XG4gICAgICAgIC8vICAgICB0aGlzLnByZXBhcmVQb3NpdGlvbnMoKTtcbiAgICAgICAgLy8gICAgIHRoaXMuZHJhd1RoaW5ncyh0aGlzLnByZXBhcmVkVGhpbmdzKTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYXdCRygpO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlVGhpbmdzU2l6ZXMoKTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZVBvc2l0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5kcmF3VGhpbmdzKHRoaXMucHJlcGFyZWRUaGluZ3MpO1xuXG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyb3dNYXBDYW52YXMnKTtcbiAgICAgICAgICAgIGlmICghZWxlbSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwIC8gMzApO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWSA9IChldmVudC5kZWx0YVkgLyAxMDAwKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLnpvb20gPSB0aGlzLnBhcmFtcy56b29tICsgZGVsdGFZO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuem9vbSA+IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy56b29tID0gNDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJhbXMuem9vbSA8IDAuNSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLnpvb20gPSAwLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZHJhd1RoaW5ncyA9IChwcmVwYXJlZFRoaW5nczogUHJlcGFyZWRUaGluZ1tdKSA9PiB7XG4gICAgICAgIHByZXBhcmVkVGhpbmdzLmZvckVhY2goKHByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1JlY3RhbmdsZShwcmVwYXJlZFRoaW5nKTtcblxuICAgICAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdUaGluZ3MocHJlcGFyZWRUaGluZy5jaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVsb2FkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaGluZ1NpemUgPSAodGhpbmc6IFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdGhpcy5wYXJhbXMuZm9udFNpemUgKiB0aGlzLnBhcmFtcy56b29tO1xuICAgICAgICBjb25zdCB0ZXh0TWV0cmljcyA9IHRoaXMuZ2V0VGV4dFNpemUodGhpbmcubmFtZSwgZm9udFNpemUpO1xuXG4gICAgICAgIGNvbnN0IHAgPSAoZm9udFNpemUgLyA0KTtcblxuICAgICAgICBjb25zdCByZWN0VyA9IChwICsgdGV4dE1ldHJpY3Mud2lkdGggKyBwKTtcbiAgICAgICAgY29uc3QgcmVjdEggPSAocCArIGZvbnRTaXplICsgcCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0VyxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdEgsXG4gICAgICAgICAgICBwYWRkaW5nOiBwLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UmVjdGFuZ2xlID0gKHRoaW5nOiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLnJlY3RDb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpbmcucG9zaXRpb24ueCwgdGhpbmcucG9zaXRpb24ueSwgdGhpbmcuc2l6ZS53aWR0aCwgdGhpbmcuc2l6ZS5oZWlnaHQpO1xuICAgICAgICB0aGlzLmRyYXdUZXh0KFxuICAgICAgICAgICAgdGhpbmcubmFtZSxcbiAgICAgICAgICAgIHRoaW5nLnBvc2l0aW9uLnggKyB0aGluZy5zaXplLnBhZGRpbmcsXG4gICAgICAgICAgICB0aGluZy5wb3NpdGlvbi55ICsgKHRoaW5nLnNpemUucGFkZGluZyAvIDIpICsgdGhpbmcuc2l6ZS5mb250U2l6ZSxcbiAgICAgICAgICAgIHRoaW5nLnNpemUuZm9udFNpemUsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUZXh0U2l6ZSA9ICh0ZXh0OiBzdHJpbmcsIGZvbnRTaXplOiBudW1iZXIpOiBUZXh0TWV0cmljcyA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRm9udCA9IHRoaXMuY3R4LmZvbnQ7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBzZXJpZmA7XG4gICAgICAgIGNvbnN0IG1lYXN1cmVkVGV4dCA9IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gcHJldmlvdXNGb250O1xuICAgICAgICByZXR1cm4gbWVhc3VyZWRUZXh0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1RleHQgPSAodGV4dDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgZm9udFNpemU6IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gYCR7Zm9udFNpemV9cHggc2VyaWZgO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5mb250Q29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRleHQsIHgsIHkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0JHID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5iZ0NvbG9yO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsUmVjdCgtKHRoaXMuY2FudmFzLndpZHRoIC8gMiksIC0odGhpcy5jYW52YXMuaGVpZ2h0IC8gMiksIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAvLyBUT0RPOiDQv9C+0LTRg9C80LDRgtGMINC80L7QttC90L4g0LvQuCDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0Y3RgtC+0YIg0LrQvtGB0YLRi9C70YxcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLTEwMDAwLCAtMTAwMDAsIDIwMDAwLCAyMDAwMCk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9