export default {
    accounts: [
        { description: 'Bla Inc.' },
        { description: 'Personal Account' },
        { description: 'Project A' },
        { description: 'Project B' }
    ],
    users: [
        { email: 'john@example.com', name: { first: 'John', last: 'Doe' }, password: 'john', accountIndices: [0, 1] },
        { email: 'jane@example.com', name: { first: 'Jane', last: 'Smith' }, password: 'jane', accountIndices: [2, 3] },
        { email: 'bob@example.com', name: { first: 'Bob', last: 'Johnson' }, password: 'bob', accountIndices: [1, 2] }
    ],
    tasks: [
        {
            title: 'Complete Project Proposal',
            tags: ['work', 'urgent'],
            status: 'in_progress',
            ownerIndex: 0, // John's Work Account
            dueDate: '2024-10-01',
            accessIndices: [0, 2, 3] // Project A and Project B Accounts
        },
        {
            title: 'Plan Team Building Event',
            tags: ['work', 'social'],
            status: 'not_started',
            ownerIndex: 2, // Project A Account
            dueDate: '2024-11-15',
            accessIndices: [0, 1, 2, 3] // Work, Personal, and Project B Accounts
        },
        {
            title: 'Prepare Quarterly Financial Report',
            tags: ['finance', 'high-priority'],
            status: 'not_started',
            ownerIndex: 1, // Finance Team Account
            dueDate: '2024-11-15',
            accessIndices: [1, 3] // Finance Team and Project B Accounts
        },
        {
            title: 'Conduct User Experience Research',
            tags: ['design', 'research'],
            status: 'in_progress',
            ownerIndex: 2, // UX Team Account
            dueDate: '2024-10-30',
            accessIndices: [0, 2] // John's Work Account and Project A Account
        },
        {
            title: 'Implement New Security Protocols',
            tags: ['IT', 'security', 'urgent'],
            status: 'not_started',
            ownerIndex: 3, // IT Department Account
            dueDate: '2024-09-15',
            accessIndices: [0, 1, 2, 3] // All Accounts
        },
        {
            title: 'Organize Team Building Event',
            tags: ['HR', 'team'],
            status: 'in_progress',
            ownerIndex: 0, // John's Work Account
            dueDate: '2024-12-01',
            accessIndices: [0, 1, 2, 3] // All Accounts
        },
        {
            title: 'Vermessung',
            tags: ['Haus'],
            status: 'in_progress',
            ownerIndex: 0, // John's Work Account
            dueDate: '2024-11-01',
            accessIndices: [0, 1, 2, 3] // All Accounts
        },
        {
            title: 'Bodengutachten',
            tags: ['Haus'],
            status: 'not_started',
            ownerIndex: 0, // John's Work Account
            dueDate: '2024-11-01',
            accessIndices: [0, 1, 2, 3] // All Accounts
        },
        {
            title: 'Entwurfsplanung',
            tags: ['Haus'],
            status: 'blocked',
            ownerIndex: 0, // John's Work Account
            dueDate: '2024-12-01',
            accessIndices: [0, 1, 2, 3] // All Accounts
        }
    ]
};