//t396
if  (localStorage.getItem('access') != null)
    {   

        $('.auth').remove()
            $('#rec245031462').append(`
            <div class="container" 
            id="conti"> 
            <div class="row">
            <div class="col-6"> 
            <div style="left: 70px!important;display:  block;position: relative; 
            top: -350px; 
            z-index:5;   
            width:350px;         
            data-elem-id='1603725019788' 
            data-elem-type='button' 
            data-field-top-value="528" data-field-top-res-640-value="553" 
            data-field-top-res-480-value="533" 
            data-field-top-res-320-value="520" 
            data-field-left-value="0" 
            data-field-left-res-640-value="0" 
            data-field-left-res-480-value="0" 
            data-field-left-res-320-value="0" 
            data-field-height-value="70" 
            data-field-width-value="300" 
            data-field-axisy-value="top" 
            data-field-axisx-value="left" 
            data-field-container-value="grid" 
            data-field-topunits-value="px"          
            data-field-leftunits-value="px" 
            data-field-heightunits-value="" 
            data-field-widthunits-value="">  
            <button class='tn-atom' id='cler' 
            style="color:000000;
            font-size: 18px;font-family: 'Geometria',Arial,sans-serif;
            line-height: 1.55;font-weight: 500;border-width: 1px;
            border-radius: 5px;  background-color:#ff6161;
            background-position: center center;border-color: transparent;border-style: solid;   transition:     background-color  0.2s ease-in-out,      color 0.2s ease-in-out,    border-color 0.2s ease-in-out;       
            box-shadow: 0px 10px 30px 0px rgb(216 93 126 / 60%); padding: 21px 170px 21px 170px; color:black;">выйти</button>
            </div></div></div></div>
        `)
             $('.auth').remove()
    }
        
else{
    $('#onli').remove()
     $('#conti').remove()
    
    $('.t396').append(`
            <div class='t396__elem tn-elem tn-elem__2450314621603725019788' 
            data-elem-id='1603725019788' 
            data-elem-type='button' 
            data-field-top-value="528" 
            data-field-top-res-640-value="553" 
            data-field-top-res-480-value="533" 
            data-field-top-res-320-value="520"
            data-field-left-value="0" 
            data-field-left-res-640-value="0" 
            data-field-left-res-480-value="0" 
            data-field-left-res-320-value="0" 
            data-field-height-value="70" 
            data-field-width-value="300" 
            data-field-axisy-value="top" 
            data-field-axisx-value="left" 
            data-field-container-value="grid" 
            data-field-topunits-value="px" 
            data-field-leftunits-value="px" 
            data-field-heightunits-value="" 
            data-field-widthunits-value=""> 
                <a class='tn-atom' href="#popup:myform">зарегистрироваться</a> 
        </div>
            </div>
            </div>
            
        `)
}
    


    function register(){
            
    if ($('#username').val().length >0 & 
        $('#email').val().length >0 & 
        $('#pass1').val().length >0 & 
        $('#pass2').val().length >0){
            

    let pass1 = $('#pass1').val()
    let pass2 = $('#pass2').val()
            
    if (pass1 == pass2 ){
        let username = $('#username').val()
        let email = $('#email').val()
        let last_name = $('#last_name').val()
        let first_name = $('#first_name').val()

        console.log($("input[name*='csrfmiddlewaretoken']").val())
        console.log(first_name.length)
        console.log(last_name.length)

        $.ajax({
            method:'POST',
            url:'http://127.0.0.1:8000/api/register',
            data:{
            csrf_token:$("input[name*='csrfmiddlewaretoken']").val(),
            username:username,
            email:email,
            password:pass1,
            last_name:(last_name.length > 0) ? last_name : 'none',
            first_name:(first_name.length > 0) ? first_name : 'none'
        }
        }).done(()=>{
            console.log('done')
                Swal.fire(
                    'Поздравляю!',
                    'Вы зарегистрировались, проверьте почту!',
                    'success')
                }).fail(function() {
                    alert( "Извините, человек с такими данными уже зарегистрирован" );
                })
    }else{
            }
        }
    }
   
   $('#cler').on('click',()=>{
        localStorage.removeItem('access')
        location.reload();
    })
    

    function all_user(str){
        $.ajax({
            method:'GET',
            url:'http://127.0.0.1:8000/api/users/'+str+'/',
            data:{},
        }).done(request => request.forEach((elem)=>{
            console.log(elem['email'])
            $('.somi').append(`
                <div class="btnss">
                    `+elem['email']+`<p>`+elem['username']+`</p>
                </div>`
            )
        }))
    }

    function aunticfaceted(){
        let username = $("input[name*='username']").val(),pass=$("input[name*='pass']").val()
        $.ajax({
            method:'POST',
            url:'http://127.0.0.1:8000/api/token/',
            data:{
                username:username,
                password:pass
            }
        }).done((request)=>{
            localStorage.setItem('access', request['access']);
            location.reload();
        })
        return false;
    }
    
    function show_hiden(stylee,class_){
            ($("."+class_).css(stylee) == 'block') ? $("."+class_).css(stylee,"none") : $("."+class_).css(stylee,"block")
            return true
        }

    $(document).ready(function() {
        var hash = window.location.hash; setTimeout(function() {
            var curPath = window.location.pathname; 
            var curFullPath = window.location.origin + curPath; $('a[href^="#"]:not([href="#"],.carousel-control,.t-carousel__control,[href^="#price"],[href^="#popup"],[href^="#prodpopup"],[href^="#order"],a[href^="#!"]),a[href^="' + curPath + '#"]:not(a[href*="#!/tproduct"]),a[href^="' + curFullPath + '#"]:not(a[href*="#!/tproduct"])').click(function(e){
                e.preventDefault(); var hash = this.hash.trim(); t270_scroll(hash, -3); 
            }); 
            if($(".js-store").length > 0 || $(".js-feed").length > 0) { t270_scroll(hash, -3, 1); } }, 500);

            if (! window.mainTracker) { window.mainTracker = 'tilda'; } 
                (function (d, w, k, o, g){ 
                    var n=d.getElementsByTagName(o)[0],s=d.createElement(o),f=function(){n.parentNode.insertBefore(s,n);}; s.type = "text/javascript"; s.async = true; s.key = k; s.id = "tildastatscript"; s.src=g; if (w.opera=="[object Opera]") {d.addEventListener("DOMContentLoaded", f, false);} else { f(); } 
                })
            (document, window, '776d0d1eaeb7a7c2fbe107be0e84b4cd','script','https://static.tildacdn.com/js/tildastat-0.2.min.js');
});

/*

       
*/