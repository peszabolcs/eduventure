// English translations
export default {
  // Menu items
  menu: {
    home: "Home",
    survey: "Survey",
    blog: "Blog",
    profile: "My Profile",
    blogAdmin: "Blog Admin",
    register: "Register",
    login: "Login",
    logout: "Logout",
  },
  // Hero section
  hero: {
    title: "EduVenture",
    subtitle: "Innovative Educational Solutions",
    description:
      "Explore different professions and find the career path that best suits you on an innovative, interactive platform!",
    ctaButton: "Personality Test",
  },
  // Project description
  project: {
    tagline: "Discover the future of your career",
    title: "Discover Your Future",
    description:
      "EduVenture is an innovative platform that helps high school and university students explore career paths before making important decisions. Our goal is to provide interactive, informative, and value-based assistance while building a community for young people.",
    features: {
      ai: {
        title: "AI-based Career Guidance",
        description:
          "Personalized career recommendations based on your interests and abilities. Connect with experts in one-on-one meetings or group seminars.",
      },
      university: {
        title: "University Statistics",
        description:
          "Comparable data and evaluations about universities and majors. Real feedback from former students to help you make informed decisions.",
      },
      company: {
        title: "Virtual Company Tours",
        description:
          "Insight into the daily routines of different jobs through interactive experiences. Learn about how professions really work before choosing your path.",
      },
      community: {
        title: "Community Spaces",
        description:
          "Join young people with similar interests, share experiences and build connections. Thematic forums related to different industries.",
      },
      internship: {
        title: "Internship Programs",
        description:
          "Discover internship opportunities suitable for your field. Apply directly through the platform and gain valuable work experience.",
      },
      blog: {
        title: "Blog and Knowledge Base",
        description:
          "Up-to-date articles, career tips, and professional guides. Expand your knowledge about different professions and industries from reliable sources.",
      },
    },
    whyUs: {
      title: "Why Choose EduVenture?",
      description:
        "Our platform uniquely combines artificial intelligence, community experience, and real professional insights to help you find the most suitable career path for you.",
      points: {
        data: "Data-driven decision support",
        experts: "Connection with real experts",
        insight: "Insight into the world of work",
      },
    },
    newsletter: {
      title: "Stay Updated on Launch!",
      description:
        "Subscribe to our newsletter to be the first to know about the platform launch and the latest developments. Be part of the beginning!",
      button: "Subscribe to Newsletter",
    },
  },
  // Team section
  team: {
    tagline: "The experts behind the project",
    title: "Our Team",
    description:
      "Meet the talented professionals who created and develop the EduVenture platform to help young people with their career choices.",
    members: {
      perjesi: {
        name: "Perjési Szabolcs",
        study: "SZTE - Computer Science",
        role: "Tech Lead Developer",
      },
      patrik: {
        name: "Lengyel Patrik Gábor",
        study: "SZTE - Finance and Accounting",
        role: "Financial Analyst",
      },
      david: {
        name: "Báló Dávid Levente",
        study: "BCE - International Business",
        role: "Technical Product Developer",
      },
      zalan: {
        name: "Gellén Zalán",
        study: "BCE - International Business",
        role: "Marketing Lead",
      },
    },
  },
  // Privacy policy
  privacy: {
    title: "Privacy Policy",
    introduction: "Privacy Notice",
    lastUpdated: "Last updated:",
    sections: {
      dataCollection: {
        title: "Data Collection",
        content: "On the EduVenture platform, we collect the following data:",
      },
      dataUse: {
        title: "Data Usage",
        content: "We use the collected data for the following purposes:",
      },
      dataSecurity: {
        title: "Data Security",
        content: "To protect your data, we take the following measures:",
      },
      cookies: {
        title: "Use of Cookies",
        content: "Our website uses cookies to improve user experience.",
      },
      rights: {
        title: "User Rights",
        content: "Users have the right to:",
      },
      contact: {
        title: "Contact",
        content: "For privacy-related inquiries, you can contact us at:",
      },
    },
  },
  // Profile page
  profile: {
    title: "My Profile",
    personalInfo: "Personal Information",
    updateProfile: "Update Profile",
    changePassword: "Change Password",
    fields: {
      name: "Name",
      email: "Email address",
      role: "Role",
      bio: "Bio",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
    },
    buttons: {
      save: "Save",
      cancel: "Cancel",
      changePassword: "Change Password",
    },
    messages: {
      updateSuccess: "Profile updated successfully!",
      updateError: "Error updating profile.",
      passwordSuccess: "Password changed successfully!",
      passwordError: "Error changing password.",
    },
  },
  // Blog
  blog: {
    title: "Blog",
    readMore: "Read More",
    publishedOn: "Published on:",
    by: "By:",
    backToList: "Back to List",
    newPost: "New Post",
    editPost: "Edit",
    deletePost: "Delete",
    confirmDelete: "Are you sure you want to delete?",
    admin: {
      title: "Blog Administration",
      createPost: "Create New Post",
      editPost: "Edit Post",
      postTitle: "Title",
      postContent: "Content",
      postImage: "Image URL",
      postStatus: "Status",
      draft: "Draft",
      published: "Published",
      save: "Save",
      cancel: "Cancel",
      publish: "Publish",
      unpublish: "Unpublish",
    },
    noResults: "No results match your search criteria.",
    searchPlaceholder: "Search articles...",
    categoriesTitle: "Categories",
    readTime: "min",
    articleNotFound: "Article not found",
    backToBlog: "Back to blog",
    readingTime: "min read",
    errors: {
      fetchFailed: "Error loading articles:",
      articleFetchFailed: "Error loading article:",
    },
    categories: {
      all: "All",
      it: "IT & Programming",
      engineering: "Engineering",
      medicine: "Medicine",
      business: "Business & Management",
      education: "Education",
      arts: "Arts",
      science: "Science",
    },
    loading: "Loading posts...",
  },
  // Authentication
  auth: {
    loginTitle: "Login",
    registerTitle: "Register",
    email: "Email address",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Full Name",
    username: "Username",
    forgotPassword: "Forgot Password",
    loginButton: "Login",
    registerButton: "Register",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    loginHere: "Login here",
    registerHere: "Register here",
    errors: {
      emailRequired: "Email is required",
      emailInvalid: "Invalid email address",
      passwordRequired: "Password is required",
      passwordLength: "Password must be at least 6 characters long",
      passwordMatch: "Passwords do not match",
      nameRequired: "Name is required",
    },
    messages: {
      loginSuccess: "Login successful!",
      loginError: "Login failed. Please check your credentials.",
      registerSuccess: "Registration successful! You can now login.",
      registerError: "Registration failed. Please try again later.",
    },
  },
  // Common
  common: {
    loading: "Loading...",
    error: "An error occurred",
    success: "Operation successful",
  },
  // Footer
  footer: {
    allRightsReserved: "All Rights Reserved",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contactUs: "Contact Us",
  },
  // Language switch
  language: {
    hu: "Magyar",
    en: "English",
  },
};
