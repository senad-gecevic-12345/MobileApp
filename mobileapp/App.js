import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, TextInput, Image, FlatList, SafeAreaView, Appearance, useColorScheme, Pressable, Platform} from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component, useEffect, useState, setState, useContext, useCallback} from "react";
import RenderCoffee from './Coffee.jsx';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, {Circle, RadialGradient, Defs, Stop, Ellipse} from 'react-native-svg';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { TransitionPresets } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { Dimensions } from 'react-native';
import SearchIcon from './assets/search_icon.svg'
import HomeBarImg from './assets/home_img.svg'
import ShoppingBag from './assets/shoppingbag.svg'
import Heart_ from './assets/heart.svg'
import Avatar from './assets/Avatar.svg'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoritesContext from './context.jsx';
import CoffeeContext from './CoffeeContext.jsx'
import axios from "axios"

const Drawer = createDrawerNavigator();
const Article = () =>{
  return(
    <View></View>
  )
}
const Feed = () =>{
  return(
    <View></View>
  )
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false }}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class Background extends Component{

  render(){
    const width = 500;
    const height = 500;
    const size = width < height ? width - 32 : height - 16;
    const strokeWidth = 25;
    const radius = (size - strokeWidth) / 2;

    return(
    <View style={{height: windowHeight, width: windowWidth, position: 'absolute'}}>

    <View style={{flex: 1, justifyContent: "center", alignItems: 'center', alignSelf: 'center', width: 500, height: windowHeight}}>
        <Svg height="500" width="500"  left={-150}>
          <Defs>
            <RadialGradient
              id="grad"
              cx="250"
              cy="250"
              r="250"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor="rgb(217, 128, 70)" stopOpacity="0.40"></Stop>
              <Stop offset="0.5" stopColor="rgb(217, 128, 70)" stopOpacity="0.25"></Stop>
              <Stop offset="0.7" stopColor="rgb(217, 128, 70)" stopOpacity="0.15"></Stop>
              <Stop offset="0.85" stopColor="rgb(217, 128, 70)" stopOpacity="0.01"></Stop>
              <Stop offset="1" stopColor="rgb(217, 128, 70)" stopOpacity="0.0"></Stop>
            </RadialGradient>
          </Defs>
          <Circle
            cx={width/2} cy={height/2} r={radius} fill="url(#grad)"
          />
        </Svg>
    </View>
    </View>
    );
  }
}

const Stack = createNativeStackNavigator();

const Stack_One = () =>{
  return(
    <View style={{width: '100%', height: '100%', backgroundColor: 'skyblue'}}></View>
  );
};

const Stack_Two = () =>{
  return(
    <View style={{width: '100%', height: '100%', backgroundColor: 'blue'}}>
    </View>
  );
};


