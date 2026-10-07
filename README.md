# Motion Capibara 🦫

Uma demonstração interativa de componentes de interface com microinterações elásticas, animações em cascata e uma capivara como protagonista.

> Explore botões, cards, toggle, slider, acordeão, alertas e animações — tudo construído com React e Motion.

## ✨ O que você encontra

- **Botões** com quatro variantes (`primary`, `secondary`, `ghost` e `danger`) e três tamanhos.
- **Cards** de perfil e suporte com efeitos de hover.
- **Toggle** e **slider** para controles de interface.
- **Acordeão** com abertura animada e itens em sequência.
- **Alerta interativo** com animações de entrada e saída.
- **Animações de demonstração**: capivara pulando, ícones em cascata, efeito de inclinação 3D e fundo em gradiente.
- **Layout responsivo** com estética em tons de laranja e efeito de vidro.

O projeto é uma vitrine de UI: alguns textos e botões são demonstrativos e não representam integrações funcionais com API, suporte ou navegação.

## 🧰 Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Motion for React](https://motion.dev/)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

## 🚀 Como executar

### Pré-requisitos

- Node.js (20.19+ ou 22.12+)
- npm

### Instalação e desenvolvimento

```bash
git clone https://github.com/mqrcio99/motioncapibara.git
cd motioncapibara
npm install
npm run dev
```

Abra no navegador o endereço indicado pelo Vite no terminal (normalmente `http://localhost:5173`).

## 📜 Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão de produção na pasta `dist/`. |
| `npm run preview` | Serve localmente a versão gerada para pré-visualização. |
| `npm run lint` | Executa o Oxlint para verificar o código. |

## 📁 Estrutura principal

```text
motioncapibara/
├── public/                 # Arquivos públicos e ícones
├── src/
│   ├── assets/             # Imagens e recursos visuais
│   ├── App.jsx             # Componentes e demonstração principal
│   ├── App.css             # Estilos da interface
│   ├── index.css           # Estilos globais
│   └── main.jsx            # Ponto de entrada do React
├── index.html
├── package.json
└── vite.config.js
```

## 🧪 Verificações locais

```bash
npm run lint
npm run build
```

## 📄 Licença

Nenhuma licença está informada neste repositório. Consulte o autor antes de reutilizar ou redistribuir o projeto.

### Descrição curta para o repositório

```text
Demonstração interativa de componentes de interface com React e Motion: microinterações, animações elásticas e uma capivara como protagonista.
```