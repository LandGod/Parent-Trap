import API from '../../utils/API';
import UtilFunc from "../../components/utilityFunctions";


module.exports={


    handleTypeSelector: function(event) {

        this.setState({ eventType: event.target.value }, () => {

            console.log(this.state.eventType);

        });

    }, 

    handleTitleInput: function(event) {

        this.setState({ eventTitle: event.target.value }, () => {

            console.log(this.state.eventTitle);

        });

    }, 

    handleStartTimeInput: function(event) {

        this.setState({ eventStartTime: event.target.value.trim() }, () => {

            console.log(this.state.eventStartTime);

        });

    }, 

    handleEndTimeInput: function(event) {

        this.setState({ eventEndTime: event.target.value.trim() }, () => {

            console.log(this.state.eventEndTime);

        });

    }, 


    handleStartTimeSelector: function(event) {

        this.setState({ eventStartTimeSelector: event.target.value }, () => {

            console.log(this.state.eventStartTimeSelector)

        });

    }, 

    handleEndTimeSelector: function(event) {

        this.setState({ eventEndTimeSelector: event.target.value }, () => {

            console.log(this.state.eventEndTimeSelector);

        });

    }, 

    handleDateInput: function(event) {

        this.setState({ eventDate: event.target.value }, () => {

            console.log(this.state.eventDate);

        });

    }, 

    handleStartLocationInput: function(event) {

        this.setState({ eventStartLocation: event.target.value }, () => {

            console.log(this.state.eventStartLocation);

        });

    }, 

    handleEndLocationInput: function(event) {

        this.setState({ eventEndLocation: event.target.value }, () => {

            console.log(this.state.eventEndLocation);

        });

    }, 

    handleDetailsInput: function(event) {

        this.setState({ eventDetails: event.target.value }, () => {

            console.log(this.state.eventDetails);

        });

    }, 

    validateDateAndTime: async function(dateString, startTimeString, endTimeString, startTimeSelector, endTimeSelector) {
        if (endTimeSelector === '' || startTimeSelector === '' || startTimeString === '' || endTimeString === '') {
            console.log(dateString, startTimeString, endTimeString);
            alert('false 1');
           return false;
        }
        else {
            //basic checks passed. build the date.
            //dateParts is now [month, date, year]
            let dateParts = dateString.split('/');
            let startDate = new Date(dateParts[2] + '/' + dateParts[0] + '/' + dateParts[1]);
            if (isNaN(startDate.getDate())) {
                //invalid date
                alert('false 2');
                return false;
            }
            let today = new Date();
            //date is valid, now we check for logical errors
            if (startDate <= today) {
                //date is current or in the past
                alert('false 3');
                return false;
            }
            //date is in the future, now validate time
            if (!(startTimeString.match(/^[0-1]?[0-9]:[0-5][0-9]/)) || !(endTimeString.match(/^[0-1]?[0-9]:[0-5][0-9]/))) {
                //invalid start or end times
                alert('false 4');
                return false;
            }
            //basic checks pass
            let startTimeParts = startTimeString.split(':');
            let endTimeParts = endTimeString.split(':');
            let startTimeHH = parseInt(startTimeParts[0]) + ((startTimeSelector === 'PM') ? 12 : 0);
            let startTimeMM = parseInt(startTimeParts[1]);
            let endTimeHH = parseInt(endTimeParts[0]) + ((endTimeSelector === 'PM') ? 12 : 0);
            let endTimeMM = parseInt(endTimeParts[1]);

            let startTime = new Date(dateParts[2], dateParts[0] - 1, dateParts[1], startTimeHH, startTimeMM);
            let endTime = new Date(dateParts[2], dateParts[0] - 1, dateParts[1], endTimeHH, endTimeMM);

    
    
    
            if ((endTime > startTime) && (startTime > today)) {

                await this.setState({ startTime: startTime.toISOString(), endTime: endTime.toISOString() }, () => {

                });
                return true;

            } else {
                alert('false 5');
                return false;

            }
        }
    },




    handleSubmit: async function(event) {


        const currentEvent = this.state;

        let startTimeString = currentEvent.eventStartTime;
        let startTimeSelector = currentEvent.eventStartTimeSelector;
        let endTimeString = currentEvent.eventEndTime;
        let endTimeSelector = currentEvent.eventEndTimeSelector;
        let dateString = currentEvent.eventDate;

        console.log(dateString, startTimeString, endTimeString, startTimeSelector, endTimeSelector);
        let timesAreValid = await this.validateDateAndTime(dateString, startTimeString, endTimeString, startTimeSelector, endTimeSelector);
        
        if (!timesAreValid) {

            alert('enter a valid time not at all');

        }
        else {

            var userInfo = UtilFunc.getLocalUserInfo();
            const creatorId = userInfo.memberId;
            API.updateEvent(this.state.eventId,{

                title: this.state.eventTitle,
                eventType: this.state.eventType.toLowerCase(),
                location1: this.state.eventStartLocation,
                location2: this.state.eventEndLocation,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                note: this.state.eventDetails,
                creator: creatorId,
                houseHoldId: this.props.getHouseholdIdFunction()

            });

            this.props.modalClose()

            window.location.reload(false)
        }   


    }, 

}

export default handleTypeSelector