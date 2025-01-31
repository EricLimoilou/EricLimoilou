var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class UserManager {
    constructor() {
        this.users = [];
        this.loadUsers();
    }
    loadUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("../collect/users.json");
                this.users = yield response.json();
            }
            catch (error) {
                console.error("Erreur de chargement du fichier JSON", error);
            }
        });
    }
    getAllUsers() {
        return this.users;
    }
    getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }
    addUser(username, password) {
        if (this.getUserByUsername(username)) {
            console.log("Utilisateur déjà existant.");
            return false;
        }
        const newUser = {
            id: this.users.length + 1,
            username,
            password
        };
        this.users.push(newUser);
        console.log("Utilisateur ajouté :", newUser);
        return true;
    }
    updateUser(username, newPassword) {
        const user = this.getUserByUsername(username);
        if (user) {
            user.password = newPassword;
            console.log("Mot de passe mis à jour pour :", username);
            return true;
        }
        else {
            console.log("Utilisateur introuvable.");
            return false;
        }
    }
    deleteUser(username) {
        const index = this.users.findIndex(user => user.username === username);
        if (index !== -1) {
            this.users.splice(index, 1);
            console.log("Utilisateur supprimé :", username);
            return true;
        }
        else {
            console.log("Utilisateur introuvable.");
            return false;
        }
    }
    readUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("users.json");
                const users = yield response.json();
                // Trier par ordre alphabétique du nom d'utilisateur
                return users.sort((a, b) => a.username.localeCompare(b.username));
            }
            catch (error) {
                console.error("Erreur de lecture du fichier JSON", error);
                return [];
            }
        });
    }
}
