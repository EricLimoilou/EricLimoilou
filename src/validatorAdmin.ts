// Classe de validation du Login
export class FormValidator {
  private static usernameRegex = /^[a-zA-Z]+$/;     // Force uniquement les lettres
  private static passwordMinLength = 8;             // Longueur du mot de passe: 8 caractères minimum

  // Validation de l'identifiant
  static validateUsername(username: string): boolean {
    return this.usernameRegex.test(username);
  }

  // Validation du mot de passe
  static validatePassword(password: string): boolean {
    return password.length >= this.passwordMinLength;
  }

  // Comparaison de l'identifiant et du mot de passe avec une entrée du fichier JSON
  static async checkUserCredentials(username: string, password: string): Promise<boolean> {
    try {
        // Récupère le contenu du JSON
        const response = await fetch("../collect/admins.json");
        const users = await response.json();
        return users.some((user: { username: string, password: string }) =>
            user.username === username && user.password === password
        );
    } catch (error) {
        // Si erreur de lecture du JSON
        console.error("Erreur de chargement du fichier JSON des Admins.", error);
        return false;
    }
  }
}

// Récupère les entrées dans le login et compare avec le JSON (et affiche un message au besoin)
document.addEventListener("DOMContentLoaded", () => {
  // Récupère les ID dans le HTML
  const form = document.getElementById("login-form") as HTMLFormElement;
  const message = document.getElementById("validate-form") as HTMLParagraphElement;

  form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Récupère les entrées dans la page de LOGIN
      const username = (document.getElementById("username") as HTMLInputElement).value.trim();
      const password = (document.getElementById("password") as HTMLInputElement).value;

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
      const isValid = await FormValidator.checkUserCredentials(username, password);
      message.textContent = isValid ? "Connexion réussie !" : "Identifiants incorrects.";
  });
});