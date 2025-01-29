// Importation du fichier des utilisateurs
import users from '../collect/users.json';
export class User {
    constructor(firstname, lastname, email, userMessage) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.userMessage = userMessage;
    }
    addUser(firstName, lastName, email) {
        const userExist = users.find(// Vérifie si l'utilisateur existe
        // Vérifie si l'utilisateur existe
        u => u.Firstname === firstName &&
            u.Lastname === lastName);
        if (!userExist) {
            const newUser = {
                Firstname: firstName,
                Lastname: lastName,
                Email: email
            };
            users.push(newUser);
            return this.userMessage = 'L\'utilisateur a été ajouté.';
        }
        else {
            return this.userMessage = 'Utilisateur existant.';
        }
    }
    modifyUser(firstName, lastName, email) {
        const userExist = users.find(// Vérifie si l'utilisateur existe
        // Vérifie si l'utilisateur existe
        u => u.Firstname === firstName &&
            u.Lastname === lastName);
        if (userExist) {
            const modifyUser = {
                Firstname: firstName,
                Lastname: lastName,
                Email: email
            };
            users.push(modifyUser);
            return this.userMessage = 'Utilisateur modifié.';
        }
        else {
            return this.userMessage = 'Cet utilisateur ne semble pas exister. Vérifiez le nom et prénom.';
        }
    }
    deleteUser(firstName, lastName, email) {
        const userExist = users.find(// Vérifie si l'utilisateur existe
        // Vérifie si l'utilisateur existe
        u => u.Firstname === firstName &&
            u.Lastname === lastName &&
            u.Email === email);
        if (userExist) {
            const deleteUser = {
                Firstname: firstName,
                Lastname: lastName,
                Email: ''
            };
            users.splice(users.indexOf(userExist), 1);
            return this.userMessage = 'L\'utilisateur a été effacé.';
        }
        else {
            return this.userMessage = 'L\'utilisateur n\'existe pas.';
        }
    }
    getUser(firstName, lastName, email) {
        const userExist = users.find(// Recherche d'un utilisateur par nom, prénom ou email
        // Recherche d'un utilisateur par nom, prénom ou email
        u => u.Firstname === firstName ||
            u.Lastname === lastName ||
            u.Email === email);
        return userExist;
    }
}
