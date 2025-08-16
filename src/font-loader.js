// Font loading optimization
(function() {
    // Check if fonts are already cached
    if (sessionStorage.getItem('fontsLoaded')) {
        document.documentElement.classList.add('fonts-loaded');
        return;
    }
    
    // Load fonts using CSS Font Loading API
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('normal 400 1em jelani'),
            document.fonts.load('normal 400 1em "Circular Book"'),
            document.fonts.load('normal 500 1em "Circular Medium"')
        ]).then(function() {
            document.documentElement.classList.add('fonts-loaded');
            sessionStorage.setItem('fontsLoaded', 'true');
        }).catch(function() {
            // Fallback if font loading fails
            document.documentElement.classList.add('fonts-timeout');
        });
    } else {
        // Fallback for browsers without Font Loading API
        setTimeout(function() {
            document.documentElement.classList.add('fonts-timeout');
        }, 3000);
    }
    
    // Safety timeout
    setTimeout(function() {
        if (!document.documentElement.classList.contains('fonts-loaded')) {
            document.documentElement.classList.add('fonts-timeout');
        }
    }, 3000);
})();