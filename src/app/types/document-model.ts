type Item = {
    columnName: string;
    content: string[];
};

type DocumentEntry = {
    columnName: string;
    content: Content;
};

type Content = {
    Title: string;
    Content: string;
    imgUrl?: string;
};
