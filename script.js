// vamos referenciar bastante os elementos pelo id durante o projeto, essa função vai facilitar
function getId(id) {
  return document.getElementById(id);
}

// essa função vai ser utilizada para enviar mensagens de erros
function warning(text) {
  let outWarning = getId('outWarning');
  outWarning.textContent = text
}

// essa é a função principal
function register() {
  let inDescription = getId('inDescription');
  let inValue = getId('inValue');
  let outAccountList = getId('outAccountList');
  let outTotal = getId('outTotal');
  let description = inDescription.value;
  let value = Number(inValue.value);

  // validação de dados
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

  let accounts = localStorage.getItem('accounts');
  let accountList = [];
  // verificando se já existem dados no localStorage

  if (accounts) {
    accountList = JSON.parse(accounts);
  }

  accountList.push({ description: description, value: value });
  localStorage.setItem('accounts', JSON.stringify(accountList));

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

  if (!localStorage.getItem('accounts')) {
    outAccountList.textContent = '';
    outTotal.textContent = '';
    return;
  }

  let accountList = JSON.parse(localStorage.getItem('accounts'));


  let accounts = ''
  let sum = 0
  let tam = accountList.length;

  if (h4.length == tam) {
    return;
  }

  if (document.getElementsByTagName('hr').length === 0) {
    let hr = document.createElement('hr')
    outTotal.appendChild(hr)
  }
  clearH4Elements();

  for (let i = 0; i < tam; i++) {
    accounts = `${accountList[i].description} - R$ ${Number(accountList[i].value).toFixed(2)}\n`;

    let h4 = document.createElement('h4');
    let span = document.createElement('span');
    let text = document.createTextNode(accounts);

    span.appendChild(text);
    h4.appendChild(span)
    outTotal.appendChild(h4);

    sum += Number(accountList[i].value);
  }
  

  let span = document.querySelectorAll('span');
  span.forEach(function (element) {
    element.addEventListener('click', function mudarCor() {
      warning('')
      this.classList.toggle('vermelho');
    });
  });
  outAccountList.textContent = `${tam} Conta(s) - Total R$: ${sum.toFixed(2)}`;
  // outTotal.textContent = accounts;
}

listAccounts()

// Alterando estilo e cor dos elementos h4 clicados


function itemRemove() {
  let span = document.querySelectorAll('span');
  let tam = span.length;
  let flag = 0;

  warning('');

  let accountList = [];

  if (localStorage.getItem('accounts')) {
    accountList = JSON.parse(localStorage.getItem('accounts'));;
  }

  for (let i = tam - 1; i >= 0; i--) {
    if (span[i].classList.contains('vermelho')) {
      span[i].remove();
      accountList.splice(i, 1);
      flag++;
    }
  }

  if (flag == 0) {
    warning('Selecione alguma conta primeiro');
  } else {
    localStorage.setItem('accounts', JSON.stringify(accountList));
    warning('');
  }
  listAccounts()
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
  let accounts = localStorage.getItem('accounts');

  if (!accounts) {
    warning('A lista já está vazia');
    return;
  }

  let confirmation = confirm('Deseja apagar os dados da lista de conta atual?')
  if (confirmation) {
    localStorage.removeItem('accounts');
    listAccounts();
  }
}

const btnClearList = document.getElementById('btnClearList');
btnClearList.addEventListener('click', clearList)

