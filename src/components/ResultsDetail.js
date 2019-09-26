import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image} from 'react-native'

class ResultsDetail extends Component {
    render() {
        const {result} = this.props;
        const uri = result.thumb ? result.thumb : "http://www.buchanhotel.com/assets/images/mastheads/restaurants-nearby.jpg";
        return (
            <View style={styles.container}>
                <Image style= {styles.image} source={{uri:uri}}/>
                <Text style={styles.name}>{result.name}</Text>
                <Text style={styles.textStyle}> {result.user_rating.aggregate_rating} Stars {result.all_reviews_count} Reviews </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal:15
    },
    image: {
        height: 120,
        width:250,
        borderRadius:4,
        marginBottom:5
    },
    name:{
        fontWeight:'bold'
    }
})

export default ResultsDetail