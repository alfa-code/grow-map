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
        // private isAncestorActive = (preparedThing: PreparedThing) => {
        //     let isActive = false;
        //     const checkActivity = (preparedThing: PreparedThing): boolean => {
        //         if (!preparedThing.parent) {
        //             return true;
        //         } else if (!this.activeElement) {
        //             return false;
        //         } else if (preparedThing.name === this.activeElement?.name) {
        //             return true;
        //         } else if (preparedThing?.parent?.name === this.activeElement?.name) {
        //             return true;
        //         } else if (preparedThing?.parent?.parent) {
        //             const isActive = checkActivity(preparedThing.parent.parent);
        //             return isActive;
        //         }
        //         return false;
        //     }
        //     isActive = checkActivity(preparedThing)
        //     return isActive;
        // };
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
                // const x = this.isAncestorActive(preparedThing);
                // console.log('x:', x);
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
            collapsed: true,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7OztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzhDQTtJQXFDSSxpQkFBWSxTQUFrQixFQUFFLE1BQWM7UUFBOUMsaUJBd0NDO1FBRUQ7O1dBRUc7UUFDSyxxQkFBZ0IsR0FBRztZQUN2QixLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBRUQscUJBQWdCLEdBQUcsVUFBQyxRQUF5QjtZQUN6QyxJQUFJLFdBQVcsR0FBVyxDQUFDLENBQUM7WUFDNUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxLQUFLO2dCQUM1QixJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ2IsMEhBQTBIO29CQUMxSCxJQUFNLFlBQVksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN4SCxXQUFXLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQztpQkFDNUM7Z0JBRUQsV0FBVyxHQUFHLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFFekUsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUNsQixJQUFNLG9CQUFvQixHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3JFLFdBQVcsR0FBRyxXQUFXLEdBQUcsb0JBQW9CLENBQUM7aUJBQ3BEO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxXQUFXLEdBQUcsV0FBVyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBRXBELE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUM7UUFFTyxvQkFBZSxHQUFHLFVBQUMsYUFBNEIsRUFBRSxDQUFTLEVBQUUsY0FBOEI7WUFDdEYsVUFBTSxHQUFLLGFBQWEsT0FBbEIsQ0FBbUI7WUFDekIsZUFBVyxHQUFLLEtBQUksQ0FBQyxNQUFNLFlBQWhCLENBQWlCO1lBRXBDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNULGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDN0IsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQztxQkFBTTtvQkFDSCxJQUFNLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxJQUFNLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsVUFBQyxhQUFhLEVBQUUsWUFBWTt3QkFDeEUsT0FBTyxhQUFhLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO29CQUNqRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNMLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztvQkFDdkMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQzthQUNKO1lBRUQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBQ3hCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxjQUFjLEVBQUU7b0JBQ25CLFNBQVMsR0FBRyxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO29CQUU3RCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7d0JBQ25CLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO3FCQUNsQzt5QkFBTTt3QkFDSCxjQUFjLEdBQUcsS0FBSyxDQUFDO3FCQUMxQjtpQkFDSjtnQkFDRCxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBRXJDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDVCxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDaEQ7cUJBQU07b0JBQ0gsSUFBTSxvQkFBb0IsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFVBQUMsYUFBYSxFQUFFLFlBQVk7d0JBQ3RFLE9BQU8sYUFBYSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO29CQUM3RSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNMLFdBQVcsR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztpQkFDMUM7YUFDSjtZQUVELGtEQUFrRDtZQUNsRCxzREFBc0Q7WUFFdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNULElBQUksa0JBQWdCLEdBQVcsQ0FBQyxDQUFDO2dCQUNqQyxJQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEQsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7b0JBQ3pCLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTt3QkFDaEIsa0JBQWdCLEdBQUcsa0JBQWdCLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDL0U7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsa0JBQWdCLENBQUM7YUFDMUU7WUFFRCxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUN2QixJQUFJLE1BQU0sRUFBRTtvQkFDUixJQUFNLGFBQWEsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztvQkFDNUQsSUFBTSxTQUFTLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQztvQkFFcEMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO2lCQUNuRTtnQkFFRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7b0JBQ3hCLElBQU0sYUFBYSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO29CQUNuRSxJQUFNLFNBQVMsR0FBRyxhQUFhLEdBQUcsQ0FBQyxDQUFDO29CQUVwQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7aUJBQ25FO2FBQ0o7WUFFRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3hCLGFBQWEsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7b0JBQUMsZUFBUTt5QkFBUixVQUFRLEVBQVIscUJBQVEsRUFBUixJQUFRO3dCQUFSLDBCQUFROztvQkFDekQsT0FBTyxLQUFJLENBQUMsZUFBZSxPQUFwQixLQUFJLEVBQW9CLEtBQUssRUFBRTtnQkFDMUMsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFDRDs7V0FFRztRQUVIOztXQUVHO1FBQ0ssdUJBQWtCLEdBQUc7WUFDekIsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUQsaUVBQWlFO1FBQ2pFLDRCQUE0QjtRQUM1Qix5RUFBeUU7UUFDekUsdUNBQXVDO1FBQ3ZDLDJCQUEyQjtRQUMzQiw0Q0FBNEM7UUFDNUMsNEJBQTRCO1FBQzVCLHdFQUF3RTtRQUN4RSwyQkFBMkI7UUFDM0IsaUZBQWlGO1FBQ2pGLDJCQUEyQjtRQUMzQixzREFBc0Q7UUFDdEQsMkVBQTJFO1FBQzNFLCtCQUErQjtRQUMvQixZQUFZO1FBRVosd0JBQXdCO1FBQ3hCLFFBQVE7UUFDUiw4Q0FBOEM7UUFDOUMsdUJBQXVCO1FBQ3ZCLEtBQUs7UUFFRyxxQkFBZ0IsR0FBRyxVQUFDLEtBQVksRUFBRSxDQUFTLEVBQUUsTUFBYyxFQUFFLG1CQUFtQztZQUNwRyxJQUFNLGFBQWEsR0FBa0I7Z0JBQ2pDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsSUFBSTtvQkFDWCxNQUFNLEVBQUUsSUFBSTtvQkFDWixRQUFRLEVBQUUsSUFBSTtvQkFDZCxPQUFPLEVBQUUsSUFBSTtpQkFDaEI7Z0JBQ0QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFO29CQUNOLENBQUMsRUFBRSxJQUFJO29CQUNQLENBQUMsRUFBRSxJQUFJO2lCQUNWO2FBQ0o7WUFFRCxhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFFaEMsSUFBSSxtQkFBbUIsRUFBRTtnQkFDckIsYUFBYSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQzthQUM5QztZQUVELGdEQUFnRDtZQUNoRCxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTNDLGFBQWEsQ0FBQyxJQUFJLEdBQUc7Z0JBQ2pCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztnQkFDdEIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO2dCQUN4QixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVE7Z0JBQzVCLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTzthQUM3QjtZQUVELElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsYUFBYSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztvQkFBQyxlQUFRO3lCQUFSLFVBQVEsRUFBUixxQkFBUSxFQUFSLElBQVE7d0JBQVIsMEJBQVE7O29CQUNqRCxPQUFPLEtBQUksQ0FBQyxnQkFBZ0IsT0FBckIsS0FBSSxrQ0FBcUIsS0FBSyxXQUFFLGFBQWEsV0FBRTtnQkFDMUQsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFDRDs7V0FFRztRQUVILGdCQUFXLEdBQUcsVUFBQyxhQUE0QixFQUFFLE9BQVk7WUFDckQsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUMxQyxPQUFPLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1lBRUQsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUN6QyxPQUFPLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQzFDO1lBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDeEUsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekU7WUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUMxRSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMzRTtZQUVELElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBQyxhQUFhO29CQUN2QyxPQUFPLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxlQUFVLEdBQUc7WUFDVCxJQUFNLE9BQU8sR0FBRztnQkFDWixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsQ0FBQztnQkFDUixHQUFHLEVBQUUsQ0FBQztnQkFDTixNQUFNLEVBQUUsQ0FBQzthQUNaO1lBRUQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsVUFBQyxhQUFhO2dCQUNwQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzFDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2hELENBQUM7UUFFRCxTQUFJLEdBQUc7WUFDSCxLQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsZUFBZSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEMsSUFBTSxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDckMsSUFBTSxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7WUFFdEMsS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWxCLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDdkIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhDLDBDQUEwQztZQUMxQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzlHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFL0csS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9ELElBQU0scUJBQXFCLEdBQVE7Z0JBQy9CLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixjQUFjLEVBQUUsSUFBSTthQUN2QjtZQUVELElBQU0sdUJBQXVCLEdBQUcsSUFBSSxjQUFjLENBQUMsVUFBQyxPQUFPO2dCQUN2RCxJQUNJLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLGFBQWEsSUFBSSxxQkFBcUIsQ0FBQyxjQUFjLENBQUM7b0JBQy9FLENBQ0ksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxxQkFBcUIsQ0FBQyxhQUFhLENBQUM7d0JBQ3RFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUsscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQzNFLEVBQ0g7b0JBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO29CQUM1RCx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNsRCxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2pCO2dCQUVELHFCQUFxQixDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDbkUscUJBQXFCLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsdUJBQXVCLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVoRCxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZCxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFFckMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDUCxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzNCO1lBQ0wsQ0FBQyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztZQUVkLEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBVTtnQkFDN0MsSUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBRTdDLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7aUJBQ3hCO3FCQUFNLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFO29CQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7aUJBQzFCO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsS0FBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsVUFBQyxDQUFNO2dCQUM5QyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUVuQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztvQkFDaEMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztvQkFDdkIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztpQkFDMUI7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBTTtnQkFDN0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFFbkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7b0JBQ2hDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTztvQkFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU87aUJBQ2Y7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQUMsQ0FBTTtnQkFDNUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFFcEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7b0JBQ2hDLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87b0JBQzlCLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87aUJBQ2pDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLENBQU07Z0JBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBRXBDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHO29CQUNoQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU87b0JBQ1osQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPO2lCQUNmO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFDLENBQU07Z0JBQzdDLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUM3QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztvQkFDN0QsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7b0JBRTdELEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFFbkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7b0JBQ3JELEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO29CQUVyRCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRzt3QkFDaEMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPO3dCQUNaLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTztxQkFDZjtpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsc0JBQXNCO1lBQ3RCLEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBTTtnQkFDN0MsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQzdCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUUvRSxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBRW5DLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO29CQUNyRCxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFFckQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7d0JBQ2hDLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87d0JBQzlCLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87cUJBQ2pDO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFNLGNBQWMsR0FBRyxVQUFDLGFBQTRCLEVBQUUsSUFBWSxFQUFFLElBQVk7Z0JBQzVFLElBQU0saUJBQWlCLEdBQ25CLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFbEUsSUFBTSxpQkFBaUIsR0FDbkIsQ0FBQyxJQUFJLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRW5FLElBQUksaUJBQWlCLEVBQUU7b0JBQ25CLElBQUksaUJBQWlCLEVBQUU7d0JBQ25CLE9BQU8sYUFBYSxDQUFDO3FCQUN4QjtpQkFDSjtnQkFFRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7b0JBQ3hCLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQUMsYUFBYTt3QkFDdkMsSUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQy9ELElBQUksWUFBWSxFQUFFOzRCQUNkLEtBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDOzRCQUNsQyxPQUFPLEtBQUssQ0FBQzt5QkFDaEI7NkJBQU07NEJBQ0gsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7eUJBQzdCO3dCQUNELE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLEtBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ3BCLE9BQU8sS0FBSSxDQUFDLGFBQWEsQ0FBQztxQkFDN0I7aUJBQ0o7Z0JBRUQsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUVELDRDQUE0QztZQUM1Qyx1REFBdUQ7WUFDdkQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFNO2dCQUN6QyxJQUFNLGNBQWMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELElBQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFMUQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsVUFBQyxhQUFhO29CQUNwQyxJQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDbkYsSUFBSSxZQUFZLEVBQUU7d0JBQ2QsS0FBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7d0JBQ2xDLE9BQU8sS0FBSyxDQUFDO3FCQUNoQjt5QkFBTTt3QkFDSCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztxQkFDN0I7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELGVBQVUsR0FBRyxVQUFDLGNBQStCO1lBQ3pDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxhQUFhO2dCQUNqQyxrREFBa0Q7Z0JBQ2xELHdCQUF3QjtnQkFDeEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFFbEMsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFO29CQUN4QixLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDM0M7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTyxXQUFNLEdBQUc7WUFDYixLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDOUIsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFFTyxpQkFBWSxHQUFHLFVBQUMsS0FBWTtZQUNoQyxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUN6RCxJQUFNLFdBQVcsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFM0QsSUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFekIsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFakMsT0FBTztnQkFDSCxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsT0FBTyxFQUFFLENBQUM7YUFDYjtRQUNMLENBQUM7UUFFTyxrQkFBYSxHQUFHLFVBQUMsS0FBb0I7O1lBQ3pDLElBQUksTUFBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLElBQUksT0FBSyxXQUFJLENBQUMsYUFBYSwwQ0FBRSxJQUFJLEdBQUU7Z0JBQzFDLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQzlDO1lBRUQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUzRixJQUFJLFNBQVMsQ0FBQztZQUNkLElBQUksTUFBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLElBQUksT0FBSyxXQUFJLENBQUMsYUFBYSwwQ0FBRSxJQUFJLEdBQUU7Z0JBQzFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzthQUMzQztpQkFBTTtnQkFDSCxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7YUFDckM7WUFFRCxLQUFJLENBQUMsUUFBUSxDQUNULEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ3JDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQ2pFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUNuQixTQUFTLENBQ1osQ0FBQztRQUNOLENBQUM7UUFFTyxnQkFBVyxHQUFHLFVBQUMsSUFBWSxFQUFFLFFBQWdCO1lBQ2pELElBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ25DLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLFVBQUcsUUFBUSxrQkFBZSxDQUFDO1lBQzNDLElBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztZQUM3QixPQUFPLFlBQVksQ0FBQztRQUN4QixDQUFDO1FBRU8sYUFBUSxHQUFHLFVBQUMsSUFBWSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsUUFBZ0IsRUFBRSxTQUFpQjtZQUN2RixLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxVQUFHLFFBQVEsa0JBQWUsQ0FBQztZQUMzQyxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDL0IsS0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRU8sa0JBQWEsR0FBRyxVQUFDLGNBQThCO1lBQ25ELGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxtQkFBbUI7Z0JBQ3ZDLElBQUksbUJBQW1CLENBQUMsUUFBUSxFQUFFO29CQUM5QixtQkFBbUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsa0JBQWtCO3dCQUNwRCxLQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDLENBQUM7d0JBRTNELElBQUksa0JBQWtCLENBQUMsUUFBUSxFQUFFOzRCQUM3QixLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt5QkFDM0M7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTyxpQkFBWSxHQUFHLFVBQUMsTUFBcUIsRUFBRSxLQUFvQjtZQUMvRCxJQUFNLFlBQVksR0FBRztnQkFDakIsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNwRDtZQUVELElBQU0sV0FBVyxHQUFHO2dCQUNoQixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1lBRU8sT0FBRyxHQUFLLEtBQUksSUFBVCxDQUFVO1lBRXJCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUVPLFdBQU0sR0FBRztZQUNiLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3pDLGlIQUFpSDtZQUNqSCxvREFBb0Q7WUFDcEQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFya0JHLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDVixTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLFNBQVM7WUFDbEIsUUFBUSxFQUFFLEVBQUU7WUFDWixTQUFTLEVBQUUsT0FBTztZQUNsQixlQUFlLEVBQUUsT0FBTztZQUN4QixTQUFTLEVBQUUsT0FBTztZQUNsQixlQUFlLEVBQUUsU0FBUztZQUMxQixJQUFJLEVBQUUsQ0FBQztZQUNQLFdBQVcsRUFBRSxDQUFDO1lBQ2QsTUFBTSxFQUFFO2dCQUNKLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2FBQ1A7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLGdCQUFnQixFQUFFO29CQUNkLENBQUMsRUFBRSxDQUFDO29CQUNKLENBQUMsRUFBRSxDQUFDO2lCQUNQO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsR0FBRyxFQUFFLENBQUM7Z0JBQ04sTUFBTSxFQUFFLENBQUM7YUFDWjtTQUNKO1FBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRTtZQUM5QyxhQUFhO1lBQ2Isa0JBQWtCO1lBQ2xCLEdBQUcsZ0JBQUssT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBQyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUEraEJMLGNBQUM7QUFBRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vR00vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vR00vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0dNL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vR00vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9HTS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICog0JrQsNGA0YLQsCDRgNC+0YHRgtCwXG4gKiBcbiAqINCi0YDQtdCx0L7QstCw0L3QuNGPOlxuICogKyAxKSDQn9GA0Lgg0YHQvtC30LTQsNC90LjQuCDQutCw0YDRgtGLINC90YPQttC90L4g0YPQutCw0LfQsNGC0Ywg0LrQvtC90YLQtdC50L3QtdGAXG4gKiArIDIpINCf0YDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQutCw0YDRgtGLINCyINC60L7QvdGC0LXQudC90LXRgCDQtNC+0LHQsNCy0LvRj9C10YLRgdGPINC60LDQvdCy0LDRgVxuICogKyAzKSDQmtCw0L3QstCw0YEg0LTQvtC70LbQtdC9INGA0LDRgdGC0Y/QvdGD0YLRjNGB0Y8g0L/QviDRgNCw0LfQvNC10YDRgyDQutC+0L3RgtC10LnQvdC10YDQsFxuICogKyA0KSDQmtCw0L3QstCw0YEg0LTQvtC70LbQtdC9INGB0LvQtdC00LjRgtGMINC30LAg0YDQsNC30LzQtdGA0L7QvCDQutC+0L3RgtC10LnQvdC10YDQsCDQuCDQtdGB0LvQuCDQvtC9INC80LXQvdGP0LXRgtGB0Y8gLSDQv9C10YDQtdC30LDQs9GA0YPQttCw0YLRjCDQv9GA0LjQu9C+0LbQtdC90LjQtVxuICogKyA1KSDQmtCw0L3QstCw0YEg0LTQvtC70LbQtdC9INC/0YDQuNC90LjQvNCw0YLRjCDQvdCwINCy0YXQvtC0INC+0LHRitC10LrRgiDQuNC70Lgg0LzQsNGB0YHQuNCyINC+0LHRhdC10LrRgtC+0LIg0Lgg0YDQuNGB0L7QstCw0YLRjCDQs9GA0LDRhNC40LrRg1xuICogKyA2KSDQmtCw0LzQtdGA0LAg0LTQvtC70LbQvdCwINGG0LXQvdGC0YDQvtCy0LDRgtGM0YHRjyDQv9C+INCz0LvQsNCy0L3QvtC80YMg0L7QsdGM0LXQutGC0YMg0LjQu9C4INC90LDQsdC+0YDRgyDQs9C70LDQstC90YvRhSDQvtCx0YrQtdC60YLQvtCyXG4gKiArIDcpINCSINC/0YDQvtCz0YDQsNC80LzQtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YDQtdCw0LvQuNC30L7QstCw0L0g0LfRg9C8XG4gKiArIDgpINCf0YDQvtCz0YDQsNC80LzQsCDQvNC+0LbQtdGCINCx0YvRgtGMINC30LDQv9GD0YnQtdC90LAg0LfQsNC30LDRg9C80LvQtdC90L7QuSDQuiDQvtGB0L3QvtCy0L3Ri9C8INC+0LHQtdC60YLQsNC8INC40LvQuCDQvtGF0LLQsNGC0YvQstCw0Y8g0L7QsdGJ0LjQuSDRgNCw0LfQvNC10YBcbiAqIDkpINC80LjQvdC40LzQsNC70YzQvdGL0Lkg0LfRg9C8INC+0L/RgNC10LTQtdC70Y/QtdGC0YHRjyDRgNCw0LfQvNC10YDQvtC8INC+0YHQvdC+0LLQvdC+0LPQviDQsdC70L7QutCwIC0g0LzQsNC60YHQuNC80LDQu9GM0L3Ri9C5INC30YPQvCDQvtGF0LLQsNGC0L7QvCDQstGB0LXRhSDQsdC70L7QutC+0LIg0L/Qu9GO0YEg0L7RgtGB0YLRg9C/0YtcbiAqIDEwKSDQoNCw0LfQu9C40YfQvdGL0LUg0L3QsNGB0YLRgNC+0LnQutC4INC80L7QttC90L4g0LLRi9Cy0L7QtNC40YLRjCDQvdCwINGN0LrRgNCw0L0g0YfRgtC+0LHRiyDQvdCw0YHRgtGA0LDQuNCy0LDRgtGMINC40YUg0L/QvtC70LfRg9C90LrQsNC80LhcbiAqICsgMTEpINCa0LDQttC00YvQuSDRgNC+0LTQuNGC0LXQu9GM0YHQutC40Lkg0L7QsdGK0LXQutGCINC80L7QttC10YIg0LjQvNC10YLRjCDQtNC+0YfQtdGA0L3QuNC5XG4gKiAxMikg0JXRgdC70Lgg0LIg0LTQvtGH0LXRgNC90LXQvCDQvdC1INGD0LrQsNC30LDQvdC+INCyINC60LDQutGD0Y4g0YHRgtC+0YDQvtC90YMg0L7QvSDRgdC80LXRidCw0LXRgtGB0Y8gLSDRgtC+INC+0L0g0YHQvNC10YnQsNC10YLRgdGPINCyINGB0LvRg9GH0LDQudC90YPRjiDRgdGC0L7RgNC+0L3Rg1xuICogKyAxMykg0JTQvtGH0LXRgNC90LjQtSDRjdC70LXQvNC10L3RgtGLINC40LzQtdGO0YIg0L7RgtGB0YLRg9C/INC+0YIg0YDQvtC00LjRgtC10LvRjNGB0LrQvtC60L4g0Lgg0YLQsNC6INC20LUg0LjQvNC10LXRgiDQvtGC0YHRgtGD0L8g0L7RgiDRgdCy0L7QuNGFINC60YPQt9C10L3QvtCyXG4gKiArIDE0KSDQldGB0YLRjCDQstC+0LfQvNC+0LbQvdC+0YHRgtGMINC80YvRiNC60L7QuSDQtNCy0LjQs9Cw0YLRjCDQutCw0LzQtdGA0YNcbiAqICsgMTUpINCjINC/0YDQuNC70L7QttC10L3QuNGPINC10YHRgtGMINC90LXQutC+0YLQvtGA0L7QtSDRgdC+0YHRgtC+0Y/QvdC40LUgLSDRgdC+0YHRgtC+0Y/QvdC40LUg0YXRgNCw0L3QuNGCINC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDQvtCx0LXQutGC0Ysg0Lgg0LjRhSDRgdC+0YHRgtC+0Y/QvdC40LUgKNGA0LDRgdC/0L7Qu9C+0LbQtdC90LjQtSDQuCDRgtCw0Log0LTQsNC70LXQtdC1KVxuICogKyAxNikg0J/QviDRjdC70LXQvNC10L3RgtGDINC80L7QttC90L4g0LrQu9C40LrQvdGD0YLRjCDQuCDQv9C+0LvRg9GH0LjRgtGMINCw0LrRgtC40LLQsNC40YDQvtCy0LDQvdC90YvQuSDRjdC70LXQvNC10L3RgiAtINGN0LvQtdC80LXQvdGCINC80L7QttC10YIg0LHRi9GC0Ywg0L/QvtC00YHQstC10YfQtdC9XG4gKiArIDE3KSDQldGB0LvQuCDQv9GA0L7QuNGB0YXQvtC00LjRgiDQutC70LjQuiDQv9C+INC00YDRg9Cz0L7QvNGDINGN0LvQtdC80LXQvdGC0YMgLSDQv9GA0LXQtNGL0LTRg9GJ0LjQuSDQv9C10YDQtdGB0YLQsNC10YIg0LHRi9GC0Ywg0LDQutGC0LjQstC90YvQvFxuICogKyAxOCkg0JXRgdC70Lgg0LrQu9C40Log0L3QtSDQsdGL0Lsg0LrQu9C40LrQvdGD0YIg0L3QtSDQv9C+INC+0LTQvdC+0LzRgyDRjdC70LXQvNC10L3RgtGDINGC0L4g0L3QuNC60LDQutC+0LPQviDQsNC60YLQuNCy0L3QvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQvdC10YJcbiAqIDE5KSDQoyDRjdC70LXQvNC10L3RgtC+0LIg0LXRgdGC0Ywgei1pbmRleCAtIHogaW5kZXgg0LLQu9C40Y/QtdGCINC90LAg0L7RgtGA0LjRgdC+0LLQutGDINGN0LvQtdC80LXQvdGC0L7QslxuICogMjApINCS0YHQtSDQutGD0LfQtdC90Ysg0LjQvNC10Y7RgiDQvtC00LjQvSDQuCDRgtC+0YIg0LbQtSDQuNC90LTQtdC60YEgLSDQstGB0LUg0LTQvtGH0LXRgNC90LjQtSDQvdCwINC10LTQuNC90LjRhtGDINCx0L7Qu9GM0YjQtSDRgtC+INC10YHRgtGMINC90LjQttC1XG4gKiA/IDIxKSDQkiDQutCw0LbQtNC+0Lwg0Y3Qu9C10LzQtdC90YLQtS/QsdC70L7QutC1INC80L7QttC90L4g0L3QsNC/0LjRgdCw0YLRjCDRgtC10LrRgdGCIC0g0YLQtdC60YHRgiDQvNC10L3Rj9C10YIg0YDQsNC30LzQtdGAINCx0LvQvtC60LAg0Y3Qu9C10LzQtdC90YLQsCAtINCy0YHQtSDQvtGB0YLQsNC70YzQvdGL0LUg0Y3Qu9C10LzQtdC90YLRiyDQv9C+0LTRgdGC0YDQsNCy0LjQstCw0Y7RgtGB0Y8g0L/QvtC0INC90L7QstGL0Lkg0YDQsNC30LzQtdGAINCx0LvQvtC60LBcbiAqIDIyKSDQoNC+0LTQuNGC0LXQu9GM0YHQutC40Lkg0LHQu9C+0Log0YbQtdC90YLRgNGD0LXRgtGB0Y8g0L/QviDRhtC10L3RgtGA0YMg0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INCy0YHQtdGFINC00L7Rh9C10YDQvdC40YUg0Y3Qu9C10LzQtdC90YLQvtCyXG4gKi9cbnR5cGUgVGhpbmcgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNoaWxkcmVuPzogQXJyYXk8VGhpbmc+XG59XG5cbnR5cGUgVGhpbmdzID0gQXJyYXk8VGhpbmc+O1xuXG50eXBlIFByZXBhcmVkVGhpbmdzID0gUHJlcGFyZWRUaGluZ1tdO1xuXG50eXBlIFByZXBhcmVkVGhpbmcgPSB7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICBjaGlsZHJlbj86IEFycmF5PFByZXBhcmVkVGhpbmc+XG4gICAgcGFyZW50PzogUHJlcGFyZWRUaGluZztcbiAgICBwb3NpdGlvbj86IHtcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgfSxcbiAgICBzaXplPzoge1xuICAgICAgICB3aWR0aDogbnVtYmVyO1xuICAgICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICAgICAgZm9udFNpemU6IG51bWJlcjtcbiAgICAgICAgcGFkZGluZzogbnVtYmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyb3dNYXAge1xuICAgIGNvbnRhaW5lcjogRWxlbWVudDtcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHBhcmFtczoge1xuICAgICAgICBjZW50ZXJpbmc6IGJvb2xlYW47XG4gICAgICAgIGNvbGxhcHNlZDogYm9vbGVhbjtcbiAgICAgICAgYmdDb2xvcjogc3RyaW5nO1xuICAgICAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgICAgICBmb250Q29sb3I6IHN0cmluZztcbiAgICAgICAgYWN0aXZlRm9udENvbG9yOiBzdHJpbmc7XG4gICAgICAgIHJlY3RDb2xvcjogc3RyaW5nO1xuICAgICAgICBhY3RpdmVSZWN0Q29sb3I6IHN0cmluZztcbiAgICAgICAgZ2xvYlBhZGRpbmc6IG51bWJlcjtcbiAgICAgICAgem9vbTogbnVtYmVyO1xuICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICAgIHg6IG51bWJlcjtcbiAgICAgICAgICAgIHk6IG51bWJlcjtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZzoge1xuICAgICAgICAgICAgaXNEcmFnZ2luZzogYm9vbGVhbjtcbiAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgeTogbnVtYmVyLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBib3JkZXJzOiB7XG4gICAgICAgICAgICBsZWZ0OiBudW1iZXI7XG4gICAgICAgICAgICByaWdodDogbnVtYmVyO1xuICAgICAgICAgICAgdG9wOiBudW1iZXI7XG4gICAgICAgICAgICBib3R0b206IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpbmdzOiBUaGluZ3M7XG4gICAgcHJlcGFyZWRUaGluZ3M6IEFycmF5PFByZXBhcmVkVGhpbmc+O1xuICAgIGFjdGl2ZUVsZW1lbnQ6IFByZXBhcmVkVGhpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEVsZW1lbnQsIHRoaW5nczogVGhpbmdzKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICAgICAgY2VudGVyaW5nOiB0cnVlLFxuICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgYmdDb2xvcjogJ3NreWJsdWUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDI2LFxuICAgICAgICAgICAgZm9udENvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgYWN0aXZlRm9udENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgcmVjdENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgYWN0aXZlUmVjdENvbG9yOiAnI2VkNGQ3MicsXG4gICAgICAgICAgICB6b29tOiAxLFxuICAgICAgICAgICAgZ2xvYlBhZGRpbmc6IDAsXG4gICAgICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhZzoge1xuICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib3JkZXJzOiB7XG4gICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnBhcmFtcywgJ2dsb2JQYWRkaW5nJywge1xuICAgICAgICAgICAgLy8gdmFsdWU6IDQyLFxuICAgICAgICAgICAgLy8gd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQoKSB7IHJldHVybiB0aGlzLnpvb20gKiA0MCB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50aGluZ3MgPSB0aGluZ3M7XG4gICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QtNCz0L7RgtCw0LLQu9C40LLQsNC10Lwg0L/QvtC70L7QttC10L3QuNC1INGN0LvQtdC80LXQvdGC0L7QslxuICAgICAqL1xuICAgIHByaXZhdGUgcHJlcGFyZVBvc2l0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncyA9IHRoaXMucHJlcGFyZWRUaGluZ3MubWFwKHRoaXMucHJlcGFyZVBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBnZXRDaGlsZHJlbldpZHRoID0gKGNoaWxkcmVuOiBQcmVwYXJlZFRoaW5nW10pID0+IHtcbiAgICAgICAgbGV0IGNvbW1vbldpZHRoOiBudW1iZXIgPSAwO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgYmlnZ2VzdEVsZW0gPSAoZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA+PSBlbGVtZW50LnNpemUud2lkdGgpID8gZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA6IGVsZW1lbnQuc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBzbWFsbGVzdEVsZW0gPSAoZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA8PSBlbGVtZW50LnNpemUud2lkdGgpID8gZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA6IGVsZW1lbnQuc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoIC0gc21hbGxlc3RFbGVtO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoICsgZWxlbWVudC5zaXplLndpZHRoICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5vdGhlckNoaWxkcmVuV2lkdGggPSB0aGlzLmdldENoaWxkcmVuV2lkdGgoZWxlbWVudC5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCArIGFub3RoZXJDaGlsZHJlbldpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoIC0gdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vbldpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZVBvc2l0aW9uID0gKHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcsIGk6IG51bWJlciwgcHJlcGFyZWRUaGluZ3M6IFByZXBhcmVkVGhpbmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcGFyZW50IH0gPSBwcmVwYXJlZFRoaW5nO1xuICAgICAgICBjb25zdCB7IGdsb2JQYWRkaW5nIH0gPSB0aGlzLnBhcmFtcztcblxuICAgICAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSAwO1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZFByZXBhcmVkVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNHYXAgPSBzbGljZWRQcmVwYXJlZFRoaW5ncy5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZSArIGN1cnJlbnRWYWx1ZS5zaXplLndpZHRoICsgZ2xvYlBhZGRpbmc7XG4gICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmV2aW91c0dhcDtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgbGV0IGlzUGFyZW50RXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBoaWdoUGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgbGV0IHlQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaXNQYXJlbnRFeGlzdHMpIHtcbiAgICAgICAgICAgICAgICB5UG9zaXRpb24gPSB5UG9zaXRpb24gKyBoaWdoUGFyZW50LnNpemUuaGVpZ2h0ICsgZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGlnaFBhcmVudC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGlnaFBhcmVudCA9IGhpZ2hQYXJlbnQucGFyZW50O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlzUGFyZW50RXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0geVBvc2l0aW9uO1xuICAgIFxuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwYXJlbnQucG9zaXRpb24ueDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkUHJlcGFyZWRUaGluZ3MgPSBwcmVwYXJlZFRoaW5ncy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXNHYXAgPSBzbGljZWRQcmVwYXJlZFRoaW5ncy5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZSArIGN1cnJlbnRWYWx1ZS5zaXplLndpZHRoICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG4gICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICBwcmV2aW91c0dhcCA9IHByZXZpb3VzR2FwICsgcGFyZW50LnBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJldmlvdXNHYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hpbGRyZW5DZW50ZXI6JywgY2hpbGRyZW5DZW50ZXIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWxsQ2hpbGRyZW5XaWR0aDonLCBhbGxDaGlsZHJlbldpZHRoKTtcblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IGFsbENoaWxkcmVuV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1RoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgcHJldmlvdXNUaGluZ3MuZm9yRWFjaCgodGhpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5XaWR0aCA9IGFsbENoaWxkcmVuV2lkdGggKyB0aGlzLmdldENoaWxkcmVuV2lkdGgodGhpbmcuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggKyBhbGxDaGlsZHJlbldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGFyYW1zLmNlbnRlcmluZykge1xuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuV2lkdGggPSB0aGlzLmdldENoaWxkcmVuV2lkdGgocGFyZW50LmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbGZXaWR0aCA9IGNoaWxkcmVuV2lkdGggLyAyO1xuICAgIFxuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCAtIGhhbGZXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW5XaWR0aCA9IHRoaXMuZ2V0Q2hpbGRyZW5XaWR0aChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKVxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbGZXaWR0aCA9IGNoaWxkcmVuV2lkdGggLyAyO1xuICAgIFxuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCArIGhhbGZXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuID0gcHJlcGFyZWRUaGluZy5jaGlsZHJlbi5tYXAoKC4uLnByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVBvc2l0aW9uKC4uLnByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXBhcmVkVGhpbmc7IFxuICAgIH1cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiDQktGL0YfQuNGB0LvRj9C10Lwg0YDQsNC30LzQtdGA0Ysg0Y3Qu9C10LzQtdC90YLQvtCyXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcmVwYXJlVGhpbmdzU2l6ZXMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MgPSB0aGlzLnRoaW5ncy5tYXAodGhpcy5wcmVwYXJlVGhpbmdTaXplKTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIGlzQW5jZXN0b3JBY3RpdmUgPSAocHJlcGFyZWRUaGluZzogUHJlcGFyZWRUaGluZykgPT4ge1xuICAgIC8vICAgICBsZXQgaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAvLyAgICAgY29uc3QgY2hlY2tBY3Rpdml0eSA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgLy8gICAgICAgICBpZiAoIXByZXBhcmVkVGhpbmcucGFyZW50KSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgLy8gICAgICAgICB9IGVsc2UgaWYgKHByZXBhcmVkVGhpbmcubmFtZSA9PT0gdGhpcy5hY3RpdmVFbGVtZW50Py5uYW1lKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gICAgICAgICB9IGVsc2UgaWYgKHByZXBhcmVkVGhpbmc/LnBhcmVudD8ubmFtZSA9PT0gdGhpcy5hY3RpdmVFbGVtZW50Py5uYW1lKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gICAgICAgICB9IGVsc2UgaWYgKHByZXBhcmVkVGhpbmc/LnBhcmVudD8ucGFyZW50KSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBjaGVja0FjdGl2aXR5KHByZXBhcmVkVGhpbmcucGFyZW50LnBhcmVudCk7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGlzQWN0aXZlO1xuICAgIC8vICAgICAgICAgfVxuXG4gICAgLy8gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgaXNBY3RpdmUgPSBjaGVja0FjdGl2aXR5KHByZXBhcmVkVGhpbmcpXG4gICAgLy8gICAgIHJldHVybiBpc0FjdGl2ZTtcbiAgICAvLyB9O1xuXG4gICAgcHJpdmF0ZSBwcmVwYXJlVGhpbmdTaXplID0gKHRoaW5nOiBUaGluZywgaTogbnVtYmVyLCB0aGluZ3M6IFRoaW5ncywgcGFyZW50UHJlcGFyZWRUaGluZz86IFByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgY29uc3QgcHJlcGFyZWRUaGluZzogUHJlcGFyZWRUaGluZyA9IHtcbiAgICAgICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IG51bGwsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiBudWxsLFxuICAgICAgICAgICAgICAgIHk6IG51bGwsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcmVwYXJlZFRoaW5nLm5hbWUgPSB0aGluZy5uYW1lO1xuXG4gICAgICAgIGlmIChwYXJlbnRQcmVwYXJlZFRoaW5nKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBhcmVudCA9IHBhcmVudFByZXBhcmVkVGhpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0YjQuNGA0LjQvdGDINC4INCy0YvRgdC+0YLRgyDRgtC10LrRgdGC0L7QstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG4gICAgICAgIGNvbnN0IHRoaW5nU2l6ZSA9IHRoaXMuZ2V0VGhpbmdTaXplKHRoaW5nKTtcblxuICAgICAgICBwcmVwYXJlZFRoaW5nLnNpemUgPSB7XG4gICAgICAgICAgICB3aWR0aDogdGhpbmdTaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGluZ1NpemUuaGVpZ2h0LFxuICAgICAgICAgICAgZm9udFNpemU6IHRoaW5nU2l6ZS5mb250U2l6ZSxcbiAgICAgICAgICAgIHBhZGRpbmc6IHRoaW5nU2l6ZS5wYWRkaW5nLFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuID0gdGhpbmcuY2hpbGRyZW4ubWFwKCguLi5wcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXBhcmVUaGluZ1NpemUoLi4ucHJvcHMsIHByZXBhcmVkVGhpbmcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwcmVwYXJlZFRoaW5nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICBmaW5kQm9yZGVycyA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nLCBib3JkZXJzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA8PSBib3JkZXJzLmxlZnQpIHtcbiAgICAgICAgICAgIGJvcmRlcnMubGVmdCA9IHByZXBhcmVkVGhpbmcucG9zaXRpb24ueDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPD0gYm9yZGVycy50b3ApIHtcbiAgICAgICAgICAgIGJvcmRlcnMudG9wID0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggKyBwcmVwYXJlZFRoaW5nLnNpemUud2lkdGgpID49IGJvcmRlcnMucmlnaHQpIHtcbiAgICAgICAgICAgIGJvcmRlcnMucmlnaHQgPSAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgcHJlcGFyZWRUaGluZy5zaXplLndpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgocHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ICsgcHJlcGFyZWRUaGluZy5zaXplLmhlaWdodCkgPj0gYm9yZGVycy5ib3R0b20pIHtcbiAgICAgICAgICAgIGJvcmRlcnMuYm90dG9tID0gKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSArIHByZXBhcmVkVGhpbmcuc2l6ZS5oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXBhcmVkVGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcuY2hpbGRyZW4uZXZlcnkoKHByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kQm9yZGVycyhwcmVwYXJlZFRoaW5nLCBib3JkZXJzKSBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc2V0Qm9yZGVycyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYm9yZGVycyA9IHtcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncy5ldmVyeSgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5maW5kQm9yZGVycyhwcmVwYXJlZFRoaW5nLCBib3JkZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wYXJhbXMuYm9yZGVycy5sZWZ0ID0gYm9yZGVycy5sZWZ0O1xuICAgICAgICB0aGlzLnBhcmFtcy5ib3JkZXJzLnJpZ2h0ID0gYm9yZGVycy5yaWdodDtcbiAgICAgICAgdGhpcy5wYXJhbXMuYm9yZGVycy50b3AgPSBib3JkZXJzLnRvcDtcbiAgICAgICAgdGhpcy5wYXJhbXMuYm9yZGVycy5ib3R0b20gPSBib3JkZXJzLmJvdHRvbTtcbiAgICB9XG5cbiAgICBpbml0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNhbnZhcy5pZCA9ICdncm93TWFwQ2FudmFzJztcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaCA9IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodDtcblxuICAgICAgICB0aGlzLnByZXBhcmVUaGluZ3NTaXplcygpO1xuICAgICAgICB0aGlzLnByZXBhcmVQb3NpdGlvbnMoKTtcbiAgICAgICAgdGhpcy5zZXRCb3JkZXJzKCk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICAgICAgLy8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0LLRjNGOINCyINGG0LXQvdGCINCy0YHQtdGFINGN0LvQtdC80LXQvdGC0L7QslxuICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueCA9ICh0aGlzLmNhbnZhcy53aWR0aCAvIDIpIC0gKCh0aGlzLnBhcmFtcy5ib3JkZXJzLnJpZ2h0IC0gdGhpcy5wYXJhbXMuYm9yZGVycy5sZWZ0KSAvIDIpO1xuICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueSA9ICh0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKSAtICgodGhpcy5wYXJhbXMuYm9yZGVycy5ib3R0b20gLSB0aGlzLnBhcmFtcy5ib3JkZXJzLnRvcCkgLyAyKTtcblxuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy5wYXJhbXMuY2VudGVyLngsIHRoaXMucGFyYW1zLmNlbnRlci55KTtcblxuICAgICAgICBjb25zdCBvYnNlcnZlZENvbnRhaW5lckRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHByZXZpb3VzV2lkdGg6IG51bGwsXG4gICAgICAgICAgICBwcmV2aW91c0hlaWdodDogbnVsbCxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgISEob2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzV2lkdGggJiYgb2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzSGVpZ2h0KSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgKGVudHJpZXNbMF0uY29udGVudFJlY3Qud2lkdGggIT09IG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoKSB8fFxuICAgICAgICAgICAgICAgICAgICAoZW50cmllc1swXS5jb250ZW50UmVjdC5oZWlnaHQgIT09IG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnRhaW5lciBzaXplIGlzIGNoYW5nZWQgLSByZWxvYWQgdGhlIGFwcC4nKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoID0gZW50cmllc1swXS5jb250ZW50UmVjdC53aWR0aDtcbiAgICAgICAgICAgIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodCA9IGVudHJpZXNbMF0uY29udGVudFJlY3QuaGVpZ2h0O1xuICAgICAgICB9KTtcbiAgICAgICAgY29udGFpbmVyUmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYXdCRygpO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlVGhpbmdzU2l6ZXMoKTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZVBvc2l0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5kcmF3UmVsYXRpb25zKHRoaXMucHJlcGFyZWRUaGluZ3MpO1xuICAgICAgICAgICAgdGhpcy5kcmF3VGhpbmdzKHRoaXMucHJlcGFyZWRUaGluZ3MpO1xuXG4gICAgICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyb3dNYXBDYW52YXMnKTtcbiAgICAgICAgICAgIGlmICghZWxlbSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwIC8gMzApO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhWSA9IChldmVudC5kZWx0YVkgLyAxMDAwKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLnpvb20gPSB0aGlzLnBhcmFtcy56b29tICsgZGVsdGFZO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuem9vbSA+IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy56b29tID0gNDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJhbXMuem9vbSA8IDAuNSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLnpvb20gPSAwLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcuaXNEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiBlLnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgICAgICAgICAgICB5OiBlLnRvdWNoZXNbMF0uY2xpZW50WSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHg6IGUub2Zmc2V0WCxcbiAgICAgICAgICAgICAgICB5OiBlLm9mZnNldFksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgeTogZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuZHJhZy5pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB4OiBlLm9mZnNldFgsXG4gICAgICAgICAgICAgICAgeTogZS5vZmZzZXRZLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuZHJhZy5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IHhTbGlkZSA9IGUub2Zmc2V0WCAtIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIGxldCB5U2xpZGUgPSBlLm9mZnNldFkgLSB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24ueTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh4U2xpZGUsIHlTbGlkZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueCA9IHRoaXMucGFyYW1zLmNlbnRlci54ICsgeFNsaWRlO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLmNlbnRlci55ID0gdGhpcy5wYXJhbXMuY2VudGVyLnkgKyB5U2xpZGU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGUub2Zmc2V0WCxcbiAgICAgICAgICAgICAgICAgICAgeTogZS5vZmZzZXRZLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVE9ETzog0LLRi9C90LXRgdGC0Lgg0L7QsdGJ0LXQtVxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuZHJhZy5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IHhTbGlkZSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCAtIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIGxldCB5U2xpZGUgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24ueTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh4U2xpZGUsIHlTbGlkZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueCA9IHRoaXMucGFyYW1zLmNlbnRlci54ICsgeFNsaWRlO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLmNlbnRlci55ID0gdGhpcy5wYXJhbXMuY2VudGVyLnkgKyB5U2xpZGU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgeTogZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY2hlY2tTZWxlY3Rpb24gPSAocHJlcGFyZWRUaGluZzogUHJlcGFyZWRUaGluZywgeFBvczogbnVtYmVyLCB5UG9zOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpdGhpblRoZUJvcmRlcnNYID1cbiAgICAgICAgICAgICAgICAoeFBvcyA+PSAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi54KSkgJiZcbiAgICAgICAgICAgICAgICB4UG9zIDw9IChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggKyBwcmVwYXJlZFRoaW5nLnNpemUud2lkdGgpO1xuXG4gICAgICAgICAgICBjb25zdCB3aXRoaW5UaGVCb3JkZXJzWSA9XG4gICAgICAgICAgICAgICAgKHlQb3MgPj0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55KSAmJlxuICAgICAgICAgICAgICAgIHlQb3MgPD0gKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSArIHByZXBhcmVkVGhpbmcuc2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgICAgICBpZiAod2l0aGluVGhlQm9yZGVyc1gpIHtcbiAgICAgICAgICAgICAgICBpZiAod2l0aGluVGhlQm9yZGVyc1kpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXBhcmVkVGhpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJlcGFyZWRUaGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcuY2hpbGRyZW4uZXZlcnkoKHByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xpY2tlZFRoaW5nID0gY2hlY2tTZWxlY3Rpb24ocHJlcGFyZWRUaGluZywgeFBvcywgeVBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGlja2VkVGhpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGNsaWNrZWRUaGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCa0LvQuNC60LDQtdC8INC/0L4g0LrQsNC90LLQsNGB0YMgLSDRg9C30L3QsNC10Lwg0LrRg9C00LAg0LrQu9C40LrQvdGD0LvQuFxuICAgICAgICAvLyDQn9C10YDQtdCx0LjRgNCw0LXQvCDQstGB0LUg0Y3Qu9C10LzQtdC90YLRiyAtINC40YnQtdC8INCz0YDQsNC90LjRhtGLINC60YPQtNCwINC60LvQuNC60L3Rg9C70LhcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2aXJ0dWFsT2Zmc2V0WCA9IGUub2Zmc2V0WCAtICh0aGlzLnBhcmFtcy5jZW50ZXIueCk7XG4gICAgICAgICAgICBjb25zdCB2aXJ0dWFsT2Zmc2V0WSA9IGUub2Zmc2V0WSAtICh0aGlzLnBhcmFtcy5jZW50ZXIueSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MuZXZlcnkoKHByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGlja2VkVGhpbmcgPSBjaGVja1NlbGVjdGlvbihwcmVwYXJlZFRoaW5nLCB2aXJ0dWFsT2Zmc2V0WCwgdmlydHVhbE9mZnNldFkpO1xuICAgICAgICAgICAgICAgIGlmIChjbGlja2VkVGhpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gY2xpY2tlZFRoaW5nO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkcmF3VGhpbmdzID0gKHByZXBhcmVkVGhpbmdzOiBQcmVwYXJlZFRoaW5nW10pID0+IHtcbiAgICAgICAgcHJlcGFyZWRUaGluZ3MuZm9yRWFjaCgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3QgeCA9IHRoaXMuaXNBbmNlc3RvckFjdGl2ZShwcmVwYXJlZFRoaW5nKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd4OicsIHgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3UmVjdGFuZ2xlKHByZXBhcmVkVGhpbmcpO1xuXG4gICAgICAgICAgICBpZiAocHJlcGFyZWRUaGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RoaW5ncyhwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRoaW5nU2l6ZSA9ICh0aGluZzogVGhpbmcpID0+IHtcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSB0aGlzLnBhcmFtcy5mb250U2l6ZSAqIHRoaXMucGFyYW1zLnpvb207XG4gICAgICAgIGNvbnN0IHRleHRNZXRyaWNzID0gdGhpcy5nZXRUZXh0U2l6ZSh0aGluZy5uYW1lLCBmb250U2l6ZSk7XG5cbiAgICAgICAgY29uc3QgcCA9IChmb250U2l6ZSAvIDQpO1xuXG4gICAgICAgIGNvbnN0IHJlY3RXID0gKHAgKyB0ZXh0TWV0cmljcy53aWR0aCArIHApO1xuICAgICAgICBjb25zdCByZWN0SCA9IChwICsgZm9udFNpemUgKyBwKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxuICAgICAgICAgICAgd2lkdGg6IHJlY3RXLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0SCxcbiAgICAgICAgICAgIHBhZGRpbmc6IHAsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdSZWN0YW5nbGUgPSAodGhpbmc6IFByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgaWYgKHRoaW5nPy5uYW1lID09PSB0aGlzLmFjdGl2ZUVsZW1lbnQ/Lm5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmFjdGl2ZVJlY3RDb2xvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLnJlY3RDb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaW5nLnBvc2l0aW9uLngsIHRoaW5nLnBvc2l0aW9uLnksIHRoaW5nLnNpemUud2lkdGgsIHRoaW5nLnNpemUuaGVpZ2h0KTtcblxuICAgICAgICBsZXQgZm9udENvbG9yO1xuICAgICAgICBpZiAodGhpbmc/Lm5hbWUgPT09IHRoaXMuYWN0aXZlRWxlbWVudD8ubmFtZSkge1xuICAgICAgICAgICAgZm9udENvbG9yID0gdGhpcy5wYXJhbXMuYWN0aXZlRm9udENvbG9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9udENvbG9yID0gdGhpcy5wYXJhbXMuZm9udENvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3VGV4dChcbiAgICAgICAgICAgIHRoaW5nLm5hbWUsXG4gICAgICAgICAgICB0aGluZy5wb3NpdGlvbi54ICsgdGhpbmcuc2l6ZS5wYWRkaW5nLFxuICAgICAgICAgICAgdGhpbmcucG9zaXRpb24ueSArICh0aGluZy5zaXplLnBhZGRpbmcgLyAyKSArIHRoaW5nLnNpemUuZm9udFNpemUsXG4gICAgICAgICAgICB0aGluZy5zaXplLmZvbnRTaXplLFxuICAgICAgICAgICAgZm9udENvbG9yLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGV4dFNpemUgPSAodGV4dDogc3RyaW5nLCBmb250U2l6ZTogbnVtYmVyKTogVGV4dE1ldHJpY3MgPT4ge1xuICAgICAgICBjb25zdCBwcmV2aW91c0ZvbnQgPSB0aGlzLmN0eC5mb250O1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gYCR7Zm9udFNpemV9cHggc2Fucy1zZXJpZmA7XG4gICAgICAgIGNvbnN0IG1lYXN1cmVkVGV4dCA9IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gcHJldmlvdXNGb250O1xuICAgICAgICByZXR1cm4gbWVhc3VyZWRUZXh0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1RleHQgPSAodGV4dDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgZm9udFNpemU6IG51bWJlciwgZm9udENvbG9yOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IGAke2ZvbnRTaXplfXB4IHNhbnMtc2VyaWZgO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBmb250Q29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRleHQsIHgsIHkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1JlbGF0aW9ucyA9IChwcmVwYXJlZFRoaW5nczogUHJlcGFyZWRUaGluZ3MpID0+IHtcbiAgICAgICAgcHJlcGFyZWRUaGluZ3MuZm9yRWFjaCgocHJlcGFyZWRUaGluZ1BhcmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByZXBhcmVkVGhpbmdQYXJlbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nUGFyZW50LmNoaWxkcmVuLmZvckVhY2goKHByZXBhcmVkVGhpbmdDaGlsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdSZWxhdGlvbihwcmVwYXJlZFRoaW5nUGFyZW50LCBwcmVwYXJlZFRoaW5nQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nQ2hpbGQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1JlbGF0aW9ucyhbcHJlcGFyZWRUaGluZ0NoaWxkXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdSZWxhdGlvbiA9IChwYXJlbnQ6IFByZXBhcmVkVGhpbmcsIGNoaWxkOiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudENlbnRlciA9IHtcbiAgICAgICAgICAgIHg6IChwYXJlbnQucG9zaXRpb24ueCArIChwYXJlbnQuc2l6ZS53aWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHk6IChwYXJlbnQucG9zaXRpb24ueSArIChwYXJlbnQuc2l6ZS5oZWlnaHQgLyAyKSksXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjaGlsZENlbnRlciA9IHtcbiAgICAgICAgICAgIHg6IChjaGlsZC5wb3NpdGlvbi54ICsgKGNoaWxkLnNpemUud2lkdGggLyAyKSksXG4gICAgICAgICAgICB5OiAoY2hpbGQucG9zaXRpb24ueSArIChjaGlsZC5zaXplLmhlaWdodCAvIDIpKSxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgY3R4IH0gPSB0aGlzO1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhwYXJlbnRDZW50ZXIueCwgcGFyZW50Q2VudGVyLnkpO1xuICAgICAgICBjdHgubGluZVRvKGNoaWxkQ2VudGVyLngsIHBhcmVudENlbnRlci55KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHgubGluZVRvKGNoaWxkQ2VudGVyLngsIGNoaWxkQ2VudGVyLnkpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3QkcgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmJnQ29sb3I7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KC0odGhpcy5jYW52YXMud2lkdGggLyAyKSwgLSh0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKSwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIC8vIFRPRE86INC/0L7QtNGD0LzQsNGC0Ywg0LzQvtC20L3QviDQu9C4INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDRjdGC0L7RgiDQutC+0YHRgtGL0LvRjFxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgtMTAwMDAsIC0xMDAwMCwgMjAwMDAsIDIwMDAwKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=