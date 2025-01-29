// Importation du fichier des utilisateurs
import users from '../collect/users.json';

type UserType = {
    Firstname: string;
    Lastname: string;
    Email: string;
}

export class User {
    firstname: string;
    lastname: string;
    email: string;
    userMessage: string;

    constructor(
        firstname: string,
        lastname: string,
        email: string,
        userMessage: string,
    ) 
    {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.userMessage = userMessage;
    }

    public addUser(firstName: string, lastName: string, email: string) 
    {
        const userExist = users.find(               // Vérifie si l'utilisateur existe
            u => u.Firstname === firstName && 
                 u.Lastname === lastName
        );

        if (!userExist) {
            const newUser: UserType = {
                Firstname: firstName,
                Lastname: lastName,
                Email: email
            }
            users.push(newUser);
            return this.userMessage = 'L\'utilisateur a été ajouté.';
        } else {
            return this.userMessage = 'Utilisateur existant.';
        }
    }

    public modifyUser(firstName: string, lastName: string, email: string) 
    {
        const userExist = users.find(               // Vérifie si l'utilisateur existe
            u => u.Firstname === firstName && 
                 u.Lastname === lastName
        );

        if (userExist) {
            const modifyUser: UserType = {
                Firstname: firstName,
                Lastname: lastName,
                Email: email
            }
            users.push(modifyUser);
            return this.userMessage = 'Utilisateur modifié.';
        } else {
            return this.userMessage = 'Cet utilisateur ne semble pas exister. Vérifiez le nom et prénom.';
        }
    }

    public deleteUser(firstName: string, lastName: string, email: string) 
    {
        const userExist = users.find(               // Vérifie si l'utilisateur existe
            u => u.Firstname === firstName && 
                 u.Lastname === lastName &&
                 u.Email === email
        );

        if (userExist) {
            const deleteUser: UserType = {
                Firstname: firstName,
                Lastname: lastName,
                Email: ''
            }
            users.splice(users.indexOf(userExist), 1);
            return this.userMessage = 'L\'utilisateur a été effacé.';
        } else {
            return this.userMessage = 'L\'utilisateur n\'existe pas.';
        }
    }

    public getUser(firstName: string, lastName: string, email: string) 
    {
        const userExist = users.find(       // Recherche d'un utilisateur par nom, prénom ou email
            u => u.Firstname === firstName || 
                 u.Lastname === lastName ||
                 u.Email === email
        );

        return userExist;
    }
}