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
        // private prepareThing = (thing: Thing, i: number, things: Things, preparedParent?: PreparedThing) => {
        //     const preparedThing: PreparedThing = {
        //         name: thing.name,
        //         position: {
        //             x: 0,
        //             y: 0,
        //         },
        //         size: {
        //             width: null,
        //             height: null,
        //             fontSize: null,
        //             padding: null,
        //         }
        //     }
        //     if (preparedParent) {
        //         preparedThing.parent = preparedParent;
        //     }
        //     // Вычисляем ширину и высоту
        //     const thingSize = this.getThingSize(thing);
        //     preparedThing.size = {
        //         width: thingSize.width,
        //         height: thingSize.height,
        //         fontSize: thingSize.fontSize,
        //         padding: thingSize.padding,
        //     }
        //     if (i !== 0) {
        //         const previousThingSize = this.getThingSize(things[i - 1]);
        //         preparedThing.position.x = previousThingSize.width + this.params.globPadding;
        //         if (preparedParent) {
        //             preparedThing.position.x = (preparedParent.position.x + preparedParent.size.width) + previousThingSize.width + this.params.globPadding;
        //         }
        //     } else {
        //         if (preparedParent) {
        //             preparedThing.position.x = preparedParent.position.x;
        //         }
        //         // if (preparedParent) {
        //         //     preparedThing.position.x = (preparedParent.position.x + preparedParent.size.width) + this.params.globPadding;
        //         // }
        //     }
        //     if (preparedParent) {
        //         preparedThing.position.y = preparedParent.position.y + preparedParent.size.height + this.params.globPadding;
        //     } else {
        //         preparedThing.position.y = 0
        //     }
        //     if (thing.children) {
        //         preparedThing.children = thing.children.map((...props) => {
        //             return this.prepareThing(...props, preparedThing);
        //         });
        //     }
        //     return preparedThing;
        // }
        // private prepareThings = () => {
        //     const { things } = this;
        //     this.preparedThings = things.map(this.prepareThing);
        //     console.log('Things are prepared.');
        // }
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
            // if (i !== 0) {
            //     // Если элемент по ширине не первый - то нужно посчитать ширину их детей
            //     if (preparedThings[i - 1].children) {
            //         const childrenWidth = preparedThings[i - 1].children.reduce((pV, cV) => {
            //             return pV + cV.size.width + this.params.globPadding;
            //         }, 0)
            //         console.log('childrenWidth:', childrenWidth);
            //         // preparedThing.position.x = preparedThing.position.x + childrenWidth;
            //     }
            // }
            var getChildrenWidth = function (children) {
                var commonWidth = 0;
                children.forEach(function (element, index) {
                    if (index === 0) {
                        commonWidth = commonWidth + _this.params.globPadding;
                    }
                    else {
                        commonWidth = commonWidth + element.size.width + _this.params.globPadding;
                    }
                    if (element.children) {
                        var anotherChildrenWidth = getChildrenWidth(element.children);
                        commonWidth = commonWidth + anotherChildrenWidth;
                    }
                });
                commonWidth = commonWidth - _this.params.globPadding;
                return commonWidth;
            };
            if (i !== 0) {
                if (preparedThings[i - 1].children) {
                    // const allChildrenWidth = getChildrenWidth(preparedThings[i - 1].children);
                    var allChildrenWidth_1 = 0;
                    var previousThings = preparedThings.slice(0, i);
                    previousThings.forEach(function (thing) {
                        if (thing.children) {
                            allChildrenWidth_1 = allChildrenWidth_1 + getChildrenWidth(thing.children);
                        }
                    });
                    console.log('allChildrenWidth:', allChildrenWidth_1);
                    preparedThing.position.x = preparedThing.position.x + allChildrenWidth_1;
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
            // this.prepareThings();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQTRWTCxjQUFDO0FBQUQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0dNL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0dNL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9HTS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0dNL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vR00vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqINCa0LDRgNGC0LAg0YDQvtGB0YLQsFxuICogXG4gKiDQotGA0LXQsdC+0LLQsNC90LjRjzpcbiAqICsgMSkg0J/RgNC4INGB0L7Qt9C00LDQvdC40Lgg0LrQsNGA0YLRiyDQvdGD0LbQvdC+INGD0LrQsNC30LDRgtGMINC60L7QvdGC0LXQudC90LXRgFxuICogKyAyKSDQn9GA0Lgg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lgg0LrQsNGA0YLRiyDQsiDQutC+0L3RgtC10LnQvdC10YAg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDQutCw0L3QstCw0YFcbiAqICsgMykg0JrQsNC90LLQsNGBINC00L7Qu9C20LXQvSDRgNCw0YHRgtGP0L3Rg9GC0YzRgdGPINC/0L4g0YDQsNC30LzQtdGA0YMg0LrQvtC90YLQtdC50L3QtdGA0LBcbiAqICsgNCkg0JrQsNC90LLQsNGBINC00L7Qu9C20LXQvSDRgdC70LXQtNC40YLRjCDQt9CwINGA0LDQt9C80LXRgNC+0Lwg0LrQvtC90YLQtdC50L3QtdGA0LAg0Lgg0LXRgdC70Lgg0L7QvSDQvNC10L3Rj9C10YLRgdGPIC0g0L/QtdGA0LXQt9Cw0LPRgNGD0LbQsNGC0Ywg0L/RgNC40LvQvtC20LXQvdC40LVcbiAqIDUpINCa0LDQvdCy0LDRgSDQtNC+0LvQttC10L0g0L/RgNC40L3QuNC80LDRgtGMINC90LAg0LLRhdC+0LQg0L7QsdGK0LXQutGCINC40LvQuCDQvNCw0YHRgdC40LIg0L7QsdGF0LXQutGC0L7QsiDQuCDRgNC40YHQvtCy0LDRgtGMINCz0YDQsNGE0LjQutGDXG4gKiA2KSDQmtCw0LzQtdGA0LAg0LTQvtC70LbQvdCwINGG0LXQvdGC0YDQvtCy0LDRgtGM0YHRjyDQv9C+INCz0LvQsNCy0L3QvtC80YMg0L7QsdGM0LXQutGC0YMg0LjQu9C4INC90LDQsdC+0YDRgyDQs9C70LDQstC90YvRhSDQvtCx0YrQtdC60YLQvtCyXG4gKiA3KSDQkiDQv9GA0L7Qs9GA0LDQvNC80LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINGA0LXQsNC70LjQt9C+0LLQsNC9INC30YPQvFxuICogOCkg0J/RgNC+0LPRgNCw0LzQvNCwINC80L7QttC10YIg0LHRi9GC0Ywg0LfQsNC/0YPRidC10L3QsCDQt9Cw0LfQsNGD0LzQu9C10L3QvtC5INC6INC+0YHQvdC+0LLQvdGL0Lwg0L7QsdC10LrRgtCw0Lwg0LjQu9C4INC+0YXQstCw0YLRi9Cy0LDRjyDQvtCx0YnQuNC5INGA0LDQt9C80LXRgFxuICogOSkg0LzQuNC90LjQvNCw0LvRjNC90YvQuSDQt9GD0Lwg0L7Qv9GA0LXQtNC10LvRj9C10YLRgdGPINGA0LDQt9C80LXRgNC+0Lwg0L7RgdC90L7QstC90L7Qs9C+INCx0LvQvtC60LAgLSDQvNCw0LrRgdC40LzQsNC70YzQvdGL0Lkg0LfRg9C8INC+0YXQstCw0YLQvtC8INCy0YHQtdGFINCx0LvQvtC60L7QsiDQv9C70Y7RgSDQvtGC0YHRgtGD0L/Ri1xuICogMTApINCg0LDQt9C70LjRh9C90YvQtSDQvdCw0YHRgtGA0L7QudC60Lgg0LzQvtC20L3QviDQstGL0LLQvtC00LjRgtGMINC90LAg0Y3QutGA0LDQvSDRh9GC0L7QsdGLINC90LDRgdGC0YDQsNC40LLQsNGC0Ywg0LjRhSDQv9C+0LvQt9GD0L3QutCw0LzQuFxuICogMTEpINCa0LDQttC00YvQuSDRgNC+0LTQuNGC0LXQu9GM0YHQutC40Lkg0L7QsdGK0LXQutGCINC80L7QttC10YIg0LjQvNC10YLRjCDQtNC+0YfQtdGA0L3QuNC5XG4gKiAxMikg0JXRgdC70Lgg0LIg0LTQvtGH0LXRgNC90LXQvCDQvdC1INGD0LrQsNC30LDQvdC+INCyINC60LDQutGD0Y4g0YHRgtC+0YDQvtC90YMg0L7QvSDRgdC80LXRidCw0LXRgtGB0Y8gLSDRgtC+INC+0L0g0YHQvNC10YnQsNC10YLRgdGPINCyINGB0LvRg9GH0LDQudC90YPRjiDRgdGC0L7RgNC+0L3Rg1xuICogMTMpINCU0L7Rh9C10YDQvdC40LUg0Y3Qu9C10LzQtdC90YLRiyDQuNC80LXRjtGCINC+0YLRgdGC0YPQvyDQvtGCINGA0L7QtNC40YLQtdC70YzRgdC60L7QutC+INC4INGC0LDQuiDQttC1INC40LzQtdC10YIg0L7RgtGB0YLRg9C/INC+0YIg0YHQstC+0LjRhSDQutGD0LfQtdC90L7QslxuICogMTQpINCV0YHRgtGMINCy0L7Qt9C80L7QttC90L7RgdGC0Ywg0LzRi9GI0LrQvtC5INC00LLQuNCz0LDRgtGMINC60LDQvNC10YDRg1xuICogMTUpINCjINC/0YDQuNC70L7QttC10L3QuNGPINC10YHRgtGMINC90LXQutC+0YLQvtGA0L7QtSDRgdC+0YHRgtC+0Y/QvdC40LUgLSDRgdC+0YHRgtC+0Y/QvdC40LUg0YXRgNCw0L3QuNGCINC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDQvtCx0LXQutGC0Ysg0Lgg0LjRhSDRgdC+0YHRgtC+0Y/QvdC40LUgKNGA0LDRgdC/0L7Qu9C+0LbQtdC90LjQtSDQuCDRgtCw0Log0LTQsNC70LXQtdC1KVxuICogMTYpINCf0L4g0Y3Qu9C10LzQtdC90YLRgyDQvNC+0LbQvdC+INC60LvQuNC60L3Rg9GC0Ywg0Lgg0L/QvtC70YPRh9C40YLRjCDQsNC60YLQuNCy0LDQuNGA0L7QstCw0L3QvdGL0Lkg0Y3Qu9C10LzQtdC90YIgLSDRjdC70LXQvNC10L3RgiDQvNC+0LbQtdGCINCx0YvRgtGMINC/0L7QtNGB0LLQtdGH0LXQvVxuICogMTcpINCV0YHQu9C4INC/0YDQvtC40YHRhdC+0LTQuNGCINC60LvQuNC6INC/0L4g0LTRgNGD0LPQvtC80YMg0Y3Qu9C10LzQtdC90YLRgyAtINC/0YDQtdC00YvQtNGD0YnQuNC5INC/0LXRgNC10YHRgtCw0LXRgiDQsdGL0YLRjCDQsNC60YLQuNCy0L3Ri9C8XG4gKiAxOCkg0JXRgdC70Lgg0LrQu9C40Log0L3QtSDQsdGL0Lsg0LrQu9C40LrQvdGD0YIg0L3QtSDQv9C+INC+0LTQvdC+0LzRgyDRjdC70LXQvNC10L3RgtGDINGC0L4g0L3QuNC60LDQutC+0LPQviDQsNC60YLQuNCy0L3QvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQvdC10YJcbiAqIDE5KSDQoyDRjdC70LXQvNC10L3RgtC+0LIg0LXRgdGC0Ywgei1pbmRleCAtIHogaW5kZXgg0LLQu9C40Y/QtdGCINC90LAg0L7RgtGA0LjRgdC+0LLQutGDINGN0LvQtdC80LXQvdGC0L7QslxuICogMjApINCS0YHQtSDQutGD0LfQtdC90Ysg0LjQvNC10Y7RgiDQvtC00LjQvSDQuCDRgtC+0YIg0LbQtSDQuNC90LTQtdC60YEgLSDQstGB0LUg0LTQvtGH0LXRgNC90LjQtSDQvdCwINC10LTQuNC90LjRhtGDINCx0L7Qu9GM0YjQtSDRgtC+INC10YHRgtGMINC90LjQttC1XG4gKiAyMSkg0JIg0LrQsNC20LTQvtC8INGN0LvQtdC80LXQvdGC0LUv0LHQu9C+0LrQtSDQvNC+0LbQvdC+INC90LDQv9C40YHQsNGC0Ywg0YLQtdC60YHRgiAtINGC0LXQutGB0YIg0LzQtdC90Y/QtdGCINGA0LDQt9C80LXRgCDQsdC70L7QutCwINGN0LvQtdC80LXQvdGC0LAgLSDQstGB0LUg0L7RgdGC0LDQu9GM0L3Ri9C1INGN0LvQtdC80LXQvdGC0Ysg0L/QvtC00YHRgtGA0LDQstC40LLQsNGO0YLRgdGPINC/0L7QtCDQvdC+0LLRi9C5INGA0LDQt9C80LXRgCDQsdC70L7QutCwXG4gKi9cbnR5cGUgVGhpbmcgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNoaWxkcmVuPzogQXJyYXk8VGhpbmc+XG59XG5cbnR5cGUgVGhpbmdzID0gQXJyYXk8VGhpbmc+O1xuXG50eXBlIFByZXBhcmVkVGhpbmdzID0gUHJlcGFyZWRUaGluZ1tdO1xuXG50eXBlIFByZXBhcmVkVGhpbmcgPSB7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICBjaGlsZHJlbj86IEFycmF5PFByZXBhcmVkVGhpbmc+XG4gICAgcGFyZW50PzogUHJlcGFyZWRUaGluZztcbiAgICBwb3NpdGlvbj86IHtcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgfSxcbiAgICBzaXplPzoge1xuICAgICAgICB3aWR0aDogbnVtYmVyO1xuICAgICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICAgICAgZm9udFNpemU6IG51bWJlcjtcbiAgICAgICAgcGFkZGluZzogbnVtYmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyb3dNYXAge1xuICAgIGNvbnRhaW5lcjogRWxlbWVudDtcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHBhcmFtczoge1xuICAgICAgICBiZ0NvbG9yOiBzdHJpbmc7XG4gICAgICAgIGZvbnRTaXplOiBudW1iZXI7XG4gICAgICAgIGZvbnRDb2xvcjogc3RyaW5nO1xuICAgICAgICByZWN0Q29sb3I6IHN0cmluZztcbiAgICAgICAgZ2xvYlBhZGRpbmc6IG51bWJlcjtcbiAgICB9O1xuICAgIHRoaW5nczogVGhpbmdzO1xuICAgIHByZXBhcmVkVGhpbmdzOiBBcnJheTxQcmVwYXJlZFRoaW5nPjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcjogRWxlbWVudCwgdGhpbmdzOiBUaGluZ3MpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7XG4gICAgICAgICAgICBiZ0NvbG9yOiAnc2t5Ymx1ZScsXG4gICAgICAgICAgICBmb250U2l6ZTogMjYsXG4gICAgICAgICAgICBmb250Q29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgcmVjdENvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgZ2xvYlBhZGRpbmc6IDIwLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGhpbmdzID0gdGhpbmdzO1xuICAgICAgICB0aGlzLnByZXBhcmVkVGhpbmdzID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIHByZXBhcmVUaGluZyA9ICh0aGluZzogVGhpbmcsIGk6IG51bWJlciwgdGhpbmdzOiBUaGluZ3MsIHByZXBhcmVkUGFyZW50PzogUHJlcGFyZWRUaGluZykgPT4ge1xuICAgIC8vICAgICBjb25zdCBwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nID0ge1xuICAgIC8vICAgICAgICAgbmFtZTogdGhpbmcubmFtZSxcbiAgICAvLyAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgLy8gICAgICAgICAgICAgeDogMCxcbiAgICAvLyAgICAgICAgICAgICB5OiAwLFxuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIHNpemU6IHtcbiAgICAvLyAgICAgICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAvLyAgICAgICAgICAgICBoZWlnaHQ6IG51bGwsXG4gICAgLy8gICAgICAgICAgICAgZm9udFNpemU6IG51bGwsXG4gICAgLy8gICAgICAgICAgICAgcGFkZGluZzogbnVsbCxcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIGlmIChwcmVwYXJlZFBhcmVudCkge1xuICAgIC8vICAgICAgICAgcHJlcGFyZWRUaGluZy5wYXJlbnQgPSBwcmVwYXJlZFBhcmVudDtcbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIC8vINCS0YvRh9C40YHQu9GP0LXQvCDRiNC40YDQuNC90YMg0Lgg0LLRi9GB0L7RgtGDXG4gICAgLy8gICAgIGNvbnN0IHRoaW5nU2l6ZSA9IHRoaXMuZ2V0VGhpbmdTaXplKHRoaW5nKTtcblxuICAgIC8vICAgICBwcmVwYXJlZFRoaW5nLnNpemUgPSB7XG4gICAgLy8gICAgICAgICB3aWR0aDogdGhpbmdTaXplLndpZHRoLFxuICAgIC8vICAgICAgICAgaGVpZ2h0OiB0aGluZ1NpemUuaGVpZ2h0LFxuICAgIC8vICAgICAgICAgZm9udFNpemU6IHRoaW5nU2l6ZS5mb250U2l6ZSxcbiAgICAvLyAgICAgICAgIHBhZGRpbmc6IHRoaW5nU2l6ZS5wYWRkaW5nLFxuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgaWYgKGkgIT09IDApIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IHByZXZpb3VzVGhpbmdTaXplID0gdGhpcy5nZXRUaGluZ1NpemUodGhpbmdzW2kgLSAxXSk7XG4gICAgLy8gICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmV2aW91c1RoaW5nU2l6ZS53aWR0aCArIHRoaXMucGFyYW1zLmdsb2JQYWRkaW5nO1xuXG4gICAgLy8gICAgICAgICBpZiAocHJlcGFyZWRQYXJlbnQpIHtcbiAgICAvLyAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSAocHJlcGFyZWRQYXJlbnQucG9zaXRpb24ueCArIHByZXBhcmVkUGFyZW50LnNpemUud2lkdGgpICsgcHJldmlvdXNUaGluZ1NpemUud2lkdGggKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIGlmIChwcmVwYXJlZFBhcmVudCkge1xuICAgIC8vICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IHByZXBhcmVkUGFyZW50LnBvc2l0aW9uLng7XG4gICAgLy8gICAgICAgICB9XG5cbiAgICAvLyAgICAgICAgIC8vIGlmIChwcmVwYXJlZFBhcmVudCkge1xuICAgIC8vICAgICAgICAgLy8gICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueCA9IChwcmVwYXJlZFBhcmVudC5wb3NpdGlvbi54ICsgcHJlcGFyZWRQYXJlbnQuc2l6ZS53aWR0aCkgKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcbiAgICAvLyAgICAgICAgIC8vIH1cbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIGlmIChwcmVwYXJlZFBhcmVudCkge1xuICAgIC8vICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0gcHJlcGFyZWRQYXJlbnQucG9zaXRpb24ueSArIHByZXBhcmVkUGFyZW50LnNpemUuaGVpZ2h0ICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSAwXG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICBpZiAodGhpbmcuY2hpbGRyZW4pIHtcbiAgICAvLyAgICAgICAgIHByZXBhcmVkVGhpbmcuY2hpbGRyZW4gPSB0aGluZy5jaGlsZHJlbi5tYXAoKC4uLnByb3BzKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVRoaW5nKC4uLnByb3BzLCBwcmVwYXJlZFRoaW5nKTtcbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vICAgICB9XG4gICAgICAgIFxuICAgIC8vICAgICByZXR1cm4gcHJlcGFyZWRUaGluZztcbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIHByZXBhcmVUaGluZ3MgPSAoKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IHsgdGhpbmdzIH0gPSB0aGlzO1xuXG4gICAgLy8gICAgIHRoaXMucHJlcGFyZWRUaGluZ3MgPSB0aGluZ3MubWFwKHRoaXMucHJlcGFyZVRoaW5nKTtcblxuICAgIC8vICAgICBjb25zb2xlLmxvZygnVGhpbmdzIGFyZSBwcmVwYXJlZC4nKTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LTQs9C+0YLQsNCy0LvQuNCy0LDQtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDRjdC70LXQvNC10L3RgtC+0LJcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVQb3NpdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJlcGFyZWRUaGluZ3MgPSB0aGlzLnByZXBhcmVkVGhpbmdzLm1hcCh0aGlzLnByZXBhcmVQb3NpdGlvbik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUaGluZ3Mgc2l6ZXMgYXJlIHByZXBhcmVkLicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZVBvc2l0aW9uID0gKHByZXBhcmVkVGhpbmc6IFByZXBhcmVkVGhpbmcsIGk6IG51bWJlciwgcHJlcGFyZWRUaGluZ3M6IFByZXBhcmVkVGhpbmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcGFyZW50IH0gPSBwcmVwYXJlZFRoaW5nO1xuICAgICAgICBjb25zdCB7IGdsb2JQYWRkaW5nIH0gPSB0aGlzLnBhcmFtcztcblxuICAgICAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSAwO1xuICAgICAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucG9zaXRpb24ueSA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZFByZXBhcmVkVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNHYXAgPSBzbGljZWRQcmVwYXJlZFRoaW5ncy5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZSArIGN1cnJlbnRWYWx1ZS5zaXplLndpZHRoICsgZ2xvYlBhZGRpbmc7XG4gICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwcmV2aW91c0dhcDtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgbGV0IGlzUGFyZW50RXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBoaWdoUGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgbGV0IHlQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaXNQYXJlbnRFeGlzdHMpIHtcbiAgICAgICAgICAgICAgICB5UG9zaXRpb24gPSB5UG9zaXRpb24gKyBoaWdoUGFyZW50LnNpemUuaGVpZ2h0ICsgZ2xvYlBhZGRpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGlnaFBhcmVudC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGlnaFBhcmVudCA9IGhpZ2hQYXJlbnQucGFyZW50O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlzUGFyZW50RXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi55ID0geVBvc2l0aW9uO1xuICAgIFxuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlZFRoaW5nLnBvc2l0aW9uLnggPSBwYXJlbnQucG9zaXRpb24ueDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkUHJlcGFyZWRUaGluZ3MgPSBwcmVwYXJlZFRoaW5ncy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXNHYXAgPSBzbGljZWRQcmVwYXJlZFRoaW5ncy5yZWR1Y2UoKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZSArIGN1cnJlbnRWYWx1ZS5zaXplLndpZHRoICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG4gICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICBwcmV2aW91c0dhcCA9IHByZXZpb3VzR2FwICsgcGFyZW50LnBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJldmlvdXNHYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAoaSAhPT0gMCkge1xuICAgICAgICAvLyAgICAgLy8g0JXRgdC70Lgg0Y3Qu9C10LzQtdC90YIg0L/QviDRiNC40YDQuNC90LUg0L3QtSDQv9C10YDQstGL0LkgLSDRgtC+INC90YPQttC90L4g0L/QvtGB0YfQuNGC0LDRgtGMINGI0LjRgNC40L3RgyDQuNGFINC00LXRgtC10LlcbiAgICAgICAgLy8gICAgIGlmIChwcmVwYXJlZFRoaW5nc1tpIC0gMV0uY2hpbGRyZW4pIHtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBjaGlsZHJlbldpZHRoID0gcHJlcGFyZWRUaGluZ3NbaSAtIDFdLmNoaWxkcmVuLnJlZHVjZSgocFYsIGNWKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBwViArIGNWLnNpemUud2lkdGggKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcbiAgICAgICAgLy8gICAgICAgICB9LCAwKVxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCdjaGlsZHJlbldpZHRoOicsIGNoaWxkcmVuV2lkdGgpO1xuXG4gICAgICAgIC8vICAgICAgICAgLy8gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgY2hpbGRyZW5XaWR0aDtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICBjb25zdCBnZXRDaGlsZHJlbldpZHRoID0gKGNoaWxkcmVuOiBQcmVwYXJlZFRoaW5nW10pID0+IHtcbiAgICAgICAgICAgIGxldCBjb21tb25XaWR0aDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggKyB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoICsgZWxlbWVudC5zaXplLndpZHRoICsgdGhpcy5wYXJhbXMuZ2xvYlBhZGRpbmc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5vdGhlckNoaWxkcmVuV2lkdGggPSBnZXRDaGlsZHJlbldpZHRoKGVsZW1lbnQuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICBjb21tb25XaWR0aCA9IGNvbW1vbldpZHRoICsgYW5vdGhlckNoaWxkcmVuV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbW1vbldpZHRoID0gY29tbW9uV2lkdGggLSB0aGlzLnBhcmFtcy5nbG9iUGFkZGluZztcblxuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgICAgIGlmIChwcmVwYXJlZFRoaW5nc1tpIC0gMV0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBhbGxDaGlsZHJlbldpZHRoID0gZ2V0Q2hpbGRyZW5XaWR0aChwcmVwYXJlZFRoaW5nc1tpIC0gMV0uY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIGxldCBhbGxDaGlsZHJlbldpZHRoOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzVGhpbmdzID0gcHJlcGFyZWRUaGluZ3Muc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNUaGluZ3MuZm9yRWFjaCgodGhpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbldpZHRoID0gYWxsQ2hpbGRyZW5XaWR0aCArIGdldENoaWxkcmVuV2lkdGgodGhpbmcuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2FsbENoaWxkcmVuV2lkdGg6JywgYWxsQ2hpbGRyZW5XaWR0aCk7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ID0gcHJlcGFyZWRUaGluZy5wb3NpdGlvbi54ICsgYWxsQ2hpbGRyZW5XaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwcmVwYXJlZFRoaW5nLmNoaWxkcmVuID0gcHJlcGFyZWRUaGluZy5jaGlsZHJlbi5tYXAoKC4uLnByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVBvc2l0aW9uKC4uLnByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJlcGFyZWRUaGluZzsgXG4gICAgfVxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqINCS0YvRh9C40YHQu9GP0LXQvCDRgNCw0LfQvNC10YDRiyDRjdC70LXQvNC10L3RgtC+0LJcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVUaGluZ3NTaXplcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcmVwYXJlZFRoaW5ncyA9IHRoaXMudGhpbmdzLm1hcCh0aGlzLnByZXBhcmVUaGluZ1NpemUpO1xuICAgICAgICBjb25zb2xlLmxvZygnVGhpbmdzIHNpemVzIGFyZSBwcmVwYXJlZC4nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVUaGluZ1NpemUgPSAodGhpbmc6IFRoaW5nLCBpOiBudW1iZXIsIHRoaW5nczogVGhpbmdzLCBwYXJlbnRQcmVwYXJlZFRoaW5nPzogUHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICBjb25zdCBwcmVwYXJlZFRoaW5nOiBQcmVwYXJlZFRoaW5nID0ge1xuICAgICAgICAgICAgc2l6ZToge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgIHg6IG51bGwsXG4gICAgICAgICAgICAgICAgeTogbnVsbCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByZXBhcmVkVGhpbmcubmFtZSA9IHRoaW5nLm5hbWU7XG5cbiAgICAgICAgaWYgKHBhcmVudFByZXBhcmVkVGhpbmcpIHtcbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcucGFyZW50ID0gcGFyZW50UHJlcGFyZWRUaGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCS0YvRh9C40YHQu9GP0LXQvCDRiNC40YDQuNC90YMg0Lgg0LLRi9GB0L7RgtGDINGC0LXQutGB0YLQvtCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcbiAgICAgICAgY29uc3QgdGhpbmdTaXplID0gdGhpcy5nZXRUaGluZ1NpemUodGhpbmcpO1xuXG4gICAgICAgIHByZXBhcmVkVGhpbmcuc2l6ZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGluZ1NpemUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaW5nU2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICBmb250U2l6ZTogdGhpbmdTaXplLmZvbnRTaXplLFxuICAgICAgICAgICAgcGFkZGluZzogdGhpbmdTaXplLnBhZGRpbmcsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpbmcuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHByZXBhcmVkVGhpbmcuY2hpbGRyZW4gPSB0aGluZy5jaGlsZHJlbi5tYXAoKC4uLnByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVRoaW5nU2l6ZSguLi5wcm9wcywgcHJlcGFyZWRUaGluZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHByZXBhcmVkVGhpbmc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIGluaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBcHAgaW5pdGlhbGl6YXRpb24gaXMgc3RhcnRlZC4nKTtcblxuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlVGhpbmdzU2l6ZXMoKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlUG9zaXRpb25zKCk7XG4gICAgICAgIC8vIHRoaXMucHJlcGFyZVRoaW5ncygpO1xuXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLmNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaCA9IHRoaXMuY29udGFpbmVyLmNsaWVudEhlaWdodDtcblxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGg7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcblxuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy5jYW52YXMud2lkdGggLyAyLCB0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKTtcblxuICAgICAgICBjb25zdCBvYnNlcnZlZENvbnRhaW5lckRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHByZXZpb3VzV2lkdGg6IG51bGwsXG4gICAgICAgICAgICBwcmV2aW91c0hlaWdodDogbnVsbCxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgISEob2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzV2lkdGggJiYgb2JzZXJ2ZWRDb250YWluZXJEYXRhLnByZXZpb3VzSGVpZ2h0KSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgKGVudHJpZXNbMF0uY29udGVudFJlY3Qud2lkdGggIT09IG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoKSB8fFxuICAgICAgICAgICAgICAgICAgICAoZW50cmllc1swXS5jb250ZW50UmVjdC5oZWlnaHQgIT09IG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbnRhaW5lciBzaXplIGlzIGNoYW5nZWQgLSByZWxvYWQgdGhlIGFwcC4nKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c1dpZHRoID0gZW50cmllc1swXS5jb250ZW50UmVjdC53aWR0aDtcbiAgICAgICAgICAgIG9ic2VydmVkQ29udGFpbmVyRGF0YS5wcmV2aW91c0hlaWdodCA9IGVudHJpZXNbMF0uY29udGVudFJlY3QuaGVpZ2h0O1xuICAgICAgICB9KTtcbiAgICAgICAgY29udGFpbmVyUmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ0FwcCBpcyBzdGFydGVkLicpO1xuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmF3QkcoKTtcblxuICAgICAgICAgICAgdGhpcy5kcmF3VGhpbmdzKHRoaXMucHJlcGFyZWRUaGluZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkcmF3VGhpbmdzID0gKHByZXBhcmVkVGhpbmdzOiBQcmVwYXJlZFRoaW5nW10pID0+IHtcbiAgICAgICAgcHJlcGFyZWRUaGluZ3MuZm9yRWFjaCgocHJlcGFyZWRUaGluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmF3UmVjdGFuZ2xlKHByZXBhcmVkVGhpbmcpO1xuXG4gICAgICAgICAgICBpZiAocHJlcGFyZWRUaGluZy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RoaW5ncyhwcmVwYXJlZFRoaW5nLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBcHAgcmVsb2FkIGlzIHN0YXJ0ZWQuJyk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRoaW5nU2l6ZSA9ICh0aGluZzogVGhpbmcpID0+IHtcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSB0aGlzLnBhcmFtcy5mb250U2l6ZTtcbiAgICAgICAgY29uc3QgdGV4dE1ldHJpY3MgPSB0aGlzLmdldFRleHRTaXplKHRoaW5nLm5hbWUsIGZvbnRTaXplKTtcblxuICAgICAgICBjb25zdCBwID0gZm9udFNpemUgLyA0O1xuXG4gICAgICAgIGNvbnN0IHJlY3RXID0gKHAgKyB0ZXh0TWV0cmljcy53aWR0aCArIHApO1xuICAgICAgICBjb25zdCByZWN0SCA9IChwICsgdGhpcy5wYXJhbXMuZm9udFNpemUgKyBwKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxuICAgICAgICAgICAgd2lkdGg6IHJlY3RXLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0SCxcbiAgICAgICAgICAgIHBhZGRpbmc6IHAsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdSZWN0YW5nbGUgPSAodGhpbmc6IFByZXBhcmVkVGhpbmcpID0+IHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5wYXJhbXMucmVjdENvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGluZy5wb3NpdGlvbi54LCB0aGluZy5wb3NpdGlvbi55LCB0aGluZy5zaXplLndpZHRoLCB0aGluZy5zaXplLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZHJhd1RleHQoXG4gICAgICAgICAgICB0aGluZy5uYW1lLFxuICAgICAgICAgICAgdGhpbmcucG9zaXRpb24ueCArIHRoaW5nLnNpemUucGFkZGluZyxcbiAgICAgICAgICAgIHRoaW5nLnBvc2l0aW9uLnkgKyAodGhpbmcuc2l6ZS5wYWRkaW5nIC8gMikgKyB0aGluZy5zaXplLmZvbnRTaXplLFxuICAgICAgICApO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRleHRTaXplID0gKHRleHQ6IHN0cmluZywgZm9udFNpemU6IG51bWJlcik6IFRleHRNZXRyaWNzID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNGb250ID0gdGhpcy5jdHguZm9udDtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IGAke2ZvbnRTaXplfXB4IHNlcmlmYDtcbiAgICAgICAgY29uc3QgbWVhc3VyZWRUZXh0ID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCk7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBwcmV2aW91c0ZvbnQ7XG4gICAgICAgIHJldHVybiBtZWFzdXJlZFRleHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3VGV4dCA9ICh0ZXh0OiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgJHt0aGlzLnBhcmFtcy5mb250U2l6ZX1weCBzZXJpZmA7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmZvbnRDb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgeCwgeSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3QkcgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmJnQ29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KC0odGhpcy5jYW52YXMud2lkdGggLyAyKSwgLSh0aGlzLmNhbnZhcy5oZWlnaHQgLyAyKSwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9