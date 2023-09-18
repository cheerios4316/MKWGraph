var chart = undefined;
var ctx = undefined;

//Data is included in index.html
//Edit data in pb_data.js

//Function initializes the chart by creating one with an empty dataset
const initChart = (id) => {
    ctx = document.getElementById(id);

    let newChart = {
        type: "line",
        data: {
            datasets: [
                {
                    data: [],
                },
            ],
        },
        options: {},
    };

    chart = new Chart(ctx, newChart);
};



//Function sets chart based on map id
const setChart = (dataset, targetMap) => {
    chart.destroy();
    chart = new Chart(ctx, makeDataset(targetMap));
};

//Function initializes <select> elements based on an array of fields
//ex: [{id: 'cupSelect', type: 'cup'}, {id: 'circuitSelect', type: 'circuit'}]
const initSelect = (fields) => {
    //Function sets 'circuit' type <select>s' options to just the maps from a given cup
    const changeCircuitSet = (id, targetCup) => {
        let sel = document.getElementById(id);
        while (sel.options.length > 0) sel.remove(0);

        const filteredCirc = json_pb_data.maps.filter(
            (el) => el.cup === targetCup
        );

        filteredCirc.map((circ) => {
            const option = document.createElement("option");
            option.value = circ.id;
            option.text = circ.name;

            sel.add(option);
        });
    };

    //Function is called on change of 'cup' type <select>s
    const cupCallback = (e) => {
        targetCup = e.target.value;

        fields.map((elem) => {
            if (elem.type === SelectType.CUP) return;

            changeCircuitSet(elem.id, targetCup);
            setChart(chart, document.getElementById(elem.id).options[0].value)
        });
    };

    //Function is called on change of 'circuit' type <select>s
    const circuitCallback = (e) => {
        setChart(chart, e.target.value);
    };

    let circuitDefault = "";

    //<select>s initialization
    fields.map((elem) => {
        const currElem = document.getElementById(elem.id);

        //Setting callbacks on change
        currElem.addEventListener("change", (e) => {
            switch (elem.type) {
                case SelectType.CUP:
                    return cupCallback(e);
                case SelectType.CIRCUIT:
                    return circuitCallback(e);
                default:
                    return () => {
                        console.error(
                            "Case for select type " +
                                elem.type +
                                "is not defined."
                        );
                    };
            }
        });

        //'cup' type <select>s initialization
        if (elem.type === SelectType.CUP) {
            json_pb_data.cups.map((cup) => {
                const option = document.createElement("option");
                option.value = cup;
                option.text = cup + " Cup";

                currElem.add(option);
            });

            circuitDefault = currElem.options[0].value;
        }

        //'circuit' type <select>s and chart initialization
        if (elem.type === SelectType.CIRCUIT) {
            changeCircuitSet(elem.id, circuitDefault);
            setChart(chart, currElem.options[0].value);
        }
    });
};

//Function converts string (ex: "2:31") into a 2-decimal points number (ex: 2.31)
const stringToMinutes = (str) => {
    const split = str.split(":");
    const minutes = parseInt(split[0]);
    const seconds = parseInt(split[1]);

    return parseFloat(((minutes * 60 + seconds) / 60).toFixed(2));
};

//Function makes a Chart.js-compatible dataset based on a map id
const makeDataset = (targetMap) => {
    //empty dataset
    let output = {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    data: [],
                    borderColor: 'rgb(154, 66, 255)',
                    fill: true,
                    tension: 0.2
                }
            ]
            
        },
        options: {},
    };

    //fetching map from json data
    const map = json_pb_data.maps.filter(
        (el) => el.id.toString() === targetMap
    )[0];

    //making data and label for chart
    let timeArray = map.times.map((el) => stringToMinutes(el.time));
    let labelsArray = map.times.map((el) => el.date);

    //if length of data is 1 nothing is displayed on chart
    if (timeArray.length == 1) timeArray[1] = timeArray[0];
    if (labelsArray.length == 1) labelsArray[1] = labelsArray[0];

    output.data.datasets[0].label = map.name;

    output.data.datasets[0].data = timeArray;
    output.data.labels = labelsArray;

    return output;
};
const SelectType = {
    CUP: "cup",
    CIRCUIT: "circuit",
};
