var app = new Vue({
    el: "#main",
    data: {
        url:"https://api.myjson.com/bins/w5j7d",
        members: [],
        states: [],
        allMembers: [],
        canShowAdvice: false
    },
    created: function () {
        this.getData();
    },
    
    methods: {
        noRepeatedStates: function () {
            var allStates = $(this.members).map(function () {
                return this.state;
            });
            var sortedStates = allStates.sort();
            this.states = Array.from(jQuery.unique(sortedStates));
        },
        getData: function () {
            fetch(this.url)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    this.members = data.results[0].members;
                    this.allMembers = this.members;
                    this.noRepeatedStates();
                    this.canShowAdvice = true;
                }.bind(this));
        },
        filter: function () {
            this.members = this.allMembers;

            var checkboxes = $("input[name=party]:checked").map(function(){
                return this.value;
            }).get();

            var resultMembers = this.members.filter(function(member){
                var filter1 = checkboxes.includes(member.party) || checkboxes.length == 0;
                var filter2 = member.state == $("#states").val() || $("#states").val() == "all";
                return filter1 && filter2;
            })
            this.members = resultMembers;
        }
    }
})



