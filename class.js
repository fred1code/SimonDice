const azul = document.getElementById("azul");
const rojo = document.getElementById("rojo");
const amarillo = document.getElementById("amarillo");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
var ULTIMO_NIVEL = 10;
var DURACION_ILUMINACION = 500;
var ILUMINAR_SECUENCIA = 1000;

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    setTimeout(() => {
    this.siguienteNivel();
    }, 800);
    
  }



  inicializar() {
    //this.dificultad();
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.colores = {
      azul,
      rojo,
      amarillo,
      verde,
    };
  }

  toggleBtnEmpezar(){
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide');
    }else{
      btnEmpezar.classList.add('hide');
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
    setTimeout(() => {
      this.agregarCursorPointer();
    }, 1);
    
  }

  trasformarNumeroAcolor(numero) {
    switch (numero) {
      case 0:
        return "azul";

      case 1:
        return "rojo";

      case 2:
        return "amarillo";

      case 3:
        return "verde";
    }
  }

  trasformarColorAnumero(color) {
    switch (color) {
      case "azul":
        return 0;

      case "rojo":
        return 1;

      case "amarillo":
        return 2;

      case "verde":
        return 3;
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      cambiarLv(i+1);
      const color = this.trasformarNumeroAcolor(this.secuencia[i]);
      setTimeout(() => {
        this.iluminarColor(color);
      }, ILUMINAR_SECUENCIA * i);
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => {
      this.colores[color].classList.remove("light");
    }, DURACION_ILUMINACION);
  }

  agregarEventosClick() {
    this.colores.azul.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
    this.colores.amarillo.addEventListener("click", this.elegirColor);
    this.colores.rojo.addEventListener("click", this.elegirColor);
  }
  
  eliminarEventosClick() {
    this.colores.azul.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
    this.colores.amarillo.removeEventListener("click", this.elegirColor);
    this.colores.rojo.removeEventListener("click", this.elegirColor);
  }

  eliminarCursorPointer(){
    azul.classList.remove('cursorP');
    rojo.classList.remove('cursorP');
    amarillo.classList.remove('cursorP');
    verde.classList.remove('cursorP');
   

  }

  agregarCursorPointer(){
  azul.classList.add('cursorP');
   rojo.classList.add('cursorP');
   amarillo.classList.add('cursorP');
   verde.classList.add('cursorP');
  }

  elegirColor(ev) {
    const nombre = ev.target.dataset.color;
    const numero = this.trasformarColorAnumero(nombre);
    //console.log(`color selecionado = ${nombre} que es el numero: ${numero}`);
    this.iluminarColor(nombre);
    if (numero === this.secuencia[this.subnivel]) {
      console.log("color correcto");
      this.subnivel++;
      //console.log(` el subnivel es = ${this.subnivel} y el nivel actual es = ${this.nivel}`)
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();
        this.eliminarCursorPointer();
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego();
          
        } else {
         setTimeout(() => {
          //console.log('SIGUIENTE NIVEL ENABLE');
            this.siguienteNivel();
          }, 1500);
          
        }
      }

    } else {
      //perdio
      this.perdioElJuego();
    }
  }


ganoElJuego(){
  swal('GANASTE', '👍!!', 'success')
  .then(()=>{
    this.inicializar().bind(this);
  })
}

perdioElJuego(){
  swal('PERDISTE', '👎!!', 'error')
  .then(()=>{
    this.eliminarEventosClick();
    this.eliminarCursorPointer();
    this.inicializar();
  })
}


}




function cambiarLv(l){
  const lv = document.getElementById('lv').innerText = `LV ${l}`;
}

cambiarLv('0');

function empezarJuego() {
  
  window.juego = new Juego();
}

dificultad();

function   dificultad(){
  swal('Elige el nivel de dificultad', {
    buttons: {
      facil: "Fácil ",
      dificil:"Difícil",
      legenda:"Leyenda",
      dios:"Dios"
    },
  })
  .then((value) => {
    switch (value) {
      case "facil":
       ULTIMO_NIVEL=5;
      break;
      case "dificil":
        ULTIMO_NIVEL=10;
        DURACION_ILUMINACION=400;
        ILUMINAR_SECUENCIA=800;
      break;
      case "legenda":
        ULTIMO_NIVEL=30;
        DURACION_ILUMINACION=250;
        ILUMINAR_SECUENCIA=500;
      break;
      case "dios":
        ULTIMO_NIVEL=100;
        DURACION_ILUMINACION=150;
        ILUMINAR_SECUENCIA=350
      break;

    }
  });
}