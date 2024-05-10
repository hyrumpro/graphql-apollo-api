const users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        tasks: ['1', '2'],
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        tasks: ['3'],
    },
    {
        id: '3',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        tasks: ['4', '5'],
    },
];

const tasks = [
    {
        id: '1',
        name: 'Task 1',
        complete: false,
        userId: '1',
    },
    {
        id: '2',
        name: 'Task 2',
        complete: true,
        userId: '1',
    },
    {
        id: '3',
        name: 'Task 3',
        complete: false,
        userId: '2',
    },
    {
        id: '4',
        name: 'Task 4',
        complete: true,
        userId: '3',
    },
    {
        id: '5',
        name: 'Task 5',
        complete: false,
        userId: '3',
    },
];

module.exports = {
    users,
    tasks,
};
