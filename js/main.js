const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        searchLine: '',
        isVisibleCart: false,
        filtered: [],
        cartItems: [],
        cartUrl: '/getBasket.json',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },
        filterGoods() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    beforeCreate() {
        console.log('beforeCreate');
        console.log(this.products);
    },
    created() {
        console.log('created');
        console.log(this.products);
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
        }
      });
            })
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('destroyed');
    },
});
