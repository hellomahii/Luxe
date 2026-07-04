const glow = document.querySelector(".mouse-glow");
const image = document.querySelector(".hero-image img");
const cursor = document.querySelector(".custom-cursor");

/* MOUSE GLOW */

if (glow) {

  document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

  });

}

/* HERO IMAGE  */

if (image) {

  image.addEventListener("mousemove", (e) => {

    const rect = image.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 25;
    const rotateX = ((y / rect.height) - 0.5) * -25;

    image.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
    `;

  });

  image.addEventListener("mouseleave", () => {

    image.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

  });

}

/*PRODUCT CARD */

document.querySelectorAll(".product-card").forEach((card) => {

  const cardGlow = card.querySelector(".card-glow");

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ry = ((x / rect.width) - 0.5) * 22;
    const rx = ((y / rect.height) - 0.5) * -22;

    card.style.transform = `
  perspective(1000px)
  translateZ(0)
  rotateX(${rx}deg)
  rotateY(${ry}deg)
  scale(1.03)
`;

    if (cardGlow) {

      cardGlow.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(255,255,255,0.4),
          transparent 60%
        )
      `;

    }

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0)
rotateX(0deg)
rotateY(0deg)
scale(1)
    `;

  });

});

/*PRODUCT REVEAL*/

document.querySelectorAll(".product-card").forEach((card, index) => {

  setTimeout(() => {

    card.classList.add("show");

  }, index * 200);

});

/*CART SIDEBAR */

let cart = [];

const cartSidebar = document.querySelector(".cart-sidebar");
const cartIcon = document.querySelector(".cart-icon");
const closeCart = document.querySelector(".close-cart");

const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartCount = document.querySelector(".cart-count");

/* OPEN CART */

if (cartIcon && cartSidebar) {

  cartIcon.addEventListener("click", () => {

    cartSidebar.classList.add("active");

  });

}

/* CLOSE CART */

if (closeCart && cartSidebar) {

  closeCart.addEventListener("click", () => {

    cartSidebar.classList.remove("active");

  });

}

/* UPDATE CART */

function updateCart() {

  if (!cartItems || !cartTotal || !cartCount) return;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price;

    cartItems.innerHTML += `

      <div class="cart-item">

        <img src="${item.image}" alt="">

        <div class="cart-item-info">

          <h4>${item.name}</h4>

          <p>₹${item.price}</p>

          <button class="remove-item" data-index="${index}">
            Remove
          </button>

        </div>

      </div>

    `;

  });

  cartCount.textContent = cart.length;

  cartTotal.textContent = `₹${total}`;

}

/* ADD TO CART */

document.addEventListener("click", (e) => {

  const btn = e.target.closest(".card-btn");

  if (!btn) return;

  const product = {

    name: btn.dataset.name,

    price: Number(btn.dataset.price),

    image: btn.dataset.image

  };

  cart.push(product);

  updateCart();

});

/* REMOVE ITEM */

document.addEventListener("click", (e) => {

  if (e.target.classList.contains("remove-item")) {

    const index = e.target.dataset.index;

    cart.splice(index, 1);

    updateCart();

  }

});

/* LENIS SMOOTH SCROLL */

if (typeof Lenis !== "undefined") {

  const lenis = new Lenis({

    duration: 1.2,

    smoothWheel: true,

    easing: (t) => 1 - Math.pow(1 - t, 3)

  });

  function raf(time) {

    lenis.raf(time);

    requestAnimationFrame(raf);

  }

  requestAnimationFrame(raf);

}

/*GSAP ANIMATIONS */

if (typeof gsap !== "undefined") {

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".reveal").forEach((section) => {

    gsap.to(section, {

      opacity: 1,

      y: 0,

      duration: 1.4,

      ease: "power3.out",

      scrollTrigger: {

        trigger: section,

        start: "top 80%",

      }

    });

  });

  gsap.from(".hero-content > *", {

    y: 80,

    opacity: 0,

    duration: 1.2,

    stagger: 0.2,

    ease: "power4.out"

  });

  gsap.to(".hero-image img", {

    y: -20,

    duration: 3,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

  });

}

/* CUSTOM CURSOR*/

if (cursor) {

  document.addEventListener("mousemove", (e) => {

    cursor.animate({

      left: `${e.clientX}px`,
      top: `${e.clientY}px`

    }, {

      duration: 80,
      fill: "forwards"

    });

  });

  document.querySelectorAll("a, button, .product-card").forEach((el) => {

    el.addEventListener("mouseenter", () => {

      cursor.classList.add("hover");

    });

    el.addEventListener("mouseleave", () => {

      cursor.classList.remove("hover");

    });

  });

}

/*NAVBAR SCROLL */

const navbar = document.querySelector(".navbar");

if (navbar) {

  window.addEventListener("scroll", () => {

    navbar.classList.toggle("scrolled", window.scrollY > 50);

  });

}

/*LOADER */

window.addEventListener("load", () => {

  const loader = document.querySelector(".loader");

  if (loader) {

    setTimeout(() => {

      loader.classList.add("hide");

    }, 1800);

  }

});