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
            _this.ctx.translate(_this.params.center.x, _this.params.center.y);
            _this.canvas.width = w;
            _this.canvas.height = h;
            _this.container.appendChild(_this.canvas);
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
                // this.ctx.translate(this.params.center.x, this.params.center.y);
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
                    console.log('this.params.center:', _this.params.center);
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
                    console.log('clickedThing:', clickedThing);
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
        this.activeElement = null;
        this.params = {
            bgColor: 'skyblue',
            fontSize: 26,
            fontColor: 'red',
            rectColor: 'white',
            zoom: 1,
            globPadding: 20,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7OztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzZDQTtJQTJCSSxpQkFBWSxTQUFrQixFQUFFLE1BQWM7UUFBOUMsaUJBOEJDO1FBRUQ7O1dBRUc7UUFDSyxxQkFBZ0IsR0FBRztZQUN2QixLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBRU8sb0JBQWUsR0FBRyxVQUFDLGFBQTRCLEVBQUUsQ0FBUyxFQUFFLGNBQThCO1lBQ3RGLFVBQU0sR0FBSyxhQUFhLE9BQWxCLENBQW1CO1lBQ3pCLGVBQVcsR0FBSyxLQUFJLENBQUMsTUFBTSxZQUFoQixDQUFpQjtZQUVwQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDVCxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzdCLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEM7cUJBQU07b0JBQ0gsSUFBTSxvQkFBb0IsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDeEQsSUFBTSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFVBQUMsYUFBYSxFQUFFLFlBQVk7d0JBQ3hFLE9BQU8sYUFBYSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztvQkFDakUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDTCxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7b0JBQ3ZDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtZQUVELElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDO2dCQUN4QixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sY0FBYyxFQUFFO29CQUNuQixTQUFTLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztvQkFFN0QsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO3dCQUNuQixVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztxQkFDbEM7eUJBQU07d0JBQ0gsY0FBYyxHQUFHLEtBQUssQ0FBQztxQkFDMUI7aUJBQ0o7Z0JBQ0QsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUVyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ1QsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ2hEO3FCQUFNO29CQUNILElBQU0sb0JBQW9CLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELElBQUksV0FBVyxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxVQUFDLGFBQWEsRUFBRSxZQUFZO3dCQUN0RSxPQUFPLGFBQWEsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztvQkFDN0UsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDTCxXQUFXLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM5QyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7aUJBQzFDO2FBQ0o7WUFFRCxJQUFNLGdCQUFnQixHQUFHLFVBQUMsUUFBeUI7Z0JBQy9DLElBQUksV0FBVyxHQUFXLENBQUMsQ0FBQztnQkFDNUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxLQUFLO29CQUM1QixJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7d0JBQ2IsMkhBQTJIO3dCQUMzSCxJQUFNLFlBQVksR0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUN6SCxXQUFXLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQztxQkFDNUM7b0JBRUQsV0FBVyxHQUFHLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztvQkFFekUsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO3dCQUNsQixJQUFNLG9CQUFvQixHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDaEUsV0FBVyxHQUFHLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQztxQkFDcEQ7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsV0FBVyxHQUFHLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFFcEQsT0FBTyxXQUFXLENBQUM7WUFDdkIsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDVCxJQUFJLGtCQUFnQixHQUFXLENBQUMsQ0FBQztnQkFDakMsSUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO29CQUN6QixJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7d0JBQ2hCLGtCQUFnQixHQUFHLGtCQUFnQixHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDMUU7Z0JBRUwsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsa0JBQWdCLENBQUM7YUFDMUU7WUFFRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3hCLGFBQWEsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7b0JBQUMsZUFBUTt5QkFBUixVQUFRLEVBQVIscUJBQVEsRUFBUixJQUFRO3dCQUFSLDBCQUFROztvQkFDekQsT0FBTyxLQUFJLENBQUMsZUFBZSxPQUFwQixLQUFJLEVBQW9CLEtBQUssRUFBRTtnQkFDMUMsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFDRDs7V0FFRztRQUVIOztXQUVHO1FBQ0ssdUJBQWtCLEdBQUc7WUFDekIsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRU8scUJBQWdCLEdBQUcsVUFBQyxLQUFZLEVBQUUsQ0FBUyxFQUFFLE1BQWMsRUFBRSxtQkFBbUM7WUFDcEcsSUFBTSxhQUFhLEdBQWtCO2dCQUNqQyxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLElBQUk7b0JBQ1gsTUFBTSxFQUFFLElBQUk7b0JBQ1osUUFBUSxFQUFFLElBQUk7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2hCO2dCQUNELElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRTtvQkFDTixDQUFDLEVBQUUsSUFBSTtvQkFDUCxDQUFDLEVBQUUsSUFBSTtpQkFDVjthQUNKO1lBRUQsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBRWhDLElBQUksbUJBQW1CLEVBQUU7Z0JBQ3JCLGFBQWEsQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7YUFDOUM7WUFFRCxnREFBZ0Q7WUFDaEQsSUFBTSxTQUFTLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUzQyxhQUFhLENBQUMsSUFBSSxHQUFHO2dCQUNqQixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7Z0JBQ3RCLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTTtnQkFDeEIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRO2dCQUM1QixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87YUFDN0I7WUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hCLGFBQWEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7b0JBQUMsZUFBUTt5QkFBUixVQUFRLEVBQVIscUJBQVEsRUFBUixJQUFRO3dCQUFSLDBCQUFROztvQkFDakQsT0FBTyxLQUFJLENBQUMsZ0JBQWdCLE9BQXJCLEtBQUksa0NBQXFCLEtBQUssV0FBRSxhQUFhLFdBQUU7Z0JBQzFELENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO1FBQ0Q7O1dBRUc7UUFFSCxTQUFJLEdBQUc7WUFDSCxLQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsZUFBZSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEMsSUFBTSxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDckMsSUFBTSxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7WUFHdEMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9ELEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDdkIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhDLElBQU0scUJBQXFCLEdBQVE7Z0JBQy9CLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixjQUFjLEVBQUUsSUFBSTthQUN2QjtZQUVELElBQU0sdUJBQXVCLEdBQUcsSUFBSSxjQUFjLENBQUMsVUFBQyxPQUFPO2dCQUN2RCxJQUNJLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLGFBQWEsSUFBSSxxQkFBcUIsQ0FBQyxjQUFjLENBQUM7b0JBQy9FLENBQ0ksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxxQkFBcUIsQ0FBQyxhQUFhLENBQUM7d0JBQ3RFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUsscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQzNFLEVBQ0g7b0JBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO29CQUM1RCx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNsRCxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2pCO2dCQUVELHFCQUFxQixDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDbkUscUJBQXFCLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsdUJBQXVCLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVoRCxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUM7Z0JBQ3pCLGtFQUFrRTtnQkFDbEUsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUMxQixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRXJDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1AsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMzQjtZQUNMLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFFZCxLQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQVU7Z0JBQzdDLElBQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDckMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO2dCQUU3QyxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtvQkFDdEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QjtxQkFBTSxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRTtvQkFDL0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2lCQUMxQjtZQUNMLENBQUMsQ0FBQztZQUVGLEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBTTtnQkFDN0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFFbkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7b0JBQ2hDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTztvQkFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU87aUJBQ2Y7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBTTtnQkFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFFcEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7b0JBQ2hDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTztvQkFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU87aUJBQ2Y7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBTTtnQkFDN0MsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQzdCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztvQkFFN0QsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUVuQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDckQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7b0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFdkQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7d0JBQ2hDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTzt3QkFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU87cUJBQ2Y7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILElBQU0sY0FBYyxHQUFHLFVBQUMsYUFBNEIsRUFBRSxJQUFZLEVBQUUsSUFBWTtnQkFDNUUsSUFBTSxpQkFBaUIsR0FDbkIsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVsRSxJQUFNLGlCQUFpQixHQUNuQixDQUFDLElBQUksSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFbkUsSUFBSSxpQkFBaUIsRUFBRTtvQkFDbkIsSUFBSSxpQkFBaUIsRUFBRTt3QkFDbkIsT0FBTyxhQUFhLENBQUM7cUJBQ3hCO2lCQUNKO2dCQUVELElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRTtvQkFDeEIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBQyxhQUFhO3dCQUN2QyxJQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDL0QsSUFBSSxZQUFZLEVBQUU7NEJBQ2QsS0FBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7NEJBQ2xDLE9BQU8sS0FBSyxDQUFDO3lCQUNoQjs2QkFBTTs0QkFDSCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzt5QkFDN0I7d0JBQ0QsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUMsQ0FBQyxDQUFDO29CQUVILElBQUksS0FBSSxDQUFDLGFBQWEsRUFBRTt3QkFDcEIsT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDO3FCQUM3QjtpQkFDSjtnQkFFRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1lBRUQsNENBQTRDO1lBQzVDLHVEQUF1RDtZQUN2RCxLQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQU07Z0JBQ3pDLElBQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsSUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUxRCxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxVQUFDLGFBQWE7b0JBQ3BDLElBQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUNuRixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxZQUFZLEVBQUU7d0JBQ2QsS0FBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7d0JBQ2xDLE9BQU8sS0FBSyxDQUFDO3FCQUNoQjt5QkFBTTt3QkFDSCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztxQkFDN0I7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELGVBQVUsR0FBRyxVQUFDLGNBQStCO1lBQ3pDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxhQUFhO2dCQUNqQyxLQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUVsQyxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7b0JBQ3hCLEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMzQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVPLFdBQU0sR0FBRztZQUNiLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUM5QixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUVPLGlCQUFZLEdBQUcsVUFBQyxLQUFZO1lBQ2hDLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3pELElBQU0sV0FBVyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUzRCxJQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUV6QixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVqQyxPQUFPO2dCQUNILFFBQVEsRUFBRSxRQUFRO2dCQUNsQixLQUFLLEVBQUUsS0FBSztnQkFDWixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsQ0FBQzthQUNiO1FBQ0wsQ0FBQztRQUVPLGtCQUFhLEdBQUcsVUFBQyxLQUFvQjtZQUN6QyxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUMzQyxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNGLEtBQUksQ0FBQyxRQUFRLENBQ1QsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFDakUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQ3RCLENBQUM7UUFDTixDQUFDO1FBRU8sZ0JBQVcsR0FBRyxVQUFDLElBQVksRUFBRSxRQUFnQjtZQUNqRCxJQUFNLFlBQVksR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNuQyxLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxVQUFHLFFBQVEsYUFBVSxDQUFDO1lBQ3RDLElBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztZQUM3QixPQUFPLFlBQVksQ0FBQztRQUN4QixDQUFDO1FBRU8sYUFBUSxHQUFHLFVBQUMsSUFBWSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsUUFBZ0I7WUFDcEUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsVUFBRyxRQUFRLGFBQVUsQ0FBQztZQUN0QyxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUMzQyxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFTyxXQUFNLEdBQUc7WUFDYixLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxpSEFBaUg7WUFDakgsb0RBQW9EO1lBQ3BELEtBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBM1lHLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDVixPQUFPLEVBQUUsU0FBUztZQUNsQixRQUFRLEVBQUUsRUFBRTtZQUNaLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLElBQUksRUFBRSxDQUFDO1lBQ1AsV0FBVyxFQUFFLEVBQUU7WUFDZixNQUFNLEVBQUU7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7YUFDUDtZQUNELElBQUksRUFBRTtnQkFDRixVQUFVLEVBQUUsS0FBSztnQkFDakIsZ0JBQWdCLEVBQUU7b0JBQ2QsQ0FBQyxFQUFFLENBQUM7b0JBQ0osQ0FBQyxFQUFFLENBQUM7aUJBQ1A7YUFDSjtTQUNKO1FBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRTtZQUM5QyxhQUFhO1lBQ2Isa0JBQWtCO1lBQ2xCLEdBQUcsZ0JBQUssT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBQyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUErV0wsY0FBQztBQUFELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9HTS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vR00vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0dNLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiDQmtCw0YDRgtCwINGA0L7RgdGC0LBcbiAqIFxuICog0KLRgNC10LHQvtCy0LDQvdC40Y86XG4gKiArIDEpINCf0YDQuCDRgdC+0LfQtNCw0L3QuNC4INC60LDRgNGC0Ysg0L3Rg9C20L3QviDRg9C60LDQt9Cw0YLRjCDQutC+0L3RgtC10LnQvdC10YBcbiAqICsgMikg0J/RgNC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC60LDRgNGC0Ysg0LIg0LrQvtC90YLQtdC50L3QtdGAINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LrQsNC90LLQsNGBXG4gKiArIDMpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0YDQsNGB0YLRj9C90YPRgtGM0YHRjyDQv9C+INGA0LDQt9C80LXRgNGDINC60L7QvdGC0LXQudC90LXRgNCwXG4gKiArIDQpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0YHQu9C10LTQuNGC0Ywg0LfQsCDRgNCw0LfQvNC10YDQvtC8INC60L7QvdGC0LXQudC90LXRgNCwINC4INC10YHQu9C4INC+0L0g0LzQtdC90Y/QtdGC0YHRjyAtINC/0LXRgNC10LfQsNCz0YDRg9C20LDRgtGMINC/0YDQuNC70L7QttC10L3QuNC1XG4gKiA1KSDQmtCw0L3QstCw0YEg0LTQvtC70LbQtdC9INC/0YDQuNC90LjQvNCw0YLRjCDQvdCwINCy0YXQvtC0INC+0LHRitC10LrRgiDQuNC70Lgg0LzQsNGB0YHQuNCyINC+0LHRhdC10LrRgtC+0LIg0Lgg0YDQuNGB0L7QstCw0YLRjCDQs9GA0LDRhNC40LrRg1xuICogNikg0JrQsNC80LXRgNCwINC00L7Qu9C20L3QsCDRhtC10L3RgtGA0L7QstCw0YLRjNGB0Y8g0L/QviDQs9C70LDQstC90L7QvNGDINC+0LHRjNC10LrRgtGDINC40LvQuCDQvdCw0LHQvtGA0YMg0LPQu9Cw0LLQvdGL0YUg0L7QsdGK0LXQutGC0L7QslxuICogNykg0JIg0L/RgNC+0LPRgNCw0LzQvNC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDRgNC10LDQu9C40LfQvtCy0LDQvSDQt9GD0LxcbiAqIDgpINCf0YDQvtCz0YDQsNC80LzQsCDQvNC+0LbQtdGCINCx0YvRgtGMINC30LDQv9GD0YnQtdC90LAg0LfQsNC30LDRg9C80LvQtdC90L7QuSDQuiDQvtGB0L3QvtCy0L3Ri9C8INC+0LHQtdC60YLQsNC8INC40LvQuCDQvtGF0LLQsNGC0YvQstCw0Y8g0L7QsdGJ0LjQuSDRgNCw0LfQvNC10YBcbiAqIDkpINC80LjQvdC40LzQsNC70YzQvdGL0Lkg0LfRg9C8INC+0L/RgNC10LTQtdC70Y/QtdGC0YHRjyDRgNCw0LfQvNC10YDQvtC8INC+0YHQvdC+0LLQvdC+0LPQviDQsdC70L7QutCwIC0g0LzQsNC60YHQuNC80LDQu9GM0L3Ri9C5INC30YPQvCDQvtGF0LLQsNGC0L7QvCDQstGB0LXRhSDQsdC70L7QutC+0LIg0L/Qu9GO0YEg0L7RgtGB0YLRg9C/0YtcbiAqIDEwKSDQoNCw0LfQu9C40YfQvdGL0LUg0L3QsNGB0YLRgNC+0LnQutC4INC80L7QttC90L4g0LLRi9Cy0L7QtNC40YLRjCDQvdCwINGN0LrRgNCw0L0g0YfRgtC+0LHRiyDQvdCw0YHRgtGA0LDQuNCy0LDRgtGMINC40YUg0L/QvtC70LfRg9C90LrQsNC80LhcbiAqIDExKSDQmtCw0LbQtNGL0Lkg0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INC+0LHRitC10LrRgiDQvNC+0LbQtdGCINC40LzQtdGC0Ywg0LTQvtGH0LXRgNC90LjQuVxuICogMTIpINCV0YHQu9C4INCyINC00L7Rh9C10YDQvdC10Lwg0L3QtSDRg9C60LDQt9Cw0L3QviDQsiDQutCw0LrRg9GOINGB0YLQvtGA0L7QvdGDINC+0L0g0YHQvNC10YnQsNC10YLRgdGPIC0g0YLQviDQvtC9INGB0LzQtdGJ0LDQtdGC0YHRjyDQsiDRgdC70YPRh9Cw0LnQvdGD0Y4g0YHRgtC+0YDQvtC90YNcbiAqIDEzKSDQlNC+0YfQtdGA0L3QuNC1INGN0LvQtdC80LXQvdGC0Ysg0LjQvNC10Y7RgiDQvtGC0YHRgtGD0L8g0L7RgiDRgNC+0LTQuNGC0LXQu9GM0YHQutC+0LrQviDQuCDRgtCw0Log0LbQtSDQuNC80LXQtdGCINC+0YLRgdGC0YPQvyDQvtGCINGB0LLQvtC40YUg0LrRg9C30LXQvdC+0LJcbiAqIDE0KSDQldGB0YLRjCDQstC+0LfQvNC+0LbQvdC+0YHRgtGMINC80YvRiNC60L7QuSDQtNCy0LjQs9Cw0YLRjCDQutCw0LzQtdGA0YNcbiAqIDE1KSDQoyDQv9GA0LjQu9C+0LbQtdC90LjRjyDQtdGB0YLRjCDQvdC10LrQvtGC0L7RgNC+0LUg0YHQvtGB0YLQvtGP0L3QuNC1IC0g0YHQvtGB0YLQvtGP0L3QuNC1INGF0YDQsNC90LjRgiDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0L7QsdC10LrRgtGLINC4INC40YUg0YHQvtGB0YLQvtGP0L3QuNC1ICjRgNCw0YHQv9C+0LvQvtC20LXQvdC40LUg0Lgg0YLQsNC6INC00LDQu9C10LXQtSlcbiAqIDE2KSDQn9C+INGN0LvQtdC80LXQvdGC0YMg0LzQvtC20L3QviDQutC70LjQutC90YPRgtGMINC4INC/0L7Qu9GD0YfQuNGC0Ywg0LDQutGC0LjQstCw0LjRgNC+0LLQsNC90L3Ri9C5INGN0LvQtdC80LXQvdGCIC0g0Y3Qu9C10LzQtdC90YIg0LzQvtC20LXRgiDQsdGL0YLRjCDQv9C+0LTRgdCy0LXRh9C10L1cbiAqIDE3KSDQldGB0LvQuCDQv9GA0L7QuNGB0YXQvtC00LjRgiDQutC70LjQuiDQv9C+INC00YDRg9Cz0L7QvNGDINGN0LvQtdC80LXQvdGC0YMgLSDQv9GA0LXQtNGL0LTRg9GJ0LjQuSDQv9C10YDQtdGB0YLQsNC10YIg0LHRi9GC0Ywg0LDQutGC0LjQstC90YvQvFxuICogMTgpINCV0YHQu9C4INC60LvQuNC6INC90LUg0LHRi9C7INC60LvQuNC60L3Rg9GCINC90LUg0L/QviDQvtC00L3QvtC80YMg0Y3Qu9C10LzQtdC90YLRgyDRgtC+INC90LjQutCw0LrQvtCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0L3QtdGCXG4gKiAxOSkg0KMg0Y3Qu9C10LzQtdC90YLQvtCyINC10YHRgtGMIHotaW5kZXggLSB6IGluZGV4INCy0LvQuNGP0LXRgiDQvdCwINC+0YLRgNC40YHQvtCy0LrRgyDRjdC70LXQvNC10L3RgtC+0LJcbiAqIDIwKSDQktGB0LUg0LrRg9C30LXQvdGLINC40LzQtdGO0YIg0L7QtNC40L0g0Lgg0YLQvtGCINC20LUg0LjQvdC00LXQutGBIC0g0LLRgdC1INC00L7Rh9C10YDQvdC40LUg0L3QsCDQtdC00LjQvdC40YbRgyDQsdC+0LvRjNGI0LUg0YLQviDQtdGB0YLRjCDQvdC40LbQtVxuICogMjEpINCSINC60LDQttC00L7QvCDRjdC70LXQvNC10L3RgtC1L9Cx0LvQvtC60LUg0LzQvtC20L3QviDQvdCw0L/QuNGB0LDRgtGMINGC0LXQutGB0YIgLSDRgtC10LrRgdGCINC80LXQvdGP0LXRgiDRgNCw0LfQvNC10YAg0LHQu9C+0LrQsCDRjdC70LXQvNC10L3RgtCwIC0g0LLRgdC1INC+0YHRgtCw0LvRjNC90YvQtSDRjdC70LXQvNC10L3RgtGLINC/0L7QtNGB0YLRgNCw0LLQuNCy0LDRjtGC0YHRjyDQv9C+0LQg0L3QvtCy0YvQuSDRgNCw0LfQvNC10YAg0LHQu9C+0LrQsFxuICovXG50eXBlIFRoaW5nID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBjaGlsZHJlbj86IEFycmF5PFRoaW5nPlxufVxuXG50eXBlIFRoaW5ncyA9IEFycmF5PFRoaW5nPjtcblxudHlwZSBQcmVwYXJlZFRoaW5ncyA9IFByZXBhcmVkVGhpbmdbXTtcblxudHlwZSBQcmVwYXJlZFRoaW5nID0ge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgY2hpbGRyZW4/OiBBcnJheTxQcmVwYXJlZFRoaW5nPlxuICAgIHBhcmVudD86IFByZXBhcmVkVGhpbmc7XG4gICAgcG9zaXRpb24/OiB7XG4gICAgICAgIHg6IG51bWJlcixcbiAgICAgICAgeTogbnVtYmVyLFxuICAgIH0sXG4gICAgc2l6ZT86IHtcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgIGZvbnRTaXplOiBudW1iZXI7XG4gICAgICAgIHBhZGRpbmc6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcm93TWFwIHtcbiAgICBjb250YWluZXI6IEVsZW1lbnQ7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwYXJhbXM6IHtcbiAgICAgICAgYmdDb2xvcjogc3RyaW5nO1xuICAgICAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgICAgICBmb250Q29sb3I6IHN0cmluZztcbiAgICAgICAgcmVjdENvbG9yOiBzdHJpbmc7XG4gICAgICAgIGdsb2JQYWRkaW5nOiBudW1iZXI7XG4gICAgICAgIHpvb206IG51bWJlcjtcbiAgICAgICAgY2VudGVyOiB7XG4gICAgICAgICAgICB4OiBudW1iZXI7XG4gICAgICAgICAgICB5OiBudW1iZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGRyYWc6IHtcbiAgICAgICAgICAgIGlzRHJhZ2dpbmc6IGJvb2xlYW47XG4gICAgICAgICAgICBwcmV2aW91c1Bvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICAgICAgICAgIHk6IG51bWJlcixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpbmdzOiBUaGluZ3M7XG4gICAgcHJlcGFyZWRUaGluZ3M6IEFycmF5PFByZXBhcmVkVGhpbmc+O1xuICAgIGFjdGl2ZUVsZW1lbnQ6IFByZXBhcmVkVGhpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEVsZW1lbnQsIHRoaW5nczogVGhpbmdzKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge1xuICAgICAgICAgICAgYmdDb2xvcjogJ3NreWJsdWUnLFxuICAgICAgICAgICAgZm9udFNpemU6IDI2LFxuICAgICAgICAgICAgZm9udENvbG9yOiAncmVkJyxcbiAgICAgICAgICAgIHJlY3RDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgIHpvb206IDEsXG4gICAgICAgICAgICBnbG9iUGFkZGluZzogMjAsXG4gICAgICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhZzoge1xuICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5wYXJhbXMsICdnbG9iUGFkZGluZycsIHtcbiAgICAgICAgICAgIC8vIHZhbHVlOiA0MixcbiAgICAgICAgICAgIC8vIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gdGhpcy56b29tICogMjAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGhpbmdzID0gdGhpbmdzO1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LTQs9C+0YLQsNCy0LvQuNCy0LDQtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDRjdC70LXQvNC10L3RgtC+0LJcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVQb3NpdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MgPSB0aGlzLnByZXBhcmVkVGhpbmdzLm1hcCh0aGlzLnByZXBhcmVQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlUG9zaXRpb24gPSAocHJlcGFyZWRUaGluZzogUHJlcGFyZWRUaGluZywgaTogbnVtYmVyLCBwcmVwYXJlZFRoaW5nczogUHJlcGFyZWRUaGluZ3MpID0+IHtcbiAgICAgICAgY29uc3QgeyBwYXJlbnQgfSA9IHByZXBhcmVkVGhpbmc7XG4gICAgICAgIGNvbnN0IHsgZ2xvYlBhZGRpbmcgfSA9IHRoaXMucGFyYW1zO1xuXG4gICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IDA7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkUHJlcGFyZWRUaGluZ3MgPSBwcmVwYXJlZFRoaW5ncy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c0dhcCA9IHNsaWNlZFByZXBhcmVkVGhpbmdzLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlICsgY3VycmVudFZhbHVlLnNpemUud2lkdGggKyBnbG9iUGFkZGluZztcbiAgICAgICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXZpb3VzR2FwO1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBsZXQgaXNQYXJlbnRFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGhpZ2hQYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICBsZXQgeVBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpc1BhcmVudEV4aXN0cykge1xuICAgICAgICAgICAgICAgIHlQb3NpdGlvbiA9IHlQb3NpdGlvbiArIGhpZ2hQYXJlbnQuc2l6ZS5oZWlnaHQgKyBnbG9iUGFkZGluZztcblxuICAgICAgICAgICAgICAgIGlmIChoaWdoUGFyZW50LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBoaWdoUGFyZW50ID0gaGlnaFBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXNQYXJlbnRFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSB5UG9zaXRpb247XG4gICAgXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHBhcmVudC5wb3NpdGlvbi54O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRQcmVwYXJlZFRoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91c0dhcCA9IHNsaWNlZFByZXBhcmVkVGhpbmdzLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlICsgY3VycmVudFZhbHVlLnNpemUud2lkdGggKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcbiAgICAgICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgICAgIHByZXZpb3VzR2FwID0gcHJldmlvdXNHYXAgKyBwYXJlbnQucG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmV2aW91c0dhcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdldENoaWxkcmVuV2lkdGggPSAoY2hpbGRyZW46IFByZXBhcmVkVGhpbmdbXSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbW1vbldpZHRoOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgYmlnZ2VzdEVsZW0gPSAgKGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggPj0gZWxlbWVudC5zaXplLndpZHRoKSA/IGVsZW1lbnQucGFyZW50LnNpemUud2lkdGggOiBlbGVtZW50LnNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNtYWxsZXN0RWxlbSA9ICAoZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA8PSBlbGVtZW50LnNpemUud2lkdGgpID8gZWxlbWVudC5wYXJlbnQuc2l6ZS53aWR0aCA6IGVsZW1lbnQuc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCAtIHNtYWxsZXN0RWxlbTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoICsgZWxlbWVudC5zaXplLndpZHRoICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbm90aGVyQ2hpbGRyZW5XaWR0aCA9IGdldENoaWxkcmVuV2lkdGgoZWxlbWVudC5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggKyBhbm90aGVyQ2hpbGRyZW5XaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29tbW9uV2lkdGggPSBjb21tb25XaWR0aCAtIHRoaXMucGFyYW1zLmdsb2JQYWRkaW5nO1xuXG4gICAgICAgICAgICByZXR1cm4gY29tbW9uV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IGFsbENoaWxkcmVuV2lkdGg6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1RoaW5ncyA9IHByZXBhcmVkVGhpbmdzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgcHJldmlvdXNUaGluZ3MuZm9yRWFjaCgodGhpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5XaWR0aCA9IGFsbENoaWxkcmVuV2lkdGggKyBnZXRDaGlsZHJlbldpZHRoKHRoaW5nLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgYWxsQ2hpbGRyZW5XaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuID0gcHJlcGFyZWRUaGluZy5jaGlsZHJlbi5tYXAoKC4uLnByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVBvc2l0aW9uKC4uLnByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZzsgXG4gICAgfVxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqINCS0YvRh9C40YHQu9GP0LXQvCDRgNCw0LfQvNC10YDRiyDRjdC70LXQvNC10L3RgtC+0LJcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVUaGluZ3NTaXplcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncyA9IHRoaXMudGhpbmdzLm1hcCh0aGlzLnByZXBhcmVUaGluZ1NpemUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZVRoaW5nU2l6ZSA9ICh0aGluZzogVGhpbmcsIGk6IG51bWJlciwgdGhpbmdzOiBUaGluZ3MsIHBhcmVudFByZXBhcmVkVGhpbmc/OiBQcmVwYXJlZFRoaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcgPSB7XG4gICAgICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBudWxsLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgeDogbnVsbCxcbiAgICAgICAgICAgICAgICB5OiBudWxsLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJlcGFyZWRUaGluZy5uYW1lID0gdGhpbmcubmFtZTtcblxuICAgICAgICBpZiAocGFyZW50UHJlcGFyZWRUaGluZykge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wYXJlbnQgPSBwYXJlbnRQcmVwYXJlZFRoaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INGI0LjRgNC40L3RgyDQuCDQstGL0YHQvtGC0YMg0YLQtdC60YHRgtC+0LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuICAgICAgICBjb25zdCB0aGluZ1NpemUgPSB0aGlzLmdldFRoaW5nU2l6ZSh0aGluZyk7XG5cbiAgICAgICAgcHJlcGFyZWRUaGluZy5zaXplID0ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaW5nU2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpbmdTaXplLmhlaWdodCxcbiAgICAgICAgICAgIGZvbnRTaXplOiB0aGluZ1NpemUuZm9udFNpemUsXG4gICAgICAgICAgICBwYWRkaW5nOiB0aGluZ1NpemUucGFkZGluZyxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5jaGlsZHJlbiA9IHRoaW5nLmNoaWxkcmVuLm1hcCgoLi4ucHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlVGhpbmdTaXplKC4uLnByb3BzLCBwcmVwYXJlZFRoaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMuaWQgPSAnZ3Jvd01hcENhbnZhcyc7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICBjb25zdCB3ID0gdGhpcy5jb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGggPSB0aGlzLmNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG5cblxuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy5wYXJhbXMuY2VudGVyLngsIHRoaXMucGFyYW1zLmNlbnRlci55KTtcblxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGg7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcblxuICAgICAgICBjb25zdCBvYnNlcnZlZENvbnRhaW5lckRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHByZXZpb3VzV2lkdGg6IG51bGwsXG4gICAgICAgICAgICBwcmV2aW91c0hlaWdodDogbnVsbCxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgISEob2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzV2lkdGggJiYgb2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzSGVpZ2h0KSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgKGVudHJpZXNbMF0uY29udGVudFJlY3Qud2lkdGggIT09IG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoKSB8fFxuICAgICAgICAgICAgICAgICAgICAoZW50cmllc1swXS5jb250ZW50UmVjdC5oZWlnaHQgIT09IG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnRhaW5lciBzaXplIGlzIGNoYW5nZWQgLSByZWxvYWQgdGhlIGFwcC4nKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoID0gZW50cmllc1swXS5jb250ZW50UmVjdC53aWR0aDtcbiAgICAgICAgICAgIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodCA9IGVudHJpZXNbMF0uY29udGVudFJlY3QuaGVpZ2h0O1xuICAgICAgICB9KTtcbiAgICAgICAgY29udGFpbmVyUmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAvLyB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy5wYXJhbXMuY2VudGVyLngsIHRoaXMucGFyYW1zLmNlbnRlci55KTtcbiAgICAgICAgICAgIHRoaXMuZHJhd0JHKCk7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVUaGluZ3NTaXplcygpO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlUG9zaXRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLmRyYXdUaGluZ3ModGhpcy5wcmVwYXJlZFRoaW5ncyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Jvd01hcENhbnZhcycpO1xuICAgICAgICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDAgLyAzMCk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVsdGFZID0gKGV2ZW50LmRlbHRhWSAvIDEwMDApO1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuem9vbSA9IHRoaXMucGFyYW1zLnpvb20gKyBkZWx0YVk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtcy56b29tID4gNCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLnpvb20gPSA0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhcmFtcy56b29tIDwgMC41KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuem9vbSA9IDAuNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLmlzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogZS5vZmZzZXRYLFxuICAgICAgICAgICAgICAgIHk6IGUub2Zmc2V0WSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcuaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeDogZS5vZmZzZXRYLFxuICAgICAgICAgICAgICAgIHk6IGUub2Zmc2V0WSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLmRyYWcuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIGxldCB4U2xpZGUgPSBlLm9mZnNldFggLSB0aGlzLnBhcmFtcy5kcmFnLnByZXZpb3VzUG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBsZXQgeVNsaWRlID0gZS5vZmZzZXRZIC0gdGhpcy5wYXJhbXMuZHJhZy5wcmV2aW91c1Bvc2l0aW9uLnk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoeFNsaWRlLCB5U2xpZGUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2VudGVyLnggPSB0aGlzLnBhcmFtcy5jZW50ZXIueCArIHhTbGlkZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtcy5jZW50ZXIueSA9IHRoaXMucGFyYW1zLmNlbnRlci55ICsgeVNsaWRlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLnBhcmFtcy5jZW50ZXI6JywgdGhpcy5wYXJhbXMuY2VudGVyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zLmRyYWcucHJldmlvdXNQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogZS5vZmZzZXRYLFxuICAgICAgICAgICAgICAgICAgICB5OiBlLm9mZnNldFksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjaGVja1NlbGVjdGlvbiA9IChwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nLCB4UG9zOiBudW1iZXIsIHlQb3M6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2l0aGluVGhlQm9yZGVyc1ggPVxuICAgICAgICAgICAgICAgICh4UG9zID49IChwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLngpKSAmJlxuICAgICAgICAgICAgICAgIHhQb3MgPD0gKHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCArIHByZXBhcmVkVGhpbmcuc2l6ZS53aWR0aCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpdGhpblRoZUJvcmRlcnNZID1cbiAgICAgICAgICAgICAgICAoeVBvcyA+PSBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkpICYmXG4gICAgICAgICAgICAgICAgeVBvcyA8PSAocHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ICsgcHJlcGFyZWRUaGluZy5zaXplLmhlaWdodCk7XG5cbiAgICAgICAgICAgIGlmICh3aXRoaW5UaGVCb3JkZXJzWCkge1xuICAgICAgICAgICAgICAgIGlmICh3aXRoaW5UaGVCb3JkZXJzWSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5jaGlsZHJlbi5ldmVyeSgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGlja2VkVGhpbmcgPSBjaGVja1NlbGVjdGlvbihwcmVwYXJlZFRoaW5nLCB4UG9zLCB5UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrZWRUaGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gY2xpY2tlZFRoaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JrQu9C40LrQsNC10Lwg0L/QviDQutCw0L3QstCw0YHRgyAtINGD0LfQvdCw0LXQvCDQutGD0LTQsCDQutC70LjQutC90YPQu9C4XG4gICAgICAgIC8vINCf0LXRgNC10LHQuNGA0LDQtdC8INCy0YHQtSDRjdC70LXQvNC10L3RgtGLIC0g0LjRidC10Lwg0LPRgNCw0L3QuNGG0Ysg0LrRg9C00LAg0LrQu9C40LrQvdGD0LvQuFxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZpcnR1YWxPZmZzZXRYID0gZS5vZmZzZXRYIC0gKHRoaXMucGFyYW1zLmNlbnRlci54KTtcbiAgICAgICAgICAgIGNvbnN0IHZpcnR1YWxPZmZzZXRZID0gZS5vZmZzZXRZIC0gKHRoaXMucGFyYW1zLmNlbnRlci55KTtcblxuICAgICAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncy5ldmVyeSgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsaWNrZWRUaGluZyA9IGNoZWNrU2VsZWN0aW9uKHByZXBhcmVkVGhpbmcsIHZpcnR1YWxPZmZzZXRYLCB2aXJ0dWFsT2Zmc2V0WSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrZWRUaGluZzonLCBjbGlja2VkVGhpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChjbGlja2VkVGhpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gY2xpY2tlZFRoaW5nO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkcmF3VGhpbmdzID0gKHByZXBhcmVkVGhpbmdzOiBQcmVwYXJlZFRoaW5nW10pID0+IHtcbiAgICAgICAgcHJlcGFyZWRUaGluZ3MuZm9yRWFjaCgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmF3UmVjdGFuZ2xlKHByZXBhcmVkVGhpbmcpO1xuXG4gICAgICAgICAgICBpZiAocHJlcGFyZWRUaGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RoaW5ncyhwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRoaW5nU2l6ZSA9ICh0aGluZzogVGhpbmcpID0+IHtcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSB0aGlzLnBhcmFtcy5mb250U2l6ZSAqIHRoaXMucGFyYW1zLnpvb207XG4gICAgICAgIGNvbnN0IHRleHRNZXRyaWNzID0gdGhpcy5nZXRUZXh0U2l6ZSh0aGluZy5uYW1lLCBmb250U2l6ZSk7XG5cbiAgICAgICAgY29uc3QgcCA9IChmb250U2l6ZSAvIDQpO1xuXG4gICAgICAgIGNvbnN0IHJlY3RXID0gKHAgKyB0ZXh0TWV0cmljcy53aWR0aCArIHApO1xuICAgICAgICBjb25zdCByZWN0SCA9IChwICsgZm9udFNpemUgKyBwKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxuICAgICAgICAgICAgd2lkdGg6IHJlY3RXLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0SCxcbiAgICAgICAgICAgIHBhZGRpbmc6IHAsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdSZWN0YW5nbGUgPSAodGhpbmc6IFByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5wYXJhbXMucmVjdENvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGluZy5wb3NpdGlvbi54LCB0aGluZy5wb3NpdGlvbi55LCB0aGluZy5zaXplLndpZHRoLCB0aGluZy5zaXplLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZHJhd1RleHQoXG4gICAgICAgICAgICB0aGluZy5uYW1lLFxuICAgICAgICAgICAgdGhpbmcucG9zaXRpb24ueCArIHRoaW5nLnNpemUucGFkZGluZyxcbiAgICAgICAgICAgIHRoaW5nLnBvc2l0aW9uLnkgKyAodGhpbmcuc2l6ZS5wYWRkaW5nIC8gMikgKyB0aGluZy5zaXplLmZvbnRTaXplLFxuICAgICAgICAgICAgdGhpbmcuc2l6ZS5mb250U2l6ZSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRleHRTaXplID0gKHRleHQ6IHN0cmluZywgZm9udFNpemU6IG51bWJlcik6IFRleHRNZXRyaWNzID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNGb250ID0gdGhpcy5jdHguZm9udDtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IGAke2ZvbnRTaXplfXB4IHNlcmlmYDtcbiAgICAgICAgY29uc3QgbWVhc3VyZWRUZXh0ID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCk7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBwcmV2aW91c0ZvbnQ7XG4gICAgICAgIHJldHVybiBtZWFzdXJlZFRleHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3VGV4dCA9ICh0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCBmb250U2l6ZTogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBzZXJpZmA7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmZvbnRDb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgeCwgeSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3QkcgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmJnQ29sb3I7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KC0odGhpcy5jYW52YXMud2lkdGggLyAyKSwgLSh0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKSwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIC8vIFRPRE86INC/0L7QtNGD0LzQsNGC0Ywg0LzQvtC20L3QviDQu9C4INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDRjdGC0L7RgiDQutC+0YHRgtGL0LvRjFxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgtMTAwMDAsIC0xMDAwMCwgMjAwMDAsIDIwMDAwKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=