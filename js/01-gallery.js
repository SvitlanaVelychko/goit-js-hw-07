import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryContainer = document.querySelector('.gallery');
const galleryItemsMarkup = onCreateGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryItemsMarkup);

galleryContainer.addEventListener('click', onGalleryImageClick);

function onCreateGalleryItemsMarkup(items) {
    return items
        .map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
            </a>
        </div>`;
        })
        .join('');
}

function onGalleryImageClick(e) {
    e.preventDefault();

    const image = e.target;

    if (!image.classList.contains('gallery__image')) {
        return;
    }

    console.log(image.dataset.source);
}

console.log(galleryItems);