import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
// commande à faire : npx expo install expo-splash-screen
// pour la nav bar : npm install @react-navigation/bottom-tabs

// je préviens toutes les fonctions compliquées pour le splash screen sortent de cette doc : 
// https://docs.expo.dev/versions/latest/sdk/splash-screen/
// https://hackernoon.com/how-to-design-a-splash-screen-with-expo-and-react-native

// import Barre from './Footer';


// permet de garder le splash screen visible jusqu'à ce que toutes les ressources soient téléchargées
SplashScreen.preventAutoHideAsync();

const App =() => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Chargement de la police, c'est là qu'on fait nos appels à la base de donnée si besoin
        await Font.loadAsync(Entypo.font);
        // Ici on met un timer de 2 secondes artificelle 
        // /!\ A ENELEVER QUAND ON FERA DES TRUCS UTILES ICI /!\
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Quand tout est fini on peut render l'application
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Ici ça permet de cacher le Splash screen, et on le fait pas avant le 
      // setAppIsReady on pourrait avoir des pb
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // fin du setup du splash screen

  // Page principale
  function HomeScreen() {
    return (
      <View style={styleMain(false).fond} onLayout={onLayoutRootView}>
        <Text style={styleMain(false).text}>page d'entrée</Text>
      </View>
    );
  }

  function SettingsScreen() {
    return (
      <View style={styleMain(false).fond}>
        <Text style={styleMain(false).text}>page des paramètres</Text>
      </View>
    );
  }

  function AccountScreen() {
    return (
      <View style={styleMain(false).fond}>
        <Text style={styleMain(false).text}>page du compte</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
        <Tab.Screen name="Account" component={AccountScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// clair est un booléen
var styleMain = function(clair) {
  var couleurF = clair ? "#FFFFFF" : "#000000";
  var couleurT = clair ? "#000000" : "#FFFFFF";

  return {
    fond: {
      flex: 1,
      backgroundColor: couleurF, 
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    text: {
      color: couleurT,
    }
  }
};


export default App;