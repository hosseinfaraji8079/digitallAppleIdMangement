
$(function () {
    'use strict';

    const baseApiRequest = "https://test.samanii.com/api/v1";
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE0MCIsIkJyYW5kSWQiOiIxMDAwMDEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiIiLCJDaGF0SWQiOiIxMjQ2MjExMzA1IiwiZXhwIjoxNzMxMzUwMzc2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.bFX0KHYnPL8OFLG7mb0wp4KyfHdHXWQLZvoiNup3wGQ"


    function generateRow(obj) {
        let row = `
        <tr>
        <td>${obj.id}</td>
            <td>${obj.email}</td>
        </tr>`

        return row;
    }

    const filterAppleId = async () => {
        await $.ajax({
            type: "GET",
            url: `${baseApiRequest}/Apple/FilterAppleId`,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            success: async function (response) {
                if (response.statusCode != 0 | response.isSuccess == false) {

                } else {
                    let table_body = $("#appleIdTable > tbody");

                    await $.each(response.data.entities, function (index, value) {
                        $(table_body).append(generateRow(value));
                    });
                }
            }, erorr: function (erorr) {

            }
        });
    }


    $(async function () {


        filterAppleId();

        await $.ajax({
            type: "GET",
            url: `${baseApiRequest}/Apple/GetAppleIdType`,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            success: function (response) {
                if (response.statusCode != 0 | response.isSuccess == false) {
                } else {
                    const appleIdTypeId = $("#appleIdTypeId");
                    response.data.forEach(type => {
                        $(appleIdTypeId).append(`<option value="${type.id}">${type.title}</option>`);
                    });
                }
            }, erorr: function (erorr) {

            }
        });

        $.getScript("/assets/vendors/datatables.net/jquery.dataTables.js", function (data, textStatus, jqxhr) {
            $.getScript("/assets/vendors/datatables.net-bs5/dataTables.bootstrap5.js", function (data, textStatus, jqxhr) {
                $('#appleIdTable').DataTable({
                    "aLengthMenu": [
                        [10, 30, 50, -1],
                        [10, 30, 50, "همه"]
                    ],
                    "iDisplayLength": 10,
                    "language": {
                        search: ""
                    }
                });
            });
        });

        $('#appleIdTable').each(function () {
            var datatable = $(this);
            var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
            search_input.attr('placeholder', 'جستجو');
            search_input.removeClass('form-control-sm');
            // LENGTH - Inline-Form control
            var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
            length_sel.removeClass('form-control-sm');
        });

        $.getScript("/assets/vendors/flatpickr/flatpickr.min.js", function (data, textStatus, jqxhr) {
            if ($('#birthdate-content').length) {
                flatpickr("#birthdate-content", {
                    wrap: true,
                    dateFormat: "Y/m/d",
                });
            }
        });


        await $("#add-apple-id-form").submit(async function (e) {
            e.preventDefault();

            let values = $("#add-apple-id-form input, #add-apple-id-form select");

            let appleId = {}

            values.each((key, value) => {
                appleId[value.id] = value.value;
            });

            await $.ajax({
                type: "POST",
                url: `${baseApiRequest}/Apple/AddAppleId`,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(appleId),
                success: function (response) {
                    if (response.statusCode != 0 | response.isSuccess == false) {

                    } else {
                        const appleIdTypeId = $("#appleIdTypeId");
                        response.data.forEach(type => {
                            $(appleIdTypeId).append(`<option value="${type.id}">${type.title}</option>`);
                        });
                    }
                }, erorr: function (erorr) {

                }
            });
        });

    });
});