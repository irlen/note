### react navigation
创建一个stackNavigator
const Stack = createStackNavigator();

```
<Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen} options={{title:'Over view'}} />
  <Stack.Screen name="Details" component={DetailsScreen} />
</Stack.Navigator>
```
屏幕之间跳转 navigate
```
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>Home Screen</Text>
  <Button
    title="Go to Details"
    onPress={() => navigation.navigate('Details')}
  />
</View>
或者
<Button
  title="Go to Details... again"
  onPress={() => navigation.push('Details')} //Details是Screen组件的name 属性
/>

```
返回
当可以从活动屏幕返回时，堆栈导航器提供的标题将自动包含一个后退按钮（如果导航堆栈中只有一个屏幕，则无法返回任何内容，因此没有返回键）。
```
<Button title="Go back" onPress={() => navigation.goBack()} />
```
返回到第一个屏幕
```
<Button
  title="Go back to first screen in stack"
  onPress={() => navigation.popToTop()}
/>
```
### 路由间的参数传递
这有两部分：

1.通过将参数放入对象作为navigation.navigate函数的第二个参数，将参数传递给路线：navigation.navigate('RouteName', {  params go here  })

2.阅读屏幕组件中的参数：route.params。

```
//携带参数
<Button
  title="Go to Details"
  onPress={() => {
    /* 1. Navigate to the Details route with params */
    navigation.navigate('Details', {
      itemId: 86,
      otherParam: 'anything you want here',
    });
  }}
/>
//读取参数
const params = route.params;
const { itemId,otherParam } = params;
<Text>itemId: {JSON.stringify(itemId)}</Text>
<Text>otherParam: {JSON.stringify(otherParam)}</Text>
//更新屏幕参数
navigation.setParams()
//若未指定参数则使用默认参数
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  initialParams={{ itemId: 42 }}
/>
```

将参数回传到上一个屏幕
参数不仅对将某些数据传递到新屏幕很有用，而且对将数据传递到前一个屏幕也很有用。例如，假设您有一个带有创建帖子按钮的屏幕，并且创建帖子按钮会打开一个新屏幕以创建帖子。创建帖子后，您想要将帖子的数据传递回上一屏幕。
```
<>
  <TextInput
    multiline
    placeholder="What's on your mind?"
    style={{ height: 200, padding: 10, backgroundColor: 'white' }}
    value={postText}
    onChangeText={setPostText}
  />
  <Button
    title="Done"
    onPress={() => {
      // Pass params back to home screen
      navigation.navigate('Home', { post: postText });
    }}
  />
</>

```

将参数传递给嵌套导航器
如果您有嵌套的导航器，则需要以不同的方式传递参数。例如，假设您在Account屏幕内有一个导航器，并且想将参数传递给该导航器内的屏幕Settings。然后，您可以按以下方式传递参数：

```
navigation.navigate('Account', {
  screen: 'Settings',
  params: { user: 'jane' },
});
```
### 配置栏标题
```
<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={({ route }) => ({ title: route.params.name })}
/>

传递给options函数的参数是具有以下属性的对象：
navigation- 屏幕的导航道具。
route- 屏幕的路由道具
```
更新options和setOptions
<Button
  title="Update the title"
  onPress={() => navigation.setOptions({ title: 'Updated!' })}
/>

标题样式
定制你的头的风格时，有三个关键性能用途：headerStyle，headerTintColor，和headerTitleStyle。

headerStyle：一种样式对象，该样式对象将应用于View封装标题的。如果设置backgroundColor了它，那将是标题的颜色。
headerTintColor：后退按钮和标题都使用此属性作为其颜色。在下面的示例中，我们将颜色设置为白色（#fff），因此后退按钮和标题标题将为白色。
headerTitleStyle：如果要自定义标题的fontFamily，fontWeight以及其他Text样式属性，可以使用它来完成。

options 跨屏幕共享

将配置上移到prop下的堆栈导航器screenOptions

```
function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'My home' }}
      />
    </Stack.Navigator>
  );
}
```
自定义标题组件headerTitle
```
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('@expo/snack-static/react-native-logo.png')}
    />
  );
}

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: props => <LogoTitle {...props} /> }}
      />
    </Stack.Navigator>
  );
}
```
您可能想知道，为什么headerTitle当我们提供组件而不是title像以前那样提供组件？原因是这headerTitle是特定于堆栈导航器的属性，headerTitle默认为Text显示的组件title。

### 向标题添加按钮
在标题的右侧添加一个按钮
```
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
```
页头元素说屏幕组件的交互
我们需要使用navigation.setOptions定义按钮而不是optionsprop
```
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerTitle: props => <LogoTitle {...props} />,
        })}
      />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation, setCount]);

  return <Text>Count: {count}</Text>;
}
```
自定义后退按钮
createStackNavigator提供后退按钮特定于平台的默认设置。在iOS上，按钮旁边包含一个标签，当标题适合可用空间时，该标签会显示前一个屏幕的标题，否则显示“返回”。

您可以使用headerBackTitle和headerTruncatedBackTitle，要自定义后退按钮图像，可以使用headerBackImage。

### 嵌套导航
嵌套导航意味着在另一个导航器的屏幕内渲染一个导航器
```
function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```
每个导航器都有自己的导航历史记录，当在某个屏幕中调用navigation.goBack()时，会返回当前当前导航器的上一个页面，navigate到某个页面，如果页面不在改子导航内，则父导航将会处理。

嵌套导航器不接收父项的事件
例如，如果您在选项卡导航器中嵌套了一个堆栈导航器，则使用时，堆栈导航器中的屏幕将不会接收父选项卡导航器发出的事件，例如（tabPress）navigation.addListener。要从父级导航器接收事件，可以使用显式侦听父级的事件navigation.dangerouslyGetParent().addListener。


指定子导航的显示屏幕
```
复制
function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
//指定嵌套导航呈现的页面
navigation.navigate('Root', { screen: 'Settings' });
//将参数传递给嵌套导航屏幕
navigation.navigate('Root', {
  screen: 'Settings',
  params: { user: 'jane' },
});
//对于深层嵌套导航，可以这样传递
navigation.navigate('Root', {
  screen: 'Settings',
  params: {
    screen: 'Sound',
    params: {
      screen: 'Media',
    },
  },
});
```
### 导航的生命周期

每个导航器的首屏被访问后将会被保留状态，当离开时并不执行componentWillUnmount();

捕捉导航生命周期状态
订阅是否聚焦当前页面
```
function Profile({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
    });

    return unsubscribe;
  }, [navigation]);

  return <ProfileContent />;
}


代替手动添加事件侦听器，我们可以使用useFocusEffect挂钩执行副作用。就像React的useEffect钩子一样，但它与导航生命周期息息相关。

例：
import { useFocusEffect } from '@react-navigation/native';

function Profile() {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return <ProfileContent />;
}

```

### 打开全屏模式



















...
