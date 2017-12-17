import React from "react";

export default class Login extends React.Component {

    render() {
        return (
            <selection>
              <div>
                <div class="logo"><span class="glyphicon glyphicon-log-in"></span> ZALOGUJ SIĘ</div>
              </div>
              <div class="myModal container">
                 <form role="form">
                    <div class="form-group">
                        <label><span class="glyphicon glyphicon-user"></span>Nazwa użytkownika</label>
                        <input type="text" class="form-control" id="usrname" placeholder="Wpisz nazwę użytkownika"></input>
                    </div>
                    <div class="form-group">
                        <label for="psw"><span class="glyphicon glyphicon-pencil"></span> Hasło</label>
                        <input type="text" class="form-control" id="psw" placeholder="Wpisz hasło"></input>
                    </div>
                    <button type="submit" class="btn my-btn btn-block"><span class="glyphicon glyphicon-off"></span>Logowanie</button>
                </form>
                <div class="modal-footer top-buffer">
                    <p class="container">Nie pamiętasz hasła? <a href="#">PRZYPOMNIJ!</a></p>
               </div>
              </div>
            </selection>
          );
    }
}