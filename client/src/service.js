// import axios from 'axios';

// const apiUrl = "http://localhost:5069/"

// export default {
//   getTasks: async () => {
//     const result = await axios.get(`${apiUrl}`)
//     return result.data;
//   },
//  // הוספה
//   addTask: async(name)=>{
//     console.log('addTask', name)
//     //TODO
//     return {};
//   },
//   //עדכון
//   setCompleted: async (id, isComplete) => {
//     console.log('setCompleted', { id, isComplete })
//     //TODO
//     return {};
//   },


//   deleteTask: async (id) => {
//     try {
//       const response = await axios.delete(`delete/${id}`)
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error setting completed", error);

//     }
//   }
// };

// import axios from 'axios';

// const apiUrl = "http://localhost:5069/";

// export default {
//   getTasks: async () => {
//     const result = await axios.get(`${apiUrl}`);
//     return result.data;
//   },
//   // הוספה
//   addTask: async (name) => {
//     try {
//       const response = await axios.post(`${apiUrl}post`, { name, isComplete: false });
//       return response.data;
//     } catch (error) {
//       console.error("Error adding task", error);
//       throw error; // אפשר לזרוק את השגיאה כדי שהמשתמש יוכל לטפל בה
//     }
//   },
//   // עדכון
//   setCompleted: async (id, isComplete) => {
//     try {
//       const response = await axios.put(`${apiUrl}items/${id}`, { isComplete });
//       return response.data;
//     } catch (error) {
//       console.error("Error setting completed", error);
//       throw error; // אפשר לזרוק את השגיאה כדי שהמשתמש יוכל לטפל בה
//     }
//   },
//   deleteTask: async (id) => {
//     try {
//       const response = await axios.delete(`${apiUrl}delete/${id}`);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error deleting task", error);
//     }
//   }
// };
import axios from 'axios';

// הגדרת כתובת ה-API כ-default
axios.defaults.baseURL = "http://localhost:5069/";

// הוספת interceptor לשגיאות
axios.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get('/');
    return result.data;
  },
  // הוספה
  addTask: async (name) => {
    try {
      const response = await axios.post('/post', { name, isComplete: false });
      return response.data;
    } catch (error) {
      console.error("Error adding task", error);
      throw error; // אפשר לזרוק את השגיאה כדי שהמשתמש יוכל לטפל בה
    }
  },
  // עדכון
  setCompleted: async (id, isComplete) => {
    try {
      const response = await axios.put(`/items/${id}`, { isComplete });
      return response.data;
    } catch (error) {
      console.error("Error setting completed", error);
      throw error; // אפשר לזרוק את השגיאה כדי שהמשתמש יוכל לטפל בה
    }
  },
  deleteTask: async (id) => {
    try {
      const response = await axios.delete(`/delete/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  }
};
