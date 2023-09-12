import { uuid } from 'uuidv4';

export const MockData: DocumentEntry[] = [
    {
        uuid: uuid(),
        columnName: 'todo',
        content: [
            {
                uuid: uuid(),
                Title: 'Buy Groceries',
                Body: 'Purchase milk, eggs, bread, and vegetables from the store.',
                imgUrl: null,
            },
            {
                uuid: uuid(),
                Title: 'Read New Book',
                Body: 'Start reading "The Mystery of the Lost Key" by Amanda Author.',
                imgUrl: null,
            },
        ],
    },
    {
        uuid: uuid(),
        columnName: 'in-progress',
        content: [
            {
                uuid: uuid(),
                Title: 'Prepare Presentation',
                Body: 'Gather data and create slides for the upcoming team meeting.',
                imgUrl: null,
            },
            {
                uuid: uuid(),
                Title: 'Code Review',
                Body: "Review and provide feedback on John's pull request for the new feature.",
                imgUrl: null,
            },
            {
                uuid: uuid(),
                Title: 'Write Blog Post',
                Body: 'Work on the blog post about the latest industry trends and insights.',
                imgUrl: null,
            },
        ],
    },
    {
        uuid: uuid(),
        columnName: 'done',
        content: [
            {
                uuid: uuid(),
                Title: 'Exercise Routine',
                Body: 'Complete the morning workout routine, including jogging and yoga.',
                imgUrl: null,
            },
            {
                uuid: uuid(),
                Title: 'Submit Monthly Report',
                Body: 'Finalize and submit the monthly performance report to the management.',
                imgUrl: null,
            },
            {
                uuid: uuid(),
                Title: 'Complete Online Course',
                Body: 'Finish the "Introduction to Data Science" online course on Coursera.',
                imgUrl: null,
            },
            {
                uuid: uuid(),
                Title: 'Family Movie Night',
                Body: 'Organize and enjoy a movie night with the family.',
                imgUrl: null,
            },
            {
                uuid: uuid(),
                Title: 'Water Plants',
                Body: 'Take care of indoor and outdoor plants by watering them.',
                imgUrl: null,
            },
        ],
    },
];
