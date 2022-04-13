import * as React from 'react';
import ReactDOM from 'react-dom';

// async function addSticky() {
//   const stickyNote = await miro.board.createStickyNote({
//     content: 'Hello, World!',
//   });

//   await miro.board.viewport.zoomTo(stickyNote);
// }

async function init() {
  // Enable the 'drop' event on the app panel. Active on 'miro-draggable' HTML elements
  await miro.board.ui.on('drop', async ({x, y, target}) => {
    let text : string | undefined = undefined
    if (target.textContent !== null){
      text = target.textContent
    }

    addPlaylistToBoard()
  });
}


async function addPlaylistToBoard(){
  await miro.board.createEmbed({
    url: 'https://open.spotify.com/embed/playlist/5830XyzOtYzFxtMJcYfjk7?utm_source=generator',
    thumbnailUrl: '',
    mode: 'inline',
    width: 720,
    height: 720,
    x: 0,
    y: 0,
  });
}


init(); 

function App() {
  // React.useEffect(() => {
  //   addSticky();
  // }, []);

  

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <a
          className="button button-primary miro-draggable"
          href="#"
          onClick={addPlaylistToBoard}
        >
          Add Spotify
        </a>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
