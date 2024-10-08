# todo-3
## Project goals
Building a Quasar web app with synchronized backend access and clean backend.

## MVP
- [ ] Implement first to-do actions (CRUD)
- [x] Notify accounts via WebPush when changes occur
- [ ] Notify user when someone else logs in with the same user data
- [ ] Send current subscription endpoint in header
- [ ] Only show notification when app is not currently open

## Next version

## Database schemas
### Project
project: {
    id: UUID,
    name: String,
    tasks: [Task],
    members: [Account]
}

### User
user: {
    id: UUID,
    email: String,
    name: {
        first: String,
        last: String
    },
    passwordHash: String,
    accounts: [{
        description: String,
        account: Account
    }]
}

### Account
account: {
    id: UUID, 
    name: String
}

### Task
task: {
    id: UUID,
    title: String,
    details: String,
    tags: [String],
    links: [
        type: String,
        content: Any
    ],
    owner: Account,
    due: Date,
    status: String
}
