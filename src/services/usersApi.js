import axios from "axios";
export default {
  options: {
    allUsersUrl:
      "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=5s",
  },
  async getUsers(p = {}) {
    return axios
      .get(this.options.allUsersUrl, {
        params: { ...{ page: 1, count: 6 }, ...p },
      })
      .then(function (response) {
        console.log(response.data.users);
        return response.data.users;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
};
