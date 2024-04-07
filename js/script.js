let participantes = [
  {
    nome: 'Mayk Brito',
    email: 'mayk@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 22, 19, 20)
  },
  {
    nome: 'Bruna ',
    email: 'mayk@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 22, 19, 20)
  },
  {
    nome: 'Mayk Brito',
    email: 'mayk@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 22, 19, 20)
  },
  {
    nome: 'Bruna',
    email: 'mayk@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 20, 22, 19, 20)
  }
];
const criarNovoParticipante = (participante) => {
  let dataInscricaoFormatada = dayjs(Date.now()).to(participante.dataInscricao);
  let dataCheckInFormatada = dayjs(Date.now()).to(participante.dataCheckIn);
  if (participante.dataCheckIn == null) {
    dataCheckInFormatada = `
            <button 
            data-email="${participante.email}"
            onclick="fazerCheckIn(event)">
                  Confirmar CheckIn
            </button>
    `;
  }
  return `<tr>
            <td><strong>${participante.nome}</strong>
            <br>
            <small>${participante.email}</small>

            </td>
            <td>${dataInscricaoFormatada}</td>
            <td>${dataCheckInFormatada}</td>
        </tr>
    `;
};
const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Realizar Checkin?';
  if (confirm(mensagemConfirmacao) == false) {
    return;
  }
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });
  participante.dataCheckIn = new Date();
  atualizarLista(participantes);
};
const adcionarParticipante = (e) => {
  e.preventDefault();
  const dadosDoFormulario = new FormData(e.target);
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  };
  const participanteExiste = participantes.find(
    (p) => p.email === participante.email
  );
  if (participanteExiste) {
    alert('email já existe');
  }
  participantes = [participante, ...participantes];
  atualizarLista(participantes);
  e.target.querySelector('[name="nome"]').value = '';
  e.target.querySelector('[name="email"]').value = '';
};
const atualizarLista = (participantes) => {
  let output = '';
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }
  document.querySelector('tbody').innerHTML = output;
};
atualizarLista(participantes);
