document.addEventListener('DOMContentLoaded', () => {
  const fases = ['qf', 'sf', 'final'];
  const proximaFase = (faseIndex, vencedor) => {
    if (faseIndex >= fases.length) {
      document.getElementById('campeao').innerHTML = `🏆 Campeão: <strong>${vencedor}</strong>`;
      return;
    }
    const fase = document.getElementById(fases[faseIndex]);
    const luta = document.createElement('div');
    luta.className = 'luta';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = vencedor;
    btn.addEventListener('click', () => {
      btn.classList.add('vencedor');
      proximaFase(faseIndex + 1, vencedor);
    });
    luta.appendChild(btn);
    if (fase.lastElementChild && fase.lastElementChild.children.length === 1) {
      fase.lastElementChild.appendChild(btn);
    } else {
      fase.appendChild(luta);
    }
  };

  document.querySelectorAll('.fase-1 .btn').forEach(button => {
    button.addEventListener('click', () => {
      const parent = button.closest('.luta');
      if (parent.dataset.winner) return; // Impede duplo clique
      parent.dataset.winner = button.textContent;
      button.classList.add('vencedor');
      const matchIndex = parseInt(parent.dataset.match);
      const pairIndex = Math.floor((matchIndex - 1) / 2);
      proximaFase(0, button.textContent);
    });
  });
});
