/*This class to used validate the zipcode and format based upon input
EXAMPLES:
Input = [94133,94133] [94200,94299] [94600,94699]
Output should be = [94133,94133] [94200,94299] [94600,94699]

Input = [94133,94133] [94200,94299] [94226,94399]
Output should be = [94133,94133] [94200,94399]
*/
class ZipCodeValidator {

    //constructor used to attached the button listeners
    constructor() {
        document.getElementById("validate").onclick = this.validateZipCode.bind(this);
        document.getElementById("clear").onclick = this.clearForm.bind(this);
    }

    //This function used to clear the form values
    clearForm() {
        this.ranges = [];
        document.getElementById("zipCode").value = '';
        document.getElementById('zipCode').className = 'zipCodeInput'
    }

    //This function used to validate the zipcode values
    validateZipCode() {

        this.ranges = [];
        let values = document.getElementById("zipCode").value;

        if (values !== null && values !== undefined && values.trim() !== "") {
            document.getElementById('zipCode').className = 'zipCodeInput'
            this.convertStringToArray(values);
            this.parseZipcode();

        } else {
            document.getElementById('zipCode').className = 'error';
            document.getElementById("result").innerHTML = "";
        }
    }

    //This function used to parse the zipcode 
    parseZipcode() {
        let output = "";
        const zipCodeValues = this.ranges;
        if (zipCodeValues.length > 1) {
            zipCodeValues.sort(this.sortFunction);

            zipCodeValues.map((item, index) => {
                const nextIndex = index + 1;

                if (index <= nextIndex && nextIndex < zipCodeValues.length) {
                    const currentIndexMinValue = item[0];
                    const currentIndexMaxValue = item[1];

                    const nextIndexMinValue = zipCodeValues[nextIndex][0];
                    const nextIndexMaxValue = zipCodeValues[nextIndex][1];

                    if (currentIndexMaxValue >= nextIndexMinValue) {

                        if (currentIndexMaxValue >= nextIndexMaxValue) {
                            output += "[" + [currentIndexMinValue, currentIndexMaxValue] + "]";
                        }
                        else {
                            output += "[" + [currentIndexMinValue, nextIndexMaxValue] + "]";
                        }
                    } else {
                        output += "[" + [currentIndexMinValue, currentIndexMaxValue] + "]";
                    }
                }
                else {
                    const previousIndexMinValue = zipCodeValues[index - 1][0];
                    const previousIndexMaxValue = zipCodeValues[index - 1][1];

                    const currentIndexMinValue = item[0];
                    const currentIndexMaxValue = item[1];

                    if ((previousIndexMaxValue < currentIndexMinValue) && (currentIndexMinValue > previousIndexMinValue)) {

                        if (currentIndexMaxValue >= previousIndexMaxValue) {
                            output += "[" + [currentIndexMinValue, currentIndexMaxValue] + "]";
                        }
                    }
                }
            });
        } else {
            output = "[" + zipCodeValues + "]";
        }

        document.getElementById("result").innerHTML = output;
    }

    //Convert the string Array object into Array
    convertStringToArray(values) {
        if (values != null && values != undefined) {
            let splitArray = values.split('[');

            if (splitArray != null && splitArray != undefined && splitArray.length > 0) {
                splitArray.map((data) => {
                    if (data != null && data != undefined && data.trim() != "") {
                        let splitArr = data.split(',');
                        let arr = [];

                        if (splitArr != null && splitArr != undefined && splitArr.length > 0) {
                            splitArr.map((val) => {
                                if (val.indexOf(']') > -1) {
                                    arr.push(val.replace("]", "").trim());
                                } else {
                                    arr.push(val.trim());
                                }
                            });
                        }

                        this.ranges.push(arr);
                    }
                });
            }
        }
    }

    //This function used to sort the array of array object
    sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }
}