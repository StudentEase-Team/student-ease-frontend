import React, { useState } from "react";
import { View, Platform, Pressable, StyleSheet } from "react-native";
import { PaperProvider, TextInput as PaperInput, Text } from "react-native-paper";
import { themeLight, themeDark } from "../../context/PaperTheme";
import CollegeSubjectDropdowns from "../form/college-subject";
import CollegeSubjectDropdownsRow from "../form/college-subject-row";
import { useTheme } from "../../context/ThemeContext";
import { NoticeboardFilterType } from "../../model/NoticeboardFilterType";
import { NoticeboardItem } from "../../model/NoticeboardItem";
import dayjs from 'dayjs';

type NoticeboardSearchFilterProps = {
    items: NoticeboardItem[] | undefined,
    setItems: React.Dispatch<React.SetStateAction<NoticeboardItem[] | undefined>>,
    collegeSearchParam: string,
    setCollegeSearchParam: React.Dispatch<React.SetStateAction<string>>,
    subjectSearchParam: string,
    setSubjectSearchParam: React.Dispatch<React.SetStateAction<string>>,
    date: dayjs.Dayjs,
    setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>,
    setDateModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

function NoticeboardSearchFilter(props: NoticeboardSearchFilterProps) {

    const filterOptions: { value: NoticeboardFilterType; label: string }[] = [
        { value: 'ALL', label: 'All' },
        { value: 'UNIVERSITY', label: 'University' },
        { value: 'COLLEGE', label: 'College' },
        { value: 'SUBJECT', label: 'Subject' },
        { value: 'OTHER', label: 'Other' },
    ];

    const { theme } = useTheme();
    const [collegeFilterEnabled, setCollegeFilterEnabled] = useState(true);
    const [subjectFilterEnabled, setSubjectFilterEnabled] = useState(true);
    const [selectedFilterType, setSelectedFilterType] = useState<NoticeboardFilterType | null>('ALL');
    
    const handlePressFilterOptions = (value: NoticeboardFilterType) => {
        if(value === 'UNIVERSITY') {
            setCollegeFilterEnabled(false);
            setSubjectFilterEnabled(false);
            props.setItems(props.items?.filter(i => i.category === "UNIVERSITY_ANNOUNCEMENT" || i.category === "UNIVERSITY_GUEST_ANNOUNCEMENT"))
        }        
        else if(value === 'ALL') {
            setCollegeFilterEnabled(true);
            setSubjectFilterEnabled(true);
            props.setItems(props.items);
        }
        else if(value === 'OTHER') {
            setCollegeFilterEnabled(false);
            setSubjectFilterEnabled(false);
            props.setItems(props.items?.filter(i => i.category === "INTERNSHIP_ANNOUNCEMENT" || i.category === "ACTIVITIES_ANNOUNCEMENT"))
        }
        else if(value === 'COLLEGE') {
            setCollegeFilterEnabled(true);
            setSubjectFilterEnabled(false);
            props.setItems(props.items?.filter(i => i.category === "COLLEGE_ANNOUNCEMENT" || i.category === "COLLEGE_GUEST_ANNOUNCEMENT"))
        
        }
        else if(value === 'SUBJECT') {
            setCollegeFilterEnabled(true);
            setSubjectFilterEnabled(true);
            props.setItems(props.items?.filter(i => i.category === "SUBJECT_ANNOUNCEMENT" || i.category === "SUBJECT_EXAM_RESULT_ANNOUNCEMENT" || i.category === "SUBJECT_EXAM_DATE_ANNOUNCEMENT"))
        }
        setSelectedFilterType(value);
    };

    return (
        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
        <View style={styles.filterAndSearchContainer}>
            <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark) : (theme === 'light' ? styles.containerFilterLightMobile : styles.containerFilterDarkMobile)}>
                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleFilterLight : styles.titleFilterDark) : (theme === 'light' ? styles.titleFilterLightMobile : styles.titleFilterDarkMobile)}>Filter by parameters</Text>
                <View style={styles.container}>
                    {filterOptions.map((option, index) => (
                    <View style={Platform.OS === 'web' ? styles.radioButtons : styles.radioButtonsMobile} key={index}>
                        <Pressable
                            key={index}
                            style={[styles.pressable, selectedFilterType === option.value
                                ? { backgroundColor: theme === 'light' ? '#4dabf7' : '#9775fa' }
                                : { borderColor: 'grey', borderWidth: 0.5 },]}
                            onPress={() => handlePressFilterOptions(option.value)}>

                            <Text
                                style={[
                                styles.text,
                                { color: selectedFilterType === option.value ? '#fff' : theme === 'light' ?  '#4dabf7' : '#9775fa' }, ]}>
                                {option.label}
                            </Text>
                        </Pressable>
                    </View>
                    ))}
                
                    {Platform.OS === 'web' ? (
                        <CollegeSubjectDropdownsRow subjectEnabled={false} collegeEnabled={false} filterableData={[]}
                        anyEnabled={true} 
                        setSelectedCollege={ props.setCollegeSearchParam } 
                        setSelectedCollegeID={function (value: React.SetStateAction<number>): void {
                            
                            } } 
                        setSelectedSubject={ props.setSubjectSearchParam }
                        setSelectedSubjectID={function (value: React.SetStateAction<number>): void {

                            } } />
                    ) : (
                        <View style={styles.inputColumn}>
                            <CollegeSubjectDropdowns subjectEnabled={false} collegeEnabled={false} filterableData={[]}
                            anyEnabled={true} 
                            setSelectedCollege={ props.setCollegeSearchParam } 
                            setSelectedCollegeID={function (value: React.SetStateAction<number>): void {
                                
                                } } 
                            setSelectedSubject={ props.setSubjectSearchParam }
                            setSelectedSubjectID={function (value: React.SetStateAction<number>): void {

                                } } />
                    </View>
                    )}
                
                </View>
            </View>

            <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.containerSearchLight : styles.containerSearchDark) : (theme === 'light' ? styles.containerSearchLightMobile : styles.containerSearchDarkMobile)}>
                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleFilterLight : styles.titleFilterDark) : (theme === 'light' ? styles.titleFilterLightMobile : styles.titleFilterDarkMobile)}>Search and sort</Text>
                <View style={styles.searchSortGrid}>
                    <View style={Platform.OS === 'web' ? styles.inputRow : styles.inputColumn}>
                        <PaperInput
                            label="Search..."
                            mode="outlined"
                            style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}>
                        </PaperInput>
                        <PaperInput
                            label="Date"
                            mode="outlined"
                            value={props.date.toDate().toLocaleDateString()}
                            style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}
                            right={<PaperInput.Icon icon='calendar-outline'
                                color={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}
                                onPress={() => { props.setDateModalVisible(true); } }/>} 
                                />
                    </View>
                </View>
            </View>
        </View>
    </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },

    pressable: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 2,
    },

    text: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    filterAndSearchContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    },

    searchSortGrid: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginBottom: 20,
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

    radioButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },

    radioButtonsMobile: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'center',
    },

    filterGrid: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
    }, 

    containerSearchLight: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'white',
        width: '70%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerSearchLightMobile: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerSearchDark: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#242526',
        width: '70%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerSearchDarkMobile: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#242526',
        width: '100%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: "100%"
    },

    inputColumn: {
        flexDirection: 'column',
        width: '100%',
    },

    titleFilterLight: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
        color: 'black'
    },

    titleFilterLightMobile: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: 'black'
    },

    titleFilterDark: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
        color: 'white'
    },

    titleFilterDarkMobile: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: 'white'
    },

    inputLight: {
        marginTop: 10,
        color: '#242526',
        width: '49%',
        height: 45
    },

    inputLightMobile: {
        marginTop: 10,
        color: '#242526',
        width: '100%',
        alignSelf: 'center',
        height: 45,
    },
    
    inputDark: {
        marginTop: 10,
        color: 'white',
        width: '49%',
        height: 45
    },

    inputDarkMobile: {
        marginTop: 10,
        color: 'white',
        width: '100%',
        alignSelf: 'center',
        height: 45,
        fontSize: 14
    },
})

export default NoticeboardSearchFilter;