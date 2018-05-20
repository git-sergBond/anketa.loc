/* ----------
 * ТИПА API К СЕРВЕРУ
 * ----------
 */
function getDataFromDB(sqlquery){//делает sql запрос к серверу и отдает данные в формате json
    var request = new XMLHttpRequest();
    var json;
    request.open("GET", "get_data_from_db.php?" + "sql="+sqlquery+';', false);
    function responceLoad() {
        if (request.readyState == 4) {
            var status = request.status;
            if (status == 200) {
                json = JSON.parse(request.responseText);
            } else {
                document.write("Ответ сервера " + request.statusText);
            }
        }
    }
    request.onload = responceLoad;
    request.send();
    return json;
}
/* ----------
 * SPA НА VUE
 * ----------
 */
new Vue({//ГЛАВНЫЙ компонент
    el: '#main-component',
	data:{
		curentView: 'menu'
	},
	methods:{
		SwitchView: function(view){
			this.curentView = view;
		}
	}
});

//анкетирование
Vue.component('cliker1', {
	data: function () {
	  return {
		count: 0
	  }
	},
	template: '#cliker1-tmp'
})
//конфг тестов
Vue.component('cliker2', {
	data: function () {
	  return {
		count: 0
	  }
	},
	methods:{
		exit: function(){
			this.$emit('exit','menu');
		}
	},
	template: '#cliker2-tmp'
})
//считать с БД
Vue.component('authorizationRead',{
    data: function() {
        return{
             respons_db: []
        }
    },
    methods:{
		exit: function(){
			this.$emit('exit','menu');
        },
        load: function(){
            this.respons_db = getDataFromDB('SELECT * FROM authorization')
        }
	},
	template: '#authorizationRead-tmp'
})

