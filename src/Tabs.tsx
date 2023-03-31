import * as React from 'react'
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native'

type State = [
  string | undefined,
  React.Dispatch<React.SetStateAction<string | undefined>>,
]
const TabContext = React.createContext<State | undefined>(undefined)

const useTabContext = () => {
  const context = React.useContext(TabContext)
  if (context === undefined)
    throw new Error('useTabContext must be used within a TabView')
  return context
}

interface TabViewProps {
  initialTab?: string
  children: React.ReactNode | React.ReactNode[]
  style?: StyleProp<ViewStyle>
}
export const TabView = ({ initialTab, children, style }: TabViewProps) => {
  const state = React.useState(initialTab)

  return (
    <TabContext.Provider value={state}>
      <View style={[styles.container, style]}>{children}</View>
    </TabContext.Provider>
  )
}

interface TabBarProps {
  children: React.ReactNode[]
  style?: StyleProp<ViewStyle>
}
export const TabBar = ({ children, style }: TabBarProps) => (
  <View style={[styles.tabBar, style]}>{children}</View>
)

interface TabItemProps {
  name: string
  title?: string
  style?: StyleProp<ViewStyle>
}
export const TabItem = ({ name, title, style }: TabItemProps) => {
  const [activeTab, setActiveTab] = useTabContext()
  return (
    <Pressable
      style={[
        styles.tabItem,
        activeTab === name && styles.activeTabItem,
        style,
      ]}
      onPress={() => setActiveTab(name)}
    >
      <Text>{title || name}</Text>
    </Pressable>
  )
}

interface TabContentProps {
  name: string
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}
export const TabContent = ({ name, children, style }: TabContentProps) => {
  const [activeTab] = useTabContext()
  return activeTab === name ? (
    <View style={[styles.tabContent, style]}>{children}</View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 48,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E0EC',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#6750A4',
  },
  tabContent: {
    flexGrow: 1,
  },
})
