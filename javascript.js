const colors = [
    '#814545',
    '#b65454', 
    '#D98B8B', 
    '#F0D4D4', 
    '#6e6e6e', 
    '#C0C0C0', 
    '#F0F0F0'
];
const parallaxContainer = document.getElementById('parallax-container');
const rectangleCount = 35;
const rectangles = [];

const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

for (let i = 0; i < rectangleCount; i++) {
    const width = Math.floor(Math.random() * 100) + 30;
    const height = Math.floor(Math.random() * 100) + 30;
    
    const x = Math.random() * (viewportWidth - width);
    
    const y = Math.random() * (viewportHeight * 3) - viewportHeight;
    
    const rectangle = document.createElement('div');
    rectangle.className = 'rectangle';
    rectangle.style.width = `${width}px`;
    rectangle.style.height = `${height}px`;
    rectangle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    rectangle.style.left = `${x}px`;
    rectangle.style.top = `${y}px`;
    
    parallaxContainer.appendChild(rectangle);
    
    const speeds = [0.05, 0.10, 0.15, 0.20, 0.25];
    
    rectangles.push({
        element: rectangle,
        speed: speeds[Math.floor(Math.random() * speeds.length)],
        initialY: y
    });
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    rectangles.forEach(rect => {
        const yPos = scrollY * rect.speed;
        rect.element.style.transform = `translateY(${yPos}px)`;
        
        const rectPosition = rect.element.getBoundingClientRect();
        
        if (rectPosition.top > viewportHeight + 100) {
            const newTop = rect.initialY - (viewportHeight * 2);
            rect.element.style.top = `${newTop}px`;
            rect.initialY = newTop; 
        }
    });
});


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