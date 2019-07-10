import React, { Component } from 'react'
import * as request from 'superagent'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getUser } from '../actions/users'


class LoginContainer extends Component {
    state = {
        userName: '',
        password: ''
    }

    // url = 'https://secure-ravine-16222.herokuapp.com'
    url = 'http://localhost:5000'

    onChange = (event) => {
        const { value } = event.target
        const key = event.target.name

        this.setState({ [key]: value })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const { userName } = this.state
        const { password } = this.state

        this.setState({ userName: '', password: '' })

        request
            .post(`${this.url}/users`)
            .send({ userName, password })
            .then(res => {
                console.log(res)
                this.props.getUser(userName)
                this.props.history.push(`/rooms`)

            })
            .catch(error => console.log(error))
    }

    render() {
        console.log('props', this.props.user);

        return (
            <div className="Login">
                <form onSubmit={this.onSubmit}>
                    <label>Username</label>
                    <br />
                    <input onChange={this.onChange} value={this.state.userName} name="userName"></input>
                    <br />
                    <br />
                    <label>Password</label>
                    <br />
                    <input onChange={this.onChange} value={this.state.password} name="password"></input>
                    <br />
                    <button>Get in</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    }
}

export default connect(mapStateToProps, { getUser })(LoginContainer)

