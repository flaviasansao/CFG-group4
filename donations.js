// Table of contents
// 1. Setting up variables and gathering values from the form
// 2. Functions for correct navbar display and hiding of unneeded elements
// 3. Continue button functionality and error messages
// 4. Prettifying credit card information input
// 5. Event listeners for navbar buttons and back buttons
// 6. Address lookup
// 7. Modifying the address button so it matches the others

// 1. Setting up variables
//Set up reused variables.
let donationMethod;
let donatedAmount;

//Get the values for first name and last name and store them as variables to be used in the thanks message.
$("#firstName").change(function () {
    firstName = $("#firstName").val();
})

$("#lastName").change(function () {
    lastName = $("#lastName").val();
})

//Get the value of the amount donated and store it as a variable for the thanks message.
$("#selectedAmount").change(function () {
    if ($("#selectedAmount").val() !== "Choose an amount") {
        donatedAmountString = $("#selectedAmount").val();
        donatedAmount = donatedAmountString[1] + donatedAmountString[2];
        $("#amountSummary").text(`£${donatedAmount}`);
    } else {
        donatedAmount = $("#manualAmount").val();
    }
})

$("#manualAmount").change(function () {
    donatedAmount = $("#manualAmount").val();
    $("#amountSummary").text(`£${donatedAmount}`);
})

//Find out which donation method the user chose and add it to the thanks message.
$("#monthly").change(function () {
    donationMethod = $("input:checked").val();
    $("#donationType").text(donationMethod);
})

$("#oneTime").change(function () {
    donationMethod = $("input:checked").val();
    $("#donationType").text(donationMethod);
})

// 2. Functions for correct navbar display and hiding of unneeded elements
//Add functions to change the active status of navbar elements when the user navigates to a different section.
function goToDonation() {
    $("#aboutDonation").show();
    $("#aboutYou").hide();
    $("#summary").hide();
    $("#donationLink").addClass("active");
    $("#aboutLink").removeClass("active");
    $("#summaryLink").removeClass("active");
}

function goToAbout() {
    $("#aboutDonation").hide();
    $("#aboutYou").show();
    $("#summary").hide();
    $("#donationLink").removeClass("active");
    $("#aboutLink").addClass("active");
    $("#summaryLink").removeClass("active");
}

function goToSummary() {
    $("#aboutDonation").hide();
    $("#aboutYou").hide();
    $("#summary").show();
    $("#donationLink").removeClass("active");
    $("#aboutLink").removeClass("active");
    $("#summaryLink").addClass("active");
}

// 3. Continue button functionality and error messages
//Set up functions to be called when the user clicks the first Continue button.
$("#continueToDetails").click(function () {
    $("#donationErrorContainer").text("");
    let errorCount = 0;
    let selectedAmount = $("#selectedAmount").val();
    let manualAmount = $("#manualAmount").val();

    //Check that, if a manual amount was entered, it is a number.
    if (isNaN(manualAmount)) {
        $("#donationErrorContainer").append("<p>Please enter only numbers.</p>");
        $("#donationErrorContainer").show();
        return;
    }

    //Output an error if the user tries to enter both manual and dropdown amounts.
    let typeChecked = $('input[name="type"]:checked').val()
    if (selectedAmount != "Choose an amount" && manualAmount) {
        $("#donationErrorContainer").append(`<p>Please EITHER select an amount to donate from the dropdown menu or enter the
                amount manually into the box below it.</p>`)
        $("#donationErrorContainer").show();
        errorCount += 1;
    }

    //Output an error if the user has chosen both monthly and one-time donations.
    if (!typeChecked) {
        $("#donationErrorContainer").append(`<p>Please choose either a monthly or a one-time donation.</p>`)
        $("#donationErrorContainer").show();
        errorCount += 1;
    }

    //Output an error if no amount is entered.
    if (!donatedAmount) {
        $("#donationErrorContainer").append(`<p>Please enter an amount to donate.</p>`)
        $("#donationErrorContainer").show();
        errorCount += 1;
    }

    //If everything's good, continue to the next part.
    if (errorCount == 0) {
        $("#donationErrorContainer").hide();
        goToAbout();
    }

    else {
        return;
    }
})

//Check that all required elements are filled in and then proceed to the next section.
$("#continueToSummary").click(function () {
    let requiredInfo = $(".requiredInfo");
    //totalRequired is used to count the number of required elements entered so that the 
    //next section can be displayed once all six are entered.
    let totalRequired = 0;
    let currentElement;

    //Change the CSS properties so fields without information entered are highlighted and an error
    //message is displayed.
    for (let i = 0; i < requiredInfo.length; i++) {
        if (requiredInfo[i].value === "") {
            $("#detailsErrorContainer").show();
            currentElement = requiredInfo[i];
            currentElement.style.borderColor = "red";
            currentElement.style.borderWidth = "2px";

        }
        else if (requiredInfo[i].value) {
            totalRequired += 1;
            currentElement = requiredInfo[i];
            currentElement.style.borderColor = "black";
            currentElement.style.borderWidth = "1px";
        }
    }
    if (totalRequired >= 6) {
        $("#detailsErrorContainer").hide();
        goToSummary();
    }
})

// 4. Prettifying credit card information input
//Add a slash in the right place in the expiry date field.
$("#cardExpiry").on("keyup", function () {
    let expiryValue = $("#cardExpiry").val();
    if (expiryValue.length === 2) {
        expiryValue = expiryValue + "/";
        $("#cardExpiry").val(expiryValue);
    }
});

