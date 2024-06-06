window.onload = function() {
    if (document.getElementById('product-list')) {
        fetch('get_products.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const productList = document.getElementById('product-list');
            if (data.length > 0) {
                data.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.className = 'producto-item';
                    productElement.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>$${product.price}</p>
                        <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
                    `;
                    productList.appendChild(productElement);
                });
            } else {
                productList.innerHTML = '<p>No hay productos disponibles.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('product-list').innerHTML = '<p>Error al cargar los productos.</p>';
        });
    }

    if (document.getElementById('cart-list')) {
        fetch('cart.php')
        .then(response => response.json())
        .then(data => {
            const cartList = document.getElementById('cart-list');
            if (data.length > 0) {
                data.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>$${item.price}</p>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    `;
                    cartList.appendChild(cartItem);
                });
            } else {
                cartList.innerHTML = '<p>Your cart is empty.</p>';
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

function addToCart(productId) {
    fetch('update_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=add&product_id=${productId}`
    })
    .then(response => response.json())
    .then(data => {
        alert('Product added to cart!');
    });
}

function removeFromCart(productId) {
    fetch('update_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=remove&product_id=${productId}`
    })
    .then(response => response.json())
    .then(data => {
        alert('Product removed from cart!');
        location.reload();
    });
}
