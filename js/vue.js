const app = new Vue({
        el: '#app',
        data: {
                title: "Satelite Tracker",
                observatories: [],
                result: [],
                selected: {
                        satId: "data error",
                        name: "Loading...",
                        start: 0,
                        end: 0,
                }
                
        },
        methods: {
                plot: function(){
                        console.log("plotting data");
                        getData();
                }
        }
});