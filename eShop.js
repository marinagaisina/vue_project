window.onload = () => {
    const app = new Vue({
        el: '#app',
        data() {
            return {
                goods: [],
                filteredGoods: [],
                searchLine: '',
                isSearchHintShown: false
            }
        },
        methods: {
            makeGETRequest(method, url) {
                return new Promise((resolve, reject) => {
                    let xhr;

                    if (window.XMLHttpRequest) {
                        xhr = new XMLHttpRequest();
                    } else if (window.ActiveXObject) {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                console.log(xhr.responseText + '\n' + xhr.responseXML + '\n' + xhr.status);
                                resolve(xhr.responseText);
                            } else {
                                reject('Error with status code: ', xhr.status);
                            }
                        }
                    }

                    xhr.open(method, url);
                    xhr.send();
                })
            },
            fetchGoods(url) {
                //alert('fetch');
                const DEFAULT_PRODUCT = {
                    id_product: 0,
                    product_name: 'Default Item',
                    price: 0
                }
                this.makeGETRequest('GET', url)
                    .then((data) => {
                        this.goods = JSON.parse(data);
                        this.filteredGoods = JSON.parse(data);
                        console.log('ok', data);
                    })
                    .catch((err) => {
                        console.log(err);
                        this.goods = [DEFAULT_PRODUCT];
                        this.filteredGoods = [DEFAULT_PRODUCT];
                    })
                // .finally(()=> {
                //     this.render();
                // })
            },
            searchHintShow: (event) => {
                let value = event.target.value;
                if (event.type === 'click') {
                    app.isSearchHintShown = true;
                    return;
                }
                if (event.type === 'change') {
                    app.isSearchHintShown = /^\S/.test(value); //если строка пустая или начинается с пробела, то поиск не выполнится
                }
            },
            filterGoods() {
                const regexp = new RegExp(this.searchLine, 'i');
                this.filteredGoods = this.goods.filter( good => regexp.test(good.product_name));
            }
        }, //methods() ends
        mounted() {
            const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
            this.fetchGoods(`${API_URL}/catalogData.json`);
        }
    });

}