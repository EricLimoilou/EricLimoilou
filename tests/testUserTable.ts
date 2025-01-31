import { generateUserTable, fetchUsers } from "../src/generateTable";

// Simule un DOM
document.body.innerHTML = `<div id="user-table-container"></div>`;

// Mock des utilisateurs
const mockUsers = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Mock de fetchUsers()
jest.mock("../src/userTable", () => ({
  fetchUsers: jest.fn(() => Promise.resolve(mockUsers)),
  generateUserTable: jest.requireActual("../src/userTable").generateUserTable,
}));

describe("UserTable Tests", () => {
  test("fetchUsers doit retourner la liste des utilisateurs", async () => {
    const users = await fetchUsers();
    expect(users).toEqual(mockUsers);
  });

  test("generateUserTable doit créer un tableau HTML avec les utilisateurs", async () => {
    await generateUserTable();
    const table = document.querySelector("table");
    expect(table).not.toBeNull();
    expect(table?.querySelectorAll("tr").length).toBe(3); // 1 header + 2 users
  });

  test("generateUserTable doit afficher un message si aucun utilisateur", async () => {
    (fetchUsers as jest.Mock).mockResolvedValueOnce([]);
    await generateUserTable();
    expect(document.body.innerHTML).toContain("Aucun utilisateur trouvé.");
  });
});
