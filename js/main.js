import { carouselImages } from '../dist/carouselImages.js';
import { Carousel } from '../dist/carousel.js';
import { FormValidator } from '../dist/formValidator.js';
import { User } from '../dist/user.js';

const carousel = new Carousel(carouselImages, 'carouselId');
carousel.initCarousel();

let formValidator = new FormValidator();
let isValidForm = formValidator.getValidity();
if (isValidForm) {
    console.log('ACCESS GRANTED')
//     let getAccessGranted = localStorage.getItem('getAccessGranted') || null;
//     if (getAccessGranted) {
//         const loc = "../selectUser.html";
//         window.location.replace('');
//     } else {
//         const loc = "/index.html";
//         window.location.replace(loc);
//     }
}

