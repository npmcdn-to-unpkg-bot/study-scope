import dotenv from 'dotenv';

function DBConnector() {
  
  if(!process.env.DATABASE_URL) {
    dotenv.load();
  }
  
  function getUrl() {
      return process.env.DATABASE_URL;
  }
  
  return {
    getUrl: getUrl
  }
}

module.exports = new DBConnector();