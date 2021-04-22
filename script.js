/**
 * Tranzactie: { valoare, momentulTranzactiei }
 */

function contBancar(numeCont, sumaInitiala, valutaContului) {
  const nume = numeCont;
  const valuta = valutaContului;
  let suma = sumaInitiala;
  const listaTranzactii = [];

  function adauga(valoare) {
    suma += valoare;
    adaugaTranzactie(valoare);
  }

  function retrage(valoare) {
    if (suma < valoare) {
      alert("You have insufficient funds");
      return;
    }
    suma -= valoare;
    adaugaTranzactie(-valoare);
  }

  function adaugaTranzactie(valoare) {
    // metoda privata, nu avem acces la ea din afara
    const tranzactie = { valoare: valoare, momentulTranzactiei: new Date() };
    listaTranzactii.push(tranzactie);
  }

  function interogheazaSold() {
    console.log(
      `Contul "${nume}" are la momentul actual suma de ${suma} ${valuta}`
    );
    const numberSum = Number(suma);
    if (!numberSum) {
      return;
    }
    const balance = document.getElementById('balanta');
    balance.textContent = `Current balance: ${numberSum} ${valuta}`;
  }

  function afiseazaListaDeTranzactii() {
    console.log(`-------- Tranzactii ${numeCont} ---------`);
    if (listaTranzactii.length === 0) {
      console.log("Nu ai efectuat nicio tranzactie pana acum");
    } else {
      for (let tranzactie of listaTranzactii) {
        console.log(
          `Ai efectuat o tranzactie de ${tranzactie.valoare} ${valuta} in data de ${tranzactie.momentulTranzactiei}`
        );
      }
    }
  }

  return {
    suma, // este valoarea din momentul executiei metodei contBancar (ramane blocata in timp, indiferent de ce modificari aducem la variabila suma in afara contextului de executie)
    adauga,
    retrage,
    interogheazaSold,
    afiseazaListaDeTranzactii
  };
}

  // Am formatat data pentru o afisare mai ok 
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() +1; 
  let yyyy = today.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  today = `${mm} / ${dd} / ${yyyy}`;

  const deposit = document.getElementById('deposit');
  const withdraw = document.getElementById('withdraw');
  const tBody = document.getElementsByTagName('tbody')[0];
  const input = document.getElementsByTagName('input')[0];
  const contCostel = contBancar('Costel', 0, 'EUR');

  // Cod pentru numerotarea randurilor
  const rows = document.getElementsByTagName('table')[0].rows;
  const tb = tBody.rows;



  deposit.addEventListener('click', function() {
    const row = document.createElement('tr');
    tBody.appendChild(row);
    const tData = document.createElement('td');
    row.appendChild(tData).textContent = tb.length;
    const newData = document.createElement('td');
    row.appendChild(newData).textContent = today;
    const operation = document.createElement('td');
    row.appendChild(operation).textContent = 'Deposit';
    const amount = document.createElement('td');
    const numInput = Number(input.value);
    row.appendChild(amount).textContent = numInput;

    let iNumber = numInput;
    contCostel.adauga(iNumber);
    contCostel.interogheazaSold();

    // Cod pentru validare
    if (numInput === 0) {
      alert("You can't deposit 0 EUR")
      row.remove();
    } else if (!numInput) {
    alert('You must use numbers!')
    row.remove();
    }
    
    input.value = '';
  });

  withdraw.addEventListener('click', function() {
    const row = document.createElement('tr');
    tBody.appendChild(row);
    const tData = document.createElement('td');
    row.appendChild(tData).textContent = tb.length;
    const newData = document.createElement('td');
    row.appendChild(newData).textContent = today;
    const operation = document.createElement('td');
    row.appendChild(operation).textContent = 'Withdraw';
    const amount = document.createElement('td');
    const numInput = Number(input.value);
    row.appendChild(amount).textContent = numInput;
    let iNumber2 = numInput;
    contCostel.retrage(iNumber2); 
    contCostel.interogheazaSold();

     // Cod pentru validare
     if (numInput == 0) {
      alert("You can't withdraw 0 EUR!")
      row.remove();
    } else if (!numInput) {
      alert('You must use numbers!')
      row.remove();
    }

    input.value = '';
  });


  

  



