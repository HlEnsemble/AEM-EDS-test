export default function decorate(block) {
  // The block contains a div with text content
  const content = block.querySelector('div');
  
  // Add simple styling container if needed, but mainly we just need to ensure
  // the class names are ready for CSS.
  if (content) {
    content.classList.add('cta-content');
    
    // Check for specific structure from index.html
    // <h2>Text OUTSIDE to 221900</h2>
    // <p>Get 15% OFF...</p>
    // <p><em>Msg frequency...</em></p>
  }
}

