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
                _this.drawRelations(_this.preparedThings);
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
            _this.canvas.addEventListener('touchstart', function (e) {
                _this.params.drag.isDragging = true;
                _this.params.drag.previousPosition = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                };
            });
            _this.canvas.addEventListener('mousedown', function (e) {
                _this.params.drag.isDragging = true;
                _this.params.drag.previousPosition = {
                    x: e.offsetX,
                    y: e.offsetY,
                };
            });
            _this.canvas.addEventListener('touchend', function (e) {
                _this.params.drag.isDragging = false;
                _this.params.drag.previousPosition = {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY,
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
            // TODO: вынести общее
            _this.canvas.addEventListener('touchmove', function (e) {
                if (_this.params.drag.isDragging) {
                    var xSlide = e.changedTouches[0].clientX - _this.params.drag.previousPosition.x;
                    var ySlide = e.changedTouches[0].clientY - _this.params.drag.previousPosition.y;
                    _this.ctx.translate(xSlide, ySlide);
                    _this.params.center.x = _this.params.center.x + xSlide;
                    _this.params.center.y = _this.params.center.y + ySlide;
                    _this.params.drag.previousPosition = {
                        x: e.changedTouches[0].clientX,
                        y: e.changedTouches[0].clientY,
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
        this.drawRelations = function (preparedThings) {
            preparedThings.forEach(function (preparedThingParent) {
                if (preparedThingParent.children) {
                    preparedThingParent.children.forEach(function (preparedThingChild) {
                        _this.drawRelation(preparedThingParent, preparedThingChild);
                        if (preparedThingChild.children) {
                            _this.drawRelations([preparedThingChild]);
                        }
                    });
                }
            });
        };
        this.drawRelation = function (parent, child) {
            var parentCenter = {
                x: (parent.position.x + (parent.size.width / 2)),
                y: (parent.position.y + (parent.size.height / 2)),
            };
            var childCenter = {
                x: (child.position.x + (child.size.width / 2)),
                y: (child.position.y + (child.size.height / 2)),
            };
            var ctx = _this.ctx;
            ctx.beginPath();
            ctx.moveTo(parentCenter.x, parentCenter.y);
            ctx.lineTo(childCenter.x, parentCenter.y);
            ctx.stroke();
            ctx.lineTo(childCenter.x, childCenter.y);
            ctx.stroke();
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
            globPadding: 0,
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
            get: function () { return this.zoom * 40; },
        });
        this.things = things;
        this.preparedThings = null;
    }
    return GrowMap;
}());


GM = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO2FBQ1o7U0FDSjtRQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUU7WUFDOUMsYUFBYTtZQUNiLGtCQUFrQjtZQUNsQixHQUFHLGdCQUFLLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUMsQ0FBQztTQUNsQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBdWdCTCxjQUFDO0FBQUQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0dNL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0dNL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0dNL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vR00vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqINCa0LDRgNGC0LAg0YDQvtGB0YLQsFxuICogXG4gKiDQotGA0LXQsdC+0LLQsNC90LjRjzpcbiAqICsgMSkg0J/RgNC4INGB0L7Qt9C00LDQvdC40Lgg0LrQsNGA0YLRiyDQvdGD0LbQvdC+INGD0LrQsNC30LDRgtGMINC60L7QvdGC0LXQudC90LXRgFxuICogKyAyKSDQn9GA0Lgg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lgg0LrQsNGA0YLRiyDQsiDQutC+0L3RgtC10LnQvdC10YAg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDQutCw0L3QstCw0YFcbiAqICsgMykg0JrQsNC90LLQsNGBINC00L7Qu9C20LXQvSDRgNCw0YHRgtGP0L3Rg9GC0YzRgdGPINC/0L4g0YDQsNC30LzQtdGA0YMg0LrQvtC90YLQtdC50L3QtdGA0LBcbiAqICsgNCkg0JrQsNC90LLQsNGBINC00L7Qu9C20LXQvSDRgdC70LXQtNC40YLRjCDQt9CwINGA0LDQt9C80LXRgNC+0Lwg0LrQvtC90YLQtdC50L3QtdGA0LAg0Lgg0LXRgdC70Lgg0L7QvSDQvNC10L3Rj9C10YLRgdGPIC0g0L/QtdGA0LXQt9Cw0LPRgNGD0LbQsNGC0Ywg0L/RgNC40LvQvtC20LXQvdC40LVcbiAqICsgNSkg0JrQsNC90LLQsNGBINC00L7Qu9C20LXQvSDQv9GA0LjQvdC40LzQsNGC0Ywg0L3QsCDQstGF0L7QtCDQvtCx0YrQtdC60YIg0LjQu9C4INC80LDRgdGB0LjQsiDQvtCx0YXQtdC60YLQvtCyINC4INGA0LjRgdC+0LLQsNGC0Ywg0LPRgNCw0YTQuNC60YNcbiAqICsgNikg0JrQsNC80LXRgNCwINC00L7Qu9C20L3QsCDRhtC10L3RgtGA0L7QstCw0YLRjNGB0Y8g0L/QviDQs9C70LDQstC90L7QvNGDINC+0LHRjNC10LrRgtGDINC40LvQuCDQvdCw0LHQvtGA0YMg0LPQu9Cw0LLQvdGL0YUg0L7QsdGK0LXQutGC0L7QslxuICogKyA3KSDQkiDQv9GA0L7Qs9GA0LDQvNC80LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINGA0LXQsNC70LjQt9C+0LLQsNC9INC30YPQvFxuICogKyA4KSDQn9GA0L7Qs9GA0LDQvNC80LAg0LzQvtC20LXRgiDQsdGL0YLRjCDQt9Cw0L/Rg9GJ0LXQvdCwINC30LDQt9Cw0YPQvNC70LXQvdC+0Lkg0Log0L7RgdC90L7QstC90YvQvCDQvtCx0LXQutGC0LDQvCDQuNC70Lgg0L7RhdCy0LDRgtGL0LLQsNGPINC+0LHRidC40Lkg0YDQsNC30LzQtdGAXG4gKiA5KSDQvNC40L3QuNC80LDQu9GM0L3Ri9C5INC30YPQvCDQvtC/0YDQtdC00LXQu9GP0LXRgtGB0Y8g0YDQsNC30LzQtdGA0L7QvCDQvtGB0L3QvtCy0L3QvtCz0L4g0LHQu9C+0LrQsCAtINC80LDQutGB0LjQvNCw0LvRjNC90YvQuSDQt9GD0Lwg0L7RhdCy0LDRgtC+0Lwg0LLRgdC10YUg0LHQu9C+0LrQvtCyINC/0LvRjtGBINC+0YLRgdGC0YPQv9GLXG4gKiAxMCkg0KDQsNC30LvQuNGH0L3Ri9C1INC90LDRgdGC0YDQvtC50LrQuCDQvNC+0LbQvdC+INCy0YvQstC+0LTQuNGC0Ywg0L3QsCDRjdC60YDQsNC9INGH0YLQvtCx0Ysg0L3QsNGB0YLRgNCw0LjQstCw0YLRjCDQuNGFINC/0L7Qu9C30YPQvdC60LDQvNC4XG4gKiArIDExKSDQmtCw0LbQtNGL0Lkg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INC+0LHRitC10LrRgiDQvNC+0LbQtdGCINC40LzQtdGC0Ywg0LTQvtGH0LXRgNC90LjQuVxuICogMTIpINCV0YHQu9C4INCyINC00L7Rh9C10YDQvdC10Lwg0L3QtSDRg9C60LDQt9Cw0L3QviDQsiDQutCw0LrRg9GOINGB0YLQvtGA0L7QvdGDINC+0L0g0YHQvNC10YnQsNC10YLRgdGPIC0g0YLQviDQvtC9INGB0LzQtdGJ0LDQtdGC0YHRjyDQsiDRgdC70YPRh9Cw0LnQvdGD0Y4g0YHRgtC+0YDQvtC90YNcbiAqICsgMTMpINCU0L7Rh9C10YDQvdC40LUg0Y3Qu9C10LzQtdC90YLRiyDQuNC80LXRjtGCINC+0YLRgdGC0YPQvyDQvtGCINGA0L7QtNC40YLQtdC70YzRgdC60L7QutC+INC4INGC0LDQuiDQttC1INC40LzQtdC10YIg0L7RgtGB0YLRg9C/INC+0YIg0YHQstC+0LjRhSDQutGD0LfQtdC90L7QslxuICogKyAxNCkg0JXRgdGC0Ywg0LLQvtC30LzQvtC20L3QvtGB0YLRjCDQvNGL0YjQutC+0Lkg0LTQstC40LPQsNGC0Ywg0LrQsNC80LXRgNGDXG4gKiArIDE1KSDQoyDQv9GA0LjQu9C+0LbQtdC90LjRjyDQtdGB0YLRjCDQvdC10LrQvtGC0L7RgNC+0LUg0YHQvtGB0YLQvtGP0L3QuNC1IC0g0YHQvtGB0YLQvtGP0L3QuNC1INGF0YDQsNC90LjRgiDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0L7QsdC10LrRgtGLINC4INC40YUg0YHQvtGB0YLQvtGP0L3QuNC1ICjRgNCw0YHQv9C+0LvQvtC20LXQvdC40LUg0Lgg0YLQsNC6INC00LDQu9C10LXQtSlcbiAqICsgMTYpINCf0L4g0Y3Qu9C10LzQtdC90YLRgyDQvNC+0LbQvdC+INC60LvQuNC60L3Rg9GC0Ywg0Lgg0L/QvtC70YPRh9C40YLRjCDQsNC60YLQuNCy0LDQuNGA0L7QstCw0L3QvdGL0Lkg0Y3Qu9C10LzQtdC90YIgLSDRjdC70LXQvNC10L3RgiDQvNC+0LbQtdGCINCx0YvRgtGMINC/0L7QtNGB0LLQtdGH0LXQvVxuICogKyAxNykg0JXRgdC70Lgg0L/RgNC+0LjRgdGF0L7QtNC40YIg0LrQu9C40Log0L/QviDQtNGA0YPQs9C+0LzRgyDRjdC70LXQvNC10L3RgtGDIC0g0L/RgNC10LTRi9C00YPRidC40Lkg0L/QtdGA0LXRgdGC0LDQtdGCINCx0YvRgtGMINCw0LrRgtC40LLQvdGL0LxcbiAqICsgMTgpINCV0YHQu9C4INC60LvQuNC6INC90LUg0LHRi9C7INC60LvQuNC60L3Rg9GCINC90LUg0L/QviDQvtC00L3QvtC80YMg0Y3Qu9C10LzQtdC90YLRgyDRgtC+INC90LjQutCw0LrQvtCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0L3QtdGCXG4gKiAxOSkg0KMg0Y3Qu9C10LzQtdC90YLQvtCyINC10YHRgtGMIHotaW5kZXggLSB6IGluZGV4INCy0LvQuNGP0LXRgiDQvdCwINC+0YLRgNC40YHQvtCy0LrRgyDRjdC70LXQvNC10L3RgtC+0LJcbiAqIDIwKSDQktGB0LUg0LrRg9C30LXQvdGLINC40LzQtdGO0YIg0L7QtNC40L0g0Lgg0YLQvtGCINC20LUg0LjQvdC00LXQutGBIC0g0LLRgdC1INC00L7Rh9C10YDQvdC40LUg0L3QsCDQtdC00LjQvdC40YbRgyDQsdC+0LvRjNGI0LUg0YLQviDQtdGB0YLRjCDQvdC40LbQtVxuICogPyAyMSkg0JIg0LrQsNC20LTQvtC8INGN0LvQtdC80LXQvdGC0LUv0LHQu9C+0LrQtSDQvNC+0LbQvdC+INC90LDQv9C40YHQsNGC0Ywg0YLQtdC60YHRgiAtINGC0LXQutGB0YIg0LzQtdC90Y/QtdGCINGA0LDQt9C80LXRgCDQsdC70L7QutCwINGN0LvQtdC80LXQvdGC0LAgLSDQstGB0LUg0L7RgdGC0LDQu9GM0L3Ri9C1INGN0LvQtdC80LXQvdGC0Ysg0L/QvtC00YHRgtGA0LDQstC40LLQsNGO0YLRgdGPINC/0L7QtCDQvdC+0LLRi9C5INGA0LDQt9C80LXRgCDQsdC70L7QutCwXG4gKiAyMikg0KDQvtC00LjRgtC10LvRjNGB0LrQuNC5INCx0LvQvtC6INGG0LXQvdGC0YDRg9C10YLRgdGPINC/0L4g0YbQtdC90YLRgNGDINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQstGB0LXRhSDQtNC+0YfQtdGA0L3QuNGFINGN0LvQtdC80LXQvdGC0L7QslxuICovXG50eXBlIFRoaW5nID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjaGlsZHJlbj86IEFycmF5PFRoaW5nPlxufVxuXG50eXBlIFRoaW5ncyA9IEFycmF5PFRoaW5nPjtcblxudHlwZSBQcmVwYXJlZFRoaW5ncyA9IFByZXBhcmVkVGhpbmdbXTtcblxudHlwZSBQcmVwYXJlZFRoaW5nID0ge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgY2hpbGRyZW4/OiBBcnJheTxQcmVwYXJlZFRoaW5nPlxuICAgIHBhcmVudD86IFByZXBhcmVkVGhpbmc7XG4gICAgcG9zaXRpb24/OiB7XG4gICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgeTogbnVtYmVyLFxuICAgIH0sXG4gICAgc2l6ZT86IHtcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgIGZvbnRTaXplOiBudW1iZXI7XG4gICAgICAgIHBhZGRpbmc6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcm93TWFwIHtcbiAgICBjb250YWluZXI6IEVsZW1lbnQ7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgY2VudGVyaW5nOiBib29sZWFuO1xuICAgICAgICBiZ0NvbG9yOiBzdHJpbmc7XG4gICAgICAgIGZvbnRTaXplOiBudW1iZXI7XG4gICAgICAgIGZvbnRDb2xvcjogc3RyaW5nO1xuICAgICAgICBhY3RpdmVGb250Q29sb3I6IHN0cmluZztcbiAgICAgICAgcmVjdENvbG9yOiBzdHJpbmc7XG4gICAgICAgIGFjdGl2ZVJlY3RDb2xvcjogc3RyaW5nO1xuICAgICAgICBnbG9iUGFkZGluZzogbnVtYmVyO1xuICAgICAgICB6b29tOiBudW1iZXI7XG4gICAgICAgIGNlbnRlcjoge1xuICAgICAgICAgICAgeDogbnVtYmVyO1xuICAgICAgICAgICAgeTogbnVtYmVyO1xuICAgICAgICB9LFxuICAgICAgICBkcmFnOiB7XG4gICAgICAgICAgICBpc0RyYWdnaW5nOiBib29sZWFuO1xuICAgICAgICAgICAgcHJldmlvdXNQb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgICAgICAgICB5OiBudW1iZXIsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJvcmRlcnM6IHtcbiAgICAgICAgICAgIGxlZnQ6IG51bWJlcjtcbiAgICAgICAgICAgIHJpZ2h0OiBudW1iZXI7XG4gICAgICAgICAgICB0b3A6IG51bWJlcjtcbiAgICAgICAgICAgIGJvdHRvbTogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGluZ3M6IFRoaW5ncztcbiAgICBwcmVwYXJlZFRoaW5nczogQXJyYXk8UHJlcGFyZWRUaGluZz47XG4gICAgYWN0aXZlRWxlbWVudDogUHJlcGFyZWRUaGluZztcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogRWxlbWVudCwgdGhpbmdzOiBUaGluZ3MpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgICAgICBjZW50ZXJpbmc6IHRydWUsXG4gICAgICAgICAgICBiZ0NvbG9yOiAnc2t5Ymx1ZScsXG4gICAgICAgICAgICBmb250U2l6ZTogMjYsXG4gICAgICAgICAgICBmb250Q29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICBhY3RpdmVGb250Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICByZWN0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICBhY3RpdmVSZWN0Q29sb3I6ICcjZWQ0ZDcyJyxcbiAgICAgICAgICAgIHpvb206IDEsXG4gICAgICAgICAgICBnbG9iUGFkZGluZzogMCxcbiAgICAgICAgICAgIGNlbnRlcjoge1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmFnOiB7XG4gICAgICAgICAgICAgICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJldmlvdXNQb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvcmRlcnM6IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucGFyYW1zLCAnZ2xvYlBhZGRpbmcnLCB7XG4gICAgICAgICAgICAvLyB2YWx1ZTogNDIsXG4gICAgICAgICAgICAvLyB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldCgpIHsgcmV0dXJuIHRoaXMuem9vbSAqIDQwIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRoaW5ncyA9IHRoaW5ncztcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncyA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/QvtC00LPQvtGC0LDQstC70LjQstCw0LXQvCDQv9C+0LvQvtC20LXQvdC40LUg0Y3Qu9C10LzQtdC90YLQvtCyXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcmVwYXJlUG9zaXRpb25zID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gdGhpcy5wcmVwYXJlZFRoaW5ncy5tYXAodGhpcy5wcmVwYXJlUG9zaXRpb24pO1xuICAgIH1cblxuICAgIGdldENoaWxkcmVuV2lkdGggPSAoY2hpbGRyZW46IFByZXBhcmVkVGhpbmdbXSkgPT4ge1xuICAgICAgICBsZXQgY29tbW9uV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBiaWdnZXN0RWxlbSA9IChlbGVtZW50LnBhcmVudC5zaXplLndpZHRoID49IGVsZW1lbnQuc2l6ZS53aWR0aCkgPyBlbGVtZW50LnBhcmVudC5zaXplLndpZHRoIDogZWxlbWVudC5zaXplLndpZHRoO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNtYWxsZXN0RWxlbSA9IChlbGVtZW50LnBhcmVudC5zaXplLndpZHRoIDw9IGVsZW1lbnQuc2l6ZS53aWR0aCkgPyBlbGVtZW50LnBhcmVudC5zaXplLndpZHRoIDogZWxlbWVudC5zaXplLndpZHRoO1xuICAgICAgICAgICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggLSBzbWFsbGVzdEVsZW07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggKyBlbGVtZW50LnNpemUud2lkdGggKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhbm90aGVyQ2hpbGRyZW5XaWR0aCA9IHRoaXMuZ2V0Q2hpbGRyZW5XaWR0aChlbGVtZW50LmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoICsgYW5vdGhlckNoaWxkcmVuV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggLSB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcblxuICAgICAgICByZXR1cm4gY29tbW9uV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlUG9zaXRpb24gPSAocHJlcGFyZWRUaGluZzogUHJlcGFyZWRUaGluZywgaTogbnVtYmVyLCBwcmVwYXJlZFRoaW5nczogUHJlcGFyZWRUaGluZ3MpID0+IHtcbiAgICAgICAgY29uc3QgeyBwYXJlbnQgfSA9IHByZXBhcmVkVGhpbmc7XG4gICAgICAgIGNvbnN0IHsgZ2xvYlBhZGRpbmcgfSA9IHRoaXMucGFyYW1zO1xuXG4gICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IDA7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkUHJlcGFyZWRUaGluZ3MgPSBwcmVwYXJlZFRoaW5ncy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c0dhcCA9IHNsaWNlZFByZXBhcmVkVGhpbmdzLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlICsgY3VycmVudFZhbHVlLnNpemUud2lkdGggKyBnbG9iUGFkZGluZztcbiAgICAgICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXZpb3VzR2FwO1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBsZXQgaXNQYXJlbnRFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGhpZ2hQYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICBsZXQgeVBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpc1BhcmVudEV4aXN0cykge1xuICAgICAgICAgICAgICAgIHlQb3NpdGlvbiA9IHlQb3NpdGlvbiArIGhpZ2hQYXJlbnQuc2l6ZS5oZWlnaHQgKyBnbG9iUGFkZGluZztcblxuICAgICAgICAgICAgICAgIGlmIChoaWdoUGFyZW50LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBoaWdoUGFyZW50ID0gaGlnaFBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXNQYXJlbnRFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSB5UG9zaXRpb247XG4gICAgXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHBhcmVudC5wb3NpdGlvbi54O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRQcmVwYXJlZFRoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91c0dhcCA9IHNsaWNlZFByZXBhcmVkVGhpbmdzLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlICsgY3VycmVudFZhbHVlLnNpemUud2lkdGggKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcbiAgICAgICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgICAgIHByZXZpb3VzR2FwID0gcHJldmlvdXNHYXAgKyBwYXJlbnQucG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmV2aW91c0dhcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGlsZHJlbkNlbnRlcjonLCBjaGlsZHJlbkNlbnRlcik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdhbGxDaGlsZHJlbldpZHRoOicsIGFsbENoaWxkcmVuV2lkdGgpO1xuXG4gICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgICBsZXQgYWxsQ2hpbGRyZW5XaWR0aDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICBwcmV2aW91c1RoaW5ncy5mb3JFYWNoKCh0aGluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbldpZHRoID0gYWxsQ2hpbGRyZW5XaWR0aCArIHRoaXMuZ2V0Q2hpbGRyZW5XaWR0aCh0aGluZy5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCArIGFsbENoaWxkcmVuV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYXJhbXMuY2VudGVyaW5nKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW5XaWR0aCA9IHRoaXMuZ2V0Q2hpbGRyZW5XaWR0aChwYXJlbnQuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgY29uc3QgaGFsZldpZHRoID0gY2hpbGRyZW5XaWR0aCAvIDI7XG4gICAgXG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54IC0gaGFsZldpZHRoO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbldpZHRoID0gdGhpcy5nZXRDaGlsZHJlbldpZHRoKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgY29uc3QgaGFsZldpZHRoID0gY2hpbGRyZW5XaWR0aCAvIDI7XG4gICAgXG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgaGFsZldpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcuY2hpbGRyZW4gPSBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuLm1hcCgoLi4ucHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlUG9zaXRpb24oLi4ucHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZzsgXG4gICAgfVxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqINCS0YvRh9C40YHQu9GP0LXQvCDRgNCw0LfQvNC10YDRiyDRjdC70LXQvNC10L3RgtC+0LJcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVUaGluZ3NTaXplcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncyA9IHRoaXMudGhpbmdzLm1hcCh0aGlzLnByZXBhcmVUaGluZ1NpemUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZVRoaW5nU2l6ZSA9ICh0aGluZzogVGhpbmcsIGk6IG51bWJlciwgdGhpbmdzOiBUaGluZ3MsIHBhcmVudFByZXBhcmVkVGhpbmc/OiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcgPSB7XG4gICAgICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBudWxsLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgeDogbnVsbCxcbiAgICAgICAgICAgICAgICB5OiBudWxsLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJlcGFyZWRUaGluZy5uYW1lID0gdGhpbmcubmFtZTtcblxuICAgICAgICBpZiAocGFyZW50UHJlcGFyZWRUaGluZykge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wYXJlbnQgPSBwYXJlbnRQcmVwYXJlZFRoaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INGI0LjRgNC40L3RgyDQuCDQstGL0YHQvtGC0YMg0YLQtdC60YHRgtC+0LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuICAgICAgICBjb25zdCB0aGluZ1NpemUgPSB0aGlzLmdldFRoaW5nU2l6ZSh0aGluZyk7XG5cbiAgICAgICAgcHJlcGFyZWRUaGluZy5zaXplID0ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaW5nU2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpbmdTaXplLmhlaWdodCxcbiAgICAgICAgICAgIGZvbnRTaXplOiB0aGluZ1NpemUuZm9udFNpemUsXG4gICAgICAgICAgICBwYWRkaW5nOiB0aGluZ1NpemUucGFkZGluZyxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5jaGlsZHJlbiA9IHRoaW5nLmNoaWxkcmVuLm1hcCgoLi4ucHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlVGhpbmdTaXplKC4uLnByb3BzLCBwcmVwYXJlZFRoaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgZmluZEJvcmRlcnMgPSAocHJlcGFyZWRUaGluZzogUHJlcGFyZWRUaGluZywgYm9yZGVyczogYW55KSA9PiB7XG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPD0gYm9yZGVycy5sZWZ0KSB7XG4gICAgICAgICAgICBib3JkZXJzLmxlZnQgPSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLng7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi55IDw9IGJvcmRlcnMudG9wKSB7XG4gICAgICAgICAgICBib3JkZXJzLnRvcCA9IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgocHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgcHJlcGFyZWRUaGluZy5zaXplLndpZHRoKSA+PSBib3JkZXJzLnJpZ2h0KSB7XG4gICAgICAgICAgICBib3JkZXJzLnJpZ2h0ID0gKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCArIHByZXBhcmVkVGhpbmcuc2l6ZS53aWR0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSArIHByZXBhcmVkVGhpbmcuc2l6ZS5oZWlnaHQpID49IGJvcmRlcnMuYm90dG9tKSB7XG4gICAgICAgICAgICBib3JkZXJzLmJvdHRvbSA9IChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgKyBwcmVwYXJlZFRoaW5nLnNpemUuaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuLmV2ZXJ5KChwcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZEJvcmRlcnMocHJlcGFyZWRUaGluZywgYm9yZGVycykgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHNldEJvcmRlcnMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJvcmRlcnMgPSB7XG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MuZXZlcnkoKHByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmluZEJvcmRlcnMocHJlcGFyZWRUaGluZywgYm9yZGVycyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucGFyYW1zLmJvcmRlcnMubGVmdCA9IGJvcmRlcnMubGVmdDtcbiAgICAgICAgdGhpcy5wYXJhbXMuYm9yZGVycy5yaWdodCA9IGJvcmRlcnMucmlnaHQ7XG4gICAgICAgIHRoaXMucGFyYW1zLmJvcmRlcnMudG9wID0gYm9yZGVycy50b3A7XG4gICAgICAgIHRoaXMucGFyYW1zLmJvcmRlcnMuYm90dG9tID0gYm9yZGVycy5ib3R0b207XG4gICAgfVxuXG4gICAgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMuaWQgPSAnZ3Jvd01hcENhbnZhcyc7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICBjb25zdCB3ID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlVGhpbmdzU2l6ZXMoKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlUG9zaXRpb25zKCk7XG4gICAgICAgIHRoaXMuc2V0Qm9yZGVycygpO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdztcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaDtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuXG4gICAgICAgIC8vINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INCy0YzRjiDQsiDRhtC10L3RgiDQstGB0LXRhSDRjdC70LXQvNC10L3RgtC+0LJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2VudGVyLnggPSAodGhpcy5jYW52YXMud2lkdGggLyAyKSAtICgodGhpcy5wYXJhbXMuYm9yZGVycy5yaWdodCAtIHRoaXMucGFyYW1zLmJvcmRlcnMubGVmdCkgLyAyKTtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2VudGVyLnkgPSAodGhpcy5jYW52YXMuaGVpZ2h0IC8gMikgLSAoKHRoaXMucGFyYW1zLmJvcmRlcnMuYm90dG9tIC0gdGhpcy5wYXJhbXMuYm9yZGVycy50b3ApIC8gMik7XG5cbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMucGFyYW1zLmNlbnRlci54LCB0aGlzLnBhcmFtcy5jZW50ZXIueSk7XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZWRDb250YWluZXJEYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBwcmV2aW91c1dpZHRoOiBudWxsLFxuICAgICAgICAgICAgcHJldmlvdXNIZWlnaHQ6IG51bGwsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250YWluZXJSZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICEhKG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoICYmIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodCkgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIChlbnRyaWVzWzBdLmNvbnRlbnRSZWN0LndpZHRoICE9PSBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNXaWR0aCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKGVudHJpZXNbMF0uY29udGVudFJlY3QuaGVpZ2h0ICE9PSBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNIZWlnaHQpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb250YWluZXIgc2l6ZSBpcyBjaGFuZ2VkIC0gcmVsb2FkIHRoZSBhcHAuJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyUmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNXaWR0aCA9IGVudHJpZXNbMF0uY29udGVudFJlY3Qud2lkdGg7XG4gICAgICAgICAgICBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNIZWlnaHQgPSBlbnRyaWVzWzBdLmNvbnRlbnRSZWN0LmhlaWdodDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRhaW5lclJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmF3QkcoKTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZVRoaW5nc1NpemVzKCk7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVQb3NpdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd1JlbGF0aW9ucyh0aGlzLnByZXBhcmVkVGhpbmdzKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd1RoaW5ncyh0aGlzLnByZXBhcmVkVGhpbmdzKTtcblxuICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncm93TWFwQ2FudmFzJyk7XG4gICAgICAgICAgICBpZiAoIWVsZW0pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCAvIDMwKTtcblxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWx0YVkgPSAoZXZlbnQuZGVsdGFZIC8gMTAwMCk7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy56b29tID0gdGhpcy5wYXJhbXMuem9vbSArIGRlbHRhWTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLnpvb20gPiA0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuem9vbSA9IDQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFyYW1zLnpvb20gPCAwLjUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy56b29tID0gMC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLmlzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogZS50b3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgeTogZS50b3VjaGVzWzBdLmNsaWVudFksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcuaXNEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiBlLm9mZnNldFgsXG4gICAgICAgICAgICAgICAgeTogZS5vZmZzZXRZLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcuaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgICAgICAgICAgIHk6IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcuaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogZS5vZmZzZXRYLFxuICAgICAgICAgICAgICAgIHk6IGUub2Zmc2V0WSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLmRyYWcuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIGxldCB4U2xpZGUgPSBlLm9mZnNldFggLSB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBsZXQgeVNsaWRlID0gZS5vZmZzZXRZIC0gdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uLnk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoeFNsaWRlLCB5U2xpZGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2VudGVyLnggPSB0aGlzLnBhcmFtcy5jZW50ZXIueCArIHhTbGlkZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueSA9IHRoaXMucGFyYW1zLmNlbnRlci55ICsgeVNsaWRlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBlLm9mZnNldFgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGUub2Zmc2V0WSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRPRE86INCy0YvQvdC10YHRgtC4INC+0LHRidC10LVcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLmRyYWcuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIGxldCB4U2xpZGUgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggLSB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBsZXQgeVNsaWRlID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIC0gdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uLnk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoeFNsaWRlLCB5U2xpZGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2VudGVyLnggPSB0aGlzLnBhcmFtcy5jZW50ZXIueCArIHhTbGlkZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueSA9IHRoaXMucGFyYW1zLmNlbnRlci55ICsgeVNsaWRlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNoZWNrU2VsZWN0aW9uID0gKHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcsIHhQb3M6IG51bWJlciwgeVBvczogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aXRoaW5UaGVCb3JkZXJzWCA9XG4gICAgICAgICAgICAgICAgKHhQb3MgPj0gKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCkpICYmXG4gICAgICAgICAgICAgICAgeFBvcyA8PSAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgcHJlcGFyZWRUaGluZy5zaXplLndpZHRoKTtcblxuICAgICAgICAgICAgY29uc3Qgd2l0aGluVGhlQm9yZGVyc1kgPVxuICAgICAgICAgICAgICAgICh5UG9zID49IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSkgJiZcbiAgICAgICAgICAgICAgICB5UG9zIDw9IChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgKyBwcmVwYXJlZFRoaW5nLnNpemUuaGVpZ2h0KTtcblxuICAgICAgICAgICAgaWYgKHdpdGhpblRoZUJvcmRlcnNYKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpdGhpblRoZUJvcmRlcnNZKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmVwYXJlZFRoaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuLmV2ZXJ5KChwcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRUaGluZyA9IGNoZWNrU2VsZWN0aW9uKHByZXBhcmVkVGhpbmcsIHhQb3MsIHlQb3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZFRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBjbGlja2VkVGhpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQmtC70LjQutCw0LXQvCDQv9C+INC60LDQvdCy0LDRgdGDIC0g0YPQt9C90LDQtdC8INC60YPQtNCwINC60LvQuNC60L3Rg9C70LhcbiAgICAgICAgLy8g0J/QtdGA0LXQsdC40YDQsNC10Lwg0LLRgdC1INGN0LvQtdC80LXQvdGC0YsgLSDQuNGJ0LXQvCDQs9GA0LDQvdC40YbRiyDQutGD0LTQsCDQutC70LjQutC90YPQu9C4XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmlydHVhbE9mZnNldFggPSBlLm9mZnNldFggLSAodGhpcy5wYXJhbXMuY2VudGVyLngpO1xuICAgICAgICAgICAgY29uc3QgdmlydHVhbE9mZnNldFkgPSBlLm9mZnNldFkgLSAodGhpcy5wYXJhbXMuY2VudGVyLnkpO1xuXG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzLmV2ZXJ5KChwcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xpY2tlZFRoaW5nID0gY2hlY2tTZWxlY3Rpb24ocHJlcGFyZWRUaGluZywgdmlydHVhbE9mZnNldFgsIHZpcnR1YWxPZmZzZXRZKTtcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZFRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGNsaWNrZWRUaGluZztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZHJhd1RoaW5ncyA9IChwcmVwYXJlZFRoaW5nczogUHJlcGFyZWRUaGluZ1tdKSA9PiB7XG4gICAgICAgIHByZXBhcmVkVGhpbmdzLmZvckVhY2goKHByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1JlY3RhbmdsZShwcmVwYXJlZFRoaW5nKTtcblxuICAgICAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdUaGluZ3MocHJlcGFyZWRUaGluZy5jaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVsb2FkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaGluZ1NpemUgPSAodGhpbmc6IFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdGhpcy5wYXJhbXMuZm9udFNpemUgKiB0aGlzLnBhcmFtcy56b29tO1xuICAgICAgICBjb25zdCB0ZXh0TWV0cmljcyA9IHRoaXMuZ2V0VGV4dFNpemUodGhpbmcubmFtZSwgZm9udFNpemUpO1xuXG4gICAgICAgIGNvbnN0IHAgPSAoZm9udFNpemUgLyA0KTtcblxuICAgICAgICBjb25zdCByZWN0VyA9IChwICsgdGV4dE1ldHJpY3Mud2lkdGggKyBwKTtcbiAgICAgICAgY29uc3QgcmVjdEggPSAocCArIGZvbnRTaXplICsgcCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0VyxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdEgsXG4gICAgICAgICAgICBwYWRkaW5nOiBwLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UmVjdGFuZ2xlID0gKHRoaW5nOiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIGlmICh0aGluZz8ubmFtZSA9PT0gdGhpcy5hY3RpdmVFbGVtZW50Py5uYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5hY3RpdmVSZWN0Q29sb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5yZWN0Q29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGluZy5wb3NpdGlvbi54LCB0aGluZy5wb3NpdGlvbi55LCB0aGluZy5zaXplLndpZHRoLCB0aGluZy5zaXplLmhlaWdodCk7XG5cbiAgICAgICAgbGV0IGZvbnRDb2xvcjtcbiAgICAgICAgaWYgKHRoaW5nPy5uYW1lID09PSB0aGlzLmFjdGl2ZUVsZW1lbnQ/Lm5hbWUpIHtcbiAgICAgICAgICAgIGZvbnRDb2xvciA9IHRoaXMucGFyYW1zLmFjdGl2ZUZvbnRDb2xvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbnRDb2xvciA9IHRoaXMucGFyYW1zLmZvbnRDb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhd1RleHQoXG4gICAgICAgICAgICB0aGluZy5uYW1lLFxuICAgICAgICAgICAgdGhpbmcucG9zaXRpb24ueCArIHRoaW5nLnNpemUucGFkZGluZyxcbiAgICAgICAgICAgIHRoaW5nLnBvc2l0aW9uLnkgKyAodGhpbmcuc2l6ZS5wYWRkaW5nIC8gMikgKyB0aGluZy5zaXplLmZvbnRTaXplLFxuICAgICAgICAgICAgdGhpbmcuc2l6ZS5mb250U2l6ZSxcbiAgICAgICAgICAgIGZvbnRDb2xvcixcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRleHRTaXplID0gKHRleHQ6IHN0cmluZywgZm9udFNpemU6IG51bWJlcik6IFRleHRNZXRyaWNzID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNGb250ID0gdGhpcy5jdHguZm9udDtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IGAke2ZvbnRTaXplfXB4IHNhbnMtc2VyaWZgO1xuICAgICAgICBjb25zdCBtZWFzdXJlZFRleHQgPSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KTtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IHByZXZpb3VzRm9udDtcbiAgICAgICAgcmV0dXJuIG1lYXN1cmVkVGV4dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdUZXh0ID0gKHRleHQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIGZvbnRTaXplOiBudW1iZXIsIGZvbnRDb2xvcjogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBzYW5zLXNlcmlmYDtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gZm9udENvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LCB4LCB5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdSZWxhdGlvbnMgPSAocHJlcGFyZWRUaGluZ3M6IFByZXBhcmVkVGhpbmdzKSA9PiB7XG4gICAgICAgIHByZXBhcmVkVGhpbmdzLmZvckVhY2goKHByZXBhcmVkVGhpbmdQYXJlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nUGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZ1BhcmVudC5jaGlsZHJlbi5mb3JFYWNoKChwcmVwYXJlZFRoaW5nQ2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UmVsYXRpb24ocHJlcGFyZWRUaGluZ1BhcmVudCwgcHJlcGFyZWRUaGluZ0NoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJlcGFyZWRUaGluZ0NoaWxkLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdSZWxhdGlvbnMoW3ByZXBhcmVkVGhpbmdDaGlsZF0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UmVsYXRpb24gPSAocGFyZW50OiBQcmVwYXJlZFRoaW5nLCBjaGlsZDogUHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRDZW50ZXIgPSB7XG4gICAgICAgICAgICB4OiAocGFyZW50LnBvc2l0aW9uLnggKyAocGFyZW50LnNpemUud2lkdGggLyAyKSksXG4gICAgICAgICAgICB5OiAocGFyZW50LnBvc2l0aW9uLnkgKyAocGFyZW50LnNpemUuaGVpZ2h0IC8gMikpLFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2hpbGRDZW50ZXIgPSB7XG4gICAgICAgICAgICB4OiAoY2hpbGQucG9zaXRpb24ueCArIChjaGlsZC5zaXplLndpZHRoIC8gMikpLFxuICAgICAgICAgICAgeTogKGNoaWxkLnBvc2l0aW9uLnkgKyAoY2hpbGQuc2l6ZS5oZWlnaHQgLyAyKSksXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IGN0eCB9ID0gdGhpcztcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocGFyZW50Q2VudGVyLngsIHBhcmVudENlbnRlci55KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjaGlsZENlbnRlci54LCBwYXJlbnRDZW50ZXIueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjaGlsZENlbnRlci54LCBjaGlsZENlbnRlci55KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0JHID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5iZ0NvbG9yO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsUmVjdCgtKHRoaXMuY2FudmFzLndpZHRoIC8gMiksIC0odGhpcy5jYW52YXMuaGVpZ2h0IC8gMiksIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAvLyBUT0RPOiDQv9C+0LTRg9C80LDRgtGMINC80L7QttC90L4g0LvQuCDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0Y3RgtC+0YIg0LrQvtGB0YLRi9C70YxcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLTEwMDAwLCAtMTAwMDAsIDIwMDAwLCAyMDAwMCk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9