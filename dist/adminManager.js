"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Classe de validation du Login
class FormValidator {
    // Validation de l'identifiant
    static validateUsername(username) {
        return this.usernameRegex.test(username); // Teste le nom d'utilisateur avec la regex
    }
    // Validation du mot de passe
    static validatePassword(password) {
        return password.length >= this.passwordMinLength; // Teste la longueur du mot de passe
    }
    // Comparaison de l'identifiant et du mot de passe avec une entrée du fichier JSON
    static checkUserCredentials(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Récupère le contenu du JSON
                const response = yield fetch("../collect/admins.json");
                const users = yield response.json();
                return users.find((user) => {
                    user.username === username && user.password === password;
                });
            }
            catch (error) {
                // Si erreur de lecture du JSON
                console.error("Erreur de chargement du fichier JSON des Admins.", error);
                return false;
            }
        });
    }
}
FormValidator.usernameRegex = /^[a-zA-Z]+$/; // Force uniquement les lettres
FormValidator.passwordMinLength = 8; // Longueur du mot de passe: 8 caractères minimum
// Récupère les entrées dans le login et compare avec le JSON (et affiche un message au besoin)
document.addEventListener("DOMContentLoaded", () => {
    // Récupère les ID dans le HTML
    const form = document.getElementById("login-form");
    const message = document.getElementById("validate-form");
    form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        // Récupère les entrées dans la page de LOGIN
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        // Valide les entrées en fonction des critères
        if (!FormValidator.validateUsername(username)) {
            message.textContent = "L’identifiant ne doit contenir que des lettres.";
            return;
        }
        if (!FormValidator.validatePassword(password)) {
            message.textContent = "Le mot de passe doit contenir au moins 8 caractères.";
            return;
        }
        // Si l'opération échoue, affiche un message d'erreur, sinon continue
        const isValid = yield FormValidator.checkUserCredentials(username, password);
        if (isValid) {
            const str = 'accessGranted';
            localStorage.setItem('FletnixAdminHasAccessGranted', str); // Enregistre une valeur quand l'accès est validé
            window.location.href = "../pages/admin.html"; // Redirection vers admin.html
        }
        else {
            message.textContent = "Identifiants incorrects.";
        }
    }));
    form.addEventListener("reset", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        // Efface les messages 
        form.reset();
        message.textContent = "";
    }));
});
