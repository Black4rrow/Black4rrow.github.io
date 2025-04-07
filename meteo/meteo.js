let images = [];

for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function() {
        const src = this.getAttribute('src');
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `<span class="close">&times;</span><img class="modal-content" id="img01" src="${src}">`;
        document.body.appendChild(modal);
        const span = modal.querySelector('.close');
        span.onclick = function() {
            modal.remove();
        }
    });
}