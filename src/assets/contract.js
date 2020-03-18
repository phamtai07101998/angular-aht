$(document).ready(function () {
    $('#datatable').DataTable({
        // "ajax": {
        //     "url": "http://localhost:8082/rest/contractEmp",
        //     "type": "GET",
        //     "dataSrc": function (result) {
        //         console.log(result);
        //         return result;
        //     },
        //     "dataType": "json"
        // },
        // columns: [
        //     { "data": "contractEmpStartDate" },
        //     { "data": "contractEmpEndDate" },
        //     { "data": "contract.contractCode" },
        //     {"data": "contract.contractType"},
        //     {"data": "employee.empName"},
        //     {"data": "employee.parts.partsName"},
        //     {"data": "employee.department.departmentName"},
        //     {"data": "contractEmpStatust"}
        // ]
    });
});