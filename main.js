var app = new Vue({
    //El elemento del HTML que vamos a usar
    el: "#main",
    //Las propiedades o campos que vamos a usar
    data: {
        url:"https://api.myjson.com/bins/w5j7d",
        members: [],
        states: [],
        allMembers: [],
        canShowAdvice: false
    },

    //Esta propiedad es llamada automáticamente al crearse el objeto. En este caso llamamos al método getData para buscar el JSON.
    created: function () {
        this.getData();
    },

    //Los métodos van en este objeto llamado methods
    methods: {
        //Cada uno de los métodos es una propiedad de ese objeto
        noRepeatedStates: function () {
            var allStates = $(this.members).map(function () {
                return this.state;
            });
            var sortedStates = allStates.sort();
            this.states = Array.from(jQuery.unique(sortedStates));
        },
        //Esta función va a buscar el JSON y setea las variables al volver.
        //Se podría usar LocalStorage
        getData: function () {
            $.getJSON(this.url, function (data) {
                app.members = data.results[0].members;
                app.allMembers = app.members;
                app.noRepeatedStates();
                app.canShowAdvice = true;
            })
        },
        filter: function () {
            //Necesito utilizar los datos originales de todos los miembros debido a la reactividad de Vue.
            //Al modificar los miembros se actualiza la vista directamente.
            //Sería lo contrario al JavaScript habitual. En lugar de vaciar la tabla y crearla de nuevo, lleno los datos para filtrarlos de nuevo.
            //Seguro que hay mejores formas de hacerlo.
            this.members = this.allMembers;

            //El Array que guarda los valores de los Checkboxes checkados.
            //El .get() del final es muy importante para transformar el "array-like" en Array.
            var checkboxes = $("input[name=party]:checked").map(function(){
                return this.value;
            }).get();

            //Comprobamos el "State" y la "Party" de cada miembro y los que den "true" en ambos se quedarán en esta nueva array.
            var resultMembers = this.members.filter(function(member){
                var filter1 = checkboxes.includes(member.party) || checkboxes.length == 0;
                var filter2 = member.state == $("#states").val() || $("#states").val() == "all";
                return filter1 && filter2;
            })
            //Asignamos ese valor a nuestro campo "members" que es el que se muestra en la tabla
            this.members = resultMembers;
         }
    }
})
// 60 líneas. Done!!
