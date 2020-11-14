'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById('buttonInstall');
installButton.addEventListener('click', installPWA);

//el evento beforeinstallprompt de window es el evento que detecta que la ventana es instalable
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

// saveBeforeInstallPromptEvent en caso que sea instalable captura el evento y muestra el botón
function saveBeforeInstallPromptEvent(evt){
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}

// installPWA llama a deferredInstallPrompt.prompt() que realiza la pregunta si desea instalar o no 
//(la respuesta se procesa indepedientemente)
//y según la respuesta "deferredInstallPrompt.userChoice" puedo captura la respuesta "choice" 
// de choice podemo tomar "choice.outcome" (valor "accepted" para positvo)y podemos realizar alguna acción adicional
function installPWA (evt){
    deferredInstallPrompt.prompt();
    evt.srcElement.setAttribute('hidden',true);
    deferredInstallPrompt.userChoice.then((choice)=>{
        if(choice.outcome === "accepted"){
            console.log("aceptada la instalación");
        } else {
            console.log("No aceptada la instalación");
        }

        deferredInstallPrompt = null;
    })
}

//El evento se dispara cuando se termina de instalar la aplicación.
window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled (evt) {
    
    console.log("Pelis Instalada");
}