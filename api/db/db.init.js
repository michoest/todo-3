export default {
  projects: [
    {
      name: "Project Alpha",
      details: "Backend re-launch",
      taskIndices: [0, 1],
      memberIndices: [0, 1, 2],
    },
    {
      name: "Project Beta",
      details: "Financial restructuring of the company",
      taskIndices: [2, 3],
      memberIndices: [1, 3],
    },
  ],
  users: [
    {
      email: "john.doe@example.com",
      name: {
        first: "John",
        last: "Doe",
      },
      password: "john",
      accounts: [
        {
          description: "Personal",
          accountIndex: 0,
        },
        {
          description: "Work",
          accountIndex: 1,
        },
      ],
    },
    {
      email: "jane.smith@example.com",
      name: {
        first: "Jane",
        last: "Smith",
      },
      password: "jane",
      accounts: [
        {
          description: "Personal",
          accountIndex: 2,
        },
      ],
    },
  ],
  accounts: [
    {
      name: "John's Personal Account",
    },
    {
      name: "John's Work Account",
    },
    {
      name: "Jane's Personal Account",
    },
    {
      name: "Team Account",
    },
  ],
  tasks: [
    {
      title: "Implement user authentication",
      details: "Set up JWT-based authentication for the API",
      tags: ["backend", "security"],
      links: [
        {
          type: "document",
          content: "https://example.com/docs/auth-spec.pdf",
        },
      ],
      owner: "acc-002",
      due: "2024-10-15T00:00:00Z",
      status: "In Progress",
    },
    {
      title: "Design landing page",
      details: "Create a responsive design for the project landing page",
      tags: ["frontend", "design"],
      links: [
        {
          type: "image",
          content: "https://example.com/mockups/landing-page.png",
        },
      ],
      owner: "acc-003",
      due: "2024-10-20T00:00:00Z",
      status: "Not Started",
    },
    {
      title: "Optimize database queries",
      details: "Improve performance of slow-running queries",
      tags: ["backend", "database"],
      links: [
        {
          type: "issue",
          content: "https://example.com/issues/PROJ-123",
        },
      ],
      owner: "acc-002",
      due: "2024-10-25T00:00:00Z",
      status: "In Progress",
    },
    {
      title: "Write user documentation",
      details: "Create comprehensive user guide for the new features",
      tags: ["documentation"],
      links: [
        {
          type: "document",
          content: "https://example.com/docs/user-guide-template.docx",
        },
      ],
      owner: "acc-004",
      due: "2024-11-01T00:00:00Z",
      status: "Not Started",
    },
  ],
};
