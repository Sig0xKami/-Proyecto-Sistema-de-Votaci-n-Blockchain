// main.js

let provider;// Proveedor de Ethereum
let signer;// Firmante de transacciones
let contract;// Contrato inteligente

// ABI recortado solo para probar obtenerPresidente y rondaActual
const abi = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "ganador",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "votosGanador",
          "type": "uint256"
        }
      ],
      "name": "Ganador_Obtenido",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rondaActual",
          "type": "uint256"
        }
      ],
      "name": "Ronda_Reniciar",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "Candidato",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "have",
          "type": "uint256"
        }
      ],
      "name": "Voto",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "nombre",
          "type": "address"
        }
      ],
      "name": "candidato_agregado",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_id",
          "type": "address"
        }
      ],
      "name": "agregarCandidato",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "candidatosPorRonda",
      "outputs": [
        {
          "internalType": "address",
          "name": "id",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "activo",
          "type": "bool"
        }
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ganadorPorRonda",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
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
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listaCandidatosPorRonda",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "obtenerCandidatosActuales",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "obtenerGanadorRonda",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "obtenerPresidente",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rondaActual",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_id",
          "type": "address"
        }
      ],
      "name": "votarCandidato",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "votesRondaC",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "votosGanadorPorRonda",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "votosPorCandidato",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "yaVotoXRonda",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  
];

// Paso 1: Conexión a wallet
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



//Ahora añadimos la función para que, después de conectar la wallet, se pueda cargar un contrato usando la dirección introducida en el input #contractAddress.
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

    // Mostrar el panel si es presidente
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

    // Limpio input y recargo candidatos (si tienes esa función)
    document.getElementById("newCandidateAddress").value = "";
    loadCandidates();  // Si tienes esta función para refrescar lista de candidatos

  } catch (error) {
    console.error("Error al agregar candidato:", error);
    alert("Error al agregar candidato: " + (error.reason || error.message));
  }
}


async function addCandidate() {
  const newCandidateAddress = document.getElementById("newCandidateAddress").value.trim();
  //value trim es para eliminar espacios al principio y al final

  if (!ethers.isAddress(newCandidateAddress)) {
    alert("Por favor ingresa una dirección válida de candidato.");
    return;
  }

  try {
    // Mandar la transacción al contrato
    const tx = await contract.agregarCandidato(newCandidateAddress);
    alert("Transacción enviada. Esperando confirmación...");

    // Esperar a que se mine la transacción
    await tx.wait();
    alert("¡Candidato agregado exitosamente!");

    // Opcional: recargar lista de candidatos o interfaz
    loadCandidates();

    // Limpiar input
    document.getElementById("newCandidateAddress").value = "";

  } catch (error) {
    console.error("Error al agregar candidato:", error);
    alert("Error al agregar candidato: " + (error.reason || error.message));
  }
}

async function loadCandidates() {
  try {
    const candidatesContainer = document.getElementById("candidatesContainer");
    candidatesContainer.innerHTML = "Cargando candidatos...";

    // Llamar a la función del contrato que devuelve array de direcciones
    const candidatos = await contract.obtenerCandidatosActuales();

    if (candidatos.length === 0) {
      candidatesContainer.innerHTML = "<p>No hay candidatos disponibles.</p>";
      return;
    }

    // Construir el HTML para mostrar candidatos
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

    // Opcional: recargar lista de candidatos o interfaz
    loadCandidates();

  } catch (error) {
    console.error("Error al votar:", error);
    alert("Error al votar: " + (error.reason || error.message));
  }
}

// Función para finalizar la votación actual
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
    // Recargar datos del contrato
    loadContract();
  }
  catch (error) {
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

    // Recargar datos del contrato
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
 // Obtener los candidatos de la ronda actual
    for (const addr of candidatos) {
      // Verificar si el candidato está activo`
      const votos = await contract.votosPorCandidato(ronda, addr);
      // console.log(`Candidato: ${addr}, Votos: ${votos}`); // <-- DEBUG
      // Si el candidato no está activo, lo ignoramos
      if (votos > maxVotos) {
        // Si encontramos un nuevo máximo, reiniciamos la lista de empatadoss
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
    const roundsBig = await contract.rondaActual(); // <- ¿Qué tipo es esto?
    const rounds = Number(roundsBig); // Nos aseguramos de convertirlo a número

    // console.log("Total de rondas:", rounds); // <-- DEBUG

    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = "Cargando historial...";

    let html = "";

    for (let i = 1; i < rounds; i++) {
      try {
        const winner = await contract.obtenerGanadorRonda(i);
        const winnerVotes = await contract.votosGanadorPorRonda(i);

        // console.log(`Ronda ${i} → Ganador:`, winner, "Votos:", winnerVotes); // <-- DEBUG

        html += `
          <div class="round-card">
            <p><strong>Ronda #${i}:</strong></p>
            <p>Ganador: ${winner[0]}</p>
            <p>Votos del Ganador: ${winnerVotes}</p>
          </div>
        `;
      } catch (innerErr) {
        console.warn("Error en la ronda #" + i, innerErr);
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