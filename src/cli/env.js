const parseEnv = () => {
  let variablesRSS = Object.entries(process.env)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`);

  console.log(variablesRSS.join('; '))
};

parseEnv();
