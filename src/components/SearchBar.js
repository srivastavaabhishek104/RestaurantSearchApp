import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';


class SearchBar extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Feather name='search' style={styles.iconStyle} /> 
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.inputStyle} 
                    placeholder="Search"
                    value={this.props.term}
                    onChangeText ={(text) => this.props.onTermChange(text)}
                    onEndEditing={this.props.onTermSubmit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal:15,
        flexDirection:"row",
        alignItems:'center'
    },
    inputStyle: {
        flex:1,
        fontSize:18
    },
    iconStyle:{
        fontSize:35,
        alignSelf:'center',
        marginHorizontal:15
    }
});

export default SearchBar;
