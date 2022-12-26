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
        this.getChildrenWidth = function (children) {
            var commonWidth = 0;
            children.forEach(function (element, index) {
                if (index === 0) {
                    // const biggestElem = (element.parent.size.width >= element.size.width) ? element.parent.size.width : element.size.width;
                    var smallestElem = (element.parent.size.width <= element.size.width) ? element.parent.size.width : element.size.width;
                    commonWidth = commonWidth - smallestElem;
                }
                commonWidth = commonWidth + element.size.width + _this.params.globPadding;
                if (element.children) {
                    var anotherChildrenWidth = _this.getChildrenWidth(element.children);
                    commonWidth = commonWidth + anotherChildrenWidth;
                }
            });
            commonWidth = commonWidth - _this.params.globPadding;
            return commonWidth;
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
            // console.log('childrenCenter:', childrenCenter);
            // console.log('allChildrenWidth:', allChildrenWidth);
            if (i !== 0) {
                var allChildrenWidth_1 = 0;
                var previousThings = preparedThings.slice(0, i);
                previousThings.forEach(function (thing) {
                    if (thing.children) {
                        allChildrenWidth_1 = allChildrenWidth_1 + _this.getChildrenWidth(thing.children);
                    }
                });
                preparedThing.position.x = preparedThing.position.x + allChildrenWidth_1;
            }
            if (_this.params.centering) {
                if (parent) {
                    var childrenWidth = _this.getChildrenWidth(parent.children);
                    var halfWidth = childrenWidth / 2;
                    preparedThing.position.x = preparedThing.position.x - halfWidth;
                }
                if (preparedThing.children) {
                    var childrenWidth = _this.getChildrenWidth(preparedThing.children);
                    var halfWidth = childrenWidth / 2;
                    preparedThing.position.x = preparedThing.position.x + halfWidth;
                }
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
        this.findBorders = function (preparedThing, borders) {
            if (preparedThing.position.x <= borders.left) {
                borders.left = preparedThing.position.x;
            }
            if (preparedThing.position.y <= borders.top) {
                borders.top = preparedThing.position.y;
            }
            if ((preparedThing.position.x + preparedThing.size.width) >= borders.right) {
                borders.right = (preparedThing.position.x + preparedThing.size.width);
            }
            if ((preparedThing.position.y + preparedThing.size.height) >= borders.bottom) {
                borders.bottom = (preparedThing.position.y + preparedThing.size.height);
            }
            if (preparedThing.children) {
                preparedThing.children.every(function (preparedThing) {
                    return _this.findBorders(preparedThing, borders);
                });
            }
            return true;
        };
        this.setBorders = function () {
            var borders = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            };
            _this.preparedThings.every(function (preparedThing) {
                _this.findBorders(preparedThing, borders);
            });
            _this.params.borders.left = borders.left;
            _this.params.borders.right = borders.right;
            _this.params.borders.top = borders.top;
            _this.params.borders.bottom = borders.bottom;
        };
        this.init = function () {
            _this.canvas = document.createElement('canvas');
            _this.canvas.id = 'growMapCanvas';
            _this.ctx = _this.canvas.getContext('2d');
            var w = _this.container.clientWidth;
            var h = _this.container.clientHeight;
            _this.prepareThingsSizes();
            _this.preparePositions();
            _this.setBorders();
            _this.canvas.width = w;
            _this.canvas.height = h;
            _this.container.appendChild(_this.canvas);
            // Устанавливаем вью в цент всех элементов
            _this.params.center.x = (_this.canvas.width / 2) - ((_this.params.borders.right - _this.params.borders.left) / 2);
            _this.params.center.y = (_this.canvas.height / 2) - ((_this.params.borders.bottom - _this.params.borders.top) / 2);
            _this.ctx.translate(_this.params.center.x, _this.params.center.y);
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
            _this.canvas.addEventListener('mousedown', function (e) {
                _this.params.drag.isDragging = true;
                _this.params.drag.previousPosition = {
                    x: e.offsetX,
                    y: e.offsetY,
                };
            });
            _this.canvas.addEventListener('mouseup', function (e) {
                _this.params.drag.isDragging = false;
                _this.params.drag.previousPosition = {
                    x: e.offsetX,
                    y: e.offsetY,
                };
            });
            _this.canvas.addEventListener('mousemove', function (e) {
                if (_this.params.drag.isDragging) {
                    var xSlide = e.offsetX - _this.params.drag.previousPosition.x;
                    var ySlide = e.offsetY - _this.params.drag.previousPosition.y;
                    _this.ctx.translate(xSlide, ySlide);
                    _this.params.center.x = _this.params.center.x + xSlide;
                    _this.params.center.y = _this.params.center.y + ySlide;
                    _this.params.drag.previousPosition = {
                        x: e.offsetX,
                        y: e.offsetY,
                    };
                }
            });
            var checkSelection = function (preparedThing, xPos, yPos) {
                var withinTheBordersX = (xPos >= (preparedThing.position.x)) &&
                    xPos <= (preparedThing.position.x + preparedThing.size.width);
                var withinTheBordersY = (yPos >= preparedThing.position.y) &&
                    yPos <= (preparedThing.position.y + preparedThing.size.height);
                if (withinTheBordersX) {
                    if (withinTheBordersY) {
                        return preparedThing;
                    }
                }
                if (preparedThing.children) {
                    preparedThing.children.every(function (preparedThing) {
                        var clickedThing = checkSelection(preparedThing, xPos, yPos);
                        if (clickedThing) {
                            _this.activeElement = clickedThing;
                            return false;
                        }
                        else {
                            _this.activeElement = null;
                        }
                        return true;
                    });
                    if (_this.activeElement) {
                        return _this.activeElement;
                    }
                }
                return null;
            };
            // Кликаем по канвасу - узнаем куда кликнули
            // Перебираем все элементы - ищем границы куда кликнули
            _this.canvas.addEventListener('click', function (e) {
                var virtualOffsetX = e.offsetX - (_this.params.center.x);
                var virtualOffsetY = e.offsetY - (_this.params.center.y);
                _this.preparedThings.every(function (preparedThing) {
                    var clickedThing = checkSelection(preparedThing, virtualOffsetX, virtualOffsetY);
                    if (clickedThing) {
                        _this.activeElement = clickedThing;
                        return false;
                    }
                    else {
                        _this.activeElement = null;
                    }
                    return true;
                });
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
            var _a, _b;
            if ((thing === null || thing === void 0 ? void 0 : thing.name) === ((_a = _this.activeElement) === null || _a === void 0 ? void 0 : _a.name)) {
                _this.ctx.fillStyle = _this.params.activeRectColor;
            }
            else {
                _this.ctx.fillStyle = _this.params.rectColor;
            }
            _this.ctx.fillRect(thing.position.x, thing.position.y, thing.size.width, thing.size.height);
            var fontColor;
            if ((thing === null || thing === void 0 ? void 0 : thing.name) === ((_b = _this.activeElement) === null || _b === void 0 ? void 0 : _b.name)) {
                fontColor = _this.params.activeFontColor;
            }
            else {
                fontColor = _this.params.fontColor;
            }
            _this.drawText(thing.name, thing.position.x + thing.size.padding, thing.position.y + (thing.size.padding / 2) + thing.size.fontSize, thing.size.fontSize, fontColor);
        };
        this.getTextSize = function (text, fontSize) {
            var previousFont = _this.ctx.font;
            _this.ctx.font = "".concat(fontSize, "px sans-serif");
            var measuredText = _this.ctx.measureText(text);
            _this.ctx.font = previousFont;
            return measuredText;
        };
        this.drawText = function (text, x, y, fontSize, fontColor) {
            _this.ctx.font = "".concat(fontSize, "px sans-serif");
            _this.ctx.fillStyle = fontColor;
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
        this.activeElement = null;
        this.params = {
            centering: true,
            bgColor: 'skyblue',
            fontSize: 26,
            fontColor: 'black',
            activeFontColor: 'white',
            rectColor: 'white',
            activeRectColor: '#ed4d72',
            zoom: 1,
            globPadding: 40,
            center: {
                x: 0,
                y: 0,
            },
            drag: {
                isDragging: false,
                previousPosition: {
                    x: 0,
                    y: 0
                }
            },
            borders: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxFQUFFLENBQUM7Z0JBQ04sTUFBTSxFQUFFLENBQUM7YUFDWjtTQUNKO1FBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRTtZQUM5QyxhQUFhO1lBQ2Isa0JBQWtCO1lBQ2xCLEdBQUcsZ0JBQUssT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBQyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUErYkwsY0FBQztBQUFELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9HTS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vR00vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0dNLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiDQmtCw0YDRgtCwINGA0L7RgdGC0LBcbiAqIFxuICog0KLRgNC10LHQvtCy0LDQvdC40Y86XG4gKiArIDEpINCf0YDQuCDRgdC+0LfQtNCw0L3QuNC4INC60LDRgNGC0Ysg0L3Rg9C20L3QviDRg9C60LDQt9Cw0YLRjCDQutC+0L3RgtC10LnQvdC10YBcbiAqICsgMikg0J/RgNC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC60LDRgNGC0Ysg0LIg0LrQvtC90YLQtdC50L3QtdGAINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LrQsNC90LLQsNGBXG4gKiArIDMpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0YDQsNGB0YLRj9C90YPRgtGM0YHRjyDQv9C+INGA0LDQt9C80LXRgNGDINC60L7QvdGC0LXQudC90LXRgNCwXG4gKiArIDQpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0YHQu9C10LTQuNGC0Ywg0LfQsCDRgNCw0LfQvNC10YDQvtC8INC60L7QvdGC0LXQudC90LXRgNCwINC4INC10YHQu9C4INC+0L0g0LzQtdC90Y/QtdGC0YHRjyAtINC/0LXRgNC10LfQsNCz0YDRg9C20LDRgtGMINC/0YDQuNC70L7QttC10L3QuNC1XG4gKiArIDUpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0L/RgNC40L3QuNC80LDRgtGMINC90LAg0LLRhdC+0LQg0L7QsdGK0LXQutGCINC40LvQuCDQvNCw0YHRgdC40LIg0L7QsdGF0LXQutGC0L7QsiDQuCDRgNC40YHQvtCy0LDRgtGMINCz0YDQsNGE0LjQutGDXG4gKiArIDYpINCa0LDQvNC10YDQsCDQtNC+0LvQttC90LAg0YbQtdC90YLRgNC+0LLQsNGC0YzRgdGPINC/0L4g0LPQu9Cw0LLQvdC+0LzRgyDQvtCx0YzQtdC60YLRgyDQuNC70Lgg0L3QsNCx0L7RgNGDINCz0LvQsNCy0L3Ri9GFINC+0LHRitC10LrRgtC+0LJcbiAqICsgNykg0JIg0L/RgNC+0LPRgNCw0LzQvNC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDRgNC10LDQu9C40LfQvtCy0LDQvSDQt9GD0LxcbiAqICsgOCkg0J/RgNC+0LPRgNCw0LzQvNCwINC80L7QttC10YIg0LHRi9GC0Ywg0LfQsNC/0YPRidC10L3QsCDQt9Cw0LfQsNGD0LzQu9C10L3QvtC5INC6INC+0YHQvdC+0LLQvdGL0Lwg0L7QsdC10LrRgtCw0Lwg0LjQu9C4INC+0YXQstCw0YLRi9Cy0LDRjyDQvtCx0YnQuNC5INGA0LDQt9C80LXRgFxuICogOSkg0LzQuNC90LjQvNCw0LvRjNC90YvQuSDQt9GD0Lwg0L7Qv9GA0LXQtNC10LvRj9C10YLRgdGPINGA0LDQt9C80LXRgNC+0Lwg0L7RgdC90L7QstC90L7Qs9C+INCx0LvQvtC60LAgLSDQvNCw0LrRgdC40LzQsNC70YzQvdGL0Lkg0LfRg9C8INC+0YXQstCw0YLQvtC8INCy0YHQtdGFINCx0LvQvtC60L7QsiDQv9C70Y7RgSDQvtGC0YHRgtGD0L/Ri1xuICogMTApINCg0LDQt9C70LjRh9C90YvQtSDQvdCw0YHRgtGA0L7QudC60Lgg0LzQvtC20L3QviDQstGL0LLQvtC00LjRgtGMINC90LAg0Y3QutGA0LDQvSDRh9GC0L7QsdGLINC90LDRgdGC0YDQsNC40LLQsNGC0Ywg0LjRhSDQv9C+0LvQt9GD0L3QutCw0LzQuFxuICogKyAxMSkg0JrQsNC20LTRi9C5INGA0L7QtNC40YLQtdC70YzRgdC60LjQuSDQvtCx0YrQtdC60YIg0LzQvtC20LXRgiDQuNC80LXRgtGMINC00L7Rh9C10YDQvdC40LlcbiAqIDEyKSDQldGB0LvQuCDQsiDQtNC+0YfQtdGA0L3QtdC8INC90LUg0YPQutCw0LfQsNC90L4g0LIg0LrQsNC60YPRjiDRgdGC0L7RgNC+0L3RgyDQvtC9INGB0LzQtdGJ0LDQtdGC0YHRjyAtINGC0L4g0L7QvSDRgdC80LXRidCw0LXRgtGB0Y8g0LIg0YHQu9GD0YfQsNC50L3Rg9GOINGB0YLQvtGA0L7QvdGDXG4gKiArIDEzKSDQlNC+0YfQtdGA0L3QuNC1INGN0LvQtdC80LXQvdGC0Ysg0LjQvNC10Y7RgiDQvtGC0YHRgtGD0L8g0L7RgiDRgNC+0LTQuNGC0LXQu9GM0YHQutC+0LrQviDQuCDRgtCw0Log0LbQtSDQuNC80LXQtdGCINC+0YLRgdGC0YPQvyDQvtGCINGB0LLQvtC40YUg0LrRg9C30LXQvdC+0LJcbiAqICsgMTQpINCV0YHRgtGMINCy0L7Qt9C80L7QttC90L7RgdGC0Ywg0LzRi9GI0LrQvtC5INC00LLQuNCz0LDRgtGMINC60LDQvNC10YDRg1xuICogKyAxNSkg0KMg0L/RgNC40LvQvtC20LXQvdC40Y8g0LXRgdGC0Ywg0L3QtdC60L7RgtC+0YDQvtC1INGB0L7RgdGC0L7Rj9C90LjQtSAtINGB0L7RgdGC0L7Rj9C90LjQtSDRhdGA0LDQvdC40YIg0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INC+0LHQtdC60YLRiyDQuCDQuNGFINGB0L7RgdGC0L7Rj9C90LjQtSAo0YDQsNGB0L/QvtC70L7QttC10L3QuNC1INC4INGC0LDQuiDQtNCw0LvQtdC10LUpXG4gKiArIDE2KSDQn9C+INGN0LvQtdC80LXQvdGC0YMg0LzQvtC20L3QviDQutC70LjQutC90YPRgtGMINC4INC/0L7Qu9GD0YfQuNGC0Ywg0LDQutGC0LjQstCw0LjRgNC+0LLQsNC90L3Ri9C5INGN0LvQtdC80LXQvdGCIC0g0Y3Qu9C10LzQtdC90YIg0LzQvtC20LXRgiDQsdGL0YLRjCDQv9C+0LTRgdCy0LXRh9C10L1cbiAqICsgMTcpINCV0YHQu9C4INC/0YDQvtC40YHRhdC+0LTQuNGCINC60LvQuNC6INC/0L4g0LTRgNGD0LPQvtC80YMg0Y3Qu9C10LzQtdC90YLRgyAtINC/0YDQtdC00YvQtNGD0YnQuNC5INC/0LXRgNC10YHRgtCw0LXRgiDQsdGL0YLRjCDQsNC60YLQuNCy0L3Ri9C8XG4gKiArIDE4KSDQldGB0LvQuCDQutC70LjQuiDQvdC1INCx0YvQuyDQutC70LjQutC90YPRgiDQvdC1INC/0L4g0L7QtNC90L7QvNGDINGN0LvQtdC80LXQvdGC0YMg0YLQviDQvdC40LrQsNC60L7Qs9C+INCw0LrRgtC40LLQvdC+0LPQviDRjdC70LXQvNC10L3RgtCwINC90LXRglxuICogMTkpINCjINGN0LvQtdC80LXQvdGC0L7QsiDQtdGB0YLRjCB6LWluZGV4IC0geiBpbmRleCDQstC70LjRj9C10YIg0L3QsCDQvtGC0YDQuNGB0L7QstC60YMg0Y3Qu9C10LzQtdC90YLQvtCyXG4gKiAyMCkg0JLRgdC1INC60YPQt9C10L3RiyDQuNC80LXRjtGCINC+0LTQuNC9INC4INGC0L7RgiDQttC1INC40L3QtNC10LrRgSAtINCy0YHQtSDQtNC+0YfQtdGA0L3QuNC1INC90LAg0LXQtNC40L3QuNGG0YMg0LHQvtC70YzRiNC1INGC0L4g0LXRgdGC0Ywg0L3QuNC20LVcbiAqID8gMjEpINCSINC60LDQttC00L7QvCDRjdC70LXQvNC10L3RgtC1L9Cx0LvQvtC60LUg0LzQvtC20L3QviDQvdCw0L/QuNGB0LDRgtGMINGC0LXQutGB0YIgLSDRgtC10LrRgdGCINC80LXQvdGP0LXRgiDRgNCw0LfQvNC10YAg0LHQu9C+0LrQsCDRjdC70LXQvNC10L3RgtCwIC0g0LLRgdC1INC+0YHRgtCw0LvRjNC90YvQtSDRjdC70LXQvNC10L3RgtGLINC/0L7QtNGB0YLRgNCw0LLQuNCy0LDRjtGC0YHRjyDQv9C+0LQg0L3QvtCy0YvQuSDRgNCw0LfQvNC10YAg0LHQu9C+0LrQsFxuICogMjIpINCg0L7QtNC40YLQtdC70YzRgdC60LjQuSDQsdC70L7QuiDRhtC10L3RgtGA0YPQtdGC0YHRjyDQv9C+INGG0LXQvdGC0YDRgyDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0LLRgdC10YUg0LTQvtGH0LXRgNC90LjRhSDRjdC70LXQvNC10L3RgtC+0LJcbiAqL1xudHlwZSBUaGluZyA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2hpbGRyZW4/OiBBcnJheTxUaGluZz5cbn1cblxudHlwZSBUaGluZ3MgPSBBcnJheTxUaGluZz47XG5cbnR5cGUgUHJlcGFyZWRUaGluZ3MgPSBQcmVwYXJlZFRoaW5nW107XG5cbnR5cGUgUHJlcGFyZWRUaGluZyA9IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGNoaWxkcmVuPzogQXJyYXk8UHJlcGFyZWRUaGluZz5cbiAgICBwYXJlbnQ/OiBQcmVwYXJlZFRoaW5nO1xuICAgIHBvc2l0aW9uPzoge1xuICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgIHk6IG51bWJlcixcbiAgICB9LFxuICAgIHNpemU/OiB7XG4gICAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgICAgIGhlaWdodDogbnVtYmVyO1xuICAgICAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgICAgICBwYWRkaW5nOiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3Jvd01hcCB7XG4gICAgY29udGFpbmVyOiBFbGVtZW50O1xuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcGFyYW1zOiB7XG4gICAgICAgIGNlbnRlcmluZzogYm9vbGVhbjtcbiAgICAgICAgYmdDb2xvcjogc3RyaW5nO1xuICAgICAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgICAgICBmb250Q29sb3I6IHN0cmluZztcbiAgICAgICAgYWN0aXZlRm9udENvbG9yOiBzdHJpbmc7XG4gICAgICAgIHJlY3RDb2xvcjogc3RyaW5nO1xuICAgICAgICBhY3RpdmVSZWN0Q29sb3I6IHN0cmluZztcbiAgICAgICAgZ2xvYlBhZGRpbmc6IG51bWJlcjtcbiAgICAgICAgem9vbTogbnVtYmVyO1xuICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICAgIHg6IG51bWJlcjtcbiAgICAgICAgICAgIHk6IG51bWJlcjtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZzoge1xuICAgICAgICAgICAgaXNEcmFnZ2luZzogYm9vbGVhbjtcbiAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgeTogbnVtYmVyLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBib3JkZXJzOiB7XG4gICAgICAgICAgICBsZWZ0OiBudW1iZXI7XG4gICAgICAgICAgICByaWdodDogbnVtYmVyO1xuICAgICAgICAgICAgdG9wOiBudW1iZXI7XG4gICAgICAgICAgICBib3R0b206IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpbmdzOiBUaGluZ3M7XG4gICAgcHJlcGFyZWRUaGluZ3M6IEFycmF5PFByZXBhcmVkVGhpbmc+O1xuICAgIGFjdGl2ZUVsZW1lbnQ6IFByZXBhcmVkVGhpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEVsZW1lbnQsIHRoaW5nczogVGhpbmdzKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICAgICAgY2VudGVyaW5nOiB0cnVlLFxuICAgICAgICAgICAgYmdDb2xvcjogJ3NreWJsdWUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDI2LFxuICAgICAgICAgICAgZm9udENvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgYWN0aXZlRm9udENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgcmVjdENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgYWN0aXZlUmVjdENvbG9yOiAnI2VkNGQ3MicsXG4gICAgICAgICAgICB6b29tOiAxLFxuICAgICAgICAgICAgZ2xvYlBhZGRpbmc6IDQwLFxuICAgICAgICAgICAgY2VudGVyOiB7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYWc6IHtcbiAgICAgICAgICAgICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBwcmV2aW91c1Bvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9yZGVyczoge1xuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5wYXJhbXMsICdnbG9iUGFkZGluZycsIHtcbiAgICAgICAgICAgIC8vIHZhbHVlOiA0MixcbiAgICAgICAgICAgIC8vIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gdGhpcy56b29tICogMjAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGhpbmdzID0gdGhpbmdzO1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LTQs9C+0YLQsNCy0LvQuNCy0LDQtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDRjdC70LXQvNC10L3RgtC+0LJcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVQb3NpdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MgPSB0aGlzLnByZXBhcmVkVGhpbmdzLm1hcCh0aGlzLnByZXBhcmVQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRyZW5XaWR0aCA9IChjaGlsZHJlbjogUHJlcGFyZWRUaGluZ1tdKSA9PiB7XG4gICAgICAgIGxldCBjb21tb25XaWR0aDogbnVtYmVyID0gMDtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGJpZ2dlc3RFbGVtID0gKGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggPj0gZWxlbWVudC5zaXplLndpZHRoKSA/IGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggOiBlbGVtZW50LnNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgY29uc3Qgc21hbGxlc3RFbGVtID0gKGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggPD0gZWxlbWVudC5zaXplLndpZHRoKSA/IGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggOiBlbGVtZW50LnNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCAtIHNtYWxsZXN0RWxlbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCArIGVsZW1lbnQuc2l6ZS53aWR0aCArIHRoaXMucGFyYW1zLmdsb2JQYWRkaW5nO1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFub3RoZXJDaGlsZHJlbldpZHRoID0gdGhpcy5nZXRDaGlsZHJlbldpZHRoKGVsZW1lbnQuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggKyBhbm90aGVyQ2hpbGRyZW5XaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCAtIHRoaXMucGFyYW1zLmdsb2JQYWRkaW5nO1xuXG4gICAgICAgIHJldHVybiBjb21tb25XaWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVQb3NpdGlvbiA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nLCBpOiBudW1iZXIsIHByZXBhcmVkVGhpbmdzOiBQcmVwYXJlZFRoaW5ncykgPT4ge1xuICAgICAgICBjb25zdCB7IHBhcmVudCB9ID0gcHJlcGFyZWRUaGluZztcbiAgICAgICAgY29uc3QgeyBnbG9iUGFkZGluZyB9ID0gdGhpcy5wYXJhbXM7XG5cbiAgICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gMDtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRQcmVwYXJlZFRoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzR2FwID0gc2xpY2VkUHJlcGFyZWRUaGluZ3MucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWUgKyBjdXJyZW50VmFsdWUuc2l6ZS53aWR0aCArIGdsb2JQYWRkaW5nO1xuICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJldmlvdXNHYXA7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGxldCBpc1BhcmVudEV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICBsZXQgaGlnaFBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIGxldCB5UG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGlzUGFyZW50RXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgeVBvc2l0aW9uID0geVBvc2l0aW9uICsgaGlnaFBhcmVudC5zaXplLmhlaWdodCArIGdsb2JQYWRkaW5nO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpZ2hQYXJlbnQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2hQYXJlbnQgPSBoaWdoUGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpc1BhcmVudEV4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA9IHlQb3NpdGlvbjtcbiAgICBcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcGFyZW50LnBvc2l0aW9uLng7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZFByZXBhcmVkVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzR2FwID0gc2xpY2VkUHJlcGFyZWRUaGluZ3MucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWUgKyBjdXJyZW50VmFsdWUuc2l6ZS53aWR0aCArIHRoaXMucGFyYW1zLmdsb2JQYWRkaW5nO1xuICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgcHJldmlvdXNHYXAgPSBwcmV2aW91c0dhcCArIHBhcmVudC5wb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXZpb3VzR2FwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NoaWxkcmVuQ2VudGVyOicsIGNoaWxkcmVuQ2VudGVyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2FsbENoaWxkcmVuV2lkdGg6JywgYWxsQ2hpbGRyZW5XaWR0aCk7XG5cbiAgICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgICAgIGxldCBhbGxDaGlsZHJlbldpZHRoOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNUaGluZ3MgPSBwcmVwYXJlZFRoaW5ncy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHByZXZpb3VzVGhpbmdzLmZvckVhY2goKHRoaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuV2lkdGggPSBhbGxDaGlsZHJlbldpZHRoICsgdGhpcy5nZXRDaGlsZHJlbldpZHRoKHRoaW5nLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgYWxsQ2hpbGRyZW5XaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBhcmFtcy5jZW50ZXJpbmcpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbldpZHRoID0gdGhpcy5nZXRDaGlsZHJlbldpZHRoKHBhcmVudC5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICBjb25zdCBoYWxmV2lkdGggPSBjaGlsZHJlbldpZHRoIC8gMjtcbiAgICBcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggLSBoYWxmV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAocHJlcGFyZWRUaGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuV2lkdGggPSB0aGlzLmdldENoaWxkcmVuV2lkdGgocHJlcGFyZWRUaGluZy5jaGlsZHJlbilcbiAgICAgICAgICAgICAgICBjb25zdCBoYWxmV2lkdGggPSBjaGlsZHJlbldpZHRoIC8gMjtcbiAgICBcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggKyBoYWxmV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJlcGFyZWRUaGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5jaGlsZHJlbiA9IHByZXBhcmVkVGhpbmcuY2hpbGRyZW4ubWFwKCguLi5wcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXBhcmVQb3NpdGlvbiguLi5wcm9wcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmVwYXJlZFRoaW5nOyBcbiAgICB9XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICog0JLRi9GH0LjRgdC70Y/QtdC8INGA0LDQt9C80LXRgNGLINGN0LvQtdC80LXQvdGC0L7QslxuICAgICAqL1xuICAgIHByaXZhdGUgcHJlcGFyZVRoaW5nc1NpemVzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gdGhpcy50aGluZ3MubWFwKHRoaXMucHJlcGFyZVRoaW5nU2l6ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlVGhpbmdTaXplID0gKHRoaW5nOiBUaGluZywgaTogbnVtYmVyLCB0aGluZ3M6IFRoaW5ncywgcGFyZW50UHJlcGFyZWRUaGluZz86IFByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgY29uc3QgcHJlcGFyZWRUaGluZzogUHJlcGFyZWRUaGluZyA9IHtcbiAgICAgICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IG51bGwsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiBudWxsLFxuICAgICAgICAgICAgICAgIHk6IG51bGwsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcmVwYXJlZFRoaW5nLm5hbWUgPSB0aGluZy5uYW1lO1xuXG4gICAgICAgIGlmIChwYXJlbnRQcmVwYXJlZFRoaW5nKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBhcmVudCA9IHBhcmVudFByZXBhcmVkVGhpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0YjQuNGA0LjQvdGDINC4INCy0YvRgdC+0YLRgyDRgtC10LrRgdGC0L7QstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG4gICAgICAgIGNvbnN0IHRoaW5nU2l6ZSA9IHRoaXMuZ2V0VGhpbmdTaXplKHRoaW5nKTtcblxuICAgICAgICBwcmVwYXJlZFRoaW5nLnNpemUgPSB7XG4gICAgICAgICAgICB3aWR0aDogdGhpbmdTaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGluZ1NpemUuaGVpZ2h0LFxuICAgICAgICAgICAgZm9udFNpemU6IHRoaW5nU2l6ZS5mb250U2l6ZSxcbiAgICAgICAgICAgIHBhZGRpbmc6IHRoaW5nU2l6ZS5wYWRkaW5nLFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuID0gdGhpbmcuY2hpbGRyZW4ubWFwKCguLi5wcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXBhcmVUaGluZ1NpemUoLi4ucHJvcHMsIHByZXBhcmVkVGhpbmcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwcmVwYXJlZFRoaW5nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICBmaW5kQm9yZGVycyA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nLCBib3JkZXJzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA8PSBib3JkZXJzLmxlZnQpIHtcbiAgICAgICAgICAgIGJvcmRlcnMubGVmdCA9IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPD0gYm9yZGVycy50b3ApIHtcbiAgICAgICAgICAgIGJvcmRlcnMudG9wID0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggKyBwcmVwYXJlZFRoaW5nLnNpemUud2lkdGgpID49IGJvcmRlcnMucmlnaHQpIHtcbiAgICAgICAgICAgIGJvcmRlcnMucmlnaHQgPSAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgcHJlcGFyZWRUaGluZy5zaXplLndpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgocHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ICsgcHJlcGFyZWRUaGluZy5zaXplLmhlaWdodCkgPj0gYm9yZGVycy5ib3R0b20pIHtcbiAgICAgICAgICAgIGJvcmRlcnMuYm90dG9tID0gKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSArIHByZXBhcmVkVGhpbmcuc2l6ZS5oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcuY2hpbGRyZW4uZXZlcnkoKHByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kQm9yZGVycyhwcmVwYXJlZFRoaW5nLCBib3JkZXJzKSBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc2V0Qm9yZGVycyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYm9yZGVycyA9IHtcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncy5ldmVyeSgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5maW5kQm9yZGVycyhwcmVwYXJlZFRoaW5nLCBib3JkZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wYXJhbXMuYm9yZGVycy5sZWZ0ID0gYm9yZGVycy5sZWZ0O1xuICAgICAgICB0aGlzLnBhcmFtcy5ib3JkZXJzLnJpZ2h0ID0gYm9yZGVycy5yaWdodDtcbiAgICAgICAgdGhpcy5wYXJhbXMuYm9yZGVycy50b3AgPSBib3JkZXJzLnRvcDtcbiAgICAgICAgdGhpcy5wYXJhbXMuYm9yZGVycy5ib3R0b20gPSBib3JkZXJzLmJvdHRvbTtcbiAgICB9XG5cbiAgICBpbml0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNhbnZhcy5pZCA9ICdncm93TWFwQ2FudmFzJztcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaCA9IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodDtcblxuICAgICAgICB0aGlzLnByZXBhcmVUaGluZ3NTaXplcygpO1xuICAgICAgICB0aGlzLnByZXBhcmVQb3NpdGlvbnMoKTtcbiAgICAgICAgdGhpcy5zZXRCb3JkZXJzKCk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICAgICAgLy8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0LLRjNGOINCyINGG0LXQvdGCINCy0YHQtdGFINGN0LvQtdC80LXQvdGC0L7QslxuICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueCA9ICh0aGlzLmNhbnZhcy53aWR0aCAvIDIpIC0gKCh0aGlzLnBhcmFtcy5ib3JkZXJzLnJpZ2h0IC0gdGhpcy5wYXJhbXMuYm9yZGVycy5sZWZ0KSAvIDIpO1xuICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueSA9ICh0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKSAtICgodGhpcy5wYXJhbXMuYm9yZGVycy5ib3R0b20gLSB0aGlzLnBhcmFtcy5ib3JkZXJzLnRvcCkgLyAyKTtcblxuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy5wYXJhbXMuY2VudGVyLngsIHRoaXMucGFyYW1zLmNlbnRlci55KTtcblxuICAgICAgICBjb25zdCBvYnNlcnZlZENvbnRhaW5lckRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHByZXZpb3VzV2lkdGg6IG51bGwsXG4gICAgICAgICAgICBwcmV2aW91c0hlaWdodDogbnVsbCxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgISEob2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzV2lkdGggJiYgb2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzSGVpZ2h0KSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgKGVudHJpZXNbMF0uY29udGVudFJlY3Qud2lkdGggIT09IG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoKSB8fFxuICAgICAgICAgICAgICAgICAgICAoZW50cmllc1swXS5jb250ZW50UmVjdC5oZWlnaHQgIT09IG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnRhaW5lciBzaXplIGlzIGNoYW5nZWQgLSByZWxvYWQgdGhlIGFwcC4nKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoID0gZW50cmllc1swXS5jb250ZW50UmVjdC53aWR0aDtcbiAgICAgICAgICAgIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodCA9IGVudHJpZXNbMF0uY29udGVudFJlY3QuaGVpZ2h0O1xuICAgICAgICB9KTtcbiAgICAgICAgY29udGFpbmVyUmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYXdCRygpO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlVGhpbmdzU2l6ZXMoKTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZVBvc2l0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5kcmF3VGhpbmdzKHRoaXMucHJlcGFyZWRUaGluZ3MpO1xuXG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyb3dNYXBDYW52YXMnKTtcbiAgICAgICAgICAgIGlmICghZWxlbSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwIC8gMzApO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWSA9IChldmVudC5kZWx0YVkgLyAxMDAwKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLnpvb20gPSB0aGlzLnBhcmFtcy56b29tICsgZGVsdGFZO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuem9vbSA+IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy56b29tID0gNDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJhbXMuem9vbSA8IDAuNSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLnpvb20gPSAwLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IGUub2Zmc2V0WCxcbiAgICAgICAgICAgICAgICB5OiBlLm9mZnNldFksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLmlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IGUub2Zmc2V0WCxcbiAgICAgICAgICAgICAgICB5OiBlLm9mZnNldFksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtcy5kcmFnLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgeFNsaWRlID0gZS5vZmZzZXRYIC0gdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgbGV0IHlTbGlkZSA9IGUub2Zmc2V0WSAtIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbi55O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHhTbGlkZSwgeVNsaWRlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLmNlbnRlci54ID0gdGhpcy5wYXJhbXMuY2VudGVyLnggKyB4U2xpZGU7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2VudGVyLnkgPSB0aGlzLnBhcmFtcy5jZW50ZXIueSArIHlTbGlkZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogZS5vZmZzZXRYLFxuICAgICAgICAgICAgICAgICAgICB5OiBlLm9mZnNldFksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjaGVja1NlbGVjdGlvbiA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nLCB4UG9zOiBudW1iZXIsIHlQb3M6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2l0aGluVGhlQm9yZGVyc1ggPVxuICAgICAgICAgICAgICAgICh4UG9zID49IChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLngpKSAmJlxuICAgICAgICAgICAgICAgIHhQb3MgPD0gKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCArIHByZXBhcmVkVGhpbmcuc2l6ZS53aWR0aCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpdGhpblRoZUJvcmRlcnNZID1cbiAgICAgICAgICAgICAgICAoeVBvcyA+PSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkpICYmXG4gICAgICAgICAgICAgICAgeVBvcyA8PSAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ICsgcHJlcGFyZWRUaGluZy5zaXplLmhlaWdodCk7XG5cbiAgICAgICAgICAgIGlmICh3aXRoaW5UaGVCb3JkZXJzWCkge1xuICAgICAgICAgICAgICAgIGlmICh3aXRoaW5UaGVCb3JkZXJzWSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5jaGlsZHJlbi5ldmVyeSgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGlja2VkVGhpbmcgPSBjaGVja1NlbGVjdGlvbihwcmVwYXJlZFRoaW5nLCB4UG9zLCB5UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRUaGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gY2xpY2tlZFRoaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JrQu9C40LrQsNC10Lwg0L/QviDQutCw0L3QstCw0YHRgyAtINGD0LfQvdCw0LXQvCDQutGD0LTQsCDQutC70LjQutC90YPQu9C4XG4gICAgICAgIC8vINCf0LXRgNC10LHQuNGA0LDQtdC8INCy0YHQtSDRjdC70LXQvNC10L3RgtGLIC0g0LjRidC10Lwg0LPRgNCw0L3QuNGG0Ysg0LrRg9C00LAg0LrQu9C40LrQvdGD0LvQuFxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZpcnR1YWxPZmZzZXRYID0gZS5vZmZzZXRYIC0gKHRoaXMucGFyYW1zLmNlbnRlci54KTtcbiAgICAgICAgICAgIGNvbnN0IHZpcnR1YWxPZmZzZXRZID0gZS5vZmZzZXRZIC0gKHRoaXMucGFyYW1zLmNlbnRlci55KTtcblxuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncy5ldmVyeSgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRUaGluZyA9IGNoZWNrU2VsZWN0aW9uKHByZXBhcmVkVGhpbmcsIHZpcnR1YWxPZmZzZXRYLCB2aXJ0dWFsT2Zmc2V0WSk7XG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRUaGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBjbGlja2VkVGhpbmc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRyYXdUaGluZ3MgPSAocHJlcGFyZWRUaGluZ3M6IFByZXBhcmVkVGhpbmdbXSkgPT4ge1xuICAgICAgICBwcmVwYXJlZFRoaW5ncy5mb3JFYWNoKChwcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYXdSZWN0YW5nbGUocHJlcGFyZWRUaGluZyk7XG5cbiAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3VGhpbmdzKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbG9hZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGhpbmdTaXplID0gKHRoaW5nOiBUaGluZykgPT4ge1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHRoaXMucGFyYW1zLmZvbnRTaXplICogdGhpcy5wYXJhbXMuem9vbTtcbiAgICAgICAgY29uc3QgdGV4dE1ldHJpY3MgPSB0aGlzLmdldFRleHRTaXplKHRoaW5nLm5hbWUsIGZvbnRTaXplKTtcblxuICAgICAgICBjb25zdCBwID0gKGZvbnRTaXplIC8gNCk7XG5cbiAgICAgICAgY29uc3QgcmVjdFcgPSAocCArIHRleHRNZXRyaWNzLndpZHRoICsgcCk7XG4gICAgICAgIGNvbnN0IHJlY3RIID0gKHAgKyBmb250U2l6ZSArIHApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXG4gICAgICAgICAgICB3aWR0aDogcmVjdFcsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3RILFxuICAgICAgICAgICAgcGFkZGluZzogcCxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1JlY3RhbmdsZSA9ICh0aGluZzogUHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICBpZiAodGhpbmc/Lm5hbWUgPT09IHRoaXMuYWN0aXZlRWxlbWVudD8ubmFtZSkge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5wYXJhbXMuYWN0aXZlUmVjdENvbG9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5wYXJhbXMucmVjdENvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpbmcucG9zaXRpb24ueCwgdGhpbmcucG9zaXRpb24ueSwgdGhpbmcuc2l6ZS53aWR0aCwgdGhpbmcuc2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgIGxldCBmb250Q29sb3I7XG4gICAgICAgIGlmICh0aGluZz8ubmFtZSA9PT0gdGhpcy5hY3RpdmVFbGVtZW50Py5uYW1lKSB7XG4gICAgICAgICAgICBmb250Q29sb3IgPSB0aGlzLnBhcmFtcy5hY3RpdmVGb250Q29sb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb250Q29sb3IgPSB0aGlzLnBhcmFtcy5mb250Q29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYXdUZXh0KFxuICAgICAgICAgICAgdGhpbmcubmFtZSxcbiAgICAgICAgICAgIHRoaW5nLnBvc2l0aW9uLnggKyB0aGluZy5zaXplLnBhZGRpbmcsXG4gICAgICAgICAgICB0aGluZy5wb3NpdGlvbi55ICsgKHRoaW5nLnNpemUucGFkZGluZyAvIDIpICsgdGhpbmcuc2l6ZS5mb250U2l6ZSxcbiAgICAgICAgICAgIHRoaW5nLnNpemUuZm9udFNpemUsXG4gICAgICAgICAgICBmb250Q29sb3IsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUZXh0U2l6ZSA9ICh0ZXh0OiBzdHJpbmcsIGZvbnRTaXplOiBudW1iZXIpOiBUZXh0TWV0cmljcyA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRm9udCA9IHRoaXMuY3R4LmZvbnQ7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBzYW5zLXNlcmlmYDtcbiAgICAgICAgY29uc3QgbWVhc3VyZWRUZXh0ID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCk7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBwcmV2aW91c0ZvbnQ7XG4gICAgICAgIHJldHVybiBtZWFzdXJlZFRleHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3VGV4dCA9ICh0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCBmb250U2l6ZTogbnVtYmVyLCBmb250Q29sb3I6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gYCR7Zm9udFNpemV9cHggc2Fucy1zZXJpZmA7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGZvbnRDb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgeCwgeSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3QkcgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmJnQ29sb3I7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KC0odGhpcy5jYW52YXMud2lkdGggLyAyKSwgLSh0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKSwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIC8vIFRPRE86INC/0L7QtNGD0LzQsNGC0Ywg0LzQvtC20L3QviDQu9C4INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDRjdGC0L7RgiDQutC+0YHRgtGL0LvRjFxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgtMTAwMDAsIC0xMDAwMCwgMjAwMDAsIDIwMDAwKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=