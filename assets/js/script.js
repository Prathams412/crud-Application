let updateRow;
$(document).on('submit','form', function(e){
    e.preventDefault();

    let form = $(this);

    let data = new FormData($(this)[0]);

    let type = $(this).attr('method');

    let url = $(this).attr('action')


$.ajax({
    url,
    type,
    data,
    dataType:'json',
    contentType:false,
    processData:false,
    success:function(res){
        res.swal && swal.fire(res.swal);
        res.formReset && (form.trigger('reset'));
        res.modalHide && $(res.modalHide).modal('hide');

        switch(res.addRowTable){
            case '#users-table tbody':
                userRow(res.user,res.addRowTable);
                break;
        }
        switch(res.updateRowTable){
            case '#users-table tbody':
                userUpdateRow(res.user,res.updateRowTable);
                break;
        }
        console.log(userUpdateRow())
        
    },
    error:function(){
        console.log("error in ajax");
    }
})
})

function userRow(user,table){
    let row  = `<tr id='row-${user.id}'><td>${user.name}</td><td>${user.mobile}</td><td>${user.email}</td><td><i data-url='user?id=${user.id}' class="fa-solid fa-pencil edit"></i> <i data-url='user?id=${user.id}' class="fa-solid fa-trash-can text-danger delete"></i></td></tr>`;
    $(table).append(row);
}

function userUpdateRow(user,table){
    let row  = `<td id='row-${user.id}'>${user.name}</td><td>${user.mobile}</td><td>${user.email}</td><td><i data-url='user?id=${user.id}' class="fa-solid fa-pencil edit"></i> <i data-url='user?id=${user.id}' class="fa-solid fa-trash-can text-danger delete"></i></td>`;
    $(`${table} #row-${user.id}`).html(row);
    $(table + '#row-' + user.id).html(row);
}

$(document).on('click','.delete',function(){
    let row = $(this);
    let url = 'api/delete/' + $(this).data('url');
    // alert(url);

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                url,
                method:"post",
                dataType:'json',
                success:function(res){
                    res.swal && Swal.fire(res.swal);
                    res.deleteRowTable && (row.parents('tr').remove())
                }
            });

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
})

$(document).on('click','.edit',function(){
    updateRow = $(this);
    let url = 'api/read/' + $(this).data('url');
    $.ajax({
        url,
        dataType:"json",
        success:function(res){
            if(res.modalShow){
                for(let [key,value] of Object.entries(res.formFieldValues)){
                    $(`[name ="${key}"]`).val(value);

                    $(res.modalShow).find('.modal-title span').text('Update');
                    $(res.modalShow).modal('show');
                    $(res.modalShow).find('form').attr('action','/api/update/' + res.updatedUrl);

                }
            }
        }
    })
})

$(document).on('click','.create-modal',function(){
    let target = $(this).data('bs-target');
    let formAction = 'api/create/' + $(this).data('url');
    $(target).find('.modal-title span').text('Create');
    $(target).find('form').attr('action',formAction);
    $(target + 'input').val('');

})