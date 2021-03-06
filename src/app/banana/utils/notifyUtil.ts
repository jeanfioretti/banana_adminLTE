declare var $: any;
export function notifyManage(response){

    console.log(response);
    if(response.error.message != undefined ){
        showNotification(response.message, 3);
    }else{
        showNotification(response.error, 3);
    }
    console.error(`Error: ${response.status} ${response.statusText}`);

}

export function showNotification(mess, typeMess){

    const type = ['','info','success','warning','danger'];

    const icons = ['',' fa fa-envelope-open','fa fa-check','fa fa-exclamation-circle','fa fa-exclamation-triangle' ]

    $.notify({
        icon: icons[typeMess],
        message: mess

    },{
        type: type[typeMess],
        timer: 4000,
        placement: {
            from: 'top',
            align: 'right'
        },
        template: '<div data-notify="container" style="z-index:1099;" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="fa fa-close"></i></button>' +
          '<i class="fa" data-notify="icon"></i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
