window.onload = () => {
    const app = new Vue({
        el: '#app',
        data() {
            return {
                goods: [],
                filteredGoods: [],
                searchLine: ''
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
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                console.log(xhr.responseText+'\n'+xhr.responseXML+'\n'+xhr.status);
                                //const goods = JSON.parse(xhr.responseText); - передаем в then и там парсим
                                resolve(xhr.responseText);
                            } else {
                                reject('Error with status code: ', xhr.status);
                            }
                        }
                    }

                    xhr.open(method, url); //the 3rd parameter: true - is a default value, not necessarily to type "true"
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
                this.makeGETRequest('GET',url)
                    .then((data) => {
                        this.goods = JSON.parse(data);
                        this.filteredGoods = JSON.parse(data);
                        console.log('ok', data);
                    })
                    .catch((err) => {   //если с сервера данные не загружены, подставляем массив продуктов по умолчанию
                        console.log(err);
                        this.goods = [DEFAULT_PRODUCT];
                        this.filteredGoods = [DEFAULT_PRODUCT];
                    })
                    // .finally(()=> {
                    //     this.render();
                    // })
            }
        },
        mounted() {
            const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
            this.fetchGoods(`${API_URL}/catalogData.json`);
        }
    });
}