import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import StackGrid from 'react-stack-grid';
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from '@env';
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { I18n } from "i18n-js";
import { FAQItem } from "../../model/FAQItem";

type FAQShowContentWebProp = {
    i18n: I18n,
    fetchFAQ: () => {},
    items: FAQItem[] | undefined
}

function FAQShowContentWeb({i18n, items, fetchFAQ}: FAQShowContentWebProp) {
    const {theme} = useTheme();
    const {userState} = useAuth();

    async function deleteFAQ(id: number) {
        if (!userState?.token.accessToken) return;
    
        const config = {
          headers: { Authorization: `Bearer ${userState.token.accessToken}` }
        };
        try {
          const response: AxiosResponse = await axios.delete(`${API_BASE_URL}/faq/item/${id}`, config);
          if (response.status === 200) {
            fetchFAQ();
            Toast.show({
              type: 'success',
              text1: 'Succesfully deleted!',
            });
          }
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Failed to delete question. Can delete only if you answered it.',
          });
        }
    }

    return (
        <StackGrid
              columnWidth={'30%'}
              gutter={15}
              style={styles.contentGrid}
              >
              {items?.map((item, index) => (
                <Card key={index} style={theme === 'light' ? styles.cardLight : styles.cardDark}>
                  <Card.Content>
                    <Text style={theme === 'light' ? styles.cardTitleLight : styles.cardTitleDark}>{item.question}</Text>
                    <Text style={theme === 'light' ? styles.cardDescriptionLight : styles.cardDescriptionDark}>{item.answer}</Text>
                    <View style={{height:15}}/>
                    <Text style={theme === 'light' ? styles.cardDescriptionDateLight : styles.cardDescriptionDateDark}>
                      {i18n.t('faq_creationDate')}: {new Date(item.creationDate).toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
                      <View style={{height:10}}/>
                  </Card.Content>
                  {userState?.role !== "STUDENT"? (
                  <Card.Actions>
                    <IconButton icon="delete" mode={theme === 'light' ? 'contained' : 'outlined'} size={25} iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'} onPress={() => deleteFAQ(item.id)}/>
                  </Card.Actions>
                  ):(
                    ''
                  )}

                </Card>
              ))}
            </StackGrid>
    )
}

const styles = StyleSheet.create({
    contentGrid: {
        marginTop: 20,
        width: '80%',
        alignSelf:'center',
    },

    cardLight: {
        backgroundColor: 'white',
        alignSelf: 'center',
        margin: 10
    },

    cardDark: {
        alignSelf: 'center',
        backgroundColor: '#242526',
        margin: 10
    },

    cardTitleLight: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'  
    },
    
    cardTitleDark: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },

    cardDescriptionLight: {
        fontSize: 18,
        marginTop: 20,
        color: 'black',
        marginBottom: 10
    },
    
    cardDescriptionDateLight: {
        fontSize: 16,
        color: '#666'
    },

    cardDescriptionDark: {
        fontSize: 18,
        marginTop: 20,
        color: 'white'
    },

    cardDescriptionDateDark: {
        fontSize: 16,
        marginTop: 20,
        color: '#d3d3d3'
    },
}) 

export default FAQShowContentWeb;