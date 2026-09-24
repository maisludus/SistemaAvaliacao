document.addEventListener('DOMContentLoaded', () => {
  const jogo = document.querySelector('#jogo');
  const outroJogo = document.querySelector('#outro-jogo');
  const jogoPersonalizado = document.querySelector('#jogoPersonalizado');
  const atualizarOutroJogo = () => { if (!jogo) return; const outro = jogo.value === 'Outro'; outroJogo.hidden = !outro; jogoPersonalizado.required = outro; };
  if (jogo) { jogo.addEventListener('change', atualizarOutroJogo); atualizarOutroJogo(); }
  const editor = document.querySelector('#bugs-editor');
  const hidden = document.querySelector('#bugs');
  if (!editor || !hidden) return;
  document.querySelectorAll('[data-command]').forEach((button) => button.addEventListener('click', () => { editor.focus(); document.execCommand(button.dataset.command, false, null); }));
  document.querySelector('#bug-image').addEventListener('change', (event) => {
    const file = event.target.files[0]; if (!file) return;
    if (!file.type.startsWith('image/')) return alert('Selecione um arquivo de imagem.');
    const reader = new FileReader(); reader.onload = () => { editor.focus(); document.execCommand('insertImage', false, reader.result); }; reader.readAsDataURL(file); event.target.value = '';
  });
  document.querySelector('#avaliacao-form').addEventListener('submit', () => { hidden.value = editor.innerHTML; });
});
