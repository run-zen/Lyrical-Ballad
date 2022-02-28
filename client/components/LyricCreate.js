import React, {Component} from 'react';
import gql from 'graphql-tag'
import {graphql} from "react-apollo";

class LyricCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
        }
    }

    onSubmit(event) {
        event.preventDefault()
        const {setLoading} = this.props
        setLoading(true)

        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content : this.state.content
            },
        }).then((res) => {
            setLoading(false)
        })
        this.setState({
            content : ''
        })
    }

    render() {


        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label htmlFor="">Add New Lyric : </label>
                    <input type="text" onChange={event => this.setState({content: event.target.value})}
                           value={this.state.content} required/>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Add Lyric
                    </button>
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation Addlyric($songId: ID,$content: String) {
        addLyricToSong(songId:$songId, content: $content) {
            id
            lyrics {
                id
                likes
                content
            }
        }
    }
`

export default graphql(mutation)(LyricCreate);
