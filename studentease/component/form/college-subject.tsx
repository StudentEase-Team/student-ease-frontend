import React, { useEffect, useState } from "react";
import CustomDropdown from "./custom-dropdown";
import { useAuth } from "../../context/AuthContext";
import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from '@env';
import Toast from "react-native-toast-message";
import { College } from "../../model/College";
import { Subject } from "../../model/Subject";

type CollegeSubjectDropdownsProps = {
    filterableData: any[],
    collegeEnabled: boolean,
    subjectEnabled: boolean
    setSelectedCollege: React.Dispatch<React.SetStateAction<string>>,
    setSelectedCollegeID: React.Dispatch<React.SetStateAction<number>>,
    setSelectedSubject: React.Dispatch<React.SetStateAction<string>>,
    setSelectedSubjectID: React.Dispatch<React.SetStateAction<number>>,
    anyEnabled: boolean
};

function CollegeSubjectDropdowns(props: CollegeSubjectDropdownsProps) {
    let filterableDataBak = props.filterableData;
    const { userState } = useAuth();
    const initialCollegeData = [{ label: 'Any', value: 'any' }];
    const initialSubjectData = [{ label: 'Any', value: 'any' }];

    const [collegeData, setCollegeData] = useState<{ label: any, value: any }[]>(initialCollegeData);
    const [subjectData, setSubjectData] = useState<{ label: any, value: any }[]>(initialSubjectData);

    useEffect(() => {
        const fetchColleges = async () => {
            if (!userState?.token.accessToken) return;

            const config = {
                headers: { Authorization: `Bearer ${userState.token.accessToken}` }
            };
            try {
                const response: AxiosResponse = await axios.get(`${API_BASE_URL}/college`, config);
                if (response.status === 200) {
                    const colleges: College[] = response.data;
                    const updatedCollegeData = [{ label: 'Any', value: 'any' }, ...colleges.map(c => ({ label: c.abbreviation, value: c }))];
                    setCollegeData(updatedCollegeData);
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to get colleges',
                });
            }
        };

        fetchColleges();
    }, [userState?.token.accessToken]);

    
    const handleCollegeChange = (selectedCollege: { label: any, value: College | 'any' }) => {
        if (selectedCollege.value === 'any') {
            setSubjectData([{ label: 'Any', value: 'any' }]);
        } else {
            const selectedSubjects = selectedCollege.value.subjects.map(subject => ({
                label: subject.name,
                value: subject
            }));
            setSubjectData([{ label: 'Any', value: 'any' }, ...selectedSubjects]);
        }
        if(selectedCollege.value !== 'any'){
            props.setSelectedCollege(selectedCollege.value.name);
            props.setSelectedCollegeID(selectedCollege.value.id);
        }
        else if(props.anyEnabled)
        {
            props.setSelectedCollege('any');
        }
    };

    const handleSubjectChange = (selectedSubject: { label: any, value: Subject | 'any' }) => {
        if(selectedSubject.value !== 'any'){
            props.setSelectedSubject(selectedSubject.value.name);
            props.setSelectedSubjectID(selectedSubject.value.id);
        }
        else if(props.anyEnabled) {
            props.setSelectedSubject('any');
        }
    }

    return (
        <>
                <CustomDropdown 
                    search
                    data={collegeData} 
                    labelField='label' 
                    valueField='value' 
                    style={{marginBottom: 15, marginTop: 10}}
                    disable={props.collegeEnabled}
                    onChange={handleCollegeChange} 
                />
                <CustomDropdown 
                    data={subjectData} 
                    labelField='label' 
                    valueField='value' 
                    disable={props.subjectEnabled}
                    onChange={handleSubjectChange} 
                />
        </>
    );
}

export default CollegeSubjectDropdowns;
