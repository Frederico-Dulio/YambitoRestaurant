 // Simulação de dados de uma API
 let pedidos = [
    { id: 1, mesa: 2, prato: "Frango Assado", quantidade: 2, status: "Em preparo", hora: "12:30" },
    { id: 2, mesa: 1, prato: "Sopa com Ossos", quantidade: 1, status: "Pronto", hora: "12:35" },
    { id: 3, mesa: 5, prato: "Bife com Batatas", quantidade: 3, status: "Em preparo", hora: "12:40" },
    { id: 4, mesa: 8, prato: "Mufete", quantidade: 1, status: "Pronto", hora: "12:50" },
    { id: 5, mesa: 1, prato: "Muamba de Galinha", quantidade: 2, status: "Em preparo", hora: "12:55" },
    { id: 6, mesa: 1, prato: "Calulu de Carne seca", quantidade: 2, status: "Em preparo", hora: "13:00" }
  ];

  // Função para carregar os pedidos agrupados por mesa
  function carregarPedidosAgrupados() {
    const mesaContainer = document.getElementById('mesa-list');
    mesaContainer.innerHTML = ""; // Limpa o conteúdo antes de atualizar

    // Agrupa os pedidos por mesa
    const mesas = pedidos.reduce((acc, pedido) => {
      if (!acc[pedido.mesa]) {
        acc[pedido.mesa] = [];
      }
      acc[pedido.mesa].push(pedido);
      return acc;
    }, {});

    // Cria a estrutura para cada mesa
    Object.keys(mesas).forEach(mesa => {
      const pedidosDaMesa = mesas[mesa];
      const mesaSection = `
        <div class="mesa-section">
          <div class="mesa-header">Mesa ${mesa}</div>
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th>#Pedido</th>
                <th>Prato</th>
                <th>Quantidade</th>
                <th>Status</th>
                <th>Hora</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${pedidosDaMesa.map(pedido => `
                <tr class="pedido-row">
                  <td>${pedido.id}</td>
                  <td>${pedido.prato}</td>
                  <td>${pedido.quantidade}</td>
                  <td id="status-${pedido.id}">${pedido.status}</td>
                  <td>${pedido.hora}</td>
                  <td class="status-btns">
                    <button class="btn btn-success btn-sm" onclick="alterarStatus(${pedido.id}, 'Pronto')">Pronto</button>
                    <button class="btn btn-warning btn-sm" onclick="alterarStatus(${pedido.id}, 'Em preparo')">Em preparo</button>
                    <button class="btn btn-info btn-sm" onclick="alterarStatus(${pedido.id}, 'Entregado')">Entregado</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      mesaContainer.innerHTML += mesaSection;
    });
  }

  // Função para alterar o status de um pedido
  function alterarStatus(id, novoStatus) {
    // Atualiza o status no array de pedidos
    pedidos = pedidos.map(pedido => {
      if (pedido.id === id) {
        pedido.status = novoStatus;
      }
      return pedido;
    });

    // Atualiza visualmente o status na página
    document.getElementById(`status-${id}`).innerText = novoStatus;
  }

  // Simula atualização periódica
  setInterval(carregarPedidosAgrupados, 5000);
  carregarPedidosAgrupados();