import { carouselImages } from '../dist/carouselImages.js';
import { Carousel } from '../dist/carousel.js';
// import { FormValidator } from './formValidator';

const carousel = new Carousel(carouselImages, 'carouselId');
carousel.initCarousel();

// let validator = new FormValidator();
// if (validator) {
//     let getAccessGranted = localStorage.getItem('getAccessGranted') || null;
//     if (getAccessGranted) {
//         const loc = "../selectUser.html";
//         window.location.replace('');
//     } else {
//         const loc = "/index.html";
//         window.location.replace(loc);
//     }
// }