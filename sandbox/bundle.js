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
                    // if (index === 0) {
                    //     commonWidth = commonWidth + this.params.globPadding + ((element.parent.size.width >= element.size.width) ? element.parent.size.width : element.size.width);
                    // } else {
                    //     commonWidth = commonWidth + element.size.width + this.params.globPadding;
                    // }
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
                // const allChildrenWidth = getChildrenWidth(preparedThings[i - 1].children);
                var allChildrenWidth_1 = 0;
                var previousThings = preparedThings.slice(0, i);
                previousThings.forEach(function (thing) {
                    if (thing.children) {
                        allChildrenWidth_1 = allChildrenWidth_1 + getChildrenWidth(thing.children);
                    }
                });
                console.log('preparedThing.name', preparedThing.name);
                console.log('allChildrenWidth:', allChildrenWidth_1);
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
            var fontSize = _this.params.fontSize;
            var textMetrics = _this.getTextSize(thing.name, fontSize);
            var p = fontSize / 4;
            var rectW = (p + textMetrics.width + p);
            var rectH = (p + _this.params.fontSize + p);
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
            _this.drawText(thing.name, thing.position.x + thing.size.padding, thing.position.y + (thing.size.padding / 2) + thing.size.fontSize);
        };
        this.getTextSize = function (text, fontSize) {
            var previousFont = _this.ctx.font;
            _this.ctx.font = "".concat(fontSize, "px serif");
            var measuredText = _this.ctx.measureText(text);
            _this.ctx.font = previousFont;
            return measuredText;
        };
        this.drawText = function (text, x, y) {
            _this.ctx.font = "".concat(_this.params.fontSize, "px serif");
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
            globPadding: 20,
        };
        this.things = things;
        this.preparedThings = null;
    }
    return GrowMap;
}());


