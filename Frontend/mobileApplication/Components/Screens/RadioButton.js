import * as React from 'react';
import { View, Text, TextInput } from 'react-native';

const RadioButton = () => {
    const [button, setButton] = React.useState(null);
    function onChangeValue(event) {
        setButton(event.target.value);
        console.log(event.target.value);
    }
    return (
        <View onChange={onChangeValue}>
            <input type="radio" value="In City" name="button" checked={button === "In City"} />
            <input type="radio" value="Out City" name="button" checked={button === "Out City"} /> 
            <input type="radio" value="Self Drive" name="button" checked={button === "Self Drive"} />
        </View>
    )
}

export default RadioButton;