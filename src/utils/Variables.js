export const initialCreateAppointmentStateForm = {
  friendList: {
    elementType: "select",
    elementConfig: {
      options: [
        {
          value: {
            last_name: "Kincade",
            first_name: "Paxon",
            phone: "943-237-8503",
            email: "pkincadedo@aboutads.info",
            avatar:
              "https://robohash.org/facilisoccaecatimolestias.jpg?size=50x50&set=set1"
          },
          displayValue: "Paxon Kincade"
        },
        {
          value: {
            last_name: "Rubinowitsch",
            first_name: "Tammi",
            phone: "745-547-0519",
            email: "trubinowitsch3x@wisc.edu",
            avatar:
              "https://robohash.org/ullamexercitationemsequi.jpg?size=50x50&set=set1"
          },
          displayValue: "Tammi Rubinowitsch"
        }
      ]
    },
    value: {
      last_name: "Kincade",
      first_name: "Paxon",
      phone: "943-237-8503",
      email: "pkincadedo@aboutads.info",
      avatar:
        "https://robohash.org/facilisoccaecatimolestias.jpg?size=50x50&set=set1"
    },
    validation: {},
    label: "Invite a Person",
    valid: true
  },
  startDate: {
    elementType: "date",
    elementConfig: {
      type: "date",
      placeholder: "Start Date"
    },
    value: "",
    validation: {
      required: true
    },
    label: "Start Date",
    valid: false,
    touched: false
  },
  startTime: {
    elementType: "time",
    elementConfig: {
      type: "time",
      placeholder: "Start Time"
    },
    value: "",
    validation: {
      required: true
    },
    label: "Start Time",
    valid: false,
    touched: false
  },
  endDate: {
    elementType: "date",
    elementConfig: {
      type: "date",
      placeholder: "End Date"
    },
    value: "",
    validation: {
      required: true
    },
    label: "End Date",
    valid: false,
    touched: false
  },
  endTime: {
    elementType: "time",
    elementConfig: {
      type: "time",
      placeholder: "End Time"
    },
    value: "",
    validation: {
      required: true
    },
    label: "End Time",
    valid: false,
    touched: false
  },
  location: {
    elementType: "select",
    elementConfig: {
      options: [
        {
          value: {
            place: "Valley Edge",
            street: "2 Garrison Road"
          },
          displayValue: "Valley Edge"
        },
        {
          value: {
            place: "Bartillon",
            street: "72 Donald Junction"
          },
          displayValue: "Bartillon"
        },
        {
          value: {
            place: "Homewood",
            street: "04863 Monica Circle"
          },
          displayValue: "Homewood"
        }
      ]
    },
    value: {
      place: "Valley Edge",
      street: "2 Garrison Road"
    },
    validation: {},
    label: "Location",
    valid: true
  },
  topics: {
    elementType: "textarea",
    elementConfig: {
      type: "text",
      placeholder: "Topics(Separate by comma)"
    },
    value: "",
    validation: {
      required: true
    },
    label: "Topics",
    valid: false,
    touched: false
  }
};

export const initalEditAppointmentsStateForm = {
  startDate: {
    elementType: "date",
    elementConfig: {
      type: "date",
      placeholder: "Start Date"
    },
    value: "",
    validation: {
      required: true
    },
    label: "Start Date",
    valid: false,
    touched: false
  },
  startTime: {
    elementType: "time",
    elementConfig: {
      type: "time",
      placeholder: "Start Time"
    },
    value: "",
    validation: {
      required: true
    },
    label: "Start Time",
    valid: false,
    touched: false
  },
  endDate: {
    elementType: "date",
    elementConfig: {
      type: "date",
      placeholder: "End Date"
    },
    value: "",
    validation: {
      required: true
    },
    label: "End Date",
    valid: false,
    touched: false
  },
  endTime: {
    elementType: "time",
    elementConfig: {
      type: "time",
      placeholder: "End Time"
    },
    value: "",
    validation: {
      required: true
    },
    label: "End Time",
    valid: false,
    touched: false
  },
  location: {
    elementType: "select",
    elementConfig: {
      options: [
        {
          value: {
            place: "Valley Edge",
            street: "2 Garrison Road"
          },
          displayValue: "Valley Edge"
        },
        {
          value: {
            place: "Bartillon",
            street: "72 Donald Junction"
          },
          displayValue: "Bartillon"
        },
        {
          value: {
            place: "Homewood",
            street: "04863 Monica Circle"
          },
          displayValue: "Homewood"
        }
      ]
    },
    value: {
      place: "Valley Edge",
      street: "2 Garrison Road"
    },
    validation: {},
    label: "Location",
    valid: true
  },
  topics: {
    elementType: "textarea",
    elementConfig: {
      type: "text",
      placeholder: "Topics(Separate by comma)"
    },
    value: "",
    validation: {
      required: true
    },
    label: "Topics",
    valid: false,
    touched: false
  }
};

const realTimeDateAndTime = new Date();
let month = `${
  realTimeDateAndTime.getMonth() < 10 ? "0" : ""
}${realTimeDateAndTime.getMonth() + 1}`;
let hour = `${
  realTimeDateAndTime.getHours() < 10 ? "0" : ""
}${realTimeDateAndTime.getHours()}`;
let minutes = `${
  realTimeDateAndTime.getMinutes() < 10 ? "0" : ""
}${realTimeDateAndTime.getMinutes()}`;
let seconds = `${
  realTimeDateAndTime.getSeconds() < 10 ? "0" : ""
}${realTimeDateAndTime.getSeconds()}`;

export const queryRealTime =
  realTimeDateAndTime.getFullYear() +
  "/" +
  month +
  "/" +
  realTimeDateAndTime.getDate() +
  " " +
  hour +
  ":" +
  minutes +
  ":" +
  seconds;

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
month = `${tomorrow.getMonth() < 10 ? "0" : ""}${tomorrow.getMonth() + 1}`;

export const queryDayAfter = `${tomorrow.getFullYear()}/${month}/${tomorrow.getDate()}`;
