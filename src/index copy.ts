import * as PIXI from 'pixi.js';

interface Options {
    container: Node;
    data: any;
}

type DataItem = {
    name: string;
    children: Array<DataItem>;
}

// borderColor
// : 
// 16706423
// children
// : 
// [{…}]
// fillColor
// : 
// 16706423
// height
// : 
// 100
// name
// : 
// "main"
// thing
// : 
// _Graphics {_events: Events, _eventsCount: 0, tempDisplayObjectParent: null, transform: _Transform, alpha: 1, …}
// width
// : 
// 100
// x
// : 
// 0
// y
// : 
// 0

export class GrowMap {
    container: Node;
    app: PIXI.Application<PIXI.ICanvas>;
    data: Array<DataItem>;
    graphics: any;
    zoom: number = 1;
    pixiMainContainer: any;
    drag = {
        isDragging: false,
        previousPosition: {
            x: 0,
            y: 0,
            containerX: 0,
            containerY: 0,
        }
    }

    constructor(options: Options) {
        // Сохраняем html элемент в который будем вставлять canvas
        this.container = options.container;
        this.data = options.data;
    }

    /**
     * Рисует графику
     */
    drawGraphics = (graphics: any) => {
        graphics.forEach((graphicItem: any, i: number) => {
            // Если элемент графики имеет родителя, то нужно проверить на коллизии
            if (graphicItem.parent) {
                graphicItem.y = graphicItem.parent.y + graphicItem.parent.height + 30;
            }

            if ((i === 0) && graphicItem.parent) {
                graphicItem.x = (graphicItem.parent.x + graphicItem.parent.width) + 30;
            }

            if (i !== 0) {
                graphicItem.x = graphics[i - 1].x + graphics[i - 1].width + 30;
            }

            graphicItem.thing.clear();
            graphicItem.thing.lineStyle(2, graphicItem.borderColor, 1);
            graphicItem.thing.beginFill(graphicItem.fillColor);
            graphicItem.thing.drawRect(graphicItem.x, graphicItem.y, graphicItem.width, graphicItem.height);

            if (graphicItem.children) {
                this.drawGraphics(graphicItem.children)
            }
        });
    }

    changeZoom = () => {
        this.app.stage.scale.x = this.zoom;
        this.app.stage.scale.y = this.zoom;
    }

    /**
     * Инициализирует данные в рабочие объекты
     */
    initThings = (thingData: any, parent?: any) => {
        return thingData.map((t: any) => {
            const thing = new PIXI.Graphics();

            // this.app.stage.addChild(thing);
            this.pixiMainContainer.addChild(thing);

            const thingObject: any = {
                name: t.name,
                thing: thing,
                width: 100,
                height: 100,
                x: 10,
                y: 10,
                fillColor: 0xFEEB77,
                borderColor: 0xFEEB77,
            }

            if (parent) {
                thingObject.parent = parent;
            }

            if (Array.isArray(t.children)) {
                thingObject.children = this.initThings(t.children, thingObject);
            }

            return thingObject;
        })
    }

    // Инициализирует проект
    init = () => {
        this.pixiMainContainer = new PIXI.Container();
        this.app.stage.addChild(this.pixiMainContainer);

        this.graphics = this.initThings(this.data)

        this.app.ticker.add(() => {
            this.drawGraphics(this.graphics);
        });
    }

    showThings = () => {
        console.dir(this.graphics)
    }

    start = () => {
        // @ts-ignore
        this.app = new PIXI.Application({ background: '#1099bb' });

        this.changeZoom();

        const { app } = this;

        const canvas: any = app.view;

        canvas.addEventListener('wheel', (e: any) => {
            this.zoom = this.zoom + (e.deltaY / 100);

            if (this.zoom > 4) {
                this.zoom = 4;
            } else if (this.zoom < 0.5) {
                this.zoom = 0.5;
            }
            this.changeZoom();
        })

        canvas.addEventListener('mousedown', (e: any) => {
            this.drag.isDragging = true;

            this.drag.previousPosition = {
                x: e.offsetX,
                y: e.offsetY,
                containerX: this.pixiMainContainer.x,
                containerY: this.pixiMainContainer.y,
            }
        });

        canvas.addEventListener('mouseup', (e: any) => {
            this.drag.isDragging = false;

            this.drag.previousPosition = {
                x: e.offsetX,
                y: e.offsetY,
                containerX: this.pixiMainContainer.x,
                containerY: this.pixiMainContainer.y,
            }
        });

        canvas.addEventListener('mousemove', (e: any) => {
            if (this.drag.isDragging) {
                let xSlide = e.offsetX - this.drag.previousPosition.x;
                let ySlide = e.offsetY - this.drag.previousPosition.y;

                this.pixiMainContainer.x = this.drag.previousPosition.containerX + (xSlide / this.zoom);
                this.pixiMainContainer.y = this.drag.previousPosition.containerY + (ySlide / this.zoom);
            }
        });

        document.addEventListener('mouseup', (e: any) => {
            this.drag.isDragging = false;

            this.drag.previousPosition = {
                x: e.offsetX,
                y: e.offsetY,
                containerX: this.pixiMainContainer.x,
                containerY: this.pixiMainContainer.y,
            }
        })

        this.container.appendChild(canvas);

        // Создаем Pixi контейнер
        const container = new PIXI.Container();

        // Добавляем его на рабочий стол
        // @ts-ignore
        app.stage.addChild(container);

        this.init();
    }
}

