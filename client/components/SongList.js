import React, {Component} from "react";
import {graphql,} from "react-apollo";
import {Link} from "react-router";
import SONG_LIST from '../queries/fetchsongs'
import gql from 'graphql-tag'
import LineLoader from "./LineLoader";

class SongList extends Component {

    constructor(props) {
        super(props);
        this.DeleteSong = this.DeleteSong.bind(this);

        this.state = {
            loading: false
        }
    }

    componentDidMount() {
    }

    DeleteSong(event, id) {
        event.stopPropagation()
        this.setState({
            loading: true
        })
        this.props.mutate({
            variables: {
                id
            }
        }).then(() => {
            this.props.data.refetch().then(res =>  {
                this.setState({
                    loading: false
                })
            })
        })
    }

    RenderSongs() {
        return this.props.data.songs.map((song, index) => {
            return <li key={song.id} className={'collection-item'}>
                <Link to={`/songs/${song.id}`} onlyActiveOnIndex>
                    {song.title}
                </Link>
                <div className={'secondary-content cus_pointer'} onClick={e => this.DeleteSong(e, song.id)}><i
                    className="material-icons">delete</i></div>
            </li>
        })
    }


    render() {
        const {data}= this.props

        if(data.loading) {
            return <LineLoader />
        }

        return (
            <div>
                {
                    this.state.loading ? <LineLoader /> : null
                }
                <div className={'container p-3'}>
                    <ul className={'collection'}>
                        {!this.props.data.loading ? this.RenderSongs() : null}
                    </ul>
                    <Link to={'/songs/new'} className={'btn btn-floating btn-large red light right mb-5'}
                          onlyActiveOnIndex>
                        <i className={'material-icons'}>add</i>
                    </Link>
                </div>
            </div>

        )
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
            title
        }
    }
`;

export default graphql(mutation)(
    graphql(SONG_LIST)(SongList)
);
