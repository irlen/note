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
useRef,useImperativeHandle,forwardRef结合使用

useRef：返回一个可变的 ref 对象，其current属性被初始化为传入的参数，返回的ref对象在组件的整个生命周期内保持不变。
forwordRef: 引用父组件的ref实例，成为子组件的一个参数，可以引用父组件的ref绑定到子组件自身的节点上。
useImperativeHandle: 第一个参数，接收一个通过forwordRef引用父组件的ref实例，第二个参数是一个回调函数，返回一个对象，对象里存储需要暴露个父组件的属性或者方法。
完整例子：
```
function FatherCom(props){
  const childRef = useRef(null);
  useEffect(()=>{
    //调用子组件暴露出来的方法
    ref.current.forFatherUse();
  },[])
  return (
    <ChildCom ref={childRef} />
    )
}

function ChildCom(ref,props){
  funciton forFatherUse(){
    return "供父组件调用"
  }
  useImperativeHandle(ref,()=>({
    //暴露给父组件方法
    forFatherUse: forFatherUse
  }))
  return (
    <div>我是子组件</div>
    )
}
//将ref作为参数传入子组件
export default forwordRef(ChildCom)
```



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


### 8.useMemo,memo,useCallback
momo类似于PureComponent，作用是优化组件性能，防止组件触发重渲染。
memo针对一个组件的渲染是否重复执行。

useMomo针对一段函数逻辑是否重复执行
```
useMemo(()=>{},[])
如果参数是空数组的话，就只会执行一次
```
与useEffect不同的是，useMemo是在渲染期间完成，useEffect是在渲染之后完成的。

useCallback
useMemo(()=>{fn}) 等价于 useCallback(fn)

对useCallback、useMemo简单的介绍（官方解释）
useCallback:把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。
useMemo:把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
两个都是返回一个memoized，同时具备第二个参数依赖项，第二个参数的情况和useEffect类似，但是useCallback往往使用于传递给子组件的函数的优化，useMemo使用于数据的优化

总结： memo 针对组件，避免对组件不必要的渲染
useMemo 针对数据，对于依赖参数计算的复杂数据，如果参数不变，避免不必要的重复计算
useCallback 针对函数，对于依赖参数执行的函数，如果依赖不变，避免函数重复初始化，每次传给子组件的函数都是同一个，这样子组件不会因为这个函数不同而重复渲染。
用法总结：在子组件不需要父组件的值和函数的情况下，只需要使用memo函数包裹子组件即可。而在使用值和函数的情况，需要考虑有没有函数传递给子组件使用useCallback，值有没有所依赖的依赖项而使用useMemo,而不是盲目使用这些hooks等

9.useDebugValue

通常来说你不需要它。它只会存在于自定义的hooks中用来标志一个自定义的hooks。当在chrome中打开react扩展时候，如果一个组件使用到了自定义的hooks，并且该hooks使用到了useDebugValue，那么该组件下方会显示useDebugValue传入的参数。

```
  function useUserInfo() {
    // ...
    useDebugValue('use-user-info');
    return userInfo;
  }

```
