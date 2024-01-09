import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setErrorMessage } from '../redux/authActions';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [mostActiveStocks, setMostActiveStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMostActiveStocks();
  }, [refreshing]);

  const fetchMostActiveStocks = async () => {
    try {
      setRefreshing(true);

      const response = await axios.get(
        'https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_a9ec3e01d1be42b3a9ebac83c466a9ec'
      );

      setMostActiveStocks(response.data);
    } catch (error) {
      dispatch(setErrorMessage('Error in fetching the stock data.'));
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const handleStockPress = (symbol) => {
    navigation.navigate('StockDetail', { symbol });
  };

  const renderStockCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleStockPress(item.symbol)}>
      <Text style={styles.stockName}>{item.symbol}</Text>
      <Text style={styles.changePrice}>{`Rate: ${item.rate} `}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mostActiveStocks}
        keyExtractor={(item) => item.symbol}
        renderItem={renderStockCard}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchMostActiveStocks} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
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
    color: '#333',
  },
  changePrice: {
    fontSize: 16,
    color: 'green',
    marginTop: 4,
  },
});

export default DashboardScreen;
