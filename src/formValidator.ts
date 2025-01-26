// Importation des utilisateurs provenant du fichier JSON
import users from '../collect/creditcards.json';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  IssuingNetwork: string;
  CardNumber: string;
  Bank: string;
  CVV: number;
  Expiry: string;
};

export class FormValidator {
  private form: HTMLFormElement;
  private firstNameInput: HTMLInputElement;
  private lastNameInput: HTMLInputElement;
  private emailInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private confirmPasswordInput: HTMLInputElement;
  private genderInput: HTMLSelectElement;
  private cardContainer: HTMLElement;
  private addCardButton: HTMLButtonElement;
  private submitButton: HTMLButtonElement;
  private cancelButton: HTMLButtonElement;

  private emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private namePattern = /^[A-Za-z]+$/;
  private cardNumberPattern = /^(4\d{15}|5[1-5]\d{14}|3[47]\d{13})$/; // Visa, MasterCard, AmEx
  private cardExpiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  private cardCVVPattern = /^\d{3}$/;

  constructor() {
    this.firstNameInput = document.getElementById('first-name') as HTMLInputElement;
    this.lastNameInput = document.getElementById('last-name') as HTMLInputElement;
    this.emailInput = document.getElementById('email') as HTMLInputElement;
    this.passwordInput = document.getElementById('password') as HTMLInputElement;
    this.confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement;
    this.genderInput = document.getElementById('gender') as HTMLSelectElement;
    this.cardContainer = document.getElementById('card-container') as HTMLElement;
    this.addCardButton = document.getElementById('add-card') as HTMLButtonElement;
    this.submitButton = document.getElementById('subscribe') as HTMLButtonElement;
    this.cancelButton = document.getElementById('cancel') as HTMLButtonElement;

    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.cancelButton.addEventListener('click', () => this.handleCancel());
    this.addCardButton.addEventListener('click', () => this.addNewCardFields());
  }

  private validateName(name: string): boolean {
    return this.namePattern.test(name);
  }

  private validateEmail(email: string): boolean {
    return this.emailPattern.test(email);
  }

  private validatePassword(password: string, confirmPassword: string): boolean {
    return password === confirmPassword && password.length >= 8;
  }

  private validateCardNumber(cardNumber: string): boolean {
    // Only allow Canadian cards: Visa, MasterCard, AmEx
    return this.cardNumberPattern.test(cardNumber);
  }

  private validateCardExpiry(expiry: string): boolean {
    return this.cardExpiryPattern.test(expiry);
  }

  private validateCardCVV(cvv: string): boolean {
    return this.cardCVVPattern.test(cvv);
  }

  private checkUserExistence(firstName: string, lastName: string, email: string): boolean {
    return users.some(
      (user: User) =>
        user.firstName === firstName &&
        user.lastName === lastName &&
        user.email === email
    );
  }

  private validateCardDetails(cardNumber: string, expiry: string, cvv: string): boolean {
    const matchingCard = users.find(
      (user: User) =>
        user.CardNumber === cardNumber &&
        user.Expiry === expiry &&
        user.CVV.toString() === cvv
    );

    if (!matchingCard) {
      alert('Card details do not match any record.');
      return false;
    }

    return true;
  }

  private addNewCardFields(): void {
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

  private handleSubmit(e: Event): void {
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
      const cardNumber = (cardField.querySelector('.card-number') as HTMLInputElement).value.trim();
      const cardExpiry = (cardField.querySelector('.card-expiry') as HTMLInputElement).value.trim();
      const cardCVV = (cardField.querySelector('.card-cvv') as HTMLInputElement).value.trim();

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
    } else {
      alert('Validation failed! User not found.');
      console.log(false);
    }
  }

  private handleCancel(): void {
    this.form.reset();
    this.cardContainer.innerHTML = ''; // Clear all added card fields
  }
}

