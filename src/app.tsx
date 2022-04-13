import * as React from 'react';
import ReactDOM from 'react-dom';
import {getAuthorizeHref} from "./oauthConfig";


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
  await miro.board.ui.on('drop', async ({x, y, target}) => {
    let text : string | undefined = undefined
    if (target.textContent !== null){
      text = target.textContent
      
    }
    let playlistId = target.getAttribute('id')
    if (playlistId !== null){
       createEmbed(playlistId, x, y)
    }
  });
}


async function createEmbed(playlistId: string, x: number, y: number){
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
  constructor(props: IPlayListProps){
    super(props)
  }

  handleClick(playlistId: string) {
    createEmbed(playlistId, 0, 0)
  }

  render(){
    // return <button className="button button-primary miro-draggable" onClick={(_) => this.handleClick(this.props.playlistId)} value={this.props.playlistId} > Add Spotify</button>
    const iframeSrc = "https://open.spotify.com/embed/playlist/" + this.props.playlistId + "?utm_source=generator"

    return (
        <div className='miro-draggable grid playlist-div' id={this.props.playlistId}>
          <iframe  className="cs1 ce10" src={iframeSrc} width="100%" height="80" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
          <div className='cs11 ce12 icon m2 icon-duplicate'/>
        </div>
        )
      
  }
}


init(); 

function App() {
  // React.useEffect(() => {
  //   addSticky();
  // }, []);
  let access_token = localStorage.getItem('spotifyToken');

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">

        <a className="button button-primary"
           target="_blank"
           href={getAuthorizeHref()}>
          LOGIN
        </a>

       <Playlist playlistId="5830XyzOtYzFxtMJcYfjk7"/>
       <Playlist playlistId="37i9dQZF1DX4UtSsGT1Sbe"/>
       <Playlist playlistId="37i9dQZF1DWSXBu5naYCM9"/>
       <Playlist playlistId="37i9dQZF1DXdPec7aLTmlC"/>
       <Playlist playlistId="37i9dQZEVXbMDoHDwVN2tF"/>
       <Playlist playlistId="37i9dQZF1DWVTAn6Oz7Zf1"/>
      </div>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
