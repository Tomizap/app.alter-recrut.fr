const project = {
    name: "Alter Recrut",
    domain: "alter-recrut.fr",
    location: "",
    links: {
        website: `https://alter-recrut.fr`,
        logo: "https://alter-recrut.fr/wp-content/uploads/2024/05/Logo-Alter-recrut-Transparent-1024x1024.png",
        privacy_policy: "",
        blog: '',
        api: "https://api.alter-recrut.fr"
    },
    // ux: {
    //     pages: {
    //         profil: false,
    //         setting: false,
    //     },
    //     features: {
    //         multilang: ['fr', 'us']
    //     }
    // },
}
for (const wheel in project.wheels) {
    project.ressources[wheel] = []
}
export default project