db.createUser({
    user: "user_vagrant",
    pwd: "pass",
    roles: [
        {
            role: 'readWrite',
            db: "db_vagrant",
        },
    ]
});