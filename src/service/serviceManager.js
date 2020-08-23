import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      common: {
        'Accept-Language': 'tr-TR',
      },
    },
  });

export const serviceManager = (servicePathObj, params = {}, options = {}) => {
  // define the path of the api call
  let path = null;
  const type = servicePathObj.type.toLowerCase();

 
  // for regular api domain request
  
path = servicePathObj.path;
  

  return axiosInstance[type](path, params, options);
};

