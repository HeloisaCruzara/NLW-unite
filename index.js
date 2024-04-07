let participantes = [
    {
      nome: 'Helouisa',
      email: 'helou@',
      dataInscricao: new Date(2024, 2, 22, 19, 20),
      dataCheckIn: null,
    },
     {
      nome: 'andre',
      email: 'andre@gmail.com',
      dataInscricao: new Date(2024, 2, 22, 15, 30),
      dataCheckIn: new Date(2024, 2, 22, 6, 20),
    },
    {
      nome: 'Maria',
      email: 'maria@gmail.com',
      dataInscricao: new Date(2024, 2, 23, 10, 15),
      dataCheckIn: new Date(2024, 2, 23, 12, 30),
    },
    {
      nome: 'João',
      email: 'joao@gmail.com',
      dataInscricao: new Date(2024, 2, 23, 12, 45),
      dataCheckIn: null,
    },
    {
      nome: 'Ana',
      email: 'ana@gmail.com',
      dataInscricao: new Date(2024, 2, 24, 8, 30),
      dataCheckIn: new Date(2024, 2, 24, 10, 10),
    },
    {
      nome: 'Pedro',
      email: 'pedro@gmail.com',
      dataInscricao: new Date(2024, 2, 24, 9, 20),
      dataCheckIn: new Date(2024, 2, 24, 16, 40),
    },
    {
      nome: 'Mariana',
      email: 'mariana@gmail.com',
      dataInscricao: new Date(2024, 2, 25, 14, 50),
      dataCheckIn: null,
    },
    {
      nome: 'Lucas',
      email: 'lucas@gmail.com',
      dataInscricao: new Date(2024, 2, 25, 11, 10),
      dataCheckIn: new Date(2024, 2, 25, 19, 20),
    },
    {
      nome: 'Carla',
      email: 'carla@gmail.com',
      dataInscricao: new Date(2024, 2, 26, 9, 45),
      dataCheckIn: new Date(2024, 2, 26, 14, 10),
    },
    {
      nome: 'Rafael',
      email: 'rafael@gmail.com',
      dataInscricao: new Date(2024, 2, 26, 13, 20),
      dataCheckIn: new Date(2024, 2, 26, 16, 50),
    }
  ];
  
  const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  
    if (participante.dataCheckIn == null) {
      dataCheckIn = `
        <button
        data-email='${participante.email}'
        onclick='fazerCheckIn(event)'
        >
        Confirmar check-in
        </button>
      `
    }
  
    return `
        <tr>
          <td>
            <strong>
             ${participante.nome}
            </strong>
            <br>
            <small>
              ${participante.email}
            </small>
          </td>
          <td>${dataInscricao}</td>
          <td>${dataCheckIn}</td>
      </tr>
    `
  }
  const atualizarLista = (participantes) => {
    let output = ''

    for (let participante of participantes){
      output = output + criarNovoParticipante(participante)
    }
  
    document.querySelector('tbody').innerHTML = output
  }
  
  atualizarLista(participantes)
  
  const adicionarParticipante = (event) => {

    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)
  
    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
    }

    const participanteExiste = participantes.find(
      (p) => {
        return p.email == participante.email
      }
    )
  
    if (participanteExiste) {
      alert('Email já cadastrado')
      return
    }
  
  
    participantes = [participante, ...participantes]
    atualizarLista(participantes)
  
    //limpar o formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
  }
  
  const fazerCheckIn = (event) => {
  

    const mensagemConfirmacao = 'tem certeza de fazer check-in?'
    if(confirm(mensagemConfirmacao)== false) {
      return
    }
  
    const participante = participantes.find((p) => {
      return p.email == event.target.dataset.email
  
    })

    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
  }