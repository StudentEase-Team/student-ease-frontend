import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import { Card, Title, Paragraph, IconButton, TextInput as PaperInput, Text, PaperProvider, Button, Modal, Searchbar } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import { themeDark, themeLight } from '../../context/PaperTheme';
import { useAuth } from '../../context/AuthContext';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';

const cardMargin = 10;

const FacultyList: React.FC = () => {
  const { theme } = useTheme();
  const { userState } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const i18n = new I18n(translations)
  const { locale} = useContext(LocaleContext);
  i18n.locale = locale

  return (
    <>
    <ScrollView style={[theme === 'light' ? styles.pageLightContainer : styles.pageDarkContainer]}>
      <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
            <View style={Platform.OS === 'web' ? styles.container : styles.containerMobile}>
                <Searchbar
                    placeholder={i18n.t('searchPlaceholder')}
                    value=''
                    style={Platform.OS === 'web' ? styles.searchBar : styles.searchBarMobile}
                />
            </View>
        </PaperProvider>

      <View style={Platform.OS ==='web'? styles.contentGrid : styles.contentGridMobile}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <Card key={index} style={Platform.OS === 'web'? (theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark) : (theme === 'light'? styles.qaContainerLightMobile:styles.qaContainerDarkMobile)}>
                        <Card.Content>
                            <Title style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>
                                College name
                            </Title>
                            <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>
                                {i18n.t('college_abbreviation')}
                            </Paragraph>
                            <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>
                                {i18n.t('college_address')}
                            </Paragraph>
                            <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>
                                {i18n.t('college_phone')}
                            </Paragraph>
                            <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>
                                {i18n.t('college_email')}
                            </Paragraph>
                        </Card.Content>


                        <Card.Actions>
                            <IconButton
                                icon="pencil"
                                mode={theme === 'light' ? 'contained' : 'outlined'}
                                size={25}
                                iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}
                                onPress={() => console.log('Edit', index)} />
                            <IconButton
                                icon="delete"
                                mode={theme === 'light' ? 'contained' : 'outlined'}
                                size={25}
                                iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}
                                onPress={() => console.log('Delete', index)} />
                        </Card.Actions>
                    </Card>
                ))}
            </View>
            <View style={{height:40}}></View>
      </ScrollView>

      <Modal visible={modalVisible} contentContainerStyle={Platform.OS ==='web'? (theme === 'light' ? styles.modalFormCreateCollegeLight : styles.modalFormCreateCollegeDark) : (theme === 'light' ? styles.modalFormCreateCollegeLightMobile : styles.modalFormCreateCollegeDarkMobile)} onDismiss={() => { setModalVisible(false) }}>
        <View>
          <Text style={Platform.OS ==='web'? (theme === 'light' ? styles.titleModalLight : styles.titleModalDark) : (theme === 'light' ? styles.titleModalLightMobile : styles.titleModalDarkMobile)}>Add a new college</Text>
            <PaperInput
              label="College name"
              mode="outlined"
              /*value={college}
              onChangeText={text => setCollege(text)}*/
              style={styles.input}
              theme={{
                roundness: 7, 
              }}
            />

            <PaperInput
              label="College abbreviation"
              mode="outlined"
              /*value={subject}
              onChangeText={text => setSubject(text)}*/
              style={styles.input}
              theme={{
                roundness: 7, 
              }}
            />

            <PaperInput
              label="Address"
              mode="outlined"
              /*value={title}
              onChangeText={text => setTitle(text)}*/
              style={styles.input}
              theme={{
                roundness: 7, 
              }}
            />
            <PaperInput
              label="Phone number"
              mode="outlined"
              placeholder='+38121536536'
              /*value={description}
              onChangeText={text => setDescription(text)}*/
              style={styles.input}
              theme={{
                roundness: 7, 
              }}
            />

            <PaperInput
              label="e-mail address"
              mode="outlined"
              placeholder='example@gmail.com'
              /*value={description}
              onChangeText={text => setDescription(text)}*/
              style={styles.input}
              theme={{
                roundness: 7, 
              }}
            />

          <View style={styles.buttonRow}>

            {Platform.OS === 'web' ? (
              <Button mode='contained' style={theme === 'light' ? styles.createCollegeButtonLight : styles.createCollegeButtonDark}> Submit announcement </Button>
            ) : (
              <Button mode='contained' style={theme === 'light' ? styles.createCollegeButtonLight : styles.createCollegeButtonDark}> Submit </Button>
            )}
            <Button mode='contained-tonal' onPress={() => setModalVisible(false)} style={theme === 'light' ? styles.cancelCollegeButtonLight : styles.cancelCollegeButtonDark}> Cancel </Button>
          </View>

        </View>
      </Modal>


      {Platform.OS === 'web' ? (
        <Button mode='contained' style={theme === 'light' ? styles.addCollegeButtonLight : styles.addCollegeButtonDark} onPress={() => setModalVisible(true)}>
        Add new college
        </Button>
      ) : (
        <IconButton icon='plus' iconColor='white' size={45} style={theme === 'light' ? styles.addCollegeButtonLightMobile : styles.addCollegeButtonDarkMobile} onPress={() => setModalVisible(true)}>
            </IconButton>
      )}
      
      </>
  );
};

