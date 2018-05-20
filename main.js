/* ----------
 * ТИПА API К СЕРВЕРУ
 * ----------
 */
function getDataFromDB(sqlquery){
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
 * ТВОЙ КОД НА VUE
 * ----------
 */
var app1 = new Vue({
    el: '#print_data_from_db',
    data: {
        respons_db: getDataFromDB('SELECT * FROM authorization')
    }
});

