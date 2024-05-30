document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("productModal");
    const modalImg = document.getElementById("modalProductImage");
    const modalName = document.getElementById("modalProductName");
    const modalDescription = document.getElementById("modalProductDescription");
    const modalPrice = document.getElementById("modalProductPrice");
    const closeModal = document.querySelector(".close");
    
    // Function to open the modal with product details
    function openModal(product) {
        modalImg.src = product.image;
        modalName.textContent = product.name;
        modalDescription.textContent = product.description;
        modalPrice.textContent = `Price: ${product.price}`;
        modal.style.display = "flex";
    }

    // Function to close the modal
    function closeModalFunc() {
        modal.style.display = "none";
    }

    // Event listener for closing the modal
    closeModal.addEventListener("click", closeModalFunc);
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            closeModalFunc();
        }
    });

    // Event listener for "View Product Details" buttons
    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", function() {
            const productBox = this.closest(".product-box");
            const product = {
                name: productBox.querySelector(".content h3").textContent.trim(),
                description: productBox.querySelector(".content p:nth-of-type(1)").textContent.trim(),
                price: productBox.querySelector(".content p:nth-of-type(2)").textContent.trim(),
                image: productBox.querySelector("img").getAttribute("src")
            };
            openModal(product);
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const productBox = this.closest(".product-box");
            const product = {
                name: productBox.querySelector(".content h3").textContent.trim(),
                description: productBox.querySelector(".content p:nth-of-type(1)").textContent.trim(),
                price: parseFloat(productBox.querySelector(".content p:nth-of-type(2)").textContent.replace('Price: $', '').trim()),
                quantity: 1
            };

            addToCart(product);
            this.style.display = "none"; // Hide the button after adding to cart
            showAlert("Product added to cart!");
        });
    });

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if product already exists in cart
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += product.quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function showAlert(message) {
        const alertBox = document.createElement("div");
        alertBox.textContent = message;
        alertBox.style.position = "fixed";
        alertBox.style.bottom = "20px";
        alertBox.style.right = "20px";
        alertBox.style.padding = "10px 20px";
        alertBox.style.backgroundColor = "#28a745"; // Green background
        alertBox.style.color = "white";
        alertBox.style.borderRadius = "5px";
        alertBox.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        alertBox.style.zIndex = 1000;

        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 2000); // Remove alert after 3 seconds
    }
});


var slideIndex = 0;
var slides = document.getElementsByClassName("slide");

function showSlides() {
    var i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

showSlides();

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about-section');

    sections.forEach(section => {
        section.addEventListener('click', () => {
            section.classList.toggle('expanded');
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const contactSections = document.querySelectorAll('.contact-section');

    contactSections.forEach(section => {
        section.addEventListener('click', () => {
            section.classList.toggle('expanded');
        });
    });
});
