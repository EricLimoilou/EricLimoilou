export interface User {
    id: number;
    username: string;
    password: string;
}

export class UserManager {
    private users: User[] = [];

    constructor() {
        this.loadUsers();
    }

    private async loadUsers() {
        try {
            const response = await fetch("../collect/users.json");
            this.users = await response.json();
        } catch (error) {
            console.error("Erreur de chargement du fichier JSON", error);
        }
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getUserByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }

    addUser(username: string, password: string): boolean {
        if (this.getUserByUsername(username)) {
            console.log("Utilisateur déjà existant.");
            return false;
        }
        const newUser: User = {
            id: this.users.length + 1,
            username,
            password
        };
        this.users.push(newUser);
        console.log("Utilisateur ajouté :", newUser);
        return true;
    }

    updateUser(username: string, newPassword: string): boolean {
        const user = this.getUserByUsername(username);
        if (user) {
            user.password = newPassword;
            console.log("Mot de passe mis à jour pour :", username);
            return true;
        } else {
            console.log("Utilisateur introuvable.");
            return false;
        }
    }

    deleteUser(username: string): boolean {
        const index = this.users.findIndex(user => user.username === username);
        if (index !== -1) {
            this.users.splice(index, 1);
            console.log("Utilisateur supprimé :", username);
            return true;
        } else {
            console.log("Utilisateur introuvable.");
            return false;
        }
    }

    async readUsers(): Promise<User[]> {
        try {
            const response = await fetch("users.json");
            const users: User[] = await response.json();

            // Trier par ordre alphabétique du nom d'utilisateur
            return users.sort((a, b) => a.username.localeCompare(b.username));
        } catch (error) {
            console.error("Erreur de lecture du fichier JSON", error);
            return [];
        }
    }
}
