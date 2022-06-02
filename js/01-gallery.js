import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = onCreateGalleryItemsMarkup(galleryItems);
let galleryLightbox;

galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);
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

    const originalImg = image.dataset.source;
    galleryLightbox = basicLightbox.create(`
    <div class="modal">
        <img
        src="${originalImg}"
        alt="${image.alt}"
        width="1120" 
        height="740"
        />
    </div>
`,
    {
        onShow: (instance) => {
            instance.element().querySelector('img').onclick = galleryLightbox.close
            document.addEventListener('keydown', onEscPress);
        },
        onClose: (instance) => {
            document.removeEventListener('keydown', onEscPress);
        }
    })
    
    galleryLightbox.show()
}

function onEscPress(e) {
    if (e.code === 'Escape') {
        galleryLightbox.close();
    }
}