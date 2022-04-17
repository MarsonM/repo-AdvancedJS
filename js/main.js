const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => { // не fetch
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

//ДЗ Переписанная функция использующая промисы для получения данных с сервера
function getRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status === 200 && xhr.readyState === 4) {
                resolve(xhr.responseText);
            } else {
                reject("Error");
            }
        };
        xhr.send();
    });
};

getRequest(`${API}/catalogData.json`) // Передаем Json в getRequest
    .then(response => {
        let data = JSON.parse(response);
        console.log(data); //Выводим в консоль полученные распарсенные данные
        return data; 
    })
    .catch(error => {
        console.log(error); // При ошибке на консоль выведется "Error"
    });

class ProductList {
    constructor(container = '.products', cart) {
        this.container = document.querySelector(container);
        this._goods = [];
        this._productsObjects = [];
        this.cart = cart;
        
        // this._fetchGoods();
        // this._render();
        this.getProducts()
            .then((data) => {
                this._goods = data;
                this._render();
                console.log(this.getTotalPrice());
            });
    }

    // _fetchGoods() {
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         // console.log(data);
    //         this._goods = JSON.parse(data);
    //         this._render();
    //         console.log(this._goods);
    //     });
    // }
    
    getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    getTotalPrice() {
        return this._productsObjects.reduce((accumulator, good) => accumulator + good.price, 0);
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            console.log(productObject);

            this._productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    //Создаем методы каталога для добавления продуктов из этого каталога в 
    //текущую корзину
    addToCart(product) {
        cart.addToCart(product)
    }

    deleteFromBasket(product) {
        cart.deleteFromBasket(product)
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.product_name}</h3>
                      <p>${this.price} \u20bd</p>
                      <button class="buy-btn">Купить</button>
                  </div>
              </div>`;
    }
}

// ДЗ созлаем класс Cart и его методы 
class Cart {
    constructor(container = ".basket") {
        this.container = document.querySelector(container);
        this.amount;
        this.countGoods;
        this.contents = [];

        this.getCartItems()
            .then((data) => {
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this.contents = data.contents;
    });
    }
    //Считаем общую стоимость корзины
    getCartAmount() {
        return this.contents.reduce((accumulator, item) =>
            accumulator + item.price, 0);
    }
    
    //метод добавления нового продукта в экземпляр класса Cart, с проверкой
    //на существование такого продукта по id
    addToCart(product) {
        return fetch(`${API}/addToBasket.json`)
            .then(response => {
                response.json()
                    .then(resp => {
                        if (resp.result === 1) {
                            const obj = this.contents.find(item =>
                                item.id_product === product.id_product)
                            if (obj) {
                                obj.quantity += 1;
                                this.countGoods += 1;
                                obj.price += obj.price;
                            }
                            else {
                                product.quantity = 1;
                                this.contents.push(product);
                                this.countGoods += 1;
                            }
                        }
                        this.amount = this.getCartAmount();
                    })
        })
            .catch(err => console.log(err));
  
    }

    //Удаление осуществляется по id_product, если количество больше одного, то 
    //уменьшает на еденицу, если такого продукта нет, то выводит в консоль
    //"Нет такого продукта в корзине"
    deleteFromBasket(product) {
    return fetch(`${API}/deleteFromBasket.json`)
        .then(response => {
            response.json()
                .then(resp => {
                    if (resp.result === 1) {
                        const obj = this.contents.find(item =>
                            item.id_product === product.id_product);
                        if (obj && obj.quantity > 1) {
                            obj.quantity -= 1;
                            this.countGoods -= 1;
                            obj.price -= product.price;
                        }
                        else if (obj === undefined) {
                            console.log("Нет такого продукта в корзине")
                        }
                        else {
                            this.contents.splice(this.contents.indexOf(obj), 1);
                            this.countGoods -= 1;
                        }
                    }
                    this.amount = this.getCartAmount();
                })
    })
        .catch(err => console.log(err));
  
    }

    // Считывем json, в конструкторе класса Cart выполняем метод и получем 
    // свойства корзины
    getCartItems() {
        return fetch(`${API}/getBasket.json`)
            .then(response => response.json())
            .catch(err => console.log(err));
    }
}

// ДЗ созлаем класс Cart
class CartItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
        this.img = img;
    }
}

// Создаем продукт, которого нет в корзине для проверки работоспособности
// метода cart.addToCart
const otherSomeProduct = {
    id_product: 44, product_name: 'Табуретка', price: 540
}

//  ***ПРОВЕРКА РАБОТОСПОСОБНОСТИ КОДА через консоль***
const cart = new Cart(); // Новая корзина
const list = new ProductList('.products', cart); // Передаем cart в каталог
