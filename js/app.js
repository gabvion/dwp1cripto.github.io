const botonMenu=document.querySelector('.menu-boton');
const menu=document.querySelector('#menu');
if(botonMenu&&menu){botonMenu.addEventListener('click',()=>{const abierto=menu.classList.toggle('abierto');botonMenu.setAttribute('aria-expanded',abierto);});}

const botonEscuchar=document.querySelector('#escuchar');
if(botonEscuchar){botonEscuchar.addEventListener('click',()=>{if(!('speechSynthesis' in window)){botonEscuchar.textContent='Audio no disponible';return;}speechSynthesis.cancel();const audio=new SpeechSynthesisUtterance('La criptografía protege la información mediante algoritmos y claves. Sus objetivos principales son mantener la confidencialidad, comprobar la integridad y verificar la autenticidad de los datos.');audio.lang='es-ES';audio.rate=.95;speechSynthesis.speak(audio);botonEscuchar.textContent='■ Reproduciendo resumen';audio.onend=()=>botonEscuchar.textContent='▶ Escuchar resumen';});}

const formulario=document.querySelector('#formulario');
if(formulario){formulario.addEventListener('submit',(evento)=>{evento.preventDefault();const estado=document.querySelector('#estado');if(!formulario.checkValidity()){estado.textContent='Revisa los campos obligatorios antes de continuar.';formulario.reportValidity();return;}estado.textContent='¡Mensaje preparado correctamente! Esta demostración no envía datos a un servidor.';formulario.reset();});}

const entradaCesar=document.querySelector('#cesar-entrada');
if(entradaCesar){
  const desplazamiento=document.querySelector('#cesar-desplazamiento');
  const salida=document.querySelector('#cesar-salida');
  const error=document.querySelector('#cesar-error');
  function transformar(direccion){
    const pasos=Number(desplazamiento.value);
    if(!entradaCesar.value.trim()){salida.value='';error.textContent='Escribe un mensaje para continuar.';entradaCesar.focus();return;}
    if(!Number.isInteger(pasos)||pasos<1||pasos>25){salida.value='';error.textContent='Elige un desplazamiento entero entre 1 y 25.';desplazamiento.focus();return;}
    error.textContent='';
    salida.value=Array.from(entradaCesar.value,caracter=>{
      const codigo=caracter.charCodeAt(0);
      const inicio=codigo>=65&&codigo<=90?65:codigo>=97&&codigo<=122?97:null;
      return inicio===null?caracter:String.fromCharCode(inicio+(codigo-inicio+direccion*pasos+26)%26);
    }).join('');
  }
  document.querySelector('#cesar-cifrar').addEventListener('click',()=>transformar(1));
  document.querySelector('#cesar-descifrar').addEventListener('click',()=>transformar(-1));
}
