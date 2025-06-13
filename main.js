let provider;
let signer;
let contract;

const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "ganador", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "votosGanador", "type": "uint256" }
    ],
    "name": "Ganador_Obtenido",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "rondaActual", "type": "uint256" }
    ],
    "name": "Ronda_Reniciar",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "voter", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "Candidato", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "have", "type": "uint256" }
    ],
    "name": "Voto",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "nombre", "type": "address" }
    ],
    "name": "candidato_agregado",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_id", "type": "address" }],
    "name": "agregarCandidato",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "candidatosPorRonda",
    "outputs": [
      { "internalType": "address", "name": "id", "type": "address" },
      { "internalType": "bool", "name": "activo", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "finalizarVotacionActual",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "ganadorPorRonda",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "iniciarNuevaRonda",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "listaCandidatosPorRonda",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "obtenerCandidatosActuales",
    "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "obtenerGanadorRonda",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "obtenerPresidente",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rondaActual",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_id", "type": "address" }],
    "name": "votarCandidato",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "votesRondaC",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "votosGanadorPorRonda",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "votosPorCandidato",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "yaVotoXRonda",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
];

async function connectWallet() {
  if (window.ethereum) {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner();
      document.getElementById("connectionStatus").classList.remove("disconnected");
      document.getElementById("connectionStatus").classList.add("connected");
      document.getElementById("connectionText").innerText = "Conectado";
      document.getElementById("currentAccount").innerText = accounts[0];
    } catch (error) {
      alert("Error al conectar wallet: " + error.message);
    }
  } else {
    alert("No se encontró una wallet compatible (MetaMask, Rabby...)");
  }
}

async function loadContract() {
  const address = document.getElementById("contractAddress").value.trim();
  if (!ethers.isAddress(address)) {
    alert("Dirección inválida del contrato");
    return;
  }
  if (!signer) {
    alert("Conecta primero tu wallet");
    return;
  }
  contract = new ethers.Contract(address, abi, signer);
  try {
    const presidente = await contract.obtenerPresidente();
    const ronda = await contract.rondaActual();
    const cuentaActual = await signer.getAddress();
    document.getElementById("isPresident").innerText = cuentaActual === presidente ? "Sí" : "No";
    document.getElementById("currentRound").innerText = ronda;
    if (cuentaActual === presidente) {
      document.getElementById("adminPanel").style.display = "block";
    } else {
      document.getElementById("adminPanel").style.display = "none";
    }
  } catch (error) {
    console.error("Error al cargar datos del contrato:", error);
    alert("Error al cargar datos del contrato: " + (error.reason || error.message));
  }
}

async function addCandidate() {
  const newCandidateAddress = document.getElementById("newCandidateAddress").value.trim();
  if (!ethers.isAddress(newCandidateAddress)) {
    alert("Dirección de candidato inválida");
    return;
  }
  if (!contract) {
    alert("Primero carga el contrato");
    return;
  }
  try {
    const tx = await contract.agregarCandidato(newCandidateAddress);
    alert("Transacción enviada. Esperando confirmación...");
    await tx.wait();
    alert("Candidato agregado correctamente");
    document.getElementById("newCandidateAddress").value = "";
    loadCandidates();
  } catch (error) {
    console.error("Error al agregar candidato:", error);
    alert("Error al agregar candidato: " + (error.reason || error.message));
  }
}

async function loadCandidates() {
  try {
    const candidatesContainer = document.getElementById("candidatesContainer");
    candidatesContainer.innerHTML = "Cargando candidatos...";
    const candidatos = await contract.obtenerCandidatosActuales();
    if (candidatos.length === 0) {
      candidatesContainer.innerHTML = "<p>No hay candidatos disponibles.</p>";
      return;
    }
    let html = "";
    candidatos.forEach((addr, index) => {
      html += `<div class="candidate-card">
        <p><strong>Candidato #${index + 1}:</strong> ${addr}</p>
        <button class="btn" onclick="voteForCandidate('${addr}')">Votar</button>
      </div>`;
    });
    candidatesContainer.innerHTML = html;
  } catch (error) {
    console.error("Error al cargar candidatos:", error);
    candidatesContainer.innerHTML = "<p>Error al cargar candidatos.</p>";
  }
}

