import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView } from 'react-native'
import SearchBar from '../components/SearchBar';
import Zomato from '../api/Zomato'
import ResultsList from '../components/ResultsList';
class SearchScreen extends Component {
    state = {
        term:"",
        results:[],
        error:""
    }
    setTerm = (newTerm) => {
        this.setState({
            term:newTerm
        });
    }

    setResults = (results) => {
        this.setState({
            results
        });
    }
    
    setError = (error) => {
        this.setState({
            error
        })
    }

    searchApi = async (searchTerm) => {
        console.log(searchTerm);
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
    
    render() {
        const {term,results,error} = this.state;
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>
                <SearchBar 
                    term={term} 
                    onTermChange={this.setTerm}
                    onTermSubmit={()=>this.searchApi(term)} />
                <Text>{error?error:null}</Text>
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
