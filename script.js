let numberOfAccounts = 0;
let totalValue = 0;
let accounts = []

function registrar() {
  let inDescription = document.getElementById('inDescription');
  let inValue = document.getElementById('inValue');
  let accountList = document.getElementById('outAccountList');
  let outTotal = document.getElementById('outTotal');

  let description = inDescription.value;
  let value = Number(inValue.value);

  if (value == 0 || isNaN(value) && inDescription == '') {
    alert('Informe os dados corretamente')
    inDescription.focus()
    return;
  } else if (inDescription.value == '') {
    alert('Informe o nome da conta')
    inDescription.focus()
    return
  } else if (value == 0 || isNaN(value) || inValue.value == '') {
    alert('Informe um valor válido.');
    inValue.focus();
    return;
  }

  numberOfAccounts++
  totalValue += value

  let separator = '--------------------------------';
  // accounts += `${description}- R$ ${value.toFixed(2)}`
  let all = ''
  let accountData = { description: description, value: value.toFixed(2) }
  accounts.push(accountData);
  accounts.forEach(function (item) {
    all += item.description + ' R$ ' + item.value + '\n';
  })
  accountList.textContent = all + separator;
  outTotal.textContent = `${numberOfAccounts} Conta(s) - Total R$: ${totalValue.toFixed(2)}`;

  inDescription.value = '';
  inValue.value = '';
  inDescription.focus();

}

const btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.addEventListener('click', registrar);

function enter(event) {
  event.preventDefault()
  if (event.key === 'Enter') {
    registrar()
  }
}

let inDescription = document.getElementById('inDescription');
let inValue = document.getElementById('inValue');
inDescription.addEventListener('keyup', enter)
inValue.addEventListener('keyup', enter)



function limparCampos() {
  let inDescription = document.getElementById('inDescription');
  let inValue = document.getElementById('inValue');
  let accountList = document.getElementById('accountList');


  inDescription.value = '';
  inValue.value = '';
  inDescription.focus();
  // accountList.textContent = '';
}

const btnLimparCampos = document.getElementById('btnLimparCampos');
btnLimparCampos.addEventListener('click', limparCampos)

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
    myImage.src = "img/imagem3.jpg";
    title.textContent = 'Mr.Robot do Financeiro';
  } else {
    theme.textContent = 'DarkMode'
    theme.classList.toggle('temaWhite');
    theme.classList.toggle('temaBlack');
    myImage.src = "img/imagem2.jpg";
    title.textContent = 'Pantera do Financeiro';
  }
}

document.getElementById('planoDeFundo').addEventListener('click', switchTheme)
