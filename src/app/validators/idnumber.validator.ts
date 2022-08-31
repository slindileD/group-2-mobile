import { FormControl, ValidationErrors } from "@angular/forms";

export class IdNumberValidator {
    static saIdValidator(control : FormControl) : ValidationErrors|null {
        let val = control.value;

        let dob = control.value.slice(0,6);
        let gender = control.value.slice(6, 10);
        let citizenship = control.value.slice(10,11);

        let leadingIdNumbers = control.value.slice(0, 12)
        let checksum = control.value.slice(12);

        console.log("Status for "+control.value);
        console.log("Dob valid = "+IdNumberValidator.isDOBValid(dob));
        console.log("Gender valid = "+IdNumberValidator.isGenderValid(gender));
        console.log("Citizen valid = "+IdNumberValidator.isCitizenValid(citizenship));
        console.log("Checksum valid = "+IdNumberValidator.isCheckSumValid(leadingIdNumbers, checksum));

        let resp = {
            'invalidsaid' : true
        };

        if (!IdNumberValidator.isDOBValid(dob)
        || !IdNumberValidator.isGenderValid(gender)
        || !IdNumberValidator.isCitizenValid(citizenship)
        || !IdNumberValidator.isCheckSumValid(leadingIdNumbers, checksum)) {
            return resp;
        }

        return null;
    }

    private static isDOBValid (dob : string) : boolean {
        let year = Number(dob.slice(0,2));
        let month = Number(dob.slice(2,4));
        let day = Number(dob.slice(4,6));

        let properDob = new Date(year, month-1, day);
        if (
            year == Number(properDob.getFullYear().toString().substr(-2)) &&
            month == properDob.getMonth() + 1 &&
            day == properDob.getDate()
        ) {
            return true;
        }
        return false;
    }

    private static isGenderValid(gender : string) : boolean {
        if (Number(gender) > 0 && Number(gender) < 10000) {
            return true;
        }
        return false;
    }

    private static isCitizenValid(citizenship : string) : boolean {
        if (Number(citizenship) == 0 || Number(citizenship) == 1) {
            return true;
        }
        return false;
    }

    private static isCheckSumValid(leadingIdNumbers: string, checksum : string) : boolean {
        let validChecksum = IdNumberValidator.getValidChecksumDigitViaLuhn(
            leadingIdNumbers.split("").map(Number));

        console.log("Comparing validchecksum = "+validChecksum+", "+checksum);
        return Number(checksum) == validChecksum;
    }


    private static getValidChecksumDigitViaLuhn(leadingIdNumbers : number[]) : number {
        let sum = 0;
        let shouldBeDoubledIndex = 2;

        //backwards iteration over the digits of the id that come before the checksum digit 
        for (let index = leadingIdNumbers.length-1; index>-1; index--) {
            if (shouldBeDoubledIndex % 2 == 0) { //if the index is a multiple of 2 then the number must be doubled
                let doubledNumber = leadingIdNumbers[index] * 2;
                if (doubledNumber > 0) {
                    //if the doubled number is greator than 9 then sum its digits instead
                    let digits = String(doubledNumber).split("").map(Number);
                    let sumOfDigits = 0;
                    digits.forEach(digit => {
                        sumOfDigits += digit;
                    });

                    sum += sumOfDigits;
                }
                else {
                    sum += doubledNumber;
                }
            }
            else {
                sum += leadingIdNumbers[index]; //add the digit as-is since it must not be doubled
            }
            shouldBeDoubledIndex += 1;
        }

        return (10 - (sum % 10)) % 10;
	}
}