/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function initialData(){
    $.ajax({
        cache: false,
        async: false,
        type: 'POST',
        url: 'http://222.217.36.123:10196/MobileMessage/GetAllMessage/',
        success: function (data) {
            //$.this.mobile.loading( "hide" );
            document.getElementById('messageListContent').innerHTML = data;
        }
    });
}
