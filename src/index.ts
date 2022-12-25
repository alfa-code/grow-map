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

type PreparedThing = {
    name: string;
    children?: Array<PreparedThing>
    parent?: PreparedThing;
    position: {
        x: number,
        y: number,
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
        rectColor: string;
    };
    things: Things;
    preparedThings: Things;

    constructor(container: Element, things: Things) {
        this.container = container;
        this.params = {
            bgColor: 'skyblue',
            fontSize: 40,
            fontColor: 'red',
            rectColor: 'white',
        }
        this.things = things;
        this.preparedThings = null;
    }

    prepareThings = () => {
        const { things } = this;

        function prepareThing(thing: Thing, i: number) {
            const preparedThing: PreparedThing = {
                name: thing.name,
                position: {
                    x: 0,
                    y: 0,
                }
            }

            // Вычисляем ширину и высоту


            // Нужно вычислить положение блока - но вычислить его можно токло после того как у предыдущего элемента есть ширина и высота
            // Что бы вычислить ширину и высоту нужно посчитать
            if (i !== 0) {
                preparedThing.position.x = 0;
                preparedThing.position.y = 0;
            }

            if (thing.children) {
                preparedThing.children = thing.children.map(prepareThing);
            }
            
            return preparedThing;
        }

        this.preparedThings = things.map(prepareThing);

        console.log('Things are prepared.');
    }

    init = () => {
        this.prepareThings();

        console.log('App initialization is started.');

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        const w = this.container.clientWidth;
        const h = this.container.clientHeight;

        this.canvas.width = w;
        this.canvas.height = h;
        this.container.appendChild(this.canvas);

        // this.ctx.translate(10, 10);
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

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

        console.log('App is started.');

        window.requestAnimationFrame(() => {
            this.drawBG();
            this.drawRectangle({name: '32523523523523523 \n\n 5235235235235235'});
        });
    }

    reload = () => {
        console.log('App reload is started.');
        this.container.innerHTML = '';
        this.init();
    }

    getThingSize = (thing: Thing) => {
        const fontSize = 16;
        const textMetrics = this.getTextSize(thing.name, fontSize);

        const p = fontSize / 4;

        const rectW = (p + textMetrics.width + p);
        const rectH = (p + this.params.fontSize + p);

        return {
            fontSize: fontSize,
            width: 100,
            height: 100,
        }
    }

    drawRectangle = (thing: any) => {
        this.params.fontSize = 20;
        const textMetrics = this.getTextSize(thing.name, 60);
        console.log('textMetrics:', textMetrics);

        this.ctx.fillStyle = this.params.rectColor;

        const p = this.params.fontSize / 4;

        const rectW = (textMetrics.width + p);
        const rectH = (this.params.fontSize + p);

        this.ctx.fillRect(0, 0, rectW, rectH);
        this.drawText(thing.name, 10, (10 + this.params.fontSize));
    }

    getTextSize = (text: string, fontSize: number): TextMetrics => {
        const previousFont = this.ctx.font;
        this.ctx.font = `${fontSize}px serif`;
        const measuredText = this.ctx.measureText(text);
        this.ctx.font = previousFont;
        return measuredText;
    }

    drawText = (text: string, x: number, y: number) => {
        this.ctx.font = `${this.params.fontSize}px serif`;
        this.ctx.fillStyle = this.params.fontColor;
        this.ctx.fillText(text, x, y);
    }

    drawBG = () => {
        this.ctx.fillStyle = this.params.bgColor;
        this.ctx.fillRect(-(this.canvas.width / 2), -(this.canvas.height / 2), this.canvas.width, this.canvas.height);
    }
}
