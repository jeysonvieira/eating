interface IUser{
    name : string,
    id : string,
    iat : number | undefined
}

declare namespace Express{
    interface Request{
        user : IUser
    }
}