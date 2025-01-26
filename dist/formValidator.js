// Importation des utilisateurs provenant du fichier JSON
import users from '../collect/creditcards.json';
export class FormValidator {
    constructor() {
        this.emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.namePattern = /^[A-Za-z]+$/;
        this.cardNumberPattern = /^(4\d{15}|5[1-5]\d{14}|3[47]\d{13})$/; // Visa, MasterCard, AmEx
        this.cardExpiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        this.cardCVVPattern = /^\d{3}$/;
        this.firstNameInput = document.getElementById('first-name');
        this.lastNameInput = document.getElementById('last-name');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.confirmPasswordInput = document.getElementById('confirm-password');
        this.genderInput = document.getElementById('gender');
        this.cardContainer = document.getElementById('card-container');
        this.addCardButton = document.getElementById('add-card');
        this.submitButton = document.getElementById('subscribe');
        this.cancelButton = document.getElementById('cancel');
        this.addEventListeners();
    }
    addEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelButton.addEventListener('click', () => this.handleCancel());
        this.addCardButton.addEventListener('click', () => this.addNewCardFields());
    }
    validateName(name) {
        return this.namePattern.test(name);
    }
    validateEmail(email) {
        return this.emailPattern.test(email);
    }
    validatePassword(password, confirmPassword) {
        return password === confirmPassword && password.length >= 8;
    }
    validateCardNumber(cardNumber) {
        // Only allow Canadian cards: Visa, MasterCard, AmEx
        return this.cardNumberPattern.test(cardNumber);
    }
    validateCardExpiry(expiry) {
        return this.cardExpiryPattern.test(expiry);
    }
    validateCardCVV(cvv) {
        return this.cardCVVPattern.test(cvv);
    }
    checkUserExistence(firstName, lastName, email) {
        return users.some((user) => user.firstName === firstName &&
            user.lastName === lastName &&
            user.email === email);
    }
    validateCardDetails(cardNumber, expiry, cvv) {
        const matchingCard = users.find((user) => user.CardNumber === cardNumber &&
            user.Expiry === expiry &&
            user.CVV.toString() === cvv);
        if (!matchingCard) {
            alert('Card details do not match any record.');
            return false;
        }
        return true;
    }
    addNewCardFields() {
        const cardFields = document.createElement('div');
        cardFields.classList.add('card-fields');
        cardFields.innerHTML = `
      <div>
        <label>Card Number:</label>
        <input type="text" class="card-number" placeholder="Enter card number" />
      </div>
      <div>
        <label>Expiry Date (MM/YY):</label>
        <input type="text" class="card-expiry" placeholder="MM/YY" />
      </div>
      <div>
        <label>CVV:</label>
        <input type="text" class="card-cvv" placeholder="CVV" />
      </div>
    `;
        this.cardContainer.appendChild(cardFields);
    }
    handleSubmit(e) {
        e.preventDefault();
        const firstName = this.firstNameInput.value.trim();
        const lastName = this.lastNameInput.value.trim();
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        const confirmPassword = this.confirmPasswordInput.value;
        const gender = this.genderInput.value;
        if (!this.validateName(firstName)) {
            alert('Invalid first name. Only letters are allowed.');
            return;
        }
        if (!this.validateName(lastName)) {
            alert('Invalid last name. Only letters are allowed.');
            return;
        }
        if (!this.validateEmail(email)) {
            alert('Invalid email address.');
            return;
        }
        if (!this.validatePassword(password, confirmPassword)) {
            alert('Passwords do not match or are less than 8 characters.');
            return;
        }
        const cardFields = this.cardContainer.querySelectorAll('.card-fields');
        for (const cardField of cardFields) {
            const cardNumber = cardField.querySelector('.card-number').value.trim();
            const cardExpiry = cardField.querySelector('.card-expiry').value.trim();
            const cardCVV = cardField.querySelector('.card-cvv').value.trim();
            if (!this.validateCardNumber(cardNumber)) {
                alert('Invalid card number. Must be a Canadian Visa, MasterCard, or AmEx.');
                return;
            }
            if (!this.validateCardExpiry(cardExpiry)) {
                alert('Invalid card expiry. Use MM/YY format.');
                return;
            }
            if (!this.validateCardCVV(cardCVV)) {
                alert('Invalid CVV. Must be 3 digits.');
                return;
            }
            if (!this.validateCardDetails(cardNumber, cardExpiry, cardCVV)) {
                return;
            }
        }
        const userExists = this.checkUserExistence(firstName, lastName, email);
        if (userExists) {
            alert('Validation successful!');
            console.log(true);
        }
        else {
            alert('Validation failed! User not found.');
            console.log(false);
        }
    }
    handleCancel() {
        this.form.reset();
        this.cardContainer.innerHTML = ''; // Clear all added card fields
    }
}
