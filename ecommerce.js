'use strict';

// Normal Thums
const thumb1 = document.getElementById('thumb1');
const thumb1Src = (document.getElementById('thumb1').src =
  'images/image-product-1.jpg');
const thumb2 = document.getElementById('thumb2');
const thumb2Src = (document.getElementById('thumb2').src =
  'images/image-product-2.jpg');
const thumb3 = document.getElementById('thumb3');
const thumb3Src = (document.getElementById('thumb3').src =
  'images/image-product-3.jpg');
const thumb4 = document.getElementById('thumb4');
const thumb4Src = (document.getElementById('thumb4').src =
  'images/image-product-4.jpg');

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const input = document.getElementById('input');
const addTC = document.querySelector('.addTC');
const proName = document.querySelector('.pName');
const price = document.querySelector('.price');
const cartCon = document.querySelector('.cartCon');
const emptyCart = document.querySelector('.emptyCart');
const rightSlide = document.querySelector('.slideR');
const leftSlide = document.querySelector('.slideL');
const actThumb = document.querySelector('.Mact');
// const move = document.querySelector('.movingThumb');
const modalMain = document.querySelector('.modalMain');
const closeBt = document.querySelector('.closeBtn');
const closeBt2 = document.querySelector('.mdl');
const cartNum = document.querySelector('.cartNum');
const closeNav = document.querySelector('.closeNav');
const smallScreenNav = document.querySelector('.ulStyle');
const showNav = document.querySelector('.showNav');

// Storing the Normal thumbs and their images in an Array
const thumbs = [thumb1, thumb2, thumb3, thumb4];
const thumbSrc = [thumb1Src, thumb2Src, thumb3Src, thumb4Src];

let cartItems = [];

for (let i = 0; i < thumbs.length; i++) {
  thumbs[i].addEventListener('click', function () {
    document.getElementById('mainImg').src = thumbSrc[i];
    for (let i = 0; i < thumbs.length; i++) {
      if (thumbs[i].classList.contains('fineBorder')) {
        thumbs[i].classList.remove('fineBorder');
      }
    }
    thumbs[i].classList.add('fineBorder');
  });
}

actThumb.addEventListener('click', function () {
  modalMain.classList.remove('hide');
  modalMain.classList.add('show');
});

closeBt.addEventListener('click', function () {
  modalMain.classList.add('hide');
  modalMain.classList.remove('show');
});

minus.addEventListener('click', function () {
  let counter = input.value;
  if (counter > 1) {
    counter--;
    input.value = counter;
  }
  return;
});
plus.addEventListener('click', function () {
  let counter = input.value;
  if (counter >= 1) {
    counter++;
    input.value = counter;
  }
  return;
});

addTC.addEventListener('click', function () {
  const cartItem = {
    id: '1',
    name: 'Fall Limited Edition Sneakers',
    price: 125.0,
    quantity: parseInt(input.value),
  };

  let total = cartItem.price * cartItem.quantity;

  cartNum.classList.remove('hide');
  cartNum.classList.add('show');
  cartNum.textContent = cartItem.quantity;

  const existingItemIndex = cartItems.findIndex(
    (item) => item.name === cartItem.name
  );

  const existingItem = cartItems[existingItemIndex];

  if (existingItem) {
    existingItem.quantity += cartItem.quantity;

    total = cartItem.price * existingItem.quantity;
  }
  // console.log(cartItem.name);
  if (!existingItem) {
    cartItems.push(cartItem);
  }
  const cartBox = cartItems.map(
    (item) => `<div class = "${item.name}"> 
<div class="row p-2">
  <div class="col-2 pe-0">
    <img
      src="../coding_challenge/images/image-product-1-thumbnail.jpg"
      alt=""
    />
  </div>
  <div class="col-8">
    <p class="font1 mb-0">${item.name}</p>
    <span class="font1 d-flex mt-0">
      <p class="me-2">$${item.price}</p>
      <p class="me-1">x</p>
      <p class="me-2 quantity">${item.quantity}</p>
      <p class="fw-bold total">$${total}</p>
    </span>
  </div>
  <div class="col-2 text-center " >
    <i class="fa fa-trash  delete"data-name = ${item.name} data-id = ${item.id}></i>
  </div>
</div>
<div class="text-center p-3">
  <button class="rounded-2 border-0 bgC2 px-5 py-2 w-100 text-light">
    Checkout
  </button>
</div>
</div>
`
  );
  console.log(cartBox);

  if (existingItem) {
    const existingItemQuantity = document.querySelector('.quantity');
    const existingItemTotal = document.querySelector('.total');
    existingItemQuantity.textContent = existingItem.quantity;
    existingItemTotal.textContent = `$${total}`;
    console.log(existingItem.quantity);
    cartNum.textContent = existingItem.quantity;
  } else {
    cartCon.insertAdjacentHTML('afterbegin', cartBox);
  }

  // }
  const deleteBtn = document.querySelector('.delete');

  deleteBtn.addEventListener('click', function (e) {
    const name = e.target.dataset.name;
    const id = e.target.dataset.id;
    const newArray = cartItems.filter((item) => item.id !== id);
    console.log(name);
    console.log(id);
    console.log(newArray);

    const item = document.querySelector(`.${name}`);
    cartItems = newArray;
    cartCon.removeChild(item);
    console.log(cartItems);
    cartNum.textContent = cartItems.length;

    if (cartItems.length === 0) {
      emptyCart.style.display = 'block';
    }
  });

  emptyCart.style.display = 'none';
});

const mImages = document.querySelectorAll('.img');

let counter = 0;
let maxSlide = mImages.length;

const initSlide = (counter) => {
  mImages.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - counter)}%)`)
  );
};

initSlide(0);
activateThumb(0);

rightSlide.addEventListener('click', function () {
  if (counter === maxSlide - 1) {
    counter = 0;
  } else {
    counter++;
  }
  initSlide(counter);
  activateThumb(counter);
});

leftSlide.addEventListener('click', function () {
  if (counter === 0) {
    counter = maxSlide - 1;
  } else {
    counter--;
  }
  initSlide(counter);
  activateThumb(counter);
});

function activateThumb(slide) {
  document
    .querySelectorAll('.thumbPic')
    .forEach((thumb) => thumb.classList.remove('fineBorder'));

  const img = document.querySelector(`.thumbPic[data-slide = "${slide}"]`);
  img.classList.add('fineBorder');
}

document.querySelectorAll('.thumbPic').forEach((item, i) => {
  item.addEventListener('click', function () {
    initSlide(i);
    activateThumb(i);
  });
});

function hideNav() {
  smallScreenNav.classList.add('hide');
  smallScreenNav.classList.remove('show');
}
closeNav.addEventListener('click', hideNav);
smallScreenNav.addEventListener('click', hideNav);

showNav.addEventListener('click', function () {
  smallScreenNav.classList.remove('hide');
  smallScreenNav.classList.add('show');
});
