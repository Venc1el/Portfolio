class Box {
  constructor(element, position) {
    this.DOM = {
      el: element,
      bg: element.querySelector('.grim__item-bg'),
      inner: element.querySelector('.grim__item-content > .grim__item-inner'),
      link: element.querySelector('.grim__link'),
    };
    this.position = position;
  }

  open() {
    return new Promise((resolve, reject) => {
      this.DOM.bg.style.transformOrigin = this.position % 2 === 0 ? '50% 100%' : '0% 50%';

      anime.remove(this.DOM.bg);
      anime({
        targets: this.DOM.bg,
        duration: this.DOM.bg.dataset.duration || 30 + this.position * 20,
        easing: this.DOM.bg.dataset.easing || 'easeInOutQuad',
        opacity: {
          value: 1,
          duration: 1,
        },
        scaleY: this.position % 2 === 0 ? [0, 1] : 1,
        scaleX: Math.abs(this.position % 2) == 1 ? [0, 1] : 1,
        complete: resolve,
      });

      if (this.DOM.inner) {
        anime.remove(this.DOM.inner);
        anime({
          targets: this.DOM.inner,
          duration: 1300,
          delay: 550,
          easing: 'easeOutExpo',
          opacity: {
            value: 1,
            duration: 1,
          },
          translateY: ['100%', '0%'],
        });
      }
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.DOM.bg.style.transformOrigin = this.position % 2 === 0 ? '50% 0%' : '100% 50%';

      anime.remove(this.DOM.bg);
      anime({
        targets: this.DOM.bg,
        duration: this.DOM.bg.dataset.duration || 10 + this.position * 10,
        easing: this.DOM.bg.dataset.easing || 'easeInOutQuad',
        opacity: {
          value: 0,
          delay: this.DOM.bg.dataset.duration || 10 + this.position * 10,
          duration: 1,
        },
        scaleY: this.position % 2 === 0 ? [1, 0] : 1,
        scaleX: Math.abs(this.position % 2) == 1 ? [1, 0] : 1,
        complete: resolve,
      });

      if (this.DOM.inner) {
        anime.remove(this.DOM.inner);
        anime({
          targets: this.DOM.inner,
          duration: 100,
          easing: 'linear',
          opacity: 0,
        });
      }
    });
  }
}

class Menu {
  constructor(element) {
    this.DOM = {
      el: element,
      items: Array.from(element.querySelectorAll('.grim__item')),
    };
    this.itemsTotal = this.DOM.items.length;
    this.boxes = this.DOM.items.map((item, index) => new Box(item, index));

    this.initEvents();
  }

  initEvents() {
    this.boxes.forEach((box) => {
      const link = box.DOM.link;
      if (link) {
        link.addEventListener('click', (event) => {
          this.close();
        });
      }
    });  

    document.addEventListener('click', (event) => {
      const menuTrigger = document.querySelector('.menu-trigger');
      const grimMenu = document.querySelector('.grim');

      if (!menuTrigger.contains(event.target) && !grimMenu.contains(event.target)) {
        this.close();
      }
    });
  }

  open() {
    this.toggle('open');
  }

  close() {
    this.toggle('close');
  }

  toggle(action) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    action === 'open' ? this.openBoxes() : this.closeBoxes();
  }

  openBoxes(position = 0) {
    this.toggleBoxes('open', position);
  }

  closeBoxes(position = 0) {
    this.toggleBoxes('close', position);
  }

  toggleBoxes(action, position) {
    if (position >= this.itemsTotal) {
      this.isAnimating = false;
      return;
    }
    this.DOM.el.classList[action === 'open' ? 'add' : 'remove']('grim--open');
    const box = this.boxes[position];
    box[action === 'open' ? 'open' : 'close']().then(() => this[action === 'open' ? 'openBoxes' : 'closeBoxes'](position + 1));
  }
}

const DOM = {};
DOM.grim = document.querySelector('.grim');
DOM.menu = new Menu(DOM.grim);
DOM.menuCtrls = {
  open: document.querySelector('.menu-trigger'),
  close: document.querySelector('.menu-trigger--close'),
};

DOM.menuCtrls.open.addEventListener('click', () => DOM.menu.open());
DOM.menuCtrls.close.addEventListener('click', () => DOM.menu.close());



//-------------------------------------------------------------------------

const texts = [
  "Hello, There!",
  "Welcome to my website!",
  "Feel free to explore.",
  "Enjoy your stay!"
];

const textElement = document.getElementById("text");
let textIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < texts[textIndex].length) {
    textElement.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100); 
  } else {
    textElement.textContent = texts[textIndex]; 
    setTimeout(erase, 3000); 
  }
}

function erase() {
  if (charIndex > 0) {
    textElement.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50); 
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 500); 
  }
}

function blinkCursor() {
  const cursor = document.getElementById("cursor");
  cursor.style.visibility = cursor.style.visibility === "visible" ? "hidden" : "visible";
  setTimeout(blinkCursor, 500); // Delay for cursor blinking
}

// Start the animation
document.addEventListener("DOMContentLoaded", () => {
  type();
  blinkCursor();
});

//-----------------------------------------------------------------------------------------------------------------
function playSound() {
  var clickSound = document.getElementById("clickSound");
  clickSound.play();
}