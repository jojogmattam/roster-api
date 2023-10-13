const { uid } = require("uid");
const axios = require("axios");

class Roster {
  constructor() {}

  async addStudent({ name, location }) {
    const id = uid();
    const profilePicture = await this.getPhoto(location); 
  
    this[id] = {
      id,
      name,
      location,
      profilePicture, 
    };
  
    return this[id];
  }

  getOneStudent(id) {
    return this[id];
  }

  // get all students matches name or location
  getStudents({ name, location }) {
    let results = Object.values(this);
    if (name) {
      results = results.filter((student) => student.name === name);
    }
    if (location) {
      results = results.filter((student) => student.location === location);
    }
    return results;
  }

  // update student name or location and change pic if location changed
  async updateStudent(id, { name, location }) {
    if (!this[id]) {
      return null;
    }

    const profilePicture = await this.getPhoto(location); 

    this[id] = {
      ...this[id],
      name,
      location,
      profilePicture, 
    };
    return this[id];
  }

  // delete student
  deleteStudent(id) {
    if (!this[id]) {
      return null;
    }

    delete this[id];
    return this[id];
  }

  //get photo from pixabay api
  async getPhoto(location) {
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${location}`;

    try {
      const response = await axios.get(url);
      return response.data.hits[0].webformatURL;
    } catch (error) {
      console.error("Error fetching photo:", error);
      return null; 
    }
  }
}

module.exports = {
  rosterDB: new Roster(),
};

/* Older Roster DB

const rosterDB = [
  {
    name: "Jojo",
    location: "Illinois",
  },
  {
    name: "Tom",
    location: "Los Angeles",
  },
  {
    name: "Will Smith",
    location: "Chicago",
  },
];

*/
