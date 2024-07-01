export function createTable(tokens: string[]) {
    let states: any = [[]];
    let step = 0;

    for (let i = 0; i < tokens.length; i++) {
        let currentStep = 0;
        let palavra = tokens[i];

        for (let j = 0; j < palavra.length; j++) {
            let letra = palavra[j];

            if (typeof states[currentStep][letra] === 'undefined') {
                let nextStep = step + 1;

                states[currentStep][letra] = nextStep;
                states[nextStep] = [];

                step = currentStep = nextStep;
            } else {
                currentStep = states[currentStep][letra];
            }

            if (j === palavra.length - 1) {
                states[currentStep]['end'] = true;
            } else {
                states[currentStep]['end'] = false;
            }
        }
    }
    return states;
}
