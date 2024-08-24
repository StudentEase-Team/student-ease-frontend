import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { FAQItem } from "../../model/FAQItem";
import { useTheme } from "../../context/ThemeContext";
import { API_BASE_URL } from '@env';
import { useAuth } from "../../context/AuthContext";
import { I18n } from "i18n-js";
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";

type FAQShowContentMobileProps = {
    i18n: I18n,
    items: FAQItem[] | undefined,
    fetchFAQ: () => {}
}

function FAQShowContentMobile({i18n, items, fetchFAQ}: FAQShowContentMobileProps) {
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
        <View style={styles.pageContainerMobile} >
          {items?.map((item, index) => (
            <Card key={index} style={theme === 'light' ? styles.cardLightMobile : styles.cardDarkMobile}>
              <Card.Content>
                <Text style={theme === 'light' ? styles.cardTitleLightMobile : styles.cardTitleDarkMobile}>{item.question}</Text>
                <Text style={theme === 'light' ? styles.cardDescriptionLightMobile : styles.cardDescriptionDarkMobile}>{item.answer}</Text>
                <View style={{height:15}}/>
                <Text style={theme === 'light' ? styles.cardDescriptionDateLightMobile : styles.cardDescriptionDateDarkMobile}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainerMobile: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginTop: 10
    },

    cardLightMobile: {
        width: '100%',
        marginTop: 10,
        backgroundColor: 'white',
    },
      
    cardDarkMobile: {
        width: '100%',
        marginTop: 15,
        backgroundColor: '#242526',
    },
    
    cardTitleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'  
    },
    
    cardTitleDarkMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

    cardDescriptionLightMobile: {
        fontSize: 16,
        marginTop: 10,
        color: 'black'
    },
    
    cardDescriptionDateLightMobile: {
        fontSize: 14,
        marginTop: 20,
        color: 'black'
    },
    
    cardDescriptionDarkMobile: {
        fontSize: 16,
        marginTop: 20,
        color: 'white'
    },
    
    cardDescriptionDateDarkMobile: {
        fontSize: 14,
        marginTop: 20,
        color: '#d3d3d3'
    },
})

export default FAQShowContentMobile;