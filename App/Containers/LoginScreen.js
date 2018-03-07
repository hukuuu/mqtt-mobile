import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux'

import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  state = {
    email: '',
    password: ''
  }

  static navigationOptions = {
    title: 'Login'
  }

  constructor() {
    super()
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
  }

  handleLoginClick() {
    const { login } = this.props
    login(this.state)
  }

  handleChangeUsername(value) {
    this.setState({
      email: value.toLowerCase()
    })
  }

  handleChangePassword(value) {
    this.setState({
      password: value.toLowerCase()
    })
  }

  componentDidMount() {
    const { isLoggedIn, navigation } = this.props
    if (isLoggedIn) navigation.navigate('App')
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isLoggedIn && nextProps.isLoggedIn)
      this.props.navigation.navigate('App')
  }

  render() {
    const { isFetching, error } = this.props
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <FormLabel>Username</FormLabel>
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={this.handleChangeUsername}
            onSubmitEditing={() => this.refs.password.focus()}
            returnKeyType="next"
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            onChangeText={this.handleChangePassword}
            onSubmitEditing={this.handleLoginClick}
            ref="password"
            returnKeyType="go"
            secureTextEntry
          />
          {error && (
            <FormValidationMessage style={styles.errorMessage}>
              Wrong username or password!
            </FormValidationMessage>
          )}
          <Button
            style={styles.loginButton}
            title="Login"
            onPress={this.handleLoginClick}
            loading={isFetching}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: LoginSelectors.isLoggedIn(state),
  isFetching: LoginSelectors.isFetching(state),
  error: LoginSelectors.getError(state)
})

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(LoginActions.loginRequest(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
