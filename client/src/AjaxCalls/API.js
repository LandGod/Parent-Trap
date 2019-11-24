import React from "react";
import axios from "axios";

export default {


    createNewEvent : function(eventData) {

        return axios.post('/api/createNewEvent', eventData );

    }
}