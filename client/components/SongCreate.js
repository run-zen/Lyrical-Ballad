import React, {Component} from 'react';
import gql from 'graphql-tag'
import {graphql} from "react-apollo";
import {hashHistory, Link} from "react-router";
import SONG_LIST from '../queries/fetchsongs'
import LineLoader from "./LineLoader";

class SongCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            loading: false
        }
    }

    onSubmit(event) {
        event.preventDefault()
        this.setState({
            loading: true
        })
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{
                query:SONG_LIST
            }]
        }).then((res) => {
            this.setState({
                loading: false
            })
            hashHistory.push('/')
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                {
                    this.state.loading ? <LineLoader /> : null
                }
                <div className={'my-5 container'}>
                    <Link to={'/'} onlyActiveOnIndex>
                        <i className="material-icons">
                            arrow_back
                        </i>
                    </Link>
                    <h3>Create a New Song</h3>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <label htmlFor="">Song Title : </label>
                        <input type="text" onChange={event => this.setState({title: event.target.value})}
                               value={this.state.title} required/>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title) {
            id
            title
        }
    }
`

export default graphql(mutation)(SongCreate);
