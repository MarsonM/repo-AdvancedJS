//Функция ниже проверяет правильность заполнения данных, при правильном
//заполнении активирует кнопку отправить
const list = {
    "name": /[a-z]/i,
    "phone": /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    "email": /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i
};
const btn = document.querySelector('.button');

document.addEventListener('input', (event) => {
    if (list[event.target.dataset.attr].test(event.target.value)) {
        let inp = document.querySelectorAll('input');
        // lastIteration запоминает если если хоть в одном поле ввода
        // найден неверный формат, больше не зайдет в тело цикла IF ниже
        let lastIteration = true;
        inp.forEach(function (element) {
            if (list[element.dataset.attr].
                test(element.value) && lastIteration) {
                    btn.removeAttribute("disabled");
                    btn.textContent = "Отправить";
            }
            else {
                btn.setAttribute("disabled", "true");
                lastIteration = false;
                btn.textContent = `${element.dataset.attr}` + ` format error`;
            }
        })
    }
    else {
        btn.setAttribute("disabled", "true");
        btn.textContent = `${event.target.dataset.attr}` + ` format error`;
    }
});