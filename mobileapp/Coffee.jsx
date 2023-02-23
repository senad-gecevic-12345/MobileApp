import { StyleSheet, Text, View, TextInput, Image, Button, Pressable} from 'react-native';
import React, { useState, useContext, memo} from "react";
import AddImg from './assets/coffee_add.svg'
import Star from './assets/star.svg'
import Heart_ from './assets/heart.svg'
import Animated, { AnimationName, FadeIn } from 'react-native-reanimated'; 
import FavoritesContext from './context.jsx';




const Add = ({counter, func}) =>{
  const [count, setCount] = useState(0);
  return (
    <Pressable style={{height: 45, width: 45, backgroundColor: '#D98046', borderRadius: 20, alignSelf: 'flex-end'}} onPress={() => func( counter + 1)}>
      <View style={{height: 45, width: 15, alignSelf: 'center', justifyContent: 'center'}}>
        <AddImg width={15} height={15}></AddImg>
      </View>
    </Pressable>
  );
}

const DisplayAnImage = ({img}) => {
  return (
    <View style={styles__.container}>
      <Image
        style={styles__.logo}
        source={{
          uri: img
        }}
      />
    </View>
  );
}


const styles__ = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',

  },
  logo: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 15
  },
});

const FavoriteOverlay = ({isFavorite}) => {
  return(
    <View style={{width: '100%', height: '100%', position: 'absolute'}}>
    {
      (isFavorite) ? 
        <Animated.View entering={FadeIn} width={'100%'} height={'100%'} position={'absolute'} >
          <View style={{width: '100%', height: '100%', borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 0.25)', position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
            <Heart_ width={'75%'} height={'75%'} fill={'rgba(255, 255, 255, 0.5)'}></Heart_>
          </View>
        </Animated.View>
        : 
          <View></View>
    }
    </View>
  );
}

// use Context
const CoffeeImageFavorite = (props) => {
  return(
    <View style={{ width: '100%', height: 150, alignSelf: 'center'}} >
      <DisplayAnImage img={props.assets.thumbnail.large.uri}></DisplayAnImage>
      <FavoriteOverlay isFavorite={1}></FavoriteOverlay>
      <View style={{width: '50%', height: '18%', borderBottomLeftRadius:15, borderTopRightRadius: 15, backgroundColor: 'rgba(255, 255, 255, 0.15)', position: 'absolute', alignContent:'center', alignSelf: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center'}}>
        <Star width={'50%'} height={'50%'}></Star>
        <Text style={{color: 'white'}}>4.5</Text>
      </View>
    </View>
  );
}


const CoffeeImagePressable = ({Favorite, img}) => {
  const [isFavorite, setFavorite] = useState(Favorite);
  const [doubletap_buffer, setDoubletapBuffer] = useState(0);
  const [favorites, setFavorites] = useContext(FavoritesContext);
  useState(()=>{
  },[]);

  function doubleTap (buffer, setBuffer, bool, func){
    const now = Date.now();
    const delay = 350;
    if(buffer && ((now - buffer) < delay)){
      func(!bool);
      setBuffer(null);
      setFavorite(!isFavorite);
    }
    else{
      setBuffer(now);
    }
  }

  return(
    <Pressable style={{ width: '100%', height: 150, alignSelf: 'center'}} 
    onPress={()=>doubleTap(doubletap_buffer, setDoubletapBuffer, isFavorite, setFavorite)}
    >
      <DisplayAnImage img={img}></DisplayAnImage>
      <FavoriteOverlay isFavorite={isFavorite}></FavoriteOverlay>

      <View style={{width: '50%', height: '18%', borderBottomLeftRadius:15, borderTopRightRadius: 15, backgroundColor: 'rgba(255, 255, 255, 0.15)', position: 'absolute', alignContent:'center', alignSelf: 'flex-end', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center'}}>
        <Star width={'50%'} height={'50%'}></Star>
        <Text style={{color: 'white'}}>4.5</Text>
      </View>

    </Pressable>
  );
}

const CoffeeContainer_2 = ({name, type}) =>{
  const [counter, setCounter] = useState(0);
  return(
      <View style={{ width: '100%', minHeight: 10, maxHeight: 150, alignSelf: 'center', flex: 0, paddingTop: 10}}>
        <Text style={{color: 'white'}}>{name}</Text>
        <Text style={{color: '#83868D'}}>{type}</Text>
        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{alignSelf: 'center', color: 'orange',  fontSize: 20}}>$ <Text style={{color: 'white'}}>2.5</Text></Text>
          <Add counter={counter} func={setCounter}style={{alignSelf: 'flex-end'}}></Add>
        </View>
      </View>
  );
};

const CoffeeFavorite = ({item}) => {
   callback_ = (isFavorite) => {
    console.log('tnoaeunthuoeanthueoa');
    setFavorites(prev => [...prev , item])
  };
  return(
      <View style={{width: '45%', minHeight: 200, borderRadius: 0, flex: 0, justifyContent: 'center'}}>
        <View style={{width: '100%', minHeight: 200, maxHeight: 500, flex: 0, backgroundColor: 'rgba(255, 255, 255, 0.08)', alignSelf: 'center', borderRadius: 25, borderColor: 'rgba(255, 255, 255, 0.0)', borderWidth: 10}}>
          <CoffeeImageFavorite img={item.img_uri}></CoffeeImageFavorite>
          <CoffeeContainer_2 name={item.name} type={item.type} ></CoffeeContainer_2>
        </View> 
      </View>
  );
};



const Coffee_5 = React.memo(({item}) => {
  return(
      <View style={{width: '45%', minHeight: 200, borderRadius: 0, flex: 0, justifyContent: 'center'}}>
        <View style={{width: '100%', minHeight: 200, maxHeight: 500, flex: 0, backgroundColor: 'rgba(255, 255, 255, 0.08)', alignSelf: 'center', borderRadius: 25, borderColor: 'rgba(255, 255, 255, 0.0)', borderWidth: 10}}>
          <CoffeeImagePressable img={item.img_uri} Favorite={item.isFavorite}></CoffeeImagePressable>
          <CoffeeContainer_2 name={item.name} type={item.type} ></CoffeeContainer_2>
        </View> 
      </View>
  );
});



const RenderCoffee = ({item}) =>{
  return(
    <Coffee_5 item={item}></Coffee_5>
  );
}
export default RenderCoffee;