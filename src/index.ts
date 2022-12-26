/**
 * Карта роста
 * 
 * Требования:
 * + 1) При создании карты нужно указать контейнер
 * + 2) При инициализации карты в контейнер добавляется канвас
 * + 3) Канвас должен растянуться по размеру контейнера
 * + 4) Канвас должен следить за размером контейнера и если он меняется - перезагружать приложение
 * 5) Канвас должен принимать на вход объект или массив обхектов и рисовать графику
 * 6) Камера должна центроваться по главному обьекту или набору главных объектов
 * 7) В программе должен быть реализован зум
 * 8) Программа может быть запущена зазаумленой к основным обектам или охватывая общий размер
 * 9) минимальный зум определяется размером основного блока - максимальный зум охватом всех блоков плюс отступы
 * 10) Различные настройки можно выводить на экран чтобы настраивать их ползунками
 * 11) Каждый родительский объект может иметь дочерний
 * 12) Если в дочернем не указано в какую сторону он смещается - то он смещается в случайную сторону
 * 13) Дочерние элементы имеют отступ от родительскоко и так же имеет отступ от своих кузенов
 * 14) Есть возможность мышкой двигать камеру
 * 15) У приложения есть некоторое состояние - состояние хранит инициализированные обекты и их состояние (расположение и так далеее)
 * 16) По элементу можно кликнуть и получить активаированный элемент - элемент может быть подсвечен
 * 17) Если происходит клик по другому элементу - предыдущий перестает быть активным
 * 18) Если клик не был кликнут не по одному элементу то никакого активного элемента нет
 * 19) У элементов есть z-index - z index влияет на отрисовку элементов
 * 20) Все кузены имеют один и тот же индекс - все дочерние на единицу больше то есть ниже
 * 21) В каждом элементе/блоке можно написать текст - текст меняет размер блока элемента - все остальные элементы подстравиваются под новый размер блока
 */
type Thing = {
    name: string;
    children?: Array<Thing>
}

type Things = Array<Thing>;

type PreparedThings = PreparedThing[];

type PreparedThing = {
    name?: string;
    children?: Array<PreparedThing>
    parent?: PreparedThing;
    position?: {
        x: number,
        y: number,
    },
    size?: {
        width: number;
        height: number;
        fontSize: number;
        padding: number;
    }
}

