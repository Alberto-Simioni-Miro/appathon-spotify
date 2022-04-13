import { getHashParams } from "./hashUtils";

async function init() {
  miro.board.ui.on('icon:click', async () => {
    await miro.board.ui.openPanel({ url: 'app.html' });
  });
}

init();

let hashParams = getHashParams();
if (hashParams.access_token) {
  localStorage.setItem('spotifyToken', hashParams.access_token);
  window.close()
}