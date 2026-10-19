(() => {
  'use strict';
  const content = window.VERILOGIC_CONTENT;
  if (!content) return;
  for (const [id, value] of Object.entries({
    'introduction-text': content.introductionHtml,
    'pipeline-caption': content.pipelineCaptionHtml,
    'motivation-caption': content.motivationCaptionHtml,
    'results-caption': content.resultsCaptionHtml,
    'ablation-caption': content.analysis[0].captionHtml,
    'complexity-caption': content.analysis[1].captionHtml,
    'feedback-caption': content.analysis[2].captionHtml,
  })) document.getElementById(id).innerHTML = value;

  const models = [content.models[0], content.models[2], content.models[1]];
  const tabs = document.getElementById('model-tabs');
  const body = document.getElementById('results-body');
  function selectModel(index) {
    [...tabs.children].forEach((button, i) => {
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    document.getElementById('model-panel').setAttribute('aria-labelledby', `model-${index}`);
    body.replaceChildren();
    for (const row of models[index].rows) {
      const tr = document.createElement('tr');
      if (row.method === 'VeriLogic (ours)') tr.className = 'ours';
      if (row.method === 'Delta') tr.className = 'delta-row';
      const label = document.createElement('th'); label.scope = 'row';
      label.textContent = row.method === 'Delta' ? 'Δ' : row.method; tr.append(label);
      for (const value of row.values) { const td = document.createElement('td'); td.textContent = value; tr.append(td); }
      body.append(tr);
    }
    document.querySelector('#results-table caption').textContent = `Main results for ${models[index].name}; accuracy in percent`;
  }
  models.forEach((model, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = model.name; button.id = `model-${index}`;
    button.setAttribute('role', 'tab'); button.setAttribute('aria-controls', 'model-panel');
    button.addEventListener('click', () => selectModel(index));
    button.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? models.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + models.length) % models.length;
      selectModel(next); tabs.children[next].focus();
    });
    tabs.append(button);
    const column = document.createElement('div'); column.className = 'column';
    const gain = document.createElement('span'); gain.className = 'gain-value'; gain.textContent = model.gain;
    const unit = document.createElement('small'); unit.textContent = 'pp'; gain.append(unit);
    const name = document.createElement('span'); name.className = 'gain-model'; name.textContent = model.name;
    column.append(gain, name); document.getElementById('gain-summary').append(column);
  });
  selectModel(0);

  const dialog = document.getElementById('figure-dialog');
  for (const button of document.querySelectorAll('.figure-zoom')) {
    button.addEventListener('click', () => {
      const image = document.getElementById('dialog-image'); image.src = button.dataset.zoom; image.alt = button.dataset.alt;
      dialog.showModal();
    });
  }
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.getElementById('copy-citation').addEventListener('click', async () => {
    const code = document.getElementById('citation-code'); const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = 'BibTeX copied to clipboard.'; document.getElementById('copy-citation').textContent = 'Copied ✓';
    } catch {
      const range = document.createRange(); range.selectNodeContents(code);
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Citation selected. Press Ctrl+C to copy.';
    }
  });
})();
