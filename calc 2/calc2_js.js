btn_r.onclick = function() {
    let r = rez.value;
    rez.value = eval(r);
}

btn_1.onclick = function() {
    let r = rez.value;
    rez.value = r + '1';
}

btn_2.onclick = function() {
    let r = rez.value;
    rez.value = r + '2';
}

btn_3.onclick = function() {
    let r = rez.value;
    rez.value = r + '3';
}

btn_4.onclick = function() {
    let r = rez.value;
    rez.value = r + '4';
}

btn_5.onclick = function() {
    let r = rez.value;
    rez.value = r + '5';
}

btn_6.onclick = function() {
    let r = rez.value;
    rez.value = r + '6';
}

btn_7.onclick = function() {
    let r = rez.value;
    rez.value = r + '7';
}

btn_8.onclick = function() {
    let r = rez.value;
    rez.value = r + '8';
}

btn_9.onclick = function() {
    let r = rez.value;
    rez.value = r + '9';
}

btn_0.onclick = function() {
    let r = rez.value;
    rez.value = r + '0';
}

btn_plus.onclick = function() {
    let r = rez.value;
    rez.value = r + '+';
}

btn_minus.onclick = function() {
    let r = rez.value;
    rez.value = r + '-';
}

btn_multiplication.onclick = function() {
    let r = rez.value;
    rez.value = r + '*';
}

btn_division.onclick = function() {
    let r = rez.value;
    rez.value = r + '/';
}

btn_dot.onclick = function() {
    let r = rez.value;
    rez.value = r + '.';
}

//удаляет всю строку
btn_c.onclick = function() {
    rez.value = '';
}

// удаляет один символ
// btn_c.onclick = function() {
//     let r = rez.value;
//     rez.value = r.slice(0, -1);
// }

// const calc = document.querySelector('.calc');
// const result = document.querySelector('#result');
// calc.addEventListener ('click', function (event) {
//     if(!event.target.classList.contains('btn')) return;
//     const value = event.target.innerText;
//     switch(value) {
//         case 'C':
//             result.innerText = '';
//             break;
//         case '=':
//             if(result.innerText.search(/[^0-9*/+-.]/mi) != -1) return;
//             result.innerText = eval(result.innerText).toFixed(2);
//             break;
//         default:
//             result.innerText += value;
//     }
// });

// document.getElementById('change_theme').addEventListener('click', function() {
//     const currentTheme = document.body.className;
//     if (currentTheme === 'light-theme') {
//         document.body.className = 'dark-theme';
//     } else {
//         document.body.className = 'light-theme';
//     }
// });