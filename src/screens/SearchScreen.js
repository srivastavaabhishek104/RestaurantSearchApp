import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView } from 'react-native'
import SearchBar from '../components/SearchBar';
import Zomato from '../api/Zomato'
import ResultsList from '../components/ResultsList';
import { ProgressDialog } from 'react-native-simple-dialogs';
class SearchScreen extends Component {
    state = {
        term:"",
        results:[],
        error:"",
        progressVisible:true
    }
    setTerm = (newTerm) => {
        this.setState({
            term:newTerm
        });
    }

    setResults = (results) => {
        this.setState({
            results,
            progressVisible:false
        });
    }
    
    setError = (error) => {
        this.setState({
            error,
            progressVisible:false
        })
    }

    searchApi = async (searchTerm) => {
        try {
            const response = await Zomato.get('/search',{
                params: { q:searchTerm } 
            });
            this.setResults(response.data.restaurants);
        } catch(e) {
            this.setError("Something Went wrong...")
        }
    }

    componentDidMount() {
        this.searchApi("");
    }

    filterResultByPrice = (price) => {
        if(this.state.results.length) {    
           return this.state.results.filter(result => {
            return result.restaurant.price_range === price
            });
        }
        return []
    }

    apiCall = () => {
        this.setState({
            progressVisible:true
        })
        return this.searchApi(this.state.term)
    }
    
    render() {
        const {term,results,error} = this.state;
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>
                <SearchBar 
                    term={term} 
                    onTermChange={this.setTerm}
                    onTermSubmit={this.apiCall} />
                <Text>{error?error:null}</Text>
                <ProgressDialog
                    visible={this.state.progressVisible}
                    title="Resturant Search"
                    message="Please, wait..."
                />
                <ScrollView>
                    <ResultsList 
                        title="Cost Effective" 
                        results={()=>this.filterResultByPrice(1)} 
                        navigation = {navigation} />
                    <ResultsList 
                        title="Bit Pricier"
                        results={()=>this.filterResultByPrice(2)} 
                        navigation = {navigation} />
                    <ResultsList 
                        title="Big Spender" 
                        results={()=>this.filterResultByPrice(3)} 
                        navigation = {navigation} />
                </ScrollView>
            </View>
        )
    }
}

//const styles = StyleSheet.create({});

export default SearchScreen;
