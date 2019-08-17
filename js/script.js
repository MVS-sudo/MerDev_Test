
//Кроссбраузерная функция создания XMLHttpRequest:
function getXmlHttp() {
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  }
  
// возвращает куки с указанным name, или undefined, если ничего не найдено
function getCookie(name) 
{
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// удаляет куки с именем name
function deleteCookie (name)
{
  var cookie_date = new Date ( );  // Текущая дата и время
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = name += "=; expires=" + cookie_date.toGMTString();
}

//
function main()
{
    //
    
    var email=document.getElementById("email");
    var pass=document.getElementById("password");
    
    // в массиве MyArr введенные пользователем емейл и пароль.
     var myArr = {"email":email.value , "password": pass.value};  
       // в JSON
      jsonStr = JSON.stringify(myArr);
      var xhr = getXmlHttp();
      
    var butt = document.getElementById("submit");
    if(butt.value==="Login")
    //тогда требуется соединение с сервером
    { 
      // открываем асинхронное соединение
      try
      {
        xhr.open("POST",'https://us-central1-mercdev-academy.cloudfunctions.net/login', true); 
        //устанавливаем заголовки сообщения
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(jsonStr);
      
      // Обрабатываем ответ сервера
      xhr.onreadystatechange = function() 
      { 
        if (xhr.readyState == 4) 
        { 
          if(xhr.status == 200) 
          { // Если сервер вернул код 200 

            console.log(xhr.responseText);
            //console.log(JSON.parse(xhr.responseText));
            
            //Стилизуем форму после успешной регистрации
            email.style="display: none;";
            pass.style="display: none;";
            var resp = xhr.responseText;
            

            var butt2 = document.getElementById("submit");
            butt2.value="Logout";
            butt2.className="Rectangle-7";
            //butt.style+=";margin-top:22%";

            var hint=document.getElementById("hint"); 
            hint.className="invisible";

            var login=document.getElementById("login"); 
            login.className="invisible";
            
            var img = document.getElementById("img");
            var z=JSON.parse(xhr.responseText);
            img.src=z["photoUrl"];
            img.className="imgClassLogout";
           // img.style+=";display:block;width: 128px;height: 128px;border-radius: 50%;";

            var pname = document.getElementById("pname");
            if(pname!=null){pname.innerHTML=z["name"];};
            //pname.style+="display:block;";

            var name = document.getElementById("name");
            name.className="pname";

            var indent=document.getElementById("indent");
            indent.className="indent" ;


            //alert(document.cookie); // показываем все куки
            xhr.abort();
            
          }
          else
          {
              //если логин или пароль неверные или другая ошибка

              var z=JSON.parse(xhr.responseText);
              console.log(z["error"]); //Выводим в консоль


              var email2=document.getElementById("email"); 
              //email2.style+=";border: solid 1px #ed4159;color:red; ";
              email2.className="Rectangle-4err";

              var hint=document.getElementById("hint"); 
              hint.value=z["error"];
              hint.className="Rectangle-4err";
              //hint.style +=";color:red;background-color: rgba(237, 65, 89, 0.25);";

              var indent=document.getElementById("indent");
              indent.className="indentNoHeight" ;

              var butt = document.getElementById("submit");
              butt.className="Rectangle-7err";
              //butt.style += ";margin-top: 5%;";


          }
              
              }
        
            //xhr.close;
        };
     
      }catch (Err) {alert("Ошибка при подключении к серверу");}

    }//if 52

    else
    {
      if(butt.value==="Logout")
        //меняеми стили при разрегистрации
      {
        
        email.style="display: block;";
        email.value="";
        email.className="Rectangle-4";
        pass.style="display: block;";
        pass.value="";

        var butt2 = document.getElementById("submit");
        butt2.value="Login";

        var login=document.getElementById("login"); 
        login.className="Log-In";

        var img = document.getElementById("img");
        img.className="imgClass";
        img.src="";

        var p = document.getElementById("pname");
        if(p!=null) {p.innerHTML=""};

        var divp = document.getElementById("name");
        divp.className="invisible";
        
        var indent=document.getElementById("indent");
        indent.className="indent" ;


      }
    }
     
    
}







