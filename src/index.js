import viewarApi from 'viewar-api';

import './index.scss';
import './spinner.scss';

const appId = 'com.viewar.sample.vanilla';
const version = 1;

let selection;
let spinner;

(async function() {
  //TODO consistent App-Container !!! Or maybe it is always app and not vierwar_app ?
  const appContainer =
    document.getElementById('app') ||
    document.getElementById('viewar_app') ||
    window.document.body;
  appContainer.innerHTML = `
    <div id="loadingSpinner" class="spinnerWrapper hidden">
      <div class="loadingSpinner"></div>
    </div>
    <div id="app">
      <input id="modelIdInput" value="36651"/>
      <button id="modelButton">Load Model</button>
      <div id="infoBox"></div>
    </div>
  `;

  const modelButton = document.getElementById('modelButton');
  const modelIdInput = document.getElementById('modelIdInput');
  const infoBox = document.getElementById('infoBox');
  spinner = document.getElementById('loadingSpinner');

  showLoading(true);

  const api = await viewarApi.init({ appId, version, logToScreen: true });
  window.api = api;

  await handleModelLoadButtonClick();
  showLoading(false);

  modelButton.onclick = handleModelLoadButtonClick;
  infoBox.onclick = handleInfoBoxActions;

  api.sceneManager.on('selectionChanged', handleSelectionChange);
})();

function showLoading(show) {
  show ? spinner.classList.remove('hidden') : spinner.classList.add('hidden');
}

function handleSelectionChange(instance) {
  if (!instance) return;
  renderInfoBox(instance);
  selection = instance;
}

function renderInfoBox(selection) {
  if (!selection) {
    infoBox.innerHTML = '';
    return;
  }

  function renderMaterials() {
    return Object.values(selection.properties)
      .filter(p => p.type === 'material' && p.options.length)
      .map(
        p => `
        <div>
          <div class="sublabel">${p.name}</div>
          <div>${p.options
            .map(
              c =>
                `<img data-material-name="${p.name}" data-material-key="${
                  c.key
                }" class="thumbnail ${
                  p.value.key === c.key ? 'selected' : ''
                }" src="${c.imageUrl}">`
            )
            .join('')}</div>
        </div>`
      )
      .join('');
  }

  infoBox.innerHTML = `
    <div class="label">Name</div><div>${selection.model.name}</div>
    <div class="label">Materials</div>
    <div>${renderMaterials()}</div>
    <button data-instance-id="${selection.id}" id="deleteButton">Remove</button>
  `;
}

async function handleInfoBoxActions() {
  if (event.target.id === 'deleteButton') {
    return removeInstance(selection);
  }
  if (event.target.classList.contains('thumbnail')) {
    const { materialKey, materialName } = event.target.dataset;
    await setProperty(selection, { [materialName]: materialKey });
    renderInfoBox(selection);
  }
}

async function removeInstance(instance) {
  await api.sceneManager.removeNode(instance);
  renderInfoBox();
}

function setProperty(instance, opts) {
  return instance && instance.setPropertyValues(opts);
}

async function handleModelLoadButtonClick() {
  if (!modelIdInput.value) return;

  showLoading(true);

  api.sceneManager.clearScene();
  const model = await api.modelManager.getModelFromRepository(
    modelIdInput.value
  );
  const instance = await api.sceneManager.insertModel(model, {});
  await api.cameras.perspectiveCamera.zoomToFit();

  api.sceneManager.select(instance);
  selection = instance;

  showLoading(false);
}
