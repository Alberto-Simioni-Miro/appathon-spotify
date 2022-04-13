import * as React from 'react';
import ReactDOM from 'react-dom';

// async function addSticky() {
//   const stickyNote = await miro.board.createStickyNote({
//     content: 'Hello, World!',
//   });

//   await miro.board.viewport.zoomTo(stickyNote);
// }

interface IPlayListProps {
  token: string
}

async function init() {
  // Enable the 'drop' event on the app panel. Active on 'miro-draggable' HTML elements
  await miro.board.ui.on('drop', async ({x, y, target}) => {
    let text : string | undefined = undefined
    if (target.textContent !== null){
      text = target.textContent
    }

    createEmbed("5830XyzOtYzFxtMJcYfjk7") // todo read value from token
  });
}


async function createEmbed(token: string){
  let url = "https://open.spotify.com/embed/playlist/" + token + "?utm_source=generator"
  await miro.board.createEmbed({
    url: url,
    thumbnailUrl: '',
    mode: 'inline',
    width: 720, // todo coordinates also should be parameters
    height: 720,
    x: 0,
    y: 0,
  });
}

 
class Playlist extends React.Component<IPlayListProps>{
  constructor(props: IPlayListProps){
    super(props)
  }

  handleClick(token: string) {
    createEmbed(token)
  }

  render(){
    return <button className="button button-primary miro-draggable" onClick={(_) => this.handleClick(this.props.token)}> Add Spotify</button>
  }
}


init(); 

function App() {
  // React.useEffect(() => {
  //   addSticky();
  // }, []);

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
       <Playlist token="5830XyzOtYzFxtMJcYfjk7"/>
       <Playlist token="5830XyzOtYzFxtMJcYfjk7"/>
       <Playlist token="5830XyzOtYzFxtMJcYfjk7"/>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
