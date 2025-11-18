export default function decorate(block) {
  // The block should contain one row with multiple columns
  const row = block.children[0];
  if (!row) return;

  // Add class to the row to act as the scrolling container
  row.classList.add('icon-carousel-container');

  const cols = [...row.children];
  cols.forEach((col) => {
    col.classList.add('icon-item');
    // Clean up structure: ensure img and p are properly styled
    const img = col.querySelector('img');
    const txt = col.querySelector('p');
    
    if (img) {
      // Add loading="lazy" to icons as they are likely below fold or small
      img.loading = 'lazy';
    }
  });
}

