const CONTAINER = Symbol('container');
const SOURCE_DATA = Symbol('sourceData');
const IS_TOUCH = Symbol('isTouch');
let config = {
    container: null, // 传递个dom对象
    isTouch: true, // 是否支持手势拖动
    isAnimal: true, // 是否动画
    sourceData: [], // 基础数据
};

class Carousel {
    constructor(config) {
        this[CONTAINER]= config.container;
        this._handler = null;
        this[SOURCE_DATA] = config.sourceData;

        this.created();
    }

    created() {
        for (let d of this.data) {
            let e = document.createElement("img");
            e.src = d;
            this[CONTAINER].appendChild(e);
            e.style.zIndex = i++;
        }
        // 绑定手势事件
        enableGesture(this[CONTAINER]);
    }

    render() {
        let i = data.length;
        for (let d of this.data) {
            let e = document.createElement("img");
            e.src = d;
            this[CONTAINER].appendChild(e);
            e.style.zIndex = i++;
            // e.onclick = event => console.log(d);
        }
        let tl = new Timeline();

        let children = Array.prototype.slice.call(container.children);
        let position = 0;
        let offsetTimeStart = 0;
        let nextPicture = () => {
            let nextPosition = position + 1;

            nextPosition = nextPosition % children.length;

            let current = children[position],
                next = children[nextPosition];
            //把next摆到正确的位置
            //next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

            offsetTimeStart = Date.now();

            tl.addAnimation(new DOMElementStyleNumberAnimation(
                current,
                "transform",
                0, -500 * position,
                1000, -500 - 500 * position,
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

            position = nextPosition;

            nextPictureTimer = setTimeout(nextPicture, 3000);
        };
        let nextPictureTimer = setTimeout(nextPicture, 3000);


        let startTransform;

        let offset = 0;
        this[CONTAINER].addEventListener("mousedown", event => {
            //startTransform = - position * 500;
            tl.pause();

            let currentTime = Date.now();
            if (currentTime - offsetTimeStart < 1000) {
                offset = 500 - ease((currentTime - offsetTimeStart) / 1000) * 500;
                console.log(offset);
            } else {
                offset = 0;
            }

            clearTimeout(nextPictureTimer);
        });
        this[CONTAINER].addEventListener("pan", event => {
            // event.origin.preventDefault();
            let current = children[position];

            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + position - 1) % children.length;
            let last = children[lastPosition];
            last.style.transition = "ease 0s";
            last.style.transform = `translate(${-500 - 500 * lastPosition + event.dx + offset}px)`;

            next.style.transition = "ease 0s";
            next.style.transform = `translate(${500 - 500 * nextPosition + event.dx + offset}px)`;

            current.style.transition = "ease 0s";
            current.style.transform = `translate(${-500 * position + event.dx + offset}px)`;
        });
        this[CONTAINER].addEventListener("panend", event => {
            // event.origin.preventDefault();
            let isLeft;
            if (event.isFlick) {
                if (event.dx > 0) {
                    position--;
                    isLeft = true;
                }

                if (event.dx < 0) {
                    position++;
                    isLeft = false;
                }

            } else {
                if (event.dx > 250) {
                    position--;
                    isLeft = true;
                } else if (event.dx < -250) {
                    position++;
                    isLeft = false;
                } else {
                    isLeft = event.dx <= 0;
                }

                //position = (Math.round((position * 500 - event.dx) / 500));
            }
            position = (children.length + position) % children.length;

            let current = children[position];
            let nextPosition = (position + 1) % children.length;
            let next = children[nextPosition];
            let lastPosition = (children.length + position - 1) % children.length;
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
            current.style.transform = `translate(${-500 * position}px)`;

        });

        this[CONTAINER].addEventListener("mousedown", event => event.preventDefault());

    }
}