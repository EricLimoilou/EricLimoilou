export async function generateUserTable() {
    const tableContainer = document.getElementById("tableContent");

    if (!tableContainer) return;

    // Vide la table
    tableContainer.innerHTML = '';

    try {
        const response = await fetch("../collect/users.json");
        const users = await response.json();

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
        users.forEach((user: { id: number; firstname: string; lastname: string; email: string }) => {
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
    } catch (error) {
        console.error("Erreur de chargement des utilisateurs", error);
        tableContainer.innerHTML = "<p>Impossible de charger les utilisateurs.</p>";
    }
}
