export const processFirebaseErrors = (msg)=> {
    switch (msg){
        case "Firebase: Error (auth/email-already-in-use).":
            return "Email already in use, choose another email.";
        case "":
            return 
        default:
            return msg;
    }
};