GM = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEgsQ0FBQztRQTVSRyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLFNBQVM7WUFDbEIsUUFBUSxFQUFFLEVBQUU7WUFDWixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsT0FBTztZQUNsQixXQUFXLEVBQUUsRUFBRTtTQUNsQjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFrUkwsY0FBQztBQUFELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9HTS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vR00vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0dNLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiDQmtCw0YDRgtCwINGA0L7RgdGC0LBcbiAqIFxuICog0KLRgNC10LHQvtCy0LDQvdC40Y86XG4gKiArIDEpINCf0YDQuCDRgdC+0LfQtNCw0L3QuNC4INC60LDRgNGC0Ysg0L3Rg9C20L3QviDRg9C60LDQt9Cw0YLRjCDQutC+0L3RgtC10LnQvdC10YBcbiAqICsgMikg0J/RgNC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC60LDRgNGC0Ysg0LIg0LrQvtC90YLQtdC50L3QtdGAINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LrQsNC90LLQsNGBXG4gKiArIDMpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0YDQsNGB0YLRj9C90YPRgtGM0YHRjyDQv9C+INGA0LDQt9C80LXRgNGDINC60L7QvdGC0LXQudC90LXRgNCwXG4gKiArIDQpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0YHQu9C10LTQuNGC0Ywg0LfQsCDRgNCw0LfQvNC10YDQvtC8INC60L7QvdGC0LXQudC90LXRgNCwINC4INC10YHQu9C4INC+0L0g0LzQtdC90Y/QtdGC0YHRjyAtINC/0LXRgNC10LfQsNCz0YDRg9C20LDRgtGMINC/0YDQuNC70L7QttC10L3QuNC1XG4gKiA1KSDQmtCw0L3QstCw0YEg0LTQvtC70LbQtdC9INC/0YDQuNC90LjQvNCw0YLRjCDQvdCwINCy0YXQvtC0INC+0LHRitC10LrRgiDQuNC70Lgg0LzQsNGB0YHQuNCyINC+0LHRhdC10LrRgtC+0LIg0Lgg0YDQuNGB0L7QstCw0YLRjCDQs9GA0LDRhNC40LrRg1xuICogNikg0JrQsNC80LXRgNCwINC00L7Qu9C20L3QsCDRhtC10L3RgtGA0L7QstCw0YLRjNGB0Y8g0L/QviDQs9C70LDQstC90L7QvNGDINC+0LHRjNC10LrRgtGDINC40LvQuCDQvdCw0LHQvtGA0YMg0LPQu9Cw0LLQvdGL0YUg0L7QsdGK0LXQutGC0L7QslxuICogNykg0JIg0L/RgNC+0LPRgNCw0LzQvNC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDRgNC10LDQu9C40LfQvtCy0LDQvSDQt9GD0LxcbiAqIDgpINCf0YDQvtCz0YDQsNC80LzQsCDQvNC+0LbQtdGCINCx0YvRgtGMINC30LDQv9GD0YnQtdC90LAg0LfQsNC30LDRg9C80LvQtdC90L7QuSDQuiDQvtGB0L3QvtCy0L3Ri9C8INC+0LHQtdC60YLQsNC8INC40LvQuCDQvtGF0LLQsNGC0YvQstCw0Y8g0L7QsdGJ0LjQuSDRgNCw0LfQvNC10YBcbiAqIDkpINC80LjQvdC40LzQsNC70YzQvdGL0Lkg0LfRg9C8INC+0L/RgNC10LTQtdC70Y/QtdGC0YHRjyDRgNCw0LfQvNC10YDQvtC8INC+0YHQvdC+0LLQvdC+0LPQviDQsdC70L7QutCwIC0g0LzQsNC60YHQuNC80LDQu9GM0L3Ri9C5INC30YPQvCDQvtGF0LLQsNGC0L7QvCDQstGB0LXRhSDQsdC70L7QutC+0LIg0L/Qu9GO0YEg0L7RgtGB0YLRg9C/0YtcbiAqIDEwKSDQoNCw0LfQu9C40YfQvdGL0LUg0L3QsNGB0YLRgNC+0LnQutC4INC80L7QttC90L4g0LLRi9Cy0L7QtNC40YLRjCDQvdCwINGN0LrRgNCw0L0g0YfRgtC+0LHRiyDQvdCw0YHRgtGA0LDQuNCy0LDRgtGMINC40YUg0L/QvtC70LfRg9C90LrQsNC80LhcbiAqIDExKSDQmtCw0LbQtNGL0Lkg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INC+0LHRitC10LrRgiDQvNC+0LbQtdGCINC40LzQtdGC0Ywg0LTQvtGH0LXRgNC90LjQuVxuICogMTIpINCV0YHQu9C4INCyINC00L7Rh9C10YDQvdC10Lwg0L3QtSDRg9C60LDQt9Cw0L3QviDQsiDQutCw0LrRg9GOINGB0YLQvtGA0L7QvdGDINC+0L0g0YHQvNC10YnQsNC10YLRgdGPIC0g0YLQviDQvtC9INGB0LzQtdGJ0LDQtdGC0YHRjyDQsiDRgdC70YPRh9Cw0LnQvdGD0Y4g0YHRgtC+0YDQvtC90YNcbiAqIDEzKSDQlNC+0YfQtdGA0L3QuNC1INGN0LvQtdC80LXQvdGC0Ysg0LjQvNC10Y7RgiDQvtGC0YHRgtGD0L8g0L7RgiDRgNC+0LTQuNGC0LXQu9GM0YHQutC+0LrQviDQuCDRgtCw0Log0LbQtSDQuNC80LXQtdGCINC+0YLRgdGC0YPQvyDQvtGCINGB0LLQvtC40YUg0LrRg9C30LXQvdC+0LJcbiAqIDE0KSDQldGB0YLRjCDQstC+0LfQvNC+0LbQvdC+0YHRgtGMINC80YvRiNC60L7QuSDQtNCy0LjQs9Cw0YLRjCDQutCw0LzQtdGA0YNcbiAqIDE1KSDQoyDQv9GA0LjQu9C+0LbQtdC90LjRjyDQtdGB0YLRjCDQvdC10LrQvtGC0L7RgNC+0LUg0YHQvtGB0YLQvtGP0L3QuNC1IC0g0YHQvtGB0YLQvtGP0L3QuNC1INGF0YDQsNC90LjRgiDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0L7QsdC10LrRgtGLINC4INC40YUg0YHQvtGB0YLQvtGP0L3QuNC1ICjRgNCw0YHQv9C+0LvQvtC20LXQvdC40LUg0Lgg0YLQsNC6INC00LDQu9C10LXQtSlcbiAqIDE2KSDQn9C+INGN0LvQtdC80LXQvdGC0YMg0LzQvtC20L3QviDQutC70LjQutC90YPRgtGMINC4INC/0L7Qu9GD0YfQuNGC0Ywg0LDQutGC0LjQstCw0LjRgNC+0LLQsNC90L3Ri9C5INGN0LvQtdC80LXQvdGCIC0g0Y3Qu9C10LzQtdC90YIg0LzQvtC20LXRgiDQsdGL0YLRjCDQv9C+0LTRgdCy0LXRh9C10L1cbiAqIDE3KSDQldGB0LvQuCDQv9GA0L7QuNGB0YXQvtC00LjRgiDQutC70LjQuiDQv9C+INC00YDRg9Cz0L7QvNGDINGN0LvQtdC80LXQvdGC0YMgLSDQv9GA0LXQtNGL0LTRg9GJ0LjQuSDQv9C10YDQtdGB0YLQsNC10YIg0LHRi9GC0Ywg0LDQutGC0LjQstC90YvQvFxuICogMTgpINCV0YHQu9C4INC60LvQuNC6INC90LUg0LHRi9C7INC60LvQuNC60L3Rg9GCINC90LUg0L/QviDQvtC00L3QvtC80YMg0Y3Qu9C10LzQtdC90YLRgyDRgtC+INC90LjQutCw0LrQvtCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0L3QtdGCXG4gKiAxOSkg0KMg0Y3Qu9C10LzQtdC90YLQvtCyINC10YHRgtGMIHotaW5kZXggLSB6IGluZGV4INCy0LvQuNGP0LXRgiDQvdCwINC+0YLRgNC40YHQvtCy0LrRgyDRjdC70LXQvNC10L3RgtC+0LJcbiAqIDIwKSDQktGB0LUg0LrRg9C30LXQvdGLINC40LzQtdGO0YIg0L7QtNC40L0g0Lgg0YLQvtGCINC20LUg0LjQvdC00LXQutGBIC0g0LLRgdC1INC00L7Rh9C10YDQvdC40LUg0L3QsCDQtdC00LjQvdC40YbRgyDQsdC+0LvRjNGI0LUg0YLQviDQtdGB0YLRjCDQvdC40LbQtVxuICogMjEpINCSINC60LDQttC00L7QvCDRjdC70LXQvNC10L3RgtC1L9Cx0LvQvtC60LUg0LzQvtC20L3QviDQvdCw0L/QuNGB0LDRgtGMINGC0LXQutGB0YIgLSDRgtC10LrRgdGCINC80LXQvdGP0LXRgiDRgNCw0LfQvNC10YAg0LHQu9C+0LrQsCDRjdC70LXQvNC10L3RgtCwIC0g0LLRgdC1INC+0YHRgtCw0LvRjNC90YvQtSDRjdC70LXQvNC10L3RgtGLINC/0L7QtNGB0YLRgNCw0LLQuNCy0LDRjtGC0YHRjyDQv9C+0LQg0L3QvtCy0YvQuSDRgNCw0LfQvNC10YAg0LHQu9C+0LrQsFxuICovXG50eXBlIFRoaW5nID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjaGlsZHJlbj86IEFycmF5PFRoaW5nPlxufVxuXG50eXBlIFRoaW5ncyA9IEFycmF5PFRoaW5nPjtcblxudHlwZSBQcmVwYXJlZFRoaW5ncyA9IFByZXBhcmVkVGhpbmdbXTtcblxudHlwZSBQcmVwYXJlZFRoaW5nID0ge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgY2hpbGRyZW4/OiBBcnJheTxQcmVwYXJlZFRoaW5nPlxuICAgIHBhcmVudD86IFByZXBhcmVkVGhpbmc7XG4gICAgcG9zaXRpb24/OiB7XG4gICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgeTogbnVtYmVyLFxuICAgIH0sXG4gICAgc2l6ZT86IHtcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgIGZvbnRTaXplOiBudW1iZXI7XG4gICAgICAgIHBhZGRpbmc6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcm93TWFwIHtcbiAgICBjb250YWluZXI6IEVsZW1lbnQ7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgYmdDb2xvcjogc3RyaW5nO1xuICAgICAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgICAgICBmb250Q29sb3I6IHN0cmluZztcbiAgICAgICAgcmVjdENvbG9yOiBzdHJpbmc7XG4gICAgICAgIGdsb2JQYWRkaW5nOiBudW1iZXI7XG4gICAgfTtcbiAgICB0aGluZ3M6IFRoaW5ncztcbiAgICBwcmVwYXJlZFRoaW5nczogQXJyYXk8UHJlcGFyZWRUaGluZz47XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEVsZW1lbnQsIHRoaW5nczogVGhpbmdzKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICAgICAgYmdDb2xvcjogJ3NreWJsdWUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDI2LFxuICAgICAgICAgICAgZm9udENvbG9yOiAncmVkJyxcbiAgICAgICAgICAgIHJlY3RDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgIGdsb2JQYWRkaW5nOiAyMCxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRoaW5ncyA9IHRoaW5ncztcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncyA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/QvtC00LPQvtGC0LDQstC70LjQstCw0LXQvCDQv9C+0LvQvtC20LXQvdC40LUg0Y3Qu9C10LzQtdC90YLQvtCyXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcmVwYXJlUG9zaXRpb25zID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gdGhpcy5wcmVwYXJlZFRoaW5ncy5tYXAodGhpcy5wcmVwYXJlUG9zaXRpb24pO1xuICAgICAgICBjb25zb2xlLmxvZygnVGhpbmdzIHNpemVzIGFyZSBwcmVwYXJlZC4nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVQb3NpdGlvbiA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nLCBpOiBudW1iZXIsIHByZXBhcmVkVGhpbmdzOiBQcmVwYXJlZFRoaW5ncykgPT4ge1xuICAgICAgICBjb25zdCB7IHBhcmVudCB9ID0gcHJlcGFyZWRUaGluZztcbiAgICAgICAgY29uc3QgeyBnbG9iUGFkZGluZyB9ID0gdGhpcy5wYXJhbXM7XG5cbiAgICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gMDtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRQcmVwYXJlZFRoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzR2FwID0gc2xpY2VkUHJlcGFyZWRUaGluZ3MucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWUgKyBjdXJyZW50VmFsdWUuc2l6ZS53aWR0aCArIGdsb2JQYWRkaW5nO1xuICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJldmlvdXNHYXA7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGxldCBpc1BhcmVudEV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICBsZXQgaGlnaFBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIGxldCB5UG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGlzUGFyZW50RXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgeVBvc2l0aW9uID0geVBvc2l0aW9uICsgaGlnaFBhcmVudC5zaXplLmhlaWdodCArIGdsb2JQYWRkaW5nO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpZ2hQYXJlbnQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2hQYXJlbnQgPSBoaWdoUGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpc1BhcmVudEV4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA9IHlQb3NpdGlvbjtcbiAgICBcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcGFyZW50LnBvc2l0aW9uLng7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZFByZXBhcmVkVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzR2FwID0gc2xpY2VkUHJlcGFyZWRUaGluZ3MucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWUgKyBjdXJyZW50VmFsdWUuc2l6ZS53aWR0aCArIHRoaXMucGFyYW1zLmdsb2JQYWRkaW5nO1xuICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgcHJldmlvdXNHYXAgPSBwcmV2aW91c0dhcCArIHBhcmVudC5wb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXZpb3VzR2FwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ2V0Q2hpbGRyZW5XaWR0aCA9IChjaGlsZHJlbjogUHJlcGFyZWRUaGluZ1tdKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tbW9uV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmcgKyAoKGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggPj0gZWxlbWVudC5zaXplLndpZHRoKSA/IGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggOiBlbGVtZW50LnNpemUud2lkdGgpO1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggKyBlbGVtZW50LnNpemUud2lkdGggKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcbiAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgYmlnZ2VzdEVsZW0gPSAgKGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggPj0gZWxlbWVudC5zaXplLndpZHRoKSA/IGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggOiBlbGVtZW50LnNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNtYWxsZXN0RWxlbSA9ICAoZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA8PSBlbGVtZW50LnNpemUud2lkdGgpID8gZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA6IGVsZW1lbnQuc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCAtIHNtYWxsZXN0RWxlbTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoICsgZWxlbWVudC5zaXplLndpZHRoICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbm90aGVyQ2hpbGRyZW5XaWR0aCA9IGdldENoaWxkcmVuV2lkdGgoZWxlbWVudC5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggKyBhbm90aGVyQ2hpbGRyZW5XaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCAtIHRoaXMucGFyYW1zLmdsb2JQYWRkaW5nO1xuXG4gICAgICAgICAgICByZXR1cm4gY29tbW9uV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgICAgLy8gY29uc3QgYWxsQ2hpbGRyZW5XaWR0aCA9IGdldENoaWxkcmVuV2lkdGgocHJlcGFyZWRUaGluZ3NbaSAtIDFdLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIGxldCBhbGxDaGlsZHJlbldpZHRoOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNUaGluZ3MgPSBwcmVwYXJlZFRoaW5ncy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHByZXZpb3VzVGhpbmdzLmZvckVhY2goKHRoaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuV2lkdGggPSBhbGxDaGlsZHJlbldpZHRoICsgZ2V0Q2hpbGRyZW5XaWR0aCh0aGluZy5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVwYXJlZFRoaW5nLm5hbWUnLCBwcmVwYXJlZFRoaW5nLm5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FsbENoaWxkcmVuV2lkdGg6JywgYWxsQ2hpbGRyZW5XaWR0aCk7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggKyBhbGxDaGlsZHJlbldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcuY2hpbGRyZW4gPSBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuLm1hcCgoLi4ucHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlUG9zaXRpb24oLi4ucHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwcmVwYXJlZFRoaW5nOyBcbiAgICB9XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICog0JLRi9GH0LjRgdC70Y/QtdC8INGA0LDQt9C80LXRgNGLINGN0LvQtdC80LXQvdGC0L7QslxuICAgICAqL1xuICAgIHByaXZhdGUgcHJlcGFyZVRoaW5nc1NpemVzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gdGhpcy50aGluZ3MubWFwKHRoaXMucHJlcGFyZVRoaW5nU2l6ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUaGluZ3Mgc2l6ZXMgYXJlIHByZXBhcmVkLicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZVRoaW5nU2l6ZSA9ICh0aGluZzogVGhpbmcsIGk6IG51bWJlciwgdGhpbmdzOiBUaGluZ3MsIHBhcmVudFByZXBhcmVkVGhpbmc/OiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcgPSB7XG4gICAgICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBudWxsLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgeDogbnVsbCxcbiAgICAgICAgICAgICAgICB5OiBudWxsLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJlcGFyZWRUaGluZy5uYW1lID0gdGhpbmcubmFtZTtcblxuICAgICAgICBpZiAocGFyZW50UHJlcGFyZWRUaGluZykge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wYXJlbnQgPSBwYXJlbnRQcmVwYXJlZFRoaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INGI0LjRgNC40L3RgyDQuCDQstGL0YHQvtGC0YMg0YLQtdC60YHRgtC+0LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuICAgICAgICBjb25zdCB0aGluZ1NpemUgPSB0aGlzLmdldFRoaW5nU2l6ZSh0aGluZyk7XG5cbiAgICAgICAgcHJlcGFyZWRUaGluZy5zaXplID0ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaW5nU2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpbmdTaXplLmhlaWdodCxcbiAgICAgICAgICAgIGZvbnRTaXplOiB0aGluZ1NpemUuZm9udFNpemUsXG4gICAgICAgICAgICBwYWRkaW5nOiB0aGluZ1NpemUucGFkZGluZyxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5jaGlsZHJlbiA9IHRoaW5nLmNoaWxkcmVuLm1hcCgoLi4ucHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlVGhpbmdTaXplKC4uLnByb3BzLCBwcmVwYXJlZFRoaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0FwcCBpbml0aWFsaXphdGlvbiBpcyBzdGFydGVkLicpO1xuXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLnByZXBhcmVUaGluZ3NTaXplcygpO1xuICAgICAgICB0aGlzLnByZXBhcmVQb3NpdGlvbnMoKTtcblxuICAgICAgICBjb25zdCB3ID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMuY2FudmFzLndpZHRoIC8gMiwgdGhpcy5jYW52YXMuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZWRDb250YWluZXJEYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBwcmV2aW91c1dpZHRoOiBudWxsLFxuICAgICAgICAgICAgcHJldmlvdXNIZWlnaHQ6IG51bGwsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250YWluZXJSZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICEhKG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoICYmIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodCkgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIChlbnRyaWVzWzBdLmNvbnRlbnRSZWN0LndpZHRoICE9PSBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNXaWR0aCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKGVudHJpZXNbMF0uY29udGVudFJlY3QuaGVpZ2h0ICE9PSBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNIZWlnaHQpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb250YWluZXIgc2l6ZSBpcyBjaGFuZ2VkIC0gcmVsb2FkIHRoZSBhcHAuJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyUmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNXaWR0aCA9IGVudHJpZXNbMF0uY29udGVudFJlY3Qud2lkdGg7XG4gICAgICAgICAgICBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNIZWlnaHQgPSBlbnRyaWVzWzBdLmNvbnRlbnRSZWN0LmhlaWdodDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRhaW5lclJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdBcHAgaXMgc3RhcnRlZC4nKTtcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0JHKCk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhd1RoaW5ncyh0aGlzLnByZXBhcmVkVGhpbmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZHJhd1RoaW5ncyA9IChwcmVwYXJlZFRoaW5nczogUHJlcGFyZWRUaGluZ1tdKSA9PiB7XG4gICAgICAgIHByZXBhcmVkVGhpbmdzLmZvckVhY2goKHByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1JlY3RhbmdsZShwcmVwYXJlZFRoaW5nKTtcblxuICAgICAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdUaGluZ3MocHJlcGFyZWRUaGluZy5jaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVsb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnQXBwIHJlbG9hZCBpcyBzdGFydGVkLicpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaGluZ1NpemUgPSAodGhpbmc6IFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdGhpcy5wYXJhbXMuZm9udFNpemU7XG4gICAgICAgIGNvbnN0IHRleHRNZXRyaWNzID0gdGhpcy5nZXRUZXh0U2l6ZSh0aGluZy5uYW1lLCBmb250U2l6ZSk7XG5cbiAgICAgICAgY29uc3QgcCA9IGZvbnRTaXplIC8gNDtcblxuICAgICAgICBjb25zdCByZWN0VyA9IChwICsgdGV4dE1ldHJpY3Mud2lkdGggKyBwKTtcbiAgICAgICAgY29uc3QgcmVjdEggPSAocCArIHRoaXMucGFyYW1zLmZvbnRTaXplICsgcCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0VyxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdEgsXG4gICAgICAgICAgICBwYWRkaW5nOiBwLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UmVjdGFuZ2xlID0gKHRoaW5nOiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLnJlY3RDb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpbmcucG9zaXRpb24ueCwgdGhpbmcucG9zaXRpb24ueSwgdGhpbmcuc2l6ZS53aWR0aCwgdGhpbmcuc2l6ZS5oZWlnaHQpO1xuICAgICAgICB0aGlzLmRyYXdUZXh0KFxuICAgICAgICAgICAgdGhpbmcubmFtZSxcbiAgICAgICAgICAgIHRoaW5nLnBvc2l0aW9uLnggKyB0aGluZy5zaXplLnBhZGRpbmcsXG4gICAgICAgICAgICB0aGluZy5wb3NpdGlvbi55ICsgKHRoaW5nLnNpemUucGFkZGluZyAvIDIpICsgdGhpbmcuc2l6ZS5mb250U2l6ZSxcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUZXh0U2l6ZSA9ICh0ZXh0OiBzdHJpbmcsIGZvbnRTaXplOiBudW1iZXIpOiBUZXh0TWV0cmljcyA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRm9udCA9IHRoaXMuY3R4LmZvbnQ7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBzZXJpZmA7XG4gICAgICAgIGNvbnN0IG1lYXN1cmVkVGV4dCA9IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gcHJldmlvdXNGb250O1xuICAgICAgICByZXR1cm4gbWVhc3VyZWRUZXh0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1RleHQgPSAodGV4dDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gYCR7dGhpcy5wYXJhbXMuZm9udFNpemV9cHggc2VyaWZgO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5mb250Q29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRleHQsIHgsIHkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0JHID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5iZ0NvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgtKHRoaXMuY2FudmFzLndpZHRoIC8gMiksIC0odGhpcy5jYW52YXMuaGVpZ2h0IC8gMiksIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==