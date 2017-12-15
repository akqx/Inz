import React from "react";

export default class SignUp extends React.Component {

    render() {
        return ( 
     <selection>
       <div>
          <div class="logo"><span class="glyphicon glyphicon-user "></span> ZAREJESTRUJ SIĘ</div>
        </div>

     <div class="myModal container" >
        <form role="form">
        <div class="form-group">
            <label><span class="glyphicon glyphicon-user"></span>Nazwa użytkownika</label>
            <input type="text" class="form-control" id="usrname" placeholder="Wpisz nazwę użytkownika"></input>
        </div>
        <div class="form-group">
            <label for="psw"><span class="glyphicon glyphicon-pencil"></span> Hasło</label>
            <input type="text" class="form-control" id="psw" placeholder="Wpisz hasło"></input>
            <label for="psw"><span class="glyphicon glyphicon-pencil top-buffer"></span> Powtórz hasło</label>
            <input type="text" class="form-control" id="psw_2" placeholder="Wpisz hasło"></input>
           <label for="email"><span class="glyphicon glyphicon-envelope top-buffer"></span> Email</label>
            <input type="text" class="form-control" id="email" placeholder="Wpisz email"></input>
        
        </div>
        <button type="submit" class="btn my-btn btn-block "><span class="glyphicon glyphicon-off"></span>Zarejestruj się</button>
        </form>
        <div class="modal-footer top-buffer">
                            <p class="container">Potrzebujesz pomocy? <a href="#">NAPISZ!</a></p>
         </div>

         </div>
     </selection>
        );
    }
}