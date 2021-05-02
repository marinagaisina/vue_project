window.onload = () => {
    const app = new Vue({
        el: '#app',
        data() {
            return {
                goods: [],
                filteredGoods: [],
                searchLine: '',
                isSearchHintShown: false,
                isLoadingBtnShown: true,
                isDataFound: false,
                isVisibleCart: false
            }
        },
        computed: {
            filterGoods() {
                const regexp = new RegExp(this.searchLine, 'i');
                return this.filteredGoods = this.goods.filter( good => regexp.test(good.product_name));
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
                // const DEFAULT_PRODUCT = {
                //     id_product: 0,
                //     product_name: 'Default Item',
                //     price: 0
                // }
                this.makeGETRequest('GET', url)
                    .then((data) => {
                        this.isLoadingBtnShown = false;
                        this.goods = JSON.parse(data);
                        this.filteredGoods = JSON.parse(data);
                        console.log('ok', data);
                    })
                    .catch((err) => {
                        console.log(err);
                        this.isLoadingBtnShown = false;
                        this.isDataFound = true;
                        // this.goods = [DEFAULT_PRODUCT];
                        // this.filteredGoods = [DEFAULT_PRODUCT];
                    })
                // .finally(()=> {
                //     this.render();
                // })
            },
            searchHintShow: (value) => {
                app.isSearchHintShown = value;  //true or false
            },
            showCart: (value) => {
                app.isVisibleCart = value;
            },
            addToCart: (event) => {
                let elementId = event.target.parentElement.id;
            }
        }, //methods() ends
        mounted() {
            const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
            this.fetchGoods(`${API_URL}/catalogData.json`);
        }
    });

}

