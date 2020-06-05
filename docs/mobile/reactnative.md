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

1.通过将参数放入对象作为navigation.navigate函数的第二个参数，将参数传递给路线：navigation.navigate('RouteName', { /* params go here */ })

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












...
