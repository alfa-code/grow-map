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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsT0FBTztZQUNsQixlQUFlLEVBQUUsT0FBTztZQUN4QixTQUFTLEVBQUUsT0FBTztZQUNsQixlQUFlLEVBQUUsU0FBUztZQUMxQixJQUFJLEVBQUUsQ0FBQztZQUNQLFdBQVcsRUFBRSxDQUFDO1lBQ2QsTUFBTSxFQUFFO2dCQUNKLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2FBQ1A7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLGdCQUFnQixFQUFFO29CQUNkLENBQUMsRUFBRSxDQUFDO29CQUNKLENBQUMsRUFBRSxDQUFDO2lCQUNQO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsR0FBRyxFQUFFLENBQUM7Z0JBQ04sTUFBTSxFQUFFLENBQUM7YUFDWjtTQUNKO1FBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRTtZQUM5QyxhQUFhO1lBQ2Isa0JBQWtCO1lBQ2xCLEdBQUcsZ0JBQUssT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBQyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFtZUwsY0FBQztBQUFELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9HTS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vR00vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0dNLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiDQmtCw0YDRgtCwINGA0L7RgdGC0LBcbiAqIFxuICog0KLRgNC10LHQvtCy0LDQvdC40Y86XG4gKiArIDEpINCf0YDQuCDRgdC+0LfQtNCw0L3QuNC4INC60LDRgNGC0Ysg0L3Rg9C20L3QviDRg9C60LDQt9Cw0YLRjCDQutC+0L3RgtC10LnQvdC10YBcbiAqICsgMikg0J/RgNC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC60LDRgNGC0Ysg0LIg0LrQvtC90YLQtdC50L3QtdGAINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LrQsNC90LLQsNGBXG4gKiArIDMpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0YDQsNGB0YLRj9C90YPRgtGM0YHRjyDQv9C+INGA0LDQt9C80LXRgNGDINC60L7QvdGC0LXQudC90LXRgNCwXG4gKiArIDQpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0YHQu9C10LTQuNGC0Ywg0LfQsCDRgNCw0LfQvNC10YDQvtC8INC60L7QvdGC0LXQudC90LXRgNCwINC4INC10YHQu9C4INC+0L0g0LzQtdC90Y/QtdGC0YHRjyAtINC/0LXRgNC10LfQsNCz0YDRg9C20LDRgtGMINC/0YDQuNC70L7QttC10L3QuNC1XG4gKiArIDUpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0L/RgNC40L3QuNC80LDRgtGMINC90LAg0LLRhdC+0LQg0L7QsdGK0LXQutGCINC40LvQuCDQvNCw0YHRgdC40LIg0L7QsdGF0LXQutGC0L7QsiDQuCDRgNC40YHQvtCy0LDRgtGMINCz0YDQsNGE0LjQutGDXG4gKiArIDYpINCa0LDQvNC10YDQsCDQtNC+0LvQttC90LAg0YbQtdC90YLRgNC+0LLQsNGC0YzRgdGPINC/0L4g0LPQu9Cw0LLQvdC+0LzRgyDQvtCx0YzQtdC60YLRgyDQuNC70Lgg0L3QsNCx0L7RgNGDINCz0LvQsNCy0L3Ri9GFINC+0LHRitC10LrRgtC+0LJcbiAqICsgNykg0JIg0L/RgNC+0LPRgNCw0LzQvNC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDRgNC10LDQu9C40LfQvtCy0LDQvSDQt9GD0LxcbiAqICsgOCkg0J/RgNC+0LPRgNCw0LzQvNCwINC80L7QttC10YIg0LHRi9GC0Ywg0LfQsNC/0YPRidC10L3QsCDQt9Cw0LfQsNGD0LzQu9C10L3QvtC5INC6INC+0YHQvdC+0LLQvdGL0Lwg0L7QsdC10LrRgtCw0Lwg0LjQu9C4INC+0YXQstCw0YLRi9Cy0LDRjyDQvtCx0YnQuNC5INGA0LDQt9C80LXRgFxuICogOSkg0LzQuNC90LjQvNCw0LvRjNC90YvQuSDQt9GD0Lwg0L7Qv9GA0LXQtNC10LvRj9C10YLRgdGPINGA0LDQt9C80LXRgNC+0Lwg0L7RgdC90L7QstC90L7Qs9C+INCx0LvQvtC60LAgLSDQvNCw0LrRgdC40LzQsNC70YzQvdGL0Lkg0LfRg9C8INC+0YXQstCw0YLQvtC8INCy0YHQtdGFINCx0LvQvtC60L7QsiDQv9C70Y7RgSDQvtGC0YHRgtGD0L/Ri1xuICogMTApINCg0LDQt9C70LjRh9C90YvQtSDQvdCw0YHRgtGA0L7QudC60Lgg0LzQvtC20L3QviDQstGL0LLQvtC00LjRgtGMINC90LAg0Y3QutGA0LDQvSDRh9GC0L7QsdGLINC90LDRgdGC0YDQsNC40LLQsNGC0Ywg0LjRhSDQv9C+0LvQt9GD0L3QutCw0LzQuFxuICogKyAxMSkg0JrQsNC20LTRi9C5INGA0L7QtNC40YLQtdC70YzRgdC60LjQuSDQvtCx0YrQtdC60YIg0LzQvtC20LXRgiDQuNC80LXRgtGMINC00L7Rh9C10YDQvdC40LlcbiAqIDEyKSDQldGB0LvQuCDQsiDQtNC+0YfQtdGA0L3QtdC8INC90LUg0YPQutCw0LfQsNC90L4g0LIg0LrQsNC60YPRjiDRgdGC0L7RgNC+0L3RgyDQvtC9INGB0LzQtdGJ0LDQtdGC0YHRjyAtINGC0L4g0L7QvSDRgdC80LXRidCw0LXRgtGB0Y8g0LIg0YHQu9GD0YfQsNC50L3Rg9GOINGB0YLQvtGA0L7QvdGDXG4gKiArIDEzKSDQlNC+0YfQtdGA0L3QuNC1INGN0LvQtdC80LXQvdGC0Ysg0LjQvNC10Y7RgiDQvtGC0YHRgtGD0L8g0L7RgiDRgNC+0LTQuNGC0LXQu9GM0YHQutC+0LrQviDQuCDRgtCw0Log0LbQtSDQuNC80LXQtdGCINC+0YLRgdGC0YPQvyDQvtGCINGB0LLQvtC40YUg0LrRg9C30LXQvdC+0LJcbiAqICsgMTQpINCV0YHRgtGMINCy0L7Qt9C80L7QttC90L7RgdGC0Ywg0LzRi9GI0LrQvtC5INC00LLQuNCz0LDRgtGMINC60LDQvNC10YDRg1xuICogKyAxNSkg0KMg0L/RgNC40LvQvtC20LXQvdC40Y8g0LXRgdGC0Ywg0L3QtdC60L7RgtC+0YDQvtC1INGB0L7RgdGC0L7Rj9C90LjQtSAtINGB0L7RgdGC0L7Rj9C90LjQtSDRhdGA0LDQvdC40YIg0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INC+0LHQtdC60YLRiyDQuCDQuNGFINGB0L7RgdGC0L7Rj9C90LjQtSAo0YDQsNGB0L/QvtC70L7QttC10L3QuNC1INC4INGC0LDQuiDQtNCw0LvQtdC10LUpXG4gKiArIDE2KSDQn9C+INGN0LvQtdC80LXQvdGC0YMg0LzQvtC20L3QviDQutC70LjQutC90YPRgtGMINC4INC/0L7Qu9GD0YfQuNGC0Ywg0LDQutGC0LjQstCw0LjRgNC+0LLQsNC90L3Ri9C5INGN0LvQtdC80LXQvdGCIC0g0Y3Qu9C10LzQtdC90YIg0LzQvtC20LXRgiDQsdGL0YLRjCDQv9C+0LTRgdCy0LXRh9C10L1cbiAqICsgMTcpINCV0YHQu9C4INC/0YDQvtC40YHRhdC+0LTQuNGCINC60LvQuNC6INC/0L4g0LTRgNGD0LPQvtC80YMg0Y3Qu9C10LzQtdC90YLRgyAtINC/0YDQtdC00YvQtNGD0YnQuNC5INC/0LXRgNC10YHRgtCw0LXRgiDQsdGL0YLRjCDQsNC60YLQuNCy0L3Ri9C8XG4gKiArIDE4KSDQldGB0LvQuCDQutC70LjQuiDQvdC1INCx0YvQuyDQutC70LjQutC90YPRgiDQvdC1INC/0L4g0L7QtNC90L7QvNGDINGN0LvQtdC80LXQvdGC0YMg0YLQviDQvdC40LrQsNC60L7Qs9C+INCw0LrRgtC40LLQvdC+0LPQviDRjdC70LXQvNC10L3RgtCwINC90LXRglxuICogMTkpINCjINGN0LvQtdC80LXQvdGC0L7QsiDQtdGB0YLRjCB6LWluZGV4IC0geiBpbmRleCDQstC70LjRj9C10YIg0L3QsCDQvtGC0YDQuNGB0L7QstC60YMg0Y3Qu9C10LzQtdC90YLQvtCyXG4gKiAyMCkg0JLRgdC1INC60YPQt9C10L3RiyDQuNC80LXRjtGCINC+0LTQuNC9INC4INGC0L7RgiDQttC1INC40L3QtNC10LrRgSAtINCy0YHQtSDQtNC+0YfQtdGA0L3QuNC1INC90LAg0LXQtNC40L3QuNGG0YMg0LHQvtC70YzRiNC1INGC0L4g0LXRgdGC0Ywg0L3QuNC20LVcbiAqID8gMjEpINCSINC60LDQttC00L7QvCDRjdC70LXQvNC10L3RgtC1L9Cx0LvQvtC60LUg0LzQvtC20L3QviDQvdCw0L/QuNGB0LDRgtGMINGC0LXQutGB0YIgLSDRgtC10LrRgdGCINC80LXQvdGP0LXRgiDRgNCw0LfQvNC10YAg0LHQu9C+0LrQsCDRjdC70LXQvNC10L3RgtCwIC0g0LLRgdC1INC+0YHRgtCw0LvRjNC90YvQtSDRjdC70LXQvNC10L3RgtGLINC/0L7QtNGB0YLRgNCw0LLQuNCy0LDRjtGC0YHRjyDQv9C+0LQg0L3QvtCy0YvQuSDRgNCw0LfQvNC10YAg0LHQu9C+0LrQsFxuICogMjIpINCg0L7QtNC40YLQtdC70YzRgdC60LjQuSDQsdC70L7QuiDRhtC10L3RgtGA0YPQtdGC0YHRjyDQv9C+INGG0LXQvdGC0YDRgyDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0LLRgdC10YUg0LTQvtGH0LXRgNC90LjRhSDRjdC70LXQvNC10L3RgtC+0LJcbiAqL1xudHlwZSBUaGluZyA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY2hpbGRyZW4/OiBBcnJheTxUaGluZz5cbn1cblxudHlwZSBUaGluZ3MgPSBBcnJheTxUaGluZz47XG5cbnR5cGUgUHJlcGFyZWRUaGluZ3MgPSBQcmVwYXJlZFRoaW5nW107XG5cbnR5cGUgUHJlcGFyZWRUaGluZyA9IHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGNoaWxkcmVuPzogQXJyYXk8UHJlcGFyZWRUaGluZz5cbiAgICBwYXJlbnQ/OiBQcmVwYXJlZFRoaW5nO1xuICAgIHBvc2l0aW9uPzoge1xuICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgIHk6IG51bWJlcixcbiAgICB9LFxuICAgIHNpemU/OiB7XG4gICAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgICAgIGhlaWdodDogbnVtYmVyO1xuICAgICAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgICAgICBwYWRkaW5nOiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3Jvd01hcCB7XG4gICAgY29udGFpbmVyOiBFbGVtZW50O1xuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcGFyYW1zOiB7XG4gICAgICAgIGNlbnRlcmluZzogYm9vbGVhbjtcbiAgICAgICAgYmdDb2xvcjogc3RyaW5nO1xuICAgICAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgICAgICBmb250Q29sb3I6IHN0cmluZztcbiAgICAgICAgYWN0aXZlRm9udENvbG9yOiBzdHJpbmc7XG4gICAgICAgIHJlY3RDb2xvcjogc3RyaW5nO1xuICAgICAgICBhY3RpdmVSZWN0Q29sb3I6IHN0cmluZztcbiAgICAgICAgZ2xvYlBhZGRpbmc6IG51bWJlcjtcbiAgICAgICAgem9vbTogbnVtYmVyO1xuICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICAgIHg6IG51bWJlcjtcbiAgICAgICAgICAgIHk6IG51bWJlcjtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZzoge1xuICAgICAgICAgICAgaXNEcmFnZ2luZzogYm9vbGVhbjtcbiAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgeTogbnVtYmVyLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBib3JkZXJzOiB7XG4gICAgICAgICAgICBsZWZ0OiBudW1iZXI7XG4gICAgICAgICAgICByaWdodDogbnVtYmVyO1xuICAgICAgICAgICAgdG9wOiBudW1iZXI7XG4gICAgICAgICAgICBib3R0b206IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpbmdzOiBUaGluZ3M7XG4gICAgcHJlcGFyZWRUaGluZ3M6IEFycmF5PFByZXBhcmVkVGhpbmc+O1xuICAgIGFjdGl2ZUVsZW1lbnQ6IFByZXBhcmVkVGhpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEVsZW1lbnQsIHRoaW5nczogVGhpbmdzKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICAgICAgY2VudGVyaW5nOiB0cnVlLFxuICAgICAgICAgICAgYmdDb2xvcjogJ3NreWJsdWUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDI2LFxuICAgICAgICAgICAgZm9udENvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgYWN0aXZlRm9udENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgcmVjdENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgYWN0aXZlUmVjdENvbG9yOiAnI2VkNGQ3MicsXG4gICAgICAgICAgICB6b29tOiAxLFxuICAgICAgICAgICAgZ2xvYlBhZGRpbmc6IDAsXG4gICAgICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhZzoge1xuICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib3JkZXJzOiB7XG4gICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnBhcmFtcywgJ2dsb2JQYWRkaW5nJywge1xuICAgICAgICAgICAgLy8gdmFsdWU6IDQyLFxuICAgICAgICAgICAgLy8gd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiB0aGlzLnpvb20gKiA0MCB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50aGluZ3MgPSB0aGluZ3M7XG4gICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QtNCz0L7RgtCw0LLQu9C40LLQsNC10Lwg0L/QvtC70L7QttC10L3QuNC1INGN0LvQtdC80LXQvdGC0L7QslxuICAgICAqL1xuICAgIHByaXZhdGUgcHJlcGFyZVBvc2l0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncyA9IHRoaXMucHJlcGFyZWRUaGluZ3MubWFwKHRoaXMucHJlcGFyZVBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBnZXRDaGlsZHJlbldpZHRoID0gKGNoaWxkcmVuOiBQcmVwYXJlZFRoaW5nW10pID0+IHtcbiAgICAgICAgbGV0IGNvbW1vbldpZHRoOiBudW1iZXIgPSAwO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgYmlnZ2VzdEVsZW0gPSAoZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA+PSBlbGVtZW50LnNpemUud2lkdGgpID8gZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA6IGVsZW1lbnQuc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBzbWFsbGVzdEVsZW0gPSAoZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA8PSBlbGVtZW50LnNpemUud2lkdGgpID8gZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA6IGVsZW1lbnQuc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoIC0gc21hbGxlc3RFbGVtO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoICsgZWxlbWVudC5zaXplLndpZHRoICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5vdGhlckNoaWxkcmVuV2lkdGggPSB0aGlzLmdldENoaWxkcmVuV2lkdGgoZWxlbWVudC5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCArIGFub3RoZXJDaGlsZHJlbldpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoIC0gdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vbldpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZVBvc2l0aW9uID0gKHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcsIGk6IG51bWJlciwgcHJlcGFyZWRUaGluZ3M6IFByZXBhcmVkVGhpbmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcGFyZW50IH0gPSBwcmVwYXJlZFRoaW5nO1xuICAgICAgICBjb25zdCB7IGdsb2JQYWRkaW5nIH0gPSB0aGlzLnBhcmFtcztcblxuICAgICAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSAwO1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZFByZXBhcmVkVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNHYXAgPSBzbGljZWRQcmVwYXJlZFRoaW5ncy5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZSArIGN1cnJlbnRWYWx1ZS5zaXplLndpZHRoICsgZ2xvYlBhZGRpbmc7XG4gICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmV2aW91c0dhcDtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgbGV0IGlzUGFyZW50RXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBoaWdoUGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgbGV0IHlQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaXNQYXJlbnRFeGlzdHMpIHtcbiAgICAgICAgICAgICAgICB5UG9zaXRpb24gPSB5UG9zaXRpb24gKyBoaWdoUGFyZW50LnNpemUuaGVpZ2h0ICsgZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGlnaFBhcmVudC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGlnaFBhcmVudCA9IGhpZ2hQYXJlbnQucGFyZW50O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlzUGFyZW50RXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0geVBvc2l0aW9uO1xuICAgIFxuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwYXJlbnQucG9zaXRpb24ueDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkUHJlcGFyZWRUaGluZ3MgPSBwcmVwYXJlZFRoaW5ncy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXNHYXAgPSBzbGljZWRQcmVwYXJlZFRoaW5ncy5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZSArIGN1cnJlbnRWYWx1ZS5zaXplLndpZHRoICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG4gICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICBwcmV2aW91c0dhcCA9IHByZXZpb3VzR2FwICsgcGFyZW50LnBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJldmlvdXNHYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hpbGRyZW5DZW50ZXI6JywgY2hpbGRyZW5DZW50ZXIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWxsQ2hpbGRyZW5XaWR0aDonLCBhbGxDaGlsZHJlbldpZHRoKTtcblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IGFsbENoaWxkcmVuV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1RoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgcHJldmlvdXNUaGluZ3MuZm9yRWFjaCgodGhpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5XaWR0aCA9IGFsbENoaWxkcmVuV2lkdGggKyB0aGlzLmdldENoaWxkcmVuV2lkdGgodGhpbmcuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggKyBhbGxDaGlsZHJlbldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGFyYW1zLmNlbnRlcmluZykge1xuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuV2lkdGggPSB0aGlzLmdldENoaWxkcmVuV2lkdGgocGFyZW50LmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbGZXaWR0aCA9IGNoaWxkcmVuV2lkdGggLyAyO1xuICAgIFxuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCAtIGhhbGZXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW5XaWR0aCA9IHRoaXMuZ2V0Q2hpbGRyZW5XaWR0aChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbGZXaWR0aCA9IGNoaWxkcmVuV2lkdGggLyAyO1xuICAgIFxuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCArIGhhbGZXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuID0gcHJlcGFyZWRUaGluZy5jaGlsZHJlbi5tYXAoKC4uLnByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVBvc2l0aW9uKC4uLnByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXBhcmVkVGhpbmc7IFxuICAgIH1cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiDQktGL0YfQuNGB0LvRj9C10Lwg0YDQsNC30LzQtdGA0Ysg0Y3Qu9C10LzQtdC90YLQvtCyXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcmVwYXJlVGhpbmdzU2l6ZXMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MgPSB0aGlzLnRoaW5ncy5tYXAodGhpcy5wcmVwYXJlVGhpbmdTaXplKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVUaGluZ1NpemUgPSAodGhpbmc6IFRoaW5nLCBpOiBudW1iZXIsIHRoaW5nczogVGhpbmdzLCBwYXJlbnRQcmVwYXJlZFRoaW5nPzogUHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICBjb25zdCBwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nID0ge1xuICAgICAgICAgICAgc2l6ZToge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgIHg6IG51bGwsXG4gICAgICAgICAgICAgICAgeTogbnVsbCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByZXBhcmVkVGhpbmcubmFtZSA9IHRoaW5nLm5hbWU7XG5cbiAgICAgICAgaWYgKHBhcmVudFByZXBhcmVkVGhpbmcpIHtcbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucGFyZW50ID0gcGFyZW50UHJlcGFyZWRUaGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCS0YvRh9C40YHQu9GP0LXQvCDRiNC40YDQuNC90YMg0Lgg0LLRi9GB0L7RgtGDINGC0LXQutGB0YLQvtCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcbiAgICAgICAgY29uc3QgdGhpbmdTaXplID0gdGhpcy5nZXRUaGluZ1NpemUodGhpbmcpO1xuXG4gICAgICAgIHByZXBhcmVkVGhpbmcuc2l6ZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGluZ1NpemUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaW5nU2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICBmb250U2l6ZTogdGhpbmdTaXplLmZvbnRTaXplLFxuICAgICAgICAgICAgcGFkZGluZzogdGhpbmdTaXplLnBhZGRpbmcsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcuY2hpbGRyZW4gPSB0aGluZy5jaGlsZHJlbi5tYXAoKC4uLnByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVRoaW5nU2l6ZSguLi5wcm9wcywgcHJlcGFyZWRUaGluZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHByZXBhcmVkVGhpbmc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIGZpbmRCb3JkZXJzID0gKHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcsIGJvcmRlcnM6IGFueSkgPT4ge1xuICAgICAgICBpZiAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi54IDw9IGJvcmRlcnMubGVmdCkge1xuICAgICAgICAgICAgYm9yZGVycy5sZWZ0ID0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA8PSBib3JkZXJzLnRvcCkge1xuICAgICAgICAgICAgYm9yZGVycy50b3AgPSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCArIHByZXBhcmVkVGhpbmcuc2l6ZS53aWR0aCkgPj0gYm9yZGVycy5yaWdodCkge1xuICAgICAgICAgICAgYm9yZGVycy5yaWdodCA9IChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggKyBwcmVwYXJlZFRoaW5nLnNpemUud2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgKyBwcmVwYXJlZFRoaW5nLnNpemUuaGVpZ2h0KSA+PSBib3JkZXJzLmJvdHRvbSkge1xuICAgICAgICAgICAgYm9yZGVycy5ib3R0b20gPSAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ICsgcHJlcGFyZWRUaGluZy5zaXplLmhlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJlcGFyZWRUaGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5jaGlsZHJlbi5ldmVyeSgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRCb3JkZXJzKHByZXBhcmVkVGhpbmcsIGJvcmRlcnMpIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXRCb3JkZXJzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBib3JkZXJzID0ge1xuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzLmV2ZXJ5KChwcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbmRCb3JkZXJzKHByZXBhcmVkVGhpbmcsIGJvcmRlcnMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBhcmFtcy5ib3JkZXJzLmxlZnQgPSBib3JkZXJzLmxlZnQ7XG4gICAgICAgIHRoaXMucGFyYW1zLmJvcmRlcnMucmlnaHQgPSBib3JkZXJzLnJpZ2h0O1xuICAgICAgICB0aGlzLnBhcmFtcy5ib3JkZXJzLnRvcCA9IGJvcmRlcnMudG9wO1xuICAgICAgICB0aGlzLnBhcmFtcy5ib3JkZXJzLmJvdHRvbSA9IGJvcmRlcnMuYm90dG9tO1xuICAgIH1cblxuICAgIGluaXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY2FudmFzLmlkID0gJ2dyb3dNYXBDYW52YXMnO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgY29uc3QgdyA9IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBoID0gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIHRoaXMucHJlcGFyZVRoaW5nc1NpemVzKCk7XG4gICAgICAgIHRoaXMucHJlcGFyZVBvc2l0aW9ucygpO1xuICAgICAgICB0aGlzLnNldEJvcmRlcnMoKTtcblxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGg7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcblxuICAgICAgICAvLyDQo9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDQstGM0Y4g0LIg0YbQtdC90YIg0LLRgdC10YUg0Y3Qu9C10LzQtdC90YLQvtCyXG4gICAgICAgIHRoaXMucGFyYW1zLmNlbnRlci54ID0gKHRoaXMuY2FudmFzLndpZHRoIC8gMikgLSAoKHRoaXMucGFyYW1zLmJvcmRlcnMucmlnaHQgLSB0aGlzLnBhcmFtcy5ib3JkZXJzLmxlZnQpIC8gMik7XG4gICAgICAgIHRoaXMucGFyYW1zLmNlbnRlci55ID0gKHRoaXMuY2FudmFzLmhlaWdodCAvIDIpIC0gKCh0aGlzLnBhcmFtcy5ib3JkZXJzLmJvdHRvbSAtIHRoaXMucGFyYW1zLmJvcmRlcnMudG9wKSAvIDIpO1xuXG4gICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh0aGlzLnBhcmFtcy5jZW50ZXIueCwgdGhpcy5wYXJhbXMuY2VudGVyLnkpO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVkQ29udGFpbmVyRGF0YTogYW55ID0ge1xuICAgICAgICAgICAgcHJldmlvdXNXaWR0aDogbnVsbCxcbiAgICAgICAgICAgIHByZXZpb3VzSGVpZ2h0OiBudWxsLFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhIShvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNXaWR0aCAmJiBvYnNlcnZlZENvbnRhaW5lckRhdGEucHJldmlvdXNIZWlnaHQpICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAoZW50cmllc1swXS5jb250ZW50UmVjdC53aWR0aCAhPT0gb2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzV2lkdGgpIHx8XG4gICAgICAgICAgICAgICAgICAgIChlbnRyaWVzWzBdLmNvbnRlbnRSZWN0LmhlaWdodCAhPT0gb2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzSGVpZ2h0KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQ29udGFpbmVyIHNpemUgaXMgY2hhbmdlZCAtIHJlbG9hZCB0aGUgYXBwLicpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclJlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzV2lkdGggPSBlbnRyaWVzWzBdLmNvbnRlbnRSZWN0LndpZHRoO1xuICAgICAgICAgICAgb2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzSGVpZ2h0ID0gZW50cmllc1swXS5jb250ZW50UmVjdC5oZWlnaHQ7XG4gICAgICAgIH0pO1xuICAgICAgICBjb250YWluZXJSZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhd0JHKCk7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVUaGluZ3NTaXplcygpO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlUG9zaXRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXdSZWxhdGlvbnModGhpcy5wcmVwYXJlZFRoaW5ncyk7XG4gICAgICAgICAgICB0aGlzLmRyYXdUaGluZ3ModGhpcy5wcmVwYXJlZFRoaW5ncyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Jvd01hcENhbnZhcycpO1xuICAgICAgICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDAgLyAzMCk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVsdGFZID0gKGV2ZW50LmRlbHRhWSAvIDEwMDApO1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuem9vbSA9IHRoaXMucGFyYW1zLnpvb20gKyBkZWx0YVk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtcy56b29tID4gNCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLnpvb20gPSA0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhcmFtcy56b29tIDwgMC41KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuem9vbSA9IDAuNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLmlzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogZS5vZmZzZXRYLFxuICAgICAgICAgICAgICAgIHk6IGUub2Zmc2V0WSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcuaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogZS5vZmZzZXRYLFxuICAgICAgICAgICAgICAgIHk6IGUub2Zmc2V0WSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLmRyYWcuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIGxldCB4U2xpZGUgPSBlLm9mZnNldFggLSB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBsZXQgeVNsaWRlID0gZS5vZmZzZXRZIC0gdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uLnk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoeFNsaWRlLCB5U2xpZGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2VudGVyLnggPSB0aGlzLnBhcmFtcy5jZW50ZXIueCArIHhTbGlkZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueSA9IHRoaXMucGFyYW1zLmNlbnRlci55ICsgeVNsaWRlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBlLm9mZnNldFgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGUub2Zmc2V0WSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNoZWNrU2VsZWN0aW9uID0gKHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcsIHhQb3M6IG51bWJlciwgeVBvczogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3aXRoaW5UaGVCb3JkZXJzWCA9XG4gICAgICAgICAgICAgICAgKHhQb3MgPj0gKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCkpICYmXG4gICAgICAgICAgICAgICAgeFBvcyA8PSAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgcHJlcGFyZWRUaGluZy5zaXplLndpZHRoKTtcblxuICAgICAgICAgICAgY29uc3Qgd2l0aGluVGhlQm9yZGVyc1kgPVxuICAgICAgICAgICAgICAgICh5UG9zID49IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSkgJiZcbiAgICAgICAgICAgICAgICB5UG9zIDw9IChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgKyBwcmVwYXJlZFRoaW5nLnNpemUuaGVpZ2h0KTtcblxuICAgICAgICAgICAgaWYgKHdpdGhpblRoZUJvcmRlcnNYKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpdGhpblRoZUJvcmRlcnNZKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmVwYXJlZFRoaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuLmV2ZXJ5KChwcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRUaGluZyA9IGNoZWNrU2VsZWN0aW9uKHByZXBhcmVkVGhpbmcsIHhQb3MsIHlQb3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZFRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBjbGlja2VkVGhpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQmtC70LjQutCw0LXQvCDQv9C+INC60LDQvdCy0LDRgdGDIC0g0YPQt9C90LDQtdC8INC60YPQtNCwINC60LvQuNC60L3Rg9C70LhcbiAgICAgICAgLy8g0J/QtdGA0LXQsdC40YDQsNC10Lwg0LLRgdC1INGN0LvQtdC80LXQvdGC0YsgLSDQuNGJ0LXQvCDQs9GA0LDQvdC40YbRiyDQutGD0LTQsCDQutC70LjQutC90YPQu9C4XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmlydHVhbE9mZnNldFggPSBlLm9mZnNldFggLSAodGhpcy5wYXJhbXMuY2VudGVyLngpO1xuICAgICAgICAgICAgY29uc3QgdmlydHVhbE9mZnNldFkgPSBlLm9mZnNldFkgLSAodGhpcy5wYXJhbXMuY2VudGVyLnkpO1xuXG4gICAgICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzLmV2ZXJ5KChwcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xpY2tlZFRoaW5nID0gY2hlY2tTZWxlY3Rpb24ocHJlcGFyZWRUaGluZywgdmlydHVhbE9mZnNldFgsIHZpcnR1YWxPZmZzZXRZKTtcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2tlZFRoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGNsaWNrZWRUaGluZztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZHJhd1RoaW5ncyA9IChwcmVwYXJlZFRoaW5nczogUHJlcGFyZWRUaGluZ1tdKSA9PiB7XG4gICAgICAgIHByZXBhcmVkVGhpbmdzLmZvckVhY2goKHByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhd1JlY3RhbmdsZShwcmVwYXJlZFRoaW5nKTtcblxuICAgICAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdUaGluZ3MocHJlcGFyZWRUaGluZy5jaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVsb2FkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaGluZ1NpemUgPSAodGhpbmc6IFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdGhpcy5wYXJhbXMuZm9udFNpemUgKiB0aGlzLnBhcmFtcy56b29tO1xuICAgICAgICBjb25zdCB0ZXh0TWV0cmljcyA9IHRoaXMuZ2V0VGV4dFNpemUodGhpbmcubmFtZSwgZm9udFNpemUpO1xuXG4gICAgICAgIGNvbnN0IHAgPSAoZm9udFNpemUgLyA0KTtcblxuICAgICAgICBjb25zdCByZWN0VyA9IChwICsgdGV4dE1ldHJpY3Mud2lkdGggKyBwKTtcbiAgICAgICAgY29uc3QgcmVjdEggPSAocCArIGZvbnRTaXplICsgcCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0VyxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdEgsXG4gICAgICAgICAgICBwYWRkaW5nOiBwLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UmVjdGFuZ2xlID0gKHRoaW5nOiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIGlmICh0aGluZz8ubmFtZSA9PT0gdGhpcy5hY3RpdmVFbGVtZW50Py5uYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5hY3RpdmVSZWN0Q29sb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5yZWN0Q29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGluZy5wb3NpdGlvbi54LCB0aGluZy5wb3NpdGlvbi55LCB0aGluZy5zaXplLndpZHRoLCB0aGluZy5zaXplLmhlaWdodCk7XG5cbiAgICAgICAgbGV0IGZvbnRDb2xvcjtcbiAgICAgICAgaWYgKHRoaW5nPy5uYW1lID09PSB0aGlzLmFjdGl2ZUVsZW1lbnQ/Lm5hbWUpIHtcbiAgICAgICAgICAgIGZvbnRDb2xvciA9IHRoaXMucGFyYW1zLmFjdGl2ZUZvbnRDb2xvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbnRDb2xvciA9IHRoaXMucGFyYW1zLmZvbnRDb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhd1RleHQoXG4gICAgICAgICAgICB0aGluZy5uYW1lLFxuICAgICAgICAgICAgdGhpbmcucG9zaXRpb24ueCArIHRoaW5nLnNpemUucGFkZGluZyxcbiAgICAgICAgICAgIHRoaW5nLnBvc2l0aW9uLnkgKyAodGhpbmcuc2l6ZS5wYWRkaW5nIC8gMikgKyB0aGluZy5zaXplLmZvbnRTaXplLFxuICAgICAgICAgICAgdGhpbmcuc2l6ZS5mb250U2l6ZSxcbiAgICAgICAgICAgIGZvbnRDb2xvcixcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRleHRTaXplID0gKHRleHQ6IHN0cmluZywgZm9udFNpemU6IG51bWJlcik6IFRleHRNZXRyaWNzID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNGb250ID0gdGhpcy5jdHguZm9udDtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IGAke2ZvbnRTaXplfXB4IHNhbnMtc2VyaWZgO1xuICAgICAgICBjb25zdCBtZWFzdXJlZFRleHQgPSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KTtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IHByZXZpb3VzRm9udDtcbiAgICAgICAgcmV0dXJuIG1lYXN1cmVkVGV4dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdUZXh0ID0gKHRleHQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIGZvbnRTaXplOiBudW1iZXIsIGZvbnRDb2xvcjogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBzYW5zLXNlcmlmYDtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gZm9udENvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LCB4LCB5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdSZWxhdGlvbnMgPSAocHJlcGFyZWRUaGluZ3M6IFByZXBhcmVkVGhpbmdzKSA9PiB7XG4gICAgICAgIHByZXBhcmVkVGhpbmdzLmZvckVhY2goKHByZXBhcmVkVGhpbmdQYXJlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nUGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZ1BhcmVudC5jaGlsZHJlbi5mb3JFYWNoKChwcmVwYXJlZFRoaW5nQ2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UmVsYXRpb24ocHJlcGFyZWRUaGluZ1BhcmVudCwgcHJlcGFyZWRUaGluZ0NoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJlcGFyZWRUaGluZ0NoaWxkLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdSZWxhdGlvbnMoW3ByZXBhcmVkVGhpbmdDaGlsZF0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UmVsYXRpb24gPSAocGFyZW50OiBQcmVwYXJlZFRoaW5nLCBjaGlsZDogUHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRDZW50ZXIgPSB7XG4gICAgICAgICAgICB4OiAocGFyZW50LnBvc2l0aW9uLnggKyAocGFyZW50LnNpemUud2lkdGggLyAyKSksXG4gICAgICAgICAgICB5OiAocGFyZW50LnBvc2l0aW9uLnkgKyAocGFyZW50LnNpemUuaGVpZ2h0IC8gMikpLFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2hpbGRDZW50ZXIgPSB7XG4gICAgICAgICAgICB4OiAoY2hpbGQucG9zaXRpb24ueCArIChjaGlsZC5zaXplLndpZHRoIC8gMikpLFxuICAgICAgICAgICAgeTogKGNoaWxkLnBvc2l0aW9uLnkgKyAoY2hpbGQuc2l6ZS5oZWlnaHQgLyAyKSksXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IGN0eCB9ID0gdGhpcztcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8ocGFyZW50Q2VudGVyLngsIHBhcmVudENlbnRlci55KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjaGlsZENlbnRlci54LCBwYXJlbnRDZW50ZXIueSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjaGlsZENlbnRlci54LCBjaGlsZENlbnRlci55KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0JHID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnBhcmFtcy5iZ0NvbG9yO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsUmVjdCgtKHRoaXMuY2FudmFzLndpZHRoIC8gMiksIC0odGhpcy5jYW52YXMuaGVpZ2h0IC8gMiksIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAvLyBUT0RPOiDQv9C+0LTRg9C80LDRgtGMINC80L7QttC90L4g0LvQuCDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0Y3RgtC+0YIg0LrQvtGB0YLRi9C70YxcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLTEwMDAwLCAtMTAwMDAsIDIwMDAwLCAyMDAwMCk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9