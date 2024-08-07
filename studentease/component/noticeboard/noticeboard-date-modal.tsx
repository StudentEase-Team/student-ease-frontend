import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import { Modal } from "react-native-paper";
import DateTimePicker from "react-native-ui-datepicker";
import { useTheme } from "../../context/ThemeContext";
import dayjs from 'dayjs';

type NoticeboardDateModalProps = {
    dateModalVisible: boolean,
    setDateModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    date: dayjs.Dayjs,
    setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>
}

function NoticeboardDateModal(props: NoticeboardDateModalProps) {

    const { theme } = useTheme();

    return (
    <Modal style={Platform.OS ==='web'? styles.dateModal : styles.dateModalMobile } visible={props.dateModalVisible} onDismiss={() => { props.setDateModalVisible(false); } }>
        <View style={theme === 'light' ? styles.datepickerLight : styles.datepickerDark}>
            <DateTimePicker
                mode="single"
                date={props.date}
                selectedItemColor={theme === 'light' ? '#4dabf7' : '#9775fa'}
                headerButtonColor={theme === 'light' ? 'black' : 'white'}
                calendarTextStyle={theme === 'light' ?{ color:'black'}:{color: 'white'}}
                headerTextStyle={theme === 'light' ?{ color:'black'}:{color: 'white'}}
                weekDaysTextStyle={theme === 'light' ?{ color:'black'}:{color: 'white'}}
                onChange={(params) => {
                    props.setDateModalVisible(false);
                    props.setDate(dayjs(params.date?.toString()));
                } } />
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    dateModal: {
        flex: 1,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    },

    dateModalMobile: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    datepickerLight: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '95%',
    },

    datepickerDark: {
        alignSelf: 'center',
        backgroundColor: '#242526',
        borderRadius: 20,
        padding: 20,
        width: '95%',
    },
})

export default NoticeboardDateModal;