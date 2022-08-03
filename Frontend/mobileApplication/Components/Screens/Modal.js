import React from "react";
import {Modal,View,Text,TouchableOpacity,StyleSheet} from 'react-native';

const MyModal = (props)=>{
 const {isVisible,setModalVisiblity} = props;

return (
<Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={() => {setModalVisiblity()}}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Your order has been confirmed</Text>
        <TouchableOpacity
          
          onPress={() => {setModalVisiblity()}}
        >
          <Text style={styles.textStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

       
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth:1,
        borderColor:"#4682B4",
        padding: 70,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
     openButton: {
        backgroundColor: "#ccc",
      },
      
      textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "black",
      }
})


export default MyModal;