async function voteForCandidate(candidateAddress) {
  if (!contract) {
    alert("Primero carga el contrato");
    return;
  }
  try {
    const tx = await contract.votarCandidato(candidateAddress);
    alert("Transacción enviada. Esperando confirmación...");
    await tx.wait();
    alert("¡Voto registrado exitosamente!");
    loadCandidates();
  } catch (error) {
    console.error("Error al votar:", error);
    alert("Error al votar: " + (error.reason || error.message));
  }
}

async function finalizeVoting() {
  if (!contract) {
    alert("Primero carga el contrato");
    return;
  }
  try {
    const tx = await contract.finalizarVotacionActual();
    alert("Transacción enviada. Esperando confirmación...");
    await tx.wait();
    alert("¡Votación finalizada exitosamente!");
    loadContract();
  } catch (error) {
    console.error("Error al finalizar votación:", error);
    alert("Error al finalizar votación: " + (error.reason || error.message));
  }
}

async function startNewRound() {
  if (!contract) {
    alert("Primero carga el contrato");
    return;
  }
  try {
    const tx = await contract.iniciarNuevaRonda();
    alert("Transacción enviada. Esperando confirmación...");
    await tx.wait();
    alert("¡Nueva ronda iniciada exitosamente!");
    loadContract();
  } catch (error) {
    console.error("Error al iniciar nueva ronda:", error);
    alert("Error al iniciar nueva ronda: " + (error.reason || error.message));
  }
}

async function loadCurrentResults() {
  if (!contract) {
    alert("Primero carga el contrato");
    return;
  }
  try {
    const currentRound = await contract.rondaActual();
    const winner = await contract.obtenerGanadorRonda(currentRound);
    const winnerVotes = await contract.votosGanadorPorRonda(currentRound);
    document.getElementById("resultsContainer").innerHTML = `
      <p><strong>Ronda Actual:</strong> ${currentRound}</p>
      <p><strong>Ganador:</strong> ${winner[0]}</p>
      <p><strong>Votos del Ganador:</strong> ${winnerVotes}</p>
    `;
  } catch (error) {
    console.error("Error al cargar resultados actuales:", error);
    alert("Error al cargar resultados actuales: " + (error.reason || error.message));
  }
}

async function checkTie() {
  if (!contract) {
    alert("Primero carga el contrato");
    return;
  }
  try {
    const ronda = await contract.rondaActual();
    const candidatos = await contract.obtenerCandidatosActuales();
    let maxVotos = 0;
    let empatados = [];
    for (const addr of candidatos) {
      const votos = await contract.votosPorCandidato(ronda, addr);
      if (votos > maxVotos) {
        maxVotos = votos;
        empatados = [addr];
      } else if (votos === maxVotos) {
        empatados.push(addr);
      }
    }
    if (empatados.length > 1) {
      alert("⚠️ ¡Empate detectado entre: \n" + empatados.join("\n"));
    } else if (empatados.length === 1) {
      alert("✅ No hay empate. Ganador: " + empatados[0]);
    } else {
      alert("Aún no hay votos.");
    }
  } catch (err) {
    console.error("Error al detectar empate:", err);
    alert("Error al detectar empate: " + err.message);
  }
}

async function loadRoundHistory() {
  if (!contract) {
    alert("Primero carga el contrato");
    return;
  }
  try {
    const roundsBig = await contract.rondaActual();
    const rounds = Number(roundsBig);
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = "Cargando historial...";
    let html = "";
    for (let i = 1; i < rounds; i++) {
      try {
        const winner = await contract.obtenerGanadorRonda(i);
        const winnerVotes = await contract.votosGanadorPorRonda(i);
        html += `
          <div class="round-card">
            <p><strong>Ronda #${i}:</strong></p>
            <p>Ganador: ${winner[0]}</p>
            <p>Votos del Ganador: ${winnerVotes}</p>
          </div>
        `;
      } catch (innerErr) {
        html += `
          <div class="round-card">
            <p><strong>Ronda #${i}:</strong></p>
            <p>Error al obtener ganador.</p>
          </div>
        `;
      }
    }
    historyContainer.innerHTML = html;
  } catch (error) {
    console.error("Error al cargar historial de rondas:", error);
    document.getElementById("historyContainer").innerHTML = "<p>Error al cargar historial.</p>";
  }
}

window.connectWallet = connectWallet;
window.loadContract = loadContract;
window.addCandidate = addCandidate;
window.voteForCandidate = voteForCandidate;
window.finalizeVoting = finalizeVoting;
window.startNewRound = startNewRound;
window.loadCurrentResults = loadCurrentResults;
window.checkTie = checkTie;
window.loadRoundHistory = loadRoundHistory;
