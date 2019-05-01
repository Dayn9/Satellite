Vue.component('satdisplay', {
    props: ['selected'],
    template: `<div>
    <h1>{{selected.name}}</h1>
    <p>StartTime: <span>{{selected.start}}</span></p>
    <p>EndTime: <span>{{selected.end}}</span></p>
</div>`
  })