export class GrowMap {
    container: Element;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    params: {
        bgColor: string;
        fontSize: number;
        fontColor: string;
        activeFontColor: string;
        rectColor: string;
        activeRectColor: string;
        globPadding: number;
        zoom: number;
        center: {
            x: number;
            y: number;
        },
        drag: {
            isDragging: boolean;
            previousPosition: {
                x: number,
                y: number,
            }
        },
        borders: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }
    };
    things: Things;
    preparedThings: Array<PreparedThing>;
    activeElement: PreparedThing;

    constructor(container: Element, things: Things) {
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
        }
        Object.defineProperty(this.params, 'globPadding', {
            // value: 42,
            // writable: true,
            get() { return this.zoom * 20 },
        });
        this.things = things;
        this.preparedThings = null;
    }

    /**
     * Подготавливаем положение элементов
     */
    private preparePositions = () => {
        this.preparedThings = this.preparedThings.map(this.preparePosition);
    }

    private preparePosition = (preparedThing: PreparedThing, i: number, preparedThings: PreparedThings) => {
        const { parent } = preparedThing;
        const { globPadding } = this.params;

        if (!parent) {
            if (i === 0) {
                preparedThing.position.x = 0;
                preparedThing.position.y = 0;
            } else {
                const slicedPreparedThings = preparedThings.slice(0, i);
                const previousGap = slicedPreparedThings.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue.size.width + globPadding;
                }, 0)
                preparedThing.position.x = previousGap;
                preparedThing.position.y = 0;
            }
        }

        if (parent) {
            let isParentExists = true;
            let highParent = parent;
            let yPosition = 0;
            while (isParentExists) {
                yPosition = yPosition + highParent.size.height + globPadding;

                if (highParent.parent) {
                    highParent = highParent.parent;
                } else {
                    isParentExists = false;
                }
            }
            preparedThing.position.y = yPosition;
    
            if (i === 0) {
                preparedThing.position.x = parent.position.x;
            } else {
                const slicedPreparedThings = preparedThings.slice(0, i);
                let previousGap = slicedPreparedThings.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue.size.width + this.params.globPadding;
                }, 0)
                previousGap = previousGap + parent.position.x;
                preparedThing.position.x = previousGap;
            }
        }

        const getChildrenWidth = (children: PreparedThing[]) => {
            let commonWidth: number = 0;
            children.forEach((element, index) => {
                if (index === 0) {
                    // const biggestElem =  (element.parent.size.width >= element.size.width) ? element.parent.size.width : element.size.width;
                    const smallestElem =  (element.parent.size.width <= element.size.width) ? element.parent.size.width : element.size.width;
                    commonWidth = commonWidth - smallestElem;
                }

                commonWidth = commonWidth + element.size.width + this.params.globPadding;

                if (element.children) {
                    const anotherChildrenWidth = getChildrenWidth(element.children);
                    commonWidth = commonWidth + anotherChildrenWidth;
                }
            });

            commonWidth = commonWidth - this.params.globPadding;

            return commonWidth;
        }

        if (i !== 0) {
            let allChildrenWidth: number = 0;
            const previousThings = preparedThings.slice(0, i);
            previousThings.forEach((thing) => {
                if (thing.children) {
                    allChildrenWidth = allChildrenWidth + getChildrenWidth(thing.children);
                }
                
            });

            preparedThing.position.x = preparedThing.position.x + allChildrenWidth;
        }

        if (preparedThing.children) {
            preparedThing.children = preparedThing.children.map((...props) => {
                return this.preparePosition(...props);
            });
        }
        
        return preparedThing; 
    }
    /**
     * ----------------------
     */

    /**
     * Вычисляем размеры элементов
     */
    private prepareThingsSizes = () => {
        this.preparedThings = this.things.map(this.prepareThingSize);
    }

    private prepareThingSize = (thing: Thing, i: number, things: Things, parentPreparedThing?: PreparedThing) => {
        const preparedThing: PreparedThing = {
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
        }

        preparedThing.name = thing.name;

        if (parentPreparedThing) {
            preparedThing.parent = parentPreparedThing;
        }

        // Вычисляем ширину и высоту текстового элемента
        const thingSize = this.getThingSize(thing);

        preparedThing.size = {
            width: thingSize.width,
            height: thingSize.height,
            fontSize: thingSize.fontSize,
            padding: thingSize.padding,
        }

        if (thing.children) {
            preparedThing.children = thing.children.map((...props) => {
                return this.prepareThingSize(...props, preparedThing);
            });
        }
        
        return preparedThing;
    }
    /**
     * ----------------------
     */

    findBorders = (preparedThing: PreparedThing) => {
        if (preparedThing.position.x <= this.params.borders.left) {
            this.params.borders.left = preparedThing.position.x;
        }

        if (preparedThing.position.y <= this.params.borders.top) {
            this.params.borders.top = preparedThing.position.y;
        }

        if ((preparedThing.position.x + preparedThing.size.width) >= this.params.borders.right) {
            this.params.borders.right = (preparedThing.position.x + preparedThing.size.width);
        }

        if ((preparedThing.position.y + preparedThing.size.height) >= this.params.borders.bottom) {
            this.params.borders.bottom = (preparedThing.position.y + preparedThing.size.height);
        }

        if (preparedThing.children) {
            preparedThing.children.every(this.findBorders);
        }

        return true;
    }

    setBorders = () => {
        this.preparedThings.every(this.findBorders);
    }

    init = () => {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'growMapCanvas';
        this.ctx = this.canvas.getContext('2d');

        const w = this.container.clientWidth;
        const h = this.container.clientHeight;

        this.prepareThingsSizes();
        this.preparePositions();
        this.setBorders();

        this.canvas.width = w;
        this.canvas.height = h;
        this.container.appendChild(this.canvas);

        // Устанавливаем вью в цент всех элементов
        this.params.center.x = (this.canvas.width / 2) - ((this.params.borders.right - this.params.borders.left) / 2);
        this.params.center.y = (this.canvas.height / 2) - ((this.params.borders.bottom - this.params.borders.top) / 2);

        this.ctx.translate(this.params.center.x, this.params.center.y);

        const observedContainerData: any = {
            previousWidth: null,
            previousHeight: null,
        }

        const containerResizeObserver = new ResizeObserver((entries) => {
            if (
                !!(observedContainerData.previousWidth && observedContainerData.previousHeight) &&
                (
                    (entries[0].contentRect.width !== observedContainerData.previousWidth) ||
                    (entries[0].contentRect.height !== observedContainerData.previousHeight)
                )
            ) {
                console.warn('Container size is changed - reload the app.');
                containerResizeObserver.unobserve(this.container);
                this.reload();
            }

            observedContainerData.previousWidth = entries[0].contentRect.width;
            observedContainerData.previousHeight = entries[0].contentRect.height;
        });
        containerResizeObserver.observe(this.container);

        const interval = setInterval(() => {
            this.drawBG();
            this.prepareThingsSizes();
            this.preparePositions();
            this.drawThings(this.preparedThings);

            const elem = document.getElementById('growMapCanvas');
            if (!elem) {
                clearInterval(interval);
            }
        }, 1000 / 30);

        this.canvas.addEventListener('wheel', (event: any) => {
            const deltaY = (event.deltaY / 1000);
            this.params.zoom = this.params.zoom + deltaY;

            if (this.params.zoom > 4) {
                this.params.zoom = 4;
            } else if (this.params.zoom < 0.5) {
                this.params.zoom = 0.5;
            }
        })

        this.canvas.addEventListener('mousedown', (e: any) => {
            this.params.drag.isDragging = true;

            this.params.drag.previousPosition = {
                x: e.offsetX,
                y: e.offsetY,
            }
        });

        this.canvas.addEventListener('mouseup', (e: any) => {
            this.params.drag.isDragging = false;

            this.params.drag.previousPosition = {
                x: e.offsetX,
                y: e.offsetY,
            }
        });

        this.canvas.addEventListener('mousemove', (e: any) => {
            if (this.params.drag.isDragging) {
                let xSlide = e.offsetX - this.params.drag.previousPosition.x;
                let ySlide = e.offsetY - this.params.drag.previousPosition.y;

                this.ctx.translate(xSlide, ySlide);

                this.params.center.x = this.params.center.x + xSlide;
                this.params.center.y = this.params.center.y + ySlide;

                this.params.drag.previousPosition = {
                    x: e.offsetX,
                    y: e.offsetY,
                }
            }
        });

        const checkSelection = (preparedThing: PreparedThing, xPos: number, yPos: number) => {
            const withinTheBordersX =
                (xPos >= (preparedThing.position.x)) &&
                xPos <= (preparedThing.position.x + preparedThing.size.width);

            const withinTheBordersY =
                (yPos >= preparedThing.position.y) &&
                yPos <= (preparedThing.position.y + preparedThing.size.height);

            if (withinTheBordersX) {
                if (withinTheBordersY) {
                    return preparedThing;
                }
            }

            if (preparedThing.children) {
                preparedThing.children.every((preparedThing) => {
                    const clickedThing = checkSelection(preparedThing, xPos, yPos);
                    if (clickedThing) {
                        this.activeElement = clickedThing;
                        return false;
                    } else {
                        this.activeElement = null;
                    }
                    return true;
                });

                if (this.activeElement) {
                    return this.activeElement;
                }
            }

            return null;
        }

        // Кликаем по канвасу - узнаем куда кликнули
        // Перебираем все элементы - ищем границы куда кликнули
        this.canvas.addEventListener('click', (e: any) => {
            const virtualOffsetX = e.offsetX - (this.params.center.x);
            const virtualOffsetY = e.offsetY - (this.params.center.y);

            this.preparedThings.every((preparedThing) => {
                const clickedThing = checkSelection(preparedThing, virtualOffsetX, virtualOffsetY);
                if (clickedThing) {
                    this.activeElement = clickedThing;
                    return false;
                } else {
                    this.activeElement = null;
                }
                return true;
            })
        });
    }

    drawThings = (preparedThings: PreparedThing[]) => {
        preparedThings.forEach((preparedThing) => {
            this.drawRectangle(preparedThing);

            if (preparedThing.children) {
                this.drawThings(preparedThing.children);
            }
        });
    }

    private reload = () => {
        this.container.innerHTML = '';
        this.init();
    }

    private getThingSize = (thing: Thing) => {
        const fontSize = this.params.fontSize * this.params.zoom;
        const textMetrics = this.getTextSize(thing.name, fontSize);

        const p = (fontSize / 4);

        const rectW = (p + textMetrics.width + p);
        const rectH = (p + fontSize + p);

        return {
            fontSize: fontSize,
            width: rectW,
            height: rectH,
            padding: p,
        }
    }

    private drawRectangle = (thing: PreparedThing) => {
        if (thing?.name === this.activeElement?.name) {
            this.ctx.fillStyle = this.params.activeRectColor;
        } else {
            this.ctx.fillStyle = this.params.rectColor;
        }

        this.ctx.fillRect(thing.position.x, thing.position.y, thing.size.width, thing.size.height);

        let fontColor;
        if (thing?.name === this.activeElement?.name) {
            fontColor = this.params.activeFontColor;
        } else {
            fontColor = this.params.fontColor;
        }

        this.drawText(
            thing.name,
            thing.position.x + thing.size.padding,
            thing.position.y + (thing.size.padding / 2) + thing.size.fontSize,
            thing.size.fontSize,
            fontColor,
        );
    }

    private getTextSize = (text: string, fontSize: number): TextMetrics => {
        const previousFont = this.ctx.font;
        this.ctx.font = `${fontSize}px sans-serif`;
        const measuredText = this.ctx.measureText(text);
        this.ctx.font = previousFont;
        return measuredText;
    }

    private drawText = (text: string, x: number, y: number, fontSize: number, fontColor: string) => {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = fontColor;
        this.ctx.fillText(text, x, y);
    }

    private drawBG = () => {
        this.ctx.fillStyle = this.params.bgColor;
        // this.ctx.fillRect(-(this.canvas.width / 2), -(this.canvas.height / 2), this.canvas.width, this.canvas.height);
        // TODO: подумать можно ли использовать этот костыль
        this.ctx.fillRect(-10000, -10000, 20000, 20000);
    }
}
