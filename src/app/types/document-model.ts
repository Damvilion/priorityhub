type DocumentEntry = {
    columnName: string;
    content: Content[];
};

type Content = {
    Title: string;
    Body: string;
    imgUrl?: string | null;
};
