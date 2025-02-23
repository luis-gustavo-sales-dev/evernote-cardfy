// Função para capturar os elementos e exibir no card
function capturarElementos() {
  // Seleciona todas as divs com a classe "para"
  console.log(document)

  let iframe = document.querySelector('iframe[src="/ce"]');
  let divs = [];
  if (iframe && iframe.contentDocument) {
    divs = iframe.contentDocument.querySelectorAll("div.para");
  }

  // Cria um array com os elementos completos (HTML incluindo atributos e subelementos)
  let elementos = Array.from(divs).map(div => {
    let clone = div.cloneNode(true);
    let spans = clone.querySelectorAll("span");
    spans.forEach(span => {
      let darkModeColor = span.style.getPropertyValue("--darkmode-color");
      let lightModeColor = span.style.getPropertyValue("--lightmode-color");
      if (darkModeColor && lightModeColor) {
        span.style.color = lightModeColor;
        span.style.removeProperty("--darkmode-color");
        span.style.removeProperty("--lightmode-color");
      }
    });
    return clone.outerHTML;
  });

  elementos = elementos.filter(html => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    let div = doc.body.firstElementChild;
    console.log(div)
    if (div && div.tagName === 'DIV') {
      console.log("entrei aqui")
      let children = Array.from(div.children);
      console.log(children)
      if ((children.length === 2 && children[0].tagName === 'SPAN') || (children.length === 1 && children[0].tagName === 'BR')) {
        return false;
      }
    }
    return true;
  });



  // Exibe o array no console para depuração
  // console.log("Elementos completos das divs:", elementos);

  // Exibir o conteúdo no card
  mostrarCard(elementos);
}

// Função para criar e exibir o card na página
function mostrarCard(elementos) {
  // Verifica se o card já existe e remove para recriar
  let cardExistente = document.getElementById("extensao-card");
  if (cardExistente) {
      cardExistente.remove();
  }

  // Criação do card
  let card = document.createElement("div");
  card.id = "extensao-card";
  card.innerHTML = `
      <div id="card-header">
          <span>Conteúdo Capturado</span>
          <button id="fechar-card">X</button>
      </div>
      <div id="card-content">${elementos.join("<hr>")}</div>
  `;
  
  // Estilização do card
  Object.assign(card.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
      height: "50%",
      background: "white",
      color: "black",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      overflow: "auto",
      zIndex: "10000",
      border: "2px solid #333"
  });

  // Estilização do cabeçalho do card
  let cardHeader = card.querySelector("#card-header");
  Object.assign(cardHeader.style, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "bold",
      marginBottom: "10px"
  });

  // Estilização do botão de fechar
  let botaoFechar = card.querySelector("#fechar-card");
  Object.assign(botaoFechar.style, {
      background: "red",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      padding: "5px"
  });

  // Evento de clique para fechar o card
  botaoFechar.addEventListener("click", () => {
      card.remove();
  });

  // Adiciona o card ao corpo da página
  document.body.appendChild(card);
}

// Função para adicionar o botão fixo na página
function adicionarBotao() {
  console.log("Teste")
  // Verifica se o botão já existe
  if (document.getElementById("extensao-botao")) return;

  let botao = document.createElement("button");
  botao.id = "extensao-botao";
  botao.innerText = "Mostrar Conteúdo";
  
  // Estilização do botão
  Object.assign(botao.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#007BFF",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      zIndex: "10000",
      fontSize: "16px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
  });

  // Adiciona evento de clique para capturar elementos e mostrar o card
  botao.addEventListener("click", capturarElementos);

  // Adiciona o botão ao corpo da página
  document.body.appendChild(botao);
}

// console.log("Teste")

// Executa a função para adicionar o botão quando a página carregar
setTimeout(adicionarBotao, 10000);