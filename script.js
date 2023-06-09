// vamos referenciar bastante os elementos pelo id durante o projeto, essa função vai facilitar
function getId(id) {
  return document.getElementById(id);
}

// essa função vai ser utilizada para enviar mensagens de erros
function warning(text) {
  let outWarning = getId('outWarning');
  outWarning.textContent = text
}

// essa é a função responsável por registrar as contas
function register() {
  let filter = getId("filter")
  let inDescription = getId('inDescription');
  let inValue = getId('inValue');
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
    outAccountList.appendChild(hrChild)
  }
}

function createElements(tam, accountList) {
  let outAccountList = getId('outAccountList');
  let outTotal = getId('outTotal')
  let accounts = ''
  let sum = 0


  clearH4Elements()

  let biggestWord = checkLongestWord(tam, accountList)
  let n = 0;
  let space;
  let space2;
  let n0 = 0
  for (let i = 0; i < tam; i++) {

    n = (biggestWord - accountList[i].description.length)
    space = ' '.repeat(n)
    if (accountList[i].value >= 100 && accountList[i].value < 1000) {
      n0 = 1
    } else if (accountList[i].value >= 1000) {
      n0 = 2
    } else {
      n0 = 0
    }

    space2 = ' '.repeat(n0)

    accounts = `${space2}${accountList[i].description}${space} - R$ ${Number(accountList[i].value).toFixed(2)}`;
    let h4 = document.createElement('h4');
    let span = document.createElement('span');
    let text = document.createTextNode(accounts);
    span.appendChild(text);
    h4.appendChild(span)
    outAccountList.appendChild(h4);
    sum += Number(accountList[i].value);
  }
  // adicionando evento de click aos novos elementos criados
  addClass();
  outTotal.textContent = `${tam} Conta(s) - Total R$: ${sum.toFixed(2)}`;
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

function listAccounts() {
  let outTotal = getId('outTotal');
  let h4 = document.querySelectorAll('h4')

  if (!localStorage.getItem('accounts')) {
    outTotal.textContent = '';
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

let inDescription = getId('inDescription');
let inValue = getId('inValue');
inDescription.addEventListener('keyup', enter)
inValue.addEventListener('keyup', enter)

// função que vai filtrar os elementos de acordo com o usuario
function sortAccounts() {
  let filter = getId("filter")
  let accountList = [];
  if (localStorage.getItem('accounts')) {
    accountList = JSON.parse(localStorage.getItem('accounts'));;
  } else {
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


