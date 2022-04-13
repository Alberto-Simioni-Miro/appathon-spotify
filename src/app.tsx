import * as React from 'react';
import ReactDOM from 'react-dom';

async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: 'Hello, World!',
  });

  await miro.board.viewport.zoomTo(stickyNote);
}

function App() {
  React.useEffect(() => {
    addSticky();
  }, []);

  const addEmbeddedSpotify = async () => {
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

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <a
          className="button button-primary"
          href="#"
          onClick={addEmbeddedSpotify}
        >
          Add Spotify
        </a>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
