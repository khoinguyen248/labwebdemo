export interface MemberData {
    "Tên": string;
    "Vai trò": string;
    "Areas of Interests"?: string;
    "Team"?: string;
    "Email"?: string;
    "Github"?: string;
    "Trang cá nhân (Facebook/Linkedln/Google scholar..)"?: string;
    "Trường/Ngành"?: string;
    "Thành tích/ Project cá nhân"?: string;
    "Dự án thực hiện ở Lab"?: string;
    "Hình đại diện"?: string;
    "Thông tin cá nhân"?: string; // Fallback or extra column
}

export interface ProjectData {
    "Tên": string;
    "Giải thưởng"?: string;
    "Thành viên nhóm"?: string;
    "Mô tả"?: string;
    "Link git"?: string;
}

export interface PublicationData {
    "tháng/năm": string;
    "Tên bài báo": string;
    "Hội nghị/ tạp chí xuất bản (có thể thêm địa điểm tổ chức)": string;
    "Tác giả": string;
    "Abstract": string;
    "Link bài báo": string;
}
