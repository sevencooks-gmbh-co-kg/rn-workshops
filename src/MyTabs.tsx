import * as React from 'react'
// import { Pressable, StyleSheet, Text, View } from 'react-native'
import HomeTab from './HomeTab'
import ListTab from './ListTab'
import ProfileTab from './ProfileTab'
import { TabView, TabBar, TabItem, TabContent } from './Tabs'

// Using the compound component pattern
const MyTabs = () => {
  return (
    <TabView initialTab="Profile">
      <TabBar>
        <TabItem name="Home" />
        <TabItem name="Second" />
        <TabItem name="Profile" />
      </TabBar>
      <TabContent name="Home">
        <HomeTab />
      </TabContent>
      <TabContent name="Second">
        {/* ListTab uses the HOC pattern */}
        <ListTab />
      </TabContent>
      <TabContent name="Profile">
        {/* ProfileTab uses the renderProps pattern */}
        <ProfileTab />
      </TabContent>
    </TabView>
  )
}

// With default not reusable implementation
//
// const MyTabs = () => {
//   const [activeTab, setActiveTab] = React.useState<string>('Home')
//
//   const handlePressTab = (tabId: string) => {
//     setActiveTab(tabId)
//   }
//
//   return (
//     <>
//       <View style={styles.tabBar}>
//         <Pressable
//           style={[styles.tabItem, activeTab === 'Home' && styles.tabItemActive]}
//           onPress={() => handlePressTab('Home')}
//         >
//           <Text>Home</Text>
//         </Pressable>
//         <Pressable
//           style={[
//             styles.tabItem,
//             activeTab === 'Items' && styles.tabItemActive,
//           ]}
//           onPress={() => handlePressTab('Items')}
//         >
//           <Text>Second</Text>
//         </Pressable>
//         <Pressable
//           style={[
//             styles.tabItem,
//             activeTab === 'Profile' && styles.tabItemActive,
//           ]}
//           onPress={() => handlePressTab('Profile')}
//         >
//           <Text>Profile</Text>
//         </Pressable>
//       </View>
//       <View style={styles.tabContainer}>
//         {activeTab === 'Home' ? <HomeTab /> : null}
//         {activeTab === 'Items' ? <ListTab /> : null}
//         {activeTab === 'Profile' ? <ProfileTab /> : null}
//       </View>
//     </>
//   )
// }
//
// const styles = StyleSheet.create({
//   tabBar: {
//     flexDirection: 'row',
//     height: 48,
//     width: '100%',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E7E0EC',
//   },
//   tabItem: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//   },
//   tabItemActive: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#6750A4',
//   },
//   tabContainer: {
//     flexGrow: 1,
//   },
// })

export default MyTabs
