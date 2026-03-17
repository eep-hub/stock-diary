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
    const journalEntriesContainer = document.getElementById('journal-entries');

    let entries = [];

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
        loginPage.style.display = 'none';
        journalPage.style.display = 'block';
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
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

        const newEntry = {
            ticker: document.getElementById('journal-ticker').value,
            entryPrice: document.getElementById('journal-entry-price').value,
            targetPrice: document.getElementById('journal-target-price').value,
            notes: document.getElementById('journal-notes').value,
            date: new Date(),
        };

        entries.push(newEntry);
        renderJournalEntries();
        journalForm.reset();
    });

    function renderJournalEntries() {
        journalEntriesContainer.innerHTML = '<h2>Entries</h2>'; // Clear previous entries

        // Group entries by date
        const groupedEntries = entries.reduce((acc, entry) => {
            const date = entry.date.toISOString().split('T')[0]; // Get YYYY-MM-DD
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(entry);
            return acc;
        }, {});

        // Sort dates descending
        const sortedDates = Object.keys(groupedEntries).sort((a, b) => new Date(b) - new Date(a));

        for (const date of sortedDates) {
            const dateHeader = document.createElement('h3');
            dateHeader.textContent = date;
            journalEntriesContainer.appendChild(dateHeader);

            for (const entry of groupedEntries[date]) {
                const entryElement = document.createElement('div');
                entryElement.classList.add('entry');

                entryElement.innerHTML = `
                    <h4>${entry.ticker}</h4>
                    <p><strong>Entry Price:</strong> ${entry.entryPrice}</p>
                    <p><strong>Target Price:</strong> ${entry.targetPrice}</p>
                    <p><strong>Notes:</strong> ${entry.notes}</p>
                `;
                journalEntriesContainer.appendChild(entryElement);
            }
        }
    }
});
