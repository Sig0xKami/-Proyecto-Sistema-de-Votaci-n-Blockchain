# 🗳️ Sistema de Votación Blockchain

Plataforma descentralizada de votación segura y transparente construida con Solidity, Ethers.js y HTML/CSS/JS puro.

## 🚀 Demo en Vivo

👉 [Ver demo en github page](https://sig0xkami.github.io/-Proyecto-Sistema-de-Votaci-n-Blockchain/) *(Requiere MetaMask o navegador compatible con Ethereum)*


---

## 🛠️ Tecnologías

- **Solidity** (contrato inteligente)
- **Ethers.js v6** (interacción con la blockchain)
- **HTML / CSS / JavaScript Vanilla**
- **Netlify** (deploy del frontend)

---

## ⚙️ Funcionalidades

- Conexión a wallet (MetaMask, Rabby, Brave, etc.)
- Agregar candidatos (solo el presidente)
- Votación por candidatos
- Detección de ganador por ronda
- Historial de rondas
- Detección de empates
- Control de acceso por rol (presidente / votante)

---

## 🧠 Arquitectura

- `VotingCandidatso.sol`: Contrato principal, controla rondas, votos, empates y administración.
- `main.js`: Lógica de conexión con la blockchain y control del frontend.
- `index.html`: Estructura visual.
- `style.css`: Estilos personalizados.

---


