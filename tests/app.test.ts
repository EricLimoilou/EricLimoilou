import { App, User, Client, Film } from './app';

describe('App Class Tests', () => {
    let app: App;

    beforeEach(() => {
        app = new App();
    });

    // Test de la méthode validateClientForm
    test('validateClientForm should return true for valid inputs', () => {
        expect(app['validateClientForm']('John', 'Doe', 'john.doe@example.com')).toBe(true);
    });

    test('validateClientForm should return false for invalid email', () => {
        expect(app['validateClientForm']('John', 'Doe', 'invalid-email')).toBe(false);
    });

    test('validateClientForm should return false for short name', () => {
        expect(app['validateClientForm']('J', 'Doe', 'john.doe@example.com')).toBe(false);
    });

    // Test de la méthode populateClientsTable
    test('populateClientsTable should populate the clients table', () => {
        // Mocking DOM elements
        document.body.innerHTML = `<table id="clientsTable"></table>`;
        app['populateClientsTable']();
        const table = document.getElementById('clientsTable')! as HTMLTableElement;
        expect(table.rows.length).toBe(3); // 2 clients + 1 header row
    });

    // Test de la méthode populateFilmsTable
    test('populateFilmsTable should populate the films table', () => {
        // Mocking DOM elements
        document.body.innerHTML = `<table id="filmsTable"></table>`;
        app['populateFilmsTable']();
        const table = document.getElementById('filmsTable')! as HTMLTableElement;
        expect(table.rows.length).toBe(3); // 2 films + 1 header row
    });

    // Test de la méthode showAppPage
    test('showAppPage should display the app page and hide the login page', () => {
        // Mocking DOM elements
        document.body.innerHTML = `
            <div id="loginPage" style="display:block;"></div>
            <div id="appPage" style="display:none;"></div>
        `;
        app['showAppPage']();
        expect(document.getElementById('loginPage')!.style.display).toBe('none');
        expect(document.getElementById('appPage')!.style.display).toBe('block');
    });

    // Test de la méthode showLoginPage
    test('showLoginPage should display the login page and hide the app page', () => {
        // Mocking DOM elements
        document.body.innerHTML = `
            <div id="loginPage" style="display:none;"></div>
            <div id="appPage" style="display:block;"></div>
        `;
        app['showLoginPage']();
        expect(document.getElementById('loginPage')!.style.display).toBe('block');
        expect(document.getElementById('appPage')!.style.display).toBe('none');
    });

    // Test de la méthode showActors
    test('showActors should show a list of actors in an alert', () => {
        const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
        app['showActors']('Actor 1, Actor 2');
        expect(spy).toHaveBeenCalledWith('Acteurs : Actor 1, Actor 2');
    });

    // Test de la méthode hideClientModal
    test('hideClientModal should hide the client modal', () => {
        document.body.innerHTML = `<div id="clientModal" style="display:block;"></div>`;
        app['hideClientModal']();
        expect(document.getElementById('clientModal')!.style.display).toBe('none');
    });

    // Test de la méthode showClientModal
    test('showClientModal should show the client modal', () => {
        document.body.innerHTML = `<div id="clientModal" style="display:none;"></div>`;
        app['showClientModal']();
        expect(document.getElementById('clientModal')!.style.display).toBe('flex');
    });
});
