// vamos referenciar bastante os elementos pelo id durante o projeto, essa função vai facilitar
function getId(id) {
  return document.getElementById(id);
}

// essa função vai ser utilizada para enviar mensagens de erros
function warning(text) {
  let outWarning = getId('outWarning');
  outWarning.textContent = text
}

// função que vai validar os dados inseridos nos campos input
function validateData(inValue, value, inDescription, description) {
  if ((value == 0 || isNaN(value)) && description == '') {
    warning('Informe os dados da conta')
    inDescription.focus()
    return false;
  }
  if (description == '') {
    warning('Informe o nome da conta')
    inDescription.focus()
    return false
  }
  if (value == 0 || isNaN(value) || inValue.value == '') {
    warning('Informe um valor válido.');
    inValue.focus();
    return false;
  }
  return true
}

// essa é a função responsável por registrar as contas
function register() {
  let filter = getId("filter")
  let inDescription = getId('inDescription');
  let inValue = getId('inValue');
  let description = inDescription.value.trim();
  let value = Number(inValue.value.replace(/,/g, '.'));

  if (!validateData(inValue, value, inDescription, description)) {
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

  filter.value = 'filtrar';
  listAccounts()

  inDescription.value = '';
  inValue.value = '';
  warning('')
  inDescription.focus();
}

const btnRegister = document.getElementById('btnRegister');
btnRegister.addEventListener('click', register);

// função que limpa toda a lista de contas sempre que um novo elemento é adicionado
function clearH4Elements() {
  let h4Elements = document.querySelectorAll('h4');
  h4Elements.forEach(function (element) {
    element.remove();
  });
}

// função responsável por criar o hr, é chamada na função abaixo que lista as contas
function createHr(hr) {
  let outAccountList = getId('outAccountList');
  if (outAccountList.getElementsByTagName(hr).length === 0) {
    let hrChild = document.createElement(hr)
    hrChild.id = 'outHr'
    outAccountList.appendChild(hrChild)
  }
}

function checkLongestWord(tam, accountList) {
  let biggestWord = 0;
  for (let i = 0; i < tam; i++) {
    const words = accountList[i].description.split(' ');
    words.forEach((word) => {
      if (word.length > biggestWord) {
        biggestWord = word.length;
      }
    });
  }
  return biggestWord;
}

function addClass() {
  let span = document.querySelectorAll('span');
  span.forEach(function (element) {
    element.addEventListener('click', function mudarCor() {
      warning('')
      this.classList.toggle('vermelho');
    });
  });
}

function createElements(tam, accountList) {
  let outAccountList = getId('outAccountList');
  let outTotal = getId('outTotal')
  let accounts = ''
  let sum = 0

  clearH4Elements()

  let biggestWord = checkLongestWord(tam, accountList)
  let n = 0;
  let n0 = 0
  let space;
  let space2;
  let coin;

  for (let i = 0; i < tam; i++) {
    n = Math.max(biggestWord - accountList[i].description.length, 0)
    if (accountList[i].value >= 10 && accountList[i].value < 100) {
      n0 = 1
    } else if (accountList[i].value >= 100 && accountList[i].value < 1000) {
      n0 = 2
    } else if (accountList[i].value >= 1000 && accountList[i].value < 10000) {
      n0 = 4
    } else if (accountList[i].value >= 10000 && accountList[i].value < 100000) {
      n0 = 5
    } else if (accountList[i].value >= 100000 && accountList[i].value < 1000000) {
      n0 = 6
    } else if ((accountList[i].value >= 1000000 && accountList[i].value < 10000000)) {
      n0 = 8
    } else if (accountList[i].value >= 10000000 && accountList[i].value < 100000000) {
      n0 = 9
    } else {
      n0 = 0
    }

    space = ' '.repeat(n)
    space2 = ' '.repeat(n0)
    coin = accountList[i].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    accounts = `${space2}${accountList[i].description}${space} - ${coin}`;
    let h4 = document.createElement('h4');
    let span = document.createElement('span');
    let text = document.createTextNode(accounts);
    span.appendChild(text);
    h4.appendChild(span);
    outAccountList.appendChild(h4);
    sum += Number(accountList[i].value);
  }
  // adicionando evento de click aos novos elementos criados
  addClass();
  outTotal.textContent = `${tam} Conta(s) - ${sum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
}

function listAccounts() {
  let outTotal = getId('outTotal');
  let h4 = document.querySelectorAll('h4')
  let accounts = localStorage.getItem('accounts');

  if (!accounts || accounts.length == 0) {
    outTotal.textContent = '';
    clearH4Elements();
    return;
  }

  let accountList = JSON.parse(localStorage.getItem('accounts'));
  let tam = accountList.length;
  if (h4.length == tam) {
    return;
  }
  createHr('hr')
  createElements(tam, accountList)
}

listAccounts()

function itemRemove() {
  let span = document.querySelectorAll('span');
  let tam = span.length;
  let flag = 0;
  let accountList = [];

  warning('');

  if (localStorage.getItem('accounts')) {
    accountList = JSON.parse(localStorage.getItem('accounts'));;
  } else{
    warning('Sem itens para remover')
    return;
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
  if (!localStorage.getItem('accounts') || localStorage.getItem('accounts').length === 2) {
    localStorage.removeItem('accounts');
    location.reload();
  }
  listAccounts;
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

function maxCaracteres() {
  if (this.value.length >= 22) {
    this.value = this.value.slice(0, 22)
  }
}

let inDescription = getId('inDescription');
let inValue = getId('inValue');

inDescription.addEventListener('keyup', enter)
inDescription.addEventListener('input', maxCaracteres)

inValue.addEventListener('keydown', function (event) {
  const allowedKeys = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.', ','];
  if (this.value.length >= 8 && !allowedKeys.includes(event.key) && event.key !== "Backspace" && event.key !== "Enter") {
    event.preventDefault();
    return;
  }
  if (this.value.length >= 8) {
    event.preventDefault();
  }
  if (!allowedKeys.includes(event.key) && event.key !== "Backspace" && event.key !== "Enter") {
    event.preventDefault();
    return;
  }
  if (event.key === "Backspace") {
    this.value = this.value.slice(0, -1);
  }
  if (event.key === "Enter") {
    this.addEventListener('keyup', enter)
  }
});

// função que vai filtrar os elementos de acordo com o usuario
function sortAccounts() {
  let filter = getId("filter")
  let accountList = [];
  if (localStorage.getItem('accounts')) {
    accountList = JSON.parse(localStorage.getItem('accounts'));;
  }
  if (accountList.length == 0) {
    warning('Sem Contas para filtrar')
    return;
  }
  let tam = accountList.length;

  if (filter.value == 'maior') {
    accountList.sort((a, b) => b.value - a.value);
    createElements(tam, accountList)
    console.log(accountList);
    return;
  } else if (filter.value == 'menor') {
    accountList.sort((a, b) => a.value - b.value);
    createElements(tam, accountList)
  } else if (filter.value == 'alfabetica') {
    accountList.sort((a, b) => {
      const nameA = a.description.toUpperCase();
      const nameB = b.description.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    createElements(tam, accountList);
    return;
  }
  else {
    createElements(tam, accountList)
  }
}

let filter = getId("filter")
filter.addEventListener('change', sortAccounts)

function clearList() {
  let accounts = localStorage.getItem('accounts');
  if (!accounts) {
    warning('A lista já está vazia');
    return;
  }

  let confirmation = confirm('Deseja apagar os dados da lista de conta atual?')
  if (confirmation) {
    localStorage.removeItem('accounts');
    location.reload()
  }
}

const btnClearList = document.getElementById('btnClearList');
btnClearList.addEventListener('click', clearList)


