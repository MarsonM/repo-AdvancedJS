class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container);
        this._goods = [];
        this._productsObjects = [];

        this._fetchGoods();
        this._render();
        this._getFullPrice()
    }

    _fetchGoods() {
        this._goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            console.log(productObject);

            this._productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }
//метод возвращает стоимость всех товаров экземпляра 
    _getFullPrice() {
        let fullPrice = 0;
        for (const product of this._goods) {
          fullPrice = fullPrice + product.price;
        }
        return fullPrice;
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price} \u20bd</p>
                      <button class="buy-btn">Купить</button>
                  </div>
              </div>`;
    }
}

const list = new ProductList();

class ShoppingCart {
    constructor(selector = '.shoppingCart') {
        this.selector = document.querySelector(selector);
    }
}

class ShoppingCartItem {
    constructor(item, img = 'https://via.placeholder.com/200x150') {

    }

}

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://via.placeholder.com/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);

