const products = [
    {id: 1, title: 'Notebook', price: 1000},
    {id: 2, title: 'Mouse', price: 100},
    {id: 3, title: 'Keyboard', price: 250},
    {id: 4, title: 'Gamepad', price: 150 },
];

//Добавил значения по умоланию для принимаемых функцикй параметров. Если св-во
//title или price не указано, то будет выводится, что цена или название не 
//указаны.
//Для сокращения кода, фигурные скобки в функции renderProduct и productList 
//можно опустить.
const renderProduct = (
    title = 'Название не указано',
    price = 'Цена не указана') => 
            `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить</button>
              </div>`;

//Так как map формирует массив разделенный запятыми как и метод toString(),
//то в результате HTML верстка каждого продукта будет разделена запятой.
//Для того чтобы избавиться от запятой можно прогнать массив через метод join
//с указанием пустого разделителя ''.
const renderProducts = (list) => {
    const productList = list.map((good) =>
        renderProduct(good.title, good.price));
    document.querySelector('.products').innerHTML = productList.join('');
};

renderProducts(products);