const cadastro = document.getElementById("cadastro");
const voltar = document.getElementById("voltar");

if(cadastro != undefined){
    cadastro.addEventListener("click", () => {
        fetch("/cadastro")
            .then(() => window.location.href = "/cadastro")
            .catch(() => console.log(err))
    });
}

if(voltar != undefined){
    voltar.addEventListener("click", () => {
        fetch("/cadastro")
            .then(() => window.location.href = "/login")
            .catch(() => console.log(err))
    });
}