const sair = document.getElementById("btnSair");

sair.addEventListener("click", () =>{
    fetch("/login")
      .then(() => window.location.href = "/login")
      .catch(() => console.log(err));
});

let charData = {
    labels: ['água', 'carbo', 'poteínas', 'gorduras'],
    data: [4000, 400, 180, 30],
    }
    
    const myChart = document.getElementById("meu-grafico");
    let GRFX = new Chart(myChart, {
        type: "doughnut",
        data: {
            labels: charData.labels,
            datasets: [
                {
                    label: 'aaaa',
                    data: charData.data,
                },
            ]
        }
    });
    
    function mostrarChat(){
        if(document.getElementById("chat").style.display == "block"){
            document.getElementById("chat").style.display = "none";
        }else{
            document.getElementById("chat").style.display = "block";
        }
    }
    
    function addMacro(){
        const macroTipo = document.getElementById("macro").value;
        const macroValor = parseFloat(document.getElementById("macroValor").value);
    
        if(!isNaN(macroValor)){
            if(macroTipo == "agua"){
                charData.data[0] += macroValor;
                GRFX.update();
            }
            else if(macroTipo == "carbo"){
                charData.data[1] += macroValor;
                GRFX.update();
            }
            else if(macroTipo == "proteina"){
                charData.data[2] += macroValor;
                GRFX.update();
            }
            else if(macroTipo == "gordura"){
                charData.data[3] += macroValor;
                GRFX.update();
            }
        }
    }