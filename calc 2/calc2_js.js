document.getElementById('toggle_theme').addEventListener('click', (e) => {
    if (document.documentElement.hasAttribute('theme')) {
        document.documentElement.removeAttribute('theme');
    } else {
        document.documentElement.setAttribute('theme', 'dark');
    }
});

btn_r.onclick = function () {
    let r = rez.value;
    rez.value = eval(r);
}

btn_1.onclick = function () {
    let r = rez.value;
    rez.value = r + '1';
}

btn_2.onclick = function () {
    let r = rez.value;
    rez.value = r + '2';
}

btn_3.onclick = function () {
    let r = rez.value;
    rez.value = r + '3';
}

btn_4.onclick = function () {
    let r = rez.value;
    rez.value = r + '4';
}

btn_5.onclick = function () {
    let r = rez.value;
    rez.value = r + '5';
}

btn_6.onclick = function () {
    let r = rez.value;
    rez.value = r + '6';
}

btn_7.onclick = function () {
    let r = rez.value;
    rez.value = r + '7';
}

btn_8.onclick = function () {
    let r = rez.value;
    rez.value = r + '8';
}

btn_9.onclick = function () {
    let r = rez.value;
    rez.value = r + '9';
}

btn_0.onclick = function () {
    let r = rez.value;
    rez.value = r + '0';
}

btn_plus.onclick = function () {
    let r = rez.value;
    rez.value = r + '+';
}

btn_minus.onclick = function () {
    let r = rez.value;
    rez.value = r + '-';
}

btn_multiplication.onclick = function () {
    let r = rez.value;
    rez.value = r + '*';
}

btn_division.onclick = function () {
    let r = rez.value;
    rez.value = r + '/';
}

btn_dot.onclick = function () {
    let r = rez.value;
    rez.value = r + '.';
}

//удаляет всю строку
btn_c.onclick = function () {
    rez.value = '';
}

// удаляет один символ
// btn_c.onclick = function() {
//     let r = rez.value;
//     rez.value = r.slice(0, -1);
// }