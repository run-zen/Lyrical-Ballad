import React, {Component} from "react";
import {graphql,} from "react-apollo";
import SONG_DETAIL from '../queries/fetchSong'
import gql from 'graphql-tag'

class LyricList extends Component {

    constructor(props) {
        super(props);
        this.deleteLyric = this.deleteLyric.bind(this);
        this.RenderLyric = this.RenderLyric.bind(this)
    }

    onLike(id, likes) {

        this.props.LIKE({
            variables : {
                id
            },
            optimisticResponse: {
                __typename:"Mutation",
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })
    }


    deleteLyric(event, id) {
        event.stopPropagation()
        const {setLoading} = this.props
        setLoading(true)

        this.props.DELETE({
            variables: {
                id
            },
            refetchQueries: [{
                query: SONG_DETAIL,
                variables: {
                    id: this.props.songId
                }
            }]
        }).then(res => {
            setLoading(false)
        })
    }

    RenderLyric(lyrics = []) {

        if (lyrics.length > 0) {
            return (
                <ul className={'collection'}>
                    {
                        lyrics.map((lyric, index) => {
                            return <li key={lyric.id} className={'collection-item'}>
                                {lyric.content}

                                <div className="secondary-content d-flex flex-row">
                                    <div className={'d-flex flex-row justify-content-center align-items-center'}>
                                        {lyric.likes ? lyric.likes: 0}
                                    </div>
                                    <div className={'secondary-content mx-3 cus_pointer'}
                                         onClick={() => this.onLike(lyric.id, lyric.likes)}>
                                        <i className="material-icons">thumb_up</i>
                                    </div>
                                    <div className="cus_pointer"
                                         id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className={'material-icons user-select-none'}>more_vert</i>
                                    </div>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <div className="dropdown-item cus_pointer"
                                                 onClick={e => this.deleteLyric(e, lyric.id)}>Delete
                                                <div className={'secondary-content'}>
                                                    <i className="material-icons">delete</i>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        })
                    }
                </ul>
            )
        } else {
            return (
                <div>
                    No lyrics found
                </div>
            )
        }
    }


    render() {
        const {lyrics} = this.props

        return (
            <div className={'p-3'}>
                {lyrics ? this.RenderLyric(lyrics) : null}
            </div>

        )
    }
}

const mutation = gql`
    mutation DeleteLyric($id: ID) {
        deleteLyric(id: $id) {
            id
            content
        }
    }
`;

const likeMutation = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`

export default graphql(likeMutation, {name: 'LIKE'})(graphql(mutation, {
    name: "DELETE"
})(LyricList))
