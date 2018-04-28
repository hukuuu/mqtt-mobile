import React from 'react'
import { connect } from 'react-redux'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import MenuButton from './MenuButton'
import RoomScreen from '../Containers/RoomScreen'
import DrawerContent from './DrawerContent'
import { Colors } from '../Themes'
import { shouldUpdate } from 'recompose'

const createRoomStack = ({ name, id }) => ({
  [name]: StackNavigator({
    RoomScreen: {
      screen: rest => <RoomScreen id={id} {...rest} />,
      navigationOptions: {
        title: name,
        headerLeft: <MenuButton />,
        headerTintColor: Colors.app.white,
        headerStyle: {
          backgroundColor: Colors.app.dark
        }
      }
    },
    initialRouteName: 'RoomScreen'
  })
})

const enhance = shouldUpdate(
  (props, nextProps) => props.rooms.length !== nextProps.rooms.length
)
const Drawer = enhance(({ rooms }) => {
  console.log('drawer render', rooms)
  const drawerItems = rooms.reduce(
    (all, room) => ({
      ...all,
      ...createRoomStack(room)
    }),
    {}
  )

  const Nav = DrawerNavigator(drawerItems, {
    contentComponent: DrawerContent,
    contentOptions: {
      activeBackgroundColor: Colors.app.light,
      inactiveTintColor: Colors.app.white,
      activeTintColor: Colors.app.white,
      onItemPress: route => {
        console.log('hi')
      }
    }
  })
  return <Nav />
})

const mapStateToProps = state => ({ rooms: state.rooms.data })

export default connect(mapStateToProps)(Drawer)
