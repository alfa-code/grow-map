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
        this.findBorders = function (preparedThing) {
            if (preparedThing.position.x <= _this.params.borders.left) {
                _this.params.borders.left = preparedThing.position.x;
            }
            if (preparedThing.position.y <= _this.params.borders.top) {
                _this.params.borders.top = preparedThing.position.y;
            }
            if ((preparedThing.position.x + preparedThing.size.width) >= _this.params.borders.right) {
                _this.params.borders.right = (preparedThing.position.x + preparedThing.size.width);
            }
            if ((preparedThing.position.y + preparedThing.size.height) >= _this.params.borders.bottom) {
                _this.params.borders.bottom = (preparedThing.position.y + preparedThing.size.height);
            }
            if (preparedThing.children) {
                preparedThing.children.every(_this.findBorders);
            }
            return true;
        };
        this.setBorders = function () {
            _this.preparedThings.every(_this.findBorders);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFDUCxLQUFLLEVBQUUsQ0FBQztnQkFDUixHQUFHLEVBQUUsQ0FBQztnQkFDTixNQUFNLEVBQUUsQ0FBQzthQUNaO1NBQ0o7UUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFO1lBQzlDLGFBQWE7WUFDYixrQkFBa0I7WUFDbEIsR0FBRyxnQkFBSyxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFDLENBQUM7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQTZaTCxjQUFDO0FBQUQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0dNL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0dNL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0dNL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vR00vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqINCa0LDRgNGC0LAg0YDQvtGB0YLQsFxuICogXG4gKiDQotGA0LXQsdC+0LLQsNC90LjRjzpcbiAqICsgMSkg0J/RgNC4INGB0L7Qt9C00LDQvdC40Lgg0LrQsNGA0YLRiyDQvdGD0LbQvdC+INGD0LrQsNC30LDRgtGMINC60L7QvdGC0LXQudC90LXRgFxuICogKyAyKSDQn9GA0Lgg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lgg0LrQsNGA0YLRiyDQsiDQutC+0L3RgtC10LnQvdC10YAg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDQutCw0L3QstCw0YFcbiAqICsgMykg0JrQsNC90LLQsNGBINC00L7Qu9C20LXQvSDRgNCw0YHRgtGP0L3Rg9GC0YzRgdGPINC/0L4g0YDQsNC30LzQtdGA0YMg0LrQvtC90YLQtdC50L3QtdGA0LBcbiAqICsgNCkg0JrQsNC90LLQsNGBINC00L7Qu9C20LXQvSDRgdC70LXQtNC40YLRjCDQt9CwINGA0LDQt9C80LXRgNC+0Lwg0LrQvtC90YLQtdC50L3QtdGA0LAg0Lgg0LXRgdC70Lgg0L7QvSDQvNC10L3Rj9C10YLRgdGPIC0g0L/QtdGA0LXQt9Cw0LPRgNGD0LbQsNGC0Ywg0L/RgNC40LvQvtC20LXQvdC40LVcbiAqIDUpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0L/RgNC40L3QuNC80LDRgtGMINC90LAg0LLRhdC+0LQg0L7QsdGK0LXQutGCINC40LvQuCDQvNCw0YHRgdC40LIg0L7QsdGF0LXQutGC0L7QsiDQuCDRgNC40YHQvtCy0LDRgtGMINCz0YDQsNGE0LjQutGDXG4gKiA2KSDQmtCw0LzQtdGA0LAg0LTQvtC70LbQvdCwINGG0LXQvdGC0YDQvtCy0LDRgtGM0YHRjyDQv9C+INCz0LvQsNCy0L3QvtC80YMg0L7QsdGM0LXQutGC0YMg0LjQu9C4INC90LDQsdC+0YDRgyDQs9C70LDQstC90YvRhSDQvtCx0YrQtdC60YLQvtCyXG4gKiA3KSDQkiDQv9GA0L7Qs9GA0LDQvNC80LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINGA0LXQsNC70LjQt9C+0LLQsNC9INC30YPQvFxuICogOCkg0J/RgNC+0LPRgNCw0LzQvNCwINC80L7QttC10YIg0LHRi9GC0Ywg0LfQsNC/0YPRidC10L3QsCDQt9Cw0LfQsNGD0LzQu9C10L3QvtC5INC6INC+0YHQvdC+0LLQvdGL0Lwg0L7QsdC10LrRgtCw0Lwg0LjQu9C4INC+0YXQstCw0YLRi9Cy0LDRjyDQvtCx0YnQuNC5INGA0LDQt9C80LXRgFxuICogOSkg0LzQuNC90LjQvNCw0LvRjNC90YvQuSDQt9GD0Lwg0L7Qv9GA0LXQtNC10LvRj9C10YLRgdGPINGA0LDQt9C80LXRgNC+0Lwg0L7RgdC90L7QstC90L7Qs9C+INCx0LvQvtC60LAgLSDQvNCw0LrRgdC40LzQsNC70YzQvdGL0Lkg0LfRg9C8INC+0YXQstCw0YLQvtC8INCy0YHQtdGFINCx0LvQvtC60L7QsiDQv9C70Y7RgSDQvtGC0YHRgtGD0L/Ri1xuICogMTApINCg0LDQt9C70LjRh9C90YvQtSDQvdCw0YHRgtGA0L7QudC60Lgg0LzQvtC20L3QviDQstGL0LLQvtC00LjRgtGMINC90LAg0Y3QutGA0LDQvSDRh9GC0L7QsdGLINC90LDRgdGC0YDQsNC40LLQsNGC0Ywg0LjRhSDQv9C+0LvQt9GD0L3QutCw0LzQuFxuICogMTEpINCa0LDQttC00YvQuSDRgNC+0LTQuNGC0LXQu9GM0YHQutC40Lkg0L7QsdGK0LXQutGCINC80L7QttC10YIg0LjQvNC10YLRjCDQtNC+0YfQtdGA0L3QuNC5XG4gKiAxMikg0JXRgdC70Lgg0LIg0LTQvtGH0LXRgNC90LXQvCDQvdC1INGD0LrQsNC30LDQvdC+INCyINC60LDQutGD0Y4g0YHRgtC+0YDQvtC90YMg0L7QvSDRgdC80LXRidCw0LXRgtGB0Y8gLSDRgtC+INC+0L0g0YHQvNC10YnQsNC10YLRgdGPINCyINGB0LvRg9GH0LDQudC90YPRjiDRgdGC0L7RgNC+0L3Rg1xuICogMTMpINCU0L7Rh9C10YDQvdC40LUg0Y3Qu9C10LzQtdC90YLRiyDQuNC80LXRjtGCINC+0YLRgdGC0YPQvyDQvtGCINGA0L7QtNC40YLQtdC70YzRgdC60L7QutC+INC4INGC0LDQuiDQttC1INC40LzQtdC10YIg0L7RgtGB0YLRg9C/INC+0YIg0YHQstC+0LjRhSDQutGD0LfQtdC90L7QslxuICogMTQpINCV0YHRgtGMINCy0L7Qt9C80L7QttC90L7RgdGC0Ywg0LzRi9GI0LrQvtC5INC00LLQuNCz0LDRgtGMINC60LDQvNC10YDRg1xuICogMTUpINCjINC/0YDQuNC70L7QttC10L3QuNGPINC10YHRgtGMINC90LXQutC+0YLQvtGA0L7QtSDRgdC+0YHRgtC+0Y/QvdC40LUgLSDRgdC+0YHRgtC+0Y/QvdC40LUg0YXRgNCw0L3QuNGCINC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDQvtCx0LXQutGC0Ysg0Lgg0LjRhSDRgdC+0YHRgtC+0Y/QvdC40LUgKNGA0LDRgdC/0L7Qu9C+0LbQtdC90LjQtSDQuCDRgtCw0Log0LTQsNC70LXQtdC1KVxuICogMTYpINCf0L4g0Y3Qu9C10LzQtdC90YLRgyDQvNC+0LbQvdC+INC60LvQuNC60L3Rg9GC0Ywg0Lgg0L/QvtC70YPRh9C40YLRjCDQsNC60YLQuNCy0LDQuNGA0L7QstCw0L3QvdGL0Lkg0Y3Qu9C10LzQtdC90YIgLSDRjdC70LXQvNC10L3RgiDQvNC+0LbQtdGCINCx0YvRgtGMINC/0L7QtNGB0LLQtdGH0LXQvVxuICogMTcpINCV0YHQu9C4INC/0YDQvtC40YHRhdC+0LTQuNGCINC60LvQuNC6INC/0L4g0LTRgNGD0LPQvtC80YMg0Y3Qu9C10LzQtdC90YLRgyAtINC/0YDQtdC00YvQtNGD0YnQuNC5INC/0LXRgNC10YHRgtCw0LXRgiDQsdGL0YLRjCDQsNC60YLQuNCy0L3Ri9C8XG4gKiAxOCkg0JXRgdC70Lgg0LrQu9C40Log0L3QtSDQsdGL0Lsg0LrQu9C40LrQvdGD0YIg0L3QtSDQv9C+INC+0LTQvdC+0LzRgyDRjdC70LXQvNC10L3RgtGDINGC0L4g0L3QuNC60LDQutC+0LPQviDQsNC60YLQuNCy0L3QvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQvdC10YJcbiAqIDE5KSDQoyDRjdC70LXQvNC10L3RgtC+0LIg0LXRgdGC0Ywgei1pbmRleCAtIHogaW5kZXgg0LLQu9C40Y/QtdGCINC90LAg0L7RgtGA0LjRgdC+0LLQutGDINGN0LvQtdC80LXQvdGC0L7QslxuICogMjApINCS0YHQtSDQutGD0LfQtdC90Ysg0LjQvNC10Y7RgiDQvtC00LjQvSDQuCDRgtC+0YIg0LbQtSDQuNC90LTQtdC60YEgLSDQstGB0LUg0LTQvtGH0LXRgNC90LjQtSDQvdCwINC10LTQuNC90LjRhtGDINCx0L7Qu9GM0YjQtSDRgtC+INC10YHRgtGMINC90LjQttC1XG4gKiAyMSkg0JIg0LrQsNC20LTQvtC8INGN0LvQtdC80LXQvdGC0LUv0LHQu9C+0LrQtSDQvNC+0LbQvdC+INC90LDQv9C40YHQsNGC0Ywg0YLQtdC60YHRgiAtINGC0LXQutGB0YIg0LzQtdC90Y/QtdGCINGA0LDQt9C80LXRgCDQsdC70L7QutCwINGN0LvQtdC80LXQvdGC0LAgLSDQstGB0LUg0L7RgdGC0LDQu9GM0L3Ri9C1INGN0LvQtdC80LXQvdGC0Ysg0L/QvtC00YHRgtGA0LDQstC40LLQsNGO0YLRgdGPINC/0L7QtCDQvdC+0LLRi9C5INGA0LDQt9C80LXRgCDQsdC70L7QutCwXG4gKi9cbnR5cGUgVGhpbmcgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNoaWxkcmVuPzogQXJyYXk8VGhpbmc+XG59XG5cbnR5cGUgVGhpbmdzID0gQXJyYXk8VGhpbmc+O1xuXG50eXBlIFByZXBhcmVkVGhpbmdzID0gUHJlcGFyZWRUaGluZ1tdO1xuXG50eXBlIFByZXBhcmVkVGhpbmcgPSB7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICBjaGlsZHJlbj86IEFycmF5PFByZXBhcmVkVGhpbmc+XG4gICAgcGFyZW50PzogUHJlcGFyZWRUaGluZztcbiAgICBwb3NpdGlvbj86IHtcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgfSxcbiAgICBzaXplPzoge1xuICAgICAgICB3aWR0aDogbnVtYmVyO1xuICAgICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICAgICAgZm9udFNpemU6IG51bWJlcjtcbiAgICAgICAgcGFkZGluZzogbnVtYmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyb3dNYXAge1xuICAgIGNvbnRhaW5lcjogRWxlbWVudDtcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHBhcmFtczoge1xuICAgICAgICBiZ0NvbG9yOiBzdHJpbmc7XG4gICAgICAgIGZvbnRTaXplOiBudW1iZXI7XG4gICAgICAgIGZvbnRDb2xvcjogc3RyaW5nO1xuICAgICAgICBhY3RpdmVGb250Q29sb3I6IHN0cmluZztcbiAgICAgICAgcmVjdENvbG9yOiBzdHJpbmc7XG4gICAgICAgIGFjdGl2ZVJlY3RDb2xvcjogc3RyaW5nO1xuICAgICAgICBnbG9iUGFkZGluZzogbnVtYmVyO1xuICAgICAgICB6b29tOiBudW1iZXI7XG4gICAgICAgIGNlbnRlcjoge1xuICAgICAgICAgICAgeDogbnVtYmVyO1xuICAgICAgICAgICAgeTogbnVtYmVyO1xuICAgICAgICB9LFxuICAgICAgICBkcmFnOiB7XG4gICAgICAgICAgICBpc0RyYWdnaW5nOiBib29sZWFuO1xuICAgICAgICAgICAgcHJldmlvdXNQb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgICAgICAgICB5OiBudW1iZXIsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJvcmRlcnM6IHtcbiAgICAgICAgICAgIGxlZnQ6IG51bWJlcjtcbiAgICAgICAgICAgIHJpZ2h0OiBudW1iZXI7XG4gICAgICAgICAgICB0b3A6IG51bWJlcjtcbiAgICAgICAgICAgIGJvdHRvbTogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGluZ3M6IFRoaW5ncztcbiAgICBwcmVwYXJlZFRoaW5nczogQXJyYXk8UHJlcGFyZWRUaGluZz47XG4gICAgYWN0aXZlRWxlbWVudDogUHJlcGFyZWRUaGluZztcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogRWxlbWVudCwgdGhpbmdzOiBUaGluZ3MpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgICAgICBiZ0NvbG9yOiAnc2t5Ymx1ZScsXG4gICAgICAgICAgICBmb250U2l6ZTogMjYsXG4gICAgICAgICAgICBmb250Q29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICBhY3RpdmVGb250Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICByZWN0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICBhY3RpdmVSZWN0Q29sb3I6ICcjZWQ0ZDcyJyxcbiAgICAgICAgICAgIHpvb206IDEsXG4gICAgICAgICAgICBnbG9iUGFkZGluZzogNDAsXG4gICAgICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhZzoge1xuICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib3JkZXJzOiB7XG4gICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnBhcmFtcywgJ2dsb2JQYWRkaW5nJywge1xuICAgICAgICAgICAgLy8gdmFsdWU6IDQyLFxuICAgICAgICAgICAgLy8gd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiB0aGlzLnpvb20gKiAyMCB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50aGluZ3MgPSB0aGluZ3M7XG4gICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QtNCz0L7RgtCw0LLQu9C40LLQsNC10Lwg0L/QvtC70L7QttC10L3QuNC1INGN0LvQtdC80LXQvdGC0L7QslxuICAgICAqL1xuICAgIHByaXZhdGUgcHJlcGFyZVBvc2l0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncyA9IHRoaXMucHJlcGFyZWRUaGluZ3MubWFwKHRoaXMucHJlcGFyZVBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVQb3NpdGlvbiA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nLCBpOiBudW1iZXIsIHByZXBhcmVkVGhpbmdzOiBQcmVwYXJlZFRoaW5ncykgPT4ge1xuICAgICAgICBjb25zdCB7IHBhcmVudCB9ID0gcHJlcGFyZWRUaGluZztcbiAgICAgICAgY29uc3QgeyBnbG9iUGFkZGluZyB9ID0gdGhpcy5wYXJhbXM7XG5cbiAgICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gMDtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRQcmVwYXJlZFRoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzR2FwID0gc2xpY2VkUHJlcGFyZWRUaGluZ3MucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWUgKyBjdXJyZW50VmFsdWUuc2l6ZS53aWR0aCArIGdsb2JQYWRkaW5nO1xuICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJldmlvdXNHYXA7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGxldCBpc1BhcmVudEV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICBsZXQgaGlnaFBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIGxldCB5UG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGlzUGFyZW50RXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgeVBvc2l0aW9uID0geVBvc2l0aW9uICsgaGlnaFBhcmVudC5zaXplLmhlaWdodCArIGdsb2JQYWRkaW5nO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhpZ2hQYXJlbnQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2hQYXJlbnQgPSBoaWdoUGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpc1BhcmVudEV4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA9IHlQb3NpdGlvbjtcbiAgICBcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcGFyZW50LnBvc2l0aW9uLng7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZFByZXBhcmVkVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzR2FwID0gc2xpY2VkUHJlcGFyZWRUaGluZ3MucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzVmFsdWUgKyBjdXJyZW50VmFsdWUuc2l6ZS53aWR0aCArIHRoaXMucGFyYW1zLmdsb2JQYWRkaW5nO1xuICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgcHJldmlvdXNHYXAgPSBwcmV2aW91c0dhcCArIHBhcmVudC5wb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXZpb3VzR2FwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ2V0Q2hpbGRyZW5XaWR0aCA9IChjaGlsZHJlbjogUHJlcGFyZWRUaGluZ1tdKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tbW9uV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBiaWdnZXN0RWxlbSA9ICAoZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA+PSBlbGVtZW50LnNpemUud2lkdGgpID8gZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA6IGVsZW1lbnQuc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc21hbGxlc3RFbGVtID0gIChlbGVtZW50LnBhcmVudC5zaXplLndpZHRoIDw9IGVsZW1lbnQuc2l6ZS53aWR0aCkgPyBlbGVtZW50LnBhcmVudC5zaXplLndpZHRoIDogZWxlbWVudC5zaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoIC0gc21hbGxlc3RFbGVtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggKyBlbGVtZW50LnNpemUud2lkdGggKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcblxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFub3RoZXJDaGlsZHJlbldpZHRoID0gZ2V0Q2hpbGRyZW5XaWR0aChlbGVtZW50LmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCArIGFub3RoZXJDaGlsZHJlbldpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoIC0gdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgICAgIHJldHVybiBjb21tb25XaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgICBsZXQgYWxsQ2hpbGRyZW5XaWR0aDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICBwcmV2aW91c1RoaW5ncy5mb3JFYWNoKCh0aGluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbldpZHRoID0gYWxsQ2hpbGRyZW5XaWR0aCArIGdldENoaWxkcmVuV2lkdGgodGhpbmcuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggKyBhbGxDaGlsZHJlbldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcuY2hpbGRyZW4gPSBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuLm1hcCgoLi4ucHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlUG9zaXRpb24oLi4ucHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwcmVwYXJlZFRoaW5nOyBcbiAgICB9XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICog0JLRi9GH0LjRgdC70Y/QtdC8INGA0LDQt9C80LXRgNGLINGN0LvQtdC80LXQvdGC0L7QslxuICAgICAqL1xuICAgIHByaXZhdGUgcHJlcGFyZVRoaW5nc1NpemVzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gdGhpcy50aGluZ3MubWFwKHRoaXMucHJlcGFyZVRoaW5nU2l6ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlVGhpbmdTaXplID0gKHRoaW5nOiBUaGluZywgaTogbnVtYmVyLCB0aGluZ3M6IFRoaW5ncywgcGFyZW50UHJlcGFyZWRUaGluZz86IFByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgY29uc3QgcHJlcGFyZWRUaGluZzogUHJlcGFyZWRUaGluZyA9IHtcbiAgICAgICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IG51bGwsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiBudWxsLFxuICAgICAgICAgICAgICAgIHk6IG51bGwsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcmVwYXJlZFRoaW5nLm5hbWUgPSB0aGluZy5uYW1lO1xuXG4gICAgICAgIGlmIChwYXJlbnRQcmVwYXJlZFRoaW5nKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBhcmVudCA9IHBhcmVudFByZXBhcmVkVGhpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0YjQuNGA0LjQvdGDINC4INCy0YvRgdC+0YLRgyDRgtC10LrRgdGC0L7QstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG4gICAgICAgIGNvbnN0IHRoaW5nU2l6ZSA9IHRoaXMuZ2V0VGhpbmdTaXplKHRoaW5nKTtcblxuICAgICAgICBwcmVwYXJlZFRoaW5nLnNpemUgPSB7XG4gICAgICAgICAgICB3aWR0aDogdGhpbmdTaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGluZ1NpemUuaGVpZ2h0LFxuICAgICAgICAgICAgZm9udFNpemU6IHRoaW5nU2l6ZS5mb250U2l6ZSxcbiAgICAgICAgICAgIHBhZGRpbmc6IHRoaW5nU2l6ZS5wYWRkaW5nLFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuID0gdGhpbmcuY2hpbGRyZW4ubWFwKCguLi5wcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXBhcmVUaGluZ1NpemUoLi4ucHJvcHMsIHByZXBhcmVkVGhpbmcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwcmVwYXJlZFRoaW5nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICBmaW5kQm9yZGVycyA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPD0gdGhpcy5wYXJhbXMuYm9yZGVycy5sZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5ib3JkZXJzLmxlZnQgPSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLng7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi55IDw9IHRoaXMucGFyYW1zLmJvcmRlcnMudG9wKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5ib3JkZXJzLnRvcCA9IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgocHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgcHJlcGFyZWRUaGluZy5zaXplLndpZHRoKSA+PSB0aGlzLnBhcmFtcy5ib3JkZXJzLnJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5ib3JkZXJzLnJpZ2h0ID0gKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCArIHByZXBhcmVkVGhpbmcuc2l6ZS53aWR0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSArIHByZXBhcmVkVGhpbmcuc2l6ZS5oZWlnaHQpID49IHRoaXMucGFyYW1zLmJvcmRlcnMuYm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5ib3JkZXJzLmJvdHRvbSA9IChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgKyBwcmVwYXJlZFRoaW5nLnNpemUuaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuLmV2ZXJ5KHRoaXMuZmluZEJvcmRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc2V0Qm9yZGVycyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncy5ldmVyeSh0aGlzLmZpbmRCb3JkZXJzKTtcbiAgICB9XG5cbiAgICBpbml0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNhbnZhcy5pZCA9ICdncm93TWFwQ2FudmFzJztcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaCA9IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodDtcblxuICAgICAgICB0aGlzLnByZXBhcmVUaGluZ3NTaXplcygpO1xuICAgICAgICB0aGlzLnByZXBhcmVQb3NpdGlvbnMoKTtcbiAgICAgICAgdGhpcy5zZXRCb3JkZXJzKCk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICAgICAgLy8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0LLRjNGOINCyINGG0LXQvdGCINCy0YHQtdGFINGN0LvQtdC80LXQvdGC0L7QslxuICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueCA9ICh0aGlzLmNhbnZhcy53aWR0aCAvIDIpIC0gKCh0aGlzLnBhcmFtcy5ib3JkZXJzLnJpZ2h0IC0gdGhpcy5wYXJhbXMuYm9yZGVycy5sZWZ0KSAvIDIpO1xuICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueSA9ICh0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKSAtICgodGhpcy5wYXJhbXMuYm9yZGVycy5ib3R0b20gLSB0aGlzLnBhcmFtcy5ib3JkZXJzLnRvcCkgLyAyKTtcblxuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy5wYXJhbXMuY2VudGVyLngsIHRoaXMucGFyYW1zLmNlbnRlci55KTtcblxuICAgICAgICBjb25zdCBvYnNlcnZlZENvbnRhaW5lckRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHByZXZpb3VzV2lkdGg6IG51bGwsXG4gICAgICAgICAgICBwcmV2aW91c0hlaWdodDogbnVsbCxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgISEob2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzV2lkdGggJiYgb2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzSGVpZ2h0KSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgKGVudHJpZXNbMF0uY29udGVudFJlY3Qud2lkdGggIT09IG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoKSB8fFxuICAgICAgICAgICAgICAgICAgICAoZW50cmllc1swXS5jb250ZW50UmVjdC5oZWlnaHQgIT09IG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnRhaW5lciBzaXplIGlzIGNoYW5nZWQgLSByZWxvYWQgdGhlIGFwcC4nKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoID0gZW50cmllc1swXS5jb250ZW50UmVjdC53aWR0aDtcbiAgICAgICAgICAgIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodCA9IGVudHJpZXNbMF0uY29udGVudFJlY3QuaGVpZ2h0O1xuICAgICAgICB9KTtcbiAgICAgICAgY29udGFpbmVyUmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYXdCRygpO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlVGhpbmdzU2l6ZXMoKTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZVBvc2l0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5kcmF3VGhpbmdzKHRoaXMucHJlcGFyZWRUaGluZ3MpO1xuXG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyb3dNYXBDYW52YXMnKTtcbiAgICAgICAgICAgIGlmICghZWxlbSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwIC8gMzApO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWSA9IChldmVudC5kZWx0YVkgLyAxMDAwKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLnpvb20gPSB0aGlzLnBhcmFtcy56b29tICsgZGVsdGFZO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuem9vbSA+IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy56b29tID0gNDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJhbXMuem9vbSA8IDAuNSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLnpvb20gPSAwLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IGUub2Zmc2V0WCxcbiAgICAgICAgICAgICAgICB5OiBlLm9mZnNldFksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLmlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IGUub2Zmc2V0WCxcbiAgICAgICAgICAgICAgICB5OiBlLm9mZnNldFksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtcy5kcmFnLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgeFNsaWRlID0gZS5vZmZzZXRYIC0gdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgbGV0IHlTbGlkZSA9IGUub2Zmc2V0WSAtIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbi55O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHhTbGlkZSwgeVNsaWRlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLmNlbnRlci54ID0gdGhpcy5wYXJhbXMuY2VudGVyLnggKyB4U2xpZGU7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2VudGVyLnkgPSB0aGlzLnBhcmFtcy5jZW50ZXIueSArIHlTbGlkZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogZS5vZmZzZXRYLFxuICAgICAgICAgICAgICAgICAgICB5OiBlLm9mZnNldFksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjaGVja1NlbGVjdGlvbiA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nLCB4UG9zOiBudW1iZXIsIHlQb3M6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2l0aGluVGhlQm9yZGVyc1ggPVxuICAgICAgICAgICAgICAgICh4UG9zID49IChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLngpKSAmJlxuICAgICAgICAgICAgICAgIHhQb3MgPD0gKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCArIHByZXBhcmVkVGhpbmcuc2l6ZS53aWR0aCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpdGhpblRoZUJvcmRlcnNZID1cbiAgICAgICAgICAgICAgICAoeVBvcyA+PSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkpICYmXG4gICAgICAgICAgICAgICAgeVBvcyA8PSAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ICsgcHJlcGFyZWRUaGluZy5zaXplLmhlaWdodCk7XG5cbiAgICAgICAgICAgIGlmICh3aXRoaW5UaGVCb3JkZXJzWCkge1xuICAgICAgICAgICAgICAgIGlmICh3aXRoaW5UaGVCb3JkZXJzWSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5jaGlsZHJlbi5ldmVyeSgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGlja2VkVGhpbmcgPSBjaGVja1NlbGVjdGlvbihwcmVwYXJlZFRoaW5nLCB4UG9zLCB5UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRUaGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gY2xpY2tlZFRoaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JrQu9C40LrQsNC10Lwg0L/QviDQutCw0L3QstCw0YHRgyAtINGD0LfQvdCw0LXQvCDQutGD0LTQsCDQutC70LjQutC90YPQu9C4XG4gICAgICAgIC8vINCf0LXRgNC10LHQuNGA0LDQtdC8INCy0YHQtSDRjdC70LXQvNC10L3RgtGLIC0g0LjRidC10Lwg0LPRgNCw0L3QuNGG0Ysg0LrRg9C00LAg0LrQu9C40LrQvdGD0LvQuFxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZpcnR1YWxPZmZzZXRYID0gZS5vZmZzZXRYIC0gKHRoaXMucGFyYW1zLmNlbnRlci54KTtcbiAgICAgICAgICAgIGNvbnN0IHZpcnR1YWxPZmZzZXRZID0gZS5vZmZzZXRZIC0gKHRoaXMucGFyYW1zLmNlbnRlci55KTtcblxuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncy5ldmVyeSgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRUaGluZyA9IGNoZWNrU2VsZWN0aW9uKHByZXBhcmVkVGhpbmcsIHZpcnR1YWxPZmZzZXRYLCB2aXJ0dWFsT2Zmc2V0WSk7XG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRUaGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBjbGlja2VkVGhpbmc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRyYXdUaGluZ3MgPSAocHJlcGFyZWRUaGluZ3M6IFByZXBhcmVkVGhpbmdbXSkgPT4ge1xuICAgICAgICBwcmVwYXJlZFRoaW5ncy5mb3JFYWNoKChwcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYXdSZWN0YW5nbGUocHJlcGFyZWRUaGluZyk7XG5cbiAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3VGhpbmdzKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbG9hZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGhpbmdTaXplID0gKHRoaW5nOiBUaGluZykgPT4ge1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHRoaXMucGFyYW1zLmZvbnRTaXplICogdGhpcy5wYXJhbXMuem9vbTtcbiAgICAgICAgY29uc3QgdGV4dE1ldHJpY3MgPSB0aGlzLmdldFRleHRTaXplKHRoaW5nLm5hbWUsIGZvbnRTaXplKTtcblxuICAgICAgICBjb25zdCBwID0gKGZvbnRTaXplIC8gNCk7XG5cbiAgICAgICAgY29uc3QgcmVjdFcgPSAocCArIHRleHRNZXRyaWNzLndpZHRoICsgcCk7XG4gICAgICAgIGNvbnN0IHJlY3RIID0gKHAgKyBmb250U2l6ZSArIHApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXG4gICAgICAgICAgICB3aWR0aDogcmVjdFcsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3RILFxuICAgICAgICAgICAgcGFkZGluZzogcCxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1JlY3RhbmdsZSA9ICh0aGluZzogUHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICBpZiAodGhpbmc/Lm5hbWUgPT09IHRoaXMuYWN0aXZlRWxlbWVudD8ubmFtZSkge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5wYXJhbXMuYWN0aXZlUmVjdENvbG9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5wYXJhbXMucmVjdENvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpbmcucG9zaXRpb24ueCwgdGhpbmcucG9zaXRpb24ueSwgdGhpbmcuc2l6ZS53aWR0aCwgdGhpbmcuc2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgIGxldCBmb250Q29sb3I7XG4gICAgICAgIGlmICh0aGluZz8ubmFtZSA9PT0gdGhpcy5hY3RpdmVFbGVtZW50Py5uYW1lKSB7XG4gICAgICAgICAgICBmb250Q29sb3IgPSB0aGlzLnBhcmFtcy5hY3RpdmVGb250Q29sb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb250Q29sb3IgPSB0aGlzLnBhcmFtcy5mb250Q29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYXdUZXh0KFxuICAgICAgICAgICAgdGhpbmcubmFtZSxcbiAgICAgICAgICAgIHRoaW5nLnBvc2l0aW9uLnggKyB0aGluZy5zaXplLnBhZGRpbmcsXG4gICAgICAgICAgICB0aGluZy5wb3NpdGlvbi55ICsgKHRoaW5nLnNpemUucGFkZGluZyAvIDIpICsgdGhpbmcuc2l6ZS5mb250U2l6ZSxcbiAgICAgICAgICAgIHRoaW5nLnNpemUuZm9udFNpemUsXG4gICAgICAgICAgICBmb250Q29sb3IsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUZXh0U2l6ZSA9ICh0ZXh0OiBzdHJpbmcsIGZvbnRTaXplOiBudW1iZXIpOiBUZXh0TWV0cmljcyA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzRm9udCA9IHRoaXMuY3R4LmZvbnQ7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBzYW5zLXNlcmlmYDtcbiAgICAgICAgY29uc3QgbWVhc3VyZWRUZXh0ID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCk7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBwcmV2aW91c0ZvbnQ7XG4gICAgICAgIHJldHVybiBtZWFzdXJlZFRleHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3VGV4dCA9ICh0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCBmb250U2l6ZTogbnVtYmVyLCBmb250Q29sb3I6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gYCR7Zm9udFNpemV9cHggc2Fucy1zZXJpZmA7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGZvbnRDb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgeCwgeSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3QkcgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmJnQ29sb3I7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KC0odGhpcy5jYW52YXMud2lkdGggLyAyKSwgLSh0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKSwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIC8vIFRPRE86INC/0L7QtNGD0LzQsNGC0Ywg0LzQvtC20L3QviDQu9C4INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDRjdGC0L7RgiDQutC+0YHRgtGL0LvRjFxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgtMTAwMDAsIC0xMDAwMCwgMjAwMDAsIDIwMDAwKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=