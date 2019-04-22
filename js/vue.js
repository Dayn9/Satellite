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
                },
                years: [],
                selectedYear: 1990
        },
        methods: {
                plot: function(){
                        console.log("plotting data");
                        getData();
                },
                getYears: function(){
                        let s = parseInt(this.selected.start.substring(0,4), 10);
                        let e = parseInt(this.selected.end.substring(0,4), 10);
                        this.years = [];
                        for(let y = s; y <= e; y++){
                                this.years[y - s] = y;
                        }
                        this.selectedYear = this.years[0];
                }
        }
});