const Settings = ({navigation}) =>{
  return(
      <Pressable style={{width: 75, height: 75, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(34, 41, 49, 1.0)', borderRadius: 25}} onPress={()=> navigation.push('Stack_Two')}>
        <View style={{flexDirection: 'row'}}>
        <View style={{backgroundColor: 'rgba(100, 100, 100, 1.0)', height: 10, width: 10, borderRadius: 5}}></View>
        <View style={{height: 10, width: 5, borderRadius: 5}}></View>
        <View style={{backgroundColor: 'rgba(100, 100, 100, 1.0)', height: 10, width: 10, borderRadius: 5}}></View>
        </View>
        <View style={{height: 10}}></View>
        <View style={{flexDirection: 'row'}}>
        <View style={{backgroundColor: 'rgba(100, 100, 100, 1.0)', height: 10, width: 10, borderRadius: 5}}></View>
        <View style={{height: 10, width: 5, borderRadius: 5}}></View>
        <View style={{backgroundColor: 'rgba(100, 100, 100, 1.0)', height: 10, width: 10, borderRadius: 5}}></View>
        </View>
      </Pressable>
  );
}
const Profile = ({navigation}) =>{
  return(
    <Pressable style={{width: 75, height: 75, zIndex: 5, elevation: 5, justifyContent: 'center'}} onPress={() => navigation.push('Stack_One')} >
      <Avatar width={75} height={75} alignSelf={'center'}></Avatar>
    </Pressable>
  )
}


function HomeScreen() {
  const [coffee_search, onChangeCoffeeSearch] = useState("");
  return (
      <Stack.Navigator initialRouteName={'Main'}
      >
        <Stack.Screen name={'Stack_One'} component={Stack_One}
        options={{
          title: 'Stack_One',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}

        />
        <Stack.Screen name={'Main'} component={HomeScreenMain} 
        options={{
          headerShown: false,
          title: 'Main',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        />
        <Stack.Screen name={'Stack_Two'} component={Stack_Two}
        options={{
          title: 'Stack_Two',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        />
      </Stack.Navigator>
  );
}
function HomeScreenMain({navigation}) {
  const [coffee_search, onChangeCoffeeSearch] = useState("");
  return (
    <View style={{ flex: 1, paddingTop: 0, width: '100%', padding: '0%', height: '100%', paddingLeft: '0%', paddingRight: '0%'}}>
      <Background/>

      <CoffeeList  coffee_search={coffee_search} onChangeCoffeeSearch={onChangeCoffeeSearch} navigation={navigation}></CoffeeList>
    </View>
  );
}
const search_styles = StyleSheet.create({
  input: {
    fontSize: 12,
    height: 75,
    margin: 12,
    padding: 10,
    width: '100%',
    color: 'rgba(255, 255, 255, 0.33)'
  },
});

const Search = ({text, onChangeText}) =>{
  return(
      <SafeAreaView>
      <View style={{height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, margin: 2, borderWidth: 0, padding: 25, flex: 1, flexDirection: 'row'}}>
        <View style={{height: 50, paddingLeft: 25, alignContent: 'center', justifyContent: 'center'}}>
        </View>
        <Image source={require('./assets/Vector.png')}></Image>
        <TextInput
          style={search_styles.input}
          onChangeText={onChangeText} value={text}
          placeholder="Find your coffee..."
          placeholderTextColor={'white'}
        >
      </TextInput>
      </View>
      </SafeAreaView>
  );
};
const SelectedItem  = () => {
  const [counter, setCounter] = useState(1);
  return(
      <View style={{ width: '100%', height: 80, flex: 0, justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: 15}}>
          <View style={{width: '20%', height: '100%',  position: 'relative', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{
                  height: '80%',
                  width: '80%',
                  resizeMode: 'cover',
                  borderRadius: 15
                }}
              source={{
                uri: "https://globalassets.starbucks.com/assets/83490c466e6d48bf8d1151bf7f14b187.jpg"
              }}
            />
          </View>
          <View style={{width: '40%', height: '100%', justifyContent: 'center'}}>
            <Text style={{alignSelf: 'center', color: 'white', color: 'white'}}>Coffee Name</Text>
          </View>
          <View style={{width: 50, height: 50, backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.55)', borderRadius: 25, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center'}}>
            <Button 
            onPress={() => setCounter(counter + 1)} 
            title="+"
            ></Button>
          </View>
          <View style={{width: 30, height: '100%', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: 'white'}}>{counter}</Text>
          </View>
          <View style={{width: 50, height: 50, backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.55)', borderRadius: 25, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center'}}>
            <Button 
            onPress={() => setCounter((counter > 0) ? counter - 1 : 0)} 
            title="-"
            ></Button>
          </View>
      </View>
  );
}
function SelectedScreen({count, selected_list}) {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <Background/>
      <View style={{height: '5%'}}></View>
      <SafeAreaView>
        <SelectedItem ></SelectedItem>
      </SafeAreaView>
      <FlatList
        numColumns={1}
      ></FlatList>
    </View>
  );
}

function HomeScreenHeader({coffee_search, onChangeCoffeeSearch, navigation}){
  return(
    <View style={{width: '100%'}}>
      <View style={{flexDirection: 'row', height: 75, width: windowWidth * 0.89, justifyContent: 'space-between', alignSelf: 'center', zIndex: 10, paddingTop: 50}}>
        <Settings navigation={navigation}></Settings>
        <Profile navigation={navigation}></Profile>
      </View>
      <View style={{paddingTop: 80}}></View>
      <Text style={{fontSize: 40, color: 'white'}}>Find the best <Text style={{color: '#D98046'}}>Coffee</Text> for you</Text>
      <View style={{height: 25}}></View>
      <Search text={coffee_search} onChangeText={onChangeCoffeeSearch}></Search>
      <View style={{height: 25}}></View>
    </View>
  );
}

const CoffeeList = ({coffee_search, onChangeCoffeeSearch, navigation}) =>{
  const [selected_coffee, changeSelection] = useState([{}]);
  const [coffee_, setCoffee_] = useContext(CoffeeContext);
  const [coffee_data_processed, addCoffeeData] = useState([{
    name:    "",
    img_uri: "https://globalassets.starbucks.com/assets/83490c466e6d48bf8d1151bf7f14b187.jpg",
    type: "",
    search_name: "",
    isFavorite: 0
  }]);


  useEffect(()=>{
    let arr =[];
    axios
    .get("http://192.168.10.128:5001/coffee-drinks")
    .then(res =>{
    for(var i = 0; i < res.data.length; i++){
        let _name = res.data[i].name;
        let _img_uri = res.data[i].assets.thumbnail.large.uri;
        let _type = res.data[i].formCode;
        if(!_img_uri) continue;
        arr.push(
          {
            name: _name,
            img_uri: _img_uri,
            type: _type,
            isFavorite: 0
          }
        );
        if(!_img_uri){
          continue;
        };
    }

    setCoffee_(arr);
    })
    .catch((err)=>{
      if(err.response){
        console.log(err.response.data)
      }
      console.log(err.message);
      console.log(err.request);
      console.log('err');
    }
    );

  }, []);

  useEffect(()=>{

  },[]);

  function str_replace(string){
    var str="";
    const arr = ['®', '-', ' '];

    for(var i = 0; i < string.length; ++i){
      let skip = false;
      for(var j = 0; j < arr.length; ++j){
          if(arr[j] == string[i])    {
            skip = true;
            break;
          }

        }
        if(skip) continue;
        if(string[i] == 'è') str += ('e');
        else str += (string[i]);
        };

    return str;
  }
  const filter_coffee_data = coffee_.filter(t => new RegExp('^' + '.*' + str_replace(coffee_search.toLowerCase()) + '.*' + '$').test(str_replace(t.name.toLowerCase())));

  return(
      <FlatList
        ListHeaderComponent={<HomeScreenHeader coffee_search={coffee_search} onChangeCoffeeSearch={onChangeCoffeeSearch} navigation={navigation}></HomeScreenHeader>}
        ListFooterComponent={<View style={{height: 150}}></View>}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={filter_coffee_data}
        numColumns={2}
        contentContainerStyle={{paddingLeft: '10%', paddingRight:'10%'}}
        renderItem={RenderCoffee}
        showsVerticalScrollIndicator={false}
        height={windowHeight}
        ItemSeparatorComponent={

          () => <View style={{ height: 20, width: 16 }}/>
        }
        keyExtractor={(item, index) => String(item + index)}
      />
  );
}
function FavoritesScreen() {
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const [coffee_, setCoffee_] = useContext(CoffeeContext);
  const [coffee__, setCoffee__] = useState([]);

  const fav_list = coffee_.filter(item => item.isFavorite);
  return (
    <View style={{ flex: 1, paddingTop: 0, width: '100%', padding: '0%', height: '100%', paddingLeft: '0%', paddingRight: '0%'}}>
      <Background/>
    </View>
  );
}

const MyTheme = {
  dark: true,
  colors: {
    primary: '#CE7943',
    background: 'rgb(12,15,20)',
    card: 'rgba(13, 16, 21, 0.96)',
    text: '#4A4D52',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
function NotificationScreen_2() {
  return (

    <View style={{ flex: 1, paddingTop: 0, width: '100%', padding: '0%', height: '100%', paddingLeft: '0%', paddingRight: '0%'}}>
      <Background/>
      </View>
  );
}
const FavoritesProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  return (
      <FavoritesContext.Provider value={[favorites, setFavorites]}>
          {props.children}
      </FavoritesContext.Provider>
  );
}; 
const CoffeeProvider = (props) => {
  const [coffee, setCoffee] = useState([]);
  return (
      <CoffeeContext.Provider value={[coffee, setCoffee]}>
          {props.children}
      </CoffeeContext.Provider>
  );
}; 

const Application = () =>{
  const [selected, setSelected] = useState([]);
  const [count, setCount] = useState(0);
  const theme = Appearance.getColorScheme();
  const scheme = useColorScheme();


  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={{tabBarShowLabel: false, headerShown: false
        ,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          bottom: 0,
          elevation: 0,
          borderTopWidth: 0,
        },}}>
        <Tab.Screen name="Home"
          children={()=><HomeScreen></HomeScreen>}
          options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomeBarImg fill={color}></HomeBarImg>
          ),
          }}/>
        <Tab.Screen name="Selected" 
        children={()=><SelectedScreen count={count} selected_list={selected}></SelectedScreen>}
          options={{
          tabBarLabel: 'Selected',
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag fill={color}></ShoppingBag>
          ),}}
        />
        <Tab.Screen name="Favorites" 
          children={()=><FavoritesScreen></FavoritesScreen>}
          options={{
          tabBarLabel: 'Selected',
          tabBarIcon: ({ color, size }) => (
            <Heart_ fill={color}></Heart_>
          ),}}
        />
        <Tab.Screen name="Notifications" component={NotificationScreen_2} 
          options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const Tab = createBottomTabNavigator();
export default function App() {
  return(
    <FavoritesProvider>
      <CoffeeProvider>
        <Application></Application>
      </CoffeeProvider>
    </FavoritesProvider>
  );
}