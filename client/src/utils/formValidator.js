export const validate = (name, value) => {
    const email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    switch (name) {
        case "email":
            if (value === "") {
                return "Email is resquired!";
            } else if (typeof value === "string" && !value.match(email)) {
                return "Invalid Email address!";
            }
            return "";
        case "name":
            if (value === "") return "name is required!";
            if ((value).length > 15) return "Maximum 15 charecter!";
            return "";
        case "required":
            if (value === "") return "*required!";
            return "";
        case "password":
            if (!value || value === "") return "Password is required!";
            if ((value).length < 6)
                return "Password must contain 6 charecters";
            if ((value).length > 16) return "Maximum 16 charecters!";
            return "";
    }
    return "";
};