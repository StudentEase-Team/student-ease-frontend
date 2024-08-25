import React, { useContext, useEffect, useState } from "react";
import { View, Platform, Pressable, StyleSheet } from "react-native";
import { PaperProvider, TextInput as PaperInput, Text, Searchbar } from "react-native-paper";
import { themeLight, themeDark } from "../../context/PaperTheme";
import { useTheme } from "../../context/ThemeContext";
import { NoticeboardFilterType } from "../../model/NoticeboardFilterType";
import { NoticeboardItem } from "../../model/NoticeboardItem";
import dayjs from 'dayjs';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';

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
    const i18n = new I18n(translations)
    const { locale } = useContext(LocaleContext);
    i18n.locale = locale

    const filterOptions: { value: NoticeboardFilterType; label: string }[] = [
        { value: 'ALL', label: i18n.t('noticeboardFilter_all') },
        { value: 'UNIVERSITY', label: i18n.t('noticeboardFilter_university') },
        { value: 'COLLEGE', label: i18n.t('noticeboardFilter_college') },
        { value: 'SUBJECT', label: i18n.t('noticeboardFilter_subject') },
        { value: 'OTHER', label: i18n.t('noticeboardFilter_other') },

    ];

    const { theme } = useTheme();
    const [collegeFilterEnabled, setCollegeFilterEnabled] = useState(true);
    const [subjectFilterEnabled, setSubjectFilterEnabled] = useState(true);
    const [selectedFilterType, setSelectedFilterType] = useState<NoticeboardFilterType | null>('ALL');
    const [filtered, setFiltered] = useState<NoticeboardItem[] | undefined>(props.items);
    const [searchParam, setSearchParam] = useState('');

    const handlePressFilterOptions = (value: NoticeboardFilterType) => {
        let filteredItems: NoticeboardItem[] | undefined = props.items;

        switch (value) {
            case 'UNIVERSITY':
                setCollegeFilterEnabled(false);
                setSubjectFilterEnabled(false);
                filteredItems = props.items?.filter(i => i.category === "UNIVERSITY_ANNOUNCEMENT" || i.category === "UNIVERSITY_GUEST_ANNOUNCEMENT");
                break;
            case 'ALL':
                setCollegeFilterEnabled(true);
                setSubjectFilterEnabled(true);
                break;
            case 'OTHER':
                setCollegeFilterEnabled(false);
                setSubjectFilterEnabled(false);
                filteredItems = props.items?.filter(i => i.category === "INTERNSHIP_ANNOUNCEMENT" || i.category === "ACTIVITIES_ANNOUNCEMENT");
                break;
            case 'COLLEGE':
                setCollegeFilterEnabled(true);
                setSubjectFilterEnabled(false);
                filteredItems = props.items?.filter(i => i.category === "COLLEGE_ANNOUNCEMENT" || i.category === "COLLEGE_GUEST_ANNOUNCEMENT");
                break;
            case 'SUBJECT':
                setCollegeFilterEnabled(true);
                setSubjectFilterEnabled(true);
                filteredItems = props.items?.filter(i => i.category === "SUBJECT_ANNOUNCEMENT" || i.category === "SUBJECT_EXAM_RESULT_ANNOUNCEMENT" || i.category === "SUBJECT_EXAM_DATE_ANNOUNCEMENT");
                break;
            default:
                break;
        }

        setFiltered(filteredItems);
        setSelectedFilterType(value);
    };

    const handleSearch = () => {
        if (searchParam.trim() === '') {
            props.setItems(filtered);
            return;
        }

        const filteredItems2 = filtered?.filter(item =>
            (item.title?.toLowerCase().includes(searchParam.toLowerCase()) || false) ||
            (item.message?.toLowerCase().includes(searchParam.toLowerCase()) || false) ||
            (item.creatorName?.toLowerCase().includes(searchParam.toLowerCase()) || false) ||
            (item.subjectName?.toLowerCase().includes(searchParam.toLowerCase()) || false) ||
            (item.collegeName?.toLowerCase().includes(searchParam.toLowerCase()) || false)
        );

        props.setItems(filteredItems2);
    };

    useEffect(() => {
        handleSearch();
    }, [searchParam, filtered]);

    useEffect(() => {
        handlePressFilterOptions(selectedFilterType || 'ALL');
    }, [props.items, selectedFilterType]);

    return (
        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
            <View style={Platform.OS === 'web' ? styles.container : styles.containerMobile}>
                <Searchbar
                    placeholder={i18n.t('searchPlaceholder')}
                    onChangeText={text => setSearchParam(text)}
                    value={searchParam}
                    style={Platform.OS === 'web' ? styles.searchBar : styles.searchBarMobile}
                />
                <View style={Platform.OS === 'web' ? styles.radioButtons : styles.radioButtonsMobile}>
                    {filterOptions.map((option, index) => (
                        <View key={index}>
                            <Pressable
                                style={[
                                    theme === 'light' ? styles.pressableLight : styles.pressableDark,
                                    selectedFilterType === option.value
                                        ? { backgroundColor: theme === 'light' ? '#4dabf7' : '#9775fa' }
                                        : { borderColor: 'grey' },
                                ]}
                                onPress={() => handlePressFilterOptions(option.value)}
                            >
                                <Text
                                    style={[
                                        Platform.OS === 'web' ? styles.pressableText : styles.pressableTextMobile,
                                        { color: selectedFilterType === option.value ? '#fff' : theme === 'light' ? '#4dabf7' : '#9775fa' },
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
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
        fontSize: 16,
        fontWeight: 'bold',
    },

    pressableTextMobile: {
        fontSize: 14,
        fontWeight: 'bold',
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

    radioButtons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
    },

    radioButtonsMobile: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});

export default NoticeboardSearchFilter;
