$(document).ready(function () {

    $(".category").change(function () {

        var id = $(this).find(":selected").val();

        $.ajax({
            url: "ajax/check-sub-category.php",
            type: "POST",
            data: {id: id, option: 'checksub'},
            dataType: "JSON",
            success: function (jsonStr) { 
                if (jsonStr.status === 'true') {

                    $('#sub_hide').show();
                    $('#mySelect').empty();

                    var html = '<option> -- Please Select a Sub Category-- </option>';
                    $.each(jsonStr.arr, function (i, data) {
                        html += '<option value="' + data.id + '">';
                        html += data.name;
                        html += '</option>';
                    });

                    $('#mySelect').append(html);
                  
                } else {
                    $('#sub_hide').css("display", "none");
                }

            }
        });

        // alert( $(this).find(":selected").val() );
    });
});