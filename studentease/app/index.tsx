import { View, Text } from "react-native"
import Login from "./auth/login"
import NoticeboardShow from "./noticeboard/noticeboard-show"
import NoticeboardCreateItem from "./noticeboard/noticeboard-create-item"

const HomePage = () => {
    return (
        <NoticeboardCreateItem />
    )
}

export default HomePage