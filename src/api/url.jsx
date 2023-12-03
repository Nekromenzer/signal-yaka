const urlDoc = {
  user: {
    profiles: {
      url: "user/secure/profiles",
      type: "get",
    },
    createProfile: {
      url: "user/secure/profile",
      type: "post",
    },
    getProfileById: {
      url: "user/secure/profile",
      type: "get",
    },
    editProfile: {
      url: "user/secure/profile",
      type: "put",
    },
    getWalletById:{
      url: "user/secure/wallet",
      type: "get",
    }
  },
  variant: {
    create: {
      url: "core/secure/subscription",
      type: "post",
    },
    getSubById: {
      url: "core/secure/subscription",
      type: "get",
    },
    getAllSubs: {
      url: "core/secure/subscriptions",
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