//Add spaces between each four digits in the card number.
$("#cardNumber").on("keyup", function () {
    let cardNumberValue = $("#cardNumber").val();
    if (cardNumberValue.length === 4 || cardNumberValue.length === 9 || cardNumberValue.length === 14) {
        cardNumberValue = cardNumberValue + " ";
        $("#cardNumber").val(cardNumberValue);
    }
})

//Check for missing info reusing the code above and show the tnanks message 
//when the donate button is clicked.
$("#donateButton").click(function () {
    $("#summaryErrorContainer").text("");
    let requiredInfo = $(".requiredCard");
    //totalRequired is used to count the number of required elements entered so that the 
    //next section can be displayed once six all are entered.
    let totalRequired = 0;
    let errorCount = 0;
    let currentElement;
    let cvvToCheck = $("#cardCVV").val();
    let expiryToCheck = $("#cardExpiry").val().split("/").join("");
    let numberToCheck = $("#cardNumber").val().split(" ").join("");

    //Change the CSS properties so fields without information entered are highlighted and an error
    //message is displayed.
    for (let i = 0; i < requiredInfo.length; i++) {
        if (requiredInfo[i].value === "") {
            $("#summaryErrorContainer").text("");
            $("#summaryErrorContainer").append("<p>Please add all required information.</p>")
            $("#summaryErrorContainer").show();
            errorCount += 1;

            currentElement = requiredInfo[i];
            currentElement.style.borderColor = "red";
            currentElement.style.borderWidth = "2px";

        }
        else if (requiredInfo[i].value) {
            totalRequired += 1;
            currentElement = requiredInfo[i];
            currentElement.style.borderColor = "black";
            currentElement.style.borderWidth = "1px";
        }
    }

    if (isNaN(numberToCheck)) {
        $("#summaryErrorContainer").append("<p>The card number should be only numbers and spaces.</p>");
        $("#summaryErrorContainer").show();
        errorCount += 1;
    }

    if (numberToCheck.length !== 16) {
        $("#summaryErrorContainer").append("<p>The card number must be 16 digits long.</p>");
        $("#summaryErrorContainer").show();
        errorCount += 1;
    }

    if (isNaN(expiryToCheck)) {
        $("#summaryErrorContainer").append("<p>The expiry date should be only numbers and a slash.</p>");
        $("#summaryErrorContainer").show();
        errorCount += 1;
    }

    if (expiryToCheck.length !== 4) {
        $("#summaryErrorContainer").append("<p>The expiry date should include four numbers.</p>");
        $("#summaryErrorContainer").show();
        errorCount += 1;
    }

    if (isNaN(cvvToCheck)) {
        $("#summaryErrorContainer").append("<p>The CVV should be only numbers.</p>");
        $("#summaryErrorContainer").show();
        errorCount += 1;
    }

    if (cvvToCheck.length != 3) {
        $("#summaryErrorContainer").append("<p>The CVV should be three numbers.</p>");
        $("#summaryErrorContainer").show();
        errorCount += 1;
    }

    if (totalRequired >= 4 && errorCount == 0) {
        $("#summary").hide();
        $("#thanksMessage").empty();
        const date = new Date();
        let today = date.getDate();
        let ordinal;
        if (today == "1" || today == "21" || today == "31") {
            ordinal = `${today}st`;
        }
        else if (today == "2" || today == "22") {
            ordinal = `${today}nd`;
        }
        else if (today == "3" || today == "23") {
            ordinal = `${today}rd`;
        }
        else {
            ordinal = `${today}th`;
        }
        if (donationMethod === "one-time") {
            $("#thanksMessage").append(`Thank you, ${firstName} ${lastName}, 
        for your one-time donation of £${donatedAmount}! Your donation will help keep 
        people warm this winter.`);
        }
        else if (donationMethod === "monthly") {
            $("#thanksMessage").append(`Thank you, ${firstName} ${lastName}, 
            for your monthly donation of £${donatedAmount}! Your card will be debited £${donatedAmount}
             on the ${ordinal} of every month. Contact us at <a href="mailto:someone@example.com">contact@warmtogether.co.uk</a>
              if you want to cancel your recurring payments. <br><br>Your donation will help keep 
            people warm this winter.`);
        }

        $("#thanksDiv").show();
        $("#donationLink").removeClass("active");
        $("#aboutLink").removeClass("active");
        $("#summaryLink").removeClass("active");
    }
})

// 5. Event listeners for navbar buttons and back buttons
//Add event listeners so that users can click the navbar buttons to navigate.
$("#donationLink").on("click", goToDonation);

$("#aboutLink").on("click", goToAbout);

$("#summaryLink").on("click", goToSummary);

//Add event listeners for Back buttons.
$("#backToDonation").on("click", goToDonation);

$("#backToDetails").on("click", goToAbout);

// 6. Address lookup
//Look up addresses associated with the entered postcode and automatically fill in that information.
$('#postcode_lookup').getAddress(
    {
        api_key: '23CJu6AtckC3lJ73kOgrHw40863',
        output_fields: {
            line_1: '#line1',
            line_2: '#line2',
            line_3: '#line3',
            post_town: '#town',
            county: '#county',
            postcode: '#postcode'
        }
    });

// 7. Modifying the address button so it matches the others
window.onload = () => {
    $("#getaddress_button").addClass("gimme-red");
}