'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab ');
const tabsContent = document.querySelectorAll('.operations__content ');

const nav = document.querySelector('.nav');
const navLink = document.querySelector('.nav__links');
const header = document.querySelector('.header');

const slider = document.querySelector('.slider');

const btnSlide = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const logo = document.querySelector('.nav__logo');

const openModel = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnsOpenModal.forEach(el => el.addEventListener('click', openModel));

const closeModel = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModel);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModel();
});

btnScrollTo.addEventListener('click', function (e) {
  // const sectionScroll = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: sectionScroll.left,
  //   top: sectionScroll.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//cookie element

const message = document.createElement('div');

message.classList.add('cookie-message');
message.innerHTML =
  'we use cookie <button class="btn btn-close--cookie">Close</button>';

header.append(message);

message.style.backgroundColor = '#37383d';
message.style.height = '';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document
  .querySelector('.btn-close--cookie')
  .addEventListener('click', function () {
    message.remove();

    //earlyer
    // message.parentElement.removeChild(message);
  });

navLink.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');

    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

//test Dom traversing the

const h1 = document.querySelector('h1');

//console.log(h1.childNodes);

//only insersted in html element
//console.log(h1.children);

//console.log(h1.firstElementChild);

//console.log(h1.parentNode);
//console.log(h1.parentElement);

//console.log(h1.Sibling);

document.querySelector('.operations').addEventListener('click', function (e) {
  if (e.target.classList.contains('operations__tab')) {
    [...e.target.parentElement.children].forEach(el =>
      el.classList.remove('operations__tab--active')
    );

    e.target.classList.add('operations__tab--active');
    const dataset = e.target.dataset.tab;

    [...tabsContent]
      .find(el => el.classList.contains('operations__content--active'))
      .classList.remove('operations__content--active');

    [...tabsContent]
      .find(el => el.classList.contains(`operations__content--${dataset}`))
      .classList.add('operations__content--active');
  }
});

//hover to nav links opacity

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const exceptTarget = [...e.target.closest('.nav__links').children].filter(
      el => el.firstElementChild != e.target
    );
    exceptTarget.forEach(el => (el.style.opacity = this));
    logo.style.opacity = this;
  }
};

nav.addEventListener(
  'mouseover',

  //first method to put argument in AEL

  // function (e) {
  //   handleHover(e, 0.5);
  // }

  handleHover.bind(0.5)
);

nav.addEventListener('mouseout', handleHover.bind(1));

//sticty nav
// const intialvalue = section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function () {
//   if (window.scrollY > intialvalue) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
const navSize = getComputedStyle(nav).height;

const observerCallback = function (enteries, observer) {
  const [entry] = enteries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navSize}`,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

observer.observe(header);

//section scroll

const observerCallbackSection = function (enteries, observer) {
  const [entry] = enteries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const observerOptionsSection = {
  root: null,
  threshold: 0.2,
};

const sectionAll = document.querySelectorAll('.section');

const observerSection = new IntersectionObserver(
  observerCallbackSection,
  observerOptionsSection
);

sectionAll.forEach(section => {
  // section.classList.add('section--hidden');
  observerSection.observe(section);
});

const imgselector = document.querySelectorAll('img[data-src]');

const observerCallbackImage = function (enteries, observer) {
  const [entry] = enteries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const observerOptionsImage = {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
};

const observerImage = new IntersectionObserver(
  observerCallbackImage,
  observerOptionsImage
);

imgselector.forEach(img => {
  observerImage.observe(img);
});

const allSlider = document.querySelectorAll('.slide');

//set
let currentSlide = 0;
const maxSlide = allSlider.length;
const initalSlider = function () {
  allSlider.forEach(
    (slide, i) => (slide.style.transform = `translateX(${i * 100}%)`)
  );
};
initalSlider();

const gotoSlide = function (slide) {
  allSlider.forEach(
    (slider, i) =>
      (slider.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
  [...dotContainer.children].forEach(el =>
    el.classList.remove('dots__dot--active')
  );
  [...dotContainer.children]
    .find(el => +el.dataset.dot === slide)
    .classList.add('dots__dot--active');
};

allSlider.forEach((_, i) =>
  dotContainer.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot ${
      i === 0 ? 'dots__dot--active' : ''
    }" data-dot=${i}></button>`
  )
);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    currentSlide = +e.target.dataset.dot;
    gotoSlide(currentSlide);
  }
});

const nextslide = function () {
  if (currentSlide === maxSlide - 1) currentSlide = 0;
  else currentSlide++;

  gotoSlide(currentSlide);
};

const prevslide = function () {
  if (currentSlide === 0) currentSlide = maxSlide - 1;
  else currentSlide--;

  gotoSlide(currentSlide);
};

btnRight.addEventListener('click', nextslide);
btnLeft.addEventListener('click', prevslide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevslide();
  if (e.key === 'ArrowRight') nextslide();
});
