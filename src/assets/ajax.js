
$(document).ready(function () {
    var table = $('#datatable').DataTable({
        // "ajax": {
        //     "url": "http://localhost:8082/rest/user",
        //     "type": "GET",
        //     "dataSrc": function (result) {
        //         console.log(result);
        //         return result;
        //     },
        //     "dataType": "json"
        // },
        // columns: [
        //     { "data": "userId" },
        //     { "data": "userName" },
        //     { "data": "userPass" },
        // ]

    });

    $('#get-btn').click(()=>{
        table.clear();
        table.ajax.reload();
    })





});

