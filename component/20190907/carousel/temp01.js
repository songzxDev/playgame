const PROPERTY_SYMBOL = Symbol('property');
const ATTRIBUTE_SYMBOL = Symbol('attribute');
const EVENT_SYMBOL = Symbol('event');
const STATE_SYMBOL = Symbol('state');


class Carousel {
    constructor(config) {
        this[ATTRIBUTE_SYMBOL] = Object.create(null); // attribute类型使用此类型创建
        this[PROPERTY_SYMBOL] = Object.create(null); // property类型使用此类型创建
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);
        this.init(config);
    }

    init(config) {
        this[ATTRIBUTE_SYMBOL].container = config.container;
        this[ATTRIBUTE_SYMBOL].pictures = config.pictures;

        this[ATTRIBUTE_SYMBOL].position = 0; // 私有属性
        this[ATTRIBUTE_SYMBOL].offsetTimeStart = 0; // 私有属性
        this[ATTRIBUTE_SYMBOL].nextPictureTimer = null; // 私有属性
        this[ATTRIBUTE_SYMBOL].timeline = new Timeline(); // 私有属性
        let data = this[ATTRIBUTE_SYMBOL].pictures;
        let i = data.length;
        for (let d of data) {
            let e = document.createElement("img");
            e.src = d;
            this[ATTRIBUTE_SYMBOL].container.appendChild(e);
            e.style.zIndex = i++;
        }
        this[ATTRIBUTE_SYMBOL].children = Array.prototype.slice.call(this[ATTRIBUTE_SYMBOL].container.children);
        this.mounted();
    }


    render() {
        this[ATTRIBUTE_SYMBOL].nextPictureTimer = setTimeout(() => this.nextPicture(), 3000);
    }

    nextPicture() {
        let children = this[ATTRIBUTE_SYMBOL].children;
        let tl = this[ATTRIBUTE_SYMBOL].timeline;
        let nextPosition = this[ATTRIBUTE_SYMBOL].position + 1;

        nextPosition = nextPosition % children.length;

        let current = children[this[ATTRIBUTE_SYMBOL].position], next = children[nextPosition];
        //把next摆到正确的位置
        //next.style.transition = "ease 0s";
        next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

        this[ATTRIBUTE_SYMBOL].offsetTimeStart = Date.now();

        tl.addAnimation(new DOMElementStyleNumberAnimation(
            current,
            "transform",
            0, -500 * this[ATTRIBUTE_SYMBOL].position,
            1000, -500 - 500 * this[ATTRIBUTE_SYMBOL].position,
            (v) => `translateX(${v}px)`
        ));
        tl.addAnimation(new DOMElementStyleNumberAnimation(
            next,
            "transform",
            0, 500 - 500 * nextPosition,
            1000, -500 * nextPosition,
            (v) => `translateX(${v}px)`
        ));
        tl.restart();

        this[ATTRIBUTE_SYMBOL].position = nextPosition;


        this[ATTRIBUTE_SYMBOL].nextPictureTimer = setTimeout(() => this.nextPicture(), 3000);
    }


    mounted() {
        let startTransform;

        let offset = 0;
        this[ATTRIBUTE_SYMBOL].container.addEventListener("mousedown", event => {
            //startTransform = - position * 500;
            let tl = this[ATTRIBUTE_SYMBOL].timeline;
            tl.pause();

            let currentTime = Date.now();
            if (currentTime - this[ATTRIBUTE_SYMBOL].offsetTimeStart < 1000) {
                offset = 500 - ease((currentTime - this[ATTRIBUTE_SYMBOL].offsetTimeStart) / 1000) * 500;
                console.log(offset);
            } else {
                offset = 0;
            }

            clearTimeout(this[ATTRIBUTE_SYMBOL].nextPictureTimer);
        });
        this[ATTRIBUTE_SYMBOL].container.addEventListener("pan", event => {
            // event.origin.preventDefault();
            let children = this[ATTRIBUTE_SYMBOL].children;
            let current = children[this[ATTRIBUTE_SYMBOL].position];

            let nextPosition = (this[ATTRIBUTE_SYMBOL].position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + this[ATTRIBUTE_SYMBOL].position - 1) % children.length;
            let last = children[lastPosition];
            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`;

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${500 - 500 * nextPosition + event.dx + offset}px)`;

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${-500 * this[ATTRIBUTE_SYMBOL].position + event.dx + offset}px)`;
        });
        this[ATTRIBUTE_SYMBOL].container.addEventListener("panend", event => {
            let children = this[ATTRIBUTE_SYMBOL].children;
            // event.origin.preventDefault();
            let isLeft;
            if (event.isFlick) {
                if (event.dx > 0) {
                    this[ATTRIBUTE_SYMBOL].position--;
                    isLeft = true;
                }

                if (event.dx < 0) {
                    this[ATTRIBUTE_SYMBOL].position++;
                    isLeft = false;
                }

            } else {
                if (event.dx > 250) {
                    this[ATTRIBUTE_SYMBOL].position--;
                    isLeft = true;
                } else if (event.dx < -250) {
                    this[ATTRIBUTE_SYMBOL].position++;
                    isLeft = false;
                } else {
                    isLeft = event.dx <= 0;
                }

                //position = (Math.round((position * 500 - event.dx) / 500));
            }
            this[ATTRIBUTE_SYMBOL].position = (children.length + this[ATTRIBUTE_SYMBOL].position) % children.length;

            let current = children[this[ATTRIBUTE_SYMBOL].position];
            let nextPosition = (this[ATTRIBUTE_SYMBOL].position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + this[ATTRIBUTE_SYMBOL].position - 1) % children.length;
            let last = children[lastPosition];

            if (!isLeft) {
                last.style.transition = "";
            } else {
                last.style.transition = "ease 0s";
            }
            last.style.transform = `translate(${-500 - 500 * lastPosition}px)`;

            if (isLeft) {
                next.style.transition = "";
            } else {
                next.style.transition = "ease 0s";
            }
            next.style.transform = `translate(${500 - 500 * nextPosition}px)`;

            current.style.transition = "";
            current.style.transform = `translate(${-500 * this[ATTRIBUTE_SYMBOL].position}px)`;


        });

        this[ATTRIBUTE_SYMBOL].container.addEventListener("mousedown", event => event.preventDefault());
    }

    get container() {
        return this[ATTRIBUTE_SYMBOL].container;
    }

    set container(container) {
        return this[ATTRIBUTE_SYMBOL].container = container;
    }

    get isTouch() {
        return this[ATTRIBUTE_SYMBOL].isTouch;
    }

    set isTouch(value) {
        if (value) // 是否支持手势拖动
            enableGesture(container);
        return this[ATTRIBUTE_SYMBOL].isTouch = value;
    }

    get pictures() { // 基础数据
        return this[ATTRIBUTE_SYMBOL].pictures;
    }

    set pictures(pictures) {
        return this[ATTRIBUTE_SYMBOL].pictures = pictures;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            this[EVENT_SYMBOL][type] = new Set();
        }
        this[EVENT_SYMBOL][type].add(listener);
    }

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type]) {
            return;
        }
        this[EVENT_SYMBOL][type].delete(listener);
    }

    triggerEvent(type) {
        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this);
        }
    }
}