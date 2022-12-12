const config = {

    local: {
        DB: {
            HOST: "localhost",
            PORT: "27017",
            DATABASE: "test",
            MONGOOSE: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
            userName: "",
            Password: "",
        },
        PORTNO: 8088,
      
    }
}


export const get = function get(env) { 
    return config[env];
}