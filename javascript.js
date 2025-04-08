function toggleMenu() {
    const navbar = document.getElementById('navbar');
    const overlay = document.querySelector('.overlay');
    const burgerMenu = document.querySelector('.burger-menu');
    burgerMenu.classList.toggle('active');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeMenu() {
    const navbar = document.getElementById('navbar');
    const overlay = document.querySelector('.overlay');
    const burgerMenu = document.querySelector('.burger-menu');
    burgerMenu.classList.remove('active');
    navbar.classList.remove('active');
    overlay.classList.remove('active');
}

let mailText = document.getElementById("mail");
mailText.addEventListener("click", function() {
    navigator.clipboard.writeText(mailText.innerHTML);
    alert("Email copié dans le presse-papier !");
});