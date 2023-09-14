type DocumentEntry = {
    uuid: string;
    columnName: string;
    content: Content[];
};

type Content = {
    uuid: string;
    Title: string;
    Body: string;
    imgUrl: string;
};
