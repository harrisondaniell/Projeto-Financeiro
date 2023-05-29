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


function listAccounts() {
  let outAccountList = getId('outAccountList');
  let outTotal = getId('outTotal')

  if (!localStorage.getItem('names')) {
    outAccountList.textContent = '';
    outTotal.textContent = '';
    return;
  }


  let listNames = localStorage.getItem('names').split(';');
  let listValues = localStorage.getItem('values').split(';');
  let accounts = ''
  let sum = 0
  let separator = '--------------------------------\n';
  let tam = listNames.length;
  for (let i = 0; i < tam; i++) {
    accounts += `${listNames[i]} - R$ ${Number(listValues[i]).toFixed(2)} \n`
    sum += Number(listValues[i]);
  }

  outAccountList.textContent = `${tam} Conta(s) - Total R$: ${sum.toFixed(2)}`;
  outTotal.textContent = separator + accounts;
}

listAccounts()

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
    title.textContent = 'Mr.Robot do Financeiro';
  } else {
    theme.textContent = 'DarkMode'
    theme.classList.toggle('temaWhite');
    theme.classList.toggle('temaBlack');
    title.textContent = 'Pantera do Financeiro';
  }
}
document.getElementById('planoDeFundo').addEventListener('click', switchTheme)
