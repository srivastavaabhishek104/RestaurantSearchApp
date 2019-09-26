import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image,FlatList} from 'react-native'

class ResultsShowScreen extends Component {
    render() {
        const {navigation} = this.props;
        const result = navigation.getParam("restaurant");
        return (
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data = {result.photos}
                    keyExtractor = {(result) => result.photo.id}
                    renderItem = {({item})=> {
                        return (
                            <Image source={{uri: item.photo.thumb_url}} style = {{width:250,height:120}} />
                        )
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({});

export default ResultsShowScreen;
