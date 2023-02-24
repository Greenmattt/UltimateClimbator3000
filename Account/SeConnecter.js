import React, {useState, useEffect} from 'react';
import { View } from 'react-native';

import style from '../Component/Styles';
import StrInput from '../Component/StrInput';
import GoBackButton from '../Component/GoBackButton'

const onPressRetour = (props) => {
  props.navigation.navigate('Options');
};

const SeConnecter = (props) => {
  const [textEmail, onChangeEmail] = useState('');
  const [textMdp, onChangeMdp] = useState('');

  // load du style
  const [styles, setLeStyle] = useState({});

  useEffect(() => {
    async function getStyle (){
      const s = await style();
      setLeStyle(s);
    }
    getStyle();
  }, [])

  return (
    <View style={styles.container}>
      <GoBackButton onPress = {() => onPressRetour(props)} />
      
      <View style={styles.informationsBox}>

        {/*Input email */}
        <StrInput onChangeText={onChangeEmail} value={textEmail} placeholder={"Email"} secureTextEntry={false}/>

        {/*Input mot de passe */}
        <StrInput onChangeText={onChangeMdp} value={textMdp} placeholder={"Mot de passe"} secureTextEntry={false}/>
      
      </View>
    </View>
  );
};

export default SeConnecter;