const styles = StyleSheet.create({
  pageLightContainer: {
    flex: 1,
    padding: 20
  },
  
  pageDarkContainer: {
    flex: 1,
    backgroundColor: '#18191A', 
    padding: 20
  },

  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },

  containerMobile: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 10
  },

  searchBar: {
    marginTop: 10,
    marginBottom: 20,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 60,
  },

  searchBarMobile: {
      marginBottom: 20,
      alignSelf: 'center',
      borderRadius: 10,
  },

  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 20
  },

  contentGridMobile: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
  },

  metaLight: {
    fontSize: 16,
    color: '#666',
  },

  metaDark: {
    fontSize: 16,
    color: 'white',
  },

  item: {
    margin: cardMargin,
  },

  card: {
    flex: 1,
  },

  qaContainerLight: {
    marginTop: 15,
    width: '30%',
    backgroundColor: 'white',
  },

  qaContainerDark: {
    marginTop: 15,
    width: '30%',
    backgroundColor: '#242526',
  },

  qaContainerLightMobile: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'white',
  },

  qaContainerDarkMobile: {
      width: '100%',
      marginTop: 15,
      backgroundColor: '#242526',
  },

  titleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },

  titleLightMobile: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },

  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },

  titleDarkMobile: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },

  descriptionLight: {
    fontSize: 18,
    marginVertical: 5,
    color: 'black'
  },

  descriptionLightMobile: {
    fontSize: 16,
    marginVertical: 5,
    color: 'black'
  },

  descriptionDark: {
    fontSize: 18,
    marginVertical: 5,
    color: 'white'
  },

  descriptionDarkMobile: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white'
  },

  addCollegeButtonLight: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#4dabf7',
  },

  addCollegeButtonLightMobile: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#4dabf7',
  },

  addCollegeButtonDark: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#9775fa',
  },

  addCollegeButtonDarkMobile: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#9775fa',
  },

  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    marginTop: 20
  },

  button: {
    width: '49%',
  },

  titleAddCollege: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    alignSelf: 'center',
  },

  modalFormCreateCollegeLight: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    width: '40%',
    alignSelf: 'center',
  },

  modalFormCreateCollegeLightMobile: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    width: '95%',
    alignSelf: 'center',
  },

  modalFormCreateCollegeDark: {
    backgroundColor: '#242526',
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    width: '40%',
    alignSelf: 'center',
  },

  modalFormCreateCollegeDarkMobile: {
    backgroundColor: '#242526',
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    width: '95%',
    alignSelf: 'center',
  },

  input: {
    marginBottom: 10,
  },

  createCollegeButtonLight: {
    width: '49%',
    backgroundColor: '#4dabf7',
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
  },
  
  createCollegeButtonDark: {
    width: '49%',
    backgroundColor: '#9775fa',
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
  },

  cancelCollegeButtonLight: {
    width: '49%',
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
  },

  cancelCollegeButtonDark: {
    width: '49%',
    backgroundColor: 'grey',
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
  },

  titleModalLight: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  titleModalLightMobile: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  titleModalDark: {
    color: 'white',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  titleModalDarkMobile: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FacultyList;
