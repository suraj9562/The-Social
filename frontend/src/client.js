import Sanity from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = Sanity({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2021-12-26",
    useCdn: true,
    token: process.env.REACT_APP_SANITY_PROJECT_TOKEN
});

const builder = imageUrlBuilder(client);

export default client;
export const uelFor = (source) => builder.image(source);