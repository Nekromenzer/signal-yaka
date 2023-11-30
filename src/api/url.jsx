const urlDoc = {
  user: {
    profiles: {
      url: "user/profiles",
      type: "get",
    },
    createProfile: {
      url: "user/profile",
      type: "post",
    },
    getProfileById: {
      url: "user/profile",
      type: "get",
    },
    editProfile: {
      url: "user/profile",
      type: "put",
    },
  },
  subscription: {
    create: {
      url: "core/subscription",
      type: "post",
    },
    getSubById: {
      url: "core/subscription",
      type: "get",
    },
    getAllSubs: {
      url: "core/subscriptions",
      type: "get",
    },
  },
  auth: {
    authCheck: {
      url: "core/secure/auth-check",
      type: "get",
    },
  },
};
export default urlDoc;