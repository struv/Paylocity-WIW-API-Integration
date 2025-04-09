// Main JavaScript for the When I Work + Paylocity Integration Tutorial

document.addEventListener('DOMContentLoaded', function() {
  // Navigation active state
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('nav li');
  
  // Progress bar animation
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    setTimeout(() => {
      progressBar.style.width = '100%';
      progressBar.classList.add('completed');
      
      // Show confetti animation when progress bar completes
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 2000);
    }, 1000);
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update active navigation item
        navItems.forEach(item => {
          item.classList.remove('active');
        });
        
        const navItem = document.querySelector(`nav li a[href="${targetId}"]`).parentElement;
        navItem.classList.add('active');
      }
    });
  });
  
  // Update active navigation item on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.querySelector('a').getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
  
  // Add terminal styling to code blocks
  document.querySelectorAll('pre[data-title]').forEach(pre => {
    const title = pre.getAttribute('data-title');
    const terminal = document.createElement('div');
    terminal.classList.add('terminal');
    
    const terminalHeader = document.createElement('div');
    terminalHeader.classList.add('terminal-header');
    
    const redButton = document.createElement('div');
    redButton.classList.add('terminal-button', 'red');
    
    const yellowButton = document.createElement('div');
    yellowButton.classList.add('terminal-button', 'yellow');
    
    const greenButton = document.createElement('div');
    greenButton.classList.add('terminal-button', 'green');
    
    const terminalTitle = document.createElement('div');
    terminalTitle.classList.add('terminal-title');
    terminalTitle.textContent = title;
    
    terminalHeader.appendChild(redButton);
    terminalHeader.appendChild(yellowButton);
    terminalHeader.appendChild(greenButton);
    terminalHeader.appendChild(terminalTitle);
    
    const terminalContent = document.createElement('div');
    terminalContent.classList.add('terminal-content');
    
    // Move the pre element into the terminal content
    pre.parentNode.insertBefore(terminal, pre);
    terminalContent.appendChild(pre);
    
    terminal.appendChild(terminalHeader);
    terminal.appendChild(terminalContent);
  });
});
