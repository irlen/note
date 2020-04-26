### react-hooks
为什么只能在函数最外层调用 Hook，不要在循环、条件判断或者子函数中调用？
为什么 useEffect 第二个参数是空数组，就相当于 ComponentDidMount ，只会执行一次？
React Hooks 分为内置的和自定义的两种类型，内置的 hooks 有以下几个：

### Basic Hooks
useState
useEffect
useContext

### Additional HooksuseReducer
useCallback
useMemo
useRef
useImperativeHandle
useLayoutEffect
useDebugValue

### 1.useState

const [count,setCount] = useState(0);
setCount(),可直接输入要设置的值，也可以传入带参数函数，参数为上一次count值，经过计算处理返回。
```
  setCount(previous=>{
    return revious+10
  })
```
注意： useState 的参数可以是基本类型，也可以是对象类型，在更新对象类型时，切记要合并旧的状态，否则旧的状态会丢失

```
setCount({
  ...params,
  countone: 200
})
```

### 2.useEffect/useLayoutEffect

useEffect是ReactHooks的核心,可取代componentDidMount、componentDidUpdate、componentWillUnmount三个周期。
useEffect接受两个参数，其中第二个参数是可选的，不过一般情况下都需要传入第二个参数。

```
useEffect(()=>{

    return ()=>{}
},[])
```
第一个参数为一个函数，为必传参数，当组件数次渲染或者其依赖的状态改变时会执行，该函数的返回值是可选的，可以不写，如果要写的话必须是一个函数，用于清除上一个状态。

第二个参数为可选参数，是一个数组。数组中可以传入状态值（通过useState产生的值），当状态值改变的时候首先会执行return函数（即第一个参数中函数的返回值函数），用于清理上一个状态，然后useEffect中的函数就会再次执行。

***如果不传入第二个参数，代表组件中任何状态的改变，effect都会执行一次，这通常不是我们想要的行为。

***如果第二个参数传递一个空数组，代表efffect只会执行一次，相当于componentDidmount,return函数也只会在组件卸载的时候执行一次，相当于componentWillUnmount。

***如果第二个参数数组中有一个或者多个状态值，那么只要有任意一个状态值发生变化，该effect都会再次执行。相当于componentDidUpdate。

***useEffect是在组件状态改变之后，并且在组件layout和paint之后，也就是说组件出现在页面后再进行调用，useLayoutEffect是在组件状态改变后，但是在组件layout和paint之前，也就是在组件出现在页面之前进行调用。

***useEffect是异步的，useLayoutEffect是同步的。useEffect不会堵塞主线程渲染。

### 3.useRef
```
function xxx(){
  const inputRef = useRef(null);
  useEffect(()=>{
      inputRef.current.value = 'hello'
  },[])
  return (
      <input type="text" ref={inputRef} />
  )
}
```

useRef 接收一个初始值，返回一个可变的ref对象，ref.current指向初始化的值。它可以指向别的值。
由于是函数组件，this不再指向这个组件，所以要达到class组件中实例变量的效果，可以通过useRef来实现。
如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它：
为什么 effect 的清除阶段在每次重新渲染时都会执行，而不是只在卸载组件的时候执行一次。让我们看一个实际的例子，看看为什么这个设计可以帮助我们创建 bug 更少的组件。


### 4.useContext

useContext的参数必须是context本身；
设置context , const ThemContext = React.createContext(themes.light);
const value = useContext(MyContext);
因为没有static的限制，同一个组件中可以使用多个useContext。也就是说，可以使用多个上层组件传递来的数据。

### 5.useReducer
提到reducer，首先想到的应该是redux中的reducer。useReducer这个hook与redux中的reducer有所相似又有所不同。可以查看demo中的useReducer。
const [state, dispatch] = useReducer(reducer,initialState);
要预先写好reducer。
dipatch({type:'ADD'});
与redux中的reducer有所不同的是，useReducer中的reducer是独立的。如果有多个组件使用到了同一个reducer，那么它们之间的状态是独立的。相较于redux的全局共享状态，它还依赖于react-redux提供的Provider组件。
所以是不是突然想到了第四点中的Context，它提供了Provider。如果能配合useReducer，就可以实现全局状态共享了？确实如此！

### 6.useImperativeHandle
useImperativeHandle这个hook是ref的另一种写法。现在通过这个hook可以在子组件中暴露一些API供父组件调用。而父组件是不能直接操作子组件的dom元素的。

### 7.useCallback
父组件通过props传给子组件一个函数，这个函数用到父组件中的state,如果state改变的时候， memo子组件不会检测到属性的变化，useCallback就是为了解决这一问题，它缓存了一个函数，并接受一系列依赖项，返回一个函数，如果依赖项变化，函数变化。
```
const handleChange =useCallback (()=>{
        setResult(count + 1);  //count为父组件的一个state
},[count])
//子组件
<Children  onChange={handleChange} />
```


### 8.useMemo
useMomo用来缓存一个复杂的计算值，useCallback(fn,deps)等价于useMomo(()=>fn,deps)。如果通过一个输入得到一个值需要经过复杂的计算，那么下次同样的输入再进行一遍同样复杂的计算是没有必要的。这就是useMemo的意义。
const result = useMemo(()=>computedExpensiveValue(40),[count]);
const result = computedExpensiveValue(40);
重新计算result的时候，如果count值没变，就直接从缓存里面读取，避免性能消耗。

9.useDebugValue

通常来说你不需要它。它只会存在于自定义的hooks中用来标志一个自定义的hooks。当在chrome中打开react扩展时候，如果一个组件使用到了自定义的hooks，并且该hooks使用到了useDebugValue，那么该组件下方会显示useDebugValue传入的参数。

```
  function useUserInfo() {
    // ...
    useDebugValue('use-user-info');
    return userInfo;
  }

```
