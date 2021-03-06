import React from 'react'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { ScrollView, View, Text, Image } from 'react-native'
import { Metrics, Colors, Images } from '../Themes'
import { LoginSelectors } from '../Redux/LoginRedux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

const DrawerContent = ({ username, navigation, logout, ...rest }) => (
  <View style={{ flex: 1, backgroundColor: Colors.app.dark }}>
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView forceInjet={{ top: 'always', horizontal: 'never' }}>
        <View
          style={{
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: Colors.app.light,
            borderBottomWidth: 1,
            backgroundColor: Colors.app.dark
          }}
        >
          <Image
            source={Images.logo}
            resizeMode={'contain'}
            style={{ flex: 5 }}
          />
          <Text
            style={{
              flex: 3,
              color: Colors.app.white,
              marginTop: Metrics.marginVertical,
              fontSize: 15,
              marginTop: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {username}
          </Text>
        </View>
        <DrawerItems navigation={navigation} {...rest} />
      </SafeAreaView>
    </ScrollView>

    <View
      style={{
        borderTopColor: Colors.app.light,
        borderTopWidth: 1,
        padding: Metrics.doubleBaseMargin,
        height: 55
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          color: Colors.app.white
        }}
        onPress={() => {
          logout()
          navigation.navigate('LoginScreen')
        }}
      >
        Logout
      </Text>
    </View>
  </View>
)

const mapStateToProps = state => ({
  username: LoginSelectors.username(state)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'LOGOUT' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(DrawerContent))
