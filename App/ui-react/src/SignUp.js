import React from "react";

export default class SignUp extends React.Component {

constructor(){
    super()
    this.state={
        username:'',
        password:'',
        passwordAgain:'',
        email:''
    }
}

onUserUpdate(field,event){
    console.log(field+':'+event.target.value);
    if(field=='username'){
        this.setState({
            username:event.target.value
        })
        return
    }
    if(field=='password'){
        this.setState({ 
            password:event.target.value
        })
        return
    }
    if(field=='passwordAgain'){
        this.setState({
            passwordAgain:event.target.value
        })
        return
    }
    if(field=='email'){
        this.setState({
         email:event.target.value
        })
        return
    }
}
addUser(event){
    const user={
        username:this.state.username,
        password:this.state.username,
        passwordAgain:this.state.username,
        email:this.state.email
    }

   if(this.state.password==this.state.passwordAgain){
         console.log("DODANO:"+JSON.stringify(user));
}}

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
                        <input onChange={this.onUserUpdate.bind(this,'username')} type="text" class="form-control" id="usrname" placeholder="Wpisz nazwę użytkownika"></input>
                    </div>
                    <div class="form-group">
                        <label for="psw"><span class="glyphicon glyphicon-pencil"></span> Hasło</label>
                        <input onChange={this.onUserUpdate.bind(this, 'password')} type="password" class="form-control" id="psw" placeholder="Wpisz hasło"></input>
                        <label for="psw"><span class="glyphicon glyphicon-pencil top-buffer"></span> Powtórz hasło</label>
                        <input onChange={this.onUserUpdate.bind(this, 'passwordAgain')} type="password" class="form-control" id="psw_2" placeholder="Wpisz hasło"></input>
                        <label for="email"><span class="glyphicon glyphicon-envelope top-buffer"></span> Email</label>
                        <input onChange={this.onUserUpdate.bind(this, 'email')} type="email" class="form-control" id="email" placeholder="Wpisz email"></input>
                    </div>
                    <button onClick={this.addUser.bind(this)} type="submit" class="btn my-btn btn-block "><span class="glyphicon glyphicon-off"></span>Zarejestruj się</button>
                    </form>
                    <div class="modal-footer top-buffer">
                        <p class="container">Potrzebujesz pomocy? <a href="#">NAPISZ!</a></p>
                    </div>
                </div>
             </selection>      
        );
    }
}