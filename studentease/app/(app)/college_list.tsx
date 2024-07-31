import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Platform, ScrollView } from 'react-native';
import { Card, Title, Paragraph, IconButton, TextInput as PaperInput, Text, PaperProvider, Button, Modal } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import { themeDark, themeLight } from '../../context/PaperTheme';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');
const numColumns = 4;
const cardMargin = 10;
const outerPadding = 120;
const cardWidth = (width - outerPadding * 2 - (numColumns - 1) * cardMargin) / numColumns;

const FacultyList: React.FC = () => {
  const { theme } = useTheme();
  const { userState } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
    <ScrollView style={[theme === 'light' ? styles.pageLightContainer : styles.pageDarkContainer]}>
    <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
      <View style={Platform.OS ==='web'? (theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark) : (theme === 'light' ? styles.containerFilterLightMobile : styles.containerFilterDarkMobile)}>
        <Text style={Platform.OS ==='web'? (theme === 'light' ? styles.titleSearchLight : styles.titleSearchDark) : (theme === 'light' ? styles.titleSearchLightMobile : styles.titleSearchDarkMobile)}>Search FAQ here</Text>
        <PaperInput theme={{
                roundness: 7, 
              }} placeholder='Search here...' mode='outlined' label="Search here..." style={styles.searchBar} />
      </View>
      </PaperProvider>

      <View style={Platform.OS ==='web'? styles.contentGrid : styles.contentGridMobile}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <Card key={index} style={Platform.OS === 'web'? (theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark) : (theme === 'light'? styles.qaContainerLightMobile:styles.qaContainerDarkMobile)}>
                        <Card.Content>
                            <Title style={Platform.OS === 'web'? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>College name</Title>
                            <Paragraph style={Platform.OS === 'web'? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>Abbreviation: Some abb</Paragraph>
                            <Paragraph style={Platform.OS === 'web'? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>Address: Some address</Paragraph>
                            <Paragraph style={Platform.OS === 'web'? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>Phone: +38121656999</Paragraph>
                            <Paragraph style={Platform.OS === 'web'? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>email: college@gmail.com</Paragraph>
                        </Card.Content>

                        <Card.Actions>
                            <IconButton
                                icon="pencil"
                                mode='outlined'
                                size={25}
                                iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}
                                onPress={() => console.log('Edit', index)} />
                            <IconButton
                                icon="delete"
                                mode='outlined'
                                size={25}
                                iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}
                                onPress={() => console.log('Delete', index)} />
                        </Card.Actions>
                    </Card>
                ))}
            </View>
            
      </ScrollView>

      <Modal visible={modalVisible} contentContainerStyle={theme === 'light' ? styles.modalFormCreateCollegeLight : styles.modalFormCreateCollegeDark} onDismiss={() => { setModalVisible(false) }}>
        <View>
          <Text style={theme === 'light' ? styles.titleModalLight : styles.titleModalDark}>Add a new college</Text>
          <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
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
          </PaperProvider>

          <View style={styles.buttonRow}>
            <Button mode='contained' style={theme === 'light' ? styles.createCollegeButtonLight : styles.createCollegeButtonDark}> Submit announcement </Button>
            <Button mode='contained-tonal' onPress={() => setModalVisible(false)} style={theme === 'light' ? styles.cancelCollegeButtonLight : styles.cancelCollegeButtonDark}> Cancel </Button>
          </View>

        </View>
      </Modal>

      <Button mode='contained' style={theme === 'light' ? styles.addCollegeButtonLight : styles.addCollegeButtonDark} onPress={() => setModalVisible(true)}>
        Add new college
      </Button>
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
      marginTop: 10
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

  searchBar: {
    marginTop: 10,
    width: '100%',
    height: 45
  },

  containerFilterLight: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
    alignSelf: 'center'
  },

  containerFilterLightMobile: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
  },

  containerFilterDark: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: '#242526',
    borderRadius: 20,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
    alignSelf: 'center'
  },

  containerFilterDarkMobile: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: '#242526',
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
  },

  titleSearchLight: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },

  titleSearchLightMobile: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },

  titleSearchDark: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
    color: 'white'
  },

  titleSearchDarkMobile: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: 'white'
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
    marginTop: 15,
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

  addCollegeButtonDark: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    height: 60,
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

  modalFormCreateCollegeDark: {
    backgroundColor: '#242526',
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    width: '40%',
    alignSelf: 'center',
  },

  input: {
    marginBottom: 10,
    width: 600,
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

  titleModalDark: {
    color: 'white',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FacultyList;
