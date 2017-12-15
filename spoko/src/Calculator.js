import React from "react";

export default class Calculator extends React.Component {
    render() {
        return ( 
<selection>
         <div>
            <div class="logo">KALKULATORY</div>
        </div>
         <div class="container bmi">
            <div class="row">
                <div class=" col-lg-4 a1"></div>
                <div class="col-lg-3 a4">
                    <strong>Co to jest BMI?</strong>
                     <p class="p_wrap">BMI jest to wskaźnik masy ciała(ang. Body Mass Index). Oliczając BMI pomożemy określić czy Twoja waga jest prawidłowa. Prawidłowa masa ciała powinna mieścić się między 18,5 a 25. BMI to iloraz masy ciała(liczony w kg) oraz wzrostu(podniesionego do kwadratu).</p>
                </div>
                <div class=" col-lg-5 a2">
                    <strong>Płeć:</strong>
                    <div class="radio">
                        <label class="radio-inline">
                            <input type="radio" name="radio1" checked value="mężczyzna"></input>
                        </label>
                    </div>
                    <div class="radio">
                        <label class="radio-inline">
                            <input type="radio" name="radio1" value="kobieta"></input>
                        </label>
                    </div>
                    <strong>Masa ciała(kg):</strong>
                    <input type="text" class="form-control" placeholder="Ile ważysz?" id="bodyWeight"></input>
                    <strong>Wzrost(cm):</strong>
                    <input type="text" class="form-control" placeholder="Ile masz wzrostu?" id="bodyHight"></input>
                    <button type="submit" class="btn bodySubmit">OBLICZ</button>
                </div>
            </div>
        </div>    

          <div class="container energy">
            <div class="row">
                <div class=" col-lg-4 a2">
                    <strong>Płeć:</strong>
                    <div class="radio">
                        <label class="radio-inline">
                            <input type="radio" name="radio2" checked value="mężczyzna"></input>
                        </label>
                    </div>
                    <div class="radio">
                        <label class="radio-inline">
                            <input type="radio" name="radio2" value="kobieta"></input>
                        </label>
                    </div>
                    <strong>Wiek:</strong>
                    <input type="text" class="form-control" id="age" placeholder="Ile masz lat?"></input>
                    <strong>Masa ciała(kg):</strong>
                    <input type="text" class="form-control" placeholder="Ile ważysz?" id="bodyWeight"></input>
                    <strong>Wzrost(cm):</strong>
                    <input type="text" class="form-control" placeholder="Ile masz wzrostu?" id="bodyHight"></input>
                    <strong>Określ swoją aktywność fizyczną:</strong>
                    <select class="form-control">
                        <option>Określ aktywność fizyczną:</option>
                        <option>brak akytwnosci fizycznej(praca siedząca)</option>
                        <option>bardzo mała(praca lekka, raz w tygodnu ćwiczenia)</option>
                        <option>średnia(3/4 razy w tygodniu ćwiczenia ficzyczne)</option>
                        <option>duża(ponad 4 razy w tygodniu ćwiczenia ficzyczne)</option>
                        <option>wysoka(praca fizyczna, bardzo cieżkie treningi)</option>
                    </select>
                    <button type="submit" class="btn bodySubmit">OBLICZ</button>
                </div>
                <div class="col-lg-3 a4">
                    <strong>Zapotrzebowanie energetyczne...</strong>
                    <p class="p_wrap">wyliczmy Ci z kalkulatora kalorii. Liczbę kalorii dostosujemy do Twojej aktywności fizycznej. Nie tylko, powiemy Ci ile spalasz dziennie kalorii, ale także ile spala Twój organiz w pozycji spoczynkowej. Te informacje ułatwią Ci wybranie diety. Proponujemy:</p>
                    <p class="p_wrap">-aby schudnać, odejmij około 300-500 kalorii od zapotrzebiwania energetycznego,</p>
                    <p class="p_wrap">-aby przytyć dodaj 300-500 kalorii do zapotrzebowania energetycznego</p>
                    <p class="p_wrap">-natomiast, jeżeli chcesz zachować swoją mase ciała, jedź tyle kalorii ile wynosi Twoje zapotrzebiwanie energetyczne</p>
                </div>
                <div class=" col-lg-5 a1">1</div>
            </div>
        </div> 
</selection>
        );
    }

}