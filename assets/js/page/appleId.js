import * as digitall from "../base-digitall.js";


$(async function () {
    'use strict';

    // const baseApiRequest = "https://test.samanii.com/api/v1";
    // const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE0MCIsIkJyYW5kSWQiOiIxMDAwMDEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiIiLCJDaGF0SWQiOiIxMjQ2MjExMzA1IiwiZXhwIjoxNzMxMzUwMzc2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.bFX0KHYnPL8OFLG7mb0wp4KyfHdHXWQLZvoiNup3wGQ"

    const getFilterAppleIdUrl = digitall.baseApiRequest + "/Apple/FilterAppleId";
    const addAppleIdUrl = digitall.baseApiRequest + "/Apple/AddAppleId";
    const getAppleIdType = digitall.baseApiRequest + "/Apple/GetAppleIdType";
    const appleIdTypeId = $("#appleIdTypeId");
    const appleIdForm = $("#add-apple-id-form");


    const table_body = $("#appleIdTable > tbody");

    function generateRow(obj) {
        let row = `
        <tr>
            <td>${obj.id}</td>
            <td>${obj.email}</td>
            <td>${obj.phone}</td>
            <td>${obj.password}</td>
            <td>${obj.null}</td>
            <td>${obj.birthDay}</td>
            <td>${obj.question1}</td>
            <td>${obj.answer1}</td>
            <td>${obj.question2}</td>
            <td>${obj.answer2}</td>
            <td>${obj.question3}</td>
            <td>${obj.answer3}</td>
            <td>${obj.createDate}</td>
            <td>${obj.modifiedDate}</td>
            <td>${obj.createBy ?? "-"}</td>
            <td>${obj.modifyBy ?? "-"}</td>
        </tr>`

        return row;
    }

    const fixedOption = async () => {
        await digitall.getDigitallApi(getAppleIdType).then(async result => {
            // appleIdTypeId.html("");
            result.data.forEach(type => {
                appleIdTypeId.append(`<option value="${type.id}">${type.title}</option>`);
            });
        });
    }

    const filterAppleId = async () => {
        await digitall.getDigitallApi(getFilterAppleIdUrl).then(async result => {
            $(table_body).html("");
            await $.each(result.data.entities, function (index, value) {
                $(table_body).append(generateRow(value));
            });
        });
    }

    await appleIdForm.submit(async function (e) {
        e.preventDefault();

        let values = $("#add-apple-id-form input, #add-apple-id-form select");

        let appleId = {}

        values.each((key, value) => {
            appleId[value.id] = value.value;
        });

        await digitall.postDigitallApi(addAppleIdUrl, appleId);
    });

    $(async function () {

        // console.log(appleIdItems);
        filterAppleId();
        fixedOption();

        // await digitall.postDigitallApi()

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

    });
});
