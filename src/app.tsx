import * as React from 'react';
import ReactDOM from 'react-dom';
import { getAuthorizeHref } from "./oauthConfig";


// async function addSticky() {
//   const stickyNote = await miro.board.createStickyNote({
//     content: 'Hello, World!',
//   });

//   await miro.board.viewport.zoomTo(stickyNote);
// }

interface IPlayListProps {
  playlistId: string
}

async function init() {
  // Enable the 'drop' event on the app panel. Active on 'miro-draggable' HTML elements
  await miro.board.ui.on('drop', async ({ x, y, target }) => {
    let text: string | undefined = undefined
    if (target.textContent !== null) {
      text = target.textContent

    }
    let playlistId = target.getAttribute('id')
    if (playlistId !== null) {
      createEmbed(playlistId, x, y)
    }
  });
}


async function createEmbed(playlistId: string, x: number, y: number) {
  let url = "https://open.spotify.com/embed/playlist/" + playlistId + "?utm_source=generator"
  const embed = await miro.board.createEmbed({
    url: url,
    thumbnailUrl: '',
    mode: 'inline',
    width: 720, // todo coordinates also should be parameters
    height: 720,
    x: x,
    y: y,
  });

  await miro.board.viewport.zoomTo(embed)
}


class Playlist extends React.Component<IPlayListProps>{
  constructor(props: IPlayListProps) {
    super(props)
  }

  handleClick(playlistId: string) {
    createEmbed(playlistId, 0, 0)
  }

  render() {
    // return <button className="button button-primary miro-draggable" onClick={(_) => this.handleClick(this.props.playlistId)} value={this.props.playlistId} > Add Spotify</button>
    const iframeSrc = "https://open.spotify.com/embed/playlist/" + this.props.playlistId

    return (
      <div className='miro-draggable grid playlist-div' id={this.props.playlistId}>
        <iframe className="cs1 ce10" src={iframeSrc} width="100%" height="80" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        <div className='cs11 ce12 icon m2 icon-duplicate' />
      </div>
    )

  }
}


init();

function App() {
  let interval: Timer;
  const [playlists, setPlaylist] = React.useState<IPlayListProps[]>([]);

  async function loadPlaylist(token: string) {
    const playlistsRequest = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
      headers: {
        'Authorization': `Bearer ${token}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    const content = await playlistsRequest.json();
    console.log(content);
    const playlst = content.items.map(i => ({ playlistId: i.id }));
    setPlaylist(playlst.slice(0, 8));
  }

  React.useEffect(() => {
    interval = setInterval(() => {
      const token = localStorage.getItem('spotifyToken');
      if (token && token !== "undefined") {
        clearInterval(interval);
        loadPlaylist(token);
      }
    }, 1000)
  }, [])

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">

        {(!playlists || !playlists.length) && (
          <a className="button button-primary"
            style={{
              backgroundColor: "#1DB954",
              borderColor: "#1DB954",
              borderRadius: '500px',
              minHeight: '48px',
              lineHeight: '1.8',
              fontWeight: 700
            }}
            target="_blank"
            href={getAuthorizeHref()}>
            LOGIN
          </a>
        )}

        {playlists && playlists.map(p => (<Playlist key={p.playlistId} playlistId={p.playlistId} />))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
