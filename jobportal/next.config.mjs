// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// module.exports={

//     webpack:(config)=>{
//         config.experiments= config.experiments || {};
//         config.experiments.topLevelAwait=true;
//         return config;
//     },
//     experimental:{
//         serverComponentExternalPackages:["mongoose"],
//     },
// };

export default {
    webpack: (config) => {
        config.experiments = config.experiments || {};
        config.experiments.topLevelAwait = true;
        return config;
    },
    experimental: {
        serverComponentExternalPackages: ["mongoose"],
    },
};