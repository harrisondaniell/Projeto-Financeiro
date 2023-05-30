function validarSenha() {
  let outLista = document.getElementById('outLista');
  let outResposta = document.getElementById('outResposta')
  let inSenha = document.getElementById('inSenha');
  let inConfirmeSenha = document.getElementById('inConfirmarSenha');

  // faz o usuario digitar nos campos, caso não tenha feito
  let senha = inSenha.value;
  if (senha == '') {
    exibirMensagemErro('Digite sua senha.')
    inSenha.focus();
    return;
  }

  let confirmeSenha = inConfirmeSenha.value;
  if (confirmeSenha == '') {
    exibirMensagemErro('Confirme sua senha.')
    inConfirmeSenha.focus();
    return;
  }

  if (!confirmarSenha()) {
    return;
  }

  let erros = []

  var letrasMinusculas = senha.match(/[a-z]/g); // e,n,h
  var letrasMaiusculas = senha.match(/[A-Z]/g); // S,A
  var numeros = senha.match(/[0-9]/g); // 1,2,3
  var caracteresEspeciais = senha.match(/\W|_/g); // #,_,!


  if (senha.length < 8 || senha.length > 15) {
    erros.push('entre 8 e 15 caracteres')
  }
  if (!numeros || numeros.length < 1) {
    erros.push('no mínimo um número');
  }
  if (!letrasMinusculas || letrasMinusculas.length < 1) {
    erros.push('no mínimo uma letra minúscula')
  }
  if (!letrasMaiusculas || letrasMaiusculas.length < 2) {
    erros.push('no mínimo duas letras maiúsculas')
  }
  if (!caracteresEspeciais || caracteresEspeciais.length < 1) {
    erros.push('no mínimo um símbolo')
  }

  let regras = ''
  if (erros.length) {
    erros.forEach(function (item, index) {

      regras += (index + 1) + 'º- ' + item + '\n'
    });
    outLista.textContent = 'Erro... A senha deve possuir:\n ' + regras
    inSenha.focus();
    return;
  }

  exibirMensagemErro('')
  outResposta.textContent = 'Senha salva com sucesso.';

}

let btnValidar = document.getElementById('btnValidar');
btnValidar.addEventListener('click', validarSenha)

function confirmarSenha() {
  let inSenha = document.getElementById('inSenha')
  let inConfirmarSenha = document.getElementById('inConfirmarSenha')
  let outResposta = document.getElementById('outResposta')
  let outLista = document.getElementById('outLista')

  let senha = inSenha.value;
  let confirmarSenha = inConfirmarSenha.value;

  if (senha !== confirmarSenha) {
    outLista.textContent = 'As senhas não conferem'
    outResposta.textContent = ''
    return false;
  }

  return true
}


function exibirMensagemErro(mensagem) {
  let outLista = document.getElementById('outLista');
  outLista.textContent = mensagem;
}

function mostrarSenha() {
  let inSenha = document.getElementById('inSenha');
  let inConfirmarSenha = document.getElementById('inConfirmarSenha')
  let btnMostrar = document.getElementById('btnMostrar');

  if (inSenha.type == 'password' && inConfirmarSenha.type == 'password') {
    inSenha.type = 'text';
    inConfirmarSenha.type = 'text';
    btnMostrar.textContent = 'Ocultar Senha';
  } else {
    inSenha.type = 'password';
    inConfirmarSenha.type = 'password';
    btnMostrar.textContent = 'Mostrar Senha'
  }
}

let btnMostrar = document.getElementById('btnMostrar');
btnMostrar.addEventListener('click', mostrarSenha)


let inSenha = document.getElementById('inSenha').addEventListener('keydown', enter)
let inConfirmarSenha = document.getElementById('inConfirmarSenha').addEventListener('keydown', enter);

function enter(event) {
  if (event.key == 'Enter') {
    validarSenha();
  }
}

document.getElementById("meuFormulario").addEventListener("submit", function (event) {
  event.preventDefault()
})

// var palavra = "#SenhA_123!";
// var letrasMinusculas = palavra.match(/[a-z]/g); // e,n,h
// var letrasMaiusculas = palavra.match(/[A-Z]/g); // S,A
// var numeros = palavra.match(/[0-9]/g); // 1,2,3
// var caracteresEspeciais = palavra.match(/\W|_/g); // #,_,!
// var vetor5 = palavra.match(/[T-Z]/g); // null
