import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Create container for the rail
  const ul = document.createElement('ul');
  ul.classList.add('product-rail-container');
  
  // check if block has content (links) or needs to fetch
  const link = block.querySelector('a');
  let products = [];

  if (link) {
    // In a real scenario, we might fetch from the link href
    // For now, we'll ignore the link and use mock data or if provided in DOM
    // If the author provided a list of links, we could parse them.
    // Let's assume we want to fetch mock data for this exercise as requested.
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=5');
      if (response.ok) {
        products = await response.json();
      }
    } catch (e) {
      console.error('Error fetching products', e);
    }
  } else {
    // If no link, maybe use some default mock data
     products = [
      { title: "Coleman Cooler", price: 59.99, image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
      { title: "Camping Chair", price: 29.99, image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" },
      { title: "Sleeping Bag", price: 45.00, image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" },
      { title: "Lantern", price: 15.99, image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg" },
      { title: "Tent", price: 120.00, image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg" }
    ];
  }

  if (products.length > 0) {
    products.forEach((product) => {
      const li = document.createElement('li');
      li.classList.add('product-card');
      
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.title;
      
      const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '300' }]);
      
      li.innerHTML = `
        <div class="product-image">
          ${picture.outerHTML}
        </div>
        <div class="product-info">
          <h3>${product.title}</h3>
          <p class="price">$${product.price}</p>
          <button class="add-to-cart">Add to Cart</button>
        </div>
      `;
      ul.append(li);
    });
    block.textContent = '';
    block.append(ul);
  }
}

