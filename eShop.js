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
    })
}