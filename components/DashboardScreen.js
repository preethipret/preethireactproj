import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setErrorMessage } from '../redux/authActions';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [mostActiveStocks, setMostActiveStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMostActiveStocks();
  }, []);

  const fetchMostActiveStocks = async () => {
    try {
      const response = await axios.get(
        'https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_a9ec3e01d1be42b3a9ebac83c466a9ec'
      );

      setMostActiveStocks(response.data);
    } catch (error) {
      dispatch(setErrorMessage('Error fetching the stock data.'));
    } finally {
      setLoading(false);
    }
  };

  const handleStockPress = (symbol) => {
    navigation.navigate('StockDetail', { symbol });
  };

  const renderStockCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleStockPress(item.symbol)}>
      <Text style={styles.stockName}>{`${item.companyName} ${item.symbol}`}</Text>
      {renderStockDetails('Fund Managers', item.managers)}
      {renderStockDetails('Shares Available', item.shares)}
      {renderStockDetails('Volume', item.volume)}
      {renderStockDetails('High Price Range', `$${item.priceRangeHigh}`)}
      {renderStockDetails('Low Price Range', `$${item.priceRangeLow}`)}
      {renderStockDetails('Issued Date', item.filedDate)}
      {renderStockDetails('Offering Date', item.offeringDate)}
    </TouchableOpacity>
  );

  const renderStockDetails = (label, value) => (
    <Text style={styles.stockDetail}>{`${label}: ${value}`}</Text>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={mostActiveStocks}
          keyExtractor={(item) => item.symbol}
          renderItem={renderStockCard}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  stockName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stockDetail: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
});


export default DashboardScreen;
