import { NoticeboardItemCategory } from "./NoticeboardItemCategory";

export interface NoticeboardItem {
    id: number,
    title: string,
    message: string,
    updatedAt: Date,
    category: NoticeboardItemCategory,
    subjectName: string,
    collegeName: string,
    subjectId: number,
    collegeId: number,
    shouldNotify: boolean,
    creatorName: string
}