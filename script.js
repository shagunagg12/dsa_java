// Sample book data to mimic a database
let books = [
    {
        id: 1,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        sellerName: "John Doe",
        phone: "123-456-7890",
        price: 10,
        rating: 4.0,
    },
    {
        id: 2,
        name: "1984",
        author: "George Orwell",
        sellerName: "Jane Smith",
        phone: "987-654-3210",
        price: 12,
        rating: 5.0,
    },
];

// Function to get users from local storage
function getUsers() {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

// Function to save users to local storage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Initialize users from local storage
let users = getUsers();

// Function to handle user login
function handleLogin(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        alert("Login successful!");
        loggedInUser = user;
        document.getElementById("login-form").reset();
        window.location.href = 'buy.html'; // Redirect to buy page after login
    } else {
        alert("Invalid username or password! Please create an account.");
        window.location.href = 'create-account.html'; // Redirect to create account page
    }
}

// Function to handle account creation
function handleCreateAccount(event) {
    event.preventDefault(); // Prevent form submission
    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;

    // Check if the username already exists
    const existingUser = users.find((u) => u.username === newUsername);
    if (existingUser) {
        alert("Username already exists! Please choose another.");
    } else {
        // Add new user to the user array
        users.push({ username: newUsername, password: newPassword });
        saveUsers(users); // Save users to local storage
        alert("Account created successfully! You can now log in.");
        document.getElementById("create-account-form").reset();
        window.location.href = 'login.html'; // Redirect to login page
    }
}

// Function to render available books
function renderBooks() {
    const bookListContainer = document.querySelector('.book-list');
    bookListContainer.innerHTML = ''; // Clear previous entries

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <h3>${book.name}</h3>
            <p>Author: ${book.author}</p>
            <p>Seller: ${book.sellerName}</p>
            <p>Phone: ${book.phone}</p>
            <p>Price: $${book.price}</p>
            <div class="rating">Rating: ${book.rating}</div>
            <button onclick="contactSeller('${book.phone}')">Contact Seller</button>
        `;
        bookListContainer.appendChild(bookItem);
    });
}

// Function to contact the seller
function contactSeller(phone) {
    alert(`Contact the seller at: ${phone}`);
}

// Render books on purchase page load
if (document.querySelector('.book-list')) {
    renderBooks();
}

// Attach login event listener for login form
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Attach create account event listener for create account form
if (document.getElementById('create-account-form')) {
    document.getElementById('create-account-form').addEventListener('submit', handleCreateAccount);
}
