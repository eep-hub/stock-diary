document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');
    const journalPage = document.getElementById('journal-page');

    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutBtn = document.getElementById('logout-btn');

    const journalForm = document.getElementById('journal-form');
    const journalEntries = document.getElementById('journal-entries');

    // --- Page Navigation ---
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginPage.style.display = 'none';
        signupPage.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupPage.style.display = 'none';
        loginPage.style.display = 'block';
    });

    // --- Authentication (Dummy) ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, you'd validate credentials here
        loginPage.style.display = 'none';
        journalPage.style.display = 'block';
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, you'd create a user here
        signupPage.style.display = 'none';
        journalPage.style.display = 'block';
    });

    logoutBtn.addEventListener('click', () => {
        journalPage.style.display = 'none';
        loginPage.style.display = 'block';
    });

    // --- Journal Functionality ---
    journalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const ticker = document.getElementById('journal-ticker').value;
        const entryPrice = document.getElementById('journal-entry-price').value;
        const targetPrice = document.getElementById('journal-target-price').value;
        const notes = document.getElementById('journal-notes').value;

        addJournalEntry({ ticker, entryPrice, targetPrice, notes });
        journalForm.reset();
    });

    function addJournalEntry(entry) {
        const entryElement = document.createElement('div');
        entryElement.classList.add('entry');

        entryElement.innerHTML = `
            <h3>${entry.ticker}</h3>
            <p><strong>Entry Price:</strong> ${entry.entryPrice}</p>
            <p><strong>Target Price:</strong> ${entry.targetPrice}</p>
            <p><strong>Notes:</strong> ${entry.notes}</p>
        `;

        journalEntries.appendChild(entryElement);
    }
});
