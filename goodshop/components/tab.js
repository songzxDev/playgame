const ATTRIBUTE = Symbol('attribute');
class Tab {
    constructor(tabNames) {
        this[ATTRIBUTE] = Object.create(null);
        this[ATTRIBUTE].tabNames = tabNames;
        this.created();
    }
    created() {
        let ul = document.createElement('ul');
        for (let child of children) {
            let child = document.createElement('li');
            child.addEventListener('click', function (event) {
                text.innerHTML = '';
                children.map(item => {
                    item.classList.remove('curr');
                    return item;
                });
                child.classList.add('curr');
                text.innerText = child.innerText;
            }, {passive: false});
        }
    }
    appendTo(parent) {

    }
}