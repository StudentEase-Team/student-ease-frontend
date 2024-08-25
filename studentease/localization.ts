// ./localization.js
const translations = {
    en: {
        welcomeBack: "Welcome back!",
        quoteText: "“Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela",

        homepage: 'Home',
        noticeboard: 'Noticeboard',
        collegeList: 'College list',
        showFAQ: 'Show FAQ',
        answerFAQ: 'Answer FAQ',
        calculateGrades: 'Grades',
        createUser: 'Create user',
        showMaps: 'Show maps',
        subjectList: 'Subject list',
        calendar: 'Calendar',
        repository: 'Repository',
        exportObligations: 'Export obligations',
        changeTheme: 'Change theme',
        changeLocale: 'Change locale',
        logout: 'Logout',

        adminCards_showNoticeboard: "Show Noticeboard",
        adminCards_collegeList: "College list",
        adminCards_subjectList: "Subject list",
        adminCards_createUser: "Create a user",
        adminCards_answerFAQ: "Answer FAQ",

        professorCards_showNoticeboard: "Show Noticeboard",
        professorCards_subjects: "Your subjects",
        professorCards_answerFAQ: "Answer FAQ",
        professorCards_seeCalendar: "See your calendar",

        studentCards_showNoticeboard: "Show Noticeboard",
        studentCards_showFAQ: "Show FAQ",
        studentCards_calculateGrades: "Calculate your grades",
        studentCards_seeCalendar: "See your calendar",

        searchPlaceholder: "Search here...",

        noticeboardFilter_all: "All",
        noticeboardFilter_university: "University",
        noticeboardFilter_college: "College",
        noticeboardFilter_subject: "Subject",
        noticeboardFilter_other: "Other",

        noticeboardCard_date: "Date",
        noticeboardCard_creator: "Creator",
        noticeboardCard_subject: "Subject",
        noticeboardCard_college: "College",
        noticeboardCarddelete: "Delete",

        noticeboardNewItem_universityAnnouncement: "University Announcement",
        noticeboardNewItem_universityGuestAnnouncement: "University Guest Announcement",
        noticeboardNewItem_collegeAnnouncement: "College Announcement",
        noticeboardNewItem_collegeGuestAnnouncement: "College Guest Announcement",
        noticeboardNewItem_subjectAnnouncement: "Subject Announcement",
        noticeboardNewItem_subjectExamResultAnnouncement: "Subject Exam Result Announcement",
        noticeboardNewItem_subjectExamDateAnnouncement: "Subject Exam Date Announcement",
        noticeboardNewItem_internshipAnnouncement: "Internship Announcement",
        noticeboardNewItem_activitiesAnnouncement: "Activities Announcement",

        noticeboardNewItem_createNewNotification: "Create a new noticeboard notification",
        noticeboardNewItem_title: "Title",
        noticeboardNewItem_description: "Description",
        noticeboardNewItem_sendEmail: "Notify students by email?",
        noticeboardNewItem_submitAnnouncement: "Submit announcement",
        noticeboardNewItem_submit: "Submit",
        noticeboardNewItem_cancel: "Cancel",

        noticeboard_createNotification: "Create noticeboard notification",
        
        college_abbreviation: "Abbreviation",
        college_address: "Address",
        college_phone: "Phone",
        college_email: "email",

        faqNewItem_prompt: "Ask your question here:",
        faqNewItem_ask: "Ask a question",
        faqNewItem_cancel: "Cancel",

        faq_noQuestions: "No unanswered questions!",
        faq_answer: "Answer:",
        faq_answerPlaceholder: "Answer here",
        faq_answerButton: "Answer",
        faq_cancelButton: "Cancel",
        faq_answer_modal_toast: "Failed to submit answer",

        faq_creationDate: "Creation date",

        userCreation_createUser: "Create a new user",
        userCreation_email: "Email",
        userCreation_password: "Password",
        userCreation_firstname: "Firstname",
        userCreation_lastname: "Lastname",
        userCreation_phoneNumber: "Phone number",
        userCreation_registerNewUser: "Register new user",
        userCreation_register: "Register",
        userCreation_cancel: "Cancel",
        userCreation_roleLabel: "Choose a role",
        userCreation_collegeLabel: "Choose a college",
        userCreation_roleStudent: "Student",
        userCreation_roleProfessor: "Professor",

        subjectList_selectCollege: "Select a college",
        subjectList_professor: "Professor: ",
        subjectList_college: "College: ",

        calendar_noEventsText: "No obligations for this day.",
        calendar_obligationsFor: "Obligations for",
        calendar_selectDate: "Select a date",

        calendar_day: "Day",
        calendar_threeDays: "3 days",
        calendar_week: "Week",
        calendar_month: "Month",
        calendar_schedule: "Schedule",

        exportObligations_title: "Export your obligations",
        exportObligations_downloadInstructions: "Take control of your time and responsibilities! Click the button below to download your obligations in .ics format, and seamlessly integrate them into your calendar. Stay organized and make every moment count!",
        exportObligations_downloadButton: "Download .ics file",
        exportObligations_toast: "File downloaded",

        averageGrade_any: "Any",
        averageGrade_first: "First",
        averageGrade_second: "Second",
        averageGrade_third: "Third",
        averageGrade_fourth: "Fourth",

        averageGrade_title: "Subjects",
        averageGrade_subjectName: "Subject Name",
        averageGrade_grade: "Grade",
        averageGrade_date: "Date",
        averageGrade_invalidDate: "Invalid date",
        averageGrade_average: "Average: ",

        failed_to_fetch_toast: "Failed to fetch data", 
        successfully_deleted_toast: "Succesfully deleted!",
        failed_to_delete_toast1: "Failed to delete question.",
        failed_to_delete_toast2: "Can delete only if you answered it.",
        successfully_created_toast: "Successfully created!",
        failed_to_create_toast: "All fields must be filled!",
        failed_to_create_user_toast: "Failed to create user. Please try again.",
        successfully_logged_toast: "Logged in successfully!"
    },
    sr: {
        welcomeBack: "Dobrodošli nazad!",
        quoteText: "“Obrazovanje je najmoćnije oružje koje možete koristiti da promenite svet.” – Nelson Mandela",

        homepage: 'Početna',
        noticeboard: 'Oglasna tabla',
        collegeList: 'Lista fakulteta',
        showFAQ: 'Prikaži FAQ',
        answerFAQ: 'Odgovorite na FAQ',
        calculateGrades: 'Ocene',
        createUser: 'Kreiraj korisnika',
        showMaps: 'Prikaži mape',
        subjectList: 'Lista predmeta',
        calendar: 'Kalendar',
        repository: 'Repozitorijum',
        exportObligations: 'Izvezi obaveze',
        changeTheme: 'Promeni temu',
        changeLocale: 'Promeni jezik',
        logout: 'Odjavi se',

        adminCards_showNoticeboard: "Prikaži oglasnu tablu",
        adminCards_collegeList: "Spisak fakulteta",
        adminCards_subjectList: "Spisak predmeta",
        adminCards_createUser: "Kreiraj korisnika",
        adminCards_answerFAQ: "Odgovorite na često postavljena pitanja",

        professorCards_showNoticeboard: "Prikaži oglasnu tablu",
        professorCards_subjects: "Vaši predmeti",
        professorCards_answerFAQ: "Odgovorite na često postavljena pitanja",
        professorCards_seeCalendar: "Pogledaj svoj kalendar",

        studentCards_showNoticeboard: "Prikaži oglasnu tablu",
        studentCards_showFAQ: "Prikaži često postavljena pitanja",
        studentCards_calculateGrades: "Izračunaj svoje ocene",
        studentCards_seeCalendar: "Pogledaj svoj kalendar",

        searchPlaceholder: "Pretraži ovde...",

        noticeboardFilter_all: "Sve",
        noticeboardFilter_university: "Univerzitet",
        noticeboardFilter_college: "Fakultet",
        noticeboardFilter_subject: "Predmet",
        noticeboardFilter_other: "Ostalo",

        noticeboardCard_date: "Datum",
        noticeboardCard_creator: "Kreator",
        noticeboardCard_subject: "Predmet",
        noticeboardCard_college: "Fakultet",
        noticeboardCard_delete: "Obriši",

        noticeboardNewItem_universityAnnouncement: "Obaveštenje univerziteta",
        noticeboardNewItem_universityGuestAnnouncement: "Obaveštenje gosta univerziteta",
        noticeboardNewItem_collegeAnnouncement: "Obaveštenje fakulteta",
        noticeboardNewItem_collegeGuestAnnouncement: "Obaveštenje gosta fakulteta",
        noticeboardNewItem_subjectAnnouncement: "Obaveštenje predmeta",
        noticeboardNewItem_subjectExamResultAnnouncement: "Obaveštenje o rezultatima ispita predmeta",
        noticeboardNewItem_subjectExamDateAnnouncement: "Obaveštenje o datumu ispita predmeta",
        noticeboardNewItem_internshipAnnouncement: "Obaveštenje o praksi",
        noticeboardNewItem_activitiesAnnouncement: "Obaveštenje o aktivnostima",

        noticeboardNewItem_createNewNotification: "Kreirajte novo obaveštenje na oglasnoj tabli",
        noticeboardNewItem_title: "Naslov",
        noticeboardNewItem_description: "Opis",
        noticeboardNewItem_sendEmail: "Obavestiti studente putem email-a?",
        noticeboardNewItem_submitAnnouncement: "Kreiraj obaveštenje",
        noticeboardNewItem_submit: "Kreiraj",
        noticeboardNewItem_cancel: "Otkaži",

        noticeboard_createNotification: "Kreirajte obaveštenje na oglasnoj tabli",

        college_abbreviation: "Skraćenica",
        college_address: "Adresa",
        college_phone: "Telefon",
        college_email: "email",

        faqNewItem_prompt: "Postavite svoje pitanje ovde:",
        faqNewItem_ask: "Postavite pitanje",
        faqNewItem_cancel: "Otkaži",

        faq_noQuestions: "Nema neodgovorenih pitanja!",
        faq_answer: "Odgovor:",
        faq_answerPlaceholder: "Unesite odgovor ovde",
        faq_answerButton: "Odgovorite",
        faq_cancelButton: "Otkaži",
        faq_answer_modal_toast: "Neuspešno slanje odgovora",

        faq_creationDate: "Datum postavljanja pitanja",

        userCreation_createUser: "Kreirajte novog korisnika",
        userCreation_email: "Email",
        userCreation_password: "Lozinka",
        userCreation_firstname: "Ime",
        userCreation_lastname: "Prezime",
        userCreation_phoneNumber: "Broj telefona",
        userCreation_registerNewUser: "Registrujte novog korisnika",
        userCreation_register: "Registrujte",
        userCreation_cancel: "Otkaži",
        userCreation_roleLabel: "Odaberite ulogu",
        userCreation_collegeLabel: "Odaberite fakultet",
        userCreation_roleStudent: "Student",
        userCreation_roleProfessor: "Profesor",

        subjectList_selectCollege: "Izaberite fakultet",
        subjectList_professor: "Profesor: ",
        subjectList_college: "Fakultet: ",

        calendar_noEventsText: "Nema obaveza za ovaj dan.",
        calendar_obligationsFor: "Obaveze za",
        calendar_selectDate: "Izaberite datum",

        calendar_day: "Dan",
        calendar_threeDays: "3 dana",
        calendar_week: "Nedelja",
        calendar_month: "Mesec",
        calendar_schedule: "Raspored",

        exportObligations_title: "Izvezite svoje obaveze",
        exportObligations_downloadInstructions: "Preuzmite kontrolu nad svojim vremenom i obavezama! Kliknite dugme ispod da preuzmete svoje obaveze u .ics formatu, i besprekorno ih integrišite u svoj kalendar. Ostanite organizovani i iskoristite svaki trenutak!",
        exportObligations_downloadButton: "Preuzmi .ics datoteku",
        exportObligations_toast: "Dadoteka je preuzeta",

        averageGrade_any: "Bilo koja",
        averageGrade_first: "Prva",
        averageGrade_second: "Druga",
        averageGrade_third: "Treća",
        averageGrade_fourth: "Četvrta",

        averageGrade_title: "Predmeti",
        averageGrade_subjectName: "Naziv predmeta",
        averageGrade_grade: "Ocena",
        averageGrade_date: "Datum",
        averageGrade_invalidDate: "Neispravan datum",
        averageGrade_average: "Prosek: ",

        failed_to_fetch_toast: "Neuspešno pribavljanje podataka", 
        successfully_deleted_toast: "Uspešno obrisano!",
        failed_to_delete_toast1: "Nije moguće obrisati pitanje.",
        failed_to_delete_toast2: "Može biti obrisano samo ako ste Vi odgovorili na pitanje.",
        successfully_created_toast: "Uspešno kreirano!",
        failed_to_create_toast: "Sva polja moraju biti popunjena!",
        failed_to_create_user_toast: "Neuspešno kreiranje korisnika. Pokušajte ponovo.",
        successfully_logged_toast: "Uspešno prijavljivanje!"
    }
}
export { translations };