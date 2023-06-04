// vamos referenciar bastante os elementos pelo id durante o projeto, essa função vai facilitar
function getId(id) {
  return document.getElementById(id);
}

// essa função vai ser utilizada para enviar mensagens de erros
function warning(text) {
  let outWarning = getId('outWarning');
  outWarning.textContent = text
}

// essa é a função principal, vai trabalhar com as váriaveis globais
function register() {
  let inDescription = getId('inDescription');
  let inValue = getId('inValue');
  let outAccountList = getId('outAccountList');
  let outTotal = getId('outTotal');
  let description = inDescription.value;
  let value = Number(inValue.value);

  if ((value == 0 || isNaN(value)) && description == '') {
    warning('Informe os dados da conta')
    inDescription.focus()
    return;
  } else if (description == '') {
    warning('Informe o nome da conta')
    inDescription.focus()
    return
  } else if (value == 0 || isNaN(value) || inValue.value == '') {
    warning('Informe um valor válido.');
    inValue.focus();
    return;
  }

  let listNames;
  let listValues;
  if (!localStorage.getItem('names') && !localStorage.getItem('values')) {
    localStorage.setItem('names', description)
    localStorage.setItem('values', value)
  } else {
    listNames = localStorage.getItem('names') + ';' + description
    listValues = localStorage.getItem('values') + ';' + value

    localStorage.setItem('names', listNames)
    localStorage.setItem('values', listValues)
  }

  listAccounts()

  inDescription.value = '';
  inValue.value = '';
  warning('')
  inDescription.focus();
}

const btnRegister = document.getElementById('btnRegister');
btnRegister.addEventListener('click', register);

function clearH4Elements() {
  let h4Elements = document.querySelectorAll('h4');
  h4Elements.forEach(function (element) {
    element.remove();
  });
}

function listAccounts() {
  let outAccountList = getId('outAccountList');
  let outTotal = getId('outTotal');
  let h4 = document.querySelectorAll('h4')

  if (!localStorage.getItem('names')) {
    outAccountList.textContent = '';
    outTotal.textContent = '';
    return;
  }

  let listNames = localStorage.getItem('names').split(';');
  let listValues = localStorage.getItem('values').split(';');
  let accounts = ''
  let sum = 0
  let tam = listNames.length;

  if (h4.length == listNames.length) {
    return;
  }

  if (document.getElementsByTagName('hr').length === 0) {
    let hr = document.createElement('hr')
    outTotal.appendChild(hr)
  }
  clearH4Elements();

  for (let i = 0; i < tam; i++) {
    accounts = `${listNames[i]} - R$ ${Number(listValues[i]).toFixed(2)} \n`
    let h4 = document.createElement('h4'); // cria o elemento HTML h5
    let span = document.createElement('span');
    let text = document.createTextNode(accounts); // cria um texto
    span.appendChild(text); // define que o texto será filho de h5
    h4.appendChild(span)
    outTotal.appendChild(h4); // ...e que h5 será filho de divQuadro
    sum += Number(listValues[i]);
  }
  outAccountList.textContent = `${tam} Conta(s) - Total R$: ${sum.toFixed(2)}`;
  // outTotal.textContent = accounts;
}

listAccounts()

// Alterando estilo e cor dos elementos h4 clicados
function mudarCor() {
  warning('')
  this.classList.toggle('vermelho');
}

let span = document.querySelectorAll('span');
span.forEach(function (element) {
  element.addEventListener('click', mudarCor);
});




function itemRemove() {
  let span = document.querySelectorAll('span');
  let tam = span.length;
  let flag = 0;
  let listNames = localStorage.getItem('names').split(';');
  let listValues = localStorage.getItem('values').split(';');
  warning('');

  for (let i = tam - 1; i >= 0; i--) {
    if (span[i].classList.contains('vermelho')) {
      span[i].remove();
      listNames.splice(i, 1);
      listValues.splice(i, 1);
      flag++;
    }
  }

  if (flag === 0) {
    warning('Selecione alguma conta primeiro');
  } else {
    localStorage.setItem('names', listNames.join(';'));
    localStorage.setItem('values', listValues.join(';'));
    warning('');
  }
}


let btnItemRemove = getId('btnRemoveItem');
btnItemRemove.addEventListener('click', itemRemove)


// função vai ser utilizada como callback do evento keyup
function enter(event) {
  event.preventDefault()
  if (event.key === 'Enter') {
    register()
  }
}

let inDescription = document.getElementById('inDescription');
let inValue = document.getElementById('inValue');
inDescription.addEventListener('keyup', enter)
inValue.addEventListener('keyup', enter)


function clearList() {
  if (!localStorage.getItem('names')) {
    warning('A lista já está vazia');
    return;
  }

  let confirmation = confirm('Deseja apagar os dados da lista de conta atual?')
  if (confirmation) {
    localStorage.removeItem('names');
    localStorage.removeItem('values');

    listAccounts()
    return;
  } else {
    return;
  }
}

const btnClearList = document.getElementById('btnClearList');
btnClearList.addEventListener('click', clearList)

function switchTheme() {
  document.body.classList.toggle('is-light');
  document.body.classList.toggle('is-dark');

  let myImage = document.getElementById('minha-imagem');
  let
    theme = document.getElementById('planoDeFundo');
  let title = document.getElementById('title')

  if (
    theme.textContent == 'DarkMode') {

    theme.textContent = 'LightMode'

    theme.classList.toggle('temaWhite');
    theme.classList.toggle('temaBlack');
    // title.textContent = 'Mr.Robot do Financeiro';
  } else {
    theme.textContent = 'DarkMode'
    theme.classList.toggle('temaWhite');
    theme.classList.toggle('temaBlack');
    // title.textContent = 'Pantera do Financeiro';
  }
}
document.getElementById('planoDeFundo').addEventListener('click', switchTheme)
