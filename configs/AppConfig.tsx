const appSettings = {
  base_url: "http://3.18.106.114:5000/v0",
  app_key: "f4d1ca1098a0057311bc5fc33ef27a1e",
  linkedin_url: "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
  linkedin_redirect_uri: "http://staging.blossom.team/auth/provider/linkedin"
};

let variable = appSettings;

if (process.env.NODE_ENV === "development") {
  variable = {
    base_url: "http://localhost:5000/v0",
    app_key: "f4d1ca1098a0057311bc5fc33ef27a1e",
    linkedin_url: "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
    linkedin_redirect_uri: "http://localhost:4200/auth/provider/linkedin"
  };
}

export default variable;