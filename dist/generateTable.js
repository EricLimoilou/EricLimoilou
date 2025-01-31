var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function generateUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const tableContainer = document.getElementById("tableContent");
        if (!tableContainer)
            return;
        // Vide la table
        tableContainer.innerHTML = '';
        try {
            const response = yield fetch("../collect/users.json");
            const users = yield response.json();
            // Vide la table sur la page HTML
            let tableHTML = `
            <table border="1">
                <thead>
                    <tr class="ftx-table-row">
                        <th>ID</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Email</th>
                    </tr>
                </thead>
            <tbody>
        `;
            // Remplissage du tableau avec les utilisateurs
            users.forEach((user) => {
                tableHTML += `
                <tr class="ftx-table-row">
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.email}</td>
                </tr>
            `;
            });
            tableHTML += `</tbody></table>`;
            // Insérer la table dans le conteneur HTML
            tableContainer.innerHTML = tableHTML;
        }
        catch (error) {
            console.error("Erreur de chargement des utilisateurs", error);
            tableContainer.innerHTML = "<p>Impossible de charger les utilisateurs.</p>";
        }
    });
}
