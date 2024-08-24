import React, { useContext, useState } from "react";
import { Platform, ScrollView, View, Pressable, StyleSheet } from "react-native";
import { PaperProvider, Checkbox, Text, Modal, TextInput as PaperInput, Button } from "react-native-paper";
import { themeLight, themeDark } from "../../context/PaperTheme";
import CollegeSubjectDropdowns from "../form/college-subject";
import { NoticeboardItemCategory } from "../../model/NoticeboardItemCategory";
import { useAuth } from "../../context/AuthContext";
import { NoticeboardItem } from "../../model/NoticeboardItem";
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { API_BASE_URL } from '@env';
import { useTheme } from "../../context/ThemeContext";
import { AnnouncementType } from "../../model/AnnoucementType";
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';

type NewNoticeboardItemModalProps = {
    newNoticeboardItemModalVisible: boolean
    setNewNoticeboardItemModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    items: NoticeboardItem[] | undefined;
}

function NewNoticeboardItemModal(props: NewNoticeboardItemModalProps) {
    const { userState } = useAuth();
    const { theme } = useTheme()
    const [checkedMail, setCheckedMail] = useState(false);
    const [subject, setSubject] = useState('');
    const [college, setCollege] = useState('');
    const [subjectId, setSubjectID] = useState(-1);
    const [collegeId, setCollegeID] = useState(-1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [collegeComboModalEnabled, setCollegeComboModalEnabled] = useState(true);
    const [subjectComboModalEnabled, setSubjectComboModalEnabled] = useState(true);
    const [selectedValue, setSelectedValue] = useState<AnnouncementType | null>(null);
    const i18n = new I18n(translations)
    const { locale } = useContext(LocaleContext);
    i18n.locale = locale

    const options: { value: AnnouncementType; label: string }[] = [
        { value: NoticeboardItemCategory.UNIVERSITY_ANNOUNCEMENT, label: i18n.t('noticeboardNewItem_universityAnnouncement') },
        { value: NoticeboardItemCategory.UNIVERSITY_GUEST_ANNOUNCEMENT, label: i18n.t('noticeboardNewItem_universityGuestAnnouncement') },
        { value: NoticeboardItemCategory.COLLEGE_ANNOUNCEMENT, label: i18n.t('noticeboardNewItem_collegeAnnouncement') },
        { value: NoticeboardItemCategory.COLLEGE_GUEST_ANNOUNCEMENT, label: i18n.t('noticeboardNewItem_collegeGuestAnnouncement') },
        { value: NoticeboardItemCategory.SUBJECT_ANNOUNCEMENT, label: i18n.t('noticeboardNewItem_subjectAnnouncement') },
        { value: NoticeboardItemCategory.SUBJECT_EXAM_RESULT_ANNOUNCEMENT, label: i18n.t('noticeboardNewItem_subjectExamResultAnnouncement') },
        { value: NoticeboardItemCategory.SUBJECT_EXAM_DATE_ANNOUNCEMENT, label: i18n.t('noticeboardNewItem_subjectExamDateAnnouncement') },
        { value: NoticeboardItemCategory.INTERNSHIP_ANNOUNCEMENT, label: i18n.t('noticeboardNewItem_internshipAnnouncement') },
        { value: NoticeboardItemCategory.ACTIVITIES_ANNOUNCEMENT, label: i18n.t('noticeboardNewItem_activitiesAnnouncement') },
    ];

    const handlePress = (value: AnnouncementType) => {
        if (value === 'UNIVERSITY_ANNOUNCEMENT' || value === 'UNIVERSITY_GUEST_ANNOUNCEMENT') {
            setCollege('')
            setSubject('')
            setCollegeComboModalEnabled(false);
            setSubjectComboModalEnabled(false);
        }
        else if (value === 'COLLEGE_ANNOUNCEMENT' || value === 'COLLEGE_GUEST_ANNOUNCEMENT') {
            setSubject('')
            setCollegeComboModalEnabled(true);
            setSubjectComboModalEnabled(false);
        }
        else if (value === 'SUBJECT_ANNOUNCEMENT' || value === 'SUBJECT_EXAM_DATE_ANNOUNCEMENT' || value === 'SUBJECT_EXAM_RESULT_ANNOUNCEMENT') {
            setCollegeComboModalEnabled(true);
            setSubjectComboModalEnabled(true);
        }
        else {
            setCollege('')
            setSubject('')
            setCollegeComboModalEnabled(false);
            setSubjectComboModalEnabled(false);
        }
        setSelectedValue(value);
    };

    const sumbitAnnouncement = async () => {
        const config = {
            headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
        };
        if (selectedValue !== null) {
            let newNoticeboardItem: NoticeboardItem = {
                id: 0,
                title: title,
                message: description,
                updatedAt: new Date(),
                category: selectedValue as NoticeboardItemCategory,
                subjectName: subject,
                collegeName: college,
                subjectId: subjectId,
                collegeId: collegeId,
                shouldNotify: checkedMail,
                creatorName: ''
            }
            const response: AxiosResponse = await axios.post(`${API_BASE_URL}/noticeboard/item`, newNoticeboardItem, config)
            if (response.status == 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Succesfully created!',
                });
                props.setNewNoticeboardItemModalVisible(false);
                props.items?.push(newNoticeboardItem);
            }
        }
    }

    return (
        <Modal visible={props.newNoticeboardItemModalVisible} contentContainerStyle={Platform.OS === 'web' ? (theme === 'light' ? styles.modalContainerLight : styles.modalContainerDark) : (theme === 'light' ? styles.modalContainerLightMobile : styles.modalContainerDarkMobile)} onDismiss={() => { props.setNewNoticeboardItemModalVisible(false); }}>
            <ScrollView>
                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleModalLight : styles.titleModalDark) : (theme === 'light' ? styles.titleModalLightMobile : styles.titleModalDarkMobile)}>
                    {i18n.t('noticeboardNewItem_createNewNotification')}
                </Text>
                <View style={styles.container}>
                    {options.map((option) => (
                        <Pressable
                            key={option.value}
                            style={[theme === 'light' ? styles.pressableLight : styles.pressableDark, selectedValue === option.value
                                ? { backgroundColor: theme === 'light' ? '#4dabf7' : '#9775fa' }
                                : { borderColor: 'grey', borderWidth: 0.5 },]}
                            onPress={() => handlePress(option.value)}>
                            <Text style={[ styles.pressableText, { color: selectedValue === option.value ? '#fff' : theme === 'light' ? '#4dabf7' : '#9775fa' },]}>{option.label}</Text>
                        </Pressable>
                    ))}
                </View>
                <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                    <CollegeSubjectDropdowns
                        anyEnabled={false}
                        filterableData={[]}
                        setSelectedSubjectID={setSubjectID}
                        setSelectedCollegeID={setCollegeID}
                        subjectEnabled={!subjectComboModalEnabled}
                        collegeEnabled={!collegeComboModalEnabled}
                        setSelectedCollege={setCollege}
                        setSelectedSubject={setSubject}
                    />
                    <PaperInput
                        label={i18n.t('noticeboardNewItem_title')}
                        mode="outlined"
                        value={title}
                        onChangeText={text => setTitle(text)}
                        style={styles.inputTitle}
                    />
                    <PaperInput
                        label={i18n.t('noticeboardNewItem_description')}
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={text => setDescription(text)}
                        style={styles.inputDescription}
                    />
                    <View style={ styles.checkbox }>
                        <Checkbox
                            color={theme === 'light' ? '#4dabf7' : '#9775fa'}
                            status={checkedMail ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setCheckedMail(!checkedMail);
                            }}
                        />
                        <Text style={{ fontSize: 16 }}>{i18n.t('noticeboardNewItem_sendEmail')}</Text>
                    </View>
                </PaperProvider>

                <View style={styles.buttonRow}>
                    {Platform.OS === 'web' ? (
                        <Button mode='contained' onPress={() => sumbitAnnouncement()} style={theme === 'light' ? styles.createNoticeboardItemButtonLight : styles.createNoticeboardItemButtonDark}>
                            {i18n.t('noticeboardNewItem_submitAnnouncement')}
                        </Button>
                    ) : (
                        <Button mode='contained' onPress={() => sumbitAnnouncement()} style={theme === 'light' ? styles.createNoticeboardItemButtonLight : styles.createNoticeboardItemButtonDark}>
                            {i18n.t('noticeboardNewItem_submit')}
                        </Button>
                    )}
                    <Button mode='contained-tonal' onPress={() => props.setNewNoticeboardItemModalVisible(false)} style={theme === 'light' ? styles.cancelNoticeboardItemButtonLight : styles.cancelNoticeboardItemButtonDark}>
                        {i18n.t('noticeboardNewItem_cancel')}
                    </Button>
                </View>
            </ScrollView>

        </Modal>
    )
}


const styles = StyleSheet.create({
    inputTitle: {
        marginTop: -5,
        marginBottom: 5,
        height: 50
    },

    inputDescription: {
        marginBottom: 5,
    },

    modalContainerLight: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '45%',
        alignSelf: 'center',
    },

    modalContainerLightMobile: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: -20,
    },

    modalContainerDark: {
        backgroundColor: '#242526',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '45%',
        alignSelf: 'center',
    },

    modalContainerDarkMobile: {
        backgroundColor: '#242526',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
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
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },

    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        marginTop: 20
    },

    createNoticeboardItemButtonLight: {
        width: '49%',
        backgroundColor: '#4dabf7',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    createNoticeboardItemButtonDark: {
        width: '49%',
        backgroundColor: '#9775fa',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    cancelNoticeboardItemButtonLight: {
        width: '49%',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    cancelNoticeboardItemButtonDark: {
        width: '49%',
        backgroundColor: 'grey',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    checkbox: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        marginTop: 20, 
        marginBottom: 10 
    },

    pressableLight: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 2,
        backgroundColor: 'white'
    },

    pressableDark: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 2,
        backgroundColor: '#242526'
    },

    pressableText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})
export default NewNoticeboardItemModal;