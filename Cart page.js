document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch cart items from localStorage
    function getCartItems() {
        const cartItems = localStorage.getItem('cartItems');
        return cartItems ? JSON.parse(cartItems) : [];
    }

    // Function to display cart items
    function displayCartItems() {
        const cartItems = getCartItems();
        const cartItemsContainer = document.getElementById('cart-items');
        
        // Clear previous items
        cartItemsContainer.innerHTML = '';

        // Display each cart item
        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.textContent = `Product: ${item.name}, Quantity: ${item.quantity}`;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }

    // Initial display of cart items
    displayCartItems();

    // Example: Add an item to the cart
    const addToCartButton = document.getElementById('add-to-cart-button');
    addToCartButton.addEventListener('click', function() {
        const newItem = {
            name: 'Product X',
            quantity: 1
        };

        const cartItems = getCartItems();
        cartItems.push(newItem);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update cart display
        displayCartItems();

        alert('Item added to cart!');
    });
});
