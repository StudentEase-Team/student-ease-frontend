import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Card, Title, Paragraph, IconButton, TextInput as PaperInput, Text, PaperProvider, Button, Modal } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { themeDark, themeLight } from '../context/PaperTheme';
import { useAuth } from '../context/AuthContext';

type Faculty = {
  id: string;
  name: string;
  abbreviation: string;
  address: string;
  phone: string;
  email: string;
};

const faculties: Faculty[] = [
  {
    id: '1',
    name: 'Fakultet Tehničkih Nauka',
    abbreviation: 'FTN',
    address: 'Trg Dositeja Obradovića 6, Novi Sad',
    phone: '021/450-810',
    email: 'info@ftn.uns.ac.rs'
  },
  {
    id: '2',
    name: 'Ekonomski Fakultet',
    abbreviation: 'EF',
    address: 'Segedinski put 9-11, Subotica',
    phone: '024/628-000',
    email: 'info@ef.uns.ac.rs'
  },
  {
    id: '3',
    name: 'Pravni Fakultet',
    abbreviation: 'PF',
    address: 'Bulevar oslobođenja 30, Novi Sad',
    phone: '021/455-111',
    email: 'info@pf.uns.ac.rs'
  },
  {
    id: '4',
    name: 'Medicinski Fakultet',
    abbreviation: 'MF',
    address: 'Hajduk Veljkova 3, Novi Sad',
    phone: '021/423-600',
    email: 'info@mf.uns.ac.rs'
  },
  {
    id: '5',
    name: 'Filozofski Fakultet',
    abbreviation: 'FF',
    address: 'Dr Zorana Đinđića 2, Novi Sad',
    phone: '021/458-948',
    email: 'info@ff.uns.ac.rs'
  },
  {
    id: '6',
    name: 'Poljoprivredni Fakultet',
    abbreviation: 'PF',
    address: 'Trg Dositeja Obradovića 8, Novi Sad',
    phone: '021/450-810',
    email: 'info@polj.uns.ac.rs'
  },
];

const { width } = Dimensions.get('window');
const numColumns = 4;
const cardMargin = 10;
const outerPadding = 120;
const cardWidth = (width - outerPadding * 2 - (numColumns - 1) * cardMargin) / numColumns;

const FacultyList: React.FC = () => {
  const { theme } = useTheme();
  const { userState } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }: { item: Faculty }) => (
    <View style={[styles.item, { width: cardWidth }]}>
      <Card style={theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark}>
        <Card.Content>
          <Title style={theme === 'light' ? styles.titleLight : styles.titleDark}>{item.name}</Title>
          <Paragraph style={theme === 'light' ? styles.descriptionLight : styles.descriptionDark}>Skraćenica: {item.abbreviation}</Paragraph>
          <Paragraph style={theme === 'light' ? styles.descriptionLight : styles.descriptionDark}>Adresa: {item.address}</Paragraph>
          <Paragraph style={theme === 'light' ? styles.descriptionLight : styles.descriptionDark}>Telefon: {item.phone}</Paragraph>
          <Paragraph style={theme === 'light' ? styles.descriptionLight : styles.descriptionDark}>Email: {item.email}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="pencil"
            size={25}
            mode='contained-tonal'
            onPress={() => console.log('Edit', item.id)}
          />
          <IconButton
            icon="delete"
            size={25}
            mode='contained-tonal'
            onPress={() => console.log('Delete', item.id)}
          />
        </Card.Actions>
      </Card>
    </View>
  );

  return (
    <View style={[theme === 'light' ? styles.pageLightContainer : styles.pageDarkContainer, { paddingHorizontal: outerPadding }]}>
      <View style={theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark}>
        <Text style={theme === 'light' ? styles.titleSearchLight : styles.titleSearchDark}>Search FAQ here</Text>
        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
          <PaperInput placeholder='Search here...' mode='outlined' label="Search here..." style={styles.searchBar} />
        </PaperProvider>
      </View>

      <FlatList
        data={faculties}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
      />

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
            />

            <PaperInput
              label="College abbreviation"
              mode="outlined"
              /*value={subject}
              onChangeText={text => setSubject(text)}*/
              style={styles.input}
            />

            <PaperInput
              label="Address"
              mode="outlined"
              /*value={title}
              onChangeText={text => setTitle(text)}*/
              style={styles.input}
            />
            <PaperInput
              label="Phone number"
              mode="outlined"
              placeholder='+38121536536'
              /*value={description}
              onChangeText={text => setDescription(text)}*/
              style={styles.input}
            />

            <PaperInput
              label="e-mail address"
              mode="outlined"
              placeholder='example@gmail.com'
              /*value={description}
              onChangeText={text => setDescription(text)}*/
              style={styles.input}
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
    </View>
  );
};

const styles = StyleSheet.create({
  pageLightContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  pageDarkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#18191A'
  },
  item: {
    margin: cardMargin,
  },
  card: {
    flex: 1,
  },
  searchBar: {
    marginTop: 30,
    width: '100%',
    borderRadius: 20,
    marginBottom: 10,
  },
  containerFilterLight: {
    marginBottom: 20,
    marginTop: 20,
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
  containerFilterDark: {
    marginBottom: 20,
    marginTop: 20,
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
  titleSearchLight: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
  },
  titleSearchDark: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
    color: 'white'
  },
  qaContainerLight: {
    marginTop: 15,
    backgroundColor: 'white',
  },
  qaContainerDark: {
    marginTop: 15,
    backgroundColor: '#242526',
  },
  titleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  descriptionLight: {
    fontSize: 18,
    marginVertical: 5,
    color: 'black'
  },
  descriptionDark: {
    fontSize: 18,
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
  },
  createCollegeButtonDark: {
    width: '49%',
    backgroundColor: '#9775fa',
  },
  cancelCollegeButtonLight: {
    width: '49%',

  },
  cancelCollegeButtonDark: {
    width: '49%',
    backgroundColor: 'grey',
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
