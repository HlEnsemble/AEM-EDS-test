import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];
  const isCarousel = rows.length > 1;

  if (isCarousel) {
    block.classList.add('hero-carousel');
    // Create a wrapper for slides to enable scrolling
    const slider = document.createElement('div');
    slider.classList.add('hero-slider');
    
    rows.forEach((row) => {
      slider.append(row);
    });
    block.append(slider);
  } else {
    block.classList.add('hero-static');
  }

  rows.forEach((row) => {
    row.classList.add('hero-slide');
    
    // Ensure there are two columns: image and content
    const [imageWrapper, contentWrapper] = row.children;
    
    if (imageWrapper) {
      imageWrapper.classList.add('hero-image');
      const img = imageWrapper.querySelector('img');
      if (img) {
        // Optimization: create optimized picture
        imageWrapper.innerHTML = '';
        imageWrapper.append(createOptimizedPicture(img.src, img.alt, true, [{ width: '1600' }]));
      }
    }

    if (contentWrapper) {
      contentWrapper.classList.add('hero-content');
      // Style the CTA button
      const button = contentWrapper.querySelector('a');
      if (button && button.closest('strong')) {
        button.classList.add('button', 'primary');
        button.closest('strong').replaceWith(button); // Remove strong tag wrapper
      }
    }
  });
}
