const calc = document.querySelector('.calc');
const result = document.querySelector('#result');
calc.addEventListener ('click', function (event) {
    if(!event.target.classList.contains('btn')) return;
    const value = event.target.innerText;
    switch(value) {
        case 'C':
            result.innerText = '';
            break;
        case '=':
            if(result.innerText.search(/[^0-9*/+-.]/mi) != -1) return;
            result.innerText = eval(result.innerText).toFixed(2);
            break;
        default:
            result.innerText += value;
    }
});

document.getElementById('change_theme').addEventListener('click', function() {
    const currentTheme = document.body.className;
    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';
    } else {
        document.body.className = 'light-theme';
    }
});