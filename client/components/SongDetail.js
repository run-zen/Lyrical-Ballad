import React, {Component, Fragment} from 'react';
import {Link} from "react-router";
import gql from 'graphql-tag'
import {graphql} from "react-apollo";
import LyricList from "./LyricList";
import LyricCreate from "./LyricCreate";
import SONG_DETAIL from '../queries/fetchSong'
import LineLoader from "./LineLoader";

class SongDetail extends Component {

    constructor(props) {
        super(props);

        this.renderSong = this.renderSong.bind(this)
        this.setLoading = this.setLoading.bind(this)

        this.state = {
            loading: false
        }
    }

    setLoading(status = false) {
        this.setState({
            loading: status
        })
    }

    renderSong(song) {
        return (
            <div>
                <h3>{song.title}</h3>
                <LyricList songId={this.props.params.id} lyrics={song.lyrics} setLoading={this.setLoading} />
                <LyricCreate songId={this.props.params.id} setLoading={this.setLoading} />
            </div>
        )
    }


    render() {
        const {data} = this.props
        const {song} = this.props.data

        if (!song) {
            return <LineLoader />
        }

        return (
            <div>
                {
                    this.state.loading ? <LineLoader />: null
                }
                <div className={'container'}>
                    <div className={'my-5'}>
                        <Link to={'/'} onlyActiveOnIndex>
                            <i className="material-icons">
                                arrow_back
                            </i>
                        </Link>
                        {
                            this.renderSong(song)
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default graphql(SONG_DETAIL, {
    options: (props) => {
        return {
            variables: {id: props.params.id}
        }
    }
})(SongDetail);
