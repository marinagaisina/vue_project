window.onload = () => {
    const app = new Vue({
        el: '#app',
        data() {
            return {
                names: ['Frodo', 'Sam', 'Meriadoc', 'Peregrin'],
            }
        },
        methods: {
            clickHandler() {
                console.log('click');
            }
        },
        computed: {
            upperCaseNames() {
                return this.names.map(name => name.toUpperCase());
            },
        }
    });

    console.log(app);
}