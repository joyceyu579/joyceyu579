window.addEventListener('scroll', function() {
    var buttons = document.getElementById('buttons-container');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 200) {
        buttons.style.position = 'fixed';
        buttons.style.top = "0%"; 
    } else {
        buttons.style.position = '';
        buttons.style.top = '';
    }
});

