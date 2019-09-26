import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList,TouchableOpacity } from 'react-native'
import ResultsDetail from '../components/ResultsDetail'
 class ResultsList extends Component {
    render() {
        const {title,results,navigation} = this.props;
        const result = results()
        
        return (
            result.length ? <View style={styles.container}>
                <Text style={styles.title}> {title} </Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data = {result}
                    keyExtractor = {(result) => result.restaurant.id}
                    renderItem = {({item})=> {
                        return (
                            <TouchableOpacity onPress={()=>{navigation.navigate('ResultsShow', {restaurant:item.restaurant})}}> 
                                <ResultsDetail result = {item.restaurant} />
                            </TouchableOpacity>
                        )
                    }}
                />
            </View> : null
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize:18,
        fontWeight:"bold",
        marginHorizontal:15,
        marginBottom:5
    },
    container :{
        marginBottom:15
    }
});

export default ResultsList;